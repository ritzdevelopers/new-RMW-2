import React, { Suspense } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Section7 from "../../component/about/Section7";
import { TagsKeywordPage } from "../../component/case-study/TagsQueryPage";
import { formatTagTitle, getAllTagSlugs } from "../../../lib/caseStudyApi";

export async function generateStaticParams() {
  const tags = await getAllTagSlugs();
  if (!tags.length) {
    return [{ keyword: "__placeholder__" }];
  }
  return tags.map((keyword) => ({ keyword }));
}

export async function generateMetadata({ params }) {
  const { keyword } = await params;
  const title = formatTagTitle(keyword);

  return {
    title: `${title} | Ritz Media World`,
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
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
