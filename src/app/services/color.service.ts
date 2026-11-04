import { Injectable } from '@angular/core';
import { PaletteType } from '../models/color.models';

@Injectable({ providedIn: 'root' })
export class ColorService {

  randomHex(): string {
    return (
      '#' +
      Math.floor(Math.random() * 0x1000000)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    );
  }

  randomHue(): number {
    return Math.floor(Math.random() * 360);
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const clean = hex.replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) =>
      Math.max(0, Math.min(255, Math.round(n)))
        .toString(16)
        .padStart(2, '0')
        .toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = this.hslToRgbObj(h, s, l);
    return this.rgbToHex(r, g, b);
  }

  hslToRgbObj(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const sn = s / 100;
    const ln = l / 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = sn * Math.min(ln, 1 - ln);
    const f = (n: number) =>
      ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  }

  rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  hexToRgbString(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  hexToHslString(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  formatColor(hex: string, format: 'HEX' | 'RGB' | 'HSL'): string {
    if (format === 'RGB') return this.hexToRgbString(hex);
    if (format === 'HSL') return this.hexToHslString(hex);
    return hex;
  }

  generatePalette(type: PaletteType, lockedColors: (string | null)[]): string[] {
    const count = 5;
    switch (type) {
      case 'monochromatic': return this._generateMonochromatic(lockedColors, count);
      case 'analogous':     return this._generateAnalogous(lockedColors, count);
      case 'complementary': return this._generateComplementary(lockedColors, count);
      case 'triadic':       return this._generateTriadic(lockedColors, count);
      default:              return this._generateRandom(lockedColors, count);
    }
  }

  private _generateRandom(locked: (string | null)[], count: number): string[] {
    return Array.from({ length: count }, (_, i) =>
      locked[i] !== null ? locked[i]! : this.randomHex()
    );
  }

  private _generateMonochromatic(locked: (string | null)[], count: number): string[] {
    const baseH = this.randomHue();
    const baseS = 60 + Math.floor(Math.random() * 20);
    const lightSteps = [20, 35, 50, 65, 80];
    return Array.from({ length: count }, (_, i) =>
      locked[i] !== null ? locked[i]! : this.hslToHex(baseH, baseS, lightSteps[i])
    );
  }

  private _generateAnalogous(locked: (string | null)[], count: number): string[] {
    const baseH = this.randomHue();
    const offsets = [-30, -15, 0, 15, 30];
    return Array.from({ length: count }, (_, i) => {
      if (locked[i] !== null) return locked[i]!;
      const h = (baseH + offsets[i] + 360) % 360;
      const s = 55 + Math.floor(Math.random() * 20);
      const l = 45 + Math.floor(Math.random() * 20);
      return this.hslToHex(h, s, l);
    });
  }

  private _generateComplementary(locked: (string | null)[], count: number): string[] {
    const baseH = this.randomHue();
    const compH = (baseH + 180) % 360;
    const hues = [baseH, baseH, compH, compH, (baseH + 90) % 360];
    const lightness = [40, 60, 40, 60, 55];
    return Array.from({ length: count }, (_, i) => {
      if (locked[i] !== null) return locked[i]!;
      return this.hslToHex(hues[i], 65, lightness[i]);
    });
  }

  private _generateTriadic(locked: (string | null)[], count: number): string[] {
    const baseH = this.randomHue();
    const h2 = (baseH + 120) % 360;
    const h3 = (baseH + 240) % 360;
    const hues = [baseH, baseH, h2, h3, h3];
    const lightness = [40, 65, 50, 40, 65];
    return Array.from({ length: count }, (_, i) => {
      if (locked[i] !== null) return locked[i]!;
      return this.hslToHex(hues[i], 60, lightness[i]);
    });
  }

  isValidHex(value: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(value.trim());
  }

  normalizeHex(input: string): string | null {
    const trimmed = input.trim();
    if (this.isValidHex(trimmed)) return trimmed.toUpperCase();
    const withHash = '#' + trimmed;
    if (this.isValidHex(withHash)) return withHash.toUpperCase();
    return null;
  }

  isLight(hex: string): boolean {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return true;
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5;
  }
}
