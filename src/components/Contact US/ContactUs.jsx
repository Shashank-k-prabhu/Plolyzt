import React, { useState } from "react";
import "./ContactUs.css"; // Assuming you have a CSS file for styles
const DemoRequestContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demo request submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="demo-contact-section">
      <div className="demo-contact-container">
        {/* Left Side - Content */}
        <div className="demo-content">
          <h2 className="demo-title">Request a Demo</h2>
          <p className="demo-subtitle">
            See Plotlyzt in action with personalized demo tailored to your needs
          </p>

          <div className="demo-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Quick 15-minute demo</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Customized for your use case</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">
                Live data visualization examples
              </span>
            </div>
          </div>

          <div className="contact-info">
            <p className="contact-email">hello@plotlyzt.com</p>
            <p className="contact-note">Questions? Drop us a line anytime</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="demo-form-container">
          <div className="demo-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full name*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your project*</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="What kind of data do you work with? What are your visualization needs?"
              />
            </div>

            <button
              type="button"
              className="demo-submit-btn"
              onClick={handleSubmit}
            >
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoRequestContact;
