import {
  d as e,
  c as s,
  w as r,
  r as n,
  o as t,
  a as o,
  b as a,
  e as d,
  f as i,
  k as p,
  g as m,
  B as c,
  N as u,
  h as l,
  i as h,
  j as f,
  l as _,
  m as v,
  n as E,
  p as k,
  u as L,
  q as j,
} from './vendor.ba751c96.js'
let y
const P = {},
  b = function (e, s) {
    if (!s) return e()
    if (void 0 === y) {
      const e = document.createElement('link').relList
      y =
        e && e.supports && e.supports('modulepreload')
          ? 'modulepreload'
          : 'preload'
    }
    return Promise.all(
      s.map((e) => {
        if (e in P) return
        P[e] = !0
        const s = e.endsWith('.css'),
          r = s ? '[rel="stylesheet"]' : ''
        if (document.querySelector(`link[href="${e}"]${r}`))
          return
        const n = document.createElement('link')
        return (
          (n.rel = s ? 'stylesheet' : y),
          s || ((n.as = 'script'), (n.crossOrigin = '')),
          (n.href = e),
          document.head.appendChild(n),
          s
            ? new Promise((e, s) => {
                n.addEventListener('load', e),
                  n.addEventListener('error', s)
              })
            : void 0
        )
      })
    ).then(() => e())
  },
  g = [
    {
      name: 'mockRap-demo',
      path: '/mockrap/demo',
      component: () =>
        b(
          () => import('./index.8d642831.js'),
          [
            './assets/index.8d642831.js',
            './assets/index.08935470.js',
            './assets/index.09a2d1c9.css',
            './assets/vendor.ba751c96.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
    {
      name: 'index',
      path: '/',
      component: () =>
        b(
          () => import('./index.b0e60dac.js'),
          [
            './assets/index.b0e60dac.js',
            './assets/index.08935470.js',
            './assets/index.09a2d1c9.css',
            './assets/vendor.ba751c96.js',
            './assets/vendor.0cf337ad.css',
          ]
        ),
      props: !0,
    },
  ]
var w = e({ name: 'App' })
w.render = function (e, a, d, i, p, m) {
  const c = n('router-view'),
    u = n('n-message-provider')
  return t(), s(u, null, { default: r(() => [o(c)]), _: 1 })
}
const x = m({
    components: [c, u, l, h, f, _, v, E, k, L, j],
  }),
  A = a({ history: d(), routes: g })
i(w).use(x).use(p).use(A).mount('#app')
