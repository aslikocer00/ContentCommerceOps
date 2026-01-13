import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { AppStateService } from '../../core/app-state.service';
import { Voucher } from '../../core/models';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, DatePipe, DecimalPipe, RouterLink, StatusBadgeComponent],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss',
})
export class VouchersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  vouchers: Voucher[] = [];

  filters = this.fb.group({
    merchant: [''],
    active: ['true'],
    sort: ['expiryDate:asc'],
  });

  constructor(
    private api: ApiService,
    private state: AppStateService,
    private fb: FormBuilder
  ) {}

  get totalClicks(): number {
    return this.vouchers.reduce((acc, v) => acc + v.clicks, 0);
  }

  get totalConversions(): number {
    return this.vouchers.reduce((acc, v) => acc + v.conversions, 0);
  }

  get totalRevenue(): number {
    return this.vouchers.reduce((acc, v) => acc + v.revenue, 0);
  }

  ngOnInit(): void {
    this.filters.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.state.updateVoucherTableState({
        sort: value.sort ?? 'expiryDate:asc',
        filters: {
          merchant: value.merchant ?? '',
          active: value.active === 'true',
        },
      });
    });

    this.state.voucherTableState$
      .pipe(
        switchMap((table) =>
          this.api.getVouchers({
            ...table.filters,
            page: table.page,
            pageSize: table.pageSize,
            sort: table.sort,
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((vouchers) => (this.vouchers = vouchers));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
