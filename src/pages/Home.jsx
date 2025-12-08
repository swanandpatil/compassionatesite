// src/pages/Home.jsx   
// src/pages/Home.jsx

import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Home({ hasPass, onBuyPass }) {
  const { user } = useAuth();

  const handleDownloadJournal = () => {
    if (!hasPass) return;
    // TODO: replace with your actual journal file download
    // e.g., window.open("/compassionate-journal.pdf", "_blank");
    alert(
      "Journal download coming soon (you've unlocked it with Gratitude Pass)!"
    );
  };

  const handleBuyPass = () => {
    const confirmed = window.confirm(
      "Proceed to unlock the ₹99 Gratitude Pass?\n(Payment flow coming soon – this is a demo unlock.)"
    );
    if (!confirmed) return;
    onBuyPass && onBuyPass();
  };

  const handleChallengeGroup = () => {
    if (!hasPass) return;
    window.open(
      "https://chat.whatsapp.com/REPLACE_WITH_CHALLENGE_GROUP_LINK",
      "_blank"
    );
  };

  return (
    <div
      style={{
        background: "#fff7e0",
        minHeight: "calc(100vh - 70px)",
        padding: "3rem 1.5rem",
      }}
    >
      {/* ✅ Login banner at top of Home (only when NOT logged in) */}
      {!user && (
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto 1.5rem",
            padding: "0.9rem 1.2rem",
            borderRadius: "0.75rem",
            border: "1px solid #fde68a",
            backgroundColor: "#fffbeb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "0.98rem",
            }}
          >
            Login to unlock <strong>Journal</strong> &{" "}
            <strong>WhatsApp Nutritionist</strong> access.
          </p>
          <Link
            to="/login"
            style={{
              padding: "0.45rem 1.2rem",
              borderRadius: "999px",
              border: "none",
              background: "#111827",
              color: "#f9fafb",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Login
          </Link>
        </div>
      )}

      {/* Main container */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {/* Left section: Journal cover */}
        <div>
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
              marginBottom: "1rem",
            }}
          >
            <img
              src="/journal-cover.png"
              alt="The Compassionate Journal cover"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "0.95rem",
              maxWidth: "320px",
              opacity: 0.9,
            }}
          >
            <strong>The Compassionate Journal</strong> – 21-day guided reflection
            to live compassionately, eat kindly and build a daily gratitude habit.
          </p>
        </div>

        {/* Right section */}
        <div>
          {/* Main heading */}
          <h1
            style={{
              fontSize: "3.1rem",
              lineHeight: 1.05,
              marginBottom: "1.2rem",
            }}
          >
            Live Compassionately.
            <br />
            Eat Kindly.
            <br />
            Reflect Daily.
          </h1>

          {/* Highlight text line */}
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              lineHeight: 1.55,
              marginBottom: "1.25rem",
              maxWidth: "560px",
              color: "#facc15", // yellow text highlight
            }}
          >
            21 days of mindful eating, daily gratitude, and reflection – with a
            chance to win a vegan cloud kitchen setup.
          </p>

          {/* Helper line about Gratitude Pass */}
          <p
            style={{
              fontSize: "0.95rem",
              opacity: 0.9,
              marginBottom: "1rem",
            }}
          >
            <em>*Unlock your journal + 21-day challenge with the Gratitude Pass.</em>
          </p>

          {/* Buttons */}
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Download Journal */}
            <button
              onClick={handleDownloadJournal}
              disabled={!hasPass}
              style={{
                padding: "0.7rem 1.8rem",
                borderRadius: "999px",
                border: "none",
                background: hasPass ? "#111827" : "#9ca3af",
                color: "white",
                fontWeight: 600,
                cursor: hasPass ? "pointer" : "not-allowed",
                opacity: hasPass ? 1 : 0.7,
                whiteSpace: "nowrap",
              }}
            >
              Download Journal
            </button>

            {/* Gratitude Pass */}
            <button
              type="button"
              onClick={handleBuyPass}
              style={{
                padding: "0.7rem 1.8rem",
                borderRadius: "999px",
                background: hasPass ? "#dcfce7" : "#facc15",
                color: "#111827",
                fontWeight: 600,
                cursor: "pointer",
                border: hasPass ? "1px solid #111827" : "none",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {hasPass ? "Gratitude Pass Unlocked ✅" : "₹99 Gratitude Pass"}
            </button>

            {/* Challenge Group */}
            <button
              type="button"
              disabled={!hasPass}
              onClick={handleChallengeGroup}
              style={{
                padding: "0.7rem 1.8rem",
                borderRadius: "999px",
                border: hasPass ? "1px solid #3b82f6" : "1px solid #e5e7eb",
                background: hasPass ? "#eff6ff" : "#f5f5f5",
                fontWeight: 600,
                cursor: hasPass ? "pointer" : "not-allowed",
                opacity: hasPass ? 1 : 0.6,
                whiteSpace: "nowrap",
              }}
              title={
                hasPass
                  ? "Join the 21-Day Challenge Group"
                  : "Unlock the ₹99 Gratitude Pass to access this"
              }
            >
              21-Day Challenge Group
            </button>
          </div>

          {/* Feature badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "2rem",
              fontSize: "0.9rem",
            }}
          >
            {["Cloud Kitchen Setup", "Training by Vegan Chef", "Launch Support"].map(
              (label) => (
                <span
                  key={label}
                  style={{
                    padding: "0.5rem 1.1rem",
                    borderRadius: "999px",
                    border: "1px solid #111827",
                    background: "transparent",
                    cursor: "default",
                  }}
                >
                  {label}
                </span>
              )
            )}
          </div>

          {/* Stay Compassionate + Hindi line */}
          <div>
            <h2
              style={{
                fontSize: "1.7rem",
                marginBottom: "0.4rem",
              }}
            >
              Stay Compassionate 💚
            </h2>

            {/* Hindi line - deep green */}
            <p
              style={{
                marginBottom: "0.35rem",
                fontSize: "1.1rem",
                color: "#065f46", // 🌿 deep green
                fontWeight: 600,
              }}
            >
              करुणा से जीएं
            </p>

            {/* Instruction line */}
            <p
              style={{
                marginBottom: "0.35rem",
                fontSize: "1rem",
              }}
            >
              Reflect daily. Eat mindfully.
            </p>

            {/* Signature line */}
            <p
              style={{
                opacity: 0.6, // ✨ subtle signature style
                fontSize: "0.9rem",
              }}
            >
              Made in India with compassion for the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
