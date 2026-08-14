"use client";

interface CelebrateFreedomButtonProps {
  onCelebrate: () => void;
  celebrating: boolean;
}

export default function CelebrateFreedomButton({
  onCelebrate,
  celebrating,
}: CelebrateFreedomButtonProps) {
  return (
    <button
      type="button"
      onClick={onCelebrate}
      disabled={celebrating}
      aria-label="Celebrate Independence Day with a short animation"
      className="id-celebrate-btn"
    >
      <span aria-hidden="true">🇮🇳</span>
      <span className="id-celebrate-btn__label">Celebrate Freedom</span>
    </button>
  );
}
