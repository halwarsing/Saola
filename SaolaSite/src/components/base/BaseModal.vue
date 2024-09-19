<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:model-value', $event)"
  >
    <q-card>
      <q-card-section
        class="base-modal__header bg-primary text-white q-py-xs q-pr-xs"
      >
        <base-header
          v-if="title"
          :level="3"
          :text="title"
        />
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="fas fa-times"
          @click="emit('update:model-value', false)"
        />
      </q-card-section>
      <div :class="['base-modal__content', { 'with-padding': contentPadding }]">
        <slot />
      </div>
      <q-card-section
        v-if="confirmed"
        class="row justify-end q-gutter-md"
      >
        <q-btn
          label="Отменить"
          color="primary"
          size="lg"
          no-caps
          outline
          @click="emit('update:model-value', false)"
        />
        <q-btn
          :label="confirmText"
          :disable="confirmDisabled"
          color="primary"
          size="lg"
          no-caps
          @click="emit('confirm')"
        />
      </q-card-section>
      <base-loader v-if="isLoading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

import BaseLoader from 'src/components/base/BaseLoader.vue'
import BaseHeader from 'src/components/base/BaseHeader.vue'

interface Props {
  modelValue: boolean
  title?: string
  confirmed?: boolean
  isLoading?: boolean
  confirmText?: string
  confirmDisabled?: boolean
  contentPadding?: boolean
}
withDefaults(defineProps<Props>(), {
  contentPadding: true,
  confirmText: 'Сохранить'
})

type Emits = {
  (e: 'update:model-value', value: boolean): void
  (e: 'confirm'): void
}
const emit = defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.base-modal {
  &__header {
    display: flex;
    align-items: center;
  }

  &__content {
    position: relative;

    &.with-padding {
      padding: 16px;
    }
  }
}
</style>
