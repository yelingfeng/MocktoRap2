import { _ as n } from './index.08935470.js'
import {
  d as t,
  o as a,
  c as o,
  a as d,
} from './vendor.ba751c96.js'
var i = t({
  name: 'MockRapDemo',
  components: { MockRap: n },
  setup: () => ({
    opt: {
      status: 200,
      message: '查询成功',
      data: [
        { id: 70001, dim: '中国', cnt: 100476592, rank: 1 },
        { id: 70002, dim: '美国', cnt: 3371933, rank: 2 },
        { id: 70003, dim: '香港', cnt: 3247929, rank: 3 },
        { id: 70008, dim: '未知', cnt: 2533189, rank: 4 },
        { id: 70010, dim: '缅甸', cnt: 2130736, rank: 5 },
        { id: 70011, dim: '印度', cnt: 1867044, rank: 6 },
        {
          id: 70009,
          dim: '尼日利亚',
          cnt: 1463565,
          rank: 7,
        },
      ],
      total: 10,
    },
  }),
})
const r = d('h1', null, 'Mock to Rap2', -1)
i.render = function (t, i, c, m, s, e) {
  const p = n
  return (
    a(),
    o('div', null, [
      r,
      d(p, { opt: t.opt }, null, 8, ['opt']),
    ])
  )
}
export default i
