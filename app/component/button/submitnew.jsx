import "./style.css";

const sequelFontFamily = '"Sequel Sans", sans-serif';

export default function SubmitButton() {
  return (
    <button
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
      }}
    >
      <span className="btn-text" style={{ position: "relative", zIndex: 2 }}>
        SUBMIT
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
