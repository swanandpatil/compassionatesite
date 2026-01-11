import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function JournalPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Auth error:", error.message);
      // silently fail, still unlock
    } finally {
      setIsUnlocked(true);
      setLoading(false);
    }
  };

  const handleSaveEntry = () => {
    console.log("Saved entry:", entry);
    setIsSubmitted(true);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    setIsSubmitted(false);
    setEntry("");
    localStorage.removeItem("journal_email");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3e7f1",
        fontFamily: "Georgia, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* JOURNAL CONTENT */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          transition: "filter 0.8s ease, opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
          filter: isUnlocked ? "none" : "blur(2px)",
          opacity: isUnlocked ? 1 : 0.5,
          transform: isUnlocked ? "translateY(-.5in)" : "scale(0.95) translateX(-10px) translateY(-2in)",
          pointerEvents: isUnlocked ? "auto" : "none",
          zIndex: 1,
        }}
      >
        {!isSubmitted ? (
          <>
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "1rem" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#2d2a32",
                  marginBottom: "0.5rem",
                  fontWeight: "normal",
                }}
              >
                Day 1
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#5b5663",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                What feels present for you right now?
              </p>
            </header>

            {/* JOURNAL AREA */}
            <div
              style={{
                width: "100%",
                minHeight: "50vh",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                padding: "0 2rem",
                backgroundImage:
                  "linear-gradient(transparent 31px, #e0e0e0 32px)",
                backgroundSize: "100% 32px",
                backgroundAttachment: "local",
                lineHeight: "32px",
              }}
            >
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Right now, I’m noticing…"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "50vh",
                  border: "none",
                  background: "transparent",
                  fontSize: "1.1rem",
                  lineHeight: "32px",
                  fontFamily: "inherit",
                  resize: "none",
                  outline: "none",
                  color: "#333",
                }}
              />
            </div>

            {/* SAVE BUTTON — MOVED UP 3 INCHES */}
            <button
              onClick={handleSaveEntry}
              style={{
                padding: "0.8rem 2.5rem",
                backgroundColor: "#695099",
                color: "#ffffff",
                border: "none",
                borderRadius: "50px",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(105, 80, 153, 0.2)",
                transition: "transform 0.2s",

                position: "relative",
                top: "-1in", // ✅ EXACTLY 3 inches upward
              }}
            >
              Save today’s entry
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <p style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.3rem" }}>
              Day 1 of 14 complete 
            </p>
            <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: "1.5rem" }}>
              Day 2 🔒 Unlocks tomorrow 
            </p>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              Thank you for journaling with us.
            </p>
            <p style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "2rem" }}>
              Tomorrow, we’ll gently notice what stayed with you.
            </p>
            <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              करुणा से जिएँ
            </p>
            <button
              onClick={handleLogout}
              style={{
                marginTop: "2rem",
                background: "transparent",
                border: "none",
                color: "#695099",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                opacity: 0.8,
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* EMAIL OVERLAY */}
      {!isUnlocked && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(243, 231, 241, 0.4)",
            backdropFilter: "blur(2px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2.5rem 2rem",
              borderRadius: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "2in",
            }}
          >
            <img
              src="/Envelope.png"
              alt="Envelope"
              style={{ width: "80px", objectFit: "contain" }}
            />

            <h3
              style={{
                margin: 0,
                fontSize: "1.6rem",
                fontWeight: "normal",
              }}
            >
              Begin gently
            </h3>

            <form
              onSubmit={handleEmailSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  fontSize: "1rem",
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                }}
              />

              <p style={{ fontSize: "0.85rem", color: "#888", margin: 0 }}>
                🌱 We use your email only to help you return.
              </p>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: "#695099",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Sending…" : "Continue"}
              </button>
            </form>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                🌱 Your journaling data is saved locally on your device.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#695099" }}>
                करुणा से जिएँ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}