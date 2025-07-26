"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface SectionIndicatorProps {
  count: number
  active: number
  onChange: (index: number) => void
  orientation?: "horizontal" | "vertical"
  completedSections?: number[]
}

export default function SectionIndicator({
  count,
  active,
  onChange,
  orientation = "horizontal",
  completedSections = [],
}: SectionIndicatorProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Don't render on mobile as we have a separate mobile indicator
  if (isMobile) return null

  const handleSectionClick = (index: number) => {
    // Only allow navigation to completed sections or the current section
    if (index <= active || completedSections.includes(index)) {
      onChange(index)
    }
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex gap-2",
        orientation === "horizontal"
          ? "bottom-8 left-1/2 -translate-x-1/2 flex-row"
          : "right-8 top-1/2 -translate-y-1/2 flex-col",
      )}
    >
      {Array.from({ length: count }).map((_, index) => {
        const isCompleted = completedSections.includes(index)
        const isAccessible = index <= active || isCompleted
        
        return (
          <motion.button
            key={index}
            className={cn(
              "rounded-full transition-all duration-300 relative",
              active === index 
                ? "bg-primary w-8 h-2" 
                : isCompleted 
                  ? "bg-green-500 w-2 h-2" 
                  : isAccessible 
                    ? "bg-muted hover:bg-primary/50 w-2 h-2" 
                    : "bg-muted/30 w-2 h-2 cursor-not-allowed",
              orientation === "vertical" && active === index ? "h-8 w-2" : orientation === "vertical" ? "h-2 w-2" : "",
            )}
            onClick={() => handleSectionClick(index)}
            whileHover={isAccessible ? { scale: 1.2 } : {}}
            whileTap={isAccessible ? { scale: 0.9 } : {}}
            aria-label={`Go to section ${index + 1}`}
            aria-current={active === index ? "true" : "false"}
            disabled={!isAccessible}
          >
            {isCompleted && active !== index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
