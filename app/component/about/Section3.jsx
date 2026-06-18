"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "86px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
  textAlign: "center",
};

const buttonStyle = {
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const GalleryImage = ({ src, alt = "", width, height, className = "" }) => (
  <div
    className={`relative shrink-0 overflow-hidden rounded-[16px] ${className}`}
    style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
  >
    <Image src={src} alt={alt} fill className="object-cover" sizes={`${width}px`} />
  </div>
);

const Section3 = () => {
  return (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Roman Body.otf")
            format("opentype");
          font-weight: 310;
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
      `}</style>

      <section className="bg-[#F1F1F1] px-8 py-0 md:px-12 md:pt-0 pb-[35px] md:pb-[70px]">
        <div className="mx-auto w-full max-w-[1500px]">
          <h2 style={headingStyle} className="m-0">
            Think, Create, Celebrate
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-5 md:mt-12 lg:mt-14">
            <GalleryImage src="/create/nishi-mam.jpg" width={547} height={806} />

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-center gap-5">
                <GalleryImage src="/create/award1.jpg" width={376} height={340} />
                <GalleryImage src="/create/award.png" width={376} height={340} />
              </div>
              <GalleryImage src="/create/award2.png" width={773} height={447} />
            </div>
          </div>

          <div className="mt-12 flex justify-center md:mt-14">
            <button
              type="button"
              className={`${montserrat.className} group relative cursor-pointer overflow-hidden border border-black bg-transparent px-[42px] py-4`}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span
                style={buttonStyle}
                className="relative z-10 flex items-center gap-3 text-black transition-colors duration-300 group-hover:text-white"
              >
                Load More Images
                <i className="ri-arrow-right-up-line text-[18px] leading-none" aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
