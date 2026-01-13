import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { DateRange } from '../../core/models';
import { DateRangeSelectorComponent } from '../../shared/components/date-range-selector.component';
import { MiniLineChartComponent } from '../../shared/components/mini-line-chart.component';
import { NewsletterAnalyticsStore } from './newsletter-analytics.store';

@Component({
  selector: 'app-newsletter-analytics',
  standalone: true,
  imports: [NgFor, DateRangeSelectorComponent, MiniLineChartComponent],
  templateUrl: './newsletter-analytics.component.html',
  styleUrl: './newsletter-analytics.component.scss',
})
export class NewsletterAnalyticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  ranges = this.getRanges();
  selectedRange = this.ranges[0];

  points = this.store.points;
  average = this.store.average;
  avgLabel = computed(() => `${this.average()}% avg open rate`);

  constructor(
    private api: ApiService,
    private state: AppStateService,
    private store: NewsletterAnalyticsStore
  ) {}

  ngOnInit(): void {
    this.state.dateRange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((range) => {
        this.selectedRange = range;
        this.store.setRange(range);
      });

    this.api
      .getAnalytics(this.selectedRange.from, this.selectedRange.to)
      .pipe(takeUntil(this.destroy$))
      .subscribe((analytics) => this.store.setPoints(analytics.newsletter));
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
    return [7, 30, 90].map((days) => {
      const from = new Date();
      from.setDate(today.getDate() - days);
      return { label: `Last ${days} days`, from: from.toISOString(), to: today.toISOString() };
    });
  }
}
