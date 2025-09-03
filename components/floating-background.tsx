"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function FloatingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = []
      const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#10b981']
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      particlesRef.current = particles
    }

    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
        
        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            )
            
            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = (100 - distance) / 100 * 0.1
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })
      
      animationRef.current = requestAnimationFrame(animateParticles)
    }

    // Create geometric shapes
    const drawGeometricShapes = () => {
      const shapes = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 80, rotation: 0 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 60, rotation: 45 },
        { x: canvas.width * 0.1, y: canvas.height * 0.8, size: 100, rotation: 90 }
      ]
      
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          rotation: shape.rotation + 360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "none"
        })
        
        // Draw rotating shapes
        const drawShape = () => {
          ctx.save()
          ctx.translate(shape.x, shape.y)
          ctx.rotate((shape.rotation * Math.PI) / 180)
          
          ctx.beginPath()
          ctx.strokeStyle = `rgba(236, 72, 153, ${0.1 + index * 0.05})`
          ctx.lineWidth = 2
          ctx.strokeRect(-shape.size/2, -shape.size/2, shape.size, shape.size)
          
          ctx.restore()
        }
        
        // Animate shape drawing
        gsap.to({}, {
          duration: 0.1,
          repeat: -1,
          onUpdate: drawShape
        })
      })
    }

    createParticles()
    animateParticles()
    drawGeometricShapes()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
} 