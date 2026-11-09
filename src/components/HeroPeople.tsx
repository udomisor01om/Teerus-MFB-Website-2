"use client";

import { useHeroRotation } from "./useHeroRotation";
import Image from "next/image";
import s from "./HomeHero.module.css";

const people = [
  { name: "girl", width: 1006, height: 1246 },
  { name: "mechanic", file: "hero-tailor-guy.webp", width: 991, height: 1536 },
  { name: "tailor", file: "Fat lady.webp", width: 1105, height: 1520 },
  { name: "farmer", width: 1316, height: 1276 },
  { name: "student", file: "Nigerian student.webp", width: 1175, height: 1503 },
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
          src={`/assets/images/${person.file ?? `hero-${person.name}.webp`}`}
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
