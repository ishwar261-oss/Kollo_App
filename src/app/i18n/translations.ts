export type LangKey =
  | 'nav_home' | 'nav_palettes' | 'nav_favorites' | 'nav_settings'
  | 'welcome_to' | 'app_tagline'
  | 'copy' | 'random_color' | 'copied' | 'copy_failed'
  | 'palette_title' | 'palette_subtitle' | 'generate_palette'
  | 'lock' | 'unlock'
  | 'palette_random' | 'palette_mono' | 'palette_analogous'
  | 'palette_complementary' | 'palette_triadic'
  | 'saved_palettes' | 'saved_palettes_desc' | 'view_all'
  | 'no_saved_palettes' | 'restore' | 'delete'
  | 'save_palette' | 'palette_saved' | 'already_saved'
  | 'selected_color' | 'add_to_favorites' | 'lock_color' | 'delete_color'
  | 'quick_actions' | 'generate_palette_action' | 'view_favorites'
  | 'light_dark_mode' | 'language'
  | 'settings' | 'theme' | 'light' | 'dark' | 'reset_settings'
  | 'favorites' | 'no_favorites'
  | 'palette_loaded';

export type Translations = Record<LangKey, string>;

const en: Translations = {
  nav_home: 'Home',
  nav_palettes: 'Palettes',
  nav_favorites: 'Favorites',
  nav_settings: 'Settings',

  welcome_to: 'WELCOME TO',
  app_tagline: 'Play with colours. Create beautiful patterns. Make your ideas colourful.',

  copy: 'Copy',
  random_color: 'Random Color',
  copied: 'Copied!',
  copy_failed: 'Clipboard access failed. Please copy manually.',

  palette_title: 'Generate a Colour Palette',
  palette_subtitle: 'Create a beautiful 5-colour palette with a single click.',
  generate_palette: 'Generate Palette',

  lock: 'Lock',
  unlock: 'Unlock',

  palette_random: 'Random',
  palette_mono: 'Monochromatic',
  palette_analogous: 'Analogous',
  palette_complementary: 'Complementary',
  palette_triadic: 'Triadic',

  saved_palettes: 'Saved Palettes',
  saved_palettes_desc: 'Your favorite color palettes are saved here.',
  view_all: 'View All',
  no_saved_palettes: 'No saved palettes yet. Generate a palette and save it!',
  restore: 'Load',
  delete: 'Delete',
  save_palette: 'Save Palette',
  palette_saved: 'Palette saved to favorites!',
  already_saved: 'This palette is already saved.',

  selected_color: 'Selected Color',
  add_to_favorites: 'Add to Favorites',
  lock_color: 'Lock Color',
  delete_color: 'Delete Color',
  quick_actions: 'Quick Actions',
  generate_palette_action: 'Generate Palette',
  view_favorites: 'View Favorites',
  light_dark_mode: 'Light/Dark Mode',
  language: 'Language',

  settings: 'Settings',
  theme: 'Theme',
  light: 'Light',
  dark: 'Dark',
  reset_settings: 'Reset Settings',

  favorites: 'Favorites',
  no_favorites: 'No favorites yet.',

  palette_loaded: 'Palette loaded!',
};

const mr: Translations = {
  nav_home: 'मुखपृष्ठ',
  nav_palettes: 'पॅलेट',
  nav_favorites: 'आवडते',
  nav_settings: 'सेटिंग्स',

  welcome_to: 'आपले स्वागत आहे',
  app_tagline: 'रंगांशी खेळा. सुंदर नमुने तयार करा. आपल्या कल्पनांना रंग द्या.',

  copy: 'कॉपी करा',
  random_color: 'यादृच्छिक रंग',
  copied: 'कॉपी झाले!',
  copy_failed: 'क्लिपबोर्ड प्रवेश अयशस्वी. कृपया मॅन्युअली कॉपी करा.',

  palette_title: 'रंग पॅलेट तयार करा',
  palette_subtitle: 'एकाच क्लिकने सुंदर ५-रंगांचा पॅलेट तयार करा.',
  generate_palette: 'पॅलेट तयार करा',

  lock: 'लॉक',
  unlock: 'अनलॉक',

  palette_random: 'यादृच्छिक',
  palette_mono: 'एकरंगी',
  palette_analogous: 'सदृश',
  palette_complementary: 'पूरक',
  palette_triadic: 'त्रिकोणी',

  saved_palettes: 'जतन केलेले पॅलेट',
  saved_palettes_desc: 'तुमचे आवडते रंग पॅलेट येथे जतन आहेत.',
  view_all: 'सर्व पाहा',
  no_saved_palettes: 'अजून कोणतेही जतन केलेले पॅलेट नाहीत. पॅलेट तयार करा आणि जतन करा!',
  restore: 'लोड करा',
  delete: 'हटवा',
  save_palette: 'पॅलेट जतन करा',
  palette_saved: 'पॅलेट आवडत्यांमध्ये जतन झाला!',
  already_saved: 'हा पॅलेट आधीच जतन आहे.',

  selected_color: 'निवडलेला रंग',
  add_to_favorites: 'आवडत्यांमध्ये जोडा',
  lock_color: 'रंग लॉक करा',
  delete_color: 'रंग हटवा',
  quick_actions: 'त्वरित क्रिया',
  generate_palette_action: 'पॅलेट तयार करा',
  view_favorites: 'आवडते पाहा',
  light_dark_mode: 'प्रकाश/अंधार मोड',
  language: 'भाषा',

  settings: 'सेटिंग्स',
  theme: 'थीम',
  light: 'प्रकाश',
  dark: 'अंधार',
  reset_settings: 'सेटिंग्स रीसेट करा',

  favorites: 'आवडते',
  no_favorites: 'अजून कोणतेही आवडते नाहीत.',

  palette_loaded: 'पॅलेट लोड झाला!',
};

export const TRANSLATIONS: Record<'en' | 'mr', Translations> = { en, mr };
