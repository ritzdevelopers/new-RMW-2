"use client";

import React from "react";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const sectionTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  letterSpacing: "0px",
  color: "#000000",
};

const tabStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#000000",
};

const postCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#00000099",
};

const featuredTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "22px",
  lineHeight: "26.4px",
  letterSpacing: "0px",
  color: "#000000",
};

const featuredExcerptStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19.2px",
  letterSpacing: "0.3px",
  color: "#5C5757",
};

const featuredAuthorStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  color: "#919191",
};

const listCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#001D33",
};

const listTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  letterSpacing: "0px",
  color: "#000000",
};

const listAuthorStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  color: "#919191",
};

const sidebarTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const sidebarBodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "24px",
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const sidebarButtonStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  letterSpacing: "0px",
  textAlign: "center",
  color: "#000000",
};

const categoryTabs = [
  "Data Science & Analytics",
  "Digital Transformation",
  "Business Intelligence",
  "AR/VR Development",
];

const listPosts = [
  {
    category: "Data Science And Analytics",
    title: "How Data Analytics Works in FinTech Enterprises?",
    author: "Nayan",
    image: "/blog/vertor-2.png",
  },
  {
    category: "Data Science And Analytics",
    title: "How Data Analytics Works in FinTech Enterprises?",
    author: "Nayan",
    image: "/blog/vertor-2.png",
  },
  {
    category: "Data Science And Analytics",
    title: "How Data Analytics Works in FinTech Enterprises?",
    author: "Nayan",
    image: "/blog/vertor-2.png",
  },
];

const Section4 = () => {
  return (
    <section className={`${montserrat.className}  py-12 md:py-16 lg:py-20`}>
      <div className="mx-auto w-full max-w-8xl px-8 md:px-12">
        <h2
          className="m-0 text-[22px] leading-[32px] md:text-[32px] md:leading-[48px] lg:text-[46px] lg:leading-[69px] text-[#000000]"
          style={sectionTitleStyle}
        >
          Enterprise Software development
        </h2>

        <div className="mt-6 pb-4 md:mt-8">
          <div className="inline-flex max-w-full flex-wrap gap-x-6 gap-y-3 border-b border-[#D9D9D9] pb-4 md:gap-x-8 lg:gap-x-10">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-70"
                style={tabStyle}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-15 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
          <article className="flex flex-col items-start lg:col-span-3">
            <div className="w-[340px] max-w-full">
              <div className="xl:h-[200px] overflow-hidden rounded-2xl">
                <img
                  src="/blog/vector-1.png"
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>

              <p className="m-0 mt-3" style={postCategoryStyle}>
                Guides
              </p>

              <h3 className="m-0 mt-2 xl:line-clamp-none lg:line-clamp-2" style={featuredTitleStyle}>
                A Complete Guide on Data Science & Analytics for Businesses
              </h3>

              <p className="m-0 mt-2 xl:line-clamp-none lg:line-clamp-3" style={featuredExcerptStyle}>
                Data science is the domain that couples data-bound analytical techniques along...
              </p>

              <p className={`m-0 mt-3 ${inter.className}`} style={featuredAuthorStyle}>
                Sudeep Srivastava
              </p>
            </div>
          </article>

          <div className="flex flex-col lg:col-span-5 xl:pl-[60px]">
            <div className="flex w-full max-w-full flex-col">
            {listPosts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${index > 0 ? "mt-10 border-t border-[#D9D9D9] pt-10" : ""}`}
              >
                <div className="w-full sm:h-[120px] sm:w-[160px] sm:shrink-0">
                  <img
                    src={post.image}
                    alt=""
                    className="block h-auto w-full rounded-lg object-cover object-center sm:h-full"
                  />
                </div>

                <div className="min-w-0 flex-1 lg:py-4 xl:py-4">
                  <p className="m-0" style={listCategoryStyle}>
                    {post.category}
                  </p>

                  <h3 className="m-0 mt-2 text-[19px] leading-[21.8px] sm:text-[14px] sm:leading-[16.8px]" style={listTitleStyle}>
                    {post.title}
                  </h3>

                  <p className="m-0 mt-3" style={listAuthorStyle}>
                    {post.author}
                  </p>
                </div>
              </article>
            ))}
            </div>
          </div>

          <aside className="flex w-full max-w-full flex-col items-start overflow-hidden bg-[#0092FF] lg:col-span-4 lg:ml-auto lg:w-[326px]">
            <img
              src="/blog/boy.png"
              alt=""
              className="block h-auto w-full object-cover object-center"
            />

            <div className="w-full px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-7">
            <h3 className="xl:mt-10 mt-0 w-full text-left text-[28px] leading-[36px] lg:text-[24px] lg:leading-[26px] xl:text-[28px] xl:leading-[36px]" style={sidebarTitleStyle}>
              How to become a successful app entrepreneur
            </h3>

            <p className="m-0 mt-8 w-full text-left  lg:line-clamp-2 xl:line-clamp-none" style={sidebarBodyStyle}>
              Learn more about how to take the journey of transition from being a full time employee to an app entrepreneur.
            </p>

            <button
              type="button"
              className="xl:mt-2 mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-white px-6 py-3 transition-opacity hover:opacity-90"
              style={sidebarButtonStyle}
            >
              Download now
              <i className="ri-download-line text-[20px]" aria-hidden />
            </button>
            </div>
          </aside>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[14px] font-normal leading-none text-[#00000099] transition-opacity hover:opacity-70"
          >
            View All
            <i className="ri-arrow-right-up-line text-[16px]" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section4;
