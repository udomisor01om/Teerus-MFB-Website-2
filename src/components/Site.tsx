import { T } from "@/i18n/Language";
import Image from "next/image";
import { BrandSeal } from "./BrandSeal";
import { IndividualsHero } from "./IndividualsHero";
import personalStyles from "./Individuals.module.css";
import { HomeHero } from "./HomeHero";
import { PageLink as Link } from "./PageLink";
import type { ReactNode } from "react";
import {
  Header,
  Download,
  BankingLink,
  StoreLinks,
  Carousel,
} from "./Controls";
import {
  loans,
  testimonials,
  individualAccounts,
  businessAccounts,
} from "@/content/marketing";
import s from "./Site.module.css";
import { Trust } from "./Trust";

export function Picture({
  file,
  alt = "",
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  file: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={`/assets/${file}`}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      unoptimized={file.endsWith(".webp")}
      className={className}
    />
  );
}
export function Heading({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <h2 className={`${s.heading} ${centered ? s.centered : ""}`}>{children}</h2>
  );
}
export function Intro({
  kind = "home",
}: {
  kind?: "home" | "individuals" | "business";
}) {
  const personal = kind === "individuals";
  if (kind === "home")
    return (
      <div className={`${s.intro} ${s.homeIntro}`}>
        <Header />
        <HomeHero />
        <Trust />
      </div>
    );
  if (personal)
    return (
      <div className={`${s.intro} ${s.homeIntro}`}>
        <Header />
        <IndividualsHero />
        <Trust />
      </div>
    );
  return (
    <div className={s.intro}>
      <Header />
      <section className={`${s.hero} ${s[kind]}`} aria-labelledby="hero-title">
        <div className={s.heroArt} aria-hidden="true">
          <Picture file="business-market-women.png" priority />
          <Image
            className={s.heroDecoration}
            src="/assets/hero-brand-shape.svg"
            alt=""
            width="192"
            height="161"
          />
        </div>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>
            <Image src="/assets/wing-left.svg" alt="" width="28" height="20" />
            <T>{"TEERUS FOR BUSINESS "}</T>
            <Image src="/assets/wing-right.svg" alt="" width="28" height="20" />
          </p>
          <h1 id="hero-title">
            <T>{"Banking that works for your business."}</T>
          </h1>
          <p className={s.heroDescription}>
            <T>
              {
                "Open a business account, get working capital and grow with banking built for small & medium businesses. Ẹ káàbọ̀. "
              }
            </T>
          </p>
          <div className={s.actions}>
            <Download label="Download Teerus App" />
            <BankingLink destination="start" variant="outlined">
              <T>{"Start without downloading "}</T>
            </BankingLink>
          </div>
          <a className={s.discover} href="#discover">
            <T>{"Discover How We Can Help You! "}</T>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <Trust />
    </div>
  );
}
export { Trust } from "./Trust";
export { Products } from "./Products";
import { AccountCards } from "./AccountCards";
function LoanCard({
  item,
  showAudience = false,
}: {
  item: { name: string; description: string; category: string };
  showAudience?: boolean;
}) {
  const isBusiness = item.category === "business";
  return (
    <article
      className={`${s.loanCard} ${showAudience ? s.loanWithAudience : ""}`}
    >
      <div className={s.loanIcon}>
        <Image
          src={`/assets/images/${isBusiness ? "Business.png" : "Individual Illustration.png"}`}
          width={isBusiness ? 44 : 35}
          height={40}
          alt=""
          unoptimized
        />
      </div>
      <h3>
        <T>{item.name}</T>
      </h3>
      <p>
        <T>{item.description}</T>
      </p>
      {showAudience && (
        <span
          className={`${s.loanAudience} ${isBusiness ? s.businessAudience : ""}`}
        >
          <T>{isBusiness ? "Business" : "Individual"}</T>
        </span>
      )}
    </article>
  );
}
export function Loans() {
  const rows = [
    loans.slice(0, 4),
    [loans[2], { ...loans[3], name: "SME financing" }, loans[4], loans[5]],
  ];
  return (
    <section className={s.loans}>
      <Image
        className={s.loanWatermark}
        src="/assets/images/Teerus Gradient Vector.svg"
        width="683"
        height="181"
        alt=""
      />
      <div className={s.loanFade} aria-hidden="true" />
      <Heading centered>
        <T>{"Discover our top loan "}</T>
        <em>
          <T>{"services."}</T>
        </em>
      </Heading>
      <p className={`${s.description} ${s.centered}`}>
        <T>{"Fast access to capital for individuals & MSMEs. "}</T>
      </p>
      <div className={s.mobileLoans}>
        {loans.map((item, index) => (
          <LoanCard key={index} item={item} showAudience />
        ))}
      </div>
      <div className={s.motionArea}>
        {rows.map((row, r) => (
          <div className={s.loanWindow} key={r}>
            <div className={`${s.loanTrack} ${r ? s.reverse : ""}`}>
              {[0, 1, 2, 3].map((copy) => (
                <div
                  className={s.loanGroup}
                  key={copy}
                  aria-hidden={copy !== 0 ? true : undefined}
                >
                  {row.map((item, i) => (
                    <LoanCard key={i} item={item} showAudience />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Steps({ business = false }: { business?: boolean }) {
  return (
    <section className={s.steps}>
      <div className={s.stepsCopy}>
        <Heading>
          {business ? (
            <>
              <T>{"Save for growth. "}</T>
              <br />
              <T>{"Bank your "}</T>
              <em>
                <T>{"way."}</T>
              </em>
            </>
          ) : (
            <>
              <T>{"Bank the way "}</T>
              <br />
              <T>{"you "}</T>
              <em>
                <T>{"like."}</T>
              </em>
            </>
          )}
        </Heading>
        {business ? (
          <>
            <div className={s.deposit}>
              <strong>
                <T>{"9% to 18% a year"}</T>
              </strong>
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
            <p className={s.startSteps}>
              <T>{"Start in 3 steps: "}</T>
              <br />
              <T>{"1 Get the app.   2 Sign up.   3 Start banking. "}</T>
            </p>
          </>
        ) : (
          <ol className={s.stepList}>
            {[
              [
                "Get the app",
                "From Google Play or the App Store.",
                "step-download.svg",
              ],
              ["Sign up", "Verify your details in minutes.", "step-signup.svg"],
              [
                "Start banking",
                "Save, borrow, send money and pay bills.",
                "step-bank.svg",
              ],
            ].map(([title, body, icon], i) => (
              <li key={title}>
                <Image src={`/assets/${icon}`} alt="" width="48" height="48" />
                <div>
                  <span>
                    <T>{"STEP "}</T>
                    {i + 1}
                  </span>
                  <h3>
                    <T>{title}</T>
                  </h3>
                  <p>
                    <T>{body}</T>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
        <StoreLinks />
      </div>
      <div className={s.stepsPhoto}>
        <Picture
          file="images/hand-holding-teerus-app.webp"
          alt="Using the Teerus app on a phone"
        />
      </div>
      <BrandSeal />
    </section>
  );
}
export function Testimonials() {
  return (
    <section className={s.testimonials}>
      <Heading centered>
        <T>{"Our happy "}</T>
        <em>
          <T>{"customers."}</T>
        </em>
      </Heading>
      <p className={`${s.description} ${s.centered}`}>
        <T>{"What they say about us"}</T>
      </p>
      <Carousel label="testimonials">
        {testimonials.map((t) => (
          <figure key={t.name} className={s.testimonial}>
            <figcaption>
              <Image src={`/assets/${t.image}`} alt="" width="56" height="56" />
              <strong>{t.name}</strong>
            </figcaption>
            <blockquote>
              “<T>{t.quote}</T>”
            </blockquote>
          </figure>
        ))}
      </Carousel>
    </section>
  );
}
export function Footer() {
  return (
    <>
      <aside className={s.fraud}>
        <div>
          <p>
            <strong>
              <T>{"FRAUD WARNING"}</T>
            </strong>{" "}
            <span>
              <T>{"STAY SAFE!"}</T>
            </span>
          </p>
          <p>
            <T>
              {
                "Teerus will never ask for your PIN, password or verification code. Pay money only into your own Teerus account, never a staff member's personal account. "
              }
            </T>
          </p>
        </div>
        <span className={s.warningIcon} aria-hidden="true">
          <Image
            src="/assets/fraud-info-sprite.png"
            width={491}
            height={193}
            alt=""
          />
        </span>
      </aside>
      <footer className={s.footer}>
        <div className={s.footerCta}>
          <Heading centered>
            <span className={s.footerCtaFirstLine}>
              <T>{"Take control of your"}</T>
            </span>
            <span className={s.footerCtaSecondLine}>
              <T>{"finance. Bank smarter with "}</T>
            </span>
            <em>
              <T>{"Teerus."}</T>
            </em>
          </Heading>
          <div className={s.footerButton}>
            <Download label="Download Teerus App" />
          </div>
        </div>
        <div className={s.footerPanel}>
          <div className={s.footerColumns}>
            <div>
              <Link href="/" aria-label="Teerus home">
                <Image
                  src="/assets/brand-logo-dark.svg"
                  alt="Teerus Microfinance Bank"
                  width="160"
                  height="48"
                />
              </Link>
              <p>
                <T>{"Licensed by CBN "}</T>
                <br />
                <T>{"Insured by NDIC "}</T>
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <h3>
                <T>{"Explore Teerus"}</T>
              </h3>
              <Link href="/individuals">
                <T>{"For Individual"}</T>
              </Link>
              <Link href="/business">
                <T>{"For SMEs"}</T>
              </Link>
              <Link href="/about">
                <T>{"About Us"}</T>
              </Link>
              <Link href="/blog">
                <T>{"Blog"}</T>
              </Link>
              <Link href="/privacy-policy">
                <T>{"Privacy Policy"}</T>
              </Link>
              <Link href="/terms-and-conditions">
                <T>{"Terms and Conditions"}</T>
              </Link>
            </nav>
            <address>
              <h3>
                <T>{"Get in touch"}</T>
              </h3>
              <a href="mailto:info@teerusbank.com">
                <T>{"info@teerusbank.com"}</T>
              </a>
              <a href="mailto:support@teerusbank.com">
                <T>{"support@teerusbank.com"}</T>
              </a>
              <p>
                <T>{"No 53, Itire Road. "}</T>
                <br />
                <T>{"Surulere, Lagos. "}</T>
              </p>
              <a href="tel:+2349012411411">09012411411</a>
            </address>
            <div>
              <h3>
                <T>{"Bank wherever you are"}</T>
              </h3>
              <p>
                <T>{"Download our app"}</T>
              </p>
              <StoreLinks />
            </div>
          </div>
          <p className={s.disclaimer}>
            <T>
              {
                "Insured by Nigeria Deposit Insurance Corporation (NDIC) & licensed by Central Bank of Nigeria (CBN). All loans are subject to credit approval. Stay vigilant against fraud. Teerus will never ask for your PIN or verification code. Interest rates may vary based on market conditions. © "
              }
            </T>
            {new Date().getFullYear()}
            <T>{" Teerus Microfinance Bank. "}</T>
          </p>
        </div>
      </footer>
    </>
  );
}
export function Accounts({ business = false }: { business?: boolean }) {
  return (
    <section
      id="discover"
      className={`${s.accounts} ${s.container} ${business ? "" : personalStyles.accounts}`}
    >
      <Heading>
        {business ? (
          <>
            <T>{"Business accounts that keep up with "}</T>
            <em>
              <T>{"you."}</T>
            </em>
          </>
        ) : (
          <>
            <T>{"Accounts that fit how you "}</T>
            <em>
              <T>{"earn."}</T>
            </em>
          </>
        )}
      </Heading>
      <p className={s.description}>
        <T>
          {"Paid monthly or earning daily, there is a Teerus account for you. "}
        </T>
      </p>
      {business && (
        <div className={s.accountsDownload}>
          <Download label="Download app" />
        </div>
      )}
      <AccountCards business={business}>
        {(business ? businessAccounts : individualAccounts).map((a, i) => (
          <article className={s.accountCard} key={a.name}>
            <div className={s.accountText}>
              <span className={s.number}>0{i + 1}</span>
              <h3>
                <T>{a.name}</T>
              </h3>
              <p>
                <T>{a.description}</T>
              </p>
            </div>
            <div
              className={`${s.accountArt} ${!business && i === 4 ? personalStyles.sideHustleArt : ""}`}
            >
              <Picture file={a.image} sizes="(max-width:700px) 90vw, 301px" />
            </div>
          </article>
        ))}
      </AccountCards>
    </section>
  );
}
export function CardFeature() {
  return (
    <section className={`${s.cardFeature} ${personalStyles.cardFeature}`}>
      <div className={s.bankCards}>
        <Picture file="images/card-mockup.webp" alt="Teerus payment cards" />
      </div>
      <div>
        <Heading>
          <T>{"Here’s your card. "}</T>
          <br />
          <T>{"It’s "}</T>
          <em>
            <T>{"verified."}</T>
          </em>
        </Heading>
        <p className={s.description}>
          <T>
            {
              "Whether you’re shopping online or you’re outside, your Verified card is your best bet for easy payments and a great first impression. "
            }
          </T>
        </p>
        <Download label="Download Teerus App" />
      </div>
    </section>
  );
}
export function PersonalLoans() {
  return (
    <section
      className={`${s.personalLoans} ${s.container} ${personalStyles.loans}`}
    >
      <div>
        <Heading>
          <T>{"Need cash? "}</T>
          <br />
          <T>{"Get it "}</T>
          <em>
            <T>{"fast."}</T>
          </em>
        </Heading>
        <p>
          <T>{"From ₦20,000 up to ₦5 million, when you need it."}</T>
        </p>
      </div>
      <div className={s.smallLoans}>
        {[loans[0], loans[4], loans[2]].map((l, i) => (
          <LoanCard item={l} key={i} />
        ))}
      </div>
    </section>
  );
}
export function Capital() {
  return (
    <section className={`${s.capital} ${s.container}`}>
      <div>
        <Heading>
          <T>{"Capital for the day you need it."}</T>
        </Heading>
        <p>
          <T>
            {
              "Paid monthly or earning daily, there is a Teerus account for you."
            }
          </T>
        </p>
        <Download label="Apply for loan" />
      </div>
      <div className={s.capitalCards}>
        {[loans[1], loans[5], loans[3]].map((l, i) => (
          <LoanCard
            item={
              i < 2
                ? {
                    ...l,
                    description:
                      "Working capital to keep your business running. Buy stock, pay suppliers and cover daily costs with ease.",
                  }
                : l
            }

            key={i}
          />
        ))}
      </div>
    </section>
  );
}
export { AboutIntro, Story, Values, Team } from "./AboutSections";
