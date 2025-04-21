"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Calendar, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Update the ProjectDetails interface to make certain fields optional
export interface ProjectDetails {
  title: string
  description: string
  link?: string
  type: string
  image?: string
  technologies?: string[]
  github?: string
  date?: string
}

interface ProjectModalProps {
  project: ProjectDetails | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Track touch start position for mobile scrolling
  const touchStartY = useRef<number | null>(null)

  // Handle touch events to prevent background scrolling on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return

    const touchY = e.touches[0].clientY
    const element = e.currentTarget
    const { scrollTop, scrollHeight, clientHeight } = element

    // Determine scroll direction
    const isScrollingUp = touchY > touchStartY.current

    // Check if we're at the boundaries
    const isAtTop = scrollTop === 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight

    // Prevent default only when trying to scroll beyond boundaries
    if ((isAtTop && isScrollingUp) || (isAtBottom && !isScrollingUp)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    setIsMounted(true)

    // Store the original body overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (project) {
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = "hidden"

      // Add a class to indicate modal is open (useful for other styling if needed)
      document.body.classList.add("modal-open")
    }

    return () => {
      // Restore original overflow style
      document.body.style.overflow = originalStyle
      document.body.classList.remove("modal-open")
    }
  }, [project])

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [project, onClose])

  if (!project || !isMounted) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
        onClick={handleBackdropClick}
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-card border border-border rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden project-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-border sticky top-0 bg-card z-10">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar p-6"
            onWheel={(e) => {
              // Always prevent section navigation
              e.stopPropagation()
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="capitalize">
                {project.type}
              </Badge>
              {project.date && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.date}
                </Badge>
              )}
              {project.technologies?.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Remove the role, challenges, and outcomes sections from the modal content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>Description</span>
                  <div className="h-px flex-1 bg-border"></div>
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              {project.technologies && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>Technologies</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="px-3 py-1">
                        <Code className="h-3 w-3 mr-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Update the modal content to conditionally render buttons and remove unwanted sections */}
          <div className="flex justify-end gap-3 p-4 border-t border-border sticky bottom-0 bg-card">
            {project.github && (
              <Button variant="outline" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.link && (
              <Button asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Project
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
