"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ────────────────────────────────────────────────────────────────────
const API_BASE = "https://ritzmediaworld.com";
const CASE_STUDY_PATH = "/api/category/case-study";
const ACCENTS = ["#E8542A", "#3B71E8", "#1F8A5C", "#B32D2E", "#7A4FE0", "#D4A017"];
const DISPLAY_FONT = '"League Spartan", sans-serif';
const DROPDOWN_YEARS = [2025];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getCaseStudyApiUrl() {
  // Same-origin path - proxied in dev (next.config rewrites) and on Vercel (vercel.json).
  // Avoids browser CORS when calling ritzmediaworld.com directly from vercel.app.
  return CASE_STUDY_PATH;
}

function resolveBlogImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.trim();
  if (!normalized) return "";
  if (normalized.includes("/images")) {
    const tail = normalized.split("/images")[1] || "";
    return tail ? `${API_BASE}/api/images${tail}` : "";
  }
  return `${API_BASE}/blogs/${normalized.replace(/^\/+/, "")}`;
}

function getCaseStudyHref(slug) {
  if (!slug) return "";
  return `/${String(slug).replace(/^\/+/, "")}`;
}

function getYearFromImagePath(path) {
  const match = String(path || "").match(/^(\d{4})\//);
  return match ? Number(match[1]) : null;
}

async function enrichCaseStudyYear(item) {
  const pathYear = getYearFromImagePath(item.blog_image);
  if (pathYear) return pathYear;

  try {
    const response = await fetch(`/api/blog/${encodeURIComponent(item.slug)}`);
    if (!response.ok) return null;
    const data = await response.json();
    const createdAt = data?.blog?.created_at;
    if (!createdAt) return null;
    const year = new Date(createdAt).getFullYear();
    return Number.isNaN(year) ? null : year;
  } catch {
    return null;
  }
}

function mapCaseStudyItem(item, index) {
  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    image: resolveBlogImageUrl(item.blog_image),
    year: getYearFromImagePath(item.blog_image),
    accent: ACCENTS[index % ACCENTS.length],
    index,
  };
}

// ─── Panel ─────────────────────────────────────────────────────────────────────


function Panel({ project, total, isActive, onActivate }) {
  const handlePanelClick = () => {
    // Desktop: whole card navigates. Mobile/tablet: click only expands.
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      if (project.slug) {
        window.location.href = getCaseStudyHref(project.slug);
      }
      return;
    }
    onActivate();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePanelClick();
    }
  };

  return (
    <div
      className={`cs4-panel ${isActive ? "is-active" : ""}`}
      style={{ "--accent": project.accent }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={handlePanelClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${project.title} case study`}
    >
      <div className="cs4-panel-media">
        {project.image ? (
          <img src={project.image} alt={project.title} draggable={false} />
        ) : (
          <div className="cs4-panel-fallback" style={{ background: project.accent }} />
        )}
        <div className="cs4-panel-veil" />
      </div>

      {/* collapsed: horizontal spine label */}
      <div className="cs4-panel-spine">
        <span className="cs4-panel-spine-index">{String(project.index + 1).padStart(2, "0")}</span>
        <span className="cs4-panel-spine-title">{project.title}</span>
        <span className="cs4-panel-spine-dot" />
      </div>

      {/* expanded: full content */}
      <div className="cs4-panel-content">
        <span className="cs4-panel-tag">
          Case {String(project.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h3 className="cs4-panel-title">{project.title}</h3>
        {project.slug && (
          <Link
            href={getCaseStudyHref(project.slug)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="cs4-panel-cta"
          >
            <span>Explore</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const CaseStudyAccordion = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  const years = useMemo(() => {
    const yearSet = new Set(
      allProjects.map((project) => project.year).filter((year) => year != null),
    );
    DROPDOWN_YEARS.forEach((year) => yearSet.add(year));
    return [...yearSet].sort((a, b) => b - a);
  }, [allProjects]);

  const projects = useMemo(() => {
    if (!selectedYear || selectedYear === "all") return allProjects;
    const year = Number(selectedYear);
    return allProjects.filter((project) => project.year === year);
  }, [allProjects, selectedYear]);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedYear]);

  useEffect(() => {
    let cancelled = false;
    fetch(getCaseStudyApiUrl())
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(async (items) => {
        if (cancelled || !Array.isArray(items)) return;
        const mapped = items.map(mapCaseStudyItem);
        const enriched = await Promise.all(
          mapped.map(async (project, index) => {
            if (project.year != null) return project;
            const year = await enrichCaseStudyYear(items[index]);
            return { ...project, year };
          }),
        );
        if (!cancelled) {
          setAllProjects(enriched);
          setSelectedYear("all");
        }
      })
      .catch((err) => console.warn("Case study fetch failed:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.set(sectionRef.current.querySelectorAll(".cs4-panel"), { autoAlpha: 0, y: 24 });
    gsap.to(sectionRef.current.querySelectorAll(".cs4-panel"), {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, [projects.length]);

  useLayoutEffect(() => {
    if (!headRef.current) return;
    gsap.set(headRef.current, { autoAlpha: 0, y: 30 });
    gsap.to(headRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: headRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <>
      <style>{`
        .cs4-section { background:#0f0f0e; padding: 90px 0; }

        .cs4-head { max-width:1320px; margin:0 auto 48px; padding:0 24px;
          display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .cs4-eyebrow { font-family:${DISPLAY_FONT}; font-weight:600; letter-spacing:.22em; text-transform:uppercase; font-size:12px; color:#E8542A; }
        .cs4-heading { font-family:${DISPLAY_FONT}; font-weight:600; letter-spacing:-0.02em; color:#fff;
          font-size: clamp(34px, 5vw, 60px); line-height:.95; margin-top:8px; }
        .cs4-hint { font-family:${DISPLAY_FONT}; font-weight:500; font-size:13px; color:rgba(255,255,255,.45);
          letter-spacing:.04em; text-transform:uppercase; }
        .cs4-head-actions { display:flex; flex-direction:column; align-items:flex-end; gap:12px; }
        .cs4-year-filter {
          font-family:${DISPLAY_FONT}; font-weight:600; font-size:13px; letter-spacing:.04em;
          text-transform:uppercase; color:#fff; background:transparent;
          border:1px solid rgba(255,255,255,.35); border-radius:999px;
          padding:9px 36px 9px 16px; cursor:pointer; appearance:none;
          background-image: linear-gradient(45deg, transparent 50%, rgba(255,255,255,.7) 50%),
            linear-gradient(135deg, rgba(255,255,255,.7) 50%, transparent 50%);
          background-position: calc(100% - 18px) calc(50% + 2px), calc(100% - 12px) calc(50% + 2px);
          background-size: 6px 6px, 6px 6px;
          background-repeat: no-repeat;
        }
        .cs4-year-filter option { color:#0f0f0e; background:#fff; }

        .cs4-rail {
          max-width:1320px; margin:0 auto; padding:0 24px;
          display:flex; flex-direction:column; gap:8px;
          height: auto;
        }

        .cs4-panel {
          position:relative; border-radius: 18px; overflow:hidden; cursor:pointer;
          background:#1a1a18; width:100%;
          flex: 0 0 84px; height: 84px;
          transition: flex-basis .6s cubic-bezier(.22,.9,.18,1), height .6s cubic-bezier(.22,.9,.18,1);
        }
        .cs4-panel.is-active {
          flex: 0 0 629px;
          height: 629px;
        }

        .cs4-panel-media { position:absolute; inset:0; }
        .cs4-panel-media img {
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
          filter: grayscale(70%) brightness(.7); transform: scale(1.08);
          transition: filter .6s ease, transform .8s cubic-bezier(.22,.9,.18,1);
        }
        .cs4-panel.is-active .cs4-panel-media img {
          object-fit: fill;
          filter: grayscale(0%) brightness(1);
          transform: scale(1);
        }
        .cs4-panel-fallback { position:absolute; inset:0; opacity:.5; }
        .cs4-panel-veil {
          position:absolute; inset:0;
          background: linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.78) 100%);
        }

        /* collapsed strip label (horizontal for column layout) */
        .cs4-panel-spine {
          position:absolute; inset:0; display:flex; flex-direction:row; align-items:center;
          justify-content:flex-start; gap:14px; padding:0 24px; color:#fff;
          opacity:1; transition: opacity .35s ease;
        }
        .cs4-panel.is-active .cs4-panel-spine { opacity:0; pointer-events:none; }
        .cs4-panel-spine-index { font-family:${DISPLAY_FONT}; font-weight:600; font-size:12px; color:var(--accent); letter-spacing:.08em; flex-shrink:0; }
        .cs4-panel-spine-title {
          writing-mode: horizontal-tb; transform:none;
          font-family:${DISPLAY_FONT}; font-weight:600; font-size:14px; letter-spacing:.04em;
          text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
          max-width: calc(100% - 80px);
        }
        .cs4-panel-spine-dot { width:8px; height:8px; border-radius:999px; background:var(--accent); margin-left:auto; flex-shrink:0; }

        /* expanded content */
        .cs4-panel-content {
          position:absolute; left:0; right:0; bottom:0; padding: 28px 30px;
          display:flex; flex-direction:column; gap:10px; color:#fff;
          opacity:0; transform: translateY(16px);
          transition: opacity .4s ease .12s, transform .4s ease .12s;
        }
        .cs4-panel.is-active .cs4-panel-content { opacity:1; transform:translateY(0); }
        .cs4-panel-tag {
          font-family:${DISPLAY_FONT}; font-weight:600; font-size:11px; letter-spacing:.14em;
          text-transform:uppercase; color: var(--accent);
        }
        .cs4-panel-title {
          font-family:${DISPLAY_FONT}; font-weight:600; font-size: clamp(20px, 2.6vw, 30px);
          line-height:1.15; letter-spacing:-0.01em; max-width: 560px;
        }
        .cs4-panel-cta {
          margin-top:6px; align-self:flex-start; display:inline-flex; align-items:center; gap:8px;
          border:1.5px solid rgba(255,255,255,.5); border-radius:999px; padding:9px 18px;
          font-family:${DISPLAY_FONT}; font-weight:600; font-size:12px; letter-spacing:.05em; text-transform:uppercase;
          color:#fff; text-decoration:none; transition: background .25s, border-color .25s, color .25s;
        }
        .cs4-panel-cta:hover { background: var(--accent); border-color: var(--accent); }

        @media (max-width: 1023px) {
          .cs4-section { padding: 64px 0; }
          .cs4-panel { flex: 0 0 72px; height: 72px; width:100%; }
          .cs4-panel.is-active {
            flex: 0 0 auto;
            height: auto;
            min-height: 0;
          }
          .cs4-panel-media {
            position: relative;
            inset: auto;
            width: 100%;
            height: auto;
          }
          .cs4-panel.is-active .cs4-panel-media {
            display: block;
          }
          .cs4-panel-media img {
            position: relative;
            inset: auto;
            display: block;
            width: 100%;
            height: auto;
            object-fit: unset;
            transform: none;
          }
          .cs4-panel.is-active .cs4-panel-media img {
            object-fit: unset;
            filter: grayscale(0%) brightness(1);
            transform: none;
          }
          .cs4-panel:not(.is-active) .cs4-panel-media {
            position: absolute;
            inset: 0;
          }
          .cs4-panel:not(.is-active) .cs4-panel-media img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(70%) brightness(.7);
            transform: scale(1.08);
          }
          .cs4-panel-fallback {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
          }
          .cs4-panel:not(.is-active) .cs4-panel-fallback {
            position: absolute;
            inset: 0;
            aspect-ratio: auto;
          }
          .cs4-panel-veil {
            position: absolute;
            inset: 0;
          }
          .cs4-panel.is-active .cs4-panel-veil {
            background: linear-gradient(180deg, rgba(0,0,0,.05) 40%, rgba(0,0,0,.78) 100%);
          }
          .cs4-panel-content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 22px 20px;
          }
          .cs4-panel-spine { padding:0 18px; gap:12px; }
          .cs4-panel-spine-title { font-size:13px; max-width: calc(100% - 70px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs4-panel, .cs4-panel-media img, .cs4-panel-content { transition:none !important; }
        }
      `}</style>

      <section ref={sectionRef} className="cs4-section">
        <div className="cs4-head" ref={headRef}>
          <div>
            <span className="cs4-eyebrow">Selected Work</span>
            <h2 className="cs4-heading">Case Studies</h2>
          </div>
          <div className="cs4-head-actions">
            {years.length > 0 ? (
              <select
                className="cs4-year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter case studies by year"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            ) : null}
            {/* <span className="cs4-hint">Hover to expand →</span> */}
          </div>
        </div>

        <div className="cs4-rail">
          {projects.map((project, i) => (
            <Panel
              key={project.id}
              project={{ ...project, index: i }}
              total={projects.length}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CaseStudyAccordion;