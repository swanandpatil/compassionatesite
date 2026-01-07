import { useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "./supabaseClient";

export default function AuthBar() {
  const { user, loading } = useAuth();
  const [sending, setSending] = useState(false);

  const handleLogin = async () => {
    const email = window.prompt("Enter your email to receive a magic login link:");
    if (!email) return;

    try {
      setSending(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        // Very simple error handling
        window.alert("Could not send magic link. Please try again.");
        return;
      }

      window.alert("Magic login link sent! Please check your email.");
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <span style={{ fontSize: "0.9rem" }}>Checking session…</span>;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={handleLogin}
        disabled={sending}
        style={{
          padding: "0.4rem 1rem",
          borderRadius: "999px",
          border: "1px solid #111827",
          background: "#ffffff",
          fontSize: "0.9rem",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {sending ? "Sending link…" : "Login with email"}
      </button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.9rem",
      }}
    >
      <span style={{ opacity: 0.9, maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {user.email}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        style={{
          padding: "0.35rem 0.9rem",
          borderRadius: "999px",
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Logout
      </button>
    </div>
  );
}



