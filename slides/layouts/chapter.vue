<template>
  <div class="slidev-layout chapter-layout">
    <section class="chapter-copy">
      <div
        v-motion
        class="chapter-content"
        :initial="{ opacity: 0, x: -26 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 620, ease: 'easeOut' } }"
      >
        <div class="chapter-eyebrow" v-if="$attrs.eyebrow">
          {{ $attrs.eyebrow }}
        </div>
        <div class="chapter-kicker" v-if="$attrs.chapterNumber">
          # {{ String($attrs.chapterNumber).padStart(2, '0') }}
        </div>
        <div class="chapter-kicker" v-else-if="$attrs.partNumber">
          Phần {{ $attrs.partNumber }}
        </div>
        <slot />
      </div>
    </section>

    <section class="chapter-visual" aria-hidden="true">
      <div class="chapter-orbit">
        <div class="orbit-node node-a"></div>
        <div class="orbit-node node-b"></div>
        <div class="orbit-node node-c"></div>
      </div>
      <div class="chapter-number" v-if="$attrs.chapterNumber">
        {{ String($attrs.chapterNumber).padStart(2, '0') }}
      </div>
      <div class="chapter-number chapter-number-roman" v-else-if="$attrs.partNumber">
        {{ $attrs.partNumber }}
      </div>
      <div class="chapter-line"></div>
    </section>
  </div>
</template>

<style scoped>
.chapter-layout {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  min-height: 100%;
  padding: 0;
  background: #ffffff;
}

.chapter-copy {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 78px 36px 78px 72px;
}

.chapter-content {
  width: 100%;
  max-width: 360px;
}

.chapter-eyebrow {
  margin-bottom: 10px;
  color: var(--sdn-text-muted);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.chapter-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  color: var(--sdn-blue);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter-kicker::before {
  width: 34px;
  height: 3px;
  border-radius: 999px;
  background: var(--sdn-gradient-primary);
  content: '';
}

.chapter-content :deep(h1) {
  margin: 0 0 14px;
  font-size: 2.16rem;
  font-weight: 850 !important;
  line-height: 1.05 !important;
  text-transform: uppercase;
}

.chapter-content :deep(h2) {
  max-width: 340px;
  margin: 0 0 18px;
  color: var(--sdn-text-secondary);
  font-family: var(--sdn-font-sans) !important;
  font-size: 1.08rem;
  font-weight: 650 !important;
  line-height: 1.42 !important;
}

.chapter-content :deep(p) {
  color: var(--sdn-text-muted);
  font-size: 0.82rem;
}

.chapter-visual {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-left: 1px solid var(--sdn-border-soft);
}

.chapter-orbit {
  position: absolute;
  top: 70px;
  right: 76px;
  width: 330px;
  height: 330px;
  border: 1px solid rgba(37, 99, 235, 0.14);
  border-radius: 999px;
}

.chapter-orbit::before,
.chapter-orbit::after {
  position: absolute;
  inset: 44px;
  border: 1px solid rgba(8, 145, 178, 0.12);
  border-radius: inherit;
  content: '';
}

.chapter-orbit::after {
  inset: 92px;
  border-color: rgba(22, 163, 74, 0.14);
}

.orbit-node {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 4px solid #ffffff;
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
}

.node-a {
  top: 52px;
  left: 28px;
  background: var(--sdn-blue);
}

.node-b {
  top: 132px;
  right: -8px;
  background: var(--sdn-green);
}

.node-c {
  bottom: 42px;
  left: 102px;
  background: var(--sdn-violet);
}

.chapter-number {
  position: absolute;
  right: 66px;
  bottom: 54px;
  color: #eef4ff;
  font-family: var(--sdn-font-display);
  font-size: 8.2rem;
  font-weight: 900;
  line-height: 1;
  user-select: none;
}

.chapter-line {
  position: absolute;
  right: 74px;
  bottom: 42px;
  left: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.32), rgba(22, 163, 74, 0.28));
}
</style>
