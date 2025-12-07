// src/AuthBar.jsx
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AuthBar({ onLogin, onLogout }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link ✉️");
      // For UI purposes, treat this as "logged in" so buttons unlock
      if (onLogin) onLogin();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMessage("Logged out");
    if (onLogout) onLogout();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {/* TOP ROW: Login + Logout in one line */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          <input
            type="email"
            placeholder="Enter email to login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              border: "none",
              background: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* This line stays in HEADER under login/logout */}
      <p
        style={{
          fontSize: "0.8rem",
          fontStyle: "italic",
          opacity: 0.8,
        }}
      >
        *Login to unlock Journal & WhatsApp Nutritionist access.
      </p>

      {/* Status message */}
      {message && (
        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>{message}</span>
      )}
    </div>
  );
}
