import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uIntro;
  uniform float uPointSize;
  uniform float uWindStrength;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uPointerActive;
  uniform float uPointerSpeed;

  attribute vec3 aScatter;
  attribute float aSeed;
  attribute float aAlpha;

  varying vec3 vColor;
  varying float vAlpha;

  float easeOut(float t) {
    return 1.0 - pow(1.0 - t, 3.0);
  }

  void main() {
    float intro = easeOut(clamp(uIntro, 0.0, 1.0));
    vec3 p = mix(aScatter, position, intro);

    float nx = position.x * 0.5 + 0.5;
    float windWeight = smoothstep(0.55, 1.0, nx) * (0.45 + aSeed * 0.55);
    float life = fract(uTime * 0.083333 + aSeed);
    float release = smoothstep(0.35, 1.0, life) * windWeight;
    float travel = release * (0.20 + aSeed * 1.0) * uWindStrength;

    p.x += travel;
    p.y += travel * 0.12;
    p.y += sin(position.x * 11.0 + position.y * 8.0 + uTime * 1.45 + aSeed * 20.0)
      * 0.026 * release;
    p.x += cos(position.y * 13.0 + uTime * 0.75 + aSeed * 17.0)
      * 0.012 * release;

    vec2 delta = p.xy - uPointer;
    float distanceToPointer = length(delta);
    float radius = 0.24;
    float repel = pow(max(0.0, 1.0 - distanceToPointer / radius), 2.0)
      * uPointerActive * (0.25 + min(uPointerSpeed, 1.4) * 0.75);
    vec2 direction = distanceToPointer > 0.001 ? normalize(delta) : vec2(1.0, 0.0);
    float swirl = sin(aSeed * 80.0 + uTime * 2.0) * repel * 0.035;
    p.xy += direction * repel * 0.23 + vec2(-direction.y, direction.x) * swirl;

    float sailShimmer = smoothstep(-0.15, 0.75, position.y)
      * sin(uTime * 1.2 + aSeed * 40.0) * 0.0015;
    p.x += sailShimmer;

    float windFade = 1.0 - smoothstep(0.82, 1.0, life) * windWeight;
    vAlpha = aAlpha * windFade * intro * (1.0 - uScroll * 0.88);
    vColor = color;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPointSize * (0.92 + aSeed * 0.18);
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float distanceFromCenter = length(center);
    if (distanceFromCenter > 0.5) discard;
    float edge = 1.0 - smoothstep(0.39, 0.5, distanceFromCenter);
    gl_FragColor = vec4(vColor, vAlpha * edge);
  }
`;

type ParticleShipProps = {
  paused: boolean;
  source?: string;
  scale?: number;
  className?: string;
};

export function ParticleShip({
  paused,
  source = "/assets/oceanier-ship-particles.png",
  scale = 0.76,
  className = "",
}: ParticleShipProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frame = 0;
    let resizeTimer = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;
    let isVisible = true;
    let pageVisible = !document.hidden;
    let previousTime = performance.now();
    let introElapsed = 0;
    let averageFrameTime = 0;
    let slowFrameDuration = 0;
    let particleCount = 0;
    let currentPointer = new THREE.Vector2(2, 2);
    let targetPointer = new THREE.Vector2(2, 2);
    let pointerActive = 0;
    let targetPointerActive = 0;
    let pointerSpeed = 0;
    let lastPointer = new THREE.Vector2(2, 2);
    let scrollProgress = 0;
    let reducedDrawRange = false;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1100;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    particleCount = isMobile ? 25_000 : isTablet || deviceMemory <= 4 ? 50_000 : 100_000;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.18, 1.58, 1.12, -1.12, 0.1, 10);
    camera.position.z = 2;
    const clock = new THREE.Clock();

    const image = new Image();
    image.src = source;

    const handlePointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        targetPointerActive = 0;
        return;
      }

      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = (event.clientY - rect.top) / rect.height;
      const nextX = THREE.MathUtils.lerp(-1.18, 1.58, normalizedX);
      const nextY = THREE.MathUtils.lerp(1.12, -1.12, normalizedY);
      targetPointer.set(nextX, nextY);
      pointerSpeed = Math.min(1.4, targetPointer.distanceTo(lastPointer) * 5.5);
      lastPointer.copy(targetPointer);
      targetPointerActive = 1;
    };

    const clearPointer = () => {
      targetPointerActive = 0;
    };

    const updateScroll = () => {
      const hero = mount.closest(".hero, .inner-hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height * 0.82, 1), 0, 1);
    };

    const updateVisibility = () => {
      pageVisible = !document.hidden;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    observer.observe(mount);

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    updateScroll();

    const resize = () => {
      if (!renderer) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer?.setSize(width, height, false);
      }, 120);
    };
    window.addEventListener("resize", resize, { passive: true });

    image.onload = () => {
      if (disposed) return;
      try {
        const sampleWidth = Math.min(1000, image.naturalWidth);
        const sampleHeight = Math.round((sampleWidth / image.naturalWidth) * image.naturalHeight);
        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = sampleWidth;
        sampleCanvas.height = sampleHeight;
        const context = sampleCanvas.getContext("2d", { willReadFrequently: true });
        if (!context) throw new Error("Canvas sampling unavailable");
        context.drawImage(image, 0, 0, sampleWidth, sampleHeight);
        const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
        const opaquePixels: number[] = [];
        for (let index = 0; index < sampleWidth * sampleHeight; index += 1) {
          if (pixels[index * 4 + 3] > 51) opaquePixels.push(index);
        }
        if (!opaquePixels.length) throw new Error("No opaque pixels found");

        const positions = new Float32Array(particleCount * 3);
        const scatters = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const seeds = new Float32Array(particleCount);
        const alphas = new Float32Array(particleCount);
        const imageAspect = sampleHeight / sampleWidth;
        const xScale = scale;
        const yScale = xScale * imageAspect;

        for (let index = 0; index < particleCount; index += 1) {
          const pixelIndex =
            opaquePixels[Math.floor((index / particleCount) * opaquePixels.length)];
          const px = pixelIndex % sampleWidth;
          const py = Math.floor(pixelIndex / sampleWidth);
          const dataIndex = pixelIndex * 4;
          const offset = index * 3;

          positions[offset] = (px / sampleWidth - 0.5) * 2 * xScale;
          positions[offset + 1] = -(py / sampleHeight - 0.5) * 2 * yScale;
          positions[offset + 2] = (Math.random() - 0.5) * 0.006;

          const angle = Math.random() * Math.PI * 2;
          const distance = 0.4 + Math.random() * 2.4;
          scatters[offset] = Math.cos(angle) * distance;
          scatters[offset + 1] = Math.sin(angle) * distance;
          scatters[offset + 2] = (Math.random() - 0.5) * 0.6;

          const sourceR = pixels[dataIndex] / 255;
          const sourceG = pixels[dataIndex + 1] / 255;
          const isLime = sourceG > sourceR * 1.1;
          colors[offset] = isLime ? 0.682 : 1;
          colors[offset + 1] = isLime ? 0.925 : 1;
          colors[offset + 2] = isLime ? 0.004 : 1;
          seeds[index] = Math.random();
          alphas[index] = 0.88 + Math.random() * 0.12;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatters, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uIntro: { value: reducedMotion ? 1 : 0 },
            uPointSize: { value: 1.45 * dpr },
            uWindStrength: { value: reducedMotion ? 0 : 0.9 },
            uScroll: { value: 0 },
            uPointer: { value: new THREE.Vector2(2, 2) },
            uPointerActive: { value: 0 },
            uPointerSpeed: { value: 0 },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
          vertexColors: true,
          depthWrite: false,
          blending: THREE.NormalBlending,
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(dpr);
        renderer.setSize(Math.max(1, mount.clientWidth), Math.max(1, mount.clientHeight), false);
        renderer.domElement.setAttribute("aria-hidden", "true");
        mount.appendChild(renderer.domElement);
        setReady(true);

        const animate = () => {
          if (disposed) return;
          frame = requestAnimationFrame(animate);
          if (!renderer || !material || !points || !isVisible || !pageVisible) {
            clock.getDelta();
            return;
          }

          const now = performance.now();
          const frameTime = Math.min(50, now - previousTime);
          previousTime = now;
          averageFrameTime = averageFrameTime * 0.96 + frameTime * 0.04;
          slowFrameDuration = averageFrameTime > 20 ? slowFrameDuration + frameTime : 0;
          if (slowFrameDuration > 2000 && !reducedDrawRange && geometry) {
            geometry.setDrawRange(0, Math.floor(particleCount * 0.62));
            reducedDrawRange = true;
          }

          const shouldPause = pausedRef.current || reducedMotion;
          const delta = shouldPause ? 0 : Math.min(clock.getDelta(), 0.05);
          if (!shouldPause) introElapsed += delta;
          const elapsed = material.uniforms.uTime.value + delta;

          currentPointer.lerp(targetPointer, shouldPause ? 1 : 0.12);
          pointerActive = THREE.MathUtils.lerp(
            pointerActive,
            targetPointerActive,
            shouldPause ? 1 : 0.1,
          );
          pointerSpeed *= 0.92;
          material.uniforms.uTime.value = elapsed;
          material.uniforms.uIntro.value = reducedMotion
            ? 1
            : THREE.MathUtils.clamp(introElapsed / 2.4, 0, 1);
          material.uniforms.uPointer.value.copy(currentPointer);
          material.uniforms.uPointerActive.value = pointerActive;
          material.uniforms.uPointerSpeed.value = pointerSpeed;
          material.uniforms.uScroll.value = scrollProgress;
          material.uniforms.uWindStrength.value = shouldPause ? 0 : 0.9 + scrollProgress * 2.4;

          const bob = shouldPause ? 0 : Math.sin(elapsed * 0.9) * 0.015;
          points.position.y = bob - scrollProgress * 0.04;
          points.position.x = (0.5 - currentPointer.x / 2.76) * pointerActive * 0.025;
          points.rotation.z = shouldPause
            ? 0
            : Math.sin(elapsed * 0.65) * THREE.MathUtils.degToRad(1.3);

          renderer.render(scene, camera);
        };
        animate();
      } catch {
        setFallback(true);
      }
    };

    image.onerror = () => setFallback(true);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateVisibility);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [scale, source]);

  return (
    <div className={`particle-stage ${ready ? "is-ready" : ""} ${className}`} ref={mountRef}>
      <img className={`particle-fallback ${fallback ? "is-fallback" : ""}`} src={source} alt="" />
    </div>
  );
}
