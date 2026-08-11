"use client";

import { useState } from "react";
import { useReducedMotion } from "@/lib/independence-day/use-reduced-motion";
import FreedomCelebration from "./FreedomCelebration";
import "./independence-day.css";

interface IndependenceDayExperienceProps {
  initiallyActive?: boolean;
}

export default function IndependenceDayExperience({
  initiallyActive = false,
}: IndependenceDayExperienceProps) {
  const reducedMotion = useReducedMotion();
  const [active] = useState(initiallyActive);

  if (!active) {
    return null;
  }

  return <FreedomCelebration reducedMotion={reducedMotion} />;
}
