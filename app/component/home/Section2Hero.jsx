import Link from "next/link";
import styles from "./page.module.css";

const bodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontStyle: "italic",
  letterSpacing: "0",
  color: "#DD1246",
};

const aboutButtonTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "capitalize",
};

const Section2Hero = () => {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center  md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:justify-items-stretch md:gap-x-6 md:gap-y-0 lg:gap-x-8">
      <h1 className={styles.heading}>
        Creative Advertising, Branding & Digital{" "}
        <br className="hidden sm:block" />
        Marketing Agency in India
      </h1>

      <p
        className="m-0 w-full max-w-[36rem] text-center text-[14px] sm:max-w-none sm:text-[16px] md:col-span-2 md:row-start-2 md:mt-0  md:max-w-[800px] md:text-left md:text-[13px] md:leading-[28px] lg:max-w-[900px] lg:text-[17px] xl:text-[20px] lg:leading-[30px] xl:max-w-[1150px] xl:text-[22px]"
        style={bodyStyle}
      >
        18 years of transforming brands through creativity, strategy & innovation
      </p>

      <Link
        href="/contact"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.contactButton} group relative mt-1 flex h-[44px] w-full max-w-[200px] shrink-0 cursor-pointer items-center justify-center bg-[url('/new-theme/button.png')] bg-contain bg-center bg-no-repeat px-8 sm:mt-2 sm:h-[48px] sm:max-w-[220px] sm:px-10 md:col-start-2 md:row-start-1 md:mt-2 md:h-[52px] md:w-[240px] md:max-w-none md:justify-self-end md:px-12 lg:mt-4 lg:h-[56px] lg:w-[260px] lg:px-14`}
      >
        <span
          className="relative z-10 pl-1 text-[13px] text-white transition-opacity duration-300 group-hover:opacity-90 sm:pl-2 sm:text-[14px] md:mt-0.5 md:text-[15px] lg:text-[16px]"
          style={aboutButtonTextStyle}
        >
          Contact Us
        </span>
        <span className="relative z-10 flex h-6 w-6 items-center justify-center text-white transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9">
          <i
            className="ri-arrow-right-up-line text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]"
            aria-hidden
          />
        </span>
      </Link>
    </div>
  );
};

export default Section2Hero;
