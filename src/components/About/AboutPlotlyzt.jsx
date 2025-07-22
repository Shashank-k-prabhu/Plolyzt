import React, { useEffect, useRef, useState } from "react";
import { Heart, Activity, TrendingUp, Zap } from "lucide-react";
import styles from "./AboutPlotlyzt.module.css";

const AboutPlotlyzt = () => {
  const waveformRef = useRef(null);
  const sectionRef = useRef(null); // NEW: Reference to main section
  const [isVisible, setIsVisible] = useState(false);
  const [currentWaveform, setCurrentWaveform] = useState("normal");

  useEffect(() => {
    // CONCEPT: Enhanced IntersectionObserver for better mobile support
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        // FIX: Much lower threshold for mobile screens
        threshold: window.innerWidth <= 768 ? 0.1 : 0.3, // 10% on mobile, 30% on desktop
        // FIX: Add root margin to trigger earlier on mobile
        rootMargin: window.innerWidth <= 768 ? "50px 0px" : "0px 0px", // Trigger 50px before on mobile
      }
    );

    // IMPROVED: Observe both the main section and waveform ref
    const targetElement = sectionRef.current || waveformRef.current;

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // FALLBACK: Timer-based loading for mobile devices that may have scroll issues
    const isMobile = window.innerWidth <= 768;
    let fallbackTimer;

    if (isMobile && !isVisible) {
      // FIX: If not visible after 3 seconds on mobile, force visibility
      fallbackTimer = setTimeout(() => {
        console.log("Mobile fallback: Force loading AboutPlotlyzt");
        setIsVisible(true);
      }, 3000);
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    // ENHANCED: Better waveform animation management
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentWaveform((prev) => {
          const patterns = ["normal", "arrhythmic", "medicated", "normal"];
          const currentIndex = patterns.indexOf(prev);
          return patterns[(currentIndex + 1) % patterns.length];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // PERFORMANCE: Memoize waveform paths to prevent recalculation
  const waveformPaths = React.useMemo(
    () => ({
      normal:
        "M0,60 Q20,40 40,60 T80,60 T120,60 T160,60 T200,60 T240,60 T280,60 T320,60 T360,60 T400,60",
      arrhythmic:
        "M0,60 Q15,20 30,60 Q45,80 60,60 Q75,30 90,60 Q105,70 120,60 T160,60 T200,60 T240,60 T280,60 T320,60 T360,60 T400,60",
      medicated:
        "M0,60 Q25,45 50,60 T100,60 T150,60 T200,60 T250,60 T300,60 T350,60 T400,60",
    }),
    []
  );

  const getWaveformColor = () => {
    switch (currentWaveform) {
      case "normal":
        return "#00ff41";
      case "arrhythmic":
        return "#ff4444";
      case "medicated":
        return "#44aaff";
      default:
        return "#00ff41";
    }
  };

  const getWaveformLabel = () => {
    switch (currentWaveform) {
      case "normal":
        return "Normal Sinus Rhythm";
      case "arrhythmic":
        return "Atrial Fibrillation";
      case "medicated":
        return "Post-Medication";
      default:
        return "Normal Sinus Rhythm";
    }
  };

  return (
    <section
      ref={sectionRef} // NEW: Reference to main section for better observation
      className={styles.plotlyztAboutSection}
    >
      {/* Background Grid */}
      <div className={styles.plotlyztBackgroundGrid}>
        <div className={styles.plotlyztGridPattern} />
      </div>

      <div className={styles.plotlyztAboutContainer}>
        <div className={styles.plotlyztAboutGrid}>
          {/* Content Section */}
          <div
            className={`${styles.plotlyztContentSection} ${
              isVisible ? styles.plotlyztVisible : styles.plotlyztHidden
            }`}
          >
            {/* Header */}
            <div className={styles.plotlyztHeaderSection}>
              <div className={styles.plotlyztHeaderBadge}>
                <Heart className={styles.plotlyztHeaderIcon} />
                <span>About Plotlyzt</span>
              </div>

              <h1 className={styles.plotlyztMainTitle}>
                Where{" "}
                <span className={styles.plotlyztGradientTextGreen}>
                  Plotting
                </span>{" "}
                Meets{" "}
                <span className={styles.plotlyztGradientTextBlue}>
                  Analysis
                </span>
              </h1>
            </div>

            {/* Story */}
            <div className={styles.plotlyztStorySection}>
              <p
                className={`${styles.plotlyztStoryParagraph} ${styles.plotlyztLarge}`}
              >
                In cardiovascular research, every waveform tells a critical
                story. Traditional analysis tools often fall short when
                researchers need to understand how medications, interventions,
                and physiological changes affect cardiac patterns in real-time.
              </p>

              <p className={styles.plotlyztStoryParagraph}>
                <strong className={styles.plotlyztStoryHighlight}>
                  Plotlyzt
                </strong>{" "}
                was born from this exact challenge—combining the precision of
                plotting with the depth of analysis. Our platform transforms
                complex ECG waveforms, heart rate variability, and blood
                pressure data into actionable insights for medical research and
                instrument development.
              </p>

              <p className={styles.plotlyztStoryParagraph}>
                Whether you're studying arrhythmia patterns, evaluating drug
                efficacy, or developing next-generation medical devices,
                Plotlyzt provides the analytical foundation your research
                demands.
              </p>
            </div>

            {/* Key Features */}
            <div className={styles.plotlyztFeaturesGrid}>
              <div className={styles.plotlyztFeatureItem}>
                <Activity className={styles.plotlyztFeatureIcon} />
                <div>
                  <h3 className={styles.plotlyztFeatureTitle}>
                    Waveform Analysis
                  </h3>
                  <p className={styles.plotlyztFeatureDescription}>
                    ECG, heart rate, and BP pattern recognition
                  </p>
                </div>
              </div>

              <div className={styles.plotlyztFeatureItem}>
                <TrendingUp className={styles.plotlyztFeatureIcon} />
                <div>
                  <h3 className={styles.plotlyztFeatureTitle}>
                    Drug Impact Studies
                  </h3>
                  <p className={styles.plotlyztFeatureDescription}>
                    Before/after medication effect analysis
                  </p>
                </div>
              </div>

              <div className={styles.plotlyztFeatureItem}>
                <Zap className={styles.plotlyztFeatureIcon} />
                <div>
                  <h3 className={styles.plotlyztFeatureTitle}>
                    Real-time Processing
                  </h3>
                  <p className={styles.plotlyztFeatureDescription}>
                    Instant analysis for research workflows
                  </p>
                </div>
              </div>

              <div className={styles.plotlyztFeatureItem}>
                <Heart className={styles.plotlyztFeatureIcon} />
                <div>
                  <h3 className={styles.plotlyztFeatureTitle}>
                    Arrhythmia Detection
                  </h3>
                  <p className={styles.plotlyztFeatureDescription}>
                    Advanced pattern recognition algorithms
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div
            ref={waveformRef}
            className={`${styles.plotlyztVisualizationSection} ${
              isVisible ? styles.plotlyztVisible : styles.plotlyztHidden
            }`}
          >
            {/* Main Waveform Display */}
            <div className={styles.plotlyztWaveformDisplay}>
              {/* Header */}
              <div className={styles.plotlyztDisplayHeader}>
                <div>
                  <h3 className={styles.plotlyztDisplayTitle}>
                    Live ECG Analysis
                  </h3>
                  <p className={styles.plotlyztDisplaySubtitle}>
                    Monitoring cardiac rhythm patterns
                  </p>
                </div>
                <div className={styles.plotlyztLiveIndicator}>
                  <div className={styles.plotlyztLiveDot}></div>
                  <span className={styles.plotlyztLiveText}>LIVE</span>
                </div>
              </div>

              {/* Waveform Display */}
              <div className={styles.plotlyztWaveformContainer}>
                <svg
                  className={styles.plotlyztWaveformSvg}
                  viewBox="0 0 400 120"
                  // PERFORMANCE: Reduce animation complexity on mobile
                  style={{
                    willChange: isVisible ? "transform" : "auto",
                  }}
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(0,255,65,0.1)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Waveform */}
                  <path
                    d={waveformPaths[currentWaveform]}
                    fill="none"
                    stroke={getWaveformColor()}
                    strokeWidth="2"
                    className={styles.plotlyztWaveformPath}
                    style={{
                      filter: `drop-shadow(0 0 8px ${getWaveformColor()}40)`,
                      transition: "all 1s ease",
                    }}
                  />

                  {/* Scanning line - MOBILE OPTIMIZED */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="120"
                    stroke={getWaveformColor()}
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0;400,0;0,0"
                      dur={window.innerWidth <= 768 ? "6s" : "4s"} // Slower on mobile for performance
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>
              </div>

              {/* Pattern Label */}
              <div className={styles.plotlyztPatternInfo}>
                <span className={styles.plotlyztPatternLabel}>
                  Current Pattern:
                </span>
                <span
                  className={styles.plotlyztPatternValue}
                  style={{ color: getWaveformColor() }}
                >
                  {getWaveformLabel()}
                </span>
              </div>

              {/* Metrics */}
              <div className={styles.plotlyztMetricsGrid}>
                <div className={styles.plotlyztMetricItem}>
                  <div
                    className={`${styles.plotlyztMetricValue} ${styles.plotlyztPrimary}`}
                  >
                    72
                  </div>
                  <div className={styles.plotlyztMetricLabel}>BPM</div>
                </div>
                <div className={styles.plotlyztMetricItem}>
                  <div
                    className={`${styles.plotlyztMetricValue} ${styles.plotlyztSecondary}`}
                  >
                    120/80
                  </div>
                  <div className={styles.plotlyztMetricLabel}>BP (mmHg)</div>
                </div>
                <div className={styles.plotlyztMetricItem}>
                  <div
                    className={`${styles.plotlyztMetricValue} ${styles.plotlyztPrimary}`}
                  >
                    98%
                  </div>
                  <div className={styles.plotlyztMetricLabel}>SpO2</div>
                </div>
              </div>
            </div>

            {/* Floating Research Notes */}
            <div className={styles.plotlyztResearchNote}>
              <div className={styles.plotlyztResearchNoteBadge}>
                RESEARCH NOTE
              </div>
              <div className={styles.plotlyztResearchNoteText}>
                Pattern analysis showing medication efficacy in real-time
                cardiac monitoring
              </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.plotlyztStatsGrid}>
              <div className={styles.plotlyztStatCard}>
                <div
                  className={`${styles.plotlyztStatValue} ${styles.plotlyztPrimary}`}
                >
                  10k+
                </div>
                <div className={styles.plotlyztStatLabel}>
                  Waveforms Analyzed
                </div>
              </div>
              <div className={styles.plotlyztStatCard}>
                <div
                  className={`${styles.plotlyztStatValue} ${styles.plotlyztSecondary}`}
                >
                  500+
                </div>
                <div className={styles.plotlyztStatLabel}>Research Studies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlotlyzt;
