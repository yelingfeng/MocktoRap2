import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import JsonViewer from 'vue3-json-viewer'
import App from './App.vue'
import {
  // create naive ui
  create,
  // component
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NMessageProvider,
  useMessage,
} from 'naive-ui'
const naive = create({
  components: [
    NButton,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    useMessage,
    NMessageProvider,
  ],
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(naive)
  .use(JsonViewer)
  .use(router)
  .mount('#app')
