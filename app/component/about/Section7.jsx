"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const serviceRows = [
  ["Digital Marketing", "Creative Service"],
  ["Print Advertisement", "Radio Advertisement"],
  ["Content Marketing", "Web Development"],
  ["Influencer Marketing", "Celebrity Endorsement"],
  ["Creative Service", "Print Advertisement"],
  ["Celebrity Endorsement", "Radio Advertisement"],
  ["Influencer Marketing", "Digital Marketing"],
];

const rowOffsetClasses = [
  "",
  "ml-[40px]",
  "ml-[120px]",
  "-ml-8 md:-ml-12",
  "ml-[130px]",
  "ml-[40px]",
  "-ml-8 md:-ml-12",
];

const serviceClass =
  "whitespace-nowrap uppercase leading-[100%] tracking-[0] text-[32px] md:text-[48px] lg:text-[60px]";

const contactInfo = {
  address: [
    "402 - 404, 4th floor, Corporate Park , Tower A1, Sector 142,",
    "Noida 201305",
  ],
  email: "info@ritzmediaworld.com",
  phone: "919220516777",
};

const Section7 = () => {
  const sectionRef = useRef(null);
  const [showContact, setShowContact] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceClick = (label) => {
    setSelectedService(label);
    setShowContact(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let wasVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (!isVisible || (isVisible && !wasVisible)) {
          setShowContact(false);
          setSelectedService("");
        }

        wasVisible = isVisible;
      },
      { threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes section7-contact-in {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .section7-contact-enter {
          animation: section7-contact-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/service/bg-image.png"
          alt=""
          width={1024}
          height={584}
          priority
          className="block h-auto w-full object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10" aria-hidden />

        <div
          className={`${leagueSpartan.className} absolute inset-0 z-10 flex flex-col justify-center px-8 py-20 md:px-12 md:py-15 ${
            showContact ? "items-center" : "gap-6 md:gap-8 lg:gap-10"
          }`}
        >
        {showContact ? (
          <div
            key={selectedService}
            className="section7-contact-enter max-w-[820px] text-left uppercase text-white"
          >
            <h2 className="m-0 text-[60px] font-semibold leading-[100%] tracking-[0]">
              {selectedService}
            </h2>
            <p className="m-0 mt-8 text-[14px] font-semibold leading-[140%] tracking-[0] md:text-[18px] lg:text-[22px]">
              {contactInfo.address[0]}
              <br />
              {contactInfo.address[1]}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-8 inline-block w-fit border-b border-white pb-1 text-[14px] font-semibold leading-[100%] tracking-[0] md:text-[18px] lg:text-[22px]"
            >
              {contactInfo.email}
            </a>
            <span className="mt-6 inline-block w-fit border-b border-white pb-1 text-[14px] font-semibold leading-[100%] tracking-[0] md:text-[18px] lg:text-[22px]">
              {contactInfo.phone}
            </span>
          </div>
        ) : (
          serviceRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex w-full flex-wrap items-center gap-x-8 gap-y-2 lg:gap-x-16 ${rowOffsetClasses[rowIndex] ?? ""}`}
            >
              {row.map((label, index) => (
                <button
                  key={`${rowIndex}-${index}-${label}`}
                  type="button"
                  onClick={() => handleServiceClick(label)}
                  className={`${serviceClass} cursor-pointer border-0 bg-transparent p-0 font-semibold text-[#FFFFFF4D] transition-colors duration-300 hover:text-white`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))
        )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Section7;
