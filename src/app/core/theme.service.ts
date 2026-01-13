import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'slx_theme';

  initTheme(): void {
    const stored = localStorage.getItem(this.key) ?? 'light';
    this.applyTheme(stored);
  }

  toggleTheme(): void {
    const next = document.documentElement.dataset['theme'] === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  applyTheme(theme: string): void {
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem(this.key, theme);
  }
}
