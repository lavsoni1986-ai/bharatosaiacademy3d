import React, { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react'
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

// Lazy load new institutional sections for optimal performance
const Infrastructure = lazy(() => import('./components/Infrastructure/Infrastructure'))
const FounderCard = lazy(() => import('./components/Founder/FounderCard'))
const GyanodayBatch = lazy(() => import('./components/Gyanoday/GyanodayBatch'))

// Loading fallback
const SceneFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-bharatos-bg">
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
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
            background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.12) 0%, rgba(18, 20, 26, 0.8) 50%, rgba(5, 5, 5, 0.95) 100%)'
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
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
  // Cinematic Flow: boot -> earth -> campus -> content
  const [scene, setScene] = useState('boot')
  const [transitioning, setTransitioning] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const transitionTimerRef = useRef(null)

  // Initialize Lenis smooth scroll
  useLenis()

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  // Transitions with robust cleanup and state isolation
  const handleBootComplete = useCallback(() => {
    setScene('earth')
  }, [])

  const handleEarthTransition = useCallback(() => {
    setTransitioning(true)
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = setTimeout(() => {
      setScene('campus')
      setTransitioning(false)
    }, 900)
  }, [])

  const handleCampusComplete = useCallback(() => {
    setScene('content')
    setShowNavbar(true)
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = setTimeout(() => {
      const heroEl = document.getElementById('hero')
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [])

  // Keep Navbar visible in content scene; let Navbar component handle transparent-to-frosted transition
  useEffect(() => {
    if (scene === 'content') {
      setShowNavbar(true)
    }
  }, [scene])

  return (
    <div className="relative w-full min-h-screen bg-bharatos-bg text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Scanline effect */}
      <div className="scanline" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Mutually Exclusive Scene Presentations with Sequential Lifecycle Guarantee */}
      <AnimatePresence mode="wait">
        {scene === 'boot' && (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BootSequence onComplete={handleBootComplete} />
          </motion.div>
        )}

        {scene === 'earth' && (
          <motion.div
            key="earth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Suspense fallback={<SceneFallback />}>
              <EarthScene onTransitionComplete={handleEarthTransition} />
            </Suspense>
          </motion.div>
        )}

        {scene === 'campus' && (
          <motion.div
            key="campus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            id="campus"
          >
            <Suspense fallback={<SceneFallback />}>
              <Campus onExplore={handleCampusComplete} onAdmissions={handleCampusComplete} />
            </Suspense>
          </motion.div>
        )}

        {scene === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Sticky Navbar */}
            <Navbar visible={showNavbar} />

            {/* Hero Section */}
            <HeroSection />

            {/* AI Foundation Course Curriculum */}
            <section id="courses">
              <Suspense fallback={<SceneFallback />}>
                <CourseModules />
              </Suspense>
            </section>

            {/* Gyanoday School Batch (Special Institutional Cohort) */}
            <section id="gyanoday">
              <Suspense fallback={<SceneFallback />}>
                <GyanodayBatch />
              </Suspense>
            </section>

            {/* Learning Infrastructure (Muskan Associate Partner) */}
            <section id="infrastructure">
              <Suspense fallback={<SceneFallback />}>
                <Infrastructure />
              </Suspense>
            </section>

            {/* Student Outcomes & First Batch Proof */}
            <section id="outcomes">
              <Suspense fallback={<SceneFallback />}>
                <Statistics />
              </Suspense>
            </section>

            {/* Founder & Mentor */}
            <section id="mentor">
              <Suspense fallback={<SceneFallback />}>
                <FounderCard />
              </Suspense>
            </section>

            {/* 45-Day Curriculum Progression Timeline */}
            <section id="journey">
              <Suspense fallback={<SceneFallback />}>
                <Timeline />
              </Suspense>
            </section>

            {/* Institutional Footer */}
            <section id="footer">
              <Suspense fallback={<SceneFallback />}>
                <Footer />
              </Suspense>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <TransitionOverlay active={transitioning} />
    </div>
  )
}

export default App
