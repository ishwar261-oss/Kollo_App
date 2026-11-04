import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';
import { AppSettings, PaletteColor, PaletteType, SavedPalette } from '../models/color.models';
import { TRANSLATIONS, LangKey, Translations } from '../i18n/translations';

const STORAGE_KEYS = {
  SETTINGS: 'kollo_settings',
  SAVED_PALETTES: 'kollo_saved_palettes',
  CURRENT_COLOR: 'kollo_current_color',
  PALETTE: 'kollo_palette',
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  language: 'en',
  paletteType: 'random',
};

const DEFAULT_PALETTE: PaletteColor[] = [
  { hex: '#8B5CF6', locked: false },
  { hex: '#EC4899', locked: false },
  { hex: '#3B82F6', locked: false },
  { hex: '#10B981', locked: false },
  { hex: '#F59E0B', locked: false },
];

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly storage = inject(StorageService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _settings = signal<AppSettings>(
    this.storage.get<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  readonly theme = computed(() => this._settings().theme);
  readonly language = computed(() => this._settings().language);
  readonly paletteType = computed(() => this._settings().paletteType);

  readonly activeSection = signal<'home' | 'palettes' | 'favorites' | 'settings'>('home');

  readonly currentColor = signal<string>(
    this.storage.get<string>(STORAGE_KEYS.CURRENT_COLOR, '#8B5CF6')
  );

  readonly palette = signal<PaletteColor[]>(
    this._validatePalette(
      this.storage.get<PaletteColor[]>(STORAGE_KEYS.PALETTE, DEFAULT_PALETTE)
    )
  );

  readonly savedPalettes = signal<SavedPalette[]>(
    this.storage.get<SavedPalette[]>(STORAGE_KEYS.SAVED_PALETTES, [])
  );

  readonly toastMessage = signal<string>('');
  private _toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly t = computed<Translations>(() => TRANSLATIONS[this.language()]);

  tr(key: LangKey): string {
    return this.t()[key];
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._applyTheme(this.theme());

      effect(() => {
        const s = this._settings();
        this.storage.set(STORAGE_KEYS.SETTINGS, s);
        this._applyTheme(s.theme);
      });

      effect(() => {
        this.storage.set(STORAGE_KEYS.CURRENT_COLOR, this.currentColor());
      });

      effect(() => {
        this.storage.set(STORAGE_KEYS.PALETTE, this.palette());
      });

      effect(() => {
        this.storage.set(STORAGE_KEYS.SAVED_PALETTES, this.savedPalettes());
      });
    }
  }

  setTheme(theme: 'light' | 'dark'): void {
    this._settings.update(s => ({ ...s, theme }));
  }

  toggleTheme(): void {
    this._settings.update(s => ({
      ...s,
      theme: s.theme === 'light' ? 'dark' : 'light',
    }));
  }

  setLanguage(lang: 'en' | 'mr'): void {
    this._settings.update(s => ({ ...s, language: lang }));
  }

  setPaletteType(paletteType: PaletteType): void {
    this._settings.update(s => ({ ...s, paletteType }));
  }

  resetSettings(): void {
    this._settings.set({ ...DEFAULT_SETTINGS });
  }

  savePalette(colors: string[], name?: string): 'saved' | 'duplicate' {
    const hexKey = colors.join('|');
    const existing = this.savedPalettes().find(p => p.colors.join('|') === hexKey);
    if (existing) return 'duplicate';

    const entry: SavedPalette = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      colors,
      name: name ?? this._generatePaletteName(),
      savedAt: Date.now(),
    };
    this.savedPalettes.update(list => [entry, ...list]);
    return 'saved';
  }

  removeSavedPalette(id: string): void {
    this.savedPalettes.update(list => list.filter(p => p.id !== id));
  }

  showToast(message: string, durationMs = 2000): void {
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this.toastMessage.set(message);
    this._toastTimer = setTimeout(() => {
      this.toastMessage.set('');
      this._toastTimer = null;
    }, durationMs);
  }

  private _applyTheme(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.setAttribute('data-theme', theme);
  }

  private _validatePalette(raw: PaletteColor[]): PaletteColor[] {
    if (!Array.isArray(raw) || raw.length !== 5) return [...DEFAULT_PALETTE];
    const valid = raw.every(
      c => typeof c === 'object' && typeof c.hex === 'string' && typeof c.locked === 'boolean'
    );
    return valid ? raw : [...DEFAULT_PALETTE];
  }

  private _generatePaletteName(): string {
    const adjectives = ['Cosmic', 'Ocean', 'Forest', 'Sunset', 'Pastel', 'Neon', 'Misty', 'Vivid', 'Dreamy', 'Vintage'];
    const nouns = ['Vibes', 'Mood', 'Dream', 'Glow', 'Palette', 'Harmony', 'Blend', 'Hue', 'Tones', 'Mix'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  }
}
