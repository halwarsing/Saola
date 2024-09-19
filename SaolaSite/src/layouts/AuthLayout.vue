<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-card class="app-auth q-pa-md absolute-center">
        <template v-if="authMode === AuthMode.SIGN_IN">
          <div class="text-h6 text-center">Вход</div>
          <q-form
            class="q-mt-md app-auth__list"
            ref="loginFormRef"
            no-error-focus
          >
            <q-input
              outlined
              type="email"
              v-model="fields.email"
              :rules="validationRules.email"
              label="Email"
              lazy-rules
            />
            <q-input
              v-model="fields.password"
              outlined
              :type="isShowPassword ? 'password' : 'text'"
              :rules="validationRules.password"
              lazy-rules
              label="Пароль"
            >
              <template v-slot:append>
                <q-icon
                  :name="isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'"
                  class="cursor-pointer"
                  size="xs"
                  :title="isShowPassword ? 'Показать пароль' : 'Скрыть пароль'"
                  @click="isShowPassword = !isShowPassword"
                />
              </template>
            </q-input>
            <q-btn
              label="Войти"
              color="primary"
              size="lg"
              class="full-width q-mt-md"
              no-caps
              :disable="!isSuccessLoginForm"
              submit
              @click="signIn"
            />
            <q-btn
              no-caps
              flat
              class="full-width"
              label="Зарегистрироваться"
              @click="authMode = AuthMode.SIGN_UP"
            />
          </q-form>
        </template>
        <template v-else>
          <div class="text-h6 text-center">Регистрация</div>
          <q-form
            class="q-mt-md app-auth__list"
            ref="registerFormRef"
            no-error-focus
          >
            <q-input
              outlined
              type="text"
              v-model="fields.username"
              label="Имя пользователя *"
              :rules="validationRules.username"
              lazy-rules
            />
            <q-input
              outlined
              type="email"
              v-model="fields.email"
              :rules="validationRules.email"
              label="Email *"
              lazy-rules
            />
            <q-input
              v-model="fields.password"
              outlined
              :rules="validationRules.password"
              :type="isShowPassword ? 'password' : 'text'"
              lazy-rules
              label="Пароль *"
            >
              <template v-slot:append>
                <q-icon
                  :name="isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'"
                  class="cursor-pointer"
                  size="xs"
                  :title="isShowPassword ? 'Показать пароль' : 'Скрыть пароль'"
                  @click="isShowPassword = !isShowPassword"
                />
              </template>
            </q-input>
            <q-btn-toggle
              v-model="fields.isOrganisation"
              no-caps
              rounded
              unelevated
              spread
              class="app-auth__toggle"
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Организация', value: true },
                { label: 'Пользователь', value: false }
              ]"
            />
            <q-btn
              label="Зарегистрироваться"
              color="primary"
              class="full-width q-mt-md"
              :disable="!isSuccessRegisterForm"
              size="lg"
              no-caps
              submit
              @click="signUp"
            />
            <q-btn
              no-caps
              flat
              class="full-width"
              label="Войти"
              @click="authMode = AuthMode.SIGN_IN"
            />
          </q-form>
        </template>
        <base-loader v-if="isLoading" />
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { QForm } from 'quasar'

import { useStore } from 'src/stores/main'
import { AuthMode } from 'src/enums'
import { showError } from 'src/helpers'
import BaseLoader from 'src/components/base/BaseLoader.vue'

const store = useStore()
const isShowPassword = ref(true)
const isLoading = ref(false)
const loginFormRef = ref<InstanceType<typeof QForm> | null>(null)
const registerFormRef = ref<InstanceType<typeof QForm> | null>(null)
const isSuccessLoginForm = ref(false)
const isSuccessRegisterForm = ref(false)
const authMode = ref(AuthMode.SIGN_IN)
const fields = ref({
  isOrganisation: false,
  email: '',
  password: '',
  username: ''
})

const isValidEmail = (value: string) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(value) || 'Введен неккоректный Email'
}

const validationRules = {
  email: [
    (val: string | null) => !!val || 'Не указан Email', isValidEmail
  ],
  password: [
    (val: string | null) => (val && val.length >= 8 && val.length <= 30) || 'Пароль должен быть от 8 до 30 символов'
  ],
  username: [
    (val: string | null) => (val && val.length > 3) || 'Имя пользователя должно быть длиннее 3 символов',
    (val: string | null) => (val && val.length < 30) || 'Имя пользователя должно быть короче 30 символов',
    (val: string | null) => (val && !(/[^a-z]/i.test(val))) || 'Должны быть только латинские символы без пробела'
  ]
}

watch(() => fields.value, () => {
  if (authMode.value === AuthMode.SIGN_IN) {
    loginFormRef.value?.validate().then(success => {
      isSuccessLoginForm.value = success
    })
  } else if (authMode.value === AuthMode.SIGN_UP) {
    registerFormRef.value?.validate().then(success => {
      isSuccessRegisterForm.value = success
    })
  }
}, { deep: true })

const signIn = async () => {
  if (fields.value.email && fields.value.password) {
    isLoading.value = true
    await store.signIn(fields.value.email, fields.value.password)
    isLoading.value = false
  } else {
    showError('Не заполнены все обязательные поля')
  }
}

const signUp = async () => {
  if (fields.value.username && fields.value.email && fields.value.password) {
    isLoading.value = true
    await store.signUp({
      username: fields.value.username,
      isOrganisation: fields.value.isOrganisation,
      email: fields.value.email,
      password: fields.value.password
    })
    isLoading.value = false
  } else {
    showError('Не заполнены все обязательные поля')
  }
}
</script>

<style lang="scss" scoped>
.app-auth {
  width: clamp(300px, 80vw, 800px);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__toggle {
    border: 1px solid var(--q-primary);
  }
}
</style>
