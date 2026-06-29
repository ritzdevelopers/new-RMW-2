"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const categoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#000000CC",
};

const featuredTitleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  letterSpacing: "0",
  color: "#000000",
};

const excerptStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0",
  color: "#000000CC",
};

const authorStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#00000099",
};

const gridTitleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "26px",
  letterSpacing: "0",
  color: "#000000",
};

const featuredPost = {
  category: "Guides",
  title:
    "The Complete Guide to Mobile App Development: Process, Architecture & Strategic Decisions",
  excerpt:
    "Mobile app development now sits at the center of how large companies operate and grow. Banks route payments, loan checks, and alerts through mobile system",
  author: "Saurabh Singh",
  image: "/blog/Mobile.jpg",
};

const gridPosts = [
  {
    category: "Guides",
    title: "How Much Does It Cost to Develop an App in 2026? A Detailed Guide",
    excerpt:
      "When it comes to mobile app development, a million-dollar question (sometimes literally)",
    author: "Saurabh Singh",
    image: "/blog/Mobile.jpg",
  },
  {
    category: "Guides",
    title: "Top Performance Marketing Agency in Gurgaon",
    excerpt:
      "When it comes to mobile app development, a million-dollar question (sometimes literally)",
    author: "Saurabh Singh",
    image: "/blog/Mobile.jpg",
  },
  {
    category: "Guides",
    title: "Brand Films | Guide to Building Emotional Brand Connections",
    excerpt:
      "When it comes to mobile app development, a million-dollar question (sometimes literally)",
    author: "Saurabh Singh",
    image: "/blog/Mobile.jpg",
  },
];

const Section1 = () => {
  return (
    <>
      <div className={`${montserrat.className} bg-white`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 py-10 sm:px-10 md:px-[50px] md:py-12">
          <button
            type="button"
            aria-label="Search blog posts"
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[#000000] transition-opacity duration-300 hover:opacity-70"
          >
            <i className="ri-search-line text-[18px] md:text-[20px]" aria-hidden />
            <span className="text-[16px] font-normal leading-none md:text-[18px]">Search</span>
          </button>
        </div>
      </div>

      <section className={`${montserrat.className} bg-[#F1F1F1] py-12 md:py-16 lg:py-20`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <article className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="w-full min-w-0 lg:w-[52%] xl:w-[55%]">
            <img
              src={featuredPost.image}
              alt=""
              className="block h-auto w-full rounded-2xl object-cover object-center"
            />
          </div>

          <div className="flex w-full min-w-0 flex-col lg:w-[48%] xl:w-[45%] lg:py-5">
            <p className="m-0" style={categoryStyle}>
              {featuredPost.category}
            </p>

            <h1
              className="m-0 mt-3 text-[24px] leading-[32px] sm:leading-[36px] line-clamp-1 md:line-clamp-2 lg:line-clamp-1 md:text-[36px] lg:leading-[36px] xl:line-clamp-none"
              style={featuredTitleStyle}
            >
              {featuredPost.title}
            </h1>

            <p className="m-0 mt-4 sm:mt-5" style={excerptStyle}>
              {featuredPost.excerpt}
            </p>

            <p className="m-0 mt-auto pt-4 lg:pt-4 xl:pt-10" style={authorStyle}>
              {featuredPost.author}
            </p>
          </div>
        </article>

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:mt-20 xl:gap-10">
          {gridPosts.map((post) => (
            <article key={post.title} className="flex flex-col">
              <p className="m-0" style={categoryStyle}>
                {post.category}
              </p>

              <div className="mt-3 overflow-hidden rounded-2xl">
                <img
                  src={post.image}
                  alt=""
                  className="block aspect-[16/10] h-auto w-full object-cover object-center"
                />
              </div>

              <h2 className="m-0 mt-4 line-clamp-1  lg:line-clamp-1" style={gridTitleStyle}>
                {post.title}
              </h2>

              <p className="m-0 mt-3 lg:line-clamp-2 md:line-clamp-2 line-clamp-2" style={excerptStyle}>
                {post.excerpt}
              </p>

              <p className="m-0 mt-4" style={authorStyle}>
                {post.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Section1;
