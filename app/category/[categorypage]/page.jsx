import React from "react";
import Header from "../../common/Header";
import Footer from "../../component/latest/Footer";
import OverlaySection1 from "../../component/latest/OverlaySection1";
import CategoryPageClient from "../../component/case-study/CategoryPageClient";
import { formatCategoryTitle, getCategoryLinks } from "../../../lib/caseStudyApi";
import { getCategoryPageData } from "../../../lib/blogServerData";
import { getCategorySeo } from "../../../data/categorySeo";

export const revalidate = 60;

function CategorySeoHeadings({ slug }) {
  const seo = getCategorySeo(slug);
  if (!seo) return null;

  return (
    <div className="sr-only">
      <h1>{seo.h1}</h1>
      {seo.sections.map((section) => (
        <React.Fragment key={section.h2}>
          <h2>{section.h2}</h2>
          {section.h3?.map((heading) => (
            <h3 key={`${section.h2}-${heading}`}>{heading}</h3>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const links = await getCategoryLinks();
  return links.map((categorypage) => ({ categorypage }));
}

export async function generateMetadata({ params }) {
  const { categorypage } = await params;
  const seo = getCategorySeo(categorypage);
  const pageUrl = `https://ritzmediaworld.com/category/${categorypage}`;

  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  const title = formatCategoryTitle(categorypage);

  return {
    title: `${title} | Ritz Media World`,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorypage } = await params;
  const seo = getCategorySeo(categorypage);

  const { blogs, title } = await getCategoryPageData(categorypage);

  return (
    <>
      <Header />
      <CategorySeoHeadings slug={categorypage} />
      <main>
        <CategoryPageClient
          categorypage={categorypage}
          blogs={blogs}
          title={seo?.h1 || title}
          hasSeoHeadings={Boolean(seo)}
        />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
