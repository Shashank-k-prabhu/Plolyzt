import React from "react";
import "./HeroSection.css";
import tablet1080 from "../../assets/tablet1080.png";
import heroplotting from "../../assets/heroplotting.png";
import tabletmobile from "../../assets/tabletmobile.png";

const HeroSection = ({
  isVisible,
  smoother,
  setActiveLink,
  setIsMobileMenuOpen,
}) => {
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);

    // GSAP smooth scrolling
    if (smoother) {
      const targetId = link.toLowerCase().replace(/\s+/g, "-");
      console.log(targetId); // Convert "About Us" to "about-us"
      smoother.scrollTo(`#${targetId}`, true, "top top");
    }
  };
  return (
    <div className={`hero-section ${isVisible ? "show" : ""}`}>
      {/* Base Grid Background - Dynamic, stays in JSX */}
      <div
        className="grid-background"
        // style={{
        //   backgroundImage: `
        //     linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
        //     linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)
        //   `,
        //   backgroundSize: "100px 100px",
        // }}
      />

      {/* Gradient Overlay - Dynamic, stays in JSX */}
      <div
        className="gradient-overlay"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 40%, 
              transparent 0%, 
              transparent 30%, 
              rgba(0,0,0,0.4) 60%, 
              rgba(0,0,0,0.8) 100%
            )
          `,
        }}
      />

      {/* Content - Styles moved to CSS */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="mobile-break">
              Visualize,
              <br />
              Annotate,
              <br />
              Collaborate
            </span>
            <span className="desktop-break">
              Visualize,
              <br />
              Annotate, Collaborate
            </span>
          </h1>
          <p className="hero-description">
            Turn time-series data into insights with our powerful event marking
            and visualization tool.
          </p>
          <div className="hero-buttons">
            <button
              className="cta-primary"
              onClick={() => handleLinkClick("Features")}
            >
              Get Started
            </button>
            <button
              className="cta-secondary"
              onClick={() => handleLinkClick("Flow")}
            >
              View Demo
            </button>
          </div>
        </div>

        <div className="hero-images">
          <img src={tablet1080} alt="Tablet 1080" className="hero-image" />
          <img
            src={heroplotting}
            alt="Hero Plotting"
            className="hero-overlapping"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
