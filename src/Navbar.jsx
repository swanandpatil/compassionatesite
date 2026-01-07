import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isJournalPage = location.pathname === "/journal-page";

  const shouldCenterLogo = isHomePage || isJournalPage;

  return (
    <nav
      style={{
        height: "80px",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: shouldCenterLogo ? "center" : "flex-start",
        padding: "0 20px",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        backgroundColor: "white",
        zIndex: "1000",
      }}
    >
      <img
        src="compassionate-logo.png"
        alt="Brand Logo"
        style={{
          height: "2.5in",
          maxHeight: "80px",
          width: "auto",
          filter: "contrast(1.1) brightness(1.05)",
        }}
      />
    </nav>
  );
}