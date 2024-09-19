<template>
  <div class="navigator">
    <div class="navigator__info">
      <div class="navigator__title">
        <span class="navigator__title-left">Эко</span>
        <span class="navigator__title-right">навигатор</span>
      </div>
      <base-header
        text="Здесь вы можете найти экологический проект"
        :level="2"
      />
      <div class="row items-center q-gutter-sm">
        <base-header
          text="Есть вопросы?"
          :level="2"
        />
        <img :src="NavigatorChatIcon" >
      </div>
    </div>
    <div class="navigator__search">
      <div class="row q-gutter-md">
        <q-input
          v-model="fields.selectedDate"
          class="col"
          label="Выбор даты"
          placeholder="Все даты"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="fas fa-calendar" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="fields.selectedDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Закрыть" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="fields.selectedTime"
          class="col"
          :options="[]"
          label="Выбор времени"
          placeholder="Весь день"
        />
      </div>
      <div class="row q-gutter-md">
        <q-select
          v-model="fields.selectedSubway"
          class="col"
          :options="[]"
          label="Выберите метро"
        />
        <q-select
          v-model="fields.selectedDistrict"
          class="col"
          :options="[]"
          label="Выберите район"
        />
      </div>
      <div class="row justify-center full-width q-mt-lg">
        <button class="navigator__button">
          Найти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseHeader from 'src/components/base/BaseHeader.vue'

import NavigatorChatIcon from 'src/assets/icons/navigator_chat.svg'

const fields = ref({
  selectedTime: null,
  selectedDate: null,
  selectedSubway: null,
  selectedDistrict: null
})
</script>

<style scoped lang="scss">
.navigator {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__search {
    width: 600px;
    height: fit-content;
    padding: 30px 60px;
    background: linear-gradient(90deg, rgba(62, 80, 16, 0.5) 2.2%, rgba(85, 107, 26, 0.5) 18.67%, rgba(177, 221, 64, 0.5) 86.17%);
  }

  &__button {
    width: 140px;
    padding: 15px 30px;
    outline: none;
    border: none;
    background-color: #A9C16A;
    box-shadow: 0px 4px 4px 0px #FFFFFF26 inset;
    color: #FFFFFF;
    font-size: 20px;
    font-family: 'Geologica-Regular';
  }

  &__title {
    font-size: 96px;
    font-family: 'BebasNeue';

    &-left {
      color: #9DD322;
    }

    &-right {
      color: #9FA988;
    }
  }
}
</style>
