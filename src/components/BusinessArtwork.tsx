"use client";
import Image from "next/image";
import { useHeroRotation } from "./useHeroRotation";
import s from "./Business.module.css";
export function BusinessArtwork() {
  const { active, images } = useHeroRotation(2);
  return (
    <div className={s.art} aria-hidden="true" data-variant={active}>
      <div className={s.photoArea}>
        {["market-women", "shop-owner"].map((name, index) => (
          <div
            key={name}
            className={`${s.heroPhoto} ${index === 0 ? s.women : s.trader} ${index === 1 && active === 1 ? s.visible : ""}`}
          >
            <Image
              ref={(el) => {
                images.current[index] = el;
              }}
              src={
                index === 0
                  ? "/assets/images/two-women-are-looking-phone-while-one-them-is-holding-box 1.png"
                  : "/assets/images/medium-shot-man-repairing-fashion-goods 1.png"
              }
              alt=""
              width={1724}
              height={1372}
              unoptimized
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        <div className={`${s.darkFade} ${active === 1 ? s.traderFade : ""}`} />
        <div className={s.greenOverlay} />
      </div>
      <div className={s.shapeTop}>
        <Image
          src="/assets/sme-shape-top.svg"
          alt=""
          width={191.705}
          height={161.004}
        />
      </div>
      <div className={s.shapeRight}>
        <Image
          src="/assets/sme-shape-right.svg"
          alt=""
          width={197.597}
          height={179}
        />
      </div>
      <div className={s.shapeBottom}>
        <Image
          src="/assets/sme-shape-bottom.svg"
          alt=""
          width={197.597}
          height={179}
        />
      </div>
    </div>
  );
}
