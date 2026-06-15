// import React from 'react';

// const Submit = () => {
//   return (
//     <div>Submit</div>
//   );
// };

// export default Submit;
"use client";
import './style.css';

export default function AnimatedButton({
  text = "Button",
  onClick,
  className = "",
}) {
  return (
    <button
      className={`animated-btn ${className}`}
      data-text={text}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}