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
    access: 'canAdmin',
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
    access: 'canAdmin',
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
        access: 'canAdmin',
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
        access: 'canOnlyStudent',
        component: './apartment/my',
      },
      {
        name: 'order',
        icon: 'smile',
        access: 'canOnlyStudent',
        path: '/apartment/order',
        component: './apartment/order',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
