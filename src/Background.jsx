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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    const texture = new THREE.TextureLoader().load("/bg.jpg", (tex) => {
      material.uniforms.uImageRes.value.set(tex.image.width, tex.image.height)
    })
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScroll: { value: 0 }, // スクロール量を保持
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
          
          // スクロールで動かすために、少しだけ表示領域を狭く設定（マージンを持たせる）
          float scrollFactor = 0.15; 
          vec2 ratio = vec2(
            min(screenAspect / imageAspect, 1.0),
            min(imageAspect / screenAspect, 1.0) * (1.0 - scrollFactor)
          );

          // UV座標の計算。uScroll に応じて y 座標をオフセットさせる
          vec2 uv = (vUv - 0.5) * ratio + 0.5;
          uv.y += uScroll * scrollFactor - (scrollFactor * 0.5);

          // つなぎ目が見えないように安全圏を確保
          float waveStrength = 0.015;
          vec2 safeUv = uv * (1.0 - waveStrength * 2.0) + waveStrength;

          // ゆったりとした波の動き
          float wave = sin((safeUv.x + safeUv.y) * 2.0 - uTime) * waveStrength;
          safeUv += wave;

          vec4 color = texture2D(uTexture, safeUv);

          // セピア調の加工
          float r = color.r;
          float g = color.g;
          float b = color.b;
          color.r = r * 0.393 + g * 0.769 + b * 0.189;
          color.g = r * 0.349 + g * 0.686 + b * 0.168;
          color.b = r * 0.272 + g * 0.534 + b * 0.131;

          color.rgb *= 0.6;

          gl_FragColor = color;
        }
      `
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // スクロールイベントの監視
    const handleScroll = () => {
      // 画面全体の高さに対する現在のスクロール位置を 0.0 ～ 1.0 で計算
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      material.uniforms.uScroll.value = scrollPercent
    }
    window.addEventListener("scroll", handleScroll)

    let animationId
    const animate = (time) => {
      material.uniforms.uTime.value = time * 0.0001
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

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