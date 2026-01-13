import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Voucher } from '../../core/models';

@Component({
  selector: 'app-voucher-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './voucher-form.component.html',
  styleUrl: './voucher-form.component.scss',
})
export class VoucherFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  voucherId?: string;

  form = this.fb.group({
    merchant: ['', Validators.required],
    code: ['', Validators.required],
    active: [true],
    expiryDate: ['', [Validators.required, this.futureDateValidator]],
    clicks: [0],
    conversions: [0],
    revenue: [0],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.voucherId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.voucherId) {
      this.api
        .getVouchers({ page: 1, pageSize: 20, sort: 'expiryDate:asc' })
        .pipe(takeUntil(this.destroy$))
        .subscribe((vouchers) => {
          const match = vouchers.find((voucher) => voucher.id === this.voucherId);
          if (match) {
            this.form.patchValue({
              ...match,
              expiryDate: new Date(match.expiryDate).toISOString().slice(0, 10),
            });
          }
        });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as Partial<Voucher>;
    const request = this.voucherId
      ? this.api.updateVoucher(this.voucherId, payload)
      : this.api.createVoucher(payload);

    request.pipe(takeUntil(this.destroy$)).subscribe(() => this.router.navigate(['/vouchers']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const date = new Date(value);
    if (date.getTime() <= Date.now()) {
      return { expiryDate: true };
    }
    return null;
  }
}
