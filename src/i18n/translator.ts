import type { Locale, Messages, TranslationParams } from "./types";
import { en } from "./locales/en";
import { tr } from "./locales/tr";

const catalogs: Record<Locale, Messages> = { en, tr };

function resolve(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function createTranslator(locale: Locale) {
  const messages = catalogs[locale] ?? en;

  function t(key: string, params?: TranslationParams): string {
    const value = resolve(messages, key);
    if (typeof value !== "string") return key;
    if (!params) return value;
    return value.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
      params[k] !== undefined ? String(params[k]) : `{{${k}}}`,
    );
  }

  return { t, locale, messages };
}

export type Translator = ReturnType<typeof createTranslator>;
