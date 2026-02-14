/**
 * i18n index – Language context provider and translation hook
 * Supports English (en), French (fr), Malagasy (mg)
 * Persists selected language in localStorage (web) or AsyncStorage (native)
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import en from './en';
import fr from './fr';
import mg from './mg';

const translations = { en, fr, mg };

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'mg', label: 'Malagasy', flag: '🇲🇬' },
];

const LanguageContext = createContext();

const STORAGE_KEY = 'kingdom_unix_lang';
const LANG_FILE = (FileSystem.documentDirectory || '') + 'language.txt';

// ── Persistence helpers ──

async function loadLanguage() {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    }
    const info = await FileSystem.getInfoAsync(LANG_FILE);
    if (info.exists) {
      const val = await FileSystem.readAsStringAsync(LANG_FILE);
      return val || 'en';
    }
    return 'en';
  } catch {
    return 'en';
  }
}

async function saveLanguage(lang) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, lang);
      return;
    }
    await FileSystem.writeAsStringAsync(LANG_FILE, lang);
  } catch {
    // silently ignore
  }
}

// ── Provider ──

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadLanguage().then((lang) => {
      if (translations[lang]) setLanguageState(lang);
      setReady(true);
    });
  }, []);

  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      saveLanguage(lang);
    }
  }, []);

  /**
   * Translation function.
   * Usage: t('home.welcomeBack', { name: 'MaZik' })
   * Supports dot-notation keys and {{param}} interpolation.
   */
  const t = useCallback(
    (key, params) => {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        if (value == null) break;
        value = value[k];
      }

      // Fallback to English
      if (value == null) {
        value = translations.en;
        for (const k of keys) {
          if (value == null) break;
          value = value[k];
        }
      }

      if (typeof value !== 'string') return key;

      // Interpolate {{param}} placeholders
      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (_, p) =>
          params[p] != null ? String(params[p]) : `{{${p}}}`,
        );
      }

      return value;
    },
    [language],
  );

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ──

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
