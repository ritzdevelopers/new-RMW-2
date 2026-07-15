import React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import Section1Row2 from "./Section1Row2";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const Section1 = () => {
  return (
    <section className="w-full">
      {/* Full-bleed banner — left/right edge touch */}
      <div className="relative w-full overflow-hidden">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full md:aspect-[3/4] lg:min-h-[780px] lg:aspect-auto xl:h-[664px] xl:min-h-0 xl:aspect-auto">
            <Image
              src="/portfolio/portfolio-banner-1.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/5] w-full md:aspect-[3/4] lg:min-h-[780px] lg:aspect-auto xl:h-[664px] xl:min-h-0 xl:aspect-auto">
            <Image
              src="/portfolio/portfolio-banner-2.jpeg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <p
          className={`${playfair.className} pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 w-[min(92%,520px)] -translate-x-1/2 -translate-y-1/2 text-center text-[22px] font-normal leading-[1.25] tracking-[-0.01em] text-black sm:text-[22px] md:text-[22px] lg:text-[25px] xl:text-[25px]`}
        >
          Our work speaks for itself
        </p>
      </div>

      <div className="w-full">
        <Section1Row2 />
      </div>
    </section>
  );
};

export default Section1;
