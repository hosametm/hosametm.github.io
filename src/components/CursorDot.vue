<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dot = ref(null)
const INTERACTIVE = 'a, button, [data-hover]'
let tx = innerWidth / 2
let ty = innerHeight / 2
let cx = tx
let cy = ty
let raf = 0

const onMove = (e) => {
  tx = e.clientX
  ty = e.clientY
}
// Grow the ring over links and buttons; shrink it elsewhere.
const onOver = (e) => {
  dot.value?.classList.toggle('big', !!e.target.closest?.(INTERACTIVE))
}
const loop = () => {
  cx += (tx - cx) * 0.2
  cy += (ty - cy) * 0.2
  if (dot.value) dot.value.style.transform = `translate(${cx}px,${cy}px)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  addEventListener('pointermove', onMove)
  document.addEventListener('pointerover', onOver)
  loop()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerover', onOver)
})
</script>

<template>
  <div id="cursor" ref="dot" aria-hidden="true"></div>
</template>
