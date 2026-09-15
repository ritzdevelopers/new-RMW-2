"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";

gsap.registerPlugin(ScrollTrigger);

const revealDefaults = {
  start: "top 82%",
  toggleActions: "play none none reverse",
};

const InnerService = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let ctx;

    const setup = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        /* ---------- Section 1: hero split ---------- */
        const hero = root.querySelector('[data-inner-section="hero"]');
        if (hero) {
          const panels = hero.querySelectorAll("[data-node-id='1:6'], [data-node-id='1:7']");
          const divider = hero.querySelector("[data-node-id='1:8']");
          const imgs = hero.querySelectorAll("img");

          gsap.set(panels, { opacity: 0 });
          gsap.set(imgs, { scale: 1.08, transformOrigin: "center center" });
          if (divider) gsap.set(divider, { scaleY: 0, transformOrigin: "center top" });

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          if (panels[0]) {
            heroTl.to(
              panels[0],
              { opacity: 1, duration: 1, ease: "power3.out" },
              0,
            );
          }
          if (panels[1]) {
            heroTl.to(
              panels[1],
              { opacity: 1, duration: 1, ease: "power3.out" },
              0.1,
            );
          }
          heroTl.to(
            imgs,
            { scale: 1, duration: 1.25, ease: "power3.out" },
            0,
          );
          if (divider) {
            heroTl.to(
              divider,
              { scaleY: 1, duration: 0.85, ease: "power3.out" },
              0.2,
            );
          }
        }

        /* ---------- Section 2: intro copy ---------- */
        const intro = root.querySelector('[data-inner-section="intro"]');
        if (intro) {
          const copy = intro.querySelector("[data-node-id='1:23']");
          const services = intro.querySelector("[data-node-id='1:26']");
          const serviceItems = services?.querySelectorAll("p") || [];

          if (copy) {
            gsap.from(copy.children, {
              opacity: 0,
              y: 48,
              duration: 1,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: intro,
                ...revealDefaults,
              },
            });
          }

          if (services) {
            gsap.from(services, {
              opacity: 0,
              x: 40,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: services,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (serviceItems.length) {
            gsap.from(serviceItems, {
              opacity: 0,
              y: 16,
              duration: 0.55,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: services,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        /* ---------- Section 3: carousel stage ---------- */
        const carousel = root.querySelector('[data-inner-section="carousel"]');
        if (carousel) {
          const stage = carousel.querySelector("#carousel");
          const arrows = carousel.querySelectorAll("button");

          gsap.from(stage, {
            opacity: 0,
            y: 60,
            scale: 0.94,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: carousel,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.from(arrows, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carousel,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });
        }

        /* ---------- Section 4: story + card ---------- */
        const story = root.querySelector('[data-inner-section="story"]');
        if (story) {
          const left = story.querySelector("[data-node-id='1:44']");
          const right = story.querySelector("[data-node-id='1:41']");
          const card = story.querySelector("[data-node-id='1:54']");

          if (left) {
            gsap.from(left.children, {
              opacity: 0,
              y: 56,
              duration: 0.95,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: left,
                ...revealDefaults,
              },
            });
          }

          if (right) {
            gsap.from(right, {
              opacity: 0,
              x: 70,
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: right,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (card) {
            gsap.from(card, {
              opacity: 0,
              y: 80,
              scale: 0.97,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        /* ---------- Section 5: gallery mosaic ---------- */
        const gallery = root.querySelector('[data-inner-section="gallery"]');
        if (gallery) {
          const frames = gallery.querySelectorAll(
            "[data-inner-section='gallery'] > div > div, [data-inner-section='gallery'] > div > div > div",
          );
          // Prefer direct image wrappers inside the main grid/flex container
          const tiles = gallery.querySelectorAll("img");

          tiles.forEach((img, index) => {
            const frame = img.parentElement;
            if (!frame) return;

            gsap.from(frame, {
              opacity: 0,
              y: 50,
              scale: 0.92,
              duration: 0.95,
              delay: (index % 4) * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: frame,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });

            gsap.fromTo(
              img,
              { scale: 1.1 },
              {
                scale: 1,
                duration: 1.25,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: frame,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });

          void frames;
        }

        /* ---------- Section 6: closing ---------- */
        const closing = root.querySelector('[data-inner-section="closing"]');
        if (closing) {
          const heading = closing.querySelector("h2");
          const copy = closing.querySelector("p");
          const media = closing.querySelector("div > div:last-child") || closing.querySelector("img")?.parentElement;

          if (heading) {
            gsap.from(heading, {
              opacity: 0,
              y: 40,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: closing,
                ...revealDefaults,
              },
            });
          }

          if (copy) {
            gsap.from(copy, {
              opacity: 0,
              y: 30,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: copy,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (media) {
            gsap.from(media, {
              opacity: 0,
              y: 60,
              scale: 0.96,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: media,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
      }, root);

      ScrollTrigger.refresh();
    };

    setup();

    const refresh = () => ScrollTrigger.refresh();
    const timers = [120, 450, 900, 1800].map((ms) => window.setTimeout(refresh, ms));

    const images = root.querySelectorAll("img");
    const onImgLoad = () => refresh();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImgLoad, { once: true });
    });

    window.addEventListener("resize", refresh);

    return () => {
      timers.forEach(clearTimeout);
      images.forEach((img) => img.removeEventListener("load", onImgLoad));
      window.removeEventListener("resize", refresh);
      ctx?.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="w-full overflow-x-hidden bg-white font-[family-name:var(--font-montserrat)]"
    >
      <div className="relative bg-white">
        <div data-inner-section="hero">
          <Section1 />
        </div>
        <div data-inner-section="intro">
          <Section2 />
        </div>
        <div data-inner-section="carousel">
          <Section3 />
        </div>
        <div data-inner-section="story">
          <Section4 />
        </div>
        <div data-inner-section="gallery">
          <Section5 />
        </div>
        <div data-inner-section="closing">
          <Section6 />
        </div>
      </div>
    </main>
  );
};

export default InnerService;
