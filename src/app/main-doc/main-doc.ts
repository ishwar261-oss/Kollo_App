import { Component, inject, computed, signal } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { ColorService } from '../services/color.service';
import { PaletteType, SavedPalette } from '../models/color.models';
import { LangKey } from '../i18n/translations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-main-doc',
  styleUrl: './main-doc.css',
  templateUrl: './main-doc.html',
})
export class MainDoc {
  protected readonly state = inject(AppStateService);
  protected readonly colorSvc = inject(ColorService);

  // ─── Computed from state ───────────────────────────────────────────────────
  protected readonly t = computed(() => this.state.t());
  protected readonly currentColor = this.state.currentColor;
  protected readonly palette = this.state.palette;
  protected readonly savedPalettes = this.state.savedPalettes;
  protected readonly activeSection = this.state.activeSection;
  protected readonly paletteType = this.state.paletteType;
  protected readonly theme = this.state.theme;

  // ─── Local UI state ────────────────────────────────────────────────────────
  readonly formats: Array<'HEX' | 'RGB' | 'HSL'> = ['HEX', 'RGB', 'HSL'];
  selectedFormat = signal<'HEX' | 'RGB' | 'HSL'>('HEX');
  copiedMessage = signal<string>('');

  readonly paletteTypes: Array<{ value: PaletteType; labelKey: LangKey }> = [
    { value: 'random',         labelKey: 'palette_random' },
    { value: 'monochromatic',  labelKey: 'palette_mono' },
    { value: 'analogous',      labelKey: 'palette_analogous' },
    { value: 'complementary',  labelKey: 'palette_complementary' },
    { value: 'triadic',        labelKey: 'palette_triadic' },
  ];

  // ─── Computed display value ────────────────────────────────────────────────
  readonly currentColorValue = computed(() =>
    this.colorSvc.formatColor(this.currentColor(), this.selectedFormat())
  );

  // ─── Format selection ──────────────────────────────────────────────────────
  setFormat(format: 'HEX' | 'RGB' | 'HSL'): void {
    this.selectedFormat.set(format);
  }

  // ─── Color generation ──────────────────────────────────────────────────────
  randomColor(): void {
    const hex = this.colorSvc.randomHex();
    this.state.currentColor.set(hex);
  }

  selectColor(hex: string): void {
    this.state.currentColor.set(hex);
  }

  // ─── Palette generation ────────────────────────────────────────────────────
  generatePalette(): void {
    const locked = this.palette().map(c => (c.locked ? c.hex : null));
    const newHexes = this.colorSvc.generatePalette(this.paletteType(), locked);
    this.state.palette.set(
      newHexes.map((hex, i) => ({
        hex,
        locked: this.palette()[i].locked,
      }))
    );
    // Set current color to first unlocked generated color
    const first = this.state.palette().find(c => !c.locked);
    if (first) this.state.currentColor.set(first.hex);
    this.state.showToast(this.t()['generate_palette']);
  }

  setPaletteType(type: PaletteType): void {
    this.state.setPaletteType(type);
  }

  toggleLock(index: number): void {
    const updated = this.palette().map((c, i) =>
      i === index ? { ...c, locked: !c.locked } : c
    );
    this.state.palette.set(updated);
  }

  // ─── Clipboard ────────────────────────────────────────────────────────────
  async copyCurrentColor(): Promise<void> {
    await this._copyText(this.currentColorValue());
  }

  async copyColor(hex: string): Promise<void> {
    await this._copyText(hex);
  }

  async copyAllPalette(): Promise<void> {
    const all = this.palette().map(c => c.hex).join(', ');
    await this._copyText(all);
  }

  private async _copyText(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedMessage.set(`${this.t()['copied']} ${value}`);
      setTimeout(() => this.copiedMessage.set(''), 2000);
    } catch {
      this.copiedMessage.set(this.t()['copy_failed']);
      setTimeout(() => this.copiedMessage.set(''), 3000);
    }
  }

  // ─── Save / Favorites ─────────────────────────────────────────────────────
  savePalette(): void {
    const colors = this.palette().map(c => c.hex);
    const result = this.state.savePalette(colors);
    if (result === 'saved') {
      this.state.showToast(this.t()['palette_saved']);
    } else {
      this.state.showToast(this.t()['already_saved']);
    }
  }

  removeSaved(id: string): void {
    this.state.removeSavedPalette(id);
  }

  restorePalette(saved: SavedPalette): void {
    this.state.palette.set(
      saved.colors.map(hex => ({ hex, locked: false }))
    );
    this.state.currentColor.set(saved.colors[0]);
    this.state.activeSection.set('home');
    this.state.showToast(this.t()['palette_loaded']);
  }

  // ─── Settings ─────────────────────────────────────────────────────────────
  setTheme(theme: 'light' | 'dark'): void {
    this.state.setTheme(theme);
  }

  resetSettings(): void {
    this.state.resetSettings();
  }

  // ─── Navigate to favorites via View All ───────────────────────────────────
  viewFavorites(): void {
    this.state.activeSection.set('favorites');
  }

  // ─── Color for text contrast ──────────────────────────────────────────────
  textColorFor(hex: string): string {
    return this.colorSvc.isLight(hex) ? '#1e293b' : '#f8fafc';
  }
}