"use client";

import { useHeroRotation } from "./useHeroRotation";
import Image from "next/image";
import s from "./HomeHero.module.css";

const people = [
  { name: "girl", width: 1006, height: 1246 },
  { name: "mechanic", width: 852, height: 1262 },
  { name: "tailor", width: 1096, height: 1224 },
  { name: "farmer", width: 1316, height: 1276 },
];

export function HeroPeople() {
  const { active, images } = useHeroRotation(people.length);
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
