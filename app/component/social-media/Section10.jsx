import React from "react";

function Section10() {
  return (
    <section className="flex w-full items-center justify-between bg-[#F4F2F0] px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-4 lg:py-20">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-[400] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[18px]">
          Ready to take the next step?
        </h2>
        <p className="max-w-[600px] font-[300] text-[11px] leading-[1.6] lg:leading-normal">
          Working with a luxury creative agency for social media management
          ensures that your brand is represented professionally, authentically
          and consistently across all your social media channels. It allows you
          to focus on other aspects of your business while leaving the Social
          Media Management in the hands of experts who understand the unique
          requirements of your industry to succeed online and build your brand.
        </p>
        <p className="max-w-[600px] font-[300] text-[11px] leading-[1.6] lg:leading-normal">
          Let us help you elevate your online presence and achieve your social
          media goals. Contact us today to learn more about our comprehensive
          and results-driven Social Media Management services.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button className="h-[35px] w-full max-w-[230px] cursor-pointer border  bg-[#000000] text-[11px] hover:bg-[#F4F2F0] hover:text-[#000000] font-[500] text-white sm:w-[230px]">
            Get in Touch
          </button>
          <button className="h-[35px] w-full max-w-[230px] cursor-pointer border  bg-[#000000] text-[11px] hover:bg-[#F4F2F0] hover:text-[#000000] font-[500] text-white sm:w-[230px]">
            Book a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section10;
