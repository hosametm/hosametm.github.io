<script setup>
import { marqueeItems } from '../content.js'

// Duplicated so the -50% translate loops seamlessly.
const items = [...marqueeItems, ...marqueeItems]
</script>

<template>
  <div class="marquee" aria-label="Stack">
    <div class="track">
      <span v-for="(item, i) in items" :key="i">{{ item }}</span>
    </div>
  </div>
</template>
