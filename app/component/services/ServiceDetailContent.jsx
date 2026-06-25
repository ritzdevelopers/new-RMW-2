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
    <>
    
    </>
    // <section
    //   ref={sectionRef}
    //   className="overflow-x-clip bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 xl:py-24"
    // >
    //   <div className="mx-auto grid min-w-0 max-w-[1200px] gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
    //     <div className="min-w-0">
    //       <p
    //         data-svc-detail-reveal
    //         className="m-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[#666] sm:text-[11px] sm:tracking-[0.18em]"
    //         style={{ fontFamily: '"Sequel Sans", sans-serif' }}
    //       >
    //         No. {service.number} · {service.category}
    //       </p>

    //       <h2
    //         data-svc-detail-reveal
    //         className="mt-3 text-[28px] font-semibold uppercase leading-[1.05] tracking-[0] text-[#1D1D1B] sm:mt-4 sm:text-[36px] md:text-[52px] lg:text-[64px]"
    //         style={{ fontFamily: '"League Spartan", sans-serif' }}
    //       >
    //         {service.title}
    //       </h2>

    //       <p
    //         data-svc-detail-reveal
    //         className="mt-4 max-w-[760px] text-[15px] leading-[1.65] text-[#333] sm:mt-6 sm:text-[16px] md:text-[18px] md:leading-[1.75]"
    //         style={{ fontFamily: '"Montserrat", sans-serif' }}
    //       >
    //         {service.description}
    //       </p>

    //       <ul data-svc-detail-reveal className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
    //         {service.highlights.map((item) => (
    //           <li
    //             key={item}
    //             className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#1D1D1B] sm:text-[15px] md:text-[16px]"
    //             style={{ fontFamily: '"Montserrat", sans-serif' }}
    //           >
    //             <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD188]" />
    //             {item}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     <aside data-svc-detail-reveal className="min-w-0 lg:pt-2">
    //       <div className="overflow-hidden rounded-[14px] bg-[#0D1334] p-6 text-white sm:rounded-[18px] sm:p-8 md:p-10">
    //         <p
    //           className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[12px] sm:tracking-[0.16em]"
    //           style={{ fontFamily: '"Sequel Sans", sans-serif' }}
    //         >
    //           Ready to start?
    //         </p>
    //         <p
    //           className="mt-3 text-[20px] font-semibold uppercase leading-[1.15] sm:mt-4 sm:text-[24px] md:text-[28px]"
    //           style={{ fontFamily: '"League Spartan", sans-serif' }}
    //         >
    //           Let&apos;s build your next {service.title.toLowerCase()} campaign.
    //         </p>
    //         <Link
    //           href="/contact"
    //           className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-white/20 sm:mt-8 sm:px-6 sm:text-[13px] sm:tracking-[0.12em]"
    //           style={{ fontFamily: '"Sequel Sans", sans-serif' }}
    //         >
    //           Get in touch
    //           <i className="ri-arrow-right-up-line text-[15px] sm:text-[16px]" aria-hidden />
    //         </Link>
    //       </div>

    //       <Link
    //         href="/services"
    //         className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#666] transition-colors duration-300 hover:text-[#1D1D1B] sm:mt-5 sm:text-[13px] sm:tracking-[0.12em]"
    //         style={{ fontFamily: '"Sequel Sans", sans-serif' }}
    //       >
    //         <i className="ri-arrow-left-line text-[15px] sm:text-[16px]" aria-hidden />
    //         All services
    //       </Link>
    //     </aside>
    //   </div>
    // </section>
  );
};

export default ServiceDetailContent;
