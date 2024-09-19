<template>
  <q-img
    class="hobby-card"
    :src="info.cover"
    fit="scale-down"
    @click="$router.push(`/hobbies/${info.id}`)"
  >
    <q-chip
      square
      flat
      class="q-ma-none hobby-card__time"
      color="primary"
      icon="far fa-clock"
      text-color="white"
    >
      {{ info.duration }} минут
    </q-chip>
    <div class="hobby-card__content">
      <div class="hobby-card__label">{{ info.name }}</div>
      <div class="hobby-card__footer">
        <div
          class="hobby-card__tags"
          v-if="Array.isArray(info.tags) && info.tags"
        >
          <q-chip
            v-for="(tag, index) in info.tags"
            :key="index"
            square
            class="q-ma-none"
            color="primary"
            text-color="white"
          >
            {{ tag }}
          </q-chip>
        </div>
      </div>
      <div />
    </div>
  </q-img>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { HobbyInfo } from 'src/types'

interface Props {
  info: HobbyInfo
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.hobby-card {
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  width: 250px;
  min-width: 250px;
  height: 180px;
  position: relative;

  &__time {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  &__content {
    background: rgba(0, 0, 0, 0.47);
    width: 100%;
    height: 100%;
    display: flex;
    position: unset;
    flex-direction: column;
    justify-content: space-between;
  }

  &__label {
    font-size: 16px;
    font-weight: 600;
    color: aliceblue;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.47);
    position: absolute;
    padding: 8px 16px;
    border-radius: 8px 8px 0 0;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__author {
    border-radius: 8px;
    font-weight: 700;
    color: aliceblue;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__rating {
    border-radius: 8px;
    font-weight: 700;
    color: yellow;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
}
</style>
