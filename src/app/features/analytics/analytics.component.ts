import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { AnalyticsPoint, AnalyticsResponse, DateRange } from '../../core/models';
import { DateRangeSelectorComponent } from '../../shared/components/date-range-selector.component';

type MetricKey = 'traffic' | 'newsletter' | 'vouchers';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, DecimalPipe, DateRangeSelectorComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  analytics?: AnalyticsResponse;
  ranges = this.getRanges();
  selectedRange = this.ranges[0];
  selectedMetric: MetricKey = 'traffic';
  smoothing = true;
  hoverIndex = -1;

  metrics: { key: MetricKey; label: string; unit: string }[] = [
    { key: 'traffic', label: 'Traffic', unit: 'sessions' },
    { key: 'newsletter', label: 'Newsletter', unit: 'open %' },
    { key: 'vouchers', label: 'Vouchers', unit: 'conversion %' },
  ];

  constructor(private api: ApiService, private state: AppStateService) {}

  ngOnInit(): void {
    this.state.dateRange$
      .pipe(
        switchMap((range) => {
          this.selectedRange = range;
          return this.api.getAnalytics(range.from, range.to);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((analytics) => (this.analytics = analytics));
  }

  setRange(range: DateRange): void {
    this.state.setDateRange(range);
  }

  setMetric(metric: MetricKey): void {
    this.selectedMetric = metric;
    this.hoverIndex = -1;
  }

  toggleSmoothing(): void {
    this.smoothing = !this.smoothing;
  }

  get selectedMetricLabel(): string {
    return this.metrics.find((metric) => metric.key === this.selectedMetric)?.label ?? '';
  }

  get selectedMetricUnit(): string {
    return this.metrics.find((metric) => metric.key === this.selectedMetric)?.unit ?? '';
  }

  get points(): AnalyticsPoint[] {
    if (!this.analytics) {
      return [];
    }
    const base = this.analytics[this.selectedMetric];
    return this.smoothing ? this.applyMovingAverage(base, 3) : base;
  }

  get stats() {
    const values = this.points.map((point) => point.value);
    if (!values.length) {
      return { total: 0, avg: 0, peak: 0, trend: 0, change: 0 };
    }
    const total = values.reduce((acc, val) => acc + val, 0);
    const avg = total / values.length;
    const peak = Math.max(...values);
    const trend = ((values[values.length - 1] - values[0]) / (values[0] || 1)) * 100;
    const change = this.compareLastPeriods(values, 7);
    return { total, avg, peak, trend, change };
  }

  get insights(): string[] {
    const stats = this.stats;
    const trendLabel = stats.trend >= 0 ? 'up' : 'down';
    const changeLabel = stats.change >= 0 ? 'lift' : 'dip';
    return [
      `${this.selectedMetricLabel} trend is ${trendLabel} ${Math.abs(stats.trend).toFixed(1)}% across the range.`,
      `Last 7-day average shows a ${changeLabel} of ${Math.abs(stats.change).toFixed(1)}%.`,
      `Peak day hit ${stats.peak.toFixed(1)} — consider boosting that slot with promos.`,
    ];
  }

  get chartPath(): string {
    return this.buildPath(this.points, 320, 120).line;
  }

  get chartArea(): string {
    return this.buildPath(this.points, 320, 120).area;
  }

  get hoverPoint() {
    if (this.hoverIndex < 0 || this.hoverIndex >= this.points.length) {
      return null;
    }
    const values = this.points.map((p) => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const x = (this.hoverIndex / (this.points.length - 1)) * 320;
    const y = 120 - ((this.points[this.hoverIndex].value - min) / (max - min || 1)) * (120 - 16) - 8;
    return { x, y };
  }

  hoverLabel(): string {
    if (this.hoverIndex < 0 || this.hoverIndex >= this.points.length) {
      return '';
    }
    const point = this.points[this.hoverIndex];
    const date = new Date(point.date);
    return `${this.selectedMetricLabel} · ${date.toLocaleDateString()} · ${point.value.toFixed(1)}`;
  }

  onMove(event: MouseEvent): void {
    const target = event.currentTarget as SVGElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const index = Math.round((x / rect.width) * (this.points.length - 1));
    this.hoverIndex = Math.max(0, Math.min(index, this.points.length - 1));
  }

  clearHover(): void {
    this.hoverIndex = -1;
  }

  get breakdownRows(): { label: string; value: number; bar: number }[] {
    if (!this.analytics) {
      return [];
    }
    const total = this.analytics.breakdown.reduce((acc, row) => acc + row.value, 0) || 1;
    return this.analytics.breakdown
      .map((row) => ({
        ...row,
        bar: Math.round((row.value / total) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyMovingAverage(points: AnalyticsPoint[], windowSize: number): AnalyticsPoint[] {
    return points.map((point, index) => {
      const start = Math.max(0, index - windowSize + 1);
      const slice = points.slice(start, index + 1);
      const avg = slice.reduce((acc, item) => acc + item.value, 0) / slice.length;
      return { ...point, value: Number(avg.toFixed(2)) };
    });
  }

  private compareLastPeriods(values: number[], window: number): number {
    if (values.length < window * 2) {
      return 0;
    }
    const recent = values.slice(-window);
    const previous = values.slice(-window * 2, -window);
    const recentAvg = recent.reduce((acc, val) => acc + val, 0) / window;
    const previousAvg = previous.reduce((acc, val) => acc + val, 0) / window;
    return ((recentAvg - previousAvg) / (previousAvg || 1)) * 100;
  }

  private buildPath(points: AnalyticsPoint[], width: number, height: number) {
    if (!points.length) {
      return { line: '', area: '' };
    }
    const values = points.map((p) => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const coords = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point.value - min) / (max - min || 1)) * (height - 16) - 8;
      return { x, y };
    });
    const line = coords.map((c) => `${c.x},${c.y}`).join(' ');
    const area = `0,${height} ${line} ${width},${height}`;
    return { line, area };
  }

  private getRanges(): DateRange[] {
    const today = new Date();
    return [7, 30, 90].map((days) => {
      const from = new Date();
      from.setDate(today.getDate() - days);
      return { label: `Last ${days} days`, from: from.toISOString(), to: today.toISOString() };
    });
  }
}
