import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./Flow.module.css";
import marking from "../../assets/videos/Event_marking.mp4";
import uploadSync from "../../assets/videos/Upload.mp4";
import exportData from "../../assets/videos/export.mp4";
import review from "../../assets/videos/Review.mp4";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Flow = () => {
  const containerRef = useRef();
  const trackRef = useRef();
  const [activeCard, setActiveCard] = useState(0);

  const steps = [
    {
      id: "upload-sync",
      video: uploadSync,
      headline: "Upload & Sync",
      description:
        "Seamlessly upload your data and sync across all your devices in real-time. Get started in seconds with our intuitive interface.",
      step: "Step 01",
    },
    {
      id: "mark",
      video: marking,
      headline: "Mark & Annotate",
      description:
        "Highlight important insights and add annotations to collaborate effectively with your team members.",
      step: "Step 02",
    },
    {
      id: "review",
      video: review,
      headline: "Review & Collaborate",
      description:
        "Share your work with team members and gather feedback in one place. Real-time collaboration made simple.",
      step: "Step 03",
    },
    {
      id: "export",
      video: exportData,
      headline: "Export & Share",
      description:
        "Export your visualizations in multiple formats and share with stakeholders. Perfect for presentations.",
      step: "Step 04",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // FIXED: Better initialization with proper timing
    const initScrollTrigger = () => {
      console.log("Initializing ScrollTrigger for Flow component");

      // EXPLAINED: Calculate horizontal scroll distance
      // Each card is 100vw wide, so total distance = (cards - 1) * viewport width
      const totalCards = steps.length;
      const horizontalDistance = window.innerWidth * (totalCards - 1);

      // FIXED: Create horizontal scroll animation
      const horizontalTween = gsap.to(track, {
        x: -horizontalDistance,
        ease: "none",
        duration: 1,
      });

      // FIXED: ScrollTrigger with adjusted start point for new layout
      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        pin: true,
        // EXPLAINED: Start when the sticky container comes into view
        // This accounts for the header space we added
        start: "top top",
        // EXPLAINED: Scroll distance for smooth horizontal animation
        // 3x viewport height gives comfortable scroll speed
        end: `+=${window.innerHeight}`,
        scrub: 1, // Smooth scrubbing
        animation: horizontalTween,
        invalidateOnRefresh: true,

        // OPTIONAL: Enable for debugging (remove in production)
        // markers: true,
        // id: "flow-horizontal",

        onUpdate: (self) => {
          // EXPLAINED: Track scroll progress and update active card
          const progress = self.progress;
          const cardIndex = Math.round(progress * (steps.length - 1));

          if (cardIndex !== activeCard) {
            setActiveCard(cardIndex);
          }
        },

        onRefresh: () => {
          console.log("ScrollTrigger refreshed for Flow");
          // FIXED: Recalculate distance on window resize
          const newDistance = window.innerWidth * (totalCards - 1);
          gsap.set(horizontalTween, { x: -newDistance });
        },
      });

      return scrollTrigger;
    };

    // FIXED: Proper initialization timing
    let scrollTrigger;
    const timer = setTimeout(() => {
      scrollTrigger = initScrollTrigger();
    }, 500); // Slightly longer delay for better reliability

    // EXPLAINED: Debounced resize handler to prevent performance issues
    const handleResize = () => {
      clearTimeout(window.flowResizeTimeout);
      window.flowResizeTimeout = setTimeout(() => {
        console.log("Refreshing ScrollTrigger on resize");
        ScrollTrigger.refresh();
      }, 200); // 200ms debounce
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP: Essential for preventing memory leaks
    return () => {
      clearTimeout(timer);
      clearTimeout(window.flowResizeTimeout);
      window.removeEventListener("resize", handleResize);

      // EXPLAINED: Clean up ScrollTrigger instances
      if (scrollTrigger) {
        scrollTrigger.kill();
      }

      // Clean up any orphaned triggers for this container
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []); // Empty dependency array prevents re-initialization

  return (
    <div className={styles.flowContainer} ref={containerRef}>
      {/* FIXED: Header with proper spacing */}
      <div className={styles.flowHeader}>
        <h2 className={styles.flowTitle}>How It Works</h2>
        <p className={styles.flowSubtitle}>
          Powerful tools designed for modern data analysis and visualization.
          Follow these simple steps to transform your data journey.
        </p>
      </div>

      {/* FIXED: Sticky Container positioned below header */}
      <div className={styles.stickyContainer}>
        <div className={styles.horizontalTrack} ref={trackRef}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.flowCard}>
              <div className={styles.cardInner}>
                {/* FIXED: Video Section with proper aspect ratio handling */}
                <div className={styles.cardVideoSection}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.cardVideo}
                    // ADDED: Ensure video loads properly
                    preload="metadata"
                  >
                    <source src={step.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* FIXED: Video Overlay with adjusted sizing */}
                  <div className={styles.videoOverlay}>
                    <div className={styles.stepNumber}>{step.step}</div>
                    <h3 className={styles.videoTitle}>{step.headline}</h3>
                  </div>
                </div>

                {/* FIXED: Content Section with adjusted padding */}
                <div className={styles.cardContentSection}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardHeadline}>{step.headline}</h3>
                    <p className={styles.cardDescription}>{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIXED: Progress Indicator with proper z-index */}
      <div className={styles.progressIndicator}>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressDot} ${
              activeCard === index ? styles.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Flow;
