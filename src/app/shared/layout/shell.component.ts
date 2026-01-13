import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';
import { LoadingBarComponent } from '../components/loading-bar.component';
import { ToastComponent } from '../components/toast.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    LoadingBarComponent,
    ToastComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  isCollapsed = false;

  navItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Content Planner', route: '/content' },
    { label: 'Newsletter', route: '/newsletter' },
    { label: 'Vouchers & Affiliate', route: '/vouchers' },
    { label: 'Analytics', route: '/analytics' },
    { label: 'Settings', route: '/settings' },
  ];

  constructor(public auth: AuthService, private theme: ThemeService, private router: Router) {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
