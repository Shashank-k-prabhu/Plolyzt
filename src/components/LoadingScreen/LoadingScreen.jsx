import React, { useEffect, useState } from "react";
import ECGAnimation from "./ECGAnimation";
import LoadingPrompts from "./LoadingPrompts";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [ecgComplete, setEcgComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (ecgComplete) {
      // Wait for prompts to finish, then trigger completion
      const completeTimer = setTimeout(() => {
        setIsVisible(false);
        // Trigger parent callback after fade out
        setTimeout(onLoadingComplete, 1000);
      }, 200);

      return () => clearTimeout(completeTimer);
    }
  }, [ecgComplete, onLoadingComplete]);

  return (
    <div className={`loading-screen ${!isVisible ? "fade-out" : ""}`}>
      {/* ECG Animation - positioned over medical background */}
      <ECGAnimation
        isActive={true}
        onAnimationComplete={() => setEcgComplete(true)}
      />

      {/* Loading Prompts - overlay on top */}
      <LoadingPrompts isActive={true} />
    </div>
  );
};

export default LoadingScreen;
