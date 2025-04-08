import React, { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import Admin from "./Admin";

function App() {
  const [viewAdmin, setViewAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Feedback Collector</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setViewAdmin((prev) => !prev)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {viewAdmin ? "Submit Feedback" : "View Submitted Feedback"}
          </button>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main className="p-6">
        {viewAdmin ? <Admin /> : <FeedbackForm />}
      </main>

      <footer className="text-center p-4 mt-10 border-t border-gray-300 dark:border-gray-700">
        © 2025 Yasaswini – Fallon Studio Task Submission
      </footer>
    </div>
  );
}

export default App;
