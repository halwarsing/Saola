<template>
  <q-page class="profile-page">
    <base-loader v-if="isLoading" />
    <div class="profile-page__layout">
      <div class="profile-page__photo">
        <div
          v-if="profile.avatar"
          :src="profile.avatar"
        />
        <q-icon name="fas fa-circle-user" size="260px" />
        <button class="profile-page__button">
          Изменить фото
        </button>
        <button
          class="profile-page__button error"
          @click="signOut"
        >
          Выйти из системы
        </button>
      </div>
      <div class="profile-page__info">
        <template v-if="profile.isModerator">

        </template>
        <template v-else-if="profile.isOrganisation">
          <div class="profile-page__company">
            <div class="row items-center q-gutter-sm">
              <div>{{ profile.companyName }}</div>
              <q-icon
                v-if="profile.isVerified"
                name="fas fa-check"
                color="primary"
              />
            </div>
            <div
              v-if="profile.isVerified"
              class="profile-page__company-verified"
            >
              Компания прошла верификацию
            </div>
          </div>
          <q-tabs
            v-model="organisationActiveTab"
            no-caps
            outside-arrows
            mobile-arrows
            align="left"
            content-class="profile-page__tabbar"
            active-color="primary"
          >
            <q-tab name="info" label="Информация" />
            <q-tab name="data" label="Публикации" />
            <q-tab name="statistic" label="Статистика" />
          </q-tabs>
          <div class="profile-page__block q-pa-md">
            <template v-if="organisationActiveTab === 'info'">
              <div class="profile-page__table">
                <div class="profile-page__table-cell">
                  E-mail:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.email }}
                </div>
                <div class="profile-page__table-cell">
                  Телефон:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.phone ? profile.phone : 'Не указано' }}
                </div>
                <div class="profile-page__table-cell">
                  Описание сферы деятельности:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.interesting ? profile.interesting : 'Не указано' }}
                </div>
                <div class="profile-page__table-cell">
                  Краткая информация:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.bio ? profile.bio : 'Не указано' }}
                </div>
              </div>
              <div class="row q-gutter-lg q-mt-none">
                <button class="profile-page__button">
                  Изменить данные
                </button>
                <!-- <button class="profile-page__button">
                  Изменить пароль
                </button> -->
              </div>
            </template>
            <template v-else-if="organisationActiveTab === 'data'">
              <div class="profile-page__table">
                <div class="profile-page__table-cell">
                  Находятся на модерации:
                </div>
                <div class="profile-page__table-cell">
                  <q-chip
                    outline
                    size="lg"
                    color="warning"
                    icon="fas fa-newspaper"
                  >
                    Экологический велопробег
                  </q-chip>
                </div>
                <div class="profile-page__table-cell">
                  Не прошло модерацию:
                </div>
                <div class="profile-page__table-cell">
                  <q-chip
                    outline
                    color="negative"
                    size="lg"
                    icon="fas fa-calendar-day"
                  >
                    Субботник на Воробъевых горах
                  </q-chip>
                  <q-chip
                    outline
                    color="negative"
                    size="lg"
                    icon="fas fa-newspaper"
                  >
                    Субботник на Чистых прудах
                  </q-chip>
                </div>
                <div class="profile-page__table-cell">
                  Опубликованные:
                </div>
                <div class="profile-page__table-cell">
                  <q-chip
                    outline
                    color="positive"
                    size="lg"
                    icon="fas fa-calendar-day"
                  >
                    Посадка деревьев
                  </q-chip>
                  <q-chip
                    outline
                    color="positive"
                    size="lg"
                    icon="fas fa-calendar-day"
                  >
                    Волонтерский сбор
                  </q-chip>
                </div>
                <div class="profile-page__table-cell">
                  В архиве:
                </div>
                <div class="profile-page__table-cell">
                  <q-chip
                    outline
                    size="lg"
                    color="grey"
                    icon="fas fa-newspaper"
                  >
                    Москва сажает деревья
                  </q-chip>
                  <q-chip
                    outline
                    color="grey"
                    size="lg"
                    icon="fas fa-newspaper"
                  >
                    Город будущего - Москва
                  </q-chip>
                </div>
              </div>
            </template>
            <template v-else-if="organisationActiveTab === 'statistic'">
              <div class="profile-page__block">
                <div class="profile-page__block-title row items-center q-gutter-sm">
                  <q-icon name="fas fa-users" color="primary" />
                  <div>Охват по мероприятиям</div>
                </div>
                <div>Ваши мероприятии посетили 1000 человек</div>
              </div>
              <div class="profile-page__block">
                <div class="profile-page__block-title row items-center q-gutter-sm">
                  <q-icon name="fas fa-users" color="primary" />
                  <div>Охват по новостям</div>
                </div>
                <div>Ваши новости прочитали 8000 человек</div>
              </div>
              <div class="profile-page__block">
                <div class="profile-page__block-title row items-center q-gutter-sm">
                  <q-icon name="fas fa-calendar-day" color="primary" />
                  <div>Мероприятия</div>
                </div>
                <div>Вы организовали 7 мероприятий</div>
              </div>
              <div class="profile-page__block">
                <div class="profile-page__block-title row items-center q-gutter-sm">
                  <q-icon name="fas fa-newspaper" color="primary" />
                  <div>Новости</div>
                </div>
                <div>Вы опубликовали 15 новостей</div>
              </div>
            </template>
          </div>
          <div class="row q-gutter-lg q-mt-none">
            <button class="profile-page__outline-button">
              Добавить мероприятие
            </button>
            <button class="profile-page__outline-button">
              Добавить новость
            </button>
          </div>
        </template>
        <template v-else>
          <div class="profile-page__fio">
            {{ fio }}
          </div>
          <div class="column q-gutter-xl q-mt-none">
            <div class="profile-page__block">
              <div class="profile-page__block-title row items-center q-gutter-sm">
                <q-icon name="fas fa-table" color="primary" />
                <div>Персональная информация</div>
              </div>
              <div class="profile-page__table">
                <div class="profile-page__table-cell">
                  E-mail:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.email }}
                </div>
                <div class="profile-page__table-cell">
                  Телефон:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.phone ? profile.phone : 'Не указано' }}
                </div>
                <div class="profile-page__table-cell">
                  Интересы:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.interesting ? profile.interesting : 'Не указано' }}
                </div>
                <div class="profile-page__table-cell">
                  Краткая информация:
                </div>
                <div class="profile-page__table-cell">
                  {{ profile.bio ? profile.bio : 'Не указано' }}
                </div>
              </div>
              <div class="row q-gutter-lg q-mt-none">
                <button class="profile-page__button">
                  Изменить данные
                </button>
                <!-- <button class="profile-page__button">
                  Изменить пароль
                </button> -->
              </div>
            </div>
            <div class="profile-page__block">
              <div class="profile-page__block-title row items-center q-gutter-sm">
                <q-icon name="fas fa-heart" color="primary" />
                <div>Избранное</div>
              </div>
              <div>У Вас в избранном 0 мероприятий</div>
            </div>
            <div class="profile-page__block">
              <div class="profile-page__block-title row items-center q-gutter-sm">
                <q-icon name="fas fa-chart-line" color="primary" />
                <div>Статистика участия</div>
              </div>
              <div>Вы посетили 0 мероприятий</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import BaseLoader from 'src/components/base/BaseLoader.vue'
import { useStore } from 'src/stores/main'
import { sign } from 'crypto'

const isLoading = ref(false)
const store = useStore()

const profile = computed(() => {
  return store.$state.profile
})

const organisationActiveTab = ref('info')

const fio = computed(() => {
  if (profile.value.firstName && profile.value.lastName) {
    return `${profile.value.lastName} ${profile.value.firstName}`
  }
  return profile.value.username
})

const signOut = async () => {
  isLoading.value = true
  await store.signOut()
  isLoading.value = false
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding-top: 30px;

  :deep(.q-tab__label) {
    font-size: 24px;
  }

  &__button,
  &__outline-button {
    padding: 8px 30px;
    border-radius: 10px;
    font-size: 20px;
    outline: none;
    border: none;
    cursor: pointer;
  }

  &__button {
    background-color: #D9D9D9;
    color: #0E0E109E;

    &.error {
      color: $negative;
    }
  }

  &__outline-button {
    background-color: #2B4431;
    color: #bbb;
    border-radius: 20px;
  }

  &__layout {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    padding: 20px;
    gap: 30px;
    border-radius: 20px;
  }

  &__photo {
    width: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  &__info {
    width: 100%;
  }

  &__block {
    font-size: 24px;
    gap: 16px;
    display: flex;
    flex-direction: column;
    color: #bbb;

    &-title {
      color: #fff;
      font-weight: 500;
    }
  }

  &__table {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 10px;
    font-weight: 400;
  }

  &__fio,
  &__company {
    font-family: 'Geologica-Regular';
    font-size: 32px;
    font-weight: 400;
    text-align: center;
    color: #fff;
  }

  &__company-verified {
    color: #bbb;
    font-size: 24px;
  }
}
</style>
