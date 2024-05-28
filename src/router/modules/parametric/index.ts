
import { usersRoutes } from './users';

const parametricRoutes = () => {
  return {
    path: '/parametric',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      authRequired: true,
      breadcrumb: [
        { name: 'Inicio', nameRouter: 'task-tracker.home' },
        { name: 'Paramétricas' },
      ],
    },
    children: [].concat(
      usersRoutes(),
    ),
  };
};
export { parametricRoutes };