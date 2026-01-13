import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { AnalyticsResponse, DateRange } from '../../core/models';
import { DateRangeSelectorComponent } from '../../shared/components/date-range-selector.component';
import { MiniLineChartComponent } from '../../shared/components/mini-line-chart.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NgFor, NgIf, DateRangeSelectorComponent, MiniLineChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  analytics?: AnalyticsResponse;
  ranges = this.getRanges();
  selectedRange = this.ranges[0];

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
