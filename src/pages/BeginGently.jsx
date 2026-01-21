import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function BeginGently() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save name to localStorage
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
    }

    // Mark onboarding as complete
    localStorage.setItem("hasOnboarded", "true");

    // Initialize day progress if not present
    if (!localStorage.getItem("currentDay")) {
      localStorage.setItem("currentDay", "1");
    }

    // If email is provided, save to DB (using signInWithOtp as per existing logic)
    if (email.trim()) {
      try {
        await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { shouldCreateUser: true },
        });
      } catch (error) {
        console.error("Error saving email:", error);
        // Continue anyway as per requirements
      }
    }

    setLoading(false);
    navigate("/tap-flow");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F6F3FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1rem 1.5rem",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#2d2a32" }}>
          Begin gently
        </h1>

        <form onSubmit={handleContinue} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="What should we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "50px",
              background: "#695099",
              color: "white",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(109, 91, 208, 0.35)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>

      </div>
    </div>
  );
}