import React from "react";

function Hero({ title }) {
  return (
    <section
      className="w-full h-[620px] flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/portfolio-page/creatives/update_home.jpg')" }}
    >
      <div className="w-full h-full flex justify-center items-center bg-[#000000a3]">
        <div className="w-full h-full flex justify-center items-center text-center">
          <h1
            className="text-white text-2xl font-[300]"
            dangerouslySetInnerHTML={{
              __html: title
                ? title
                : "Building connections & growing brands <br /> with Social Media Management",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
