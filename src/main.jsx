// src/main.jsx (or main.tsx)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { AuthProvider } from "./AuthContext";

console.log("ENV URL:", import.meta.env.VITE_SUPABASE_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
