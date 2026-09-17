import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle2, Download, Copy, Check, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'
import { ACADEMY_INFO, GYANODAY_BATCH_INFO } from '../../data/academyData'
import { generateRegistrationId } from '../../lib/admissionData'
import { generateReceiptPDF } from '../../lib/pdfReceipt'

const PHONE_REGEX = /^[6-9]\d{9}$/

const CLASS_OPTIONS = [
  'Class 9th (Gyanoday / Local School)',
  'Class 10th (Gyanoday / Local School)',
  'Class 11th (Gyanoday / Local School)',
  'Class 12th (Gyanoday / Local School)',
  'College Student (Undergraduate)',
  'Other School / Self-Learner',
]

const GOAL_OPTIONS = [
  'AI / Software Developer',
  'Data Science & Automation',
  'Engineering / STEM Higher Studies',
  'School Project & Practical AI Skills',
  'Entrepreneurship & Tech Innovation',
  'Other Career Goal',
]

const STUDENT_CATEGORY_OPTIONS = [
  'General / Standard Admission',
  'Class 9–12 Student (Special Discount Eligible)',
  'ST / SC Student (Special Discount Eligible)',
  'Government School Student (Special Discount Eligible)',
  'Gyanoday School Student (Gyanoday Partnership Offer)',
  'Other / Self-Learner',
]

export default function GyanodayRegistrationModal({ isOpen, onClose, defaultPlanId = 'gyanoday_full' }) {
  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId)
  const [studentName, setStudentName] = useState('')
  const [studentMobile, setStudentMobile] = useState('')
  const [parentMobile, setParentMobile] = useState('')
  const [qualification, setQualification] = useState(CLASS_OPTIONS[1]) // default 10th
  const [futureGoal, setFutureGoal] = useState(GOAL_OPTIONS[0])
  const [studentCategory, setStudentCategory] = useState(STUDENT_CATEGORY_OPTIONS[0])
  const [honeypot, setHoneypot] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [completedAdmission, setCompletedAdmission] = useState(null)
  const [copiedId, setCopiedId] = useState(false)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)

  // Update selected plan if defaultPlanId changes when opened
  useEffect(() => {
    if (defaultPlanId) {
      setSelectedPlanId(defaultPlanId)
    }
  }, [defaultPlanId, isOpen])

  // Prevent background page scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Support ESC key to close modal
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const selectedPlan =
    GYANODAY_BATCH_INFO.plans.find((p) => p.id === selectedPlanId) ||
    GYANODAY_BATCH_INFO.plans[0]

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDownloadPdf = async (admissionData) => {
    try {
      const pdfBytes = await generateReceiptPDF(
        {
          registrationId: admissionData.registrationId,
          studentName: admissionData.studentName,
          studentMobile: admissionData.studentMobile,
          parentMobile: admissionData.parentMobile || 'Not provided',
          qualification: admissionData.qualification,
          futureGoal: admissionData.futureGoal,
        },
        { paperSize: 'A4' }
      )

      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setPdfBlobUrl(url)

      const link = document.createElement('a')
      link.href = url
      link.download = `${admissionData.registrationId}-admission.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('PDF generation error:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (honeypot) return

    const trimmedName = studentName.trim()
    const trimmedStudentMobile = studentMobile.trim()
    const trimmedParentMobile = parentMobile.trim()

    if (!trimmedName) {
      setError('Please enter student full name.')
      return
    }

    if (!PHONE_REGEX.test(trimmedStudentMobile)) {
      setError('Please enter a valid 10-digit Indian student mobile number (starting with 6, 7, 8, or 9).')
      return
    }

    if (trimmedParentMobile && !PHONE_REGEX.test(trimmedParentMobile)) {
      setError('Please enter a valid 10-digit Indian parent mobile number, or leave it blank.')
      return
    }

    setLoading(true)

    try {
      const registrationId = generateRegistrationId()

      const admissionRecord = {
        registrationId,
        studentName: trimmedName,
        studentMobile: trimmedStudentMobile,
        parentMobile: trimmedParentMobile || 'Not provided',
        qualification,
        futureGoal,
        studentCategory,
        paymentPlan: `${selectedPlan.title} (${selectedPlan.fee})`,
        source: 'BharatOS Academy — Admission Desk',
      }

      // 1. Instant client-side PDF receipt generation and download
      await handleDownloadPdf(admissionRecord)

      // 2. Dispatch background API notification to /api/admission
      fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admissionRecord),
      }).catch((err) => {
        console.warn('Background admission API sync non-blocking error:', err)
      })

      setCompletedAdmission(admissionRecord)
    } catch (err) {
      console.error('Registration processing error:', err)
      setError('An error occurred during registration. Please try again or contact WhatsApp desk.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyId = () => {
    if (!completedAdmission) return
    navigator.clipboard.writeText(completedAdmission.registrationId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2500)
  }

  const getWhatsAppVerificationUrl = () => {
    if (!completedAdmission) return ''
    const msg = `Hello BharatOS Academy, I have completed Gyanoday student registration.
Registration ID: ${completedAdmission.registrationId}
Student Name: ${completedAdmission.studentName}
Mobile: ${completedAdmission.studentMobile}
Selected Plan: ${completedAdmission.paymentPlan}
Payment Status: Pending Manual Verification

I am sharing the fee payment screenshot for verification.`
    return `https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gyanoday-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0c0e17] border border-cyan-500/35 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left"
      >
        {/* Sticky Modal Header — Always visible, never scrolls away */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-4.5 border-b border-white/[0.08] bg-[#0c0e17]/95 backdrop-blur-sm shrink-0 z-10">
          <div className="min-w-0 flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full mb-1">
              <span>Gyanoday School Cohort</span>
              <span>•</span>
              <span>Admission Desk</span>
            </div>
            <h3 id="gyanoday-modal-title" className="font-sora text-lg sm:text-xl font-semibold text-white tracking-tight">
              {completedAdmission ? 'Admission Receipt Generated' : 'Student Admission Registration'}
            </h3>
            <p className="font-inter text-xs text-white/60 mt-0.5 hidden sm:block">
              {completedAdmission
                ? 'Official admission receipt has been downloaded with your Registration ID.'
                : 'Complete student details to generate your official Admission Receipt (PDF).'}
            </p>
          </div>

          {/* High-Contrast Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-cyan-500/20 active:bg-cyan-500/30 border border-white/20 hover:border-cyan-400 text-white/80 hover:text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
            aria-label="Close registration form"
          >
            <X size={19} />
          </button>
        </div>

        {/* Scrollable Body — Internal vertical scroll inside modal */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 overscroll-contain">
          {!completedAdmission ? (
            /* STEP 1: REGISTRATION FORM */
            <div>
              {/* Error Banner */}
              {error && (
                <div className="mb-5 p-3.5 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-inter flex items-start gap-2.5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Plan Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Select Admission Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GYANODAY_BATCH_INFO.plans.map((p) => {
                      const isSelected = selectedPlanId === p.id
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setSelectedPlanId(p.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg'
                              : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-sora text-sm font-semibold text-white">
                              {p.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                              {p.badge}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-sora text-xl font-bold text-cyan-400">
                              {p.fee}
                            </span>
                            <span className="text-[11px] font-mono text-emerald-400">
                              {p.savingNote}
                            </span>
                          </div>
                          <div className="text-[11px] font-inter text-white/50 mt-1">
                            {p.duration}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Student Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Student Mobile <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-mono text-white/40">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={studentMobile}
                        onChange={(e) => setStudentMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Parent / Guardian Mobile <span className="text-white/40">(Optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-mono text-white/40">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={parentMobile}
                        onChange={(e) => setParentMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Class & Future Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Current Class / Qualification <span className="text-cyan-400">*</span>
                    </label>
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      {CLASS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0b0f19] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Future Goal / Career Goal <span className="text-cyan-400">*</span>
                    </label>
                    <select
                      value={futureGoal}
                      onChange={(e) => setFutureGoal(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0b0f19] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phase 6: Student Category / Special Concession (Optional) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Student Category / Special Concession <span className="text-white/40">(Optional)</span>
                  </label>
                  <select
                    value={studentCategory}
                    onChange={(e) => setStudentCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  >
                    {STUDENT_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0b0f19] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] font-inter text-white/45 mt-1">
                    Select if eligible for Class 9–12, ST/SC, or Govt School special discount, or Gyanoday School partnership offer. Eligibility verified upon document submission.
                  </p>
                </div>

                {/* Honeypot anti-spam field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {/* Submit CTA */}
                <div className="pt-3 pb-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 px-6 rounded-xl font-inter text-sm font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Generating Receipt PDF & Registering...</span>
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        <span>Register & Download Admission Receipt (PDF)</span>
                      </>
                    )}
                  </button>
                  <div className="text-center text-[11px] font-inter text-white/40 mt-2">
                    Official A4 Admission Receipt PDF with Registration ID is automatically generated.
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* STEP 2: CONFIRMATION VIEW */
            <div>
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-2.5 shadow-lg">
                  <CheckCircle2 size={26} />
                </div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-0.5 rounded-full mb-1.5">
                  Registration Confirmed
                </div>
                <h4 className="font-sora text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Admission Receipt Generated
                </h4>
                <p className="font-inter text-xs text-white/60 mt-0.5">
                  Your admission receipt PDF has been downloaded to your device.
                </p>
              </div>

              {/* Registration ID Highlight Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 mb-4">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Unique Registration ID
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-lg sm:text-2xl font-bold text-white tracking-wider">
                    {completedAdmission.registrationId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Student & Fee Summary */}
              <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-inter mb-4">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Student Name</span>
                  <span className="text-white font-medium">{completedAdmission.studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Mobile</span>
                  <span className="text-white font-mono">{completedAdmission.studentMobile}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Selected Plan</span>
                  <span className="text-cyan-300 font-medium">{completedAdmission.paymentPlan}</span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-white/50">Payment Status</span>
                  <span className="text-amber-400 font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                    Pending Manual Verification (via WhatsApp Screenshot)
                  </span>
                </div>
              </div>

              {/* Guidance */}
              <p className="text-xs font-inter text-white/70 mb-5 leading-relaxed bg-cyan-950/20 border border-cyan-500/20 p-3 rounded-xl">
                <span className="font-semibold text-cyan-300">Next Step:</span> Share your fee payment screenshot with your Registration ID on WhatsApp or present your receipt at the BharatOS Academy physical desk near Jain Mandir, Mohanram Talab, Shahdol.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={getWhatsAppVerificationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-inter font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare size={16} />
                  <span>Send Screenshot on WhatsApp Desk</span>
                </a>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(completedAdmission)}
                    className="btn-glass flex-1 py-2.5 px-4 text-xs font-inter text-white/80 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Receipt PDF Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-glass px-6 py-2.5 text-xs font-inter text-white/60 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
