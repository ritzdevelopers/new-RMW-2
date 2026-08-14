interface IndependenceDayBannerProps {
  text: string;
}

export default function IndependenceDayBanner({ text }: IndependenceDayBannerProps) {
  return (
    <div className="id-banner" role="note" aria-label="Independence Day announcement">
      <p className="id-banner__text">{text}</p>
      <div className="id-banner__line" aria-hidden="true" />
    </div>
  );
}
