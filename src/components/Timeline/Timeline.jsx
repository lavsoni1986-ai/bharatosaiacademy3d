import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, Code2, Cpu, Rocket, Briefcase } from 'lucide-react'
import { FLAGSHIP_PROGRAM } from '../../data/academyData'

const timelineSteps = [
  {
    id: 1,
    title: 'Admissions & In-Class Setup',
    description: 'Join the cohort in Shahdol. Orientation to workstation hardware, interactive smartboard, and mobile practice environment.',
    icon: GraduationCap,
  },
  {
    id: 2,
    title: 'AI Mental Models & Prompt Architecture',
    description: 'Systematic prompt structuring, few-shot prompting, and context framing protocols across modern frontier LLMs.',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'AI-Assisted Coding & Tool Workflows',
    description: 'Learn modern software development workflows using AI coding companions (Cursor, Copilot, Cline) to write real code.',
    icon: Code2,
  },
  {
    id: 4,
    title: 'Workflows & Multi-Agent Systems',
    description: 'Building connected business workflows, webhook automation pipelines, and autonomous agent loops with tool usage.',
    icon: Cpu,
  },
  {
    id: 5,
    title: 'Practical Capstone Build',
    description: 'Design, build, and deploy an end-to-end working software product solving a real problem for regional businesses or workflows.',
    icon: Rocket,
  },
  {
    id: 6,
    title: 'Certification & Real Deployment',
    description: 'Complete the course review, receive official BharatOS Academy completion credentials, and graduate with a deployed portfolio.',
    icon: Briefcase,
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
          <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3">
            <span>45-Day Trajectory</span>
            <span>•</span>
            <span>Learning Roadmap</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Curriculum Progression
          </h2>
          <p className="font-inter text-white/60 text-base sm:text-lg leading-relaxed">
            A step-by-step roadmap taking students through foundational software discipline, agent loops, automation pipelines, and real client deployment.
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
