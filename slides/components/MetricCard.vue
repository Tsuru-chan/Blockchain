<template>
  <div
    v-motion
    class="metric-card"
    :class="[`variant-${variant}`]"
    :initial="{ opacity: 0, scale: 0.96, y: 10 }"
    :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } }"
  >
    <div class="metric-icon" v-if="resolvedIcon || $slots.icon">
      <slot name="icon">
        <span :class="resolvedIcon" class="metric-icon-glyph"></span>
      </slot>
    </div>

    <div class="metric-body">
      <div class="metric-value metric-val">{{ value }}</div>
      <div class="metric-lbl">{{ label }}</div>
      <div class="metric-desc" v-if="description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: String, default: '' },
  value: { type: String, default: '0' },
  label: { type: String, default: 'Metric' },
  description: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
})

const iconFallbacks = {
  primary: 'i-twemoji-globe-with-meridians',
  accent: 'i-twemoji-bar-chart',
  success: 'i-twemoji-white-heavy-check-mark',
  warning: 'i-twemoji-warning',
  danger: 'i-twemoji-high-voltage',
  violet: 'i-twemoji-bar-chart',
}

const resolvedIcon = computed(() => props.icon || iconFallbacks[props.variant] || iconFallbacks.primary)
</script>

<style scoped>
.metric-card {
  --metric-color: var(--sdn-blue);
  display: flex;
  align-items: center;
  gap: var(--metric-gap, 12px);
  min-width: var(--metric-min-width, 156px);
  border: 1px solid var(--sdn-border);
  border-radius: var(--metric-radius, 16px);
  background: #ffffff;
  box-shadow: var(--sdn-shadow-xs);
  padding: var(--metric-padding, 13px 15px);
}

.metric-icon {
  display: grid;
  width: var(--metric-icon-size, 42px);
  height: var(--metric-icon-size, 42px);
  flex: 0 0 var(--metric-icon-size, 42px);
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--metric-color) 18%, transparent);
  border-radius: var(--metric-icon-radius, 14px);
  background: color-mix(in srgb, var(--metric-color) 9%, #ffffff);
  color: var(--metric-color);
}

.metric-icon-glyph {
  width: var(--metric-icon-glyph-size, 22px);
  height: var(--metric-icon-glyph-size, 22px);
}

.metric-body {
  min-width: 0;
  text-align: left;
}

.metric-val {
  background: linear-gradient(135deg, var(--metric-color), color-mix(in srgb, var(--metric-color) 72%, #0f172a));
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--metric-color);
  font-family: var(--sdn-font-display);
  font-size: var(--metric-value-size, 1.45rem);
  font-weight: 880;
  letter-spacing: 0;
  line-height: var(--metric-value-line-height, 1);
  -webkit-text-fill-color: transparent;
}

.metric-lbl {
  margin-top: var(--metric-label-margin, 5px);
  color: var(--sdn-text-secondary);
  font-size: var(--metric-label-size, 0.66rem);
  font-weight: 850;
  letter-spacing: 0.02em;
  line-height: var(--metric-label-line-height, 1.2);
  text-transform: uppercase;
}

.metric-desc {
  margin-top: 4px;
  color: var(--sdn-text-muted);
  font-size: 0.66rem;
  line-height: 1.35;
}

.variant-accent {
  --metric-color: var(--sdn-cyan);
}

.variant-success {
  --metric-color: var(--sdn-green);
}

.variant-warning {
  --metric-color: var(--sdn-amber);
}

.variant-danger {
  --metric-color: var(--sdn-red);
}

.variant-violet {
  --metric-color: var(--sdn-violet);
}
</style>
