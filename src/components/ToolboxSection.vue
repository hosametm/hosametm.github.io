<script setup>
import { t } from '../i18n.js'
import { toolboxHeading, toolGroups } from '../content.js'
</script>

<template>
  <section class="band gut" id="stack">
    <div class="head reveal" v-reveal>
      <h2><span v-for="line in t(toolboxHeading.lines)" :key="line" class="line">{{ line }}</span></h2>
      <span class="idx">{{ t(toolboxHeading.idx) }}</span>
    </div>

    <div class="stack reveal" v-reveal>
      <div v-for="group in toolGroups" :key="group.label.en" class="box">
        <span class="k">{{ t(group.label) }}</span>
        <ul>
          <li v-for="item in group.items" :key="typeof item === 'string' ? item : item.en">
            {{ typeof item === 'string' ? item : t(item) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
