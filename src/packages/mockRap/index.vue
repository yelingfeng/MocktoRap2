<template>
  <div>
    <h2>Mock to Rap2</h2>
    <JsonEditorVue
      v-model="jsonData"
      v-bind="{
        /* 局部配置 */
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import JsonEditorVue from 'json-editor-vue'
type Recordable<T = any> = {
  [x: string]: T
}
export default defineComponent({
  name: 'MockRap',
  components: {
    JsonEditorVue,
  },
  props: {
    opt: {
      type: Object as PropType<Recordable>,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const sourceData = ref<any>(props.opt)
    console.log(sourceData.value)
    const jsonData = Object.assign({}, sourceData.value)
    return {
      jsonData,
    }
  },
})
</script>
