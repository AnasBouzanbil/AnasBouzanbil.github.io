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
import GSAPHeader from "@/components/gsap-header"
import EducationTimeline from "@/components/education-timeline"
import AIChat from "@/components/ai-chat"
import EnhancedHero from "@/components/enhanced-hero"
import type { ProjectDetails } from "@/components/project-modal"
import EnhancedSkillsSection from "@/components/enhanced-skills-section"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useTouchNavigation } from "@/hooks/use-touch-navigation"
import StickyHeader from "@/components/sticky-header"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0)
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

  const sections = ["home", "education", "skills", "projects", "contact"]

  // Handle section navigation with debounce
  const navigateToSection = (index: number) => {
    if (isNavigating || index < 0 || index >= sections.length || index === activeSection) return

    setIsNavigating(true)
    setActiveSection(index)

    // Reset navigation lock after animation completes
    setTimeout(() => {
      setIsNavigating(false)
    }, 800)
  }

  // Handle wheel events for desktop
  useEffect(() => {
    if (isMobile) return

    // const handleWheel = (e: WheelEvent) => {
    //   e.preventDefault()

    //   if (isNavigating) return

    //   if (e.deltaY > 50) {
    //     navigateToSection(activeSection + 1)
    //   } else if (e.deltaY < -50) {
    //     navigateToSection(activeSection - 1)
    //   }
    // }

    // window.addEventListener("wheel", handleWheel, { passive: false })
    // return () => window.removeEventListener("wheel", handleWheel)
  }, [activeSection, isNavigating, isMobile])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        navigateToSection(activeSection + 1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        navigateToSection(activeSection - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isNavigating])

  // Use touch navigation hook for mobile
  useTouchNavigation({
    onNext: () => navigateToSection(activeSection + 1),
    onPrev: () => navigateToSection(activeSection - 1),
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
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="lazyOnload" />

      <ScrollToTop />

      <StickyHeader sections={sections} activeSection={activeSection} onChange={navigateToSection} />

      {!isMobile && (
        <SectionIndicator count={sections.length} active={activeSection} onChange={navigateToSection} />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav sections={sections} activeSection={activeSection} onChange={navigateToSection} />
      )}

      <main className="fixed inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.section
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <EnhancedHero onNavigate={navigateToSection} />
            </motion.section>
          )}

          {/* Education Section */}
          {activeSection === 1 && (
            <motion.section
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center overflow-hidden mt-[50px]"
            >
              <div className="container mx-auto px-4 py-16 overflow-y-auto max-h-full custom-scrollbar mt-[50px] mb-[20px]">
                <motion.h2
                  className="text-5xl font-bold text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Education
                </motion.h2>

                <EducationTimeline />
              </div>
            </motion.section>
          )}

          {/* Skills Section */}
          {activeSection === 2 && (
            <motion.section
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center overflow-hidden mt-[50px]"
            >
              <EnhancedSkillsSection />
            </motion.section>
          )}

          {/* Projects Section */}
          {activeSection === 3 && (
            <motion.section
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full overflow-hidden mt-[50px]"
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <ProjectSection projects={projects} />
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {activeSection === 4 && (
            <motion.section
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center overflow-hidden"
            >
              <div className="container mx-auto px-4 py-16 overflow-y-auto max-h-full custom-scrollbar">
                <motion.h2
                  className="text-5xl font-bold text-center mb-16"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Contact
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
              onClick={() => navigateToSection(activeSection - 1)}
              aria-label="Previous section"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          )}

          {activeSection < sections.length - 1 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border shadow-lg"
              onClick={() => navigateToSection(activeSection + 1)}
              aria-label="Next section"
            >
              <ChevronDown className="h-5 w-5" />
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
              onClick={() => navigateToSection(index)}
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