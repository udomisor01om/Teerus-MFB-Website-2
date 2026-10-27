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
import trust from "./Trust.module.css";

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
            TEERUS FOR BUSINESS
            <Image src="/assets/wing-right.svg" alt="" width="28" height="20" />
          </p>
          <h1 id="hero-title">Banking that works for your business.</h1>
          <p className={s.heroDescription}>
            Open a business account, get working capital and grow with banking
            built for small &amp; medium businesses. Ẹ káàbọ̀.
          </p>
          <div className={s.actions}>
            <Download label="Download Teerus App" />
            <BankingLink destination="start" variant="outlined">
              Start without downloading
            </BankingLink>
          </div>
          <a className={s.discover} href="#discover">
            Discover How We Can Help You! <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <Trust />
    </div>
  );
}
export function Trust() {
  return (
    <section className={trust.section} aria-label="Regulatory information">
      <p>Built on Trust</p>
      <div className={trust.cards}>
        {[
          [
            "CBN.png",
            "Licensed by CBN",
            "Teerus is fully licensed and regulated by the Central Bank of Nigeria.",
          ],
          [
            "NDIC.png",
            "NDIC",
            "Deposits are insured by the Nigeria Deposit Insurance Corporation.",
          ],
          [
            "NDPC.png",
            "NDPC",
            "Your personal data is protected in line with NDPC.",
          ],
        ].map(([file, label, body]) => (
          <div key={file}>
            <div className={trust.logo}>
              <Image
                src={`/assets/images/${file}`}
                alt=""
                width={
                  file === "CBN.png" ? 120 : file === "NDIC.png" ? 158 : 191
                }
                height={file === "CBN.png" ? 95 : file === "NDIC.png" ? 48 : 57}
                className={trust[file.split(".")[0].toLowerCase()]}
                unoptimized
              />
            </div>
            <p>
              <strong>{label}</strong>
              <span>{body}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export { Products } from "./Products";
function LoanCard({ item }: { item: { name: string; description: string } }) {
  const isBusiness =
    item.name === "SME financing" ||
    item.name === "Inventory financing" ||
    item.description.startsWith("Working capital");
  return (
    <article className={s.loanCard}>
      <div className={s.loanIcon}>
        <Image
          src={`/assets/images/${isBusiness ? "Business.png" : "Individual Illustration.png"}`}
          width={isBusiness ? 44 : 35}
          height={40}
          alt=""
          unoptimized
        />
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
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
        Discover our top loan <em>services.</em>
      </Heading>
      <p className={`${s.description} ${s.centered}`}>
        Fast access to capital for individuals & MSMEs.
      </p>
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
                    <LoanCard key={i} item={item} />
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
              Save for growth.
              <br />
              Bank your <em>way.</em>
            </>
          ) : (
            <>
              Bank the way
              <br />
              you <em>like.</em>
            </>
          )}
        </Heading>
        {business ? (
          <>
            <div className={s.deposit}>
              <strong>9% to 18% a year</strong>
              <h3>Fixed deposits:</h3>
              <p>
                Earn competitive returns on NDIC insured savings. Choose short
                or long tenures to fit your plans.
              </p>
            </div>
            <p className={s.startSteps}>
              Start in 3 steps:
              <br />1 Get the app. &nbsp; 2 Sign up. &nbsp; 3 Start banking.
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
                  <span>STEP {i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
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
        Our happy <em>customers.</em>
      </Heading>
      <p className={`${s.description} ${s.centered}`}>What they say about us</p>
      <Carousel label="testimonials">
        {testimonials.map((t) => (
          <figure key={t.name} className={s.testimonial}>
            <figcaption>
              <Image src={`/assets/${t.image}`} alt="" width="56" height="56" />
              <strong>{t.name}</strong>
            </figcaption>
            <blockquote>“{t.quote}”</blockquote>
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
            <strong>FRAUD WARNING</strong> <span>STAY SAFE!</span>
          </p>
          <p>
            Teerus will never ask for your PIN, password or verification code.
            Pay money only into your own Teerus account, never a staff
            member&apos;s personal account.
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
            <span>Take control of your</span>
            <span>finance. Bank smarter with</span>
            <em>Teerus.</em>
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
                Licensed by CBN
                <br />
                Insured by NDIC
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <h3>Explore Teerus</h3>
              <Link href="/individuals">For Individual</Link>
              <Link href="/business">For SMEs</Link>
              <Link href="/about">About Us</Link>
              <span
                className={s.comingSoon}
                aria-disabled="true"
                title="Blog coming soon"
              >
                Blog <span>Soon</span>
              </span>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </nav>
            <address>
              <h3>Get in touch</h3>
              <a href="mailto:info@teerusbank.com">info@teerusbank.com</a>
              <a href="mailto:support@teerusbank.com">support@teerusbank.com</a>
              <p>
                No 53, Itire Road.
                <br />
                Surulere, Lagos.
              </p>
              <a href="tel:+2349012411411">09012411411</a>
            </address>
            <div>
              <h3>Bank wherever you are</h3>
              <p>Download our app</p>
              <StoreLinks />
            </div>
          </div>
          <p className={s.disclaimer}>
            Insured by Nigeria Deposit Insurance Corporation (NDIC) &amp;
            licensed by Central Bank of Nigeria (CBN). All loans are subject to
            credit approval. Stay vigilant against fraud. Teerus will never ask
            for your PIN or verification code. Interest rates may vary based on
            market conditions. © {new Date().getFullYear()} Teerus Microfinance
            Bank.
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
            Business accounts that keep up with <em>you.</em>
          </>
        ) : (
          <>
            Accounts that fit how you <em>earn.</em>
          </>
        )}
      </Heading>
      <p className={s.description}>
        Paid monthly or earning daily, there is a Teerus account for you.
      </p>
      {business && (
        <div className={s.accountsDownload}>
          <Download label="Download app" />
        </div>
      )}
      <div className={business ? s.businessGrid : s.accountGrid}>
        {(business ? businessAccounts : individualAccounts).map((a, i) => (
          <article className={s.accountCard} key={a.name}>
            <div className={s.accountText}>
              <span className={s.number}>0{i + 1}</span>
              <h3>{a.name}</h3>
              <p>{a.description}</p>
            </div>
            <div className={s.accountArt}>
              <Picture file={a.image} sizes="(max-width:700px) 90vw, 301px" />
            </div>
          </article>
        ))}
      </div>
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
          Here’s your card.
          <br />
          It’s <em>verified.</em>
        </Heading>
        <p className={s.description}>
          Whether you’re shopping online or you’re outside, your Verified card
          is your best bet for easy payments and a great first impression.
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
          Need cash?
          <br />
          Get it <em>fast.</em>
        </Heading>
        <p>From ₦20,000 up to ₦5 million, when you need it.</p>
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
        <Heading>Capital for the day you need it.</Heading>
        <p>Paid monthly or earning daily, there is a Teerus account for you.</p>
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
