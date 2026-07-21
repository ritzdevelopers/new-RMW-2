"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { refreshFooterScroll } from "@/lib/footerRefresh";

/**
 * Re-sync scroll-driven animations after Next.js client navigations.
 * Layout-level components (e.g. Footer) can survive route changes and keep stale transforms.
 */
export default function RouteAnimationReset() {
  const pathname = usePathname();

  useEffect(() => {
    const syncAnimations = () => {
      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => {
            const element = trigger.trigger;
            if (element && !document.contains(element)) {
              trigger.kill();
            }
          });
          ScrollTrigger.refresh(true);
        })
        .catch(() => {});

      refreshFooterScroll();
      window.dispatchEvent(new Event("resize"));
    };

    syncAnimations();

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(syncAnimations);
    });
    const shortTimer = window.setTimeout(syncAnimations, 120);
    const settleTimer = window.setTimeout(syncAnimations, 600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(shortTimer);
      window.clearTimeout(settleTimer);
    };
  }, [pathname]);

  return null;
}
