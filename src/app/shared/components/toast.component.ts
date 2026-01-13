import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { NotificationService } from '../../core/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  template: `
    <div class="toast-stack">
      <div class="toast" *ngFor="let message of messages$ | async">
        <span class="dot" [class.error]="message.type === 'error'"></span>
        <span>{{ message.text }}</span>
      </div>
    </div>
  `,
  styles: [
    '.toast-stack { position: fixed; right: 24px; bottom: 24px; display: grid; gap: 12px; z-index: 50; }',
    '.toast { background: var(--surface-strong); border: 1px solid var(--border); padding: 12px 16px; border-radius: 12px; display: flex; gap: 10px; align-items: center; color: var(--text-primary); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }',
    '.dot { width: 8px; height: 8px; border-radius: 999px; background: var(--success); }',
    '.dot.error { background: var(--danger); }',
  ],
})
export class ToastComponent {
  readonly messages$ = this.notifications.messages$;

  constructor(private notifications: NotificationService) {}
}
