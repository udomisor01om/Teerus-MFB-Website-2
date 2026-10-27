import Image from "next/image";
import { useId } from "react";
import s from "./Site.module.css";

// The Figma source uses editable DM Sans letters around a separate brand symbol.
export function BrandSeal() {
  const path = useId();
  return (
    <div className={s.seal} aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <path id={path} d="M 60 13 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" />
        </defs>
        <circle cx="60" cy="60" r="60" fill="#061c22" />
        <text
          fill="white"
          fontFamily="var(--font-body)"
          fontSize="6.854"
          fontWeight="300"
          letterSpacing="4.8"
        >
          <textPath href={`#${path}`} startOffset="50%" textAnchor="middle">
            Bank the way you like
          </textPath>
        </text>
        <circle cx="60" cy="60" r="35.5" fill="#f9feff" stroke="#03e8ad" />
      </svg>
      <Image
        src="/assets/seal-symbol.svg"
        width={38.407}
        height={28}
        alt=""
        className={s.sealSymbol}
      />
    </div>
  );
}
