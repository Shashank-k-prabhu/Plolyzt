import React, { useEffect } from "react";
import "./ECGAnimation.css";

const ECGAnimation = ({ isActive, onAnimationComplete }) => {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onAnimationComplete]);

  return (
    <div className="ecg-container">
      {/* ECG Animation starts from leftmost edge (x=0) */}
      <svg
        className="ecg-svg"
        viewBox="0 0 600 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className={`ecg-path ${isActive ? "animate" : ""}`}
          d="M0,100 L230,100 L245,100 L250,85 L260,100 L275,100 L285,120 L300,30 L315,150 L330,100 L345,100 L350,110 L360,100 L375,100 L480,100 L600,100"
        />
      </svg>
    </div>
  );
};

export default ECGAnimation;
