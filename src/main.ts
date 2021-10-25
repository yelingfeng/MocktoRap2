import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import JsonViewer from 'vue3-json-viewer'
import App from './App.vue'
import naive from 'naive-ui'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(naive)
  .use(JsonViewer)
  .use(router)
  .mount('#app')
