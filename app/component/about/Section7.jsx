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
  "md:ml-[40px]",
  "md:ml-[120px]",
  "md:-ml-12",
  "md:ml-[130px]",
  "md:-ml-12",
  "md:-ml-12",
];

const pairedGridRowClasses =
  "grid w-fit max-w-full grid-cols-2 items-center gap-x-6 gap-y-2 sm:gap-x-10 md:gap-x-16 lg:gap-x-24 xl:gap-x-32";

const serviceClass =
  "whitespace-nowrap uppercase leading-[100%] tracking-[0] text-[26px] sm:text-[30px] md:text-[42px] lg:text-[52px] xl:text-[60px]";

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
  const [hoveredService, setHoveredService] = useState(null);

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
        @media (min-width: 1440px) {
          .section7-service-text {
            font-size: 50px;
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="relative min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#0E1125]"
      >
        <div className="relative min-h-[100dvh] w-full">
          <Image
            src="/service/website%20banner%20%5BRecovered%5D-01.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/10" aria-hidden />

          <div
            className={`${leagueSpartan.className} relative z-10 flex min-h-[100dvh] flex-col justify-center px-8 py-14 md:px-12 md:py-16 lg:py-20 ${
              showContact ? "items-center" : ""
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
              <>
              <div className="flex w-full flex-col items-start gap-4 md:hidden">
                {serviceRows.flat().map((label, index) => (
                    <button
                      key={`mobile-${index}-${label}`}
                      type="button"
                      onClick={() => handleServiceClick(label)}
                      className={`${serviceClass} cursor-pointer border-0 bg-transparent p-0 text-left font-semibold text-white`}
                    >
                      {label}
                    </button>
                  ))}
              </div>
              <div
                className="hidden w-full flex-col gap-4 sm:gap-5 md:flex md:gap-6 lg:gap-8"
                onMouseLeave={() => setHoveredService(null)}
              >
              {serviceRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${
                    rowIndex === 3 || rowIndex === 5
                      ? pairedGridRowClasses
                      : "flex w-full flex-nowrap items-center gap-x-8 lg:gap-x-16"
                  } ${rowOffsetClasses[rowIndex] ?? ""}`}
                >
                  {row.map((label, index) => {
                    const itemKey = `${rowIndex}-${index}`;
                    return (
                    <button
                      key={`${rowIndex}-${index}-${label}`}
                      type="button"
                      onClick={() => handleServiceClick(label)}
                      onMouseEnter={() => setHoveredService(itemKey)}
                      className={`${serviceClass} cursor-pointer border-0 bg-transparent p-0 font-semibold text-white transition-opacity duration-300 ${
                        hoveredService && hoveredService !== itemKey ? "opacity-30" : "opacity-100"
                      }`}
                    >
                      {label}
                    </button>
                    );
                  })}
                </div>
              ))}
              </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Section7;
