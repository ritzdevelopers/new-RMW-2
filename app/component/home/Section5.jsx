"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(36px, 5vw, 56px)",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const introStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "29px",
  letterSpacing: "0",
  color: "#000000",
};

const quoteStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "30px",
  letterSpacing: "0",
  color: "#000000",
};

const authorStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const roleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#00000099",
};

const slides = [
  {
    quote:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    author: "Eldeco Group",
    role: "Managing Director",
    image: "/home/Eldeco.jpg",
  },
  {
    quote:
      "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    author: "FAIRFOX - EON",
    role: "Marketing Head",
    image: "/home/Eon-by-fairfox.jpg",
  },
  {
    quote:
      "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
    author: "Madhusudan Ghee",
    role: "Managing Director",
    image: "/home/Madhusudan-Ghee.jpg",
  },
  {
    quote:
      "I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support.",
    author: "Escorts Tractor",
    role: "Chief Communication Officer",
    image: "/home/Escorts-Tractor.jpg",
  },
];

// Pointer travel before a gesture is claimed as a horizontal slide drag.
const DRAG_ACTIVATION = 8;

const Section5 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isFirstRender = useRef(true);
  const dragRef = useRef({ pointerId: null, startX: 0, startY: 0, dx: 0, axis: null });
  const slideDirection = useRef(1);
  const slide = slides[activeIndex];

  const applyDragOffset = (x, animate) => {
    [contentRef.current, imageRef.current].forEach((el) => {
      if (!el) return;
      el.style.transition = animate
        ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
        : "";
      el.style.transform = x ? `translate3d(${x}px, 0, 0)` : "";
    });
  };

  const endDrag = (event) => {
    const state = dragRef.current;
    const target = event.currentTarget;
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
    document.body.style.removeProperty("user-select");
    state.pointerId = null;
    state.axis = null;
    state.dx = 0;
  };

  const handleDragStart = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const state = dragRef.current;
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.dx = 0;
    state.axis = null;
  };

  const handleDragMove = (event) => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    if (!state.axis) {
      if (Math.abs(dx) < DRAG_ACTIVATION && Math.abs(dy) < DRAG_ACTIVATION) return;
      // A mostly vertical gesture belongs to page scrolling, not the slider
      if (Math.abs(dy) >= Math.abs(dx)) {
        state.pointerId = null;
        return;
      }
      state.axis = "x";
      event.currentTarget.setPointerCapture?.(event.pointerId);
      document.body.style.userSelect = "none";
    }

    state.dx = dx;
    applyDragOffset(dx * 0.45, false);
  };

  const handleDragEnd = (event) => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const { dx, axis } = state;
    const width = event.currentTarget.offsetWidth || 320;
    endDrag(event);
    if (axis !== "x") return;

    if (Math.abs(dx) > Math.min(120, width * 0.15)) {
      const direction = dx < 0 ? 1 : -1;
      slideDirection.current = direction;
      applyDragOffset(0, false);
      setActiveIndex((index) => (index + direction + slides.length) % slides.length);
    } else {
      applyDragOffset(0, true);
    }
  };

  const handleDragCancel = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    endDrag(event);
    applyDragOffset(0, true);
  };

  const dragBind = {
    onPointerDown: handleDragStart,
    onPointerMove: handleDragMove,
    onPointerUp: handleDragEnd,
    onPointerCancel: handleDragCancel,
    onDragStart: (event) => event.preventDefault(),
    style: { touchAction: "pan-y" },
  };

  // Defer all section media until near viewport so hero LCP keeps bandwidth.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadMedia(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Portrait image is desktop-only - skip download on smaller viewports.
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const content = contentRef.current;
    const image = imageRef.current;
    if (!content) return;

    // Drop any leftover drag transform/transition so GSAP owns the element
    [content, image].forEach((el) => {
      if (!el) return;
      el.style.transition = "";
      el.style.transform = "";
    });

    const fromX = 80 * slideDirection.current;
    slideDirection.current = 1;

    let ctx;
    let cancelled = false;

    // Load GSAP only when the user changes slides.
    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          content,
          { x: fromX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
        if (image) {
          gsap.fromTo(
            image,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.08 }
          );
        }
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [activeIndex]);

  // Prefetch neighbors only after the section is in range (desktop).
  useEffect(() => {
    if (!shouldLoadMedia || !isLg) return;

    const indexes = [
      (activeIndex + 1) % slides.length,
      (activeIndex - 1 + slides.length) % slides.length,
    ];

    indexes.forEach((index) => {
      const src = slides[index]?.image;
      if (!src) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [activeIndex, shouldLoadMedia, isLg]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAFAFA] px-8 py-[35px] md:px-12 md:py-[70px] [content-visibility:auto] [contain-intrinsic-size:auto_720px]"
    >
      <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <p
            className="m-0 text-center text-[30px] md:text-left md:text-[clamp(36px,5vw,56px)]"
            style={{
              fontFamily: headingStyle.fontFamily,
              fontWeight: headingStyle.fontWeight,
              lineHeight: headingStyle.lineHeight,
              letterSpacing: headingStyle.letterSpacing,
              textTransform: headingStyle.textTransform,
              color: headingStyle.color,
            }}
          >
            WHAT CLIENTS SAY
          </p>

          <p
            className="m-0 mx-auto mt-4 text-center md:text-left"
            style={introStyle}
          >
            Trusted by leading brands to create meaningful growth.
          </p>

          <div
            {...dragBind}
            className="mt-10 cursor-grab overflow-hidden active:cursor-grabbing md:mt-12"
          >
            {shouldLoadMedia ? (
              <img
                src="/home/double-quotes.svg"
                alt=""
                width={88}
                height={88}
                loading="lazy"
                decoding="async"
                className="block h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
                aria-hidden
              />
            ) : (
              <div
                className="h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
                aria-hidden
              />
            )}

            <div ref={contentRef}>
              <p
                className="m-0 mt-0 max-w-[1200px] text-[16px] leading-[22px] md:text-[22px] md:leading-[30px]"
                style={{
                  fontFamily: quoteStyle.fontFamily,
                  fontWeight: quoteStyle.fontWeight,
                  letterSpacing: quoteStyle.letterSpacing,
                  color: quoteStyle.color,
                }}
              >
                {slide.quote}
              </p>

              <p className="m-0 mt-8" style={authorStyle}>
                {slide.author}
              </p>

              <p className="m-0 mt-2" style={roleStyle}>
                {slide.role}
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-2 md:mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full bg-[#00000033] transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-[#000000]" : "w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          {...dragBind}
          className="mx-auto hidden w-full max-w-[420px] shrink-0 cursor-grab active:cursor-grabbing lg:mx-0 lg:block lg:max-w-[460px]"
        >
          {shouldLoadMedia && isLg ? (
            <div ref={imageRef}>
              <Image
                src={slide.image}
                alt={slide.author}
                width={460}
                height={580}
                sizes="(min-width: 1024px) 460px, 0px"
                quality={75}
                loading="lazy"
                decoding="async"
                className="mt-3 block h-auto w-full object-contain shadow-md lg:mt-35"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Section5;