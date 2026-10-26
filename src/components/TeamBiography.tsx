"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import s from "./About.module.css";
import b from "./TeamBiography.module.css";

export function TeamBiography({
  name,
  role,
  file,
  index,
  width,
  height,
}: {
  name: string;
  role: string;
  file: string;
  index: number;
  width: number;
  height: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = useId();
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${s.identityIcon} ${b.trigger}`}
        aria-label={`Read biography of ${name}`}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Image src="/assets/team-identity.svg" alt="" width={20} height={20} />
      </button>
      <dialog
        ref={dialog}
        className={b.dialog}
        aria-labelledby={title}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={b.layout}>
          <button
            type="button"
            className={b.close}
            aria-label="Close biography"
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            ×
          </button>
          <div className={b.visual}>
            <span className={b.eyebrow}>THE PEOPLE BEHIND TEERUS</span>
            <div className={`${s.teamPhoto} ${b.photo}`}>
              <Image
                src={`/assets/${file.replace(".png", "-about.webp")}`}
                alt={name}
                width={width}
                height={height}
                unoptimized
                className={s[`member${index + 1}`]}
              />
            </div>
            <span className={b.signature}>Banking with a human touch.</span>
          </div>
          <div className={b.content}>
            <span className={b.eyebrow}>MEET OUR TEAM</span>
            <h2 id={title}>{name}</h2>
            <p className={b.role}>{role}</p>
            <div className={b.biography}>
              <h3>Biography</h3>
              <span className={b.placeholder}>PROFILE COMING SOON</span>
              <p>
                This profile is being prepared. An introduction to {name}, their
                professional background and experience will appear here.
              </p>
              <p>
                More about their work at Teerus and approach to serving our
                customers will be shared soon.
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
