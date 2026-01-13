import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [AsyncPipe, NgIf, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  experimentalEnabled = localStorage.getItem('slx_experimental') === 'true';

  constructor(public auth: AuthService, private theme: ThemeService) {}

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  toggleExperimental(): void {
    this.experimentalEnabled = !this.experimentalEnabled;
    localStorage.setItem('slx_experimental', String(this.experimentalEnabled));
  }
}
