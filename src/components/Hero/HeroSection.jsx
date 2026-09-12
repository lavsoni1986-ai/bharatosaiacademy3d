import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, BookOpen, MapPin } from 'lucide-react'
import { ACADEMY_INFO, FLAGSHIP_PROGRAM } from '../../data/academyData'

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
    { label: 'Gyanoday', href: '#gyanoday' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Mentor', href: '#mentor' },
    { label: 'Journey', href: '#journey' },
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
              ? 'bg-[#071827]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-md shadow-black/25 py-3.5'
              : 'bg-[#071827]/90 backdrop-blur-md border-b border-cyan-500/10 py-4 sm:py-5'
          }`}
          aria-label="Main Navigation"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
            {/* Official Academy Brand Identity Lockup */}
            <a
              href="#"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded py-1"
            >
              <img
                src="/bharatos-academy-logo.png"
                alt="BharatOS AI Academy — Shahdol"
                className="h-8 sm:h-9 w-auto drop-shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-transform group-hover:scale-105"
                width="36"
                height="46"
              />
              <div className="flex flex-col text-left">
                <span className="font-sora font-semibold text-white text-sm sm:text-base tracking-tight leading-tight">
                  BharatOS <span className="font-normal text-white/70">AI Academy</span>
                </span>
                <span className="text-[10px] font-inter text-white/50 tracking-wider uppercase hidden sm:block">
                  Learn • Build • Grow | Shahdol
                </span>
                <span className="text-[10px] font-mono text-cyan-400/80 sm:hidden">
                  Shahdol
                </span>
              </div>
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
                Enroll Now
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
                className="md:hidden bg-[#071827] border-t border-cyan-500/20 overflow-hidden"
              >
                <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
                  <div className="pb-2 border-b border-white/[0.06] text-xs font-inter text-white/50 flex items-center gap-1.5">
                    <MapPin size={13} className="text-cyan-400 shrink-0" />
                    <span>{ACADEMY_INFO.location.displayLocation}</span>
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
                      Explore Course · {FLAGSHIP_PROGRAM.fee}
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
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40 hover:opacity-70 transition-opacity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <span className="font-inter text-white/60 text-[11px] tracking-wider">
        Scroll to explore curriculum
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
      className="relative flex flex-col items-center justify-center px-6 sm:px-8 pt-28 pb-2 sm:pt-32 sm:pb-3 md:pt-36 md:pb-4 overflow-hidden bg-bharatos-bg"
    >
      {/* Atmospheric Depth (Zero loud grid or neon gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-bharatos-bg via-bharatos-bg/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        {/* Official Academy Emblem */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-5"
        >
          <img
            src="/bharatos-academy-logo.png"
            alt="BharatOS AI Academy — Shahdol"
            className="w-16 sm:w-20 h-auto drop-shadow-[0_0_25px_rgba(0,240,255,0.25)]"
            width="80"
            height="102"
          />
        </motion.div>

        {/* 1. Calm Institutional Location Anchor */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter text-cyan-400 font-medium tracking-wide mb-6 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>BharatOS AI Academy • {ACADEMY_INFO.location.displayLocation}</span>
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

        {/* 3. Program Pillar Badge: Transparent Duration & Fee */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 text-xs sm:text-sm font-inter"
        >
          <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-white font-medium">
            {FLAGSHIP_PROGRAM.name}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/80 font-medium">{FLAGSHIP_PROGRAM.subtitle}</span>
          <span className="text-white/40">•</span>
          <span className="text-cyan-400 font-semibold text-sm sm:text-base">{FLAGSHIP_PROGRAM.fee}</span>
        </motion.div>

        {/* 4. Human, Clear Supporting Copy */}
        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-inter text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Learn AI by building real things — software, automation, intelligent agents,
          and useful products. In-person laptop workstation labs in Shahdol with smartphone-first continuous practice.
        </motion.p>

        {/* 5. Action Center: Tactile Primary CTA & Editorial Secondary Link */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          {/* Primary Action */}
          <a
            href="#courses"
            className="btn-primary w-full sm:w-auto text-sm font-inter font-medium px-7 py-3 flex items-center justify-center gap-2 group"
          >
            <span>Start Learning · {FLAGSHIP_PROGRAM.fee}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Secondary Action */}
          <a
            href="#courses"
            className="btn-glass w-full sm:w-auto text-sm font-inter font-normal px-6 py-3 flex items-center justify-center gap-2"
          >
            <BookOpen size={16} className="text-cyan-400" />
            <span>View 45-Day Curriculum</span>
          </a>
        </motion.div>

        {/* 6. Institutional Location & Hardware Footnote */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 font-inter text-xs text-white/40"
        >
          <span>Near Jain Mandir, Near Mohanram Talab</span>
          <span>•</span>
          <span>Shahdol, Madhya Pradesh</span>
          <span>•</span>
          <span>In-Class Hardware Workstations</span>
        </motion.div>
      </div>
    </section>
  )
}

export { Navbar, ScrollIndicator, HeroSection }
export default HeroSection

