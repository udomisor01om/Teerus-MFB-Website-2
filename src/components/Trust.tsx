"use client";
import { T, useText } from "@/i18n/Language";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./Trust.module.css";
const cards = [
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
  ["NDPC.png", "NDPC", "Your personal data is protected in line with NDPC."],
];
const mod = (n: number) => (n + 3) % 3;
export function Trust({
  interval = 4000,
  duration = 300,
  copy,
}: {
  interval?: number;
  duration?: number;
  copy?: { heading: string; titles: string[]; bodies: string[] };
}) {
  const text = useText();
  const displayCards = copy
    ? cards.map((card, i) => [card[0], copy.titles[i], copy.bodies[i]])
    : cards;
  const root = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [moving, setMoving] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const size = matchMedia("(max-width: 700px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(size.matches);
      setReduced(motion.matches);
    };
    sync();
    size.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(root.current!);
    const visibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      size.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  function move(next: number) {
    if (moving) return;
    setRevision((n) => n + 1);
    setAnimate(!reduced);
    setMoving(!reduced);
    setIndex(reduced ? mod(next - 1) + 1 : next);
  }
  useEffect(() => {
    if (!moving) return;
    const timer = setTimeout(() => {
      setAnimate(false);
      setIndex((n) => mod(n - 1) + 1);
      setMoving(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [moving, duration]);
  useEffect(() => {
    if (
      !mobile ||
      reduced ||
      !visible ||
      paused ||
      focused ||
      interacting ||
      moving
    )
      return;
    const timer = setTimeout(() => {
      setAnimate(true);
      setMoving(true);
      setIndex((n) => n + 1);
    }, interval);
    return () => clearTimeout(timer);
  }, [
    mobile,
    reduced,
    visible,
    paused,
    focused,
    interacting,
    moving,
    interval,
    revision,
  ]);
  const renderCard = (card: string[], key: number, hidden = false) => {
    const [file, label, body] = card;
    return (
      <div key={key} aria-hidden={hidden || undefined}>
        <div className={s.logo}>
          <Image
            src={`/assets/images/${file}`}
            alt=""
            width={file === "CBN.png" ? 120 : file === "NDIC.png" ? 158 : 191}
            height={file === "CBN.png" ? 95 : file === "NDIC.png" ? 48 : 57}
            className={s[file.split(".")[0].toLowerCase()]}
            unoptimized
          />
        </div>
        <p>
          <strong>
            <T>{label}</T>
          </strong>
          <span>
            <T>{body}</T>
          </span>
        </p>
      </div>
    );
  };
  return (
    <section
      ref={root}
      className={s.section}
      aria-label="Regulatory information"
    >
      <p>
        <T>{copy?.heading ?? "Built on Trust"}</T>
      </p>
      <div className={`${s.cards} ${s.desktop}`}>
        {displayCards.map((card, i) => renderCard(card, i))}
      </div>
      <div
        className={s.mobile}
        role="region"
        aria-roledescription="carousel"
        aria-label={text("Built on Trust")}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
      >
        <div
          className={s.viewport}
          onTouchStart={(event) => {
            const point = event.touches[0];
            touch.current = { x: point.clientX, y: point.clientY };
            setInteracting(true);
          }}
          onTouchEnd={(event) => {
            const start = touch.current;
            touch.current = null;
            setInteracting(false);
            setRevision((n) => n + 1);
            if (!start) return;
            const end = event.changedTouches[0];
            const dx = end.clientX - start.x;
            if (
              Math.abs(dx) > 35 &&
              Math.abs(dx) > Math.abs(end.clientY - start.y)
            )
              move(index + (dx < 0 ? 1 : -1));
          }}
          onTouchCancel={() => {
            touch.current = null;
            setInteracting(false);
            setRevision((n) => n + 1);
          }}
        >
          <div
            className={`${s.cards} ${s.slider}`}
            style={
              {
                transform: `translateX(-${index * 100}%)`,
                transitionDuration: animate ? `${duration}ms` : "0ms",
              } as CSSProperties
            }
          >
            {[displayCards[2], ...displayCards, displayCards[0]].map(
              (card, i) => renderCard(card, i, i !== index),
            )}
          </div>
        </div>
        <div className={s.pagination}>
          {displayCards.map((card, i) => (
            <button
              key={card[0]}
              type="button"
              aria-label={`${text("Show")} ${text(card[1])}`}
              aria-current={mod(index - 1) === i ? "true" : undefined}
              onClick={() => move(i + 1)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
