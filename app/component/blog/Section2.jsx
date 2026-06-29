"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const latestHeadingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "46px",
  lineHeight: "69px",
  letterSpacing: "0px",
  color: "#000000",
};

const postCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#000000",
};

const postTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "21.6px",
  letterSpacing: "0px",
  color: "#000000",
};

const postTakeawayStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.8px",
  letterSpacing: "0.3px",
  color: "#00000099",
};

const postMetaStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  color: "#919191",
};

const categoriesHeadingStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "17.6px",
  letterSpacing: "0px",
  color: "#000000",
};

const categoryTagStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  textAlign: "center",
  color: "#000000",
};

const latestPosts = [
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
  {
    category: "Artificial intelligence",
    title: "Steps To Identify The Right AI Implementation Consultant In ME",
    takeaway:
      "Key takeaways: Define business outcomes before evaluating vendors,",
    meta: "Chirag Bhardwaj 16 Jun 2026",
    image: "/blog/latest.png",
  },
];

const categories = [
  "Healthcare & Fitness",
  "Restaurant App Development",
  "React Native Development",
  "Digital Transformation",
  "Data Science & Analytics",
  "Android Development",
  "Fintech",
  "IOT Development",
  "Education",
  "Cloud Computing",
];

const Section2 = () => {
  return (
    <section className={`${montserrat.className} bg-[#F1F1F1] pb-12 md:pb-16 lg:pb-20`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <h2
          className="m-0 text-[32px] leading-[48px] md:text-[40px] md:leading-[60px] lg:text-[46px] lg:leading-[69px]"
          style={latestHeadingStyle}
        >
          Latest
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-20">
          <div className="flex min-w-0 flex-col gap-10 xl:col-span-6 lg:col-span-8">
            {latestPosts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 md:gap-8"
              >
                <div className="w-full shrink-0 sm:w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px]">
                  <img
                    src={post.image}
                    alt=""
                    className="block h-auto w-full rounded-2xl object-cover object-center"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col xl:py-3 lg:py-2 py-1">
                  <p className="m-0" style={postCategoryStyle}>
                    {post.category}
                  </p>

                  <h3 className="m-0 mt-2 line-clamp-1 md:line-clamp-2 lg:line-clamp-2 xl:line-clamp-none" style={postTitleStyle}>
                    {post.title}
                  </h3>

                  <p className="m-0 mt-3" style={postTakeawayStyle}>
                    {post.takeaway}
                  </p>

                  <p className="m-0 lg:mt-4 mt-2" style={postMetaStyle}>
                    {post.meta}
                  </p>
                </div>
              </article>
            ))}

            <nav
              aria-label="Blog pagination"
              className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
            >
              <button
                type="button"
                aria-current="page"
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-[#0D1334] bg-[#0D1334] px-3 text-[14px] font-normal leading-none text-white"
              >
                1
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-[#000000] bg-transparent px-3 text-[14px] font-normal leading-none text-[#000000] transition-opacity hover:opacity-70"
              >
                2
              </button>
              <button
                type="button"
                aria-hidden
                tabIndex={-1}
                className="inline-flex h-10 min-w-10 cursor-default items-center justify-center rounded-md border border-[#000000] bg-transparent px-3 text-[14px] font-normal leading-none text-[#000000]"
              >
                ...
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-[#000000] bg-transparent px-3 text-[14px] font-normal leading-none text-[#000000] transition-opacity hover:opacity-70"
              >
                223
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-[#000000] bg-transparent px-4 text-[14px] font-normal leading-none text-[#000000] transition-opacity hover:opacity-70"
              >
                Next
                <i className="ri-arrow-right-s-line text-[16px]" aria-hidden />
              </button>
            </nav>
          </div>

          <aside className="min-w-0 xl:col-span-6 lg:col-span-4">
            <p className="m-0" style={categoriesHeadingStyle}>
              Categories
            </p>

            <div className="mt-4 h-px w-full bg-[#D9D9D9]" />

            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center justify-center rounded-[8px] border border-[#D9D9D9]  px-4 py-2"
                  style={categoryTagStyle}
                >
                  {category}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Section2;
