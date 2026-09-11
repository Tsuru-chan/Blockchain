<template>
  <div class="timeline-step" :class="{ active, last }">
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div class="marker-line" v-if="!last"></div>
    </div>
    <div class="timeline-body">
      <div class="timeline-title">{{ title }}</div>
      <div class="timeline-desc"><slot /></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  active: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
})
</script>

<style scoped>
.timeline-step {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 12px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 14px;
  height: 14px;
  border: 3px solid #ffffff;
  border-radius: 999px;
  background: var(--sdn-blue);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.26), 0 8px 16px rgba(37, 99, 235, 0.14);
}

.marker-line {
  width: 2px;
  flex: 1;
  min-height: 22px;
  margin-top: 5px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.24), rgba(8, 145, 178, 0.08));
}

.timeline-body {
  padding-bottom: 14px;
}

.timeline-title {
  margin-bottom: 3px;
  color: var(--sdn-text-primary);
  font-size: 0.82rem;
  font-weight: 850;
}

.timeline-desc {
  color: var(--sdn-text-muted);
  font-size: 0.74rem;
  line-height: 1.45;
}

.timeline-desc :deep(p) {
  margin: 2px 0;
  font-size: 0.74rem;
}

.active .marker-dot {
  background: var(--sdn-green);
  box-shadow: 0 0 0 1px rgba(22, 163, 74, 0.25), 0 8px 16px rgba(22, 163, 74, 0.14);
}
</style>
