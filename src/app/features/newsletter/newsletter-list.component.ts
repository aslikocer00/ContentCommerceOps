import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Newsletter } from '../../core/models';

@Component({
  selector: 'app-newsletter-list',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink],
  templateUrl: './newsletter-list.component.html',
  styleUrl: './newsletter-list.component.scss',
})
export class NewsletterListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  newsletters: Newsletter[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getNewsletters({ status: 'scheduled', page: 1, pageSize: 10 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((newsletters) => (this.newsletters = newsletters));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
