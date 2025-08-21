"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ChevronDown, ChevronUp, Github, ExternalLink, Calendar, Code, Smartphone, Monitor, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import SectionIndicator from "@/components/section-indicator"
import { useTheme } from "next-themes"
import Script from "next/script"
import ProjectsShowcase from "@/components/projects-showcase"
import ScrollToTop from "@/components/scroll-to-top"
import EducationTimeline from "@/components/education-timeline"
import AIChat from "@/components/ai-chat"
import EnhancedHero from "@/components/enhanced-hero"
import type { ProjectDetails } from "@/components/project-modal"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useTouchNavigation } from "@/hooks/use-touch-navigation"
import StickyHeader from "@/components/sticky-header"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0)
  const [navigationMode, setNavigationMode] = useState<'section' | 'scroll'>('section')
  const [sectionCompleted, setSectionCompleted] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Projects state
  const [activeProject, setActiveProject] = useState(0)
  const [isProjectHovered, setIsProjectHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.emailjs && !isEmailJSReady) {
      window.emailjs.init({
        publicKey: "kc3e4_a8EsRdyRu6D",
      })
      setIsEmailJSReady(true)
    }
  }, [isEmailJSReady])

  // Check if current section is completed
  useEffect(() => {
    const checkSectionCompletion = () => {
      const currentSection = document.querySelector(`[data-section="${activeSection}"]`)
      if (currentSection) {
        const scrollableContent = currentSection.querySelector('.custom-scrollbar, .overflow-y-auto')
        if (scrollableContent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableContent as HTMLElement
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
          setSectionCompleted(isAtBottom)
        } else {
          // If no scrollable content, section is always completed
          setSectionCompleted(true)
        }
      }
    }

    // Check on mount and scroll
    checkSectionCompletion()
    
    const currentSection = document.querySelector(`[data-section="${activeSection}"]`)
    if (currentSection) {
      const scrollableContent = currentSection.querySelector('.custom-scrollbar, .overflow-y-auto')
      if (scrollableContent) {
        scrollableContent.addEventListener('scroll', checkSectionCompletion)
        return () => scrollableContent.removeEventListener('scroll', checkSectionCompletion)
      }
    }
  }, [activeSection])

  const sections = ["home", "education", "projects", "contact"]

  // Enhanced scroll method with smooth transitions
  const smoothScrollToSection = (index: number) => {
    if (isNavigating || index < 0 || index >= sections.length || index === activeSection) return

    // Check if user has completely finished the current section content
    const currentSection = document.querySelector(`[data-section="${activeSection}"]`)
    if (currentSection) {
      const scrollableContent = currentSection.querySelector('.custom-scrollbar, .overflow-y-auto')
      if (scrollableContent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContent as HTMLElement
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5 // 5px tolerance
        
        // If not at bottom and trying to go to next section, prevent navigation
        if (index > activeSection && !isAtBottom) {
          // Show a more prominent hint to scroll down with artistic animation
          const hint = document.createElement('div')
          hint.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-pink-500 text-white px-6 py-3 rounded-xl text-sm font-medium z-50 shadow-2xl backdrop-blur-sm border border-white/20'
          hint.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="relative">
                <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <div class="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping"></div>
              </div>
              <span class="font-semibold">Scroll to navigate</span>
            </div>
          `
          document.body.appendChild(hint)
          
          // Add floating particles around the hint
          for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div')
            particle.className = `absolute w-2 h-2 bg-white/60 rounded-full animate-pulse`
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.animationDelay = `${i * 0.5}s`
            hint.appendChild(particle)
          }
          
          setTimeout(() => {
            if (document.body.contains(hint)) {
              document.body.removeChild(hint)
            }
          }, 4000)
          return
        }
      }
    }

    setIsNavigating(true)
    
    // Add artistic transition effect
    const transitionOverlay = document.createElement('div')
    transitionOverlay.className = 'fixed inset-0 bg-gradient-to-br from-primary/20 via-pink-500/20 to-purple-500/20 z-40 pointer-events-none'
    transitionOverlay.style.backdropFilter = 'blur(10px)'
    document.body.appendChild(transitionOverlay)
    
    // Animate the overlay
    const overlayAnimation = transitionOverlay.animate([
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(1.2)' }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    })
    
    overlayAnimation.onfinish = () => {
      document.body.removeChild(transitionOverlay)
    }
    
    setActiveSection(index)

    // Reset navigation lock after animation completes
    setTimeout(() => {
      setIsNavigating(false)
    }, 1200) // Increased duration for artistic transitions
  }

  // Add navigation mode toggle
  const toggleNavigationMode = () => {
    setNavigationMode(prev => prev === 'section' ? 'scroll' : 'section')
  }

  // Disable wheel navigation - users must use buttons or keyboard
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if trying to navigate sections
      if (isNavigating) {
        e.preventDefault()
        return
      }
      
      // Allow normal scrolling within sections
      const currentSection = document.querySelector(`[data-section="${activeSection}"]`)
      if (currentSection) {
        const scrollableContent = currentSection.querySelector('.custom-scrollbar, .overflow-y-auto')
        if (scrollableContent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableContent as HTMLElement
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
          const isAtTop = scrollTop <= 5
          
          // Only prevent wheel navigation if at boundaries and trying to go beyond
          if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeSection, isNavigating, isMobile])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        smoothScrollToSection(activeSection + 1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        smoothScrollToSection(activeSection - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isNavigating])

  // Use touch navigation hook for mobile
  useTouchNavigation({
    onNext: () => smoothScrollToSection(activeSection + 1),
    onPrev: () => smoothScrollToSection(activeSection - 1),
    disabled: isNavigating || !isMobile,
    threshold: 70,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== "undefined" && window.emailjs && formRef.current) {
      window.emailjs.sendForm("service_2pqx0u1", "template_my2xqif", formRef.current, "kc3e4_a8EsRdyRu6D").then(
        () => {
          toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
          })
          if (formRef.current) {
            formRef.current.reset()
          }
          setActiveSection(0)
        },
        (error) => {
          toast({
            title: "Failed to send message",
            description: "Please try again later.",
            variant: "destructive",
          })
          console.error("EmailJS Error:", error)
        },
      )
    } else {
      toast({
        title: "EmailJS not loaded",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  // Enhanced project data with more details
  const projects: ProjectDetails[] = [

    {
      title: "ChessCheat",
      description: "Chess AI assistant for chess players, providing the best move for the current position and also analyzing the game. with providing a extensive analysis of the game real time",
      link: "http://chesscheat.zapto.org/",
      type: "web",
      technologies: ["JavaScript", "React", "Chess.js", "Stockfish"],
      image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "Matching",
      description: "Dating platform matching users based on shared interests and hobbies.",
      type: "web",
      technologies: ["React", "Node.js", "Express", "PostgreSQL"],
      github: "https://github.com/AnasBouzanbil/Matcha",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "Paddle Pro",
      description: "Platform mimiking the Atari Pong game, connecting paddle players with integrated chat and match features.",
      type: "web",
      technologies: ["TypeScript", "React", "Node.js", "Socket.io"],
      github: "https://github.com/AnasBouzanbil/JS_TS_Projects/tree/main/PaddlePro",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "HeyTv!",
      description:
        "A platform that connects users to random people worldwide, offering an experience similar to Omegle",
      link: "https://heytv.sytes.net/",
      type: "web",
      technologies: ["JavaScript", "WebRTC", "Socket.io", "Node.js"],
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "HttpServer",
      description: "The creation of an HTTP server mimicking the functionality of Nginx from scratch using C++ and C",
      type: "C++",
      technologies: ["C++", "C", "Networking", "HTTP Protocol"],
      github: "https://github.com/AnasBouzanbil/Cpp-/tree/main/HTTP_SERVER",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title:"MoneyFlow",
      description:"A web application that allows users to manage their finances and track their spending.",
      type:"MObile",
      technologies:["React Native"],
      image:"https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      date:"2025",

    }
  ]

  // Auto-rotate projects
  useEffect(() => {
    if (activeSection === 2 && !isProjectHovered) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [activeSection, isProjectHovered, projects.length])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />
      case 'web':
        return <Monitor className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile':
        return 'from-blue-500 to-cyan-500'
      case 'web':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-purple-500 to-indigo-500'
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden relative">
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="lazyOnload" />

      {/* Top section progress bar */}
      <motion.div
        key="top-progress-bar"
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-primary via-pink-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Artistic background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <ScrollToTop />

      <StickyHeader sections={sections} activeSection={activeSection} onChange={smoothScrollToSection} />

      {!isMobile && (
        <SectionIndicator 
          count={sections.length} 
          active={activeSection} 
          onChange={smoothScrollToSection}
          completedSections={sectionCompleted ? [activeSection] : []}
        />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav sections={sections} activeSection={activeSection} onChange={smoothScrollToSection} />
      )}

      <main className="fixed inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.section
              key="home"
              data-section="0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="w-full h-full"
            >
              <EnhancedHero onNavigate={smoothScrollToSection} />
            </motion.section>
          )}

          {/* Education Section */}
          {activeSection === 1 && (
            <motion.section
              key="education"
              data-section="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="w-full h-full overflow-y-auto education-scrollbar"
            >
              <div className="min-h-full relative">
                {/* Floating background elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    whileInView={{ scale: 1, opacity: 0.3, x: 50, y: -30 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 3,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    whileInView={{ scale: 1, opacity: 0.4, x: -40, y: 60 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 3.5,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-pink-500/3 rounded-full blur-3xl"
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2, rotate: 180 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 4,
                      ease: "easeOut",
                      delay: 1
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <EducationTimeline />
                </div>
              </div>
            </motion.section>
          )}

          {/* Projects Section */}
          {activeSection === 2 && (
            <motion.section
              key="projects"
              data-section="2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="w-full h-full overflow-hidden"
            >
              <div className="relative w-full h-full overflow-y-auto custom-scrollbar">
                {/* Floating background elements specific to projects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Dynamic particles based on project type */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={`project-particle-${i}`}
                      className={`absolute w-2 h-2 rounded-full ${
                        projects[activeProject]?.type === 'mobile' ? 'bg-blue-500/20' :
                        projects[activeProject]?.type === 'web' ? 'bg-green-500/20' : 'bg-purple-500/20'
                      }`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -150, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 360, 0],
                      }}
                      transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Dynamic gradient orbs */}
                  <motion.div
                    className={`absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'web')}/10 rounded-full blur-3xl`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.6, 0.2],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'mobile')}/15 rounded-full blur-3xl`}
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.7, 0.3],
                      x: [0, -60, 0],
                      y: [0, 40, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </div>

                {/* Header */}
                <div className="relative z-20 pt-20 pb-8">
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.h2
                      className="text-5xl md:text-6xl font-bold mb-6"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Featured
                      </span>
                      <br />
                      <span className="text-foreground/90">Projects</span>
                    </motion.h2>
                    
                    <motion.p
                      className="text-lg text-muted-foreground max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      A collection of innovative solutions crafted with precision and creativity
                    </motion.p>

                    {/* Project type filter */}
                    <motion.div
                      className="flex justify-center gap-3 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {['all', 'web', 'mobile', 'C++'].map((type) => (
                        <button
                          key={type}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            type === 'all' 
                              ? 'bg-gradient-to-r from-primary to-pink-500 text-white shadow-lg' 
                              : 'bg-card/50 hover:bg-card text-muted-foreground hover:text-foreground border border-border/50'
                          }`}
                        >
                          {type === 'all' ? 'All Projects' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Main Project Showcase */}
                  <div className="container mx-auto px-4 mb-16">
                    <div className="relative max-w-6xl mx-auto">
                      {/* Central floating project card */}
                      <motion.div
                        key={`main-project-${activeProject}`}
                        className="relative"
                        onMouseEnter={() => setIsProjectHovered(true)}
                        onMouseLeave={() => setIsProjectHovered(false)}
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ 
                          duration: 1.2,
                          ease: [0.4, 0.0, 0.2, 1],
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        {/* Floating glow effect */}
                        <motion.div
                          className={`absolute -inset-4 bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'web')}/20 rounded-3xl blur-xl`}
                          animate={{
                            scale: isProjectHovered ? [1, 1.05, 1] : [1, 1.02, 1],
                            opacity: isProjectHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />

                        <motion.div
                          className="relative bg-card/70 backdrop-blur-xl rounded-2xl border border-border/20 overflow-hidden shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                          }}
                          whileHover={{
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02,
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                            {/* Project Image */}
                            <motion.div
                              className="relative overflow-hidden rounded-l-2xl"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            >
                              <div
                                className="w-full h-full bg-cover bg-center relative"
                                style={{
                                  backgroundImage: `url(${projects[activeProject]?.image})`,
                                  minHeight: '500px'
                                }}
                              >
                                {/* Overlay gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(projects[activeProject]?.type || 'web')}/30`} />
                                
                                {/* Floating tech icons */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div
                                    className="text-white/80 text-6xl"
                                    animate={{ 
                                      rotate: 360,
                                      scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                  >
                                    {getTypeIcon(projects[activeProject]?.type || 'web')}
                                  </motion.div>
                                </div>

                                {/* Project type badge */}
                                <div className="absolute top-6 left-6">
                                  <motion.div
                                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'web')} shadow-lg`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                  >
                                    <div className="flex items-center gap-1">
                                      {getTypeIcon(projects[activeProject]?.type || 'web')}
                                      <span>{projects[activeProject]?.type?.toUpperCase()}</span>
                                    </div>
                                  </motion.div>
                                </div>

                                {/* Date badge */}
                                <div className="absolute top-6 right-6">
                                  <motion.div
                                    className="px-3 py-1 rounded-full text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm border border-white/20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                  >
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    {projects[activeProject]?.date}
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>

                            {/* Project Details */}
                            <div className="p-8 flex flex-col justify-between">
                              <div>
                                <motion.h3
                                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  {projects[activeProject]?.title}
                                </motion.h3>

                                <motion.p
                                  className="text-muted-foreground mb-6 text-lg leading-relaxed"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  {projects[activeProject]?.description}
                                </motion.p>

                                {/* Technologies */}
                                <motion.div
                                  className="mb-8"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.7 }}
                                >
                                  <h4 className="text-sm font-semibold text-foreground/70 mb-3 flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    TECHNOLOGIES
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {Array.isArray(projects[activeProject]?.technologies) &&
                                      projects[activeProject]?.technologies.map((tech, index) => (
                                        <motion.span
                                          key={tech}
                                          className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'web')}/10 border border-${projects[activeProject]?.type === 'mobile' ? 'blue' : projects[activeProject]?.type === 'web' ? 'green' : 'purple'}-500/20 text-foreground/80`}
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          {tech}
                                        </motion.span>
                                      ))}
                                  </div>
                                </motion.div>
                              </div>

                              {/* Action Buttons */}
                              <motion.div
                                className="flex gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                              >
                                {projects[activeProject]?.link && (
                                  <motion.a
                                    href={projects[activeProject]?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 px-6 py-3 bg-gradient-to-r ${getTypeColor(projects[activeProject]?.type || 'web')} text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300`}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                  </motion.a>
                                )}
                                
                                {projects[activeProject]?.github && (
                                  <motion.a
                                    href={projects[activeProject]?.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-6 py-3 bg-card/50 hover:bg-card border border-border/50 hover:border-border rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Github className="w-4 h-4" />
                                    Code
                                  </motion.a>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Project Navigation Carousel */}
                      <motion.div
                        className="flex justify-center mt-16 gap-4 overflow-x-auto pb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        {projects.map((project, index) => (
                          <motion.button
                            key={`nav-${index}`}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                              activeProject === index 
                                ? `border-${project.type === 'mobile' ? 'blue' : project.type === 'web' ? 'green' : 'purple'}-500 shadow-lg scale-110` 
                                : 'border-border/30 hover:border-border scale-90 hover:scale-95'
                            }`}
                            onClick={() => setActiveProject(index)}
                            whileHover={{ 
                              y: -5,
                              scale: activeProject === index ? 1.15 : 1,
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <div
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${project.image})` }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${getTypeColor(project.type)}/20`} />
                            
                            {activeProject === index && (
                              <motion.div
                                className="absolute inset-0 border-2 border-white/50 rounded-xl"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}

                            {/* Project number indicator */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>

                      {/* Project stats */}
                      <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{projects.filter(p => p.type === 'mobile').length} Mobile Apps</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{projects.filter(p => p.type === 'web').length} Web Projects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>{projects.filter(p => p.type === 'C++').length} System Projects</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {activeSection === 3 && (
            <motion.section
              key="contact"
              data-section="3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="w-full h-full flex items-center overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8 overflow-y-auto max-h-full custom-scrollbar">
                <motion.h2
                  className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Let's Connect
                </motion.h2>
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="h-[400px] rounded-xl overflow-hidden border border-border relative group"
                    >
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6751.161886455712!2d-7.942607406133407!3d32.21552074561304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf7bde5eb73b2f%3A0x76ccb4e830ba305d!2sSTARTGATE!5e0!3m2!1sen!2sma!4v1720262758250!5m2!1sen!2sma"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "grayscale(1) invert(1)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                      ></iframe>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors duration-300">
                        <CardContent className="pt-6">
                          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="contactForm">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <Input
                                  type="text"
                                  name="fullname"
                                  placeholder="Full name"
                                  required
                                  className="bg-background/50 focus:border-primary transition-colors duration-300"
                                />
                              </div>
                              <div>
                                <Input
                                  type="email"
                                  name="email"
                                  placeholder="Email address"
                                  required
                                  className="bg-background/50 focus:border-primary transition-colors duration-300"
                                />
                              </div>
                            </div>
                            <div>
                              <Textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                className="min-h-[120px] bg-background/50 focus:border-primary transition-colors duration-300"
                              />
                            </div>
                            <Button type="submit" className="w-full group relative overflow-hidden">
                              <span className="relative z-10 flex items-center">
                                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                Send Message
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-primary to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile section navigation buttons */}
      {isMobile && (
        <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center gap-4">
          {activeSection > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border shadow-lg"
              onClick={() => smoothScrollToSection(activeSection - 1)}
              aria-label="Previous section"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          )}

          {activeSection < sections.length - 1 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-full border shadow-lg transition-all duration-300 ${
                sectionCompleted 
                  ? 'bg-primary text-white border-primary shadow-primary/25' 
                  : 'bg-card/80 backdrop-blur-sm border-border'
              }`}
              onClick={() => smoothScrollToSection(activeSection + 1)}
              disabled={!sectionCompleted}
              aria-label="Next section"
            >
              <ChevronDown className={`h-5 w-5 ${sectionCompleted ? 'animate-pulse' : ''}`} />
            </motion.button>
          )}
        </div>
      )}

      {/* Mobile section indicator dots */}
      {isMobile && (
        <div className="fixed bottom-28 left-0 right-0 z-40 flex justify-center gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSection === index ? "bg-primary w-6" : "bg-muted"
              }`}
              onClick={() => smoothScrollToSection(index)}
              aria-label={`Go to ${sections[index]} section`}
            />
          ))}
        </div>
      )}
      <AIChat />
    </div>
  )
}