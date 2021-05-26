import { RouteConfig } from 'vue-router'
import store from 'src/store/index'

const closeDrawerGuard = (to: any, from: any, next: any) => {
  void store.dispatch('closeDrawer')
  next()
}

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
            store.commit('CLEAR_ITEMS')
            store.commit('SET_NEXT_TOKEN', undefined)
            next()
          }
        },
        children: [
          { path: '', name: 'viewTable', component: () => import('pages/PageTableView.vue'), beforeEnter: closeDrawerGuard },
          { path: 'tile', name: 'viewTile', component: () => import('pages/PageTileView.vue'), beforeEnter: closeDrawerGuard },
          { path: 'map', name: 'viewMap', component: () => import('pages/PageMapView.vue'), beforeEnter: closeDrawerGuard }
        ]
      },
      {
        path: 'alerts',
        name: 'pageAlerts',
        component: () => import('pages/PageAlerts.vue'),
        beforeEnter: closeDrawerGuard
      },
      {
        path: 'reports',
        name: 'pageReports',
        component: () => import('pages/PageReports.vue'),
        beforeEnter: closeDrawerGuard
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
