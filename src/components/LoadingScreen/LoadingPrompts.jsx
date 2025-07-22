import React from "react";
import "./LoadingPrompts.css"; // Ensure you have the necessary styles
const LoadingPrompts = ({ isActive }) => {
  const prompts = [
    "Loading dataset...",
    "Optimizing data...",
    "Analyzing patterns...",
    "Plotting visualization...",
  ];

  return (
    <div className="loading-prompts">
      {prompts.map((prompt, index) => (
        <div
          key={index}
          className={`prompt ${isActive ? "animate" : ""}`}
          style={{
            animationDelay: `${0.5 + index * 0.8}s`,
          }}
        >
          {prompt}
        </div>
      ))}
    </div>
  );
};

export default LoadingPrompts;
