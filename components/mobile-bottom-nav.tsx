"use client"

import { motion } from "framer-motion"
import { Home, GraduationCap, Code, FolderOpen, Mail, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileBottomNavProps {
  sections: string[]
  activeSection: number
  onChange: (index: number) => void
}

export default function MobileBottomNav({ sections, activeSection, onChange }: MobileBottomNavProps) {
  const navIcons = [
    { icon: Home, label: "Home" },
    { icon: GraduationCap, label: "Education" },
    { icon: Code, label: "Skills" },
    { icon: FolderOpen, label: "Projects" },
    { icon: Mail, label: "Contact" },
  ]

  return (
    <>
      {/* Mobile Section Dots */}
      <div className="mobile-section-dots">
        {sections.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onChange(index)}
            className={cn(
              "mobile-section-dot",
              activeSection === index ? "active" : ""
            )}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Bottom Navigation */}
      <motion.div 
        className="mobile-bottom-nav"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mobile-bottom-nav-content">
          {navIcons.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === index
            
            return (
              <motion.button
                key={index}
                onClick={() => onChange(index)}
                className={cn(
                  "mobile-nav-item",
                  isActive ? "active" : ""
                )}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="mobile-nav-icon" />
                </motion.div>
                <span className="mobile-nav-label">{item.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Swipe Indicator */}
      <motion.div 
        className="mobile-swipe-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="swipe-arrows">
          <ChevronUp className="swipe-arrow" />
          <ChevronUp className="swipe-arrow" />
          <ChevronDown className="swipe-arrow" />
        </div>
        <span className="text-xs">Swipe to navigate</span>
      </motion.div>
    </>
  )
}
