import React from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Section7 from "../../component/about/Section7";
import CategoryPageClient from "../../component/case-study/CategoryPageClient";
import { formatCategoryTitle, getCategoryLinks } from "../../../lib/caseStudyApi";

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
