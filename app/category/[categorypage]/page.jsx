import React from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Section7 from "../../component/about/Section7";
import BlogListingGrid from "../../component/case-study/BlogListingGrid";
import {
  formatCategoryTitle,
  getCategoryBlogs,
  getCategoryLinks,
} from "../../../lib/caseStudyApi";

export async function generateStaticParams() {
  const links = await getCategoryLinks();
  return links.map((categorypage) => ({ categorypage }));
}

export async function generateMetadata({ params }) {
  const { categorypage } = await params;
  const title = formatCategoryTitle(categorypage);

  return {
    title: `${title} | Ritz Media World`,
  };
}

export default async function CategoryPage({ params }) {
  const { categorypage } = await params;
  const blogs = await getCategoryBlogs(categorypage);
  const title = formatCategoryTitle(categorypage);

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#0D1334] px-8 py-16 md:px-12">
          <div className="mx-auto w-full max-w-8xl text-left">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E8542A]"
              style={{ fontFamily: '"League Spartan", sans-serif' }}
            >
              Category
            </span>
            <h1
              className="mt-3 text-[clamp(28px,4.5vw,52px)] font-semibold leading-tight text-white"
              style={{ fontFamily: '"League Spartan", sans-serif' }}
            >
              {title}
            </h1>
          </div>
        </section>

        <section className="bg-white px-8 py-12 md:px-12 md:py-16">
          <div className="mx-auto w-full max-w-8xl">
            <BlogListingGrid blogs={blogs} />
          </div>
        </section>
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
