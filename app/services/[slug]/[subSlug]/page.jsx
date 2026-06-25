import React from "react";
import { notFound } from "next/navigation";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import SubServiceSections from "../../../component/services/SubServiceSections";
import ServicesHero from "../../../component/services/ServicesHero";
import Section7 from "../../../component/about/Section7";
import {
  getAllSubServiceParams,
  getSubServiceBySlug,
  getSubServiceHeroTitle,
} from "../../../../data/sub-services";
import { getSubServiceMeta, getSubServicePageData } from "../../../../lib/subServiceApi";

export function generateStaticParams() {
  return getAllSubServiceParams();
}

export async function generateMetadata({ params }) {
  const { slug, subSlug } = await params;
  const subService = getSubServiceBySlug(slug, subSlug);

  if (!subService) {
    return { title: "Service Not Found | Ritz Media World" };
  }

  const meta = await getSubServiceMeta(slug, subSlug);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || undefined,
  };
}

export default async function SubServicePage({ params }) {
  const { slug, subSlug } = await params;
  const subService = getSubServiceBySlug(slug, subSlug);

  if (!subService) {
    notFound();
  }

  const pageData = await getSubServicePageData(slug, subSlug);
  const heroTitle = getSubServiceHeroTitle(slug, subSlug, pageData.heading);

  return (
    <div className="overflow-x-clip">
      <Header />
      <ServicesHero
        variant="subService"
        lineOne={heroTitle}
        subtext={["Committed to Delivering Top-Quality Services"]}
        subtextItalic={false}
      />
      <SubServiceSections cards={pageData.cards} />
      <Footer overlaySection={<Section7 />} />
    </div>
  );
}
