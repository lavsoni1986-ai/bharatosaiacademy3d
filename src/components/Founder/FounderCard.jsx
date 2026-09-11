import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Code2, MapPin } from 'lucide-react'
import { FOUNDER_INFO, ACADEMY_INFO } from '../../data/academyData'

const FounderCard = () => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-40px' })

  return (
    <section id="mentor" ref={cardRef} className="relative py-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#090a0e]">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3">
            <span>Pedagogical Leadership</span>
            <span>•</span>
            <span>Founder & Mentorship</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            Founder & Mentor
          </h2>
        </div>

        {/* Editorial Founder Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="editorial-card p-7 sm:p-9 border border-white/[0.1] bg-[#0c0e14]"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Real Founder Portrait */}
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 shadow-xl">
              <img
                src={FOUNDER_INFO.portraitImage}
                alt={`${FOUNDER_INFO.name} — ${FOUNDER_INFO.role}`}
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-2">
                <h3 className="font-sora text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {FOUNDER_INFO.name}
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-500/30">
                  {FOUNDER_INFO.credential}
                </span>
              </div>

              <div className="text-xs font-inter text-white/50 mb-4 flex items-center justify-center sm:justify-start gap-1.5">
                <span>{FOUNDER_INFO.role}</span>
                <span>•</span>
                <span>{FOUNDER_INFO.organization}</span>
              </div>

              <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {FOUNDER_INFO.background}
              </p>

              <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-inter text-white/40">
                <div className="flex items-center gap-1.5 text-center sm:text-left">
                  <MapPin size={13} className="text-cyan-400 shrink-0" />
                  <span>Campus: {ACADEMY_INFO.location.displayLocation}</span>
                </div>
                <span className="shrink-0 text-white/50">In-Person Practical Instruction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FounderCard
