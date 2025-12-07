import { useState } from "react";
import AuthBar from "./AuthBar";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleJournalClick = () => {
    if (!isLoggedIn) return;
    window.location.href = "/journal"; // change if your route is different
  };

  const handleWhatsAppClick = () => {
    if (!isLoggedIn) return;
    window.open("https://wa.me/91XXXXXXXXXX", "_blank"); // put your real link
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        borderBottom: "1px solid #eee",
        gap: "1rem",
      }}
    >
      {/* Left: title */}
      <div style={{ fontWeight: 600, fontSize: "1rem" }}>
        The Compassionate Journal – Vegan Living Edition
      </div>

      {/* Right: Auth + buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <AuthBar onAuthChange={setIsLoggedIn} />

        <button
          onClick={handleJournalClick}
          disabled={!isLoggedIn}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: isLoggedIn ? "black" : "#ccc",
            color: "white",
            cursor: isLoggedIn ? "pointer" : "not-allowed",
            opacity: isLoggedIn ? 1 : 0.6,
            whiteSpace: "nowrap",
          }}
        >
          Open Journal
        </button>

        <button
          onClick={handleWhatsAppClick}
          disabled={!isLoggedIn}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: isLoggedIn ? "black" : "#ccc",
            color: "white",
            cursor: isLoggedIn ? "pointer" : "not-allowed",
            opacity: isLoggedIn ? 1 : 0.6,
            whiteSpace: "nowrap",
          }}
        >
          WhatsApp Nutritionist
        </button>
      </div>
    </nav>
  );
}
