<template>
  <div class="app-loader">
    <div
      v-if="text"
      class="app-loader__text secondary-text text-h3"
    >
      {{ text }}
    </div>
    <q-circular-progress
      indeterminate
      class="app-loader__progress"
      size="100px"
      :color="color"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: 'accent'
    }
  }
}
</script>

<style lang="scss">
.app-loader {
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
