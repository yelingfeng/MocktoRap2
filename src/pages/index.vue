<template>
  <n-layout>
    <n-layout-header bordered class="header">
      <div class="header-title">
        <n-thing content-indented>
          <template #avatar>
            <!-- <n-avatar> -->
            <n-icon size="40" color="#0e7a0d">
              <LeafSharp />
            </n-icon>
            <!-- </n-avatar> -->
          </template>
          <template #header>MockRap2</template>
          <template #header-extra>
            <n-button
              circle
              style="font-size: 24px"
              @click="githubAction"
            >
              <n-icon>
                <LogoGithub />
              </n-icon>
            </n-button>
          </template>
          <template #description
            >MockJSON数据转成RAP2备份数据格式工具</template
          >
        </n-thing>
      </div>
    </n-layout-header>
    <!-- <n-layout has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
        :collapsed-width="64"
        show-trigger="arrow-circle"
        :width="240"
      >
        侧边栏
    </n-layout-sider>-->
    <n-layout
      content-style="padding: 24px;"
      :native-scrollbar="false"
    >
      <MockRap :req="req" :resp="resp2" />
    </n-layout>
    <!-- </n-layout> -->
  </n-layout>
</template>
<script lang="ts">
import MockRap from 'mock2rap2/mockRap/index.vue'
import { defineComponent, ref } from 'vue'
import { LeafSharp, LogoGithub } from '@vicons/ionicons5'

export default defineComponent({
  name: 'MockRapDemo',
  components: {
    MockRap,
    LeafSharp,
    LogoGithub
  },
  setup() {
    const req: any = {
      startTime: 'string',
      endTime: 'string',
      pageSize: 10,
      pageNumber: 1,
      taskName: 'string'
    }
    const resp: any = {
      status: 200,
      message: '查询成功',
      data: [
        {
          id: 70001,
          dim: '中国',
          cnt: 100476592,
          rank: 1
        },
        {
          id: 70002,
          dim: '美国',
          cnt: 3371933,
          rank: 2
        },
        {
          id: 70003,
          dim: '香港',
          cnt: 3247929,
          rank: 3
        },
        {
          id: 70008,
          dim: '未知',
          cnt: 2533189,
          rank: 4
        },
        {
          id: 70010,
          dim: '缅甸',
          cnt: 2130736,
          rank: 5
        },
        {
          id: 70011,
          dim: '印度',
          cnt: 1867044,
          rank: 6
        },
        {
          id: 70009,
          dim: '尼日利亚',
          cnt: 1463565,
          rank: 7
        }
      ],
      total: 10
    }

    const resp2 = {
      'rows|18': [
        {
          'compKey|+1': [
            '30001',
            '30002',
            '30003',
            '30005',
            '80008',
            '70004',
            '80001',
            '80002',
            '80003',
            '90001',
            '90002',
            '80005',
            '80004',
            '90003',
            '90004',
            '80006',
            '80007',
            '80010'
          ],
          'compValue|+1': [
            'aaaaa',
            'bbbb',
            'cccc',
            'ddddd',
            'eeeee',
            'fffff',
            'ggggg',
            'hhhhh',
            'iiiii',
            'jjjjj',
            'kkkkk',
            'lllll',
            'mmmmm',
            'nnnnn',
            'oooo',
            'ppppp',
            'qqqq'
          ]
        }
      ],
      message: '保存成功',
      status: '200'
    }

    const resp3 = {
      data: {
        taskBaseId: '123',
        taskName: 'ddd',
        taskCreateTime: '2222'
      },
      message: '保存成功',
      status: '200'
    }
    const githubAction = () => {
      window.open(
        'https://github.com/yelingfeng/MocktoRap2'
      )
    }
    return { req, resp, resp2, githubAction }
  }
})
</script>
<style scoped>
.header {
  padding: 5px;
  text-align: left;
}
</style>
