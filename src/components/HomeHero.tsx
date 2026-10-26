import Image from "next/image";
import { Download, BankingLink } from "./Controls";
import { HeroPeople } from "./HeroPeople";
import { BrandPill, DiscoverPrompt } from "./HeroDetails";
import s from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.art} aria-hidden="true">
        <div className={s.market}>
          <Image
            src="/assets/images/Market Scene.jpg"
            alt=""
            fill
            unoptimized
            preload
          />
        </div>
        <div className={s.upperShape}>
          <Image
            src="/assets/hero-brand-shape.svg"
            width={191.705}
            height={161.004}
            alt=""
          />
        </div>
        <div className={s.lowerShape}>
          <Image
            src="/assets/images/Decorative Shape.svg"
            width={198}
            height={112}
            alt=""
          />
        </div>
        <HeroPeople />
      </div>
      <div className={s.copy}>
        <BrandPill label="Local bank with wings" />
        <h1 id="hero-title">
          Banking that gives
          <br className={s.desktopBreak} /> your dreams wings.
        </h1>
        <p className={s.description}>
          Save, borrow and manage everyday transactions with a bank that knows
          your market.
        </p>
        <div className={s.actions}>
          <Download label="Download Teerus App" />
          <BankingLink variant="outlined" destination="start">
            <span>Start without Downloading</span>
          </BankingLink>
        </div>
        <DiscoverPrompt />
      </div>
    </section>
  );
}
