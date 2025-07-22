import React, { useState, useEffect, useRef } from "react";
import "./InteractiveCharts.css";
import combined from "../../../assets/combinedecgs.png";
import ecg1 from "../../../assets/ecg1.png";
import ecg2 from "../../../assets/ecg2.png";
const InteractiveChart = () => {
  const [image, setImage] = useState(combined);
  const [isLoading, setIsLoading] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Force re-render for animation
  const imageRef = useRef(null);

  // Smooth image transition handler
  const handleImageChange = (newImage) => {
    if (newImage === image) return; // Prevent unnecessary changes

    setIsLoading(true);

    // Add switching animation class
    if (imageRef.current) {
      imageRef.current.classList.add("switching");
    }

    // Simulate slight delay for smooth transition
    setTimeout(() => {
      setImage(newImage);
      setImageKey((prev) => prev + 1); // Force re-render for animation
      setIsLoading(false);

      // Remove switching class after animation
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.classList.remove("switching");
        }
      }, 400);
    }, 200);
  };

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = [combined, ecg1, ecg2];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="mock-chart">
      <div className="chart-header">
        <div className="chart-title">Interactive Charts</div>
        <div className="chart-controls">
          <button
            className={`tool-btn ${image === ecg1 ? "active" : ""}`}
            onClick={() => handleImageChange(ecg1)}
            disabled={isLoading}
          >
            ECG1
          </button>
          <button
            className={`tool-btn ${image === ecg2 ? "active" : ""}`}
            onClick={() => handleImageChange(ecg2)}
            disabled={isLoading}
          >
            ECG2
          </button>
          <button
            className={`tool-btn ${image === combined ? "active" : ""}`}
            onClick={() => handleImageChange(combined)}
            disabled={isLoading}
          >
            Dual
          </button>
        </div>
      </div>
      <div className={`chart-content ${isLoading ? "loading" : ""}`}>
        <img
          ref={imageRef}
          key={imageKey} // Forces re-render for animation
          src={image}
          alt="Interactive Chart"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default InteractiveChart;
