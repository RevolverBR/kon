import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 设置url前缀
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  // get
  config.params = { ...config.params, icode: '99C7D39F13A7DE29' }

  if (config.data instanceof FormData) {
    config.data.append('icode', '99C7D39F13A7DE29')
  } else {
    config.data = { ...config.data, icode: '99C7D39F13A7DE29' }
  }
  return config
})

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

createApp(App).use(router).use(store).mount('#app')
