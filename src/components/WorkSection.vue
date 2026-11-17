<script setup>
import { t } from '../i18n.js'
import { workHeading, projects } from '../content.js'
</script>

<template>
  <section class="band gut" id="work">
    <div class="head reveal" v-reveal>
      <h2><span v-for="line in t(workHeading.lines)" :key="line" class="line">{{ line }}</span></h2>
      <span class="idx">{{ workHeading.idx }}</span>
    </div>

    <div class="work">
      <article v-for="p in projects" :key="p.no" class="card reveal" v-reveal v-spotlight.tilt>
        <div class="main">
          <div class="tag">{{ t(p.tag) }}</div>
          <h3>{{ t(p.title) }}</h3>
          <p class="lead">{{ t(p.lead) }}</p>
          <p>{{ t(p.body) }}</p>
        </div>

        <dl class="side">
          <div v-for="row in p.side" :key="row.label.en">
            <dt>{{ t(row.label) }}</dt>
            <dd v-if="row.chips" class="chips">
              <span v-for="chip in row.chips" :key="chip">{{ chip }}</span>
            </dd>
            <dd v-else>{{ t(row.value) }}</dd>
          </div>
        </dl>

        <span class="no" aria-hidden="true">{{ p.no }}</span>
      </article>
    </div>
  </section>
</template>
