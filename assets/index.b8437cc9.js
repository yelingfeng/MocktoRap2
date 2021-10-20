import {
  d as e,
  c as r,
  o as n,
  r as s,
  a as t,
  b as o,
  e as a,
  k as i,
  f as d,
  B as p,
  N as m,
  g as c,
  h as u,
  i as l,
} from './vendor.ffd617a9.js'
let f
const h = {},
  _ = function (e, r) {
    if (!r) return e()
    if (void 0 === f) {
      const e = document.createElement('link').relList
      f =
        e && e.supports && e.supports('modulepreload')
          ? 'modulepreload'
          : 'preload'
    }
    return Promise.all(
      r.map((e) => {
        if (e in h) return
        h[e] = !0
        const r = e.endsWith('.css'),
          n = r ? '[rel="stylesheet"]' : ''
        if (document.querySelector(`link[href="${e}"]${n}`))
          return
        const s = document.createElement('link')
        return (
          (s.rel = r ? 'stylesheet' : f),
          r || ((s.as = 'script'), (s.crossOrigin = '')),
          (s.href = e),
          document.head.appendChild(s),
          r
            ? new Promise((e, r) => {
                s.addEventListener('load', e),
                  s.addEventListener('error', r)
              })
            : void 0
        )
      })
    ).then(() => e())
  },
  E = [
    {
      name: 'mockRap-demo',
      path: '/mockrap/demo',
      component: () =>
        _(
          () => import('./index.ac8270a4.js'),
          [
            './assets/index.ac8270a4.js',
            './assets/index.dbc8a31d.js',
            './assets/index.09a2d1c9.css',
            './assets/vendor.ffd617a9.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
    {
      name: 'index',
      path: '/',
      component: () =>
        _(
          () => import('./index.b7a23e03.js'),
          [
            './assets/index.b7a23e03.js',
            './assets/index.dbc8a31d.js',
            './assets/index.09a2d1c9.css',
            './assets/vendor.ffd617a9.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
  ]
var v = e({ name: 'App' })
v.render = function (e, t, o, a, i, d) {
  const p = s('router-view')
  return n(), r(p)
}
const k = d({ components: [p, m, c, u, l] }),
  L = t({ history: o(), routes: E })
a(v).use(k).use(i).use(L).mount('#app')
