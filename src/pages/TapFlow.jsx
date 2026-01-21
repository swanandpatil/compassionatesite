import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TAP_LIBRARY = {
  anxious: {
    accept: [
      "I acknowledge that I am feeling anxious right now.",
      "It is okay to feel uncertain about the future.",
      "I give myself permission to pause and breathe.",
      "I accept this feeling without fighting it.",
    ],
    positivity: [
      "I am safe and grounded in this moment.",
      "I trust that I can handle whatever comes.",
      "Calmness is returning to me with every breath.",
    ],
  },
  sad: {
    accept: [
      "I allow myself to feel this sadness.",
      "It is natural to have heavy days.",
      "I honor my feelings as they are.",
      "I embrace my vulnerability today.",
    ],
    positivity: [
      "This sadness does not define my whole story.",
      "I am gentle with myself as I heal.",
      "Light will return in its own time.",
    ],
  },
  angry: {
    accept: [
      "I acknowledge the anger I am holding.",
      "It is valid to feel frustrated.",
      "I let this anger exist without acting on it.",
      "I observe my anger with compassion.",
    ],
    positivity: [
      "I choose to release this tension.",
      "I channel my energy into peace.",
      "I am in control of my response.",
    ],
  },
  overthinking: {
    accept: [
      "I notice my mind is racing.",
      "I accept that I cannot solve everything now.",
      "I let my thoughts come and go like clouds.",
      "It is okay to not have all the answers.",
    ],
    positivity: [
      "I focus on one thing at a time.",
      "My mind is becoming clear and still.",
      "I trust my intuition to guide me.",
    ],
  },
  overwhelmed: {
    accept: [
      "I admit that I have a lot on my plate.",
      "I accept that I can only do so much.",
      "I give myself permission to rest.",
      "I acknowledge this feeling of pressure.",
    ],
    positivity: [
      "I take things one step at a time.",
      "I am capable of managing my tasks.",
      "I prioritize my peace over perfection.",
    ],
  },
  tired: {
    accept: [
      "I acknowledge that my body needs rest.",
      "It is okay to slow down today.",
      "I accept my low energy levels.",
      "I listen to what my body is telling me.",
    ],
    positivity: [
      "Rest is productive and necessary.",
      "I am recharging my energy.",
      "I treat myself with kindness today.",
    ],
  },
  okay: {
    accept: [
      "I accept this moment of calm.",
      "I am present with my current state.",
      "I allow myself to just be.",
      "I appreciate this feeling of stability.",
    ],
    positivity: [
      "I am grateful for this peace.",
      "I carry this calmness forward.",
      "I am content with where I am.",
    ],
  },
};

export default function TapFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState("TELL"); // "TELL" | "ACCEPT" | "POSITIVITY"
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedAcceptLine, setSelectedAcceptLine] = useState(null);
  const [selectedPositiveLine, setSelectedPositiveLine] = useState(null);

  const currentDay = localStorage.getItem("currentDay") || "1";

  const handleNext = () => {
    if (step === "TELL" && selectedEmotion) setStep("ACCEPT");
    else if (step === "ACCEPT" && selectedAcceptLine) setStep("POSITIVITY");
    else if (step === "POSITIVITY" && selectedPositiveLine) navigate("/reset");
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
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#2d2a32" }}>Day {currentDay}</h1>

        <div style={{ display: "inline-flex", alignItems: "center", background: "#fff", padding: "0.4rem 1rem", borderRadius: "50px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "2.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#5b5663", letterSpacing: "0.05em" }}>
          {step === "TELL" && "TELL"}
          {step === "ACCEPT" && "LET IT BE"}
          {step === "POSITIVITY" && "RESET THOUGHT"}
          <div style={{ display: "flex", gap: "4px", marginLeft: "10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: step === "TELL" ? "#2d2a32" : "#e0e0e0" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: step === "ACCEPT" ? "#2d2a32" : "#e0e0e0" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: step === "POSITIVITY" ? "#2d2a32" : "#e0e0e0" }} />
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          {step === "TELL" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              {Object.keys(TAP_LIBRARY).map((emotion) => (
                <button key={emotion} onClick={() => setSelectedEmotion(emotion)} style={{ padding: "0.8rem 1.5rem", borderRadius: "50px", border: "1px solid #e0e0e0", background: selectedEmotion === emotion ? "#1e3a8a" : "#fff", color: selectedEmotion === emotion ? "#fff" : "#5b5663", fontSize: "1rem", cursor: "pointer", transition: "all 0.2s ease", textTransform: "capitalize", fontFamily: "inherit" }}>
                  {emotion}
                </button>
              ))}
            </div>
          )}

          {step === "ACCEPT" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {TAP_LIBRARY[selectedEmotion].accept.map((line, index) => (
                <button key={index} onClick={() => setSelectedAcceptLine(line)} style={{ padding: "1rem 1.5rem", borderRadius: "16px", border: "1px solid #e0e0e0", background: selectedAcceptLine === line ? "#1e3a8a" : "#fff", color: selectedAcceptLine === line ? "#fff" : "#5b5663", fontSize: "1.1rem", cursor: "pointer", transition: "all 0.2s ease", textAlign: "left", fontFamily: "inherit", lineHeight: 1.4 }}>
                  {line}
                </button>
              ))}
            </div>
          )}

          {step === "POSITIVITY" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {TAP_LIBRARY[selectedEmotion].positivity.map((line, index) => (
                <button key={index} onClick={() => setSelectedPositiveLine(line)} style={{ padding: "1rem 1.5rem", borderRadius: "16px", border: "1px solid #e0e0e0", background: selectedPositiveLine === line ? "#1e3a8a" : "#fff", color: selectedPositiveLine === line ? "#fff" : "#5b5663", fontSize: "1.1rem", cursor: "pointer", transition: "all 0.2s ease", textAlign: "left", fontFamily: "inherit", lineHeight: 1.4 }}>
                  {line}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleNext} disabled={(step === "TELL" && !selectedEmotion) || (step === "ACCEPT" && !selectedAcceptLine) || (step === "POSITIVITY" && !selectedPositiveLine)} className="login-btn" style={{ padding: "1rem 3rem", fontSize: "1.1rem", borderRadius: "50px", background: "#695099", color: "white", border: "none", cursor: "pointer", opacity: (step === "TELL" && !selectedEmotion) || (step === "ACCEPT" && !selectedAcceptLine) || (step === "POSITIVITY" && !selectedPositiveLine) ? 0.5 : 1, pointerEvents: (step === "TELL" && !selectedEmotion) || (step === "ACCEPT" && !selectedAcceptLine) || (step === "POSITIVITY" && !selectedPositiveLine) ? "none" : "auto", boxShadow: "0 4px 15px rgba(109, 91, 208, 0.35)" }}>
          {step === "TELL" ? "Continue" : step === "ACCEPT" ? "Next" : "Complete"}
        </button>
      </div>
    </div>
  );
}