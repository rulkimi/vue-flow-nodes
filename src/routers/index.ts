import { createWebHistory, createRouter, RouteLocation } from 'vue-router';

import FlowChartCanvas from '../views/FlowChartCanvas.vue';

const routes = [
  { path: '/', redirect: { name: 'flowchart' } },
  { 
    path: '/flowchart',
    name: 'flowchart',
    component: FlowChartCanvas,
    children: [
      {
        path: 'date-time/:nodeId?',
        name: 'date-time',
        component: () => import('../views/drawers/DateTimeDrawer.vue'),
        props: (route: RouteLocation) => ({
          nodeId: route.params.nodeId
        })
      },
      {
        path: 'send-message/:nodeId?',
        name: 'send-message',
        component: () => import('../views/drawers/SendMessageDrawer.vue'),
        props: (route: RouteLocation) => ({
          nodeId: route.params.nodeId,
        })
      },
      {
        path: 'add-comment/:nodeId?',
        name: 'add-comment',
        component: () => import('../views/drawers/AddCommentDrawer.vue'),
        props: (route: RouteLocation) => ({
          nodeId: route.params.nodeId,
        })
      }
    ]
  },
  {
    path: '/:notFound(.*)',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router; 