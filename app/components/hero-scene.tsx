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

  const headGeometry = useMemo(() => new THREE.BoxGeometry(2.1, 1.7, 1.5), []);
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(1.65, 1.95, 1.2), []);
  const jawGeometry = useMemo(() => new THREE.BoxGeometry(1.7, 0.55, 1.15), []);
  const shoulderGeometry = useMemo(
    () => new THREE.BoxGeometry(3.1, 0.45, 1.25),
    []
  );
  const antennaGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.06, 0.06, 1, 24),
    []
  );
  const facePlateGeometry = useMemo(
    () => new THREE.PlaneGeometry(1.52, 1.12, 20, 20),
    []
  );
  const faceGlowGeometry = useMemo(
    () => new THREE.RingGeometry(0.7, 0.86, 72),
    []
  );

  useFrame((state) => {
    if (!group.current) return;

    const { x, y, pulse } = pointer.current;
    const time = state.clock.elapsedTime;

    const orbit = Math.sin(time * 0.25) * 0.2;
    const hoverX = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.55 + orbit * 0.2,
      0.1
    );
    const hoverY = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.32 + Math.cos(time * 0.6) * 0.05,
      0.1
    );
    const hoverZ = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(time * 0.4 + x * 0.8) * 0.08,
      0.08
    );

    group.current.rotation.y = hoverX;
    group.current.rotation.x = hoverY;
    group.current.rotation.z = hoverZ;

    const nextScaleTarget =
      1.15 + Math.sin(time * 1.9 + pulse * 0.6) * 0.035 + pulse * 0.12;
    const nextScale = THREE.MathUtils.lerp(
      group.current.scale.x,
      nextScaleTarget,
      0.12
    );
    group.current.scale.set(nextScale, nextScale, nextScale);

    const baseY =
      Math.sin(time * 0.95) * 0.07 + Math.sin(time * 0.35 + x * 0.4) * 0.03 +
      pulse * 0.1;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      baseY,
      0.12
    );

    const swayX = THREE.MathUtils.lerp(
      group.current.position.x,
      Math.sin(time * 0.5 + y) * 0.08,
      0.08
    );
    const swayZ = THREE.MathUtils.lerp(
      group.current.position.z,
      Math.cos(time * 0.45 + x) * 0.06,
      0.08
    );
    group.current.position.x = swayX;
    group.current.position.z = swayZ;

    const eyeOffsetX = THREE.MathUtils.lerp(0, x * 0.24, 0.65);
    const eyeOffsetY = THREE.MathUtils.lerp(0, -y * 0.22, 0.65);

    if (leftEye.current && rightEye.current) {
      leftEye.current.position.x = -0.45 + eyeOffsetX;
      rightEye.current.position.x = 0.45 + eyeOffsetX;
      leftEye.current.position.y = 0.2 + eyeOffsetY;
      rightEye.current.position.y = 0.2 + eyeOffsetY;
    }

    const pulseGlow = 0.75 + pulse * 1.5 + Math.sin(time * 2.6) * 0.12;
    if (leftEyeMaterial.current) {
      leftEyeMaterial.current.emissiveIntensity = pulseGlow;
    }
    if (rightEyeMaterial.current) {
      rightEyeMaterial.current.emissiveIntensity = pulseGlow * 1.08;
    }
    if (facePlateMaterial.current) {
      facePlateMaterial.current.emissiveIntensity = 0.45 + pulse * 0.85;
      facePlateMaterial.current.opacity = 0.22 + pulse * 0.18;
    }
    if (faceGlowMaterial.current) {
      faceGlowMaterial.current.emissiveIntensity = 0.4 + pulse * 1.25;
      faceGlowMaterial.current.opacity = 0.28 + pulse * 0.22;
    }
    if (chestBarMaterial.current) {
      chestBarMaterial.current.emissiveIntensity = 0.55 + pulse * 1.6;
    }
    if (voiceBarMaterial.current) {
      voiceBarMaterial.current.emissiveIntensity = 0.48 + pulse * 1.3;
    }
  });

  return (
    <group ref={group} position={[0, 0.1, 0]} scale={1.18}>
      <Float speed={1.25} rotationIntensity={0.24} floatIntensity={0.7}>
        <mesh geometry={headGeometry} position={[0, 1.2, 0]}>
          <meshStandardMaterial
            color="#1f1635"
            metalness={0.3}
            roughness={0.32}
          />
        </mesh>

        <mesh geometry={jawGeometry} position={[0, 0.55, 0.02]}>
          <meshStandardMaterial
            color="#251b40"
            metalness={0.45}
            roughness={0.22}
          />
        </mesh>

        <mesh geometry={bodyGeometry} position={[0, -0.15, 0]}>
          <meshStandardMaterial
            color="#2a1e46"
            metalness={0.35}
            roughness={0.35}
          />
        </mesh>

        <mesh geometry={shoulderGeometry} position={[0, -1, 0]}>
          <meshStandardMaterial
            color="#2f2552"
            metalness={0.3}
            roughness={0.48}
          />
        </mesh>

        <mesh
          geometry={faceGlowGeometry}
          position={[0, 1.23, 0.73]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            ref={faceGlowMaterial}
            color="#f4a261"
            emissive="#f4a261"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>

        <mesh geometry={facePlateGeometry} position={[0, 1.23, 0.71]}>
          <meshStandardMaterial
            ref={facePlateMaterial}
            color="#2a9d8f"
            emissive="#2a9d8f"
            emissiveIntensity={0.45}
            transparent
            opacity={0.26}
            metalness={0.34}
            roughness={0.12}
          />
        </mesh>

        <mesh geometry={facePlateGeometry} position={[0, 1.23, 0.68]}>
          <meshStandardMaterial color="#020617" transparent opacity={0.85} />
        </mesh>

        <mesh ref={leftEye} position={[-0.45, 0.23, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            ref={leftEyeMaterial}
            color="#2a9d8f"
            emissive="#2a9d8f"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.45, 0.23, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            ref={rightEyeMaterial}
            color="#e76f51"
            emissive="#e76f51"
            emissiveIntensity={0.82}
          />
        </mesh>

        <mesh geometry={antennaGeometry} position={[0, 2.2, 0]}>
          <meshStandardMaterial
            color="#f4a261"
            metalness={0.58}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color="#e76f51"
            emissive="#e76f51"
            emissiveIntensity={0.78}
          />
        </mesh>

        <mesh position={[0, -1.35, 0]}>
          <boxGeometry args={[2.8, 0.35, 1.2]} />
          <meshStandardMaterial
            color="#2f2552"
            metalness={0.34}
            roughness={0.58}
          />
        </mesh>

        <mesh position={[0, 0.75, 0.85]}>
          <boxGeometry args={[0.9, 0.08, 0.1]} />
          <meshStandardMaterial
            ref={chestBarMaterial}
            color="#f4a261"
            emissive="#f4a261"
            emissiveIntensity={0.55}
          />
        </mesh>

        <mesh position={[0, 0.05, 0.82]}>
          <boxGeometry args={[0.65, 0.05, 0.1]} />
          <meshStandardMaterial
            ref={voiceBarMaterial}
            color="#e9c46a"
            emissive="#e9c46a"
            emissiveIntensity={0.48}
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
        <color attach="background" args={["#130d22"]} />
        <ambientLight intensity={0.85} color="#f6f1eb" />
        <spotLight
          position={[0, 2.6, 4.5]}
          angle={0.5}
          intensity={1.15}
          color="#f4a261"
          penumbra={0.5}
        />
        <pointLight position={[3, 3, 4]} intensity={1} color="#2a9d8f" />
        <pointLight position={[-3.5, 1.5, 4]} intensity={0.88} color="#e76f51" />
        <pointLight position={[0, 0.5, 3.2]} intensity={0.75} color="#e9c46a" />
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
            color="#130d22"
            emissive="#271c42"
            emissiveIntensity={0.22}
          />
        </mesh>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#130d22]/40 via-[#0f0a1a]/70 to-[#05040a]" />
    </div>
  );
}
