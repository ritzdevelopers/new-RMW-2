"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Section3 / Section4 / Footer stay out of the page until the user has
 * scrolled through the top block (Section1 + Section2).
 */
const BlogScrollGate = ({ top, bottom }) => {
  const topRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) return;

    const check = () => {
      const el = topRef.current;
      if (!el) return;

      const end = el.offsetTop + el.offsetHeight;
      if (window.scrollY + window.innerHeight >= end - 4) {
        setUnlocked(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [unlocked]);

  return (
    <>
      <div ref={topRef}>{top}</div>
      {unlocked ? bottom : null}
    </>
  );
};

export default BlogScrollGate;
