"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import NavigationIndicator from "@/components/navigation-indicator"
import { useReducedMotion } from "framer-motion"

interface Section {
  id: string
  title: string
  component: React.ReactNode
  color?: string
}

interface FullscreenNavigationProps {
  sections: Section[]
  initialSection?: number
}

export default function FullscreenNavigation({ sections, initialSection = 0 }: FullscreenNavigationProps) {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  // Check if the device is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Handle section change
  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length || isAnimating) return

    setIsAnimating(true)
    setIsTransitioning(true)
    setActiveSection(index)

    // Reset animation state after transition completes
    setTimeout(
      () => {
        setIsAnimating(false)
        setIsTransitioning(false)
      },
      prefersReducedMotion ? 100 : 800,
    )
  }

  // Navigation handlers
  const goNext = () => goToSection(activeSection + 1)
  const goPrev = () => goToSection(activeSection - 1)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          goNext()
          break
        case "ArrowLeft":
        case "ArrowUp":
          goPrev()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isAnimating])

  // Handle wheel events for desktop
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      // Always prevent default wheel behavior
      e.preventDefault()

      if (isAnimating) return

      // Only respond to significant wheel movements
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
          goNext()
        } else if (e.deltaY < 0) {
          goPrev()
        }
      }
    }

    const options = { passive: false }

    if (containerRef.current) {
      containerRef.current.addEventListener("wheel", handleWheel, options)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleWheel, options)
      }
    }
  }, [activeSection, isAnimating, isMobile])

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || isAnimating) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    // Detect swipe with a threshold
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    setTouchStart(null)
  }

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  // Determine animation direction
  const direction = useRef(0)
  useEffect(() => {
    direction.current = activeSection > initialSection ? 1 : -1
  }, [activeSection, initialSection])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation controls for desktop */}
      {!isMobile && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "fixed left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-opacity duration-300",
              activeSection === 0 ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
            onClick={goPrev}
            disabled={activeSection === 0 || isAnimating}
            aria-label="Previous section"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "fixed right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-opacity duration-300",
              activeSection === sections.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
            onClick={goNext}
            disabled={activeSection === sections.length - 1 || isAnimating}
            aria-label="Next section"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Section navigation indicators */}
      <NavigationIndicator
        count={sections.length}
        active={activeSection}
        onChange={goToSection}
        orientation={isMobile ? "vertical" : "horizontal"}
      />

      {/* Content sections */}
      <div className={cn("w-full h-full", isMobile ? "overflow-y-auto snap-y snap-mandatory" : "")}>
        {isMobile ? (
          // Mobile: Vertical scrolling with snap points
          <div className="h-full">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="w-full h-screen snap-start"
                style={{ backgroundColor: section.color }}
              >
                <div className="h-full overflow-auto">{section.component}</div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: Horizontal sliding sections
          <AnimatePresence initial={false} mode="wait" custom={direction.current}>
            <motion.div
              key={activeSection}
              custom={direction.current}
              variants={prefersReducedMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: sections[activeSection].color }}
            >
              {sections[activeSection].component}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Next section preview (desktop only) */}
      {!isMobile && activeSection < sections.length - 1 && (
        <div
          className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg cursor-pointer hover:bg-background transition-colors duration-300"
          onClick={goNext}
        >
          <span className="text-sm font-medium">Next: {sections[activeSection + 1].title}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
