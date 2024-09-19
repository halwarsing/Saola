<template>
  <q-img
    class="event-card"
    :src="EventCover"
    fit="scale-down"
    @click="$router.push(`/events/${info.id}`)"
  >
    <base-header :level="2" :text="info.title" />
  </q-img>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { EventInfo } from 'src/types'
import BaseHeader from 'src/components/base/BaseHeader.vue'

import EventCover from 'src/assets/imgs/event_cover.png'

interface Props {
  info: EventInfo
}
defineProps<Props>()

</script>

<style lang="scss" scoped>
.event-card {
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
