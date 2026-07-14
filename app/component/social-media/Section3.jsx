import React from "react";

function Section3() {
  return (
    <section
      className="w-full h-[620px] flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/social-media/creative3.avif')" }}
    >
      <div className="w-full h-full flex justify-center items-center bg-[#000000a3]">
        <div className="w-full h-full flex flex-col justify-center items-center text-center max-w-[550px] mx-autu">
          <p className="font-[500] text-white text-[20px]">
            Instagram has more than 2 billion monthly active users, making it
            one of the largest social media platforms for reaching a wide
            audience.
          </p> <br />
          <p className="font-[500] text-white text-[20px]">
            81% of users research products or services on Instagram meaning that
            people actively use Instagram to discover and learn more about
            brands, products or services, making it a crucial platform for brand
            discovery.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section3;
