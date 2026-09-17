import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, Laptop, PhoneCall, Users, Compass, Award, Briefcase, Sparkles } from 'lucide-react'
import { FLAGSHIP_PROGRAM, ACADEMY_INFO, COURSE_BENEFITS } from '../../data/academyData'

const ModuleCard = ({ module, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '80px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: 'easeOut' }}
      className="h-full"
    >
      <div className="editorial-card p-5 sm:p-6 h-full flex flex-col justify-between group hover:border-cyan-500/30 transition-all bg-[#0c0e14]">
        <div>
          {/* Module Number & Subtitle Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
              MODULE {module.number}
            </span>
            <span className="text-[11px] font-inter text-white/70 bg-white/[0.05] px-2.5 py-0.5 rounded border border-white/[0.08] truncate max-w-[170px]">
              {module.subtitle}
            </span>
          </div>

          {/* Module Title */}
          <h3 className="font-sora text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
            {module.title}
          </h3>

          {/* Module Description / Hindi Tagline */}
          <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
            {module.description}
          </p>
        </div>

        {/* Practical Outcome */}
        <div className="pt-3.5 border-t border-white/[0.06] mt-auto">
          <div className="text-[11px] font-mono text-cyan-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
            <span>Practical Outcome</span>
          </div>
          <p className="text-xs font-inter text-white/75 leading-relaxed">
            {module.outcome}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const CourseModules = () => {
  const sectionRef = useRef(null)

  const benefitIcons = [Users, Compass, Laptop, Award, Sparkles, Briefcase]

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative pt-4 pb-16 sm:pt-6 sm:pb-20 md:pt-8 md:pb-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080b]"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Clear Program Pricing */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-2 sm:mb-2.5">
              <span>Academic Curriculum</span>
              <span>•</span>
              <span>10 Comprehensive Modules</span>
            </div>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2.5 sm:mb-3 tracking-tight">
              {FLAGSHIP_PROGRAM.name}
            </h2>
            <p className="font-inter text-white/65 text-sm sm:text-base leading-relaxed">
              {FLAGSHIP_PROGRAM.summary}
            </p>
          </div>

          {/* Program Fast-Fact Card */}
          <div className="editorial-card p-5 sm:p-6 lg:min-w-[280px] shrink-0 border border-white/10 bg-[#0d0f15]">
            <div className="text-[11px] font-inter text-white/50 uppercase tracking-wider mb-1">
              45-Day Course Fee
            </div>
            <div className="font-sora text-2xl sm:text-3xl font-semibold text-cyan-400 mb-1.5">
              {FLAGSHIP_PROGRAM.fee}
            </div>
            <div className="text-xs font-inter text-white/60 mb-3.5">
              All inclusive • In-class hardware workstation access
            </div>
            <a
              href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=Hello%20BharatOS%20Academy%2C%20I%20want%20to%20enroll%20in%20the%2045-Day%20AI%20Foundation%20Course%20(Rs%208%2C999).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-xs font-inter font-medium py-2.5 flex items-center justify-center gap-2"
            >
              <span>Enroll in 45-Day Course</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* 10 Modular Phases Responsive Grid (3-col desktop, 2-col tablet, 1-col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {FLAGSHIP_PROGRAM.modules.map((mod, index) => (
            <ModuleCard key={mod.id} module={mod} index={index} />
          ))}
        </div>

        {/* Course Benefits Section (Phase 4) */}
        <div className="mb-14">
          <div className="text-left mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-1.5">
              <span>Key Advantages</span>
              <span>•</span>
              <span>Learning Experience</span>
            </div>
            <h3 className="font-sora text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Course Benefits & Academic Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSE_BENEFITS.map((benefit, bIdx) => {
              const IconComponent = benefitIcons[bIdx % benefitIcons.length]
              return (
                <div
                  key={benefit.title}
                  className="editorial-card p-5 border border-white/[0.08] bg-[#0b0d13] flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h4 className="font-sora text-sm sm:text-base font-semibold text-white">
                        {benefit.title}
                      </h4>
                      <span className="text-[11px] font-inter text-cyan-400/80">
                        {benefit.titleHindi}
                      </span>
                    </div>
                    <p className="font-inter text-white/60 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
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
              <span>Inquire: {ACADEMY_INFO.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseModules
