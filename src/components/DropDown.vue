<template>
  <div class="dropdown" ref="dropDownRef">
    <a
      href=""
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '@/assets/js/useClickOutSide'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // 下拉菜单按钮实例
    const dropDownRef = ref<null | HTMLElement>(null)
    // 下拉菜单状态
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutSide = useClickOutSide(dropDownRef)
    // 点击其他区域隐藏下拉菜单
    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })

    return { isOpen, toggleOpen, dropDownRef }
  }
})
</script>
