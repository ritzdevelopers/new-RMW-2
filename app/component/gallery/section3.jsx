import React from "react";
import Image from "next/image";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const nameStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "capitalize",
  color: "#000000",
};

const leaders = [
  {
    name: "Ritesh Malik",
    image: "/gallery/ritz-malik-boss.png",
    width: 331,
    height: 318,
  },
  {
    name: "Satvinder Kaur",
    image: "/gallery/kour-mam.png",
    width: 331,
    height: 318,
  },
  {
    name: "Nishi Malik",
    image: "/gallery/nishi-mam.png",
    width: 331,
    height: 318,
  },
];

const Section3 = () => {
  return (
    <section className="bg-[#EDEFF6] px-6  md:px-10 py-[35px] md:py-[70px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <h2
          style={headingStyle}
          className="m-0 text-center text-[30px] md:text-[50px] lg:text-[60px] xl:text-[80px]"
        >
          Our core Leadership
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-10 md:mt-15 lg:mt-20 xl:mt-25 md:flex-row md:items-start md:gap-8 lg:gap-12">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className={`flex w-full max-w-[331px] flex-col items-center gap-4 ${
                leader.name === "Satvinder Kaur" ? "md:-translate-y-[50px]" : ""
              }`}
            >
              <div
                className="relative w-full overflow-hidden rounded-md bg-white"
                style={{ aspectRatio: `${leader.width} / ${leader.height}` }}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 331px"
                />
              </div>
              <p style={nameStyle} className="m-0 w-full text-[22px] md:text-[28px]">
                {leader.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
