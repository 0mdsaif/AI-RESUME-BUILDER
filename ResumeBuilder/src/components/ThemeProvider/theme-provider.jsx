import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
}) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(storageKey)
    // Return dark theme if no theme is saved
    return savedTheme || defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    // Set dark theme by default
    if (!theme || theme === "system") {
      root.classList.add("dark")
      localStorage.setItem(storageKey, "dark")
      setTheme("dark")
      return
    }

    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}