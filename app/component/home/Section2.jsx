"use client";

import dynamic from "next/dynamic";
import Section2Hero from "./Section2Hero";

const Section2Background = dynamic(() => import("./Section2Background"));

const Section2 = () => {
  return (
    <section className="relative w-full overflow-hidden px-8 py-[35px] md:px-12 md:py-[70px]">
      <Section2Background />

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <Section2Hero />
      </div>
    </section>
  );
};

export default Section2;
