import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({
  isVisible,
  smoother,
  activeLink,
  setActiveLink,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navLinks = [
    "Home",
    "Features",
    "Flow",
    "Use Cases",
    "About Us",
    "Contact Us",
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <h1 className="title">Plotlyzt</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
              className={`nav-link ${
                activeLink === link ? "nav-link-active" : ""
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        {/* <div className="navbar-actions">
          <button className="btn-login">Log in</button>
          <button className="btn-cta">Contact</button>
        </div> */}

        {/* Mobile Hamburger Menu */}
        <button
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`hamburger-line ${
              isMobileMenuOpen ? "line1-active" : ""
            }`}
          ></span>
          <span
            className={`hamburger-line ${
              isMobileMenuOpen ? "line2-active" : ""
            }`}
          ></span>
          <span
            className={`hamburger-line ${
              isMobileMenuOpen ? "line3-active" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link);
            }}
            className={`mobile-nav-link ${
              activeLink === link ? "mobile-nav-link-active" : ""
            }`}
          >
            {link}
          </a>
        ))}
        {/* <div className="mobile-actions">
          <button className="btn-login">Log in</button>
          <button className="btn-cta">Contact</button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
