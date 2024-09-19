<template>
  <div class="base-list">
    <base-header
      :text="label"
      :level="3"
    />
    <div :class="['base-list__wrapper', markerType]">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="base-list__item"
      >
        {{ item }}
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { ListMarkerType } from 'src/enums'

interface Props {
  label: string
  items: string[]
  markerType: ListMarkerType
}
defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-list {
  &__wrapper {
    margin-left: 14px;

    &.decimal {
      list-style-type: decimal;
    }

    &.disc {
      list-style-type: disc;
    }

    &.square {
      list-style-type: square;
    }

    &.roman {
      list-style-type: upper-roman;
    }

    &.alphabetic {
      list-style-type: upper-latin;
    }
  }
}
</style>
