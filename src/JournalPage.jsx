// src/JournalPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getAllEntries, saveEntry } from "./journalApi";

function formatDateForInput(date) {
  return date.toISOString().slice(0, 10); // yyyy-mm-dd
}

export default function JournalPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(formatDateForInput(new Date()));
  const [dayNumber, setDayNumber] = useState(1);
  const [mood, setMood] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");

  // Load entries when user is logged in
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      const data = await getAllEntries(user.id);
      setEntries(data);
      setLoading(false);
    }

    load();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Please login to save your reflection.");
      return;
    }

    const entry = {
      entry_date: date,
      day_number: dayNumber,
      mood,
      gratitude,
      reflection,
    };

    try {
      await saveEntry(user.id, entry);
      const updated = await getAllEntries(user.id);
      setEntries(updated);
      setMessage(`Saved reflection for Day ${dayNumber} ✨`);
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Something went wrong saving your entry.");
    }
  };

  const handleDateChange = (value) => {
    setDate(value);
    // Set day number based on existing entries
    const existing = entries.find((e) => e.entry_date === value);
    if (existing) {
      setDayNumber(existing.day_number || 1);
      setMood(existing.mood || "");
      setGratitude(existing.gratitude || "");
      setReflection(existing.reflection || "");
    } else {
      setMood("");
      setGratitude("");
      setReflection("");
    }
  };

  // 👉 If NOT logged in, show minimal info and STOP
  if (!user) {
    return (
      <section
        id="journal"
        style={{
          padding: "4rem 1.5rem 5rem",
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "0.75rem",
          }}
        >
          Compassion Journal
        </h2>

        <p
          style={{
            maxWidth: "460px",
            margin: "0 auto",
            opacity: 0.85,
            fontSize: "0.98rem",
          }}
        >
          Log in above to access your private 21-day Compassion Journal and
          the WhatsApp Nutritionist group.
        </p>
      </section>
    );
  }

  // 👉 Logged in: render full journal UI
  return (
    <section
      id="journal"
      style={{
        padding: "4rem 1.5rem 5rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Compassion Journal
      </h2>

      {/* Journal form */}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #eee",
          borderRadius: "18px",
          padding: "1.5rem",
          margin: "2rem auto",
          maxWidth: "720px",
          background: "#fffdf7",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <div>
            <label style={{ fontWeight: 600, display: "block" }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              style={{
                marginTop: "0.3rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600, display: "block" }}>
              Day number
            </label>
            <input
              type="number"
              min={1}
              max={21}
              value={dayNumber}
              onChange={(e) => setDayNumber(Number(e.target.value))}
              style={{
                marginTop: "0.3rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                border: "1px solid #ddd",
                width: "80px",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: 600, display: "block" }}>
            How are you feeling today?
          </label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Calm, grateful, stressed, hopeful..."
            style={{
              marginTop: "0.3rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: 600, display: "block" }}>
            One thing you&apos;re grateful for today
          </label>
          <textarea
            rows={2}
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            style={{
              marginTop: "0.3rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              width: "100%",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: 600, display: "block" }}>
            Compassion reflection
          </label>
          <textarea
            rows={4}
            placeholder="How did you eat kindly or live with compassion today?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            style={{
              marginTop: "0.3rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              width: "100%",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!user}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            border: "none",
            background: user ? "black" : "#aaa",
            color: "white",
            cursor: user ? "pointer" : "not-allowed",
            fontWeight: 600,
          }}
        >
          Save today&apos;s reflection
        </button>

        {message && (
          <div style={{ marginTop: "0.75rem", color: "#15803d" }}>
            {message}
          </div>
        )}
      </form>

      {/* Entries list */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          borderRadius: "18px",
          padding: "1.5rem",
          border: "1px solid #eee",
          background: "#f8fff9",
        }}
      >
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
          Your reflections
        </h3>

        {loading ? (
          <p>Loading entries…</p>
        ) : entries.length === 0 ? (
          <p style={{ opacity: 0.8 }}>
            No entries yet. Start with Day 1 and build your compassionate
            streak ✨
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxHeight: "260px",
              overflowY: "auto",
            }}
          >
            {entries.map((entry) => (
              <li
                key={entry.id}
                style={{
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  Day {entry.day_number || "-"} · {entry.entry_date}
                </div>
                {entry.gratitude && (
                  <div style={{ fontSize: "0.9rem" }}>
                    <strong>Gratitude:</strong> {entry.gratitude}
                  </div>
                )}
                {entry.reflection && (
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "0.25rem",
                      opacity: 0.9,
                    }}
                  >
                    {entry.reflection}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
