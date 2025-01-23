"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Skateboard } from '@/components/Skateboard';

type Props = {}

export function InteractiveSkateboard({}: Props) {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center'>
      <Canvas className='min-h-[60rem] w-full' camera={{ position: [1.5, 1, 1.4], fov: 55 }}>
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene() {
  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <Skateboard />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  )
}