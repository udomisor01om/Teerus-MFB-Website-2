"use client";

import { useRef, useState, useId, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import s from "./Site.module.css";

export function StoreLinks() {
  return (
    <div className={s.storeLinks}>
      <a href={siteConfig.externalLinks.appleAppStore}>
        <Image
          src="/assets/app-store-badge.svg"
          width="180"
          height="52"
          alt="Download on the App Store"
        />
      </a>
      <a href={siteConfig.externalLinks.googlePlay}>
        <Image
          src="/assets/google-play-badge-source.svg"
          width="180"
          height="52"
          alt="Get it on Google Play"
        />
      </a>
    </div>
  );
}

export function Download({
  dark = false,
  label = "Download app",
}: {
  dark?: boolean;
  label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = useId();
  return (
    <>
      <button
        ref={trigger}
        className={`${s.button} ${dark ? s.darkButton : ""}`}
        onClick={() => dialog.current?.showModal()}
      >
        {label}
        <Image src="/assets/apple-icon.svg" width="18" height="18" alt="" />
        <Image
          src="/assets/google-play-icon.svg"
          width="18"
          height="18"
          alt=""
        />
      </button>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby={title}
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className={s.dialogInner}>
          <button
            className={s.close}
            aria-label="Close download choices"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          <h2 id={title}>Get the Teerus app</h2>
          <p>Choose the store for your device.</p>
          <StoreLinks />
        </div>
      </dialog>
    </>
  );
}

export function BankingLink({ children = "Login" }: { children?: ReactNode }) {
  const url: string | null = siteConfig.externalLinks.webApp;
  return url ? (
    <a className={s.button} href={url}>
      {children}
    </a>
  ) : (
    <span className={s.unavailable}>
      <button type="button" className={s.button} disabled>
        {children}
      </button>
      <span>Web banking link coming soon</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className={s.header}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link href="/" aria-label="Teerus home" className={s.logo}>
        <span className={s.brandMark}>
          <Image
            src="/assets/brand-mark-white.svg"
            width="27"
            height="27"
            alt=""
          />
        </span>
        <span className={s.brandWord}>
          <Image
            src="/assets/brand-wordmark.svg"
            width="87"
            height="25"
            alt="Teerus"
          />
          <span>Microfinance Bank</span>
        </span>
      </Link>
      <button
        ref={toggle}
        className={s.menuToggle}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? " ×" : " ☰"}</span>
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`${s.nav} ${open ? s.navOpen : ""}`}
      >
        {siteConfig.navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className={s.mobileLogin}>
          <BankingLink />
        </div>
      </nav>
      <div className={s.desktopLogin}>
        <BankingLink />
      </div>
    </header>
  );
}

export function Carousel({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const move = (direction: number) => {
    const el = ref.current;
    if (el)
      el.scrollBy({
        left:
          direction *
          ((el.firstElementChild as HTMLElement)?.offsetWidth +
            (parseFloat(getComputedStyle(el).columnGap) || 0) || 338),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <div className={`${s.carousel} ${className}`}>
      <div className={s.carouselControls}>
        <button
          aria-label={`Previous ${label}`}
          aria-controls={id}
          onClick={() => move(-1)}
        >
          ←
        </button>
        <button
          aria-label={`Next ${label}`}
          aria-controls={id}
          onClick={() => move(1)}
        >
          →
        </button>
      </div>
      <div
        id={id}
        ref={ref}
        className={s.carouselTrack}
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MotionRows({
  children,
  label = "loan cards",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`${s.motionArea} ${paused ? s.paused : ""}`}>
      <button
        className={s.pause}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Resume" : "Pause"} {label}
      </button>
      {children}
    </div>
  );
}
