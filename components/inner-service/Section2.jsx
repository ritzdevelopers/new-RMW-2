import React from "react";

const services = [
  "BRANDING",
  "DIGITAL",
  "FILM & MOTION",
  "STRATEGY",
  "VISUAL IDENTITY SYSTEM",
  "PACKAGING",
  "STRUCTURE",
  "INNOVATION",
  "ENVIRONMENT DESIGN",
  "BRAND EXPERIENCE",
];

const Section2 = () => {
  return (
    <section className="relative w-full bg-[#f1f1f1]" data-node-id="1:21">
      <div
        className="mx-auto flex w-full max-w-[1340px] flex-col gap-8 px-5 py-10 sm:gap-10 sm:px-8 sm:py-12 md:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-8 lg:py-14 xl:gap-12 xl:px-[50px] xl:py-16 min-[1265px]:gap-12"
        data-node-id="1:22"
      >
        {/* LEFT CONTENT */}
        <div
          className="w-full max-w-none text-center max-[1023px]:mx-auto lg:max-w-[640px] lg:text-left xl:max-w-[697px] min-[1265px]:max-w-[900px]"
          data-node-id="1:23"
        >
          <p
            className="m-0 text-[16px] font-medium leading-normal text-[#33333399] sm:text-[18px] md:text-[20px] lg:text-[18px] xl:text-[20px] min-[1265px]:text-[24px]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            TAKING WHISKY WHERE IT’S NEVER BEEN
          </p>

          <p
            className="m-0 mt-3 text-[20px] font-normal capitalize leading-[1.45] text-[#333333] sm:mt-4 sm:text-[24px] sm:leading-[1.45] md:text-[28px] md:leading-[1.5] lg:text-[26px] lg:leading-[1.45] xl:text-[30px] xl:leading-[1.5] min-[1265px]:text-[36px] min-[1265px]:leading-[61px]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            To connect Johnnie Walker Blue Label with a new generation of luxury
            drinkers, we turned whisky cues on their head – creating a
            fashion-led brand collaboration with ski brand Perfect Moment. The
            result? Packaging that doubles as a wearable puffer bag, a bold
            break into après-ski culture, and a global sell-out in 49v markets.
            A launch campaign that fused product and lifestyle, sparked
            record-breaking fandom, and gave Blue Label a whole new kind of
            cultural relevance.
          </p>
        </div>

        {/* SERVICES — hidden below 1024px */}
        <div
          className="hidden w-full max-w-none flex-col items-start sm:max-w-[320px] md:max-w-[340px] lg:flex lg:max-w-[280px] lg:items-end lg:pt-16 xl:max-w-[320px] xl:pt-20 min-[1265px]:max-w-[362px] min-[1265px]:pt-24"
          data-node-id="1:26"
        >
          <p
            className="m-0 text-[16px] font-medium uppercase leading-normal text-[#33333399] sm:text-[17px] lg:text-[16px] xl:text-[18px] min-[1265px]:text-[20px]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Services
          </p>

          <div className="mt-3 flex w-full flex-col gap-[6px] items-start text-[16px] font-medium uppercase leading-[24px] text-[#333] sm:mt-4 sm:text-[17px] sm:leading-[26px] lg:items-end lg:text-[16px] lg:leading-[24px] xl:text-[18px] xl:leading-[26px] min-[1265px]:text-[20px] min-[1265px]:leading-[28px]">
            {services.map((service) => (
              <p
                key={service}
                className="m-0"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {service}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
