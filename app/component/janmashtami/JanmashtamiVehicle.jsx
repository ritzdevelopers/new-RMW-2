import Image from "next/image";
import Link from "next/link";
import { siteTheme } from "@/siteTheme";
import "./janmashtami.css";

export default function JanmashtamiVehicle() {
  if (!siteTheme.janmashtami) return null;

  return (
    <>
      <div className="janmashtami-decor" aria-hidden="true">
        <div className="janmashtami-bg" />
      </div>

      <div className="janmashtami-truck-layer">
        <Link
          href="/"
          className="janmashtami-truck-track"
          aria-label="Go to homepage"
        >
          <Image
            src="/janmashtami/logo.png"
            alt=""
            width={320}
            height={128}
            className="janmashtami-truck-image"
            sizes="50vw"
            priority={false}
          />
        </Link>
      </div>
    </>
  );
}