<template>
  <div class="menu-button">
    <base-text :text="props.text" :level="1" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import BaseText from 'src/components/base/BaseText.vue'

interface Props {
  text: string
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.menu-button {
  border: 1px solid #9CB49D;
  border-radius: 20px;
  padding: 10px 44px;
  transition: 0.1s border-color;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: #9CB49D;
  }
}
</style>
