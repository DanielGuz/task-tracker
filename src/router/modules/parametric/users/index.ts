const meta = {
  authRequired: false,
  breadcrumb: [
    { name: 'Inicio', nameRouter: 'task-tracker.home' },
    { name: "Paramétricas" },
    { name: "Usuarios", nameRouter: 'parametric.users'  },
  ]
};

const usersRoutes = () => {
  return [
    {
      path: 'users',
      name: 'parametric.users',
      component: () => import('@/views/parametric/users/List.vue'),
      meta
    },
    {
      path: 'users/edit/:id',
      name: 'parametric.users_edit',
      component: () => import('@/views/parametric/users/Edit.vue'),
      meta
    },
    {
      path: 'users/view/:id',
      name: 'parametric.users_view',
      component: () => import('@/views/parametric/users/View.vue'),
      meta
    },
  ];
};

export { usersRoutes };