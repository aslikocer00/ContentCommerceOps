import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { ContentItem } from '../../core/models';

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './content-detail.component.html',
  styleUrl: './content-detail.component.scss',
})
export class ContentDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  content?: ContentItem;
  related: ContentItem[] = [];
  recommendations = ['Shoppable edits', 'Brand spotlight', 'Editor Q&A'];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private state: AppStateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.api.getContentById(params.get('id') ?? '')),
        takeUntil(this.destroy$)
      )
      .subscribe((item) => {
        this.content = item;
        this.state.selectContent(item);
        this.api
          .getContent({ category: item.category, page: 1, pageSize: 4, sort: 'publishDate:desc' })
          .pipe(takeUntil(this.destroy$))
          .subscribe((items) => (this.related = items.filter((c) => c.id !== item.id)));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
