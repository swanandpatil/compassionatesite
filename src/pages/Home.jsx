import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div className="homePage">
      <div className="homeGrid">
        {/* LEFT COLUMN: Journal cards */}
        <div className="leftColumn">
          <div className="cardsContainer">
            {/* Clarity Journal */}
            <div className="journalCard">
              <div className="cardImgWrap">
                <img
                  src="/Journal.png"
                  alt="Clarity Journal"
                  className="cardImg"
                />
              </div>
              <Link to="/clarity" className="cardBtn">
                Begin Quick Clarity
              </Link>
            </div>

            {/* Day Journal */}
            <div className="journalCard">
              <div className="cardImgWrap">
                <img
                  src="/DayJournal.png"
                  alt="Day Journal"
                  className="cardImg"
                />
              </div>
              <Link to="/day-journal" className="cardBtn">
                Begin Day Journal
              </Link>
            </div>

            {/* Evening Reflection */}
            <div className="journalCard">
              <div className="cardImgWrap">
                <img
                  src="/EveningJournal.png"
                  alt="Evening Reflection"
                  className="cardImg"
                />
              </div>
              <Link to="/evening-journal" className="cardBtn">
                Begin Evening Reflection
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="rightContent">
          <h1 className="mainTitle">Start 2026 with Clarity & Calm</h1>

          <p className="subText">
            A gentle journaling space to slow down, reflect, and build calm
            consistency — one day at a time.
          </p>

          {/* Mascot + Speech Bubble */}
          <div className="mascotWrapper">
            <img src="/mascot.png" alt="Mascot" className="mascotImgLarge" />

            <div className="speechBubble">
              <h3 className="bubbleTitle">
                Wanna join the 30-Day Productivity Reset Challenge?
              </h3>
              <p className="bubbleSub">Get all your goals achieved in 2026.</p>

              <Link to="/mind-performance-reset" className="bubbleCta">
                Start Here
              </Link>
            </div>
          </div>

          {/* Footer Row */}
          <div className="homeFooterRow">
            {/* More Tools dropdown overlay button */}
            <div
              className="moreToolsWrap"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="moreToolsBtn">
                More Tools <span className="moreToolsArrow">▾</span>
              </button>

              {toolsOpen && (
                <div className="toolsDropdown">
                  {/* Vision Achievement */}
                  <div className="toolsItem disabled" title="Coming soon">
                    <span className="toolsIcon">🎯</span>
                    <div className="toolsText">
                      <div className="toolsName">
                        Vision Achievement{" "}
                        <span className="toolsBadge soon">Soon</span>
                      </div>
                      <div className="toolsDesc">
                        Turn vision into action plans
                      </div>
                    </div>
                  </div>

                  {/* Healing */}
                  <div className="toolsItem disabled" title="Coming soon">
                    <span className="toolsIcon">💙</span>
                    <div className="toolsText">
                      <div className="toolsName">
                        Healing <span className="toolsBadge soon">Soon</span>
                      </div>
                      <div className="toolsDesc">
                        Heal emotionally with guided journaling
                      </div>
                    </div>
                  </div>

                  {/* De-addiction */}
                  <div className="toolsItem disabled" title="Coming soon">
                    <span className="toolsIcon">🚫</span>
                    <div className="toolsText">
                      <div className="toolsName">
                        De-addiction{" "}
                        <span className="toolsBadge soon">Soon</span>
                      </div>
                      <div className="toolsDesc">
                        Track streaks & reduce bad habits
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Note */}
            <div className="safetyNote">
              <p>Your data stays safe — saved locally on your own device.</p>
              <p>Made with compassion for the world.</p>
              <p className="hindiText">करुणा से जिए</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
