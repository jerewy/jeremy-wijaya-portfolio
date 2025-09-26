"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type PointerRef = MutableRefObject<{ x: number; y: number }>;

function Robot({ pointer }: { pointer: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);

  const headGeometry = useMemo(() => new THREE.BoxGeometry(1.8, 1.4, 1.4), []);
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(1.4, 1.6, 1.1), []);
  const antennaGeometry = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16), []);

  useFrame((state) => {
    if (!group.current) return;

    const { x, y } = pointer.current;
    const hoverX = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.5, 0.08);
    const hoverY = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05,
      0.08
    );

    group.current.rotation.y = hoverX;
    group.current.rotation.x = hoverY;

    const eyeOffsetX = THREE.MathUtils.lerp(0, x * 0.2, 0.6);
    const eyeOffsetY = THREE.MathUtils.lerp(0, -y * 0.2, 0.6);

    if (leftEye.current && rightEye.current) {
      leftEye.current.position.x = -0.45 + eyeOffsetX;
      rightEye.current.position.x = 0.45 + eyeOffsetX;
      leftEye.current.position.y = 0.2 + eyeOffsetY;
      rightEye.current.position.y = 0.2 + eyeOffsetY;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh geometry={headGeometry} position={[0, 1.2, 0]}> 
          <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.4} />
        </mesh>

        <mesh geometry={bodyGeometry} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.4} />
        </mesh>

        <mesh ref={leftEye} position={[-0.45, 0.2, 0.72]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>
        <mesh ref={rightEye} position={[0.45, 0.2, 0.72]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} />
        </mesh>

        <mesh geometry={antennaGeometry} position={[0, 2.2, 0]}>
          <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>

        <mesh position={[0, -1.1, 0]}> 
          <boxGeometry args={[2.6, 0.35, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.8, 6], fov: 45 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 4, 4]} intensity={1.1} color="#38bdf8" />
        <pointLight position={[-4, -2, 3]} intensity={0.6} color="#a855f7" />
        <Robot pointer={pointer} />
        <Stars
          radius={60}
          depth={40}
          count={4000}
          factor={3}
          saturation={0}
          fade
          speed={0.2}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#020617" emissive="#0f172a" emissiveIntensity={0.2} />
        </mesh>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950" />
    </div>
  );
}
