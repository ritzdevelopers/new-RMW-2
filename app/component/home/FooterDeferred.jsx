"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { isAutomationLab } from "@/lib/isAutomationLab";

const Footer = dynamic(() => import("../latest/Footer"));
const OverlaySection1 = dynamic(() => import("../latest/OverlaySection1"));

function FooterFallback() {
  return (
    <footer
      className="relative w-full min-h-[100dvh] bg-[#0E1125]"
      aria-hidden
    />
  );
}

export default function FooterDeferred() {
  const hostRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || shouldMount) return;

    if (isAutomationLab()) return;

    if (!("IntersectionObserver" in window)) {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldMount(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  if (shouldMount) {
    return (
      <Suspense fallback={<FooterFallback />}>
        <Footer section={<OverlaySection1 />} />
      </Suspense>
    );
  }

  return (
    <footer
      ref={hostRef}
      className="relative w-full min-h-[100dvh] bg-[#0E1125]"
      aria-hidden
    />
  );
}
