export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'auth',
    icon: 'user',
    path: '/auth',
    routes: [
      {
        name:'auth-user',
        icon:'simile',
        path:'/auth/user',
        component: './auth/user'
      },
      {
        name: 'auth-role',
        icon: 'smile',
        path: '/auth/role',
        component: './auth/role',
      },
      {
        name: 'auth-resource',
        icon: 'smile',
        path: '/auth/resource',
        component: './auth/resource',
      },
    ],

  },
  {
    name: 'university',
    icon: 'user',
    path: '/university',
    routes: [
      {
        name:'college',
        icon:'simile',
        path:'/university/college',
        component: './university/college'
      },
      {
        name: 'student',
        icon: 'smile',
        path: '/university/student',
        component: './university/student',
      },
    ],

  },
  {
    name: 'account',
    icon: 'smile',
    path: '/account',
    routes: [

      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    name: 'apartment',
    icon: 'smile',
    path: '/apartment',
    routes: [

      {
        name: 'admin',
        icon: 'smile',
        path: '/apartment/admin',
        routes: [

          {
            name: 'campus',
            icon: 'smile',
            path: '/apartment/admin/campus',
            component: './apartment/admin/campus',
          },{
            name: 'campusGroup',
            icon: 'smile',
            path: '/apartment/admin/campusGroup',
            component: './apartment/admin/campusGroup',
          },
          {
            name: 'building',
            icon: 'smile',
            path: '/apartment/admin/building',
            component: './apartment/admin/building',
          },{
            name: 'dormitory',
            icon: 'smile',
            path: '/apartment/admin/dormitory',
            component: './apartment/admin/dormitory',
          },
        ],
      },
      {
        name: 'my',
        icon: 'smile',
        path: '/apartment/my',
        component: './apartment/my',
      },
      {
        name: 'order',
        icon: 'smile',
        path: '/apartment/order',
        component: './apartment/order',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
