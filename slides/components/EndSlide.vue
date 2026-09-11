<template>
  <div class="end-slide">
    <NetworkParticles
      class="end-particles"
      :count="34"
      :speed="0.12"
      :connection-distance="145"
      :colors="['#2563eb', '#0891b2', '#16a34a', '#7c3aed']"
    />

    <section
      v-motion
      class="end-content"
      :initial="{ opacity: 0, y: 24 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 640, ease: 'easeOut' } }"
    >
      <span class="badge badge-success">Schär & Berentsen · A Comprehensive Introduction</span>
      <h1>CẢM ƠN THẦY VÀ CÁC BẠN <br />ĐÃ LẮNG NGHE</h1>

      <div class="end-links">
        <a
          v-if="githubUrl"
          class="github-button"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          title="GitHub repository"
        >
          <i class="i-mdi-github"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import NetworkParticles from './NetworkParticles.vue'

defineProps({
  githubLabel: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
})
</script>

<style scoped>
.end-slide {
  position: absolute;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 100%;
  place-items: center;
  overflow: hidden;
  padding: 56px;
  background: #ffffff;
}

.end-particles {
  opacity: 0.42;
}

.end-content {
  display: flex;
  width: min(820px, 100%);
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.end-content h1 {
  max-width: 760px;
  margin: 18px auto 12px;
  color: var(--sdn-text-primary);
  font-size: 2.1rem;
  font-weight: 850 !important;
  line-height: 1.12 !important;
}

.end-content p {
  max-width: 680px;
  margin: 0 auto;
  color: var(--sdn-text-secondary);
  font-size: 0.92rem;
  text-align: center;
}

.end-metrics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 26px;
}

.end-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.github-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 44px;
  height: 44px;
  border: 1px solid color-mix(in srgb, var(--sdn-blue) 24%, var(--sdn-border));
  border-radius: 50%;
  background: var(--sdn-blue);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 720;
  line-height: 1;
  padding: 0;
  text-decoration: none;
  transition:
    background var(--sdn-duration-fast) var(--sdn-ease-smooth),
    transform var(--sdn-duration-fast) var(--sdn-ease-smooth),
    box-shadow var(--sdn-duration-fast) var(--sdn-ease-smooth);
}

.github-button:hover {
  background: var(--sdn-blue-700);
  box-shadow: var(--sdn-shadow-sm);
  transform: translateY(-1px);
}

.end-links i {
  width: 22px;
  height: 22px;
  color: currentColor;
}
</style>
