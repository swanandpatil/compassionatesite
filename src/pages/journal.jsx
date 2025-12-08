
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
import { useAuth } from "../AuthContext";
import JournalPage from "../JournalPage";
import { Navigate } from "react-router-dom";

export default function Journal() {
  const { user } = useAuth();

  // If NOT logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → show JournalPage
  return <JournalPage />;
}
