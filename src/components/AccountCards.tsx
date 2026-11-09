import type { ReactNode } from "react";
import { Carousel } from "./Controls";
import s from "./Site.module.css";
export function AccountCards({
  business,
  children,
}: {
  business: boolean;
  children: ReactNode;
}) {
  return business ? (
    <div className={s.businessGrid}>{children}</div>
  ) : (
    <Carousel label="accounts" className={s.accountCarousel}>
      {children}
    </Carousel>
  );
}
