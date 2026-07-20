import "./style.css";

const sequelFontFamily = '"Sequel Sans", sans-serif';

export default function SubmitButton({ label = "SUBMIT", disabled = false, ...props }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="submit-btn mt-17"
      style={{
        fontFamily: sequelFontFamily,
        fontWeight: 415,
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "1.2px",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        background: "#E2E2E2",
        padding: "20px 45px",
        border: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      {...props}
    >
      <span className="btn-text" style={{ position: "relative", zIndex: 2 }}>
        {label}
      </span>
      <span
        className="btn-icon"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
          color: "inherit",
        }}
      >
        <i className="ri-arrow-right-line" />
      </span>
    </button>
  );
}
