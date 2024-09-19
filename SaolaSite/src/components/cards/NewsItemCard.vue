<template>
  <q-img
    class="news-card"
    :src="NewsCover"
    fit="scale-down"
    @click="$router.push(`/news/${info.id}`)"
  >
    <base-header :level="2" :text="info.title" />
  </q-img>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { NewsInfo } from 'src/types'
import BaseHeader from 'src/components/base/BaseHeader.vue'

import NewsCover from 'src/assets/imgs/news_cover.png'

interface Props {
  info: NewsInfo
}
defineProps<Props>()

</script>

<style lang="scss" scoped>
.news-card {
  width: 300px;
  height: 400px;
  border-radius: 15px;
  border: 1px solid #9CB49D94;
  cursor: pointer;

  :deep(.base-header) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
