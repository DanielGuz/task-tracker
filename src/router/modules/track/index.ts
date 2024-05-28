
import { tasksRoutes } from './tasks';

const trackRoutes = () => {
  return {
    path: '/track',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      authRequired: true,
      breadcrumb: [
        { name: 'Inicio', nameRouter: 'task-tracker.home' },
        { name: 'Registro' },
      ],
    },
    children: [].concat(
      tasksRoutes(),
    ),
  };
};
export { trackRoutes };