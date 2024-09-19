<template>
  <q-page class="catalog-page">
    <navigator-block />
    <wrapper-block
      block-title="Ближайшие мероприятия"
      :items="visibleEvents"
      :type="InfoBlockType.EVENT"
      @show-all="$router.push('/events')"
    />
    <wrapper-block
      block-title="Последние новости"
      :items="visibleNews"
      :type="InfoBlockType.NEWS"
      @show-all="$router.push('/news')"
    />
  </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useStore } from 'src/stores/main.js'
import { InfoBlockType } from 'src/enums'
import WrapperBlock from 'src/components/WrapperBlock.vue'
import NavigatorBlock from 'src/components/navigator/main.vue'

const store = useStore()

// const visibleNews = computed(() => {
//   return store.$state.news
// })
// const visibleEvents = computed(() => {
//   return store.$state.events
// })
const visibleNews = computed(() => {
  return [{
    id: '1',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '2',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '3',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '4',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }]
})
const visibleEvents = computed(() => {
  return [{
    id: '1',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '2',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '3',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }, {
    id: '4',
    title: 'Idjffjd fdjf jfdngfdj gnr ingeigneir',
    text: 'predsgjsod idoghfio hgifoh gifhdgifodh gdfoig hdfiohgiodfh '.repeat(20)
  }]
})
// const visibleLifehacks = computed(() => {
//   return store.$state.lifehacks
// })
</script>

<style lang="scss" scoped>
.catalog-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  gap: 80px;
}
</style>
