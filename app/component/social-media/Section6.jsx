import React from "react";

function Section6() {
  return (
    <section className="flex w-full items-center justify-between bg-[#F4F2F0] px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-4 lg:py-20">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <p className="max-w-[400px] font-[300] text-[11px] leading-[1.6] lg:leading-normal">
          At Ree Creative, we understand the importance of social media for
          businesses and how it can impact brand perception. Our Social Media
          Management services are designed to help your business build a strong
          social media presence, engage with your audience, and create a
          positive brand perception.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button className="h-[35px] w-full max-w-[230px] cursor-pointer border bg-[#000000] text-[11px] hover:bg-[#F4F2F0] hover:text-[#000000] font-[500] text-white sm:w-[230px]">
            Contact Us
          </button>
          <button className="h-[35px] w-full max-w-[230px] cursor-pointer border bg-[#000000] text-[11px] hover:bg-[#F4F2F0] hover:text-[#000000] font-[500] text-white sm:w-[230px]">
            Book a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section6;
