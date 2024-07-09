import { Assessment, Group, Home } from '@mui/icons-material';

export const menu = () => {
  return [
    {
      path: '/dashboardView',
      title: 'Dashboard',
      icon: <Home />,
    },
    {
      title: 'Administración',
      permission: 'show-rent',
      group: [
        {
          path: '/inscriptionView',
          title: 'Inscripciones',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/roomView',
          title: 'Aulas',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/categoryView',
          title: 'Especialidades',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/subjectView',
          title: 'Materias',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/moduleView',
          title: 'Módulos',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/classesView',
          title: 'Clases',
          icon: <Home />,
          permission: 'show-halls',
        },
      ],
    },
    // {
    //   title: 'Capacitaciones',
    //   permission: 'show-rent',
    //   group: [
    //     {
    //       path: '/productsView',
    //       title: 'Talleres',
    //       icon: <Home />,
    //       permission: 'show-halls',
    //     },
    //     {
    //       path: '/salesView',
    //       title: 'Cursos',
    //       icon: <Home />,
    //       permission: 'show-halls',
    //     },
    //     {
    //       path: '/salesView',
    //       title: 'Charlas',
    //       icon: <Home />,
    //       permission: 'show-halls',
    //     },
    //     {
    //       path: '/salesView',
    //       title: 'Inscripciones',
    //       icon: <Home />,
    //       permission: 'show-halls',
    //     },
    //   ],
    // },
    {
      title: 'Administradores',
      permission: 'show-rent',
      group: [
        {
          path: '/branchView',
          title: 'Sucursales',
          icon: <Group />,
          permission: 'show-halls',
        },
        {
          path: '/staffView',
          title: 'Staff',
          icon: <Group />,
          permission: 'show-halls',
        },
        {
          path: '/roleView',
          title: 'Roles',
          icon: <Group />,
          permission: 'show-halls',
        },
        {
          path: '/PermissionView',
          title: 'Permisos',
          icon: <Group />,
          permission: 'show-halls',
        },
      ],
    },
    {
      title: 'Usuarios',
      permission: 'show-rent',
      group: [
        {
          path: '/teacherView',
          title: 'Docentes',
          icon: <Group />,
          permission: 'show-halls',
        },
        {
          path: '/studentView',
          title: 'Estudiantes',
          icon: <Group />,
          permission: 'show-halls',
        },
      ],
    },
    {
      title: 'Pagos',
      permission: 'show-rent',
      group: [
        {
          path: '/pagos',
          title: 'pagos',
          icon: <Group />,
          permission: 'show-halls',
        },
      ],
    },
    {
      title: 'Reportes',
      permission: 'show-rent',
      group: [
        {
          path: '/ReportView',
          title: 'Reportes',
          icon: <Assessment />,
          permission: 'show-halls',
        },
      ],
    },
  ];
};
