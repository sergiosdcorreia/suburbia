"use client"

import React, { Suspense, useRef } from 'react'
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Skateboard } from '@/components/Skateboard';
import * as THREE from 'three';
import gsap from 'gsap'

type Props = {
  deckTextureURL: string
  wheelTextureURL: string
  truckColor: string
  boltColor: string
}

export function InteractiveSkateboard({
  deckTextureURL, wheelTextureURL, truckColor, boltColor
}: Props) {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center'>
      <Canvas className='min-h-[60rem] w-full' camera={{ position: [1.5, 1, 1.4], fov: 55 }}>
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene({
  deckTextureURL, wheelTextureURL, truckColor, boltColor
}: Props) {

  const containerRef = useRef<THREE.Group>(null)

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()

    const board = containerRef.current
    if (!board) return

    // const { name } = event.object

    gsap.timeline()
      .to(board.position, {
        y: .8,
        duration: .51,
        ease: "power2.out",
        delay: .26
      })
      .to(board.position, {
        y: 0,
        duration: .43,
        ease: "power2.in",
      })

    gsap.timeline()
      .to(board.rotation, {
        x: -.6,
        duration: .26,
        ease: "none"
      })
      .to(board.rotation, {
        x: .4,
        duration: .82,
        ease: "power2.in"
      })
      .to(board.rotation, {
        x: 0,
        duration: .12,
        ease: "none"
      })
  }

  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={containerRef} position={[-.25, 0, -.635]}>
        <group position={[0, -.086, .635]}>
          <Skateboard
            deckTextureURLs={[deckTextureURL]}
            deckTextureURL={deckTextureURL}
            wheelTextureURLs={[wheelTextureURL]}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
            constantWheelSpin
          />
          <mesh position={[0, .27, 0]} name="middle" onClick={onClick}>
            <boxGeometry args={[0.6, 0.1, 2.2]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  )
}