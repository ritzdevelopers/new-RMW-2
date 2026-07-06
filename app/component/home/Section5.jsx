import React from "react";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(36px, 5vw, 56px)",
  lineHeight: "100%",
  letterSpacing: "0",
//   textAlign: "center",
  textTransform: "uppercase",
  color: "#000000",
};

const introStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "29px",
  letterSpacing: "0",
//   textAlign: "center",
  color: "#000000",
};

const quoteStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "30px",
  letterSpacing: "0",
  color: "#000000",
};

const authorStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
//   textAlign: "center",
  textTransform: "uppercase",
  color: "#000000",
};

const roleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#00000099",
};

const slides = [
  {
    quote:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    author: "Eldeco Group",
    role: "Managing Director",
    image: "/home/slider-image-1.png",
  },
];

const Section5 = () => {
  const slide = slides[0];
  const activeDot = 2;

  return (
    <section className="bg-[#FAFAFA] px-8 py-[35px] md:px-12 md:py-[70px]">
      <div className="mx-auto grid w-full max-w-8xl grid-cols-1  gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <h2 className="m-0" style={headingStyle}>
            WHAT CLIENTS SAY
          </h2>

          <p className="m-0 mx-auto mt-4 " style={introStyle}>
            The world&apos;s largest independent brand agency. We drive growth,
          </p>

          <div className="mt-10 md:mt-12">
            <img
              src="/home/double-quotes.svg"
              alt=""
              className="block h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
              aria-hidden
            />

            <p className="m-0 mt-0 max-w-[900px]" style={quoteStyle}>
              {slide.quote}
            </p>

            <p className="m-0 mt-8" style={authorStyle}>
              {slide.author}
            </p>

            <p className="m-0 mt-2" style={roleStyle}>
              {slide.role}
            </p>
          </div>

          <div className="mt-10 flex gap-2 md:mt-12">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                aria-hidden
                className={`h-2 rounded-full bg-[#00000033] ${
                  index === activeDot ? "w-8" : "w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] shrink-0 lg:mx-0 lg:max-w-[460px]">
          <img
            src={slide.image}
            alt={slide.author}
            className="mt-35 block h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Section5;
