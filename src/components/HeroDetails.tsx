import Image from "next/image";
import s from "./HomeHero.module.css";
import styles from "./HeroDetails.module.css";
export function BrandPill({
  label,
  tone = "dark",
  icon = true,
}: {
  icon?: boolean;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`${s.label} ${tone === "light" ? styles.light : ""}`}>
      {icon && (
        <Image
          src="/assets/images/Bird Icon.svg"
          width={49}
          height={28}
          alt=""
        />
      )}
      <span>{label}</span>
    </p>
  );
}
export function DiscoverPrompt({
  tone = "dark",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`${s.discover} ${tone === "light" ? styles.light : ""} ${className}`}
    >
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
  );
}
