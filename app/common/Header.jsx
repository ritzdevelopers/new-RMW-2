"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { services } from "../../data/services";

const workLinks = [
  { label: "Portfolio", href: "/gallery" },
  { label: "Case Studies", href: "/case-study" },
  { label: "Web Stories", href: "/web-stories" },
];

const navLinks = [
  { label: "GET IN TOUCH", href: "/contact" },
];

const linkClass =
  "font-sequel text-base font-[310] uppercase leading-none tracking-normal text-[#FFFFFF]";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-header-reveal]", header);
      if (!items.length) return;

      gsap.set(items, { yPercent: -110 });
      gsap.timeline({ delay: 0.15 })
        .to(items, {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.08,
        })
        .eventCallback("onComplete", () => {
          window.dispatchEvent(new CustomEvent("header-reveal-complete"));
        });
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header className="relative z-50 w-full bg-[#0D1334]">
      <div ref={headerRef} className="mx-auto flex w-full max-w-8xl items-center justify-between px-8 py-5 md:px-12">
        <Link href="/" className="shrink-0 overflow-hidden">
          <span data-header-reveal className="inline-block">
            <Image
              src="/logo/rmw.logo.png"
              alt="Ritz Media World"
              width={180}
              height={72}
              className="h-12 w-auto md:h-14"
              priority
            />
          </span>
        </Link>

        <div className="flex items-center gap-8 text-right md:gap-10">
          <nav className="hidden items-center gap-8 md:flex md:gap-10">
            <Link
              href="/about"
              className={`${linkClass} overflow-hidden`}
            >
              <span data-header-reveal className="inline-block">
                ABOUT
              </span>
            </Link>

            <div className="group relative">
              <Link
                href="/services"
                className={`${linkClass} overflow-hidden`}
              >
                <span data-header-reveal className="inline-flex items-center gap-1.5">
                  SERVICES
                  <i className="ri-arrow-down-s-line text-lg transition-transform duration-200 group-hover:rotate-180" aria-hidden />
                </span>
              </Link>

              <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 -ml-[200px] -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex min-w-max flex-col overflow-hidden border border-white/10 bg-[#0D1334] shadow-xl">
                  <div className="flex items-stretch border-b border-white/10">
                    {services.slice(0, 5).map((service, index) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        style={{ transitionDelay: `${80 + index * 40}ms` }}
                        className="whitespace-nowrap border-r border-white/10 px-4 py-3 font-sequel text-sm font-[310] uppercase leading-snug tracking-normal text-white opacity-0 transition-all duration-300 ease-out last:border-r-0 hover:bg-white/10 group-hover:opacity-100"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-stretch">
                    {services.slice(5).map((service, index) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        style={{ transitionDelay: `${280 + index * 40}ms` }}
                        className="whitespace-nowrap border-r border-white/10 px-4 py-3 font-sequel text-sm font-[310] uppercase leading-snug tracking-normal text-white opacity-0 transition-all duration-300 ease-out last:border-r-0 hover:bg-white/10 group-hover:opacity-100"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <button
                type="button"
                className={`${linkClass} overflow-hidden`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span data-header-reveal className="inline-flex items-center gap-1.5">
                  WORK
                  <i className="ri-arrow-down-s-line text-lg transition-transform duration-200 group-hover:rotate-180" aria-hidden />
                </span>
              </button>

              <div className="pointer-events-none invisible absolute right-0 top-full z-50 translate-y-1 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex min-w-max origin-top items-stretch overflow-hidden border border-white/10 bg-[#0D1334] shadow-xl">
                  {workLinks.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{ transitionDelay: `${80 + index * 60}ms` }}
                      className="whitespace-nowrap border-r border-white/10 px-5 py-3 font-sequel text-sm font-[310] uppercase leading-snug tracking-normal text-white opacity-0 transition-all duration-300 ease-out last:border-r-0 group-hover:opacity-100 hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${linkClass} overflow-hidden`}
              >
                <span data-header-reveal className="inline-block">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="shrink-0 cursor-pointer overflow-hidden md:hidden"
          >
            <span data-header-reveal className="inline-block">
              <Image
                src="/logo/menu.png"
                alt=""
                width={36}
                height={28}
                className="h-5 w-auto md:h-6"
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <nav
        className={`fixed top-0 right-0 z-[70] flex h-full w-[280px] max-w-[80vw] flex-col gap-8 bg-[#0D1334] px-8 pb-8 pt-24 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => {
            setMenuOpen(false);
            setWorkOpen(false);
          }}
          className="absolute top-8 right-8 flex cursor-pointer items-center justify-center text-white"
        >
          <i className="ri-close-line text-[22px]" aria-hidden />
        </button>
        <Link
          href="/about"
          className={linkClass}
          onClick={() => setMenuOpen(false)}
        >
          ABOUT
        </Link>

        <Link
          href="/services"
          className={linkClass}
          onClick={() => setMenuOpen(false)}
        >
          SERVICES
        </Link>

        <div>
          <button
            type="button"
            className={`${linkClass} flex w-full items-center justify-between`}
            aria-expanded={workOpen}
            onClick={() => setWorkOpen((open) => !open)}
          >
            WORK
            <i
              className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${workOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>

          <div
            className={`mt-3 flex flex-col gap-3 overflow-hidden pl-3 transition-all duration-300 ${
              workOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {workLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sequel text-sm font-[310] uppercase leading-snug tracking-normal text-white/90 transition-colors hover:text-white"
                onClick={() => {
                  setMenuOpen(false);
                  setWorkOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
