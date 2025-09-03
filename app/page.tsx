

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Send, Github, ExternalLink, Calendar, Code, Smartphone, Monitor, Layers, Mail, Linkedin, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import Script from "next/script"
import ScrollToTop from "@/components/scroll-to-top"
import type { ProjectDetails } from "@/components/project-modal"
import AIChat from "@/components/ai-chat"
import Text3DScene from "@/components/3d-text"
import FloatingBackground from "@/components/floating-background"

export default function Portfolio() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

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

  // GSAP Animations
  useEffect(() => {
    if (!mounted) return

    // Hero section animations
    const heroTl = gsap.timeline()
    
    // Animate the subtitle with typewriter effect
    const subtitle = heroRef.current?.querySelector('.hero-subtitle')
    if (subtitle) {
      const text = subtitle.textContent || ""
      subtitle.textContent = ""
      
      heroTl.to(subtitle, { duration: 0.1, opacity: 1 })
        .to({}, { duration: 0.1, onUpdate: () => {
          if (subtitle.textContent?.length || 0 < text.length) {
            subtitle.textContent = text.slice(0, (subtitle.textContent?.length || 0) + 1)
          }
        }, repeat: text.length - 1 })
    }

    // Animate the 3D text container
    const text3dContainer = heroRef.current?.querySelector('.text-3d-container')
    if (text3dContainer) {
      gsap.fromTo(text3dContainer, 
        { opacity: 0, scale: 0.5, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "back.out(1.7)" }
      )
    }

    // Navigation animations
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
    }

    // Floating elements animation
    const floatingElements = heroRef.current?.querySelectorAll('.floating-element')
    if (floatingElements) {
      gsap.fromTo(floatingElements, 
        { opacity: 0, y: 30, scale: 0.8 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1, 
          ease: "power3.out",
          stagger: 0.2
        }
      )
    }

    return () => {
      // Cleanup if needed
    }
  }, [mounted])

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

  // Enhanced project data
  const projects: ProjectDetails[] = [
    {
      title: "ChessCheat",
      description: "Chess AI assistant providing real-time game analysis and best move suggestions for chess players.",
      link: "http://chesscheat.zapto.org/",
      type: "web",
      technologies: ["JavaScript", "React", "Chess.js", "Stockfish"],
      image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "Matching",
      description: "Dating platform matching users based on shared interests and hobbies with intelligent algorithms.",
      type: "web",
      technologies: ["React", "Node.js", "Express", "PostgreSQL"],
      github: "https://github.com/AnasBouzanbil/Matcha",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "Paddle Pro",
      description: "Modern Atari Pong-inspired platform connecting paddle players with integrated chat and match features.",
      type: "web",
      technologies: ["TypeScript", "React", "Node.js", "Socket.io"],
      github: "https://github.com/AnasBouzanbil/JS_TS_Projects/tree/main/PaddlePro",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "HeyTv!",
      description: "Global video chat platform connecting users worldwide, similar to Omegle with enhanced features.",
      link: "https://heytv.sytes.net/",
      type: "web",
      technologies: ["JavaScript", "WebRTC", "Socket.io", "Node.js"],
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "HttpServer",
      description: "Custom HTTP server built from scratch in C++ and C, mimicking Nginx functionality with custom routing.",
      type: "C++",
      technologies: ["C++", "C", "Networking", "HTTP Protocol"],
      github: "https://github.com/AnasBouzanbil/Cpp-/tree/main/HTTP_SERVER",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024",
    },
    {
      title: "MoneyFlow",
      description: "Mobile finance management app for tracking spending, budgeting, and financial planning.",
      type: "mobile",
      technologies: ["React Native", "TypeScript", "Redux"],
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2025",
    }
  ]

  const skills = [
    { name: "Frontend", icon: Monitor, technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
    { name: "Backend", icon: Code, technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
    { name: "Mobile", icon: Smartphone, technologies: ["React Native", "Expo", "Native Modules"] },
    { name: "Languages", icon: Layers, technologies: ["JavaScript", "TypeScript", "C++", "Python"] },
  ]

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
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="lazyOnload" />

      {/* Creative Background */}
      <FloatingBackground />

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-primary">Anas Bouzanbil</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 bg-background/50 border-border/50 hover:bg-background/80"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section ref={heroRef} id="home" className="h-screen flex flex-col items-center justify-center relative z-10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        
        {/* Main content */}
        <div className="container mx-auto px-6 text-center relative z-20">
          {/* 3D Text Container */}
          <div className="text-3d-container mb-8 h-32 md:h-40 lg:h-48">
            <Text3DScene />
          </div>
          
          {/* Fallback Text Display - Always visible */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient">
            ANAS
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed opacity-0">
            Software Developer passionate about mobile and web development, with a keen interest in AI. I create innovative solutions for fun and profit.
          </p>
          
          {/* Floating decorative elements */}
          <div className="floating-element absolute top-20 left-20 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
          <div className="floating-element absolute top-32 right-32 w-3 h-3 bg-purple-500/40 rounded-full animate-ping" />
          <div className="floating-element absolute bottom-40 left-1/4 w-5 h-5 bg-blue-500/30 rounded-full animate-bounce" />
          <div className="floating-element absolute bottom-32 right-1/4 w-2 h-2 bg-green-500/50 rounded-full animate-pulse" />
          
          {/* Creative geometric shapes */}
          <div className="floating-element absolute top-1/3 left-1/3 w-16 h-16 border-2 border-primary/20 rounded-lg transform rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="floating-element absolute bottom-1/3 right-1/3 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
        </div>
      </section>

      {/* AI Chat - Positioned at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <AIChat />
      </div>
    </div>
  )
}