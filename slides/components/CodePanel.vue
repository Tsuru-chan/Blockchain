<template>
  <div class="code-panel" :class="[`tone-${tone}`, { dense }]">
    <div class="code-panel-header">
      <span class="code-badge">{{ badge }}</span>
      <span class="code-panel-title" v-if="title">{{ title }}</span>
    </div>
    <div class="code-panel-body">
      <slot />
    </div>
    <div class="code-caption" v-if="caption">{{ caption }}</div>
  </div>
</template>

<script setup>
defineProps({
  badge: { type: String, default: 'CODE' },
  title: { type: String, default: '' },
  caption: { type: String, default: '' },
  tone: { type: String, default: 'blue' },
  dense: { type: Boolean, default: false },
})
</script>
