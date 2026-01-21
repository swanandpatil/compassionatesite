import { useLocation } from "react-router-dom";
import mascotanalytical from "../public/mascotanalytical.png";



export default function NavBar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isJournalPage = location.pathname === "/journal-page";

  const shouldCenterLogo = isHomePage || isJournalPage;

  // ✅ show mascot only on reset page
  const showResetMascot = location.pathname === "/mind-performance-reset";

  return (
    <nav
      style={{
        height: "100px",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: shouldCenterLogo ? "center" : "space-between",
        padding: "0 20px",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: "1000",
      }}
    >
      {/* left spacer to keep logo centered when needed */}
      {shouldCenterLogo ? <div style={{ width: "70px" }} /> : <div />}

      {/* ✅ MAIN LOGO */}
      <img
        src="/compassionate-logo.png"
        alt="Brand Logo"
        style={{
          height: "102px",
          width: "180px", // ✅ make it more readable
          // maxWidth: "85vw",
          // objectFit: "contain",
          filter: "contrast(1.25) brightness(1.08) saturate(1.05)",
        }}
      />

      {/* ✅ Mascot only on reset page */}
      {shouldCenterLogo ? (
        <div style={{ width: "70px" }} />
      ) : showResetMascot ? (
        <img
          src= {mascotanalytical}
          alt="Analytical Mascot"
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
            opacity: 0.95,
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.12))",
            cursor: "pointer",
          }}
        />
      ) : (
        <div style={{ width: "70px" }} />
      )}
    </nav>
  );
}
