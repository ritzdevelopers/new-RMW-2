"use client";

import { GridScan } from "@/components/GridScan";

const Section2Background = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#0F0E14]" aria-hidden />
      <GridScan
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#5A5568"
        gridScale={0.1}
        scanColor="#4DA6FF"
        scanOpacity={0.4}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
        lineJitter={0.1}
        scanGlow={0.5}
        scanSoftness={2}
        enableWebcam={false}
        showPreview={false}
      />
    </div>
  );
};

export default Section2Background;
