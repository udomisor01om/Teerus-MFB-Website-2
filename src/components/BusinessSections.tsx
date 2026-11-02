import { T } from "@/i18n/Language";
import heroCTA from "./HeroCTA.module.css";
import Image from "next/image";
import { Header, Download, BankingLink } from "./Controls";
import { BrandPill, DiscoverPrompt } from "./HeroDetails";
import { Trust } from "./Site";
import { BusinessArtwork } from "./BusinessArtwork";
import { businessAccounts, loans } from "@/content/marketing";
import shared from "./Site.module.css";
import s from "./Business.module.css";

export function BusinessIntro() {
  return (
    <div className={`${shared.intro} ${shared.homeIntro}`}>
      <Header />
      <section className={s.hero} aria-labelledby="business-title">
        <BusinessArtwork />
        <div className={s.copy}>
          <BrandPill label="TEERUS FOR MSMES" tone="light" />
          <h1 id="business-title">
            <T>{"Banking that works for your business."}</T>
          </h1>
          <p className={s.description}>
            <T>
              {
                "Open a business account, get working capital and grow with banking built for small & medium businesses. "
              }
            </T>
          </p>
          <div className={`${s.actions} ${heroCTA.actions}`}>
            <Download label="Download Teerus App" />
            <BankingLink destination="start" variant="outlined">
              <T>{"Start without Downloading "}</T>
            </BankingLink>
          </div>
          <DiscoverPrompt tone="light" className={s.discover} />
        </div>
      </section>
      <Trust />
    </div>
  );
}
export function BusinessAccounts() {
  return (
    <section className={s.accounts} aria-labelledby="business-accounts-title">
      <div className={s.sectionHeader}>
        <div>
          <h2 id="business-accounts-title">
            <T>{"Business accounts that keep up with "}</T>
            <em>
              <T>{"you."}</T>
            </em>
          </h2>
          <p className={s.supporting}>
            <T>
              {
                "Paid monthly or earning daily, there is a Teerus account for you. "
              }
            </T>
          </p>
        </div>
        <Download label="Download Teerus App" />
      </div>
      <div className={s.accountGrid}>
        {businessAccounts.map((account, index) => (
          <article className={s.accountCard} key={account.name}>
            <div className={s.accountText}>
              <span className={s.number}>
                <span>0{index + 1}</span>
              </span>
              <div>
                <h3>
                  <T>{account.name}</T>
                </h3>
                <p>
                  <T>{account.description}</T>
                </p>
              </div>
            </div>
            <div className={`${s.accountArt} ${s[`accountArt${index}`]}`}>
              <Image
                src={`/assets/${account.image.replace(".png", "-sme.webp")}`}
                alt=""
                width={index === 1 || index === 2 ? 538 : 900}
                height={
                  index === 1 || index === 2 ? 560 : index === 0 ? 600 : 596
                }
                unoptimized
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function BusinessCapital() {
  return (
    <section className={s.capital} aria-labelledby="capital-title">
      <div className={s.sectionHeader}>
        <div>
          <h2 id="capital-title">
            <T>{"Capital for the day you need it."}</T>
          </h2>
          <p className={s.supporting}>
            <T>
              {
                "Paid monthly or earning daily, there is a Teerus account for you. "
              }
            </T>
          </p>
        </div>
        <BankingLink destination="start" variant="dark" className={s.apply}>
          <T>{"Apply for loan "}</T>
        </BankingLink>
      </div>
      <div className={s.capitalGrid}>
        {[loans[1], loans[5], loans[3]].map((loan, index) => (
          <article key={loan.name}>
            <span className={`${s.moneyIcon} ${s[`money${index}`]}`}>
              <Image
                src={`/assets/sme-money-${["green", "orange", "purple"][index]}.svg`}
                alt=""
                width={16}
                height={16}
              />
            </span>
            <div>
              <h3>
                <T>{loan.name}</T>
              </h3>
              <p>
                <T>
                  {index < 2
                    ? "Working capital to keep your business running. Buy stock, pay suppliers and cover daily costs with ease."
                    : loan.description}
                </T>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function BusinessSavings() {
  return (
    <section className={s.savings} aria-labelledby="savings-title">
      <div className={s.savingsCopy}>
        <h2 id="savings-title">
          <T>{"Save for growth. "}</T>
          <br />
          <T>{"Bank your "}</T>
          <em>
            <T>{"way."}</T>
          </em>
        </h2>
        <div className={s.deposit}>
          <strong>
            <T>{"9% to 18% a year."}</T>
          </strong>
          <div>
            <h3>
              <T>{"Fixed deposits:"}</T>
            </h3>
            <p>
              <T>
                {
                  "Earn competitive returns on NDIC insured savings. Choose short or long tenures to fit your plans. "
                }
              </T>
            </p>
          </div>
        </div>
        <p className={s.startSteps}>
          <T>
            {"Start in 3 steps: 1 Get the app. 2 Sign up. 3 Start banking. "}
          </T>
        </p>
      </div>
      <div className={s.savingsPhoto}>
        <Image
          src="/assets/images/hand-holding-teerus-app.webp"
          alt="Using the Teerus app on a phone"
          fill
          unoptimized
          sizes="(max-width: 800px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
