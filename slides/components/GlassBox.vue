<template>
  <div class="glass-box" :class="[{ compact }, `tone-${tone}`]">
    <div class="glass-box-header" v-if="title || $slots.icon || icon">
      <span class="glass-box-icon" v-if="icon || $slots.icon">
        <slot name="icon">
          <span v-if="resolvedIcon" :class="resolvedIcon" class="glass-box-icon-glyph"></span>
          <span v-else-if="icon">{{ icon }}</span>
        </slot>
      </span>
      <span class="glass-box-title">{{ title }}</span>
    </div>
    <div class="glass-box-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  tone: { type: String, default: 'blue' },
})

const resolvedIcon = computed(() => props.icon)
</script>

<style scoped>
.glass-box {
  --box-accent: var(--sdn-blue);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--sdn-border);
  border-radius: var(--sdn-radius-lg);
  background: #ffffff;
  box-shadow: var(--sdn-shadow-xs);
  padding: 18px 20px;
}

.glass-box::after {
  position: absolute;
  top: 0;
  right: 18px;
  left: 18px;
  height: 3px;
  border-radius: 0 0 999px 999px;
  background: var(--box-accent);
  content: '';
}

.glass-box.compact {
  border-radius: 14px;
  padding: 13px 15px;
}

.glass-box-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.glass-box-icon {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--box-accent) 18%, transparent);
  border-radius: 11px;
  background: color-mix(in srgb, var(--box-accent) 9%, #ffffff);
  color: var(--box-accent);
}

.glass-box-icon-glyph {
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

.glass-box-title {
  color: var(--sdn-text-primary);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.glass-box-content :deep(p) {
  margin: 4px 0;
  font-size: 0.78rem;
}

.glass-box-content :deep(li) {
  margin-bottom: 4px;
  font-size: 0.76rem;
}

.tone-cyan {
  --box-accent: var(--sdn-cyan);
}

.tone-green {
  --box-accent: var(--sdn-green);
}

.tone-amber {
  --box-accent: var(--sdn-amber);
}

.tone-red {
  --box-accent: var(--sdn-red);
}

.tone-violet {
  --box-accent: var(--sdn-violet);
}
</style>
