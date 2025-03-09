"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SparkEffectProps {
  x: number
  y: number
}

export default function SparkEffect({ x, y }: SparkEffectProps) {
  const [sparks, setSparks] = useState<{ angle: number; hue: number }[]>([])

  useEffect(() => {
    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      angle: i * 45,
      hue: Math.random() * 360,
    }))
    setSparks(newSparks)
  }, [x, y])

  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: x, top: y }}>
      {sparks.map((spark, index) => (
        <motion.div
          key={index}
          className="absolute w-0.5 h-5 origin-bottom"
          style={{
            rotate: `${spark.angle}deg`,
            backgroundColor: `hsl(${spark.hue}, 100%, 50%)`,
            filter: `drop-shadow(0 0 5px hsl(${spark.hue}, 100%, 50%))`,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

