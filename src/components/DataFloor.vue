<script setup>
// The fixed WebGL backdrop: a grid of server blocks rippling under request
// packets that flow into a rotating core. Scroll drives the camera.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { scrollState } from '../scroll.js'

const canvas = ref(null)
let cleanup = () => {}

onMounted(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = innerWidth < 760

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return // no WebGL: the page keeps its CSS background
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2))
  renderer.setClearColor(0x07090d, 1)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x07090d, 0.045)
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200)

  scene.add(new THREE.HemisphereLight(0x9fd8ff, 0x07090d, 0.55))
  const key = new THREE.PointLight(0xffa94d, 2.4, 40, 1.6)
  key.position.set(0, 6, 0)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x9fd8ff, 0.5)
  rim.position.set(-8, 10, -6)
  scene.add(rim)

  // grid of server blocks
  const N = mobile ? 26 : 44
  const GAP = 0.78
  const count = N * N
  const boxGeo = new THREE.BoxGeometry(0.62, 1, 0.62)
  boxGeo.translate(0, 0.5, 0)
  const blocks = new THREE.InstancedMesh(
    boxGeo,
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.45 }),
    count,
  )
  const cLow = new THREE.Color(0x141b26)
  const cMid = new THREE.Color(0x2b4058)
  const cHi = new THREE.Color(0xffa94d)
  const col = new THREE.Color()
  const dummy = new THREE.Object3D()
  const pos = []
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) pos.push([(i - N / 2 + 0.5) * GAP, (j - N / 2 + 0.5) * GAP])
  for (let k = 0; k < count; k++) blocks.setColorAt(k, cLow)
  scene.add(blocks)

  // the core
  const core = new THREE.Group()
  core.position.set(0, 5.2, 0)
  scene.add(core)
  const ico = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2, 1)),
    new THREE.LineBasicMaterial({ color: 0xffa94d, transparent: true, opacity: 0.85 }),
  )
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.05, 0),
    new THREE.MeshStandardMaterial({ color: 0x0e131b, metalness: 0.9, roughness: 0.2, emissive: 0xff7a1a, emissiveIntensity: 0.35, flatShading: true }),
  )
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.012, 8, 160), ringMat)
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.008, 8, 160), ringMat)
  ring1.rotation.x = Math.PI / 2.3
  ring2.rotation.x = Math.PI / 1.7
  ring2.rotation.y = 0.4
  core.add(ico, inner, ring1, ring2)

  // glow texture shared by the halo and the packets
  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = glowCanvas.height = 64
  const g = glowCanvas.getContext('2d')
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  gr.addColorStop(0, 'rgba(255,255,255,1)')
  gr.addColorStop(0.25, 'rgba(255,255,255,0.6)')
  gr.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(glowCanvas)

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, color: 0xff8a2a, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  halo.scale.set(9, 9, 1)
  core.add(halo)

  // request packets flying from the floor into the core
  const P = mobile ? 40 : 90
  const pArr = new Float32Array(P * 3)
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
  scene.add(new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ map: tex, color: 0x9fd8ff, size: 0.42, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  ))
  const newPacket = (t = 0) => {
    const p = pos[(Math.random() * count) | 0]
    return { x: p[0], z: p[1], t, s: 0.25 + Math.random() * 0.35, bend: (Math.random() - 0.5) * 6 }
  }
  const packets = Array.from({ length: P }, () => newPacket(Math.random()))

  // dust
  const D = mobile ? 300 : 700
  const dArr = new Float32Array(D * 3)
  for (let d = 0; d < D; d++) {
    dArr[d * 3] = (Math.random() - 0.5) * 60
    dArr[d * 3 + 1] = Math.random() * 25
    dArr[d * 3 + 2] = (Math.random() - 0.5) * 60
  }
  const dGeo = new THREE.BufferGeometry()
  dGeo.setAttribute('position', new THREE.BufferAttribute(dArr, 3))
  const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0x8c97a8, size: 0.05, transparent: true, opacity: 0.6 }))
  scene.add(dust)

  // pointer -> floor hit test
  const ray = new THREE.Raycaster()
  const ndc = new THREE.Vector2(9, 9)
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const hit = new THREE.Vector3(999, 0, 999)
  const pulses = []
  let mx = 0
  let my = 0
  let smx = 0
  let smy = 0
  let sp = 0

  const onPointerMove = (e) => {
    ndc.x = (e.clientX / innerWidth) * 2 - 1
    ndc.y = -(e.clientY / innerHeight) * 2 + 1
    mx = ndc.x
    my = ndc.y
  }
  const onPointerDown = () => {
    if (hit.x < 900) pulses.push({ x: hit.x, z: hit.z, t: 0 })
  }
  const onResize = () => {
    renderer.setSize(innerWidth, innerHeight, false)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
  }
  let visible = !document.hidden
  const onVisibility = () => {
    visible = !document.hidden
  }
  addEventListener('pointermove', onPointerMove)
  addEventListener('pointerdown', onPointerDown)
  addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  onResize()

  const clock = new THREE.Clock()
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
  let raf = 0

  const frame = () => {
    raf = requestAnimationFrame(frame)
    if (!visible) return

    const dt = Math.min(clock.getDelta(), 0.05)
    const t = clock.elapsedTime * (reduce ? 0.15 : 1)
    smx += (mx - smx) * 0.05
    smy += (my - smy) * 0.05
    sp += (scrollState.p - sp) * 0.06
    const e = ease(Math.min(1, sp * 1.6))

    // camera choreography driven by scroll
    const ang = sp * Math.PI * 1.1
    const rad = 17 - e * 5
    const ht = 7.5 + Math.sin(sp * Math.PI) * 4 - e * 1.5
    camera.position.set(Math.sin(ang) * rad + smx * 1.6, ht + smy * 0.8, Math.cos(ang) * rad)
    camera.lookAt(0, 2.2 + e * 1.5, 0)

    ray.setFromCamera(ndc, camera)
    if (!ray.ray.intersectPlane(plane, hit)) hit.set(999, 0, 999)

    for (let p = pulses.length - 1; p >= 0; p--) {
      pulses[p].t += dt
      if (pulses[p].t > 3) pulses.splice(p, 1)
    }

    // blocks
    for (let k = 0; k < count; k++) {
      const x = pos[k][0]
      const z = pos[k][1]
      const r = Math.sqrt(x * x + z * z)
      let h = 0.25 + 0.55 * (Math.sin(r * 0.55 - t * 1.4) * 0.5 + 0.5) + 0.45 * Math.sin(x * 0.35 + t * 0.8) * Math.cos(z * 0.3 - t * 0.6)
      const dx = x - hit.x
      const dz = z - hit.z
      h += 2.2 * Math.exp(-(dx * dx + dz * dz) / 5)
      for (const pu of pulses) {
        const ddx = x - pu.x
        const ddz = z - pu.z
        const dd = Math.sqrt(ddx * ddx + ddz * ddz)
        const w = pu.t * 7 - dd
        if (w > 0 && w < 2) h += Math.sin((w / 2) * Math.PI) * 1.6 * (1 - pu.t / 3)
      }
      h = Math.max(0.08, h)
      dummy.position.set(x, 0, z)
      dummy.scale.set(1, h, 1)
      dummy.updateMatrix()
      blocks.setMatrixAt(k, dummy.matrix)
      const c = Math.min(1, Math.max(0, (h - 0.6) / 2.2))
      if (c < 0.5) col.copy(cLow).lerp(cMid, c * 2)
      else col.copy(cMid).lerp(cHi, (c - 0.5) * 2)
      blocks.setColorAt(k, col)
    }
    blocks.instanceMatrix.needsUpdate = true
    blocks.instanceColor.needsUpdate = true

    // core
    const isRtl = document.documentElement.dir === 'rtl'
    core.position.x = e * (innerWidth > 900 ? 6 : 0) * (isRtl ? -1 : 1)
    core.position.y = 5.2 + Math.sin(t * 1.1) * 0.25
    ico.rotation.y = t * 0.25
    ico.rotation.x = t * 0.12
    inner.rotation.y = -t * 0.5
    inner.rotation.z = t * 0.3
    ring1.rotation.z = t * 0.4
    ring2.rotation.z = -t * 0.3
    const beat = 0.5 + 0.5 * Math.sin(t * 2.2)
    halo.material.opacity = 0.38 + beat * 0.25
    inner.material.emissiveIntensity = 0.25 + beat * 0.35
    key.position.copy(core.position)

    // packets: quadratic bezier from a floor block to the core
    const cp = core.position
    for (let q = 0; q < P; q++) {
      let pk = packets[q]
      pk.t += dt * pk.s
      if (pk.t >= 1) packets[q] = pk = newPacket(0)
      const u = pk.t
      const mxp = (pk.x + cp.x) / 2 + pk.bend
      const mzp = (pk.z + cp.z) / 2
      const myp = cp.y * 0.2 + 2
      const a = (1 - u) * (1 - u)
      const b = 2 * (1 - u) * u
      const cc = u * u
      pArr[q * 3] = a * pk.x + b * mxp + cc * cp.x
      pArr[q * 3 + 1] = a * 0.6 + b * myp + cc * cp.y
      pArr[q * 3 + 2] = a * pk.z + b * mzp + cc * cp.z
    }
    pGeo.attributes.position.needsUpdate = true
    dust.rotation.y = t * 0.01

    renderer.render(scene, camera)
  }
  frame()

  cleanup = () => {
    cancelAnimationFrame(raf)
    removeEventListener('pointermove', onPointerMove)
    removeEventListener('pointerdown', onPointerDown)
    removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    scene.traverse((o) => {
      o.geometry?.dispose()
      o.material?.dispose?.()
    })
    tex.dispose()
    renderer.dispose()
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <canvas id="stage" ref="canvas" aria-hidden="true"></canvas>
</template>
