import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const terminalLines = [
  { text: 'Initializing BharatOS Quantum Engine...', delay: 0 },
  { text: 'Loading AI Infrastructure v4.2...', delay: 800 },
  { text: 'Connecting Shahdol Node [23.3002° N, 81.3656° E]...', delay: 1600 },
  { text: 'Synchronizing BharatOS Network...', delay: 2400 },
  { text: 'Calibrating Neural Pathways...', delay: 3200 },
  { text: 'Optimizing Tensor Cores...', delay: 4000 },
  { text: 'Establishing Secure Connection...', delay: 4800 },
  { text: 'System Ready.', delay: 5600, isFinal: true },
]

const BootSequence = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const gsapTweenRef = useRef(null)

  // Circular loader animation with proper RAF cleanup
  useEffect(() => {
    if (!showLoader || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId
    let progress = 0

    canvas.width = 200
    canvas.height = 200

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const radius = 70

      // Background ring
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Progress ring
      ctx.beginPath()
      ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress)
      ctx.strokeStyle = '#00F5FF'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.shadowColor = '#00F5FF'
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.shadowBlur = 0

      // Inner pulsing ring
      const pulseRadius = radius - 15 + Math.sin(Date.now() * 0.005) * 5
      ctx.beginPath()
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(138, 46, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#00F5FF'
      ctx.shadowColor = '#00F5FF'
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.shadowBlur = 0

      // Rotating particles
      for (let i = 0; i < 8; i++) {
        const angle = Date.now() * 0.001 + (i * Math.PI * 2) / 8
        const px = cx + Math.cos(angle) * (radius + 20)
        const py = cy + Math.sin(angle) * (radius + 20)
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? '#00F5FF' : '#8A2EFF'
        ctx.fill()
      }

      progress = Math.min(1, progress + 0.008)
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [showLoader])

  // Terminal line reveal with complete timer tracking & cleanup
  useEffect(() => {
    const activeTimers = []

    terminalLines.forEach((line) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => {
          if (prev.some((item) => item.text === line.text)) return prev
          return [...prev, line]
        })
        if (line.isFinal) {
          const loaderTimer = setTimeout(() => setShowLoader(true), 500)
          const buttonTimer = setTimeout(() => {
            setShowLoader(false)
            setShowButton(true)
          }, 3500)
          activeTimers.push(loaderTimer, buttonTimer)
        }
      }, line.delay)
      activeTimers.push(timer)
    })

    return () => {
      activeTimers.forEach((timerId) => clearTimeout(timerId))
    }
  }, [])

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (gsapTweenRef.current) {
        gsapTweenRef.current.kill()
      }
    }
  }, [])

  const handleEnter = useCallback(() => {
    setIsExiting(true)
    if (containerRef.current) {
      gsapTweenRef.current = gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })
    } else if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bharatos-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
            {/* Official BharatOS Academy Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex justify-center mb-5 sm:mb-6"
            >
              <img
                src="/bharatos-academy-logo.png"
                alt="BharatOS AI Academy Emblem"
                className="w-20 sm:w-24 md:w-28 h-auto drop-shadow-[0_0_25px_rgba(0,240,255,0.22)]"
                width="112"
                height="143"
              />
            </motion.div>

            {/* Terminal Window Container */}
            <div className="w-full">
              {/* Terminal header */}
              <motion.div
                className="mb-4 sm:mb-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-white/30 font-mono">
                  bharatos@shahdol:~$ init_sequence
                </span>
              </motion.div>

              {/* Terminal lines */}
              <div className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 min-h-[240px] sm:min-h-[260px]">
              {visibleLines.map((line) => (
                <motion.div
                  key={line.text}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <span className="text-neon-cyan font-mono text-sm shrink-0">
                    {'>'}
                  </span>
                  <span
                    className={`font-mono text-sm ${
                      line.isFinal ? 'text-neon-cyan' : 'text-white/70'
                    }`}
                  >
                    {line.text}
                    {!line.isFinal && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-neon-cyan/50 ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Circular loader */}
            <AnimatePresence>
              {showLoader && (
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <canvas ref={canvasRef} width={200} height={200} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enter button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <motion.button
                    onClick={handleEnter}
                    className="group relative px-12 py-5 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 border border-neon-cyan/30 rounded-full group-hover:border-neon-cyan/60 transition-colors duration-500" />

                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow:
                          '0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(138, 46, 255, 0.2)',
                      }}
                    />

                    <span className="relative z-10 text-lg font-sora font-semibold tracking-widest text-white group-hover:text-neon-cyan transition-colors duration-300">
                      ENTER THE FUTURE
                    </span>

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, #00F5FF, transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-neon-cyan/20" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-neon-cyan/20" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-neon-cyan/20" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-neon-cyan/20" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootSequence
