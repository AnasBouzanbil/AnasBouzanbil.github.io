"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingLetter({ letter, position, delay }: { letter: string; position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Individual letter floating animation with delay
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 0.3]} />
      <meshStandardMaterial 
        color="#ec4899" 
        metalness={0.7}
        roughness={0.2}
        emissive="#ec4899"
        emissiveIntensity={0.4}
        transparent
        opacity={0.95}
      />
    </mesh>
  )
}

function AnimatedText3D({ text }: { text: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Overall group animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  const letters = text.split('')
  const spacing = 1.5

  return (
    <group ref={groupRef}>
      {letters.map((letter, index) => (
        <FloatingLetter
          key={index}
          letter={letter}
          position={[
            (index - letters.length / 2) * spacing,
            0,
            0
          ]}
          delay={index * 0.3}
        />
      ))}
    </group>
  )
}

export default function Text3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ec4899" />
        <pointLight position={[0, 10, 0]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, -10, 0]} intensity={0.8} color="#06b6d4" />
        
        <AnimatedText3D text="ANAS" />
      </Canvas>
    </div>
  )
} 