import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, FolderGit2, Wrench, BookOpen } from 'lucide-react'

const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Students',
    description: 'Learning AI across India',
    icon: Users,
    color: '#00F5FF',
  },
  {
    id: 2,
    value: 50,
    suffix: '+',
    label: 'Projects',
    description: 'Real-world AI applications',
    icon: FolderGit2,
    color: '#8A2EFF',
  },
  {
    id: 3,
    value: 20,
    suffix: '+',
    label: 'AI Tools',
    description: 'Industry-standard platforms',
    icon: Wrench,
    color: '#00F5FF',
  },
  {
    id: 4,
    value: 100,
    suffix: '%',
    label: 'Practical Learning',
    description: 'Hands-on project-based',
    icon: BookOpen,
    color: '#8A2EFF',
  },
]

const AnimatedCounter = ({ value, suffix, duration = 2.5 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="border-t border-white/[0.08] pt-6"
    >
      <div className="font-sora text-4xl sm:text-5xl font-semibold text-white mb-2 tracking-tight">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>

      <h3 className="font-inter text-sm font-medium text-white/90 mb-1">
        {stat.label}
      </h3>

      <p className="font-inter text-white/50 text-xs leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  )
}

const Statistics = () => {
  return (
    <section id="stats" className="relative py-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#090a0e]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase block mb-3">
            Institutional Impact
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            Measured by Practical Outcomes
          </h2>
          <p className="font-inter text-white/60 text-base leading-relaxed">
            Real outcomes across student project completions, deployed automation pipelines, and engineering careers originating from Shahdol.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
