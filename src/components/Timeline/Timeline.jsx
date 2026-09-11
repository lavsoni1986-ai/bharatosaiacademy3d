import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, FolderKanban, Briefcase, Rocket, Crown } from 'lucide-react'

const timelineSteps = [
  {
    id: 1,
    title: 'Student',
    description: 'Join as a curious learner with zero or some coding background',
    icon: GraduationCap,
    color: '#00F5FF',
  },
  {
    id: 2,
    title: 'Learning',
    description: 'Immersive hands-on training with real AI tools and projects',
    icon: BookOpen,
    color: '#8A2EFF',
  },
  {
    id: 3,
    title: 'Projects',
    description: 'Build portfolio-worthy AI projects that solve real problems',
    icon: FolderKanban,
    color: '#00F5FF',
  },
  {
    id: 4,
    title: 'Internship',
    description: 'Get placed in AI companies for industry experience',
    icon: Briefcase,
    color: '#8A2EFF',
  },
  {
    id: 5,
    title: 'Startup',
    description: 'Launch your own AI-powered startup with mentorship',
    icon: Rocket,
    color: '#00F5FF',
  },
  {
    id: 6,
    title: 'AI Entrepreneur',
    description: 'Scale your AI venture and become a leader in the ecosystem',
    icon: Crown,
    color: '#8A2EFF',
  },
]

const TimelineStep = ({ step, index, isLast }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10 items-start pb-12 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Left Column: Index & Spine */}
      <div className="relative flex flex-col items-center shrink-0">
        <div className="w-8 h-8 rounded-full border border-white/20 bg-[#0d0e12] flex items-center justify-center text-xs font-mono font-medium text-white/80 z-10">
          {String(index + 1).padStart(2, '0')}
        </div>
        {!isLast && (
          <div className="w-px h-full absolute top-8 bottom-0 bg-white/[0.08]" />
        )}
      </div>

      {/* Right Column: Editorial Step Card */}
      <div className="editorial-card p-6 flex-1 max-w-2xl">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="text-cyan-400">
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <h3 className="font-sora text-lg font-semibold text-white tracking-tight">
            {step.title}
          </h3>
        </div>
        <p className="font-inter text-white/65 text-sm leading-relaxed font-normal">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

const Timeline = () => {
  return (
    <section id="journey" className="relative py-28 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080b]">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <span className="text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase block mb-3">
            Academic Trajectory
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            From Learner to AI Engineer
          </h2>
          <p className="font-inter text-white/60 text-base sm:text-lg leading-relaxed">
            A structured path guiding students through fundamental software discipline, complex agent design, industry internships, and venture creation.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="flex flex-col">
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === timelineSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
