import { useEffect, useRef } from "react";

/**
 * Komponen ShaderLines - Efek shader animasi dengan Three.js
 * Dikonversi dari TypeScript ke JavaScript untuk kompatibilitas
 * 
 * Features:
 * - Dynamic Three.js loading (CDN) untuk menghindari bundle bloat
 * - Shader animation dengan WebGL
 * - Responsive dan auto-resize
 * - Cleanup proper untuk prevent memory leaks
 * 
 * Performance:
 * - Three.js loaded via CDN (tidak menambah bundle size)
 * - GPU-accelerated rendering
 * - RequestAnimationFrame untuk smooth animation
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 */
export function ShaderLines({ className = "" }) {
  const containerRef = useRef(null);
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    // Load Three.js dynamically via CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS();
      }
    };
    
    script.onerror = () => {
      console.error("Failed to load Three.js");
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      // Remove script tag
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const container = containerRef.current;

    // Clear any existing content
    container.innerHTML = "";

    // Initialize camera
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // Initialize scene
    const scene = new THREE.Scene();

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define uniforms
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader - Original algorithm dengan violet/purple theme
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }

        // Swap BGR to RGB dan boost untuk violet/purple theme
        // Boost blue dan red channels untuk violet yang lebih kuat
        vec3 finalColor = vec3(
          color[2] * 1.5,  // Red channel (boost untuk violet)
          color[1] * 0.7,  // Green channel (kurangi untuk violet)
          color[0] * 2.0   // Blue channel (boost maksimal untuk violet)
        );

        // Clamp untuk mencegah overexposure
        finalColor = clamp(finalColor, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio untuk performa
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    };

    // Handle resize
    const onWindowResize = () => {
      if (!container || !renderer) return;
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Animation loop - Original speed
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05; // Original speed dari referensi
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resize listener
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full absolute inset-0 ${className}`}
      style={{
        pointerEvents: 'none',
        opacity: 0.6, // Opacity yang balanced - glow terlihat, lines subtle
        mixBlendMode: 'screen', // Screen blend untuk glow effect yang lebih terlihat
        filter: 'blur(0.5px)', // Subtle blur untuk soften lines tapi keep glow
      }}
    />
  );
}

