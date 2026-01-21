import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/done"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff7e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Breathing Animation Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(105, 80, 153, 0.15)",
            animation: "breathe 3s ease-in-out infinite",
          }}
        />
        <p style={{ fontSize: "1.2rem", color: "#695099", fontWeight: 500, marginTop: "1rem" }}>
          Breathe • Reflect • Reset
        </p>
      </div>

      <style>
        {`
          @keyframes breathe {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}