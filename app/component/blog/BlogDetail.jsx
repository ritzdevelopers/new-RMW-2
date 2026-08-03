import React from "react";
import { resolveBlogImageUrl } from "../../../lib/caseStudyApi";
import CaseStudySidebar from "../case-study/CaseStudySidebar";
import DetailContactForm from "./DetailContactForm";

const DISPLAY_FONT = '"League Spartan", sans-serif';
const BODY_FONT = '"Montserrat", sans-serif';

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ensureLinkTitles(html) {
  return String(html || "").replace(
    /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
    (match, attrs, content) => {
      if (/\btitle\s*=/i.test(attrs)) return match;
      const text = String(content)
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const hrefMatch = attrs.match(/\bhref\s*=\s*["']([^"']*)["']/i);
      const titleText = text || hrefMatch?.[1] || "Read more";
      const safeTitle = titleText
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;");
      return `<a${attrs} title="${safeTitle}">${content}</a>`;
    },
  );
}

export default function BlogDetail({ blog, sidebar }) {
  const title = blog?.title || "";
  const image = resolveBlogImageUrl(blog?.blog_image || blog?.banner);
  const description = ensureLinkTitles(blog?.description || "");
  const createdAt = formatDate(blog?.created_at);

  return (
    <>
      <style>{`
        .bd-hero {
          position: relative;
          background: #0D1334;
          padding: 72px 0 56px;
        }
        .bd-eyebrow {
          font-family: ${DISPLAY_FONT};
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E8542A;
        }
        .bd-title {
          margin: 12px 0 0;
          font-family: ${DISPLAY_FONT};
          font-weight: 600;
          font-size: clamp(28px, 4.5vw, 52px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .bd-content {
          background: #fff;
          padding: 48px 0 80px;
        }
        .bd-featured-wrap {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #D9D9D9;
        }
        .bd-featured-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 5px;
        }
        .bd-featured-image img {
          width: 100%;
          height: 100%; 
          object-position: center;
          display: block;
        }
        @media (max-width: 640px) {
          .bd-featured-image {
            aspect-ratio: 4 / 3;
          }
        }
        .bd-body {
          font-family: ${BODY_FONT};
          font-size: 16px;
          line-height: 1.75;
          color: #1D1D1B;
          text-align: left;
        }
        .bd-body h2,
        .bd-body h3,
        .bd-body h4 {
          font-family: ${DISPLAY_FONT};
          font-weight: 600;
          color: #0D1334;
          margin: 1.6em 0 0.6em;
          line-height: 1.25;
        }
        .bd-body h2 { font-size: clamp(22px, 3vw, 30px); }
        .bd-body h3 { font-size: clamp(18px, 2.4vw, 24px); }
        .bd-body p { margin: 0 0 1em; }
        .bd-body img {
          display: block;
          max-width: 100%;
          max-height: min(70vh, 560px);
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          margin: 1.5em auto;
        }
        .bd-body a { color: #3B71E8; text-decoration: underline; }
        .bd-body ul,
        .bd-body ol { margin: 0 0 1em 1.25em; }
        .bd-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          display: block;
          overflow-x: auto;
        }
        .bd-body th,
        .bd-body td {
          border: 1px solid #e5e5e5;
          padding: 10px 12px;
          text-align: left;
        }
      `}</style>

      <section className="bd-hero">
        <div className="mx-auto w-full max-w-8xl px-8 text-left md:px-12">
          <span className="text-[#D59E47]">Blog</span>
          <h1 className="bd-title">{title}</h1>
        </div>
      </section>

      <section className="bd-content">
        <div className="mx-auto w-full max-w-8xl px-8 text-left md:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="min-w-0 lg:col-span-8">
              {image ? (
                <div className="bd-featured-wrap">
                  <div className="bd-featured-image">
                    <img src={image} alt={title} title={title} />
                  </div>
                  {title ? (
                    <h2
                      className="m-0 mt-4 text-[22px] font-semibold leading-[1.25] text-[#0D1334] sm:mt-5 sm:text-[26px] md:text-[30px]"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      {title}
                    </h2>
                  ) : null}
                  {createdAt ? (
                    <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4 sm:gap-4">
                      <p
                        className="text-[14px] font-normal sm:text-[15px] xl:text-[16px]"
                        style={{ fontFamily: BODY_FONT }}
                      >
                        {createdAt}
                      </p>
                      <div className="h-[5px] w-[5px] rounded-full bg-[#0F1640]" />
                      <p
                        className="text-[12px] font-normal sm:text-[13px] xl:text-[14px]"
                        style={{ fontFamily: BODY_FONT }}
                      >
                        Blog
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {description ? (
                <div
                  className="bd-body"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-8 lg:self-start">
              <DetailContactForm />
              <CaseStudySidebar
                allBlogs={sidebar?.allBlogs || []}
                categories={sidebar?.categories || []}
                keywords={sidebar?.keywords || []}
                relatedBlogs={sidebar?.relatedBlogs || []}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// #3B0758, 