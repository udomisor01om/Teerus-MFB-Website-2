import { languages } from "./trial-copy";
import type { Language } from "./config";
import { messages } from "./messages";
const trial: Record<string, Record<string, string>> = {};
function flatten(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object")
    return Object.values(value).flatMap(flatten);
  return [];
}
const english = flatten(languages.en);
for (const code of ["yo", "ha", "ig"] as const) {
  trial[code] = Object.fromEntries(
    english.map((text, index) => [text, flatten(languages[code])[index]]),
  );
}
export function translate(text: string, language: Language): string {
  if (language === "en") return text;
  const key = text.trim();
  const value = messages[key]?.[language] ?? trial[language]?.[key];
  return value ? text.replace(key, value) : text;
}
