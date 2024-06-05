import { Assessment, Group, Home } from '@mui/icons-material';

export const menu = () => {
  return [
    {
      path: '/dashboardView',
      title: 'Dashboard',
      icon: <Home />,
    },
    {
      title: 'Gestion de proyectos',
      permission: 'show-rent',
      group: [
        {
          path: '/seasonView',
          title: 'Temporada',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/requirementView',
          title: 'Requisitos en avance',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/inscriptionView',
          title: 'Inscripciones',
          icon: <Home />,
          permission: 'show-halls',
        },
        {
          path: '/projectView',
          title: 'Proyectos',
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
          path: '/parallelView',
          title: 'Paralelos',
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
