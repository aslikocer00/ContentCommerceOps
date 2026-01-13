import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ShellComponent } from './shared/layout/shell.component';
import { LoginComponent } from './features/auth/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./features/content/content.routes').then((m) => m.CONTENT_ROUTES),
      },
      {
        path: 'newsletter',
        loadChildren: () =>
          import('./features/newsletter/newsletter.routes').then((m) => m.NEWSLETTER_ROUTES),
      },
      {
        path: 'vouchers',
        loadChildren: () =>
          import('./features/vouchers/vouchers.routes').then((m) => m.VOUCHER_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['Admin', 'Commerce'] },
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./features/analytics/analytics.routes').then((m) => m.ANALYTICS_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
