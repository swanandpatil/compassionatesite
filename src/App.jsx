import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./Navbar";
import Home from "./pages/Home";
import Day1Page from "./pages/Day1Page";
import BeginGently from "./pages/BeginGently";
import TapFlow from "./pages/TapFlow";
import DoneStatus from "./pages/DoneStatus";
import ResetThought from "./pages/ResetThought";
import DayJournal from "./pages/DayJournal";
import EveningJournal from "./pages/EveningJournal";
import MindPerformanceReset from "./pages/MindPerformanceReset"; // ✅ ADD THIS
import "./App.css";
import AuthListener from "./AuthListener";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F6F3FF]">
        {/* Keeps localStorage auth-user-id in sync with Supabase auth */}
        <AuthListener />

        <NavBar />

        <main className="flex-1 overflow-hidden pt-20 relative">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ✅ Mind Reset Challenge Page */}
            <Route
              path="/mind-performance-reset"
              element={<MindPerformanceReset />}
            />

            {/* New Flow Routes */}
            <Route path="/begin-gently" element={<BeginGently />} />
            <Route path="/tap-flow" element={<TapFlow />} />
            <Route path="/done" element={<DoneStatus />} />
            <Route path="/reset" element={<ResetThought />} />

            {/* ✅ FIXED JOURNAL ENTRY ROUTES */}
            {/* Now Clarity CTA can go to /clarity-journal and open TapFlow */}
            <Route path="/clarity-journal" element={<TapFlow />} />

            {/* keep old one also (backward compatible) */}
            <Route path="/clarity" element={<BeginGently />} />

            <Route path="/day-journal" element={<DayJournal />} />
            <Route path="/evening-journal" element={<EveningJournal />} />

            {/* Day pages */}
            <Route path="/day1" element={<Day1Page />} />

            {/* login redirects home */}
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