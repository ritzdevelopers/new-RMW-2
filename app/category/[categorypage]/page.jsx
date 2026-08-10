import React from "react";
import Header from "../../common/Header";import Footer from "../../component/latest/Footer";
import OverlaySection1 from "../../component/latest/OverlaySection1";
import CategoryPageClient from "../../component/case-study/CategoryPageClient";
import { formatCategoryTitle, getCategoryLinks } from "../../../lib/caseStudyApi";
import { getCategoryPageData } from "../../../lib/blogServerData";

export const revalidate = 60;

export async function generateStaticParams() {
  const links = await getCategoryLinks();
  return links.map((categorypage) => ({ categorypage }));
}

export async function generateMetadata({ params }) {
  const { categorypage } = await params;
  const title = formatCategoryTitle(categorypage);
  const pageUrl = `https://ritzmediaworld.com/category/${categorypage}`;

  return {
    title: `${title} | Ritz Media World`,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorypage } = await params;

  const { blogs, title } = await getCategoryPageData(categorypage);

  return (
    <>
      <Header />
      <main>
        <CategoryPageClient categorypage={categorypage} blogs={blogs} title={title} />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
