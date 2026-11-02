"use client";
import { T, OriginalLanguageNotice, useText } from "@/i18n/Language";

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
  biography,
}: {
  name: string;
  role: string;
  file: string;
  index: number;
  width: number;
  height: number;
  biography?: string[];
}) {
  const text = useText();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = useId();
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${s.identityIcon} ${b.trigger}`}
        aria-label={`${text("Read biography of")} ${name}`}
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal();
          const reader = dialog.current?.querySelector(`.${b.reader}`);
          if (reader) reader.scrollTop = 0;
        }}
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
        <div className={b.shell}>
          <button
            type="button"
            className={b.close}
            aria-label={text("Close biography")}
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            ×
          </button>
          <div
            className={b.reader}
            tabIndex={0}
            aria-label={`${text("Biography of")} ${name}`}
          >
            <div className={b.layout}>
              <div
                className={`${b.visual} ${file === "team-jelil-ajagbe.png" ? b.chairmanVisual : ""}`}
              >
                <span className={b.eyebrow}>
                  <T>{"THE PEOPLE BEHIND TEERUS"}</T>
                </span>
                <div className={`${s.teamPhoto} ${b.photo}`}>
                  {file ? (
                    <Image
                      src={`/assets/${file.replace(".png", "-about.webp")}`}
                      alt={name}
                      width={width}
                      height={height}
                      unoptimized
                      className={s[`member${index + 1}`]}
                    />
                  ) : (
                    <span className={b.initials} aria-hidden="true">
                      {name === "Jelil (Tope) Ajagbe" ? "JA" : "FO"}
                    </span>
                  )}
                </div>
                <span className={b.signature}>
                  <T>{"Banking with a human touch."}</T>
                </span>
              </div>
              <div className={b.content}>
                <span className={b.eyebrow}>
                  <T>{"MEET OUR TEAM"}</T>
                </span>
                <h2 id={title}>{name}</h2>
                {role && (
                  <p className={b.role}>
                    <T>{role}</T>
                  </p>
                )}
                <OriginalLanguageNotice kind="biography" />
                <div className={b.biography} lang="en">
                  <h3>
                    <T>{"Biography"}</T>
                  </h3>
                  {biography?.length ? (
                    biography.map((paragraph, i) => <p key={i}>{paragraph}</p>)
                  ) : (
                    <>
                      <span className={b.placeholder}>
                        <T>{"PROFILE COMING SOON"}</T>
                      </span>
                      <p>
                        <T>
                          {"This profile is being prepared. An introduction to"}
                        </T>{" "}
                        {name}
                        <T>
                          {
                            ", their professional background and experience will appear here. "
                          }
                        </T>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
