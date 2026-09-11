import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Brain, MessageSquare, Code, Bot, FileText, Zap, Database, Layers } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'AI Literacy',
    description: 'Master the fundamentals of artificial intelligence, machine learning concepts, and AI ethics.',
    icon: Brain,
    color: '#00F5FF',
    duration: '4 Weeks',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    description: 'Learn advanced prompting techniques to get the most out of LLMs and AI models.',
    icon: MessageSquare,
    color: '#8A2EFF',
    duration: '3 Weeks',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'AI Coding',
    description: 'Code with AI assistance. Build applications using GitHub Copilot, Cursor, and AI IDEs.',
    icon: Code,
    color: '#00F5FF',
    duration: '6 Weeks',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'AI Agents',
    description: 'Build autonomous AI agents that can perform complex tasks and workflows.',
    icon: Bot,
    color: '#8A2EFF',
    duration: '5 Weeks',
    level: 'Advanced',
  },
  {
    id: 5,
    title: 'LLM Mastery',
    description: 'Deep dive into Large Language Models, fine-tuning, RAG, and model deployment.',
    icon: FileText,
    color: '#00F5FF',
    duration: '8 Weeks',
    level: 'Advanced',
  },
  {
    id: 6,
    title: 'Automation',
    description: 'Automate workflows with AI-powered tools like n8n, Make, and custom pipelines.',
    icon: Zap,
    color: '#8A2EFF',
    duration: '4 Weeks',
    level: 'Intermediate',
  },
  {
    id: 7,
    title: 'Python for AI',
    description: 'Python programming tailored for AI/ML development with real-world projects.',
    icon: Database,
    color: '#00F5FF',
    duration: '6 Weeks',
    level: 'Beginner',
  },
  {
    id: 8,
    title: 'Full Stack AI',
    description: 'End-to-end AI application development from frontend to backend deployment.',
    icon: Layers,
    color: '#8A2EFF',
    duration: '10 Weeks',
    level: 'Advanced',
  },
]

const CourseCard = ({ course, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-20px' })

  const Icon = course.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className="editorial-card p-6 h-full flex flex-col justify-between group">
        <div>
          {/* Subtle Icon Accent */}
          <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 text-cyan-400 group-hover:text-white group-hover:border-cyan-500/30 transition-colors">
            <Icon size={20} strokeWidth={1.75} />
          </div>

          {/* Title */}
          <h3 className="font-sora text-lg font-semibold text-white mb-2 tracking-tight">
            {course.title}
          </h3>

          {/* Description */}
          <p className="font-inter text-white/60 text-sm leading-relaxed mb-6 font-normal">
            {course.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-inter">
          <span className="text-white/75 font-medium">
            {course.duration}
          </span>
          <span className="text-white/40">{course.level}</span>
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
      className="relative py-28 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080b]"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="max-w-2xl mb-16 text-left">
          <span className="text-xs font-inter text-cyan-400 font-medium tracking-wider uppercase block mb-3">
            Academic Curriculum
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Practical AI Programs
          </h2>
          <p className="font-inter text-white/65 text-base sm:text-lg leading-relaxed">
            Rigorous, hands-on modules designed to move developers from fundamental software literacy to autonomous multi-agent engineering.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseModules
