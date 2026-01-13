import { Routes } from '@angular/router';
import { VouchersComponent } from './vouchers.component';
import { VoucherFormComponent } from './voucher-form.component';

export const VOUCHER_ROUTES: Routes = [
  { path: '', component: VouchersComponent },
  { path: 'new', component: VoucherFormComponent },
  { path: ':id/edit', component: VoucherFormComponent },
];
