import {
  x as e,
  y as t,
  d as a,
  z as l,
  A as r,
  u as n,
  o,
  c as u,
  a as i,
  w as d,
  C as s,
  r as p,
} from './vendor.ba751c96.js'
const c = Object.prototype.toString
function m(e, t) {
  return c.call(e) === `[object ${t}]`
}
function v(e) {
  return m(e, 'Number')
}
function b(e) {
  return e && Array.isArray(e)
}
const f = () => {
    const t = `${e(10, 30)}${e(10, 50)}00${e(10, 99)}`
    return Number(t)
  },
  h = f(),
  y = (e) => {
    return v(e)
      ? 'Number'
      : b(e)
      ? 'Array'
      : null !== (t = e) && m(t, 'Object')
      ? 'Object'
      : 'String'
    var t
  },
  g = (e) =>
    `@order(${e.map((e) =>
      m(e, 'String') ? `'${e}'` : v(e) ? e : void 0
    )})`,
  O = (e, a) => {
    if (b(e)) {
      return ((e, t) => {
        const a = []
        return (
          Object.entries(e).map(([e, l]) => {
            if (null !== l) {
              const r = g(l),
                n = y(l[0]),
                o = {
                  id: f(),
                  type: n,
                  name: e,
                  rule: '',
                  pid: t,
                  value: r,
                }
              a.push(_(o))
            }
          }),
          a
        )
      })(
        t(
          e,
          (e, t, a) => (
            Object.entries(t).map(([t, a]) => {
              null !== a
                ? e[t]
                  ? e[t].push(a)
                  : (e[t] = [a])
                : (e[t] = null)
            }),
            e
          ),
          {}
        ),
        a
      )
    }
    return e
  },
  _ = ({
    id: e,
    type: t,
    name: a,
    rule: l,
    value: r,
    desc: n = '',
    pid: o,
    priority: u = 1,
  }) => ({
    id: e,
    scope: 'response',
    type: t,
    pos: 2,
    name: a,
    rule: l,
    value: r,
    description: n,
    parentId: o,
    priority: u,
    required: !1,
    creatorId: 161514,
  }),
  F = (e, t) => ({
    itf: (({
      name: e,
      url: t,
      method: a,
      bodyOption: l = 'FORM_DATA',
      description: r = '',
    }) => ({
      id: h,
      name: e,
      url: t,
      method: a,
      bodyOption: l,
      description: r,
      priority: 1,
      status: 200,
      creatorId: 161514,
    }))({
      name: t.name,
      url: t.url,
      method: t.method,
      bodyOption: t.bodyOption,
      description: t.desc,
    }),
    properties: ((e) => {
      const t = []
      return (
        Object.entries(e).map(([e, a]) => {
          const l = y(a),
            r = {
              id: f(),
              type: l,
              name: e,
              rule: '',
              pid: -1,
              value: a,
            }
          b(a) &&
            (O(a, r.id).map((e) => {
              t.push(e)
            }),
            a.length && (r.name = `${r.name}|${a.length}`),
            (r.value = ''))
          const n = _(r)
          t.push(n)
        }),
        t
      )
    })(e),
  })
var j = a({
  name: 'MockRap',
  props: { opt: { type: Object, default: () => ({}) } },
  setup(e) {
    const t = l(e.opt),
      a = l({}),
      o = r(t.value),
      u = l(null),
      i = n(),
      d = l('medium'),
      s = l({
        name: '',
        url: '',
        method: 'GET',
        bodyOption: '',
        desc: '',
      })
    return {
      size: d,
      formRef: u,
      rules: {
        name: {
          required: !0,
          message: '请输入接口名',
          trigger: 'blur',
        },
        url: {
          required: !0,
          message: '请输入接口URL',
          trigger: ['input', 'blur'],
        },
        method: {
          required: !0,
          message: '请输入接口method',
          trigger: ['input'],
        },
      },
      options: [
        { label: 'POST', value: 'POST' },
        { label: 'GET', value: 'GET' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
      ],
      jsonData: o,
      transClick: () => {
        u.value.validate((e) => {
          e
            ? (console.log(e), i.error('Invalid'))
            : (a.value = F(o, s.value))
        })
      },
      transData: a,
      intefaceForm: s,
    }
  },
})
const x = { class: 'box' },
  T = s('转换')
j.render = function (e, t, a, l, r, n) {
  const s = p('n-input'),
    c = p('n-form-item'),
    m = p('n-select'),
    v = p('n-button'),
    b = p('n-form'),
    f = p('n-layout-header'),
    h = p('json-viewer'),
    y = p('n-layout-sider'),
    g = p('n-layout')
  return (
    o(),
    u('div', x, [
      i(
        g,
        { style: { height: '600px' } },
        {
          default: d(() => [
            i(
              f,
              {
                style: { height: '100px', padding: '5px' },
                bordered: '',
              },
              {
                default: d(() => [
                  i(
                    b,
                    {
                      ref: 'formRef',
                      inline: '',
                      'label-width': 100,
                      model: e.intefaceForm,
                      rules: e.rules,
                      size: e.size,
                    },
                    {
                      default: d(() => [
                        i(
                          c,
                          {
                            label: '接口名称',
                            path: 'name',
                          },
                          {
                            default: d(() => [
                              i(
                                s,
                                {
                                  value:
                                    e.intefaceForm.name,
                                  'onUpdate:value':
                                    t[1] ||
                                    (t[1] = (t) =>
                                      (e.intefaceForm.name =
                                        t)),
                                  placeholder:
                                    '请输入接口名称',
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
                          c,
                          { label: '接口URL', path: 'url' },
                          {
                            default: d(() => [
                              i(
                                s,
                                {
                                  value: e.intefaceForm.url,
                                  'onUpdate:value':
                                    t[2] ||
                                    (t[2] = (t) =>
                                      (e.intefaceForm.url =
                                        t)),
                                  placeholder: '请输入URL',
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
                          c,
                          {
                            label: '接口类型',
                            path: 'method',
                          },
                          {
                            default: d(() => [
                              i(
                                m,
                                {
                                  value:
                                    e.intefaceForm.method,
                                  'onUpdate:value':
                                    t[3] ||
                                    (t[3] = (t) =>
                                      (e.intefaceForm.method =
                                        t)),
                                  options: e.options,
                                },
                                null,
                                8,
                                ['value', 'options']
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        i(
                          c,
                          {
                            label: '接口BodyOption',
                            path: 'bodyOption',
                          },
                          {
                            default: d(() => [
                              i(
                                s,
                                {
                                  value:
                                    e.intefaceForm
                                      .bodyOption,
                                  'onUpdate:value':
                                    t[4] ||
                                    (t[4] = (t) =>
                                      (e.intefaceForm.bodyOption =
                                        t)),
                                  placeholder:
                                    '请输入接口BodyOption',
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
                          c,
                          {
                            label: '接口备注',
                            path: 'desc',
                          },
                          {
                            default: d(() => [
                              i(
                                s,
                                {
                                  value:
                                    e.intefaceForm.desc,
                                  'onUpdate:value':
                                    t[5] ||
                                    (t[5] = (t) =>
                                      (e.intefaceForm.desc =
                                        t)),
                                  placeholder: 'desc',
                                },
                                null,
                                8,
                                ['value']
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        i(c, null, {
                          default: d(() => [
                            i(
                              v,
                              {
                                size: 'small',
                                type: 'primary',
                                onClick: e.transClick,
                              },
                              {
                                default: d(() => [T]),
                                _: 1,
                              },
                              8,
                              ['onClick']
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ['model', 'rules', 'size']
                  ),
                ]),
                _: 1,
              }
            ),
            i(
              g,
              {
                position: 'absolute',
                style: { top: '100px' },
                'has-sider': '',
              },
              {
                default: d(() => [
                  i(
                    y,
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
                      default: d(() => [
                        i(
                          h,
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
                    g,
                    {
                      'content-style': 'padding: 24px;',
                      'native-scrollbar': !1,
                    },
                    {
                      default: d(() => [
                        i(
                          h,
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
export { j as _ }
