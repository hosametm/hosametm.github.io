const prefersReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const hasFinePointer = () => matchMedia('(pointer:fine)').matches

// v-reveal: elements below the first screen start hidden and fade in once visible.
export const vReveal = {
  mounted(el) {
    if (prefersReduced() || el.getBoundingClientRect().top <= innerHeight * 0.9) return
    el.classList.add('pre')
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove('pre')
        io.disconnect()
      }
    }, { threshold: 0.12 })
    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}

// v-spotlight: follows the pointer with a radial glow. Add `.tilt` for a 3D tilt.
export const vSpotlight = {
  mounted(el, binding) {
    const tilt = binding.modifiers.tilt && hasFinePointer() && !prefersReduced()

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      if (tilt) el.style.transform = `rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`
    }
    const onLeave = () => {
      if (tilt) el.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el._spotlight = { onMove, onLeave }
  },
  unmounted(el) {
    const h = el._spotlight
    if (!h) return
    el.removeEventListener('pointermove', h.onMove)
    el.removeEventListener('pointerleave', h.onLeave)
  },
}
