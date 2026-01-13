import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Kpi } from '../../core/models';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <article class="kpi">
      <p class="label">{{ data.label }}</p>
      <div class="value">{{ data.value }}</div>
      <span class="delta" *ngIf="data.delta">{{ data.delta }}</span>
    </article>
  `,
  styles: [
    '.kpi { padding: 18px; border-radius: 16px; background: var(--surface-strong); border: 1px solid var(--border); display: grid; gap: 8px; }',
    '.label { color: var(--text-secondary); font-size: 0.85rem; }',
    '.value { font-size: 1.6rem; font-weight: 600; }',
    '.delta { color: var(--success); font-weight: 600; font-size: 0.85rem; }',
  ],
})
export class KpiCardComponent {
  @Input({ required: true }) data!: Kpi;
}
