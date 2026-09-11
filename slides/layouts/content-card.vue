<template>
  <div class="slidev-layout content-card-layout">
    <div
      v-motion
      class="content-shell"
      :initial="{ opacity: 0, y: 18 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 460, ease: 'easeOut' } }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content-card-layout {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 38px 54px 46px;
  background: #ffffff;
}

.content-shell {
  width: 100%;
}

.content-shell :deep(h1) {
  max-width: 820px;
  margin: 0;
  color: var(--sdn-text-primary);
  font-size: 1.62rem;
  font-weight: 850 !important;
  line-height: 1.16 !important;
}

.content-shell :deep(h2) {
  color: var(--sdn-text-primary);
  font-size: 1.08rem;
}

.content-shell :deep(h3) {
  color: var(--sdn-text-primary);
}

.content-shell :deep(> p) {
  max-width: 100%;
  margin-top: 8px;
  color: var(--sdn-text-secondary);
  font-size: 0.86rem;
}
</style>
