import {
  d as e,
  o as r,
  c as n,
  w as t,
  r as o,
  a as s,
  b as a,
  e as i,
  f as d,
  n as p,
  k as m,
} from './vendor.4b684a34.js'
let u
const l = {},
  c = function (e, r) {
    if (!r) return e()
    if (void 0 === u) {
      const e = document.createElement('link').relList
      u =
        e && e.supports && e.supports('modulepreload')
          ? 'modulepreload'
          : 'preload'
    }
    return Promise.all(
      r.map((e) => {
        if (e in l) return
        l[e] = !0
        const r = e.endsWith('.css'),
          n = r ? '[rel="stylesheet"]' : ''
        if (document.querySelector(`link[href="${e}"]${n}`))
          return
        const t = document.createElement('link')
        return (
          (t.rel = r ? 'stylesheet' : u),
          r || ((t.as = 'script'), (t.crossOrigin = '')),
          (t.href = e),
          document.head.appendChild(t),
          r
            ? new Promise((e, r) => {
                t.addEventListener('load', e),
                  t.addEventListener('error', r)
              })
            : void 0
        )
      })
    ).then(() => e())
  },
  f = [
    {
      name: 'mockRap-demo',
      path: '/mockrap/demo',
      component: () =>
        c(
          () => import('./index.61109452.js'),
          [
            './assets/index.61109452.js',
            './assets/index.e5d51d87.js',
            './assets/index.df42e62c.css',
            './assets/vendor.4b684a34.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
    {
      name: 'index',
      path: '/',
      component: () =>
        c(
          () => import('./index.6e105f82.js'),
          [
            './assets/index.6e105f82.js',
            './assets/index.8136f553.css',
            './assets/index.e5d51d87.js',
            './assets/index.df42e62c.css',
            './assets/vendor.4b684a34.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
  ]
var h = e({ name: 'App' })
h.render = function (e, a, i, d, p, m) {
  const u = o('router-view'),
    l = o('n-message-provider')
  return r(), n(l, null, { default: t(() => [s(u)]), _: 1 })
}
const _ = a({ history: i(), routes: f })
d(h).use(p).use(m).use(_).mount('#app')
