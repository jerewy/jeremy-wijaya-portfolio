"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

type PointerState = { x: number; y: number; pulse: number };
type PointerRef = MutableRefObject<PointerState>;

function Robot({ pointer }: { pointer: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const leftEyeMaterial = useRef<THREE.MeshStandardMaterial | null>(null);
  const rightEyeMaterial = useRef<THREE.MeshStandardMaterial | null>(null);
  const facePlateMaterial = useRef<THREE.MeshStandardMaterial | null>(null);
  const faceGlowMaterial = useRef<THREE.MeshStandardMaterial | null>(null);
  const chestBarMaterial = useRef<THREE.MeshStandardMaterial | null>(null);
  const voiceBarMaterial = useRef<THREE.MeshStandardMaterial | null>(null);

  const headGeometry = useMemo(() => new THREE.BoxGeometry(1.9, 1.6, 1.4), []);
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(1.5, 1.8, 1.1), []);
  const jawGeometry = useMemo(() => new THREE.BoxGeometry(1.6, 0.6, 1.1), []);
  const shoulderGeometry = useMemo(
    () => new THREE.BoxGeometry(2.8, 0.5, 1.2),
    []
  );
  const antennaGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.05, 0.05, 0.9, 24),
    []
  );
  const facePlateGeometry = useMemo(
    () => new THREE.PlaneGeometry(1.45, 1.05, 16, 16),
    []
  );
  const faceGlowGeometry = useMemo(
    () => new THREE.RingGeometry(0.68, 0.82, 64),
    []
  );

  useFrame((state) => {
    if (!group.current) return;

    const { x, y, pulse } = pointer.current;
    const time = state.clock.elapsedTime;

    const hoverX = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.6,
      0.08
    );
    const hoverY = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.35 + Math.sin(time * 0.8) * 0.08,
      0.08
    );

    group.current.rotation.y = hoverX;
    group.current.rotation.x = hoverY;

    const nextScaleTarget = 1.18 + Math.sin(time * 1.4) * 0.02 + pulse * 0.1;
    const nextScale = THREE.MathUtils.lerp(
      group.current.scale.x,
      nextScaleTarget,
      0.08
    );
    group.current.scale.set(nextScale, nextScale, nextScale);

    const baseY = Math.sin(time * 1.1) * 0.05 + pulse * 0.12;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      baseY,
      0.1
    );

    const eyeOffsetX = THREE.MathUtils.lerp(0, x * 0.2, 0.6);
    const eyeOffsetY = THREE.MathUtils.lerp(0, -y * 0.2, 0.6);

    if (leftEye.current && rightEye.current) {
      leftEye.current.position.x = -0.45 + eyeOffsetX;
      rightEye.current.position.x = 0.45 + eyeOffsetX;
      leftEye.current.position.y = 0.2 + eyeOffsetY;
      rightEye.current.position.y = 0.2 + eyeOffsetY;
    }

    const pulseGlow = 0.85 + pulse * 1.4 + Math.sin(time * 3) * 0.08;
    if (leftEyeMaterial.current) {
      leftEyeMaterial.current.emissiveIntensity = pulseGlow;
    }
    if (rightEyeMaterial.current) {
      rightEyeMaterial.current.emissiveIntensity = pulseGlow * 1.05;
    }
    if (facePlateMaterial.current) {
      facePlateMaterial.current.emissiveIntensity = 0.5 + pulse * 0.8;
      facePlateMaterial.current.opacity = 0.26 + pulse * 0.15;
    }
    if (faceGlowMaterial.current) {
      faceGlowMaterial.current.emissiveIntensity = 0.45 + pulse * 1.1;
      faceGlowMaterial.current.opacity = 0.3 + pulse * 0.2;
    }
    if (chestBarMaterial.current) {
      chestBarMaterial.current.emissiveIntensity = 0.6 + pulse * 1.5;
    }
    if (voiceBarMaterial.current) {
      voiceBarMaterial.current.emissiveIntensity = 0.5 + pulse * 1.2;
    }
  });

  return (
    <group ref={group} position={[0, 0.1, 0]} scale={1.18}>
      <Float speed={1.05} rotationIntensity={0.18} floatIntensity={0.5}>
        <mesh geometry={headGeometry} position={[0, 1.2, 0]}>
          <meshStandardMaterial
            color="#111c2f"
            metalness={0.25}
            roughness={0.35}
          />
        </mesh>

        <mesh geometry={jawGeometry} position={[0, 0.55, 0.02]}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>

        <mesh geometry={bodyGeometry} position={[0, -0.15, 0]}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.32}
            roughness={0.38}
          />
        </mesh>

        <mesh geometry={shoulderGeometry} position={[0, -1, 0]}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.28}
            roughness={0.5}
          />
        </mesh>

        <mesh
          geometry={faceGlowGeometry}
          position={[0, 1.23, 0.73]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            ref={faceGlowMaterial}
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.45}
            transparent
            opacity={0.3}
          />
        </mesh>

        <mesh geometry={facePlateGeometry} position={[0, 1.23, 0.71]}>
          <meshStandardMaterial
            ref={facePlateMaterial}
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
          <meshStandardMaterial
            ref={leftEyeMaterial}
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.85}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.45, 0.23, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            ref={rightEyeMaterial}
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.85}
          />
        </mesh>

        <mesh geometry={antennaGeometry} position={[0, 2.2, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.8}
          />
        </mesh>

        <mesh position={[0, -1.35, 0]}>
          <boxGeometry args={[2.8, 0.35, 1.2]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.32}
            roughness={0.6}
          />
        </mesh>

        <mesh position={[0, 0.75, 0.85]}>
          <boxGeometry args={[0.9, 0.08, 0.1]} />
          <meshStandardMaterial
            ref={chestBarMaterial}
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>

        <mesh position={[0, 0.05, 0.82]}>
          <boxGeometry args={[0.65, 0.05, 0.1]} />
          <meshStandardMaterial
            ref={voiceBarMaterial}
            color="#f472b6"
            emissive="#f472b6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const pointer = useRef<PointerState>({ x: 0, y: 0, pulse: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const isIdle = useRef(true);
  const animationFrame = useRef<number | null>(null);
  const idleTimeout = useRef<number | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsCoarsePointer(event.matches);
    };

    handleChange(mql);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    }

    if (typeof mql.addListener === "function") {
      mql.addListener(handleChange);
      return () => mql.removeListener(handleChange);
    }

    return () => {};
  }, []);

  useEffect(() => {
    const updatePointerTarget = (clientX: number, clientY: number) => {
      pointerTarget.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (clientY / window.innerHeight) * 2 - 1;
    };

    const activate = () => {
      isIdle.current = false;
      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
      }
      idleTimeout.current = window.setTimeout(() => {
        isIdle.current = true;
        idleTimeout.current = null;
      }, 4000);
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerTarget(event.clientX, event.clientY);
      activate();
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointer.current.pulse = 1.2;
      updatePointerTarget(event.clientX, event.clientY);
      activate();
    };

    const handlePointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      const tiltX = THREE.MathUtils.clamp(event.gamma / 45, -1, 1);
      const tiltY = THREE.MathUtils.clamp(event.beta / 45, -1, 1);
      pointerTarget.current.x = tiltX;
      pointerTarget.current.y = tiltY;
      activate();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        pointer.current.pulse = 1.2;
        activate();
      }
    };

    const animatePointer = () => {
      const now = Date.now() * 0.001;
      const autoX = Math.sin(now * 0.45) * 0.25;
      const autoY = Math.cos(now * 0.35) * 0.2;
      const targetX = isIdle.current ? autoX : pointerTarget.current.x;
      const targetY = isIdle.current ? autoY : pointerTarget.current.y;

      pointer.current.x = THREE.MathUtils.lerp(
        pointer.current.x,
        targetX,
        0.07
      );
      pointer.current.y = THREE.MathUtils.lerp(
        pointer.current.y,
        targetY,
        0.07
      );
      pointer.current.pulse = THREE.MathUtils.lerp(
        pointer.current.pulse,
        0,
        0.06
      );

      animationFrame.current = window.requestAnimationFrame(animatePointer);
    };

    animatePointer();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("keydown", handleKeydown);

    if (isCoarsePointer && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("keydown", handleKeydown);
      if (isCoarsePointer && "DeviceOrientationEvent" in window) {
        window.removeEventListener(
          "deviceorientation",
          handleDeviceOrientation
        );
      }
      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
        idleTimeout.current = null;
      }
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [isCoarsePointer]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.7, 4.2], fov: 38 }} dpr={[1, 1.75]}>
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
          count={3600}
          factor={isCoarsePointer ? 2.4 : 3}
          saturation={0}
          fade
          speed={0.18}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#0f172a"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/70 to-gray-950" />
    </div>
  );
}
