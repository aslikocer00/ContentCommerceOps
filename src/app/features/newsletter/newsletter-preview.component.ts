import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { ContentItem, Newsletter } from '../../core/models';

@Component({
  selector: 'app-newsletter-preview',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './newsletter-preview.component.html',
  styleUrl: './newsletter-preview.component.scss',
})
export class NewsletterPreviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  newsletter?: Newsletter;
  content: ContentItem[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    combineLatest([
      this.api.getNewsletterById(id),
      this.api.getContent({ page: 1, pageSize: 20, sort: 'publishDate:desc' }),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([newsletter, content]) => {
        this.newsletter = newsletter;
        this.content = content;
      });
  }

  getContentTitle(id?: string): string {
    return this.content.find((item) => item.id === id)?.title ?? 'Untitled';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
