<template>
  <div class="box">
    <n-grid :cols="24" :x-gap="2" responsive="screen">
      <n-grid-item :span="24">
        <div class="toptip">
          <n-blockquote>
            <n-text type="success">
              1.先输入RAP模块id和工程id(创建模块url就有)
              2.再输入接口相关信息 3.编辑请求和返回json 4
              .点击转换完成
            </n-text>
          </n-blockquote>
        </div>
      </n-grid-item>
    </n-grid>
    <n-grid :cols="24" :x-gap="2" responsive="screen">
      <n-grid-item :span="8">
        <div class="box-left">
          <n-card title="RAP模块参数">
            <n-form
              ref="formRefBase"
              inline
              :label-width="80"
              :model="formValueBase"
            >
              <n-form-item label="工程ID">
                <n-input
                  v-model:value="formValueBase.repositoryId"
                  maxlength="6"
                  placeholder="6位数字"
                />
              </n-form-item>
              <n-form-item label="模块id">
                <n-input
                  v-model:value="formValueBase.moduleId"
                  maxlength="6"
                  placeholder="6位数字"
                />
              </n-form-item>
              <n-form-item label="创建者ID">
                <n-input
                  v-model:value="formValueBase.creatorId"
                  maxlength="6"
                  placeholder="6位数字"
                />
              </n-form-item>
            </n-form>
          </n-card>
          <div class="divider" />
          <n-card title="RAP接口相关参数">
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
              <n-button
                type="success"
                size="large"
                @click="transClick"
              >
                <template #icon>
                  <n-icon>
                    <Rocket />
                  </n-icon>
                </template>
                转换</n-button
              >
            </div>
          </n-card>
        </div>
      </n-grid-item>
      <n-grid-item :span="8">
        <div class="box-center">
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
              :mode="mode"
              lang="zh"
              @json-change="onJsonRespChange"
            ></Vue3JsonEditor>
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
  onMounted
} from 'vue'
import { transformMock } from './src/transform'
import type { ItfType, IRapProjectType } from './src/type'
import { isString, cloneDeep } from 'lodash-es'
import { useMessage } from 'naive-ui'
import Vue3JsonEditor from './editor/index.vue'
import { Rocket } from '@vicons/ionicons5'
type Recordable<T = any> = {
  [x: string]: T
}
export default defineComponent({
  name: 'MockRap',
  components: {
    Vue3JsonEditor,
    Rocket
  },
  props: {
    resp: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    req: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    }
  },
  setup(props) {
    const reqData = ref<any>(props.req)
    const respData = ref<any>(props.resp)
    const transData = ref<any>({})
    const jsonData = ref('')

    const formRef = ref<any>(null)
    const formRefBase = ref(null)

    const formValueBase = ref<IRapProjectType>({
      repositoryId: '292320',
      creatorId: '161514',
      moduleId: '482600'
    })

    const message = useMessage()

    const edtorProps = reactive({
      jsonResp: {},
      jsonReq: '',
      showBtn: false,
      mode: 'text'
    })

    // console.log(edtorProps)

    const onJsonReqChange = (val) => {
      edtorProps.jsonReq = val
    }
    const onJsonRespChange = (val) => {
      edtorProps.jsonResp = val
    }
    onMounted(() => {
      edtorProps.jsonReq = JSON.stringify(reqData.value)
      edtorProps.jsonResp = respData.value
    })

    const options = [
      {
        label: 'POST',
        value: 'POST'
      },
      {
        label: 'GET',
        value: 'GET'
      },
      {
        label: 'DELETE',
        value: 'DELETE'
      },
      {
        label: 'PUT',
        value: 'PUT'
      },
      {
        label: 'OPTIONS',
        value: 'OPTIONS'
      },
      {
        label: 'PATCH',
        value: 'PATCH'
      }
    ]

    const intefaceForm = ref<ItfType>({
      name: '',
      url: '',
      method: 'GET',
      bodyOption: '',
      desc: ''
    })
    const rules = {
      name: {
        required: true,
        message: '请输入接口名',
        trigger: 'blur'
      },
      url: {
        required: true,
        message: '请输入接口URL',
        trigger: ['input', 'blur']
      },
      method: {
        required: true,
        message: '请输入接口method',
        trigger: ['input']
      }
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
            cloneDeep(reqJson),
            cloneDeep(respJson),
            intefaceForm.value,
            formValueBase.value
          )
        } else {
          console.log(errors)
          message.error('先输入接口信息')
        }
      })
    }
    return {
      formRef,
      formRefBase,
      formValueBase,
      rules,
      options,
      jsonData,
      transClick,
      transData,
      intefaceForm,
      onJsonReqChange,
      onJsonRespChange,
      ...toRefs(edtorProps)
    }
  }
})
</script>
<style>
.box {
  width: 100%;
  height: 100%;
  text-align: left;
}

.toptip {
  padding: 0 20px 0 20px;
}

.box-left,
.box-center,
.box-right {
  padding: 20px;
}

.divider {
  margin-top: 10px;
}

.ace-jsoneditor.ace_editor {
  height: 300px;
}
textarea.jsoneditor-text {
  height: 300px;
}
</style>
