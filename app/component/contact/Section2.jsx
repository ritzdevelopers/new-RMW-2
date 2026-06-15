import React from "react";

const mixtaProFamily = '"Mixta Pro", serif';
const sequelSansFamily = '"Sequel Sans", sans-serif';

const headingStyle = {
  fontFamily: mixtaProFamily,
  fontWeight: 400,
//   fontSize: "48px",
//   lineHeight: "100%",
  letterSpacing: "1.2px",
  textTransform: "capitalize",
  color: "#000000",
  verticalAlign: "middle",
};

const subheadingStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 300,
//   fontSize: "20px",
//   lineHeight: "28px",
  letterSpacing: "0px",
  color: "#00000099",
  verticalAlign: "middle",
};

const addressTitleStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 400,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  color: "#333333",
};

const addressBodyStyle = {
  fontFamily: sequelSansFamily,
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "26px",
  letterSpacing: "0",
  color: "#333333",
};

const Section2 = () => {
  return (
    <section className="bg-white px-8 py-[35px] md:px-12  md:py-[70px] ">
      <div className="mx-auto flex max-w-8xl flex-col items-start md:gap-12 gap-6 lg:flex-row lg:gap-10 xl:gap-0 mx-auto max-w-[1500px]">
        <div className="w-full lg:w-[40%] lg:shrink-0">
          <h2
            style={headingStyle}
            className="text-[28px] leading-[100%] xl:leading-[60px] md:text-[40px] lg:text-[30px] xl:text-[48px] lg:max-w-[500px] w-full"
          >
            We transform brands. Your success is next.
          </h2>

          <p
            style={subheadingStyle}
            className="mt-3 text-[16px] lg:max-w-[500px] leading-[24px] md:mt-4 lg:mt-8 md:text-[20px] lg:leading-[28px] md:leading-[24px] w-full"
          >
            Start your project now by booking a one-on-one consultation with our
            expert.
          </p>

          <div className="mt-6 md:mt-12 lg:mt-16 md:mt-8">
            <div className="inline-block">
              <h3
                style={addressTitleStyle}
                className="text-[24px] md:text-[28px]"
              >
                Address
              </h3>
              <span className="mt-2 block h-[2px] w-8 bg-[#E8783A]" />
            </div>

            <p
              style={addressBodyStyle}
              className="mt-5 max-w-sm text-[14px] leading-[24px] md:text-[16px] md:leading-[26px]"
            >
              402 - 404, 4th floor, Corporate Park , Tower A1, Sector 142,
              <br />
              Noida 201305
            </p>
          </div>
        </div>

        <div className="xl:mt-15 h-[150px] w-full overflow-hidden md:h-[400px] lg:mt-0 lg:h-[480px] lg:w-[80%]">
          <iframe
            title="Ritz Media World Location"
            src="https://www.google.com/maps?q=Ritz+Media+World,+Unit+no,+Tower+A1,+Corporate+Park,+4th+floor,+402-404,+Sector+142,+Noida,+Uttar+Pradesh+201305&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Section2;
