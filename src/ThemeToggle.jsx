import { useLocalStorage } from "./useLocalStorage";

// Simple example component using the useLocalStorage hook
// to persist a "light" / "dark" theme choice.
export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      style={{
        padding: "1rem",
        marginTop: "1rem",
        borderRadius: "12px",
        background: isDark ? "#111827" : "#f9fafb",
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      <p style={{ marginBottom: "0.5rem" }}>Current theme: {theme}</p>
      <button type="button" onClick={toggleTheme}>
        Switch to {isDark ? "light" : "dark"} mode
      </button>
    </div>
  );
}




