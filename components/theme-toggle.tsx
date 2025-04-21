"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute top-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>

      <motion.div
        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
        initial={false}
        animate={{
          scale: theme === "dark" ? 1.5 : 0,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </Button>
  )
}
