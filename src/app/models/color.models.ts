export type ColorFormat = 'HEX' | 'RGB' | 'HSL';

export type PaletteType =
  | 'random'
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic';

export interface PaletteColor {
  hex: string;
  locked: boolean;
}

export interface SavedPalette {
  id: string;
  colors: string[];
  name: string;
  savedAt: number;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'mr';
  paletteType: PaletteType;
}
