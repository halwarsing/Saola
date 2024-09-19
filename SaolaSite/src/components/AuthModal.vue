<template>
  <q-dialog
    :model-value="true"
    @update:model-value="emit('close')"
  >
    <q-card class="auth-modal">
      <q-card-section class="row">
        <base-header
          :text="title"
          :level="2"
        />
        <q-space />
        <q-btn icon="fas fa-times" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <template v-if="props.mode === AuthMode.SIGN_IN">
          <q-form
            class="column q-gutter-lg"
            ref="loginFormRef"
            no-error-focus
          >
            <q-input
              outlined
              type="email"
              size="lg"
              v-model="fields.email"
              :rules="validationRules.email"
              label="Email"
              lazy-rules
            />
            <q-input
              v-model="fields.password"
              outlined
              size="lg"
              :type="isShowPassword ? 'password' : 'text'"
              :rules="validationRules.signinPassword"
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
            <div>
              <q-btn
                label="Войти"
                color="primary"
                size="xl"
                class="full-width q-mt-md"
                no-caps
                :disable="!isSuccessLoginForm"
                submit
                @click="signIn"
              />
              <q-btn
                no-caps
                flat
                size="lg"
                class="full-width q-mt-sm"
                label="Зарегистрироваться"
                @click="emit('changedMode', AuthMode.SIGN_UP)"
              />
            </div>
          </q-form>
        </template>
        <template v-else-if="props.mode === AuthMode.SIGN_UP">
          <q-form
            class="column q-gutter-lg"
            ref="registerFormRef"
            no-error-focus
          >
            <q-input
              outlined
              size="lg"
              type="text"
              v-model="fields.username"
              label="Имя пользователя *"
              :rules="validationRules.username"
              lazy-rules
            />
            <q-input
              outlined
              size="lg"
              type="email"
              v-model="fields.email"
              :rules="validationRules.email"
              label="Email *"
              lazy-rules
            />
            <q-input
              v-model="fields.password"
              outlined
              size="lg"
              :rules="validationRules.signupPassword"
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
              toggle-color="secondary"
              size="lg"
              color="white"
              text-color="secondary"
              :options="[
                { label: 'Организация', value: true },
                { label: 'Пользователь', value: false }
              ]"
            />
            <div>
              <q-btn
                label="Зарегистрироваться"
                color="primary"
                class="full-width q-mt-md"
                :disable="!isSuccessRegisterForm"
                size="xl"
                no-caps
                submit
                @click="signUp"
              />
              <q-btn
                no-caps
                flat
                size="lg"
                class="full-width q-mt-sm"
                label="Войти"
                @click="emit('changedMode', AuthMode.SIGN_IN)"
              />
            </div>
          </q-form>
        </template>
        <base-loader v-if="isLoading" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, watch } from 'vue'
import { QForm } from 'quasar'

import { useStore } from 'src/stores/main'
import { AuthMode } from 'src/enums'
import { showError } from 'src/helpers'
import BaseLoader from 'src/components/base/BaseLoader.vue'
import BaseHeader from 'src/components/base/BaseHeader.vue'

interface Props {
  mode: AuthMode
}
const props = defineProps<Props>()

type Emits = {
  (e: 'close'): void
  (e: 'changedMode', mode: AuthMode): void
}
const emit = defineEmits<Emits>()

const store = useStore()
const isShowPassword = ref(true)
const isLoading = ref(false)
const loginFormRef = ref<InstanceType<typeof QForm> | null>(null)
const registerFormRef = ref<InstanceType<typeof QForm> | null>(null)
const isSuccessLoginForm = ref(false)
const isSuccessRegisterForm = ref(false)
const fields = ref({
  isOrganisation: false,
  email: '',
  password: '',
  username: ''
})

const title = computed(() => {
  switch (props.mode) {
    case AuthMode.SIGN_IN:
      return 'Вход'
    case AuthMode.SIGN_UP:
      return 'Регистрация'
    case AuthMode.RESET_PASSWORD:
      return 'Сброс пароля'
  }
})

const isValidEmail = (value: string) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(value) || 'Введен неккоректный Email'
}

const validationRules = {
  email: [
    (val: string | null) => !!val || 'Не указан Email', isValidEmail
  ],
  signinPassword: [
    (val: string | null) => !!val || 'Не указан пароль'
  ],
  signupPassword: [
    (val: string | null) => (val && val.length >= 8 && val.length <= 30) || 'Пароль должен быть от 8 до 30 символов'
  ],
  username: [
    (val: string | null) => (val && val.length > 3) || 'Имя пользователя должно быть длиннее 3 символов',
    (val: string | null) => (val && val.length < 30) || 'Имя пользователя должно быть короче 30 символов',
    (val: string | null) => (val && !(/[^a-z]/i.test(val))) || 'Должны быть только латинские символы без пробела'
  ]
}

watch(() => fields.value, () => {
  if (props.mode === AuthMode.SIGN_IN) {
    loginFormRef.value?.validate().then(success => {
      isSuccessLoginForm.value = success
    })
  } else if (props.mode === AuthMode.SIGN_UP) {
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
.auth-modal {
  width: 500px;
}
</style>
