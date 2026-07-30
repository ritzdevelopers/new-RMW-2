/**
 * Visually hidden SEO heading hierarchy for `/portfolio`.
 * Rendered with `sr-only` - present in source, not on the UI.
 */

export const portfolioPageSeoHeadings = {
  h1: ["Our Work Speaks for Itself | Ritz Media World Portfolio"],
  sections: [
    {
      h2: "Creative Portfolio & Case Studies",
      h3: [
        "Brand Identity",
        "Creative Design",
        "Website Design",
        "Brand Films",
        "Walk-Through Videos",
        "Influencer Marketing",
      ],
    },
    {
      h2: "Brand Identity Portfolio",
      h3: [
        "Logo Design",
        "Visual Identity Systems",
        "Brand Guidelines",
        "Stationery & Collateral",
      ],
    },
    {
      h2: "Creative Design Portfolio",
      h3: [
        "Marketing Creatives",
        "Campaign Visuals",
        "Print & Digital Artwork",
        "Social Media Creatives",
      ],
    },
    {
      h2: "Website Design Portfolio",
      h3: [
        "UI/UX Design",
        "Corporate Websites",
        "Landing Pages",
        "E-Commerce Experiences",
      ],
    },
    {
      h2: "Brand Films Portfolio",
      h3: [
        "Brand Story Videos",
        "Promotional Films",
        "Product Showcases",
        "AI-Assisted Video Content",
      ],
    },
    {
      h2: "Walk-Through Videos Portfolio",
      h3: [
        "3D Walkthroughs",
        "Real Estate Visualizations",
        "Interior & Exterior Tours",
        "Amenity Showcases",
      ],
    },
    {
      h2: "Influencer Marketing Portfolio",
      h3: [
        "Influencer Campaigns",
        "Creator Collaborations",
        "Social Amplification",
        "Performance-Driven Content",
      ],
    },
    { h2: "Why Brands Choose Ritz Media World" },
    { h2: "We Let Our Work Do the Talking" },
    { h2: "Explore Our Full Portfolio" },
  ],
};

export function getPortfolioPageSeoHeadings() {
  return portfolioPageSeoHeadings;
}
