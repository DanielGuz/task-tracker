import { parametricRoutes } from "@/router/modules/parametric";
import { trackRoutes } from "@/router/modules/track";

import Login from '@/views/Login.vue'
import Error404 from '@/views/404.vue'
import Dashboard from '@/views/Dashboard.vue'

function getCoreRoutes() {
  return [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        isPublicPath: true,
        withoutRolView: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404_Error',
      component: Error404,
      meta: {
        withoutRolView: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        isPublicPath: true,
        withoutRolView: true
      }
    },
    {
      name: 'task-tracker.home',
      path: '/task-tracker/home',
      component: Dashboard,
      meta: {
        withoutRolView: true,
        breadcrumb: [
          { name: 'Inicio', nameRouter: 'task-tracker.home' },
          { name: 'Panel Principal' }
        ]
      }
    },
    parametricRoutes(),
    trackRoutes(),
  ]
}

export { getCoreRoutes }
