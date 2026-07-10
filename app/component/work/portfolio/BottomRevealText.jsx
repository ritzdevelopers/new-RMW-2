"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

function buildTokens(text, lineBreakBefore) {
  if (!lineBreakBefore || !text.includes(lineBreakBefore)) {
    return text.split("").map((char) => ({ type: "char", value: char }));
  }

  const breakIndex = text.indexOf(lineBreakBefore);
  const firstLine = text.slice(0, breakIndex).trimEnd();
  const secondLine = text.slice(breakIndex).trimStart();

  return [
    ...firstLine.split("").map((char) => ({ type: "char", value: char })),
    { type: "break" },
    ...secondLine.split("").map((char) => ({ type: "char", value: char })),
  ];
}

export default function BottomRevealText({
  as: Tag = "span",
  className = "",
  text,
  lineBreakBefore,
  stagger = 0.045,
  duration = 0.65,
  delay = 0,
}) {
  const containerRef = useRef(null);
  const tokens = useMemo(
    () => buildTokens(text, lineBreakBefore),
    [text, lineBreakBefore]
  );

  useEffect(() => {
    const charElements = containerRef.current?.querySelectorAll("[data-char]");
    if (!charElements?.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(charElements, { y: "0%", opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      charElements,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration,
        ease: "power3.out",
        stagger,
        delay,
      }
    );

    return () => {
      tween.kill();
    };
  }, [tokens, duration, stagger, delay]);

  return (
    <div className="overflow-hidden pb-[0.12em]">
      <Tag ref={containerRef} className={className}>
        {tokens.map((token, index) => {
          if (token.type === "break") {
            return <br key={`break-${index}`} className="max-md:hidden" />;
          }

          return (
            <span
              key={`${token.value}-${index}`}
              className="inline-block overflow-hidden align-top"
              style={{ height: "1.32em" }}
            >
              <span
                data-char
                className="inline-block will-change-transform leading-[1.15]"
                style={{ transform: "translateY(110%)", opacity: 0 }}
              >
                {token.value === " " ? "\u00A0" : token.value}
              </span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}