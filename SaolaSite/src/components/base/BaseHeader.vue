<template>
  <div :class="['base-header', `level${level}`]">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  text: string
  level: 1 | 2
}
defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-header {
  word-break: break-word;
  line-height: 100%;

  &.level1 {
    font-size: 96px;
    font-family: 'BebasNeue';
  }

  &.level2 {
    font-size: 32px;
    font-family: 'Geologica-Medium';
  }
}
</style>
