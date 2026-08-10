"use client";

import { useEffect, useState } from "react";
import { independenceDayConfig, isIndependenceDayActive } from "./config";
import IndependenceDayBanner from "./IndependenceDayBanner";
import FlyingKites from "./FlyingKites";
import CelebrateFreedomButton from "./CelebrateFreedomButton";
import FreedomCelebration from "./FreedomCelebration";

interface IndependenceDayExperienceProps {
  /** Computed server-side at render time, used as the initial value. */
  isActive: boolean;
}

export default function IndependenceDayExperience({
  isActive: initialActive,
}: IndependenceDayExperienceProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    // Re-validate on the client in case this page was statically generated
    // ahead of the active window (self-corrects without a redeploy).
    setIsActive(isIndependenceDayActive(independenceDayConfig));

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isActive) return null;

  return (
    <>
      <IndependenceDayBanner text={independenceDayConfig.bannerText} />
      <FlyingKites prefersReducedMotion={prefersReducedMotion} />
      <CelebrateFreedomButton
        onCelebrate={() => setIsCelebrating(true)}
        celebrating={isCelebrating}
      />
      <FreedomCelebration
        active={isCelebrating}
        prefersReducedMotion={prefersReducedMotion}
        onComplete={() => setIsCelebrating(false)}
      />
    </>
  );
}
