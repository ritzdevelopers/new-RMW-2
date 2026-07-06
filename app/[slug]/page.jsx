import React from "react";
import { notFound } from "next/navigation";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import CaseStudyDetail from "../component/case-study/CaseStudyDetail";
import { getBlogBySlug, getCaseStudySidebarData, getCaseStudySlugs } from "../../lib/caseStudyApi";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Case Study | Ritz Media World" };
  }

  return {
    title: blog.meta_title || blog.title || "Case Study | Ritz Media World",
    description: blog.meta_description || undefined,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const sidebar = await getCaseStudySidebarData(slug, blog);

  return (
    <>
      <Header />
      <main>
        <CaseStudyDetail blog={blog} sidebar={sidebar} />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
