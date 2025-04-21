"use client"

import { motion } from "framer-motion"

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{
            duration: 1,
            delay,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  )
}
