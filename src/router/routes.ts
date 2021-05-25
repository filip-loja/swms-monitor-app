import { RouteConfig } from 'vue-router'
import store from 'src/store/index'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue'),
        beforeEnter (to, from, next) {
          if (!store.state.loggedIn) {
            next({ name: 'logIn' })
          } else {
            next()
          }
        }
      },
      {
        path: '/login',
        name: 'logIn',
        component: () => import('pages/LogIn.vue'),
        beforeEnter (to, from, next) {
          if (store.state.loggedIn) {
            next({ name: 'home' })
          } else {
            next()
          }
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
