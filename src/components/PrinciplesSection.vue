<script setup>
import { t } from '../i18n.js'
import { principlesHeading, principles, principlesCta } from '../content.js'
</script>

<template>
  <section class="band gut" id="principles">
    <div class="head reveal" v-reveal>
      <h2><span v-for="line in t(principlesHeading.lines)" :key="line" class="line">{{ line }}</span></h2>
      <span class="idx">{{ principlesHeading.idx }}</span>
    </div>

    <div class="rules reveal" v-reveal>
      <div v-for="rule in principles" :key="rule.k" class="rule" v-spotlight>
        <span class="k">{{ rule.k }}</span>
        <div>
          <h4>{{ t(rule.title) }}</h4>
          <p>{{ t(rule.body) }}</p>
        </div>
      </div>

      <a class="rule cta" href="#contact" v-spotlight>
        <p>{{ t(principlesCta) }}</p>
      </a>
    </div>
  </section>
</template>
