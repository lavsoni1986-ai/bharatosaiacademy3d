import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { CheckCircle2, ArrowRight, ShieldCheck, Laptop, PhoneCall } from 'lucide-react'
import { FLAGSHIP_PROGRAM, ACADEMY_INFO } from '../../data/academyData'

const ModuleCard = ({ module, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="editorial-card p-6 h-full flex flex-col justify-between group hover:border-cyan-500/25 transition-all">
        <div>
          {/* Module Number & Timing */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
              MODULE {module.number}
            </span>
            <span className="text-[11px] font-inter text-white/50 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]">
              {module.duration}
            </span>
          </div>

          {/* Module Title */}
          <h3 className="font-sora text-lg font-semibold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
            {module.title}
          </h3>

          {/* Module Description */}
          <p className="font-inter text-white/60 text-sm leading-relaxed mb-5 font-normal">
            {module.description}
          </p>
        </div>

        {/* Focus Pillars */}
        <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
          {module.focus.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-inter text-white/70">
              <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const CourseModules = () => {
  const sectionRef = useRef(null)
  const titleRef = useScrollAnimation({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, duration: 0.8 })

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative pt-4 pb-20 sm:pt-6 sm:pb-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080b]"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Clear Program Pricing */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3">
              <span>Academic Curriculum</span>
              <span>•</span>
              <span>{FLAGSHIP_PROGRAM.subtitle}</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
              {FLAGSHIP_PROGRAM.name}
            </h2>
            <p className="font-inter text-white/65 text-base sm:text-lg leading-relaxed">
              {FLAGSHIP_PROGRAM.summary}
            </p>
          </div>

          {/* Program Fast-Fact Card */}
          <div className="editorial-card p-6 lg:min-w-[290px] shrink-0 border border-white/10 bg-[#0d0f15]">
            <div className="text-xs font-inter text-white/50 uppercase tracking-wider mb-1">
              45-Day Program Fee
            </div>
            <div className="font-sora text-3xl sm:text-4xl font-semibold text-cyan-400 mb-2">
              {FLAGSHIP_PROGRAM.fee}
            </div>
            <div className="text-xs font-inter text-white/60 mb-4">
              All inclusive • Full classroom workstation access
            </div>
            <a
              href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=Hello%20BharatOS%20AI%20Academy%2C%20I%20want%20to%20enroll%20in%20the%2045-Day%20AI%20Foundation%20Course%20(Rs%208%2C999).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-xs font-inter font-medium py-2.5 flex items-center justify-center gap-2"
            >
              <span>Enroll in 45-Day Course</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* 6 Modular Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {FLAGSHIP_PROGRAM.modules.map((mod, index) => (
            <ModuleCard key={mod.id} module={mod} index={index} />
          ))}
        </div>

        {/* Practical Learning Guarantee Strip */}
        <div className="editorial-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/[0.08] bg-[#0b0c10]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Laptop size={20} />
            </div>
            <div>
              <h4 className="font-sora text-base sm:text-lg font-semibold text-white mb-1">
                Smartphone-First + In-Class Laptop Lab Workstations
              </h4>
              <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl">
                Personal laptop ownership is not mandatory to enroll. Students practice daily using in-class hardware workstations during scheduled academy batches and continue exercises on mobile devices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${ACADEMY_INFO.contact.phone}`}
              className="btn-glass w-full md:w-auto text-xs font-inter font-normal px-5 py-2.5 flex items-center justify-center gap-2"
            >
              <PhoneCall size={14} className="text-cyan-400" />
              <span>Inquire: {ACADEMY_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseModules
