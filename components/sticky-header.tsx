"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import ThemeToggle from "./theme-toggle"
import MobileNav from "./mobile-nav"
import Logo from "./logo"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyHeaderProps {
  sections: string[]
  activeSection: number
  onChange: (index: number) => void
}

export default function StickyHeader({ sections, activeSection, onChange }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [showChatButton, setShowChatButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Show chat button in header only on mobile
  useEffect(() => {
    const checkMobile = () => {
      setShowChatButton(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-2" : "bg-transparent py-4",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Logo onClick={() => onChange(0)} />

        <div className="flex items-center gap-6">
          <div className="hidden md:flex space-x-6">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => onChange(index)}
                className={cn(
                  "capitalize transition-colors relative",
                  activeSection === index ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
                {activeSection === index && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <ThemeToggle />
          {showChatButton && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                // This will be handled by the AI Chat component's own toggle
                const chatButton = document.querySelector(".ai-chat-toggle") as HTMLButtonElement
                if (chatButton) chatButton.click()
              }}
              aria-label="Chat with Anas's AI"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          )}
          <MobileNav sections={sections} activeSection={activeSection} onChange={onChange} />
        </div>
      </div>
    </motion.header>
  )
}
