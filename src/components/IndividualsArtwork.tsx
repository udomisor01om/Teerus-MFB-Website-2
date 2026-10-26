"use client";
import Image from "next/image";
import { useHeroRotation } from "./useHeroRotation";
import s from "./Individuals.module.css";
export function IndividualsArtwork() {
  const { active, images } = useHeroRotation(2);
  return (
    <div className={s.art} aria-hidden="true">
      <div
        className={`${s.variant} ${s.womanBack} ${active === 1 ? s.active : ""}`}
      >
        <div className={s.bottomWoman}>
          <Image
            src="/assets/individual-shape-bottom.svg"
            alt=""
            width={197.597}
            height={179}
          />
        </div>
      </div>
      <div className={s.gradient} />
      {[
        {
          src: "/assets/images/gradient-hand-holding-teerus.webp",
          width: 1220,
          height: 1258,
          style: s.hand,
        },
        {
          src: "/assets/images/Green woman with Teerus card.webp",
          width: 2064,
          height: 2007,
          style: s.woman,
        },
      ].map((asset, index) => (
        <div
          key={asset.src}
          className={`${s.variant} ${s.foreground} ${active === index ? s.active : ""}`}
        >
          <Image
            ref={(el) => {
              images.current[index] = el;
            }}
            src={asset.src}
            alt=""
            width={asset.width}
            height={asset.height}
            className={asset.style}
            unoptimized
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
          {index === 0 && (
            <div className={s.bottomHand}>
              <Image
                src="/assets/individual-shape-bottom.svg"
                alt=""
                width={197.597}
                height={179}
              />
            </div>
          )}
        </div>
      ))}
      <div className={s.rightShape}>
        <Image
          src="/assets/individual-shape-right.svg"
          alt=""
          width={197.597}
          height={179}
        />
      </div>
      <div className={s.topShape}>
        <Image
          src="/assets/individual-shape-top.svg"
          alt=""
          width={191.705}
          height={161.004}
        />
      </div>
    </div>
  );
}
