import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./UseCase.css";
import ecg from "../../assets/ecgimg.png";
import iot from "../../assets/iotanalysis.png";
import research from "../../assets/research.png";
import quality from "../../assets/quality_control.png";
// 🔧 FIX 1: Correct import
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

const UseCases = ({ setActiveLink }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 🔧 FIX 2: Remove unnecessary .get() call
  useEffect(() => {
    // If you want to log the value, do it inside a motion value callback
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      console.log("Scroll Y Progress:", latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    console.log("Use Cases section is in view:", inView);
    if (inView) {
      console.log("Use Cases section is in view");
      setActiveLink("Use Cases");
    }
  }, [inView, setActiveLink]);

  const useCases = [
    {
      id: "medical",
      title: "Medical ECG Review",
      subtitle: "Healthcare Excellence",
      description:
        "Advanced ECG analysis and cardiac monitoring with real-time pattern recognition. Healthcare professionals can analyze heart rhythms, detect arrhythmias, and track patient progress with precision.",
      features: [
        "Real-time ECG analysis",
        "Arrhythmia detection",
        "Patient progress tracking",
        "Clinical reporting",
      ],
      direction: "left",
      color: "#ff6b6b",
      icon: "🏥",
      image: ecg,
      imageAlt: "Medical ECG Review Dashboard",
    },
    {
      id: "iot",
      title: "IoT Sensor Data Analysis",
      subtitle: "Smart Connectivity",
      description:
        "Monitor and analyze data from thousands of IoT sensors in real-time. Track environmental conditions, equipment performance, and system health across distributed networks.",
      features: [
        "Multi-sensor monitoring",
        "Real-time alerts",
        "Predictive analytics",
        "Network optimization",
      ],
      direction: "right",
      color: "#4ecdc4",
      icon: "🌐",
      image: iot,
      imageAlt: "IoT Sensor Network Dashboard",
    },
    {
      id: "research",
      title: "Scientific Research",
      subtitle: "Data-Driven Discovery",
      description:
        "Accelerate scientific breakthroughs with advanced data visualization and analysis tools. Perfect for laboratory research, experimental data analysis, and research collaboration.",
      features: [
        "Experiment tracking",
        "Statistical analysis",
        "Research collaboration",
        "Publication-ready charts",
      ],
      direction: "left",
      color: "#a8e6cf",
      icon: "🔬",
      image: research,
      imageAlt: "Scientific Research Analysis",
    },
    {
      id: "manufacturing",
      title: "Quality Control in Manufacturing",
      subtitle: "Operational Excellence",
      description:
        "Ensure product quality with comprehensive monitoring and analysis of manufacturing processes. Track defect rates, optimize production lines, and maintain quality standards.",
      features: [
        "Quality metrics tracking",
        "Defect pattern analysis",
        "Process optimization",
        "Compliance reporting",
      ],
      direction: "right",
      color: "#ffd93d",
      icon: "⚙️",
      image: quality,
      imageAlt: "Manufacturing Quality Control",
    },
  ];

  return (
    <section ref={containerRef}>
      <section className="use-cases-section" ref={ref}>
        <div className="use-cases-container">
          <div className="use-cases-header">
            <h2 className="use-cases-title">Use Cases</h2>
            <p className="use-cases-subtitle">
              Discover how Plotlyzt transforms data visualization across
              industries
            </p>
          </div>

          <div className="use-cases-list">
            {useCases.map((useCase, index) => {
              // 🎯 ANIMATION LOGIC
              const totalItems = useCases.length;
              const itemStart = index / totalItems;
              const itemEnd = (index + 1) / totalItems;

              // Starting positions based on direction
              const startX = useCase.direction === "left" ? 0 : 0;
              const endX = 0;

              const rawX = useTransform(
                scrollYProgress,
                [itemStart, itemEnd],
                [startX, endX]
              );

              // 🎯 ADD EASING: Wrap with useSpring for smooth animation
              const x = useSpring(rawX, {
                stiffness: 100, // How "bouncy" (higher = snappier)
                damping: 30, // How much "friction" (higher = less bounce)
                mass: 0.5, // How "heavy" (lower = more responsive)
              });

              // Also add easing to opacity
              const rawOpacity = useTransform(
                scrollYProgress,
                [itemStart, itemStart + 0.1],
                [0, 1]
              );

              const opacity = useSpring(rawOpacity, {
                stiffness: 150,
                damping: 25,
              });

              return (
                <motion.div
                  key={useCase.id}
                  className={`use-case-item ${useCase.direction}`}
                  style={{
                    x, // 🔧 FIX 4: Use single x value
                    opacity,
                  }}
                >
                  <div className="use-case-content">
                    <div className="use-case-text">
                      <div className="use-case-badge">
                        <span className="badge-icon">{useCase.icon}</span>
                        <span className="badge-text">{useCase.subtitle}</span>
                      </div>
                      <h3 className="use-case-heading">{useCase.title}</h3>
                      <p className="use-case-description">
                        {useCase.description}
                      </p>
                      <ul className="use-case-features">
                        {useCase.features.map((feature, idx) => (
                          <li key={idx} className="feature-item">
                            <span className="feature-checkmark">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="use-case-cta">
                        Explore {useCase.title}
                        <span className="cta-arrow">→</span>
                      </button>
                    </div>
                    <div className="use-case-visual">
                      <div className="image-container">
                        <img
                          src={useCase.image}
                          alt={useCase.imageAlt}
                          className="use-case-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                          }}
                        />
                        <div className="image-overlay">
                          <div className="overlay-icon">{useCase.icon}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default UseCases;
