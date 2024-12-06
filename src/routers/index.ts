import { createWebHistory, createRouter } from 'vue-router';

import FlowChartCanvas from '../views/FlowChartCanvas.vue';

const routes = [
  { path: '/', component: FlowChartCanvas },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router; 