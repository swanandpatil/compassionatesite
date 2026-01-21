import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MindPerformanceReset.css";

const TOTAL_DAYS = 30;
const FREE_DAYS = 7;

export default function MindPerformanceReset() {
  const [completedDays, setCompletedDays] = useState([]);
  const [analytics, setAnalytics] = useState({
    focusBefore: 2,
    focusAfter: 4,
    calmBefore: 2,
    calmAfter: 4,
    clarityBefore: 2,
    clarityAfter: 4,
  });

  useEffect(() => {
    const savedDays = localStorage.getItem("mpr_completed_days");
    const savedAnalytics = localStorage.getItem("mpr_analytics");

    if (savedDays) setCompletedDays(JSON.parse(savedDays));
    if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
  }, []);

  useEffect(() => {
    localStorage.setItem("mpr_completed_days", JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem("mpr_analytics", JSON.stringify(analytics));
  }, [analytics]);

  const currentDay = useMemo(() => {
    return Math.min(completedDays.length + 1, TOTAL_DAYS);
  }, [completedDays]);

  const progressPercent = Math.round((completedDays.length / TOTAL_DAYS) * 100);

  const markTodayDone = () => {
    if (completedDays.includes(currentDay)) return;

    setCompletedDays((prev) => [...prev, currentDay]);

    // Small analytics improvement each day
    setAnalytics((prev) => ({
      ...prev,
      focusAfter: Math.min(5, prev.focusAfter + 0.2),
      calmAfter: Math.min(5, prev.calmAfter + 0.2),
      clarityAfter: Math.min(5, prev.clarityAfter + 0.2),
    }));
  };

  const resetTracker = () => {
    setCompletedDays([]);
    setAnalytics({
      focusBefore: 2,
      focusAfter: 4,
      calmBefore: 2,
      calmAfter: 4,
      clarityBefore: 2,
      clarityAfter: 4,
    });
    localStorage.removeItem("mpr_completed_days");
    localStorage.removeItem("mpr_analytics");
  };

  return (
    <div className="mpr-page">
      {/* ✅ HEADER */}
      <header className="mpr-header">
        <h1 className="mpr-title">Mind Performance Reset</h1>
        <p className="mpr-subtitle">
          A 30-day challenge to become the best version of you in 2026.
        </p>

        <div className="mpr-badges">
          <span className="mpr-badge">✅ 7 Days Free</span>
          <span className="mpr-badge">🔥 Track Day 1 → Day 30</span>
          <span className="mpr-badge">📊 Before/After Analytics</span>
        </div>
      </header>

      {/* ✅ TODAY RESET MAIN CARD */}
      <section className="mpr-today-card">
        <div className="mpr-today-top">
          <div>
            <h2 className="mpr-today-title">Today’s Mind Reset Challenge</h2>
          </div>

          <button className="mpr-btn primary mpr-start-btn">
            Start Today’s Reset ⚡
          </button>
        </div>

        {/* ✅ JOURNALS INSIDE RESET CARD */}
        <div className="mpr-mini-journals">
          <MiniJournalCard
            title="Clarity Journal"
            desc="Quick clarity anytime."
            img="/Journal.png"
            to="/clarity-journal#journal"
            cta="Get Clarity Now"
          />

          <MiniJournalCard
            title="Day Journal"
            desc="Plan your day as you began."
            img="/DayJournal.png"
            to="/day-journal#journal"
            cta="Plan My Day"
          />

          <MiniJournalCard
            title="Evening Journal"
            desc="Reflect & relax to complete the day."
            img="/EveningJournal.png"
            to="/evening-journal#journal"
            cta="End Day Calmly"
          />
        </div>
      </section>

      {/* ✅ NEW SECTION: Challenge Guide (below 3 cards section) */}
      <section className="mpr-guide-card">
        <div className="mpr-guide-head">
          <h2 className="mpr-guide-title">What is this challenge?</h2>
          <p className="mpr-guide-sub">
            A simple daily journaling system to reset your mind, focus on goals,
            and build calm consistency.
          </p>
        </div>

        <div className="mpr-guide-grid">
          {/* What it is */}
          <div className="mpr-guide-box">
            <div className="mpr-guide-icon">🧠</div>
            <h3 className="mpr-guide-h3">What it is</h3>
            <p className="mpr-guide-text">
              A <b>30-day reset</b> where you use 3 journals daily (Morning,
              Anytime, Night) to stay clear, focused and calm.
            </p>
          </div>

          {/* How it helps */}
          <div className="mpr-guide-box">
            <div className="mpr-guide-icon">✨</div>
            <h3 className="mpr-guide-h3">How it helps</h3>

            <div className="mpr-guide-chips">
              <span className="mpr-chip">😌 Less overthinking</span>
              <span className="mpr-chip">🎯 Better focus</span>
              <span className="mpr-chip">✅ Strong execution</span>
              <span className="mpr-chip">🙂 Calm closure</span>
            </div>
          </div>

          {/* What to do */}
          <div className="mpr-guide-box">
            <div className="mpr-guide-icon">📌</div>
            <h3 className="mpr-guide-h3">What to do daily</h3>

            <ul className="mpr-guide-list">
              <li>
                🌅 <b>Morning</b> → Day Journal (intention + priorities)
              </li>
              <li>
                🧊 <b>Anytime</b> → Clarity Journal (2-min reset when stuck)
              </li>
              <li>
                🌙 <b>Night</b> → Evening Journal (reflection + calm closure)
              </li>
            </ul>

            <p className="mpr-guide-miniNote">
              Then click <b>“Mark Today Complete ✅”</b>.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ TRACKER */}
      <section className="mpr-section">
        <div className="mpr-tracker-head">
          <h2 className="mpr-h2">Challenge Tracker</h2>

          <div className="mpr-progress">
            <span>
              {completedDays.length}/{TOTAL_DAYS} days
            </span>

            <div className="mpr-progressbar">
              <div
                className="mpr-progressbar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mpr-note">
          Free access: <b>Day 1 to Day 7</b>. Days 8–30 stay locked.
        </p>

        <div className="mpr-days-grid">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const day = i + 1;
            const isFree = day <= FREE_DAYS;
            const isCompleted = completedDays.includes(day);
            const isToday = day === currentDay;

            return (
              <button
                key={day}
                className={[
                  "mpr-day",
                  isCompleted ? "done" : "",
                  isToday ? "today" : "",
                  !isFree ? "locked" : "",
                ].join(" ")}
                disabled={!isFree}
                title={!isFree ? "Locked (Free only 7 days)" : `Day ${day}`}
              >
                {!isFree ? "🔒" : isCompleted ? "✅" : "Day"} {day}
              </button>
            );
          })}
        </div>

        <div className="mpr-actions">
          <button className="mpr-btn primary" onClick={markTodayDone}>
            Mark Today Complete ✅
          </button>
          <button className="mpr-btn danger" onClick={resetTracker}>
            Reset Progress
          </button>
        </div>
      </section>

      {/* ✅ ANALYTICS */}
      <section className="mpr-section">
        <h2 className="mpr-h2">Your Analytics (Before vs After)</h2>

        <div className="mpr-benefit-chips">
          <span className="mpr-chip">😌 Less overthinking</span>
          <span className="mpr-chip">🎯 Better focus</span>
          <span className="mpr-chip">🙂 Calm mind</span>
          <span className="mpr-chip">✅ Clear priorities</span>
        </div>

        <div className="mpr-analytics-grid">
          <AnalyticsRow
            label="Focus"
            before={analytics.focusBefore}
            after={analytics.focusAfter}
          />
          <AnalyticsRow
            label="Calm"
            before={analytics.calmBefore}
            after={analytics.calmAfter}
          />
          <AnalyticsRow
            label="Clarity"
            before={analytics.clarityBefore}
            after={analytics.clarityAfter}
          />
        </div>
      </section>
    </div>
  );
}

/* ✅ Mini journal card component */
function MiniJournalCard({ title, desc, img, to, cta }) {
  return (
    <div className="mpr-mini-card">
      <div className="mpr-mini-thumb">
        <img src={img} alt={title} className="mpr-mini-img" />
      </div>

      <div className="mpr-mini-body">
        <h3 className="mpr-mini-title">{title}</h3>
        <p className="mpr-mini-desc">{desc}</p>

        <Link to={to} className="mpr-mini-cta">
          {cta}
        </Link>
      </div>
    </div>
  );
}

function AnalyticsRow({ label, before, after }) {
  return (
    <div className="mpr-analytics-row">
      <div className="mpr-analytics-label">{label}</div>

      <div className="mpr-analytics-col">
        <span className="mpr-analytics-tag">Before</span>
        <span className="mpr-score">{Number(before).toFixed(1)}/5</span>
      </div>

      <div className="mpr-analytics-col">
        <span className="mpr-analytics-tag">After</span>
        <span className="mpr-score strong">{Number(after).toFixed(1)}/5</span>
      </div>
    </div>
  );
}
