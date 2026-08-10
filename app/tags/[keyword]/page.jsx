import React, { Suspense } from "react";
import Header from "../../common/Header";
import Footer from "../../component/latest/Footer";
import OverlaySection1 from "../../component/latest/OverlaySection1";
import { TagsKeywordPage } from "../../component/case-study/TagsQueryPage";
import { formatTagTitle, getAllTagSlugs } from "../../../lib/caseStudyApi";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getAllTagSlugs();
  return tags.map((keyword) => ({ keyword }));
}

export async function generateMetadata({ params }) {
  const { keyword } = await params;
  const title = formatTagTitle(keyword);
  const pageUrl = `https://ritzmediaworld.com/tags/${keyword}`;

  return {
    title: `${title} | Ritz Media World`,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function TagsKeywordRoutePage({ params }) {
  const { keyword } = await params;

  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <p
              className="py-10 text-center text-[16px] text-[#666]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Loading...
            </p>
          }
        >
          <TagsKeywordPage keyword={keyword} />
        </Suspense>
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
