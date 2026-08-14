"use client";

import { useEffect, useState } from "react";
import { TRICOLOR } from "@/lib/independence-day/config";
import AshokaChakra from "./AshokaChakra";
import ChakraTrailParticles from "./ChakraTrailParticles";

const CHAKRA_SIZE_MD = 92;
const CHAKRA_SIZE_MOBILE = 68;

interface FreedomCelebrationProps {
  reducedMotion?: boolean;
}

export default function FreedomCelebration({ reducedMotion = false }: FreedomCelebrationProps) {
  const [chakraSize, setChakraSize] = useState(CHAKRA_SIZE_MOBILE);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setChakraSize(media.matches ? CHAKRA_SIZE_MD : CHAKRA_SIZE_MOBILE);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200]"
      role="presentation"
      aria-live="polite"
      aria-label="Independence Day celebration"
    >
      <div
        className={
          reducedMotion ? "id-chakra-journey-static" : "id-chakra-journey"
        }
      >
        <div className="flex flex-col items-center overflow-visible">
          <div className="id-chakra-journey-wheel">
            <ChakraTrailParticles reducedMotion={reducedMotion} />
            <AshokaChakra size={chakraSize} reducedMotion={reducedMotion} />
          </div>
          <div
            className={
              reducedMotion
                ? "mt-1.5 text-center md:mt-2"
                : "id-chakra-journey-label mt-1.5 text-center md:mt-2"
            }
          >
            <p className="font-league-spartan flex items-center justify-center gap-1 text-sm font-bold tracking-wide md:gap-1.5 md:text-base lg:text-lg">
              <span style={{ color: TRICOLOR.saffron }}>Jai</span>
              <span style={{ color: TRICOLOR.green }}>•</span>
              <span style={{ color: TRICOLOR.green }}>Hind</span>
              <span aria-hidden>🇮🇳</span>
            </p>
            <p className="font-montserrat mt-0.5 flex flex-wrap items-center justify-center gap-x-1 text-[7px] font-bold tracking-[0.16em] md:gap-x-1.5 md:text-[9px] md:tracking-[0.18em] xl:text-[10px]">
              <span style={{ color: TRICOLOR.saffron }}>Freedom</span>
              <span style={{ color: TRICOLOR.green }}>•</span>
              <span className="id-celebration-unity-word">Unity</span>
              <span style={{ color: TRICOLOR.saffron }}>•</span>
              <span style={{ color: TRICOLOR.green }}>Progress</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}