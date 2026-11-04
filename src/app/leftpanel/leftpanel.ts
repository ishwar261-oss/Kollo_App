import { Component, inject, computed } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { ColorService } from '../services/color.service';

@Component({
  imports: [],
  selector: 'app-leftpanel',
  styleUrl: './leftpanel.css',
  templateUrl: './leftpanel.html',
})
export class Leftpanel {
  protected readonly state = inject(AppStateService);
  protected readonly colorSvc = inject(ColorService);
  protected readonly t = computed(() => this.state.t());

  protected readonly currentColor = this.state.currentColor;

  protected readonly rgbString = computed(() => {
    const rgb = this.colorSvc.hexToRgb(this.state.currentColor());
    if (!rgb) return '—';
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  });

  protected readonly hslString = computed(() => {
    const rgb = this.colorSvc.hexToRgb(this.state.currentColor());
    if (!rgb) return '—';
    const hsl = this.colorSvc.rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
  });

  addToFavorites(): void {
    const colors = this.state.palette().map(c => c.hex);
    const result = this.state.savePalette(colors);
    if (result === 'saved') {
      this.state.showToast(this.t()['palette_saved']);
    } else {
      this.state.showToast(this.t()['already_saved']);
    }
  }

  generatePalette(): void {
    this.state.activeSection.set('palettes');
  }

  viewFavorites(): void {
    this.state.activeSection.set('favorites');
  }

  toggleTheme(): void {
    this.state.toggleTheme();
  }
}
