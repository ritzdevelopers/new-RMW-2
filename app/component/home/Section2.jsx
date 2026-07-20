import React from "react";
import Link from "next/link";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const bodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontStyle: "italic",
  fontSize: "22px",
  lineHeight: "30px",
  letterSpacing: "0",
  color: "#000000",
};

const aboutButtonTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "capitalize",
  color: "#000000",
};

const Section2 = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat px-8 py-[35px] md:px-12 md:py-[70px]"
      style={{ backgroundImage: "url('/home/home-page-banner.jpg')" }}
    >
      <div className="mx-auto w-full max-w-8xl">
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-[1fr_auto] md:items-start md:justify-items-stretch md:gap-x-6">
          <h1
            className="m-0 min-w-0 w-full text-center text-[28px] md:col-start-1 md:row-start-1 md:text-left md:text-[30px] lg:text-[48px]"
            style={headingStyle}
          >
           WE CREATE IMPACT THROUGH EXPERIENCE
          </h1>

          <p
            className="m-0 mt-5 w-full text-center md:col-span-2 md:row-start-2 md:text-left xl:max-w-[1150px] lg:max-w-[800px] md:max-w-[800px]"
            style={bodyStyle}
          >
            18 years of digital marketing expertise. We drive growth, visibility and results for the world's most ambitious brands.
          </p>

          <Link
            href="/about.html"
            className="mt-5 flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:col-start-2 md:row-start-1 md:mt-0 md:justify-self-end md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
          >
            <span style={aboutButtonTextStyle}>About US</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white md:h-9 md:w-9">
              <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section2;
