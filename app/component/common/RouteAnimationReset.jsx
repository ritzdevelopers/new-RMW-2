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

      if (!window.__gsapScrollTrigger) {
        import("gsap/ScrollTrigger")
          .then(({ ScrollTrigger }) => {
            window.__gsapScrollTrigger = true;
            const live = ScrollTrigger.getAll().filter((trigger) => {
              const element = trigger.trigger;
              if (element && !document.contains(element)) {
                trigger.kill();
                return false;
              }
              return true;
            });
            if (live.length) ScrollTrigger.refresh();
          })
          .catch(() => {});
        return;
      }

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
          ? window.requestIdleCallback(syncAnimations, { timeout: 1200 })
          : window.setTimeout(syncAnimations, 400);
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
