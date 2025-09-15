import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: string | undefined) {
  // Determine which language to use, falling back to the default
  const langCode = lang && lang in ui ? lang as keyof typeof ui : defaultLang;

  return function t(key: keyof typeof ui[typeof defaultLang]) {
    // Attempt to get the translation from the selected language's dictionary
    const translation = ui[langCode][key];

    // Check if the translation exists for the current language
    if (translation !== undefined) {
      return translation;
    }

    // If the translation is missing, log a warning and return the key itself as a fallback.
    console.warn(`Missing translation for key: "${key}" in language: "${langCode}"`);
    return key;
  }
}