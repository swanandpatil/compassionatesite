import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JournalForms.css";

export default function EveningJournal() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    wentWell: "",
    challenge: "",
    g1: "",
    g2: "",
    g3: "",
    improveTomorrow: "",
    notes: ""
  });

  // Load data when date changes
  useEffect(() => {
    const savedData = localStorage.getItem("eveningJournalEntries");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed[date]) {
        setFormData(parsed[date]);
      } else {
        // Reset form if no entry for this date
        setFormData({
          wentWell: "", challenge: "", g1: "", g2: "", g3: "", improveTomorrow: "", notes: ""
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
    
    const savedData = JSON.parse(localStorage.getItem("eveningJournalEntries") || "{}");
    savedData[date] = formData;
    localStorage.setItem("eveningJournalEntries", JSON.stringify(savedData));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="journal-page">
      <div className="journal-container">
        <header className="journal-header">
          <h1 className="journal-title">Evening Journal</h1>
          <p className="journal-subtitle">
            End the day gently with reflection.
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

          {/* What went well */}
          <div className="form-group">
            <label>What went well today?</label>
            <textarea 
              name="wentWell"
              className="form-textarea"
              placeholder="Small wins, happy moments..."
              value={formData.wentWell}
              onChange={handleChange}
            />
          </div>

          {/* Challenges */}
          <div className="form-group">
            <label>What challenged me today?</label>
            <textarea 
              name="challenge"
              className="form-textarea"
              placeholder="Stressful moments, obstacles..."
              value={formData.challenge}
              onChange={handleChange}
            />
          </div>

          {/* Gratitude */}
          <div className="form-group">
            <label>3 things I’m grateful for</label>
            <div className="multi-input-group">
              <input type="text" name="g1" className="form-input" placeholder="1." value={formData.g1} onChange={handleChange} />
              <input type="text" name="g2" className="form-input" placeholder="2." value={formData.g2} onChange={handleChange} />
              <input type="text" name="g3" className="form-input" placeholder="3." value={formData.g3} onChange={handleChange} />
            </div>
          </div>

          {/* Improvement */}
          <div className="form-group">
            <label>One improvement for tomorrow</label>
            <input 
              type="text" 
              name="improveTomorrow"
              className="form-input"
              placeholder="Sleep earlier, drink more water..."
              value={formData.improveTomorrow}
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
            <button type="submit" className="save-btn">Save Evening Journal</button>
          </div>
        </form>
      </div>

      {showToast && <div className="toast">Saved ✅</div>}
    </div>
  );
}