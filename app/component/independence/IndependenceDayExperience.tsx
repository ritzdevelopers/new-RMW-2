"use client";

import { useEffect, useState } from "react";
import { independenceDayConfig } from "@/lib/independence-day/config";
import { useReducedMotion } from "@/lib/independence-day/use-reduced-motion";
import FreedomCelebration from "./FreedomCelebration";
import IndependenceDayBanner from "./IndependenceDayBanner";
import "./independence-day.css";

interface IndependenceDayExperienceProps {
  initiallyActive?: boolean;
}

export default function IndependenceDayExperience({
  initiallyActive = false,
}: IndependenceDayExperienceProps) {
  const reducedMotion = useReducedMotion();
  const [active] = useState(initiallyActive);

  useEffect(() => {
    const height = active
      ? `${independenceDayConfig.bannerHeightPx}px`
      : "0px";
    document.documentElement.style.setProperty("--independence-banner-height", height);
    return () => {
      document.documentElement.style.removeProperty("--independence-banner-height");
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <>
      <IndependenceDayBanner />
      <FreedomCelebration reducedMotion={reducedMotion} />
    </>
  );
}
