import heroCTA from "./HeroCTA.module.css";
import { BrandPill, DiscoverPrompt } from "./HeroDetails";
import { Download, BankingLink } from "./Controls";
import { IndividualsArtwork } from "./IndividualsArtwork";
import s from "./Individuals.module.css";
export function IndividualsHero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <IndividualsArtwork />
      <div className={s.copy}>
        <BrandPill label="TEERUS FOR INDIVIDUALS" tone="light" />
        <h1 id="hero-title">Save smart. Borrow fast. Spend easy.</h1>
        <p className={s.description}>
          Secure, smart and simple banking for everyday life. Everyday accounts,
          savings that grow and quick cash when you need it, with no hidden fees
          and instant transactions.
        </p>
        <div className={`${s.actions} ${heroCTA.actions}`}>
          <Download label="Download Teerus App" />
          <BankingLink destination="start" variant="outlined">
            Start without Downloading
          </BankingLink>
        </div>
        <DiscoverPrompt tone="light" className={s.discover} />
      </div>
    </section>
  );
}
