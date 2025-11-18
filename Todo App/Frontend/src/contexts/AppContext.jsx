import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  // Theme State (load from localStorage)
  const [light, setLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  // Modal visibility state
  const [view, setView] = useState(false);
  const toggleView = () => setView((prev) => !prev);

  // Toggle theme
  const toggleTheme = () => {
    setLight((prev) => {
      const updated = !prev;
      localStorage.setItem("theme", updated ? "light" : "dark");
      return updated;
    });
  };

  // Sync theme changes to localStorage
  useEffect(() => {
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <AppContext.Provider value={{ light, view, toggleView, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
