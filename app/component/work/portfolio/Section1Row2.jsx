"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const galleryColumns = [
  [
    { src: "/portfolio/protfolio-gallery-1.jpg", alt: "Jewelry rings" },
    { src: "/portfolio/portfolio-image-2.jpg", alt: "Brand moodboard" },
  ],
  [
    { src: "/portfolio/portfolio-image-3.jpg", alt: "Beauty branding" },
    { src: "/portfolio/portfolio-gallery-4.jpg", alt: "Website mockups" },
    { src: "/portfolio/portfolio-gallery-5.jpeg", alt: "One Body storefront" },
    { src: "/portfolio/portfolio-gallery-6.jpg", alt: "Stationery cards" },
  ],
  [
    { src: "/portfolio/portfolio-gallery-7.jpg", alt: "Melissa Sassine branding" },
    { src: "/portfolio/portfolio-gallery-8.png", alt: "Poster mockup" },
    { src: "/portfolio/portfolio-gallery-17.jpg", alt: "Poster mockup" },
  ],
  [
    { src: "/portfolio/portfolio-gallery1.jpg", alt: "Storefront branding" },
    { src: "/portfolio/portfolio-gallery-11.jpg", alt: "Print gallery" },
    { src: "/portfolio/portfolio-gallery-12.jpg", alt: "Brochure layout" },
  ],
  [
    { src: "/portfolio/portfolio-gallery-13.jpg", alt: "Glowderm branding" },
    { src: "/portfolio/portfolio-gallery-14.jpg", alt: "Studio photoshoot" },
    { src: "/portfolio/portfolio-gallery-15.webp", alt: "Mobile app screens" },
    { src: "/portfolio/portfolio-gallery-16.jpg", alt: "Digital portfolio collage" },
  ],
];

const allImages = galleryColumns.flat();

/** Distribute images into N vertical masonry columns */
function toColumns(items, count) {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, index) => {
    columns[index % count].push(item);
  });
  return columns;
}

const lgColumns = toColumns(allImages, 4);
const mdColumns = toColumns(allImages, 3);
const smColumns = toColumns(allImages, 2);

function GalleryImage({ src, alt, sizes, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.({ src, alt })}
      className="block w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left"
      aria-label={`View ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={1000}
        sizes={sizes}
        className="block h-auto w-full"
        style={{ width: "100%", height: "auto" }}
      />
    </button>
  );
}

function MasonryColumns({ columns, gapX, gapY, gapPx, sizes, className, onOpen }) {
  return (
    <div
      className={`w-full ${gapX ?? ""} ${className}`}
      style={gapPx != null ? { columnGap: `${gapPx}px` } : undefined}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={`col-${columnIndex}`}
          className={`flex min-w-0 flex-1 flex-col ${gapY ?? ""}`}
          style={gapPx != null ? { gap: `${gapPx}px` } : undefined}
        >
          {column.map((item) => (
            <GalleryImage
              key={item.src}
              src={item.src}
              alt={item.alt}
              sizes={sizes}
              onOpen={onOpen}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[101] flex h-10 w-10 items-center justify-center border-0 bg-transparent text-3xl leading-none text-white"
        aria-label="Close"
      >
        ×
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={2000}
          sizes="90vw"
          className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
          style={{ width: "auto", height: "auto", maxHeight: "90vh" }}
          priority
        />
      </div>
    </div>
  );
}

export default function Section1Row2() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="w-full bg-white pt-6">
      {/* xl: 5-column masonry */}
      <MasonryColumns
        columns={galleryColumns}
        gapX="gap-x-[15px]"
        gapY="gap-y-[15px]"
        sizes="20vw"
        className="hidden xl:flex"
        onOpen={setLightbox}
      />

      {/* lg: 4-column masonry (vertical stacks) */}
      <MasonryColumns
        columns={lgColumns}
        gapX="gap-x-[20px]"
        gapY="gap-y-[20px]"
        sizes="25vw"
        className="hidden lg:flex xl:hidden"
        onOpen={setLightbox}
      />

      {/* md: 3-column masonry — 10px gaps only */}
      <MasonryColumns
        columns={mdColumns}
        gapPx={10}
        sizes="33vw"
        className="hidden md:flex lg:hidden"
        onOpen={setLightbox}
      />

      {/* mobile: 2-column masonry — no empty gaps under shorter images */}
      <MasonryColumns
        columns={smColumns}
        gapPx={10}
        sizes="50vw"
        className="flex md:hidden"
        onOpen={setLightbox}
      />

      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
