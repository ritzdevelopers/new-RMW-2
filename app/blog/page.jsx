import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import Section1 from "../component/blog/Section1";
import Section2 from "../component/blog/Section2";
import Section3 from "../component/blog/Section3";
import Section4 from "../component/blog/Section4";
import OverlaySection1 from "../component/latest/OverlaySection1";
import BlogScrollGate from "../component/blog/BlogScrollGate";
import { getBlogListingPageData } from "../../lib/blogServerData";

export const metadata = {
  title: "Insights & Marketing Trends | Ritz Media World Blog Delhi NCR",
  description:
    "Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.",
  keywords: [
    "advertising insights",
    "branding articles",
    "digital marketing tips",
    "marketing trends India",
    "marketing agency blogs",
    "brand strategy blog",
    "advertising trends",
    "creative marketing ideas",
    "digital marketing insights",
    "brand strategy",
    "media agency blog",
    "marketing innovations",
    "Digital Marketing Agency in Delhi NCR",
    "Best digital marketing agency in Delhi NCR",
    "Best digital marketing agency in Delhi",
    "Best ad agency",
    "social media marketing agency",
    "content marketing agency",
    "Creative service",
    "best ad agencies",
    "print advertising services",
    "best print advertising services",
    "Radio advertising agency",
  ],
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ritzmediaworld.com/blog",
  },
  openGraph: {
    title: "Insights & Marketing Trends | Ritz Media World Blog Delhi NCR",
    description:
      "Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.",
    url: "https://ritzmediaworld.com/blog",
    siteName: "Ritz Media World",
    locale: "en",
    type: "website",
  },
};

export default async function BlogPage() {
  const { blogs, categoryNames, categories, blogsByCategory } =
    await getBlogListingPageData();

  return (
    <>
      <Header />
      <BlogScrollGate
        top={
          <>
            <Section1 blogs={blogs} />
            <Section2 blogs={blogs} categories={categoryNames} />
          </>
        }
        bottom={
          <>
            <Section3 />
            <Section4 categories={categories} blogsByCategory={blogsByCategory} />
            <Footer section={<OverlaySection1 />} />
          </>
        }
      />
    </>
  );
}
