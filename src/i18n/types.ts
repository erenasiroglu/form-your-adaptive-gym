import type { en } from "./locales/en";

export type Locale = "en" | "tr";

export type Messages = typeof en;

export type TranslationParams = Record<string, string | number>;
