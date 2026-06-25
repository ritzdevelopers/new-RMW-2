export const digitalMarketingSubServices = [
  {
    slug: "search-engine-optimization-seo",
    title: "SEO (Search Engine Optimization)",
    heroTitle: "Search Engine Optimization SEO",
    metaTitle: "SEO Company in India | Drive Organic Growth with Expert SEO Services",
    metaDescription:
      "Boost your online visibility with India's top SEO agency. Expert keyword research, technical SEO, and content strategies to rank higher and drive traffic.",
  },
  {
    slug: "ppc-google-ads-agency",
    title: "PPC (Google Ads) Services",
    heroTitle: "PPC Google Ads Agency",
    metaTitle: "Google Ads (PPC) Agency in India | Maximize ROI with Paid Campaigns",
    metaDescription:
      "Run high-converting PPC campaigns with our Google Ads specialists. Get more leads, improve ROI, and dominate the search results in your niche.",
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    heroTitle: "Social Media Management",
    metaTitle: "Social Media Marketing Company in India | Grow Your Brand Online",
    metaDescription:
      "Boost engagement and followers with creative social media strategies. Facebook, Instagram, LinkedIn & more - all managed for your business success.",
  },
  {
    slug: "orm-in-digital-marketing",
    title: "ORM (Online Reputation Management)",
    heroTitle: "Online Reputation Management",
    metaTitle: "Online Reputation Management Agency in India | Build Trust Online",
    metaDescription:
      "Protect and enhance your brand's image. Get proactive reputation repair, reviews monitoring, and crisis control with our expert ORM solutions.",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    heroTitle: "Lead Generation",
    metaTitle: "Lead Generation Services in India | Get Qualified Sales Leads",
    metaDescription:
      "Targeted lead generation campaigns that convert. From B2B to B2C, we help you capture, nurture, and convert leads into loyal customers.",
  },
  {
    slug: "brand-awareness",
    title: "Brand Awareness",
    heroTitle: "Brand Awareness",
    metaTitle: "Brand Awareness Marketing in India | Grow Brand Recall & Reach",
    metaDescription:
      "Make your brand unforgettable. Run integrated campaigns that boost visibility, recall, and trust across online and offline platforms.",
  },
];

const subServicesByParent = {
  "digital-marketing": digitalMarketingSubServices,
};

export function getSubServicesByParentSlug(parentSlug) {
  return subServicesByParent[parentSlug] || [];
}

export function getSubServiceBySlug(parentSlug, subSlug) {
  return getSubServicesByParentSlug(parentSlug).find((item) => item.slug === subSlug) || null;
}

export function getSubServiceHref(parentSlug, subSlug) {
  return `/services/${parentSlug}/${subSlug}`;
}

export function getSubServiceHeroTitle(parentSlug, subSlug, apiHeading = "") {
  const subService = getSubServiceBySlug(parentSlug, subSlug);
  if (subService?.heroTitle) return subService.heroTitle;
  if (apiHeading) return apiHeading;
  if (subService?.title) return subService.title;

  return subSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getAllSubServiceParams() {
  return Object.entries(subServicesByParent).flatMap(([parentSlug, items]) =>
    items.map((item) => ({ slug: parentSlug, subSlug: item.slug })),
  );
}
