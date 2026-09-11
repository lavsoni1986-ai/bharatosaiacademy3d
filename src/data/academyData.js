/**
 * BharatOS AI Academy — Authoritative Institutional Data
 * 
 * Strict Verification Standards:
 * - Single source of truth for all institutional facts.
 * - Only verified real business information is included.
 * - No fabricated statistics, salaries, job guarantees, or synthetic claims.
 */

export const ACADEMY_INFO = {
  name: 'BharatOS AI Academy',
  tagline: 'Practical AI & Software Engineering',
  location: {
    street: 'Near Jain Mandir, Near Mohanram Talab',
    city: 'Shahdol',
    state: 'Madhya Pradesh',
    country: 'India',
    fullAddress: 'Near Jain Mandir, Near Mohanram Talab, Shahdol, Madhya Pradesh',
    displayLocation: 'Near Jain Mandir, Near Mohanram Talab, Shahdol, Madhya Pradesh',
    coordinates: {
      lat: 23.3002,
      lng: 81.3656,
      label: '23.3002° N, 81.3656° E',
    },
  },
  contact: {
    phone: '+91 9753239303',
    whatsapp: '919753239303',
    email: 'lavsoni1986@gmail.com',
  },
}

export const FLAGSHIP_PROGRAM = {
  name: 'AI Foundation Course',
  subtitle: '45-Day Practical AI Program',
  badge: 'PRIMARY ACADEMY PROGRAM',
  duration: '45 Days',
  fee: '₹8,999',
  feeNumeric: 8999,
  learningModel: 'Smartphone-First Learning + In-Class Laptop & Smartboard Labs',
  summary: 'A structured 45-day practical program designed to take students from foundational AI concepts to building and deploying real-world software, automation workflows, and autonomous AI agents.',
  modules: [
    {
      id: 'mod-1',
      number: '01',
      title: 'AI Fundamentals & Mental Models',
      duration: 'Week 1',
      description: 'Core concepts of modern artificial intelligence, large language models, computer vision basics, and establishing disciplined prompt protocols.',
      focus: ['Foundational Concepts', 'LLM Mental Models', 'Prompt Protocol Discipline'],
    },
    {
      id: 'mod-2',
      number: '02',
      title: 'Prompt Engineering & Context Design',
      duration: 'Week 2',
      description: 'Systematic prompt structuring, few-shot prompting, chained reasoning, structured JSON output control, and system role framing.',
      focus: ['Role Framing', 'Context Architecture', 'Structured Output Control'],
    },
    {
      id: 'mod-3',
      number: '03',
      title: 'AI-Assisted Software Development',
      duration: 'Weeks 3–4',
      description: 'Hands-on development leveraging AI coding companions (Cursor, Copilot, Cline). Writing, debugging, testing, and shipping clean software from scratch.',
      focus: ['Cursor / Copilot Workflows', 'Clean Software Building', 'Debugging & Code Review'],
    },
    {
      id: 'mod-4',
      number: '04',
      title: 'Intelligent Automation & Workflows',
      duration: 'Weeks 4–5',
      description: 'Building connected business workflows, webhook pipelines, API integrations, and practical document parsing tools using visual automation platforms.',
      focus: ['Automation Pipelines', 'API & Webhook Integrations', 'Data Transformation'],
    },
    {
      id: 'mod-5',
      number: '05',
      title: 'Autonomous AI Agents',
      duration: 'Weeks 5–6',
      description: 'Designing autonomous agents capable of multi-step task execution, tool use, information retrieval, and self-correcting logic loops.',
      focus: ['Agent Decision Loops', 'Tool Calling & Memory', 'Task Execution Architecture'],
    },
    {
      id: 'mod-6',
      number: '06',
      title: 'Capstone Project & Local Deployment',
      duration: 'Final Phase',
      description: 'Building and publishing a functional software or automation product solving a practical problem in regional commerce, administration, or education.',
      focus: ['Production Deployment', 'Capstone Prototype', 'Course Completion Review'],
    },
  ],
}

export const INFRASTRUCTURE_PARTNER = {
  partnerName: 'Muskan Associate',
  location: 'Shahdol, Madhya Pradesh',
  role: 'Infrastructure Partner',
  description: 'BharatOS AI Academy conducts in-person practical classes using physical facility infrastructure provided through Muskan Associate in Shahdol, ensuring students have access to in-class workstations and interactive displays.',
  partnerScope: "Muskan Associate provides the physical classroom infrastructure, workstation hardware, and smartboard environment used for BharatOS AI Academy's in-person practical learning in Shahdol.",
  facilities: [
    {
      title: 'In-Class Laptop Workstations',
      description: 'Students can use classroom hardware during scheduled practical sessions. Personal laptop ownership is not mandatory for enrollment.',
    },
    {
      title: 'Smartboard Interactive Classroom',
      description: 'Interactive smartboard visual classroom supporting live architectural demonstrations, live-coding sessions, and group code reviews.',
    },
    {
      title: 'Smartphone-First Practice',
      description: 'Curriculum structured so students can practice prompts, test workflows, and study assignments directly on mobile phones outside class hours.',
    },
  ],
}

export const FIRST_BATCH_PROOFS = {
  title: 'First Batch Outcomes',
  subtitle: 'Verified Student Milestones',
  summary: 'Our initial student cohort in Shahdol completed practical AI training, with students earning Certificates of Participation from NASSCOM IT-ITeS SSC / FutureSkills Prime under the Yuva AI for All initiative.',
  groupPhoto: '/students/batch-1-group.png',
  students: [
    {
      name: 'Rohit Dhurwey',
      location: 'Shahdol, Madhya Pradesh',
      program: 'Yuva AI for All',
      credential: 'Certificate of Participation',
      issuer: 'NASSCOM IT-ITeS SSC / FutureSkills Prime',
      subIssuer: 'Under the Yuva AI for All initiative (A MeitY - NASSCOM Digital Skilling Initiative)',
      certImage: '/certificates/rohit_dhurwey_cert.png',
      pdfUrl: '/certificates/rohit_dhurwey_831092.pdf',
    },
    {
      name: 'Jyoti Singh',
      location: 'Shahdol, Madhya Pradesh',
      program: 'Yuva AI for All',
      credential: 'Certificate of Participation',
      issuer: 'NASSCOM IT-ITeS SSC / FutureSkills Prime',
      subIssuer: 'Under the Yuva AI for All initiative (A MeitY - NASSCOM Digital Skilling Initiative)',
      certImage: '/certificates/jyoti_singh_cert.png',
      pdfUrl: '/certificates/Jyoti_Singh_834183.pdf',
    },
  ],
  verifiedFacts: [
    { label: 'Primary Program', value: 'AI Foundation Course' },
    { label: 'Duration', value: '45 Days' },
    { label: 'Tuition Fee', value: '₹8,999' },
    { label: 'Infrastructure Partner', value: 'Muskan Associate' },
  ],
}

export const FOUNDER_INFO = {
  name: 'Lav Soni',
  role: 'Founder & Chief AI Mentor',
  organization: 'BharatOS AI Academy',
  credential: 'Google Cloud Certified AI Architect',
  background: 'Extensive professional experience in media systems, digital platforms, and software architecture. Focused on delivering practical, job-relevant AI skills to students across Shahdol and central India.',
  location: 'Shahdol, Madhya Pradesh',
  portraitImage: '/founder.jpg.png',
}

