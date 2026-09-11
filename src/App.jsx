import React, { useState, useCallback, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BootSequence from './components/Loader/BootSequence'
import EarthScene from './components/Earth/EarthScene'
import Campus from './components/Campus/CampusScene'
import CourseModules from './components/Courses/CourseModules'
import Statistics from './components/Stats/Statistics'
import Timeline from './components/Timeline/Timeline'
import Footer from './components/Footer/Footer'
import { Navbar, HeroSection } from './components/Hero/HeroSection'
import { useLenis } from './hooks/useLenis'

// Loading fallback
const SceneFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-bharatos-bg">
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-12 h-12 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan animate-spin" />
      <span className="font-inter text-white/50 text-sm tracking-wider">Loading Experience...</span>
    </motion.div>
  </div>
)

// Transition overlay - polished quantum warp gradient to eliminate any black flash
const TransitionOverlay = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.12) 0%, rgba(138, 46, 255, 0.08) 45%, rgba(5, 5, 5, 0.85) 100%)'
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-neon-cyan/40 border-t-neon-cyan animate-spin" />
            <p className="font-mono text-white/80 text-xs tracking-widest uppercase">
              ENTERING BHARATOS AI CAMPUS...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [scene, setScene] = useState('boot') // boot -> earth -> campus -> content (hero -> courses -> stats -> journey -> footer)
  const [showNavbar, setShowNavbar] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const transitionTimerRef = useRef(null)

  // Initialize smooth scroll
  useLenis()

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  // Handle boot sequence completion
  const handleBootComplete = useCallback(() => {
    setScene('earth')
  }, [])

  // Handle Earth to Campus transition
  const handleEarthTransition = useCallback(() => {
    setTransitioning(true)
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = setTimeout(() => {
      setScene('campus')
      setTransitioning(false)
    }, 1500)
  }, [])

  // Handle Campus to Content transition
  const handleCampusComplete = useCallback(() => {
    setScene('content')
    setShowNavbar(true)
  }, [])

  // Keep Navbar visible in content scene; let Navbar component handle transparent-to-frosted transition
  useEffect(() => {
    if (scene === 'content') {
      setShowNavbar(true)
    }
  }, [scene])

  return (
    <div className="relative bg-bharatos-bg min-h-screen">
      {/* Scanline effect */}
      <div className="scanline" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Stage 1: Boot Sequence */}
      <AnimatePresence>
        {scene === 'boot' && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* Stage 2: Earth Scene */}
      <AnimatePresence>
        {scene === 'earth' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Suspense fallback={<SceneFallback />}>
              <EarthScene onTransitionComplete={handleEarthTransition} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <TransitionOverlay active={transitioning} />

      {/* Stage 3: Campus Scene */}
      <AnimatePresence>
        {scene === 'campus' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            id="campus"
          >
            <Suspense fallback={<SceneFallback />}>
              <Campus onExplore={handleCampusComplete} onAdmissions={handleCampusComplete} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 4+: Main Content (Hero -> Courses -> Statistics -> Timeline -> Footer) */}
      <AnimatePresence>
        {scene === 'content' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Sticky Navbar */}
            <Navbar visible={showNavbar} />

            {/* Hero Section */}
            <HeroSection />

            {/* Course Modules */}
            <section id="courses">
              <Suspense fallback={<SceneFallback />}>
                <CourseModules />
              </Suspense>
            </section>

            {/* Statistics */}
            <section id="stats">
              <Suspense fallback={<SceneFallback />}>
                <Statistics />
              </Suspense>
            </section>

            {/* Timeline */}
            <section id="journey">
              <Suspense fallback={<SceneFallback />}>
                <Timeline />
              </Suspense>
            </section>

            {/* Footer */}
            <section id="footer">
              <Suspense fallback={<SceneFallback />}>
                <Footer />
              </Suspense>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
