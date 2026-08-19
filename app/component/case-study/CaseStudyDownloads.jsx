"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceDetailMediaButton from "@/app/component/services/ServiceDetailMediaButton";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 4200;
const LG_QUERY = "(min-width: 1024px)";

const headingStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  textTransform: "uppercase",
};

const bodyStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const cardTitleStyle = {
  color: "#333333",
  fontFamily: '"League Spartan", sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  textTransform: "uppercase",
};

const cardBodyStyle = {
  color: "#333333",
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const REPORTS = [
  {
    id: "outer-ring",
    region: "NCR Periphery",
    title: "The Outer Ring Report",
    subtitle: "NCR Periphery Outlook",
    description:
      "The Ring Awakens: Infrastructure, Premiumisation and the Next Wave of North India's Real Estate Story.",
    period: "Mid-Year 2026",
    pages: 13,
    fileName: "RMW Outer Ring Rd Market Intelligence Reports.pdf",
  },
  {
    id: "noida",
    region: "Noida",
    title: "Noida Luxury Outlook",
    subtitle: "Market Intelligence Report",
    description:
      "Beyond the Affordable Tag: How Infrastructure, Wealth and a New Buyer Are Re-Rating Noida's Real Estate Market.",
    period: "Mid-Year 2026",
    pages: 12,
    fileName: "RMW Noida Market Intelligence Reports.pdf",
  },
  {
    id: "gurgaon",
    region: "Gurgaon",
    title: "Gurgaon Luxury Outlook",
    subtitle: "Market Intelligence Report",
    description:
      "India's Most Mature Luxury Market and What Comes Next: Corridors, Circle Rates, and the Capital.",
    period: "Mid-Year 2026",
    pages: 13,
    fileName: "RMW Gurgaon Market Intelligence Reports.pdf",
  },
  {
    id: "ghaziabad",
    region: "Ghaziabad",
    title: "Ghaziabad Luxury Outlook",
    subtitle: "Market Intelligence Report",
    description:
      "Gateway Reimagined: Infrastructure, National Developers and a New Buyer Class Are Writing Ghaziabad's First Luxury Chapter.",
    period: "Mid-Year 2026",
    pages: 13,
    fileName: "RMW Ghaziabad Market Intelligence Reports.pdf",
  }, 
  {
    id: "north-india",
    region: "North India",
    title: "North India Market Trends",
    subtitle: "RMW Market Intelligence Report",
    description:
      "The Define Features of North India's 2026 Cycle Is That Outside Capital And Outside Developers .",
    period: "Mid-Year 2026",
    pages: 25,
    fileName: "RMW_North India Report creative_24 july_Revised.pdf",
  }
];

function getPdfHref(fileName) {
  return `/case-studies/${encodeURIComponent(fileName)}`;
}

function DownloadButton({ href, fileName, title }) {
  return (
    <a
      href={href}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <span className="relative z-10 font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] transition-colors duration-300 group-hover:text-white md:text-[14px]">
        Download Report
      </span>
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] md:h-9 md:w-9">
        <i className="ri-download-2-line text-[14px] md:text-[16px]" aria-hidden />
      </span>
    </a>
  );
}
function ReportCard({ report, index }) {
  return (
    <article className="flex h-full min-h-[340px] rounded-[16px] flex-col border border-[#0D1334]/10 bg-white p-5 sm:min-h-[360px] sm:p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="m-0 text-[11px] uppercase tracking-[0.18em] text-[#333333]/70 sm:text-[12px]"
            style={cardBodyStyle}
          >
            {report.region}
          </p>
          <h3
            className="m-0 mt-2 text-[20px] leading-[1.2] sm:text-[22px] md:text-[24px] lg:text-[26px]"
            style={cardTitleStyle}
          >
            {report.title}
          </h3>
          <p
            className="m-0 mt-1 text-[12px] uppercase tracking-[0.1em] text-[#333333]/55 sm:text-[13px]"
            style={cardBodyStyle}
          >
            {report.subtitle}
          </p>
        </div>
        <span
          className="shrink-0 text-[28px] leading-none text-[#0D1334]/12 sm:text-[32px]"
          style={cardTitleStyle}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p
        className="m-0 mt-4 flex-1 text-[14px] leading-[1.65] text-[#333333]/80 sm:mt-5 sm:text-[15px] md:leading-[1.7]"
        style={cardBodyStyle}
      >
        {report.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#0D1334]/10 pt-4 sm:mt-6 sm:pt-5">
        <span className="text-[12px] text-[#333333]/55 sm:text-[13px]" style={cardBodyStyle}>
          {report.period}
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-[#333333]/30 sm:inline-block" aria-hidden />
        <span className="text-[12px] text-[#333333]/55 sm:text-[13px]" style={cardBodyStyle}>
          {report.pages} pages
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-[#333333]/30 sm:inline-block" aria-hidden />
        <span className="text-[12px] text-[#333333]/55 sm:text-[13px]" style={cardBodyStyle}>
          PDF
        </span>
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
        <DownloadButton
          href={getPdfHref(report.fileName)}
          fileName={report.fileName}
          title={`Download ${report.title}`}
        />
        <ServiceDetailMediaButton
          label="Contact us"
          href="/contact"
          className="mt-0"
        />
      </div>
    </article>
  );
}

function CaseStudyDownloads() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const total = REPORTS.length;
  const pageCount = Math.max(1, total - slidesPerView + 1);

  useEffect(() => {
    const media = window.matchMedia(LG_QUERY);
    const sync = () => {
      setSlidesPerView(media.matches ? 2 : 1);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(((index % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    if (paused || pageCount <= 1) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pageCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, pageCount]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const block = section.querySelector("[data-cs-download-block]");
      const items = gsap.utils.toArray("[data-cs-download-reveal]", section);

      if (!block || !items.length) return;

      if (prefersReducedMotion) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 32 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: block,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const trackWidthPercent = (total / slidesPerView) * 100;
  const slideWidthPercent = 100 / total;
  const translatePercent = activeIndex * slideWidthPercent;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F1F1F1] py-14 md:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1340px] flex-col items-center max-xl:px-6 max-md:px-4">
        <div
          data-cs-download-block
          className="mx-auto flex w-full flex-col items-center xl:max-w-[1135px]"
        >
          <div
            data-cs-download-reveal
            className="mb-10 h-px w-full max-w-[220px] bg-[#0D1334]/20 md:mb-12"
          />

          <div className="flex w-full flex-col items-center px-6 sm:px-10 max-lg:px-0 max-lg:sm:px-4">
            <h2
              data-cs-download-reveal
              className="m-0 w-full text-center uppercase text-[24px] leading-[34px] sm:leading-[42px] md:text-[30px] md:leading-[38px] lg:text-[38px] lg:leading-[48px] xl:max-w-[1135px] xl:text-[48px] xl:leading-[57px]"
              style={headingStyle}
            >
              Download Our Latest Outlooks
            </h2>

            <p
              data-cs-download-reveal
              className="m-0 mt-5 w-full text-center text-[16px] leading-7 md:mt-6 lg:text-[18px] lg:leading-8 xl:max-w-[986px] xl:text-[20px] xl:leading-[30px]"
              style={bodyStyle}
            >
              Deep-dive Mid-Year 2026 reports from Ritz Media World covering NCR&apos;s
              key luxury and growth corridors with infrastructure, buyer, and market
              insights.
            </p>
          </div>
          
          <div
            data-cs-download-reveal
            className="mt-10 w-full sm:mt-12 lg:mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
            }}
          >
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${trackWidthPercent}%`,
                  transform: `translateX(-${translatePercent}%)`,
                }}
              >
                {REPORTS.map((report, index) => (
                  <div
                    key={report.id}
                    className="shrink-0 px-0 lg:px-3"
                    style={{ width: `${slideWidthPercent}%` }}
                    aria-hidden={
                      index < activeIndex || index >= activeIndex + slidesPerView
                    }
                  >
                    <ReportCard report={report} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-start gap-2 md:mt-8">
              {Array.from({ length: pageCount }).map((_, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className={`h-[0.5em] rounded-full transition-[width,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "w-[2.75em] bg-[#1D1D1B]"
                        : "w-[0.5em] bg-[#1D1D1B]/30 hover:bg-[#1D1D1B]/55"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div
            data-cs-download-reveal
            className="mt-10 flex w-full flex-col items-center border-t border-[#0D1334]/10 pt-8 text-center sm:mt-12 md:mt-14 md:pt-10"
          >
            <p
              className="m-0 max-w-[640px] text-[16px] leading-7 lg:text-[18px] lg:leading-8"
              style={bodyStyle}
            >
              Need a custom market brief for your project or brand? Our strategy team
              can help you turn insight into action.
            </p>
            <ServiceDetailMediaButton
              label="Request a Custom Briefing"
              href="/contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudyDownloads;
