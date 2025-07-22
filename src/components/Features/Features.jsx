import React, { useState, useEffect } from "react";
import "./Features.css";
import InteractiveChart from "./components/InteractiveCharts";
import SignalProcessingUpload from "./components/SignalProcessingUpload";
import VideoToggleEventMarking from "./components/VideoToggleEventMarking";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const UploadInterface = () => (
    <div className="mock-upload">
      <div className="upload-area">
        <div className="upload-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polyline
              points="7,10 12,15 17,10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="upload-text">Drop files here</div>
      </div>
      <div className="file-list">
        <div className="file-item processing">
          <div className="file-info">
            <div className="file-name">dataset.csv</div>
            <div className="file-size">2.3 MB</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
        <div className="file-item completed">
          <div className="file-info">
            <div className="file-name">metadata.json</div>
            <div className="file-size">156 KB</div>
          </div>
          <div className="sync-icon">✓</div>
        </div>
      </div>
    </div>
  );

  const EventTimeline = () => (
    <div className="mock-timeline">
      <div className="timeline-header">
        <div className="timeline-title">Event Marking</div>
        <div className="timeline-tools">
          <button className="tool-btn active">Point</button>
          <button className="tool-btn">Range</button>
        </div>
      </div>
      <div className="timeline-content">
        <div className="timeline-track">
          <div className="timeline-marker point" style={{ left: "25%" }}>
            <div className="marker-dot"></div>
            <div className="marker-label">Launch</div>
          </div>
          <div
            className="timeline-marker range"
            style={{ left: "45%", width: "30%" }}
          >
            <div className="range-bar"></div>
            <div className="marker-label">Beta Testing</div>
          </div>
          <div className="timeline-marker point" style={{ left: "85%" }}>
            <div className="marker-dot"></div>
            <div className="marker-label">Release</div>
          </div>
        </div>
        <div className="timeline-scale">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
            <div key={i} className="scale-mark">
              {month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ReviewProcess = () => (
    <div className="mock-review">
      <div className="review-workflow">
        <div className="workflow-step completed">
          <div className="step-avatar">
            <div
              className="avatar-img"
              style={{ background: "linear-gradient(45deg, #ff6b6b, #ffa726)" }}
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
              style={{ background: "linear-gradient(45deg, #4ecdc4, #44a08d)" }}
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
              style={{ background: "linear-gradient(45deg, #a8edea, #fed6e3)" }}
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

  const JsonExport = () => (
    <div className="mock-json">
      <div className="json-header">
        <div className="json-title">Export Ready</div>
        <div className="json-actions">
          <button className="export-btn">Download</button>
          <button className="export-btn">Copy</button>
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

  return (
    <section id="features-section" className="features-section">
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
              className={`feature-card card-${index + 1} `}
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
