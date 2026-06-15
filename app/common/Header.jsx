"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const navLinks = [
  { label: "WORK", href: "#" },
  { label: "ABOUT", href: "/about" },
  { label: "GET IN TOUCH", href: "/contact" },
];

const linkClass =
  "font-sequel text-base font-[310] uppercase leading-none tracking-normal text-[#FFFFFF]";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="relative mx-auto w-full max-w-8xl bg-[#0D1334] px-8 py-5 md:px-12">
      <div ref={headerRef} className="flex items-center justify-between">
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
            className="shrink-0 cursor-pointer overflow-hidden"
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
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <nav
        className={`fixed top-0 right-0 z-50 flex h-full w-[280px] max-w-[80vw] flex-col gap-8 bg-[#0D1334] px-8 pb-8 pt-24 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
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
