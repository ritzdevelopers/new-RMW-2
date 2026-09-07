"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Section2Hero from "./Section2Hero";

const Section2Background = dynamic(() => import("./Section2Background"));

const Section2 = () => {
  const sectionRef = useRef(null);
  const [shouldMountBackground, setShouldMountBackground] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || shouldMountBackground) return;

    if (!("IntersectionObserver" in window)) {
      setShouldMountBackground(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldMountBackground(true);
        observer.disconnect();
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMountBackground]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-8 py-[35px] md:px-12 md:py-[70px]"
    >
      <div className="absolute inset-0 z-0 bg-[#0F0E14]" aria-hidden />
      {shouldMountBackground ? <Section2Background /> : null}

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <Section2Hero />
      </div>
    </section>
  );
};

export default Section2;
