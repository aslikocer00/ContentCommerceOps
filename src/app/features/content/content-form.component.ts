import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { ContentItem } from '../../core/models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './content-form.component.html',
  styleUrl: './content-form.component.scss',
})
export class ContentFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  contentId?: string;
  loading = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    category: ['fashion', Validators.required],
    status: ['draft', Validators.required],
    author: ['', Validators.required],
    publishDate: ['', Validators.required],
    summary: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.contentId) {
      this.api
        .getContentById(this.contentId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((content) =>
          this.form.patchValue({
            ...content,
            publishDate: new Date(content.publishDate).toISOString().slice(0, 10),
          })
        );
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.getRawValue() as Partial<ContentItem>;
    const request = this.contentId
      ? this.api.updateContent(this.contentId, payload)
      : this.api.createContent(payload);

    request.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/content']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
