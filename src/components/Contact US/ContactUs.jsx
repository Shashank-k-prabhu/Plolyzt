import React, { useEffect, useState } from "react";
import "./ContactUs.css"; // Updated premium glassmorphism CSS
import { useInView } from "react-intersection-observer";

const DemoRequestContact = ({ setActiveLink }) => {
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

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      console.log("Contact Us section is in view");
      setActiveLink("Contact Us");
    }
  }, [inView, setActiveLink]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demo request submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="demo-contact-section" ref={ref}>
      <div className="demo-contact-container">
        {/* Left Side - Content, Features, and Contact Info */}
        <div className="demo-content">
          {/* Header Section */}
          <div className="demo-header">
            <h2 className="demo-title">Let's Connect</h2>
            <p className="demo-subtitle">
              Ready to transform your data into stunning visualizations?
              Schedule a personalized demo and discover how Plotlyzt can
              revolutionize your analysis workflow.
            </p>
          </div>

          {/* Premium Features */}
          <div className="demo-features">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                Quick 15-minute personalized demo session tailored to your
                industry and use case
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">
                Live examples with real data patterns and interactive
                visualization walkthroughs
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                Expert guidance on advanced features, integrations, and best
                practices for your team
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <a href="mailto:hello@plotlyzt.com" className="contact-email">
              hello@plotlyzt.com
            </a>
            <p className="contact-note">
              Questions? We're here to help you succeed
            </p>
          </div>
        </div>

        {/* Right Side - Premium Form Container */}
        <div className="demo-form-container">
          <form className="demo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  required
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
                placeholder="Your company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What type of data do you work with? What visualization challenges are you looking to solve? Tell us about your current workflow and goals."
                required
              />
            </div>

            <button type="submit" className="demo-submit-btn">
              Schedule Demo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoRequestContact;
