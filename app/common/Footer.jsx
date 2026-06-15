"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

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
  fontWeight: 425,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const contactTextStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 300,
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

const serviceTextClassName = "text-[18px] lg:text-[13px] xl:text-[18px]";

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

const MediaWorldText = () => {
  const textRef = useRef(null);
  const lastScrollY = useRef(0);
  const expandedRef = useRef(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.set(el, { maxWidth: "5.4ch" });
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastScrollY.current - 5 && !expandedRef.current) {
        expandedRef.current = true;
        gsap.to(el, { maxWidth: "11ch", duration: 0.7, ease: "power2.out" });
      } else if (currentY > lastScrollY.current + 5 && expandedRef.current) {
        expandedRef.current = false;
        gsap.to(el, { maxWidth: "5.4ch", duration: 0.7, ease: "power2.out" });
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      ref={textRef}
      className="inline-block shrink-0 self-end overflow-hidden whitespace-nowrap"
      style={brandTextStyle}
    >
      MEDIAWORLD
    </span>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0E1125] px-8 pb-8 pt-0 md:px-12 md:pb-4 md:pt-8">
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
          src="/contact/R-logo.png"
          alt=""
          className="h-[800px] w-auto max-w-none object-contain"
          style={{
            filter: "brightness(3.2) contrast(1.05)",
            // opacity: 0.22,
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="flex flex-col gap-5 md:gap-6">
            <span style={connectLabelStyle} className="mt-8">Connect</span>
            <nav className="flex flex-col gap-3 md:gap-4">
              {connectLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
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

          <nav className="relative flex flex-col items-center gap-4 md:gap-5 xl:gap-6 l4:gap-5">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={navLinkStyle}
                className="relative z-[1] transition-opacity hover:opacity-70 "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-6 text-center md:gap-5">
            <div className="flex flex-col items-center md:mt-15 mt-2">
              <span style={connectLabelStyle}>Email</span>
              <a
                href="mailto:info@ritzmediaworld.com"
                style={contactTextStyle}
                className="mt-4 block transition-opacity hover:opacity-70 "
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

        <div className="mx-auto mt-10 w-fit max-w-full items-center justify-center border border-white/10 bg-white/[0.02] p-[20px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-15">
            {partnerLogos
            .map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={55}
                className="shrink-0 object-contain"
                style={{ width: "63px", height: "35px" }}
              />
            ))}
          </div>
        </div>

        <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 border-y border-[#FFFFFF1A] py-6 md:mt-12 md:py-8 lg:mt-14">
          <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-6 px-8 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
            <span style={brandTextStyle} className="shrink-0 self-start">
              RITZ
            </span>

            <div className="flex flex-col items-center gap-2 text-center lg:mb-2 lg:gap-3">
              <p style={serviceTextStyle} className={serviceTextClassName}>
                {servicesRow1.map((service, index) => (
                  <React.Fragment key={service}>
                    {index > 0 && <span className="mx-[10px]">•</span>}
                    {service}
                  </React.Fragment>
                ))}
              </p>
              <p style={serviceTextStyle} className={serviceTextClassName}>
                {servicesRow2.map((service, index) => (
                  <React.Fragment key={service}>
                    {index > 0 && <span className="mx-[10px]">•</span>}
                    {service}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <MediaWorldText />
          </div>
        </div>

        <p className="mt-5 text-center !text-[13px] md:mt-7 md:!text-[18px]" style={copyrightTextStyle}>
          © 2026 Ritz Media World. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
