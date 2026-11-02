import { T } from "@/i18n/Language";
import { teamBiographies } from "@/content/team-biographies";
import Image from "next/image";
import { Header, Download } from "./Controls";
import { BrandPill } from "./HeroDetails";
import { TeamBiography } from "./TeamBiography";
import { PortraitStrip } from "./PortraitStrip";
import { hiddenTeamMembers, team, values } from "@/content/marketing";
import s from "./About.module.css";

export function AboutIntro() {
  return (
    <div className={s.intro}>
      <div className={s.pattern} aria-hidden="true" />
      <div className={s.fade} aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />
      <Header />
      <section className={s.heroContent}>
        <BrandPill label="OUR PURPOSE" tone="light" />
        <div className={s.heroText}>
          <h1>
            <T>{"Empowering your financial "}</T>
            <em>
              <T>{"dream"}</T>
            </em>
          </h1>
          <p>
            <T>
              {
                "Empowering dreams, one step at a time. We make banking simple and useful for everyday people and growing businesses, and we are right here at Itire Road whenever you need us. "
              }
            </T>
          </p>
        </div>
        <div className={s.photos}>
          <div>
            <Image
              src="/assets/images/TeerusTeam.webp"
              alt="Teerus team together at the bank"
              fill
              unoptimized
              preload
              sizes="(max-width: 700px) 90vw, (max-width: 1250px) 60vw, 748px"
            />
          </div>
          <div>
            <Image
              src="/assets/about-colleagues-about.webp"
              alt="Teerus colleagues"
              fill
              unoptimized
              sizes="(max-width: 700px) 90vw, 440px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export function Story() {
  return (
    <section className={s.story} aria-labelledby="story-title">
      <div className={s.storyText}>
        <BrandPill
          label="OUR STORY, VISION AND MISSION"
          tone="light"
          icon={false}
        />
        <h2 id="story-title">
          <T>{"Banking that feels human again"}</T>
        </h2>
        <div className={s.storyCopy}>
          <p>
            <T>
              {
                "We believe banking should feel like peace of mind, not paperwork. Teerus was built to make banking feel human again, for individuals and small businesses who deserve a bank that is easy to reach, reliable to use and honest. "
              }
            </T>
          </p>
          <p>
            <T>
              {
                "Our shield stands for protection, openness and a promise to look after your money and your plans. "
              }
            </T>
          </p>
          <p>
            <T>
              {
                "We are in Surulere, Lagos, at No 53, Itire Road, and we work hard to be the bank you will not need to leave for anything else. "
              }
            </T>
          </p>
        </div>
      </div>
      <PortraitStrip />
    </section>
  );
}
export function Values() {
  return (
    <section className={s.values} aria-labelledby="values-title">
      <div className={s.sectionHeader}>
        <div>
          <h2 id="values-title">
            <T>{"What we stand for"}</T>
          </h2>
          <p className={s.supporting}>
            <T>
              {
                "Paid monthly or earning daily, there is a Teerus account for you. "
              }
            </T>
          </p>
        </div>
      </div>
      <div className={s.valueGrid}>
        {values.map(([name, body, icon]) => (
          <article key={name}>
            <span className={s.valueIcon}>
              <Image
                src={`/assets/${icon}`}
                width={32.667}
                height={32.667}
                alt=""
              />
            </span>
            <div>
              <h3>
                <T>{name}</T>
              </h3>
              <p>
                <T>{body}</T>
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className={s.valuesCTA}>
        <Download label="Download Teerus App" variant="dark" />
      </div>
    </section>
  );
}
const teamSizes = [
  [732, 1024],
  [683, 1024],
  [800, 907],
  [572, 1024],
  [748, 1024],
  [800, 1071],
  [800, 800],
  [544, 430],
  [642, 430],
];
export function Team() {
  // Keep each portrait tied to its original crop when changing the display order.
  const displayTeam = team
    .map((member, index) => ({ member, index }))
    .filter(({ member }) => !hiddenTeamMembers.has(member[0]))
    .sort(
      (a, b) =>
        Number(b.member[2] === "team-jelil-ajagbe.png") -
        Number(a.member[2] === "team-jelil-ajagbe.png"),
    );
  return (
    <section className={s.team} aria-labelledby="team-title">
      <h2 id="team-title">
        <T>{"The team behind the "}</T>
        <em>
          <T>{"success"}</T>
        </em>
      </h2>
      <p className={s.supporting}>
        <T>
          {
            "Our experienced management team leads strategy, financial operations, regulatory compliance, client relationships, and workforce development. "
          }
        </T>
      </p>
      <div className={s.teamGrid}>
        {displayTeam.map(({ member: [name, role, file], index }) => (
          <article
            key={name}
            className={
              file === "team-jelil-ajagbe.png" ? s.chairmanCard : undefined
            }
          >
            <div className={s.teamPhoto}>
              {file ? (
                <Image
                  src={`/assets/${file.replace(".png", "-about.webp")}`}
                  alt={name}
                  width={teamSizes[index]?.[0] ?? 800}
                  height={teamSizes[index]?.[1] ?? 800}
                  unoptimized
                  className={s[`member${index + 1}`]}
                />
              ) : (
                <span
                  className={s.initialsPortrait}
                  aria-label={`Portrait of ${name} coming soon`}
                >
                  {name === "Jelil (Tope) Ajagbe" ? "JA" : "FO"}
                </span>
              )}
            </div>
            <div className={s.identity}>
              <div>
                <h3>
                  <T>{name}</T>
                </h3>
                {role && (
                  <p>
                    <T>{role}</T>
                  </p>
                )}
              </div>
              <TeamBiography
                biography={teamBiographies[name]}
                name={name}
                role={role}
                file={file}
                index={index}
                width={teamSizes[index]?.[0] ?? 800}
                height={teamSizes[index]?.[1] ?? 800}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
