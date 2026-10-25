"use client";
import Image from "next/image";
import s from "./Products.module.css";
export function CarouselNavigation({
  label,
  controls,
  moving,
  onMove,
  className = "",
}: {
  label: string;
  controls: string;
  moving: boolean;
  onMove: (direction: number) => void;
  className?: string;
}) {
  return (
    <div className={`${s.controls} ${className}`}>
      {[-1, 1].map((direction) => (
        <button
          key={direction}
          aria-label={`${direction < 0 ? "Previous" : "Next"} ${label}`}
          aria-controls={controls}
          aria-disabled={moving}
          onClick={() => {
            if (!moving) onMove(direction);
          }}
        >
          <Image
            src={`/assets/images/Icons/Icons/outline/${direction < 0 ? "arrow-right.svg" : "arrow-right-1.svg"}`}
            width={16}
            height={16}
            alt=""
          />
        </button>
      ))}
    </div>
  );
}
