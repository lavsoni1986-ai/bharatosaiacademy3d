/**
 * BharatOS AI Academy — Authoritative Institutional Data
 * 
 * Strict Verification Standards:
 * - Single source of truth for all institutional facts.
 * - Only verified real business information is included.
 * - No fabricated statistics, salaries, job guarantees, or synthetic claims.
 */

export const ACADEMY_INFO = {
  name: 'BharatOS Academy',
  fullName: 'BharatOS Academy',
  taglineHindi: 'छोटे शहरों के बड़े सपनों के लिए AI शिक्षा',
  taglineEnglish: 'AI Skills for Every Bharat',
  mottoEnglish: 'LEARN | CREATE | EARN | GROW',
  mottoHindi: 'सीखो | बनाओ | कमाओ | अपने शहर से, दुनिया के लिए',
  location: {
    street: 'Near Jain Mandir, Near Mohanram Talab',
    city: 'Shahdol',
    state: 'Madhya Pradesh',
    country: 'India',
    fullAddress: 'Near Jain Mandir, Near Mohanram Talab, Shahdol, Madhya Pradesh',
    displayLocation: 'Near Jain Mandir, Near Mohanram Talab, Shahdol, Madhya Pradesh',
    shortLocation: 'Shahdol, Madhya Pradesh',
    coordinates: {
      lat: 23.3002,
      lng: 81.3656,
      label: '23.3002° N, 81.3656° E',
    },
  },
  contact: {
    phone: '9753239303',
    phoneDisplay: '+91 9753239303',
    whatsapp: '919753239303',
    email: 'lavsoni1986@gmail.com',
    website: 'https://bharatos-academy.vercel.app/',
  },
}

export const COURSE_BENEFITS = [
  {
    title: 'Small Batches',
    titleHindi: 'छोटे बैच',
    description: 'Limited cohort size to ensure individual attention and personalized guidance for every learner.',
  },
  {
    title: 'Personal Super Guidance',
    titleHindi: 'व्यक्तिगत मार्गदर्शन',
    description: 'Direct 1-on-1 mentorship by a Google Cloud Certified AI Architect throughout the 45 days.',
  },
  {
    title: 'Hands-on Practice with Laptops',
    titleHindi: 'लैपटॉप पर हैंड्स-ऑन अभ्यास',
    description: 'In-class hardware workstations available. Personal laptop ownership is not required to enroll.',
  },
  {
    title: 'Industry-relevant Certificate',
    titleHindi: 'उद्योग-मान्य प्रमाण-पत्र',
    description: 'Official BharatOS Academy course completion certificate to build your professional portfolio.',
  },
  {
    title: 'NASSCOM Aligned',
    titleHindi: 'NASSCOM अलाइन्ड',
    description: 'Curriculum structured in alignment with recognized national digital skilling standards.',
  },
  {
    title: 'Career & Freelancing Support',
    titleHindi: 'करियर और फ्रीलांसिंग सहायता',
    description: 'Guidance on client pitching, profile building, service delivery, and monetization with AI.',
  },
]

export const DISCOUNT_CATEGORIES = [
  {
    id: 'school_9_12',
    category: 'Class 9th–12th School Students',
    categoryHindi: 'कक्षा 9वीं से 12वीं के स्कूली छात्र',
    benefit: 'Special Discount',
    description: 'Dedicated concession for school students (from other schools). Eligibility verified during admission.',
  },
  {
    id: 'st_sc',
    category: 'ST / SC Students',
    categoryHindi: 'ST / SC वर्ग के छात्र',
    benefit: 'Special Discount',
    description: 'Special educational enablement concession upon verification of student category during admission.',
  },
  {
    id: 'govt_school',
    category: 'Government School Students',
    categoryHindi: 'सरकारी स्कूल के विद्यार्थी',
    benefit: 'Special Discount',
    description: 'Direct institutional concession to support digital inclusion for government school students upon verification.',
  },
]

export const FLAGSHIP_PROGRAM = {
  name: '45-Day AI Foundation Course',
  shortName: 'AI Foundation Course',
  subtitle: '45-Day Practical AI Program',
  badge: 'PRIMARY ACADEMY PROGRAM',
  duration: '45 Days',
  fee: '₹8,999/-',
  feeDisplay: '₹8,999/-',
  feeNumeric: 8999,
  learningModel: 'Smartphone-First Learning + In-Class Laptop & Smartboard Labs',
  summary: 'A structured 45-day practical program designed to take students from foundational AI concepts to building real websites, games, graphics, videos, automation workflows, and freelancing skills.',
  modules: [
    {
      id: 'mod-1',
      number: '01',
      title: 'AI Basics',
      subtitle: 'Gemini, ChatGPT & More',
      duration: 'Module 01',
      description: 'AI को समझें, रोजमर्रा में उपयोग करें',
      outcome: 'Understand the fundamentals of generative AI and use AI tools effectively in everyday work.',
      focus: ['Generative AI Fundamentals', 'Gemini & ChatGPT Practical Use', 'Everyday Productivity Hacks'],
    },
    {
      id: 'mod-2',
      number: '02',
      title: 'Prompt Engineering',
      subtitle: 'बेहतर Prompt, बेहतर परिणाम',
      duration: 'Module 02',
      description: 'Learn effective prompting techniques for superior AI output.',
      outcome: 'Learn how to communicate effectively with AI models and create better prompts for better results.',
      focus: ['Context Architecture', 'Zero & Few-Shot Prompting', 'System Role Framing'],
    },
    {
      id: 'mod-3',
      number: '03',
      title: 'AI से Website बनाएँ',
      subtitle: 'No Coding Required',
      duration: 'Module 03',
      description: 'बिना Coding वेबसाइट बनाएँ',
      outcome: 'Create websites, landing pages and useful web experiences with AI tools.',
      focus: ['No-Code Web Creation', 'Landing Page Deployment', 'AI Content Integration'],
    },
    {
      id: 'mod-4',
      number: '04',
      title: 'AI से Game बनाएँ',
      subtitle: 'Idea से Game तक का सफर',
      duration: 'Module 04',
      description: 'AI टूल्स से गेम डिजाइन और इंटरैक्टिव प्रोटोटाइप बनाएँ',
      outcome: 'Create simple interactive browser games using AI-assisted workflows.',
      focus: ['Interactive Game Logic', 'Visual Asset Generation', 'Browser Game Publishing'],
    },
    {
      id: 'mod-5',
      number: '05',
      title: 'AI से Graphics & Video',
      subtitle: 'Poster, Reel, Ad, YouTube Content',
      duration: 'Module 05',
      description: 'क्रिएटिव कंटेंट बनाइए',
      outcome: 'Use AI for posters, reels, advertisements and YouTube content.',
      focus: ['Social Media Posters & Ads', 'AI Video & Reel Creation', 'YouTube Thumbnail & Media'],
    },
    {
      id: 'mod-6',
      number: '06',
      title: 'AI for Business',
      subtitle: 'Local Business & Office Growth',
      duration: 'Module 06',
      description: 'अपने व्यवसाय को बढ़ाएं',
      outcome: 'Learn practical AI workflows for local businesses, marketing, customer support and productivity.',
      focus: ['Local Business Marketing', 'Customer Support Chatbots', 'Inventory & Sales Workflows'],
    },
    {
      id: 'mod-7',
      number: '07',
      title: 'Freelancing with AI',
      subtitle: 'Global Freelance Opportunities',
      duration: 'Module 07',
      description: 'Global Clients के साथ काम करना सीखें',
      outcome: 'Understand AI-assisted freelancing, client communication, service delivery and portfolio creation.',
      focus: ['Freelance Profile Setup', 'Client Proposal Pitching', 'AI Service Delivery'],
    },
    {
      id: 'mod-8',
      number: '08',
      title: 'Smartphone AI Mastery',
      subtitle: 'Mobile-First AI Practice',
      duration: 'Module 08',
      description: 'Mobile से भी Powerful AI',
      outcome: 'Use practical AI tools directly from smartphones.',
      focus: ['Mobile AI Workflows', 'Voice & Camera AI Prompts', 'On-the-go Productivity'],
    },
    {
      id: 'mod-9',
      number: '09',
      title: 'AI Tools & Automation',
      subtitle: 'Smart Workflows & Productivity',
      duration: 'Module 09',
      description: 'Time बचाएं, Smart बनिए',
      outcome: 'Understand AI tools, automation workflows and productivity systems.',
      focus: ['Repetitive Task Automation', 'Tool Integration & Webhooks', 'Intelligent Productivity Systems'],
    },
    {
      id: 'mod-10',
      number: '10',
      title: 'Real Projects & Certificate',
      subtitle: 'Portfolio & Capstone Review',
      duration: 'Module 10',
      description: 'Portfolio बनाइए, Career शुरू कीजिए',
      outcome: 'Build practical projects and create a portfolio for future opportunities.',
      focus: ['Hands-on Capstone Build', 'Portfolio Showcase', 'Course Certificate Review'],
    },
  ],
}

export const INFRASTRUCTURE_PARTNER = {
  partnerName: 'Muskan Associate',
  location: 'Shahdol, Madhya Pradesh',
  role: 'Infrastructure Partner',
  description: 'BharatOS Academy conducts in-person practical classes using physical facility infrastructure provided through Muskan Associate in Shahdol, ensuring students have access to in-class workstations and interactive displays.',
  partnerScope: "Muskan Associate provides the physical classroom infrastructure, workstation hardware, and smartboard environment used for BharatOS Academy's in-person practical learning in Shahdol.",
  facilities: [
    {
      title: 'In-Class Laptop Workstations',
      description: 'Students can use classroom hardware during scheduled practical sessions. Personal laptop ownership is not mandatory for enrollment.',
    },
    {
      title: 'Smartboard Interactive Classroom',
      description: 'Interactive smartboard visual classroom supporting live demonstrations, visual workflows, and group project reviews.',
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
    { label: 'Primary Program', value: '45-Day AI Foundation Course' },
    { label: 'Duration', value: '45 Days' },
    { label: 'Tuition Fee', value: '₹8,999/-' },
    { label: 'Curriculum Alignment', value: 'NASSCOM Aligned' },
  ],
}

export const FOUNDER_INFO = {
  name: 'Lav Kumar Soni',
  role: 'Founder & Chief AI Mentor',
  organization: 'BharatOS Academy',
  credential: 'Google Cloud Certified AI Architect',
  experience: '12+ Years in Media, Digital Systems & AI',
  background: 'Google Cloud Certified AI Architect with 12+ Years in Media, Digital Systems & AI. Dedicated to bringing cutting-edge, practical AI education to Shahdol and empowering the youth of small towns to build and compete globally.',
  location: 'Shahdol, Madhya Pradesh',
  portraitImage: '/founder.jpg.png',
}

export const GYANODAY_BATCH_INFO = {
  name: 'GYANODAY SCHOOL PARTNERSHIP',
  shortName: 'Gyanoday School Partnership',
  partnershipLockup: 'Gyanoday School × BharatOS Academy',
  exclusiveOfferBadge: 'Exclusive Offer for Gyanoday School Students',
  programType: 'Institutional School Partnership Offer',
  badge: 'INSTITUTIONAL PARTNERSHIP',
  audience: 'Exclusively for eligible Gyanoday School students in Shahdol',
  duration: '4 Months Access',
  disclaimer: 'This subsidized offer is exclusively for eligible Gyanoday School students under the institutional partnership.',
  pricingSummary: '₹1,599 One-Time  OR  ₹500 / Month',
  summary: 'A dedicated subsidized practical AI learning initiative established under an institutional partnership exclusively for eligible Gyanoday School students, providing structured school-level AI literacy, disciplined prompt protocols, and hands-on smartphone development.',
  plans: [
    {
      id: 'gyanoday_full',
      title: 'Gyanoday Special — Full Payment',
      badge: 'SUBSIDIZED ONE-TIME',
      fee: '₹1,599',
      feeNumeric: 1599,
      duration: '4 Months Complete Access',
      savingNote: 'Exclusive Gyanoday Student Offer',
      isRecommended: true,
      features: [
        'Complete 4-Month AI Curriculum for School Students',
        '1-on-1 Guidance by Google Cloud Certified Mentor',
        'Smartphone AI Development Lab & mobile sandbox exercises',
        'Official BharatOS Academy Certificate of Completion',
        'Scheduled practical in-person workstation sessions',
      ],
      whatsappText: 'Hello BharatOS Academy, I am a Gyanoday School student and want to register for the Gyanoday School Partnership Offer (Full Payment: ₹1,599). Please share the registration process.',
    },
    {
      id: 'gyanoday_monthly',
      title: 'Monthly Installment Plan',
      badge: 'FLEXIBLE SCHEDULE',
      fee: '₹500',
      feeNumeric: 500,
      duration: '₹500 / month × 4 Months',
      savingNote: 'Total: ₹2,000 (Billed Monthly across 4 Months)',
      isRecommended: false,
      features: [
        'Month-by-Month Modular Access',
        'Live AI Guided Practical Sessions',
        'Mobile Sandbox Exercises & prompt drills',
        'Community Peer Support & instructor reviews',
      ],
      whatsappText: 'Hello BharatOS Academy, I am a Gyanoday School student and want to register for the Gyanoday School Partnership Offer (Monthly Plan: ₹500/month). Please share the registration process.',
    },
  ],
  generalWhatsappText: 'Hello BharatOS Academy, I am an eligible Gyanoday School student and want to inquire about the Gyanoday partnership offer. Please share details.',
}


