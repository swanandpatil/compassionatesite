// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AuthBar from "./AuthBar";
import Home from "./pages/Home";
import Journal from "./pages/journal";

const whatsappNutritionistLink =
  "https://chat.whatsapp.com/IXGIiz3MKFALOlmsjm9rvm";

// separate challenge group link for paid users
const challengeGroupLink =
  "https://chat.whatsapp.com/REPLACE_WITH_CHALLENGE_GROUP_LINK";

function App() {
  // UI login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Has the user paid for gratitude pass?
  const [hasPass, setHasPass] = useState(false);

  return (
    <BrowserRouter>
      {/* Header / Navbar */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #eee",
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          gap: "0.75rem",
        }}
      >
        {/* Top row: logo + nav + auth */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Left: Logo + Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src="/compassionate-logo.png"
              alt="The Compassionate logo"
              style={{ width: 28, height: 28 }}
            />
            <Link
              to="/"
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                textDecoration: "none",
                color: "black",
              }}
            >
              The Compassionate
            </Link>
          </div>

          {/* Center: Navigation items */}
          <nav
            style={{
              display: "flex",
              gap: "1.0rem",
              fontSize: "0.95rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Home – always enabled */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "0.95rem",
              }}
            >
              Home
            </Link>

            {/* Journal – enabled only when logged in */}
            {isLoggedIn ? (
              <Link
                to="/journal"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "0.95rem",
                }}
              >
                Journal
              </Link>
            ) : (
              <button
                type="button"
                disabled
                title="Login to unlock Journal access"
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#f5f5f5",
                  fontSize: "0.9rem",
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                Journal
              </button>
            )}

            {/* WhatsApp Nutritionist – enabled only when logged in */}
            {isLoggedIn ? (
              <a
                href={whatsappNutritionistLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid #22c55e",
                  background: "#e9ffef",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                WhatsApp Nutritionist
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Login to unlock WhatsApp Nutritionist access"
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#f5f5f5",
                  fontSize: "0.9rem",
                  cursor: "not-allowed",
                  opacity: 0.6,
                  whiteSpace: "nowrap",
                }}
              >
                WhatsApp Nutritionist
              </button>
            )}

            {/* NEW: Challenge Group – only for paid Gratitude Pass users */}
            {hasPass ? (
              <a
                href={challengeGroupLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid #3b82f6",
                  background: "#eff6ff",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                21-Day Challenge Group
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Unlock the ₹99 Gratitude Pass to join the Challenge Group"
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#f5f5f5",
                  fontSize: "0.9rem",
                  cursor: "not-allowed",
                  opacity: 0.6,
                  whiteSpace: "nowrap",
                }}
              >
                21-Day Challenge Group
              </button>
            )}
          </nav>

          {/* Right: Auth controls */}
          <AuthBar
            onLogin={() => setIsLoggedIn(true)}
            onLogout={() => {
              setIsLoggedIn(false);
              // Optional: lock the pass again on logout
              // setHasPass(false);
            }}
          />
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              hasPass={hasPass}
              onBuyPass={() => setHasPass(true)}
            />
          }
        />
        <Route
          path="/journal"
          element={isLoggedIn ? <Journal /> : <Navigate to="/" replace />}
        />
      </Routes>

      {/* Footer with करुणा से जीएं at end */}
      <footer
        style={{
          borderTop: "1px solid #eee",
          padding: "1rem 1.5rem",
          textAlign: "center",
          fontSize: "0.85rem",
          opacity: 0.8,
          marginTop: "2rem",
        }}
      >
        © {new Date().getFullYear()} The Compassionate Journal · Eat Kindly, Live
        Compassionately · करुणा से जीएं
      </footer>
    </BrowserRouter>
  );
}

export default App;
