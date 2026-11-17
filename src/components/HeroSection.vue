<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { isAr, t } from '../i18n.js'
import { hero } from '../content.js'

// Live clock in Cairo time.
const clock = ref('--:--:--')
const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Cairo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})
const tickClock = () => {
  clock.value = fmt.format(new Date())
}
let timer = 0
onMounted(() => {
  tickClock()
  timer = setInterval(tickClock, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <header class="hero gut">
    <div class="eyebrow">{{ t(hero.eyebrow) }}</div>

    <h1>
      <!-- Latin letters rise one by one; Arabic rises as a whole word so letters stay joined. -->
      <span class="row" :style="{ '--d': '0ms' }">
        <template v-if="!isAr">
          <span v-for="(c, i) in hero.first.en" :key="i" class="ch" :style="{ '--i': i }">{{ c }}</span>
        </template>
        <span v-else class="ar-rise">{{ hero.first.ar }}</span>
      </span>
      <span class="row outline" :style="{ '--d': '180ms' }">
        <template v-if="!isAr">
          <span v-for="(c, i) in hero.last.en" :key="i" class="ch" :style="{ '--i': i }">{{ c }}</span>
        </template>
        <span v-else class="ar-rise">{{ hero.last.ar }}</span>
      </span>
    </h1>

    <div class="hero-foot">
      <p><strong>{{ t(hero.leadStrong) }}</strong>{{ t(hero.leadRest) }}</p>
      <div class="meta">
        <div v-for="m in hero.meta" :key="m.label.en">
          <span>{{ t(m.label) }}</span>
          <b v-if="m.clock">{{ clock }}</b>
          <b v-else>{{ t(m.value) }}</b>
        </div>
      </div>
    </div>

    <div class="scroll-cue"><span></span>{{ t(hero.scroll) }}</div>
  </header>
</template>
