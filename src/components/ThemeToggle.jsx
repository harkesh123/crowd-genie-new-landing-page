import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button
        type="button"
        className={!isDark ? "active" : ""}
        aria-pressed={!isDark}
        aria-label="Light mode"
        title="Light mode"
        onClick={() => setTheme("light")}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      </button>
      <button
        type="button"
        className={isDark ? "active" : ""}
        aria-pressed={isDark}
        aria-label="Dark mode"
        title="Dark mode"
        onClick={() => setTheme("dark")}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.6 15.1a8.7 8.7 0 0 1-10.7-10.7A9 9 0 1 0 20.6 15.1Z" />
        </svg>
      </button>
    </div>
  );
}
