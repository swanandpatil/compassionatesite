import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Day1Page.css';

export default function Day1Page() {
  const [journalText, setJournalText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // 1. Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('You must be logged in to save.');

      // 2. Insert into the correct table
      const { error } = await supabase
        .from('journal_entries')
        .insert([{ user_id: user.id, content: journalText }]);

      if (error) throw error;

      console.log('Journal saved:', journalText);
      alert('Entry saved successfully!');
    } catch (error) {
      console.error('Error saving journal:', error.message);
      alert('Error: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="day1-container">
      {/* Top section with Day 1 header */}
      <div className="day1-top">
        <h1 className="day-title">Day 1 : Begin Gently</h1>
        <p className="day-prompt">How are you arriving today?</p>
      </div>

      {/* Journaling space - notebook style */}
      <main className="day1-main">
        <div className="notebook-page">
          <div className="notebook-lines">
            <textarea
              className="journal-textarea"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Begin writing here..."
              rows={20}
            />
          </div>
          
          <div className="journal-actions">
            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={isSaving || !journalText.trim()}
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer with logo */}
      <footer className="day1-footer">
        <img
          src="/compassionate-logo.png"
          alt="Compassionate Logo"
          className="footer-logo"
        />
      </footer>
    </div>
  );
}
