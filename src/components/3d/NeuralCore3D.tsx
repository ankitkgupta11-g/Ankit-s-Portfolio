import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NeuralCore3DProps {
  className?: string;
}

export const NeuralCore3D: React.FC<NeuralCore3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Test WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // AI Neural Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Wireframe Polyhedron (AI Core Lattice)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan glow
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Middle Dodecahedron (Secondary Geometric Shell)
    const midGeo = new THREE.DodecahedronGeometry(1.6, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo/Violet
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midMesh);

    // 3. Neural Nodes (Points around sphere)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const violetColor = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + (Math.random() - 0.5) * 0.5;

      const sinPhi = Math.sin(phi);
      positions[i * 3] = r * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = cyanColor.clone().lerp(violetColor, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleSystem);

    // 4. Subtle Orbital Rings (Data Stream Axis)
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.008, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / rect.width) * 2 - 1;
      mouseRef.current.targetY = -((clientY / rect.height) * 2 - 1);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const speedMultiplier = isHovered ? 1.6 : 1.0;

      // Smooth mouse interpolation (Lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        // Rotations
        innerMesh.rotation.y += 0.3 * delta * speedMultiplier;
        innerMesh.rotation.x += 0.15 * delta * speedMultiplier;

        midMesh.rotation.y -= 0.2 * delta * speedMultiplier;
        midMesh.rotation.z += 0.1 * delta * speedMultiplier;

        particleSystem.rotation.y += 0.25 * delta * speedMultiplier;

        ring1.rotation.z += 0.35 * delta * speedMultiplier;
        ring2.rotation.z -= 0.25 * delta * speedMultiplier;

        // Mouse Parallax & tilt
        coreGroup.rotation.y = mouseRef.current.x * 0.75;
        coreGroup.rotation.x = -mouseRef.current.y * 0.75;
        coreGroup.position.x = mouseRef.current.x * 0.2;
        coreGroup.position.y = mouseRef.current.y * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();

      innerGeo.dispose();
      innerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      id="3d-neural-core-container"
      className={`relative w-full h-52 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-[#11131a]/80 to-[#0c0d14]/90 backdrop-blur-sm cursor-grab active:cursor-grabbing group ${className}`}
      aria-label="Interactive 3D AI Neural Structure"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_70%)]" />

      {/* Interactive Tag */}
      <div className="absolute top-2.5 right-3 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-cyan-300/80 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>NEURAL CORE 3D</span>
      </div>

      <div className="absolute bottom-2 left-3 pointer-events-none text-[10px] font-mono text-zinc-500 tracking-tight flex items-center gap-1">
        <span>INTERACTIVE</span>
        <span>•</span>
        <span className="text-zinc-400">MOVE CURSOR</span>
      </div>

      {/* Graceful Fallback if WebGL is unavailable */}
      {!webGLSupported && (
        <div className="flex flex-col items-center justify-center p-6 text-center text-zinc-400 space-y-2">
          <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/10">
            <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400 animate-spin" />
          </div>
          <p className="text-xs font-mono text-zinc-300">AI Core Visualization (2D Mode)</p>
          <p className="text-[11px] text-zinc-500">Accelerated 3D graphics rendered with CSS vectors</p>
        </div>
      )}
    </div>
  );
};

export default NeuralCore3D;
