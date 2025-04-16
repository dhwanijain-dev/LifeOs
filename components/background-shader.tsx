"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import * as THREE from "three"

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    // Set renderer size
    const setSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", setSize)
    setSize()

    // Create shader material
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        
        // Create animated gradient
        float noise = sin(uv.x * 10.0 + time * 0.2) * sin(uv.y * 10.0 + time * 0.3) * 0.1;
        
        // Aurora effect
        float aurora = 0.0;
        for(float i = 0.0; i < 5.0; i++) {
          float phase = time * (0.1 + i * 0.01);
          float amplitude = 0.1 + i * 0.02;
          float frequency = 5.0 + i * 2.0;
          aurora += amplitude * sin(uv.x * frequency + phase) * exp(-pow(uv.y * 2.0 - 1.0 + amplitude * sin(uv.x * frequency * 0.5 + phase), 2.0) / (0.05 + i * 0.01));
        }
        
        // Particles
        float particles = 0.0;
        for(float i = 0.0; i < 3.0; i++) {
          vec2 particlePosition = vec2(
            fract(sin(i * 43758.5453123) * 12345.6789),
            fract(sin(i * 12345.6789) * 43758.5453123)
          );
          
          particlePosition.y = fract(particlePosition.y + time * (0.05 + i * 0.01));
          
          float particleSize = 0.002 + i * 0.001;
          float particle = smoothstep(particleSize, 0.0, length(uv - particlePosition));
          particles += particle;
        }
        
        // Combine effects
        vec3 color = mix(color1, color2, uv.y + noise + aurora * 0.3);
        color = mix(color, color3, aurora * 0.5);
        color += vec3(1.0) * particles;
        
        gl_FragColor = vec4(color, 0.8);
      }
    `

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Create uniforms
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      color1: { value: theme === "dark" ? new THREE.Color("#0f0f29") : new THREE.Color("#e0f7ff") },
      color2: { value: theme === "dark" ? new THREE.Color("#240046") : new THREE.Color("#f0f9ff") },
      color3: { value: theme === "dark" ? new THREE.Color("#5a189a") : new THREE.Color("#c7d2fe") },
    }

    // Create shader material
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
      transparent: true,
    })

    // Create a plane that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      uniforms.time.value = elapsedTime

      // Update colors based on theme
      if (theme === "dark") {
        uniforms.color1.value.set("#0f0f29")
        uniforms.color2.value.set("#240046")
        uniforms.color3.value.set("#5a189a")
      } else {
        uniforms.color1.value.set("#e0f7ff")
        uniforms.color2.value.set("#f0f9ff")
        uniforms.color3.value.set("#c7d2fe")
      }

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setSize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
