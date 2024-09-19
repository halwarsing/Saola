<template>
  <div class="empty_info">
    <q-icon
      class="empty_icon"
      :name="`fas fa-${notFound ? 'box-open' : 'info-circle'}`"
    />
    <div class="empty_label">
      {{ text }}
    </div>
    <q-btn
      v-if="notFound"
      class="empty_button"
      label="Назад"
      no-caps
      rounded
      color="secondary"
      @click="$router.go(-1)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    notFound: { type: Boolean, default: false },
    text: { type: String, default: 'Здесь пока пусто' }
  }
})
</script>

<style lang="scss" scoped>
.empty_info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  >.empty_button {
    position: absolute;
    right: 16px;
    top: 16px;
  }

  >.empty_icon {
    height: 60px;
    width: 100%;
    font-size: 50px;
    text-align: center;
    color: #F5F5F599;
  }

  >.empty_label {
    font-size: 16px;
    text-align: center;
    color: #F5F5F599;
    user-select: none;
  }
}
</style>
