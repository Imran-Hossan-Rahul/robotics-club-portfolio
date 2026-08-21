"use client";
import React, { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <div
          className="nav-logo"
          id="nav-logo-left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            transform: "translateY(-1px)",
          }}
        >
          <div
            id="nav-animated-logo-wrapper"
            style={{
              maxHeight: "0",
              opacity: "0",
              overflow: "hidden",
              transition: "all 0.4s ease",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="/photo/robotics-club-logo.png"
              alt="Robotics Club"
              style={{ width: "35px", height: "auto", marginBottom: "2px" }}
            />
          </div>
          <span
            style={{
              fontWeight: "bold",
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              fontSize: "0.8rem",
              lineHeight: "1",
            }}
          >
            Robotics Club
          </span>
        </div>
        <div className="nav-links">
          <a href="#committee">Committee</a>
          <a href="#events">Flagship Events</a>
          <a href="#workshops">Workshops</a>
        </div>
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div
            className="nav-uap-logo"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              transform: "translateY(0)",
            }}
          >
            <img src="/photo/university-logo.png" alt="UAP" style={{ width: "36px", height: "auto" }} />
            <span
              style={{
                fontWeight: "bold",
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                fontSize: "0.8rem",
                lineHeight: "1",
              }}
            >
              UAP
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
