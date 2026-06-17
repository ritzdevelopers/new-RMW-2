  "use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const serviceTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 420,
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const serviceTextClassName = "text-[14px] md:text-[12px] lg:text-[13px] xl:text-[18px]";

const brandTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 420,
  fontSize: "74px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

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
  { label: "WORK", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "SERVICES", href: "#" },
];

const partnerLogos
 = [
  { src: "/contact/ins.png", alt: "Indian Newspaper Society" },
  { src: "/contact/meta.png", alt: "Meta Business Partner" },
  { src: "/contact/google.png", alt: "Google Partner" },
  { src: "/contact/msme.png", alt: "MSME" },
];

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

const getTextMetrics = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rect = range.getBoundingClientRect();
  return { left: rect.left, width: rect.width };
};

const getBrandGap = () => {
  const w = window.innerWidth;
  if (w >= 1441) return -95;
  if (w > 391 && w < 426) return -140;
  return 0;
};

const getBrandTargets = (wrap, ritz, mediaworld) => {
  gsap.set(ritz, { x: 0 });
  gsap.set(mediaworld, { x: 0 });
  const wrapRect = wrap.getBoundingClientRect();
  const centerX = wrapRect.left + wrapRect.width / 2;

  if (window.innerWidth >= 1441) {
    const ritzM = getTextMetrics(ritz);
    const mwM = getTextMetrics(mediaworld);
    const gap = getBrandGap();
    const groupLeft = centerX - (ritzM.width + gap + mwM.width) / 2;
    return {
      ritzX: groupLeft - ritzM.left,
      mwX: groupLeft + ritzM.width + gap - mwM.left,
    };
  }

  const ritzRect = ritz.getBoundingClientRect();
  const mwRect = mediaworld.getBoundingClientRect();
  const gap = getBrandGap();
  const groupLeft = centerX - (ritzRect.width + gap + mwRect.width) / 2;
  return {
    ritzX: groupLeft - ritzRect.left,
    mwX: groupLeft + ritzRect.width + gap - mwRect.left,
  };
};

const MediaWorldText = () => (
  <span
    data-footer-mediaworld
    className="inline-block shrink-0 whitespace-nowrap !text-[33px] md:!text-[74px]"
    style={brandTextStyle}
  >
    MEDIAWORLD
  </span>
);

const Footer = ({ overlaySection = null }) => {
  const stackRef = useRef(null);
  const overlayRef = useRef(null);
  const footerRef = useRef(null);
  const brandBannerRef = useRef(null);

  useLayoutEffect(() => {
    const banner = brandBannerRef.current;
    if (!banner) return;

    const wrap = banner.querySelector("[data-footer-brand-wrap]");
    const ritz = banner.querySelector("[data-footer-ritz]");
    const mediaworld = banner.querySelector("[data-footer-mediaworld]");
    const services = banner.querySelectorAll("[data-footer-services]");

    if (!wrap || !ritz || !mediaworld || !services.length) return;

    const getTargets = () => getBrandTargets(wrap, ritz, mediaworld);

    let onRefreshInit = null;

    const ctx = gsap.context(() => {
      let targets = getTargets();
      gsap.set(services, { opacity: 1 });

      const useStackReveal =
        overlaySection &&
        stackRef.current &&
        footerRef.current &&
        window.matchMedia("(min-width: 768px)").matches;

      if (useStackReveal) return;

      const scrollConfig = {
              trigger: banner,
              start: "top 90%",
              end: "top 35%",
              scrub: true,
              invalidateOnRefresh: true,
            };

      onRefreshInit = () => {
        targets = getTargets();
      };

      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      gsap
        .timeline({ scrollTrigger: scrollConfig })
        .to(services, { opacity: 0, ease: "none", duration: 1 }, 0)
        .to(ritz, { x: () => targets.ritzX, ease: "none", duration: 1 }, 0)
        .to(mediaworld, { x: () => targets.mwX, ease: "none", duration: 1 }, 0);
    }, banner);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (onRefreshInit) {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      }
      ctx.revert();
    };
  }, [overlaySection]);

  useLayoutEffect(() => {
    if (!overlaySection || !stackRef.current || !overlayRef.current || !footerRef.current) {
      return;
    }

    if (!window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    const stack = stackRef.current;
    const overlay = overlayRef.current;
    const footer = footerRef.current;
    let onBrandRefreshInit = null;

    const ctx = gsap.context(() => {
      const getRevealDistance = () => footer.offsetHeight;

      gsap.set(overlay, { y: 0 });

      const banner = brandBannerRef.current;
      const wrap = banner?.querySelector("[data-footer-brand-wrap]");
      const ritz = banner?.querySelector("[data-footer-ritz]");
      const mediaworld = banner?.querySelector("[data-footer-mediaworld]");
      const services = banner?.querySelectorAll("[data-footer-services]");

      const getTargets = () => {
        if (!wrap || !ritz || !mediaworld) return { ritzX: 0, mwX: 0 };
        return getBrandTargets(wrap, ritz, mediaworld);
      };

      let brandTargets = { ritzX: 0, mwX: 0 };

      if (wrap && ritz && mediaworld && services?.length) {
        brandTargets = getTargets();
        gsap.set(services, { opacity: 1 });

        onBrandRefreshInit = () => {
          brandTargets = getTargets();
        };
        ScrollTrigger.addEventListener("refreshInit", onBrandRefreshInit);
      }

      const syncConnectLinkClicks = (progress) => {
        stack.querySelectorAll(".pin-spacer").forEach((el) => {
          el.style.pointerEvents = "none";
        });
        const revealed = progress >= 0.85;
        overlay.style.pointerEvents = revealed ? "none" : "auto";
        footer.style.pointerEvents = "auto";
        footer.style.zIndex = revealed ? "20" : "1";
      };

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: "top top",
          end: () => `+=${getRevealDistance()}`,
          scrub: true,
          pin: overlay,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 0,
          onRefresh: () => syncConnectLinkClicks(revealTl.scrollTrigger?.progress ?? 0),
          onUpdate: (self) => syncConnectLinkClicks(self.progress),
          onLeave: () => syncConnectLinkClicks(1),
          onEnterBack: (self) => syncConnectLinkClicks(self.progress),
        },
      });

      syncConnectLinkClicks(0);

      revealTl.to(overlay, { y: () => -getRevealDistance(), ease: "none", duration: 1 }, 0);

      if (wrap && ritz && mediaworld && services?.length) {
        revealTl
          .to(services, { opacity: 0, ease: "none", duration: 1 }, 0)
          .to(ritz, { x: () => brandTargets.ritzX, ease: "none", duration: 1 }, 0)
          .to(mediaworld, { x: () => brandTargets.mwX, ease: "none", duration: 1 }, 0);
      }
    }, stack);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      if (onBrandRefreshInit) {
        ScrollTrigger.removeEventListener("refreshInit", onBrandRefreshInit);
      }
      ctx.revert();
    };
  }, [overlaySection]);

  const footerClassName =
    "relative w-full overflow-hidden bg-[#0E1125] px-8 pb-8 pt-0 md:px-12 md:pb-4 md:pt-8";

  const footerInner = (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Light Disp.otf")
            format("opentype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Bold Disp.otf")
            format("opentype");
          font-weight: 425;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Disp.otf")
            format("opentype");
          font-weight: 420;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Head.otf")
            format("opentype");
          font-weight: 370;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Roman Disp.otf")
            format("opentype");
          font-weight: 410;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <img
          src="/logo/r-logo-new.png"
          alt=""
          className="h-[300px] w-[250px] max-w-none rotate-[-13deg] object-contain md:h-[517px] md:w-[431px]"
          style={{
            filter: "brightness(3.2) contrast(1.05)",
            opacity: 0.50,
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="flex flex-col gap-5 md:gap-6">
            <span style={connectLabelStyle} className="mt-8">Connect</span>
            <nav className="relative z-10 flex flex-col gap-3 pointer-events-auto md:gap-4">
              {connectLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  className="relative z-10 pointer-events-auto !text-[17px] transition-opacity hover:opacity-70 md:!text-[18px]"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <nav className="relative flex flex-col items-center gap-4 md:gap-5 xl:gap-6 l4:gap-5">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={navLinkStyle}
                className="relative z-[1] !text-[30px] transition-opacity hover:opacity-70 md:!text-[40px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-3 text-center md:gap-5">
            <div className="flex flex-col items-center md:mt-15 mt-2">
              <span style={connectLabelStyle}>Email</span>
              <a
                href="mailto:info@ritzmediaworld.com"
                style={contactTextStyle}
                className="md:mt-4 mt-2 block transition-opacity hover:opacity-70 "
              >
                info@ritzmediaworld.com
              </a>
            </div>

            <div className="flex flex-col items-center">
              <span style={connectLabelStyle}>Phone No.</span>
              <p style={contactTextStyle} className="mt-4 lg:!text-[17px] xl:!text-[18px]">
                +919220516777 | +917290002168
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 w-fit max-w-full items-center p-[10px] justify-center border border-white/10 bg-white/[0.02] md:p-[20px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 lg:gap-10">
            {partnerLogos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={55}
                className="shrink-0 object-contain"
                style={{ width: "77px", height: "26px" }}
              />
            ))}
          </div>
        </div>

        <div
          ref={brandBannerRef}
          className="relative left-1/2 mt-4 w-screen -translate-x-1/2 border-y border-[#FFFFFF1A] py-1 md:mt-12 md:py-8 lg:mt-14"
        >
          <div
            data-footer-brand-wrap
            className="relative mx-auto grid min-h-[130px] w-full max-w-[1500px] grid-cols-1 px-8 md:min-h-[110px] md:px-12 lg:min-h-[90px]"
          >
            <div className="relative z-[1] col-start-1 row-start-1 flex flex-col items-center justify-center gap-2 self-center py-2 text-center">
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

            <span
              data-footer-ritz
              style={brandTextStyle}
              className="relative z-[3] col-start-1 row-start-1 inline-block shrink-0 justify-self-start self-end !text-[33px] md:!text-[74px]"
            >
              RITZ
            </span>

            <div className="relative z-[3] col-start-1 row-start-1 shrink-0 justify-self-end self-end">
              <MediaWorldText />
            </div>
          </div>
        </div>

        <p className="mt-5 text-center !text-[13px] md:mt-7 md:!text-[18px]" style={copyrightTextStyle}>
          © 2026 Ritz Media World. All rights reserved.
        </p>
      </div>
    </>
  );

  return (
    <div ref={stackRef} className="relative isolate">
      {overlaySection ? (
        <div className="max-md:flex max-md:flex-col md:grid">
          <footer
            ref={footerRef}
            className={`${footerClassName} relative z-[1] max-md:order-2 w-full md:col-start-1 md:row-start-1 md:self-end md:sticky md:bottom-0`}
          >
            {footerInner}
          </footer>
          <div
            ref={overlayRef}
            className="relative z-[2] max-md:order-1 w-full bg-white will-change-transform md:col-start-1 md:row-start-1"
          >
            {overlaySection}
          </div>
        </div>
      ) : (
        <footer className={footerClassName}>{footerInner}</footer>
      )}
    </div>
  );
};

export default Footer;
