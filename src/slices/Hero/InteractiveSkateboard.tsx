"use client"

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, ThreeEvent, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html } from '@react-three/drei';
import { Skateboard } from '@/components/Skateboard';
import * as THREE from 'three';
import gsap from 'gsap'
import { Hotspot } from './Hotspot';
import { WavyPaths } from './WavyPaths';

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4]

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
      <Canvas className='min-h-[60rem] w-full' camera={{ position: new THREE.Vector3(1.5, 1, 1.4), fov: 55 }}>
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
  const originRef = useRef<THREE.Group>(null)

  const [animating, setAnimating] = useState(false)
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true
  })

  const { camera } = useThree()

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-.2, .15, 0))

    setZoom()

    window.addEventListener("resize", setZoom)

    function setZoom() {
      const scale = Math.max(Math.min(1000/window.innerWidth, 2.2), 1)

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale
    }

    return () => window.removeEventListener("resize", setZoom)
  }, [ camera ])

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()

    const board = containerRef.current
    const origin = originRef.current

    if (!board || !origin || animating) return

    const { name } = event.object

    setShowHotspot((current) => ({...current, [name]: false}))

    if (name === "back") {
      ollie(board)
    } else if (name === "middle") {
      kickflip(board)
    } else if (name === "front") {
      frontside360(board, origin)
    }
  }

  function ollie(board:THREE.Group) {
    jumpBoard(board)

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

  function kickflip(board:THREE.Group) {
    jumpBoard(board)

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
        z: `+=${Math.PI * 2}`,
        duration: .78,
        ease: "none"
      },
      .3
      )
      .to(board.rotation, {
        x: 0,
        duration: .12,
        ease: "none"
      })
  }

  function frontside360(board:THREE.Group, origin:THREE.Group) {
    jumpBoard(board)

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
      .to(origin.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: .77,
        ease: "none"
      },
      .3
      )
      .to(board.rotation, {
        x: 0,
        duration: .14,
        ease: "none"
      })
  }

  function jumpBoard(board:THREE.Group) {
    setAnimating(true)

    gsap.timeline({ onComplete: () => setAnimating(false)})
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
  }

  return (
    <group>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={originRef}>
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
            <Hotspot isVisible={!animating && showHotspot.front} position={[0, .38, 1]} color='#B8FC39' />
            <mesh position={[0, .27, .9]} name="front" onClick={onClick}>
              <boxGeometry args={[.6, 0.2, .58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <Hotspot isVisible={!animating && showHotspot.middle} position={[0, .33, 0]} color='#FF7A51' />
            <mesh position={[0, .27, 0]} name="middle" onClick={onClick}>
              <boxGeometry args={[.6, .1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <Hotspot isVisible={!animating && showHotspot.back} position={[0, .35, -.9]} color='#46ACFA' />
            <mesh position={[0, .27, -.9]} name="back" onClick={onClick}>
              <boxGeometry args={[.6, 0.2, .58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={.6} position={[0, -.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[-.8, -.09, -.5]}
        scale={[.2, .2, .2]}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[1, 0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  )
}