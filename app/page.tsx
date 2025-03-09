"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, Send, MoonIcon, SunIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import SkillBar from "@/components/skill-bar"
import ProjectCard from "@/components/project-card"
import SectionIndicator from "@/components/section-indicator"
import CustomCursor from "@/components/custom-cursor"
import SparkEffect from "@/components/spark-effect"
import { useTheme } from "next-themes"
import Script from "next/script"

// Debounce function to delay execution
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0)
  const [sparkPosition, setSparkPosition] = useState({ x: 0, y: 0 })
  const [showSpark, setShowSpark] = useState(false)
  const { toast } = useToast()
  const [projectFilter, setProjectFilter] = useState("all")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)
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

  const debouncedSetActiveSection = useRef(
    debounce((index: number) => {
      setActiveSection(index)
    }, 500),
  ).current

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && activeSection < sections.length - 1) {
        debouncedSetActiveSection(activeSection + 1)
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        debouncedSetActiveSection(activeSection - 1)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      const scrollableContainer = target.closest(".section-content")

      if (scrollableContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContainer
        const isAtTop = scrollTop === 0
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
          if (e.deltaY > 0 && activeSection < sections.length - 1) {
            debouncedSetActiveSection(activeSection + 1)
          } else if (e.deltaY < 0 && activeSection > 0) {
            debouncedSetActiveSection(activeSection - 1)
          }
        }
        return
      }

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        debouncedSetActiveSection(activeSection + 1)
      } else if (e.deltaY < 0 && activeSection > 0) {
        debouncedSetActiveSection(activeSection - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeSection, sections.length, debouncedSetActiveSection])

  const handleClick = (e: React.MouseEvent) => {
    setSparkPosition({ x: e.clientX, y: e.clientY })
    setShowSpark(true)
    setTimeout(() => setShowSpark(false), 1000)
  }

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
          setActiveSection(0);
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

  const languages = [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Python", level: 60 },
    { name: "C", level: 95 },
    { name: "C++", level: 95 },
    { name: "Java", level: 30 },
    { name: "Dart", level: 50 },
  ]

  const frameworks = [
    { name: "React", level: 70 },
    { name: "Next.js", level: 70 },
    { name: "NestJS", level: 75 },
    { name: "Express.js", level: 85 },
    { name: "Flutter", level: 85 },
    { name: "React Native", level: 60 },
  ]

  const technologies = [
    { name: "WebRTC", level: 80 },
    { name: "Docker", level: 75 },
    { name: "Git", level: 80 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 80 },
  ]

  const projects = [
    {
      title: "Azkar App",
      description: "Mobile application providing Azkar, hadith, and Adhan reminders for Muslim users.",
      link: "https://github.com/AnasBouzanbil/Mobile_Training/tree/main/Flutter/Apps/azkar",
      type: "mobile",
    },
    {
      title: "Talk App",
      description: "Anonymous chat platform enabling random conversations between users.",
      link: "https://appetize.io/app/android/com.example.talk?device=pixel4xl&osVersion=12.0",
      type: "mobile",
    },
    {
      title: "TalkAi",
      description:
        "AI chatbot assistant designed to provide helpful responses and facilitate smooth conversations for users.",
      link: "https://github.com/AnasBouzanbil/Mobile_Training/tree/main/Flutter/Apps/ai_chat",
      type: "mobile",
    },
    {
      title: "NumeroLogic",
      description: "A series of a number where you can think to find the pattern.",
      link: "https://appetize.io/app/b_gst2dqncaisfurkajwhfnqohwu",
      type: "mobile",
    },
    {
      title: "ChessCheat",
      description: "Chess AI assistant for chess players, providing the best move for the current position.",
      link: "http://chesscheat.zapto.org/",
      type: "web",
    },
    {
      title: "Matching",
      description: "Dating platform matching users based on shared interests and hobbies.",
      link: "https://github.com/AnasBouzanbil/Matcha",
      type: "web",
    },
    {
      title: "Paddle Pro",
      description: "Platform connecting paddle players with integrated chat and match features.",
      link: "https://github.com/AnasBouzanbil/JS_TS_Projects/tree/main/PaddlePro",
      type: "web",
    },
    {
      title: "HeyTv!",
      description:
        "A platform that connects users to random people worldwide, offering an experience similar to Omegle.",
      link: "https://heytv.sytes.net/",
      type: "web",
    },
    {
      title: "HttpServer",
      description: "the creation of an HTTP server from scratch using C++ and C",
      link: "https://github.com/AnasBouzanbil/Cpp-/tree/main/HTTP_SERVER",
      type: "C++",
    },
  ]

  const handleSectionScroll = (e: React.WheelEvent) => {
    const target = e.currentTarget as HTMLElement

    const isAtTop = target.scrollTop === 0
    const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 5

    if (!(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
      e.stopPropagation()
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden" onClick={handleClick}>
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="lazyOnload" />

      <CustomCursor />
      {showSpark && <SparkEffect x={sparkPosition.x} y={sparkPosition.y} />}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent"
            onClick={() => setActiveSection(0)}
          >
            AB
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(index)}
                  className={cn(
                    "capitalize transition-colors",
                    activeSection === index
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section}
                </button>
              ))}
            </div>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      <SectionIndicator sections={sections.length} activeSection={activeSection} onChange={setActiveSection} />

      <main className="pt-16">
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center"
            >
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-primary mb-2"
                    >
                      Hello, I'm
                    </motion.h3>
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-6xl font-bold mb-2"
                    >
                      Anas <span className="text-primary">Bouzanbil</span>
                    </motion.h1>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-primary mb-4"
                    >
                      Mobile & Web Developer
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-muted-foreground mb-6"
                    >
                      I can do anything for fun, or money.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex space-x-4"
                    >
                      <Link href="https://medium.com/@Elhazin" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" aria-label="Medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                          >
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                          </svg>
                        </Button>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/anas-bouzanbil/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="https://github.com/AnasBouzanbil" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" aria-label="GitHub">
                          <GitHub className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="mailto:protected-email@example.com">
                        <Button variant="outline" size="icon" aria-label="Email">
                          <Mail className="h-5 w-5" />
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-8"
                    >
                      <Button onClick={() => setActiveSection(4)} className="group">
                        Contact Me
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="order-1 md:order-2 flex justify-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-full blur-3xl opacity-50"></div>
                      <Image
                        src="https://media.licdn.com/dms/image/v2/D4E03AQH2vJ9qVTrFAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730035143280?e=1747267200&v=beta&t=uLJ4i5--eRj5KsRs0obJw7-fbJpWESYRW1GAdVWTaGk"
                        alt="Anas Bouzanbil"
                        width={400}
                        height={400}
                        className="rounded-full border-4 border-primary/50 shadow-xl transition-all duration-500 hover:scale-105 hover:border-primary"
                        id="profile-image"
                      />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-muted-foreground mb-2">Scroll down</span>
                  <ChevronDown className="animate-bounce h-6 w-6 text-primary" />
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Education Section */}
          {activeSection === 1 && (
            <motion.section
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center"
            >
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-16">Education</h2>
                <div className="max-w-3xl mx-auto space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">1337 School</h3>
                        <div className="text-primary mb-3">2022 - Present</div>
                        <p className="text-muted-foreground">
                          Currently studying software engineering and enhancing programming skills through practical
                          projects and peer learning.
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <Link href="https://1337.ma/" target="_blank" rel="noopener noreferrer">
                          <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjDUu5Cugm9VpGLWK5FN-c6zwi9Y1x8DZGA&s"
                            alt="1337 School"
                            width={120}
                            height={120}
                            className="rounded-lg hover:scale-110 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">Al Cadi Ayyad University</h3>
                        <div className="text-primary mb-3">2020 - 2022</div>
                        <p className="text-muted-foreground">Student at Al Cadi Ayyad University, Marrakesh.</p>
                      </div>
                      <div className="hidden md:block">
                        <Link href="https://www.uca.ma/fr" target="_blank" rel="noopener noreferrer">
                          <Image
                            src="https://bghit-nekhdem.com/wp-content/uploads/2023/04/cadi-ayyad.png"
                            alt="Al Cadi Ayyad University"
                            width={120}
                            height={120}
                            className="rounded-lg hover:scale-110 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Skills Section */}
          {activeSection === 2 && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center"
            >
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-16">Skills</h2>
                <div className="max-w-5xl mx-auto">
                  <Tabs defaultValue="languages" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="languages">Languages</TabsTrigger>
                      <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                      <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    </TabsList>
                    <div className="section-content custom-scrollbar" onWheel={handleSectionScroll}>
                      <TabsContent value="languages" className="space-y-6">
                        {languages.map((skill, index) => (
                          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
                        ))}
                      </TabsContent>
                      <TabsContent value="frameworks" className="space-y-6">
                        {frameworks.map((skill, index) => (
                          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
                        ))}
                      </TabsContent>
                      <TabsContent value="technologies" className="space-y-6">
                        {technologies.map((skill, index) => (
                          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
                        ))}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </motion.section>
          )}

          {/* Projects Section */}
          {activeSection === 3 && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
                <div className="max-w-6xl mx-auto">
                  <Tabs defaultValue="all" className="w-full mb-8" onValueChange={(value) => setProjectFilter(value)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="web">Web</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="section-content custom-scrollbar" onWheel={handleSectionScroll}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                      {projects
                        .filter((project) => projectFilter === "all" || project.type === projectFilter)
                        .map((project, index) => (
                          <ProjectCard
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            link={project.link}
                            type={project.type}
                            delay={index * 0.1}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {activeSection === 4 && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center"
            >
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-16">Contact</h2>
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="h-[400px] rounded-xl overflow-hidden border border-border"
                    >
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
                      <Card className="bg-card/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="contactForm">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <Input
                                  type="text"
                                  name="fullname"
                                  placeholder="Full name"
                                  required
                                  className="bg-background/50"
                                />
                              </div>
                              <div>
                                <Input
                                  type="email"
                                  name="email"
                                  placeholder="Email address"
                                  required
                                  className="bg-background/50"
                                />
                              </div>
                            </div>
                            <div>
                              <Textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                className="min-h-[120px] bg-background/50"
                              />
                            </div>
                            <Button type="submit" className="w-full group">
                              <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              Send Message
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
    </div>
  )
}

