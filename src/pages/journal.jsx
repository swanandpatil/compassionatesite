
// src/pages/journal.jsx
// import { useAuth } from "../AuthContext";
// import JournalPage from "../JournalPage";

// export default function Journal() {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <main
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           padding: "3rem 1.5rem",
//           textAlign: "center",
//         }}
//       >
//         <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
//           Please login to access the Compassion Journal
//         </h2>
//       </main>
//     );
//   }

//   return <JournalPage />;
// }
// src/pages/Journal.jsx
// src/pages/Journal.jsx
import { useAuth } from "../AuthContext";
import JournalPage from "./JournalPage"; // ✅ make sure path is correct
import { Navigate } from "react-router-dom";

export default function Journal() {
  const { user, loading } = useAuth();

  // While checking auth state
  if (loading) {
    return (
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p>Checking your session…</p>
      </main>
    );
  }

  // If NOT logged in → redirect to home (login lives there)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in → show the actual journal UI
  return <JournalPage />;
}
