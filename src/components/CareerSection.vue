<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { t } from '../i18n.js'
import { careerHeading, jobs } from '../content.js'

// The rail fills as the timeline scrolls through the middle of the viewport.
const timeline = ref(null)
const fill = ref(null)

function onScroll() {
  if (!timeline.value || !fill.value) return
  const r = timeline.value.getBoundingClientRect()
  const p = (innerHeight * 0.7 - r.top) / r.height
  fill.value.style.setProperty('--p', String(Math.max(0, Math.min(1, p))))
}

onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="band gut" id="career">
    <div class="head reveal" v-reveal>
      <h2><span v-for="line in t(careerHeading.lines)" :key="line" class="line">{{ line }}</span></h2>
      <span class="idx">{{ careerHeading.idx }}</span>
    </div>

    <div class="timeline" ref="timeline">
      <div class="rail"><i ref="fill"></i></div>

      <div v-for="job in jobs" :key="job.org.en" class="job reveal" v-reveal>
        <span class="when">{{ t(job.when) }}</span>
        <div>
          <h3>
            {{ t(job.title) }}
            <small>{{ t(job.org) }}</small>
          </h3>
          <p v-if="job.desc">{{ t(job.desc) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
