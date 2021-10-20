import type { App } from 'vue'
import MockRap from './index.vue'

MockRap.install = (app: App) => {
  app.component(MockRap.name, MockRap)
}

export { MockRap }
export default MockRap
