"use client";

import Section2Hero from "./Section2Hero";
import styles from "./page.module.css";

const Section2 = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0F0E14]">
      {/* Full-width intrinsic image — no left/right crop */}
      <img
        src="/new-theme/new-theme2.jpg"
        alt=""
        className="pointer-events-none block h-auto w-full select-none"
        aria-hidden
        draggable={false}
      />

      <div className={styles.heroOverlay}>
        <div className="mx-auto w-full max-w-8xl">
          <Section2Hero />
        </div>
      </div>
    </section>
  );
};

export default Section2;
