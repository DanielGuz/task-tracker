const meta = {
  authRequired: false,
  breadcrumb: [
    { name: 'Inicio', nameRouter: 'task-tracker.home' },
    { name: "Registro" },
    { name: "Tareas", nameRouter: 'track.tasks'  },
  ]
};

const tasksRoutes = () => {
  return [
    {
      path: 'tasks',
      name: 'track.tasks',
      component: () => import('@/views/track/tasks/List.vue'),
      meta
    },
    {
      path: 'tasks/edit/:id',
      name: 'track.tasks_edit',
      component: () => import('@/views/track/tasks/Edit.vue'),
      meta
    },
    {
      path: 'tasks/view/:id',
      name: 'track.tasks_view',
      component: () => import('@/views/track/tasks/View.vue'),
      meta
    },
  ];
};

export { tasksRoutes };