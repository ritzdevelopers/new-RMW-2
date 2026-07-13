"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/work/portfolio/websites-and-landing-pages");
  }, [router]);

  return null;
}
