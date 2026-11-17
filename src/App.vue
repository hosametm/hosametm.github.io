<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { scrollState } from './scroll.js'
import DataFloor from './components/DataFloor.vue'
import CursorDot from './components/CursorDot.vue'
import Loader from './components/Loader.vue'
import TopNav from './components/TopNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import WorkSection from './components/WorkSection.vue'
import PrinciplesSection from './components/PrinciplesSection.vue'
import CareerSection from './components/CareerSection.vue'
import ToolboxSection from './components/ToolboxSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const progress = ref(0)
const veil = ref(0)

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight
  const p = max > 0 ? scrollY / max : 0
  scrollState.p = p
  progress.value = p
  veil.value = Math.min(0.55, Math.max(0, (scrollY / innerHeight - 0.3) * 0.8))
}

onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <DataFloor />
  <div id="veil" :style="{ opacity: veil }" aria-hidden="true"></div>
  <div id="progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
  <CursorDot />
  <Loader />
  <TopNav />

  <main class="wrap" id="top">
    <HeroSection />
    <MarqueeStrip />
    <WorkSection />
    <PrinciplesSection />
    <CareerSection />
    <ToolboxSection />
    <ContactSection />
    <SiteFooter />
  </main>
</template>
