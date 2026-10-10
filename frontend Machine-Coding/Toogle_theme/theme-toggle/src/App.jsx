import { useState } from "react";
import "./App.css";

function App() {
  const [isDark, setDark] = useState(false);

  function toggleTheme() {
    setDark(!isDark);
  }

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <h1 className={`${isDark ? "dark" : "light"}`}>Theme Toggle</h1>

      <button
        className={`theme-switch ${isDark ? "dark-switch" : ""}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        aria-pressed={isDark}
      >
        <span className="switch-icon">{isDark ? "🌙" : "☀️"}</span>
      </button>

      <p>{isDark ? "Dark Mode" : "Light Mode"}</p>
    </div>
  );
}

export default App;
