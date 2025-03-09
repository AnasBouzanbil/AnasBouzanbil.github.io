"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionIndicatorProps {
  sections: number
  activeSection: number
  onChange: (index: number) => void
}

export default function SectionIndicator({ sections, activeSection, onChange }: SectionIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: sections }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onChange(index)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            activeSection === index ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50",
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

