import { Component, Input } from '@angular/core';
import { AnalyticsPoint } from '../../core/models';

@Component({
  selector: 'app-mini-line-chart',
  standalone: true,
  template: `
    <svg viewBox="0 0 120 40" class="chart" *ngIf="points.length">
      <polyline
        [attr.points]="path"
        fill="none"
        stroke="var(--accent)"
        stroke-width="2"
      ></polyline>
    </svg>
  `,
  styles: [
    '.chart { width: 100%; height: 40px; }',
  ],
})
export class MiniLineChartComponent {
  @Input() points: AnalyticsPoint[] = [];

  get path(): string {
    if (!this.points.length) {
      return '';
    }
    const values = this.points.map((p) => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return this.points
      .map((point, index) => {
        const x = (index / (this.points.length - 1)) * 120;
        const y = 36 - ((point.value - min) / (max - min || 1)) * 32;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
