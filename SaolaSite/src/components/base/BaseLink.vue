<template>
  <a
    class="base-link q-dark"
    :href="href"
  >
    {{ label }}
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  label: string
  href: string
}
defineProps<Props>()
</script>

<style lang="scss" scoped></style>
