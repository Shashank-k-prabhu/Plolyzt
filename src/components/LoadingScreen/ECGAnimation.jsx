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

  // Responsive ECG path and viewBox
  const isMobile = window.innerWidth <= 768;

  const viewBox = isMobile ? "0 0 500 200" : "0 0 600 200";
  const pathD = isMobile
    ? "M0,100 L206,100 L218,100 L224,85 L233,100 L245,100 L253,120 L268,30 L280,150 L295,100 L308,100 L317,110 L327,100 L340,100 L456,100 L530,100"
    : "M0,100 L230,100 L245,100 L250,85 L260,100 L275,100 L285,120 L300,30 L315,150 L330,100 L345,100 L350,110 L360,100 L375,100 L480,100 L600,100";

  return (
    <div className="ecg-container">
      <svg
        className="ecg-svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        <path className={`ecg-path ${isActive ? "animate" : ""}`} d={pathD} />
      </svg>
    </div>
  );
};

export default ECGAnimation;
