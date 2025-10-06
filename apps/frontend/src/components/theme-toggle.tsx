"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "dark" ? "text-gray-400 scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "light" ? "text-gray-400 scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
    </button>
  )
}
