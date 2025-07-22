import React, { useState, useRef, useEffect } from "react";
import point from "../../../assets/point.mp4";
import range from "../../../assets/range.mp4";
import "./VideoToggleEventMarking.css";

const VideoToggleEventMarking = () => {
  const [activeVideo, setActiveVideo] = useState("range"); // Changed to "range" as default
  const pointVideoRef = useRef(null);
  const rangeVideoRef = useRef(null);

  // Handle video switching with seamless transition
  const handleVideoSwitch = (videoType) => {
    if (videoType === activeVideo) return;

    setActiveVideo(videoType);

    // Ensure the new video starts playing immediately
    setTimeout(() => {
      if (videoType === "point" && pointVideoRef.current) {
        pointVideoRef.current.currentTime = 0;
        pointVideoRef.current.play();
      } else if (videoType === "range" && rangeVideoRef.current) {
        rangeVideoRef.current.currentTime = 0;
        rangeVideoRef.current.play();
      }
    }, 50);
  };

  // Ensure videos start playing when component mounts - now starts with range video
  useEffect(() => {
    if (rangeVideoRef.current) {
      rangeVideoRef.current.play();
    }
  }, []);

  return (
    <div className="video-toggle-marking">
      <div className="video-header">
        <div className="video-title">Event Marking</div>
        <div className="video-controls">
          <button
            className={`tool-btn ${activeVideo === "point" ? "active" : ""}`}
            onClick={() => handleVideoSwitch("point")}
          >
            Point
          </button>
          <button
            className={`tool-btn ${activeVideo === "range" ? "active" : ""}`}
            onClick={() => handleVideoSwitch("range")}
          >
            Range
          </button>
        </div>
      </div>

      <div className="video-container">
        <video
          ref={pointVideoRef}
          className={`demo-video ${
            activeVideo === "point" ? "active" : "hidden"
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={point} type="video/mp4" />
          <source src={point} type="video/webm" />
          Your browser does not support video playback.
        </video>

        <video
          ref={rangeVideoRef}
          className={`demo-video ${
            activeVideo === "range" ? "active" : "hidden"
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={range} type="video/mp4" />
          <source src={range} type="video/webm" />
          Your browser does not support video playback.
        </video>

        {/* Loading overlay */}
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading demo...</div>
        </div>
      </div>

      <div className="video-description">
        <div className="description-item">
          <span className="description-mode">
            {activeVideo === "point" ? "Point Mode:" : "Range Mode:"}
          </span>
          <span className="description-text">
            {activeVideo === "point"
              ? "Precise single-point event marking"
              : "Click and drag range selection"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoToggleEventMarking;
