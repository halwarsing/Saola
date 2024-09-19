import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Главная',
      requiresAuth: false
    },
    component: () => import('pages/IndexPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Мой профиль',
      requiresAuth: true
    },
    component: () => import('pages/ProfilePage.vue')
  },
  {
    path: '/news',
    name: 'newsList',
    meta: {
      title: 'Новости',
      requiresAuth: false
    },
    component: () => import('pages/NewsListPage.vue')
  },
  {
    path: '/news/:id',
    name: 'newsItem',
    meta: {
      title: 'Новости',
      requiresAuth: false
    },
    component: () => import('pages/NewsItemPage.vue')
  },
  {
    path: '/events',
    name: 'eventsList',
    meta: {
      title: 'События',
      requiresAuth: false
    },
    component: () => import('pages/EventsListPage.vue')
  },
  {
    path: '/events/:id',
    name: 'eventsItem',
    meta: {
      title: 'События',
      requiresAuth: false
    },
    component: () => import('pages/EventsItemPage.vue')
  },
  {
    path: '/lifehacks',
    name: 'lifehacksList',
    meta: {
      title: 'Экологические лайфхаки',
      requiresAuth: false
    },
    component: () => import('pages/LifehacksListPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

export default routes
