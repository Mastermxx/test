import { createRouter, createWebHistory } from 'vue-router'
import Shipments from '../views/ShipmentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shipments',
      component: Shipments
    },
    {
      path: '/detail/:shipmentId',
      name: 'ShipmentDetail',
      component: () => import('../views/ShipmentDetailView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/LiveMapView.vue')
    }
  ]
})

export default router; // Export the router instance
