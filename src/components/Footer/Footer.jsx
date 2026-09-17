import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Phone, MessageSquare, ArrowRight, Instagram } from 'lucide-react'
import { ACADEMY_INFO, FLAGSHIP_PROGRAM, INFRASTRUCTURE_PARTNER } from '../../data/academyData'

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="font-inter text-white/50 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
  >
    {children}
  </a>
)

const Footer = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <footer id="footer" ref={sectionRef} className="relative border-t border-white/[0.08] bg-[#050608] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
        {/* Top Institutional Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-white/[0.08]">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 max-w-2xl">
            <img
              src="/bharatos-academy-logo.png"
              alt="BharatOS Academy — Shahdol"
              className="w-12 sm:w-16 h-auto shrink-0 drop-shadow-[0_0_15px_rgba(0,240,255,0.15)] mt-1 sm:mt-0"
              width="64"
              height="82"
              loading="lazy"
            />
            <div>
              <div className="font-sora text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-1">
                BharatOS <span className="font-normal text-white/70">Academy</span>
              </div>
              <p className="font-inter text-cyan-400 text-xs sm:text-sm font-medium mb-1.5">
                {FLAGSHIP_PROGRAM.name} • {ACADEMY_INFO.taglineEnglish} • {FLAGSHIP_PROGRAM.fee}
              </p>
              <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed">
                {ACADEMY_INFO.taglineHindi} — Empowering learners across central India with practical AI skills, websites without coding, creative media, and automation.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=Hello%20BharatOS%20Academy%2C%20I%20want%20to%20inquire%20about%20admissions%20for%20the%2045-Day%20AI%20Foundation%20Course.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs font-inter font-medium px-6 py-3 flex items-center justify-center gap-2"
            >
              <MessageSquare size={15} />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/[0.08]">
          {/* Academy Location */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Physical Campus</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed">
                  <div>Near Jain Mandir,</div>
                  <div>Near Mohanram Talab,</div>
                  <div>Shahdol, Madhya Pradesh</div>
                </div>
              </div>
              <div className="pt-2 text-[11px] font-mono text-cyan-400">
                GEO: {ACADEMY_INFO.location.coordinates.label}
              </div>
            </div>
          </div>

          {/* Academic Offerings */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Program Details</h4>
            <div className="space-y-2.5">
              <FooterLink href="#courses">{FLAGSHIP_PROGRAM.name}</FooterLink>
              <FooterLink href="#gyanoday">Gyanoday Partnership Offer</FooterLink>
              <FooterLink href="#courses">Duration: {FLAGSHIP_PROGRAM.duration} ({FLAGSHIP_PROGRAM.fee})</FooterLink>
              <FooterLink href="#infrastructure">Hardware Workstation Labs</FooterLink>
            </div>
          </div>

          {/* Infrastructure Partner */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Learning Facility</h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-inter text-white/60 leading-relaxed">
              <div className="text-white font-medium">{INFRASTRUCTURE_PARTNER.partnerName}</div>
              <div>In-Class Laptop Workstations</div>
              <div>Smartboard Visual Classroom</div>
              <div className="pt-1">
                <FooterLink href="#infrastructure">View Facility Setup</FooterLink>
              </div>
            </div>
          </div>

          {/* Direct Inquiries */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Admissions & Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-cyan-400 shrink-0" />
                <a
                  href={`tel:${ACADEMY_INFO.contact.phone}`}
                  className="font-inter text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  {ACADEMY_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${ACADEMY_INFO.contact.email}`}
                  className="font-inter text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  {ACADEMY_INFO.contact.email}
                </a>
              </div>
              <div className="pt-1 text-xs font-inter text-white/40">
                Founder & Mentor: Lav Kumar Soni
              </div>
            </div>
          </div>
        </div>

        {/* Official Instagram Follow Section */}
        <div className="py-8 sm:py-10 border-b border-white/[0.08]">
          <div className="editorial-card p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#090b10] border border-white/[0.08] hover:border-cyan-500/25 transition-all">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Instagram size={22} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase mb-1">
                  <span>Official Social Channel</span>
                  <span>•</span>
                  <span>@bharatosacademy</span>
                </div>
                <h4 className="font-sora text-base sm:text-lg font-semibold text-white tracking-tight">
                  Follow us on Instagram
                </h4>
                <p className="font-inter text-white/60 text-xs sm:text-sm mt-0.5">
                  Latest batches, workshops, announcements & academy updates
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/bharatosacademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-xs font-inter font-medium px-5 py-2.5 flex items-center gap-2 text-cyan-400 hover:text-white border-cyan-500/30 hover:border-cyan-400 w-full sm:w-auto justify-center shrink-0 group"
            >
              <span>Follow @bharatosacademy</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-white/40 text-xs sm:text-sm">
            © 2026 BharatOS Academy. All rights reserved.
          </p>
          <div className="font-inter text-white/40 text-xs flex items-center gap-2">
            <span>Shahdol District, Madhya Pradesh</span>
            <span>•</span>
            <span>Practical AI Education</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
