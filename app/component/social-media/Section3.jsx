import React from "react";

function Section3() {
  return (
    <section
      className="flex w-full items-center justify-center bg-cover bg-center bg-no-repeat h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px] lg:bg-fixed"
      style={{ backgroundImage: "url('/social-media/creative3.avif')" }}
    >
      <div className="flex h-full w-full items-center justify-center bg-[#000000a3] px-5 sm:px-8 md:px-10 lg:px-4">
        <div className="mx-auto flex h-full w-full max-w-[500px] flex-col items-center justify-center gap-4 text-center sm:gap-5">
          <p className="font-[500] text-white text-[15px] leading-[1.45] sm:text-[17px] md:text-[18px] lg:text-[20px] lg:leading-normal">
            Instagram has more than 2 billion monthly active users, making it
            one of the largest social media platforms for reaching a wide
            audience.
          </p>
          <p className="font-[500] text-white text-[15px] leading-[1.45] sm:text-[17px] md:text-[18px] lg:text-[20px] lg:leading-normal">
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
