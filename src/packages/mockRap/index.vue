<template>
  <div class="box">
    <n-layout style="height: 600px">
      <n-layout-header
        style="height: 64px; padding: 24px"
        bordered
        >Mock to Rap2
        <n-button
          size="small"
          type="primary"
          @click="transClick"
          >转换</n-button
        >
      </n-layout-header>
      <n-layout
        position="absolute"
        style="top: 64px"
        has-sider
      >
        <n-layout-sider
          :native-scrollbar="false"
          collapse-mode="width"
          :collapsed-width="300"
          :width="500"
          show-trigger="arrow-circle"
          content-style="padding: 24px;"
          bordered
        >
          <json-viewer
            :value="jsonData"
            :expand-depth="3"
            copyable
            sort
          />
        </n-layout-sider>
        <n-layout
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <json-viewer
            :value="transData"
            :expand-depth="3"
            copyable
            sort
          />
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { transformMock } from './src/transform'
import { cloneDeep } from 'lodash-es'
type Recordable<T = any> = {
  [x: string]: T
}
export default defineComponent({
  name: 'MockRap',
  props: {
    opt: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
  },
  setup(props) {
    const sourceData = ref<any>(props.opt)
    const transData = ref<any>({})
    const jsonData = cloneDeep(sourceData.value)
    const transClick = () => {
      transData.value = transformMock(jsonData)
    }
    return {
      jsonData,
      transClick,
      transData,
    }
  },
})
</script>
<style>
.box {
  text-align: left;
  width: 1200px;
  margin: 20px auto;
}
</style>
