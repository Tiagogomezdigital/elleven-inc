"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas || !isMounted) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      if (!canvas || !isMounted) return
      const particles: Particle[] = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }

      particlesRef.current = particles
    }

    const animate = () => {
      if (!canvas || !ctx || !isMounted) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Determine colors based on theme
      const isDark = theme === "dark"
      const particleColor = isDark ? "234, 88, 12" : "234, 88, 12"
      const lineColor = isDark ? "234, 88, 12" : "234, 88, 12"

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity * (isDark ? 1 : 0.6)})`
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${0.1 * (1 - distance / 100) * (isDark ? 1 : 0.4)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      if (isMounted) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    // Delay initialization to ensure proper mounting
    const initTimer = setTimeout(() => {
      if (isMounted) {
        resizeCanvas()
        createParticles()
        animate()
      }
    }, 100)

    const handleResize = () => {
      if (isMounted) {
        resizeCanvas()
        createParticles()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(initTimer)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    />
  )
}
