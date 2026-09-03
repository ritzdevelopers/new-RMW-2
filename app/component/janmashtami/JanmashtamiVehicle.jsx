import Image from "next/image";
import { siteTheme } from "@/siteTheme";
import "./janmashtami.css";

export default function JanmashtamiVehicle() {
  if (!siteTheme.janmashtami) return null;

  return (
    <>
      <div className="janmashtami-decor" aria-hidden>
        <div className="janmashtami-bg" />
      </div>

      <div className="janmashtami-truck-layer" aria-hidden>
        <div className="janmashtami-truck-track">
          <Image
            src="/janmashtami/logo.png"
            alt=""
            width={320}
            height={128}
            className="janmashtami-truck-image"
            sizes="50vw"
            priority={false}
          />
        </div>
      </div>
    </>
  );
}
