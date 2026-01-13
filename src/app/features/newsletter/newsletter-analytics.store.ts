import { Injectable, computed, signal } from '@angular/core';
import { AnalyticsPoint, DateRange } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class NewsletterAnalyticsStore {
  private rawPoints = signal<AnalyticsPoint[]>([]);
  private selectedRange = signal<DateRange | null>(null);

  readonly points = computed(() => {
    const range = this.selectedRange();
    if (!range) {
      return this.rawPoints();
    }
    const from = new Date(range.from).getTime();
    const to = new Date(range.to).getTime();
    return this.rawPoints().filter((point) => {
      const time = new Date(point.date).getTime();
      return time >= from && time <= to;
    });
  });

  readonly average = computed(() => {
    const points = this.points();
    if (!points.length) {
      return 0;
    }
    const sum = points.reduce((acc, point) => acc + point.value, 0);
    return Math.round((sum / points.length) * 10) / 10;
  });

  setPoints(points: AnalyticsPoint[]): void {
    this.rawPoints.set(points);
  }

  setRange(range: DateRange): void {
    this.selectedRange.set(range);
  }
}
