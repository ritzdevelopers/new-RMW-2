import React from "react";
import BottomRevealText from "./BottomRevealText";
import Section1Row2 from "./Section1Row2";

const Section1 = () => {
  return (
    <section className="w-full py-[57px] flex justify-center items-center max-xl:py-[44px] max-lg:py-[36px] max-md:py-[28px]">
      {/* Center Align Container  */}
      <div className="w-full max-w-[1336px] flex flex-col gap-[57px] max-xl:gap-[40px] max-lg:gap-[32px] max-md:gap-[24px] max-xl:px-6 max-md:px-4">
        {/* Row 1  */}
        <div>
          <BottomRevealText
            as="h1"
            text="Portfolio"
            className="font-league-spartan font-[600] uppercase text-[56px] max-xl:text-[44px] max-lg:text-[36px] max-md:text-[28px] max-sm:text-[24px]"
          />
        </div>

        {/* Row 2  */}
        <Section1Row2 />
      </div>
    </section>
  );
};

export default Section1;
