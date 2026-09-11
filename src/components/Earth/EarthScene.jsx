import React, { useRef, useMemo, useEffect, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Stars, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import CanvasErrorBoundary from '../Common/CanvasErrorBoundary'

// --- OPTIMIZED SHADERS ---

const atmosphereVertexShader = `
precision mediump float;
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const atmosphereFragmentShader = `
precision mediump float;
varying vec3 vNormal;
void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(0.0, 0.6, 1.0, 1.0) * intensity;
}
`

// --- GEOGRAPHIC CONSTANTS ---
// Geographic Waypoints
const SHAHDOL_COORDS = { lat: 23.3002, lng: 81.3656 }
const MP_COORDS = { lat: 23.5, lng: 78.5 }
const INDIA_COORDS = { lat: 22.0, lng: 79.0 }
const ASIA_COORDS = { lat: 34.0, lng: 95.0 }
const TARGET_EARTH_ROT_Y = -2.9908939446555944

// Spherical coordinates helper
const latLngToVector3 = (lat, lng, radius = 1.0) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Shared Geometries
const sphereGeo64 = new THREE.SphereGeometry(1, 64, 64)
const sphereGeo102 = new THREE.SphereGeometry(1, 64, 64)
const nodeSphereGeo = new THREE.SphereGeometry(0.008, 8, 8)
const markerSphereGeo = new THREE.SphereGeometry(0.016, 16, 16)
const markerRingGeo = new THREE.RingGeometry(0.024, 0.034, 32)
const outerReticleGeo = new THREE.RingGeometry(0.045, 0.05, 32)
const asiaRingGeo = new THREE.RingGeometry(0.38, 0.40, 48)
const indiaRingGeo = new THREE.RingGeometry(0.18, 0.192, 48)
const mpRingGeo = new THREE.RingGeometry(0.075, 0.082, 32)

// --- PROCEDURAL FALLBACK TEXTURE GENERATORS ---
function createFallbackTexture(colorStr = '#0a192f') {
  if (typeof document === 'undefined') return new THREE.Texture()
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = colorStr
    ctx.fillRect(0, 0, 512, 256)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// --- ATMOSPHERE COMPONENT ---
const Atmosphere = React.memo(() => {
  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <primitive object={sphereGeo64} attach="geometry" />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  )
})

// --- EARTH SPHERE ---
const EarthSphere = React.memo(({ mousePositionRef, interactive }) => {
  const meshRef = useRef()
  const cloudsRef = useRef()

  // Load purely local textures with robust fallback
  const textures = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth-blue-marble.png',
      '/textures/earth-topology.png',
      '/textures/earth-clouds.png',
    ],
    (loader) => {
      loader.setCrossOrigin('anonymous')
    }
  )

  // Fallback textures always created unconditionally (Rules of Hooks: no conditional hooks)
  const fallbackEarth = useMemo(() => createFallbackTexture('#07152b'), [])
  const fallbackBump = useMemo(() => createFallbackTexture('#808080'), [])
  const fallbackCloud = useMemo(() => createFallbackTexture('rgba(255,255,255,0.3)'), [])

  const earthTexture = textures[0] || fallbackEarth
  const bumpTexture = textures[1] || fallbackBump
  const cloudTexture = textures[2] || fallbackCloud

  useFrame(() => {
    if (!interactive) return
    const mouse = mousePositionRef.current || { x: 0, y: 0 }
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.05,
        0.05
      )
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -mouse.x * 0.03,
        0.05
      )
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003
      cloudsRef.current.rotation.x = mouse.y * 0.02
    }
  })

  return (
    <group>
      {/* Earth */}
      <mesh ref={meshRef}>
        <primitive object={sphereGeo64} attach="geometry" />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.045}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={[1.018, 1.018, 1.018]}>
        <primitive object={sphereGeo102} attach="geometry" />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <Atmosphere />
    </group>
  )
})

// --- NETWORK LINES (Arcs) ---
const NetworkLines = React.memo(() => {
  const linesRef = useRef()

  const lines = useMemo(() => {
    const data = []
    const cities = [
      { lat: 23.3002, lng: 81.3656, name: 'Shahdol' },
      { lat: 28.6139, lng: 77.2090, name: 'Delhi' },
      { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
      { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
      { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
      { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
      { lat: 23.2599, lng: 77.4126, name: 'Bhopal' },
      { lat: 26.8467, lng: 80.9462, name: 'Lucknow' },
      { lat: 18.5204, lng: 73.8567, name: 'Pune' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
      { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    ]

    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.72) {
          data.push({
            start: cities[i],
            end: cities[j],
            color: Math.random() > 0.5 ? '#00F5FF' : '#8A2EFF',
          })
        }
      }
    }
    return data
  }, [])

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const start = latLngToVector3(line.start.lat, line.start.lng, 1.02)
        const end = latLngToVector3(line.end.lat, line.end.lng, 1.02)
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.22)

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
        const points = curve.getPoints(36)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color={line.color} transparent opacity={0.28} />
          </line>
        )
      })}
    </group>
  )
})

// --- AI NODES (Pulsing dots on Earth) ---
const AINodes = React.memo(() => {
  const nodesRef = useRef()

  const nodes = useMemo(() => {
    const data = []
    for (let i = 0; i < 24; i++) {
      const lat = (Math.random() - 0.5) * 150
      const lng = (Math.random() - 0.5) * 360
      data.push({ lat, lng, id: i })
    }
    return data
  }, [])

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2.2 + i) * 0.35
        child.scale.setScalar(scale)
      })
    }
  })

  return (
    <group ref={nodesRef}>
      {nodes.map((node) => {
        const pos = latLngToVector3(node.lat, node.lng, 1.028)
        return (
          <mesh key={node.id} position={pos}>
            <primitive object={nodeSphereGeo} attach="geometry" />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.75} />
          </mesh>
        )
      })}
    </group>
  )
})

// --- REGIONAL TARGETING LOCATORS ---
const RegionalLocators = React.memo(({ stage }) => {
  const asiaRingRef = useRef()
  const indiaRingRef = useRef()
  const mpRingRef = useRef()

  const asiaPos = useMemo(() => latLngToVector3(ASIA_COORDS.lat, ASIA_COORDS.lng, 1.022), [])
  const indiaPos = useMemo(() => latLngToVector3(INDIA_COORDS.lat, INDIA_COORDS.lng, 1.024), [])
  const mpPos = useMemo(() => latLngToVector3(MP_COORDS.lat, MP_COORDS.lng, 1.026), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (asiaRingRef.current) {
      asiaRingRef.current.rotation.z += 0.006
      const s = 1 + Math.sin(t * 2) * 0.04
      asiaRingRef.current.scale.set(s, s, s)
    }
    if (indiaRingRef.current) {
      indiaRingRef.current.rotation.z -= 0.01
      const s = 1 + Math.sin(t * 3) * 0.05
      indiaRingRef.current.scale.set(s, s, s)
    }
    if (mpRingRef.current) {
      mpRingRef.current.rotation.z += 0.015
      const s = 1 + Math.sin(t * 3.5) * 0.06
      mpRingRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group>
      {/* Asia Continental Scan Locator */}
      <group position={asiaPos} visible={stage === 'asia'}>
        <mesh ref={asiaRingRef}>
          <primitive object={asiaRingGeo} attach="geometry" />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* India Subcontinent Focus Contour */}
      <group position={indiaPos} visible={stage === 'asia' || stage === 'india'}>
        <mesh ref={indiaRingRef}>
          <primitive object={indiaRingGeo} attach="geometry" />
          <meshBasicMaterial color="#00F5FF" transparent opacity={stage === 'india' ? 0.45 : 0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Madhya Pradesh Regional Target */}
      <group position={mpPos} visible={stage === 'india' || stage === 'mp'}>
        <mesh ref={mpRingRef}>
          <primitive object={mpRingGeo} attach="geometry" />
          <meshBasicMaterial color="#8A2EFF" transparent opacity={stage === 'mp' ? 0.55 : 0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
})

// --- SHAHDOL BEACON & RETICLE ---
const ShahdolMarker = React.memo(({ visible, locked }) => {
  const ringRef = useRef()
  const outerReticleRef = useRef()
  const beamRef = useRef()

  const position = useMemo(() => {
    return latLngToVector3(SHAHDOL_COORDS.lat, SHAHDOL_COORDS.lng, 1.025)
  }, [])

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3.5) * 0.45
      ringRef.current.scale.setScalar(scale)
      ringRef.current.material.opacity = Math.max(0, 0.65 - (scale - 1) * 0.45)
    }
    if (outerReticleRef.current) {
      outerReticleRef.current.rotation.z += 0.015
    }
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.45 + Math.sin(state.clock.elapsedTime * 4) * 0.25
    }
  })

  if (!visible) return null

  return (
    <group position={position}>
      {/* Precision Center Pin */}
      <mesh>
        <primitive object={markerSphereGeo} attach="geometry" />
        <meshBasicMaterial color="#00F5FF" />
      </mesh>

      {/* Pulsing Beacon Ring */}
      <mesh ref={ringRef}>
        <primitive object={markerRingGeo} attach="geometry" />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Targeting Reticle */}
      <mesh ref={outerReticleRef}>
        <primitive object={outerReticleGeo} attach="geometry" />
        <meshBasicMaterial color="#8A2EFF" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Vertical Quantum Uplink Beam */}
      <mesh ref={beamRef} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.002, 0.006, 0.2, 8]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.55} />
      </mesh>

      {/* BharatOS AI Academy Beacon Card - Geographically contextual and well-scaled */}
      {locked && (
        <Html distanceFactor={10} position={[0, 0.16, 0]}>
          <div className="pointer-events-none select-none">
            <div className="flex flex-col items-center">
              <div className="glass-panel-strong px-4 py-2 text-center whitespace-nowrap shadow-2xl border border-neon-cyan/40 backdrop-blur-md">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
                  <p className="text-neon-cyan font-sora font-bold text-xs tracking-wider">
                    BHARATOS AI ACADEMY
                  </p>
                </div>
                <p className="text-white/80 font-mono text-[10px] tracking-wide">
                  SHAHDOL, MADHYA PRADESH
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between gap-3 text-[9px] font-mono text-neon-purple">
                  <span>AI LEARNING ECOSYSTEM</span>
                  <span>23.3002°N 81.3656°E</span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
})

// --- PARTICLE DISSOLVE & WARP EFFECT ---
const ParticleDissolve = React.memo(({ active }) => {
  const particlesRef = useRef()
  const particleCount = 1800

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.0 + Math.random() * 0.15

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      // Forward acceleration towards camera with coherent directional velocity
      const speed = 0.02 + Math.random() * 0.04
      vel[i * 3] = pos[i * 3] * speed + (Math.random() - 0.5) * 0.008
      vel[i * 3 + 1] = pos[i * 3 + 1] * speed + (Math.random() - 0.5) * 0.008
      vel[i * 3 + 2] = pos[i * 3 + 2] * speed + 0.03 + Math.random() * 0.04

      // Colors: Cyan & Purple & White
      const c = Math.random()
      if (c < 0.5) {
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 1.0 // cyan
      } else if (c < 0.85) {
        col[i * 3] = 0.54; col[i * 3 + 1] = 0.18; col[i * 3 + 2] = 1.0 // purple
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0 // white
      }
    }
    return [pos, vel, col]
  }, [])

  useFrame(() => {
    if (!active || !particlesRef.current) return
    const posArray = particlesRef.current.geometry.attributes.position.array
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!active) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
})

// --- MULTI-STAGE CAMERA & GLOBE CONTROLLER ---
const CinematicCameraController = React.memo(({
  stage,
  onStageChange,
  onCinematicComplete,
  earthGroupRef,
  isMobile,
  reducedMotion,
}) => {
  const { camera } = useThree()
  const controlsRef = useRef()
  const tlRef = useRef()

  // Target camera coordinates for Shahdol with wider cinematic framing
  // Distance 1.62 desktop / 1.75 mobile preserves the surrounding continent and MP geography
  const shahdolCamTarget = useMemo(() => {
    const dist = isMobile ? 1.75 : 1.62
    // Shahdol normalized vector = (0, 0.39555, 0.91845)
    return {
      x: 0,
      y: 0.39555 * dist,
      z: 0.91845 * dist,
    }
  }, [isMobile])

  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill()
    }

    if (stage === 'idle') {
      // Natural planetary establishing shot
      const initDist = isMobile ? 4.2 : 3.4
      camera.position.set(0, 0.2, initDist)
      camera.lookAt(0, 0, 0)
    } else if (stage === 'cinematic') {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCinematicComplete) onCinematicComplete()
        },
      })
      tlRef.current = tl

      if (reducedMotion) {
        // Reduced motion: Direct smooth descent with zero rotation
        if (earthGroupRef.current) {
          earthGroupRef.current.rotation.y = TARGET_EARTH_ROT_Y
        }
        tl.to(camera.position, {
          x: shahdolCamTarget.x,
          y: shahdolCamTarget.y,
          z: shahdolCamTarget.z,
          duration: 2.2,
          ease: 'power2.inOut',
          onStart: () => onStageChange('shahdol'),
        })
      } else {
        // Full cinematic progression with distinct Approach -> Deceleration -> Lock -> Departure phases
        const group = earthGroupRef.current

        // STAGE A: Global Earth establishing view (subtle rotation & smooth descent)
        tl.to(camera.position, {
          x: 0.2,
          y: 0.45,
          z: isMobile ? 3.6 : 3.0,
          duration: 2.2,
          ease: 'power2.inOut',
          onStart: () => onStageChange('asia'),
        })

        if (group) {
          tl.to(group.rotation, {
            y: TARGET_EARTH_ROT_Y,
            duration: 6.8,
            ease: 'power3.inOut',
          }, 0)
        }

        // STAGE B: Asia continent recognition & approach
        tl.to(camera.position, {
          x: 0.12,
          y: 0.58,
          z: isMobile ? 2.85 : 2.45,
          duration: 2.0,
          ease: 'power3.inOut',
        }, '+=0.05')

        // STAGE C: India Subcontinent deceleration & framing
        tl.to(camera.position, {
          x: -0.05,
          y: 0.62,
          z: isMobile ? 2.35 : 2.05,
          duration: 2.3,
          ease: 'expo.inOut',
          onStart: () => onStageChange('india'),
        }, '+=0.1')

        // STAGE D: Madhya Pradesh regional focus & deceleration
        tl.to(camera.position, {
          x: -0.02,
          y: 0.61,
          z: isMobile ? 1.98 : 1.78,
          duration: 2.0,
          ease: 'power3.inOut',
          onStart: () => onStageChange('mp'),
        }, '+=0.1')

        // STAGE E: Shahdol Lock - Wider cinematic framing retaining regional geography
        tl.to(camera.position, {
          x: shahdolCamTarget.x,
          y: shahdolCamTarget.y,
          z: shahdolCamTarget.z,
          duration: 2.2,
          ease: 'expo.out',
          onStart: () => onStageChange('shahdol'),
        }, '+=0.1')

        // STAGE F: Beacon Pause - Intentional 2.4s hold for recognition
        tl.to({}, { duration: 2.4 })

        // STAGE G: Controlled Warp impulse towards campus
        tl.to(camera.position, {
          x: shahdolCamTarget.x * 0.88,
          y: shahdolCamTarget.y * 0.88,
          z: shahdolCamTarget.z * 0.88,
          duration: 1.4,
          ease: 'power4.in',
          onStart: () => onStageChange('warp'),
        })
      }
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill()
      }
    }
  }, [stage, camera, shahdolCamTarget, isMobile, reducedMotion, onStageChange, onCinematicComplete, earthGroupRef])

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={stage === 'idle'}
      enableZoom={stage === 'idle'}
      enablePan={false}
      enableRotate={stage === 'idle'}
      minDistance={1.6}
      maxDistance={5.0}
      autoRotate={stage === 'idle'}
      autoRotateSpeed={0.4}
    />
  )
})

// --- MAIN EARTH SCENE COMPONENT ---
const EarthScene = ({ onTransitionComplete }) => {
  const [cinematicActive, setCinematicActive] = useState(false)
  const [telemetryStage, setTelemetryStage] = useState('idle') // idle -> asia -> india -> mp -> shahdol -> warp
  const [dissolveActive, setDissolveActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const earthGroupRef = useRef()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const fallbackTimerRef = useRef(null)

  // Viewport & accessibility listener
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }
    const checkMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)
    }

    checkViewport()
    checkMotion()

    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [])

  // Handler for stage transitions
  const handleStageChange = useCallback((newStage) => {
    setTelemetryStage(newStage)
    if (newStage === 'warp') {
      setDissolveActive(true)
    }
  }, [])

  // Handler for completing the cinematic sequence
  const handleCinematicComplete = useCallback(() => {
    setDissolveActive(true)
    fallbackTimerRef.current = setTimeout(() => {
      if (onTransitionComplete) onTransitionComplete()
    }, 1500)
  }, [onTransitionComplete])

  // Trigger start of transition
  const startCinematicDescent = useCallback(() => {
    setCinematicActive(true)
    setTelemetryStage('asia')

    // Absolute fallback safety: if anything stalls, force transition after 16s
    fallbackTimerRef.current = setTimeout(() => {
      if (onTransitionComplete) onTransitionComplete()
    }, 16000)
  }, [onTransitionComplete])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bharatos-bg">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 4.2 : 3.4], fov: isMobile ? 52 : 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: '#050505' }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement
            const handleContextLost = (e) => {
              e.preventDefault()
              console.warn('WebGL context lost. Handling gracefully...')
            }
            const handleContextRestored = () => {
              console.log('WebGL context restored.')
            }
            canvas.addEventListener('webglcontextlost', handleContextLost, false)
            canvas.addEventListener('webglcontextrestored', handleContextRestored, false)
          }}
        >
          <Suspense fallback={null}>
            {/* Illumination */}
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 3, 5]} intensity={1.6} color="#ffffff" />
            <pointLight position={[-6, -4, -6]} intensity={0.35} color="#8A2EFF" />

            {/* Deep Space Background Stars */}
            <Stars
              radius={110}
              depth={60}
              count={2800}
              factor={3.8}
              saturation={0}
              fade
              speed={0.8}
            />

            {/* Unified Earth, Locators & Network Group */}
            <group ref={earthGroupRef}>
              <EarthSphere mousePositionRef={mousePositionRef} interactive={!cinematicActive} />
              <NetworkLines />
              <AINodes />
              <RegionalLocators stage={telemetryStage} />
              <ShahdolMarker
                visible={cinematicActive && telemetryStage !== 'idle'}
                locked={telemetryStage === 'shahdol' || telemetryStage === 'warp'}
              />
            </group>

            {/* Quantum Warp Particle Dissolve */}
            <ParticleDissolve active={dissolveActive} />

            {/* Camera Controller */}
            <CinematicCameraController
              stage={cinematicActive ? 'cinematic' : 'idle'}
              onStageChange={handleStageChange}
              onCinematicComplete={handleCinematicComplete}
              earthGroupRef={earthGroupRef}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Global Minimal HUD Telemetry */}
      <AnimatePresence>
        {cinematicActive && (
          <motion.div
            className="absolute top-6 left-6 right-6 md:left-10 md:right-10 z-30 pointer-events-none flex items-start justify-between"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
          >
            {/* Mission Telemetry Readout */}
            <div className="glass-panel px-4 py-2.5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-white/90 tracking-widest uppercase">
                  {telemetryStage === 'asia' && 'REGIONAL DESCENT: ASIA'}
                  {telemetryStage === 'india' && 'REGIONAL DESCENT: INDIA'}
                  {telemetryStage === 'mp' && 'APPROACH: MADHYA PRADESH'}
                  {telemetryStage === 'shahdol' && 'LOCATION CONFIRMED: SHAHDOL'}
                  {telemetryStage === 'warp' && 'ENTERING SHAHDOL CAMPUS'}
                </span>
              </div>
              <div className="flex gap-4 font-mono text-[10px] text-white/50">
                <span>COORDINATES: 23.3002° N, 81.3656° E</span>
                <span>
                  {telemetryStage === 'shahdol' || telemetryStage === 'warp' ? 'CAMPUS: BHARATOS AI ACADEMY' : 'CENTRAL INDIA'}
                </span>
              </div>
            </div>

            {/* Skip Control for Immediate Academy Access */}
            <div className="pointer-events-auto">
              <button
                onClick={onTransitionComplete}
                className="glass-panel px-3.5 py-2 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-inter text-xs transition-colors"
                title="Skip directly to BharatOS AI Academy campus"
              >
                Skip to Academy →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Explore Button */}
      <AnimatePresence>
        {!cinematicActive && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <motion.button
              onClick={startCinematicDescent}
              className="btn-primary text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 shadow-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3 tracking-wider font-sora">
                <svg className="w-5 h-5 text-bharatos-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                BEGIN CINEMATIC DESCENT
              </span>
            </motion.button>

            <button
              onClick={onTransitionComplete}
              className="text-white/40 hover:text-white/70 font-inter text-xs transition-colors py-1 focus:outline-none"
            >
              Skip directly to campus & curriculum →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EarthScene
