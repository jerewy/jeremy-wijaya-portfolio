"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

function AuroraBackdrop() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }: { clock: { elapsedTime: number } }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0.2, -2.2]} scale={[9.5, 5.8, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#100b2b") },
          uColor2: { value: new THREE.Color("#1d2360") },
          uColor3: { value: new THREE.Color("#6edbff") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin((uv.x * 6.0) + (uv.y * 4.0)) * 0.03;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          void main() {
            float wave = sin((vUv.y * 4.0) + (uTime * 0.4)) * 0.08;
            float wave2 = sin((vUv.x * 6.0) - (uTime * 0.55)) * 0.05;
            float mixVal = clamp(vUv.y + wave + wave2, 0.0, 1.0);
            vec3 base = mix(uColor1, uColor2, mixVal);
            float glow = smoothstep(0.45, 0.85, mixVal + sin(uTime * 0.8 + vUv.x * 10.0) * 0.18);
            vec3 color = mix(base, uColor3, glow);
            float alpha = 0.65 + glow * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function ShootingStarField({ count = 6 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const origins = useMemo(() => {
    return Array.from({ length: count }, () => ({
      start: new THREE.Vector3(
        -6 + Math.random() * 2,
        2.4 + Math.random() * 1.6,
        -2.5
      ),
      end: new THREE.Vector3(
        4.5 + Math.random() * 1.5,
        -0.6 + Math.random() * 0.8,
        -1.5
      ),
      speed: 0.2 + Math.random() * 0.25,
      offset: Math.random(),
    }));
  }, [count]);

  useFrame(({ clock }: { clock: { elapsedTime: number } }) => {
    if (!mesh.current) return;
    const time = clock.elapsedTime;
    origins.forEach((config, index) => {
      const progress = (time * config.speed + config.offset) % 1;
      const position = config.start.clone().lerp(config.end, progress);
      dummy.position.copy(position);
      dummy.rotation.set(-Math.PI / 5, Math.PI / 9, Math.PI / 8);
      const scalePulse = 0.8 + Math.sin(progress * Math.PI) * 0.25;
      dummy.scale.setScalar(scalePulse);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.06, 0.5, 12, 1, true]} />
      <meshStandardMaterial
        color="#f6f6ff"
        emissive="#a5c7ff"
        emissiveIntensity={1.8}
        roughness={0.2}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
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

  // Theme-aware colors
  const bgColor = theme === 'dark' ? '#0c1027' : '#f8fafc';
  const meshColor = theme === 'dark' ? '#10163a' : '#e2e8f0';
  const meshEmissive = theme === 'dark' ? '#1b285f' : '#cbd5e1';
  const gradientOpacity = theme === 'dark' ? 'opacity-70' : 'opacity-30';

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.7, 4.2], fov: 38 }} dpr={[1, 1.75]} className="w-full h-full absolute inset-0">
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={theme === 'dark' ? 0.92 : 0.6} color={theme === 'dark' ? "#f3f0ff" : "#ffffff"} />
        <spotLight
          position={[0, 2.4, 4.2]}
          angle={0.52}
          intensity={theme === 'dark' ? 1.2 : 0.8}
          color="#fcb383"
          penumbra={0.55}
        />
        <pointLight
          position={[3.2, 3.4, 3.6]}
          intensity={theme === 'dark' ? 1.05 : 0.7}
          color="#6edbff"
        />
        <pointLight
          position={[-3.4, 1.8, 4.2]}
          intensity={theme === 'dark' ? 0.95 : 0.6}
          color="#f59f9f"
        />
        <pointLight
          position={[0.4, 0.4, 2.8]}
          intensity={theme === 'dark' ? 0.8 : 0.5}
          color="#ffe58f"
        />
        {theme === 'dark' && <AuroraBackdrop />}
        <Sparkles
          color={theme === 'dark' ? "#9fdcff" : "#64748b"}
          count={theme === 'dark' ? 80 : 40}
          size={isCoarsePointer ? 2.2 : 3.2}
          scale={[9, 4, 2]}
          position={[0, 0.5, -1.8]}
          speed={0.2}
          opacity={theme === 'dark' ? 0.8 : 0.4}
        />
        {theme === 'dark' && (
          <Stars
            radius={60}
            depth={38}
            count={4200}
            factor={isCoarsePointer ? 2.1 : 2.8}
            saturation={0}
            fade
            speed={0.32}
          />
        )}
        <ShootingStarField count={theme === 'dark' ? 7 : 3} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color={meshColor}
            emissive={meshEmissive}
            emissiveIntensity={theme === 'dark' ? 0.3 : 0.1}
          />
        </mesh>
      </Canvas>
      {theme === 'dark' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,219,255,0.22),transparent_45%)]" />
          <div className={`absolute inset-0 bg-gradient-to-b from-[#0b0b1c]/70 via-[#090b1f]/60 to-[#05060f]/85 ${gradientOpacity}`} />
        </>
      )}
    </div>
  );
}
