
// src/pages/Journal.jsx
import { useAuth } from "../AuthContext";
import Journal from "./pages/journal";


export default function Journal() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Please login to access the Compassion Journal
        </h2>
      </main>
    );
  }

  return <JournalPage />;
}
