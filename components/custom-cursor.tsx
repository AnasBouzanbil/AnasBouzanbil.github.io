"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  theme: string;  // Use `string` instead of `String`
}

export default function CustomCursor({ theme }: CustomCursorProps) { 
  // alert(theme)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.id === "profile-image" || // Added check for your specific image
        target.classList.contains("img") || // Added check for elements with the "img" class
        target.closest("button") !== null ||
        target.closest("a") !== null
      )
    }

    window.addEventListener("mousemove", updatePosition)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          backgroundColor: isPointer ? "transparent" : theme === "light" ? "black" : "white",
          border: isPointer ? "2px solid white" : "none",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9998] opacity-20 dark:opacity-30"
        animate={{
          x: position.x - 80,
          y: position.y - 80,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
          mass: 1,
        }}
        style={{
          background: theme === "dark" ? "radial-gradient(circle, rgba(255, 255, 255, 5) 40%, rgba(255, 255, 255, 0) 70%)" :  "radial-gradient(circle, rgba(249, 0, 77, 0.3) 20%, rgba(249, 0, 77, 0) 70%)",
        }}
      />
    </>
  )
}

