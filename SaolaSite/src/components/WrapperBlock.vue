<template>
  <div class="wrapper-block">
    <div class="wrapper-block__row">
      <div class="row q-gutter-md">
        <base-header
          :text="blockTitle"
          :level="2"
        />
        <img :src="ThreeArrowsIcon" >
      </div>
    </div>
    <div v-if="!filteredItems.length" class="wrapper-block__empty">
      <base-info />
    </div>
    <template v-else-if="cardComponent">
      <div class="wrapper-block__wrapper">
        <component
          v-for="(item) in filteredItems"
          :key="item.id"
          :is="cardComponent"
          :info="item"
        />
      </div>
      <div
        class="wrapper-block__action"
        @click="emit('showAll')"
      >
        Показать все
        <img :src="SingleArrowIcon" >
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults, computed } from 'vue'

import { LifehackInfo, NewsInfo, EventInfo } from 'src/types'
import { InfoBlockType } from 'src/enums'
import LifehackCard from 'src/components/cards/LifehackCard.vue'
import NewsItemCard from 'src/components/cards/NewsItemCard.vue'
import EventsItemCard from 'src/components/cards/EventsItemCard.vue'
import BaseHeader from 'src/components/base/BaseHeader.vue'
import BaseInfo from 'src/components/base/BaseInfo.vue'

import SingleArrowIcon from 'src/assets/icons/single_arrow.svg'
import ThreeArrowsIcon from 'src/assets/icons/three_arrows.svg'

interface Props {
  items: NewsInfo[] | EventInfo[] | LifehackInfo[]
  maxItems?: number
  type?: InfoBlockType
  blockTitle: string
}
const props = withDefaults(defineProps<Props>(), {
  maxItems: 3
})

const cardComponent = computed(() => {
  switch (props.type) {
    case InfoBlockType.NEWS:
      return NewsItemCard
    case InfoBlockType.EVENT:
      return EventsItemCard
    case InfoBlockType.LIFEHACK:
      return LifehackCard
  }
  return undefined
})

type Emits = {
  (e: 'showAll'): void
}
const emit = defineEmits<Emits>()

const filteredItems = computed(() => {
  return props.items
})
</script>

<style scoped lang="scss">
.wrapper-block {
  margin: 40px 0;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 10px;
  }

  &__action {
    color: #FFFFFF;
    cursor: pointer;
    min-width: 86px;
    display: flex;
    align-items: center;
    margin-top: 22px;
    gap: 8px;
  }

  &__wrapper {
    display: flex;
    gap: 52px;
    flex-wrap: nowrap;
    margin-top: 40px;
  }

  &__empty {
    height: 200px;
    position: relative;
  }
}
</style>
