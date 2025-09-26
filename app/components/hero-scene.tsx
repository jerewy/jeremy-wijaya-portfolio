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

  const headGeometry = useMemo(() => new THREE.BoxGeometry(1.9, 1.6, 1.4), []);
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(1.5, 1.8, 1.1), []);
  const jawGeometry = useMemo(() => new THREE.BoxGeometry(1.6, 0.6, 1.1), []);
  const shoulderGeometry = useMemo(() => new THREE.BoxGeometry(2.8, 0.5, 1.2), []);
  const antennaGeometry = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 0.9, 24), []);
  const facePlateGeometry = useMemo(() => new THREE.PlaneGeometry(1.45, 1.05, 16, 16), []);
  const faceGlowGeometry = useMemo(() => new THREE.RingGeometry(0.68, 0.82, 64), []);

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
    <group ref={group} position={[0, 0.1, 0]} scale={1.18}>
      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.55}>
        <mesh geometry={headGeometry} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#111c2f" metalness={0.25} roughness={0.35} />
        </mesh>

        <mesh geometry={jawGeometry} position={[0, 0.55, 0.02]}>
          <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.25} />
        </mesh>

        <mesh geometry={bodyGeometry} position={[0, -0.15, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.32} roughness={0.38} />
        </mesh>

        <mesh geometry={shoulderGeometry} position={[0, -1, 0]}>
          <meshStandardMaterial color="#0f172a" metalness={0.28} roughness={0.5} />
        </mesh>

        <mesh
          geometry={faceGlowGeometry}
          position={[0, 1.23, 0.73]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.45}
            transparent
            opacity={0.3}
          />
        </mesh>

        <mesh geometry={facePlateGeometry} position={[0, 1.23, 0.71]}>
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.26}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>

        <mesh geometry={facePlateGeometry} position={[0, 1.23, 0.68]}>
          <meshStandardMaterial color="#020617" transparent opacity={0.85} />
        </mesh>

        <mesh ref={leftEye} position={[-0.45, 0.23, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.85} />
        </mesh>
        <mesh ref={rightEye} position={[0.45, 0.23, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.85} />
        </mesh>

        <mesh geometry={antennaGeometry} position={[0, 2.2, 0]}>
          <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>

        <mesh position={[0, -1.35, 0]}>
          <boxGeometry args={[2.8, 0.35, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.32} roughness={0.6} />
        </mesh>

        <mesh position={[0, 0.75, 0.85]}>
          <boxGeometry args={[0.9, 0.08, 0.1]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>

        <mesh position={[0, 0.05, 0.82]}>
          <boxGeometry args={[0.65, 0.05, 0.1]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
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
      <Canvas camera={{ position: [0, 0.7, 4.2], fov: 38 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.8} />
        <spotLight
          position={[0, 2.6, 4.5]}
          angle={0.5}
          intensity={1.2}
          color="#38bdf8"
          penumbra={0.5}
        />
        <pointLight position={[3, 3, 4]} intensity={1.05} color="#38bdf8" />
        <pointLight position={[-3.5, 1.5, 4]} intensity={0.9} color="#a855f7" />
        <pointLight position={[0, 0.5, 3.2]} intensity={0.7} color="#fbcfe8" />
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/70 to-gray-950" />
    </div>
  );
}
