<script setup>
// Intro counter. Adds body.ready when done, which lifts the loader and starts the hero animations.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const logs = [
  { text: 'php artisan up' },
  { text: 'redis', state: 'connected' },
  { text: 'horizon', state: 'running' },
  { text: 'queues', state: 'ready' },
]
const count = ref('000')
const shown = ref(logs.map(() => false))
let raf = 0

function finish() {
  document.body.classList.add('ready')
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish()
    return
  }
  const t0 = performance.now()
  const dur = 1500
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur)
    count.value = String(Math.round((1 - Math.pow(1 - p, 3)) * 100)).padStart(3, '0')
    shown.value = logs.map((_, i) => p > i / logs.length)
    if (p < 1) raf = requestAnimationFrame(tick)
    else setTimeout(finish, 250)
  }
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div id="loader" aria-hidden="true">
    <div class="count">{{ count }}</div>
    <div class="log">
      <span v-for="(line, i) in logs" :key="line.text" :class="{ on: shown[i] }">
        {{ line.text }}<template v-if="line.state"> <b>{{ line.state }}</b></template>
      </span>
    </div>
  </div>
</template>
