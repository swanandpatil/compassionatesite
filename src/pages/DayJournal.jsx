import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JournalForms.css";

export default function DayJournal() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    feel: "",
    p1: "",
    p2: "",
    p3: "",
    avoid: "",
    kindAct: "",
    notes: ""
  });

  // Load data when date changes
  useEffect(() => {
    const savedData = localStorage.getItem("dayJournalEntries");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed[date]) {
        setFormData(parsed[date]);
      } else {
        // Reset form if no entry for this date
        setFormData({
          feel: "", p1: "", p2: "", p3: "", avoid: "", kindAct: "", notes: ""
        });
      }
    }
  }, [date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const savedData = JSON.parse(localStorage.getItem("dayJournalEntries") || "{}");
    savedData[date] = formData;
    localStorage.setItem("dayJournalEntries", JSON.stringify(savedData));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="journal-page">
      <div className="journal-container">
        <header className="journal-header">
          <h1 className="journal-title">Day Journal</h1>
          <p className="journal-subtitle">
            Start your day with clarity & intention.
          </p>
        </header>

        <form className="journal-form" onSubmit={handleSave}>
          {/* Date Picker */}
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Feeling */}
          <div className="form-group">
            <label>How do I want to feel today?</label>
            <input 
              type="text" 
              name="feel"
              className="form-input"
              placeholder="Calm, focused, energetic..."
              value={formData.feel}
              onChange={handleChange}
            />
          </div>

          {/* Priorities */}
          <div className="form-group">
            <label>Top 3 Priorities</label>
            <div className="multi-input-group">
              <input type="text" name="p1" className="form-input" placeholder="1." value={formData.p1} onChange={handleChange} />
              <input type="text" name="p2" className="form-input" placeholder="2." value={formData.p2} onChange={handleChange} />
              <input type="text" name="p3" className="form-input" placeholder="3." value={formData.p3} onChange={handleChange} />
            </div>
          </div>

          {/* Avoid */}
          <div className="form-group">
            <label>One thing I will avoid today (distraction)</label>
            <input 
              type="text" 
              name="avoid"
              className="form-input"
              placeholder="Mindless scrolling, news..."
              value={formData.avoid}
              onChange={handleChange}
            />
          </div>

          {/* Kind Act */}
          <div className="form-group">
            <label>One kind act I will do today</label>
            <input 
              type="text" 
              name="kindAct"
              className="form-input"
              placeholder="Send a nice text, help a colleague..."
              value={formData.kindAct}
              onChange={handleChange}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea 
              name="notes"
              className="form-textarea"
              placeholder="Anything else on your mind..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Link to="/" className="back-link">← Back to Home</Link>
            <button type="submit" className="save-btn">Save Day Journal</button>
          </div>
        </form>
      </div>

      {showToast && <div className="toast">Saved ✅</div>}
    </div>
  );
}