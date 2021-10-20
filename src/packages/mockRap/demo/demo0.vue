<script lang="tsx">
import MockRap from 'mock2rap2/mockRap/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  title: '基本',
  name: 'MockRapDemo',
  components: {
    MockRap,
  },
  setup() {
    const opt = {
      status: 200,
      message: '查询成功',
      data: null,
      rows: [
        {
          id: 70001,
          name: '综合态势分析',
          userId: 0,
          status: 1,
        },
        {
          id: 70002,
          name: '实时在线用户态势分析',
          userId: 0,
          status: 1,
        },
        {
          id: 70003,
          parentId: null,
          name: '省外在线用户态势分析',
          userId: 0,
          status: 1,
        },
        {
          id: 70008,
          parentId: null,
          name: '境外在线用户态势分析',
          userId: 0,
          status: 1,
        },
        {
          id: 70010,
          name: '重点地区在线用户态势展示分析',
          userId: 0,
          status: 1,
        },
        {
          order: 'desc',
          id: 70011,
          name: '境外在线用户态势展示分析',
          userId: 0,
          status: 1,
        },
        {
          id: 70009,
          parentId: null,
          name: '移动上网态势分析',
          userId: 0,
          status: 1,
        },
      ],
      total: 10,
      api_name: null,
    }
    return () => {
      return <MockRap options={opt} />
    }
  },
})
</script>
