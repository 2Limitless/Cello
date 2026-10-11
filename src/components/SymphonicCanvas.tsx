/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

function PluckableString({ xPosition, thickness = 1 }: { xPosition: number, thickness?: number }) {
  const lineRef = useRef<THREE.Line>(null);
  
  // 51 vertices for smooth bending
  const points = useMemo(() => new Float32Array(51 * 3), []);
  const spring = useRef({ displacement: 0, velocity: 0 });
  const target = useRef(0);

  useFrame(({ mouse, viewport }, delta) => {
    // Convert normalized mouse (-1 to +1) to world units
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    const dist = mouseX - xPosition;
    // If mouse is near the string
    if (Math.abs(dist) < 1.2 && Math.abs(mouseY) < 10) {
      target.current = dist * 0.9;
    } else {
      target.current = 0;
    }

    // Spring physics simulating tension
    const stiffness = 450;
    const damping = 4;
    const force = -stiffness * (spring.current.displacement - target.current);
    spring.current.velocity += force * delta;
    spring.current.velocity *= Math.exp(-damping * delta);
    spring.current.displacement += spring.current.velocity * delta;

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        const y = 15 - t * 30; // Extend beyond screen top/bottom
        
        // Sine wave envelope so the string is fixed at ends and bends in middle
        const envelope = Math.sin(t * Math.PI);
        
        positions[i * 3] = xPosition + spring.current.displacement * envelope;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          {...({
            attach: "attributes-position",
            count: 51,
            array: points,
            itemSize: 3,
          } as any)}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#c9a27e" opacity={0.4} transparent linewidth={thickness} />
    </line>
  );
}

// Generate static positions deterministically outside component render to avoid hook purity warnings
function createDustPositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const seedX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const seedY = (Math.sin(i * 78.233) * 43758.5453) % 1;
    const seedZ = (Math.sin(i * 45.164) * 43758.5453) % 1;
    pos[i * 3] = (seedX - 0.5) * 20;
    pos[i * 3 + 1] = (seedY - 0.5) * 20;
    pos[i * 3 + 2] = (seedZ - 0.5) * 10 - 5;
  }
  return pos;
}

const DUST_POSITIONS = createDustPositions(100);

function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef as any}>
      <bufferGeometry>
        <bufferAttribute {...({ attach: "attributes-position", count: particleCount, array: DUST_POSITIONS, itemSize: 3 } as any)} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#e6c5a1" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export function SymphonicCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] to-[#020202]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        
        {/* The 4 strings of a Cello/Violin */}
        <PluckableString xPosition={-1.5} thickness={3} />
        <PluckableString xPosition={-0.5} thickness={2} />
        <PluckableString xPosition={0.5} thickness={1.5} />
        <PluckableString xPosition={1.5} thickness={1} />

        <DustMotes />
      </Canvas>
    </div>
  );
}
