import React from "react";
import Link from "next/link";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  fontSize: "48px",
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
      style={{ backgroundImage: "url('/home/home-page-section2-bg.png')" }}
    >
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex items-start justify-between gap-6">
          <h2 className="m-0 min-w-0 flex-1" style={headingStyle}>
            WE create desire through
          </h2>

          <Link
            href="/about"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
          >
            <span style={aboutButtonTextStyle}>About US</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white md:h-9 md:w-9">
              <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
            </span>
          </Link>
        </div>

        <p className="m-0 mt-5 max-w-[1150px]" style={bodyStyle}>
          The world&apos;s largest independent brand agency. We drive growth, standout and
          fandom for the world&apos;s most desirable brands.
        </p>
      </div>
    </section>
  );
};

export default Section2;
