<script lang="tsx">
import {
  ComponentPublicInstance,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  watch
} from 'vue'
export default defineComponent({
  props: {
    modelValue: [String, Boolean, Object, Array],
    showBtns: [Boolean],
    expandedOnStart: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'tree'
    },
    modes: {
      type: Array,
      default: function () {
        return ['tree', 'code', 'form', 'text', 'view']
      }
    },
    lang: {
      type: String,
      default: 'en'
    }
  },
  setup(props: any, { emit }) {
    const root = getCurrentInstance()?.root
      .proxy as ComponentPublicInstance

    const state = reactive({
      editor: null as any,
      error: false,
      json: {},
      internalChange: false,
      expandedModes: ['tree', 'view', 'form'],
      locale: {
        it: {
          save: 'SALVA'
        },
        en: {
          save: 'SAVE'
        },
        zh: {
          save: '保存'
        }
      }
    })
    watch(
      () => props.modelValue as unknown as any,
      async (val) => {
        if (!state.internalChange) {
          state.json = val
          await setEditor(val)
          state.error = false
          expandAll()
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      const options = {
        mode: props.mode,
        modes: props.modes,
        onChange() {
          try {
            const json = state.editor.get()
            state.json = json
            state.error = false
            emit('json-change', json)
            state.internalChange = true
            emit('input', json)
            root.$nextTick(function () {
              state.internalChange = false
            })
          } catch (e) {
            state.error = true
            emit('has-error', e)
          }
        },
        onModeChange() {
          expandAll()
        }
      }
      state.editor = new window.JSONEditor(
        document.querySelector('.jsoneditor-vue'),
        options,
        state.json
      )
    })

    function expandAll() {
      // console.log(state.editor.getMode())
      if (
        props.expandedOnStart &&
        state.expandedModes.includes(state.editor.getMode())
      ) {
        ;(state.editor as any).expandAll()
      }
    }

    function onSave() {
      emit('json-save', state.json)
    }

    function setEditor(value: any): void {
      if (state.editor) state.editor.set(value)
    }

    return () => {
      return (
        <div>
          <div class={'jsoneditor-vue'}></div>
          {props.showBtns !== false && (
            <div class={'jsoneditor-btns'}>
              <button
                class={'json-save-btn'}
                type={'button'}
                onClick={() => {
                  onSave()
                }}
                disabled={state.error}
              >
                {state.locale[props.lang].save}
              </button>
            </div>
          )}
        </div>
      )
    }
  }
})
</script>
<style scoped>
.ace_line_group {
  text-align: left;
}
.json-editor-container {
  display: flex;
  width: 100%;
}
.json-editor-container .tree-mode {
  width: 50%;
}
.json-editor-container .code-mode {
  flex-grow: 1;
}
.jsoneditor-btns {
  text-align: center;
  margin-top: 10px;
}
.jsoneditor-vue .jsoneditor-outer {
  min-height: 300px;
}
.jsoneditor-vue div.jsoneditor-tree {
  min-height: 350px;
}
.json-save-btn {
  background-color: #20a0ff;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.json-save-btn:focus {
  outline: none;
}
.json-save-btn[disabled] {
  background-color: #1d8ce0;
  cursor: not-allowed;
}
code {
  background-color: #f5f5f5;
}
</style>
