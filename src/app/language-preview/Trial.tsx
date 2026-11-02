"use client";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Controls";
import { HomeHero } from "@/components/HomeHero";
import { Trust } from "@/components/Trust";
import { languages, type Language } from "./copy";
import site from "@/components/Site.module.css";
import s from "./Trial.module.css";
export function Trial() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = languages[language];
  return (
    <main id="main-content" className={s.trial}>
      <aside className={s.toolbar} aria-label="Local language trial">
        <div>
          <strong>Language preview · local only</strong>
          <p>
            Draft translations: navigation, hero and trust cards. Links and the
            download modal open existing English content.
          </p>
        </div>
        <label>
          Language / Èdè / Harshe / Asụsụ
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            {Object.entries(languages).map(([code, item]) => (
              <option key={code} value={code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <Link href="/">Back to original website</Link>
      </aside>
      <div
        lang={language}
        className={`${site.intro} ${site.homeIntro} ${language === "en" ? "" : s.translated}`}
      >
        <Header labels={copy} />
        <HomeHero copy={language === "en" ? undefined : copy} />
        <Trust copy={copy} />
      </div>
      <p className={s.note} role="status">
        {copy.name} selected. These translations need fluent-speaker review
        before release. Nothing has been published.
      </p>
    </main>
  );
}
