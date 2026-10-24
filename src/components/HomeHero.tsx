import Image from "next/image";
import { Download, BankingLink } from "./Controls";
import { HeroPeople } from "./HeroPeople";
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
        <div className={s.wash} />
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
        <p className={s.label}>
          <Image
            src="/assets/images/Bird Icon.svg"
            width={49}
            height={28}
            alt=""
          />
          <span>Local bank with wings</span>
        </p>
        <h1 id="hero-title">
          Banking that gives
          <br className={s.desktopBreak} /> your dreams wings.
        </h1>
        <p className={s.description}>
          Save, borrow and manage everyday transactions with a bank that knows
          your market. <em>Ẹ káàbọ̀.</em>
        </p>
        <div className={s.actions}>
          <Download label="Download Teerus App" className={s.primary} />
          <BankingLink className={s.secondary} destination="start">
            <span>Start without Downloading</span>
          </BankingLink>
        </div>
        <div className={s.discover}>
          <span className={s.scrollIcon} aria-hidden="true">
            <Image
              src="/assets/images/Icons/outline/arrow-square-down.png"
              width={16}
              height={16}
              alt=""
              unoptimized
            />
          </span>
          <span className={s.discoverText}>Discover How We Can Help You!</span>
        </div>
      </div>
    </section>
  );
}
