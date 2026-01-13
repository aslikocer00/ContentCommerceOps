import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { ContentItem } from '../../core/models';

@Component({
  selector: 'app-newsletter-builder',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './newsletter-builder.component.html',
  styleUrl: './newsletter-builder.component.scss',
})
export class NewsletterBuilderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  contentOptions: ContentItem[] = [];

  form = this.fb.group({
    subject: ['', [Validators.required, Validators.minLength(6)]],
    heroContentId: ['', Validators.required],
    blocks: this.fb.array([
      this.buildBlock(),
      this.buildBlock(),
    ]),
  });

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api
      .getContent({ page: 1, pageSize: 12, sort: 'publishDate:desc' })
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => (this.contentOptions = items));
  }

  get blocks(): FormArray {
    return this.form.controls.blocks as FormArray;
  }

  addBlock(): void {
    this.blocks.push(this.buildBlock());
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.api
      .createNewsletter({
        ...this.form.getRawValue(),
        status: 'scheduled',
        sendDate: new Date().toISOString(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/newsletter']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildBlock() {
    return this.fb.group({
      title: ['', Validators.required],
      contentId: ['', Validators.required],
    });
  }
}
