"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CarouselNavigation } from "./CarouselNavigation";
import Image from "next/image";
import { products } from "@/content/marketing";
import s from "./Products.module.css";

const COUNT = products.length;
const INTERVAL = 3000;
const mod = (value: number) => ((value % COUNT) + COUNT) % COUNT;

export function Products() {
  const viewport = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const alive = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const decoded = useRef(new Map<string, Promise<void>>());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [moving, setMoving] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const el = viewport.current;
    return el
      ? (el.firstElementChild as HTMLElement).offsetWidth +
          parseFloat(getComputedStyle(el).columnGap)
      : 338;
  }, []);
  const prepare = useCallback(
    async (from: number, direction = 1) => {
      const visibleCount = Math.ceil(
        (viewport.current?.clientWidth ?? 1237) / step(),
      );
      const indices = Array.from({ length: visibleCount + 1 }, (_, offset) =>
        mod(from + (direction < 0 ? -1 : 0) + offset),
      );
      await Promise.all(
        indices.map(async (index) => {
          const src = `/assets/${products[index].image}`;
          let promise = decoded.current.get(src);
          if (!promise) {
            const image = new window.Image();
            image.src = src;
            promise = image.decode().catch((error) => {
              decoded.current.delete(src);
              throw error;
            });
            decoded.current.set(src, promise);
          }
          await promise;
        }),
      );
    },
    [step],
  );
  const settle = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const span = step() * COUNT;
    let left = el.scrollLeft;
    if (left < span) left += span;
    else if (left >= span * 2) left -= span;
    if (left !== el.scrollLeft) el.scrollTo({ left, behavior: "instant" });
    setActive(mod(Math.round(left / step())));
    busy.current = false;
    setMoving(false);
  }, [step]);
  const move = useCallback(
    async (direction: number, automatic = false) => {
      const el = viewport.current;
      if (!el || busy.current) return;
      busy.current = true;
      setMoving(true);
      const target = Math.round(el.scrollLeft / step()) + direction;
      try {
        await prepare(mod(target), direction);
        if (!alive.current) return;
        if (
          automatic &&
          (el.matches(":hover") ||
            el.closest("section")?.contains(document.activeElement))
        ) {
          busy.current = false;
          setMoving(false);
          return;
        }
        el.scrollTo({
          left: target * step(),
          behavior: reduced ? "instant" : "smooth",
        });
        // scrollend is primary; the debounced scroll handler supports older engines.
        if (reduced) settle();
      } catch {
        busy.current = false;
        setMoving(false);
      }
    },
    [prepare, reduced, settle, step],
  );

  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    let previousStep = step();
    el.scrollLeft = COUNT * previousStep;
    const resize = new ResizeObserver(() => {
      const index = mod(Math.round(el.scrollLeft / previousStep));
      previousStep = step();
      if (!busy.current) el.scrollLeft = (COUNT + index) * previousStep;
    });
    resize.observe(el);
    return () => resize.disconnect();
  }, [step]);
  useEffect(() => {
    alive.current = true;
    const syncVisibility = () => setDocumentVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    const el = viewport.current!;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    el.addEventListener("scrollend", settle);
    return () => {
      alive.current = false;
      document.removeEventListener("visibilitychange", syncVisibility);
      media.removeEventListener("change", sync);
      observer.disconnect();
      el.removeEventListener("scrollend", settle);
      clearTimeout(idleTimer.current);
    };
  }, [settle]);
  useEffect(() => {
    if (visible) void prepare(active).catch(() => {});
  }, [active, prepare, visible]);
  useEffect(() => {
    if (
      hovered ||
      focused ||
      dragging ||
      moving ||
      reduced ||
      !visible ||
      !documentVisible
    )
      return;
    const timer = setTimeout(() => {
      if (!document.hidden) void move(1, true);
    }, INTERVAL);
    return () => clearTimeout(timer);
  }, [
    active,
    documentVisible,
    dragging,
    focused,
    hovered,
    move,
    moving,
    reduced,
    visible,
  ]);

  return (
    <section
      id="discover"
      className={s.section}
      aria-labelledby="products-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className={s.header}>
        <div>
          <h2 id="products-title">
            Manage, save &amp; borrow with <em>ease.</em>
          </h2>
          <p>
            Helping individuals and SMEs with top banking solutions to save,
            grow and succeed.
          </p>
        </div>
        <CarouselNavigation
          label="products"
          controls="product-track"
          moving={moving}
          onMove={(direction) => void move(direction)}
        />
      </div>
      <div className={s.clip}>
        <div
          ref={viewport}
          id="product-track"
          className={s.track}
          role="region"
          aria-label="products"
          aria-roledescription="carousel"
          tabIndex={0}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
          onScroll={() => {
            clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(settle, 160);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              void move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {[0, 1, 2].flatMap((copy) =>
            products.map((product, index) => (
              <article
                key={`${copy}-${product.id}`}
                className={`${s.card} ${s[`card${index}`]}`}
                aria-hidden={copy !== 1 ? true : undefined}
              >
                <div className={s.art}>
                  <Image
                    src={`/assets/${product.image}`}
                    alt=""
                    fill
                    sizes={product.phone ? "228px" : "435px"}
                    unoptimized
                    loading="lazy"
                  />
                </div>
                <div className={s.overlay} />
                <div className={s.copy}>
                  <h3>{product.name}</h3>
                  <p>
                    {index === 1 ? (
                      <>
                        Lock it away and earn
                        <br />
                        more.
                      </>
                    ) : (
                      product.description
                    )}
                  </p>
                </div>
              </article>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
