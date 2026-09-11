<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()
const hiddenLayouts = new Set(['cover-custom', 'none', 'end'])
const shouldShow = computed(() => !hiddenLayouts.has(nav.currentLayout))
</script>

<template>
  <footer v-if="shouldShow" class="global-footer">
    <div class="footer-left">
      <span class="footer-brand">BLOCKCHAIN</span>
      <span class="footer-dot"></span>
      <span class="footer-title">BITCOIN, BLOCKCHAIN & CRYPTOASSETS — Fabian Schär & Aleksander Berentsen</span>
    </div>
  </footer>
</template>

<style scoped>
.global-footer {
  position: absolute;
  right: 28px;
  bottom: 7px;
  left: 28px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--sdn-border-soft);
  background: rgba(255, 255, 255, 0.92);
  color: var(--sdn-text-muted);
  font-family: var(--sdn-font-sans);
  font-size: 0.62rem;
  padding-top: 8px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.footer-brand {
  color: var(--sdn-blue);
  font-weight: 850;
  letter-spacing: 0.08em;
}

.footer-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--sdn-green);
}

.footer-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
