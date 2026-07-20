"use client";

import { useState } from "react";

const EXPECTATIONS = [
  {
    title: "Professionally Designed Profile",
    body: "A polished, on-brand profile setup across platforms - visuals, bio, and highlights that make a strong first impression.",
  },
  {
    title: "Customized Strategy",
    body: "A tailored content and growth plan aligned to your brand goals, audience, and competitive landscape.",
  },
  {
    title: "Professional Content Creation",
    body: "High-quality creatives and copy crafted to stop the scroll, build desire, and stay consistent with your brand voice.",
  },
  {
    title: "Dedicated Accounts Manager",
    body: "A dedicated point of contact who understands your brand and keeps campaigns moving with clear communication.",
  },
  {
    title: "Community Management",
    body: "Timely engagement with comments, DMs, and mentions so your community feels heard and valued.",
  },
  {
    title: "Branding Consistency",
    body: "Unified visual language and messaging across posts, stories, and campaigns for a recognisable brand presence.",
  },
  {
    title: "Proactive Recommendations and Updates",
    body: "Ongoing insights and platform-aware recommendations so your social presence stays ahead of trends.",
  },
  {
    title: "Performance Tracking, Reporting & Strategy Sessions",
    body: "Clear reporting and strategy reviews that turn performance data into the next set of winning actions.",
  },
];

function Section7() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white p-20 max-xl:p-12 max-md:p-6">
      <div className="mx-auto flex w-full flex-col items-stretch justify-between gap-10 bg-[#FAFAFA] lg:flex-row lg:gap-16 xl:gap-20">
        {/* Left - cover lifestyle image */}
        <div
          className="relative min-h-[480px] w-full shrink-0 bg-no-repeat lg:min-h-[560px] lg:w-[48%] lg:bg-fixed"
          style={{ backgroundImage: "url('/social-media/creative5.avif')" }}
          role="img"
          aria-label="Social media lifestyle creative"
        />

        {/* Right - accordion content */}
        <div className="flex w-full flex-col justify-center mr-40 bg-[#FAFAFA] px-8 py-10 sm:px-10 md:px-12 lg:w-[44%] lg:max-w-[400px] lg:shrink-0 lg:px-0 lg:py-14 xl:py-16">
          <h2
            className="mb-10 text-[25px] font-[500] leading-[1.15] tracking-[-0.02em] text-[#1a1a1a] sm:mb-12"
          >
            What to expect
          </h2>

          <ul className="m-0 w-full list-none p-0">
            {EXPECTATIONS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <li key={item.title} className="border-b border-[#E6E6E6] pb-2">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors hover:text-black sm:py-[18px]"
                  >
                    <span className="text-[11px] font-[500] leading-[1.4] text-[#1a1a1a]">
                      {item.title}
                    </span>
                    <i
                      className={`ri-arrow-down-s-line shrink-0 text-[18px] text-[#1a1a1a] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 text-[11px] font-[300] leading-[1.7] text-[#555]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Section7;
