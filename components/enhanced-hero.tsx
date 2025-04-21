"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, ExternalLink, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface EnhancedHeroProps {
  onNavigate: (index: number) => void
}

export default function EnhancedHero({ onNavigate }: EnhancedHeroProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const controls = useAnimation()

  // Slides for the hero section
  const slides = [
    {
      title: "Developer",
      color: "from-primary/20 to-pink-500/20",
      icon: <Code className="h-5 w-5" />,
      skills: ["Full-Stack", "Mobile", "Web", "C/C++"],
    },
    {
      title: "Creator",
      color: "from-blue-500/20 to-purple-500/20",
      icon: <Sparkles className="h-5 w-5" />,
      skills: [ "Innovation", "Problem Solving"],
    },
    {
      title: "Learner",
      color: "from-green-500/20 to-teal-500/20",
      icon: <ExternalLink className="h-5 w-5" />,
      skills: ["AI", "Machine Learning", "Data Science", "New Technologies"],
    },
  ]

  useEffect(() => {
    setMounted(true)

    // Auto-rotate slides
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Initialize and animate particles
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color =
          mounted && theme === "dark"
            ? `hsla(${Math.random() * 60 + 330}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`
            : `hsla(${Math.random() * 60 + 330}, 100%, 50%, ${Math.random() * 0.2 + 0.05})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections between particles
      ctx.strokeStyle = mounted && theme === "dark" ? "rgba(255, 0, 85, 0.05)" : "rgba(255, 0, 85, 0.03)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [mounted, theme])

  // Animate profile image on hover
  useEffect(() => {
    if (isHovering) {
      controls.start({
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 300, damping: 10 },
      })
    } else {
      controls.start({
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      })
    }
  }, [isHovering, controls])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated background */}
      <canvas ref={particlesRef} className="absolute inset-0 -z-10" aria-hidden="true" />

      {/* Main content */}
      <div className="relative h-full flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="order-2 md:order-1 z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-primary mb-2 font-mono"
              >
                Hello, I'm
              </motion.h3>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-2 tracking-tight"
              >
                Anas <span className="text-primary">Bouzanbil</span>
              </motion.h1>

              <div className="h-16 relative overflow-hidden my-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">{slides[activeSlide].icon}</div>
                      <h2 className="text-2xl md:text-3xl font-semibold">{slides[activeSlide].title}</h2>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {slides[activeSlide].skills.map((skill, index) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={cn(
                            "bg-background/50 backdrop-blur-sm",
                            index % 2 === 0 ? "border-primary/30" : "border-pink-500/30",
                          )}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-muted-foreground mb-6 max-w-md text-lg"
              >
                Passionate developer specializing in creating innovative web and mobile applications.<br></br><br></br> I can do anything
                for fun, or money.
              </motion.p>

              {/* Slide indicators */}
              <div className="flex gap-2 mb-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={cn("slide-indicator transition-all duration-300", activeSlide === index ? "active" : "")}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, staggerChildren: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                  <Link href="https://medium.com/@Elhazin" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Medium"
                      className="hover:scale-110 transition-transform"
                    >
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
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <Link href="https://www.linkedin.com/in/anas-bouzanbil/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="LinkedIn"
                      className="hover:scale-110 transition-transform"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                  <Link href="https://github.com/AnasBouzanbil" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="GitHub"
                      className="hover:scale-110 transition-transform"
                    >
                      <GitHub className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                  <Link href="mailto:protected-email@example.com">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Email"
                      className="hover:scale-110 transition-transform"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="ml-auto"
                >
                  <Button
                    onClick={() => onNavigate(4)}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Contact Me</span>
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform relative z-10" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column - Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="order-1 md:order-2 flex justify-center relative z-10"
            >
              <div className="hero-image-container">
                {/* Decorative ring */}
                <div className="hero-image-ring" />

                {/* Decorative badges */}
                <motion.div
                  className="hero-badge hero-badge-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                >
                  <Code className="h-5 w-5 text-primary" />
                </motion.div>

                <motion.div
                  className="hero-badge hero-badge-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, delay: 1 }}
                >
                  <Sparkles className="h-5 w-5 text-pink-500" />
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-full blur-3xl opacity-50 animate-pulse "></div>

                {/* Profile image */}
                <motion.div
                  animate={controls}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="relative rounded-full"
                >
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4E03AQH2vJ9qVTrFAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730035143280?e=1747267200&v=beta&t=uLJ4i5--eRj5KsRs0obJw7-fbJpWESYRW1GAdVWTaGk"
                    alt="Anas Bouzanbil"
                    width={400}
                    height={400}
                    className="rounded-full border-4 border-primary/50 shadow-xl transition-all duration-500 hover:border-primary object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        ></motion.div>
      </div>
    </div>
  )
}
