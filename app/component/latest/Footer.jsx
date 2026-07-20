"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const sequelFontFamily = '"Sequel Sans", sans-serif';

const connectLabelStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  color: "#FFFFFF99",
};

const linkStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const contactTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "22px",
  letterSpacing: "0",
  textAlign: "center",
  color: "#FFFFFF99",
};

const navLinkStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 500,
  fontSize: "40px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const brandTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 420,
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const serviceTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 420,
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const serviceTextClassName =
  "text-[14px] md:text-[12px] lg:text-[13px] xl:text-[18px]";

const servicesRow1 = [
  "DIGITAL MARKETING",
  "CONTENT MARKETING",
  "INFLUENCER MARKETING",
];

const servicesRow2 = [
  "WEB DEVELOPMENT",
  "CREATIVE SERVICES",
  "PRINT ADVERTISEMENT",
];

const copyrightTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 410,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  color: "#FFFFFF66",
};

const connectLinks = [
  { label: "GET IN TOUCH", href: "/contact" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/ritzmediaworld/" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/ritz-media-world/" },
  { label: "TWITTER", href: "https://twitter.com/ritzmediaworld" },
  { label: "YOUTUBE", href: "https://www.youtube.com/@ritzmediaworld" },
];

const mainNavLinks = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/case-study" },
  { label: "ABOUT", href: "/about.html" },
  { label: "BLOGS", href: "/blog" },
  { label: "CAREER", href: "/career" },
];

const partnerLogos = [
  {
    src: "/contact/ins.png",
    alt: "Indian Newspaper Society",
    title: "Indian Newspaper Society",
  },
  {
    src: "/contact/meta.png",
    alt: "Meta Business Partner",
    title: "Meta Business Partner",
  },
  {
    src: "/contact/google.png",
    alt: "Google Partner",
    title: "Google Partner",
  },
  {
    src: "/contact/msme.png",
    alt: "MSME",
    title: "MSME",
  },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (from, to, t) => from + (to - from) * t;
const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches;

const getTextMetrics = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rect = range.getBoundingClientRect();
  return { left: rect.left, width: rect.width };
};

const getBrandGap = () => (window.innerWidth < 768 ? 10 : 16);

const getBrandTargets = (wrap, ritz, mediaworld) => {
  const prevRitz = ritz.style.transform;
  const prevMw = mediaworld.style.transform;
  ritz.style.transform = "translate3d(0,0,0)";
  mediaworld.style.transform = "translate3d(0,0,0)";

  const wrapRect = wrap.getBoundingClientRect();
  const centerX = wrapRect.left + wrapRect.width / 2;
  const gap = getBrandGap();
  const ritzM = getTextMetrics(ritz);
  const mwM = getTextMetrics(mediaworld);
  const groupLeft = centerX - (ritzM.width + gap + mwM.width) / 2;

  const targets = {
    ritzX: groupLeft - ritzM.left,
    mwX: groupLeft + ritzM.width + gap - mwM.left,
  };

  ritz.style.transform = prevRitz;
  mediaworld.style.transform = prevMw;
  return targets;
};

const MediaWorldText = () => (
  <span
    data-footer-mediaworld
    className="inline-flex shrink-0 items-baseline gap-[6px] whitespace-nowrap !text-[28px] md:gap-2 md:!text-[74px]"
    style={brandTextStyle}
  >
    <span>MEDIA</span>
    <span>WORLD</span>
  </span>
);

/**
 * Footer with an optional curtain/shutter reveal (vanilla JS, no GSAP).
 *
 * Pass a full section via the `section` prop. On desktop the section acts as a
 * curtain that slides up on scroll to reveal the footer sitting behind it, while
 * the brand text morphs together. On mobile the section simply stacks above the
 * footer.
 *
 * @param {{ section?: import("react").ReactNode | null }} props
 */
const Footer = ({ section = null }) => {
  const stackRef = useRef(null);
  const stageRef = useRef(null);
  const overlayRef = useRef(null);
  const footerRef = useRef(null);
  const revealLogoRef = useRef(null);
  const brandBannerRef = useRef(null);

  // Curtain reveal (only when a section is passed).
  useEffect(() => {
    if (!section) return;

    const stack = stackRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const footer = footerRef.current;
    const logo = revealLogoRef.current;
    const banner = brandBannerRef.current;
    if (!stack || !stage || !overlay || !footer) return;

    const wrap = banner?.querySelector("[data-footer-brand-wrap]") ?? null;
    const ritz = banner?.querySelector("[data-footer-ritz]") ?? null;
    const mediaworld = banner?.querySelector("[data-footer-mediaworld]") ?? null;
    const services = banner
      ? Array.from(banner.querySelectorAll("[data-footer-services]"))
      : [];
    const hasBrand = Boolean(wrap && ritz && mediaworld && services.length);

    let revealDistance = 0;
    let stackTop = 0;
    let brandTargets = { ritzX: 0, mwX: 0 };
    let desktop = false;
    let raf = 0;

    const resetStyles = () => {
      overlay.style.transform = "";
      overlay.style.pointerEvents = "";
      footer.style.pointerEvents = "";
      stack.style.height = "";
      if (logo) {
        logo.style.transform = "";
        logo.style.opacity = "";
      }
      if (ritz) ritz.style.transform = "";
      if (mediaworld) mediaworld.style.transform = "";
      services.forEach((el) => {
        el.style.opacity = "";
      });
    };

    const measure = () => {
      desktop = isDesktop();
      if (!desktop) {
        resetStyles();
        return;
      }
      revealDistance = stage.offsetHeight || window.innerHeight;
      // Sticky stage (100vh) + one reveal-distance of scroll room.
      stack.style.height = `${revealDistance * 2}px`;
      stackTop = stack.getBoundingClientRect().top + window.scrollY;
      if (hasBrand) brandTargets = getBrandTargets(wrap, ritz, mediaworld);
    };

    const apply = () => {
      raf = 0;
      if (!desktop) return;

      const progress = clamp(
        (window.scrollY - stackTop) / revealDistance,
        0,
        1,
      );

      overlay.style.transform = `translate3d(0, ${-progress * revealDistance}px, 0)`;

      if (logo) {
        const scale = lerp(0.4, 1, progress);
        const y = lerp(160, 0, progress);
        const rotation = lerp(-12, 0, progress);
        logo.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        logo.style.opacity = String(lerp(0.05, 0.5, progress));
      }

      if (hasBrand) {
        services.forEach((el) => {
          el.style.opacity = String(1 - progress);
        });
        ritz.style.transform = `translate3d(${brandTargets.ritzX * progress}px, 0, 0)`;
        mediaworld.style.transform = `translate3d(${brandTargets.mwX * progress}px, 0, 0)`;
      }

      const footerInteractive = progress >= 0.85;
      overlay.style.pointerEvents = footerInteractive ? "none" : "auto";
      footer.style.pointerEvents = footerInteractive ? "auto" : "none";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      apply();
    };

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    const settleTimer = window.setTimeout(onResize, 600);

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      if (raf) cancelAnimationFrame(raf);
      resetStyles();
    };
  }, [section]);

  // Standalone brand morph (no section) — driven as the footer scrolls in.
  useEffect(() => {
    if (section) return;

    const banner = brandBannerRef.current;
    if (!banner) return;

    const wrap = banner.querySelector("[data-footer-brand-wrap]");
    const ritz = banner.querySelector("[data-footer-ritz]");
    const mediaworld = banner.querySelector("[data-footer-mediaworld]");
    const services = Array.from(banner.querySelectorAll("[data-footer-services]"));
    if (!wrap || !ritz || !mediaworld || !services.length) return;

    let targets = { ritzX: 0, mwX: 0 };
    let desktop = false;
    let raf = 0;

    const reset = () => {
      ritz.style.transform = "";
      mediaworld.style.transform = "";
      services.forEach((el) => {
        el.style.opacity = "";
      });
    };

    const measure = () => {
      desktop = isDesktop();
      if (!desktop) {
        reset();
        return;
      }
      targets = getBrandTargets(wrap, ritz, mediaworld);
    };

    const apply = () => {
      raf = 0;
      if (!desktop) return;

      const vh = window.innerHeight;
      const top = banner.getBoundingClientRect().top;
      // Morph from banner top at 90% viewport → 35% viewport.
      const progress = clamp((0.9 * vh - top) / (0.55 * vh), 0, 1);

      services.forEach((el) => {
        el.style.opacity = String(1 - progress);
      });
      ritz.style.transform = `translate3d(${targets.ritzX * progress}px, 0, 0)`;
      mediaworld.style.transform = `translate3d(${targets.mwX * progress}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      apply();
    };

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      if (raf) cancelAnimationFrame(raf);
      reset();
    };
  }, [section]);

  const footerClassName =
    "relative w-full max-w-full overflow-x-clip bg-[#0E1125] px-8 pb-8 pt-10 md:px-12 md:pb-4 md:pt-12";

  const footerInner = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <img
          ref={revealLogoRef}
          src="/logo/r-logo-new.png"
          alt="Ritz Media World"
          title="Ritz Media World"
          className="h-[240px] w-auto max-w-none object-contain will-change-transform md:h-[440px]"
          style={{
            filter: "brightness(3.2) contrast(1.05)",
            opacity: section ? 0.05 : 0.5,
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-5 md:items-start md:gap-6">
            <span style={connectLabelStyle}>Connect</span>
            <nav className="flex flex-col items-center gap-3 md:items-start md:gap-4">
              {connectLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  style={linkStyle}
                  className="transition-opacity hover:opacity-70"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <nav className="flex flex-col items-center gap-4 md:gap-5 xl:gap-7">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                title={link.label}
                style={navLinkStyle}
                className="!text-[30px] transition-opacity hover:opacity-70 md:!text-[40px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center">
              <span style={connectLabelStyle}>Email</span>
              <a
                href="mailto:info@ritzmediaworld.com"
                title="Email Ritz Media World"
                style={contactTextStyle}
                className="mt-3 block transition-opacity hover:opacity-70"
              >
                info@ritzmediaworld.com
              </a>
            </div>

            <div className="flex flex-col items-center">
              <span style={connectLabelStyle}>Phone No.</span>
              <p style={contactTextStyle} className="mt-3">
                +91 9220516777 | +91 7290002168
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 w-fit max-w-full items-center justify-center border border-white/10 bg-white/[0.02] p-[10px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:mt-12 md:p-[20px]">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 lg:gap-10">
            {partnerLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                width={90}
                height={55}
                className="shrink-0 object-contain"
                style={{ width: "77px", height: "26px" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={brandBannerRef}
        className="relative z-[2] mt-8 w-full border-y border-[#FFFFFF1A] py-1 md:mt-12 md:py-8"
      >
        <div
          data-footer-brand-wrap
          className="relative mx-auto grid min-h-[130px] w-full max-w-[1500px] grid-cols-1 overflow-hidden px-8 md:min-h-[110px] md:px-12 lg:min-h-[90px]"
        >
          <div className="pointer-events-none relative z-[1] col-start-1 row-start-1 flex flex-col items-center justify-center gap-2 self-center py-2 text-center opacity-25 md:opacity-100">
            <p data-footer-services style={serviceTextStyle} className={serviceTextClassName}>
              {servicesRow1.map((service, index) => (
                <React.Fragment key={service}>
                  {index > 0 && <span className="mx-[10px]">•</span>}
                  {service}
                </React.Fragment>
              ))}
            </p>
            <p data-footer-services style={serviceTextStyle} className={serviceTextClassName}>
              {servicesRow2.map((service, index) => (
                <React.Fragment key={service}>
                  {index > 0 && <span className="mx-[10px]">•</span>}
                  {service}
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="relative z-[3] col-start-1 row-start-1 flex w-full items-end justify-between gap-2 self-end py-1 md:contents">
            <span
              data-footer-ritz
              style={brandTextStyle}
              className="inline-block shrink-0 !text-[28px] will-change-transform md:col-start-1 md:row-start-1 md:justify-self-start md:self-end md:!text-[74px]"
            >
              RITZ
            </span>

            <div className="shrink-0 will-change-transform md:col-start-1 md:row-start-1 md:justify-self-end md:self-end">
              <MediaWorldText />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <p
          className="mt-5 text-center !text-[13px] md:mt-7 md:!text-[18px]"
          style={copyrightTextStyle}
        >
          © 2026 Ritz Media World. All rights reserved.
        </p>
      </div>
    </>
  );

  if (!section) {
    return <footer className={footerClassName}>{footerInner}</footer>;
  }

  return (
    <div ref={stackRef} className="relative w-full max-w-full overflow-x-clip">
      <div
        ref={stageRef}
        className="relative bg-[#0E1125] md:sticky md:top-0 md:h-screen md:overflow-hidden"
      >
        <div
          ref={overlayRef}
          className="relative z-[10] w-full will-change-transform md:absolute md:inset-0"
        >
          {section}
        </div>

        <footer
          ref={footerRef}
          className={`${footerClassName} z-[1] md:absolute md:inset-x-0 md:bottom-0`}
        >
          {footerInner}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
