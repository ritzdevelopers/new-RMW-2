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
        "Cost Negotiations",
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
      "Where Ink Still Wins the Room",
    ],
    sections: [
      { h2: "Capture Attention with High-Impact Print Campaigns" },
      {
        h2: "Our Print Advertising Services",
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
        h2: "Our Print Advertising Process",
        h3: [
          "Brief & Audience Analysis",
          "Creative Concept Development",
          "Design & Copywriting",
          "Media Planning & Placement",
          "Production & Scheduling",
          "Performance Review & Optimization",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Print Advertising Consultation" },
    ],
  },

  "radio-advertising": {
    h1: [
      "When Sound Commands Attention",
    ],
    sections: [
      { h2: "Build Brand Recall with Powerful Radio Campaigns" },
      {
        h2: "Our Radio Advertising Services",
        h3: [
          "Concept Development",
          "Scriptwriting",
          "Voiceover Casting",
          "Recording & Production",
          "Media Planning",
          "Cost Negotiations",
        ],
      },
      {
        h2: "Our Radio Advertising Process",
        h3: [
          "Brand & Audience Discovery",
          "Concept & Script Development",
          "Casting & Production",
          "Station Planning & Buying",
          "On-Air Scheduling",
          "Performance Tracking & Optimization",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Radio Advertising Consultation" },
    ],
  },

  "contents-marketing": {
    h1: [
      "Content with Purpose",
    ],
    sections: [
      { h2: "Earn Attention and Trust with Strategic Content" },
      {
        h2: "Our Content Marketing Services",
        h3: [
          "Content Strategy",
          "Email & Newsletters",
          "Assets & Infographics",
          "Promotion & Optimization",
        ],
      },
      {
        h2: "Our Content Marketing Process",
        h3: [
          "Audience & Keyword Research",
          "Editorial Strategy Planning",
          "Content Creation",
          "Distribution & Promotion",
          "Engagement & Lead Nurturing",
          "Analytics & Continuous Improvement",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Content Marketing Consultation" },
    ],
  },

  "web-designing-and-development": {
    h1: [
      "Built for Performance and Conversion",
    ],
    sections: [
      { h2: "Build Digital Experiences That Drive Growth" },
      {
        h2: "Our Web Design & Development Services",
        h3: [
          "UI/UX Design",
          "Custom Development",
          "E-Commerce",
          "Landing Pages",
          "WordPress",
        ],
      },
      {
        h2: "Our Web Development Process",
        h3: [
          "Discovery & Requirement Analysis",
          "UX Research & Wireframing",
          "UI Design & Prototyping",
          "Development & Integration",
          "Testing & Quality Assurance",
          "Launch, Support & Optimization",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Web Development Consultation" },
    ],
  },

  "celebrity-endorsements": {
    h1: [
      "When Star Power Builds Trust",
    ],
    sections: [
      { h2: "Amplify Your Brand with the Right Celebrity Partnerships" },
      {
        h2: "Our Celebrity Endorsement Services",
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
        h2: "Our Celebrity Endorsement Process",
        h3: [
          "Brand Fit Analysis",
          "Talent Shortlisting",
          "Negotiation & Contracting",
          "Creative Collaboration",
          "Campaign Rollout",
          "PR, Tracking & Optimization",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Celebrity Endorsement Consultation" },
    ],
  },

  "influencer-marketing-agency-in-india": {
    h1: [
      "Trust Over Hype",
    ],
    sections: [
      { h2: "Grow Your Brand with Authentic Influencer Campaigns" },
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
        h2: "Our Influencer Marketing Process",
        h3: [
          "Audience & Goal Definition",
          "Influencer Discovery & Vetting",
          "Briefing & Negotiation",
          "Content Creation & Approval",
          "Campaign Launch & Amplification",
          "Reporting & Performance Optimization",
        ],
      },
      { h2: "Why Choose Ritz Media World" },
      { h2: "Industries We Serve", h3: industries },
      { h2: "Our Success Stories" },
      { h2: "Frequently Asked Questions (FAQs)" },
      { h2: "Get a Free Influencer Marketing Consultation" },
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
