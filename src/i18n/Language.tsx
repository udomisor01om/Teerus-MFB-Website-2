"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useId,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  isLanguage,
  languageNames,
  translationsEnabled,
  type Language,
} from "./config";
import { translate } from "./translate";
import s from "./Language.module.css";
type LanguageContext = {
  language: Language;
  enabled: boolean;
  setLanguage: (value: Language) => void;
};
const Context = createContext<LanguageContext>({
  language: "en",
  enabled: false,
  setLanguage: () => {},
});
let sessionLanguage: Language = "en";
function snapshot(): Language {
  if (!translationsEnabled) return "en";
  try {
    const saved = localStorage.getItem("teerus-language");
    return isLanguage(saved) ? saved : sessionLanguage;
  } catch {
    return sessionLanguage;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("teerus-language-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("teerus-language-change", callback);
    window.removeEventListener("storage", callback);
  };
}
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "en" as Language,
  );
  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en-NG" : language;
  }, [language]);
  const select = (value: Language) => {
    if (!translationsEnabled) return;
    sessionLanguage = value;
    try {
      localStorage.setItem("teerus-language", value);
    } catch {
      /* Selection still works in this session. */
    }
    window.dispatchEvent(new Event("teerus-language-change"));
  };
  return (
    <Context.Provider
      value={{ language, enabled: translationsEnabled, setLanguage: select }}
    >
      {children}
    </Context.Provider>
  );
}
export function useLanguage() {
  return useContext(Context);
}
export function T({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <>
      {typeof children === "string" ? translate(children, language) : children}
    </>
  );
}
export function LanguageSelector() {
  const { language, enabled, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  if (!enabled) return null;
  return (
    <div
      className={s.selector}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        type="button"
        ref={trigger}
        className={s.trigger}
        aria-label={`Language / Èdè / Harshe / Asụsụ: ${languageNames[language]}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        <span lang={language}>{languageNames[language]}</span>
        <svg
          className={s.chevron}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          id={id}
          className={s.dropdown}
          role="group"
          aria-label="Language / Èdè / Harshe / Asụsụ"
        >
          {Object.entries(languageNames).map(([code, name]) => (
            <button
              type="button"
              key={code}
              lang={code}
              className={s.option}
              aria-pressed={language === code}
              onClick={() => {
                if (isLanguage(code)) setLanguage(code);
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <span>{name}</span>
              {language === code && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export function OriginalLanguageNotice({
  kind,
}: {
  kind: "article" | "legal" | "biography";
}) {
  const { language } = useLanguage();
  if (language === "en") return null;
  const text =
    kind === "article"
      ? "Articles are shown in their original language."
      : kind === "legal"
        ? "This legal document is currently available in English."
        : "This biography is currently available in English.";
  return (
    <p className={s.notice}>
      <T>{text}</T>
    </p>
  );
}

export function useText() {
  const { language } = useLanguage();
  return (text: string) => translate(text, language);
}
