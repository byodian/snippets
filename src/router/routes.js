import Layout from '@layouts/index.vue'

const routes = [
  {
    path: '/404',
    component: () => import('@views/404.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@views/chart.vue'),
        name: 'home',
        meta: {
          name: 'Chart'
        }
      },
      {
        path: 'cesium',
        component: () => import('@/views/cesium.vue'),
        name: 'cesium',
        meta: {
          name: 'Cesium'
        }
      },
      {
        path: 'search',
        component: () => import('@views/search.vue'),
        name: 'search',
        meta: {
          name: 'Search'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default routes
