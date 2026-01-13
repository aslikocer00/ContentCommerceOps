import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: '<span class="badge" [class.is-active]="active">{{ label }}</span>',
  styles: [
    '.badge { padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; background: var(--surface); border: 1px solid var(--border); color: var(--text-secondary); }',
    '.badge.is-active { background: var(--success-soft); border-color: var(--success); color: var(--success); }',
  ],
})
export class StatusBadgeComponent {
  @Input() label = '';
  @Input() active = false;
}
