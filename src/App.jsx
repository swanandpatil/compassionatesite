import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./Navbar";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import JournalPage from "./pages/JournalPage";
import Day1Page from "./pages/Day1Page";
import "./App.css";
import AuthListener from "./AuthListener";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#faf8f5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Keeps localStorage auth-user-id in sync with Supabase auth */}
        <AuthListener />

        <NavBar />

        <main style={{ flex: 1, paddingTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal-page" element={<JournalPage />} />
            <Route path="/day1" element={<Day1Page />} />
            {/* /login just redirects home, where the login UI lives in the nav */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
