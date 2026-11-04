import { Component, inject, computed } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  imports: [],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly state = inject(AppStateService);
  protected readonly t = computed(() => this.state.t());

  navigate(section: 'home' | 'palettes' | 'favorites' | 'settings'): void {
    this.state.activeSection.set(section);
  }

  isActive(section: string): boolean {
    return this.state.activeSection() === section;
  }
}
