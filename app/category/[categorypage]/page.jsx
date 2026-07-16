import React from "react";
import { notFound } from "next/navigation";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Section7 from "../../component/about/Section7";
import CategoryPageClient from "../../component/case-study/CategoryPageClient";
import { formatCategoryTitle, getCategoryLinks } from "../../../lib/caseStudyApi";

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

  return {
    title: `${title} | Ritz Media World`,
  };
}

export default async function CategoryPage({ params }) {
  const { categorypage } = await params;

  if (categorypage === PLACEHOLDER_CATEGORY) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <CategoryPageClient categorypage={categorypage} />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
