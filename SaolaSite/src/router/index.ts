import { route } from 'quasar/wrappers'
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized
} from 'vue-router'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useStore } from 'src/stores/main'

import routes from './routes'

export default route(() => {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(process.env.VUE_ROUTER_BASE)
  })

  const setTitle = (to: RouteLocationNormalized) => {
    if (typeof to.meta.title === 'string') {
      document.title = to.meta.title
    } else if (typeof to.meta.title === 'function') {
      document.title = to.meta.title(String(to.params.id))
    }
  }

  Router.beforeEach((to, from, next) => {
    const store = useStore()
    const auth = getAuth()
    if (to.matched.some(record => record.meta.requiresAuth)) {
      onAuthStateChanged(auth, user => {
        if (!user) {
          store.$state.isAuth = false
          store.$state.isLoading = false
        } else {
          store.setProfile(user).then(() => {
            store.$state.isLoading = false
          })
          setTitle(to)
          next()
        }
      })
    } else {
      onAuthStateChanged(auth, user => {
        if (user) {
          store.setProfile(user).then(() => {
            store.$state.isLoading = false
          })
          setTitle(to)
          next()
        } else {
          setTitle(to)
          store.$state.isLoading = false
          next()
        }
      })
    }
  })

  return Router
})
