"use client";

import React from "react";
import SubServiceSections from "./SubServiceSections";

const ThreeDRenderingSlider = ({ subServices = [] }) => {
  const cards = subServices
    .map((service) => service.cards?.[0])
    .filter(Boolean);

  return <SubServiceSections cards={cards} />;
};

export default ThreeDRenderingSlider;
