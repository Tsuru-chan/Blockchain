<script setup>
import NetworkParticles from '../components/NetworkParticles.vue'
</script>

<template>
  <div class="slidev-layout cover-custom">
    <NetworkParticles
      class="cover-particles"
      :count="42"
      :speed="0.15"
      :connection-distance="138"
      :colors="['#2563eb', '#0891b2', '#16a34a', '#7c3aed']"
    />

    <div class="cover-corner cover-corner-left"></div>
    <div class="cover-corner cover-corner-right"></div>

    <div
      v-motion
      class="cover-content"
      :initial="{ opacity: 0, y: 24 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 680, ease: 'easeOut' } }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cover-custom {
  display: grid;
  min-height: 100%;
  place-items: center;
  overflow: hidden;
  padding: 54px 66px;
  background: #ffffff;
}

.cover-custom::before {
  opacity: 0.9;
}

.cover-particles {
  opacity: 0.5;
}

.cover-content {
  width: min(900px, 100%);
  text-align: center;
}

.cover-corner {
  position: absolute;
  z-index: 1;
  width: 154px;
  height: 154px;
  border: 1px solid rgba(37, 99, 235, 0.12);
  pointer-events: none;
}

.cover-corner-left {
  top: 34px;
  left: 38px;
  border-right: 0;
  border-bottom: 0;
  border-radius: 24px 0 0 0;
}

.cover-corner-right {
  right: 38px;
  bottom: 34px;
  border-top: 0;
  border-left: 0;
  border-radius: 0 0 24px 0;
}

.cover-content :deep(p) {
  text-align: center;
}
</style>
