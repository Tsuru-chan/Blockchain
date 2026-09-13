<template>
  <div class="cover-slide">
    <div class="cover-grid">
      <section class="cover-main">
        <div
          v-motion
          class="cover-badge"
          :initial="{ opacity: 0, y: 14 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 440 } }"
        >
          <span class="badge badge-network">
            {{ badge }}
          </span>
        </div>

        <h1
          v-motion
          class="cover-title"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 110, ease: 'easeOut' } }"
        >
          <slot name="title">
            Bitcoin, <br />
            <span class="gradient-text">Blockchain,<br /></span>
            <span class="gradient-text-accent">and Cryptoassets</span>
          </slot>
        </h1>

        <p
          v-motion
          class="cover-subtitle"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 560, delay: 240, ease: 'easeOut' } }"
        >
          <slot name="subtitle">
            A Comprehensive Introduction
          </slot>
        </p>
      </section>

      <aside
        v-motion
        class="cover-meta"
        :initial="{ opacity: 0, x: 28 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 620, delay: 420, ease: 'easeOut' } }"
      >
        <div class="meta-block" v-if="advisor">
          <div class="meta-label">Tác giả</div>
          <div class="meta-value">{{ advisor }}</div>
        </div>
        <div class="meta-block" v-if="student">
          <div class="meta-label">Sinh viên thực hiện</div>
          <div class="meta-value">
            <template v-if="Array.isArray(student)">
              <div v-for="(s, i) in student" :key="i">{{ s }}</div>
            </template>
            <template v-else>
              {{ student }}
            </template>
          </div>
        </div>
        <div
          v-motion
          class="cover-signals"
          :initial="{ opacity: 0, y: 18 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 520, delay: 360, ease: 'easeOut' } }"
        >
          <a href="https://github.com/Tsuru-chan/Blockchain" target="_blank" rel="noopener noreferrer">
            <i class="i-mdi-github"></i>
            GitHub
          </a>
          <a href="https://sli.dev" target="_blank" rel="noopener noreferrer">
            <i class="i-mdi-presentation"></i>
            Slidev
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badge: { type: String, default: 'BITCOIN · BLOCKCHAIN · CRYPTOASSETS' },
  advisor: { type: String, default: 'Fabian Schär · Aleksander Berentsen' },
  student: {
    type: [String, Array],
    default: () => ['Bản tiếng Việt 8 chương · Ba phần', 'Schär & Berentsen — MIT Press, 2020'],
  },
})
</script>

<style scoped>
.cover-slide {
  display: grid;
  width: 100%;
  min-height: 100%;
  place-items: center;
}

.cover-grid {
  display: grid;
  width: max(900px, 100%);
  grid-template-columns: 1fr 340px;
  gap: 25px;
  align-items: center;
}

.cover-main {
  text-align: left;
  padding-left: 28px;
}

.cover-badge {
  margin-bottom: 4px;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.cover-title {
  margin: 0;
  color: var(--sdn-text-primary);
  font-size: 3.2rem !important;
  font-weight: 850 !important;
  letter-spacing: 0;
  line-height: 1.2 !important;
  text-transform: uppercase;
}

.gradient-text,
.cover-title :slotted(.gradient-text) {
  background: linear-gradient(135deg, var(--sdn-blue) 0%, var(--sdn-cyan) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--sdn-blue);
  -webkit-text-fill-color: transparent;
}

.gradient-text-accent,
.cover-title :slotted(.gradient-text-accent) {
  background: linear-gradient(135deg, var(--sdn-green) 0%, var(--sdn-teal) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--sdn-green);
  -webkit-text-fill-color: transparent;
}

.cover-subtitle {
  max-width: 580px;
  margin: 18px 0 0;
  color: var(--sdn-text-secondary);
  font-size: 0.98rem;
  font-weight: 560;
  line-height: 1.55;
  text-align: left !important;
}

.cover-signals {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.cover-signals a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--sdn-border);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: var(--sdn-shadow-xs);
  color: var(--sdn-text-secondary);
  font-size: 0.72rem;
  font-weight: 760;
  padding: 8px 12px;
  text-decoration: none;
  transition:
    border-color var(--sdn-duration-fast) var(--sdn-ease-smooth),
    color var(--sdn-duration-fast) var(--sdn-ease-smooth),
    transform var(--sdn-duration-fast) var(--sdn-ease-smooth);
}

.cover-signals a:hover {
  border-color: color-mix(in srgb, var(--sdn-blue) 36%, var(--sdn-border));
  color: var(--sdn-blue);
  transform: translateY(-1px);
}

.cover-signals i {
  width: 15px;
  height: 15px;
  color: var(--sdn-blue);
}

.cover-meta {
  border: 1px solid var(--sdn-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--sdn-shadow-sm);
  padding: 22px;
  text-align: left;
  margin-top: 40px;
  margin-right: 28px;
}

.meta-block + .meta-block {
  margin-top: 18px;
}

.meta-label {
  color: var(--sdn-text-muted);
  font-size: 0.66rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.meta-value {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
  color: var(--sdn-text-primary);
  font-size: 0.8rem;
  font-weight: 760;
  line-height: 1.35;
}

.meta-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 22px;
  border-top: 1px solid var(--sdn-border-soft);
  padding-top: 16px;
}

.meta-stats div {
  min-width: 0;
}

.meta-stats strong {
  display: block;
  color: var(--sdn-blue);
  font-family: var(--sdn-font-display);
  font-size: 1.02rem;
  line-height: 1;
}

.meta-stats span {
  display: block;
  margin-top: 4px;
  color: var(--sdn-text-muted);
  font-size: 0.58rem;
  font-weight: 720;
  text-transform: uppercase;
}
</style>
