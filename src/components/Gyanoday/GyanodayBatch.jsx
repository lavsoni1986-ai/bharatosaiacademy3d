import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { School, CheckCircle2, ArrowRight, MessageSquare, Smartphone, FileText, Tag, GraduationCap, Sparkles } from 'lucide-react'
import { GYANODAY_BATCH_INFO, ACADEMY_INFO, DISCOUNT_CATEGORIES, FLAGSHIP_PROGRAM } from '../../data/academyData'
import GyanodayRegistrationModal from './GyanodayRegistrationModal'

const GyanodayBatch = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState('gyanoday_full')

  const handleOpenRegistration = (planId) => {
    setSelectedPlanId(planId)
    setModalOpen(true)
  }

  return (
    <section
      id="gyanoday"
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#08090d]"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section 1: SPECIAL STUDENT DISCOUNTS */}
        <div className="mb-20">
          <div className="max-w-3xl mb-8 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Tag size={13} className="text-cyan-400" />
              <span>SPECIAL STUDENT CONCESSIONS</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight">
              Special Student Discounts
            </h2>
            <div className="font-sora text-lg sm:text-xl text-cyan-300/90 font-medium mb-3">
              "AI सीखने का अवसर अब और अधिक students के लिए।"
            </div>
            <p className="font-inter text-white/65 text-sm sm:text-base leading-relaxed">
              Standard 45-Day AI Foundation Course fee is {FLAGSHIP_PROGRAM.fee}. To foster broad digital empowerment, BharatOS Academy provides special fee concessions for eligible school and category students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
            {DISCOUNT_CATEGORIES.map((disc, dIdx) => (
              <motion.div
                key={disc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: dIdx * 0.1 }}
                className="editorial-card p-6 border border-cyan-500/25 bg-[#0c0e16] hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase tracking-wider">
                      {disc.benefit}
                    </span>
                    <GraduationCap size={16} className="text-cyan-400" />
                  </div>
                  <h3 className="font-sora text-lg font-semibold text-white mb-1 tracking-tight">
                    {disc.category}
                  </h3>
                  <div className="text-xs font-inter text-cyan-400/80 mb-3">
                    {disc.categoryHindi}
                  </div>
                  <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed mb-5">
                    {disc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=Hello%20BharatOS%20Academy%2C%20I%20am%20eligible%20for%20the%20${encodeURIComponent(disc.category)}%20Special%20Discount.%20Please%20share%20the%20concession%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-inter text-cyan-400 hover:text-cyan-300 flex items-center justify-between group"
                  >
                    <span>Inquire via WhatsApp Desk</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs font-inter text-white/45 italic">
            * Eligibility verified during admission upon document/ID verification. This special discount is separate from the Gyanoday School partnership.
          </p>
        </div>

        {/* Section 2: GYANODAY SCHOOL PARTNERSHIP (Separate Institutional Cohort) */}
        <div className="pt-14 border-t border-white/[0.1]">
          <div className="max-w-3xl mb-8 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <School size={13} className="text-cyan-400" />
              <span>INSTITUTIONAL SCHOOL PARTNERSHIP</span>
            </div>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-1.5 tracking-tight">
              {GYANODAY_BATCH_INFO.name}
            </h2>
            <div className="font-mono text-sm text-cyan-400 font-medium mb-3">
              {GYANODAY_BATCH_INFO.partnershipLockup}
            </div>

            {/* Prominent Partnership Pricing Callout Banner */}
            <div className="p-4 sm:p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/30 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1">
                  {GYANODAY_BATCH_INFO.exclusiveOfferBadge}
                </span>
                <div className="font-sora text-2xl sm:text-3xl font-semibold text-white">
                  ₹1,599 <span className="text-sm font-normal text-white/70">One-Time</span> <span className="text-cyan-400 text-base font-normal mx-1.5">OR</span> ₹500 <span className="text-sm font-normal text-white/70">/ Month</span>
                </div>
              </div>
              <span className="text-xs font-inter text-cyan-300/80 bg-cyan-900/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                Eligible Gyanoday Students Only
              </span>
            </div>

            <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed mb-3">
              {GYANODAY_BATCH_INFO.disclaimer}
            </p>
          </div>

        {/* Dual Registration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {GYANODAY_BATCH_INFO.plans.map((plan, idx) => {
            const isFull = plan.id === 'gyanoday_full'
            const whatsappUrl = `https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=${encodeURIComponent(plan.whatsappText)}`

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className={`editorial-card p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isFull
                    ? 'border-cyan-500/30 bg-[#0c0e15] shadow-lg hover:border-cyan-500/50'
                    : 'border-white/[0.08] bg-[#0b0c11] hover:border-white/20'
                }`}
              >
                {/* Card Top / Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded border uppercase tracking-wider ${
                        isFull
                          ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 font-semibold'
                          : 'bg-white/[0.04] border-white/10 text-white/60 font-medium'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {plan.savingNote}
                    </span>
                  </div>

                  <h3 className="font-sora text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                    {plan.title}
                  </h3>

                  {/* Fee Display */}
                  <div className="flex items-baseline gap-2.5 my-4 pb-4 border-b border-white/[0.06]">
                    <span className="font-sora text-3xl sm:text-4xl font-semibold text-cyan-400">
                      {plan.fee}
                    </span>
                    <span className="font-inter text-xs text-white/50 uppercase tracking-wider">
                      {plan.duration}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-inter text-white/70">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons: Online Registration & WhatsApp */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenRegistration(plan.id)}
                    className={`w-full py-3.5 px-5 rounded-lg text-xs sm:text-sm font-inter font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                      isFull
                        ? 'btn-primary'
                        : 'bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/30 text-white hover:text-cyan-200'
                    }`}
                  >
                    <FileText size={15} />
                    <span>Register Online (Receipt PDF) · {plan.fee}</span>
                    <ArrowRight size={13} className="ml-0.5" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass w-full py-2.5 px-4 rounded-lg text-xs font-inter text-white/70 hover:text-white flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={13} className="text-cyan-400" />
                    <span>Inquire via WhatsApp Desk</span>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* School Initiative Guidance & General WhatsApp Card */}
        <div className="editorial-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/[0.08] bg-[#0a0b10]">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Smartphone size={20} />
            </div>
            <div>
              <div className="text-xs font-inter text-cyan-400 font-medium uppercase tracking-wider mb-1">
                Student Convenience & Hardware
              </div>
              <h4 className="font-sora text-base sm:text-lg font-semibold text-white mb-1.5">
                School-Level Practical AI Instruction
              </h4>
              <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Classes are structured for school students in Shahdol with practical workstation sessions. Students do not require personal laptops for home study — all continuous exercises are optimized for smartphone practice.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handleOpenRegistration('gyanoday_full')}
              className="btn-primary w-full sm:w-auto text-xs font-inter font-medium px-5 py-3 flex items-center justify-center gap-2 shadow-md"
            >
              <FileText size={14} />
              <span>Open Admission Form</span>
            </button>
            <a
              href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=${encodeURIComponent(GYANODAY_BATCH_INFO.generalWhatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass w-full sm:w-auto text-xs font-inter font-normal px-5 py-3 flex items-center justify-center gap-2"
            >
              <MessageSquare size={14} className="text-cyan-400" />
              <span>Gyanoday WhatsApp Desk</span>
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Registration Modal Dialog */}
      <GyanodayRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPlanId={selectedPlanId}
      />
    </section>
  )
}

export default GyanodayBatch
