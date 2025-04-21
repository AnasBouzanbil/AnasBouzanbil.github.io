"use client"

import { useState, useEffect, useCallback } from "react"

interface UseTouchNavigationProps {
  onNext: () => void
  onPrev: () => void
  threshold?: number
  disabled?: boolean
}

export function useTouchNavigation({ onNext, onPrev, threshold = 50, disabled = false }: UseTouchNavigationProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled) return
      setTouchStart(e.targetTouches[0].clientY)
      setIsSwiping(true)
    },
    [disabled],
  )

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (disabled || !isSwiping) return
      setTouchEnd(e.targetTouches[0].clientY)
    },
    [disabled, isSwiping],
  )

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (disabled || !isSwiping || touchStart === null || touchEnd === null) {
      setIsSwiping(false)
      return
    }

    const distance = touchStart - touchEnd
    const isSignificantMovement = Math.abs(distance) > threshold

    if (isSignificantMovement) {
      if (distance > 0) {
        // Swiped up, go to next section
        onNext()
      } else {
        // Swiped down, go to previous section
        onPrev()
      }
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
    setIsSwiping(false)
  }, [disabled, isSwiping, onNext, onPrev, touchEnd, touchStart, threshold])

  useEffect(() => {
    if (disabled) return

    // Add event listeners
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("touchend", handleTouchEnd)

    // Clean up
    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [disabled, handleTouchEnd, handleTouchMove, handleTouchStart])

  return { isSwiping }
}
