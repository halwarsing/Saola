<template>
  <base-loader
    v-if="isLoading"
    class="start-loader"
    color="#fff"
    text="Эконавигатор"
  />
  <div v-else>
    <mobile-layout v-if="isMobile" />
    <desktop-layout v-else />
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { Screen } from 'quasar'

import MobileLayout from 'src/layouts/MobileLayout.vue'
import DesktopLayout from 'src/layouts/DesktopLayout.vue'
import BaseLoader from 'src/components/base/BaseLoader.vue'
import { appKey } from 'src/injection-keys/app'
import { useStore } from 'src/stores/main'

const store = useStore()

store.init()

const isMobile = computed(() => {
  return Screen.lt.md
})

const isLoading = computed(() => {
  return store.$state.isLoading
})

const modules = computed(() => {
  return [{
  //   id: 'home',
  //   icon: 'fas fa-home',
  //   label: 'Главная'
  // }, {
    id: 'newsList',
    icon: 'fas fa-folder',
    label: 'Новости',
    visibility: ['header', 'footer']
  }, {
    id: 'eventsList',
    icon: 'fas fa-newspaper',
    label: 'Обзор мероприятий',
    visibility: ['header', 'footer']
  }, {
    id: 'lifehacksList',
    icon: 'fas fa-newspaper',
    label: 'Экологические лайфхаки',
    visibility: ['header', 'footer']
  }, {
    id: 'support',
    label: 'Поддержка',
    visibility: ['footer']
  }, {
    id: 'personalData',
    label: 'Политика обработки персональных данных',
    visibility: ['footer']
  // }, {
  //   id: 'profile',
  //   icon: 'fas fa-circle-user',
  //   label: 'Профиль'
  }]
})

provide(appKey, {
  isMobile: isMobile.value,
  modules: modules.value
})
</script>

<style scoped lang="scss">
.start-loader {
  background: linear-gradient(90deg, rgba(62, 80, 16, 0.5) 2.2%, rgba(85, 107, 26, 0.5) 18.67%, rgba(177, 221, 64, 0.5) 86.17%);
  color: #fff;
}
</style>
