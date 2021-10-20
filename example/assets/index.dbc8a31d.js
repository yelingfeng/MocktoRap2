import {
  d as e,
  n as t,
  p as a,
  o as r,
  c as n,
  j as o,
  w as s,
  r as l,
  q as p,
} from './vendor.ffd617a9.js'
const u = Object.prototype.toString
function i(e, t) {
  return u.call(e) === `[object ${t}]`
}
function c(e) {
  return e && Array.isArray(e)
}
const d = (e) =>
    i(e, 'String')
      ? 'String'
      : (function (e) {
          return i(e, 'Number')
        })(e)
      ? 'Number'
      : c(e)
      ? 'Array'
      : (function (e) {
          return null !== e && i(e, 'Object')
        })(e)
      ? 'Object'
      : null,
  y = (e) => {
    const t = []
    return (
      Object.entries(e).map(([e, a]) => {
        const r = d(a)
        ;((e) => {
          c(e) && console.log(e)
        })(a)
        const n = (({
          type: e,
          name: t,
          rule: a,
          value: r,
          desc: n = '',
          pid: o,
          priority: s = 1,
        }) => ({
          scope: 'response',
          type: e,
          pos: 2,
          name: t,
          rule: a,
          value: r,
          description: n,
          parentId: o,
          priority: s,
          required: !1,
        }))({
          type: r,
          name: e,
          rule: '',
          pid: -1,
          value: '',
        })
        t.push(n)
      }),
      t
    )
  }
var b = e({
  name: 'MockRap',
  props: { opt: { type: Object, default: () => ({}) } },
  setup(e) {
    const r = t(e.opt),
      n = t({}),
      o = a(r.value)
    return {
      jsonData: o,
      transClick: () => {
        n.value = y(o)
      },
      transData: n,
    }
  },
})
const f = { class: 'box' },
  v = p('Mock to Rap2 '),
  h = p('转换')
b.render = function (e, t, a, p, u, i) {
  const c = l('n-button'),
    d = l('n-layout-header'),
    y = l('json-viewer'),
    b = l('n-layout-sider'),
    m = l('n-layout')
  return (
    r(),
    n('div', f, [
      o(
        m,
        { style: { height: '600px' } },
        {
          default: s(() => [
            o(
              d,
              {
                style: { height: '64px', padding: '24px' },
                bordered: '',
              },
              {
                default: s(() => [
                  v,
                  o(
                    c,
                    {
                      size: 'small',
                      type: 'primary',
                      onClick: e.transClick,
                    },
                    { default: s(() => [h]), _: 1 },
                    8,
                    ['onClick']
                  ),
                ]),
                _: 1,
              }
            ),
            o(
              m,
              {
                position: 'absolute',
                style: { top: '64px' },
                'has-sider': '',
              },
              {
                default: s(() => [
                  o(
                    b,
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
                      default: s(() => [
                        o(
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
                  o(
                    m,
                    {
                      'content-style': 'padding: 24px;',
                      'native-scrollbar': !1,
                    },
                    {
                      default: s(() => [
                        o(
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
export { b as _ }
