import React from "react";
import { notFound } from "next/navigation";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import SlugDetailClient from "../component/blog/SlugDetailClient";
import { getSlugDetailPageData, getSlugPageMetaInputs } from "../../lib/blogServerData";

/** ISR: new blog slugs render on first request; known slugs refresh periodically. */
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { blog, caseStudy } = await getSlugPageMetaInputs(slug);
  const fallbackTitle = caseStudy
    ? "Case Study | Ritz Media World"
    : "Blog | Ritz Media World";

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

  const data = await getSlugDetailPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <SlugDetailClient
          slug={slug}
          blog={data.blog}
          sidebar={data.sidebar}
          caseStudy={data.caseStudy}
        />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
