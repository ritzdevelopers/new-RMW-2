"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetailContent = ({ service }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-svc-detail-reveal]", section).forEach((item, index) => {
        gsap.from(item, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.06,
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-8 py-14 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <p
            data-svc-detail-reveal
            className="m-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[#666]"
            style={{ fontFamily: '"Sequel Sans", sans-serif' }}
          >
            No. {service.number} · {service.category}
          </p>

          <h2
            data-svc-detail-reveal
            className="mt-4 text-[36px] font-semibold uppercase leading-[1.05] tracking-[0] text-[#1D1D1B] md:text-[52px] lg:text-[64px]"
            style={{ fontFamily: '"League Spartan", sans-serif' }}
          >
            {service.title}
          </h2>

          <p
            data-svc-detail-reveal
            className="mt-6 max-w-[760px] text-[16px] leading-[1.7] text-[#333] md:text-[18px] md:leading-[1.75]"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            {service.description}
          </p>

          <ul data-svc-detail-reveal className="mt-10 space-y-4">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#1D1D1B] md:text-[16px]"
                style={{ fontFamily: '"Montserrat", sans-serif' }}
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD188]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside data-svc-detail-reveal className="lg:pt-2">
          <div className="overflow-hidden rounded-[18px] bg-[#0D1334] p-8 text-white md:p-10">
            <p
              className="m-0 text-[12px] font-medium uppercase tracking-[0.16em] text-white/55"
              style={{ fontFamily: '"Sequel Sans", sans-serif' }}
            >
              Ready to start?
            </p>
            <p
              className="mt-4 text-[24px] font-semibold uppercase leading-[1.15] md:text-[28px]"
              style={{ fontFamily: '"League Spartan", sans-serif' }}
            >
              Let&apos;s build your next {service.title.toLowerCase()} campaign.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white/20"
              style={{ fontFamily: '"Sequel Sans", sans-serif' }}
            >
              Get in touch
              <i className="ri-arrow-right-up-line text-[16px]" aria-hidden />
            </Link>
          </div>

          <Link
            href="/services"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#666] transition-colors duration-300 hover:text-[#1D1D1B]"
            style={{ fontFamily: '"Sequel Sans", sans-serif' }}
          >
            <i className="ri-arrow-left-line text-[16px]" aria-hidden />
            All services
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default ServiceDetailContent;
