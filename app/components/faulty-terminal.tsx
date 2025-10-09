"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  char: string;
  life: number;
  maxLife: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export function FaultyTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const getRandomChar = useCallback(() => {
    const terminalChars = ['01', '10', '11', '00', '101', '010', '110', '001', 'AI', 'ML', '01', '10'];
    return terminalChars[Math.floor(Math.random() * terminalChars.length)];
  }, []);

  const getColor = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    const terminalColor = style.getPropertyValue('--terminal-color') || '#bd5d3a';
    const terminalGlitch = style.getPropertyValue('--terminal-glitch') || '#3d3929';

    return Math.random() > 0.5 ? terminalColor : terminalGlitch;
  }, []);

  const createParticle = useCallback((x: number, y: number, mouseInfluence = false): Particle => {
    const angle = mouseInfluence
      ? Math.atan2(y - mouseRef.current.y, x - mouseRef.current.x) + (Math.random() - 0.5) * Math.PI / 4
      : Math.random() * Math.PI * 2;

    const speed = mouseInfluence ? 0.5 + Math.random() * 1.5 : 0.2 + Math.random() * 0.8;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: mouseInfluence ? 2 + Math.random() * 3 : 1 + Math.random() * 2,
      color: getColor(),
      char: getRandomChar(),
      life: 1,
      maxLife: 60 + Math.random() * 120,
    };
  }, [getRandomChar, getColor]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ));
    }

    particlesRef.current = particles;
  }, [createParticle]);

  const updateParticles = useCallback((width: number, height: number) => {
    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;

      // Add some randomness (glitch effect)
      if (Math.random() < 0.02) {
        newX += (Math.random() - 0.5) * 10;
        newY += (Math.random() - 0.5) * 10;
      }

      // Wrap around edges
      if (newX < 0) newX = width;
      if (newX > width) newX = 0;
      if (newY < 0) newY = height;
      if (newY > height) newY = 0;

      // Mouse interaction - particles are repelled by cursor
      const dx = newX - mouseRef.current.x;
      const dy = newY - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100 && distance > 0) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.2;
        particle.vy += (dy / distance) * force * 0.2;

        // Limit velocity
        const maxSpeed = 3;
        const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (currentSpeed > maxSpeed) {
          particle.vx = (particle.vx / currentSpeed) * maxSpeed;
          particle.vy = (particle.vy / currentSpeed) * maxSpeed;
        }
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update life
      const newLife = particle.life - (1 / particle.maxLife);

      return {
        ...particle,
        x: newX,
        y: newY,
        life: newLife,
        color: getColor(),
      };
    }).filter(particle => particle.life > 0);

    // Add new particles to maintain count
    const targetCount = Math.min(80, Math.floor((width * height) / 15000));
    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ));
    }
  }, [createParticle, getColor]);

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particlesRef.current.forEach(particle => {
      const alpha = particle.life;

      // Draw character
      ctx.save();
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = particle.color;
      ctx.font = `${particle.size * 4}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add glitch effect
      if (Math.random() < 0.1) {
        ctx.fillStyle = particle.color === 'var(--terminal-color)' ? 'var(--terminal-glitch)' : 'var(--terminal-color)';
      }

      ctx.fillText(particle.char, particle.x, particle.y);
      ctx.restore();
    });

    // Draw connections between nearby particles
    ctx.strokeStyle = 'rgba(189, 93, 58, 0.1)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / 80) * 0.2 * particlesRef.current[i].life * particlesRef.current[j].life;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas.width, canvas.height);
    drawParticles(ctx);

    if (!isReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [isReducedMotion, updateParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create particles at mouse position occasionally
      if (Math.random() < 0.1 && particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!isReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleMediaChange);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReducedMotion, animate, createParticle, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="terminal-canvas"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    />
  );
}