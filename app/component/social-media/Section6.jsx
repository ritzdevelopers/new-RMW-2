import React from "react";

function Section6() {
  return (
    <section className="w-full flex justify-between items-center py-20 bg-[#F4F2F0]">
      <div className="w-full  flex flex-col justify-center items-center gap-4 text-center">
        <p className="font-[300] text-[11px] max-w-[400px]">
          At Ree Creative, we understand the importance of social media for
          businesses and how it can impact brand perception. Our Social Media
          Management services are designed to help your business build a strong
          social media presence, engage with your audience, and create a
          positive brand perception.
        </p>
        <div className="flex justify-center items-center gap-4 w-full">
            <button className="w-[230px] h-[35px] cursor-pointer bg-[#000000] text-white font-[500] text-[11px]">Get in Touch</button>
            <button className="w-[230px] h-[35px] cursor-pointer bg-[#000000] text-white font-[500] text-[11px]">Book a Consultation</button>
        </div>
      </div>
    </section>
  );
}

export default Section6;
