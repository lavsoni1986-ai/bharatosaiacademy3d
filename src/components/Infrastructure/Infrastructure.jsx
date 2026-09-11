import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Laptop, Monitor, Smartphone, Building2, MapPin } from 'lucide-react'
import { INFRASTRUCTURE_PARTNER, ACADEMY_INFO } from '../../data/academyData'

const facilityIcons = [Laptop, Monitor, Smartphone]

const Infrastructure = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  return (
    <section id="infrastructure" ref={sectionRef} className="relative py-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080b]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3">
            <span>Physical Learning Environment</span>
            <span>•</span>
            <span>Shahdol Facilities</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            Learning Infrastructure
          </h2>
          <p className="font-inter text-white/60 text-base leading-relaxed">
            {INFRASTRUCTURE_PARTNER.description}
          </p>
        </div>

        {/* 3 Core Facility Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {INFRASTRUCTURE_PARTNER.facilities.map((fac, idx) => {
            const Icon = facilityIcons[idx] || Laptop
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className="editorial-card p-6 border border-white/[0.08] bg-[#0c0d12] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-cyan-400 mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sora text-lg font-semibold text-white mb-2.5 tracking-tight">
                    {fac.title}
                  </h3>
                  <p className="font-inter text-white/60 text-sm leading-relaxed font-normal">
                    {fac.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Muskan Associate Partnership Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="editorial-card p-6 sm:p-8 border border-white/[0.1] bg-[#0d0f15] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-inter text-cyan-400 font-medium uppercase tracking-wider">
                  {INFRASTRUCTURE_PARTNER.role}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-inter text-white/50">
                  {INFRASTRUCTURE_PARTNER.location}
                </span>
              </div>
              <h4 className="font-sora text-xl font-semibold text-white mb-1.5 tracking-tight">
                {INFRASTRUCTURE_PARTNER.partnerName}
              </h4>
              <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl">
                {INFRASTRUCTURE_PARTNER.partnerScope}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-inter text-white/60 bg-white/[0.03] px-4 py-2.5 rounded-lg border border-white/[0.06] shrink-0 text-center md:text-left">
            <MapPin size={14} className="text-cyan-400 shrink-0" />
            <span>{ACADEMY_INFO.location.displayLocation}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Infrastructure
