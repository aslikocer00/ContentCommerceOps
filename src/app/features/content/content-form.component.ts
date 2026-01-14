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
    readTime: ['5 min', Validators.required],
    heroGradient: ['linear-gradient(135deg, #1f6feb, #6aa3ff)', Validators.required],
    editorNotes: [''],
    channels: ['Homepage, Newsletter'],
    sectionsText: [''],
    commerceText: [''],
    seoTitle: [''],
    seoDescription: [''],
    seoKeywords: [''],
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
            channels: content.channels?.join(', ') ?? '',
            sectionsText: content.sectionHighlights
              ?.map((section) => `${section.heading}: ${section.body}`)
              .join('\n') ??
              '',
            commerceText: content.commerceLinks
              ?.map((link) => `${link.label} | ${link.retailer} | ${link.price}`)
              .join('\n') ??
              '',
            seoTitle: content.seo?.title ?? '',
            seoDescription: content.seo?.description ?? '',
            seoKeywords: content.seo?.keywords?.join(', ') ?? '',
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
    const raw = this.form.getRawValue();
    const payload: Partial<ContentItem> = {
      title: raw.title ?? '',
      category: (raw.category ?? 'fashion') as ContentItem['category'],
      status: (raw.status ?? 'draft') as ContentItem['status'],
      author: raw.author ?? '',
      publishDate: raw.publishDate ?? '',
      summary: raw.summary ?? '',
      readTime: raw.readTime ?? '5 min',
      heroGradient: raw.heroGradient ?? '',
      editorNotes: raw.editorNotes ?? '',
      channels: (raw.channels ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      sectionHighlights: (raw.sectionsText ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [heading, ...rest] = line.split(':');
          return { heading: heading.trim(), body: rest.join(':').trim() };
        }),
      commerceLinks: (raw.commerceText ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [label, retailer, price] = line.split('|').map((part) => part.trim());
          return { label, retailer, price, url: '#' };
        }),
      seo: {
        title: raw.seoTitle ?? '',
        description: raw.seoDescription ?? '',
        keywords: (raw.seoKeywords ?? '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      },
    };

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
