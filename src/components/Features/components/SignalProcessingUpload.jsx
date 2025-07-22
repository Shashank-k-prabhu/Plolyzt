import React, { useState, useEffect } from "react";
import "./SignalProcessingUpload.css";

const SignalProcessingUpload = () => {
  const [processingStep, setProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate processing steps
  useEffect(() => {
    const interval = setInterval(() => {
      if (isProcessing) {
        setProcessingStep((prev) => (prev + 1) % 4);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // Start processing simulation
  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingStep(0);

    setTimeout(() => {
      setIsProcessing(false);
      setProcessingStep(0);
    }, 8000);
  };

  // Generate realistic ECG waveform paths
  const generateECGPath = (amplitude, frequency, phase = 0) => {
    const points = [];
    const width = 200;
    const height = 40;

    for (let x = 0; x <= width; x += 2) {
      const normalizedX = (x / width) * 4 * Math.PI;
      let y = height / 2;

      // Create ECG-like pattern with different frequencies and amplitudes
      if (normalizedX % ((2 * Math.PI) / frequency) < 0.3) {
        y += Math.sin(normalizedX * frequency + phase) * amplitude * 15;
        // Add QRS complex (sharp spikes)
        if ((normalizedX * frequency) % (2 * Math.PI) < 0.2) {
          y += Math.sin(normalizedX * frequency * 10 + phase) * amplitude * 8;
        }
      } else {
        // P and T waves (smaller undulations)
        y += Math.sin(normalizedX * frequency + phase) * amplitude * 3;
      }

      points.push(`${x},${Math.max(5, Math.min(35, y))}`);
    }

    return `M ${points.join(" L ")}`;
  };

  const SignalVisualization = () => {
    const getStepContent = () => {
      switch (processingStep) {
        case 0:
          return (
            <div className="signal-step">
              <div className="step-title">Input Signals</div>
              <div className="signals-container">
                <div className="signal-item">
                  <div className="signal-label">
                    ECG A (250Hz, High Amplitude)
                  </div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(1.5, 2)}
                      stroke="#ff6b6b"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path"
                    />
                  </svg>
                  <div className="signal-specs">250Hz • 2.5mV</div>
                </div>
                <div className="signal-item">
                  <div className="signal-label">
                    ECG B (500Hz, Low Amplitude)
                  </div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(0.8, 3.5)}
                      stroke="#4ecdc4"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path"
                    />
                  </svg>
                  <div className="signal-specs">500Hz • 1.2mV</div>
                </div>
              </div>
            </div>
          );

        case 1:
          return (
            <div className="signal-step">
              <div className="step-title">Resampling to Common Rate</div>
              <div className="processing-indicator">
                <div className="process-bar">
                  <div className="process-fill"></div>
                </div>
                <div className="process-text">Normalizing to 500Hz...</div>
              </div>
              <div className="signals-container">
                <div className="signal-item processing">
                  <div className="signal-label">ECG A → 500Hz</div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(1.5, 2.8)}
                      stroke="#ff6b6b"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path morphing"
                    />
                  </svg>
                </div>
                <div className="signal-item">
                  <div className="signal-label">ECG B (unchanged)</div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(0.8, 3.5)}
                      stroke="#4ecdc4"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );

        case 2:
          return (
            <div className="signal-step">
              <div className="step-title">Amplitude Normalization</div>
              <div className="processing-indicator">
                <div className="process-bar">
                  <div className="process-fill"></div>
                </div>
                <div className="process-text">
                  Scaling to common amplitude...
                </div>
              </div>
              <div className="signals-container">
                <div className="signal-item">
                  <div className="signal-label">ECG A (scaled)</div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(1.0, 2.8)}
                      stroke="#ff6b6b"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path morphing"
                    />
                  </svg>
                </div>
                <div className="signal-item processing">
                  <div className="signal-label">ECG B (scaled)</div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(1.0, 3.5)}
                      stroke="#4ecdc4"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path morphing"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="signal-step">
              <div className="step-title">Normalised Signal Output</div>
              <div className="signals-container centered">
                <div className="signal-item merged">
                  <div className="signal-label">
                    Normalised ECG (500Hz, Normalized)
                  </div>
                  <svg width="200" height="40" className="signal-svg">
                    <path
                      d={generateECGPath(1.0, 3)}
                      stroke="#00ff41"
                      strokeWidth="2"
                      fill="none"
                      className="signal-path glow"
                    />
                  </svg>
                  <div className="signal-specs success">
                    500Hz • 1.8mV • Ready for Analysis
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return <div className="signal-visualization">{getStepContent()}</div>;
  };

  return (
    <div className="signal-processing-upload">
      <div className="upload-area" onClick={startProcessing}>
        {!isProcessing ? (
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
        ) : null}
        <div className="upload-text">
          {isProcessing ? "Processing signals..." : "Drop ECG files here"}
        </div>
        <div className="upload-subtitle">
          Auto-normalizes different sampling rates & amplitudes
        </div>
      </div>

      {(isProcessing || processingStep > 0) && <SignalVisualization />}

      <div className="file-list">
        <div
          className={`file-item ${isProcessing ? "processing" : "completed"}`}
        >
          <div className="file-info">
            <div className="file-name">ecg_patient_a.csv</div>
            <div className="file-size">1.2 MB • 250Hz</div>
          </div>
          <div className={isProcessing ? "progress-bar" : "sync-icon"}>
            {isProcessing ? <div className="progress-fill"></div> : "✓"}
          </div>
        </div>
        <div
          className={`file-item ${isProcessing ? "processing" : "completed"}`}
        >
          <div className="file-info">
            <div className="file-name">ecg_patient_b.csv</div>
            <div className="file-size">2.8 MB • 500Hz</div>
          </div>
          <div className={isProcessing ? "progress-bar" : "sync-icon"}>
            {isProcessing ? <div className="progress-fill"></div> : "✓"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalProcessingUpload;
