<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar.url" :alt="column.title" class="rounded-circle w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, ColumnProps } from '@/store'
import { addColumnAvatar } from '../helper'
import PostList from '../components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    const list = computed(() => store.getters.getPostsById(currentId))
    const column = computed(() => store.getters.getColumnById(currentId))
    // const column = computed(() => {
    //   const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
    //   if (selectColumn) {
    //     addColumnAvatar(selectColumn, 100, 100)
    //   }
    //   return selectColumn
    // })

    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })

    return {
      column,
      list
    }
  }
})
</script>
