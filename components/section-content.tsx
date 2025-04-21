"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionContentProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  align?: "left" | "center" | "right"
}

export default function SectionContent({
  title,
  subtitle,
  children,
  className,
  align = "center",
}: SectionContentProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col p-8 md:p-16",
        align === "center" && "items-center justify-center text-center",
        align === "left" && "items-start justify-center text-left",
        align === "right" && "items-end justify-center text-right",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-primary mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
