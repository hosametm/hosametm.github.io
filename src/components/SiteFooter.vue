<script setup>
import { t } from '../i18n.js'
import { footer } from '../content.js'
</script>

<template>
  <footer>
    <div class="gut">
      <span>{{ footer.copyright }}</span>
      <span>{{ t(footer.credit) }}</span>
    </div>
  </footer>
</template>
