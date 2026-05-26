import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Background() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    // ★画素数過多によるGPU暴走を防ぐため、デバイスピクセル比の最大値を2.0から1.5に制限（視覚的な劣化はゼロ）
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    mountRef.current.appendChild(renderer.domElement)

    const texture = new THREE.TextureLoader().load("bg.jpg", (tex) => {
      material.uniforms.uImageRes.value.set(tex.image.width, tex.image.height)
    })
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uImageRes: { value: new THREE.Vector2(1, 1) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uResolution;
        uniform vec2 uImageRes;
        varying vec2 vUv;

        void main() {
          float screenAspect = uResolution.x / uResolution.y;
          float imageAspect = uImageRes.x / uImageRes.y;
          float scrollFactor = 0.15; 
          vec2 ratio = vec2(
            min(screenAspect / imageAspect, 1.0),
            min(imageAspect / screenAspect, 1.0) * (1.0 - scrollFactor)
          );
          vec2 uv = (vUv - 0.5) * ratio + 0.5;
          uv.y += uScroll * scrollFactor - (scrollFactor * 0.5);

          vec2 baseWave = vec2(
            sin(vUv.y * 2.0 + uTime * 0.5),
            cos(vUv.x * 2.0 + uTime * 0.5)
          ) * 0.02;
          uv += baseWave;

          float angle = (1.0 - vUv.y) * 1.2 + vUv.x * 0.8;
          float waveSpeed = uTime * 1.0; 
          float xPos = angle - waveSpeed;
          
          float waveShape = sin(xPos * 4.0); 
          float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
          waveShape *= edgeFade;

          vec2 distortedUv = uv - (waveShape * 0.01); 
          vec4 color = texture2D(uTexture, distortedUv);

          float r = color.r; float g = color.g; float b = color.b;
          color.r = r * 0.393 + g * 0.769 + b * 0.189;
          color.g = r * 0.349 + g * 0.686 + b * 0.168;
          color.b = r * 0.272 + g * 0.534 + b * 0.131;

          color.rgb *= 0.55;

          float highlight = max(waveShape, 0.0) * 0.1; 
          float shadow = max(-waveShape, 0.0) * 0.1; 

          color.rgb += highlight; 
          color.rgb -= shadow;   

          gl_FragColor = color;
        }
      `
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      material.uniforms.uScroll.value = scrollPercent
    }
    window.addEventListener("scroll", handleScroll)

    // ★軽量化のための時間管理システムを導入
    const clock = new THREE.Clock()
    let delta = 0
    const interval = 1 / 30 // 💥 秒間30フレーム（30fps）に制限してGPU負荷を半分以下にカット

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      delta += clock.getDelta()
      
      // 設定したフレームレート（1/30秒）に達したときだけ描画ロジックを走らせる
      if (delta > interval) {
        // アニメーション用のuTime更新はミリ秒（performance.now）基準の計算のまま完全に維持
        material.uniforms.uTime.value = performance.now() * 0.0001
        renderer.render(scene, camera)
        
        delta = delta % interval
      }
    }
    // ループ開始
    animate()

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      material.uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{
    position: "fixed",
    inset: 0,
    zIndex: -1
  }} />
}