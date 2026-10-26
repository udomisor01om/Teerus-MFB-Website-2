"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./About.module.css";
const portraits = [
  ["portrait-one", 204, 315, -33, 32],
  ["home-market-woman", 239, 297, -51, 26],
  ["investment-customer", 283, 375, -88, -28],
  ["portrait-four", 458, 306, -160, 24],
  ["business-current-customer", 446, 298, -160, 44],
  ["portrait-six", 222, 333, -65, 16],
  ["portrait-seven", 675, 450, -262, 6],
  ["portrait-eight", 432, 326, -125, 18],
  ["portrait-nine", 352, 405, -107, 0],
] as const;
export function PortraitStrip() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const images = Array.from(root.current?.querySelectorAll("img") ?? []);
    Promise.all(
      images.map((image) => image.decode().catch(() => undefined)),
    ).then(() => {
      if (!cancelled) setReady(images.every((image) => image.naturalWidth > 0));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div ref={root} className={s.portraitStrip}>
      <div className={s.portraitWindow}>
        <div
          className={`${s.portraitTrack} ${ready && !paused ? s.running : ""}`}
          aria-hidden="true"
        >
          {[0, 1].map((copy) => (
            <div className={s.portraitGroup} key={copy}>
              {portraits.map(([file, width, height, left, top]) => (
                <div className={s.capsule} key={file}>
                  <div
                    className={s.portraitCrop}
                    style={{ width, height, left, top }}
                  >
                    <Image
                      src={`/assets/${file}-about.webp`}
                      alt=""
                      width={width}
                      height={height}
                      unoptimized
                      loading="eager"
                      className={file === "portrait-nine" ? s.widePortrait : ""}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className={s.portraitPause}
        type="button"
        aria-label={
          paused ? "Resume portrait animation" : "Pause portrait animation"
        }
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Resume portraits" : "Pause portraits"}
      </button>
    </div>
  );
}
