<template>
  <div class="network-particles" ref="container">
    <svg :width="width" :height="height" class="particles-svg">
      <line
        v-for="(conn, idx) in connections"
        :key="'c-' + idx"
        :x1="conn.x1"
        :y1="conn.y1"
        :x2="conn.x2"
        :y2="conn.y2"
        :stroke="conn.color"
        :stroke-width="conn.width"
        :opacity="conn.opacity"
        stroke-linecap="round"
      />
      <circle
        v-for="(flow, idx) in dataFlows"
        :key="'f-' + idx"
        :cx="flow.cx"
        :cy="flow.cy"
        :r="flow.r"
        :fill="flow.color"
        :opacity="flow.opacity"
      />
      <g v-for="(node, idx) in nodes" :key="'n-' + idx">
        <circle :cx="node.x" :cy="node.y" :r="node.r + 5" :fill="node.color" :opacity="node.glowOpacity" />
        <circle :cx="node.x" :cy="node.y" :r="node.r" :fill="node.color" :opacity="node.opacity" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps({
  count: { type: Number, default: 25 },
  speed: { type: Number, default: 0.3 },
  connectionDistance: { type: Number, default: 150 },
  colors: { type: Array, default: () => ['#2563eb', '#0891b2', '#16a34a', '#7c3aed'] },
})

const container = ref(null)
const width = ref(960)
const height = ref(540)
let animationId = null
const nodes = reactive([])
const connections = reactive([])
const dataFlows = reactive([])

function syncSize() {
  if (!container.value) return
  width.value = container.value.clientWidth || 960
  height.value = container.value.clientHeight || 540
}

function createNodes() {
  nodes.length = 0
  for (let i = 0; i < props.count; i += 1) {
    nodes.push({
      x: Math.random() * width.value,
      y: Math.random() * height.value,
      vx: (Math.random() - 0.5) * props.speed,
      vy: (Math.random() - 0.5) * props.speed,
      r: 1.8 + Math.random() * 2.4,
      color: props.colors[Math.floor(Math.random() * props.colors.length)],
      opacity: 0.25 + Math.random() * 0.32,
      glowOpacity: 0.035 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
    })
  }
}

function updateNodes(time) {
  for (const node of nodes) {
    node.x += node.vx
    node.y += node.vy
    if (node.x < -20 || node.x > width.value + 20) node.vx *= -1
    if (node.y < -20 || node.y > height.value + 20) node.vy *= -1
    node.opacity = 0.26 + Math.sin(time * 0.001 + node.phase) * 0.13
    node.glowOpacity = 0.035 + Math.sin(time * 0.0016 + node.phase) * 0.025
  }
}

function updateConnections() {
  connections.length = 0
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < props.connectionDistance) {
        connections.push({
          x1: nodes[i].x,
          y1: nodes[i].y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          color: nodes[i].color,
          width: 0.35 + (1 - dist / props.connectionDistance) * 0.55,
          opacity: (1 - dist / props.connectionDistance) * 0.14,
        })
      }
    }
  }
}

function updateDataFlows(time) {
  dataFlows.length = 0
  const maxFlows = Math.min(connections.length, 7)
  for (let i = 0; i < maxFlows; i += 1) {
    const conn = connections[i]
    if (!conn) continue
    const t = (time * 0.0007 + i * 0.21) % 1
    dataFlows.push({
      cx: conn.x1 + (conn.x2 - conn.x1) * t,
      cy: conn.y1 + (conn.y2 - conn.y1) * t,
      r: 1.25,
      color: conn.color,
      opacity: 0.38 * Math.sin(t * Math.PI),
    })
  }
}

function animate(time) {
  updateNodes(time)
  updateConnections()
  updateDataFlows(time)
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  syncSize()
  createNodes()
  window.addEventListener('resize', syncSize)
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('resize', syncSize)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.network-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.particles-svg {
  width: 100%;
  height: 100%;
}
</style>
