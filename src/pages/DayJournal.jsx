import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JournalForms.css";

export default function DayJournal() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    feeling: "",
    priority1: "",
    priority2: "",
    priority3: "",
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
          feeling: "",
          priority1: "",
          priority2: "",
          priority3: "",
          kindAct: "",
          notes: ""
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
            Set your intention. Stay calm. Build consistency — one day at a time.
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
            <label>Today I want to feel...</label>
            <input 
              type="text" 
              name="feeling"
              className="form-input"
              placeholder="Calm, focused, energetic..."
              value={formData.feeling}
              onChange={handleChange}
            />
          </div>

          {/* Priorities */}
          <div className="form-group">
            <label>Top 3 Priorities</label>
            <div className="multi-input-group">
              <input 
                type="text" 
                name="priority1"
                className="form-input"
                placeholder="1."
                value={formData.priority1}
                onChange={handleChange}
              />
              <input 
                type="text" 
                name="priority2"
                className="form-input"
                placeholder="2."
                value={formData.priority2}
                onChange={handleChange}
              />
              <input 
                type="text" 
                name="priority3"
                className="form-input"
                placeholder="3."
                value={formData.priority3}
                onChange={handleChange}
              />
            </div>
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
            <label>Notes / Thoughts</label>
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
            <button type="submit" className="save-btn">Save Entry</button>
          </div>
        </form>
      </div>

      {showToast && <div className="toast">Saved ✅</div>}
    </div>
  );
}
