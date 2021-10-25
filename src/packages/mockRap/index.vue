<template>
  <div class="box">
    <n-grid :cols="24" :x-gap="2" responsive="screen">
      <n-grid-item :span="8">
        <div class="box-left">
          <n-card content-style="min-height: 400px;">
            <n-divider title-placement="left"
              >Request</n-divider
            >
            <n-input
              v-model:value="jsonReq"
              type="textarea"
              :rows="10"
              placeholder=""
            />
            <n-divider title-placement="left"
              >Response</n-divider
            >
            <Vue3JsonEditor
              v-model="jsonResp"
              :show-btns="showBtn"
              :expanded-on-start="expandedOntart"
              :mode="mode"
              lang="zh"
              @json-change="onJsonRespChange"
            ></Vue3JsonEditor>
          </n-card>
        </div>
      </n-grid-item>
      <n-grid-item :span="6">
        <div class="box-center">
          <n-card title="接口相关参数">
            <n-form
              ref="formRef"
              :label-width="100"
              :model="intefaceForm"
              :rules="rules"
              size="medium"
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
                  placeholder="备注信息"
                />
              </n-form-item>
            </n-form>
            <div
              style="display: flex; justify-content: center"
            >
              <n-button type="primary" @click="transClick"
                >转换</n-button
              >
            </div>
          </n-card>
        </div>
      </n-grid-item>
      <n-grid-item :span="8">
        <div class="box-right">
          <n-card
            title="Rap2Json"
            content-style="min-height: 400px;height:400px;"
          >
            <json-viewer
              :value="transData"
              :expand-depth="3"
              copyable
              sort
            />
          </n-card>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  reactive,
  toRefs,
  onMounted,
} from 'vue'
import { transformMock } from './src/transform'
import type { ItfType } from './src/type'
import { cloneDeep, isString } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { Vue3JsonEditor } from 'vue3-json-editor'
type Recordable<T = any> = {
  [x: string]: T
}
export default defineComponent({
  name: 'MockRap',
  components: {
    Vue3JsonEditor,
  },
  props: {
    resp: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    req: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
  },
  setup(props) {
    const reqData = ref<any>(props.req)
    const respData = ref<any>(props.resp)
    const transData = ref<any>({})
    const jsonData = ref('')

    const formRef = ref<any>(null)
    const message = useMessage()

    const edtorProps = reactive({
      jsonResp: {},
      jsonReq: {},
      showBtn: false,
      expandedOntart: true,
      mode: 'text',
    })
    edtorProps.jsonReq = JSON.stringify(reqData.value)
    edtorProps.jsonResp = respData.value
    // console.log(edtorProps)

    const onJsonReqChange = (val) => {
      edtorProps.jsonReq = val
    }
    const onJsonRespChange = (val) => {
      edtorProps.jsonResp = val
    }

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
          let reqJson
          let respJson
          if (
            edtorProps.jsonResp &&
            isString(edtorProps.jsonResp)
          ) {
            try {
              respJson = eval(
                '(' + edtorProps.jsonResp + ')'
              )
            } catch (e) {
              console.log(e)
              message.error('格式不正确')
            }
          } else {
            respJson = edtorProps.jsonResp
          }

          if (
            edtorProps.jsonReq &&
            isString(edtorProps.jsonReq)
          ) {
            try {
              reqJson = eval('(' + edtorProps.jsonReq + ')')
            } catch (e) {
              console.log(e)
              message.error('格式不正确')
            }
          } else {
            reqJson = edtorProps.jsonReq
          }

          // const json =
          // console.log(json)
          transData.value = transformMock(
            reqJson,
            respJson,
            intefaceForm.value
          )
        } else {
          console.log(errors)
          message.error('先输入接口信息')
        }
      })
    }
    return {
      formRef,
      rules,
      options,
      jsonData,
      transClick,
      transData,
      intefaceForm,
      onJsonReqChange,
      onJsonRespChange,
      ...toRefs(edtorProps),
    }
  },
})
</script>
<style>
.box {
  width: 100%;
  height: 100%;
  text-align: left;
}

.box-left,
.box-center,
.box-right {
  padding: 20px;
}

.jsoneditor-vue .jsoneditor-outer {
  min-height: 300px;
}
.ace-jsoneditor.ace_editor {
  height: 300px;
}
textarea.jsoneditor-text {
  height: 300px;
}
</style>
