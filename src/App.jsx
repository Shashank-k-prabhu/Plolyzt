import HeroSection from "./components/HeroSection/HeroSection";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import React, { useState, useEffect } from "react";
import "./styles/globals.css";
import DemoRequestContact from "./components/Contact US/ContactUs";
import Navbar from "./components/Navbar/Navbar";
import Features from "./components/Features/Features";

// GSAP imports - order matters!
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Flow from "./components/Flow/Flow";
import AboutPlotlyzt from "./components/About/AboutPlotlyzt";

// Register plugins BEFORE using them
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [smoother, setSmoother] = useState(null);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowHero(true);
    }, 200);
  };

  const handleSkipLoading = () => {
    if (isLoading) {
      handleLoadingComplete();
    }
  };

  // ScrollSmoother initialization
  useEffect(() => {
    let smootherInstance;
    if (showHero) {
      const timer = setTimeout(() => {
        smootherInstance = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.5,
          normalizeScroll: true,
        });
        setSmoother(smootherInstance);
      }, 100);
      return () => {
        clearTimeout(timer);
        if (smootherInstance) smootherInstance.kill();
      };
    }
  }, [showHero]); // Dependency: re-run when showHero changes

  return (
    <div className="app" onClick={handleSkipLoading}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <Navbar
          isVisible={showHero}
          smoother={smoother}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
      {!isLoading && (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div id="home">
              <HeroSection
                isVisible={showHero}
                smoother={smoother}
                setActiveLink={setActiveLink}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
            {/* <div
              style={{
                height: "120px",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(60,100,140,1) 100%)",
                width: "100%",
              }}
            /> */}
            <div id="features">
              <Features />
            </div>
            <div id="flow">
              <Flow />
            </div>
            <div id="about-us">
              <AboutPlotlyzt />
            </div>
            <div id="contact-us">
              <DemoRequestContact />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
