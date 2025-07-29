import React, { useState, useEffect } from "react";
import "./Features.css"; // Make sure updated CSS is applied
import InteractiveChart from "./components/InteractiveCharts";
import SignalProcessingUpload from "./components/SignalProcessingUpload";
import VideoToggleEventMarking from "./components/VideoToggleEventMarking";
import { useInView } from "react-intersection-observer";

const Features = ({ setActiveLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger when 30% visible
    triggerOnce: false, // Change to true if you want to trigger only once
  });

  useEffect(() => {
    if (inView) {
      console.log("Features section is in view");
      setActiveLink("Features"); // Call your navbar function here
    }
  }, [inView, setActiveLink]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("features-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Interactive Visualizations",
      description:
        "Create stunning, real-time charts and graphs that respond to your data changes instantly.",
      component: <InteractiveChart />,
      delay: "0s",
    },
    {
      title: "Upload & Sync Automation",
      description:
        "Seamlessly upload datasets and automatically sync metadata with intelligent processing.",
      component: <SignalProcessingUpload />,
      delay: "0.2s",
    },
    {
      title: "Flexible Event Marking",
      description:
        "Mark important events as points or ranges with precision timeline controls.",
      component: <VideoToggleEventMarking />,
      delay: "0.4s",
    },
    {
      title: "Multi-Role Review Process",
      description:
        "Collaborative workflow with role-based permissions and approval systems.",
      component: <ReviewProcess />,
      delay: "0.6s",
    },
    {
      title: "JSON Export Integration",
      description:
        "Export your data and insights in standard JSON format for research and integration.",
      component: <JsonExport />,
      delay: "0.8s",
    },
  ];

  const downloadJson = async () => {
    const s3Url = import.meta.env.VITE_S3_LINK; // Ensure this is set in your .env file

    try {
      // setLoading(true);
      // setMessage("Downloading from S3...");

      // Fetch directly from S3
      const response = await fetch(s3Url);

      if (!response.ok) {
        throw new Error(`S3 request failed: ${response.status}`);
      }

      // Get as blob (more memory efficient for large files)
      const blob = await response.blob();

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart_data.json"; // You can customize this name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // setMessage("Downloaded successfully!");
    } catch (error) {
      console.error("S3 Download failed:", error);
      // setMessage(`Download failed: ${error.message}`);
    } finally {
      // setLoading(false);
    }
  };

  // Clipboard copy function
  const copyToClipboard = async (s3Url) => {
    try {
      // setLoading(true);
      // setMessage("Loading data...");

      const response = await fetch(s3Url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      // For clipboard, we need the text content
      const text = await response.text();

      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard!");
        // setMessage("Copied to clipboard!");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // Mock components (placeholders for your actual implementations)
  function ReviewProcess() {
    return (
      <div className="mock-review">
        <div className="review-workflow">
          <div className="workflow-step completed">
            <div className="step-avatar">
              <div
                className="avatar-img"
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #ffa726)",
                }}
              >
                C
              </div>
            </div>
            <div className="step-info">
              <div className="step-role"> Clinician</div>
              <div className="step-status">Upload ✓</div>
            </div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step active">
            <div className="step-avatar">
              <div
                className="avatar-img"
                style={{
                  background: "linear-gradient(45deg, #4ecdc4, #44a08d)",
                }}
              >
                T
              </div>
            </div>
            <div className="step-info">
              <div className="step-role">Technician</div>
              <div className="step-status">In Review</div>
            </div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step pending">
            <div className="step-avatar">
              <div
                className="avatar-img"
                style={{
                  background: "linear-gradient(45deg, #a8edea, #fed6e3)",
                }}
              >
                QC
              </div>
            </div>
            <div className="step-info">
              <div className="step-role">Quality Control </div>
              <div className="step-status">Pending</div>
            </div>
          </div>
        </div>
        <div className="review-comments">
          <div className="comment">
            <div className="comment-text">
              "Data looks good, minor adjustments needed"
            </div>
            <div className="comment-author">- Clinician</div>
          </div>
        </div>
      </div>
    );
  }

  function JsonExport() {
    return (
      <div className="mock-json">
        <div className="json-header">
          <div className="json-title">Export Ready</div>
          <div className="json-actions">
            <button className="export-btn" onClick={() => downloadJson()}>
              Download
            </button>
            {/* <button className="export-btn" onClick={() => copyToClipboard()}>
              Copy
            </button> */}
          </div>
        </div>
        <div className="json-content">
          <div className="json-code">
            <div className="code-line">
              <span className="json-key">"metadata"</span>: {"{"}
            </div>
            <div className="code-line indent">
              <span className="json-key">"events"</span>: [
            </div>
            <div className="code-line indent2">
              <span className="json-string">"launch_date"</span>,
            </div>
            <div className="code-line indent2">
              <span className="json-string">"beta_period"</span>
            </div>
            <div className="code-line indent">],</div>
            <div className="code-line indent">
              <span className="json-key">"insights"</span>:{" "}
              <span className="json-value">true</span>
            </div>
            <div className="code-line">{"}"}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="features-section" className="features-section" ref={ref}>
      {/* Gradient background layers */}
      <div className="gradientBackground">
        <div className="gradientLayer1"></div>
        <div className="gradientLayer2"></div>
        <div className="gradientLayer3"></div>
      </div>

      {/* Floating particles */}
      <div className="particlesContainer">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main container with content */}
      <div className="features-container">
        <div className={`features-header ${isVisible ? "header-visible" : ""}`}>
          <h2 className="features-title">Why Choose Plotlyzt</h2>
          <p className="features-subtitle">
            Powerful tools designed for modern data analysis and visualization
          </p>
        </div>

        <div className={`features-grid ${isVisible ? "grid-visible" : ""}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card card-${index + 1}`}
              style={{
                animationDelay: feature.delay,
                ...(feature.title === "Interactive Visualizations" && {
                  maxHeight: "500px",
                }),
              }}
            >
              <div className="card-visual">{feature.component}</div>
              <div className="card-content">
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
