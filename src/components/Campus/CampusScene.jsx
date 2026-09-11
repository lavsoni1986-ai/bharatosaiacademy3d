import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import CanvasErrorBoundary from '../Common/CanvasErrorBoundary'

// Shared Geometries for Architectural Elements
const windowGeometry = new THREE.PlaneGeometry(0.18, 0.22)
const planterGeometry = new THREE.BoxGeometry(0.6, 0.35, 0.6)
const bollardGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8)

// Shared Architectural Materials
const graphiteFacadeMaterial = new THREE.MeshStandardMaterial({
  color: '#12141a',
  roughness: 0.85,
  metalness: 0.15,
})

const architecturalGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#080a10',
  metalness: 0.2,
  roughness: 0.1,
  transparent: true,
  opacity: 0.65,
  transmission: 0.4,
  thickness: 0.6,
})

const portalFrameMaterial = new THREE.MeshStandardMaterial({
  color: '#181b22',
  roughness: 0.6,
  metalness: 0.4,
})

const pavedGroundMaterial = new THREE.MeshStandardMaterial({
  color: '#090a0d',
  roughness: 0.9,
  metalness: 0.05,
})

const pathwayMaterial = new THREE.MeshStandardMaterial({
  color: '#151820',
  roughness: 0.8,
  metalness: 0.1,
})

// --- INSTANCED WARM OCCUPIED WINDOWS ---
// Believable human-scale occupancy: 70% warm amber/cream interior light, 20% quiet dimmed light, 10% soft cyan lab light
const InstancedWindows = React.memo(({ buildingConfigs }) => {
  const meshRef = useRef()

  const windowData = useMemo(() => {
    const transforms = []
    const colors = []
    const tempObject = new THREE.Object3D()
    const colorObj = new THREE.Color()

    buildingConfigs.forEach((b) => {
      const rows = Math.floor(b.height * 2.2)
      const cols = Math.floor(b.width * 1.8)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const pseudoRand = Math.sin(b.position[0] * 12.3 + i * 7.1 + j * 13.7)
          // Varying occupancy: some windows on, some dark
          if (pseudoRand > -0.1) {
            const x = b.position[0] + (j - cols / 2 + 0.5) * (b.width / cols)
            const y = b.position[1] + (i - rows / 2 + 0.5) * (b.height / rows)
            const z = b.position[2] + b.depth / 2 + 0.015

            tempObject.position.set(x, y, z)
            tempObject.rotation.set(0, 0, 0)
            tempObject.scale.set(1, 1, 1)
            tempObject.updateMatrix()

            transforms.push(tempObject.matrix.clone())

            // Warm interior lighting variation
            if (pseudoRand > 0.6) {
              colorObj.set('#ffe1aa') // Warm ivory/amber office light
            } else if (pseudoRand > 0.25) {
              colorObj.set('#ffcc88') // Warm golden interior
            } else if (pseudoRand > 0.05) {
              colorObj.set('#d0d8e8') // Neutral white architectural studio
            } else {
              colorObj.set('#00e5ff') // Subtle cyan advanced AI laboratory
            }
            colors.push(colorObj.clone())
          }
        }
      }
    })
    return { transforms, colors }
  }, [buildingConfigs])

  useEffect(() => {
    if (!meshRef.current) return
    windowData.transforms.forEach((matrix, idx) => {
      meshRef.current.setMatrixAt(idx, matrix)
      meshRef.current.setColorAt(idx, windowData.colors[idx])
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [windowData])

  return (
    <instancedMesh
      ref={meshRef}
      args={[windowGeometry, undefined, windowData.transforms.length]}
    >
      <meshBasicMaterial transparent opacity={0.88} />
    </instancedMesh>
  )
})

// --- ARCHITECTURAL FACADE WING ---
const ArchitecturalBuilding = React.memo(({ position, height, width, depth }) => {
  return (
    <group position={position}>
      {/* Primary Graphite Massing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <primitive object={graphiteFacadeMaterial} attach="material" />
      </mesh>

      {/* Recessed Glass Atrium / Curtain Wall */}
      <mesh position={[0, 0, depth * 0.49]}>
        <planeGeometry args={[width * 0.85, height * 0.88]} />
        <primitive object={architecturalGlassMaterial} attach="material" />
      </mesh>

      {/* Roof Parapet Coping Accent */}
      <mesh position={[0, height / 2 + 0.05, 0]}>
        <boxGeometry args={[width + 0.08, 0.1, depth + 0.08]} />
        <primitive object={portalFrameMaterial} attach="material" />
      </mesh>
    </group>
  )
})

// --- MONUMENTAL NEURAL PORTAL & CENTRAL ATRIUM ---
const NeuralPortal = React.memo(() => {
  return (
    <group position={[0, 2.2, -1.8]}>
      {/* Monumental Portal Arch Frame */}
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[0.5, 4.4, 0.8]} />
        <primitive object={portalFrameMaterial} attach="material" />
      </mesh>
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[0.5, 4.4, 0.8]} />
        <primitive object={portalFrameMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[4.1, 0.5, 0.8]} />
        <primitive object={portalFrameMaterial} attach="material" />
      </mesh>

      {/* 4-Storey Transparent Entrance Glass Atrium */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[3.2, 4.0, 0.2]} />
        <primitive object={architecturalGlassMaterial} attach="material" />
      </mesh>

      {/* Interior Warm Foyer Light */}
      <pointLight position={[0, 0, 0.5]} intensity={1.2} distance={6} color="#ffe4b5" />

      {/* Subtle Integrated Cyan Data Channel Accent Line */}
      <mesh position={[0, 1.9, 0.41]}>
        <planeGeometry args={[2.8, 0.03]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
      </mesh>

      {/* Physical Architectural Academy Signage Mounted on Lintel */}
      <Text
        position={[0, 2.22, 0.42]}
        fontSize={0.2}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/sora/v12/xMQbuFFYT72XzQspDr-vWpOq5TX7.woff"
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
      >
        BHARATOS AI ACADEMY
      </Text>

      <Text
        position={[0, 2.02, 0.42]}
        fontSize={0.085}
        color="#a0aec0"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        letterSpacing={0.12}
        anchorX="center"
        anchorY="middle"
      >
        SHAHDOL CAMPUS
      </Text>

      {/* Portal Ground Threshold Step */}
      <mesh position={[0, -2.15, 0.6]}>
        <boxGeometry args={[3.6, 0.1, 1.2]} />
        <primitive object={pathwayMaterial} attach="material" />
      </mesh>
    </group>
  )
})

// --- PAVED COURTYARD & LANDSCAPING ---
const CourtyardLandscape = React.memo(() => {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Ground Substrate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[45, 45]} />
        <primitive object={pavedGroundMaterial} attach="material" />
      </mesh>

      {/* Central Paved Pedestrian Walkway leading to Portal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.5]}>
        <planeGeometry args={[3.2, 8]} />
        <primitive object={pathwayMaterial} attach="material" />
      </mesh>

      {/* Transverse Cross Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 3]}>
        <planeGeometry args={[14, 2.2]} />
        <primitive object={pathwayMaterial} attach="material" />
      </mesh>

      {/* Architectural Planters (Subtle Courtyard Softening) */}
      <mesh position={[-2.2, 0.18, 1.5]}>
        <primitive object={planterGeometry} attach="geometry" />
        <meshStandardMaterial color="#1a1c22" roughness={0.9} />
      </mesh>
      <mesh position={[2.2, 0.18, 1.5]}>
        <primitive object={planterGeometry} attach="geometry" />
        <meshStandardMaterial color="#1a1c22" roughness={0.9} />
      </mesh>
      <mesh position={[-2.2, 0.18, 4.5]}>
        <primitive object={planterGeometry} attach="geometry" />
        <meshStandardMaterial color="#1a1c22" roughness={0.9} />
      </mesh>
      <mesh position={[2.2, 0.18, 4.5]}>
        <primitive object={planterGeometry} attach="geometry" />
        <meshStandardMaterial color="#1a1c22" roughness={0.9} />
      </mesh>

      {/* Subtle Planter Greenery / Shrubs */}
      <mesh position={[-2.2, 0.45, 1.5]}>
        <sphereGeometry args={[0.32, 7, 7]} />
        <meshStandardMaterial color="#1c2b20" roughness={0.95} />
      </mesh>
      <mesh position={[2.2, 0.45, 1.5]}>
        <sphereGeometry args={[0.32, 7, 7]} />
        <meshStandardMaterial color="#1c2b20" roughness={0.95} />
      </mesh>
      <mesh position={[-2.2, 0.45, 4.5]}>
        <sphereGeometry args={[0.32, 7, 7]} />
        <meshStandardMaterial color="#1c2b20" roughness={0.95} />
      </mesh>
      <mesh position={[2.2, 0.45, 4.5]}>
        <sphereGeometry args={[0.32, 7, 7]} />
        <meshStandardMaterial color="#1c2b20" roughness={0.95} />
      </mesh>

      {/* Pathway Lighting Bollards (Warm architectural ground illumination) */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.22, 2.5]}>
          <primitive object={bollardGeometry} attach="geometry" />
          <meshStandardMaterial color="#252830" />
          <pointLight position={[0, 0.15, 0]} intensity={0.4} distance={2.5} color="#ffe8c2" />
        </group>
      ))}
    </group>
  )
})

// Architectural Massing Layout (Central Courtyard Ensemble)
const architecturalBuildingConfigs = [
  // West Academic Wing (Curved inward facing)
  { position: [-4.2, 2.4, -1.8], height: 4.8, width: 3.4, depth: 3.2 },
  // East Applied Research Wing
  { position: [4.2, 2.4, -1.8], height: 4.8, width: 3.4, depth: 3.2 },
  // North Central Tower (Behind Atrium)
  { position: [0, 3.8, -4.5], height: 7.6, width: 4.8, depth: 3.4 },
  // Southwest Student Labs Wing
  { position: [-5.0, 1.8, 1.8], height: 3.6, width: 2.8, depth: 3.2 },
  // Southeast Innovation Hub
  { position: [5.0, 1.8, 1.8], height: 3.6, width: 2.8, depth: 3.2 },
]

// --- CAMPUS SCENE MAIN 3D ROOT ---
const CampusScene = React.memo(() => {
  const groupRef = useRef()

  // Gentle, calm architectural vantage drift
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* 1. Monumental Neural Portal & Physical Academy Signage */}
      <NeuralPortal />

      {/* 2. Coherent Architectural Wings */}
      {architecturalBuildingConfigs.map((b, i) => (
        <ArchitecturalBuilding
          key={i}
          position={b.position}
          height={b.height}
          width={b.width}
          depth={b.depth}
        />
      ))}

      {/* 3. Instanced Warm Occupied Windows (Believable human scale) */}
      <InstancedWindows buildingConfigs={architecturalBuildingConfigs} />

      {/* 4. Paved Courtyard, Walkways & Landscaping */}
      <CourtyardLandscape />
    </group>
  )
})

// --- MAIN CAMPUS EXPORT COMPONENT ---
const Campus = ({ onExplore, onAdmissions }) => {
  return (
    <div className="relative w-full h-screen bg-[#050505]">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 4.2, 11.5], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: '#050505' }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement
            const handleContextLost = (e) => {
              e.preventDefault()
              console.warn('WebGL context lost in Campus. Handling gracefully...')
            }
            const handleContextRestored = () => {
              console.log('WebGL context restored in Campus.')
            }
            canvas.addEventListener('webglcontextlost', handleContextLost, false)
            canvas.addEventListener('webglcontextrestored', handleContextRestored, false)
          }}
        >
          <Suspense fallback={null}>
            {/* Architectural Evening Lighting Setup: Warm Key, Cool Neutral Fill, No Purple */}
            <ambientLight intensity={0.35} color="#d8e2ec" />
            <directionalLight position={[12, 16, 8]} intensity={0.9} color="#f0f4f8" />
            <directionalLight position={[-10, 8, -6]} intensity={0.3} color="#90a4ae" />

            {/* Soft Courtyard Ambient Fill */}
            <pointLight position={[0, 3, 2]} intensity={0.6} distance={12} color="#fff1d6" />

            {/* Restrained Sky Backdrop */}
            <Stars radius={60} depth={30} count={1200} factor={2.5} fade speed={0.2} />

            <CampusScene />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Campus Arrival Architectural Overlay (Clean, non-intrusive, positioned at bottom) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="editorial-card px-6 py-5 sm:px-7 sm:py-6 border border-white/10 shadow-2xl"
          >
            <div className="text-[11px] font-inter text-cyan-400 font-medium tracking-wider uppercase mb-1.5">
              Campus Arrival
            </div>
            <h2 className="font-sora text-xl sm:text-2xl font-semibold text-white mb-1.5 tracking-tight">
              BharatOS AI Academy
            </h2>
            <p className="font-inter text-white/60 text-xs mb-5 max-w-sm mx-auto leading-relaxed">
              Shahdol, Madhya Pradesh • Dedicated research & applied AI learning campus.
            </p>
            <div className="flex gap-3 justify-center pointer-events-auto">
              <button
                onClick={onExplore}
                className="btn-primary text-xs font-inter font-medium px-5 py-2.5 flex items-center gap-2"
              >
                <span>Enter Academy</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={onAdmissions || onExplore}
                className="btn-glass text-xs font-inter font-normal px-5 py-2.5"
              >
                Curriculum
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Campus
