"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

const Section4 = dynamic(() => import("./Section4"));

const FALLBACK_CLASS =
  "relative isolate z-[2] bg-white px-8 py-[35px] md:min-h-[calc(88dvh+12vh)] md:px-12 md:py-[6vh]";

function Section4Fallback() {
  return <section className={FALLBACK_CLASS} aria-hidden />;
}

export default function Section4Deferred() {
  const hostRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || shouldMount) return;

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
      { rootMargin: "320px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  if (shouldMount) {
    return (
      <Suspense fallback={<Section4Fallback />}>
        <Section4 />
      </Suspense>
    );
  }

  return <section ref={hostRef} className={FALLBACK_CLASS} aria-hidden />;
}
