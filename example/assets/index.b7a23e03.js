import { _ as s } from './index.dbc8a31d.js'
import {
  d as a,
  o as t,
  c as e,
} from './vendor.ffd617a9.js'
var d = a({
  name: 'MockRapDemo',
  components: { MockRap: s },
  setup: () => ({
    opt: {
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
    },
  }),
})
d.render = function (a, d, n, u, r, o) {
  const m = s
  return t(), e(m, { opt: a.opt }, null, 8, ['opt'])
}
export default d
