"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface LogoProps {
  onClick?: () => void
  size?: number
  showAccent?: boolean
}

export default function AnasLogo({ onClick, size = 40, showAccent = true }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDark = mounted && theme === "dark"
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          delay: custom * 0.2,
          duration: 1.2, 
          ease: "easeInOut" 
        },
        opacity: { 
          delay: custom * 0.2, 
          duration: 0.8 
        }
      },
    }),
  }
  
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const logoColors = {
    textStroke: isDark ? "#ffffff" : "#000000",
    accentStroke: "url(#gradient)",
    circleFill: isDark ? "rgba(255, 0, 85, 0.12)" : "rgba(255, 0, 85, 0.07)",
  }
  
  return (
    <motion.div 
      className="cursor-pointer" 
      onClick={onClick} 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Anas Logo"
      >
        {/* Background circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          fill={logoColors.circleFill}
        />
        
        {/* A */}
        <motion.path
          d="M20 75L35 25L50 75M27 55H43"
          stroke={logoColors.textStroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        />
        
        {/* n */}
        <motion.path
          d="M55 55V35C55 32 58 30 60 30C62 30 65 32 65 35V55"
          stroke={logoColors.textStroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          custom={1}
          initial="hidden"
          animate="visible"
        />
        
        {/* a */}
        <motion.path
          d="M70 43C70 40 73 38 76 38C79 38 82 40 82 43V55M70 48C70 45 73 43 76 43C79 43 82 45 82 48"
          stroke={logoColors.textStroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          custom={2}
          initial="hidden"
          animate="visible"
        />
        
        {/* s */}
        <motion.path
          d="M85 45C83 43 87 40 90 40C93 40 95 42 93 44C91 46 87 46 85 48C83 50 87 53 90 52"
          stroke={logoColors.textStroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          custom={3}
          initial="hidden"
          animate="visible"
        />
        
        {/* Accent line */}
        {showAccent && (
          <motion.path
            d="M10 50H18"
            stroke={logoColors.accentStroke}
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariants}
            custom={4}
            initial="hidden"
            animate="visible"
          />
        )}
        
        {/* Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0055" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
