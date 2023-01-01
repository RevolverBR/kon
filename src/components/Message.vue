<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" role="alert" :class="classObject" v-if="isVisible">
      <span>{{ message }}</span>
      <button @click.prevent="hide" type="button" class="btn btn-primary" id="liveAlertBtn">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'

export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: [
    'colse-message'
  ],
  setup (props, context) {
    useDOMCreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      context.emit('colse-message', true)
    }

    return {
      classObject,
      isVisible,
      hide
    }
  }
})
</script>
