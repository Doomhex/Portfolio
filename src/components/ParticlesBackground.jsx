import React, { useEffect, useRef } from 'react'

export default function ParticlesBackground({ breathing = 'sun' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Palette per breathing style
    const getParticleConfig = (style) => {
      switch (style) {
        case 'water':
          return {
            count: 55,
            colors: ['rgba(56, 189, 248, 0.7)', 'rgba(14, 165, 233, 0.5)', 'rgba(125, 211, 252, 0.8)'],
            type: 'bubble'
          }
        case 'thunder':
          return {
            count: 65,
            colors: ['rgba(250, 204, 21, 0.85)', 'rgba(234, 179, 8, 0.6)', 'rgba(168, 85, 247, 0.7)'],
            type: 'spark'
          }
        case 'moon':
          return {
            count: 45,
            colors: ['rgba(192, 132, 252, 0.75)', 'rgba(244, 114, 182, 0.65)', 'rgba(232, 121, 249, 0.8)'],
            type: 'sakura'
          }
        case 'sun':
        default:
          return {
            count: 60,
            colors: ['rgba(239, 68, 68, 0.8)', 'rgba(249, 115, 22, 0.75)', 'rgba(251, 191, 36, 0.85)'],
            type: 'flame'
          }
      }
    }

    const cfg = getParticleConfig(breathing)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 4 + 1.5
        this.speedX = (Math.random() - 0.5) * 1.2
        this.speedY = breathing === 'water' ? Math.random() * 1.5 + 0.5 : -(Math.random() * 1.8 + 0.6)
        this.color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)]
        this.opacity = Math.random() * 0.7 + 0.3
        this.angle = Math.random() * Math.PI * 2
        this.spin = (Math.random() - 0.5) * 0.04
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.spin

        if (breathing === 'water' && this.y > height) {
          this.y = -10
          this.x = Math.random() * width
        } else if (breathing !== 'water' && this.y < -10) {
          this.y = height + 10
          this.x = Math.random() * width
        }

        if (this.x < -10) this.x = width + 10
        if (this.x > width + 10) this.x = -10
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        if (cfg.type === 'sakura') {
          // Petal shape
          ctx.beginPath()
          ctx.fillStyle = this.color
          ctx.ellipse(0, 0, this.size * 1.8, this.size * 0.9, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (cfg.type === 'spark') {
          // Sharp lightning diamond
          ctx.beginPath()
          ctx.fillStyle = this.color
          ctx.shadowBlur = 8
          ctx.shadowColor = this.color
          ctx.moveTo(0, -this.size * 1.8)
          ctx.lineTo(this.size * 0.8, 0)
          ctx.lineTo(0, this.size * 1.8)
          ctx.lineTo(-this.size * 0.8, 0)
          ctx.closePath()
          ctx.fill()
        } else {
          // Glowing circle / flame ember
          ctx.beginPath()
          ctx.fillStyle = this.color
          ctx.shadowBlur = 10
          ctx.shadowColor = this.color
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }
    }

    const particles = Array.from({ length: cfg.count }, () => new Particle())

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [breathing])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}
