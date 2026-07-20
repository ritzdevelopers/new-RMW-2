"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mixtaProFamily = '"Mixta Pro", serif';
const sequelSansFamily = '"Sequel Sans", sans-serif';

const headingStyle = {
  fontFamily: mixtaProFamily,
  fontWeight: 400,
  letterSpacing: "1.2px",
  textTransform: "capitalize",
  color: "#000000",
  verticalAlign: "middle",
};

const subheadingStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 300,
  letterSpacing: "0px",
  color: "#00000099",
  verticalAlign: "middle",
};

const addressTitleStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 400,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  color: "#333333",
};

const addressBodyStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "26px",
  letterSpacing: "0",
  color: "#333333",
};

const OverlaySection2 = () => {
  const leftColRef = useRef(null);
  const mapRef = useRef(null);
  const [playMapReveal, setPlayMapReveal] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setPlayMapReveal(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const leftCol = leftColRef.current;
    if (!leftCol) return;

    const ctx = gsap.context(() => {
      const heading = leftCol.querySelector("[data-section2-heading]");
      const subheading = leftCol.querySelector("[data-section2-subheading]");
      const addressTitle = leftCol.querySelector("[data-section2-address]");
      if (!heading || !subheading || !addressTitle) return;

      gsap.set([heading, subheading], { xPercent: -110 });
      gsap.set(addressTitle, { yPercent: -110 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftCol,
          start: "top 85%",
          toggleActions: "restart reset restart reset",
        },
      });

      tl.to(heading, { xPercent: 0, duration: 2, ease: "power4.out" })
        .to(subheading, { xPercent: 0, duration: 2, ease: "power4.out" }, "-=1.5")
        .to(addressTitle, { yPercent: 0, duration: 2, ease: "power4.out" });
    }, leftCol);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-[60dvh] w-full max-w-full items-center overflow-x-clip bg-white px-8 py-14 md:px-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-start gap-8 md:gap-12 lg:flex-row lg:items-center lg:gap-10 xl:gap-0">
        <div ref={leftColRef} className="w-full lg:w-[40%] lg:shrink-0">
          <h2
            style={headingStyle}
            className="w-full overflow-hidden text-[28px] leading-[100%] md:text-[40px] lg:max-w-[500px] lg:text-[30px] xl:text-[48px] xl:leading-[60px]"
          >
            <span data-section2-heading className="inline-block">
              We transform brands. Your success is next.
            </span>
          </h2>

          <p
            style={subheadingStyle}
            className="mt-3 w-full overflow-hidden text-[16px] leading-[24px] md:mt-4 md:text-[20px] md:leading-[24px] lg:mt-8 lg:max-w-[500px] lg:leading-[28px]"
          >
            <span data-section2-subheading className="block w-full">
              Start your project now by booking a one-on-one consultation with our
              expert.
            </span>
          </p>

          <div className="mt-8 md:mt-12 lg:mt-16">
            <div className="inline-block">
              <h3
                style={addressTitleStyle}
                className="overflow-hidden text-[24px] md:text-[28px]"
              >
                <span data-section2-address className="inline-block">
                  Address
                </span>
              </h3>
              <span className="mt-2 block h-[2px] w-8 bg-[#E8783A]" />
            </div>

            <p
              style={addressBodyStyle}
              className="mt-5 max-w-sm text-[14px] leading-[24px] md:text-[16px] md:leading-[26px]"
            >
              402 - 404, 4th floor, Corporate Park , Tower A1, Sector 142,
              <br />
              Noida 201305
            </p>
          </div>
        </div>

        <div
          ref={mapRef}
          className="h-[200px] w-full overflow-hidden md:h-[400px] lg:h-[480px] lg:w-[80%]"
        >
          <div className="relative isolate h-full w-full overflow-hidden [transform:translateZ(0)]">
            <div
              className={`absolute inset-0 overflow-hidden ${
                playMapReveal
                  ? "section2-map-slide-reveal"
                  : "section2-map-slide-hidden"
              }`}
            >
              <iframe
                title="Ritz Media World Location"
                src="https://www.google.com/maps?q=Ritz+Media+World,+Unit+no,+Tower+A1,+Corporate+Park,+4th+floor,+402-404,+Sector+142,+Noida,+Uttar+Pradesh+201305&output=embed"
                className={`h-full w-full border-0 ${playMapReveal ? "section2-map-zoom" : ""}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes section2-map-clip-reveal {
          from {
            clip-path: inset(0% 0% 0% 100%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes section2-map-zoom {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }
        .section2-map-slide-hidden {
          clip-path: inset(0% 0% 0% 100%);
        }
        .section2-map-slide-reveal {
          animation: section2-map-clip-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .section2-map-zoom {
          transform-origin: center center;
          animation: section2-map-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .section2-map-slide-reveal,
          .section2-map-zoom {
            animation-duration: 0.35s;
            animation-timing-function: ease-out;
          }
        }
      `}</style>
    </section>
  );
};

export default OverlaySection2;
