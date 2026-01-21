import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DoneStatus() {
  const [showToast, setShowToast] = useState(false);
  const [completedDay, setCompletedDay] = useState(1);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastDate = localStorage.getItem("lastCompletedDate");
    let current = parseInt(localStorage.getItem("currentDay") || "1", 10);

    // If we haven't marked today as complete yet, do it now
    if (lastDate !== today) {
      localStorage.setItem("lastCompletedDate", today);
      localStorage.setItem("lastCompletedDay", current.toString());
      
      // Unlock next day
      localStorage.setItem("currentDay", (current + 1).toString());
      setCompletedDay(current);
    } else {
      // If already completed today (e.g. refresh), show what was completed
      const last = parseInt(localStorage.getItem("lastCompletedDay") || "1", 10);
      setCompletedDay(last);
    }
  }, []);

  const handleAddReminder = () => {
    const now = new Date();
    const tomorrow = new Date(now);

    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setMinutes(endTime.getMinutes() + 15);

    // Format: YYYYMMDDTHHmmss (local time)
    const formatDate = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
      );
    };

    const startStr = formatDate(tomorrow);
    const endStr = formatDate(endTime);

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Compassion+Journaling&dates=${startStr}/${endStr}&details=Time+for+your+daily+reflection.`;

    window.open(gCalUrl, "_blank");

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F6F3FF", // Lavender theme
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1rem",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2d2a32",
          marginBottom: "0.5rem",
          opacity: 0.85,
        }}
      >
        Tap Tap Done ✅
      </div>

      {/* Main Heading */}
      <h1
        style={{
          fontSize: "1.8rem",
          marginBottom: "0.4rem",
          color: "#2d2a32",
          lineHeight: 1.2,
        }}
      >
        Day {completedDay} Completed
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontSize: "1rem",
          color: "#5b5663",
          marginBottom: "0.75rem",
          maxWidth: "320px",
        }}
      >
        You showed up. That’s enough.
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "320px",
        }}
      >
        {/* Primary Button: Back Home */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "0.9rem",
              fontSize: "1.05rem",
              borderRadius: "50px",
              background: "#695099",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(109, 91, 208, 0.25)",
              transition: "all 0.3s ease",
              fontWeight: 600,
            }}
          >
            Back Home
          </button>
        </Link>

        {/* Secondary Button: Add Reminder */}
        <button
          onClick={handleAddReminder}
          style={{
            width: "100%",
            padding: "0.9rem",
            fontSize: "1.05rem",
            borderRadius: "50px",
            background: "white",
            color: "#695099",
            border: "2px solid #695099",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🔔 Add Reminder (Calendar)
        </button>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "1.25rem",
          fontSize: "0.95rem",
          color: "#5b5663",
          opacity: 0.95,
        }}
      >
        ✨ करुणा से जिए।
      </p>

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2d2a32",
            color: "white",
            padding: "12px 20px",
            borderRadius: "50px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            fontSize: "0.95rem",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-out",
            whiteSpace: "nowrap",
          }}
        >
          ✅ Reminder added for tomorrow 9:00 AM
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </div>
  );
}
