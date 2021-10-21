import {
  n as e,
  p as t,
  d as r,
  q as a,
  s as n,
  o,
  c as s,
  j as i,
  w as l,
  r as p,
  u as d,
} from './vendor.d4e4b9b2.js'
const u = Object.prototype.toString
function c(e, t) {
  return u.call(e) === `[object ${t}]`
}
function y(e) {
  return c(e, 'Number')
}
function m(e) {
  return e && Array.isArray(e)
}
const b = () => {
    const t = `${e(10, 30)}${e(10, 50)}00${e(10, 99)}`
    return Number(t)
  },
  h = b(),
  v = (e) => {
    return y(e)
      ? 'Number'
      : m(e)
      ? 'Array'
      : null !== (t = e) && c(t, 'Object')
      ? 'Object'
      : 'String'
    var t
  },
  f = (e) =>
    `@order(${e.map((e) =>
      c(e, 'String') ? `'${e}'` : y(e) ? e : void 0
    )})`,
  j = (e, r) => {
    if (m(e)) {
      return ((e, t) => {
        const r = []
        return (
          Object.entries(e).map(([e, a]) => {
            if (null !== a) {
              const n = f(a),
                o = v(a[0]),
                s = {
                  id: b(),
                  type: o,
                  name: e,
                  rule: '',
                  pid: t,
                  value: n,
                }
              r.push(g(s))
            }
          }),
          r
        )
      })(
        t(
          e,
          (e, t, r) => (
            Object.entries(t).map(([t, r]) => {
              null !== r
                ? e[t]
                  ? e[t].push(r)
                  : (e[t] = [r])
                : (e[t] = null)
            }),
            e
          ),
          {}
        ),
        r
      )
    }
    return e
  },
  g = ({
    id: e,
    type: t,
    name: r,
    rule: a,
    value: n,
    desc: o = '',
    pid: s,
    priority: i = 1,
  }) => ({
    id: e,
    scope: 'response',
    type: t,
    pos: 2,
    name: r,
    rule: a,
    value: n,
    description: o,
    parentId: s,
    priority: i,
    required: !1,
    creatorId: 161514,
    moduleId: 482600,
    repositoryId: 292320,
    interfaceId: h,
  }),
  O = (e) => ({
    itf: (({
      name: e,
      url: t,
      method: r,
      bodyOption: a = 'FORM_DATA',
      description: n = '',
    }) => ({
      id: h,
      name: e,
      url: t,
      method: r,
      bodyOption: a,
      description: n,
      priority: 1,
      status: 200,
      creatorId: 161514,
      moduleId: 482600,
      repositoryId: 292320,
    }))({
      name: '任务列表',
      url: '/ysp_task/{uid}',
      method: 'GET',
      bodyOption: 'FORM_DATA',
      description: '示例接口描述',
    }),
    properties: ((e) => {
      const t = []
      return (
        Object.entries(e).map(([e, r]) => {
          const a = v(r),
            n = {
              id: b(),
              type: a,
              name: e,
              rule: '',
              pid: -1,
              value: r,
            }
          m(r) &&
            (j(r, n.id).map((e) => {
              t.push(e)
            }),
            r.length && (n.name = `${n.name}|${r.length}`),
            (n.value = ''))
          const o = g(n)
          t.push(o)
        }),
        t
      )
    })(e),
  })
var x = r({
  name: 'MockRap',
  props: { opt: { type: Object, default: () => ({}) } },
  setup(e) {
    const t = a(e.opt),
      r = a({}),
      o = n(t.value)
    return {
      jsonData: o,
      transClick: () => {
        r.value = O(o)
      },
      transData: r,
    }
  },
})
const _ = { class: 'box' },
  I = d('Mock to Rap2 '),
  $ = d('转换')
x.render = function (e, t, r, a, n, d) {
  const u = p('n-button'),
    c = p('n-layout-header'),
    y = p('json-viewer'),
    m = p('n-layout-sider'),
    b = p('n-layout')
  return (
    o(),
    s('div', _, [
      i(
        b,
        { style: { height: '600px' } },
        {
          default: l(() => [
            i(
              c,
              {
                style: { height: '64px', padding: '24px' },
                bordered: '',
              },
              {
                default: l(() => [
                  I,
                  i(
                    u,
                    {
                      size: 'small',
                      type: 'primary',
                      onClick: e.transClick,
                    },
                    { default: l(() => [$]), _: 1 },
                    8,
                    ['onClick']
                  ),
                ]),
                _: 1,
              }
            ),
            i(
              b,
              {
                position: 'absolute',
                style: { top: '64px' },
                'has-sider': '',
              },
              {
                default: l(() => [
                  i(
                    m,
                    {
                      'native-scrollbar': !1,
                      'collapse-mode': 'width',
                      'collapsed-width': 300,
                      width: 500,
                      'show-trigger': 'arrow-circle',
                      'content-style': 'padding: 24px;',
                      bordered: '',
                    },
                    {
                      default: l(() => [
                        i(
                          y,
                          {
                            value: e.jsonData,
                            'expand-depth': 3,
                            copyable: '',
                            sort: '',
                          },
                          null,
                          8,
                          ['value']
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  i(
                    b,
                    {
                      'content-style': 'padding: 24px;',
                      'native-scrollbar': !1,
                    },
                    {
                      default: l(() => [
                        i(
                          y,
                          {
                            value: e.transData,
                            'expand-depth': 3,
                            copyable: '',
                            sort: '',
                          },
                          null,
                          8,
                          ['value']
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }
            ),
          ]),
          _: 1,
        }
      ),
    ])
  )
}
export { x as _ }
