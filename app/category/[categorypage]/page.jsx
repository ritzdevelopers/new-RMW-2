import React from "react";
import { notFound } from "next/navigation";
import Header from "../../common/Header";
import Footer from "../../component/latest/Footer";
import OverlaySection1 from "../../component/latest/OverlaySection1";
import CategoryPageClient from "../../component/case-study/CategoryPageClient";
import { formatCategoryTitle, getCategoryLinks } from "../../../lib/caseStudyApi";
import { getCategoryPageData } from "../../../lib/blogServerData";

const PLACEHOLDER_CATEGORY = "__placeholder__";

export async function generateStaticParams() {
  const links = await getCategoryLinks();
  if (!links.length) {
    // `output: "export"` cannot build dynamic routes with an empty params list.
    return [{ categorypage: PLACEHOLDER_CATEGORY }];
  }
  return links.map((categorypage) => ({ categorypage }));
}

export async function generateMetadata({ params }) {
  const { categorypage } = await params;
  if (categorypage === PLACEHOLDER_CATEGORY) {
    return { title: "Category | Ritz Media World" };
  }
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

  if (categorypage === PLACEHOLDER_CATEGORY) {
    notFound();
  }

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
