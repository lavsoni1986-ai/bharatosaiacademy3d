import React, { useRef, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MapPin, Mail, Phone, Twitter, Linkedin, Github, Youtube } from 'lucide-react'
import CanvasErrorBoundary from '../Common/CanvasErrorBoundary'

// Shared Box Geometry for Instanced Buildings
const cityBoxGeometry = new THREE.BoxGeometry(1, 1, 1)

// --- CYBER CITY BACKGROUND ---
const CyberCity = React.memo(() => {
  const meshRef = useRef()
  const particlesRef = useRef()

  const buildings = useMemo(() => {
    const data = []
    const tempObject = new THREE.Object3D()
    const colorObj = new THREE.Color()
    const colors = []

    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const width = 0.5 + Math.random() * 1.5
      const height = 2 + Math.random() * 8
      const depth = 0.5 + Math.random() * 1.5
      const isCyan = Math.random() > 0.5

      tempObject.position.set(x, height / 2 - 5, z)
      tempObject.scale.set(width, height, depth)
      tempObject.updateMatrix()

      data.push(tempObject.matrix.clone())
      colorObj.set(isCyan ? '#00F5FF' : '#8A2EFF')
      colors.push(colorObj.clone())
    }
    return { data, colors }
  }, [])

  useEffect(() => {
    if (!meshRef.current) return
    buildings.data.forEach((matrix, i) => {
      meshRef.current.setMatrixAt(i, matrix)
      meshRef.current.setColorAt(i, buildings.colors[i])
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [buildings])

  const particles = useMemo(() => {
    const pos = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = Math.random() * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < 300; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002
        if (posArray[i * 3 + 1] > 15) posArray[i * 3 + 1] = 0
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Instanced Buildings */}
      <instancedMesh
        ref={meshRef}
        args={[cityBoxGeometry, undefined, buildings.data.length]}
      >
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#00F5FF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00F5FF"
          size={0.03}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ground grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050510" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
})

// --- EDITORIAL INSTITUTIONAL BRAND LOGO ---
const EditorialFooterLogo = React.memo(() => {
  return (
    <div className="relative inline-block text-center">
      <div className="font-sora text-4xl md:text-6xl font-semibold text-white tracking-tight">
        BharatOS <span className="font-normal text-white/70">AI Academy</span>
      </div>
      <p className="font-inter text-white/50 text-sm mt-3 tracking-normal">
        Shahdol, Madhya Pradesh, India
      </p>
    </div>
  )
})

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="font-inter text-white/50 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
  >
    {children}
  </a>
)

const SocialIcon = ({ icon: Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors duration-200"
  >
    <Icon size={16} />
  </a>
)

const Footer = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <footer id="footer" ref={sectionRef} className="relative min-h-[70vh] border-t border-white/[0.08] bg-[#050507] overflow-hidden">
      {/* 3D Architectural City Background */}
      <div className="absolute inset-0 opacity-40">
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 5, 20], fov: 60 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]}
            style={{ background: '#050505' }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement
              const handleContextLost = (e) => {
                e.preventDefault()
                console.warn('WebGL context lost in Footer. Handling gracefully...')
              }
              const handleContextRestored = () => {
                console.log('WebGL context restored in Footer.')
              }
              canvas.addEventListener('webglcontextlost', handleContextLost, false)
              canvas.addEventListener('webglcontextrestored', handleContextRestored, false)
            }}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="#00F5FF" />
            <pointLight position={[10, 5, 10]} intensity={0.3} color="#8A2EFF" />
            <CyberCity />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 sm:px-8 py-20">
        {/* Institutional Brand Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <EditorialFooterLogo />
        </motion.div>

        {/* Footer Grid */}
        <motion.div
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-10 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* About */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Academy</h4>
            <div className="space-y-2.5">
              <FooterLink href="#">Our Mission</FooterLink>
              <FooterLink href="#">Faculty & Mentors</FooterLink>
              <FooterLink href="#">Shahdol Campus</FooterLink>
              <FooterLink href="#">Admissions</FooterLink>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Curriculum</h4>
            <div className="space-y-2.5">
              <FooterLink href="#courses">AI Literacy</FooterLink>
              <FooterLink href="#courses">Prompt Engineering</FooterLink>
              <FooterLink href="#courses">Autonomous Agents</FooterLink>
              <FooterLink href="#courses">Full Stack AI</FooterLink>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-sora text-white font-semibold mb-6">Resources</h4>
            <div className="space-y-3">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Community</FooterLink>
              <FooterLink href="#">AI Tools Directory</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sora text-white text-sm font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                <span className="font-inter text-white/50 text-xs sm:text-sm">
                  Shahdol, Madhya Pradesh, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-white/40 shrink-0" />
                <span className="font-inter text-white/50 text-xs sm:text-sm">
                  academy@bharatos.in
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-white/40 shrink-0" />
                <span className="font-inter text-white/50 text-xs sm:text-sm">
                  +91 70000 00000
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <SocialIcon icon={Twitter} href="#" />
          <SocialIcon icon={Linkedin} href="#" />
          <SocialIcon icon={Github} href="#" />
          <SocialIcon icon={Youtube} href="#" />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="w-full max-w-6xl border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-inter text-white/30 text-sm">
            © 2026 BharatOS AI Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-inter text-white/30 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-inter text-white/30 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
