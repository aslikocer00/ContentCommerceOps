import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: '<div class="loading" *ngIf="loading$ | async"></div>',
  styles: [
    '.loading { position: fixed; inset: 0 0 auto 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--accent-strong)); z-index: 100; animation: slide 1.2s linear infinite; }',
    '@keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }',
  ],
})
export class LoadingBarComponent {
  readonly loading$ = this.loading.loading$;

  constructor(private loading: LoadingService) {}
}
