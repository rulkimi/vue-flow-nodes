import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { useMainStore } from '../stores';

import FlowChartCanvas from '../views/FlowChartCanvas.vue';

const routes: RouteRecordRaw[] = [
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
        beforeEnter: (to, _from, next) => {
          const store = useMainStore();
          const nodeId = to.params.nodeId as string;
          if (nodeId && !store.nodeIds.includes(nodeId)) {
            next({ name: 'flowchart' });
          } else {
            next();
          }
        },
        props: route => ({
          nodeId: route.params.nodeId
        })
      },
      {
        path: 'send-message/:nodeId?',
        name: 'send-message',
        component: () => import('../views/drawers/SendMessageDrawer.vue'),
        beforeEnter: (to, _from, next) => {
          const store = useMainStore();
          const nodeId = to.params.nodeId as string;
          if (nodeId && !store.nodeIds.includes(nodeId)) {
            next({ name: 'flowchart' });
          } else {
            next();
          }
        },
        props: route => ({
          nodeId: route.params.nodeId,
        })
      },
      {
        path: 'add-comment/:nodeId?',
        name: 'add-comment',
        component: () => import('../views/drawers/AddCommentDrawer.vue'),
        beforeEnter: (to, _from, next) => {
          const store = useMainStore();
          const nodeId = to.params.nodeId as string;
          if (nodeId && !store.nodeIds.includes(nodeId)) {
            next({ name: 'flowchart' });
          } else {
            next();
          }
        },
        props: route => ({
          nodeId: route.params.nodeId,
        })
      },
      {
        path: 'add-node/:edgeId?',
        name: 'add-node',
        component: () => import('../views/drawers/AddNode.vue'),
        beforeEnter: (to, _from, next) => {
          const store = useMainStore();
          const edgeId = to.params.edgeId as string;
          if (edgeId && !store.edgeIds.includes(edgeId)) {
            next({ name: 'flowchart' });
          } else {
            next();
          }
        },
        props: route => ({
          edgeId: route.params.edgeId,
        })
      }
    ]
  },
  {
    path: '/:notFound(.*)',
    name: 'not-found',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
