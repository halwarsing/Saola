<template>
  <q-layout class="desktop-wrapper">
    <base-loader v-if="isLoading" />
    <div class="desktop-blink" />
    <div class="desktop-header">
      <div class="desktop-menu">
        <base-text
          v-for="module in headerModules"
          :key="module.id"
          :text="module.label"
          :level="2"
          color="#F5F5F5"
          capitalize
          clickable
        />
      </div>
      <div class="desktop-menu__side">
        <img
          v-if="isAuth"
          class="desktop-menu__profile"
          :src="ProfileIcon"
          @click="$router.push('/profile')"
        >
        <template v-else>
          <menu-button
            text="Регистрация"
            @click="openAuthModal(AuthMode.SIGN_UP)"
          />
          <menu-button
            text="Вход"
            @click="openAuthModal(AuthMode.SIGN_IN)"
          />
        </template>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="desktop-footer__separator" />
    <div class="desktop-footer">
      <div class="desktop-footer__menu">
        <base-text
          v-for="module in footerModules"
          :key="module.id"
          :text="module.label"
          :level="2"
          color="#F5F5F599"
          capitalize
          clickable
        />
      </div>
    </div>
    <auth-modal
      v-if="openedModal"
      :mode="openedModal"
      @changed-mode="openedModal = $event"
      @close="openedModal = undefined"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'

import { appKey } from 'src/injection-keys/app'
import { useStore } from 'src/stores/main'
import { AuthMode } from 'src/enums'
import BaseLoader from 'src/components/base/BaseLoader.vue'
import AuthModal from 'src/components/AuthModal.vue'
import BaseText from 'src/components/base/BaseText.vue'
import MenuButton from 'src/components/menu/MenuButton.vue'

import ProfileIcon from 'src/assets/icons/profile.svg'

const store = useStore()
const injected = inject(appKey)

const modules = computed(() => {
  return injected ? injected.modules : []
})

const headerModules = computed(() => {
  return modules.value.filter(item => item.visibility.includes('header'))
})

const footerModules = computed(() => {
  return modules.value.filter(item => item.visibility.includes('footer'))
})

const isLoading = ref(false)

const isAuth = computed(() => {
  return store.$state.isAuth
})

const openedModal = ref<AuthMode | undefined>()

const openAuthModal = (mode: AuthMode) => {
  openedModal.value = mode
}
</script>

<style lang="scss" scoped>
.desktop-blink {
  position: absolute;
  width: 607px;
  height: 289px;
  right: 0;
  top: 622px;
  background: #2B4431;
  filter: blur(200px);
}

.desktop-wrapper {
  width: clamp(1260px, 80vw, 1600px);
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
}

.desktop-header {
  border-radius: 20px;
  border: 1px solid #ECFBC61A;
  background-color: #B1DD400D;
  justify-content: space-between;
  padding: 15px 85px;
  display: flex;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 60px;

  &__profile {
    cursor: pointer;
  }

  &__side {
    display: flex;
    align-items: center;
    gap: 55px;
  }
}

.desktop-footer {
  height: 80px;

  &__menu {
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: clamp(20px, 3vw, 60px);
  }

  &__separator {
    width: 100%;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(90deg, #3E5010 2.2%, #556B1A 18.67%, #B1DD40 86.17%);
  }
}
</style>
