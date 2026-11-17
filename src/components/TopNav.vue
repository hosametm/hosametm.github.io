<script setup>
import { lang, setLang, t } from '../i18n.js'
import { navItems } from '../content.js'
</script>

<template>
  <nav class="top">
    <div class="gut">
      <a class="mark" href="#top"><i></i>HM</a>
      <div class="links">
        <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`">{{ t(item.label) }}</a>
      </div>
      <span class="toggle" role="group" aria-label="Language">
        <button type="button" :aria-pressed="String(lang === 'en')" @click="setLang('en')">EN</button>
        <button type="button" class="arb" :aria-pressed="String(lang === 'ar')" @click="setLang('ar')">عربي</button>
      </span>
    </div>
  </nav>
</template>
