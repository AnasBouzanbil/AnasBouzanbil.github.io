"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import SectionIndicator from "@/components/section-indicator"
import { useTheme } from "next-themes"
import Script from "next/script"
import ProjectSection from "@/components/project-section"
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
      title: "Azkar App",
      description: "Mobile application providing Azkar, hadith, and Adhan reminders for Muslim users.",
      type: "mobile",
      technologies: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/AnasBouzanbil/Mobile_Training/tree/main/Flutter/Apps/azkar",
      image: "/placeholder.svg?height=300&width=600",
      date: "2022",
    },
    {
      title: "Talk App",
      description: "Anonymous chat platform enabling random conversations between users.",
      link: "https://appetize.io/app/android/com.example.talk?device=pixel4xl&osVersion=12.0",
      type: "mobile",
      technologies: ["Flutter", "Firebase", "WebRTC"],
      github: "https://github.com/AnasBouzanbil/Mobile_Training",
      image: "/placeholder.svg?height=300&width=600",
      date: "2022",
    },
    {
      title: "TalkAi",
      description:
        "AI chatbot assistant designed to provide helpful responses and facilitate smooth conversations for users.",
      type: "mobile",
      technologies: ["Flutter", "OpenAI API", "Firebase"],
      github: "https://github.com/AnasBouzanbil/Mobile_Training/tree/main/Flutter/Apps/ai_chat",
      image: "/placeholder.svg?height=300&width=600",
      date: "2023",
    },
    {
      title: "NumeroLogic",
      description: "A series of a number where you can think to find the pattern.",
      link: "https://appetize.io/app/b_gst2dqncaisfurkajwhfnqohwu",
      type: "mobile",
      technologies: ["Flutter", "Dart", "Algorithm Design"],
      image: "/placeholder.svg?height=300&width=600",
      date: "2022",
    },
    {
      title: "ChessCheat",
      description: "Chess AI assistant for chess players, providing the best move for the current position.",
      link: "http://chesscheat.zapto.org/",
      type: "web",
      technologies: ["JavaScript", "React", "Chess.js", "Stockfish"],
      image: "/placeholder.svg?height=300&width=600",
      date: "2021",
    },
    {
      title: "Matching",
      description: "Dating platform matching users based on shared interests and hobbies.",
      type: "web",
      technologies: ["React", "Node.js", "Express", "PostgreSQL"],
      github: "https://github.com/AnasBouzanbil/Matcha",
      image: "/placeholder.svg?height=300&width=600",
      date: "2021",
    },
    {
      title: "Paddle Pro",
      description: "Platform connecting paddle players with integrated chat and match features.",
      type: "web",
      technologies: ["TypeScript", "React", "Node.js", "Socket.io"],
      github: "https://github.com/AnasBouzanbil/JS_TS_Projects/tree/main/PaddlePro",
      image: "/placeholder.svg?height=300&width=600",
      date: "2022",
    },
    {
      title: "HeyTv!",
      description:
        "A platform that connects users to random people worldwide, offering an experience similar to Omegle.",
      link: "https://heytv.sytes.net/",
      type: "web",
      technologies: ["JavaScript", "WebRTC", "Socket.io", "Node.js"],
      image: "/placeholder.svg?height=300&width=600",
      date: "2021",
    },
    {
      title: "HttpServer",
      description: "The creation of an HTTP server from scratch using C++ and C",
      type: "C++",
      technologies: ["C++", "C", "Networking", "HTTP Protocol"],
      github: "https://github.com/AnasBouzanbil/Cpp-/tree/main/HTTP_SERVER",
      image: "/placeholder.svg?height=300&width=600",
      date: "2020",
    },
  ]

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
              data-section="3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="w-full h-full overflow-hidden mt-[50px]"
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <ProjectSection projects={projects} />
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {activeSection === 3 && (
            <motion.section
              key="contact"
              data-section="4"
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

      {/* AI Chat Component */}
      <AIChat />
    </div>
  )
}