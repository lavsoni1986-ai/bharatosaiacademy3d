import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

// --- INSTITUTIONAL NAVBAR ---
const Navbar = ({ visible }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Curriculum', href: '#courses' },
    { label: 'Outcomes', href: '#stats' },
    { label: 'Journey', href: '#journey' },
    { label: 'Campus', href: '#hero' },
    { label: 'Contact', href: '#footer' },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] shadow-sm py-3.5'
              : 'bg-transparent border-b border-transparent py-5'
          }`}
          aria-label="Main Navigation"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
            {/* Clean Typographic Institutional Identity */}
            <a
              href="#"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded py-1"
            >
              <span className="font-sora font-semibold text-white text-base tracking-tight">
                BharatOS <span className="font-normal text-white/60">AI Academy</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-7 text-sm font-inter">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors py-1 focus:outline-none focus-visible:text-cyan-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Primary Header CTA */}
              <a
                href="#courses"
                className="btn-primary text-xs font-inter font-medium px-4 py-2"
              >
                Enroll
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-1.5 rounded text-white/70 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-[#090a0d] border-t border-white/[0.08] overflow-hidden"
              >
                <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
                  <div className="pb-2 border-b border-white/[0.06] text-xs font-inter text-white/50">
                    Shahdol, Madhya Pradesh, India
                  </div>
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block font-inter text-sm text-white/80 hover:text-white py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-2">
                    <a
                      href="#courses"
                      className="btn-primary w-full text-center text-xs font-inter font-medium py-2.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Explore Courses
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// --- MINIMAL SCROLL INVITATION ---
const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40 hover:opacity-70 transition-opacity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <span className="font-inter text-white/60 text-[11px] tracking-wider">
        Scroll to explore
      </span>
      <div className="w-px h-6 bg-white/25" />
    </motion.div>
  )
}

// --- HUMAN-CENTERED EDITORIAL HERO ---
const HeroSection = () => {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 py-28 md:py-36 overflow-hidden bg-bharatos-bg"
    >
      {/* Subtle Natural Atmospheric Depth (Zero loud grid or neon gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-bharatos-bg via-bharatos-bg/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        {/* 1. Calm Institutional Eyebrow */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="inline-block text-xs sm:text-sm font-inter text-cyan-400 font-medium tracking-wide mb-6"
        >
          BharatOS AI Academy • Shahdol, Madhya Pradesh
        </motion.div>

        {/* 2. Editorial Authoritative Headline */}
        <motion.h1
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sora text-4xl sm:text-6xl md:text-7xl font-semibold text-white mb-6 tracking-tight leading-[1.12]"
        >
          Build the future <br />
          <span className="font-normal text-white/90">with practical AI.</span>
        </motion.h1>

        {/* 3. Human, Clear Supporting Copy */}
        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-inter text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          An elite technology institution rooted in central India. Learn AI by building
          real things — software, automation, intelligent agents, and useful products.
        </motion.p>

        {/* 4. Action Center: Tactile Primary CTA & Editorial Secondary Link */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          {/* Primary Action */}
          <a
            href="#courses"
            className="btn-primary w-full sm:w-auto text-sm font-inter font-medium px-7 py-3 flex items-center justify-center gap-2 group"
          >
            <span>Start learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Secondary Action */}
          <a
            href="#journey"
            className="btn-glass w-full sm:w-auto text-sm font-inter font-normal px-6 py-3"
          >
            Explore Academy Journey
          </a>
        </motion.div>

        {/* 5. Institutional Location Footnote */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="pt-6 border-t border-white/[0.08] flex items-center justify-center gap-4 font-inter text-xs text-white/40"
        >
          <span>Practical AI & Software Engineering</span>
          <span>•</span>
          <span>Shahdol, India</span>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

export { Navbar, ScrollIndicator, HeroSection }
export default HeroSection

