"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { isAutomationLab } from "@/lib/isAutomationLab";

const Section5 = dynamic(() => import("./Section5"));

function Section5Fallback() {
  return (
    <section
      className="bg-[#FAFAFA] px-8 py-[35px] md:px-12 md:py-[70px] min-h-[720px]"
      aria-hidden
    />
  );
}

export default function Section5Deferred() {
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
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  if (shouldMount) {
    return (
      <Suspense fallback={<Section5Fallback />}>
        <Section5 />
      </Suspense>
    );
  }

  return <section ref={hostRef} className="bg-[#FAFAFA] min-h-[720px]" aria-hidden />;
}
