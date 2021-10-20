import { _ as e } from './index.dbc8a31d.js'
import {
  d as t,
  o as s,
  c as a,
  j as n,
  F as l,
  l as o,
  r as d,
  t as m,
  m as r,
} from './vendor.ffd617a9.js'
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
  v = n('p', { class: 'name' }, 'MockRap', -1),
  I = n(
    'p',
    { class: 'name-zh' },
    [n('del', null, '组件中文名称')],
    -1
  ),
  f = { class: 'mylib-example mock-rap' },
  y = { class: 'mylib-example-content' }
b.render = function (e, t, u, i, c, p) {
  const b = d('mylib-icon')
  return (
    s(),
    a(
      l,
      null,
      [
        n('div', x, [
          n(
            'p',
            {
              class: 'home',
              onClick:
                t[1] || (t[1] = (t) => e.$router.push('/')),
            },
            [n(b, { name: 'home', size: 'lg' })]
          ),
          v,
          I,
        ]),
        n('div', f, [
          (s(!0),
          a(
            l,
            null,
            o(
              e.demos,
              (e, t) => (
                s(),
                a(
                  'section',
                  {
                    key: t,
                    class: 'mylib-example-section',
                  },
                  [
                    n(
                      'div',
                      {
                        class: 'mylib-example-title',
                        textContent: m(e.title),
                      },
                      null,
                      8,
                      ['textContent']
                    ),
                    n(
                      'div',
                      {
                        class: 'mylib-example-describe',
                        textContent: m(e.describe),
                      },
                      null,
                      8,
                      ['textContent']
                    ),
                    n('div', y, [(s(), a(r(e)))]),
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
