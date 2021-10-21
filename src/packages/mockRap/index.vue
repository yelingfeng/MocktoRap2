<template>
  <div class="box">
    <n-layout style="height: 600px">
      <n-layout-header
        style="height: 100px; padding: 5px"
        bordered
      >
        <n-form
          ref="formRef"
          inline
          :label-width="100"
          :model="intefaceForm"
          :rules="rules"
          :size="size"
        >
          <n-form-item label="接口名称" path="name">
            <n-input
              v-model:value="intefaceForm.name"
              placeholder="请输入接口名称"
            />
          </n-form-item>
          <n-form-item label="接口URL" path="url">
            <n-input
              v-model:value="intefaceForm.url"
              placeholder="请输入URL"
            />
          </n-form-item>
          <n-form-item label="接口类型" path="method">
            <n-select
              v-model:value="intefaceForm.method"
              :options="options"
            />
          </n-form-item>
          <n-form-item
            label="接口BodyOption"
            path="bodyOption"
          >
            <n-input
              v-model:value="intefaceForm.bodyOption"
              placeholder="请输入接口BodyOption"
            />
          </n-form-item>
          <n-form-item label="接口备注" path="desc">
            <n-input
              v-model:value="intefaceForm.desc"
              placeholder="desc"
            />
          </n-form-item>
          <n-form-item>
            <n-button
              size="small"
              type="primary"
              @click="transClick"
              >转换</n-button
            >
          </n-form-item>
        </n-form>
      </n-layout-header>
      <n-layout
        position="absolute"
        style="top: 100px"
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
          <n-input
            v-model:value="jsonData"
            type="textarea"
            :rows="20"
            placeholder="请复制JSON数据"
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
import type { ItfType } from './src/type'
import { cloneDeep } from 'lodash-es'
import { useMessage } from 'naive-ui'
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
    const jsonData = ref('')

    const formRef = ref<any>(null)
    const message = useMessage()
    const size = ref('medium')

    const options = [
      {
        label: 'POST',
        value: 'POST',
      },
      {
        label: 'GET',
        value: 'GET',
      },
      {
        label: 'DELETE',
        value: 'DELETE',
      },
      {
        label: 'PUT',
        value: 'PUT',
      },
    ]

    const intefaceForm = ref<ItfType>({
      name: '',
      url: '',
      method: 'GET',
      bodyOption: '',
      desc: '',
    })
    const rules = {
      name: {
        required: true,
        message: '请输入接口名',
        trigger: 'blur',
      },
      url: {
        required: true,
        message: '请输入接口URL',
        trigger: ['input', 'blur'],
      },
      method: {
        required: true,
        message: '请输入接口method',
        trigger: ['input'],
      },
    }

    const transClick = () => {
      formRef.value.validate((errors) => {
        if (!errors) {
          const json = eval('(' + jsonData.value + ')')
          // console.log(json)
          transData.value = transformMock(
            json,
            intefaceForm.value
          )
        } else {
          console.log(errors)
          message.error('Invalid')
        }
      })
    }
    return {
      size,
      formRef,
      rules,
      options,
      jsonData,
      transClick,
      transData,
      intefaceForm,
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
