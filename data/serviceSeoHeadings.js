/**
 * Visually hidden SEO heading hierarchies.
 * Rendered with `sr-only` - present in source, not on the UI.
 */

const industries = [
  "Real Estate",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Startups",
];

const defaultProcess = [
  "Business Analysis & Goal Setting",
  "Market & Competitor Research",
  "Strategy Development",
  "Campaign Execution",
  "Performance Monitoring & Optimization",
  "Reporting & Continuous Improvement",
];

/** SEO headings for `/services` listing page */
export const servicesPageSeoHeadings = {
  h1: [
    "Advertising & Digital Services by Ritz Media World",
  ],
  sections: [
    {
      h2: "Our Full-Service Marketing Solutions",
      h3: [
        "Digital Marketing",
        "Creative Services",
        "Print Advertising",
        "Radio Advertising",
        "Content Marketing",
        "Web Design & Development",
        "Celebrity Endorsements",
        "Influencer Marketing",
        "3D Rendering Services",
      ],
    },
    {
      h2: "Digital Marketing Services",
      h3: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing (SMM)",
        "Online Reputation Management (ORM)",
        "Pay Per Click (PPC) Advertising",
        "Lead Generation",
        "Brand Awareness",
      ],
    },
    {
      h2: "Creative Services",
      h3: [
        "Branding & Identity Development",
        "Graphic Design",
        "Logo Design",
        "Print Advertising Design",
        "Packaging Design",
      ],
    },
    {
      h2: "Print Advertising Services",
      h3: [
        "Advertisement Design",
        "Ad Placement",
        "Copywriting",
        "Cost Negotiation",
        "Ad Size Optimization",
        "Ad Scheduling",
      ],
    },
    {
      h2: "Radio Advertising Services",
      h3: [
        "Concept Development",
        "Scriptwriting",
        "Voiceover Casting",
        "Recording & Production",
        "Media Planning",
        "Media Buying & Cost Negotiation",
      ],
    },
    {
      h2: "Content Marketing Services",
      h3: [
        "Content Strategy",
        "Email & Newsletters",
        "Assets & Infographics",
        "Promotion & Optimization",
      ],
    },
    {
      h2: "Web Design & Development Services",
      h3: [
        "UI/UX Design",
        "Custom Development",
        "E-Commerce",
        "Landing Pages",
        "WordPress",
      ],
    },
    {
      h2: "Celebrity Endorsement Services",
      h3: [
        "Celebrity Identification",
        "Contract Negotiations",
        "Creative Collaboration",
        "Campaign Integration",
        "Public Relations",
        "Legal Compliance",
      ],
    },
    {
      h2: "Influencer Marketing Services",
      h3: [
        "Influencer Identification",
        "Cost-Benefit Analysis",
        "Terms Negotiations",
        "Creative Collaboration",
        "Campaign Integration",
        "Messaging Optimization",
      ],
    },
    {
      h2: "3D Rendering Services",
      h3: [
        "3D Exterior Rendering",
        "3D Interior Rendering",
        "Aerial & Township",
        "3D Floor Plan Rendering",
        "Amenity & Landscape Rendering",
      ],
    },
    { h2: "Why Choose Ritz Media World" },
    { h2: "Industries We Serve", h3: industries },
    { h2: "Get a Free Marketing Consultation" },
  ],
};

/** @type {Record<string, { h1: string[], sections: Array<{ h2: string, h3?: string[] }> }>} */
export const serviceSeoHeadingsBySlug = {
  "digital-marketing": {
    h1: [
      "Digital Marketing Solutions Built for Sustainable Growth",
    ],
    sections: [
      {
        h2: "Accelerate Your Business Growth with Digital Marketing",
      },
      {
        h2: "Our Digital Marketing Services",
        h3: [
          "Search Engine Optimization (SEO)",
          "Social Media Marketing (SMM)",
          "Online Reputation Management (ORM)",
          "Pay Per Click (PPC) Advertising",
          "Lead Generation",
          "Brand Awareness",
        ],
      },
      {
        h2: "Our Digital Marketing Process",
        h3: defaultProcess,
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Digital Marketing Consultation" },
    ],
  },

  "creative-services": {
    h1: [
      "Design That Defines Convention",
    ],
    sections: [
      {
        h2: "Build a Brand Identity That Stands Out",
      },
      {
        h2: "Our Creative Services",
        h3: [
          "Branding & Identity Development",
          "Graphic Design",
          "Logo Design",
          "Print Advertising Design",
          "Packaging Design",
        ],
      },
      {
        h2: "Our Creative Process",
        h3: [
          "Brand Discovery & Research",
          "Concept & Strategy Development",
          "Visual Design & Exploration",
          "Creative Execution",
          "Feedback & Refinement",
          "Final Delivery & Brand Guidelines",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Creative Consultation" },
    ],
  },

  "print-advertising": {
    h1: [
      "Print Advertising Services in India | Best Advertising Agency in Delhi NCR",
    ],
    sections: [
      { h2: "Best Print Advertising Services for Maximum Brand Reach" },
      {
        h2: "Our Print Advertising Services",
        h3: [
          "Newspaper Advertising Services",
          "Magazine Advertising Services",
          "Classified Advertisement Services",
          "Display Advertisement Services",
          "Matrimonial Advertisement Services",
          "Tender & Public Notice Advertisements",
        ],
      },
      {
        h2: "Newspaper Advertising Solutions",
        h3: [
          "Newspaper Ad Cost",
          "Dainik Jagran Newspaper Ad Cost",
          "Hindustan Times Matrimonial Ad Booking",
          "Times of India Newspaper Advertising",
          "Regional Newspaper Advertising",
        ],
      },
      {
        h2: "Print Advertising Services in Delhi, Noida & NCR",
        h3: [
          "Print Advertising Services in Delhi",
          "Print Advertising Services in Noida",
          "Advertising Agency in Delhi NCR",
          "PAN India Newspaper Advertising",
        ],
      },
      {
        h2: "Why Choose Ritz Media World?",
        h3: [
          "Best Advertising Agency in Delhi NCR",
          "500+ Newspaper & Magazine Partners",
          "Best Media Buying Rates",
          "Expert Media Planning",
          "Creative Advertisement Design",
          "Dedicated Campaign Management",
        ],
      },
      {
        h2: "Our Print Advertising Process",
        h3: [
          "Requirement Analysis",
          "Media Planning",
          "Publication Selection",
          "Creative Design & Approval",
          "Advertisement Booking",
          "Campaign Execution & Reporting",
        ],
      },
      {
        h2: "Industries We Serve",
        h3: [
          "Real Estate",
          "Education",
          "Healthcare",
          "Retail & FMCG",
          "Government & PSU",
          "Automobile",
          "Hospitality",
          "Finance",
        ],
      },
      {
        h2: "Frequently Asked Questions",
        h3: [
          "What is the newspaper ad cost?",
          "How much does Dainik Jagran newspaper advertising cost?",
          "How do I book a Hindustan Times matrimonial ad?",
          "Which is the best advertising agency in Delhi?",
          "Do you provide print advertising services in Noida?",
          "Can I advertise in multiple newspapers at once?",
          "How long does newspaper ad booking take?",
          "Do you provide advertisement design services?",
        ],
      },
      {
        h2: "Start Your Print Advertising Campaign Today",
        h3: [
          "Contact Form",
          "Call Now Button",
          "WhatsApp Button",
          "Email Enquiry",
          "Get a Free Quote CTA",
        ],
      },
    ],
  },

  "radio-advertising": {
    h1: ["Radio Advertising Agency in India"],
    sections: [
      {
        h2: "Radio Advertising Agency in India | Strategic FM Radio Advertising Services",
      },
      { h2: "Amplify Your Brand with Professional Radio Advertising Solutions" },
      {
        h2: "Our Radio Advertising Services",
        h3: [
          "Concept Development",
          "Scriptwriting",
          "Voiceover Casting",
          "Recording & Production",
          "Media Planning",
          "Media Buying & Cost Negotiation",
        ],
      },
      {
        h2: "Our Radio Advertising Process",
        h3: [
          "Business Consultation & Campaign Objectives",
          "Audience Research & Market Analysis",
          "Creative Concept Development",
          "Professional Radio Scriptwriting",
          "Voiceover Casting & Audio Production",
          "Media Planning & Radio Station Selection",
          "Media Buying & Cost Negotiation",
          "Campaign Launch & Broadcasting",
          "Performance Monitoring & Campaign Optimization",
          "Reporting & Continuous Improvement",
        ],
      },
      { h2: "Why Choose Ritz Media World for Radio Advertising" },
      {
        h2: "Industries We Serve",
        h3: [
          "Real Estate",
          "Healthcare",
          "Education",
          "Retail",
          "Automotive",
          "Hospitality",
          "E-commerce",
          "FMCG",
          "Corporate",
          "Government & Public Sector",
        ],
      },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Radio Advertising Consultation" },
    ],
  },

  "contents-marketing": {
    h1: [
      "Content Marketing Services That Drive Organic Traffic, Brand Authority & Business Growth",
    ],
    sections: [
      { h2: "Build Your Brand with Strategic Content Marketing" },
      { h2: "Why Choose Our Content Marketing Services?" },
      {
        h2: "Our Content Marketing Services",
        h3: [
          "Website Content Writing",
          "SEO Content Writing",
          "Blog Writing Services",
          "Copywriting Services",
          "Social Media Content",
          "Email Marketing & Newsletters",
          "Visual Assets & Infographics",
          "Content Promotion & Optimization",
        ],
      },
      { h2: "Our Content Marketing Process" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Benefits of Professional Content Marketing" },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Frequently Asked Questions (FAQ)" },
      { h2: "Ready to Grow Your Business with Strategic Content Marketing" },
    ],
  },

  "web-designing-and-development": {
    h1: [
      "Professional Website Design & Development Services",
    ],
    sections: [
      { h2: "Build High-Performance Websites That Drive Business Growth" },
      {
        h2: "Our Website Design & Development Solutions",
        h3: [
          "UI/UX Design Services",
          "Custom Website Development Services",
          "WordPress Website Development Services",
          "eCommerce Website Development Services",
          "Landing Page Design & Development Services",
          "Website Maintenance & Support Services",
        ],
      },
      {
        h2: "Why Invest in Professional Website Design & Development?",
        h3: [
          "Create a Strong First Impression",
          "Improve User Experience & Engagement",
          "Increase Search Engine Visibility",
          "Generate More Leads & Sales",
          "Build Trust & Brand Credibility",
        ],
      },
      {
        h2: "Our Website Development Process",
        h3: [
          "Discovery & Business Consultation",
          "Research & Project Planning",
          "UI/UX Design & Wireframing",
          "Website Development",
          "Quality Assurance & Testing",
          "Website Launch",
          "Ongoing Website Support & Optimization",
        ],
      },
      {
        h2: "Why Choose Ritz Media World?",
        h3: [
          "Experienced Web Design & Development Experts",
          "Custom & Business-Focused Solutions",
          "SEO-Optimized Website Development",
          "Mobile-Responsive & Fast-Loading Websites",
          "Secure, Scalable & Future-Ready Development",
          "Transparent Communication & Dedicated Support",
        ],
      },
      {
        h2: "Technologies We Use",
        h3: [
          "Frontend Development",
          "Backend Development",
          "CMS & eCommerce Platforms",
          "Database & Cloud Solutions",
        ],
      },
      {
        h2: "Industries We Serve",
        h3: [
          "Real Estate",
          "Healthcare",
          "Education",
          "Retail & eCommerce",
          "Hospitality",
          "Manufacturing",
          "Finance",
          "Startups & SMEs",
          "Corporate Enterprises",
        ],
      },
      {
        h2: "Benefits of Choosing Our Website Development Services",
        h3: [
          "Responsive & Mobile-Friendly Design",
          "SEO-Friendly Website Architecture",
          "High-Speed Website Performance",
          "Enhanced Security & Reliability",
          "Easy Content Management",
          "Scalable Solutions for Business Growth",
        ],
      },
    ],
  },

  "celebrity-endorsements": {
    h1: ["Celebrity Endorsement Agency in India"],
    sections: [
      { h2: "Celebrity Endorsement Services" },
      {
        h2: "Our Celebrity Endorsement Services",
        h3: [
          "Celebrity Identification & Selection",
          "Contract Negotiations",
          "Creative Collaboration",
          "Campaign Integration",
          "Public Relations",
          "Legal Compliance",
        ],
      },
      { h2: "Why Choose Our Celebrity Endorsement Services?" },
      {
        h2: "Our Celebrity Endorsement Process",
        h3: [
          "Understand Your Brand & Objectives",
          "Identify the Right Celebrity",
          "Negotiate the Partnership",
          "Develop the Creative Campaign",
          "Execute & Integrate the Campaign",
          "Amplify Through PR & Media",
          "Measure Campaign Impact",
        ],
      },
      {
        h2: "Why Celebrity Endorsements Matter for Brands",
        h3: [
          "Build Brand Recognition",
          "Strengthen Brand Credibility",
          "Expand Audience Reach",
          "Increase Brand Engagement",
          "Support Product Launches",
          "Strengthen Brand Recall",
        ],
      },
      { h2: "Build Your Brand with the Right Celebrity Partnership" },
    ],
  },

  "influencer-marketing-agency-in-india": {
    h1: [
      "Influencer Marketing Agency in India",
    ],
    sections: [
      {
        h2: "Influencer Marketing Services That Build Authentic Brand Connections",
      },
      { h2: "Why Choose Our Influencer Marketing Services?" },
      {
        h2: "Our Influencer Marketing Services",
        h3: [
          "Influencer Identification",
          "Cost-Benefit Analysis",
          "Terms Negotiations",
          "Creative Collaboration",
          "Campaign Integration",
          "Messaging Optimization",
        ],
      },
      {
        h2: "Influencer Marketing Strategies for Business Growth",
        h3: [
          "Brand Awareness & Audience Reach",
          "Authentic Creator Partnerships",
          "Social Media Engagement",
          "Product & Service Promotion",
          "Lead Generation & Conversions",
        ],
      },
      {
        h2: "Influencer Marketing Across Social Media Platforms",
        h3: [
          "Instagram Influencer Marketing",
          "YouTube Influencer Marketing",
          "Facebook Influencer Marketing",
          "LinkedIn Influencer Marketing",
          "Regional & Niche Influencer Marketing",
        ],
      },
      {
        h2: "Our Influencer Marketing Process",
        h3: [
          "Campaign Planning & Strategy",
          "Influencer Research & Selection",
          "Campaign & Content Development",
          "Influencer Collaboration & Management",
          "Campaign Monitoring & Optimization",
          "Performance Analysis & Reporting",
        ],
      },
    ],
  },

  "3d-rendering": {
    h1: [
      "See It Before It Exists",
    ],
    sections: [
      { h2: "Turn Architectural Ideas into Photorealistic Visuals" },
      {
        h2: "Our 3D Rendering Services",
        h3: [
          "3D Exterior Rendering",
          "3D Interior Rendering",
          "Aerial & Township",
          "3D Floor Plan Rendering",
          "Amenity & Landscape Rendering",
        ],
      },
      {
        h2: "Our 3D Rendering Process",
        h3: [
          "Project Brief & Reference Gathering",
          "3D Modeling",
          "Texturing & Lighting",
          "Rendering & Visualization",
          "Client Review & Refinement",
          "Final Delivery & Formats",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free 3D Rendering Consultation" },
    ],
  },
};

export function getServiceSeoHeadings(slug) {
  return serviceSeoHeadingsBySlug[slug] || null;
}

export function getServicesPageSeoHeadings() {
  return servicesPageSeoHeadings;
}
