<template>
  <div class="container">
    <validate-form @form-submit="onFormSubmit">
      <!-- 邮箱 -->
      <div class="mb-1">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
          v-model="emailVal"
        />
      </div>
      <!-- 密码 -->
      <div class="mb-1">
        <label class="form-label">密码</label>
        <ValidateInput
          :rules="passwordRules"
          placeholder="请输入密码"
          type="text"
          v-model="passwordVal"
        />
      </div>

      <!-- text -->
      <div id="emailHelp" class="form-text mb-3" style="color: red">
        我们会按照相关规定保护您的隐私安全
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/base/validate/ValidateInput.vue'
import ValidateForm from '../components/base/validate/ValidateForm.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const emailVal = ref('')
    const passwordVal = ref('')

    // input rule
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    // submit后进行的处理
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(res => {
          createMessage('登录成功', 'success', 2000)
          router.push('/')
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return {
      emailVal,
      passwordVal,
      emailRules,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
