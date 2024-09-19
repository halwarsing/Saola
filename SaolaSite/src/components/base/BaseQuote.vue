<template>
  <div class="base-quote">
    {{ text }}
    <div
      v-if="author"
      class="base-quote__author"
    >
      &copy; {{ author }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  text: string
  author: string
}
defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-quote {
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-wrap: break-word;
  padding: 8px;
  padding-right: unset;
  border-left: 3px solid $primary;

  &__author {
    text-align: right;
    font-weight: 600;
  }
}
</style>
