"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { refreshFooterScroll } from "@/lib/footerRefresh";

export default function RouteAnimationReset() {
  const pathname = usePathname();
  const firstPaint = useRef(true);

  useEffect(() => {
    const syncAnimations = () => {
      refreshFooterScroll();

      // Do not pull gsap/ScrollTrigger onto the homepage critical path until
      // something has registered triggers (Section4 etc. set this flag).
      if (!window.__gsapScrollTrigger) return;

      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => {
            const element = trigger.trigger;
            if (element && !document.contains(element)) {
              trigger.kill();
            }
          });
          if (ScrollTrigger.getAll().length) {
            ScrollTrigger.refresh();
          }
        })
        .catch(() => {});
    };

    // Skip the extra layout thrash on the very first homepage paint.
    if (firstPaint.current) {
      firstPaint.current = false;
      const idle =
        "requestIdleCallback" in window
          ? window.requestIdleCallback(syncAnimations, { timeout: 2500 })
          : window.setTimeout(syncAnimations, 800);
      return () => {
        if ("cancelIdleCallback" in window && typeof idle === "number") {
          window.cancelIdleCallback(idle);
        } else {
          window.clearTimeout(idle);
        }
      };
    }

    const timer = window.setTimeout(syncAnimations, 180);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
