export default function AshokaChakra() {
  const spokeAngles = Array.from({ length: 24 }, (_, i) => i * (360 / 24));

  return (
    <svg viewBox="0 0 100 100" className="id-chakra" role="img" aria-label="Ashoka Chakra">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#0B2F8A" strokeWidth={2.5} />
      <circle cx="50" cy="50" r="6" fill="#0B2F8A" />
      {spokeAngles.map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2="50"
          y2="7"
          stroke="#0B2F8A"
          strokeWidth={2}
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}
