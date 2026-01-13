import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { ContentItem } from '../../core/models';

@Component({
  selector: 'app-content-planner',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './content-planner.component.html',
  styleUrl: './content-planner.component.scss',
})
export class ContentPlannerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  view: 'week' | 'month' = 'week';
  content: ContentItem[] = [];

  filters = this.fb.group({
    category: ['fashion'],
    status: ['scheduled'],
    query: [''],
  });

  constructor(
    private api: ApiService,
    private state: AppStateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filters.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.state.updateContentTableState({ filters: value as Record<string, string> });
    });

    this.state.contentTableState$
      .pipe(
        switchMap((table) =>
          this.api.getContent({
            ...table.filters,
            page: table.page,
            pageSize: table.pageSize,
            sort: table.sort,
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((content) => (this.content = content));
  }

  toggleView(view: 'week' | 'month'): void {
    this.view = view;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
