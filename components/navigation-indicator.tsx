"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationIndicatorProps {
  count: number
  active: number
  onChange: (index: number) => void
  orientation?: "horizontal" | "vertical"
}

export default function NavigationIndicator({
  count,
  active,
  onChange,
  orientation = "horizontal",
}: NavigationIndicatorProps) {
  return (
    <div
      className={cn(
        "fixed z-50 flex gap-2",
        orientation === "horizontal"
          ? "bottom-8 left-1/2 -translate-x-1/2 flex-row"
          : "right-8 top-1/2 -translate-y-1/2 flex-col",
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.button
          key={index}
          className={cn(
            "rounded-full transition-all duration-300 relative",
            active === index ? "bg-primary w-8 h-2" : "bg-muted hover:bg-primary/50 w-2 h-2",
            orientation === "vertical" && active === index ? "h-8 w-2" : orientation === "vertical" ? "h-2 w-2" : "",
          )}
          onClick={() => onChange(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to section ${index + 1}`}
          aria-current={active === index ? "true" : "false"}
        />
      ))}
    </div>
  )
}
