<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <router-link to="/" class="navbar-brand mx-2">者也专栏</router-link>
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2 mx-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0 mx-2">
      <li class="list-inline-item">
        <DropDown :title="`你好 ${user.nickName}`">
          <DropDownItem>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropDownItem>
          <DropDownItem>
            <a href="#" class="dropdown-item disabled">编辑资料</a>
          </DropDownItem>
          <DropDownItem>
            <a href="#" class="dropdown-item">退出登陆</a>
          </DropDownItem>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { UserProps } from '../store'

// interface Data {
//   [key: string]: unknown
// }
// interface SetupContext {
//   emit: (event: string, ...args: unknown[]) => void
// }

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
  // setup (props: Data, { emit }: SetupContext) {
  //   function login () {
  //     emit('login')
  //   }
  //   return { }
  // }
})
</script>
