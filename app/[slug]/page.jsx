import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import SlugDetailClient from "../component/blog/SlugDetailClient";
import {
  getAllBlogSlugs,
  getBlogBySlug,
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

  const pageUrl = `https://ritzmediaworld.com/${blog.slug || slug}`;
  const keywords = String(blog.meta_keywords || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    title: blog.meta_title || blog.title || fallbackTitle,
    description: blog.meta_description || undefined,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      url: pageUrl,
      siteName: "Ritz Media World",
      locale: "en",
      type: "article",
    },
  };
}

export default async function SlugDetailPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main>
        <SlugDetailClient slug={slug} />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
