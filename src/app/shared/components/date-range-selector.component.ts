import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '../../core/models';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-date-range-selector',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="range">
      <button
        type="button"
        *ngFor="let option of options"
        (click)="select.emit(option)"
        [class.active]="option.label === selected?.label"
      >
        {{ option.label }}
      </button>
    </div>
  `,
  styles: [
    '.range { display: flex; gap: 8px; flex-wrap: wrap; }',
    'button { border: 1px solid var(--border); background: transparent; padding: 6px 12px; border-radius: 999px; color: var(--text-secondary); }',
    'button.active { background: var(--accent); color: #fff; border-color: var(--accent); }',
  ],
})
export class DateRangeSelectorComponent {
  @Input() options: DateRange[] = [];
  @Input() selected?: DateRange;
  @Output() select = new EventEmitter<DateRange>();
}
