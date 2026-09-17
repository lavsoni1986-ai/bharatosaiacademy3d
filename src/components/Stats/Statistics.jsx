import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, CheckCircle2, MapPin, FileCheck2, ExternalLink, X, Image as ImageIcon } from 'lucide-react'
import { FIRST_BATCH_PROOFS, ACADEMY_INFO } from '../../data/academyData'

const StudentProofCard = ({ student, index, onPreviewCert }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="editorial-card p-6 sm:p-7 border border-white/[0.08] bg-[#0c0d12] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Completed Batch 1</span>
          </div>
          <span className="font-mono text-xs text-white/40">{student.location}</span>
        </div>

        <h3 className="font-sora text-xl font-semibold text-white mb-1.5 tracking-tight">
          {student.name}
        </h3>
        
        <p className="font-inter text-xs text-cyan-400 font-medium mb-4">
          {student.program} • {student.credential}
        </p>

        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-2 mb-5">
          <div className="flex items-start gap-2 text-xs font-inter text-white/70">
            <Award size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            <span>{student.issuer}</span>
          </div>
          <div className="flex items-start gap-2 text-[11px] font-inter text-white/50">
            <FileCheck2 size={13} className="text-white/40 shrink-0 mt-0.5" />
            <span>{student.subIssuer}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono text-white/40">
        <span className="text-emerald-400 flex items-center gap-1">
          <CheckCircle2 size={12} />
          CERTIFIED PARTICIPATION
        </span>

        {student.certImage && (
          <button
            onClick={() => onPreviewCert(student)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-inter text-xs font-normal"
          >
            <span>View Certificate</span>
            <ExternalLink size={11} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

const Statistics = () => {
  const [activeCert, setActiveCert] = useState(null)

  return (
    <section id="outcomes" className="relative py-24 px-6 sm:px-8 border-t border-white/[0.06] bg-[#090a0e]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-3">
            <span>Student Outcomes</span>
            <span>•</span>
            <span>Batch 1 Milestones</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            {FIRST_BATCH_PROOFS.title}
          </h2>
          <p className="font-inter text-white/60 text-base leading-relaxed">
            {FIRST_BATCH_PROOFS.summary}
          </p>
        </div>

        {/* First Batch Student Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {FIRST_BATCH_PROOFS.students.map((student, index) => (
            <StudentProofCard
              key={student.name}
              student={student}
              index={index}
              onPreviewCert={(st) => setActiveCert(st)}
            />
          ))}
        </div>

        {/* Group Photo Showcase */}
        {FIRST_BATCH_PROOFS.groupPhoto && (
          <div className="editorial-card p-6 sm:p-8 border border-white/[0.08] bg-[#0b0c11] mb-12 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:w-64 h-56 sm:h-52 md:h-44 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0 shadow-lg">
              <img
                src={FIRST_BATCH_PROOFS.groupPhoto}
                alt="BharatOS AI Academy First Batch Students with Certificate in Shahdol"
                className="w-full h-full object-cover object-top"
                width="1086"
                height="1448"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs font-inter text-cyan-400 font-medium uppercase tracking-wider mb-1">
                Shahdol Smart Classroom
              </div>
              <h4 className="font-sora text-lg font-semibold text-white mb-1.5">
                First Batch Students Rohit Dhurwey & Jyoti Singh
              </h4>
              <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed mb-3">
                Students photographed at the Shahdol learning center holding their Certificate of Participation under the FutureSkills Prime digital skilling initiative.
              </p>
              <div className="text-xs font-mono text-white/40 flex items-center gap-2">
                <span>Verification Cohort: Batch 1</span>
                <span>•</span>
                <span>Shahdol, Madhya Pradesh</span>
              </div>
            </div>
          </div>
        )}

        {/* Verified Fast-Facts Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.06]">
          {FIRST_BATCH_PROOFS.verifiedFacts.map((fact, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[11px] font-inter text-white/40 uppercase tracking-wider mb-1">
                {fact.label}
              </div>
              <div className="font-sora text-lg sm:text-xl font-semibold text-white">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal Dialog */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="editorial-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0d0f15] shadow-2xl relative"
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-lg bg-white/[0.05] transition-colors"
                aria-label="Close Certificate Preview"
              >
                <X size={18} />
              </button>

              <div className="mb-4 pr-8">
                <div className="text-xs font-inter text-cyan-400 font-medium uppercase tracking-wider mb-1">
                  Certificate of Participation
                </div>
                <h3 className="font-sora text-lg font-semibold text-white">
                  {activeCert.name} — {activeCert.program}
                </h3>
                <div className="text-xs font-inter text-white/50">
                  {activeCert.issuer} • {activeCert.subIssuer}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center max-h-[55vh]">
                <img
                  src={activeCert.certImage}
                  alt={`Certificate for ${activeCert.name}`}
                  className="w-full h-auto object-contain max-h-[55vh]"
                  width="2526"
                  height="1786"
                />
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  VERIFIED PARTICIPANT CREDENTIAL
                </span>

                <div className="flex items-center gap-2">
                  {activeCert.pdfUrl && (
                    <a
                      href={activeCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs font-inter px-4 py-2 flex items-center gap-1.5"
                    >
                      <span>Open Official PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="btn-glass text-xs font-inter px-4 py-2"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Statistics
