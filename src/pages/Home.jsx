import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)", // Adjust for navbar height
        background: "#fff7e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 1.2fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Left section: Journal image */}
        <div style={{ textAlign: "center" }}>
          <img
            src="/Journal.png"
            alt="Journal"
            style={{
              width: "100%",
              maxWidth: "350px",
              borderRadius: "24px",
              boxShadow: "0 18px 40px hsla(0, 0%, 0%, 0.12)",
            }}
          />
        </div>

        {/* Right section: Hero content */}
        <div style={{ textAlign: "left" }}>
          {/* Hero Heading */}
          <h1
            style={{
              fontSize: "3.2rem",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              fontWeight: 400,
              color: "#2d2a32",
            }}
          >
            Start 2026
            <br />
            with Clarity
            <br />
            and Calm
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              color: "#5b5663",
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            3–4 minutes for daily reflection
            <br />
            14 days of guided journaling
          </p>

          {/* CTA Button */}
         <Link to="/journal-page" style={{ textDecoration: "none" }}>
  <button
    className="login-btn"
    style={{
      width: "auto",
      padding: "0.9rem 2.2rem",
      fontSize: "1.05rem",
      borderRadius: "50px",
      marginBottom: "3.5rem",
      background: "#695099",          // ✅ purple
      color: "white",                 // ✅ white text
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(109, 91, 208, 0.35)", // softer purple shadow
    }}
  >
    Let’s Begin Day 1
  </button>
</Link>

          {/* Brand Block – visible without scroll */}
          <div
            style={{
              fontSize: "0.9rem",
              color: "rgba(91, 86, 99, 0.75)",
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>Crafted in India</p>
            <p style={{ margin: 0 }}>with compassion for the world</p>
            <p style={{ margin: "0.3rem 0 0 0", fontWeight: 500 }}>
              करुणा से जिएँ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}