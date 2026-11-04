import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../services/app-state.service';

@Component({
  imports: [FormsModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly state = inject(AppStateService);

  protected readonly isDark = computed(() => this.state.theme() === 'dark');

  protected readonly selectedLang = computed(() => this.state.language());

  toggleTheme(): void {
    this.state.toggleTheme();
  }

  onLanguageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as 'en' | 'mr';
    this.state.setLanguage(value);
  }
}
