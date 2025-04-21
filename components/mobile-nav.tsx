"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  sections: string[]
  activeSection: number
  onChange: (index: number) => void
}

export default function MobileNav({ sections, activeSection, onChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavClick = (index: number) => {
    onChange(index)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 relative"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-foreground"
        />
        <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-foreground" />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-foreground"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.nav className="flex flex-col items-center space-y-6 p-8">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => handleNavClick(index)}
                  className={cn(
                    "text-2xl capitalize transition-colors relative py-2",
                    activeSection === index ? "text-primary font-medium" : "text-muted-foreground",
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
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
