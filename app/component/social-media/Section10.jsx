import React from "react";

function Section10() {
  return (
    <section className="w-full flex justify-between items-center py-20 bg-[#F4F2F0]">
      <div className="w-full  flex flex-col justify-center items-center gap-4 text-center">
        <h2 className="font-[400] text-[18px]">Ready to take the next step?</h2>
        <p className="font-[300] text-[11px] max-w-[600px]">
          Working with a luxury creative agency for social media management
          ensures that your brand is represented professionally, authentically
          and consistently across all your social media channels. It allows you
          to focus on other aspects of your business while leaving the Social
          Media Management in the hands of experts who understand the unique
          requirements of your industry to succeed online and build your brand.
        </p>
        <p className="font-[300] text-[11px] max-w-[600px]">Let us help you elevate your online presence and achieve your social media goals. Contact us today to learn more about our comprehensive and results-driven Social Media Management services.</p>
        <div className="flex justify-center items-center gap-4 w-full">
          <button className="w-[230px] h-[35px] cursor-pointer bg-[#000000] text-white font-[500] text-[11px]">
            Get in Touch
          </button>
          <button className="w-[230px] h-[35px] cursor-pointer bg-[#000000] text-white font-[500] text-[11px]">
            Book a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section10;
