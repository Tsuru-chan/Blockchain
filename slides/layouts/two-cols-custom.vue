<template>
  <div class="slidev-layout two-cols-custom-layout">
    <header class="tc-header">
      <slot name="header" />
    </header>
    <main class="tc-columns">
      <section class="tc-pane tc-left">
        <slot />
      </section>
      <section class="tc-pane tc-right">
        <slot name="right" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.two-cols-custom-layout {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 38px 54px 46px;
  background: #ffffff;
}

.tc-header :deep(h1) {
  margin: 0;
  font-size: 1.62rem;
  font-weight: 850 !important;
}

.tc-columns {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.tc-pane {
  min-width: 0;
  border: 1px solid var(--sdn-border);
  border-radius: var(--sdn-radius-lg);
  background: #ffffff;
  box-shadow: var(--sdn-shadow-xs);
  padding: 20px;
}

.tc-pane :deep(h2) {
  margin: 0 0 12px;
  color: var(--accent, var(--sdn-blue));
  font-size: 1.02rem;
}

.tc-pane :deep(li) {
  font-size: 0.78rem;
}

.tc-left {
  --accent: var(--sdn-green);
}

.tc-right {
  --accent: var(--sdn-red);
}
</style>
