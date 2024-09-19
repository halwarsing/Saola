<template>
  <div
    :class="['base-text', `level${props.level}`, {
      capitalize: props.capitalize,
      clickable: props.clickable
    }]"
    :style="props.color ? { color: props.color } : ''"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  text: string
  level: 1 | 2
  color?: string
  capitalize?: boolean
  clickable?: boolean
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-text {
  word-break: break-word;

  &.capitalize {
    text-transform: uppercase;
  }

  &.clickable {
    cursor: pointer;
  }

  &.level1 {
    font-size: 20px;
    font-family: 'Geologica-Regular';
  }

  &.level2 {
    font-size: 16px;
    font-family: 'Geologica-Light';
  }
}
</style>
