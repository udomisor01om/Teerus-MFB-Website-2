export const languageNames = {
  en: "English",
  yo: "Yorùbá",
  ha: "Hausa",
  ig: "Igbo",
} as const;
export type Language = keyof typeof languageNames;
export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && Object.hasOwn(languageNames, value);
}
// One switch restores English-only mode, including for returning visitors.
export const translationsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_TRANSLATIONS === "true" ||
  (process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_ENABLE_TRANSLATIONS !== "false");
