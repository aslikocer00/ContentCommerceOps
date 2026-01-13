import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { DateRange, Kpi, ActivityItem, AnalyticsPoint } from '../../core/models';
import { KpiCardComponent } from '../../shared/components/kpi-card.component';
import { DateRangeSelectorComponent } from '../../shared/components/date-range-selector.component';
import { MiniLineChartComponent } from '../../shared/components/mini-line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    KpiCardComponent,
    DateRangeSelectorComponent,
    MiniLineChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  kpis: Kpi[] = [];
  activity: ActivityItem[] = [];
  chartPoints: AnalyticsPoint[] = [];
  ranges: DateRange[] = this.getRanges();
  selectedRange = this.ranges[0];

  constructor(private api: ApiService, private state: AppStateService) {}

  ngOnInit(): void {
    this.state.dateRange$
      .pipe(
        tap((range) => (this.selectedRange = range)),
        switchMap((range) => this.api.getKpis(range.from, range.to)),
        takeUntil(this.destroy$)
      )
      .subscribe((kpis) => (this.kpis = kpis));

    this.state.dateRange$
      .pipe(
        switchMap((range) => this.api.getActivity(range.from, range.to)),
        takeUntil(this.destroy$)
      )
      .subscribe((activity) => (this.activity = activity));

    this.state.dateRange$
      .pipe(
        switchMap((range) => this.api.getAnalytics(range.from, range.to)),
        takeUntil(this.destroy$)
      )
      .subscribe((analytics) => (this.chartPoints = analytics.traffic));
  }

  setRange(range: DateRange): void {
    this.state.setDateRange(range);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getRanges(): DateRange[] {
    const today = new Date();
    const ranges = [7, 30, 90].map((days) => {
      const from = new Date();
      from.setDate(today.getDate() - days);
      return {
        label: `Last ${days} days`,
        from: from.toISOString(),
        to: today.toISOString(),
      };
    });
    return ranges;
  }
}
