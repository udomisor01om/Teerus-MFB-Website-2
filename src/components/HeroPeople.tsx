"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./HomeHero.module.css";

const people = [
  { name: "girl", width: 1006, height: 1246 },
  { name: "mechanic", width: 852, height: 1262 },
  { name: "tailor", width: 1096, height: 1224 },
  { name: "farmer", width: 1316, height: 1276 },
];

export function HeroPeople() {
  const [active, setActive] = useState(0);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let current = 0;
    const ready = async (index: number) => {
      const image = images.current[index];
      if (!image) return false;
      try {
        await image.decode();
        return image.naturalWidth > 0;
      } catch {
        return false;
      }
    };
    const advance = async () => {
      const next = (current + 1) % people.length;
      const decoded = await ready(next);
      if (cancelled || preference.matches) return;
      if (!decoded) {
        timer = setTimeout(advance, 1000);
        return;
      }
      current = next;
      setActive(next);
      // 200 ms dissolve, then 3000 ms fully visible before the next dissolve.
      timer = setTimeout(advance, 3200);
    };
    const start = async () => {
      clearTimeout(timer);
      if (preference.matches) return;
      const decoded = await ready(current);
      if (!cancelled && !preference.matches)
        timer = setTimeout(decoded ? advance : start, decoded ? 3000 : 1000);
    };
    void start();
    preference.addEventListener("change", start);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      preference.removeEventListener("change", start);
    };
  }, []);
  return (
    <div className={s.people}>
      {people.map((person, index) => (
        <Image
          key={person.name}
          ref={(el) => {
            images.current[index] = el;
          }}
          src={`/assets/images/hero-${person.name}.webp`}
          alt=""
          width={person.width}
          height={person.height}
          unoptimized
          loading="eager"
          fetchPriority={index === 0 ? "high" : "auto"}
          className={`${s.person} ${s[person.name]} ${active === index ? s.active : ""}`}
        />
      ))}
    </div>
  );
}
