<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { t } from '../i18n.js'
import { contact } from '../content.js'

const btn = ref(null)
const emailEl = ref(null)
const copied = ref(false)
const fine = matchMedia('(pointer:fine)').matches
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
let timer = 0

// Magnetic pull toward the pointer on fine-pointer devices.
function onMove(e) {
  if (!fine || reduce || !btn.value) return
  const r = btn.value.getBoundingClientRect()
  btn.value.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`
}
function onLeave() {
  if (btn.value) btn.value.style.transform = ''
}

function selectEmail() {
  const range = document.createRange()
  range.selectNodeContents(emailEl.value)
  const sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1600)
  } catch {
    selectEmail() // clipboard blocked: select the text so the user can copy it
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section class="contact gut" id="contact">
    <p class="big reveal" v-reveal>
      {{ t(contact.heading)[0] }} <em>{{ t(contact.heading)[1] }}</em>
    </p>
    <p class="sub reveal" v-reveal>{{ t(contact.sub) }}</p>

    <button ref="btn" type="button" class="mag" @click="copyEmail" @pointermove="onMove" @pointerleave="onLeave">
      <span ref="emailEl">{{ contact.email }}</span>
      <span class="ic">{{ copied ? t({ en: 'copied', ar: 'تم النسخ' }) : t({ en: 'copy', ar: 'نسخ' }) }}</span>
    </button>

    <div class="socials">
      <a :href="contact.github" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </section>
</template>
