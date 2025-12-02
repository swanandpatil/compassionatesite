

import './App.css';
import journalCover from './assets/journal-cover.png';

function App() {
  return (
    <div className="compassionate-container">
      <header className="compassionate-header">
        <div className="logo-title">
          <span className="logo-icon">{/* Heart/leaf icon SVG here */}</span>
          <span className="site-title">The Compassionate</span>
        </div>
        <nav className="main-nav">
          <a href="#journal">Journal</a>
          <a href="#whatsapp">WhatsApp Nutritionist</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="journal-section">
          <img src={journalCover} alt="Journal Cover" className="journal-cover" />
          <div className="journal-info">
            <h1 className="main-heading">Live Compassionately.<br />Eat Kindly.<br />Reflect Daily.</h1>
            <div className="main-buttons">
              <button className="download-btn">Download Journal</button>
              <button className="pass-btn">₹99 Gratitdte Pass</button>
            </div>
            <div className="hindi-heading">करुणा से जियें</div>
          </div>
        </div>
        <div className="chance-section">
          <h2>Stand a chance to win your own vegan cloud kitchen setup — and start your compassionate food journey</h2>
          <div className="chance-buttons">
            <button className="outline-btn">Cloud Kitchen Setup</button>
            <button className="outline-btn">Training by Vegan Chef</button>
            <button className="outline-btn">Launch Support</button>
          </div>
        </div>
      </main>
      <footer className="compassionate-footer">
        <div className="footer-main">
          <h2 className="footer-heading">Stay Compassionate <span className="green-heart">💚</span></h2>
          <div className="footer-sub">Reflect daily. Eat mindfully.<br />Made in India with Compassion for the World</div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-title">About</span>
          </div>
          <div className="footer-col">
            <span className="footer-title">Quick Links</span>
          </div>
          <div className="footer-col">
            <span className="footer-title">Contact info</span>
            <div>thecompassionate@gmail.com<br />Pune, India</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
