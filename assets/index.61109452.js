import { _ as e } from './index.e5d51d87.js'
import {
  d as t,
  r as s,
  o as a,
  c as n,
  a as l,
  F as o,
  g as d,
  t as m,
  h as r,
} from './vendor.4b684a34.js'
var u = t({
  title: '基本',
  name: 'MockRapDemo',
  components: { MockRap: e },
  setup() {
    const t = {
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
    return () => React.createElement(e, { opt: t })
  },
})
const i = {
  './demo0.vue': Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: 'Module',
    default: u,
  }),
}
var c,
  p,
  b =
    ((c = 'MockRap'),
    (p = Object.entries(i).map((e) => e[1].default)),
    t({ name: `${c}-demo`, setup: () => ({ demos: p }) }))
const x = { class: 'mylib-nav' },
  v = l('p', { class: 'name' }, 'MockRap', -1),
  I = l(
    'p',
    { class: 'name-zh' },
    [l('del', null, '组件中文名称')],
    -1
  ),
  y = { class: 'mylib-example mock-rap' },
  f = { class: 'mylib-example-content' }
b.render = function (e, t, u, i, c, p) {
  const b = s('mylib-icon')
  return (
    a(),
    n(
      o,
      null,
      [
        l('div', x, [
          l(
            'p',
            {
              class: 'home',
              onClick:
                t[1] || (t[1] = (t) => e.$router.push('/')),
            },
            [l(b, { name: 'home', size: 'lg' })]
          ),
          v,
          I,
        ]),
        l('div', y, [
          (a(!0),
          n(
            o,
            null,
            d(
              e.demos,
              (e, t) => (
                a(),
                n(
                  'section',
                  {
                    key: t,
                    class: 'mylib-example-section',
                  },
                  [
                    l(
                      'div',
                      {
                        class: 'mylib-example-title',
                        textContent: m(e.title),
                      },
                      null,
                      8,
                      ['textContent']
                    ),
                    l(
                      'div',
                      {
                        class: 'mylib-example-describe',
                        textContent: m(e.describe),
                      },
                      null,
                      8,
                      ['textContent']
                    ),
                    l('div', f, [(a(), n(r(e)))]),
                  ]
                )
              )
            ),
            128
          )),
        ]),
      ],
      64
    )
  )
}
export default b
