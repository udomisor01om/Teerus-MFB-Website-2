import { T } from "@/i18n/Language";
import heroCTA from "./HeroCTA.module.css";
import Image from "next/image";
import { Download, BankingLink } from "./Controls";
import { HeroPeople } from "./HeroPeople";
import { BrandPill, DiscoverPrompt } from "./HeroDetails";
import s from "./HomeHero.module.css";

export type HeroCopy = {
  badge: string;
  title: string;
  description: string;
  download: string;
  start: string;
  discover: string;
};
export function HomeHero({ copy }: { copy?: HeroCopy } = {}) {
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
        <BrandPill label={copy?.badge ?? "Local bank with wings"} />
        <h1 id="hero-title">
          {copy ? (
            copy.title
          ) : (
            <>
              <T>{"Banking that gives "}</T>
              <br className={s.desktopBreak} />
              <T>{" your dreams wings. "}</T>
            </>
          )}
        </h1>
        <p className={s.description}>
          <T>
            {copy?.description ??
              "Save, borrow and manage everyday transactions with a bank that knows your market."}
          </T>
        </p>
        <div className={`${s.actions} ${heroCTA.actions}`}>
          <Download label={copy?.download ?? "Download Teerus App"} />
          <BankingLink variant="outlined" destination="start">
            <span>
              <T>{copy?.start ?? "Start without Downloading"}</T>
            </span>
          </BankingLink>
        </div>
        <DiscoverPrompt label={copy?.discover} />
      </div>
    </section>
  );
}
