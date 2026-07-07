import React from "react";
import { notFound } from "next/navigation";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import CaseStudyDetail from "../component/case-study/CaseStudyDetail";
import BlogDetail from "../component/blog/BlogDetail";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  getBlogSidebarData,
  getCaseStudySidebarData,
  isCaseStudySlug,
} from "../../lib/caseStudyApi";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const caseStudy = await isCaseStudySlug(slug);
  const fallbackTitle = caseStudy ? "Case Study | Ritz Media World" : "Blog | Ritz Media World";

  if (!blog) {
    return { title: fallbackTitle };
  }

  return {
    title: blog.meta_title || blog.title || fallbackTitle,
    description: blog.meta_description || undefined,
  };
}

export default async function SlugDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const caseStudy = await isCaseStudySlug(slug);

  if (caseStudy) {
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

  const sidebar = await getBlogSidebarData(slug, blog);

  return (
    <>
      <Header />
      <main>
        <BlogDetail blog={blog} sidebar={sidebar} />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
