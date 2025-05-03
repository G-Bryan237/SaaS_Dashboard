"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeProviderContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => {
      try {
        // Try to get the theme from localStorage
        if (typeof localStorage !== 'undefined') {
          const storedTheme = localStorage.getItem(storageKey);
          if (storedTheme) {
            return storedTheme as Theme;
          }
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
      return defaultTheme;
    }
  );

  // Apply theme immediately when it changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    if (disableTransitionOnChange) {
      root.classList.add('disable-transitions');
      const timeout = setTimeout(() => {
        root.classList.remove('disable-transitions');
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [disableTransitionOnChange]);

  // Apply theme effect
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both theme classes
    root.classList.remove("light", "dark");

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      console.log("Applied system theme:", systemTheme);
    } else {
      root.classList.add(theme);
      console.log("Applied theme:", theme);
    }
  }, [theme, enableSystem]);

  // Sync theme with localStorage
  const setThemeAndStore = React.useCallback((newTheme: Theme) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
    setTheme(newTheme);
    console.log("Theme set to:", newTheme);
  }, [storageKey]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: setThemeAndStore,
    }),
    [theme, setThemeAndStore]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
