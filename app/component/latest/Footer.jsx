"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { label: "Contact Us", href: "/contact" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/ritzmediaworld/" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/ritzmediaworld/" },
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
const isLargeDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

const getTextMetrics = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rect = range.getBoundingClientRect();
  return { left: rect.left, width: rect.width };
};

const getBrandGap = () => (window.innerWidth < 768 ? 10 : 16);

const getBrandTargets = (brandWrap, brandRow, ritz, mediaworld) => {
  const prevRitz = ritz.style.transform;
  const prevMw = mediaworld.style.transform;
  ritz.style.transform = "translate3d(0,0,0)";
  mediaworld.style.transform = "translate3d(0,0,0)";

  const centerRect = brandWrap.getBoundingClientRect();
  const centerX = centerRect.left + centerRect.width / 2;
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

const applyBrandMorph = (ritz, mediaworld, targets, progress) => {
  ritz.style.transform = `translate3d(${targets.ritzX * progress}px, 0, 0)`;
  mediaworld.style.transform = `translate3d(${targets.mwX * progress}px, 0, 0)`;
};

const resetBrandMorph = (ritz, mediaworld) => {
  if (ritz) ritz.style.transform = "";
  if (mediaworld) mediaworld.style.transform = "";
};

const MediaWorldText = () => (
  <span
    className="inline-flex shrink-0 items-baseline gap-[6px] whitespace-nowrap !text-[28px] sm:!text-[32px] md:!text-[44px] lg:gap-2 lg:!text-[56px] xl:!text-[74px]"
    style={brandTextStyle}
  >
    <span>MEDIA</span>
    <span>WORLD</span>
  </span>
);

/**
 * Footer with optional curtain overlay section.
 * Desktop: overlay slides up on scroll, footer sits below in normal flow (always fully visible).
 * Mobile/tablet: overlay stacks above footer.
 * @param {{ section?: import("react").ReactNode }} props
 */
const Footer = ({ section = null }) => {
  const pathname = usePathname();
  const stackRef = useRef(null);
  const stageRef = useRef(null);
  const overlayRef = useRef(null);
  const footerRef = useRef(null);
  const revealLogoRef = useRef(null);
  const brandBannerRef = useRef(null);

  useEffect(() => {
    if (!section) return;

    const stack = stackRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const footer = footerRef.current;
    const logo = revealLogoRef.current;
    if (!stack || !stage || !overlay || !footer) return;

    let revealDistance = 0;
    let stackTop = 0;
    let brandTargets = { ritzX: 0, mwX: 0 };
    let desktop = false;
    let raf = 0;

    const getBrandElements = () => {
      const banner = brandBannerRef.current;
      if (!banner) return null;
      const brandWrap = banner.querySelector("[data-footer-brand-wrap]");
      const brandRow = banner.querySelector("[data-footer-brand-row]");
      const ritz = banner.querySelector("[data-footer-ritz]");
      const mediaworld = banner.querySelector("[data-footer-mediaworld]");
      if (!brandWrap || !brandRow || !ritz || !mediaworld) return null;
      return { brandWrap, brandRow, ritz, mediaworld };
    };

    const measureBrand = () => {
      const brand = getBrandElements();
      if (!brand) return;
      brandTargets = getBrandTargets(
        brand.brandWrap,
        brand.brandRow,
        brand.ritz,
        brand.mediaworld,
      );
    };

    const applyBrand = (progress) => {
      const brand = getBrandElements();
      if (!brand) return;
      applyBrandMorph(brand.ritz, brand.mediaworld, brandTargets, progress);
    };

    const resetStyles = () => {
      overlay.style.transform = "";
      overlay.style.pointerEvents = "";
      overlay.style.visibility = "";
      overlay.style.display = "";
      footer.style.transform = "";
      footer.style.pointerEvents = "";
      footer.scrollTop = 0;
      stack.style.height = "";
      if (logo) {
        logo.style.transform = "";
        logo.style.opacity = "";
      }
      const brand = getBrandElements();
      if (brand) resetBrandMorph(brand.ritz, brand.mediaworld);
    };

    const measure = () => {
      desktop = isLargeDesktop();
      if (!desktop) {
        resetStyles();
        return;
      }
      revealDistance = stage.offsetHeight || window.innerHeight;
      stack.style.height = `${revealDistance * 2}px`;
      stackTop = stack.getBoundingClientRect().top + window.scrollY;
      measureBrand();
    };

    const getProgress = () => {
      stackTop = stack.getBoundingClientRect().top + window.scrollY;
      return clamp((window.scrollY - stackTop) / revealDistance, 0, 1);
    };

    const apply = () => {
      raf = 0;
      if (!desktop) return;

      const progress = getProgress();
      overlay.style.transform = `translate3d(0, ${-progress * revealDistance}px, 0)`;
      applyBrand(progress);

      const footerInteractive = progress >= 0.85;
      overlay.style.pointerEvents = footerInteractive ? "none" : "auto";
      footer.style.pointerEvents = footerInteractive ? "auto" : "none";

      if (logo) {
        const scale = lerp(0.4, 1, progress);
        const y = lerp(160, 0, progress);
        const rotation = lerp(-12, 0, progress);
        logo.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        logo.style.opacity = String(lerp(0.05, 0.5, progress));
      }
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

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
            apply();
          })
        : null;

    resizeObserver?.observe(stack);
    resizeObserver?.observe(stage);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    window.addEventListener("rmw:footer-refresh", onResize);
    const settleTimer = window.setTimeout(onResize, 600);
    const lateSettleTimer = window.setTimeout(onResize, 1200);

    return () => {
      resizeObserver?.disconnect();
      window.clearTimeout(settleTimer);
      window.clearTimeout(lateSettleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("rmw:footer-refresh", onResize);
      if (raf) cancelAnimationFrame(raf);
      resetStyles();
    };
  }, [section, pathname]);

  useEffect(() => {
    if (section) return;

    const banner = brandBannerRef.current;
    if (!banner) return;

    const brandWrap = banner.querySelector("[data-footer-brand-wrap]");
    const brandRow = banner.querySelector("[data-footer-brand-row]");
    const ritz = banner.querySelector("[data-footer-ritz]");
    const mediaworld = banner.querySelector("[data-footer-mediaworld]");
    if (!brandWrap || !brandRow || !ritz || !mediaworld) return;

    let targets = { ritzX: 0, mwX: 0 };
    let desktop = false;
    let raf = 0;

    const measure = () => {
      desktop = isLargeDesktop();
      if (!desktop) {
        resetBrandMorph(ritz, mediaworld);
        return;
      }
      targets = getBrandTargets(brandWrap, brandRow, ritz, mediaworld);
    };

    const apply = () => {
      raf = 0;
      if (!desktop) return;
      const vh = window.innerHeight;
      const top = banner.getBoundingClientRect().top;
      const progress = clamp((0.9 * vh - top) / (0.55 * vh), 0, 1);
      applyBrandMorph(ritz, mediaworld, targets, progress);
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
    window.addEventListener("rmw:footer-refresh", onResize);
    const settleTimer = window.setTimeout(onResize, 600);

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("rmw:footer-refresh", onResize);
      if (raf) cancelAnimationFrame(raf);
      resetBrandMorph(ritz, mediaworld);
    };
  }, [section, pathname]);

  const footerClassName =
    "relative box-border w-full max-w-full overflow-x-clip bg-[#0E1125] px-6 pb-3 pt-6 sm:px-8 md:px-10 md:pb-3 md:pt-8 lg:px-8 lg:pb-3 lg:pt-5 xl:px-12 xl:pt-6";

  const footerPanel = (
    <div
      data-footer-panel
      className="relative flex w-full flex-col lg:min-h-full lg:justify-between lg:py-2"
    >
      <div className="relative z-[2] mx-auto w-full max-w-[1500px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-5 xl:gap-8">
          <div className="flex flex-col items-center gap-3 md:items-start md:gap-4">
            <span style={connectLabelStyle}>Connect</span>
            <nav className="flex flex-col items-center gap-2.5 md:items-start md:gap-3">
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

          <nav className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                title={link.label}
                style={navLinkStyle}
                className="!text-[26px] transition-opacity hover:opacity-70 sm:!text-[28px] md:!text-[32px] lg:!text-[34px] xl:!text-[40px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center">
              <span style={connectLabelStyle}>Email</span>
              <a
                href="mailto:info@ritzmediaworld.com"
                title="Email Ritz Media World"
                style={contactTextStyle}
                className="mt-2 block transition-opacity hover:opacity-70"
              >
                info@ritzmediaworld.com
              </a>
            </div>

            <div className="flex flex-col items-center">
              <span style={connectLabelStyle}>Phone No.</span>
              <p style={contactTextStyle} className="mt-2">
                +91 9220516777 | +91 7290002168
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 w-fit max-w-full border border-white/10 bg-white/[0.02] p-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:mt-6 md:p-3 lg:mt-5">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
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
        className="relative z-[2] mt-5 w-full border-y border-[#FFFFFF1A] py-3 md:mt-6 md:py-4 lg:mt-0 lg:py-4"
      >
        <div
          data-footer-brand-wrap
          className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center gap-2 overflow-hidden px-4 sm:px-6 md:gap-3 md:px-8 lg:px-10 xl:px-12"
        >
          <div className="pointer-events-none relative z-[1] mx-auto flex w-full max-w-[1320px] flex-col items-center justify-center gap-2 px-2 text-center md:px-6">
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

          <div
            data-footer-brand-row
            className="relative z-[2] mx-auto flex w-full max-w-[1320px] flex-wrap items-baseline justify-center gap-x-3 gap-y-1 px-2 sm:px-4 md:px-6 lg:flex-nowrap lg:justify-between lg:gap-2"
          >
            <span
              data-footer-ritz
              style={brandTextStyle}
              className="inline-block shrink-0 !text-[28px] sm:!text-[32px] md:!text-[40px] lg:will-change-transform lg:!text-[56px] xl:!text-[74px]"
            >
              RITZ
            </span>

            <div data-footer-mediaworld className="shrink-0 lg:will-change-transform">
              <MediaWorldText />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <p
          className="mt-4 mb-0 pb-2 text-center !text-[13px] md:mt-5 md:pb-2 md:!text-[16px] lg:mt-0 lg:!text-[18px]"
          style={copyrightTextStyle}
        >
          © 2026 Ritz Media World. All rights reserved.
        </p>
      </div>
    </div>
  );

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
          className="h-[160px] w-auto max-w-none object-contain will-change-transform sm:h-[180px] md:h-[220px] lg:h-[220px] xl:h-[280px] 2xl:h-[360px]"
          style={{
            filter: "brightness(3.2) contrast(1.05)",
            opacity: section ? 0.05 : 0.5,
          }}
        />
      </div>
      {footerPanel}
    </>
  );

  if (!section) {
    return <footer className={footerClassName}>{footerInner}</footer>;
  }

  return (
    <div
      key={pathname}
      ref={stackRef}
      className="relative w-full max-w-full overflow-x-clip"
    >
      <div
        ref={stageRef}
        className="relative flex flex-col bg-[#0E1125] lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden"
      >
        <footer
          ref={footerRef}
          className={`${footerClassName} relative z-[1] order-2 lg:absolute lg:inset-0 lg:overflow-x-clip lg:overflow-y-auto`}
        >
          {footerInner}
        </footer>

        <div
          ref={overlayRef}
          className="relative z-[10] order-1 w-full will-change-transform lg:absolute lg:inset-0 lg:h-full"
        >
          {section}
        </div>
      </div>
    </div>
  );
};

export default Footer;
