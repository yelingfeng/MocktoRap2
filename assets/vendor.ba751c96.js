function e(e, t) {
  const n = Object.create(null),
    o = e.split(',')
  for (let r = 0; r < o.length; r++) n[o[r]] = !0
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
}
const t = e(
    'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt'
  ),
  n = e(
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
  )
function o(e) {
  if (w(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        i = o($(r) ? a(r) : r)
      if (i) for (const e in i) t[e] = i[e]
    }
    return t
  }
  if (z(e)) return e
}
const r = /;(?![^(]*\))/g,
  i = /:(.+)/
function a(e) {
  const t = {}
  return (
    e.split(r).forEach((e) => {
      if (e) {
        const n = e.split(i)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function l(e) {
  let t = ''
  if ($(e)) t = e
  else if (w(e))
    for (let n = 0; n < e.length; n++) {
      const o = l(e[n])
      o && (t += o + ' ')
    }
  else if (z(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const s = (e) =>
    null == e
      ? ''
      : z(e)
      ? JSON.stringify(e, c, 2)
      : String(e),
  c = (e, t) =>
    C(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          ),
        }
      : S(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !z(t) || w(t) || j(t)
      ? t
      : String(t),
  u = {},
  d = [],
  f = () => {},
  p = () => !1,
  h = /^on[^a-z]/,
  v = (e) => h.test(e),
  g = (e) => e.startsWith('onUpdate:'),
  b = Object.assign,
  m = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  y = Object.prototype.hasOwnProperty,
  x = (e, t) => y.call(e, t),
  w = Array.isArray,
  C = (e) => '[object Map]' === O(e),
  S = (e) => '[object Set]' === O(e),
  k = (e) => 'function' == typeof e,
  $ = (e) => 'string' == typeof e,
  _ = (e) => 'symbol' == typeof e,
  z = (e) => null !== e && 'object' == typeof e,
  P = (e) => z(e) && k(e.then) && k(e.catch),
  E = Object.prototype.toString,
  O = (e) => E.call(e),
  j = (e) => '[object Object]' === O(e),
  T = (e) =>
    $(e) &&
    'NaN' !== e &&
    '-' !== e[0] &&
    '' + parseInt(e, 10) === e,
  A = e(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  M = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  F = /-(\w)/g,
  R = M((e) =>
    e.replace(F, (e, t) => (t ? t.toUpperCase() : ''))
  ),
  B = /\B([A-Z])/g,
  L = M((e) => e.replace(B, '-$1').toLowerCase()),
  I = M((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  D = M((e) => (e ? `on${I(e)}` : '')),
  H = (e, t) => e !== t && (e == e || t == t),
  N = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  W = (e, t, n) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n,
    })
  },
  V = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  q = new WeakMap(),
  U = []
let G
const K = Symbol(''),
  Y = Symbol('')
function X(e, t = u) {
  ;(function (e) {
    return e && !0 === e._isEffect
  })(e) && (e = e.raw)
  const n = (function (e, t) {
    const n = function () {
      if (!n.active) return e()
      if (!U.includes(n)) {
        Q(n)
        try {
          return (
            te.push(ee), (ee = !0), U.push(n), (G = n), e()
          )
        } finally {
          U.pop(), oe(), (G = U[U.length - 1])
        }
      }
    }
    return (
      (n.id = J++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    )
  })(e, t)
  return t.lazy || n(), n
}
function Z(e) {
  e.active &&
    (Q(e),
    e.options.onStop && e.options.onStop(),
    (e.active = !1))
}
let J = 0
function Q(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let ee = !0
const te = []
function ne() {
  te.push(ee), (ee = !1)
}
function oe() {
  const e = te.pop()
  ee = void 0 === e || e
}
function re(e, t, n) {
  if (!ee || void 0 === G) return
  let o = q.get(e)
  o || q.set(e, (o = new Map()))
  let r = o.get(n)
  r || o.set(n, (r = new Set())),
    r.has(G) || (r.add(G), G.deps.push(r))
}
function ie(e, t, n, o, r, i) {
  const a = q.get(e)
  if (!a) return
  const l = new Set(),
    s = (e) => {
      e &&
        e.forEach((e) => {
          ;(e !== G || e.allowRecurse) && l.add(e)
        })
    }
  if ('clear' === t) a.forEach(s)
  else if ('length' === n && w(e))
    a.forEach((e, t) => {
      ;('length' === t || t >= o) && s(e)
    })
  else
    switch ((void 0 !== n && s(a.get(n)), t)) {
      case 'add':
        w(e)
          ? T(n) && s(a.get('length'))
          : (s(a.get(K)), C(e) && s(a.get(Y)))
        break
      case 'delete':
        w(e) || (s(a.get(K)), C(e) && s(a.get(Y)))
        break
      case 'set':
        C(e) && s(a.get(K))
    }
  l.forEach((e) => {
    e.options.scheduler ? e.options.scheduler(e) : e()
  })
}
const ae = e('__proto__,__v_isRef,__isVue'),
  le = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(_)
  ),
  se = pe(),
  ce = pe(!1, !0),
  ue = pe(!0),
  de = fe()
function fe() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      const n = Array.prototype[t]
      e[t] = function (...e) {
        const t = Je(this)
        for (let n = 0, r = this.length; n < r; n++)
          re(t, 0, n + '')
        const o = n.apply(t, e)
        return -1 === o || !1 === o
          ? n.apply(t, e.map(Je))
          : o
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(
      (t) => {
        const n = Array.prototype[t]
        e[t] = function (...e) {
          ne()
          const t = n.apply(this, e)
          return oe(), t
        }
      }
    ),
    e
  )
}
function pe(e = !1, t = !1) {
  return function (n, o, r) {
    if ('__v_isReactive' === o) return !e
    if ('__v_isReadonly' === o) return e
    if (
      '__v_raw' === o &&
      r === (e ? (t ? Ve : We) : t ? Ne : He).get(n)
    )
      return n
    const i = w(n)
    if (!e && i && x(de, o)) return Reflect.get(de, o, r)
    const a = Reflect.get(n, o, r)
    if (_(o) ? le.has(o) : ae(o)) return a
    if ((e || re(n, 0, o), t)) return a
    if (tt(a)) {
      return !i || !T(o) ? a.value : a
    }
    return z(a) ? (e ? Ge(a) : Ue(a)) : a
  }
}
function he(e = !1) {
  return function (t, n, o, r) {
    let i = t[n]
    if (
      !e &&
      ((o = Je(o)), (i = Je(i)), !w(t) && tt(i) && !tt(o))
    )
      return (i.value = o), !0
    const a = w(t) && T(n) ? Number(n) < t.length : x(t, n),
      l = Reflect.set(t, n, o, r)
    return (
      t === Je(r) &&
        (a
          ? H(o, i) && ie(t, 'set', n, o)
          : ie(t, 'add', n, o)),
      l
    )
  }
}
const ve = {
    get: se,
    set: he(),
    deleteProperty: function (e, t) {
      const n = x(e, t)
      e[t]
      const o = Reflect.deleteProperty(e, t)
      return o && n && ie(e, 'delete', t, void 0), o
    },
    has: function (e, t) {
      const n = Reflect.has(e, t)
      return (_(t) && le.has(t)) || re(e, 0, t), n
    },
    ownKeys: function (e) {
      return (
        re(e, 0, w(e) ? 'length' : K), Reflect.ownKeys(e)
      )
    },
  },
  ge = {
    get: ue,
    set: (e, t) => !0,
    deleteProperty: (e, t) => !0,
  },
  be = b({}, ve, { get: ce, set: he(!0) }),
  me = (e) => (z(e) ? Ue(e) : e),
  ye = (e) => (z(e) ? Ge(e) : e),
  xe = (e) => e,
  we = (e) => Reflect.getPrototypeOf(e)
function Ce(e, t, n = !1, o = !1) {
  const r = Je((e = e.__v_raw)),
    i = Je(t)
  t !== i && !n && re(r, 0, t), !n && re(r, 0, i)
  const { has: a } = we(r),
    l = o ? xe : n ? ye : me
  return a.call(r, t)
    ? l(e.get(t))
    : a.call(r, i)
    ? l(e.get(i))
    : void (e !== r && e.get(t))
}
function Se(e, t = !1) {
  const n = this.__v_raw,
    o = Je(n),
    r = Je(e)
  return (
    e !== r && !t && re(o, 0, e),
    !t && re(o, 0, r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  )
}
function ke(e, t = !1) {
  return (
    (e = e.__v_raw),
    !t && re(Je(e), 0, K),
    Reflect.get(e, 'size', e)
  )
}
function $e(e) {
  e = Je(e)
  const t = Je(this)
  return (
    we(t).has.call(t, e) || (t.add(e), ie(t, 'add', e, e)),
    this
  )
}
function _e(e, t) {
  t = Je(t)
  const n = Je(this),
    { has: o, get: r } = we(n)
  let i = o.call(n, e)
  i || ((e = Je(e)), (i = o.call(n, e)))
  const a = r.call(n, e)
  return (
    n.set(e, t),
    i ? H(t, a) && ie(n, 'set', e, t) : ie(n, 'add', e, t),
    this
  )
}
function ze(e) {
  const t = Je(this),
    { has: n, get: o } = we(t)
  let r = n.call(t, e)
  r || ((e = Je(e)), (r = n.call(t, e))), o && o.call(t, e)
  const i = t.delete(e)
  return r && ie(t, 'delete', e, void 0), i
}
function Pe() {
  const e = Je(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && ie(e, 'clear', void 0, void 0), n
}
function Ee(e, t) {
  return function (n, o) {
    const r = this,
      i = r.__v_raw,
      a = Je(i),
      l = t ? xe : e ? ye : me
    return (
      !e && re(a, 0, K),
      i.forEach((e, t) => n.call(o, l(e), l(t), r))
    )
  }
}
function Oe(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      i = Je(r),
      a = C(i),
      l = 'entries' === e || (e === Symbol.iterator && a),
      s = 'keys' === e && a,
      c = r[e](...o),
      u = n ? xe : t ? ye : me
    return (
      !t && re(i, 0, s ? Y : K),
      {
        next() {
          const { value: e, done: t } = c.next()
          return t
            ? { value: e, done: t }
            : {
                value: l ? [u(e[0]), u(e[1])] : u(e),
                done: t,
              }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function je(e) {
  return function (...t) {
    return 'delete' !== e && this
  }
}
function Te() {
  const e = {
      get(e) {
        return Ce(this, e)
      },
      get size() {
        return ke(this)
      },
      has: Se,
      add: $e,
      set: _e,
      delete: ze,
      clear: Pe,
      forEach: Ee(!1, !1),
    },
    t = {
      get(e) {
        return Ce(this, e, !1, !0)
      },
      get size() {
        return ke(this)
      },
      has: Se,
      add: $e,
      set: _e,
      delete: ze,
      clear: Pe,
      forEach: Ee(!1, !0),
    },
    n = {
      get(e) {
        return Ce(this, e, !0)
      },
      get size() {
        return ke(this, !0)
      },
      has(e) {
        return Se.call(this, e, !0)
      },
      add: je('add'),
      set: je('set'),
      delete: je('delete'),
      clear: je('clear'),
      forEach: Ee(!0, !1),
    },
    o = {
      get(e) {
        return Ce(this, e, !0, !0)
      },
      get size() {
        return ke(this, !0)
      },
      has(e) {
        return Se.call(this, e, !0)
      },
      add: je('add'),
      set: je('set'),
      delete: je('delete'),
      clear: je('clear'),
      forEach: Ee(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(
      (r) => {
        ;(e[r] = Oe(r, !1, !1)),
          (n[r] = Oe(r, !0, !1)),
          (t[r] = Oe(r, !1, !0)),
          (o[r] = Oe(r, !0, !0))
      }
    ),
    [e, n, t, o]
  )
}
const [Ae, Me, Fe, Re] = Te()
function Be(e, t) {
  const n = t ? (e ? Re : Fe) : e ? Me : Ae
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(x(n, o) && o in t ? n : t, o, r)
}
const Le = { get: Be(!1, !1) },
  Ie = { get: Be(!1, !0) },
  De = { get: Be(!0, !1) },
  He = new WeakMap(),
  Ne = new WeakMap(),
  We = new WeakMap(),
  Ve = new WeakMap()
function qe(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })(((e) => O(e).slice(8, -1))(e))
}
function Ue(e) {
  return e && e.__v_isReadonly ? e : Ke(e, !1, ve, Le, He)
}
function Ge(e) {
  return Ke(e, !0, ge, De, We)
}
function Ke(e, t, n, o, r) {
  if (!z(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const i = r.get(e)
  if (i) return i
  const a = qe(e)
  if (0 === a) return e
  const l = new Proxy(e, 2 === a ? o : n)
  return r.set(e, l), l
}
function Ye(e) {
  return Xe(e) ? Ye(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function Xe(e) {
  return !(!e || !e.__v_isReadonly)
}
function Ze(e) {
  return Ye(e) || Xe(e)
}
function Je(e) {
  return (e && Je(e.__v_raw)) || e
}
function Qe(e) {
  return W(e, '__v_skip', !0), e
}
const et = (e) => (z(e) ? Ue(e) : e)
function tt(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
function nt(e) {
  return rt(e)
}
class ot {
  constructor(e, t) {
    ;(this._rawValue = e),
      (this._shallow = t),
      (this.__v_isRef = !0),
      (this._value = t ? e : et(e))
  }
  get value() {
    return re(Je(this), 0, 'value'), this._value
  }
  set value(e) {
    H(Je(e), this._rawValue) &&
      ((this._rawValue = e),
      (this._value = this._shallow ? e : et(e)),
      ie(Je(this), 'set', 'value', e))
  }
}
function rt(e, t = !1) {
  return tt(e) ? e : new ot(e, t)
}
function it(e) {
  return tt(e) ? e.value : e
}
const at = {
  get: (e, t, n) => it(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t]
    return tt(r) && !tt(n)
      ? ((r.value = n), !0)
      : Reflect.set(e, t, n, o)
  },
}
function lt(e) {
  return Ye(e) ? e : new Proxy(e, at)
}
class st {
  constructor(e, t) {
    ;(this._object = e),
      (this._key = t),
      (this.__v_isRef = !0)
  }
  get value() {
    return this._object[this._key]
  }
  set value(e) {
    this._object[this._key] = e
  }
}
function ct(e, t) {
  return tt(e[t]) ? e[t] : new st(e, t)
}
class ut {
  constructor(e, t, n) {
    ;(this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = X(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty ||
            ((this._dirty = !0),
            ie(Je(this), 'set', 'value'))
        },
      })),
      (this.__v_isReadonly = n)
  }
  get value() {
    const e = Je(this)
    return (
      e._dirty &&
        ((e._value = this.effect()), (e._dirty = !1)),
      re(e, 0, 'value'),
      e._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function dt(e, t, n, o) {
  let r
  try {
    r = o ? e(...o) : e()
  } catch (i) {
    pt(i, t, n)
  }
  return r
}
function ft(e, t, n, o) {
  if (k(e)) {
    const r = dt(e, t, n, o)
    return (
      r &&
        P(r) &&
        r.catch((e) => {
          pt(e, t, n)
        }),
      r
    )
  }
  const r = []
  for (let i = 0; i < e.length; i++)
    r.push(ft(e[i], t, n, o))
  return r
}
function pt(e, t, n, o = !0) {
  t && t.vnode
  if (t) {
    let o = t.parent
    const r = t.proxy,
      i = n
    for (; o; ) {
      const t = o.ec
      if (t)
        for (let n = 0; n < t.length; n++)
          if (!1 === t[n](e, r, i)) return
      o = o.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) return void dt(a, null, 10, [e, r, i])
  }
  !(function (e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
let ht = !1,
  vt = !1
const gt = []
let bt = 0
const mt = []
let yt = null,
  xt = 0
const wt = []
let Ct = null,
  St = 0
const kt = Promise.resolve()
let $t = null,
  _t = null
function zt(e) {
  const t = $t || kt
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Pt(e) {
  if (
    !(
      (gt.length &&
        gt.includes(
          e,
          ht && e.allowRecurse ? bt + 1 : bt
        )) ||
      e === _t
    )
  ) {
    const t = (function (e) {
      let t = bt + 1,
        n = gt.length
      const o = At(e)
      for (; t < n; ) {
        const e = (t + n) >>> 1
        At(gt[e]) < o ? (t = e + 1) : (n = e)
      }
      return t
    })(e)
    t > -1 ? gt.splice(t, 0, e) : gt.push(e), Et()
  }
}
function Et() {
  ht || vt || ((vt = !0), ($t = kt.then(Mt)))
}
function Ot(e, t, n, o) {
  w(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) ||
      n.push(e),
    Et()
}
function jt(e, t = null) {
  if (mt.length) {
    for (
      _t = t, yt = [...new Set(mt)], mt.length = 0, xt = 0;
      xt < yt.length;
      xt++
    )
      yt[xt]()
    ;(yt = null), (xt = 0), (_t = null), jt(e, t)
  }
}
function Tt(e) {
  if (wt.length) {
    const e = [...new Set(wt)]
    if (((wt.length = 0), Ct)) return void Ct.push(...e)
    for (
      Ct = e, Ct.sort((e, t) => At(e) - At(t)), St = 0;
      St < Ct.length;
      St++
    )
      Ct[St]()
    ;(Ct = null), (St = 0)
  }
}
const At = (e) => (null == e.id ? 1 / 0 : e.id)
function Mt(e) {
  ;(vt = !1),
    (ht = !0),
    jt(e),
    gt.sort((e, t) => At(e) - At(t))
  try {
    for (bt = 0; bt < gt.length; bt++) {
      const e = gt[bt]
      e && !1 !== e.active && dt(e, null, 14)
    }
  } finally {
    ;(bt = 0),
      (gt.length = 0),
      Tt(),
      (ht = !1),
      ($t = null),
      (gt.length || mt.length || wt.length) && Mt(e)
  }
}
function Ft(e, t, ...n) {
  const o = e.vnode.props || u
  let r = n
  const i = t.startsWith('update:'),
    a = i && t.slice(7)
  if (a && a in o) {
    const e = `${
        'modelValue' === a ? 'model' : a
      }Modifiers`,
      { number: t, trim: i } = o[e] || u
    i ? (r = n.map((e) => e.trim())) : t && (r = n.map(V))
  }
  let l,
    s = o[(l = D(t))] || o[(l = D(R(t)))]
  !s && i && (s = o[(l = D(L(t)))]), s && ft(s, e, 6, r)
  const c = o[l + 'Once']
  if (c) {
    if (e.emitted) {
      if (e.emitted[l]) return
    } else e.emitted = {}
    ;(e.emitted[l] = !0), ft(c, e, 6, r)
  }
}
function Rt(e, t, n = !1) {
  const o = t.emitsCache,
    r = o.get(e)
  if (void 0 !== r) return r
  const i = e.emits
  let a = {},
    l = !1
  if (!k(e)) {
    const o = (e) => {
      const n = Rt(e, t, !0)
      n && ((l = !0), b(a, n))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return i || l
    ? (w(i) ? i.forEach((e) => (a[e] = null)) : b(a, i),
      o.set(e, a),
      a)
    : (o.set(e, null), null)
}
function Bt(e, t) {
  return (
    !(!e || !v(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    x(e, t[0].toLowerCase() + t.slice(1)) ||
      x(e, L(t)) ||
      x(e, t))
  )
}
let Lt = null,
  It = null
function Dt(e) {
  const t = Lt
  return (Lt = e), (It = (e && e.type.__scopeId) || null), t
}
function Ht(e, t = Lt, n) {
  if (!t) return e
  if (e._n) return e
  const o = (...n) => {
    o._d && Oo(-1)
    const r = Dt(t),
      i = e(...n)
    return Dt(r), o._d && Oo(1), i
  }
  return (o._n = !0), (o._c = !0), (o._d = !0), o
}
function Nt(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: i,
    propsOptions: [a],
    slots: l,
    attrs: s,
    emit: c,
    render: u,
    renderCache: d,
    data: f,
    setupState: p,
    ctx: h,
    inheritAttrs: v,
  } = e
  let b
  const m = Dt(e)
  try {
    let e
    if (4 & n.shapeFlag) {
      const t = r || o
      ;(b = Ho(u.call(t, t, d, i, p, f, h))), (e = s)
    } else {
      const n = t
      0,
        (b = Ho(
          n.length > 1
            ? n(i, { attrs: s, slots: l, emit: c })
            : n(i, null)
        )),
        (e = t.props ? s : Wt(s))
    }
    let m = b
    if (e && !1 !== v) {
      const t = Object.keys(e),
        { shapeFlag: n } = m
      t.length &&
        (1 & n || 6 & n) &&
        (a && t.some(g) && (e = Vt(e, a)), (m = Lo(m, e)))
    }
    0,
      n.dirs &&
        (m.dirs = m.dirs ? m.dirs.concat(n.dirs) : n.dirs),
      n.transition && (m.transition = n.transition),
      (b = m)
  } catch (y) {
    ;(_o.length = 0), pt(y, e, 1), (b = Bo(ko))
  }
  return Dt(m), b
}
const Wt = (e) => {
    let t
    for (const n in e)
      ('class' === n || 'style' === n || v(n)) &&
        ((t || (t = {}))[n] = e[n])
    return t
  },
  Vt = (e, t) => {
    const n = {}
    for (const o in e)
      (g(o) && o.slice(9) in t) || (n[o] = e[o])
    return n
  }
function qt(e, t, n) {
  const o = Object.keys(t)
  if (o.length !== Object.keys(e).length) return !0
  for (let r = 0; r < o.length; r++) {
    const i = o[r]
    if (t[i] !== e[i] && !Bt(n, i)) return !0
  }
  return !1
}
function Ut(e, t) {
  if (er) {
    let n = er.provides
    const o = er.parent && er.parent.provides
    o === n && (n = er.provides = Object.create(o)),
      (n[e] = t)
  } else;
}
function Gt(e, t, n = !1) {
  const o = er || Lt
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1)
      return n && k(t) ? t.call(o.proxy) : t
  }
}
function Kt(e, t) {
  return Zt(e, null, t)
}
const Yt = {}
function Xt(e, t, n) {
  return Zt(e, t, n)
}
function Zt(
  e,
  t,
  {
    immediate: n,
    deep: o,
    flush: r,
    onTrack: i,
    onTrigger: a,
  } = u,
  l = er
) {
  let s,
    c,
    d = !1,
    p = !1
  if (
    (tt(e)
      ? ((s = () => e.value), (d = !!e._shallow))
      : Ye(e)
      ? ((s = () => e), (o = !0))
      : w(e)
      ? ((p = !0),
        (d = e.some(Ye)),
        (s = () =>
          e.map((e) =>
            tt(e)
              ? e.value
              : Ye(e)
              ? en(e)
              : k(e)
              ? dt(e, l, 2)
              : void 0
          )))
      : (s = k(e)
          ? t
            ? () => dt(e, l, 2)
            : () => {
                if (!l || !l.isUnmounted)
                  return c && c(), ft(e, l, 3, [h])
              }
          : f),
    t && o)
  ) {
    const e = s
    s = () => en(e())
  }
  let h = (e) => {
      c = y.options.onStop = () => {
        dt(e, l, 4)
      }
    },
    v = p ? [] : Yt
  const g = () => {
    if (y.active)
      if (t) {
        const e = y()
        ;(o ||
          d ||
          (p ? e.some((e, t) => H(e, v[t])) : H(e, v))) &&
          (c && c(),
          ft(t, l, 3, [e, v === Yt ? void 0 : v, h]),
          (v = e))
      } else y()
  }
  let b
  ;(g.allowRecurse = !!t),
    (b =
      'sync' === r
        ? g
        : 'post' === r
        ? () => ao(g, l && l.suspense)
        : () => {
            !l || l.isMounted
              ? (function (e) {
                  Ot(e, yt, mt, xt)
                })(g)
              : g()
          })
  const y = X(s, {
    lazy: !0,
    onTrack: i,
    onTrigger: a,
    scheduler: b,
  })
  return (
    sr(y, l),
    t
      ? n
        ? g()
        : (v = y())
      : 'post' === r
      ? ao(y, l && l.suspense)
      : y(),
    () => {
      Z(y), l && m(l.effects, y)
    }
  )
}
function Jt(e, t, n) {
  const o = this.proxy,
    r = $(e)
      ? e.includes('.')
        ? Qt(o, e)
        : () => o[e]
      : e.bind(o, o)
  let i
  return (
    k(t) ? (i = t) : ((i = t.handler), (n = t)),
    Zt(r, i.bind(o), n, this)
  )
}
function Qt(e, t) {
  const n = t.split('.')
  return () => {
    let t = e
    for (let e = 0; e < n.length && t; e++) t = t[n[e]]
    return t
  }
}
function en(e, t = new Set()) {
  if (!z(e) || t.has(e) || e.__v_skip) return e
  if ((t.add(e), tt(e))) en(e.value, t)
  else if (w(e))
    for (let n = 0; n < e.length; n++) en(e[n], t)
  else if (S(e) || C(e))
    e.forEach((e) => {
      en(e, t)
    })
  else if (j(e)) for (const n in e) en(e[n], t)
  return e
}
function tn() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  }
  return (
    wn(() => {
      e.isMounted = !0
    }),
    kn(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const nn = [Function, Array],
  on = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: nn,
      onEnter: nn,
      onAfterEnter: nn,
      onEnterCancelled: nn,
      onBeforeLeave: nn,
      onLeave: nn,
      onAfterLeave: nn,
      onLeaveCancelled: nn,
      onBeforeAppear: nn,
      onAppear: nn,
      onAfterAppear: nn,
      onAppearCancelled: nn,
    },
    setup(e, { slots: t }) {
      const n = tr(),
        o = tn()
      let r
      return () => {
        const i = t.default && un(t.default(), !0)
        if (!i || !i.length) return
        const a = Je(e),
          { mode: l } = a,
          s = i[0]
        if (o.isLeaving) return ln(s)
        const c = sn(s)
        if (!c) return ln(s)
        const u = an(c, a, o, n)
        cn(c, u)
        const d = n.subTree,
          f = d && sn(d)
        let p = !1
        const { getTransitionKey: h } = c.type
        if (h) {
          const e = h()
          void 0 === r
            ? (r = e)
            : e !== r && ((r = e), (p = !0))
        }
        if (f && f.type !== ko && (!Ao(c, f) || p)) {
          const e = an(f, a, o, n)
          if ((cn(f, e), 'out-in' === l))
            return (
              (o.isLeaving = !0),
              (e.afterLeave = () => {
                ;(o.isLeaving = !1), n.update()
              }),
              ln(s)
            )
          'in-out' === l &&
            c.type !== ko &&
            (e.delayLeave = (e, t, n) => {
              ;(rn(o, f)[String(f.key)] = f),
                (e._leaveCb = () => {
                  t(),
                    (e._leaveCb = void 0),
                    delete u.delayedLeave
                }),
                (u.delayedLeave = n)
            })
        }
        return s
      }
    },
  }
function rn(e, t) {
  const { leavingVNodes: n } = e
  let o = n.get(t.type)
  return (
    o || ((o = Object.create(null)), n.set(t.type, o)), o
  )
}
function an(e, t, n, o) {
  const {
      appear: r,
      mode: i,
      persisted: a = !1,
      onBeforeEnter: l,
      onEnter: s,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: f,
      onAfterLeave: p,
      onLeaveCancelled: h,
      onBeforeAppear: v,
      onAppear: g,
      onAfterAppear: b,
      onAppearCancelled: m,
    } = t,
    y = String(e.key),
    x = rn(n, e),
    w = (e, t) => {
      e && ft(e, o, 9, t)
    },
    C = {
      mode: i,
      persisted: a,
      beforeEnter(t) {
        let o = l
        if (!n.isMounted) {
          if (!r) return
          o = v || l
        }
        t._leaveCb && t._leaveCb(!0)
        const i = x[y]
        i && Ao(e, i) && i.el._leaveCb && i.el._leaveCb(),
          w(o, [t])
      },
      enter(e) {
        let t = s,
          o = c,
          i = u
        if (!n.isMounted) {
          if (!r) return
          ;(t = g || s), (o = b || c), (i = m || u)
        }
        let a = !1
        const l = (e._enterCb = (t) => {
          a ||
            ((a = !0),
            w(t ? i : o, [e]),
            C.delayedLeave && C.delayedLeave(),
            (e._enterCb = void 0))
        })
        t ? (t(e, l), t.length <= 1 && l()) : l()
      },
      leave(t, o) {
        const r = String(e.key)
        if ((t._enterCb && t._enterCb(!0), n.isUnmounting))
          return o()
        w(d, [t])
        let i = !1
        const a = (t._leaveCb = (n) => {
          i ||
            ((i = !0),
            o(),
            w(n ? h : p, [t]),
            (t._leaveCb = void 0),
            x[r] === e && delete x[r])
        })
        ;(x[r] = e),
          f ? (f(t, a), f.length <= 1 && a()) : a()
      },
      clone: (e) => an(e, t, n, o),
    }
  return C
}
function ln(e) {
  if (pn(e)) return ((e = Lo(e)).children = null), e
}
function sn(e) {
  return pn(e) ? (e.children ? e.children[0] : void 0) : e
}
function cn(e, t) {
  6 & e.shapeFlag && e.component
    ? cn(e.component.subTree, t)
    : 128 & e.shapeFlag
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function un(e, t = !1) {
  let n = [],
    o = 0
  for (let r = 0; r < e.length; r++) {
    const i = e[r]
    i.type === Co
      ? (128 & i.patchFlag && o++,
        (n = n.concat(un(i.children, t))))
      : (t || i.type !== ko) && n.push(i)
  }
  if (o > 1)
    for (let r = 0; r < n.length; r++) n[r].patchFlag = -2
  return n
}
function dn(e) {
  return k(e) ? { setup: e, name: e.name } : e
}
const fn = (e) => !!e.type.__asyncLoader,
  pn = (e) => e.type.__isKeepAlive
function hn(e, t) {
  gn(e, 'a', t)
}
function vn(e, t) {
  gn(e, 'da', t)
}
function gn(e, t, n = er) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      e()
    })
  if ((mn(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; )
      pn(e.parent.vnode) && bn(o, t, n, e), (e = e.parent)
  }
}
function bn(e, t, n, o) {
  const r = mn(t, e, o, !0)
  $n(() => {
    m(o[t], r)
  }, n)
}
function mn(e, t, n = er, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          ne(), nr(n)
          const r = ft(t, n, e, o)
          return nr(null), oe(), r
        })
    return o ? r.unshift(i) : r.push(i), i
  }
}
const yn =
    (e) =>
    (t, n = er) =>
      (!rr || 'sp' === e) && mn(e, t, n),
  xn = yn('bm'),
  wn = yn('m'),
  Cn = yn('bu'),
  Sn = yn('u'),
  kn = yn('bum'),
  $n = yn('um'),
  _n = yn('sp'),
  zn = yn('rtg'),
  Pn = yn('rtc')
function En(e, t = er) {
  mn('ec', e, t)
}
let On = !0
function jn(e) {
  const t = Mn(e),
    n = e.proxy,
    o = e.ctx
  ;(On = !1), t.beforeCreate && Tn(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: i,
    methods: a,
    watch: l,
    provide: s,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: p,
    beforeUpdate: h,
    updated: v,
    activated: g,
    deactivated: b,
    beforeDestroy: m,
    beforeUnmount: y,
    destroyed: x,
    unmounted: C,
    render: S,
    renderTracked: $,
    renderTriggered: _,
    errorCaptured: P,
    serverPrefetch: E,
    expose: O,
    inheritAttrs: j,
    components: T,
    directives: A,
    filters: M,
  } = t
  if (
    (c &&
      (function (e, t, n = f) {
        w(e) && (e = Ln(e))
        for (const o in e) {
          const n = e[o]
          z(n)
            ? (t[o] =
                'default' in n
                  ? Gt(n.from || o, n.default, !0)
                  : Gt(n.from || o))
            : (t[o] = Gt(n))
        }
      })(c, o, null),
    a)
  )
    for (const f in a) {
      const e = a[f]
      k(e) && (o[f] = e.bind(n))
    }
  if (r) {
    const t = r.call(n, n)
    z(t) && (e.data = Ue(t))
  }
  if (((On = !0), i))
    for (const w in i) {
      const e = i[w],
        t = ur({
          get: k(e)
            ? e.bind(n, n)
            : k(e.get)
            ? e.get.bind(n, n)
            : f,
          set: !k(e) && k(e.set) ? e.set.bind(n) : f,
        })
      Object.defineProperty(o, w, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: (e) => (t.value = e),
      })
    }
  if (l) for (const f in l) An(l[f], o, n, f)
  if (s) {
    const e = k(s) ? s.call(n) : s
    Reflect.ownKeys(e).forEach((t) => {
      Ut(t, e[t])
    })
  }
  function F(e, t) {
    w(t)
      ? t.forEach((t) => e(t.bind(n)))
      : t && e(t.bind(n))
  }
  if (
    (u && Tn(u, e, 'c'),
    F(xn, d),
    F(wn, p),
    F(Cn, h),
    F(Sn, v),
    F(hn, g),
    F(vn, b),
    F(En, P),
    F(Pn, $),
    F(zn, _),
    F(kn, y),
    F($n, C),
    F(_n, E),
    w(O))
  )
    if (O.length) {
      const t = e.exposed || (e.exposed = {})
      O.forEach((e) => {
        Object.defineProperty(t, e, {
          get: () => n[e],
          set: (t) => (n[e] = t),
        })
      })
    } else e.exposed || (e.exposed = {})
  S && e.render === f && (e.render = S),
    null != j && (e.inheritAttrs = j),
    T && (e.components = T),
    A && (e.directives = A)
}
function Tn(e, t, n) {
  ft(
    w(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  )
}
function An(e, t, n, o) {
  const r = o.includes('.') ? Qt(n, o) : () => n[o]
  if ($(e)) {
    const n = t[e]
    k(n) && Xt(r, n)
  } else if (k(e)) Xt(r, e.bind(n))
  else if (z(e))
    if (w(e)) e.forEach((e) => An(e, t, n, o))
    else {
      const o = k(e.handler)
        ? e.handler.bind(n)
        : t[e.handler]
      k(o) && Xt(r, o, e)
    }
}
function Mn(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: a },
    } = e.appContext,
    l = i.get(t)
  let s
  return (
    l
      ? (s = l)
      : r.length || n || o
      ? ((s = {}),
        r.length && r.forEach((e) => Fn(s, e, a, !0)),
        Fn(s, t, a))
      : (s = t),
    i.set(t, s),
    s
  )
}
function Fn(e, t, n, o = !1) {
  const { mixins: r, extends: i } = t
  i && Fn(e, i, n, !0),
    r && r.forEach((t) => Fn(e, t, n, !0))
  for (const a in t)
    if (o && 'expose' === a);
    else {
      const o = Rn[a] || (n && n[a])
      e[a] = o ? o(e[a], t[a]) : t[a]
    }
  return e
}
const Rn = {
  data: Bn,
  props: Dn,
  emits: Dn,
  methods: Dn,
  computed: Dn,
  beforeCreate: In,
  created: In,
  beforeMount: In,
  mounted: In,
  beforeUpdate: In,
  updated: In,
  beforeDestroy: In,
  destroyed: In,
  activated: In,
  deactivated: In,
  errorCaptured: In,
  serverPrefetch: In,
  components: Dn,
  directives: Dn,
  watch: function (e, t) {
    if (!e) return t
    if (!t) return e
    const n = b(Object.create(null), e)
    for (const o in t) n[o] = In(e[o], t[o])
    return n
  },
  provide: Bn,
  inject: function (e, t) {
    return Dn(Ln(e), Ln(t))
  },
}
function Bn(e, t) {
  return t
    ? e
      ? function () {
          return b(
            k(e) ? e.call(this, this) : e,
            k(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function Ln(e) {
  if (w(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function In(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Dn(e, t) {
  return e ? b(b(Object.create(null), e), t) : t
}
function Hn(e, t, n, o = !1) {
  const r = {},
    i = {}
  W(i, Mo, 1),
    (e.propsDefaults = Object.create(null)),
    Nn(e, t, r, i)
  for (const a in e.propsOptions[0])
    a in r || (r[a] = void 0)
  n
    ? (e.props = o ? r : Ke(r, !1, be, Ie, Ne))
    : e.type.props
    ? (e.props = r)
    : (e.props = i),
    (e.attrs = i)
}
function Nn(e, t, n, o) {
  const [r, i] = e.propsOptions
  let a,
    l = !1
  if (t)
    for (let s in t) {
      if (A(s)) continue
      const c = t[s]
      let u
      r && x(r, (u = R(s)))
        ? i && i.includes(u)
          ? ((a || (a = {}))[u] = c)
          : (n[u] = c)
        : Bt(e.emitsOptions, s) ||
          (c !== o[s] && ((o[s] = c), (l = !0)))
    }
  if (i) {
    const t = Je(n),
      o = a || u
    for (let a = 0; a < i.length; a++) {
      const l = i[a]
      n[l] = Wn(r, t, l, o[l], e, !x(o, l))
    }
  }
  return l
}
function Wn(e, t, n, o, r, i) {
  const a = e[n]
  if (null != a) {
    const e = x(a, 'default')
    if (e && void 0 === o) {
      const e = a.default
      if (a.type !== Function && k(e)) {
        const { propsDefaults: i } = r
        n in i
          ? (o = i[n])
          : (nr(r), (o = i[n] = e.call(null, t)), nr(null))
      } else o = e
    }
    a[0] &&
      (i && !e
        ? (o = !1)
        : !a[1] || ('' !== o && o !== L(n)) || (o = !0))
  }
  return o
}
function Vn(e, t, n = !1) {
  const o = t.propsCache,
    r = o.get(e)
  if (r) return r
  const i = e.props,
    a = {},
    l = []
  let s = !1
  if (!k(e)) {
    const o = (e) => {
      s = !0
      const [n, o] = Vn(e, t, !0)
      b(a, n), o && l.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!i && !s) return o.set(e, d), d
  if (w(i))
    for (let d = 0; d < i.length; d++) {
      const e = R(i[d])
      qn(e) && (a[e] = u)
    }
  else if (i)
    for (const u in i) {
      const e = R(u)
      if (qn(e)) {
        const t = i[u],
          n = (a[e] = w(t) || k(t) ? { type: t } : t)
        if (n) {
          const t = Kn(Boolean, n.type),
            o = Kn(String, n.type)
          ;(n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || x(n, 'default')) && l.push(e)
        }
      }
    }
  const c = [a, l]
  return o.set(e, c), c
}
function qn(e) {
  return '$' !== e[0]
}
function Un(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : ''
}
function Gn(e, t) {
  return Un(e) === Un(t)
}
function Kn(e, t) {
  return w(t)
    ? t.findIndex((t) => Gn(t, e))
    : k(t) && Gn(t, e)
    ? 0
    : -1
}
const Yn = (e) => '_' === e[0] || '$stable' === e,
  Xn = (e) => (w(e) ? e.map(Ho) : [Ho(e)]),
  Zn = (e, t, n) => {
    const o = Ht((e) => Xn(t(e)), n)
    return (o._c = !1), o
  },
  Jn = (e, t, n) => {
    const o = e._ctx
    for (const r in e) {
      if (Yn(r)) continue
      const n = e[r]
      if (k(n)) t[r] = Zn(0, n, o)
      else if (null != n) {
        const e = Xn(n)
        t[r] = () => e
      }
    }
  },
  Qn = (e, t) => {
    const n = Xn(t)
    e.slots.default = () => n
  }
function eo(e, t) {
  if (null === Lt) return e
  const n = Lt.proxy,
    o = e.dirs || (e.dirs = [])
  for (let r = 0; r < t.length; r++) {
    let [e, i, a, l = u] = t[r]
    k(e) && (e = { mounted: e, updated: e }),
      o.push({
        dir: e,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: a,
        modifiers: l,
      })
  }
  return e
}
function to(e, t, n, o) {
  const r = e.dirs,
    i = t && t.dirs
  for (let a = 0; a < r.length; a++) {
    const l = r[a]
    i && (l.oldValue = i[a].value)
    let s = l.dir[o]
    s && (ne(), ft(s, n, 8, [e.el, l, e, t]), oe())
  }
}
function no() {
  return {
    app: null,
    config: {
      isNativeTag: p,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let oo = 0
function ro(e, t) {
  return function (n, o = null) {
    null == o || z(o) || (o = null)
    const r = no(),
      i = new Set()
    let a = !1
    const l = (r.app = {
      _uid: oo++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: fr,
      get config() {
        return r.config
      },
      set config(e) {},
      use: (e, ...t) => (
        i.has(e) ||
          (e && k(e.install)
            ? (i.add(e), e.install(l, ...t))
            : k(e) && (i.add(e), e(l, ...t))),
        l
      ),
      mixin: (e) => (
        r.mixins.includes(e) || r.mixins.push(e), l
      ),
      component: (e, t) =>
        t ? ((r.components[e] = t), l) : r.components[e],
      directive: (e, t) =>
        t ? ((r.directives[e] = t), l) : r.directives[e],
      mount(i, s, c) {
        if (!a) {
          const u = Bo(n, o)
          return (
            (u.appContext = r),
            s && t ? t(u, i) : e(u, i, c),
            (a = !0),
            (l._container = i),
            (i.__vue_app__ = l),
            u.component.proxy
          )
        }
      },
      unmount() {
        a &&
          (e(null, l._container),
          delete l._container.__vue_app__)
      },
      provide: (e, t) => ((r.provides[e] = t), l),
    })
    return l
  }
}
const io = { scheduler: Pt, allowRecurse: !0 },
  ao = function (e, t) {
    t && t.pendingBranch
      ? w(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : Ot(e, Ct, wt, St)
  },
  lo = (e, t, n, o, r = !1) => {
    if (w(e))
      return void e.forEach((e, i) =>
        lo(e, t && (w(t) ? t[i] : t), n, o, r)
      )
    if (fn(o) && !r) return
    const i =
        4 & o.shapeFlag
          ? lr(o.component) || o.component.proxy
          : o.el,
      a = r ? null : i,
      { i: l, r: s } = e,
      c = t && t.r,
      d = l.refs === u ? (l.refs = {}) : l.refs,
      f = l.setupState
    if (
      (null != c &&
        c !== s &&
        ($(c)
          ? ((d[c] = null), x(f, c) && (f[c] = null))
          : tt(c) && (c.value = null)),
      $(s))
    ) {
      const e = () => {
        ;(d[s] = a), x(f, s) && (f[s] = a)
      }
      a ? ((e.id = -1), ao(e, n)) : e()
    } else if (tt(s)) {
      const e = () => {
        s.value = a
      }
      a ? ((e.id = -1), ao(e, n)) : e()
    } else k(s) && dt(s, l, 12, [a, d])
  }
function so(e) {
  return (function (e, t) {
    const {
        insert: n,
        remove: o,
        patchProp: r,
        forcePatchProp: i,
        createElement: a,
        createText: l,
        createComment: s,
        setText: c,
        setElementText: p,
        parentNode: h,
        nextSibling: v,
        setScopeId: g = f,
        cloneNode: m,
        insertStaticContent: y,
      } = e,
      w = (
        e,
        t,
        n,
        o = null,
        r = null,
        i = null,
        a = !1,
        l = null,
        s = !1
      ) => {
        e &&
          !Ao(e, t) &&
          ((o = ae(e)), J(e, r, i, !0), (e = null)),
          -2 === t.patchFlag &&
            ((s = !1), (t.dynamicChildren = null))
        const { type: c, ref: u, shapeFlag: d } = t
        switch (c) {
          case So:
            C(e, t, n, o)
            break
          case ko:
            S(e, t, n, o)
            break
          case $o:
            null == e && k(t, n, o, a)
            break
          case Co:
            B(e, t, n, o, r, i, a, l, s)
            break
          default:
            1 & d
              ? z(e, t, n, o, r, i, a, l, s)
              : 6 & d
              ? I(e, t, n, o, r, i, a, l, s)
              : (64 & d || 128 & d) &&
                c.process(e, t, n, o, r, i, a, l, s, se)
        }
        null != u && r && lo(u, e && e.ref, i, t || e, !t)
      },
      C = (e, t, o, r) => {
        if (null == e) n((t.el = l(t.children)), o, r)
        else {
          const n = (t.el = e.el)
          t.children !== e.children && c(n, t.children)
        }
      },
      S = (e, t, o, r) => {
        null == e
          ? n((t.el = s(t.children || '')), o, r)
          : (t.el = e.el)
      },
      k = (e, t, n, o) => {
        const r = y(e.children, t, n, o, e.staticCache)
        e.el || (e.staticCache = r),
          (e.el = r[0]),
          (e.anchor = r[r.length - 1])
      },
      $ = ({ el: e, anchor: t }, o, r) => {
        let i
        for (; e && e !== t; )
          (i = v(e)), n(e, o, r), (e = i)
        n(t, o, r)
      },
      _ = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = v(e)), o(e), (e = n)
        o(t)
      },
      z = (e, t, n, o, r, i, a, l, s) => {
        ;(a = a || 'svg' === t.type),
          null == e
            ? E(t, n, o, r, i, a, l, s)
            : T(e, t, r, i, a, l, s)
      },
      E = (e, t, o, i, l, s, c, u) => {
        let d, f
        const {
          type: h,
          props: v,
          shapeFlag: g,
          transition: b,
          patchFlag: y,
          dirs: x,
        } = e
        if (e.el && void 0 !== m && -1 === y)
          d = e.el = m(e.el)
        else {
          if (
            ((d = e.el = a(e.type, s, v && v.is, v)),
            8 & g
              ? p(d, e.children)
              : 16 & g &&
                j(
                  e.children,
                  d,
                  null,
                  i,
                  l,
                  s && 'foreignObject' !== h,
                  c,
                  u || !!e.dynamicChildren
                ),
            x && to(e, null, i, 'created'),
            v)
          ) {
            for (const t in v)
              A(t) ||
                r(d, t, null, v[t], s, e.children, i, l, re)
            ;(f = v.onVnodeBeforeMount) && co(f, i, e)
          }
          O(d, e, e.scopeId, c, i)
        }
        x && to(e, null, i, 'beforeMount')
        const w =
          (!l || (l && !l.pendingBranch)) &&
          b &&
          !b.persisted
        w && b.beforeEnter(d),
          n(d, t, o),
          ((f = v && v.onVnodeMounted) || w || x) &&
            ao(() => {
              f && co(f, i, e),
                w && b.enter(d),
                x && to(e, null, i, 'mounted')
            }, l)
      },
      O = (e, t, n, o, r) => {
        if ((n && g(e, n), o))
          for (let i = 0; i < o.length; i++) g(e, o[i])
        if (r) {
          if (t === r.subTree) {
            const t = r.vnode
            O(e, t, t.scopeId, t.slotScopeIds, r.parent)
          }
        }
      },
      j = (e, t, n, o, r, i, a, l, s = 0) => {
        for (let c = s; c < e.length; c++) {
          const s = (e[c] = l ? No(e[c]) : Ho(e[c]))
          w(null, s, t, n, o, r, i, a, l)
        }
      },
      T = (e, t, n, o, a, l, s) => {
        const c = (t.el = e.el)
        let {
          patchFlag: d,
          dynamicChildren: f,
          dirs: h,
        } = t
        d |= 16 & e.patchFlag
        const v = e.props || u,
          g = t.props || u
        let b
        if (
          ((b = g.onVnodeBeforeUpdate) && co(b, n, t, e),
          h && to(t, e, n, 'beforeUpdate'),
          d > 0)
        ) {
          if (16 & d) F(c, t, v, g, n, o, a)
          else if (
            (2 & d &&
              v.class !== g.class &&
              r(c, 'class', null, g.class, a),
            4 & d && r(c, 'style', v.style, g.style, a),
            8 & d)
          ) {
            const l = t.dynamicProps
            for (let t = 0; t < l.length; t++) {
              const s = l[t],
                u = v[s],
                d = g[s]
              ;(d !== u || (i && i(c, s))) &&
                r(c, s, u, d, a, e.children, n, o, re)
            }
          }
          1 & d &&
            e.children !== t.children &&
            p(c, t.children)
        } else s || null != f || F(c, t, v, g, n, o, a)
        const m = a && 'foreignObject' !== t.type
        f
          ? M(e.dynamicChildren, f, c, n, o, m, l)
          : s || U(e, t, c, null, n, o, m, l, !1),
          ((b = g.onVnodeUpdated) || h) &&
            ao(() => {
              b && co(b, n, t, e),
                h && to(t, e, n, 'updated')
            }, o)
      },
      M = (e, t, n, o, r, i, a) => {
        for (let l = 0; l < t.length; l++) {
          const s = e[l],
            c = t[l],
            u =
              s.el &&
              (s.type === Co ||
                !Ao(s, c) ||
                6 & s.shapeFlag ||
                64 & s.shapeFlag)
                ? h(s.el)
                : n
          w(s, c, u, null, o, r, i, a, !0)
        }
      },
      F = (e, t, n, o, a, l, s) => {
        if (n !== o) {
          for (const c in o) {
            if (A(c)) continue
            const u = o[c],
              d = n[c]
            ;(u !== d || (i && i(e, c))) &&
              r(e, c, d, u, s, t.children, a, l, re)
          }
          if (n !== u)
            for (const i in n)
              A(i) ||
                i in o ||
                r(e, i, n[i], null, s, t.children, a, l, re)
        }
      },
      B = (e, t, o, r, i, a, s, c, u) => {
        const d = (t.el = e ? e.el : l('')),
          f = (t.anchor = e ? e.anchor : l(''))
        let {
          patchFlag: p,
          dynamicChildren: h,
          slotScopeIds: v,
        } = t
        h && (u = !0),
          v && (c = c ? c.concat(v) : v),
          null == e
            ? (n(d, o, r),
              n(f, o, r),
              j(t.children, o, f, i, a, s, c, u))
            : p > 0 && 64 & p && h && e.dynamicChildren
            ? (M(e.dynamicChildren, h, o, i, a, s, c),
              (null != t.key || (i && t === i.subTree)) &&
                uo(e, t, !0))
            : U(e, t, o, f, i, a, s, c, u)
      },
      I = (e, t, n, o, r, i, a, l, s) => {
        ;(t.slotScopeIds = l),
          null == e
            ? 512 & t.shapeFlag
              ? r.ctx.activate(t, n, o, a, s)
              : D(t, n, o, r, i, a, s)
            : H(e, t, s)
      },
      D = (e, t, n, o, r, i, a) => {
        const l = (e.component = (function (e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || Jo,
            i = {
              uid: Qo++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              effects: null,
              provides: t
                ? t.provides
                : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Vn(o, r),
              emitsOptions: Rt(o, r),
              emit: null,
              emitted: null,
              propsDefaults: u,
              inheritAttrs: o.inheritAttrs,
              ctx: u,
              data: u,
              props: u,
              attrs: u,
              slots: u,
              refs: u,
              setupState: u,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null,
            }
          return (
            (i.ctx = { _: i }),
            (i.root = t ? t.root : i),
            (i.emit = Ft.bind(null, i)),
            i
          )
        })(e, o, r))
        if (
          (pn(e) && (l.ctx.renderer = se),
          (function (e, t = !1) {
            rr = t
            const { props: n, children: o } = e.vnode,
              r = or(e)
            Hn(e, n, r, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._
                  n
                    ? ((e.slots = Je(t)), W(t, '_', n))
                    : Jn(t, (e.slots = {}))
                } else (e.slots = {}), t && Qn(e, t)
                W(e.slots, Mo, 1)
              })(e, o)
            const i = r
              ? (function (e, t) {
                  const n = e.type
                  ;(e.accessCache = Object.create(null)),
                    (e.proxy = Qe(new Proxy(e.ctx, Xo)))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = (t) => {
                              e.exposed = t || {}
                            }
                            return {
                              attrs: e.attrs,
                              slots: e.slots,
                              emit: e.emit,
                              expose: t,
                            }
                          })(e)
                        : null)
                    ;(er = e), ne()
                    const r = dt(o, e, 0, [e.props, n])
                    if ((oe(), (er = null), P(r))) {
                      const n = () => {
                        er = null
                      }
                      if ((r.then(n, n), t))
                        return r
                          .then((t) => {
                            ir(e, t)
                          })
                          .catch((t) => {
                            pt(t, e, 0)
                          })
                      e.asyncDep = r
                    } else ir(e, r)
                  } else ar(e)
                })(e, t)
              : void 0
            rr = !1
          })(l),
          l.asyncDep)
        ) {
          if ((r && r.registerDep(l, V), !e.el)) {
            const e = (l.subTree = Bo(ko))
            S(null, e, t, n)
          }
        } else V(l, e, t, n, r, i, a)
      },
      H = (e, t, n) => {
        const o = (t.component = e.component)
        if (
          (function (e, t, n) {
            const {
                props: o,
                children: r,
                component: i,
              } = e,
              { props: a, children: l, patchFlag: s } = t,
              c = i.emitsOptions
            if (t.dirs || t.transition) return !0
            if (!(n && s >= 0))
              return (
                !((!r && !l) || (l && l.$stable)) ||
                (o !== a && (o ? !a || qt(o, a, c) : !!a))
              )
            if (1024 & s) return !0
            if (16 & s) return o ? qt(o, a, c) : !!a
            if (8 & s) {
              const e = t.dynamicProps
              for (let t = 0; t < e.length; t++) {
                const n = e[t]
                if (a[n] !== o[n] && !Bt(c, n)) return !0
              }
            }
            return !1
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved)
            return void q(o, t, n)
          ;(o.next = t),
            (function (e) {
              const t = gt.indexOf(e)
              t > bt && gt.splice(t, 1)
            })(o.update),
            o.update()
        } else
          (t.component = e.component),
            (t.el = e.el),
            (o.vnode = t)
      },
      V = (e, t, n, o, r, i, a) => {
        e.update = X(function () {
          if (e.isMounted) {
            let t,
              {
                next: n,
                bu: o,
                u: l,
                parent: s,
                vnode: c,
              } = e,
              u = n
            n ? ((n.el = c.el), q(e, n, a)) : (n = c),
              o && N(o),
              (t =
                n.props && n.props.onVnodeBeforeUpdate) &&
                co(t, s, n, c)
            const d = Nt(e),
              f = e.subTree
            ;(e.subTree = d),
              w(f, d, h(f.el), ae(f), e, r, i),
              (n.el = d.el),
              null === u &&
                (function ({ vnode: e, parent: t }, n) {
                  for (; t && t.subTree === e; )
                    ((e = t.vnode).el = n), (t = t.parent)
                })(e, d.el),
              l && ao(l, r),
              (t = n.props && n.props.onVnodeUpdated) &&
                ao(() => co(t, s, n, c), r)
          } else {
            let a
            const { el: l, props: s } = t,
              { bm: c, m: u, parent: d } = e
            if (
              (c && N(c),
              (a = s && s.onVnodeBeforeMount) &&
                co(a, d, t),
              l && ue)
            ) {
              const n = () => {
                ;(e.subTree = Nt(e)),
                  ue(l, e.subTree, e, r, null)
              }
              fn(t)
                ? t.type
                    .__asyncLoader()
                    .then(() => !e.isUnmounted && n())
                : n()
            } else {
              const a = (e.subTree = Nt(e))
              w(null, a, n, o, e, r, i), (t.el = a.el)
            }
            if (
              (u && ao(u, r), (a = s && s.onVnodeMounted))
            ) {
              const e = t
              ao(() => co(a, d, e), r)
            }
            256 & t.shapeFlag && e.a && ao(e.a, r),
              (e.isMounted = !0),
              (t = n = o = null)
          }
        }, io)
      },
      q = (e, t, n) => {
        t.component = e
        const o = e.vnode.props
        ;(e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: r,
                attrs: i,
                vnode: { patchFlag: a },
              } = e,
              l = Je(r),
              [s] = e.propsOptions
            let c = !1
            if (!(o || a > 0) || 16 & a) {
              let o
              Nn(e, t, r, i) && (c = !0)
              for (const i in l)
                (t &&
                  (x(t, i) ||
                    ((o = L(i)) !== i && x(t, o)))) ||
                  (s
                    ? !n ||
                      (void 0 === n[i] &&
                        void 0 === n[o]) ||
                      (r[i] = Wn(s, l, i, void 0, e, !0))
                    : delete r[i])
              if (i !== l)
                for (const e in i)
                  (t && x(t, e)) || (delete i[e], (c = !0))
            } else if (8 & a) {
              const n = e.vnode.dynamicProps
              for (let o = 0; o < n.length; o++) {
                let a = n[o]
                const u = t[a]
                if (s)
                  if (x(i, a))
                    u !== i[a] && ((i[a] = u), (c = !0))
                  else {
                    const t = R(a)
                    r[t] = Wn(s, l, t, u, e, !1)
                  }
                else u !== i[a] && ((i[a] = u), (c = !0))
              }
            }
            c && ie(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e
            let i = !0,
              a = u
            if (32 & o.shapeFlag) {
              const e = t._
              e
                ? n && 1 === e
                  ? (i = !1)
                  : (b(r, t), n || 1 !== e || delete r._)
                : ((i = !t.$stable), Jn(t, r)),
                (a = t)
            } else t && (Qn(e, t), (a = { default: 1 }))
            if (i)
              for (const l in r)
                Yn(l) || l in a || delete r[l]
          })(e, t.children, n),
          ne(),
          jt(void 0, e.update),
          oe()
      },
      U = (e, t, n, o, r, i, a, l, s = !1) => {
        const c = e && e.children,
          u = e ? e.shapeFlag : 0,
          d = t.children,
          { patchFlag: f, shapeFlag: h } = t
        if (f > 0) {
          if (128 & f)
            return void K(c, d, n, o, r, i, a, l, s)
          if (256 & f)
            return void G(c, d, n, o, r, i, a, l, s)
        }
        8 & h
          ? (16 & u && re(c, r, i), d !== c && p(n, d))
          : 16 & u
          ? 16 & h
            ? K(c, d, n, o, r, i, a, l, s)
            : re(c, r, i, !0)
          : (8 & u && p(n, ''),
            16 & h && j(d, n, o, r, i, a, l, s))
      },
      G = (e, t, n, o, r, i, a, l, s) => {
        t = t || d
        const c = (e = e || d).length,
          u = t.length,
          f = Math.min(c, u)
        let p
        for (p = 0; p < f; p++) {
          const o = (t[p] = s ? No(t[p]) : Ho(t[p]))
          w(e[p], o, n, null, r, i, a, l, s)
        }
        c > u
          ? re(e, r, i, !0, !1, f)
          : j(t, n, o, r, i, a, l, s, f)
      },
      K = (e, t, n, o, r, i, a, l, s) => {
        let c = 0
        const u = t.length
        let f = e.length - 1,
          p = u - 1
        for (; c <= f && c <= p; ) {
          const o = e[c],
            u = (t[c] = s ? No(t[c]) : Ho(t[c]))
          if (!Ao(o, u)) break
          w(o, u, n, null, r, i, a, l, s), c++
        }
        for (; c <= f && c <= p; ) {
          const o = e[f],
            c = (t[p] = s ? No(t[p]) : Ho(t[p]))
          if (!Ao(o, c)) break
          w(o, c, n, null, r, i, a, l, s), f--, p--
        }
        if (c > f) {
          if (c <= p) {
            const e = p + 1,
              d = e < u ? t[e].el : o
            for (; c <= p; )
              w(
                null,
                (t[c] = s ? No(t[c]) : Ho(t[c])),
                n,
                d,
                r,
                i,
                a,
                l,
                s
              ),
                c++
          }
        } else if (c > p)
          for (; c <= f; ) J(e[c], r, i, !0), c++
        else {
          const h = c,
            v = c,
            g = new Map()
          for (c = v; c <= p; c++) {
            const e = (t[c] = s ? No(t[c]) : Ho(t[c]))
            null != e.key && g.set(e.key, c)
          }
          let b,
            m = 0
          const y = p - v + 1
          let x = !1,
            C = 0
          const S = new Array(y)
          for (c = 0; c < y; c++) S[c] = 0
          for (c = h; c <= f; c++) {
            const o = e[c]
            if (m >= y) {
              J(o, r, i, !0)
              continue
            }
            let u
            if (null != o.key) u = g.get(o.key)
            else
              for (b = v; b <= p; b++)
                if (0 === S[b - v] && Ao(o, t[b])) {
                  u = b
                  break
                }
            void 0 === u
              ? J(o, r, i, !0)
              : ((S[u - v] = c + 1),
                u >= C ? (C = u) : (x = !0),
                w(o, t[u], n, null, r, i, a, l, s),
                m++)
          }
          const k = x
            ? (function (e) {
                const t = e.slice(),
                  n = [0]
                let o, r, i, a, l
                const s = e.length
                for (o = 0; o < s; o++) {
                  const s = e[o]
                  if (0 !== s) {
                    if (((r = n[n.length - 1]), e[r] < s)) {
                      ;(t[o] = r), n.push(o)
                      continue
                    }
                    for (i = 0, a = n.length - 1; i < a; )
                      (l = ((i + a) / 2) | 0),
                        e[n[l]] < s ? (i = l + 1) : (a = l)
                    s < e[n[i]] &&
                      (i > 0 && (t[o] = n[i - 1]),
                      (n[i] = o))
                  }
                }
                ;(i = n.length), (a = n[i - 1])
                for (; i-- > 0; ) (n[i] = a), (a = t[a])
                return n
              })(S)
            : d
          for (b = k.length - 1, c = y - 1; c >= 0; c--) {
            const e = v + c,
              d = t[e],
              f = e + 1 < u ? t[e + 1].el : o
            0 === S[c]
              ? w(null, d, n, f, r, i, a, l, s)
              : x &&
                (b < 0 || c !== k[b] ? Y(d, n, f, 2) : b--)
          }
        }
      },
      Y = (e, t, o, r, i = null) => {
        const {
          el: a,
          type: l,
          transition: s,
          children: c,
          shapeFlag: u,
        } = e
        if (6 & u)
          return void Y(e.component.subTree, t, o, r)
        if (128 & u) return void e.suspense.move(t, o, r)
        if (64 & u) return void l.move(e, t, o, se)
        if (l === Co) {
          n(a, t, o)
          for (let e = 0; e < c.length; e++)
            Y(c[e], t, o, r)
          return void n(e.anchor, t, o)
        }
        if (l === $o) return void $(e, t, o)
        if (2 !== r && 1 & u && s)
          if (0 === r)
            s.beforeEnter(a),
              n(a, t, o),
              ao(() => s.enter(a), i)
          else {
            const {
                leave: e,
                delayLeave: r,
                afterLeave: i,
              } = s,
              l = () => n(a, t, o),
              c = () => {
                e(a, () => {
                  l(), i && i()
                })
              }
            r ? r(a, l, c) : c()
          }
        else n(a, t, o)
      },
      J = (e, t, n, o = !1, r = !1) => {
        const {
          type: i,
          props: a,
          ref: l,
          children: s,
          dynamicChildren: c,
          shapeFlag: u,
          patchFlag: d,
          dirs: f,
        } = e
        if ((null != l && lo(l, null, n, e, !0), 256 & u))
          return void t.ctx.deactivate(e)
        const p = 1 & u && f
        let h
        if (
          ((h = a && a.onVnodeBeforeUnmount) && co(h, t, e),
          6 & u)
        )
          te(e.component, n, o)
        else {
          if (128 & u) return void e.suspense.unmount(n, o)
          p && to(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, se, o)
              : c && (i !== Co || (d > 0 && 64 & d))
              ? re(c, t, n, !1, !0)
              : ((i === Co && (128 & d || 256 & d)) ||
                  (!r && 16 & u)) &&
                re(s, t, n),
            o && Q(e)
        }
        ;((h = a && a.onVnodeUnmounted) || p) &&
          ao(() => {
            h && co(h, t, e),
              p && to(e, null, t, 'unmounted')
          }, n)
      },
      Q = (e) => {
        const {
          type: t,
          el: n,
          anchor: r,
          transition: i,
        } = e
        if (t === Co) return void ee(n, r)
        if (t === $o) return void _(e)
        const a = () => {
          o(n),
            i &&
              !i.persisted &&
              i.afterLeave &&
              i.afterLeave()
        }
        if (1 & e.shapeFlag && i && !i.persisted) {
          const { leave: t, delayLeave: o } = i,
            r = () => t(n, a)
          o ? o(e.el, a, r) : r()
        } else a()
      },
      ee = (e, t) => {
        let n
        for (; e !== t; ) (n = v(e)), o(e), (e = n)
        o(t)
      },
      te = (e, t, n) => {
        const {
          bum: o,
          effects: r,
          update: i,
          subTree: a,
          um: l,
        } = e
        if ((o && N(o), r))
          for (let s = 0; s < r.length; s++) Z(r[s])
        i && (Z(i), J(a, e, t, n)),
          l && ao(l, t),
          ao(() => {
            e.isUnmounted = !0
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve())
      },
      re = (e, t, n, o = !1, r = !1, i = 0) => {
        for (let a = i; a < e.length; a++)
          J(e[a], t, n, o, r)
      },
      ae = (e) =>
        6 & e.shapeFlag
          ? ae(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : v(e.anchor || e.el),
      le = (e, t, n) => {
        null == e
          ? t._vnode && J(t._vnode, null, null, !0)
          : w(t._vnode || null, e, t, null, null, null, n),
          Tt(),
          (t._vnode = e)
      },
      se = {
        p: w,
        um: J,
        m: Y,
        r: Q,
        mt: D,
        mc: j,
        pc: U,
        pbc: M,
        n: ae,
        o: e,
      }
    let ce, ue
    t && ([ce, ue] = t(se))
    return {
      render: le,
      hydrate: ce,
      createApp: ro(le, ce),
    }
  })(e)
}
function co(e, t, n, o = null) {
  ft(e, t, 7, [n, o])
}
function uo(e, t, n = !1) {
  const o = e.children,
    r = t.children
  if (w(o) && w(r))
    for (let i = 0; i < o.length; i++) {
      const e = o[i]
      let t = r[i]
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = r[i] = No(r[i])), (t.el = e.el)),
        n || uo(e, t))
    }
}
const fo = (e) => e && (e.disabled || '' === e.disabled),
  po = (e) =>
    'undefined' != typeof SVGElement &&
    e instanceof SVGElement,
  ho = (e, t) => {
    const n = e && e.to
    if ($(n)) {
      if (t) {
        return t(n)
      }
      return null
    }
    return n
  }
function vo(e, t, n, { o: { insert: o }, m: r }, i = 2) {
  0 === i && o(e.targetAnchor, t, n)
  const {
      el: a,
      anchor: l,
      shapeFlag: s,
      children: c,
      props: u,
    } = e,
    d = 2 === i
  if ((d && o(a, t, n), (!d || fo(u)) && 16 & s))
    for (let f = 0; f < c.length; f++) r(c[f], t, n, 2)
  d && o(l, t, n)
}
const go = {
  __isTeleport: !0,
  process(e, t, n, o, r, i, a, l, s, c) {
    const {
        mc: u,
        pc: d,
        pbc: f,
        o: {
          insert: p,
          querySelector: h,
          createText: v,
          createComment: g,
        },
      } = c,
      b = fo(t.props)
    let {
      shapeFlag: m,
      children: y,
      dynamicChildren: x,
    } = t
    if (null == e) {
      const e = (t.el = v('')),
        c = (t.anchor = v(''))
      p(e, n, o), p(c, n, o)
      const d = (t.target = ho(t.props, h)),
        f = (t.targetAnchor = v(''))
      d && (p(f, d), (a = a || po(d)))
      const g = (e, t) => {
        16 & m && u(y, e, t, r, i, a, l, s)
      }
      b ? g(n, c) : d && g(d, f)
    } else {
      t.el = e.el
      const o = (t.anchor = e.anchor),
        u = (t.target = e.target),
        p = (t.targetAnchor = e.targetAnchor),
        v = fo(e.props),
        g = v ? n : u,
        m = v ? o : p
      if (
        ((a = a || po(u)),
        x
          ? (f(e.dynamicChildren, x, g, r, i, a, l),
            uo(e, t, !0))
          : s || d(e, t, g, m, r, i, a, l, !1),
        b)
      )
        v || vo(t, n, o, c, 1)
      else if (
        (t.props && t.props.to) !== (e.props && e.props.to)
      ) {
        const e = (t.target = ho(t.props, h))
        e && vo(t, e, null, c, 0)
      } else v && vo(t, u, p, c, 1)
    }
  },
  remove(e, t, n, o, { um: r, o: { remove: i } }, a) {
    const {
      shapeFlag: l,
      children: s,
      anchor: c,
      targetAnchor: u,
      target: d,
      props: f,
    } = e
    if ((d && i(u), (a || !fo(f)) && (i(c), 16 & l)))
      for (let p = 0; p < s.length; p++) {
        const e = s[p]
        r(e, t, n, !0, !!e.dynamicChildren)
      }
  },
  move: vo,
  hydrate: function (
    e,
    t,
    n,
    o,
    r,
    i,
    {
      o: {
        nextSibling: a,
        parentNode: l,
        querySelector: s,
      },
    },
    c
  ) {
    const u = (t.target = ho(t.props, s))
    if (u) {
      const s = u._lpa || u.firstChild
      16 & t.shapeFlag &&
        (fo(t.props)
          ? ((t.anchor = c(a(e), t, l(e), n, o, r, i)),
            (t.targetAnchor = s))
          : ((t.anchor = a(e)),
            (t.targetAnchor = c(s, t, u, n, o, r, i))),
        (u._lpa = t.targetAnchor && a(t.targetAnchor)))
    }
    return t.anchor && a(t.anchor)
  },
}
function bo(e, t) {
  return xo('components', e, !0, t) || e
}
const mo = Symbol()
function yo(e) {
  return $(e) ? xo('components', e, !1) || e : e || mo
}
function xo(e, t, n = !0, o = !1) {
  const r = Lt || er
  if (r) {
    const n = r.type
    if ('components' === e) {
      const e = cr(n)
      if (e && (e === t || e === R(t) || e === I(R(t))))
        return n
    }
    const i = wo(r[e] || n[e], t) || wo(r.appContext[e], t)
    return !i && o ? n : i
  }
}
function wo(e, t) {
  return e && (e[t] || e[R(t)] || e[I(R(t))])
}
const Co = Symbol(void 0),
  So = Symbol(void 0),
  ko = Symbol(void 0),
  $o = Symbol(void 0),
  _o = []
let zo = null
function Po(e = !1) {
  _o.push((zo = e ? null : []))
}
let Eo = 1
function Oo(e) {
  Eo += e
}
function jo(e, t, n, o, r) {
  const i = Bo(e, t, n, o, r, !0)
  return (
    (i.dynamicChildren = Eo > 0 ? zo || d : null),
    _o.pop(),
    (zo = _o[_o.length - 1] || null),
    Eo > 0 && zo && zo.push(i),
    i
  )
}
function To(e) {
  return !!e && !0 === e.__v_isVNode
}
function Ao(e, t) {
  return e.type === t.type && e.key === t.key
}
const Mo = '__vInternal',
  Fo = ({ key: e }) => (null != e ? e : null),
  Ro = ({ ref: e }) =>
    null != e
      ? $(e) || tt(e) || k(e)
        ? { i: Lt, r: e }
        : e
      : null,
  Bo = function (
    e,
    t = null,
    n = null,
    r = 0,
    i = null,
    a = !1
  ) {
    ;(e && e !== mo) || (e = ko)
    if (To(e)) {
      const o = Lo(e, t, !0)
      return n && Wo(o, n), o
    }
    ;(s = e), k(s) && '__vccOpts' in s && (e = e.__vccOpts)
    var s
    if (t) {
      ;(Ze(t) || Mo in t) && (t = b({}, t))
      let { class: e, style: n } = t
      e && !$(e) && (t.class = l(e)),
        z(n) &&
          (Ze(n) && !w(n) && (n = b({}, n)),
          (t.style = o(n)))
    }
    const c = $(e)
        ? 1
        : ((e) => e.__isSuspense)(e)
        ? 128
        : ((e) => e.__isTeleport)(e)
        ? 64
        : z(e)
        ? 4
        : k(e)
        ? 2
        : 0,
      u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Fo(t),
        ref: t && Ro(t),
        scopeId: It,
        slotScopeIds: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        shapeFlag: c,
        patchFlag: r,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
      }
    Wo(u, n), 128 & c && e.normalize(u)
    Eo > 0 &&
      !a &&
      zo &&
      (r > 0 || 6 & c) &&
      32 !== r &&
      zo.push(u)
    return u
  }
function Lo(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: a } = e,
    l = t ? Vo(o || {}, t) : o
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Fo(l),
    ref:
      t && t.ref
        ? n && r
          ? w(r)
            ? r.concat(Ro(t))
            : [r, Ro(t)]
          : Ro(t)
        : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    staticCache: e.staticCache,
    shapeFlag: e.shapeFlag,
    patchFlag:
      t && e.type !== Co ? (-1 === i ? 16 : 16 | i) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Lo(e.ssContent),
    ssFallback: e.ssFallback && Lo(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  }
}
function Io(e = ' ', t = 0) {
  return Bo(So, null, e, t)
}
function Do(e = '', t = !1) {
  return t ? (Po(), jo(ko, null, e)) : Bo(ko, null, e)
}
function Ho(e) {
  return null == e || 'boolean' == typeof e
    ? Bo(ko)
    : w(e)
    ? Bo(Co, null, e.slice())
    : 'object' == typeof e
    ? No(e)
    : Bo(So, null, String(e))
}
function No(e) {
  return null === e.el ? e : Lo(e)
}
function Wo(e, t) {
  let n = 0
  const { shapeFlag: o } = e
  if (null == t) t = null
  else if (w(t)) n = 16
  else if ('object' == typeof t) {
    if (1 & o || 64 & o) {
      const n = t.default
      return void (
        n &&
        (n._c && (n._d = !1),
        Wo(e, n()),
        n._c && (n._d = !0))
      )
    }
    {
      n = 32
      const o = t._
      o || Mo in t
        ? 3 === o &&
          Lt &&
          (1 === Lt.slots._
            ? (t._ = 1)
            : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = Lt)
    }
  } else
    k(t)
      ? ((t = { default: t, _ctx: Lt }), (n = 32))
      : ((t = String(t)),
        64 & o ? ((n = 16), (t = [Io(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Vo(...e) {
  const t = b({}, e[0])
  for (let n = 1; n < e.length; n++) {
    const r = e[n]
    for (const e in r)
      if ('class' === e)
        t.class !== r.class &&
          (t.class = l([t.class, r.class]))
      else if ('style' === e)
        t.style = o([t.style, r.style])
      else if (v(e)) {
        const n = t[e],
          o = r[e]
        n !== o && (t[e] = n ? [].concat(n, o) : o)
      } else '' !== e && (t[e] = r[e])
  }
  return t
}
function qo(e, t) {
  let n
  if (w(e) || $(e)) {
    n = new Array(e.length)
    for (let o = 0, r = e.length; o < r; o++)
      n[o] = t(e[o], o)
  } else if ('number' == typeof e) {
    n = new Array(e)
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o)
  } else if (z(e))
    if (e[Symbol.iterator]) n = Array.from(e, t)
    else {
      const o = Object.keys(e)
      n = new Array(o.length)
      for (let r = 0, i = o.length; r < i; r++) {
        const i = o[r]
        n[r] = t(e[i], i, r)
      }
    }
  else n = []
  return n
}
function Uo(e, t, n = {}, o, r) {
  let i = e[t]
  i && i._c && (i._d = !1), Po()
  const a = i && Go(i(n)),
    l = jo(
      Co,
      { key: n.key || `_${t}` },
      a || (o ? o() : []),
      a && 1 === e._ ? 64 : -2
    )
  return (
    !r &&
      l.scopeId &&
      (l.slotScopeIds = [l.scopeId + '-s']),
    i && i._c && (i._d = !0),
    l
  )
}
function Go(e) {
  return e.some(
    (e) =>
      !To(e) ||
      (e.type !== ko && !(e.type === Co && !Go(e.children)))
  )
    ? e
    : null
}
const Ko = (e) =>
    e ? (or(e) ? lr(e) || e.proxy : Ko(e.parent)) : null,
  Yo = b(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ko(e.parent),
    $root: (e) => Ko(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Mn(e),
    $forceUpdate: (e) => () => Pt(e.update),
    $nextTick: (e) => zt.bind(e.proxy),
    $watch: (e) => Jt.bind(e),
  }),
  Xo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: i,
        accessCache: a,
        type: l,
        appContext: s,
      } = e
      let c
      if ('$' !== t[0]) {
        const l = a[t]
        if (void 0 !== l)
          switch (l) {
            case 0:
              return o[t]
            case 1:
              return r[t]
            case 3:
              return n[t]
            case 2:
              return i[t]
          }
        else {
          if (o !== u && x(o, t)) return (a[t] = 0), o[t]
          if (r !== u && x(r, t)) return (a[t] = 1), r[t]
          if ((c = e.propsOptions[0]) && x(c, t))
            return (a[t] = 2), i[t]
          if (n !== u && x(n, t)) return (a[t] = 3), n[t]
          On && (a[t] = 4)
        }
      }
      const d = Yo[t]
      let f, p
      return d
        ? ('$attrs' === t && re(e, 0, t), d(e))
        : (f = l.__cssModules) && (f = f[t])
        ? f
        : n !== u && x(n, t)
        ? ((a[t] = 3), n[t])
        : ((p = s.config.globalProperties),
          x(p, t) ? p[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: i } = e
      if (r !== u && x(r, t)) r[t] = n
      else if (o !== u && x(o, t)) o[t] = n
      else if (x(e.props, t)) return !1
      return (
        ('$' !== t[0] || !(t.slice(1) in e)) &&
        ((i[t] = n), !0)
      )
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: i,
        },
      },
      a
    ) {
      let l
      return (
        void 0 !== n[a] ||
        (e !== u && x(e, a)) ||
        (t !== u && x(t, a)) ||
        ((l = i[0]) && x(l, a)) ||
        x(o, a) ||
        x(Yo, a) ||
        x(r.config.globalProperties, a)
      )
    },
  },
  Zo = b({}, Xo, {
    get(e, t) {
      if (t !== Symbol.unscopables) return Xo.get(e, t, e)
    },
    has: (e, n) => '_' !== n[0] && !t(n),
  }),
  Jo = no()
let Qo = 0
let er = null
const tr = () => er || Lt,
  nr = (e) => {
    er = e
  }
function or(e) {
  return 4 & e.vnode.shapeFlag
}
let rr = !1
function ir(e, t, n) {
  k(t) ? (e.render = t) : z(t) && (e.setupState = lt(t)),
    ar(e)
}
function ar(e, t, n) {
  const o = e.type
  e.render ||
    ((e.render = o.render || f),
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Zo))),
    (er = e),
    ne(),
    jn(e),
    oe(),
    (er = null)
}
function lr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(lt(Qe(e.exposed)), {
        get: (t, n) =>
          n in t ? t[n] : n in Yo ? Yo[n](e) : void 0,
      }))
    )
}
function sr(e, t = er) {
  t && (t.effects || (t.effects = [])).push(e)
}
function cr(e) {
  return (k(e) && e.displayName) || e.name
}
function ur(e) {
  const t = (function (e) {
    let t, n
    return (
      k(e)
        ? ((t = e), (n = f))
        : ((t = e.get), (n = e.set)),
      new ut(t, n, k(e) || !e.set)
    )
  })(e)
  return sr(t.effect), t
}
function dr(e, t, n) {
  const o = arguments.length
  return 2 === o
    ? z(t) && !w(t)
      ? To(t)
        ? Bo(e, null, [t])
        : Bo(e, t)
      : Bo(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && To(n) && (n = [n]),
      Bo(e, t, n))
}
const fr = '3.1.4',
  pr = 'http://www.w3.org/2000/svg',
  hr = 'undefined' != typeof document ? document : null,
  vr = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, o) => {
      const r = t
        ? hr.createElementNS(pr, e)
        : hr.createElement(e, n ? { is: n } : void 0)
      return (
        'select' === e &&
          o &&
          null != o.multiple &&
          r.setAttribute('multiple', o.multiple),
        r
      )
    },
    createText: (e) => hr.createTextNode(e),
    createComment: (e) => hr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => hr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    cloneNode(e) {
      const t = e.cloneNode(!0)
      return '_value' in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, n, o, r) {
      if (r) {
        let e,
          o,
          i = 0,
          a = r.length
        for (; i < a; i++) {
          const l = r[i].cloneNode(!0)
          0 === i && (e = l),
            i === a - 1 && (o = l),
            t.insertBefore(l, n)
        }
        return [e, o]
      }
      const i = n ? n.previousSibling : t.lastChild
      if (n) {
        let r,
          i = !1
        n instanceof Element
          ? (r = n)
          : ((i = !0),
            (r = o
              ? hr.createElementNS(pr, 'g')
              : hr.createElement('div')),
            t.insertBefore(r, n)),
          r.insertAdjacentHTML('beforebegin', e),
          i && t.removeChild(r)
      } else t.insertAdjacentHTML('beforeend', e)
      let a = i ? i.nextSibling : t.firstChild
      const l = n ? n.previousSibling : t.lastChild,
        s = []
      for (; a && (s.push(a), a !== l); ) a = a.nextSibling
      return s
    },
  }
const gr = /\s*!important$/
function br(e, t, n) {
  if (w(n)) n.forEach((n) => br(e, t, n))
  else if (t.startsWith('--')) e.setProperty(t, n)
  else {
    const o = (function (e, t) {
      const n = yr[t]
      if (n) return n
      let o = R(t)
      if ('filter' !== o && o in e) return (yr[t] = o)
      o = I(o)
      for (let r = 0; r < mr.length; r++) {
        const n = mr[r] + o
        if (n in e) return (yr[t] = n)
      }
      return t
    })(e, t)
    gr.test(n)
      ? e.setProperty(L(o), n.replace(gr, ''), 'important')
      : (e[o] = n)
  }
}
const mr = ['Webkit', 'Moz', 'ms'],
  yr = {}
const xr = 'http://www.w3.org/1999/xlink'
let wr = Date.now,
  Cr = !1
if ('undefined' != typeof window) {
  wr() > document.createEvent('Event').timeStamp &&
    (wr = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  Cr = !!(e && Number(e[1]) <= 53)
}
let Sr = 0
const kr = Promise.resolve(),
  $r = () => {
    Sr = 0
  }
function _r(e, t, n, o, r = null) {
  const i = e._vei || (e._vei = {}),
    a = i[t]
  if (o && a) a.value = o
  else {
    const [n, l] = (function (e) {
      let t
      if (zr.test(e)) {
        let n
        for (t = {}; (n = e.match(zr)); )
          (e = e.slice(0, e.length - n[0].length)),
            (t[n[0].toLowerCase()] = !0)
      }
      return [L(e.slice(2)), t]
    })(t)
    if (o) {
      !(function (e, t, n, o) {
        e.addEventListener(t, n, o)
      })(
        e,
        n,
        (i[t] = (function (e, t) {
          const n = (e) => {
            const o = e.timeStamp || wr()
            ;(Cr || o >= n.attached - 1) &&
              ft(
                (function (e, t) {
                  if (w(t)) {
                    const n = e.stopImmediatePropagation
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0)
                      }),
                      t.map(
                        (e) => (t) => !t._stopped && e(t)
                      )
                    )
                  }
                  return t
                })(e, n.value),
                t,
                5,
                [e]
              )
          }
          return (
            (n.value = e),
            (n.attached = (() =>
              Sr || (kr.then($r), (Sr = wr())))()),
            n
          )
        })(o, r)),
        l
      )
    } else
      a &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o)
        })(e, n, a, l),
        (i[t] = void 0))
  }
}
const zr = /(?:Once|Passive|Capture)$/
const Pr = /^on[a-z]/
const Er = (e, { slots: t }) => dr(on, Mr(e), t)
Er.displayName = 'Transition'
const Or = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  jr = (Er.props = b({}, on.props, Or)),
  Tr = (e, t = []) => {
    w(e) ? e.forEach((e) => e(...t)) : e && e(...t)
  },
  Ar = (e) =>
    !!e &&
    (w(e) ? e.some((e) => e.length > 1) : e.length > 1)
function Mr(e) {
  const t = {}
  for (const b in e) b in Or || (t[b] = e[b])
  if (!1 === e.css) return t
  const {
      name: n = 'v',
      type: o,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: a = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: s = i,
      appearActiveClass: c = a,
      appearToClass: u = l,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: f = `${n}-leave-active`,
      leaveToClass: p = `${n}-leave-to`,
    } = e,
    h = (function (e) {
      if (null == e) return null
      if (z(e)) return [Fr(e.enter), Fr(e.leave)]
      {
        const t = Fr(e)
        return [t, t]
      }
    })(r),
    v = h && h[0],
    g = h && h[1],
    {
      onBeforeEnter: m,
      onEnter: y,
      onEnterCancelled: x,
      onLeave: w,
      onLeaveCancelled: C,
      onBeforeAppear: S = m,
      onAppear: k = y,
      onAppearCancelled: $ = x,
    } = t,
    _ = (e, t, n) => {
      Br(e, t ? u : l), Br(e, t ? c : a), n && n()
    },
    P = (e, t) => {
      Br(e, p), Br(e, f), t && t()
    },
    E = (e) => (t, n) => {
      const r = e ? k : y,
        a = () => _(t, e, n)
      Tr(r, [t, a]),
        Lr(() => {
          Br(t, e ? s : i),
            Rr(t, e ? u : l),
            Ar(r) || Dr(t, o, v, a)
        })
    }
  return b(t, {
    onBeforeEnter(e) {
      Tr(m, [e]), Rr(e, i), Rr(e, a)
    },
    onBeforeAppear(e) {
      Tr(S, [e]), Rr(e, s), Rr(e, c)
    },
    onEnter: E(!1),
    onAppear: E(!0),
    onLeave(e, t) {
      const n = () => P(e, t)
      Rr(e, d),
        Vr(),
        Rr(e, f),
        Lr(() => {
          Br(e, d), Rr(e, p), Ar(w) || Dr(e, o, g, n)
        }),
        Tr(w, [e, n])
    },
    onEnterCancelled(e) {
      _(e, !1), Tr(x, [e])
    },
    onAppearCancelled(e) {
      _(e, !0), Tr($, [e])
    },
    onLeaveCancelled(e) {
      P(e), Tr(C, [e])
    },
  })
}
function Fr(e) {
  return V(e)
}
function Rr(e, t) {
  t.split(/\s+/).forEach((t) => t && e.classList.add(t)),
    (e._vtc || (e._vtc = new Set())).add(t)
}
function Br(e, t) {
  t.split(/\s+/).forEach((t) => t && e.classList.remove(t))
  const { _vtc: n } = e
  n && (n.delete(t), n.size || (e._vtc = void 0))
}
function Lr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let Ir = 0
function Dr(e, t, n, o) {
  const r = (e._endId = ++Ir),
    i = () => {
      r === e._endId && o()
    }
  if (n) return setTimeout(i, n)
  const { type: a, timeout: l, propCount: s } = Hr(e, t)
  if (!a) return o()
  const c = a + 'end'
  let u = 0
  const d = () => {
      e.removeEventListener(c, f), i()
    },
    f = (t) => {
      t.target === e && ++u >= s && d()
    }
  setTimeout(() => {
    u < s && d()
  }, l + 1),
    e.addEventListener(c, f)
}
function Hr(e, t) {
  const n = window.getComputedStyle(e),
    o = (e) => (n[e] || '').split(', '),
    r = o('transitionDelay'),
    i = o('transitionDuration'),
    a = Nr(r, i),
    l = o('animationDelay'),
    s = o('animationDuration'),
    c = Nr(l, s)
  let u = null,
    d = 0,
    f = 0
  'transition' === t
    ? a > 0 && ((u = 'transition'), (d = a), (f = i.length))
    : 'animation' === t
    ? c > 0 && ((u = 'animation'), (d = c), (f = s.length))
    : ((d = Math.max(a, c)),
      (u =
        d > 0
          ? a > c
            ? 'transition'
            : 'animation'
          : null),
      (f = u
        ? 'transition' === u
          ? i.length
          : s.length
        : 0))
  return {
    type: u,
    timeout: d,
    propCount: f,
    hasTransform:
      'transition' === u &&
      /\b(transform|all)(,|$)/.test(n.transitionProperty),
  }
}
function Nr(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((t, n) => Wr(t) + Wr(e[n])))
}
function Wr(e) {
  return 1e3 * Number(e.slice(0, -1).replace(',', '.'))
}
function Vr() {
  return document.body.offsetHeight
}
const qr = new WeakMap(),
  Ur = new WeakMap(),
  Gr = {
    name: 'TransitionGroup',
    props: b({}, jr, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = tr(),
        o = tn()
      let r, i
      return (
        Sn(() => {
          if (!r.length) return
          const t = e.moveClass || `${e.name || 'v'}-move`
          if (
            !(function (e, t, n) {
              const o = e.cloneNode()
              e._vtc &&
                e._vtc.forEach((e) => {
                  e.split(/\s+/).forEach(
                    (e) => e && o.classList.remove(e)
                  )
                })
              n
                .split(/\s+/)
                .forEach((e) => e && o.classList.add(e)),
                (o.style.display = 'none')
              const r = 1 === t.nodeType ? t : t.parentNode
              r.appendChild(o)
              const { hasTransform: i } = Hr(o)
              return r.removeChild(o), i
            })(r[0].el, n.vnode.el, t)
          )
            return
          r.forEach(Kr), r.forEach(Yr)
          const o = r.filter(Xr)
          Vr(),
            o.forEach((e) => {
              const n = e.el,
                o = n.style
              Rr(n, t),
                (o.transform =
                  o.webkitTransform =
                  o.transitionDuration =
                    '')
              const r = (n._moveCb = (e) => {
                ;(e && e.target !== n) ||
                  (e &&
                    !/transform$/.test(e.propertyName)) ||
                  (n.removeEventListener(
                    'transitionend',
                    r
                  ),
                  (n._moveCb = null),
                  Br(n, t))
              })
              n.addEventListener('transitionend', r)
            })
        }),
        () => {
          const a = Je(e),
            l = Mr(a)
          let s = a.tag || Co
          ;(r = i), (i = t.default ? un(t.default()) : [])
          for (let e = 0; e < i.length; e++) {
            const t = i[e]
            null != t.key && cn(t, an(t, l, o, n))
          }
          if (r)
            for (let e = 0; e < r.length; e++) {
              const t = r[e]
              cn(t, an(t, l, o, n)),
                qr.set(t, t.el.getBoundingClientRect())
            }
          return Bo(s, null, i)
        }
      )
    },
  }
function Kr(e) {
  const t = e.el
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb()
}
function Yr(e) {
  Ur.set(e, e.el.getBoundingClientRect())
}
function Xr(e) {
  const t = qr.get(e),
    n = Ur.get(e),
    o = t.left - n.left,
    r = t.top - n.top
  if (o || r) {
    const t = e.el.style
    return (
      (t.transform = t.webkitTransform =
        `translate(${o}px,${r}px)`),
      (t.transitionDuration = '0s'),
      e
    )
  }
}
const Zr = {
  beforeMount(e, { value: t }, { transition: n }) {
    ;(e._vod =
      'none' === e.style.display ? '' : e.style.display),
      n && t ? n.beforeEnter(e) : Jr(e, t)
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e)
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n &&
      (o
        ? t
          ? (o.beforeEnter(e), Jr(e, !0), o.enter(e))
          : o.leave(e, () => {
              Jr(e, !1)
            })
        : Jr(e, t))
  },
  beforeUnmount(e, { value: t }) {
    Jr(e, t)
  },
}
function Jr(e, t) {
  e.style.display = t ? e._vod : 'none'
}
const Qr = b(
  {
    patchProp: (e, t, o, r, i = !1, a, l, s, c) => {
      switch (t) {
        case 'class':
          !(function (e, t, n) {
            if ((null == t && (t = ''), n))
              e.setAttribute('class', t)
            else {
              const n = e._vtc
              n && (t = (t ? [t, ...n] : [...n]).join(' ')),
                (e.className = t)
            }
          })(e, r, i)
          break
        case 'style':
          !(function (e, t, n) {
            const o = e.style
            if (n)
              if ($(n)) {
                if (t !== n) {
                  const t = o.display
                  ;(o.cssText = n),
                    '_vod' in e && (o.display = t)
                }
              } else {
                for (const e in n) br(o, e, n[e])
                if (t && !$(t))
                  for (const e in t)
                    null == n[e] && br(o, e, '')
              }
            else e.removeAttribute('style')
          })(e, o, r)
          break
        default:
          v(t)
            ? g(t) || _r(e, t, 0, r, l)
            : (function (e, t, n, o) {
                if (o)
                  return (
                    'innerHTML' === t ||
                    !!(t in e && Pr.test(t) && k(n))
                  )
                if ('spellcheck' === t || 'draggable' === t)
                  return !1
                if ('form' === t) return !1
                if ('list' === t && 'INPUT' === e.tagName)
                  return !1
                if (
                  'type' === t &&
                  'TEXTAREA' === e.tagName
                )
                  return !1
                if (Pr.test(t) && $(n)) return !1
                return t in e
              })(e, t, r, i)
            ? (function (e, t, n, o, r, i, a) {
                if (
                  'innerHTML' === t ||
                  'textContent' === t
                )
                  return (
                    o && a(o, r, i),
                    void (e[t] = null == n ? '' : n)
                  )
                if (
                  'value' === t &&
                  'PROGRESS' !== e.tagName
                ) {
                  e._value = n
                  const o = null == n ? '' : n
                  return (
                    e.value !== o && (e.value = o),
                    void (null == n && e.removeAttribute(t))
                  )
                }
                if ('' === n || null == n) {
                  const o = typeof e[t]
                  if ('' === n && 'boolean' === o)
                    return void (e[t] = !0)
                  if (null == n && 'string' === o)
                    return (
                      (e[t] = ''), void e.removeAttribute(t)
                    )
                  if ('number' === o)
                    return (
                      (e[t] = 0), void e.removeAttribute(t)
                    )
                }
                try {
                  e[t] = n
                } catch (l) {}
              })(e, t, r, a, l, s, c)
            : ('true-value' === t
                ? (e._trueValue = r)
                : 'false-value' === t &&
                  (e._falseValue = r),
              (function (e, t, o, r, i) {
                if (r && t.startsWith('xlink:'))
                  null == o
                    ? e.removeAttributeNS(
                        xr,
                        t.slice(6, t.length)
                      )
                    : e.setAttributeNS(xr, t, o)
                else {
                  const r = n(t)
                  null == o || (r && !1 === o)
                    ? e.removeAttribute(t)
                    : e.setAttribute(t, r ? '' : o)
                }
              })(e, t, r, i))
      }
    },
    forcePatchProp: (e, t) => 'value' === t,
  },
  vr
)
let ei
const ti = (...e) => {
  const t = (ei || (ei = so(Qr))).createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (e) => {
      const o = (function (e) {
        if ($(e)) {
          return document.querySelector(e)
        }
        return e
      })(
        /*!
         * vue-router v4.0.10
         * (c) 2021 Eduardo San Martin Morote
         * @license MIT
         */ e
      )
      if (!o) return
      const r = t._component
      k(r) ||
        r.render ||
        r.template ||
        (r.template = o.innerHTML),
        (o.innerHTML = '')
      const i = n(o, !1, o instanceof SVGElement)
      return (
        o instanceof Element &&
          (o.removeAttribute('v-cloak'),
          o.setAttribute('data-v-app', '')),
        i
      )
    }),
    t
  )
}
const ni =
    'function' == typeof Symbol &&
    'symbol' == typeof Symbol.toStringTag,
  oi = (e) => (ni ? Symbol(e) : '_vr_' + e),
  ri = oi('rvlm'),
  ii = oi('rvd'),
  ai = oi('r'),
  li = oi('rl'),
  si = oi('rvl'),
  ci = 'undefined' != typeof window
const ui = Object.assign
function di(e, t) {
  const n = {}
  for (const o in t) {
    const r = t[o]
    n[o] = Array.isArray(r) ? r.map(e) : e(r)
  }
  return n
}
let fi = () => {}
const pi = /\/$/
function hi(e, t, n = '/') {
  let o,
    r = {},
    i = '',
    a = ''
  const l = t.indexOf('?'),
    s = t.indexOf('#', l > -1 ? l : 0)
  return (
    l > -1 &&
      ((o = t.slice(0, l)),
      (i = t.slice(l + 1, s > -1 ? s : t.length)),
      (r = e(i))),
    s > -1 &&
      ((o = o || t.slice(0, s)),
      (a = t.slice(s, t.length))),
    (o = (function (e, t) {
      if (e.startsWith('/')) return e
      if (!e) return t
      const n = t.split('/'),
        o = e.split('/')
      let r,
        i,
        a = n.length - 1
      for (r = 0; r < o.length; r++)
        if (((i = o[r]), 1 !== a && '.' !== i)) {
          if ('..' !== i) break
          a--
        }
      return (
        n.slice(0, a).join('/') +
        '/' +
        o.slice(r - (r === o.length ? 1 : 0)).join('/')
      )
    })(null != o ? o : t, n)),
    {
      fullPath: o + (i && '?') + i + a,
      path: o,
      query: r,
      hash: a,
    }
  )
}
function vi(e, t) {
  return t && e.toLowerCase().startsWith(t.toLowerCase())
    ? e.slice(t.length) || '/'
    : e
}
function gi(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function bi(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1
  for (let n in e) if (!mi(e[n], t[n])) return !1
  return !0
}
function mi(e, t) {
  return Array.isArray(e)
    ? yi(e, t)
    : Array.isArray(t)
    ? yi(t, e)
    : e === t
}
function yi(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((e, n) => e === t[n])
    : 1 === e.length && e[0] === t
}
var xi, wi, Ci, Si
function ki(e) {
  if (!e)
    if (ci) {
      const t = document.querySelector('base')
      e = (e =
        (t && t.getAttribute('href')) || '/').replace(
        /^\w+:\/\/[^\/]+/,
        ''
      )
    } else e = '/'
  return (
    '/' !== e[0] && '#' !== e[0] && (e = '/' + e),
    e.replace(pi, '')
  )
}
;((wi = xi || (xi = {})).pop = 'pop'),
  (wi.push = 'push'),
  ((Si = Ci || (Ci = {})).back = 'back'),
  (Si.forward = 'forward'),
  (Si.unknown = '')
const $i = /^[^#]+#/
function _i(e, t) {
  return e.replace($i, '#') + t
}
const zi = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
})
function Pi(e) {
  let t
  if ('el' in e) {
    let n = e.el
    const o = 'string' == typeof n && n.startsWith('#'),
      r =
        'string' == typeof n
          ? o
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!r) return
    t = (function (e, t) {
      const n =
          document.documentElement.getBoundingClientRect(),
        o = e.getBoundingClientRect()
      return {
        behavior: t.behavior,
        left: o.left - n.left - (t.left || 0),
        top: o.top - n.top - (t.top || 0),
      }
    })(r, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        null != t.left ? t.left : window.pageXOffset,
        null != t.top ? t.top : window.pageYOffset
      )
}
function Ei(e, t) {
  return (
    (history.state ? history.state.position - t : -1) + e
  )
}
const Oi = new Map()
function ji(e, t) {
  const { pathname: n, search: o, hash: r } = t,
    i = e.indexOf('#')
  if (i > -1) {
    let t = r.includes(e.slice(i)) ? e.slice(i).length : 1,
      n = r.slice(t)
    return '/' !== n[0] && (n = '/' + n), vi(n, '')
  }
  return vi(n, e) + o + r
}
function Ti(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? zi() : null,
  }
}
function Ai(e) {
  const { history: t, location: n } = window
  let o = { value: ji(e, n) },
    r = { value: t.state }
  function i(o, i, a) {
    const l = e.indexOf('#'),
      s =
        l > -1
          ? (n.host && document.querySelector('base')
              ? e
              : e.slice(l)) + o
          : location.protocol + '//' + location.host + e + o
    try {
      t[a ? 'replaceState' : 'pushState'](i, '', s),
        (r.value = i)
    } catch (c) {
      console.error(c), n[a ? 'replace' : 'assign'](s)
    }
  }
  return (
    r.value ||
      i(
        o.value,
        {
          back: null,
          current: o.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0
      ),
    {
      location: o,
      state: r,
      push: function (e, n) {
        const a = ui({}, r.value, t.state, {
          forward: e,
          scroll: zi(),
        })
        i(a.current, a, !0),
          i(
            e,
            ui(
              {},
              Ti(o.value, e, null),
              { position: a.position + 1 },
              n
            ),
            !1
          ),
          (o.value = e)
      },
      replace: function (e, n) {
        i(
          e,
          ui(
            {},
            t.state,
            Ti(r.value.back, e, r.value.forward, !0),
            n,
            { position: r.value.position }
          ),
          !0
        ),
          (o.value = e)
      },
    }
  )
}
function Mi(e) {
  const t = Ai((e = ki(e))),
    n = (function (e, t, n, o) {
      let r = [],
        i = [],
        a = null
      const l = ({ state: i }) => {
        const l = ji(e, location),
          s = n.value,
          c = t.value
        let u = 0
        if (i) {
          if (((n.value = l), (t.value = i), a && a === s))
            return void (a = null)
          u = c ? i.position - c.position : 0
        } else o(l)
        r.forEach((e) => {
          e(n.value, s, {
            delta: u,
            type: xi.pop,
            direction: u
              ? u > 0
                ? Ci.forward
                : Ci.back
              : Ci.unknown,
          })
        })
      }
      function s() {
        const { history: e } = window
        e.state &&
          e.replaceState(
            ui({}, e.state, { scroll: zi() }),
            ''
          )
      }
      return (
        window.addEventListener('popstate', l),
        window.addEventListener('beforeunload', s),
        {
          pauseListeners: function () {
            a = n.value
          },
          listen: function (e) {
            r.push(e)
            const t = () => {
              const t = r.indexOf(e)
              t > -1 && r.splice(t, 1)
            }
            return i.push(t), t
          },
          destroy: function () {
            for (const e of i) e()
            ;(i = []),
              window.removeEventListener('popstate', l),
              window.removeEventListener('beforeunload', s)
          },
        }
      )
    })(e, t.state, t.location, t.replace)
  const o = ui(
    {
      location: '',
      base: e,
      go: function (e, t = !0) {
        t || n.pauseListeners(), history.go(e)
      },
      createHref: _i.bind(null, e),
    },
    t,
    n
  )
  return (
    Object.defineProperty(o, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  )
}
function Fi(e) {
  return (
    (e = location.host
      ? e || location.pathname + location.search
      : '').includes('#') || (e += '#'),
    Mi(e)
  )
}
function Ri(e) {
  return 'string' == typeof e || 'symbol' == typeof e
}
const Bi = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Li = oi('nf')
var Ii, Di
function Hi(e, t) {
  return ui(new Error(), { type: e, [Li]: !0 }, t)
}
function Ni(e, t) {
  return (
    e instanceof Error &&
    Li in e &&
    (null == t || !!(e.type & t))
  )
}
;((Di = Ii || (Ii = {}))[(Di.aborted = 4)] = 'aborted'),
  (Di[(Di.cancelled = 8)] = 'cancelled'),
  (Di[(Di.duplicated = 16)] = 'duplicated')
const Wi = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0,
  },
  Vi = /[.+*?^${}()[\]/\\]/g
function qi(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n]
    if (o) return o
    n++
  }
  return e.length < t.length
    ? 1 === e.length && 80 === e[0]
      ? -1
      : 1
    : e.length > t.length
    ? 1 === t.length && 80 === t[0]
      ? 1
      : -1
    : 0
}
function Ui(e, t) {
  let n = 0
  const o = e.score,
    r = t.score
  for (; n < o.length && n < r.length; ) {
    const e = qi(o[n], r[n])
    if (e) return e
    n++
  }
  return r.length - o.length
}
const Gi = { type: 0, value: '' },
  Ki = /[a-zA-Z0-9_]/
function Yi(e, t, n) {
  const o = (function (e, t) {
      const n = ui({}, Wi, t)
      let o = [],
        r = n.start ? '^' : ''
      const i = []
      for (const s of e) {
        const e = s.length ? [] : [90]
        n.strict && !s.length && (r += '/')
        for (let t = 0; t < s.length; t++) {
          const o = s[t]
          let a = 40 + (n.sensitive ? 0.25 : 0)
          if (0 === o.type)
            t || (r += '/'),
              (r += o.value.replace(Vi, '\\$&')),
              (a += 40)
          else if (1 === o.type) {
            const {
              value: e,
              repeatable: n,
              optional: c,
              regexp: u,
            } = o
            i.push({ name: e, repeatable: n, optional: c })
            const d = u || '[^/]+?'
            if ('[^/]+?' !== d) {
              a += 10
              try {
                new RegExp(`(${d})`)
              } catch (l) {
                throw new Error(
                  `Invalid custom RegExp for param "${e}" (${d}): ` +
                    l.message
                )
              }
            }
            let f = n
              ? `((?:${d})(?:/(?:${d}))*)`
              : `(${d})`
            t ||
              (f =
                c && s.length < 2 ? `(?:/${f})` : '/' + f),
              c && (f += '?'),
              (r += f),
              (a += 20),
              c && (a += -8),
              n && (a += -20),
              '.*' === d && (a += -50)
          }
          e.push(a)
        }
        o.push(e)
      }
      if (n.strict && n.end) {
        const e = o.length - 1
        o[e][o[e].length - 1] += 0.7000000000000001
      }
      n.strict || (r += '/?'),
        n.end ? (r += '$') : n.strict && (r += '(?:/|$)')
      const a = new RegExp(r, n.sensitive ? '' : 'i')
      return {
        re: a,
        score: o,
        keys: i,
        parse: function (e) {
          const t = e.match(a),
            n = {}
          if (!t) return null
          for (let o = 1; o < t.length; o++) {
            const e = t[o] || '',
              r = i[o - 1]
            n[r.name] = e && r.repeatable ? e.split('/') : e
          }
          return n
        },
        stringify: function (t) {
          let n = '',
            o = !1
          for (const r of e) {
            ;(o && n.endsWith('/')) || (n += '/'), (o = !1)
            for (const e of r)
              if (0 === e.type) n += e.value
              else if (1 === e.type) {
                const {
                    value: i,
                    repeatable: a,
                    optional: l,
                  } = e,
                  s = i in t ? t[i] : ''
                if (Array.isArray(s) && !a)
                  throw new Error(
                    `Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`
                  )
                const c = Array.isArray(s) ? s.join('/') : s
                if (!c) {
                  if (!l)
                    throw new Error(
                      `Missing required param "${i}"`
                    )
                  r.length < 2 &&
                    (n.endsWith('/')
                      ? (n = n.slice(0, -1))
                      : (o = !0))
                }
                n += c
              }
          }
          return n
        },
      }
    })(
      (function (e) {
        if (!e) return [[]]
        if ('/' === e) return [[Gi]]
        if (!e.startsWith('/'))
          throw new Error(`Invalid path "${e}"`)
        function t(e) {
          throw new Error(`ERR (${n})/"${c}": ${e}`)
        }
        let n = 0,
          o = n
        const r = []
        let i
        function a() {
          i && r.push(i), (i = [])
        }
        let l,
          s = 0,
          c = '',
          u = ''
        function d() {
          c &&
            (0 === n
              ? i.push({ type: 0, value: c })
              : 1 === n || 2 === n || 3 === n
              ? (i.length > 1 &&
                  ('*' === l || '+' === l) &&
                  t(
                    `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
                  ),
                i.push({
                  type: 1,
                  value: c,
                  regexp: u,
                  repeatable: '*' === l || '+' === l,
                  optional: '*' === l || '?' === l,
                }))
              : t('Invalid state to consume buffer'),
            (c = ''))
        }
        function f() {
          c += l
        }
        for (; s < e.length; )
          if (((l = e[s++]), '\\' !== l || 2 === n))
            switch (n) {
              case 0:
                '/' === l
                  ? (c && d(), a())
                  : ':' === l
                  ? (d(), (n = 1))
                  : f()
                break
              case 4:
                f(), (n = o)
                break
              case 1:
                '(' === l
                  ? (n = 2)
                  : Ki.test(l)
                  ? f()
                  : (d(),
                    (n = 0),
                    '*' !== l &&
                      '?' !== l &&
                      '+' !== l &&
                      s--)
                break
              case 2:
                ')' === l
                  ? '\\' == u[u.length - 1]
                    ? (u = u.slice(0, -1) + l)
                    : (n = 3)
                  : (u += l)
                break
              case 3:
                d(),
                  (n = 0),
                  '*' !== l &&
                    '?' !== l &&
                    '+' !== l &&
                    s--,
                  (u = '')
                break
              default:
                t('Unknown state')
            }
          else (o = n), (n = 4)
        return (
          2 === n &&
            t(`Unfinished custom RegExp for param "${c}"`),
          d(),
          a(),
          r
        )
      })(e.path),
      n
    ),
    r = ui(o, {
      record: e,
      parent: t,
      children: [],
      alias: [],
    })
  return (
    t &&
      !r.record.aliasOf == !t.record.aliasOf &&
      t.children.push(r),
    r
  )
}
function Xi(e, t) {
  const n = [],
    o = new Map()
  function r(e, n, o) {
    let l = !o,
      s = (function (e) {
        return {
          path: e.path,
          redirect: e.redirect,
          name: e.name,
          meta: e.meta || {},
          aliasOf: void 0,
          beforeEnter: e.beforeEnter,
          props: Zi(e),
          children: e.children || [],
          instances: {},
          leaveGuards: new Set(),
          updateGuards: new Set(),
          enterCallbacks: {},
          components:
            'components' in e
              ? e.components || {}
              : { default: e.component },
        }
      })(e)
    s.aliasOf = o && o.record
    const c = ea(t, e),
      u = [s]
    if ('alias' in e) {
      const t =
        'string' == typeof e.alias ? [e.alias] : e.alias
      for (const e of t)
        u.push(
          ui({}, s, {
            components: o
              ? o.record.components
              : s.components,
            path: e,
            aliasOf: o ? o.record : s,
          })
        )
    }
    let d, f
    for (const t of u) {
      let { path: u } = t
      if (n && '/' !== u[0]) {
        let e = n.record.path,
          o = '/' === e[e.length - 1] ? '' : '/'
        t.path = n.record.path + (u && o + u)
      }
      if (
        ((d = Yi(t, n, c)),
        o
          ? o.alias.push(d)
          : ((f = f || d),
            f !== d && f.alias.push(d),
            l && e.name && !Ji(d) && i(e.name)),
        'children' in s)
      ) {
        let e = s.children
        for (let t = 0; t < e.length; t++)
          r(e[t], d, o && o.children[t])
      }
      ;(o = o || d), a(d)
    }
    return f
      ? () => {
          i(f)
        }
      : fi
  }
  function i(e) {
    if (Ri(e)) {
      const t = o.get(e)
      t &&
        (o.delete(e),
        n.splice(n.indexOf(t), 1),
        t.children.forEach(i),
        t.alias.forEach(i))
    } else {
      let t = n.indexOf(e)
      t > -1 &&
        (n.splice(t, 1),
        e.record.name && o.delete(e.record.name),
        e.children.forEach(i),
        e.alias.forEach(i))
    }
  }
  function a(e) {
    let t = 0
    for (; t < n.length && Ui(e, n[t]) >= 0; ) t++
    n.splice(t, 0, e),
      e.record.name && !Ji(e) && o.set(e.record.name, e)
  }
  return (
    (t = ea({ strict: !1, end: !0, sensitive: !1 }, t)),
    e.forEach((e) => r(e)),
    {
      addRoute: r,
      resolve: function (e, t) {
        let r,
          i,
          a,
          l = {}
        if ('name' in e && e.name) {
          if (((r = o.get(e.name)), !r))
            throw Hi(1, { location: e })
          ;(a = r.record.name),
            (l = ui(
              (function (e, t) {
                let n = {}
                for (let o of t) o in e && (n[o] = e[o])
                return n
              })(
                t.params,
                r.keys
                  .filter((e) => !e.optional)
                  .map((e) => e.name)
              ),
              e.params
            )),
            (i = r.stringify(l))
        } else if ('path' in e)
          (i = e.path),
            (r = n.find((e) => e.re.test(i))),
            r && ((l = r.parse(i)), (a = r.record.name))
        else {
          if (
            ((r = t.name
              ? o.get(t.name)
              : n.find((e) => e.re.test(t.path))),
            !r)
          )
            throw Hi(1, { location: e, currentLocation: t })
          ;(a = r.record.name),
            (l = ui({}, t.params, e.params)),
            (i = r.stringify(l))
        }
        const s = []
        let c = r
        for (; c; ) s.unshift(c.record), (c = c.parent)
        return {
          name: a,
          path: i,
          params: l,
          matched: s,
          meta: Qi(s),
        }
      },
      removeRoute: i,
      getRoutes: function () {
        return n
      },
      getRecordMatcher: function (e) {
        return o.get(e)
      },
    }
  )
}
function Zi(e) {
  const t = {},
    n = e.props || !1
  if ('component' in e) t.default = n
  else
    for (let o in e.components)
      t[o] = 'boolean' == typeof n ? n : n[o]
  return t
}
function Ji(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function Qi(e) {
  return e.reduce((e, t) => ui(e, t.meta), {})
}
function ea(e, t) {
  let n = {}
  for (let o in e) n[o] = o in t ? t[o] : e[o]
  return n
}
const ta = /#/g,
  na = /&/g,
  oa = /\//g,
  ra = /=/g,
  ia = /\?/g,
  aa = /\+/g,
  la = /%5B/g,
  sa = /%5D/g,
  ca = /%5E/g,
  ua = /%60/g,
  da = /%7B/g,
  fa = /%7C/g,
  pa = /%7D/g,
  ha = /%20/g
function va(e) {
  return encodeURI('' + e)
    .replace(fa, '|')
    .replace(la, '[')
    .replace(sa, ']')
}
function ga(e) {
  return va(e)
    .replace(aa, '%2B')
    .replace(ha, '+')
    .replace(ta, '%23')
    .replace(na, '%26')
    .replace(ua, '`')
    .replace(da, '{')
    .replace(pa, '}')
    .replace(ca, '^')
}
function ba(e) {
  return (function (e) {
    return va(e).replace(ta, '%23').replace(ia, '%3F')
  })(e).replace(oa, '%2F')
}
function ma(e) {
  try {
    return decodeURIComponent('' + e)
  } catch (t) {}
  return '' + e
}
function ya(e) {
  const t = {}
  if ('' === e || '?' === e) return t
  const n = ('?' === e[0] ? e.slice(1) : e).split('&')
  for (let o = 0; o < n.length; ++o) {
    const e = n[o].replace(aa, ' ')
    let r = e.indexOf('='),
      i = ma(r < 0 ? e : e.slice(0, r)),
      a = r < 0 ? null : ma(e.slice(r + 1))
    if (i in t) {
      let e = t[i]
      Array.isArray(e) || (e = t[i] = [e]), e.push(a)
    } else t[i] = a
  }
  return t
}
function xa(e) {
  let t = ''
  for (let n in e) {
    const o = e[n]
    if (((n = ga(n).replace(ra, '%3D')), null == o)) {
      void 0 !== o && (t += (t.length ? '&' : '') + n)
      continue
    }
    ;(Array.isArray(o)
      ? o.map((e) => e && ga(e))
      : [o && ga(o)]
    ).forEach((e) => {
      void 0 !== e &&
        ((t += (t.length ? '&' : '') + n),
        null != e && (t += '=' + e))
    })
  }
  return t
}
function wa(e) {
  const t = {}
  for (let n in e) {
    let o = e[n]
    void 0 !== o &&
      (t[n] = Array.isArray(o)
        ? o.map((e) => (null == e ? null : '' + e))
        : null == o
        ? o
        : '' + o)
  }
  return t
}
function Ca() {
  let e = []
  return {
    add: function (t) {
      return (
        e.push(t),
        () => {
          const n = e.indexOf(t)
          n > -1 && e.splice(n, 1)
        }
      )
    },
    list: () => e,
    reset: function () {
      e = []
    },
  }
}
function Sa(e, t, n, o, r) {
  const i =
    o && (o.enterCallbacks[r] = o.enterCallbacks[r] || [])
  return () =>
    new Promise((a, l) => {
      const s = (e) => {
          var s
          !1 === e
            ? l(Hi(4, { from: n, to: t }))
            : e instanceof Error
            ? l(e)
            : 'string' == typeof (s = e) ||
              (s && 'object' == typeof s)
            ? l(Hi(2, { from: t, to: e }))
            : (i &&
                o.enterCallbacks[r] === i &&
                'function' == typeof e &&
                i.push(e),
              a())
        },
        c = e.call(o && o.instances[r], t, n, s)
      let u = Promise.resolve(c)
      e.length < 3 && (u = u.then(s)), u.catch((e) => l(e))
    })
}
function ka(e, t, n, o) {
  const r = []
  for (const a of e)
    for (const e in a.components) {
      let l = a.components[e]
      if ('beforeRouteEnter' === t || a.instances[e])
        if (
          'object' == typeof (i = l) ||
          'displayName' in i ||
          'props' in i ||
          '__vccOpts' in i
        ) {
          const i = (l.__vccOpts || l)[t]
          i && r.push(Sa(i, n, o, a, e))
        } else {
          let i = l()
          r.push(() =>
            i.then((r) => {
              if (!r)
                return Promise.reject(
                  new Error(
                    `Couldn't resolve component "${e}" at "${a.path}"`
                  )
                )
              const i =
                (l = r).__esModule ||
                (ni && 'Module' === l[Symbol.toStringTag])
                  ? r.default
                  : r
              var l
              a.components[e] = i
              const s = (i.__vccOpts || i)[t]
              return s && Sa(s, n, o, a, e)()
            })
          )
        }
    }
  var i
  return r
}
function $a(e) {
  const t = Gt(ai),
    n = Gt(li),
    o = ur(() => t.resolve(it(e.to))),
    r = ur(() => {
      let { matched: e } = o.value,
        { length: t } = e
      const r = e[t - 1]
      let i = n.matched
      if (!r || !i.length) return -1
      let a = i.findIndex(gi.bind(null, r))
      if (a > -1) return a
      let l = za(e[t - 2])
      return t > 1 &&
        za(r) === l &&
        i[i.length - 1].path !== l
        ? i.findIndex(gi.bind(null, e[t - 2]))
        : a
    }),
    i = ur(
      () =>
        r.value > -1 &&
        (function (e, t) {
          for (let n in t) {
            let o = t[n],
              r = e[n]
            if ('string' == typeof o) {
              if (o !== r) return !1
            } else if (
              !Array.isArray(r) ||
              r.length !== o.length ||
              o.some((e, t) => e !== r[t])
            )
              return !1
          }
          return !0
        })(n.params, o.value.params)
    ),
    a = ur(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        bi(n.params, o.value.params)
    )
  return {
    route: o,
    href: ur(() => o.value.href),
    isActive: i,
    isExactActive: a,
    navigate: function (n = {}) {
      return (function (e) {
        if (
          e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          e.shiftKey
        )
          return
        if (e.defaultPrevented) return
        if (void 0 !== e.button && 0 !== e.button) return
        if (
          e.currentTarget &&
          e.currentTarget.getAttribute
        ) {
          const t = e.currentTarget.getAttribute('target')
          if (/\b_blank\b/i.test(t)) return
        }
        e.preventDefault && e.preventDefault()
        return !0
      })(n)
        ? t[it(e.replace) ? 'replace' : 'push'](
            it(e.to)
          ).catch(fi)
        : Promise.resolve()
    },
  }
}
const _a = dn({
  name: 'RouterLink',
  props: {
    to: { type: [String, Object], required: !0 },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: { type: String, default: 'page' },
  },
  useLink: $a,
  setup(e, { slots: t }) {
    const n = Ue($a(e)),
      { options: o } = Gt(ai),
      r = ur(() => ({
        [Pa(
          e.activeClass,
          o.linkActiveClass,
          'router-link-active'
        )]: n.isActive,
        [Pa(
          e.exactActiveClass,
          o.linkExactActiveClass,
          'router-link-exact-active'
        )]: n.isExactActive,
      }))
    return () => {
      const o = t.default && t.default(n)
      return e.custom
        ? o
        : dr(
            'a',
            {
              'aria-current': n.isExactActive
                ? e.ariaCurrentValue
                : null,
              href: n.href,
              onClick: n.navigate,
              class: r.value,
            },
            o
          )
    }
  },
})
function za(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const Pa = (e, t, n) => (null != e ? e : null != t ? t : n)
function Ea(e, t) {
  if (!e) return null
  const n = e(t)
  return 1 === n.length ? n[0] : n
}
const Oa = dn({
  name: 'RouterView',
  inheritAttrs: !1,
  props: {
    name: { type: String, default: 'default' },
    route: Object,
  },
  setup(e, { attrs: t, slots: n }) {
    const o = Gt(si),
      r = ur(() => e.route || o.value),
      i = Gt(ii, 0),
      a = ur(() => r.value.matched[i])
    Ut(ii, i + 1), Ut(ri, a), Ut(si, r)
    const l = nt()
    return (
      Xt(
        () => [l.value, a.value, e.name],
        ([e, t, n], [o, r, i]) => {
          t &&
            ((t.instances[n] = e),
            r &&
              r !== t &&
              e &&
              e === o &&
              (t.leaveGuards.size ||
                (t.leaveGuards = r.leaveGuards),
              t.updateGuards.size ||
                (t.updateGuards = r.updateGuards))),
            !e ||
              !t ||
              (r && gi(t, r) && o) ||
              (t.enterCallbacks[n] || []).forEach((t) =>
                t(e)
              )
        },
        { flush: 'post' }
      ),
      () => {
        const o = r.value,
          i = a.value,
          s = i && i.components[e.name],
          c = e.name
        if (!s)
          return Ea(n.default, { Component: s, route: o })
        const u = i.props[e.name],
          d = u
            ? !0 === u
              ? o.params
              : 'function' == typeof u
              ? u(o)
              : u
            : null,
          f = dr(
            s,
            ui({}, d, t, {
              onVnodeUnmounted: (e) => {
                e.component.isUnmounted &&
                  (i.instances[c] = null)
              },
              ref: l,
            })
          )
        return (
          Ea(n.default, { Component: f, route: o }) || f
        )
      }
    )
  },
})
function ja(e) {
  const t = Xi(e.routes, e)
  let n = e.parseQuery || ya,
    o = e.stringifyQuery || xa,
    r = e.history
  const i = Ca(),
    a = Ca(),
    l = Ca(),
    s = rt(Bi, !0)
  let c = Bi
  ci &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual')
  const u = di.bind(null, (e) => '' + e),
    d = di.bind(null, ba),
    f = di.bind(null, ma)
  function p(e, i) {
    if (
      ((i = ui({}, i || s.value)), 'string' == typeof e)
    ) {
      let o = hi(n, e, i.path),
        a = t.resolve({ path: o.path }, i),
        l = r.createHref(o.fullPath)
      return ui(o, a, {
        params: f(a.params),
        hash: ma(o.hash),
        redirectedFrom: void 0,
        href: l,
      })
    }
    let a
    'path' in e
      ? (a = ui({}, e, {
          path: hi(n, e.path, i.path).path,
        }))
      : ((a = ui({}, e, { params: d(e.params) })),
        (i.params = d(i.params)))
    let l = t.resolve(a, i)
    const c = e.hash || ''
    l.params = u(f(l.params))
    const p = (function (e, t) {
      let n = t.query ? e(t.query) : ''
      return t.path + (n && '?') + n + (t.hash || '')
    })(
      o,
      ui({}, e, {
        hash:
          ((h = c),
          va(h)
            .replace(da, '{')
            .replace(pa, '}')
            .replace(ca, '^')),
        path: l.path,
      })
    )
    var h
    let v = r.createHref(p)
    return ui(
      {
        fullPath: p,
        hash: c,
        query: o === xa ? wa(e.query) : e.query,
      },
      l,
      { redirectedFrom: void 0, href: v }
    )
  }
  function h(e) {
    return 'string' == typeof e
      ? hi(n, e, s.value.path)
      : ui({}, e)
  }
  function v(e, t) {
    if (c !== e) return Hi(8, { from: t, to: e })
  }
  function g(e) {
    return m(e)
  }
  function b(e) {
    const t = e.matched[e.matched.length - 1]
    if (t && t.redirect) {
      const { redirect: n } = t
      let o = 'function' == typeof n ? n(e) : n
      return (
        'string' == typeof o &&
          ((o =
            o.includes('?') || o.includes('#')
              ? (o = h(o))
              : { path: o }),
          (o.params = {})),
        ui(
          {
            query: e.query,
            hash: e.hash,
            params: e.params,
          },
          o
        )
      )
    }
  }
  function m(e, t) {
    const n = (c = p(e)),
      r = s.value,
      i = e.state,
      a = e.force,
      l = !0 === e.replace,
      u = b(n)
    if (u)
      return m(
        ui(h(u), { state: i, force: a, replace: l }),
        t || n
      )
    const d = n
    let f
    return (
      (d.redirectedFrom = t),
      !a &&
        (function (e, t, n) {
          let o = t.matched.length - 1,
            r = n.matched.length - 1
          return (
            o > -1 &&
            o === r &&
            gi(t.matched[o], n.matched[r]) &&
            bi(t.params, n.params) &&
            e(t.query) === e(n.query) &&
            t.hash === n.hash
          )
        })(o, r, n) &&
        ((f = Hi(16, { to: d, from: r })), O(r, r, !0, !1)),
      (f ? Promise.resolve(f) : x(d, r))
        .catch((e) => (Ni(e) ? e : P(e, d, r)))
        .then((e) => {
          if (e) {
            if (Ni(e, 2))
              return m(
                ui(h(e.to), {
                  state: i,
                  force: a,
                  replace: l,
                }),
                t || d
              )
          } else e = C(d, r, !0, l, i)
          return w(d, r, e), e
        })
    )
  }
  function y(e, t) {
    const n = v(e, t)
    return n ? Promise.reject(n) : Promise.resolve()
  }
  function x(e, t) {
    let n
    const [o, r, l] = (function (e, t) {
      const n = [],
        o = [],
        r = [],
        i = Math.max(t.matched.length, e.matched.length)
      for (let a = 0; a < i; a++) {
        const i = t.matched[a]
        i &&
          (e.matched.find((e) => gi(e, i))
            ? o.push(i)
            : n.push(i))
        const l = e.matched[a]
        l && (t.matched.find((e) => gi(e, l)) || r.push(l))
      }
      return [n, o, r]
    })(e, t)
    n = ka(o.reverse(), 'beforeRouteLeave', e, t)
    for (const i of o)
      i.leaveGuards.forEach((o) => {
        n.push(Sa(o, e, t))
      })
    const s = y.bind(null, e, t)
    return (
      n.push(s),
      Ta(n)
        .then(() => {
          n = []
          for (const o of i.list()) n.push(Sa(o, e, t))
          return n.push(s), Ta(n)
        })
        .then(() => {
          n = ka(r, 'beforeRouteUpdate', e, t)
          for (const o of r)
            o.updateGuards.forEach((o) => {
              n.push(Sa(o, e, t))
            })
          return n.push(s), Ta(n)
        })
        .then(() => {
          n = []
          for (const o of e.matched)
            if (o.beforeEnter && !t.matched.includes(o))
              if (Array.isArray(o.beforeEnter))
                for (const r of o.beforeEnter)
                  n.push(Sa(r, e, t))
              else n.push(Sa(o.beforeEnter, e, t))
          return n.push(s), Ta(n)
        })
        .then(
          () => (
            e.matched.forEach(
              (e) => (e.enterCallbacks = {})
            ),
            (n = ka(l, 'beforeRouteEnter', e, t)),
            n.push(s),
            Ta(n)
          )
        )
        .then(() => {
          n = []
          for (const o of a.list()) n.push(Sa(o, e, t))
          return n.push(s), Ta(n)
        })
        .catch((e) => (Ni(e, 8) ? e : Promise.reject(e)))
    )
  }
  function w(e, t, n) {
    for (const o of l.list()) o(e, t, n)
  }
  function C(e, t, n, o, i) {
    const a = v(e, t)
    if (a) return a
    const l = t === Bi,
      c = ci ? history.state : {}
    n &&
      (o || l
        ? r.replace(
            e.fullPath,
            ui({ scroll: l && c && c.scroll }, i)
          )
        : r.push(e.fullPath, i)),
      (s.value = e),
      O(e, t, n, l),
      E()
  }
  let S
  function k() {
    S = r.listen((e, t, n) => {
      let o = p(e)
      const i = b(o)
      if (i)
        return void m(ui(i, { replace: !0 }), o).catch(fi)
      c = o
      const a = s.value
      var l, u
      ci &&
        ((l = Ei(a.fullPath, n.delta)),
        (u = zi()),
        Oi.set(l, u)),
        x(o, a)
          .catch((e) =>
            Ni(e, 12)
              ? e
              : Ni(e, 2)
              ? (m(e.to, o)
                  .then((e) => {
                    Ni(e, 20) &&
                      !n.delta &&
                      n.type === xi.pop &&
                      r.go(-1, !1)
                  })
                  .catch(fi),
                Promise.reject())
              : (n.delta && r.go(-n.delta, !1), P(e, o, a))
          )
          .then((e) => {
            ;(e = e || C(o, a, !1)) &&
              (n.delta
                ? r.go(-n.delta, !1)
                : n.type === xi.pop &&
                  Ni(e, 20) &&
                  r.go(-1, !1)),
              w(o, a, e)
          })
          .catch(fi)
    })
  }
  let $,
    _ = Ca(),
    z = Ca()
  function P(e, t, n) {
    E(e)
    const o = z.list()
    return (
      o.length
        ? o.forEach((o) => o(e, t, n))
        : console.error(e),
      Promise.reject(e)
    )
  }
  function E(e) {
    $ ||
      (($ = !0),
      k(),
      _.list().forEach(([t, n]) => (e ? n(e) : t())),
      _.reset())
  }
  function O(t, n, o, r) {
    const { scrollBehavior: i } = e
    if (!ci || !i) return Promise.resolve()
    let a =
      (!o &&
        (function (e) {
          const t = Oi.get(e)
          return Oi.delete(e), t
        })(Ei(t.fullPath, 0))) ||
      ((r || !o) &&
        history.state &&
        history.state.scroll) ||
      null
    return zt()
      .then(() => i(t, n, a))
      .then((e) => e && Pi(e))
      .catch((e) => P(e, t, n))
  }
  const j = (e) => r.go(e)
  let T
  const A = new Set()
  return {
    currentRoute: s,
    addRoute: function (e, n) {
      let o, r
      return (
        Ri(e)
          ? ((o = t.getRecordMatcher(e)), (r = n))
          : (r = e),
        t.addRoute(r, o)
      )
    },
    removeRoute: function (e) {
      let n = t.getRecordMatcher(e)
      n && t.removeRoute(n)
    },
    hasRoute: function (e) {
      return !!t.getRecordMatcher(e)
    },
    getRoutes: function () {
      return t.getRoutes().map((e) => e.record)
    },
    resolve: p,
    options: e,
    push: g,
    replace: function (e) {
      return g(ui(h(e), { replace: !0 }))
    },
    go: j,
    back: () => j(-1),
    forward: () => j(1),
    beforeEach: i.add,
    beforeResolve: a.add,
    afterEach: l.add,
    onError: z.add,
    isReady: function () {
      return $ && s.value !== Bi
        ? Promise.resolve()
        : new Promise((e, t) => {
            _.add([e, t])
          })
    },
    install(e) {
      e.component('RouterLink', _a),
        e.component('RouterView', Oa),
        (e.config.globalProperties.$router = this),
        Object.defineProperty(
          e.config.globalProperties,
          '$route',
          { enumerable: !0, get: () => it(s) }
        ),
        ci &&
          !T &&
          s.value === Bi &&
          ((T = !0), g(r.location).catch((e) => {}))
      const t = {}
      for (let o in Bi) t[o] = ur(() => s.value[o])
      e.provide(ai, this),
        e.provide(li, Ue(t)),
        e.provide(si, s)
      let n = e.unmount
      A.add(e),
        (e.unmount = function () {
          A.delete(e),
            A.size < 1 &&
              (S(), (s.value = Bi), (T = !1), ($ = !1)),
            n()
        })
    },
  }
}
function Ta(e) {
  return e.reduce(
    (e, t) => e.then(() => t()),
    Promise.resolve()
  )
}
'undefined' != typeof globalThis
  ? globalThis
  : 'undefined' != typeof window
  ? window
  : 'undefined' != typeof global
  ? global
  : 'undefined' != typeof self && self
function Aa(e) {
  return e &&
    e.__esModule &&
    Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e
}
var Ma = { exports: {} },
  Fa = Aa(
    (Ma.exports = (function () {
      var e = {
          134: function (e, t, n) {
            n.d(t, {
              default: function () {
                return y
              },
            })
            var o = n(279),
              r = n.n(o),
              i = n(370),
              a = n.n(i),
              l = n(817),
              s = n.n(l)
            function c(e) {
              return (c =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e
                    }
                  : function (e) {
                      return e &&
                        'function' == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e
                    })(e)
            }
            function u(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n]
                ;(o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  'value' in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o)
              }
            }
            var d = (function () {
              function e(t) {
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError(
                      'Cannot call a class as a function'
                    )
                })(this, e),
                  this.resolveOptions(t),
                  this.initSelection()
              }
              var t, n, o
              return (
                (t = e),
                (n = [
                  {
                    key: 'resolveOptions',
                    value: function () {
                      var e =
                        arguments.length > 0 &&
                        void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                      ;(this.action = e.action),
                        (this.container = e.container),
                        (this.emitter = e.emitter),
                        (this.target = e.target),
                        (this.text = e.text),
                        (this.trigger = e.trigger),
                        (this.selectedText = '')
                    },
                  },
                  {
                    key: 'initSelection',
                    value: function () {
                      this.text
                        ? this.selectFake()
                        : this.target && this.selectTarget()
                    },
                  },
                  {
                    key: 'createFakeElement',
                    value: function () {
                      var e =
                        'rtl' ===
                        document.documentElement.getAttribute(
                          'dir'
                        )
                      ;(this.fakeElem =
                        document.createElement('textarea')),
                        (this.fakeElem.style.fontSize =
                          '12pt'),
                        (this.fakeElem.style.border = '0'),
                        (this.fakeElem.style.padding = '0'),
                        (this.fakeElem.style.margin = '0'),
                        (this.fakeElem.style.position =
                          'absolute'),
                        (this.fakeElem.style[
                          e ? 'right' : 'left'
                        ] = '-9999px')
                      var t =
                        window.pageYOffset ||
                        document.documentElement.scrollTop
                      return (
                        (this.fakeElem.style.top =
                          ''.concat(t, 'px')),
                        this.fakeElem.setAttribute(
                          'readonly',
                          ''
                        ),
                        (this.fakeElem.value = this.text),
                        this.fakeElem
                      )
                    },
                  },
                  {
                    key: 'selectFake',
                    value: function () {
                      var e = this,
                        t = this.createFakeElement()
                      ;(this.fakeHandlerCallback =
                        function () {
                          return e.removeFake()
                        }),
                        (this.fakeHandler =
                          this.container.addEventListener(
                            'click',
                            this.fakeHandlerCallback
                          ) || !0),
                        this.container.appendChild(t),
                        (this.selectedText = s()(t)),
                        this.copyText(),
                        this.removeFake()
                    },
                  },
                  {
                    key: 'removeFake',
                    value: function () {
                      this.fakeHandler &&
                        (this.container.removeEventListener(
                          'click',
                          this.fakeHandlerCallback
                        ),
                        (this.fakeHandler = null),
                        (this.fakeHandlerCallback = null)),
                        this.fakeElem &&
                          (this.container.removeChild(
                            this.fakeElem
                          ),
                          (this.fakeElem = null))
                    },
                  },
                  {
                    key: 'selectTarget',
                    value: function () {
                      ;(this.selectedText = s()(
                        this.target
                      )),
                        this.copyText()
                    },
                  },
                  {
                    key: 'copyText',
                    value: function () {
                      var e
                      try {
                        e = document.execCommand(
                          this.action
                        )
                      } catch (t) {
                        e = !1
                      }
                      this.handleResult(e)
                    },
                  },
                  {
                    key: 'handleResult',
                    value: function (e) {
                      this.emitter.emit(
                        e ? 'success' : 'error',
                        {
                          action: this.action,
                          text: this.selectedText,
                          trigger: this.trigger,
                          clearSelection:
                            this.clearSelection.bind(this),
                        }
                      )
                    },
                  },
                  {
                    key: 'clearSelection',
                    value: function () {
                      this.trigger && this.trigger.focus(),
                        document.activeElement.blur(),
                        window
                          .getSelection()
                          .removeAllRanges()
                    },
                  },
                  {
                    key: 'destroy',
                    value: function () {
                      this.removeFake()
                    },
                  },
                  {
                    key: 'action',
                    set: function () {
                      var e =
                        arguments.length > 0 &&
                        void 0 !== arguments[0]
                          ? arguments[0]
                          : 'copy'
                      if (
                        ((this._action = e),
                        'copy' !== this._action &&
                          'cut' !== this._action)
                      )
                        throw new Error(
                          'Invalid "action" value, use either "copy" or "cut"'
                        )
                    },
                    get: function () {
                      return this._action
                    },
                  },
                  {
                    key: 'target',
                    set: function (e) {
                      if (void 0 !== e) {
                        if (
                          !e ||
                          'object' !== c(e) ||
                          1 !== e.nodeType
                        )
                          throw new Error(
                            'Invalid "target" value, use a valid Element'
                          )
                        if (
                          'copy' === this.action &&
                          e.hasAttribute('disabled')
                        )
                          throw new Error(
                            'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                          )
                        if (
                          'cut' === this.action &&
                          (e.hasAttribute('readonly') ||
                            e.hasAttribute('disabled'))
                        )
                          throw new Error(
                            'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                          )
                        this._target = e
                      }
                    },
                    get: function () {
                      return this._target
                    },
                  },
                ]) && u(t.prototype, n),
                o && u(t, o),
                e
              )
            })()
            function f(e) {
              return (f =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e
                    }
                  : function (e) {
                      return e &&
                        'function' == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e
                    })(e)
            }
            function p(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n]
                ;(o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  'value' in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o)
              }
            }
            function h(e, t) {
              return (h =
                Object.setPrototypeOf ||
                function (e, t) {
                  return (e.__proto__ = t), e
                })(e, t)
            }
            function v(e) {
              var t = (function () {
                if (
                  'undefined' == typeof Reflect ||
                  !Reflect.construct
                )
                  return !1
                if (Reflect.construct.sham) return !1
                if ('function' == typeof Proxy) return !0
                try {
                  return (
                    Date.prototype.toString.call(
                      Reflect.construct(
                        Date,
                        [],
                        function () {}
                      )
                    ),
                    !0
                  )
                } catch (e) {
                  return !1
                }
              })()
              return function () {
                var n,
                  o = b(e)
                if (t) {
                  var r = b(this).constructor
                  n = Reflect.construct(o, arguments, r)
                } else n = o.apply(this, arguments)
                return g(this, n)
              }
            }
            function g(e, t) {
              return !t ||
                ('object' !== f(t) &&
                  'function' != typeof t)
                ? (function (e) {
                    if (void 0 === e)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return e
                  })(e)
                : t
            }
            function b(e) {
              return (b = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (e) {
                    return (
                      e.__proto__ ||
                      Object.getPrototypeOf(e)
                    )
                  })(e)
            }
            function m(e, t) {
              var n = 'data-clipboard-'.concat(e)
              if (t.hasAttribute(n))
                return t.getAttribute(n)
            }
            var y = (function (e) {
              !(function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError(
                    'Super expression must either be null or a function'
                  )
                ;(e.prototype = Object.create(
                  t && t.prototype,
                  {
                    constructor: {
                      value: e,
                      writable: !0,
                      configurable: !0,
                    },
                  }
                )),
                  t && h(e, t)
              })(i, e)
              var t,
                n,
                o,
                r = v(i)
              function i(e, t) {
                var n
                return (
                  (function (e, t) {
                    if (!(e instanceof t))
                      throw new TypeError(
                        'Cannot call a class as a function'
                      )
                  })(this, i),
                  (n = r.call(this)).resolveOptions(t),
                  n.listenClick(e),
                  n
                )
              }
              return (
                (t = i),
                (o = [
                  {
                    key: 'isSupported',
                    value: function () {
                      var e =
                          arguments.length > 0 &&
                          void 0 !== arguments[0]
                            ? arguments[0]
                            : ['copy', 'cut'],
                        t = 'string' == typeof e ? [e] : e,
                        n = !!document.queryCommandSupported
                      return (
                        t.forEach(function (e) {
                          n =
                            n &&
                            !!document.queryCommandSupported(
                              e
                            )
                        }),
                        n
                      )
                    },
                  },
                ]),
                (n = [
                  {
                    key: 'resolveOptions',
                    value: function () {
                      var e =
                        arguments.length > 0 &&
                        void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                      ;(this.action =
                        'function' == typeof e.action
                          ? e.action
                          : this.defaultAction),
                        (this.target =
                          'function' == typeof e.target
                            ? e.target
                            : this.defaultTarget),
                        (this.text =
                          'function' == typeof e.text
                            ? e.text
                            : this.defaultText),
                        (this.container =
                          'object' === f(e.container)
                            ? e.container
                            : document.body)
                    },
                  },
                  {
                    key: 'listenClick',
                    value: function (e) {
                      var t = this
                      this.listener = a()(
                        e,
                        'click',
                        function (e) {
                          return t.onClick(e)
                        }
                      )
                    },
                  },
                  {
                    key: 'onClick',
                    value: function (e) {
                      var t =
                        e.delegateTarget || e.currentTarget
                      this.clipboardAction &&
                        (this.clipboardAction = null),
                        (this.clipboardAction = new d({
                          action: this.action(t),
                          target: this.target(t),
                          text: this.text(t),
                          container: this.container,
                          trigger: t,
                          emitter: this,
                        }))
                    },
                  },
                  {
                    key: 'defaultAction',
                    value: function (e) {
                      return m('action', e)
                    },
                  },
                  {
                    key: 'defaultTarget',
                    value: function (e) {
                      var t = m('target', e)
                      if (t)
                        return document.querySelector(t)
                    },
                  },
                  {
                    key: 'defaultText',
                    value: function (e) {
                      return m('text', e)
                    },
                  },
                  {
                    key: 'destroy',
                    value: function () {
                      this.listener.destroy(),
                        this.clipboardAction &&
                          (this.clipboardAction.destroy(),
                          (this.clipboardAction = null))
                    },
                  },
                ]) && p(t.prototype, n),
                o && p(t, o),
                i
              )
            })(r())
          },
          828: function (e) {
            if (
              'undefined' != typeof Element &&
              !Element.prototype.matches
            ) {
              var t = Element.prototype
              t.matches =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector
            }
            e.exports = function (e, t) {
              for (; e && 9 !== e.nodeType; ) {
                if (
                  'function' == typeof e.matches &&
                  e.matches(t)
                )
                  return e
                e = e.parentNode
              }
            }
          },
          438: function (e, t, n) {
            var o = n(828)
            function r(e, t, n, o, r) {
              var a = i.apply(this, arguments)
              return (
                e.addEventListener(n, a, r),
                {
                  destroy: function () {
                    e.removeEventListener(n, a, r)
                  },
                }
              )
            }
            function i(e, t, n, r) {
              return function (n) {
                ;(n.delegateTarget = o(n.target, t)),
                  n.delegateTarget && r.call(e, n)
              }
            }
            e.exports = function (e, t, n, o, i) {
              return 'function' == typeof e.addEventListener
                ? r.apply(null, arguments)
                : 'function' == typeof n
                ? r
                    .bind(null, document)
                    .apply(null, arguments)
                : ('string' == typeof e &&
                    (e = document.querySelectorAll(e)),
                  Array.prototype.map.call(e, function (e) {
                    return r(e, t, n, o, i)
                  }))
            }
          },
          879: function (e, t) {
            ;(t.node = function (e) {
              return (
                void 0 !== e &&
                e instanceof HTMLElement &&
                1 === e.nodeType
              )
            }),
              (t.nodeList = function (e) {
                var n = Object.prototype.toString.call(e)
                return (
                  void 0 !== e &&
                  ('[object NodeList]' === n ||
                    '[object HTMLCollection]' === n) &&
                  'length' in e &&
                  (0 === e.length || t.node(e[0]))
                )
              }),
              (t.string = function (e) {
                return (
                  'string' == typeof e ||
                  e instanceof String
                )
              }),
              (t.fn = function (e) {
                return (
                  '[object Function]' ===
                  Object.prototype.toString.call(e)
                )
              })
          },
          370: function (e, t, n) {
            var o = n(879),
              r = n(438)
            e.exports = function (e, t, n) {
              if (!e && !t && !n)
                throw new Error(
                  'Missing required arguments'
                )
              if (!o.string(t))
                throw new TypeError(
                  'Second argument must be a String'
                )
              if (!o.fn(n))
                throw new TypeError(
                  'Third argument must be a Function'
                )
              if (o.node(e))
                return (function (e, t, n) {
                  return (
                    e.addEventListener(t, n),
                    {
                      destroy: function () {
                        e.removeEventListener(t, n)
                      },
                    }
                  )
                })(e, t, n)
              if (o.nodeList(e))
                return (function (e, t, n) {
                  return (
                    Array.prototype.forEach.call(
                      e,
                      function (e) {
                        e.addEventListener(t, n)
                      }
                    ),
                    {
                      destroy: function () {
                        Array.prototype.forEach.call(
                          e,
                          function (e) {
                            e.removeEventListener(t, n)
                          }
                        )
                      },
                    }
                  )
                })(e, t, n)
              if (o.string(e))
                return (function (e, t, n) {
                  return r(document.body, e, t, n)
                })(e, t, n)
              throw new TypeError(
                'First argument must be a String, HTMLElement, HTMLCollection, or NodeList'
              )
            }
          },
          817: function (e) {
            e.exports = function (e) {
              var t
              if ('SELECT' === e.nodeName)
                e.focus(), (t = e.value)
              else if (
                'INPUT' === e.nodeName ||
                'TEXTAREA' === e.nodeName
              ) {
                var n = e.hasAttribute('readonly')
                n || e.setAttribute('readonly', ''),
                  e.select(),
                  e.setSelectionRange(0, e.value.length),
                  n || e.removeAttribute('readonly'),
                  (t = e.value)
              } else {
                e.hasAttribute('contenteditable') &&
                  e.focus()
                var o = window.getSelection(),
                  r = document.createRange()
                r.selectNodeContents(e),
                  o.removeAllRanges(),
                  o.addRange(r),
                  (t = o.toString())
              }
              return t
            }
          },
          279: function (e) {
            function t() {}
            ;(t.prototype = {
              on: function (e, t, n) {
                var o = this.e || (this.e = {})
                return (
                  (o[e] || (o[e] = [])).push({
                    fn: t,
                    ctx: n,
                  }),
                  this
                )
              },
              once: function (e, t, n) {
                var o = this
                function r() {
                  o.off(e, r), t.apply(n, arguments)
                }
                return (r._ = t), this.on(e, r, n)
              },
              emit: function (e) {
                for (
                  var t = [].slice.call(arguments, 1),
                    n = (
                      (this.e || (this.e = {}))[e] || []
                    ).slice(),
                    o = 0,
                    r = n.length;
                  o < r;
                  o++
                )
                  n[o].fn.apply(n[o].ctx, t)
                return this
              },
              off: function (e, t) {
                var n = this.e || (this.e = {}),
                  o = n[e],
                  r = []
                if (o && t)
                  for (var i = 0, a = o.length; i < a; i++)
                    o[i].fn !== t &&
                      o[i].fn._ !== t &&
                      r.push(o[i])
                return (
                  r.length ? (n[e] = r) : delete n[e], this
                )
              },
            }),
              (e.exports = t),
              (e.exports.TinyEmitter = t)
          },
        },
        t = {}
      function n(o) {
        if (t[o]) return t[o].exports
        var r = (t[o] = { exports: {} })
        return e[o](r, r.exports, n), r.exports
      }
      return (
        (n.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default
                }
              : function () {
                  return e
                }
          return n.d(t, { a: t }), t
        }),
        (n.d = function (e, t) {
          for (var o in t)
            n.o(t, o) &&
              !n.o(e, o) &&
              Object.defineProperty(e, o, {
                enumerable: !0,
                get: t[o],
              })
        }),
        (n.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }),
        n(134)
      )
    })().default)
  )
/*!
 * clipboard.js v2.0.8
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */ function Ra(e) {
  return (Ra =
    'function' == typeof Symbol &&
    'symbol' == typeof Symbol.iterator
      ? function (e) {
          return typeof e
        }
      : function (e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e
        })(e)
}
var Ba =
    /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
  La = {
    name: 'JsonString',
    props: { jsonValue: { type: String, required: !0 } },
    data: function () {
      return { expand: !0, canExtend: !1 }
    },
    mounted: function () {
      this.$refs.itemRef.offsetHeight >
        this.$refs.holderRef.offsetHeight &&
        (this.canExtend = !0)
    },
    methods: {
      toggle: function () {
        this.expand = !this.expand
      },
    },
    render: function () {
      var e,
        t = this.jsonValue,
        n = Ba.test(t)
      return (
        this.expand
          ? ((e = {
              class: { 'jv-item': !0, 'jv-string': !0 },
              ref: 'itemRef',
            }),
            n
              ? ((t = '<a href="'
                  .concat(
                    t,
                    '" target="_blank" class="jv-link">'
                  )
                  .concat(t, '</a>')),
                (e.innerHTML = '"'.concat(
                  t.toString(),
                  '"'
                )))
              : (e.innerText = '"'.concat(
                  t.toString(),
                  '"'
                )))
          : (e = {
              class: { 'jv-ellipsis': !0 },
              onClick: this.toggle,
              innerText: '...',
            }),
        dr('span', {}, [
          this.canExtend &&
            dr('span', {
              class: { 'jv-toggle': !0, open: this.expand },
              onClick: this.toggle,
            }),
          dr('span', {
            class: { 'jv-holder-node': !0 },
            ref: 'holderRef',
          }),
          dr('span', e),
        ])
      )
    },
    __file: 'src/Components/types/json-string.vue',
  },
  Ia = {
    name: 'JsonUndefined',
    functional: !0,
    props: { jsonValue: { type: Object, default: null } },
    render: function () {
      return dr('span', {
        class: { 'jv-item': !0, 'jv-undefined': !0 },
        innerText:
          null === this.jsonValue ? 'null' : 'undefined',
      })
    },
    __file: 'src/Components/types/json-undefined.vue',
  },
  Da = {
    name: 'JsonNumber',
    functional: !0,
    props: { jsonValue: { type: Number, required: !0 } },
    render: function () {
      var e = Number.isInteger(this.jsonValue)
      return dr('span', {
        class: {
          'jv-item': !0,
          'jv-number': !0,
          'jv-number-integer': e,
          'jv-number-float': !e,
        },
        innerText: this.jsonValue.toString(),
      })
    },
    __file: 'src/Components/types/json-number.vue',
  },
  Ha = {
    name: 'JsonBoolean',
    functional: !0,
    props: { jsonValue: Boolean },
    render: function () {
      return dr('span', {
        class: { 'jv-item': !0, 'jv-boolean': !0 },
        innerText: this.jsonValue.toString(),
      })
    },
    __file: 'src/Components/types/json-boolean.vue',
  },
  Na = {
    name: 'JsonObject',
    props: {
      jsonValue: { type: Object, required: !0 },
      keyName: { type: String, default: '' },
      depth: { type: Number, default: 0 },
      expand: Boolean,
      sort: Boolean,
      previewMode: Boolean,
    },
    data: function () {
      return { value: {} }
    },
    computed: {
      ordered: function () {
        var e = this
        if (!this.sort) return this.value
        var t = {}
        return (
          Object.keys(this.value)
            .sort()
            .forEach(function (n) {
              t[n] = e.value[n]
            }),
          t
        )
      },
    },
    watch: {
      jsonValue: function (e) {
        this.setValue(e)
      },
    },
    mounted: function () {
      this.setValue(this.jsonValue)
    },
    methods: {
      setValue: function (e) {
        var t = this
        setTimeout(function () {
          t.value = e
        }, 0)
      },
      toggle: function () {
        this.$emit('update:expand', !this.expand),
          this.dispatchEvent()
      },
      dispatchEvent: function () {
        try {
          this.$el.dispatchEvent(new Event('resized'))
        } catch (t) {
          var e = document.createEvent('Event')
          e.initEvent('resized', !0, !1),
            this.$el.dispatchEvent(e)
        }
      },
    },
    render: function () {
      var e = []
      if (
        (this.previewMode ||
          this.keyName ||
          e.push(
            dr('span', {
              class: {
                'jv-toggle': !0,
                open: !!this.expand,
              },
              onClick: this.toggle,
            })
          ),
        e.push(
          dr('span', {
            class: { 'jv-item': !0, 'jv-object': !0 },
            innerText: '{',
          })
        ),
        this.expand)
      )
        for (var t in this.ordered)
          if (this.ordered.hasOwnProperty(t)) {
            var n = this.ordered[t]
            e.push(
              dr(Ua, {
                key: t,
                style: {
                  display: this.expand ? void 0 : 'none',
                },
                sort: this.sort,
                keyName: t,
                depth: this.depth + 1,
                value: n,
                previewMode: this.previewMode,
              })
            )
          }
      return (
        !this.expand &&
          Object.keys(this.value).length &&
          e.push(
            dr('span', {
              style: {
                display: this.expand ? 'none' : void 0,
              },
              class: { 'jv-ellipsis': !0 },
              onClick: this.toggle,
              title:
                'click to reveal object content (keys: '.concat(
                  Object.keys(this.ordered).join(', '),
                  ')'
                ),
              innerText: '...',
            })
          ),
        e.push(
          dr('span', {
            class: { 'jv-item': !0, 'jv-object': !0 },
            innerText: '}',
          })
        ),
        dr('span', e)
      )
    },
    __file: 'src/Components/types/json-object.vue',
  },
  Wa = {
    name: 'JsonArray',
    props: {
      jsonValue: { type: Array, required: !0 },
      keyName: { type: String, default: '' },
      depth: { type: Number, default: 0 },
      sort: Boolean,
      expand: Boolean,
      previewMode: Boolean,
    },
    data: function () {
      return { value: [] }
    },
    watch: {
      jsonValue: function (e) {
        this.setValue(e)
      },
    },
    mounted: function () {
      this.setValue(this.jsonValue)
    },
    methods: {
      setValue: function (e) {
        var t = this,
          n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 0
        0 === n && (this.value = []),
          setTimeout(function () {
            e.length > n &&
              (t.value.push(e[n]), t.setValue(e, n + 1))
          }, 0)
      },
      toggle: function () {
        this.$emit('update:expand', !this.expand)
        try {
          this.$el.dispatchEvent(new Event('resized'))
        } catch (t) {
          var e = document.createEvent('Event')
          e.initEvent('resized', !0, !1),
            this.$el.dispatchEvent(e)
        }
      },
    },
    render: function () {
      var e = this,
        t = []
      return (
        this.previewMode ||
          this.keyName ||
          t.push(
            dr('span', {
              class: {
                'jv-toggle': !0,
                open: !!this.expand,
              },
              onClick: this.toggle,
            })
          ),
        t.push(
          dr('span', {
            class: { 'jv-item': !0, 'jv-array': !0 },
            innerText: '[',
          })
        ),
        this.expand &&
          this.value.forEach(function (n, o) {
            t.push(
              dr(Ua, {
                key: o,
                style: {
                  display: e.expand ? void 0 : 'none',
                },
                sort: e.sort,
                depth: e.depth + 1,
                value: n,
                previewMode: e.previewMode,
              })
            )
          }),
        !this.expand &&
          this.value.length &&
          t.push(
            dr('span', {
              style: { display: void 0 },
              class: { 'jv-ellipsis': !0 },
              onClick: this.toggle,
              title: 'click to reveal '.concat(
                this.value.length,
                ' hidden items'
              ),
              innerText: '...',
            })
          ),
        t.push(
          dr('span', {
            class: { 'jv-item': !0, 'jv-array': !0 },
            innerText: ']',
          })
        ),
        dr('span', t)
      )
    },
    __file: 'src/Components/types/json-array.vue',
  },
  Va = {
    name: 'JsonFunction',
    functional: !0,
    props: { jsonValue: { type: Function, required: !0 } },
    render: function () {
      return dr('span', {
        class: { 'jv-item': !0, 'jv-function': !0 },
        attrs: { title: this.jsonValue.toString() },
        innerHTML: '&lt;function&gt;',
      })
    },
    __file: 'src/Components/types/json-function.vue',
  },
  qa = {
    name: 'JsonDate',
    inject: ['timeformat'],
    functional: !0,
    props: { jsonValue: { type: Date, required: !0 } },
    render: function () {
      var e = this.jsonValue,
        t = this.timeformat
      return dr('span', {
        class: { 'jv-item': !0, 'jv-string': !0 },
        innerText: '"'.concat(t(e), '"'),
      })
    },
    __file: 'src/Components/types/json-date.vue',
  },
  Ua = {
    name: 'JsonBox',
    inject: ['expandDepth'],
    props: {
      value: {
        type: [
          Object,
          Array,
          String,
          Number,
          Boolean,
          Function,
          Date,
        ],
        default: null,
      },
      keyName: { type: String, default: '' },
      sort: Boolean,
      depth: { type: Number, default: 0 },
      previewMode: Boolean,
    },
    data: function () {
      return { expand: !0 }
    },
    mounted: function () {
      this.expand =
        this.previewMode ||
        !(this.depth >= this.expandDepth)
    },
    methods: {
      toggle: function () {
        this.expand = !this.expand
        try {
          this.$el.dispatchEvent(new Event('resized'))
        } catch (t) {
          var e = document.createEvent('Event')
          e.initEvent('resized', !0, !1),
            this.$el.dispatchEvent(e)
        }
      },
    },
    render: function () {
      var e,
        t = this,
        n = []
      null === this.value || void 0 === this.value
        ? (e = Ia)
        : Array.isArray(this.value)
        ? (e = Wa)
        : '[object Date]' ===
          Object.prototype.toString.call(this.value)
        ? (e = qa)
        : 'object' === Ra(this.value)
        ? (e = Na)
        : 'number' == typeof this.value
        ? (e = Da)
        : 'string' == typeof this.value
        ? (e = La)
        : 'boolean' == typeof this.value
        ? (e = Ha)
        : 'function' == typeof this.value && (e = Va)
      var o =
        this.keyName &&
        this.value &&
        (Array.isArray(this.value) ||
          ('object' === Ra(this.value) &&
            '[object Date]' !==
              Object.prototype.toString.call(this.value)))
      return (
        !this.previewMode &&
          o &&
          n.push(
            dr('span', {
              class: {
                'jv-toggle': !0,
                open: !!this.expand,
              },
              onClick: this.toggle,
            })
          ),
        this.keyName &&
          n.push(
            dr('span', {
              class: { 'jv-key': !0 },
              innerText: ''.concat(this.keyName, ':'),
            })
          ),
        n.push(
          dr(e, {
            class: { 'jv-push': !0 },
            jsonValue: this.value,
            keyName: this.keyName,
            sort: this.sort,
            depth: this.depth,
            expand: this.expand,
            previewMode: this.previewMode,
            'onUpdate:expand': function (e) {
              t.expand = e
            },
          })
        ),
        dr(
          'div',
          {
            class: {
              'jv-node': !0,
              'jv-key-node': Boolean(this.keyName) && !o,
              toggle: !this.previewMode && o,
            },
          },
          n
        )
      )
    },
    __file: 'src/Components/json-box.vue',
  },
  Ga = {
    name: 'JsonViewer',
    components: { JsonBox: Ua },
    props: {
      value: {
        type: [
          Object,
          Array,
          String,
          Number,
          Boolean,
          Function,
        ],
        required: !0,
      },
      expanded: { type: Boolean, default: !1 },
      expandDepth: { type: Number, default: 1 },
      copyable: { type: [Boolean, Object], default: !1 },
      sort: { type: Boolean, default: !1 },
      boxed: { type: Boolean, default: !1 },
      theme: { type: String, default: 'jv-light' },
      timeformat: {
        type: Function,
        default: function (e) {
          return e.toLocaleString()
        },
      },
      previewMode: { type: Boolean, default: !1 },
    },
    provide: function () {
      return {
        expandDepth: this.expandDepth,
        timeformat: this.timeformat,
      }
    },
    data: function () {
      return {
        copied: !1,
        expandableCode: !1,
        expandCode: this.expanded,
      }
    },
    computed: {
      jvClass: function () {
        return (
          'jv-container ' +
          this.theme +
          (this.boxed ? ' boxed' : '')
        )
      },
      copyText: function () {
        var e = this.copyable
        return {
          copyText: e.copyText || 'copy',
          copiedText: e.copiedText || 'copied!',
          timeout: e.timeout || 2e3,
          align: e.align,
        }
      },
    },
    watch: {
      value: function () {
        this.onResized()
      },
    },
    mounted: function () {
      var e,
        t,
        n,
        o,
        r = this
      ;(this.debounceResized =
        ((e = this.debResized.bind(this)),
        (t = 200),
        (o = Date.now()),
        function () {
          for (
            var r = arguments.length,
              i = new Array(r),
              a = 0;
            a < r;
            a++
          )
            i[a] = arguments[a]
          Date.now() - o < t && n && clearTimeout(n),
            (n = setTimeout(function () {
              e.apply(void 0, i)
            }, t)),
            (o = Date.now())
        })),
        this.boxed &&
          this.$refs.jsonBox &&
          (this.onResized(),
          this.$refs.jsonBox.$el.addEventListener(
            'resized',
            this.onResized,
            !0
          )),
        this.copyable &&
          new Fa(this.$refs.clip, {
            text: function () {
              return JSON.stringify(r.value, null, 2)
            },
          }).on('success', function (e) {
            r.onCopied(e)
          })
    },
    methods: {
      onResized: function () {
        this.debounceResized()
      },
      debResized: function () {
        var e = this
        this.$nextTick(function () {
          e.$refs.jsonBox &&
            (e.$refs.jsonBox.$el.clientHeight >= 250
              ? (e.expandableCode = !0)
              : (e.expandableCode = !1))
        })
      },
      onCopied: function (e) {
        var t = this
        this.copied ||
          ((this.copied = !0),
          setTimeout(function () {
            t.copied = !1
          }, this.copyText.timeout),
          this.$emit('copied', e))
      },
      toggleExpandCode: function () {
        this.expandCode = !this.expandCode
      },
    },
    render: function (e, t, n, o, r, i) {
      var a = bo('json-box')
      return (
        Po(),
        jo(
          'div',
          { class: i.jvClass },
          [
            n.copyable
              ? (Po(),
                jo(
                  'div',
                  {
                    key: 0,
                    class: 'jv-tooltip '.concat(
                      i.copyText.align || 'right'
                    ),
                  },
                  [
                    Bo(
                      'span',
                      {
                        ref: 'clip',
                        class: [
                          'jv-button',
                          { copied: r.copied },
                        ],
                      },
                      [
                        Uo(
                          e.$slots,
                          'copy',
                          { copied: r.copied },
                          function () {
                            return [
                              Io(
                                s(
                                  r.copied
                                    ? i.copyText.copiedText
                                    : i.copyText.copyText
                                ),
                                1
                              ),
                            ]
                          }
                        ),
                      ],
                      2
                    ),
                  ],
                  2
                ))
              : Do('v-if', !0),
            Bo(
              'div',
              {
                class: [
                  'jv-code',
                  { open: r.expandCode, boxed: n.boxed },
                ],
              },
              [
                Bo(
                  a,
                  {
                    ref: 'jsonBox',
                    value: n.value,
                    sort: n.sort,
                    'preview-mode': n.previewMode,
                  },
                  null,
                  8,
                  ['value', 'sort', 'preview-mode']
                ),
              ],
              2
            ),
            r.expandableCode && n.boxed
              ? (Po(),
                jo(
                  'div',
                  {
                    key: 1,
                    class: 'jv-more',
                    onClick:
                      t[1] ||
                      (t[1] = function () {
                        return (
                          i.toggleExpandCode &&
                          i.toggleExpandCode.apply(
                            i,
                            arguments
                          )
                        )
                      }),
                  },
                  [
                    Bo(
                      'span',
                      {
                        class: [
                          'jv-toggle',
                          { open: !!r.expandCode },
                        ],
                      },
                      null,
                      2
                    ),
                  ]
                ))
              : Do('v-if', !0),
          ],
          2
        )
      )
    },
    __file: 'src/Components/json-viewer.vue',
  },
  Ka = {
    install: function (e) {
      e.component(Ga.name, Ga)
    },
  }
let Ya = []
const Xa = new WeakMap()
function Za() {
  Ya.forEach((e) => e(...Xa.get(e))), (Ya = [])
}
function Ja(e, ...t) {
  Xa.set(e, t),
    Ya.includes(e) ||
      (1 === Ya.push(e) && requestAnimationFrame(Za))
}
function Qa(e, t) {
  let { target: n } = e
  for (; n; ) {
    if (n.dataset && void 0 !== n.dataset[t]) return !0
    n = n.parentElement
  }
  return !1
}
function el(e) {
  return 'string' == typeof e
    ? e.endsWith('px')
      ? Number(e.slice(0, e.length - 2))
      : Number(e)
    : e
}
function tl(e) {
  if (null != e)
    return 'number' == typeof e
      ? `${e}px`
      : e.endsWith('px')
      ? e
      : `${e}px`
}
function nl(e, t) {
  const n = e.trim().split(/\s+/g),
    o = { top: n[0] }
  switch (n.length) {
    case 1:
      ;(o.right = n[0]), (o.bottom = n[0]), (o.left = n[0])
      break
    case 2:
      ;(o.right = n[1]), (o.left = n[1]), (o.bottom = n[0])
      break
    case 3:
      ;(o.right = n[1]), (o.bottom = n[2]), (o.left = n[1])
      break
    case 4:
      ;(o.right = n[1]), (o.bottom = n[2]), (o.left = n[3])
      break
    default:
      throw new Error(
        '[seemly/getMargin]:' + e + ' is not a valid value.'
      )
  }
  return void 0 === t ? o : o[t]
}
var ol = {
  black: '#000',
  silver: '#C0C0C0',
  gray: '#808080',
  white: '#FFF',
  maroon: '#800000',
  red: '#F00',
  purple: '#800080',
  fuchsia: '#F0F',
  green: '#008000',
  lime: '#0F0',
  olive: '#808000',
  yellow: '#FF0',
  navy: '#000080',
  blue: '#00F',
  teal: '#008080',
  aqua: '#0FF',
  transparent: '#0000',
}
const rl = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*',
  il = '([0-9A-Fa-f])',
  al = '([0-9A-Fa-f]{2})',
  ll = new RegExp(
    `^\\s*rgb\\s*\\(${rl},${rl},${rl}\\)\\s*$`
  ),
  sl = new RegExp(
    `^\\s*rgba\\s*\\(${rl},${rl},${rl},${rl}\\)\\s*$`
  ),
  cl = new RegExp(`^\\s*#${il}${il}${il}\\s*$`),
  ul = new RegExp(`^\\s*#${al}${al}${al}\\s*$`),
  dl = new RegExp(`^\\s*#${il}${il}${il}${il}\\s*$`),
  fl = new RegExp(`^\\s*#${al}${al}${al}${al}\\s*$`)
function pl(e) {
  return parseInt(e, 16)
}
function hl(e) {
  try {
    let t
    if ((t = ul.exec(e)))
      return [pl(t[1]), pl(t[2]), pl(t[3]), 1]
    if ((t = ll.exec(e)))
      return [wl(t[1]), wl(t[5]), wl(t[9]), 1]
    if ((t = sl.exec(e)))
      return [wl(t[1]), wl(t[5]), wl(t[9]), xl(t[13])]
    if ((t = cl.exec(e)))
      return [
        pl(t[1] + t[1]),
        pl(t[2] + t[2]),
        pl(t[3] + t[3]),
        1,
      ]
    if ((t = fl.exec(e)))
      return [
        pl(t[1]),
        pl(t[2]),
        pl(t[3]),
        xl(pl(t[4]) / 255),
      ]
    if ((t = dl.exec(e)))
      return [
        pl(t[1] + t[1]),
        pl(t[2] + t[2]),
        pl(t[3] + t[3]),
        xl(pl(t[4] + t[4]) / 255),
      ]
    if (e in ol) return hl(ol[e])
    throw new Error(
      `[seemly/rgba]: Invalid color value ${e}.`
    )
  } catch (t) {
    throw t
  }
}
function vl(e, t, n, o) {
  return `rgba(${wl(e)}, ${wl(t)}, ${wl(n)}, ${
    ((r = o), r > 1 ? 1 : r < 0 ? 0 : r)
  })`
  var r
}
function gl(e, t, n, o, r) {
  return wl((e * t * (1 - o) + n * o) / r)
}
function bl(e, t) {
  Array.isArray(e) || (e = hl(e)),
    Array.isArray(t) || (t = hl(t))
  const n = e[3],
    o = t[3],
    r = xl(n + o - n * o)
  return vl(
    gl(e[0], n, t[0], o, r),
    gl(e[1], n, t[1], o, r),
    gl(e[2], n, t[2], o, r),
    r
  )
}
function ml(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : hl(e)
  return t.alpha ? vl(n, o, r, t.alpha) : vl(n, o, r, i)
}
function yl(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : hl(e),
    { lightness: a = 1, alpha: l = 1 } = t
  return (function (e) {
    const [t, n, o] = e
    if (3 in e)
      return `rgba(${wl(t)}, ${wl(n)}, ${wl(o)}, ${xl(
        e[3]
      )})`
    return `rgba(${wl(t)}, ${wl(n)}, ${wl(o)}, 1)`
  })([n * a, o * a, r * a, i * l])
}
function xl(e) {
  const t = Math.round(100 * Number(e)) / 100
  return t > 1 ? 1 : t < 0 ? 0 : t
}
function wl(e) {
  const t = Math.round(Number(e))
  return t > 255 ? 255 : t < 0 ? 0 : t
}
function Cl(e = 8) {
  return Math.random()
    .toString(16)
    .slice(2, 2 + e)
}
const Sl = Symbol('formItem')
function kl(
  e,
  {
    defaultSize: t = 'medium',
    mergedSize: n,
    mergedDisabled: o,
  } = {}
) {
  const r = Gt(Sl, null)
  Ut(Sl, null)
  const i = ur(
      n
        ? () => n(r)
        : () => {
            const { size: n } = e
            if (n) return n
            if (r) {
              const { mergedSize: e } = r
              if (void 0 !== e.value) return e.value
            }
            return t
          }
    ),
    a = ur(
      o
        ? () => o(r)
        : () => {
            const { disabled: t } = e
            return void 0 !== t
              ? t
              : !!r && r.disabled.value
          }
    )
  return (
    kn(() => {
      r && r.restoreValidation()
    }),
    {
      mergedSizeRef: i,
      mergedDisabledRef: a,
      nTriggerFormBlur() {
        r && r.handleContentBlur()
      },
      nTriggerFormChange() {
        r && r.handleContentChange()
      },
      nTriggerFormFocus() {
        r && r.handleContentFocus()
      },
      nTriggerFormInput() {
        r && r.handleContentInput()
      },
    }
  )
}
var $l =
    'object' == typeof global &&
    global &&
    global.Object === Object &&
    global,
  _l =
    'object' == typeof self &&
    self &&
    self.Object === Object &&
    self,
  zl = $l || _l || Function('return this')(),
  Pl = zl.Symbol,
  El = Object.prototype,
  Ol = El.hasOwnProperty,
  jl = El.toString,
  Tl = Pl ? Pl.toStringTag : void 0
var Al = Object.prototype.toString
var Ml = Pl ? Pl.toStringTag : void 0
function Fl(e) {
  return null == e
    ? void 0 === e
      ? '[object Undefined]'
      : '[object Null]'
    : Ml && Ml in Object(e)
    ? (function (e) {
        var t = Ol.call(e, Tl),
          n = e[Tl]
        try {
          e[Tl] = void 0
          var o = !0
        } catch (i) {}
        var r = jl.call(e)
        return o && (t ? (e[Tl] = n) : delete e[Tl]), r
      })(e)
    : (function (e) {
        return Al.call(e)
      })(e)
}
function Rl(e) {
  return null != e && 'object' == typeof e
}
function Bl(e) {
  return (
    'symbol' == typeof e ||
    (Rl(e) && '[object Symbol]' == Fl(e))
  )
}
var Ll = Array.isArray,
  Il = Pl ? Pl.prototype : void 0,
  Dl = Il ? Il.toString : void 0
function Hl(e) {
  if ('string' == typeof e) return e
  if (Ll(e))
    return (
      (function (e, t) {
        for (
          var n = -1,
            o = null == e ? 0 : e.length,
            r = Array(o);
          ++n < o;

        )
          r[n] = t(e[n], n, e)
        return r
      })(e, Hl) + ''
    )
  if (Bl(e)) return Dl ? Dl.call(e) : ''
  var t = e + ''
  return '0' == t && 1 / e == -Infinity ? '-0' : t
}
var Nl = /\s/
var Wl = /^\s+/
function Vl(e) {
  return e
    ? e
        .slice(
          0,
          (function (e) {
            for (
              var t = e.length;
              t-- && Nl.test(e.charAt(t));

            );
            return t
          })(e) + 1
        )
        .replace(Wl, '')
    : e
}
function ql(e) {
  var t = typeof e
  return null != e && ('object' == t || 'function' == t)
}
var Ul = /^[-+]0x[0-9a-f]+$/i,
  Gl = /^0b[01]+$/i,
  Kl = /^0o[0-7]+$/i,
  Yl = parseInt
function Xl(e) {
  return e
    ? Infinity ===
        (e = (function (e) {
          if ('number' == typeof e) return e
          if (Bl(e)) return NaN
          if (ql(e)) {
            var t =
              'function' == typeof e.valueOf
                ? e.valueOf()
                : e
            e = ql(t) ? t + '' : t
          }
          if ('string' != typeof e) return 0 === e ? e : +e
          e = Vl(e)
          var n = Gl.test(e)
          return n || Kl.test(e)
            ? Yl(e.slice(2), n ? 2 : 8)
            : Ul.test(e)
            ? NaN
            : +e
        })(e)) || -Infinity === e
      ? 17976931348623157e292 * (e < 0 ? -1 : 1)
      : e == e
      ? e
      : 0
    : 0 === e
    ? e
    : 0
}
function Zl(e) {
  return e
}
function Jl(e) {
  if (!ql(e)) return !1
  var t = Fl(e)
  return (
    '[object Function]' == t ||
    '[object GeneratorFunction]' == t ||
    '[object AsyncFunction]' == t ||
    '[object Proxy]' == t
  )
}
var Ql,
  es = zl['__core-js_shared__'],
  ts = (Ql = /[^.]+$/.exec(
    (es && es.keys && es.keys.IE_PROTO) || ''
  ))
    ? 'Symbol(src)_1.' + Ql
    : ''
var ns = Function.prototype.toString
function os(e) {
  if (null != e) {
    try {
      return ns.call(e)
    } catch (t) {}
    try {
      return e + ''
    } catch (t) {}
  }
  return ''
}
var rs = /^\[object .+?Constructor\]$/,
  is = Function.prototype,
  as = Object.prototype,
  ls = is.toString,
  ss = as.hasOwnProperty,
  cs = RegExp(
    '^' +
      ls
        .call(ss)
        .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  )
function us(e) {
  return (
    !(!ql(e) || ((t = e), ts && ts in t)) &&
    (Jl(e) ? cs : rs).test(os(e))
  )
  var t
}
function ds(e, t) {
  var n = (function (e, t) {
    return null == e ? void 0 : e[t]
  })(e, t)
  return us(n) ? n : void 0
}
var fs = ds(zl, 'WeakMap'),
  ps = Object.create,
  hs = (function () {
    function e() {}
    return function (t) {
      if (!ql(t)) return {}
      if (ps) return ps(t)
      e.prototype = t
      var n = new e()
      return (e.prototype = void 0), n
    }
  })()
function vs(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t)
    case 1:
      return e.call(t, n[0])
    case 2:
      return e.call(t, n[0], n[1])
    case 3:
      return e.call(t, n[0], n[1], n[2])
  }
  return e.apply(t, n)
}
function gs(e, t) {
  var n = -1,
    o = e.length
  for (t || (t = Array(o)); ++n < o; ) t[n] = e[n]
  return t
}
var bs = Date.now
var ms,
  ys,
  xs,
  ws = (function () {
    try {
      var e = ds(Object, 'defineProperty')
      return e({}, '', {}), e
    } catch (t) {}
  })(),
  Cs =
    ((ms = ws
      ? function (e, t) {
          return ws(e, 'toString', {
            configurable: !0,
            enumerable: !1,
            value:
              ((n = t),
              function () {
                return n
              }),
            writable: !0,
          })
          var n
        }
      : Zl),
    (ys = 0),
    (xs = 0),
    function () {
      var e = bs(),
        t = 16 - (e - xs)
      if (((xs = e), t > 0)) {
        if (++ys >= 800) return arguments[0]
      } else ys = 0
      return ms.apply(void 0, arguments)
    })
var Ss = /^(?:0|[1-9]\d*)$/
function ks(e, t) {
  var n = typeof e
  return (
    !!(t = null == t ? 9007199254740991 : t) &&
    ('number' == n || ('symbol' != n && Ss.test(e))) &&
    e > -1 &&
    e % 1 == 0 &&
    e < t
  )
}
function $s(e, t, n) {
  '__proto__' == t && ws
    ? ws(e, t, {
        configurable: !0,
        enumerable: !0,
        value: n,
        writable: !0,
      })
    : (e[t] = n)
}
function _s(e, t) {
  return e === t || (e != e && t != t)
}
var zs = Object.prototype.hasOwnProperty
function Ps(e, t, n) {
  var o = e[t]
  ;(zs.call(e, t) &&
    _s(o, n) &&
    (void 0 !== n || t in e)) ||
    $s(e, t, n)
}
function Es(e, t, n, o) {
  var r = !n
  n || (n = {})
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i],
      s = o ? o(n[l], e[l], l, n, e) : void 0
    void 0 === s && (s = e[l]),
      r ? $s(n, l, s) : Ps(n, l, s)
  }
  return n
}
var Os = Math.max
function js(e, t) {
  return Cs(
    (function (e, t, n) {
      return (
        (t = Os(void 0 === t ? e.length - 1 : t, 0)),
        function () {
          for (
            var o = arguments,
              r = -1,
              i = Os(o.length - t, 0),
              a = Array(i);
            ++r < i;

          )
            a[r] = o[t + r]
          r = -1
          for (var l = Array(t + 1); ++r < t; ) l[r] = o[r]
          return (l[t] = n(a)), vs(e, this, l)
        }
      )
    })(e, t, Zl),
    e + ''
  )
}
function Ts(e) {
  return (
    'number' == typeof e &&
    e > -1 &&
    e % 1 == 0 &&
    e <= 9007199254740991
  )
}
function As(e) {
  return null != e && Ts(e.length) && !Jl(e)
}
function Ms(e, t, n) {
  if (!ql(n)) return !1
  var o = typeof t
  return (
    !!('number' == o
      ? As(n) && ks(t, n.length)
      : 'string' == o && t in n) && _s(n[t], e)
  )
}
var Fs = Object.prototype
function Rs(e) {
  var t = e && e.constructor
  return (
    e === (('function' == typeof t && t.prototype) || Fs)
  )
}
function Bs(e) {
  return Rl(e) && '[object Arguments]' == Fl(e)
}
var Ls = Object.prototype,
  Is = Ls.hasOwnProperty,
  Ds = Ls.propertyIsEnumerable,
  Hs = Bs(
    (function () {
      return arguments
    })()
  )
    ? Bs
    : function (e) {
        return (
          Rl(e) &&
          Is.call(e, 'callee') &&
          !Ds.call(e, 'callee')
        )
      }
var Ns =
    'object' == typeof exports &&
    exports &&
    !exports.nodeType &&
    exports,
  Ws =
    Ns &&
    'object' == typeof module &&
    module &&
    !module.nodeType &&
    module,
  Vs = Ws && Ws.exports === Ns ? zl.Buffer : void 0,
  qs =
    (Vs ? Vs.isBuffer : void 0) ||
    function () {
      return !1
    },
  Us = {}
function Gs(e) {
  return function (t) {
    return e(t)
  }
}
;(Us['[object Float32Array]'] =
  Us['[object Float64Array]'] =
  Us['[object Int8Array]'] =
  Us['[object Int16Array]'] =
  Us['[object Int32Array]'] =
  Us['[object Uint8Array]'] =
  Us['[object Uint8ClampedArray]'] =
  Us['[object Uint16Array]'] =
  Us['[object Uint32Array]'] =
    !0),
  (Us['[object Arguments]'] =
    Us['[object Array]'] =
    Us['[object ArrayBuffer]'] =
    Us['[object Boolean]'] =
    Us['[object DataView]'] =
    Us['[object Date]'] =
    Us['[object Error]'] =
    Us['[object Function]'] =
    Us['[object Map]'] =
    Us['[object Number]'] =
    Us['[object Object]'] =
    Us['[object RegExp]'] =
    Us['[object Set]'] =
    Us['[object String]'] =
    Us['[object WeakMap]'] =
      !1)
var Ks =
    'object' == typeof exports &&
    exports &&
    !exports.nodeType &&
    exports,
  Ys =
    Ks &&
    'object' == typeof module &&
    module &&
    !module.nodeType &&
    module,
  Xs = Ys && Ys.exports === Ks && $l.process,
  Zs = (function () {
    try {
      var e = Ys && Ys.require && Ys.require('util').types
      return e || (Xs && Xs.binding && Xs.binding('util'))
    } catch (t) {}
  })(),
  Js = Zs && Zs.isTypedArray,
  Qs = Js
    ? Gs(Js)
    : function (e) {
        return Rl(e) && Ts(e.length) && !!Us[Fl(e)]
      },
  ec = Object.prototype.hasOwnProperty
function tc(e, t) {
  var n = Ll(e),
    o = !n && Hs(e),
    r = !n && !o && qs(e),
    i = !n && !o && !r && Qs(e),
    a = n || o || r || i,
    l = a
      ? (function (e, t) {
          for (var n = -1, o = Array(e); ++n < e; )
            o[n] = t(n)
          return o
        })(e.length, String)
      : [],
    s = l.length
  for (var c in e)
    (!t && !ec.call(e, c)) ||
      (a &&
        ('length' == c ||
          (r && ('offset' == c || 'parent' == c)) ||
          (i &&
            ('buffer' == c ||
              'byteLength' == c ||
              'byteOffset' == c)) ||
          ks(c, s))) ||
      l.push(c)
  return l
}
function nc(e, t) {
  return function (n) {
    return e(t(n))
  }
}
var oc = nc(Object.keys, Object),
  rc = Object.prototype.hasOwnProperty
function ic(e) {
  return As(e)
    ? tc(e)
    : (function (e) {
        if (!Rs(e)) return oc(e)
        var t = []
        for (var n in Object(e))
          rc.call(e, n) && 'constructor' != n && t.push(n)
        return t
      })(e)
}
var ac = Object.prototype.hasOwnProperty
function lc(e) {
  if (!ql(e))
    return (function (e) {
      var t = []
      if (null != e) for (var n in Object(e)) t.push(n)
      return t
    })(e)
  var t = Rs(e),
    n = []
  for (var o in e)
    ('constructor' != o || (!t && ac.call(e, o))) &&
      n.push(o)
  return n
}
function sc(e) {
  return As(e) ? tc(e, !0) : lc(e)
}
var cc = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  uc = /^\w*$/
function dc(e, t) {
  if (Ll(e)) return !1
  var n = typeof e
  return (
    !(
      'number' != n &&
      'symbol' != n &&
      'boolean' != n &&
      null != e &&
      !Bl(e)
    ) ||
    uc.test(e) ||
    !cc.test(e) ||
    (null != t && e in Object(t))
  )
}
var fc = ds(Object, 'create')
var pc = Object.prototype.hasOwnProperty
var hc = Object.prototype.hasOwnProperty
function vc(e) {
  var t = -1,
    n = null == e ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
function gc(e, t) {
  for (var n = e.length; n--; ) if (_s(e[n][0], t)) return n
  return -1
}
;(vc.prototype.clear = function () {
  ;(this.__data__ = fc ? fc(null) : {}), (this.size = 0)
}),
  (vc.prototype.delete = function (e) {
    var t = this.has(e) && delete this.__data__[e]
    return (this.size -= t ? 1 : 0), t
  }),
  (vc.prototype.get = function (e) {
    var t = this.__data__
    if (fc) {
      var n = t[e]
      return '__lodash_hash_undefined__' === n ? void 0 : n
    }
    return pc.call(t, e) ? t[e] : void 0
  }),
  (vc.prototype.has = function (e) {
    var t = this.__data__
    return fc ? void 0 !== t[e] : hc.call(t, e)
  }),
  (vc.prototype.set = function (e, t) {
    var n = this.__data__
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] =
        fc && void 0 === t
          ? '__lodash_hash_undefined__'
          : t),
      this
    )
  })
var bc = Array.prototype.splice
function mc(e) {
  var t = -1,
    n = null == e ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
;(mc.prototype.clear = function () {
  ;(this.__data__ = []), (this.size = 0)
}),
  (mc.prototype.delete = function (e) {
    var t = this.__data__,
      n = gc(t, e)
    return (
      !(n < 0) &&
      (n == t.length - 1 ? t.pop() : bc.call(t, n, 1),
      --this.size,
      !0)
    )
  }),
  (mc.prototype.get = function (e) {
    var t = this.__data__,
      n = gc(t, e)
    return n < 0 ? void 0 : t[n][1]
  }),
  (mc.prototype.has = function (e) {
    return gc(this.__data__, e) > -1
  }),
  (mc.prototype.set = function (e, t) {
    var n = this.__data__,
      o = gc(n, e)
    return (
      o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t),
      this
    )
  })
var yc = ds(zl, 'Map')
function xc(e, t) {
  var n,
    o,
    r = e.__data__
  return (
    'string' == (o = typeof (n = t)) ||
    'number' == o ||
    'symbol' == o ||
    'boolean' == o
      ? '__proto__' !== n
      : null === n
  )
    ? r['string' == typeof t ? 'string' : 'hash']
    : r.map
}
function wc(e) {
  var t = -1,
    n = null == e ? 0 : e.length
  for (this.clear(); ++t < n; ) {
    var o = e[t]
    this.set(o[0], o[1])
  }
}
;(wc.prototype.clear = function () {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new vc(),
      map: new (yc || mc)(),
      string: new vc(),
    })
}),
  (wc.prototype.delete = function (e) {
    var t = xc(this, e).delete(e)
    return (this.size -= t ? 1 : 0), t
  }),
  (wc.prototype.get = function (e) {
    return xc(this, e).get(e)
  }),
  (wc.prototype.has = function (e) {
    return xc(this, e).has(e)
  }),
  (wc.prototype.set = function (e, t) {
    var n = xc(this, e),
      o = n.size
    return (
      n.set(e, t), (this.size += n.size == o ? 0 : 1), this
    )
  })
function Cc(e, t) {
  if (
    'function' != typeof e ||
    (null != t && 'function' != typeof t)
  )
    throw new TypeError('Expected a function')
  var n = function () {
    var o = arguments,
      r = t ? t.apply(this, o) : o[0],
      i = n.cache
    if (i.has(r)) return i.get(r)
    var a = e.apply(this, o)
    return (n.cache = i.set(r, a) || i), a
  }
  return (n.cache = new (Cc.Cache || wc)()), n
}
Cc.Cache = wc
var Sc =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  kc = /\\(\\)?/g,
  $c = (function (e) {
    var t = Cc(e, function (e) {
        return 500 === n.size && n.clear(), e
      }),
      n = t.cache
    return t
  })(function (e) {
    var t = []
    return (
      46 === e.charCodeAt(0) && t.push(''),
      e.replace(Sc, function (e, n, o, r) {
        t.push(o ? r.replace(kc, '$1') : n || e)
      }),
      t
    )
  })
function _c(e) {
  return null == e ? '' : Hl(e)
}
function zc(e, t) {
  return Ll(e) ? e : dc(e, t) ? [e] : $c(_c(e))
}
function Pc(e) {
  if ('string' == typeof e || Bl(e)) return e
  var t = e + ''
  return '0' == t && 1 / e == -Infinity ? '-0' : t
}
function Ec(e, t) {
  for (
    var n = 0, o = (t = zc(t, e)).length;
    null != e && n < o;

  )
    e = e[Pc(t[n++])]
  return n && n == o ? e : void 0
}
function Oc(e, t, n) {
  var o = null == e ? void 0 : Ec(e, t)
  return void 0 === o ? n : o
}
function jc(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n]
  return e
}
var Tc = nc(Object.getPrototypeOf, Object),
  Ac = Function.prototype,
  Mc = Object.prototype,
  Fc = Ac.toString,
  Rc = Mc.hasOwnProperty,
  Bc = Fc.call(Object)
function Lc(e, t, n) {
  var o = e.length
  return (
    (n = void 0 === n ? o : n),
    !t && n >= o
      ? e
      : (function (e, t, n) {
          var o = -1,
            r = e.length
          t < 0 && (t = -t > r ? 0 : r + t),
            (n = n > r ? r : n) < 0 && (n += r),
            (r = t > n ? 0 : (n - t) >>> 0),
            (t >>>= 0)
          for (var i = Array(r); ++o < r; ) i[o] = e[o + t]
          return i
        })(e, t, n)
  )
}
var Ic = RegExp(
  '[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]'
)
function Dc(e) {
  return Ic.test(e)
}
var Hc = '[\\ud800-\\udfff]',
  Nc = '[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]',
  Wc = '\\ud83c[\\udffb-\\udfff]',
  Vc = '[^\\ud800-\\udfff]',
  qc = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  Uc = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  Gc = '(?:' + Nc + '|' + Wc + ')' + '?',
  Kc =
    '[\\ufe0e\\ufe0f]?' +
    Gc +
    ('(?:\\u200d(?:' +
      [Vc, qc, Uc].join('|') +
      ')[\\ufe0e\\ufe0f]?' +
      Gc +
      ')*'),
  Yc =
    '(?:' + [Vc + Nc + '?', Nc, qc, Uc, Hc].join('|') + ')',
  Xc = RegExp(Wc + '(?=' + Wc + ')|' + Yc + Kc, 'g')
function Zc(e) {
  return Dc(e)
    ? (function (e) {
        return e.match(Xc) || []
      })(e)
    : (function (e) {
        return e.split('')
      })(e)
}
var Jc,
  Qc =
    ((Jc = 'toUpperCase'),
    function (e) {
      var t = Dc((e = _c(e))) ? Zc(e) : void 0,
        n = t ? t[0] : e.charAt(0),
        o = t ? Lc(t, 1).join('') : e.slice(1)
      return n[Jc]() + o
    })
function eu(e, t, n, o) {
  var r = -1,
    i = null == e ? 0 : e.length
  for (o && i && (n = e[++r]); ++r < i; )
    n = t(n, e[r], r, e)
  return n
}
function tu(e) {
  var t = (this.__data__ = new mc(e))
  this.size = t.size
}
;(tu.prototype.clear = function () {
  ;(this.__data__ = new mc()), (this.size = 0)
}),
  (tu.prototype.delete = function (e) {
    var t = this.__data__,
      n = t.delete(e)
    return (this.size = t.size), n
  }),
  (tu.prototype.get = function (e) {
    return this.__data__.get(e)
  }),
  (tu.prototype.has = function (e) {
    return this.__data__.has(e)
  }),
  (tu.prototype.set = function (e, t) {
    var n = this.__data__
    if (n instanceof mc) {
      var o = n.__data__
      if (!yc || o.length < 199)
        return o.push([e, t]), (this.size = ++n.size), this
      n = this.__data__ = new wc(o)
    }
    return n.set(e, t), (this.size = n.size), this
  })
var nu =
    'object' == typeof exports &&
    exports &&
    !exports.nodeType &&
    exports,
  ou =
    nu &&
    'object' == typeof module &&
    module &&
    !module.nodeType &&
    module,
  ru = ou && ou.exports === nu ? zl.Buffer : void 0,
  iu = ru ? ru.allocUnsafe : void 0
function au(e, t) {
  if (t) return e.slice()
  var n = e.length,
    o = iu ? iu(n) : new e.constructor(n)
  return e.copy(o), o
}
function lu() {
  return []
}
var su = Object.prototype.propertyIsEnumerable,
  cu = Object.getOwnPropertySymbols,
  uu = cu
    ? function (e) {
        return null == e
          ? []
          : ((e = Object(e)),
            (function (e, t) {
              for (
                var n = -1,
                  o = null == e ? 0 : e.length,
                  r = 0,
                  i = [];
                ++n < o;

              ) {
                var a = e[n]
                t(a, n, e) && (i[r++] = a)
              }
              return i
            })(cu(e), function (t) {
              return su.call(e, t)
            }))
      }
    : lu
var du = Object.getOwnPropertySymbols
  ? function (e) {
      for (var t = []; e; ) jc(t, uu(e)), (e = Tc(e))
      return t
    }
  : lu
function fu(e, t, n) {
  var o = t(e)
  return Ll(e) ? o : jc(o, n(e))
}
function pu(e) {
  return fu(e, ic, uu)
}
function hu(e) {
  return fu(e, sc, du)
}
var vu = ds(zl, 'DataView'),
  gu = ds(zl, 'Promise'),
  bu = ds(zl, 'Set'),
  mu = os(vu),
  yu = os(yc),
  xu = os(gu),
  wu = os(bu),
  Cu = os(fs),
  Su = Fl
;((vu &&
  '[object DataView]' != Su(new vu(new ArrayBuffer(1)))) ||
  (yc && '[object Map]' != Su(new yc())) ||
  (gu && '[object Promise]' != Su(gu.resolve())) ||
  (bu && '[object Set]' != Su(new bu())) ||
  (fs && '[object WeakMap]' != Su(new fs()))) &&
  (Su = function (e) {
    var t = Fl(e),
      n = '[object Object]' == t ? e.constructor : void 0,
      o = n ? os(n) : ''
    if (o)
      switch (o) {
        case mu:
          return '[object DataView]'
        case yu:
          return '[object Map]'
        case xu:
          return '[object Promise]'
        case wu:
          return '[object Set]'
        case Cu:
          return '[object WeakMap]'
      }
    return t
  })
var ku = Su,
  $u = Object.prototype.hasOwnProperty
var _u = zl.Uint8Array
function zu(e) {
  var t = new e.constructor(e.byteLength)
  return new _u(t).set(new _u(e)), t
}
var Pu = /\w*$/
var Eu = Pl ? Pl.prototype : void 0,
  Ou = Eu ? Eu.valueOf : void 0
function ju(e, t) {
  var n = t ? zu(e.buffer) : e.buffer
  return new e.constructor(n, e.byteOffset, e.length)
}
function Tu(e, t, n) {
  var o,
    r,
    i,
    a = e.constructor
  switch (t) {
    case '[object ArrayBuffer]':
      return zu(e)
    case '[object Boolean]':
    case '[object Date]':
      return new a(+e)
    case '[object DataView]':
      return (function (e, t) {
        var n = t ? zu(e.buffer) : e.buffer
        return new e.constructor(
          n,
          e.byteOffset,
          e.byteLength
        )
      })(e, n)
    case '[object Float32Array]':
    case '[object Float64Array]':
    case '[object Int8Array]':
    case '[object Int16Array]':
    case '[object Int32Array]':
    case '[object Uint8Array]':
    case '[object Uint8ClampedArray]':
    case '[object Uint16Array]':
    case '[object Uint32Array]':
      return ju(e, n)
    case '[object Map]':
      return new a()
    case '[object Number]':
    case '[object String]':
      return new a(e)
    case '[object RegExp]':
      return (
        ((i = new (r = e).constructor(
          r.source,
          Pu.exec(r)
        )).lastIndex = r.lastIndex),
        i
      )
    case '[object Set]':
      return new a()
    case '[object Symbol]':
      return (o = e), Ou ? Object(Ou.call(o)) : {}
  }
}
function Au(e) {
  return 'function' != typeof e.constructor || Rs(e)
    ? {}
    : hs(Tc(e))
}
var Mu = Zs && Zs.isMap,
  Fu = Mu
    ? Gs(Mu)
    : function (e) {
        return Rl(e) && '[object Map]' == ku(e)
      }
var Ru = Zs && Zs.isSet,
  Bu = Ru
    ? Gs(Ru)
    : function (e) {
        return Rl(e) && '[object Set]' == ku(e)
      },
  Lu = {}
function Iu(e, t, n, o, r, i) {
  var a,
    l = 1 & t,
    s = 2 & t,
    c = 4 & t
  if ((n && (a = r ? n(e, o, r, i) : n(e)), void 0 !== a))
    return a
  if (!ql(e)) return e
  var u = Ll(e)
  if (u) {
    if (
      ((a = (function (e) {
        var t = e.length,
          n = new e.constructor(t)
        return (
          t &&
            'string' == typeof e[0] &&
            $u.call(e, 'index') &&
            ((n.index = e.index), (n.input = e.input)),
          n
        )
      })(e)),
      !l)
    )
      return gs(e, a)
  } else {
    var d = ku(e),
      f =
        '[object Function]' == d ||
        '[object GeneratorFunction]' == d
    if (qs(e)) return au(e, l)
    if (
      '[object Object]' == d ||
      '[object Arguments]' == d ||
      (f && !r)
    ) {
      if (((a = s || f ? {} : Au(e)), !l))
        return s
          ? (function (e, t) {
              return Es(e, du(e), t)
            })(
              e,
              (function (e, t) {
                return e && Es(t, sc(t), e)
              })(a, e)
            )
          : (function (e, t) {
              return Es(e, uu(e), t)
            })(
              e,
              (function (e, t) {
                return e && Es(t, ic(t), e)
              })(a, e)
            )
    } else {
      if (!Lu[d]) return r ? e : {}
      a = Tu(e, d, l)
    }
  }
  i || (i = new tu())
  var p = i.get(e)
  if (p) return p
  i.set(e, a),
    Bu(e)
      ? e.forEach(function (o) {
          a.add(Iu(o, t, n, o, e, i))
        })
      : Fu(e) &&
        e.forEach(function (o, r) {
          a.set(r, Iu(o, t, n, r, e, i))
        })
  var h = u ? void 0 : (c ? (s ? hu : pu) : s ? sc : ic)(e)
  return (
    (function (e, t) {
      for (
        var n = -1, o = null == e ? 0 : e.length;
        ++n < o && !1 !== t(e[n], n, e);

      );
    })(h || e, function (o, r) {
      h && (o = e[(r = o)]), Ps(a, r, Iu(o, t, n, r, e, i))
    }),
    a
  )
}
;(Lu['[object Arguments]'] =
  Lu['[object Array]'] =
  Lu['[object ArrayBuffer]'] =
  Lu['[object DataView]'] =
  Lu['[object Boolean]'] =
  Lu['[object Date]'] =
  Lu['[object Float32Array]'] =
  Lu['[object Float64Array]'] =
  Lu['[object Int8Array]'] =
  Lu['[object Int16Array]'] =
  Lu['[object Int32Array]'] =
  Lu['[object Map]'] =
  Lu['[object Number]'] =
  Lu['[object Object]'] =
  Lu['[object RegExp]'] =
  Lu['[object Set]'] =
  Lu['[object String]'] =
  Lu['[object Symbol]'] =
  Lu['[object Uint8Array]'] =
  Lu['[object Uint8ClampedArray]'] =
  Lu['[object Uint16Array]'] =
  Lu['[object Uint32Array]'] =
    !0),
  (Lu['[object Error]'] =
    Lu['[object Function]'] =
    Lu['[object WeakMap]'] =
      !1)
function Du(e) {
  return Iu(e, 5)
}
function Hu(e) {
  var t = -1,
    n = null == e ? 0 : e.length
  for (this.__data__ = new wc(); ++t < n; ) this.add(e[t])
}
function Nu(e, t) {
  for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e)) return !0
  return !1
}
;(Hu.prototype.add = Hu.prototype.push =
  function (e) {
    return (
      this.__data__.set(e, '__lodash_hash_undefined__'),
      this
    )
  }),
  (Hu.prototype.has = function (e) {
    return this.__data__.has(e)
  })
function Wu(e, t, n, o, r, i) {
  var a = 1 & n,
    l = e.length,
    s = t.length
  if (l != s && !(a && s > l)) return !1
  var c = i.get(e),
    u = i.get(t)
  if (c && u) return c == t && u == e
  var d = -1,
    f = !0,
    p = 2 & n ? new Hu() : void 0
  for (i.set(e, t), i.set(t, e); ++d < l; ) {
    var h = e[d],
      v = t[d]
    if (o)
      var g = a ? o(v, h, d, t, e, i) : o(h, v, d, e, t, i)
    if (void 0 !== g) {
      if (g) continue
      f = !1
      break
    }
    if (p) {
      if (
        !Nu(t, function (e, t) {
          if (
            ((a = t),
            !p.has(a) && (h === e || r(h, e, n, o, i)))
          )
            return p.push(t)
          var a
        })
      ) {
        f = !1
        break
      }
    } else if (h !== v && !r(h, v, n, o, i)) {
      f = !1
      break
    }
  }
  return i.delete(e), i.delete(t), f
}
function Vu(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function (e, o) {
      n[++t] = [o, e]
    }),
    n
  )
}
function qu(e) {
  var t = -1,
    n = Array(e.size)
  return (
    e.forEach(function (e) {
      n[++t] = e
    }),
    n
  )
}
var Uu = Pl ? Pl.prototype : void 0,
  Gu = Uu ? Uu.valueOf : void 0
var Ku = Object.prototype.hasOwnProperty
var Yu = '[object Object]',
  Xu = Object.prototype.hasOwnProperty
function Zu(e, t, n, o, r, i) {
  var a = Ll(e),
    l = Ll(t),
    s = a ? '[object Array]' : ku(e),
    c = l ? '[object Array]' : ku(t),
    u = (s = '[object Arguments]' == s ? Yu : s) == Yu,
    d = (c = '[object Arguments]' == c ? Yu : c) == Yu,
    f = s == c
  if (f && qs(e)) {
    if (!qs(t)) return !1
    ;(a = !0), (u = !1)
  }
  if (f && !u)
    return (
      i || (i = new tu()),
      a || Qs(e)
        ? Wu(e, t, n, o, r, i)
        : (function (e, t, n, o, r, i, a) {
            switch (n) {
              case '[object DataView]':
                if (
                  e.byteLength != t.byteLength ||
                  e.byteOffset != t.byteOffset
                )
                  return !1
                ;(e = e.buffer), (t = t.buffer)
              case '[object ArrayBuffer]':
                return !(
                  e.byteLength != t.byteLength ||
                  !i(new _u(e), new _u(t))
                )
              case '[object Boolean]':
              case '[object Date]':
              case '[object Number]':
                return _s(+e, +t)
              case '[object Error]':
                return (
                  e.name == t.name && e.message == t.message
                )
              case '[object RegExp]':
              case '[object String]':
                return e == t + ''
              case '[object Map]':
                var l = Vu
              case '[object Set]':
                var s = 1 & o
                if ((l || (l = qu), e.size != t.size && !s))
                  return !1
                var c = a.get(e)
                if (c) return c == t
                ;(o |= 2), a.set(e, t)
                var u = Wu(l(e), l(t), o, r, i, a)
                return a.delete(e), u
              case '[object Symbol]':
                if (Gu) return Gu.call(e) == Gu.call(t)
            }
            return !1
          })(e, t, s, n, o, r, i)
    )
  if (!(1 & n)) {
    var p = u && Xu.call(e, '__wrapped__'),
      h = d && Xu.call(t, '__wrapped__')
    if (p || h) {
      var v = p ? e.value() : e,
        g = h ? t.value() : t
      return i || (i = new tu()), r(v, g, n, o, i)
    }
  }
  return (
    !!f &&
    (i || (i = new tu()),
    (function (e, t, n, o, r, i) {
      var a = 1 & n,
        l = pu(e),
        s = l.length
      if (s != pu(t).length && !a) return !1
      for (var c = s; c--; ) {
        var u = l[c]
        if (!(a ? u in t : Ku.call(t, u))) return !1
      }
      var d = i.get(e),
        f = i.get(t)
      if (d && f) return d == t && f == e
      var p = !0
      i.set(e, t), i.set(t, e)
      for (var h = a; ++c < s; ) {
        var v = e[(u = l[c])],
          g = t[u]
        if (o)
          var b = a
            ? o(g, v, u, t, e, i)
            : o(v, g, u, e, t, i)
        if (
          !(void 0 === b ? v === g || r(v, g, n, o, i) : b)
        ) {
          p = !1
          break
        }
        h || (h = 'constructor' == u)
      }
      if (p && !h) {
        var m = e.constructor,
          y = t.constructor
        m == y ||
          !('constructor' in e) ||
          !('constructor' in t) ||
          ('function' == typeof m &&
            m instanceof m &&
            'function' == typeof y &&
            y instanceof y) ||
          (p = !1)
      }
      return i.delete(e), i.delete(t), p
    })(e, t, n, o, r, i))
  )
}
function Ju(e, t, n, o, r) {
  return (
    e === t ||
    (null == e || null == t || (!Rl(e) && !Rl(t))
      ? e != e && t != t
      : Zu(e, t, n, o, Ju, r))
  )
}
function Qu(e) {
  return e == e && !ql(e)
}
function ed(e, t) {
  return function (n) {
    return (
      null != n &&
      n[e] === t &&
      (void 0 !== t || e in Object(n))
    )
  }
}
function td(e) {
  var t = (function (e) {
    for (var t = ic(e), n = t.length; n--; ) {
      var o = t[n],
        r = e[o]
      t[n] = [o, r, Qu(r)]
    }
    return t
  })(e)
  return 1 == t.length && t[0][2]
    ? ed(t[0][0], t[0][1])
    : function (n) {
        return (
          n === e ||
          (function (e, t, n, o) {
            var r = n.length,
              i = r,
              a = !o
            if (null == e) return !i
            for (e = Object(e); r--; ) {
              var l = n[r]
              if (
                a && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)
              )
                return !1
            }
            for (; ++r < i; ) {
              var s = (l = n[r])[0],
                c = e[s],
                u = l[1]
              if (a && l[2]) {
                if (void 0 === c && !(s in e)) return !1
              } else {
                var d = new tu()
                if (o) var f = o(c, u, s, e, t, d)
                if (!(void 0 === f ? Ju(u, c, 3, o, d) : f))
                  return !1
              }
            }
            return !0
          })(n, e, t)
        )
      }
}
function nd(e, t) {
  return null != e && t in Object(e)
}
function od(e, t) {
  return (
    null != e &&
    (function (e, t, n) {
      for (
        var o = -1, r = (t = zc(t, e)).length, i = !1;
        ++o < r;

      ) {
        var a = Pc(t[o])
        if (!(i = null != e && n(e, a))) break
        e = e[a]
      }
      return i || ++o != r
        ? i
        : !!(r = null == e ? 0 : e.length) &&
            Ts(r) &&
            ks(a, r) &&
            (Ll(e) || Hs(e))
    })(e, t, nd)
  )
}
function rd(e) {
  return dc(e)
    ? ((t = Pc(e)),
      function (e) {
        return null == e ? void 0 : e[t]
      })
    : (function (e) {
        return function (t) {
          return Ec(t, e)
        }
      })(e)
  var t
}
function id(e) {
  return 'function' == typeof e
    ? e
    : null == e
    ? Zl
    : 'object' == typeof e
    ? Ll(e)
      ? ((t = e[0]),
        (n = e[1]),
        dc(t) && Qu(n)
          ? ed(Pc(t), n)
          : function (e) {
              var o = Oc(e, t)
              return void 0 === o && o === n
                ? od(e, t)
                : Ju(n, o, 3)
            })
      : td(e)
    : rd(e)
  var t, n
}
var ad,
  ld = function (e, t, n) {
    for (
      var o = -1, r = Object(e), i = n(e), a = i.length;
      a--;

    ) {
      var l = i[ad ? a : ++o]
      if (!1 === t(r[l], l, r)) break
    }
    return e
  }
var sd = (function (e, t) {
  return function (n, o) {
    if (null == n) return n
    if (!As(n)) return e(n, o)
    for (
      var r = n.length, i = t ? r : -1, a = Object(n);
      (t ? i-- : ++i < r) && !1 !== o(a[i], i, a);

    );
    return n
  }
})(function (e, t) {
  return e && ld(e, t, ic)
})
function cd(e, t, n) {
  ;((void 0 !== n && !_s(e[t], n)) ||
    (void 0 === n && !(t in e))) &&
    $s(e, t, n)
}
function ud(e, t) {
  if (
    ('constructor' !== t || 'function' != typeof e[t]) &&
    '__proto__' != t
  )
    return e[t]
}
function dd(e, t, n, o, r, i, a) {
  var l = ud(e, n),
    s = ud(t, n),
    c = a.get(s)
  if (c) cd(e, n, c)
  else {
    var u,
      d = i ? i(l, s, n + '', e, t, a) : void 0,
      f = void 0 === d
    if (f) {
      var p = Ll(s),
        h = !p && qs(s),
        v = !p && !h && Qs(s)
      ;(d = s),
        p || h || v
          ? Ll(l)
            ? (d = l)
            : Rl((u = l)) && As(u)
            ? (d = gs(l))
            : h
            ? ((f = !1), (d = au(s, !0)))
            : v
            ? ((f = !1), (d = ju(s, !0)))
            : (d = [])
          : (function (e) {
              if (!Rl(e) || '[object Object]' != Fl(e))
                return !1
              var t = Tc(e)
              if (null === t) return !0
              var n =
                Rc.call(t, 'constructor') && t.constructor
              return (
                'function' == typeof n &&
                n instanceof n &&
                Fc.call(n) == Bc
              )
            })(s) || Hs(s)
          ? ((d = l),
            Hs(l)
              ? (d = (function (e) {
                  return Es(e, sc(e))
                })(l))
              : (ql(l) && !Jl(l)) || (d = Au(s)))
          : (f = !1)
    }
    f && (a.set(s, d), r(d, s, o, i, a), a.delete(s)),
      cd(e, n, d)
  }
}
function fd(e, t, n, o, r) {
  e !== t &&
    ld(
      t,
      function (i, a) {
        if ((r || (r = new tu()), ql(i)))
          dd(e, t, a, n, fd, o, r)
        else {
          var l = o
            ? o(ud(e, a), i, a + '', e, t, r)
            : void 0
          void 0 === l && (l = i), cd(e, a, l)
        }
      },
      sc
    )
}
var pd,
  hd =
    ((pd = function (e, t, n) {
      fd(e, t, n)
    }),
    js(function (e, t) {
      var n = -1,
        o = t.length,
        r = o > 1 ? t[o - 1] : void 0,
        i = o > 2 ? t[2] : void 0
      for (
        r =
          pd.length > 3 && 'function' == typeof r
            ? (o--, r)
            : void 0,
          i &&
            Ms(t[0], t[1], i) &&
            ((r = o < 3 ? void 0 : r), (o = 1)),
          e = Object(e);
        ++n < o;

      ) {
        var a = t[n]
        a && pd(e, a, n, r)
      }
      return e
    })),
  vd = Math.floor,
  gd = Math.random
var bd = parseFloat,
  md = Math.min,
  yd = Math.random
function xd(e, t, n) {
  if (
    (n &&
      'boolean' != typeof n &&
      Ms(e, t, n) &&
      (t = n = void 0),
    void 0 === n &&
      ('boolean' == typeof t
        ? ((n = t), (t = void 0))
        : 'boolean' == typeof e && ((n = e), (e = void 0))),
    void 0 === e && void 0 === t
      ? ((e = 0), (t = 1))
      : ((e = Xl(e)),
        void 0 === t ? ((t = e), (e = 0)) : (t = Xl(t))),
    e > t)
  ) {
    var o = e
    ;(e = t), (t = o)
  }
  if (n || e % 1 || t % 1) {
    var r = yd()
    return md(
      e + r * (t - e + bd('1e-' + ((r + '').length - 1))),
      t
    )
  }
  return (function (e, t) {
    return e + vd(gd() * (t - e + 1))
  })(e, t)
}
function wd(e, t, n, o, r) {
  return (
    r(e, function (e, r, i) {
      n = o ? ((o = !1), e) : t(n, e, r, i)
    }),
    n
  )
}
function Cd(e, t, n) {
  var o = Ll(e) ? eu : wd,
    r = arguments.length < 3
  return o(e, id(t), n, r, sd)
}
const Sd = Symbol('@css-render/vue3-ssr')
function kd(e, t) {
  const n = Gt(Sd, null)
  if (null === n)
    return void console.error(
      '[css-render/vue3-ssr]: no ssr context found.'
    )
  const { styles: o, ids: r } = n
  r.has(e) ||
    (null !== o &&
      (r.add(e),
      o.push(
        (function (e, t) {
          return `<style cssr-id="${e}">\n${t}\n</style>`
        })(e, t)
      )))
}
function $d() {
  const e = Gt(Sd, null)
  if (null !== e) return { adapter: kd, context: e }
}
const _d = /\s*,(?![^(]*\))\s*/g,
  zd = /\s+/g
function Pd(e) {
  let t = ['']
  return (
    e.forEach((e) => {
      ;(e = e && e.trim()) &&
        (t = e.includes('&')
          ? (function (e, t) {
              const n = []
              return (
                t.split(_d).forEach((t) => {
                  let o = (function (e) {
                    let t = 0
                    for (let n = 0; n < e.length; ++n)
                      '&' === e[n] && ++t
                    return t
                  })(t)
                  if (!o)
                    return void e.forEach((e) => {
                      n.push((e && e + ' ') + t)
                    })
                  if (1 === o)
                    return void e.forEach((e) => {
                      n.push(t.replace('&', e))
                    })
                  let r = [t]
                  for (; o--; ) {
                    const t = []
                    r.forEach((n) => {
                      e.forEach((e) => {
                        t.push(n.replace('&', e))
                      })
                    }),
                      (r = t)
                  }
                  r.forEach((e) => n.push(e))
                }),
                n
              )
            })(t, e)
          : (function (e, t) {
              const n = []
              return (
                t.split(_d).forEach((t) => {
                  e.forEach((e) => {
                    n.push((e && e + ' ') + t)
                  })
                }),
                n
              )
            })(t, e))
    }),
    t.join(', ').replace(zd, ' ')
  )
}
const Ed = /[A-Z]/g
function Od(e) {
  return e.replace(Ed, (e) => '-' + e.toLowerCase())
}
function jd(e, t, n, o) {
  if (!t) return ''
  const r = (function (e, t, n) {
    return 'function' == typeof e
      ? e({ context: t.context, props: n })
      : e
  })(t, n, o)
  if (!r) return ''
  if ('string' == typeof r) return `${e} {\n${r}\n}`
  const i = Object.keys(r)
  if (0 === i.length)
    return n.config.keepEmptyBlock ? e + ' {\n}' : ''
  const a = e ? [e + ' {'] : []
  return (
    i.forEach((e) => {
      const t = r[e]
      'raw' !== e
        ? ((e = Od(e)),
          null != t &&
            a.push(
              `  ${e}${(function (e, t = '  ') {
                return 'object' == typeof e && null !== e
                  ? ' {\n' +
                      Object.entries(e)
                        .map(
                          (e) =>
                            t + `  ${Od(e[0])}: ${e[1]};`
                        )
                        .join('\n') +
                      '\n' +
                      t +
                      '}'
                  : `: ${e};`
              })(t)}`
            ))
        : a.push('\n' + t + '\n')
    }),
    e && a.push('}'),
    a.join('\n')
  )
}
function Td(e, t, n) {
  e &&
    e.forEach((e) => {
      if (Array.isArray(e)) Td(e, t, n)
      else if ('function' == typeof e) {
        const o = e(t)
        Array.isArray(o) ? Td(o, t, n) : o && n(o)
      } else e && n(e)
    })
}
function Ad(e, t, n, o, r, i) {
  const a = e.$
  a && 'string' != typeof a
    ? 'function' == typeof a
      ? t.push(a({ context: o.context, props: r }))
      : (a.before && a.before(o.context),
        a.$ && 'string' != typeof a.$
          ? a.$ &&
            t.push(a.$({ context: o.context, props: r }))
          : t.push(a.$))
    : t.push(a)
  const l = Pd(t),
    s = jd(l, e.props, o, r)
  i && s && i.insertRule(s),
    !i && s.length && n.push(s),
    e.children &&
      Td(
        e.children,
        { context: o.context, props: r },
        (e) => {
          if ('string' == typeof e) {
            const t = jd(l, { raw: e }, o, r)
            i ? i.insertRule(t) : n.push(t)
          } else Ad(e, t, n, o, r, i)
        }
      ),
    t.pop(),
    a && a.after && a.after(o.context)
}
function Md(e, t, n, o = !1) {
  const r = []
  return (
    Ad(
      e,
      [],
      r,
      t,
      n,
      o ? e.instance.__styleSheet : void 0
    ),
    o ? '' : r.join('\n\n')
  )
}
function Fd(e) {
  if (!e) return
  const t = e.parentElement
  t && t.removeChild(e)
}
function Rd(e) {
  return document.querySelector(`style[cssr-id="${e}"]`)
}
function Bd(e, t, n, o, r, i, a, l) {
  var s
  if (i && !l) {
    if (void 0 === n)
      return void console.error(
        '[css-render/mount]: `id` is required in `slient` mode.'
      )
    const r = window.__cssrContext
    return void (r[n] || ((r[n] = !0), Md(t, e, o, i)))
  }
  let c
  if (
    (void 0 === n &&
      ((c = t.render(o)),
      (n = (function (e) {
        for (
          var t, n = 0, o = 0, r = e.length;
          r >= 4;
          ++o, r -= 4
        )
          (t =
            1540483477 *
              (65535 &
                (t =
                  (255 & e.charCodeAt(o)) |
                  ((255 & e.charCodeAt(++o)) << 8) |
                  ((255 & e.charCodeAt(++o)) << 16) |
                  ((255 & e.charCodeAt(++o)) << 24))) +
            ((59797 * (t >>> 16)) << 16)),
            (n =
              (1540483477 * (65535 & (t ^= t >>> 24)) +
                ((59797 * (t >>> 16)) << 16)) ^
              (1540483477 * (65535 & n) +
                ((59797 * (n >>> 16)) << 16)))
        switch (r) {
          case 3:
            n ^= (255 & e.charCodeAt(o + 2)) << 16
          case 2:
            n ^= (255 & e.charCodeAt(o + 1)) << 8
          case 1:
            n =
              1540483477 *
                (65535 & (n ^= 255 & e.charCodeAt(o))) +
              ((59797 * (n >>> 16)) << 16)
        }
        return (
          ((n =
            1540483477 * (65535 & (n ^= n >>> 13)) +
            ((59797 * (n >>> 16)) << 16)) ^
            (n >>> 15)) >>>
          0
        ).toString(36)
      })(c))),
    l)
  )
    return void l.adapter(n, null != c ? c : t.render(o))
  const u = Rd(n)
  if (null !== u && !a) return u
  const d =
    null != u
      ? u
      : (function (e) {
          const t = document.createElement('style')
          return t.setAttribute('cssr-id', e), t
        })(n)
  if (
    (void 0 === c && (c = t.render(o)),
    (d.textContent = c),
    null !== u)
  )
    return u
  if (r) {
    const e =
      null !==
        (s = document.head.querySelector('style, link')) &&
      void 0 !== s
        ? s
        : null
    document.head.insertBefore(d, e)
  } else document.head.appendChild(d)
  return (
    (function (e, t) {
      e.push(t)
    })(t.els, d),
    null != u ? u : d
  )
}
function Ld(e) {
  return Md(this, this.instance, e)
}
function Id(e = {}) {
  const {
    id: t,
    ssr: n,
    props: o,
    head: r = !1,
    slient: i = !1,
    force: a = !1,
  } = e
  return Bd(this.instance, this, t, o, r, i, a, n)
}
function Dd(e = {}) {
  const { id: t } = e
  !(function (e, t, n) {
    const { els: o } = t
    if (void 0 === n) o.forEach(Fd), (t.els = [])
    else {
      const e = Rd(n)
      e &&
        o.includes(e) &&
        (Fd(e), (t.els = o.filter((t) => t !== e)))
    }
  })(this.instance, this, t)
}
'undefined' != typeof window && (window.__cssrContext = {})
const Hd = function (e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: Ld,
    mount: Id,
    unmount: Dd,
  }
}
function Nd(e = {}) {
  let t = null
  const n = {
    c: (...e) =>
      (function (e, t, n, o) {
        return Array.isArray(t)
          ? Hd(e, { $: null }, null, t)
          : Array.isArray(n)
          ? Hd(e, t, null, n)
          : Array.isArray(o)
          ? Hd(e, t, n, o)
          : Hd(e, t, n, null)
      })(n, ...e),
    use: (e, ...t) => e.install(n, ...t),
    find: Rd,
    context: {},
    config: e,
    get __styleSheet() {
      if (!t) {
        const e = document.createElement('style')
        return (
          document.head.appendChild(e),
          (t =
            document.styleSheets[
              document.styleSheets.length - 1
            ]),
          t
        )
      }
      return t
    },
  }
  return n
}
function Wd(e, t) {
  return (
    e +
    ('default' === t
      ? ''
      : t.replace(/^[a-z]/, (e) => e.toUpperCase()))
  )
}
Wd('abc', 'def')
const Vd = Nd(),
  qd = (function (e) {
    let t,
      n = '.',
      o = '__',
      r = '--'
    if (e) {
      let t = e.blockPrefix
      t && (n = t),
        (t = e.elementPrefix),
        t && (o = t),
        (t = e.modifierPrefix),
        t && (r = t)
    }
    const i = {
      install(e) {
        t = e.c
        const n = e.context
        ;(n.bem = {}), (n.bem.b = null), (n.bem.els = null)
      },
    }
    return (
      Object.assign(i, {
        cB: (...e) =>
          t(
            (function (e) {
              let t, o
              return {
                before(e) {
                  ;(t = e.bem.b),
                    (o = e.bem.els),
                    (e.bem.els = null)
                },
                after(e) {
                  ;(e.bem.b = t), (e.bem.els = o)
                },
                $: ({ context: t, props: o }) => (
                  (e =
                    'string' == typeof e
                      ? e
                      : e({ context: t, props: o })),
                  (t.bem.b = e),
                  `${
                    (null == o ? void 0 : o.bPrefix) || n
                  }${t.bem.b}`
                ),
              }
            })(e[0]),
            e[1],
            e[2]
          ),
        cE: (...e) =>
          t(
            (function (e) {
              let t
              return {
                before(e) {
                  t = e.bem.els
                },
                after(e) {
                  e.bem.els = t
                },
                $: ({ context: t, props: o }) => (
                  (e =
                    'string' == typeof e
                      ? e
                      : e({ context: t, props: o })),
                  (t.bem.els = e
                    .split(',')
                    .map((e) => e.trim())),
                  t.bem.els
                    .map(
                      (e) =>
                        `${
                          (null == o
                            ? void 0
                            : o.bPrefix) || n
                        }${t.bem.b}__${e}`
                    )
                    .join(', ')
                ),
              }
            })(e[0]),
            e[1],
            e[2]
          ),
        cM: (...e) => {
          return t(
            ((i = e[0]),
            {
              $({ context: e, props: t }) {
                const a = (i =
                  'string' == typeof i
                    ? i
                    : i({ context: e, props: t }))
                  .split(',')
                  .map((e) => e.trim())
                function l(i) {
                  return a
                    .map(
                      (a) =>
                        `&${
                          (null == t
                            ? void 0
                            : t.bPrefix) || n
                        }${e.bem.b}${
                          void 0 !== i ? `${o}${i}` : ''
                        }${r}${a}`
                    )
                    .join(', ')
                }
                const s = e.bem.els
                return null !== s ? l(s[0]) : l()
              },
            }),
            e[1],
            e[2]
          )
          var i
        },
        cNotM: (...e) => {
          return t(
            ((i = e[0]),
            {
              $({ context: e, props: t }) {
                i =
                  'string' == typeof i
                    ? i
                    : i({ context: e, props: t })
                const a = e.bem.els
                return `&:not(${
                  (null == t ? void 0 : t.bPrefix) || n
                }${e.bem.b}${
                  null !== a && a.length > 0
                    ? `${o}${a[0]}`
                    : ''
                }${r}${i})`
              },
            }),
            e[1],
            e[2]
          )
          var i
        },
      }),
      i
    )
  })({
    blockPrefix: '.n-',
    elementPrefix: '__',
    modifierPrefix: '--',
  })
Vd.use(qd)
const { c: Ud, find: Gd } = Vd,
  { cB: Kd, cE: Yd, cM: Xd, cNotM: Zd } = qd
function Jd(e, t) {
  return null === e
    ? t
    : Ud([
        ({ props: { bPrefix: n } }) =>
          Ud(`${n || '.n-'}form-item`, [
            Ud(`${n || '.n-'}form-item-blank`, [
              Ud(`&${n || '.n-'}form-item-blank--${e}`, [
                t,
              ]),
            ]),
          ]),
      ])
}
const Qd = (...e) => Ud('>', [Kd(...e)])
var ef = {
    fontFamily:
      'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono:
      'v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace',
    fontWeight: '400',
    fontWeightStrong: '500',
    cubicBezierEaseInOut: 'cubic-bezier(.4, 0, .2, 1)',
    cubicBezierEaseOut: 'cubic-bezier(0, 0, .2, 1)',
    cubicBezierEaseIn: 'cubic-bezier(.4, 0, 1, 1)',
    borderRadius: '3px',
    borderRadiusSmall: '2px',
    fontSize: '14px',
    fontSizeTiny: '12px',
    fontSizeSmall: '14px',
    fontSizeMedium: '14px',
    fontSizeLarge: '15px',
    fontSizeHuge: '16px',
    lineHeight: '1.6',
    heightTiny: '22px',
    heightSmall: '28px',
    heightMedium: '34px',
    heightLarge: '40px',
    heightHuge: '46px',
    transformDebounceScale: 'scale(1)',
  },
  tf = Ud(
    'body',
    `\n margin: 0;\n font-size: ${ef.fontSize};\n font-family: ${ef.fontFamily};\n line-height: ${ef.lineHeight};\n -webkit-text-size-adjust: 100%;\n -webkit-tap-highlight-color: transparent;\n`,
    [
      Ud(
        'input',
        '\n font-family: inherit;\n font-size: inherit;\n '
      ),
    ]
  )
function nf(e) {
  const t = nt(!!e.value)
  if (t.value) return Ge(t)
  const n = Xt(e, (e) => {
    e && ((t.value = !0), n())
  })
  return Ge(t)
}
function of(e) {
  const t = ur(e),
    n = nt(t.value)
  return (
    Xt(t, (e) => {
      n.value = e
    }),
    'function' == typeof e
      ? n
      : {
          __v_isRef: !0,
          get value() {
            return n.value
          },
          set value(t) {
            e.set(t)
          },
        }
  )
}
const rf = 'undefined' != typeof window
let af, lf
var sf, cf
;(af = rf
  ? null ===
      (cf =
        null === (sf = document) || void 0 === sf
          ? void 0
          : sf.fonts) || void 0 === cf
    ? void 0
    : cf.ready
  : void 0),
  (lf = !1),
  void 0 !== af
    ? af.then(() => {
        lf = !0
      })
    : (lf = !0)
const uf = {
  mousemoveoutside: new WeakMap(),
  clickoutside: new WeakMap(),
}
function df(e, t, n) {
  const o = uf[e]
  let r = o.get(t)
  void 0 === r && o.set(t, (r = new WeakMap()))
  let i = r.get(n)
  return (
    void 0 === i &&
      r.set(
        n,
        (i = (function (e, t, n) {
          if ('mousemoveoutside' === e) {
            const e = (e) => {
              t.contains(e.target) || n(e)
            }
            return { mousemove: e, touchstart: e }
          }
          if ('clickoutside' === e) {
            let e = !1
            const o = (n) => {
                e = !t.contains(n.target)
              },
              r = (o) => {
                e && (t.contains(o.target) || n(o))
              }
            return {
              mousedown: o,
              mouseup: r,
              touchstart: o,
              touchend: r,
            }
          }
          return (
            console.error(
              `[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`
            ),
            {}
          )
        })(e, t, n))
      ),
    i
  )
}
const { on: ff, off: pf } = (function () {
  if ('undefined' == typeof window)
    return { on: () => {}, off: () => {} }
  const e = new WeakMap(),
    t = new WeakMap()
  function n() {
    e.set(this, !0)
  }
  function o() {
    e.set(this, !0), t.set(this, !0)
  }
  function r(e, t, n) {
    const o = e[t]
    return (
      (e[t] = function () {
        return n.apply(e, arguments), o.apply(e, arguments)
      }),
      e
    )
  }
  function i(e, t) {
    e[t] = Event.prototype[t]
  }
  const a = new WeakMap(),
    l = Object.getOwnPropertyDescriptor(
      Event.prototype,
      'currentTarget'
    )
  function s() {
    var e
    return null !== (e = a.get(this)) && void 0 !== e
      ? e
      : null
  }
  function c(e, t) {
    void 0 !== l &&
      Object.defineProperty(e, 'currentTarget', {
        configurable: !0,
        enumerable: !0,
        get: null != t ? t : l.get,
      })
  }
  const u = { bubble: {}, capture: {} },
    d = {},
    f = (function () {
      const l = function (l) {
        const {
          type: d,
          eventPhase: f,
          target: p,
          bubbles: h,
        } = l
        if (2 === f) return
        const v = 1 === f ? 'capture' : 'bubble'
        let g = p
        const b = []
        for (
          ;
          null === g && (g = window),
            b.push(g),
            g !== window;

        )
          g = g.parentNode || null
        const m = u.capture[d],
          y = u.bubble[d]
        if (
          (r(l, 'stopPropagation', n),
          r(l, 'stopImmediatePropagation', o),
          c(l, s),
          'capture' === v)
        ) {
          if (void 0 === m) return
          for (
            let n = b.length - 1;
            n >= 0 && !e.has(l);
            --n
          ) {
            const e = b[n],
              o = m.get(e)
            if (void 0 !== o) {
              a.set(l, e)
              for (const e of o) {
                if (t.has(l)) break
                e(l)
              }
            }
            if (0 === n && !h && void 0 !== y) {
              const n = y.get(e)
              if (void 0 !== n)
                for (const e of n) {
                  if (t.has(l)) break
                  e(l)
                }
            }
          }
        } else if ('bubble' === v) {
          if (void 0 === y) return
          for (let n = 0; n < b.length && !e.has(l); ++n) {
            const e = b[n],
              o = y.get(e)
            if (void 0 !== o) {
              a.set(l, e)
              for (const e of o) {
                if (t.has(l)) break
                e(l)
              }
            }
          }
        }
        i(l, 'stopPropagation'),
          i(l, 'stopImmediatePropagation'),
          c(l)
      }
      return (l.displayName = 'evtdUnifiedHandler'), l
    })(),
    p = (function () {
      const e = function (e) {
        const { type: t, eventPhase: n } = e
        if (2 !== n) return
        const o = d[t]
        void 0 !== o && o.forEach((t) => t(e))
      }
      return (
        (e.displayName = 'evtdUnifiedWindowEventHandler'), e
      )
    })()
  function h(e, t) {
    const n = u[e]
    return (
      void 0 === n[t] &&
        ((n[t] = new Map()),
        window.addEventListener(t, f, 'capture' === e)),
      n[t]
    )
  }
  function v(e, t) {
    let n = e.get(t)
    return void 0 === n && e.set(t, (n = new Set())), n
  }
  return {
    on: function (e, t, n, o) {
      if (
        (function (e, t, n, o) {
          if (
            'mousemoveoutside' === e ||
            'clickoutside' === e
          ) {
            const r = df(e, t, n)
            return (
              Object.keys(r).forEach((e) => {
                ff(e, document, r[e], o)
              }),
              !0
            )
          }
          return !1
        })(e, t, n, o)
      )
        return
      const r = v(
        h(
          !0 === o ||
            ('object' == typeof o && !0 === o.capture)
            ? 'capture'
            : 'bubble',
          e
        ),
        t
      )
      if ((r.has(n) || r.add(n), t === window)) {
        const t = (function (e) {
          return (
            void 0 === d[e] &&
              ((d[e] = new Set()),
              window.addEventListener(e, p)),
            d[e]
          )
        })(e)
        t.has(n) || t.add(n)
      }
    },
    off: function (e, t, n, o) {
      if (
        (function (e, t, n, o) {
          if (
            'mousemoveoutside' === e ||
            'clickoutside' === e
          ) {
            const r = df(e, t, n)
            return (
              Object.keys(r).forEach((e) => {
                pf(e, document, r[e], o)
              }),
              !0
            )
          }
          return !1
        })(e, t, n, o)
      )
        return
      const r =
          !0 === o ||
          ('object' == typeof o && !0 === o.capture),
        i = r ? 'capture' : 'bubble',
        a = h(i, e),
        l = v(a, t)
      if (t === window) {
        if (
          !(function (e, t, n, o) {
            const r = u[t][n]
            if (void 0 !== r) {
              const t = r.get(e)
              if (void 0 !== t && t.has(o)) return !0
            }
            return !1
          })(t, r ? 'bubble' : 'capture', e, n) &&
          (function (e, t) {
            const n = d[e]
            return !(void 0 === n || !n.has(t))
          })(e, n)
        ) {
          const t = d[e]
          t.delete(n),
            0 === t.size &&
              (window.removeEventListener(e, p),
              (d[e] = void 0))
        }
      }
      l.has(n) && l.delete(n),
        0 === l.size && a.delete(t),
        0 === a.size &&
          (window.removeEventListener(
            e,
            f,
            'capture' === i
          ),
          (u[i][e] = void 0))
    },
  }
})()
function hf(e, t) {
  return (
    Xt(e, (e) => {
      void 0 !== e && (t.value = e)
    }),
    ur(() => (void 0 === e.value ? t.value : e.value))
  )
}
function vf() {
  const e = nt(!1)
  return (
    wn(() => {
      e.value = !0
    }),
    Ge(e)
  )
}
function gf(e, t) {
  return ur(() => {
    for (const n of t) if (void 0 !== e[n]) return e[n]
    return e[t[t.length - 1]]
  })
}
const bf =
  'undefined' != typeof window &&
  (/iPad|iPhone|iPod/.test(navigator.platform) ||
    ('MacIntel' === navigator.platform &&
      navigator.maxTouchPoints > 1)) &&
  !window.MSStream
function mf(e, t = [], n) {
  const o = {}
  return (
    t.forEach((t) => {
      o[t] = e[t]
    }),
    Object.assign(o, n)
  )
}
function yf(e, t = !0, n = []) {
  return (
    e.forEach((e) => {
      if (null !== e)
        if ('object' == typeof e)
          if (Array.isArray(e)) yf(e, t, n)
          else if (e.type === Co) {
            if (null === e.children) return
            Array.isArray(e.children) &&
              yf(e.children, t, n)
          } else e.type !== ko && n.push(e)
        else
          ('string' != typeof e && 'number' != typeof e) ||
            n.push(Io(String(e)))
    }),
    n
  )
}
function xf(e, ...t) {
  if (!Array.isArray(e)) return e(...t)
  e.forEach((e) => xf(e, ...t))
}
function wf(e) {
  return Object.keys(e)
}
const Cf = (e, ...t) =>
  'function' == typeof e
    ? e(...t)
    : 'string' == typeof e
    ? Io(e)
    : 'number' == typeof e
    ? Io(String(e))
    : null
function Sf(e, t) {
  console.error(`[naive/${e}]: ${t}`)
}
function kf(e) {
  switch (typeof e) {
    case 'string':
      return e || void 0
    case 'number':
      return String(e)
    default:
      return
  }
}
function $f(e, t = 'default', n) {
  const o = e[t]
  if (!o)
    return (
      Sf('getFirstSlotVNode', `slot[${t}] is empty`), null
    )
  const r = yf(o(n))
  return 1 === r.length
    ? r[0]
    : (Sf(
        'getFirstSlotVNode',
        `slot[${t}] should have exactly one child`
      ),
      null)
}
const _f = /^(\d|\.)+$/,
  zf = /(\d|\.)+/
function Pf(
  e,
  { c: t = 1, offset: n = 0, attachPx: o = !0 } = {}
) {
  if ('number' == typeof e) {
    const o = (e + n) * t
    return 0 === o ? '0' : `${o}px`
  }
  if ('string' == typeof e) {
    if (_f.test(e)) {
      const r = (Number(e) + n) * t
      return o ? (0 === r ? '0' : `${r}px`) : `${r}`
    }
    {
      const o = zf.exec(e)
      return o
        ? e.replace(zf, String((Number(o[0]) + n) * t))
        : e
    }
  }
  return e
}
const Ef = Symbol('modalBody'),
  Of = Symbol('drawerBody'),
  jf = Symbol('popoverBodyInjection'),
  Tf = Symbol('internal-select-menu'),
  Af = Symbol('internal-select-menu-body')
function Mf(e) {
  const t = Gt(Ef, null),
    n = Gt(Of, null),
    o = Gt(jf, null),
    r = Gt(Af, null)
  return of(() => {
    var i
    const { to: a } = e
    return void 0 !== a
      ? !1 === a
        ? '__disabled__'
        : !0 === a
        ? 'body'
        : a
      : (null == t ? void 0 : t.value)
      ? null !== (i = t.value.$el) && void 0 !== i
        ? i
        : t.value
      : (null == n ? void 0 : n.value)
      ? n.value
      : (null == o ? void 0 : o.value)
      ? o.value
      : (null == r ? void 0 : r.value)
      ? r.value
      : null != a
      ? a
      : 'body'
  })
}
function Ff(e, t, n) {
  var o
  const r = Gt(e, null)
  if (null === r) return
  const i =
    null === (o = tr()) || void 0 === o ? void 0 : o.proxy
  function a(e, n) {
    const o = r[t]
    void 0 !== n &&
      (function (e, t) {
        e[t] || (e[t] = [])
        e[t].splice(
          e[t].findIndex((e) => e === i),
          1
        )
      })(o, n),
      void 0 !== e &&
        (function (e, t) {
          e[t] || (e[t] = [])
          ~e[t].findIndex((e) => e === i) || e[t].push(i)
        })(o, e)
  }
  Xt(n, a),
    a(n.value),
    kn(() => {
      a(void 0, n.value)
    })
}
;(Mf.tdkey = '__disabled__'),
  (Mf.propTo = {
    type: [String, Object, Boolean],
    default: void 0,
  })
const Rf = Symbol('configProviderInjection')
function Bf(e, t, n, o, r, i) {
  const a = $d()
  if (n) {
    const e = () => {
      const e = null == i ? void 0 : i.value
      n.mount({
        id: void 0 === e ? t : e + t,
        head: !0,
        props: { bPrefix: e ? `.${e}-` : void 0 },
        ssr: a,
      }),
        tf.mount({
          id: 'naive-ui/global',
          head: !0,
          ssr: a,
        })
    }
    a ? e() : xn(e)
  }
  const l = Gt(Rf, null)
  return ur(() => {
    var t
    const {
        theme: { common: n, self: i, peers: a = {} } = {},
        themeOverrides: s = {},
        builtinThemeOverrides: c = {},
      } = r,
      { common: u, peers: d } = s,
      {
        common: f,
        [e]: { common: p, self: h, peers: v = {} } = {},
      } =
        (null == l ? void 0 : l.mergedThemeRef.value) || {},
      { common: g, [e]: b = {} } =
        (null == l
          ? void 0
          : l.mergedThemeOverridesRef.value) || {},
      { common: m, peers: y = {} } = b,
      x = hd({}, n || p || f || o.common, g, m, u)
    return {
      common: x,
      self: hd(
        null === (t = i || h || o.self) || void 0 === t
          ? void 0
          : t(x),
        c,
        b,
        s
      ),
      peers: hd({}, o.peers, v, a),
      peerOverrides: hd({}, y, d),
    }
  })
}
dn({
  name: 'ConfigProvider',
  alias: ['App'],
  props: {
    abstract: Boolean,
    bordered: { type: Boolean, default: void 0 },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: { type: String, default: 'div' },
    hljs: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    as: {
      type: String,
      validator: () => (
        Sf(
          'config-provider',
          '`as` is deprecated, please use `tag` instead.'
        ),
        !0
      ),
      default: void 0,
    },
  },
  setup(e) {
    const t = Gt(Rf, null),
      n = ur(() => {
        const { theme: n } = e
        if (null === n) return
        const o =
          null == t ? void 0 : t.mergedThemeRef.value
        return void 0 === n
          ? o
          : void 0 === o
          ? n
          : Object.assign({}, o, n)
      }),
      o = ur(() => {
        const { themeOverrides: n } = e
        if (null !== n) {
          if (void 0 === n)
            return null == t
              ? void 0
              : t.mergedThemeOverridesRef.value
          {
            const e =
              null == t
                ? void 0
                : t.mergedThemeOverridesRef.value
            return void 0 === e ? n : hd({}, e, n)
          }
        }
      }),
      r = of(() => {
        const { namespace: n } = e
        return void 0 === n
          ? null == t
            ? void 0
            : t.mergedNamespaceRef.value
          : n
      }),
      i = of(() => {
        const { bordered: n } = e
        return void 0 === n
          ? null == t
            ? void 0
            : t.mergedBorderedRef.value
          : n
      }),
      a = ur(() => {
        const { icons: n } = e
        return void 0 === n
          ? null == t
            ? void 0
            : t.mergedIconsRef.value
          : n
      }),
      l = ur(() => {
        const { componentOptions: n } = e
        return void 0 !== n
          ? n
          : null == t
          ? void 0
          : t.mergedComponentPropsRef.value
      }),
      s = ur(() => {
        const { clsPrefix: n } = e
        return void 0 !== n
          ? n
          : null == t
          ? void 0
          : t.mergedClsPrefixRef.value
      }),
      c = ur(() => {
        const { rtl: n } = e
        if (void 0 === n)
          return null == t ? void 0 : t.mergedRtlRef.value
        const o = {}
        for (const e of n) o[e.name] = Qe(e)
        return o
      }),
      u = ur(
        () =>
          e.breakpoints ||
          (null == t
            ? void 0
            : t.mergedBreakpointsRef.value)
      )
    return (
      Ut(Rf, {
        mergedBreakpointsRef: u,
        mergedRtlRef: c,
        mergedIconsRef: a,
        mergedComponentPropsRef: l,
        mergedBorderedRef: i,
        mergedNamespaceRef: r,
        mergedClsPrefixRef: s,
        mergedLocaleRef: ur(() => {
          const { locale: n } = e
          if (null !== n)
            return void 0 === n
              ? null == t
                ? void 0
                : t.mergedLocaleRef.value
              : n
        }),
        mergedDateLocaleRef: ur(() => {
          const { dateLocale: n } = e
          if (null !== n)
            return void 0 === n
              ? null == t
                ? void 0
                : t.mergedDateLocaleRef.value
              : n
        }),
        mergedHljsRef: ur(() => {
          const { hljs: n } = e
          return void 0 === n
            ? null == t
              ? void 0
              : t.mergedHljsRef.value
            : n
        }),
        mergedThemeRef: n,
        mergedThemeOverridesRef: o,
      }),
      {
        mergedClsPrefix: s,
        mergedBordered: i,
        mergedNamespace: r,
        mergedTheme: n,
        mergedThemeOverrides: o,
      }
    )
  },
  render() {
    return this.abstract
      ? Uo(this.$slots, 'default')
      : dr(
          this.as || this.tag,
          {
            class: `${
              this.mergedClsPrefix || Lf
            }-config-provider`,
          },
          Uo(this.$slots, 'default')
        )
  },
}),
  (Bf.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object,
  })
const Lf = 'n'
function If(e = {}, t = { defaultBordered: !0 }) {
  const n = Gt(Rf, null)
  return {
    NConfigProvider: n,
    mergedBorderedRef: ur(() => {
      var o, r
      const { bordered: i } = e
      return void 0 !== i
        ? i
        : null ===
            (r =
              null !==
                (o =
                  null == n
                    ? void 0
                    : n.mergedBorderedRef.value) &&
              void 0 !== o
                ? o
                : t.defaultBordered) ||
            void 0 === r ||
            r
    }),
    mergedClsPrefixRef: ur(
      () =>
        (null == n ? void 0 : n.mergedClsPrefixRef.value) ||
        Lf
    ),
    namespaceRef: ur(() =>
      null == n ? void 0 : n.mergedNamespaceRef.value
    ),
  }
}
const Df = {
  name: 'en-US',
  global: {
    undo: 'Undo',
    redo: 'Redo',
    confirm: 'Confirm',
  },
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel',
  },
  Cascader: {
    placeholder: 'Please Select',
    loading: 'Loading',
    loadingRequiredMessage: (e) =>
      `Please load all ${e}'s descedants before checking it.`,
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    clear: 'Clear',
    now: 'Now',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    datePlaceholder: 'Select Date',
    datetimePlaceholder: 'Select Date and Time',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    startDatetimePlaceholder: 'Start Date and Time',
    endDatetimePlaceholder: 'End Date and Time',
    monthBeforeYear: !0,
    firstDayOfWeek: 6,
    today: 'Today',
  },
  DataTable: {
    checkTableAll: 'Select all in the table',
    uncheckTableAll: 'Unselect all in the table',
    confirm: 'Confirm',
    clear: 'Clear',
  },
  Transfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target',
  },
  Empty: { description: 'No Data' },
  Select: { placeholder: 'Please Select' },
  TimePicker: {
    placeholder: 'Select Time',
    positiveText: 'OK',
    negativeText: 'Cancel',
    now: 'Now',
  },
  Pagination: { goto: 'Goto', selectionSuffix: 'page' },
  DynamicTags: { add: 'Add' },
  Log: { loading: 'Loading' },
  Input: { placeholder: 'Please Input' },
  InputNumber: { placeholder: 'Please Input' },
  DynamicInput: { create: 'Create' },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Clear All Variables',
    clearSearch: 'Clear Search',
    filterCompName: 'Filter Component Name',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default',
  },
}
function Hf(e) {
  return function () {
    var t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : {},
      n = t.width ? String(t.width) : e.defaultWidth,
      o = e.formats[n] || e.formats[e.defaultWidth]
    return o
  }
}
function Nf(e) {
  return function (t, n) {
    var o,
      r = n || {}
    if (
      'formatting' ===
        (r.context ? String(r.context) : 'standalone') &&
      e.formattingValues
    ) {
      var i = e.defaultFormattingWidth || e.defaultWidth,
        a = r.width ? String(r.width) : i
      o = e.formattingValues[a] || e.formattingValues[i]
    } else {
      var l = e.defaultWidth,
        s = r.width ? String(r.width) : e.defaultWidth
      o = e.values[s] || e.values[l]
    }
    return o[e.argumentCallback ? e.argumentCallback(t) : t]
  }
}
function Wf(e) {
  return function (t) {
    var n =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : {},
      o = n.width,
      r =
        (o && e.matchPatterns[o]) ||
        e.matchPatterns[e.defaultMatchWidth],
      i = t.match(r)
    if (!i) return null
    var a,
      l = i[0],
      s =
        (o && e.parsePatterns[o]) ||
        e.parsePatterns[e.defaultParseWidth],
      c = Array.isArray(s)
        ? qf(s, function (e) {
            return e.test(l)
          })
        : Vf(s, function (e) {
            return e.test(l)
          })
    ;(a = e.valueCallback ? e.valueCallback(c) : c),
      (a = n.valueCallback ? n.valueCallback(a) : a)
    var u = t.slice(l.length)
    return { value: a, rest: u }
  }
}
function Vf(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n) && t(e[n])) return n
}
function qf(e, t) {
  for (var n = 0; n < e.length; n++) if (t(e[n])) return n
}
var Uf,
  Gf = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds',
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds',
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes',
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes',
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours',
    },
    xHours: { one: '1 hour', other: '{{count}} hours' },
    xDays: { one: '1 day', other: '{{count}} days' },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks',
    },
    xWeeks: { one: '1 week', other: '{{count}} weeks' },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months',
    },
    xMonths: { one: '1 month', other: '{{count}} months' },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years',
    },
    xYears: { one: '1 year', other: '{{count}} years' },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years',
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years',
    },
  },
  Kf = {
    date: Hf({
      formats: {
        full: 'EEEE, MMMM do, y',
        long: 'MMMM do, y',
        medium: 'MMM d, y',
        short: 'MM/dd/yyyy',
      },
      defaultWidth: 'full',
    }),
    time: Hf({
      formats: {
        full: 'h:mm:ss a zzzz',
        long: 'h:mm:ss a z',
        medium: 'h:mm:ss a',
        short: 'h:mm a',
      },
      defaultWidth: 'full',
    }),
    dateTime: Hf({
      formats: {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: '{{date}}, {{time}}',
        short: '{{date}}, {{time}}',
      },
      defaultWidth: 'full',
    }),
  },
  Yf = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  }
const Xf = {
  name: 'en-US',
  locale: {
    code: 'en-US',
    formatDistance: function (e, t, n) {
      var o,
        r = Gf[e]
      return (
        (o =
          'string' == typeof r
            ? r
            : 1 === t
            ? r.one
            : r.other.replace('{{count}}', t.toString())),
        null != n && n.addSuffix
          ? n.comparison && n.comparison > 0
            ? 'in ' + o
            : o + ' ago'
          : o
      )
    },
    formatLong: Kf,
    formatRelative: function (e, t, n, o) {
      return Yf[e]
    },
    localize: {
      ordinalNumber: function (e, t) {
        var n = Number(e),
          o = n % 100
        if (o > 20 || o < 10)
          switch (o % 10) {
            case 1:
              return n + 'st'
            case 2:
              return n + 'nd'
            case 3:
              return n + 'rd'
          }
        return n + 'th'
      },
      era: Nf({
        values: {
          narrow: ['B', 'A'],
          abbreviated: ['BC', 'AD'],
          wide: ['Before Christ', 'Anno Domini'],
        },
        defaultWidth: 'wide',
      }),
      quarter: Nf({
        values: {
          narrow: ['1', '2', '3', '4'],
          abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
          wide: [
            '1st quarter',
            '2nd quarter',
            '3rd quarter',
            '4th quarter',
          ],
        },
        defaultWidth: 'wide',
        argumentCallback: function (e) {
          return e - 1
        },
      }),
      month: Nf({
        values: {
          narrow: [
            'J',
            'F',
            'M',
            'A',
            'M',
            'J',
            'J',
            'A',
            'S',
            'O',
            'N',
            'D',
          ],
          abbreviated: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          wide: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        },
        defaultWidth: 'wide',
      }),
      day: Nf({
        values: {
          narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          abbreviated: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
          ],
          wide: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
        },
        defaultWidth: 'wide',
      }),
      dayPeriod: Nf({
        values: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
        },
        defaultWidth: 'wide',
        formattingValues: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
        },
        defaultFormattingWidth: 'wide',
      }),
    },
    match: {
      ordinalNumber:
        ((Uf = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (e) {
            return parseInt(e, 10)
          },
        }),
        function (e) {
          var t =
              arguments.length > 1 &&
              void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = e.match(Uf.matchPattern)
          if (!n) return null
          var o = n[0],
            r = e.match(Uf.parsePattern)
          if (!r) return null
          var i = Uf.valueCallback
            ? Uf.valueCallback(r[0])
            : r[0]
          i = t.valueCallback ? t.valueCallback(i) : i
          var a = e.slice(o.length)
          return { value: i, rest: a }
        }),
      era: Wf({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: 'any',
      }),
      quarter: Wf({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: 'any',
        valueCallback: function (e) {
          return e + 1
        },
      }),
      month: Wf({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated:
            /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: 'any',
      }),
      day: Wf({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [
            /^s/i,
            /^m/i,
            /^t/i,
            /^w/i,
            /^t/i,
            /^f/i,
            /^s/i,
          ],
          any: [
            /^su/i,
            /^m/i,
            /^tu/i,
            /^w/i,
            /^th/i,
            /^f/i,
            /^sa/i,
          ],
        },
        defaultParseWidth: 'any',
      }),
      dayPeriod: Wf({
        matchPatterns: {
          narrow:
            /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: 'any',
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: 'any',
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  },
}
function Zf(e) {
  const { mergedLocaleRef: t, mergedDateLocaleRef: n } =
      Gt(Rf, null) || {},
    o = ur(() => {
      var n, o
      return null !==
        (o =
          null === (n = null == t ? void 0 : t.value) ||
          void 0 === n
            ? void 0
            : n[e]) && void 0 !== o
        ? o
        : Df[e]
    })
  return {
    dateLocaleRef: ur(() => {
      var e
      return null !== (e = null == n ? void 0 : n.value) &&
        void 0 !== e
        ? e
        : Xf
    }),
    localeRef: o,
  }
}
function Jf(e, t, n) {
  if (!t) return
  const o = $d(),
    r = () => {
      const r = null == n ? void 0 : n.value
      t.mount({
        id: void 0 === r ? e : r + e,
        head: !0,
        props: { bPrefix: r ? `.${r}-` : void 0 },
        ssr: o,
      }),
        tf.mount({
          id: 'naive-ui/global',
          head: !0,
          ssr: o,
        })
    }
  o ? r() : xn(r)
}
function Qf(e, t) {
  return dn({
    name: Qc(e),
    setup() {
      const { NConfigProvider: n } = If()
      return () => {
        var o
        const r =
          null ===
            (o =
              null == n
                ? void 0
                : n.mergedIconsRef.value) || void 0 === o
            ? void 0
            : o[e]
        return r ? r() : t
      }
    },
  })
}
var ep = dn({
    name: 'Checkmark',
    render: () =>
      dr(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 16 16',
        },
        dr(
          'g',
          { fill: 'none' },
          dr('path', {
            d: 'M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z',
            fill: 'currentColor',
          })
        )
      ),
  }),
  tp = dn({
    name: 'ChevronRight',
    render: () =>
      dr(
        'svg',
        {
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        dr('path', {
          d: 'M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z',
          fill: 'currentColor',
        })
      ),
  }),
  np = Qf(
    'close',
    dr(
      'svg',
      {
        viewBox: '0 0 12 12',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          fill: 'none',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { fill: 'currentColor', 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z',
          })
        )
      )
    )
  ),
  op = dn({
    name: 'Eye',
    render: () =>
      dr(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        dr('path', {
          d: 'M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '32',
        }),
        dr('circle', {
          cx: '256',
          cy: '256',
          r: '80',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-miterlimit': '10',
          'stroke-width': '32',
        })
      ),
  }),
  rp = dn({
    name: 'EyeOff',
    render: () =>
      dr(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        dr('path', {
          d: 'M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z',
          fill: 'currentColor',
        }),
        dr('path', {
          d: 'M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z',
          fill: 'currentColor',
        }),
        dr('path', {
          d: 'M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z',
          fill: 'currentColor',
        }),
        dr('path', {
          d: 'M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z',
          fill: 'currentColor',
        }),
        dr('path', {
          d: 'M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z',
          fill: 'currentColor',
        })
      ),
  }),
  ip = dn({
    name: 'Empty',
    render: () =>
      dr(
        'svg',
        {
          viewBox: '0 0 28 28',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        dr('path', {
          d: 'M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z',
          fill: 'currentColor',
        }),
        dr('path', {
          d: 'M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z',
          fill: 'currentColor',
        })
      ),
  }),
  ap = Qf(
    'error',
    dr(
      'svg',
      {
        viewBox: '0 0 48 48',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z',
          })
        )
      )
    )
  ),
  lp = Qf(
    'info',
    dr(
      'svg',
      {
        viewBox: '0 0 28 28',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z',
          })
        )
      )
    )
  ),
  sp = Qf(
    'success',
    dr(
      'svg',
      {
        viewBox: '0 0 48 48',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z',
          })
        )
      )
    )
  ),
  cp = Qf(
    'warning',
    dr(
      'svg',
      {
        viewBox: '0 0 24 24',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z',
          })
        )
      )
    )
  ),
  up = dn({
    name: 'ChevronDown',
    render: () =>
      dr(
        'svg',
        {
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        dr('path', {
          d: 'M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z',
          fill: 'currentColor',
        })
      ),
  }),
  dp = Qf(
    'clear',
    dr(
      'svg',
      {
        viewBox: '0 0 16 16',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      dr(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          fill: 'none',
          'fill-rule': 'evenodd',
        },
        dr(
          'g',
          { fill: 'currentColor', 'fill-rule': 'nonzero' },
          dr('path', {
            d: 'M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z',
          })
        )
      )
    )
  ),
  fp = dn({
    name: 'BaseIconSwitchTransition',
    setup(e, { slots: t }) {
      const n = vf()
      return () =>
        dr(
          Er,
          {
            name: 'icon-switch-transition',
            appear: n.value,
          },
          t
        )
    },
  }),
  pp = dn({
    name: 'FadeInExpandTransition',
    props: {
      appear: Boolean,
      group: Boolean,
      mode: String,
      onLeave: Function,
      onAfterLeave: Function,
      onAfterEnter: Function,
      width: Boolean,
      reverse: Boolean,
    },
    setup(e, { slots: t }) {
      function n(t) {
        e.width
          ? (t.style.maxWidth = `${t.offsetWidth}px`)
          : (t.style.maxHeight = `${t.offsetHeight}px`),
          t.offsetWidth
      }
      function o(t) {
        e.width
          ? (t.style.maxWidth = '0')
          : (t.style.maxHeight = '0'),
          t.offsetWidth
        const { onLeave: n } = e
        n && n()
      }
      function r(t) {
        e.width
          ? (t.style.maxWidth = '')
          : (t.style.maxHeight = '')
        const { onAfterLeave: n } = e
        n && n()
      }
      function i(t) {
        if (((t.style.transition = 'none'), e.width)) {
          const e = t.offsetWidth
          ;(t.style.maxWidth = '0'),
            t.offsetWidth,
            (t.style.transition = ''),
            (t.style.maxWidth = `${e}px`)
        } else if (e.reverse)
          (t.style.maxHeight = `${t.offsetHeight}px`),
            t.offsetHeight,
            (t.style.transition = ''),
            (t.style.maxHeight = '0')
        else {
          const e = t.offsetHeight
          ;(t.style.maxHeight = '0'),
            t.offsetWidth,
            (t.style.transition = ''),
            (t.style.maxHeight = `${e}px`)
        }
        t.offsetWidth
      }
      function a(t) {
        var n
        e.width
          ? (t.style.maxWidth = '')
          : e.reverse || (t.style.maxHeight = ''),
          null === (n = e.onAfterEnter) ||
            void 0 === n ||
            n.call(e)
      }
      return () =>
        dr(
          e.group ? Gr : Er,
          {
            name: e.width
              ? 'fade-in-width-expand-transition'
              : 'fade-in-height-expand-transition',
            mode: e.mode,
            appear: e.appear,
            onEnter: i,
            onAfterEnter: a,
            onBeforeLeave: n,
            onLeave: o,
            onAfterLeave: r,
          },
          t
        )
    },
  }),
  hp = Kd(
    'base-icon',
    '\n height: 1em;\n width: 1em;\n line-height: 1em;\n text-align: center;\n display: inline-block;\n position: relative;\n fill: currentColor;\n transform: translateZ(0);\n',
    [Ud('svg', { height: '1em', width: '1em' })]
  ),
  vp = dn({
    name: 'BaseIcon',
    props: {
      role: String,
      ariaLabel: String,
      ariaDisabled: { type: Boolean, default: void 0 },
      ariaHidden: { type: Boolean, default: void 0 },
      clsPrefix: { type: String, required: !0 },
      onClick: Function,
      onMousedown: Function,
      onMouseup: Function,
    },
    setup(e) {
      Jf('BaseIcon', hp, ct(e, 'clsPrefix'))
    },
    render() {
      return dr(
        'i',
        {
          class: `${this.clsPrefix}-base-icon`,
          onClick: this.onClick,
          onMousedown: this.onMousedown,
          onMouseup: this.onMouseup,
          role: this.role,
          'aria-label': this.ariaLabel,
          'aria-hidden': this.ariaHidden,
          'aria-disabled': this.ariaDisabled,
        },
        this.$slots
      )
    },
  }),
  gp = Kd(
    'base-close',
    '\n cursor: pointer;\n color: var(--close-color);\n',
    [
      Ud('&:hover', { color: 'var(--close-color-hover)' }),
      Ud('&:active', {
        color: 'var(--close-color-pressed)',
      }),
      Xd('disabled', {
        cursor: 'not-allowed!important',
        color: 'var(--close-color-disabled)',
      }),
    ]
  ),
  bp = dn({
    name: 'BaseClose',
    props: {
      clsPrefix: { type: String, required: !0 },
      disabled: { type: Boolean, default: void 0 },
      onClick: Function,
    },
    setup: (e) => (
      Jf('BaseClose', gp, ct(e, 'clsPrefix')),
      () => {
        const { clsPrefix: t, disabled: n } = e
        return dr(
          vp,
          {
            role: 'button',
            ariaDisabled: n,
            ariaLabel: 'close',
            clsPrefix: t,
            class: [
              `${t}-base-close`,
              n && `${t}-base-close--disabled`,
            ],
            onClick: n ? void 0 : e.onClick,
          },
          { default: () => dr(np, null) }
        )
      }
    ),
  }),
  mp = dn({
    props: { onFocus: Function, onBlur: Function },
    setup: (e) => () =>
      dr('div', {
        style: 'width: 0; height: 0',
        tabindex: 0,
        onFocus: e.onFocus,
        onBlur: e.onBlur,
      }),
  })
function yp({
  originalTransform: e = '',
  left: t = 0,
  top: n = 0,
  transition:
    o = `all .3s ${ef.cubicBezierEaseInOut} !important`,
} = {}) {
  return [
    Ud(
      '&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to',
      {
        transform: e + ' scale(0.75)',
        left: t,
        top: n,
        opacity: 0,
      }
    ),
    Ud(
      '&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from',
      {
        transform: `${ef.transformDebounceScale} ${e}`,
        left: t,
        top: n,
        opacity: 1,
      }
    ),
    Ud(
      '&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active',
      {
        transformOrigin: 'center',
        position: 'absolute',
        left: t,
        top: n,
        transition: o,
      }
    ),
  ]
}
var xp = Kd(
  'base-loading',
  '\n position: relative;\n line-height: 0;\n width: 1em;\n height: 1em;\n',
  [
    Yd(
      'placeholder',
      '\n position: absolute;\n left: 50%;\n top: 50%;\n transform: translateX(-50%) translateY(-50%);\n ',
      [
        yp({
          left: '50%',
          top: '50%',
          originalTransform:
            'translateX(-50%) translateY(-50%)',
        }),
      ]
    ),
    Yd('icon', '\n height: 1em;\n width: 1em;\n ', [yp()]),
  ]
)
var wp = dn({
  name: 'BaseLoading',
  props: {
    clsPrefix: { type: String, required: !0 },
    scale: { type: Number, default: 1 },
    radius: { type: Number, default: 100 },
    strokeWidth: { type: Number, default: 28 },
    stroke: { type: String, default: void 0 },
    show: { type: Boolean, default: !0 },
  },
  setup(e) {
    Jf('BaseLoading', xp, ct(e, 'clsPrefix'))
  },
  render() {
    const {
        clsPrefix: e,
        radius: t,
        strokeWidth: n,
        stroke: o,
        scale: r,
      } = this,
      i = t / r
    return dr(
      'div',
      {
        class: `${e}-base-loading`,
        role: 'img',
        'aria-label': 'loading',
      },
      dr(fp, null, {
        default: () =>
          this.show
            ? dr(
                'svg',
                {
                  class: `${e}-base-loading__icon`,
                  viewBox: `0 0 ${2 * i} ${2 * i}`,
                  xmlns: 'http://www.w3.org/2000/svg',
                  style: { color: o },
                },
                dr(
                  'g',
                  null,
                  dr('animateTransform', {
                    attributeName: 'transform',
                    type: 'rotate',
                    values: `0 ${i} ${i};270 ${i} ${i}`,
                    begin: '0s',
                    dur: '1.6s',
                    fill: 'freeze',
                    repeatCount: 'indefinite',
                  }),
                  dr(
                    'circle',
                    {
                      fill: 'none',
                      stroke: 'currentColor',
                      'stroke-width': n,
                      'stroke-linecap': 'round',
                      cx: i,
                      cy: i,
                      r: t - n / 2,
                      'stroke-dasharray': 5.67 * t,
                      'stroke-dashoffset': 18.48 * t,
                    },
                    dr('animateTransform', {
                      attributeName: 'transform',
                      type: 'rotate',
                      values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
                      begin: '0s',
                      dur: '1.6s',
                      fill: 'freeze',
                      repeatCount: 'indefinite',
                    }),
                    dr('animate', {
                      attributeName: 'stroke-dashoffset',
                      values: `${5.67 * t};${1.42 * t};${
                        5.67 * t
                      }`,
                      begin: '0s',
                      dur: '1.6s',
                      fill: 'freeze',
                      repeatCount: 'indefinite',
                    })
                  )
                )
              )
            : dr(
                'div',
                {
                  key: 'placeholder',
                  class: `${e}-base-loading__placeholder`,
                },
                this.$slots
              ),
      })
    )
  },
})
function Cp(e) {
  return Array.isArray(e) ? e : [e]
}
const Sp = 'STOP'
function kp(e, t) {
  const n = t(e)
  void 0 !== e.children &&
    n !== Sp &&
    e.children.forEach((e) => kp(e, t))
}
function $p(e) {
  return e.children
}
function _p(e) {
  return e.key
}
function zp() {
  return !1
}
function Pp(e) {
  return !0 === e.disabled
}
function Ep(e) {
  var t
  return null == e
    ? []
    : Array.isArray(e)
    ? e
    : null !== (t = e.checkedKeys) && void 0 !== t
    ? t
    : []
}
function Op(e) {
  var t
  return null == e || Array.isArray(e)
    ? []
    : null !== (t = e.indeterminateKeys) && void 0 !== t
    ? t
    : []
}
function jp(e, t) {
  const n = new Set(e)
  return (
    t.forEach((e) => {
      n.has(e) || n.add(e)
    }),
    Array.from(n)
  )
}
function Tp(e, t) {
  const n = new Set(e)
  return (
    t.forEach((e) => {
      n.has(e) && n.delete(e)
    }),
    Array.from(n)
  )
}
function Ap(e) {
  return 'group' === (null == e ? void 0 : e.type)
}
class Mp extends Error {
  constructor() {
    super(),
      (this.message =
        'SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.')
  }
}
function Fp(e, t, n) {
  const o = Bp(t, n),
    r = Bp(e, n, !0),
    i = (function (e, t) {
      const n = new Set()
      return (
        e.forEach((e) => {
          const o = t.treeNodeMap.get(e)
          if (void 0 !== o) {
            let e = o.parent
            for (
              ;
              null !== e && !e.disabled && !n.has(e.key);

            )
              n.add(e.key), (e = e.parent)
          }
        }),
        n
      )
    })(e, n),
    a = []
  return (
    o.forEach((e) => {
      ;(r.has(e) || i.has(e)) && a.push(e)
    }),
    a.forEach((e) => o.delete(e)),
    o
  )
}
function Rp(e, t) {
  const {
    checkedKeys: n,
    keysToCheck: o,
    keysToUncheck: r,
    indeterminateKeys: i,
    cascade: a,
    leafOnly: l,
    checkStrategy: s,
  } = e
  if (!a)
    return void 0 !== o
      ? {
          checkedKeys: jp(n, o),
          indeterminateKeys: Array.from(i),
        }
      : void 0 !== r
      ? {
          checkedKeys: Tp(n, r),
          indeterminateKeys: Array.from(i),
        }
      : {
          checkedKeys: Array.from(n),
          indeterminateKeys: Array.from(i),
        }
  const { levelTreeNodeMap: c } = t
  let u
  u =
    void 0 !== r
      ? Fp(r, n, t)
      : void 0 !== o
      ? (function (e, t, n) {
          return Bp(t.concat(e), n)
        })(o, n, t)
      : Bp(n, t)
  const d = 'parent' === s,
    f = 'child' === s || l,
    p = u,
    h = new Set()
  for (
    let v = Math.max.apply(null, Array.from(c.keys()));
    v >= 0;
    v -= 1
  ) {
    const e = 0 === v,
      t = c.get(v)
    for (const n of t) {
      if (n.isLeaf) continue
      const { key: t, shallowLoaded: o } = n
      if (
        (f &&
          o &&
          n.children.forEach((e) => {
            !e.disabled &&
              !e.isLeaf &&
              e.shallowLoaded &&
              p.has(e.key) &&
              p.delete(e.key)
          }),
        n.disabled || !o)
      )
        continue
      let r = !0,
        i = !1,
        a = !0
      for (const e of n.children) {
        const t = e.key
        if (!e.disabled)
          if ((a && (a = !1), p.has(t))) i = !0
          else {
            if (h.has(t)) {
              ;(i = !0), (r = !1)
              break
            }
            if (((r = !1), i)) break
          }
      }
      r && !a
        ? (d &&
            n.children.forEach((e) => {
              !e.disabled && p.has(e.key) && p.delete(e.key)
            }),
          p.add(t))
        : i && h.add(t),
        e && f && p.has(t) && p.delete(t)
    }
  }
  return {
    checkedKeys: Array.from(p),
    indeterminateKeys: Array.from(h),
  }
}
function Bp(e, t, n = !1) {
  const { treeNodeMap: o, getChildren: r } = t,
    i = new Set(),
    a = new Set(e)
  return (
    e.forEach((e) => {
      const t = o.get(e)
      void 0 !== t &&
        kp(t, (e) => {
          if (e.disabled) return Sp
          const { key: t } = e
          if (
            !i.has(t) &&
            (i.add(t),
            a.add(t),
            (function (e, t) {
              return !1 === e.isLeaf && !Array.isArray(t(e))
            })(e.rawNode, r))
          ) {
            if (n) return Sp
            throw new Mp()
          }
        })
    }),
    a
  )
}
function Lp(e, t) {
  const n = e.siblings,
    o = n.length,
    { index: r } = e
  return t
    ? n[(r + 1) % o]
    : r === n.length - 1
    ? null
    : n[r + 1]
}
function Ip(
  e,
  t,
  { loop: n = !1, includeDisabled: o = !1 } = {}
) {
  const r = 'prev' === t ? Dp : Lp,
    i = { reverse: 'prev' === t }
  let a = !1,
    l = null
  return (
    (function t(s) {
      if (null !== s) {
        if (s === e)
          if (a) {
            if (!e.disabled && !e.isGroup)
              return void (l = e)
          } else a = !0
        else if (
          (!s.disabled || o) &&
          !s.ignored &&
          !s.isGroup
        )
          return void (l = s)
        if (s.isGroup) {
          const e = Hp(s, i)
          null !== e ? (l = e) : t(r(s, n))
        } else {
          const e = r(s, !1)
          if (null !== e) t(e)
          else {
            const e = (function (e) {
              return e.parent
            })(s)
            ;(null == e ? void 0 : e.isGroup)
              ? t(r(e, n))
              : n && t(r(s, !0))
          }
        }
      }
    })(e),
    l
  )
}
function Dp(e, t) {
  const n = e.siblings,
    o = n.length,
    { index: r } = e
  return t ? n[(r - 1 + o) % o] : 0 === r ? null : n[r - 1]
}
function Hp(e, t = {}) {
  const { reverse: n = !1 } = t,
    { children: o } = e
  if (o) {
    const { length: e } = o,
      r = n ? -1 : e,
      i = n ? -1 : 1
    for (let a = n ? e - 1 : 0; a !== r; a += i) {
      const e = o[a]
      if (!e.disabled && !e.ignored) {
        if (!e.isGroup) return e
        {
          const n = Hp(e, t)
          if (null !== n) return n
        }
      }
    }
  }
  return null
}
const Np = {
  getChild() {
    return this.ignored ? null : Hp(this)
  },
  getParent() {
    const { parent: e } = this
    return (null == e ? void 0 : e.isGroup)
      ? e.getParent()
      : e
  },
  getNext(e = {}) {
    return Ip(this, 'next', e)
  },
  getPrev(e = {}) {
    return Ip(this, 'prev', e)
  },
}
function Wp(e, t, n, o, r, i = null, a = 0) {
  const l = []
  return (
    e.forEach((s, c) => {
      var u
      const d = Object.create(o)
      if (
        ((d.rawNode = s),
        (d.siblings = l),
        (d.level = a),
        (d.index = c),
        (d.isFirstChild = 0 === c),
        (d.isLastChild = c + 1 === e.length),
        (d.parent = i),
        !d.ignored)
      ) {
        const e = r(s)
        Array.isArray(e) &&
          (d.children = Wp(e, t, n, o, r, d, a + 1))
      }
      l.push(d),
        t.set(d.key, d),
        n.has(a) || n.set(a, []),
        null === (u = n.get(a)) || void 0 === u || u.push(d)
    }),
    l
  )
}
function Vp(e, t = {}) {
  const n = new Map(),
    o = new Map(),
    {
      getDisabled: r = Pp,
      getIgnored: i = zp,
      getChildren: a = $p,
      getIsGroup: l = Ap,
      getKey: s = _p,
    } = t,
    c = Object.assign(
      {
        get key() {
          return s(this.rawNode)
        },
        get disabled() {
          return r(this.rawNode)
        },
        get isGroup() {
          return l(this.rawNode)
        },
        get isLeaf() {
          return (function (e, t) {
            const { isLeaf: n } = e
            return void 0 !== n ? n : !t(e)
          })(this.rawNode, a)
        },
        get shallowLoaded() {
          return (function (e, t) {
            const { isLeaf: n } = e
            return !(!1 === n && !Array.isArray(t(e)))
          })(this.rawNode, a)
        },
        get ignored() {
          return i(this.rawNode)
        },
        contains(e) {
          return (function (e, t) {
            const n = e.key
            for (; t; ) {
              if (t.key === n) return !0
              t = t.parent
            }
            return !1
          })(this, e)
        },
      },
      Np
    ),
    u = Wp(e, n, o, c, a)
  function d(e) {
    if (null == e) return null
    const t = n.get(e)
    return t && !t.ignored ? t : null
  }
  const f = {
    treeNodes: u,
    treeNodeMap: n,
    levelTreeNodeMap: o,
    maxLevel: Math.max(...o.keys()),
    getChildren: a,
    getFlattenedNodes: (e) =>
      (function (e, t) {
        const n = t ? new Set(t) : void 0,
          o = []
        return (
          (function e(t) {
            t.forEach((t) => {
              o.push(t),
                t.isLeaf ||
                  !t.children ||
                  t.ignored ||
                  ((t.isGroup ||
                    void 0 === n ||
                    n.has(t.key)) &&
                    e(t.children))
            })
          })(e),
          o
        )
      })(u, e),
    getNode: function (e) {
      if (null == e) return null
      const t = n.get(e)
      return !t || t.isGroup || t.ignored ? null : t
    },
    getPrev: function (e, t) {
      const n = d(e)
      return n ? n.getPrev(t) : null
    },
    getNext: function (e, t) {
      const n = d(e)
      return n ? n.getNext(t) : null
    },
    getParent: function (e) {
      const t = d(e)
      return t ? t.getParent() : null
    },
    getChild: function (e) {
      const t = d(e)
      return t ? t.getChild() : null
    },
    getFirstAvailableNode: () =>
      (function (e) {
        if (0 === e.length) return null
        const t = e[0]
        return t.isGroup || t.ignored || t.disabled
          ? t.getNext()
          : t
      })(u),
    getPath: (e, t = {}) =>
      (function (
        e,
        { includeGroup: t = !1, includeSelf: n = !0 },
        o
      ) {
        var r
        const i = o.treeNodeMap
        let a =
          null == e
            ? null
            : null !== (r = i.get(e)) && void 0 !== r
            ? r
            : null
        const l = {
          keyPath: [],
          treeNodePath: [],
          treeNode: a,
        }
        if (null == a ? void 0 : a.ignored)
          return (l.treeNode = null), l
        for (; a; )
          a.ignored ||
            (!t && a.isGroup) ||
            l.treeNodePath.push(a),
            (a = a.parent)
        return (
          l.treeNodePath.reverse(),
          n || l.treeNodePath.pop(),
          (l.keyPath = l.treeNodePath.map((e) => e.key)),
          l
        )
      })(e, t, f),
    getCheckedKeys(e, t = {}) {
      const {
        cascade: n = !0,
        leafOnly: o = !1,
        checkStrategy: r = 'all',
      } = t
      return Rp(
        {
          checkedKeys: Ep(e),
          indeterminateKeys: Op(e),
          cascade: n,
          leafOnly: o,
          checkStrategy: r,
        },
        f
      )
    },
    check(e, t, n = {}) {
      const {
        cascade: o = !0,
        leafOnly: r = !1,
        checkStrategy: i = 'all',
      } = n
      return Rp(
        {
          checkedKeys: Ep(t),
          indeterminateKeys: Op(t),
          keysToCheck: null == e ? [] : Cp(e),
          cascade: o,
          leafOnly: r,
          checkStrategy: i,
        },
        f
      )
    },
    uncheck(e, t, n = {}) {
      const {
        cascade: o = !0,
        leafOnly: r = !1,
        checkStrategy: i = 'all',
      } = n
      return Rp(
        {
          checkedKeys: Ep(t),
          indeterminateKeys: Op(t),
          keysToUncheck: null == e ? [] : Cp(e),
          cascade: o,
          leafOnly: r,
          checkStrategy: i,
        },
        f
      )
    },
    getNonLeafKeys: (e = {}) =>
      (function (e, t = {}) {
        const { preserveGroup: n = !1 } = t,
          o = [],
          r = n
            ? (e) => {
                e.isLeaf || (o.push(e.key), i(e.children))
              }
            : (e) => {
                e.isLeaf ||
                  (e.isGroup || o.push(e.key),
                  i(e.children))
              }
        function i(e) {
          e.forEach(r)
        }
        return i(e), o
      })(u, e),
  }
  return f
}
function qp(e, t = 'default') {
  const n = e[t]
  if (void 0 === n)
    throw new Error(`[vueuc/binder]: slot[${t}] is empty.`)
  return n()
}
function Up(e, t = 'default') {
  const n = e[t]
  if (void 0 === n)
    throw new Error(`[vueuc/binder]: slot[${t}] is empty.`)
  const o = n()
  if (1 === o.length) return o[0]
  throw new Error(
    `[vueuc/binder]: slot[${t}] should have exactly one child.`
  )
}
let Gp = null
function Kp() {
  if (
    null === Gp &&
    ((Gp = document.getElementById(
      'v-binder-view-measurer'
    )),
    null === Gp)
  ) {
    ;(Gp = document.createElement('div')),
      (Gp.id = 'v-binder-view-measurer')
    const { style: e } = Gp
    ;(e.position = 'fixed'),
      (e.left = '0'),
      (e.right = '0'),
      (e.top = '0'),
      (e.bottom = '0'),
      (e.pointerEvents = 'none'),
      (e.visibility = 'hidden'),
      document.body.appendChild(Gp)
  }
  return Gp.getBoundingClientRect()
}
function Yp(e) {
  const t = e.getBoundingClientRect(),
    n = Kp()
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height,
  }
}
function Xp(e) {
  if (null === e) return null
  const t = (function (e) {
    return 9 === e.nodeType ? null : e.parentNode
  })(e)
  if (null === t) return null
  if (9 === t.nodeType) return document
  if (1 === t.nodeType) {
    const {
      overflow: e,
      overflowX: n,
      overflowY: o,
    } = getComputedStyle(t)
    if (/(auto|scroll|overlay)/.test(e + o + n)) return t
  }
  return Xp(t)
}
const Zp = dn({
  name: 'Binder',
  props: {
    syncTargetWithParent: Boolean,
    syncTarget: { type: Boolean, default: !0 },
  },
  setup(e) {
    var t
    Ut(
      'VBinder',
      null === (t = tr()) || void 0 === t ? void 0 : t.proxy
    )
    const n = Gt('VBinder', null),
      o = nt(null)
    let r = []
    const i = () => {
        for (const e of r) pf('scroll', e, l, !0)
        r = []
      },
      a = new Set(),
      l = () => {
        Ja(s)
      },
      s = () => {
        a.forEach((e) => e())
      },
      c = new Set(),
      u = () => {
        c.forEach((e) => e())
      }
    return (
      kn(() => {
        pf('resize', window, u), i()
      }),
      {
        targetRef: o,
        setTargetRef: (t) => {
          ;(o.value = t),
            n && e.syncTargetWithParent && n.setTargetRef(t)
        },
        addScrollListener: (e) => {
          0 === a.size &&
            (() => {
              let e = o.value
              for (; (e = Xp(e)), null !== e; ) r.push(e)
              for (const t of r) ff('scroll', t, l, !0)
            })(),
            a.has(e) || a.add(e)
        },
        removeScrollListener: (e) => {
          a.has(e) && a.delete(e), 0 === a.size && i()
        },
        addResizeListener: (e) => {
          0 === c.size && ff('resize', window, u),
            c.has(e) || c.add(e)
        },
        removeResizeListener: (e) => {
          c.has(e) && c.delete(e),
            0 === c.size && pf('resize', window, u)
        },
      }
    )
  },
  render() {
    return qp(this.$slots)
  },
})
var Jp = dn({
  name: 'Target',
  setup() {
    const { setTargetRef: e, syncTarget: t } = Gt('VBinder')
    return {
      syncTarget: t,
      setTargetDirective: { mounted: e, updated: e },
    }
  },
  render() {
    const { syncTarget: e, setTargetDirective: t } = this
    return e ? eo(Up(this.$slots), [[t]]) : Up(this.$slots)
  },
})
const Qp = '@@mmoContext',
  eh = {
    mounted(e, { value: t }) {
      ;(e[Qp] = { handler: void 0 }),
        'function' == typeof t &&
          ((e[Qp].handler = t),
          ff('mousemoveoutside', e, t))
    },
    updated(e, { value: t }) {
      const n = e[Qp]
      'function' == typeof t
        ? n.handler
          ? n.handler !== t &&
            (pf('mousemoveoutside', e, n.handler),
            (n.handler = t),
            ff('mousemoveoutside', e, t))
          : ((e[Qp].handler = t),
            ff('mousemoveoutside', e, t))
        : n.handler &&
          (pf('mousemoveoutside', e, n.handler),
          (n.handler = void 0))
    },
    unmounted(e) {
      const { handler: t } = e[Qp]
      t && pf('mousemoveoutside', e, t),
        (e[Qp].handler = void 0)
    },
  },
  th = '@@coContext',
  nh = {
    mounted(e, { value: t }) {
      ;(e[th] = { handler: void 0 }),
        'function' == typeof t &&
          ((e[th].handler = t), ff('clickoutside', e, t))
    },
    updated(e, { value: t }) {
      const n = e[th]
      'function' == typeof t
        ? n.handler
          ? n.handler !== t &&
            (pf('clickoutside', e, n.handler),
            (n.handler = t),
            ff('clickoutside', e, t))
          : ((e[th].handler = t), ff('clickoutside', e, t))
        : n.handler &&
          (pf('clickoutside', e, n.handler),
          (n.handler = void 0))
    },
    unmounted(e) {
      const { handler: t } = e[th]
      t && pf('clickoutside', e, t),
        (e[th].handler = void 0)
    },
  }
var oh = new (class {
  constructor() {
    ;(this.elementZIndex = new Map()),
      (this.nextZIndex = 2e3)
  }
  get elementCount() {
    return this.elementZIndex.size
  }
  ensureZIndex(e, t) {
    const { elementZIndex: n } = this
    if (void 0 !== t)
      return (e.style.zIndex = `${t}`), void n.delete(e)
    const { nextZIndex: o } = this
    if (n.has(e)) {
      if (n.get(e) + 1 === this.nextZIndex) return
    }
    ;(e.style.zIndex = `${o}`),
      n.set(e, o),
      (this.nextZIndex = o + 1),
      this.squashState()
  }
  unregister(e) {
    const { elementZIndex: t } = this
    var n, o
    t.has(e)
      ? t.delete(e)
      : ((n = 'vdirs/z-index-manager/unregister-element'),
        (o = 'Element not found when unregistering.'),
        console.error(`[vdirs/${n}]: ${o}`)),
      this.squashState()
  }
  squashState() {
    const { elementCount: e } = this
    e || (this.nextZIndex = 2e3),
      this.nextZIndex - e > 2500 && this.rearrange()
  }
  rearrange() {
    const e = Array.from(this.elementZIndex.entries())
    e.sort((e, t) => e[1] - t[1]),
      (this.nextZIndex = 2e3),
      e.forEach((e) => {
        const t = e[0],
          n = this.nextZIndex++
        ;`${n}` !== t.style.zIndex &&
          (t.style.zIndex = `${n}`)
      })
  }
})()
const rh = '@@ziContext',
  ih = {
    mounted(e, t) {
      const { value: n = {} } = t,
        { zIndex: o, enabled: r } = n
      oh.ensureZIndex(e, o), (e[rh] = { enabled: r })
    },
    updated(e, t) {
      const { value: n = {} } = t,
        { zIndex: o, enabled: r } = n,
        i = e[rh].enabled
      r && !i && oh.ensureZIndex(e, o), (e[rh].enabled = r)
    },
    unmounted(e) {
      oh.unregister(e)
    },
  }
function ah(e, t) {
  console.error(`[vueuc/${e}]: ${t}`)
}
const { c: lh } = Nd()
function sh(e) {
  return e & -e
}
class ch {
  constructor(e, t) {
    ;(this.l = e), (this.min = t)
    const n = new Array(e + 1)
    for (let o = 0; o < e + 1; ++o) n[o] = 0
    this.ft = n
  }
  add(e, t) {
    if (0 === t) return
    const { l: n, ft: o } = this
    for (e += 1; e <= n; ) (o[e] += t), (e += sh(e))
  }
  get(e) {
    return this.sum(e + 1) - this.sum(e)
  }
  sum(e) {
    if (0 === e) return 0
    const { ft: t, min: n, l: o } = this
    if ((void 0 === e && (e = o), e > o))
      throw new Error(
        '[FinweckTree.sum]: `i` is larger than length.'
      )
    let r = e * n
    for (; e > 0; ) (r += t[e]), (e -= sh(e))
    return r
  }
  getBound(e) {
    let t = 0,
      n = this.l
    for (; n > t; ) {
      const o = Math.floor((t + n) / 2),
        r = this.sum(o)
      if (r > e) n = o
      else {
        if (!(r < e)) return o
        if (t === o) return this.sum(t + 1) <= e ? t + 1 : o
        t = o
      }
    }
    return t
  }
}
var uh = dn({
  name: 'LazyTeleport',
  props: {
    to: { type: [String, Object], default: void 0 },
    disabled: Boolean,
    show: { type: Boolean, required: !0 },
  },
  setup: (e) => ({
    showTeleport: nf(ct(e, 'show')),
    mergedTo: ur(() => {
      const { to: t } = e
      return null != t ? t : 'body'
    }),
  }),
  render() {
    return this.showTeleport
      ? this.disabled
        ? qp(this.$slots)
        : dr(
            go,
            { disabled: this.disabled, to: this.mergedTo },
            qp(this.$slots)
          )
      : null
  },
})
const dh = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  },
  fh = { start: 'end', center: 'center', end: 'start' },
  ph = {
    top: 'height',
    bottom: 'height',
    left: 'width',
    right: 'width',
  },
  hh = {
    'bottom-start': 'top left',
    bottom: 'top center',
    'bottom-end': 'top right',
    'top-start': 'bottom left',
    top: 'bottom center',
    'top-end': 'bottom right',
    'right-start': 'top left',
    right: 'center left',
    'right-end': 'bottom left',
    'left-start': 'top right',
    left: 'center right',
    'left-end': 'bottom right',
  },
  vh = {
    'bottom-start': 'bottom left',
    bottom: 'bottom center',
    'bottom-end': 'bottom right',
    'top-start': 'top left',
    top: 'top center',
    'top-end': 'top right',
    'right-start': 'top right',
    right: 'center right',
    'right-end': 'bottom right',
    'left-start': 'top left',
    left: 'center left',
    'left-end': 'bottom left',
  },
  gh = {
    'bottom-start': 'right',
    'bottom-end': 'left',
    'top-start': 'right',
    'top-end': 'left',
    'right-start': 'bottom',
    'right-end': 'top',
    'left-start': 'bottom',
    'left-end': 'top',
  }
const bh = lh([
  lh('.v-binder-follower-container', {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    height: '0',
    pointerEvents: 'none',
    zIndex: 'auto',
  }),
  lh(
    '.v-binder-follower-content',
    { position: 'absolute', zIndex: 'auto' },
    [lh('> *', { pointerEvents: 'all' })]
  ),
])
var mh = dn({
    name: 'Follower',
    inheritAttrs: !1,
    props: {
      show: Boolean,
      enabled: { type: Boolean, default: void 0 },
      placement: { type: String, default: 'bottom' },
      syncTrigger: {
        type: Array,
        default: ['resize', 'scroll'],
      },
      to: [String, Object],
      flip: { type: Boolean, default: !0 },
      x: Number,
      y: Number,
      width: String,
      minWidth: String,
      containerClass: String,
      teleportDisabled: Boolean,
      zindexable: { type: Boolean, default: !0 },
      zIndex: Number,
      overlap: Boolean,
    },
    setup(e) {
      const t = Gt('VBinder'),
        n = of(() =>
          void 0 !== e.enabled ? e.enabled : e.show
        ),
        o = nt(null),
        r = nt(null),
        i = () => {
          const { syncTrigger: n } = e
          n.includes('scroll') && t.addScrollListener(s),
            n.includes('resize') && t.addResizeListener(s)
        },
        a = () => {
          t.removeScrollListener(s),
            t.removeResizeListener(s)
        }
      wn(() => {
        n.value && (s(), i())
      })
      const l = $d()
      bh.mount({ id: 'vueuc/binder', head: !0, ssr: l }),
        kn(() => {
          a()
        }),
        (function (e) {
          if (lf) return
          let t = !1
          wn(() => {
            lf ||
              null == af ||
              af.then(() => {
                t || e()
              })
          }),
            kn(() => {
              t = !0
            })
        })(() => {
          n.value && s()
        })
      const s = () => {
        if (!n.value) return
        const i = o.value
        if (null === i) return
        const a = t.targetRef,
          { x: l, y: s, overlap: c } = e,
          u =
            void 0 !== l && void 0 !== s
              ? (function (e, t) {
                  const n = Kp()
                  return {
                    top: t,
                    left: e,
                    height: 0,
                    width: 0,
                    right: n.width - e,
                    bottom: n.height - t,
                  }
                })(l, s)
              : Yp(a),
          {
            width: d,
            minWidth: f,
            placement: p,
            flip: h,
          } = e
        i.setAttribute('v-placement', p),
          c
            ? i.setAttribute('v-overlap', '')
            : i.removeAttribute('v-overlap')
        const { style: v } = i
        ;(v.width =
          'target' === d
            ? `${u.width}px`
            : void 0 !== d
            ? d
            : ''),
          (v.minWidth =
            'target' === f
              ? `${u.width}px`
              : void 0 !== f
              ? f
              : '')
        const g = Yp(i),
          b = Yp(r.value),
          m = (function (e, t, n, o, r) {
            if (!o || r) return e
            const [i, a] = e.split('-')
            let l = null != a ? a : 'center'
            if ('center' !== a) {
              const o = gh[e],
                r = dh[o],
                i = ph[o]
              n[i] > t[i] &&
                t[o] + t[i] <= n[i] &&
                t[o] < t[r] &&
                (l = fh[a]),
                n[i] < t[i] &&
                  t[r] < 0 &&
                  t[o] > t[r] &&
                  (l = fh[a])
            }
            let s = i
            return (
              !(t[i] >= n[ph[i]]) &&
                t[dh[i]] >= n[ph[i]] &&
                (s = dh[i]),
              'center' !== l ? `${s}-${l}` : s
            )
          })(p, u, g, h, c),
          y = (function (e, t) {
            return t ? vh[e] : hh[e]
          })(m, c),
          {
            left: x,
            top: w,
            transform: C,
          } = (function (e, t, n, o) {
            if (o)
              switch (e) {
                case 'bottom-start':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left
                    )}px`,
                    transform: 'translateY(-100%)',
                  }
                case 'bottom-end':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width
                    )}px`,
                    transform:
                      'translateX(-100%) translateY(-100%)',
                  }
                case 'top-start':
                  return {
                    top: `${Math.round(n.top - t.top)}px`,
                    left: `${Math.round(
                      n.left - t.left
                    )}px`,
                    transform: '',
                  }
                case 'top-end':
                case 'right-start':
                  return {
                    top: `${Math.round(n.top - t.top)}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width
                    )}px`,
                    transform: 'translateX(-100%)',
                  }
                case 'right-end':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width
                    )}px`,
                    transform:
                      'translateX(-100%) translateY(-100%)',
                  }
                case 'left-start':
                  return {
                    top: `${Math.round(n.top - t.top)}px`,
                    left: `${Math.round(
                      n.left - t.left
                    )}px`,
                    transform: '',
                  }
                case 'left-end':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left
                    )}px`,
                    transform: 'translateY(-100%)',
                  }
                case 'top':
                  return {
                    top: `${Math.round(n.top - t.top)}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width / 2
                    )}px`,
                    transform: 'translateX(-50%)',
                  }
                case 'right':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height / 2
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width
                    )}px`,
                    transform:
                      'translateX(-100%) translateY(-50%)',
                  }
                case 'left':
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height / 2
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left
                    )}px`,
                    transform: 'translateY(-50%)',
                  }
                case 'bottom':
                default:
                  return {
                    top: `${Math.round(
                      n.top - t.top + n.height
                    )}px`,
                    left: `${Math.round(
                      n.left - t.left + n.width / 2
                    )}px`,
                    transform:
                      'translateX(-50%) translateY(-100%)',
                  }
              }
            switch (e) {
              case 'bottom-start':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height
                  )}px`,
                  left: `${Math.round(n.left - t.left)}px`,
                  transform: '',
                }
              case 'bottom-end':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height
                  )}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width
                  )}px`,
                  transform: 'translateX(-100%)',
                }
              case 'top-start':
                return {
                  top: `${Math.round(n.top - t.top)}px`,
                  left: `${Math.round(n.left - t.left)}px`,
                  transform: 'translateY(-100%)',
                }
              case 'top-end':
                return {
                  top: `${Math.round(n.top - t.top)}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width
                  )}px`,
                  transform:
                    'translateX(-100%) translateY(-100%)',
                }
              case 'right-start':
                return {
                  top: `${Math.round(n.top - t.top)}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width
                  )}px`,
                  transform: '',
                }
              case 'right-end':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height
                  )}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width
                  )}px`,
                  transform: 'translateY(-100%)',
                }
              case 'left-start':
                return {
                  top: `${Math.round(n.top - t.top)}px`,
                  left: `${Math.round(n.left - t.left)}px`,
                  transform: 'translateX(-100%)',
                }
              case 'left-end':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height
                  )}px`,
                  left: `${Math.round(n.left - t.left)}px`,
                  transform:
                    'translateX(-100%) translateY(-100%)',
                }
              case 'top':
                return {
                  top: `${Math.round(n.top - t.top)}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width / 2
                  )}px`,
                  transform:
                    'translateY(-100%) translateX(-50%)',
                }
              case 'right':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height / 2
                  )}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width
                  )}px`,
                  transform: 'translateY(-50%)',
                }
              case 'left':
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height / 2
                  )}px`,
                  left: `${Math.round(n.left - t.left)}px`,
                  transform:
                    'translateY(-50%) translateX(-100%)',
                }
              case 'bottom':
              default:
                return {
                  top: `${Math.round(
                    n.top - t.top + n.height
                  )}px`,
                  left: `${Math.round(
                    n.left - t.left + n.width / 2
                  )}px`,
                  transform: 'translateX(-50%)',
                }
            }
          })(m, b, u, c)
        i.setAttribute('v-placement', m),
          (i.style.transform = `translateX(${x}) translateY(${w}) ${C}`),
          (i.style.transformOrigin = y)
      }
      Xt(n, (e) => {
        e ? (i(), c()) : a()
      })
      const c = () => {
        zt()
          .then(s)
          .catch((e) => console.error(e))
      }
      ;[
        'placement',
        'x',
        'y',
        'flip',
        'width',
        'overlap',
        'minWidth',
      ].forEach((t) => {
        Xt(ct(e, t), s)
      }),
        ['teleportDisabled'].forEach((t) => {
          Xt(ct(e, t), c)
        }),
        Xt(ct(e, 'syncTrigger'), (e) => {
          e.includes('resize')
            ? t.addResizeListener(s)
            : t.removeResizeListener(s),
            e.includes('scroll')
              ? t.addScrollListener(s)
              : t.removeScrollListener(s)
        })
      const u = vf(),
        d = of(() => {
          const { to: t } = e
          if (void 0 !== t) return t
          u.value
        })
      return {
        VBinder: t,
        mergedEnabled: n,
        offsetContainerRef: r,
        followerRef: o,
        mergedTo: d,
        syncPosition: s,
      }
    },
    render() {
      return dr(
        uh,
        {
          show: this.show,
          to: this.mergedTo,
          disabled: this.teleportDisabled,
        },
        {
          default: () => {
            const e = dr(
              'div',
              {
                class: [
                  'v-binder-follower-container',
                  this.containerClass,
                ],
                ref: 'offsetContainerRef',
              },
              [
                dr(
                  'div',
                  {
                    class: 'v-binder-follower-content',
                    ref: 'followerRef',
                  },
                  this.$slots
                ),
              ]
            )
            return this.zindexable
              ? eo(e, [
                  [
                    ih,
                    {
                      enabled: this.mergedEnabled,
                      zIndex: this.zIndex,
                    },
                  ],
                ])
              : e
          },
        }
      )
    },
  }),
  yh = (function () {
    if ('undefined' != typeof Map) return Map
    function e(e, t) {
      var n = -1
      return (
        e.some(function (e, o) {
          return e[0] === t && ((n = o), !0)
        }),
        n
      )
    }
    return (function () {
      function t() {
        this.__entries__ = []
      }
      return (
        Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this.__entries__.length
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.get = function (t) {
          var n = e(this.__entries__, t),
            o = this.__entries__[n]
          return o && o[1]
        }),
        (t.prototype.set = function (t, n) {
          var o = e(this.__entries__, t)
          ~o
            ? (this.__entries__[o][1] = n)
            : this.__entries__.push([t, n])
        }),
        (t.prototype.delete = function (t) {
          var n = this.__entries__,
            o = e(n, t)
          ~o && n.splice(o, 1)
        }),
        (t.prototype.has = function (t) {
          return !!~e(this.__entries__, t)
        }),
        (t.prototype.clear = function () {
          this.__entries__.splice(0)
        }),
        (t.prototype.forEach = function (e, t) {
          void 0 === t && (t = null)
          for (
            var n = 0, o = this.__entries__;
            n < o.length;
            n++
          ) {
            var r = o[n]
            e.call(t, r[1], r[0])
          }
        }),
        t
      )
    })()
  })(),
  xh =
    'undefined' != typeof window &&
    'undefined' != typeof document &&
    window.document === document,
  wh =
    'undefined' != typeof global && global.Math === Math
      ? global
      : 'undefined' != typeof self && self.Math === Math
      ? self
      : 'undefined' != typeof window && window.Math === Math
      ? window
      : Function('return this')(),
  Ch =
    'function' == typeof requestAnimationFrame
      ? requestAnimationFrame.bind(wh)
      : function (e) {
          return setTimeout(function () {
            return e(Date.now())
          }, 1e3 / 60)
        }
var Sh = [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
    'size',
    'weight',
  ],
  kh = 'undefined' != typeof MutationObserver,
  $h = (function () {
    function e() {
      ;(this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ =
          this.onTransitionEnd_.bind(this)),
        (this.refresh = (function (e, t) {
          var n = !1,
            o = !1,
            r = 0
          function i() {
            n && ((n = !1), e()), o && l()
          }
          function a() {
            Ch(i)
          }
          function l() {
            var e = Date.now()
            if (n) {
              if (e - r < 2) return
              o = !0
            } else (n = !0), (o = !1), setTimeout(a, t)
            r = e
          }
          return l
        })(this.refresh.bind(this), 20))
    }
    return (
      (e.prototype.addObserver = function (e) {
        ~this.observers_.indexOf(e) ||
          this.observers_.push(e),
          this.connected_ || this.connect_()
      }),
      (e.prototype.removeObserver = function (e) {
        var t = this.observers_,
          n = t.indexOf(e)
        ~n && t.splice(n, 1),
          !t.length && this.connected_ && this.disconnect_()
      }),
      (e.prototype.refresh = function () {
        this.updateObservers_() && this.refresh()
      }),
      (e.prototype.updateObservers_ = function () {
        var e = this.observers_.filter(function (e) {
          return e.gatherActive(), e.hasActive()
        })
        return (
          e.forEach(function (e) {
            return e.broadcastActive()
          }),
          e.length > 0
        )
      }),
      (e.prototype.connect_ = function () {
        xh &&
          !this.connected_ &&
          (document.addEventListener(
            'transitionend',
            this.onTransitionEnd_
          ),
          window.addEventListener('resize', this.refresh),
          kh
            ? ((this.mutationsObserver_ =
                new MutationObserver(this.refresh)),
              this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0,
              }))
            : (document.addEventListener(
                'DOMSubtreeModified',
                this.refresh
              ),
              (this.mutationEventsAdded_ = !0)),
          (this.connected_ = !0))
      }),
      (e.prototype.disconnect_ = function () {
        xh &&
          this.connected_ &&
          (document.removeEventListener(
            'transitionend',
            this.onTransitionEnd_
          ),
          window.removeEventListener(
            'resize',
            this.refresh
          ),
          this.mutationsObserver_ &&
            this.mutationsObserver_.disconnect(),
          this.mutationEventsAdded_ &&
            document.removeEventListener(
              'DOMSubtreeModified',
              this.refresh
            ),
          (this.mutationsObserver_ = null),
          (this.mutationEventsAdded_ = !1),
          (this.connected_ = !1))
      }),
      (e.prototype.onTransitionEnd_ = function (e) {
        var t = e.propertyName,
          n = void 0 === t ? '' : t
        Sh.some(function (e) {
          return !!~n.indexOf(e)
        }) && this.refresh()
      }),
      (e.getInstance = function () {
        return (
          this.instance_ || (this.instance_ = new e()),
          this.instance_
        )
      }),
      (e.instance_ = null),
      e
    )
  })(),
  _h = function (e, t) {
    for (var n = 0, o = Object.keys(t); n < o.length; n++) {
      var r = o[n]
      Object.defineProperty(e, r, {
        value: t[r],
        enumerable: !1,
        writable: !1,
        configurable: !0,
      })
    }
    return e
  },
  zh = function (e) {
    return (
      (e &&
        e.ownerDocument &&
        e.ownerDocument.defaultView) ||
      wh
    )
  },
  Ph = Mh(0, 0, 0, 0)
function Eh(e) {
  return parseFloat(e) || 0
}
function Oh(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n]
  return t.reduce(function (t, n) {
    return t + Eh(e['border-' + n + '-width'])
  }, 0)
}
function jh(e) {
  var t = e.clientWidth,
    n = e.clientHeight
  if (!t && !n) return Ph
  var o = zh(e).getComputedStyle(e),
    r = (function (e) {
      for (
        var t = {},
          n = 0,
          o = ['top', 'right', 'bottom', 'left'];
        n < o.length;
        n++
      ) {
        var r = o[n],
          i = e['padding-' + r]
        t[r] = Eh(i)
      }
      return t
    })(o),
    i = r.left + r.right,
    a = r.top + r.bottom,
    l = Eh(o.width),
    s = Eh(o.height)
  if (
    ('border-box' === o.boxSizing &&
      (Math.round(l + i) !== t &&
        (l -= Oh(o, 'left', 'right') + i),
      Math.round(s + a) !== n &&
        (s -= Oh(o, 'top', 'bottom') + a)),
    !(function (e) {
      return e === zh(e).document.documentElement
    })(e))
  ) {
    var c = Math.round(l + i) - t,
      u = Math.round(s + a) - n
    1 !== Math.abs(c) && (l -= c),
      1 !== Math.abs(u) && (s -= u)
  }
  return Mh(r.left, r.top, l, s)
}
var Th =
  'undefined' != typeof SVGGraphicsElement
    ? function (e) {
        return e instanceof zh(e).SVGGraphicsElement
      }
    : function (e) {
        return (
          e instanceof zh(e).SVGElement &&
          'function' == typeof e.getBBox
        )
      }
function Ah(e) {
  return xh
    ? Th(e)
      ? (function (e) {
          var t = e.getBBox()
          return Mh(0, 0, t.width, t.height)
        })(e)
      : jh(e)
    : Ph
}
function Mh(e, t, n, o) {
  return { x: e, y: t, width: n, height: o }
}
var Fh = (function () {
    function e(e) {
      ;(this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = Mh(0, 0, 0, 0)),
        (this.target = e)
    }
    return (
      (e.prototype.isActive = function () {
        var e = Ah(this.target)
        return (
          (this.contentRect_ = e),
          e.width !== this.broadcastWidth ||
            e.height !== this.broadcastHeight
        )
      }),
      (e.prototype.broadcastRect = function () {
        var e = this.contentRect_
        return (
          (this.broadcastWidth = e.width),
          (this.broadcastHeight = e.height),
          e
        )
      }),
      e
    )
  })(),
  Rh = function (e, t) {
    var n = (function (e) {
      var t = e.x,
        n = e.y,
        o = e.width,
        r = e.height,
        i =
          'undefined' != typeof DOMRectReadOnly
            ? DOMRectReadOnly
            : Object,
        a = Object.create(i.prototype)
      return (
        _h(a, {
          x: t,
          y: n,
          width: o,
          height: r,
          top: n,
          right: t + o,
          bottom: r + n,
          left: t,
        }),
        a
      )
    })(t)
    _h(this, { target: e, contentRect: n })
  },
  Bh = (function () {
    function e(e, t, n) {
      if (
        ((this.activeObservations_ = []),
        (this.observations_ = new yh()),
        'function' != typeof e)
      )
        throw new TypeError(
          'The callback provided as parameter 1 is not a function.'
        )
      ;(this.callback_ = e),
        (this.controller_ = t),
        (this.callbackCtx_ = n)
    }
    return (
      (e.prototype.observe = function (e) {
        if (!arguments.length)
          throw new TypeError(
            '1 argument required, but only 0 present.'
          )
        if (
          'undefined' != typeof Element &&
          Element instanceof Object
        ) {
          if (!(e instanceof zh(e).Element))
            throw new TypeError(
              'parameter 1 is not of type "Element".'
            )
          var t = this.observations_
          t.has(e) ||
            (t.set(e, new Fh(e)),
            this.controller_.addObserver(this),
            this.controller_.refresh())
        }
      }),
      (e.prototype.unobserve = function (e) {
        if (!arguments.length)
          throw new TypeError(
            '1 argument required, but only 0 present.'
          )
        if (
          'undefined' != typeof Element &&
          Element instanceof Object
        ) {
          if (!(e instanceof zh(e).Element))
            throw new TypeError(
              'parameter 1 is not of type "Element".'
            )
          var t = this.observations_
          t.has(e) &&
            (t.delete(e),
            t.size || this.controller_.removeObserver(this))
        }
      }),
      (e.prototype.disconnect = function () {
        this.clearActive(),
          this.observations_.clear(),
          this.controller_.removeObserver(this)
      }),
      (e.prototype.gatherActive = function () {
        var e = this
        this.clearActive(),
          this.observations_.forEach(function (t) {
            t.isActive() && e.activeObservations_.push(t)
          })
      }),
      (e.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var e = this.callbackCtx_,
            t = this.activeObservations_.map(function (e) {
              return new Rh(e.target, e.broadcastRect())
            })
          this.callback_.call(e, t, e), this.clearActive()
        }
      }),
      (e.prototype.clearActive = function () {
        this.activeObservations_.splice(0)
      }),
      (e.prototype.hasActive = function () {
        return this.activeObservations_.length > 0
      }),
      e
    )
  })(),
  Lh =
    'undefined' != typeof WeakMap
      ? new WeakMap()
      : new yh(),
  Ih = function e(t) {
    if (!(this instanceof e))
      throw new TypeError(
        'Cannot call a class as a function.'
      )
    if (!arguments.length)
      throw new TypeError(
        '1 argument required, but only 0 present.'
      )
    var n = $h.getInstance(),
      o = new Bh(t, n, this)
    Lh.set(this, o)
  }
;['observe', 'unobserve', 'disconnect'].forEach(function (
  e
) {
  Ih.prototype[e] = function () {
    var t
    return (t = Lh.get(this))[e].apply(t, arguments)
  }
})
var Dh =
  void 0 !== wh.ResizeObserver ? wh.ResizeObserver : Ih
var Hh = new (class {
    constructor() {
      ;(this.handleResize = this.handleResize.bind(this)),
        (this.observer = new Dh(this.handleResize)),
        (this.elHandlersMap = new Map())
    }
    handleResize(e) {
      for (const t of e) {
        const e = this.elHandlersMap.get(t.target)
        void 0 !== e && e(t)
      }
    }
    registerHandler(e, t) {
      this.elHandlersMap.set(e, t), this.observer.observe(e)
    }
    unregisterHandler(e) {
      this.elHandlersMap.has(e) &&
        (this.elHandlersMap.delete(e),
        this.observer.unobserve(e))
    }
  })(),
  Nh = dn({
    name: 'ResizeObserver',
    props: { onResize: Function },
    setup: (e) => ({
      registered: !1,
      handleResize(t) {
        const { onResize: n } = e
        void 0 !== n && n(t)
      },
    }),
    mounted() {
      const e = this.$el
      void 0 === e
        ? ah('resize-observer', '$el does not exist.')
        : e.nextElementSibling !== e.nextSibling
        ? ah(
            'resize-observer',
            '$el can not be observed (it may be a text node).'
          )
        : null !== e.nextElementSibling &&
          (Hh.registerHandler(
            e.nextElementSibling,
            this.handleResize
          ),
          (this.registered = !0))
    },
    beforeUnmount() {
      this.registered &&
        Hh.unregisterHandler(this.$el.nextElementSibling)
    },
    render() {
      return Uo(this.$slots, 'default')
    },
  })
const Wh = lh(
  '.v-vl',
  {
    maxHeight: 'inherit',
    height: '100%',
    overflow: 'auto',
    minWidth: '1px',
  },
  [
    lh(
      '&:not(.v-vl--show-scrollbar)',
      { scrollbarWidth: 'none' },
      [
        lh(
          '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
          { width: 0, height: 0, display: 'none' }
        ),
      ]
    ),
  ]
)
var Vh = dn({
  name: 'VirtualList',
  inheritAttrs: !1,
  props: {
    showScrollbar: { type: Boolean, default: !0 },
    items: { type: Array, default: () => [] },
    itemSize: { type: Number, required: !0 },
    itemResizable: Boolean,
    itemsStyle: [String, Object],
    visibleItemsTag: {
      type: [String, Object],
      default: 'div',
    },
    visibleItemsProps: Object,
    ignoreItemResize: Boolean,
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    defaultScrollKey: [Number, String],
    defaultScrollIndex: Number,
    keyField: { type: String, default: 'key' },
    paddingTop: { type: [Number, String], default: 0 },
    paddingBottom: { type: [Number, String], default: 0 },
  },
  setup(e) {
    const t = $d()
    Wh.mount({
      id: 'vueuc/virtual-list',
      head: !0,
      ssr: t,
    }),
      wn(() => {
        const {
          defaultScrollIndex: t,
          defaultScrollKey: n,
        } = e
        null != t
          ? d({ index: t })
          : null != n && d({ key: n })
      })
    const n = ur(() => {
        const t = new Map(),
          { keyField: n } = e
        return (
          e.items.forEach((e, o) => {
            t.set(e[n], o)
          }),
          t
        )
      }),
      o = nt(null),
      r = nt(void 0),
      i = new Map(),
      a = ur(() => {
        const { items: t, itemSize: n, keyField: o } = e,
          r = new ch(t.length, n)
        return (
          t.forEach((e, t) => {
            const n = e[o],
              a = i.get(n)
            void 0 !== a && r.add(t, a)
          }),
          r
        )
      }),
      l = nt(0),
      s = nt(0),
      c = of(() =>
        Math.max(
          a.value.getBound(s.value - el(e.paddingTop)) - 1,
          0
        )
      ),
      u = ur(() => {
        const { value: t } = r
        if (void 0 === t) return []
        const { items: n, itemSize: o } = e,
          i = c.value,
          a = Math.min(
            i + Math.ceil(t / o + 1),
            n.length - 1
          ),
          l = []
        for (let e = i; e <= a; ++e) l.push(n[e])
        return l
      }),
      d = (e) => {
        const {
          left: t,
          top: o,
          index: r,
          key: i,
          position: a,
          behavior: l,
          debounce: s = !0,
        } = e
        if (void 0 !== t || void 0 !== o) p(t, o, l)
        else if (void 0 !== r) f(r, l, s)
        else if (void 0 !== i) {
          const e = n.value.get(i)
          void 0 !== e && f(e, l, s)
        } else
          'bottom' === a
            ? p(0, Number.MAX_SAFE_INTEGER, l)
            : 'top' === a && p(0, 0, l)
      }
    function f(t, n, r) {
      const { value: i } = a,
        l = i.sum(t) + el(e.paddingTop)
      if (r) {
        const { scrollTop: e, offsetHeight: r } = o.value
        if (l > e) {
          const a = i.get(t)
          l + a <= e + r ||
            o.value.scrollTo({
              left: 0,
              top: l + a - r,
              behavior: n,
            })
        } else
          o.value.scrollTo({ left: 0, top: l, behavior: n })
      } else
        o.value.scrollTo({ left: 0, top: l, behavior: n })
      h = t
    }
    function p(e, t, n) {
      o.value.scrollTo({ left: e, top: t, behavior: n })
    }
    let h, v
    function g() {
      const { value: e } = o
      null != e &&
        ((v = null != h ? h : c.value),
        (h = void 0),
        (s.value = o.value.scrollTop))
    }
    return {
      listHeight: r,
      listStyle: { overflow: 'auto' },
      keyToIndex: n,
      itemsStyle: ur(() => {
        const { itemResizable: t } = e,
          n = tl(a.value.sum())
        return (
          l.value,
          [
            e.itemsStyle,
            {
              boxSizing: 'content-box',
              height: t ? '' : n,
              minHeight: t ? n : '',
              paddingTop: tl(e.paddingTop),
              paddingBottom: tl(e.paddingBottom),
            },
          ]
        )
      }),
      visibleItemsStyle: ur(
        () => (
          l.value,
          {
            transform: `translate3d(0, ${tl(
              a.value.sum(c.value)
            )}, 0)`,
          }
        )
      ),
      viewportItems: u,
      listElRef: o,
      itemsElRef: nt(null),
      scrollTo: d,
      handleListResize: function (t) {
        r.value = t.contentRect.height
        const { onResize: n } = e
        void 0 !== n && n(t)
      },
      handleListScroll: function (t) {
        Ja(g)
        const { onScroll: n } = e
        void 0 !== n && n(t)
      },
      handleItemResize: function (t, r) {
        var s
        if (e.ignoreItemResize) return
        const { value: c } = a,
          u = n.value.get(t),
          d = r.target.offsetHeight
        0 === d - e.itemSize
          ? i.delete(t)
          : i.set(t, d - e.itemSize)
        const f = d - c.get(u)
        0 !== f &&
          (void 0 !== v &&
            u <= v &&
            (null === (s = o.value) ||
              void 0 === s ||
              s.scrollBy(0, f)),
          c.add(u, f),
          l.value++)
      },
    }
  },
  render() {
    const {
      itemResizable: e,
      keyField: t,
      keyToIndex: n,
      visibleItemsTag: o,
    } = this
    return dr(
      Nh,
      { onResize: this.handleListResize },
      {
        default: () => {
          var r, i
          return dr(
            'div',
            Vo(this.$attrs, {
              class: [
                'v-vl',
                this.showScrollbar &&
                  'v-vl--show-scrollbar',
              ],
              onScroll: this.handleListScroll,
              onWheel: this.onWheel,
              ref: 'listElRef',
            }),
            [
              0 !== this.items.length
                ? dr(
                    'div',
                    {
                      ref: 'itemsElRef',
                      class: 'v-vl-items',
                      style: this.itemsStyle,
                    },
                    [
                      dr(
                        o,
                        Object.assign(
                          {
                            class: 'v-vl-visible-items',
                            style: this.visibleItemsStyle,
                          },
                          this.visibleItemsProps
                        ),
                        {
                          default: () =>
                            this.viewportItems.map((o) => {
                              const r = o[t],
                                i = n.get(r),
                                a = this.$slots.default({
                                  item: o,
                                  index: i,
                                })[0]
                              return e
                                ? dr(
                                    Nh,
                                    {
                                      key: r,
                                      onResize: (e) =>
                                        this.handleItemResize(
                                          r,
                                          e
                                        ),
                                    },
                                    { default: () => a }
                                  )
                                : ((a.key = r), a)
                            }),
                        }
                      ),
                    ]
                  )
                : null === (i = (r = this.$slots).empty) ||
                  void 0 === i
                ? void 0
                : i.call(r),
            ]
          )
        },
      }
    )
  },
})
const qh = lh('[v-hidden]', { display: 'none!important' })
var Uh = dn({
  name: 'Overflow',
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function,
  },
  setup(e, { slots: t }) {
    const n = nt(null),
      o = nt(null)
    function r() {
      const { value: r } = n,
        { getCounter: i, getTail: a } = e
      let l
      if (((l = void 0 !== i ? i() : o.value), !r || !l))
        return
      l.hasAttribute('v-hidden') &&
        l.removeAttribute('v-hidden')
      const { children: s } = r,
        c = r.offsetWidth,
        u = [],
        d = t.tail ? (null == a ? void 0 : a()) : null
      let f = d ? d.offsetWidth : 0,
        p = !1
      const h = r.children.length - (t.tail ? 1 : 0)
      for (let t = 0; t < h - 1; ++t) {
        if (t < 0) continue
        const n = s[t]
        if (p) {
          n.hasAttribute('v-hidden') ||
            n.setAttribute('v-hidden', '')
          continue
        }
        n.hasAttribute('v-hidden') &&
          n.removeAttribute('v-hidden')
        const o = n.offsetWidth
        if (((f += o), (u[t] = o), f > c)) {
          const { updateCounter: n } = e
          for (let e = t; e >= 0; --e) {
            const o = h - 1 - e
            void 0 !== n ? n(o) : (l.textContent = `${o}`)
            const r = l.offsetWidth
            if (((f -= u[e]), f + r <= c || 0 === e)) {
              ;(p = !0),
                (t = e - 1),
                d &&
                  (-1 === t
                    ? ((d.style.maxWidth = c - r + 'px'),
                      (d.style.boxSizing = 'border-box'))
                    : (d.style.maxWidth = ''))
              break
            }
          }
        }
      }
      const { onUpdateOverflow: v } = e
      p
        ? void 0 !== v && v(!0)
        : (void 0 !== v && v(!1),
          l.setAttribute('v-hidden', ''))
    }
    const i = $d()
    return (
      qh.mount({ id: 'vueuc/overflow', head: !0, ssr: i }),
      wn(r),
      { selfRef: n, counterRef: o, sync: r }
    )
  },
  render() {
    const { $slots: e } = this
    return (
      zt(this.sync),
      dr('div', { class: 'v-overflow', ref: 'selfRef' }, [
        Uo(e, 'default'),
        e.counter
          ? e.counter()
          : dr('span', {
              style: { display: 'inline-block' },
              ref: 'counterRef',
            }),
        e.tail ? e.tail() : null,
      ])
    )
  },
})
const Gh = '#FFF',
  Kh = '#000',
  Yh = '#000',
  Xh = '#fff',
  Zh = '#fff',
  Jh = '#fff',
  Qh = '#fff',
  ev = '0.82',
  tv = '0.72',
  nv = '0.38',
  ov = '0.24',
  rv = '0.18',
  iv = '0.52',
  av = '0.5',
  lv = '0.2',
  sv = '.08',
  cv = '0',
  uv = '0.25',
  dv = '0.4',
  fv = '#36ad6a',
  pv = '#18a058',
  hv = '#0c7a43',
  vv = '#36ad6a',
  gv = '#4098fc',
  bv = '#2080f0',
  mv = '#1060c9',
  yv = '#4098fc',
  xv = '#de576d',
  wv = '#d03050',
  Cv = '#ab1f3f',
  Sv = '#de576d',
  kv = '#fcb040',
  $v = '#f0a020',
  _v = '#c97c10',
  zv = '#fcb040',
  Pv = '#36ad6a',
  Ev = '#18a058',
  Ov = '#0c7a43',
  jv = '#36ad6a',
  Tv = hl(Gh),
  Av = hl(Kh),
  Mv = 'rgba(' + Av.slice(0, 3).join(', ') + ', '
function Fv(e) {
  return Mv + String(e) + ')'
}
function Rv(e) {
  const t = Array.from(Av)
  return (t[3] = Number(e)), bl(Tv, t)
}
const Bv = Object.assign(
  Object.assign({ name: 'common' }, ef),
  {
    baseColor: Gh,
    primaryColor: pv,
    primaryColorHover: fv,
    primaryColorPressed: hv,
    primaryColorSuppl: vv,
    infoColor: bv,
    infoColorHover: gv,
    infoColorPressed: mv,
    infoColorSuppl: yv,
    successColor: Ev,
    successColorHover: Pv,
    successColorPressed: Ov,
    successColorSuppl: jv,
    warningColor: $v,
    warningColorHover: kv,
    warningColorPressed: _v,
    warningColorSuppl: zv,
    errorColor: wv,
    errorColorHover: xv,
    errorColorPressed: Cv,
    errorColorSuppl: Sv,
    textColorBase: Yh,
    textColor1: 'rgb(31, 34, 37)',
    textColor2: 'rgb(51, 54, 57)',
    textColor3: 'rgb(158, 164, 170)',
    textColorDisabled: Rv(ov),
    placeholderColor: Rv(ov),
    placeholderColorDisabled: Rv(rv),
    iconColor: Rv(ov),
    iconColorHover: yl(Rv(ov), { lightness: 0.75 }),
    iconColorPressed: yl(Rv(ov), { lightness: 0.9 }),
    iconColorDisabled: Rv(rv),
    opacity1: ev,
    opacity2: tv,
    opacity3: nv,
    opacity4: ov,
    opacity5: rv,
    dividerColor: 'rgb(239, 239, 245)',
    borderColor: 'rgb(224, 224, 230)',
    closeColor: Rv(Number(iv)),
    closeColorHover: Rv(1.25 * Number(iv)),
    closeColorPressed: Rv(0.8 * Number(iv)),
    closeColorDisabled: Rv(ov),
    clearColor: Rv(ov),
    clearColorHover: yl(Rv(ov), { lightness: 0.75 }),
    clearColorPressed: yl(Rv(ov), { lightness: 0.9 }),
    scrollbarColor: Fv(uv),
    scrollbarColorHover: Fv(dv),
    scrollbarWidth: '5px',
    scrollbarHeight: '5px',
    scrollbarBorderRadius: '5px',
    progressRailColor: Rv(sv),
    railColor: 'rgb(219, 219, 223)',
    popoverColor: Xh,
    tableColor: Zh,
    cardColor: Zh,
    modalColor: Jh,
    bodyColor: Qh,
    tagColor: 'rgb(250, 250, 252)',
    avatarColor: Rv(lv),
    invertedColor: 'rgb(0, 20, 40)',
    inputColor: Rv(cv),
    codeColor: 'rgb(244, 244, 248)',
    tabColor: 'rgb(247, 247, 250)',
    actionColor: 'rgb(250, 250, 252)',
    tableHeaderColor: 'rgb(250, 250, 252)',
    hoverColor: 'rgb(243, 243, 245)',
    tableColorHover: 'rgba(0, 0, 100, 0.02)',
    pressedColor: 'rgb(237, 237, 239)',
    opacityDisabled: av,
    inputColorDisabled: 'rgb(250, 250, 252)',
    boxShadow1:
      '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
    boxShadow2:
      '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
    boxShadow3:
      '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
  }
)
var Lv = {
  iconSizeSmall: '34px',
  iconSizeMedium: '40px',
  iconSizeLarge: '46px',
  iconSizeHuge: '52px',
}
const Iv = {
  name: 'Empty',
  common: Bv,
  self: (e) => {
    const {
      textColorDisabled: t,
      iconColor: n,
      textColor2: o,
      fontSizeSmall: r,
      fontSizeMedium: i,
      fontSizeLarge: a,
      fontSizeHuge: l,
    } = e
    return Object.assign(Object.assign({}, Lv), {
      fontSizeSmall: r,
      fontSizeMedium: i,
      fontSizeLarge: a,
      fontSizeHuge: l,
      textColor: t,
      iconColor: n,
      extraTextColor: o,
    })
  },
}
var Dv = Kd(
  'empty',
  '\n display: flex;\n flex-direction: column;\n align-items: center;\n font-size: var(--font-size);\n',
  [
    Yd(
      'icon',
      '\n width: var(--icon-size);\n height: var(--icon-size);\n font-size: var(--icon-size);\n line-height: var(--icon-size);\n color: var(--icon-color);\n transition:\n color .3s var(--bezier);\n '
    ),
    Yd(
      'description',
      '\n margin-top: 8px;\n transition: color .3s var(--bezier);\n color: var(--text-color);\n '
    ),
    Yd(
      'extra',
      '\n text-align: center;\n transition: color .3s var(--bezier);\n margin-top: 12px;\n color: var(--extra-text-color);\n '
    ),
  ]
)
var Hv = dn({
  name: 'Empty',
  props: Object.assign(Object.assign({}, Bf.props), {
    description: { type: String, default: void 0 },
    showDescription: { type: Boolean, default: !0 },
    size: { type: String, default: 'medium' },
    renderIcon: Function,
  }),
  setup(e) {
    const { mergedClsPrefixRef: t } = If(e),
      n = Bf('Empty', 'Empty', Dv, Iv, e, t),
      { localeRef: o } = Zf('Empty'),
      r = Gt(Rf, null),
      i = ur(() => {
        var t, n, o
        return null !== (t = e.description) && void 0 !== t
          ? t
          : null ===
              (o =
                null ===
                  (n =
                    null == r
                      ? void 0
                      : r.mergedComponentPropsRef.value) ||
                void 0 === n
                  ? void 0
                  : n.Empty) || void 0 === o
          ? void 0
          : o.description
      })
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: ur(() => {
        var e, t
        return (
          (null ===
            (t =
              null ===
                (e =
                  null == r
                    ? void 0
                    : r.mergedComponentPropsRef.value) ||
              void 0 === e
                ? void 0
                : e.Empty) || void 0 === t
            ? void 0
            : t.renderIcon) || (() => dr(ip, null))
        )
      }),
      localizedDescription: ur(
        () => i.value || o.value.description
      ),
      cssVars: ur(() => {
        const { size: t } = e,
          {
            common: { cubicBezierEaseInOut: o },
            self: {
              [Wd('iconSize', t)]: r,
              [Wd('fontSize', t)]: i,
              textColor: a,
              iconColor: l,
              extraTextColor: s,
            },
          } = n.value
        return {
          '--icon-size': r,
          '--font-size': i,
          '--bezier': o,
          '--text-color': a,
          '--icon-color': l,
          '--extra-text-color': s,
        }
      }),
    }
  },
  render() {
    const { $slots: e, mergedClsPrefix: t } = this
    return dr(
      'div',
      { class: `${t}-empty`, style: this.cssVars },
      dr(
        'div',
        { class: `${t}-empty__icon` },
        Uo(e, 'icon', void 0, () => [
          dr(
            vp,
            { clsPrefix: t },
            { default: this.mergedRenderIcon }
          ),
        ])
      ),
      this.showDescription
        ? dr(
            'div',
            { class: `${t}-empty__description` },
            Uo(e, 'default', void 0, () => [
              this.localizedDescription,
            ])
          )
        : null,
      e.extra
        ? dr(
            'div',
            { class: `${t}-empty__extra` },
            Uo(e, 'extra')
          )
        : null
    )
  },
})
const Nv = {
    name: 'Scrollbar',
    common: Bv,
    self: (e) => {
      const { scrollbarColor: t, scrollbarColorHover: n } =
        e
      return { color: t, colorHover: n }
    },
  },
  { cubicBezierEaseInOut: Wv } = ef
var Vv = Kd(
  'scrollbar',
  '\n overflow: hidden;\n position: relative;\n z-index: auto;\n height: 100%;\n width: 100%;\n',
  [
    Ud('>', [
      Kd(
        'scrollbar-container',
        '\n width: 100%;\n overflow: scroll;\n height: 100%;\n max-height: inherit;\n scrollbar-width: none;\n ',
        [
          Ud(
            '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
            '\n width: 0;\n height: 0;\n display: none;\n '
          ),
          Ud('>', [
            Kd(
              'scrollbar-content',
              '\n box-sizing: border-box;\n min-width: 100%;\n '
            ),
          ]),
        ]
      ),
      Kd(
        'scrollbar-rail',
        '\n position: absolute;\n pointer-events: none;\n user-select: none;\n ',
        [
          Xd(
            'horizontal',
            '\n left: 2px;\n right: 2px;\n bottom: 4px;\n height: var(--scrollbar-height);\n ',
            [
              Ud('>', [
                Yd(
                  'scrollbar',
                  '\n height: var(--scrollbar-height);\n border-radius: var(--scrollbar-border-radius);\n right: 0;\n '
                ),
              ]),
            ]
          ),
          Xd(
            'vertical',
            '\n right: 4px;\n top: 2px;\n bottom: 2px;\n width: var(--scrollbar-width);\n ',
            [
              Ud('>', [
                Yd(
                  'scrollbar',
                  '\n width: var(--scrollbar-width);\n border-radius: var(--scrollbar-border-radius);\n bottom: 0;\n '
                ),
              ]),
            ]
          ),
          Xd('disabled', [
            Ud('>', [
              Yd('scrollbar', { pointerEvents: 'none' }),
            ]),
          ]),
          Ud('>', [
            Yd(
              'scrollbar',
              '\n position: absolute;\n cursor: pointer;\n pointer-events: all;\n background-color: var(--scrollbar-color);\n transition: background-color .2s var(--scrollbar-bezier);\n ',
              [
                (function ({
                  name: e = 'fade-in',
                  enterDuration: t = '0.2s',
                  leaveDuration: n = '0.2s',
                  enterCubicBezier: o = Wv,
                  leaveCubicBezier: r = Wv,
                } = {}) {
                  return [
                    Ud(`&.${e}-transition-enter-active`, {
                      transition: `all ${t} ${o}!important`,
                    }),
                    Ud(`&.${e}-transition-leave-active`, {
                      transition: `all ${n} ${r}!important`,
                    }),
                    Ud(
                      `&.${e}-transition-enter-from, &.${e}-transition-leave-to`,
                      { opacity: 0 }
                    ),
                    Ud(
                      `&.${e}-transition-leave-from, &.${e}-transition-enter-to`,
                      { opacity: 1 }
                    ),
                  ]
                })(),
                Ud('&:hover', {
                  backgroundColor:
                    'var(--scrollbar-color-hover)',
                }),
              ]
            ),
          ]),
        ]
      ),
    ]),
  ]
)
const qv = dn({
    name: 'Scrollbar',
    props: Object.assign(Object.assign({}, Bf.props), {
      size: { type: Number, default: 5 },
      duration: { type: Number, default: 0 },
      scrollable: { type: Boolean, default: !0 },
      xScrollable: { type: Boolean, default: !1 },
      container: Function,
      content: Function,
      containerStyle: [String, Object],
      contentClass: String,
      contentStyle: [String, Object],
      horizontalRailStyle: [String, Object],
      verticalRailStyle: [String, Object],
      onScroll: Function,
      onWheel: Function,
      onResize: Function,
      internalOnUpdateScrollLeft: Function,
    }),
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: t } = If(e),
        n = nt(null),
        o = nt(null),
        r = nt(null),
        i = nt(null),
        a = nt(null),
        l = nt(null),
        s = nt(null),
        c = nt(null),
        u = nt(null),
        d = nt(null),
        f = nt(0),
        p = nt(0),
        h = nt(!1),
        v = nt(!1)
      let g,
        b,
        m = !1,
        y = !1,
        x = 0,
        w = 0,
        C = 0,
        S = 0
      const k = bf,
        $ = ur(() => {
          const { value: t } = s,
            { value: n } = a,
            { value: o } = u
          return null === t || null === n || null === o
            ? 0
            : Math.min(t, (o * t) / n + 1.5 * e.size)
        }),
        _ = ur(() => `${$.value}px`),
        z = ur(() => {
          const { value: t } = c,
            { value: n } = l,
            { value: o } = d
          return null === t || null === n || null === o
            ? 0
            : (o * t) / n + 1.5 * e.size
        }),
        P = ur(() => `${z.value}px`),
        E = ur(() => {
          const { value: e } = s,
            { value: t } = f,
            { value: n } = a,
            { value: o } = u
          return null === e || null === n || null === o
            ? 0
            : (t / (n - e)) * (o - $.value)
        }),
        O = ur(() => `${E.value}px`),
        j = ur(() => {
          const { value: e } = c,
            { value: t } = p,
            { value: n } = l,
            { value: o } = d
          return null === e || null === n || null === o
            ? 0
            : (t / (n - e)) * (o - z.value)
        }),
        T = ur(() => `${j.value}px`),
        A = ur(() => {
          const { value: e } = s,
            { value: t } = a
          return null !== e && null !== t && t > e
        }),
        M = ur(() => {
          const { value: e } = c,
            { value: t } = l
          return null !== e && null !== t && t > e
        }),
        F = ur(() => {
          const { container: t } = e
          return t ? t() : n.value
        }),
        R = ur(() => {
          const { content: t } = e
          return t ? t() : o.value
        }),
        B = H
      function L(e, t, n, o, r) {
        const { value: i } = F
        if (i) {
          if (o) {
            const { scrollTop: o, offsetHeight: a } = i
            if (t > o)
              return void (
                t + n <= o + a ||
                i.scrollTo({
                  left: e,
                  top: t + n - a,
                  behavior: r,
                })
              )
          }
          i.scrollTo({ left: e, top: t, behavior: r })
        }
      }
      function I() {
        !(function () {
          void 0 !== b && window.clearTimeout(b)
          b = window.setTimeout(() => {
            v.value = !1
          }, e.duration)
        })(),
          (function () {
            void 0 !== g && window.clearTimeout(g)
            g = window.setTimeout(() => {
              h.value = !1
            }, e.duration)
          })()
      }
      function D() {
        const { value: e } = F
        e &&
          ((f.value = e.scrollTop),
          (p.value = e.scrollLeft))
      }
      function H() {
        e.scrollable &&
          (!(function () {
            const { value: e } = R
            e &&
              ((a.value = e.offsetHeight),
              (l.value = e.offsetWidth))
            const { value: t } = F
            t &&
              ((s.value = t.offsetHeight),
              (c.value = t.offsetWidth))
            const { value: n } = i,
              { value: o } = r
            n && (d.value = n.offsetWidth),
              o && (u.value = o.offsetHeight)
          })(),
          D())
      }
      function N(t) {
        if (!y) return
        void 0 !== g && window.clearTimeout(g),
          void 0 !== b && window.clearTimeout(b)
        const { value: n } = c,
          { value: o } = l,
          { value: r } = z
        if (null === n || null === o) return
        const i = t.clientX - C,
          a = o - n
        let s = w + (i * (o - n)) / (n - r)
        ;(s = Math.min(a, s)), (s = Math.max(s, 0))
        const { value: u } = F
        if (u) {
          u.scrollLeft = s
          const { internalOnUpdateScrollLeft: t } = e
          t && t(s)
        }
      }
      function W(e) {
        e.preventDefault(),
          e.stopPropagation(),
          pf('mousemove', window, N, !0),
          pf('mouseup', window, W, !0),
          (y = !1),
          H()
        const { value: t } = F
        ;(null == t ? void 0 : t.contains(e.target)) || I()
      }
      function V(e) {
        if (!m) return
        void 0 !== g && window.clearTimeout(g),
          void 0 !== b && window.clearTimeout(b)
        const { value: t } = s,
          { value: n } = a,
          { value: o } = $
        if (null === t || null === n) return
        const r = e.clientY - S,
          i = n - t
        let l = x + (r * (n - t)) / (t - o)
        ;(l = Math.min(i, l)), (l = Math.max(l, 0))
        const { value: c } = F
        c && (c.scrollTop = l)
      }
      function q(e) {
        e.preventDefault(),
          e.stopPropagation(),
          pf('mousemove', window, V, !0),
          pf('mouseup', window, q, !0),
          (m = !1),
          H()
        const { value: t } = F
        ;(null == t ? void 0 : t.contains(e.target)) || I()
      }
      Kt(() => {
        const { value: e } = M,
          { value: n } = A,
          { value: o } = t,
          { value: a } = i,
          { value: l } = r
        a &&
          (e
            ? a.classList.remove(
                `${o}-scrollbar-rail--disabled`
              )
            : a.classList.add(
                `${o}-scrollbar-rail--disabled`
              )),
          l &&
            (n
              ? l.classList.remove(
                  `${o}-scrollbar-rail--disabled`
                )
              : l.classList.add(
                  `${o}-scrollbar-rail--disabled`
                ))
      }),
        wn(() => {
          e.container || H()
        }),
        kn(() => {
          void 0 !== g && window.clearTimeout(g),
            void 0 !== b && window.clearTimeout(b),
            pf('mousemove', window, V, !0),
            pf('mouseup', window, q, !0)
        })
      const U = Bf('Scrollbar', 'Scrollbar', Vv, Nv, e, t)
      return {
        sync: H,
        scrollTo: (t, n) => {
          if (!e.scrollable) return
          if ('number' == typeof t)
            return void L(
              t,
              null != n ? n : 0,
              0,
              !1,
              'auto'
            )
          const {
            left: o,
            top: r,
            index: i,
            elSize: a,
            position: l,
            behavior: s,
            el: c,
            debounce: u = !0,
          } = t
          ;(void 0 === o && void 0 === r) ||
            L(
              null != o ? o : 0,
              null != r ? r : 0,
              0,
              !1,
              s
            ),
            void 0 !== c
              ? L(0, c.offsetTop, c.offsetHeight, u, s)
              : void 0 !== i && void 0 !== a
              ? L(0, i * a, a, u, s)
              : 'bottom' === l
              ? L(0, Number.MAX_SAFE_INTEGER, 0, !1, s)
              : 'top' === l && L(0, 0, 0, !1, s)
        },
        mergedClsPrefix: t,
        containerScrollTop: f,
        containerRef: n,
        contentRef: o,
        yRailRef: r,
        xRailRef: i,
        needYBar: A,
        needXBar: M,
        yBarSizePx: _,
        xBarSizePx: P,
        yBarTopPx: O,
        xBarLeftPx: T,
        isShowXBar: h,
        isShowYBar: v,
        isIos: k,
        handleScroll: function (t) {
          const { onScroll: n } = e
          n && n(t), D()
        },
        handleContentResize: B,
        handleContainerResize: (t) => {
          const { onResize: n } = e
          n && n(t), H()
        },
        handleMouseEnterWrapper: function () {
          !(function () {
            void 0 !== g && window.clearTimeout(g)
            h.value = !0
          })(),
            (function () {
              void 0 !== b && window.clearTimeout(b)
              v.value = !0
            })(),
            H()
        },
        handleMouseLeaveWrapper: function () {
          I()
        },
        handleYScrollMouseDown: function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            (m = !0),
            ff('mousemove', window, V, !0),
            ff('mouseup', window, q, !0),
            (x = f.value),
            (S = e.clientY)
        },
        handleXScrollMouseDown: function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            (y = !0),
            ff('mousemove', window, N, !0),
            ff('mouseup', window, W, !0),
            (w = p.value),
            (C = e.clientX)
        },
        cssVars: ur(() => {
          const {
            common: {
              cubicBezierEaseInOut: e,
              scrollbarBorderRadius: t,
              scrollbarHeight: n,
              scrollbarWidth: o,
            },
            self: { color: r, colorHover: i },
          } = U.value
          return {
            '--scrollbar-bezier': e,
            '--scrollbar-color': r,
            '--scrollbar-color-hover': i,
            '--scrollbar-border-radius': t,
            '--scrollbar-width': o,
            '--scrollbar-height': n,
          }
        }),
      }
    },
    render() {
      const { $slots: e, mergedClsPrefix: t } = this
      if (!this.scrollable) return Uo(e, 'default')
      const n = () =>
        dr(
          'div',
          Vo(this.$attrs, {
            class: `${t}-scrollbar`,
            style: this.cssVars,
            onMouseenter: this.handleMouseEnterWrapper,
            onMouseleave: this.handleMouseLeaveWrapper,
          }),
          [
            this.container
              ? Uo(e, 'default')
              : dr(
                  'div',
                  {
                    ref: 'containerRef',
                    class: `${t}-scrollbar-container`,
                    style: this.containerStyle,
                    onScroll: this.handleScroll,
                    onWheel: this.onWheel,
                  },
                  dr(
                    Nh,
                    { onResize: this.handleContentResize },
                    {
                      default: () =>
                        dr(
                          'div',
                          {
                            ref: 'contentRef',
                            style: [
                              {
                                width: this.xScrollable
                                  ? 'fit-content'
                                  : null,
                              },
                              this.contentStyle,
                            ],
                            class: [
                              `${t}-scrollbar-content`,
                              this.contentClass,
                            ],
                          },
                          e
                        ),
                    }
                  )
                ),
            dr(
              'div',
              {
                ref: 'yRailRef',
                class: `${t}-scrollbar-rail ${t}-scrollbar-rail--vertical`,
                style: [this.horizontalRailStyle],
              },
              dr(
                Er,
                { name: 'fade-in-transition' },
                {
                  default: () =>
                    this.needYBar &&
                    this.isShowYBar &&
                    !this.isIos
                      ? dr('div', {
                          class: `${t}-scrollbar-rail__scrollbar`,
                          style: {
                            height: this.yBarSizePx,
                            top: this.yBarTopPx,
                          },
                          onMousedown:
                            this.handleYScrollMouseDown,
                        })
                      : null,
                }
              )
            ),
            dr(
              'div',
              {
                ref: 'xRailRef',
                class: `${t}-scrollbar-rail ${t}-scrollbar-rail--horizontal`,
                style: [this.verticalRailStyle],
              },
              dr(
                Er,
                { name: 'fade-in-transition' },
                {
                  default: () =>
                    this.needXBar &&
                    this.isShowXBar &&
                    !this.isIos
                      ? dr('div', {
                          class: `${t}-scrollbar-rail__scrollbar`,
                          style: {
                            width: this.xBarSizePx,
                            left: this.xBarLeftPx,
                          },
                          onMousedown:
                            this.handleXScrollMouseDown,
                        })
                      : null,
                }
              )
            ),
          ]
        )
      return this.container
        ? n()
        : dr(
            Nh,
            { onResize: this.handleContainerResize },
            { default: n }
          )
    },
  }),
  Uv = dr(ep)
var Gv = dn({
    name: 'NBaseSelectOption',
    props: {
      clsPrefix: { type: String, required: !0 },
      tmNode: { type: Object, required: !0 },
    },
    setup(e) {
      const {
          valueRef: t,
          pendingTmNodeRef: n,
          multipleRef: o,
          valueSetRef: r,
          renderLabelRef: i,
          renderOptionRef: a,
          handleOptionClick: l,
          handleOptionMouseEnter: s,
        } = Gt(Tf),
        c = of(() => {
          const { value: t } = n
          return !!t && e.tmNode.key === t.key
        })
      return {
        multiple: o,
        isGrouped: of(() => {
          const { tmNode: t } = e,
            { parent: n } = t
          return n && 'group' === n.rawNode.type
        }),
        isPending: c,
        isSelected: of(() => {
          const { value: n } = t,
            { value: i } = o
          if (null === n) return !1
          const a = e.tmNode.rawNode.value
          if (i) {
            const { value: e } = r
            return e.has(a)
          }
          return n === a
        }),
        renderLabel: i,
        renderOption: a,
        handleMouseMove: function (t) {
          const { tmNode: n } = e,
            { value: o } = c
          n.disabled || o || s(t, n)
        },
        handleMouseEnter: function (t) {
          const { tmNode: n } = e
          n.disabled || s(t, n)
        },
        handleClick: function (t) {
          const { tmNode: n } = e
          n.disabled || l(t, n)
        },
      }
    },
    render() {
      const {
          clsPrefix: e,
          tmNode: { rawNode: t },
          isSelected: n,
          isPending: o,
          isGrouped: r,
          multiple: i,
          renderOption: a,
          renderLabel: l,
          handleClick: s,
          handleMouseEnter: c,
          handleMouseMove: u,
        } = this,
        d = (function (e, t) {
          return dr(
            Er,
            { name: 'fade-in-scale-up-transition' },
            {
              default: () =>
                e
                  ? dr(
                      vp,
                      {
                        clsPrefix: t,
                        class: `${t}-base-select-option__check`,
                      },
                      { default: () => Uv }
                    )
                  : null,
            }
          )
        })(i && n, e),
        f = l ? [l(t, n), d] : [Cf(t.label, t, n), d],
        p = dr(
          'div',
          {
            class: [
              `${e}-base-select-option`,
              t.class,
              {
                [`${e}-base-select-option--disabled`]:
                  t.disabled,
                [`${e}-base-select-option--selected`]: n,
                [`${e}-base-select-option--grouped`]: r,
                [`${e}-base-select-option--pending`]: o,
              },
            ],
            style: t.style,
            onClick: s,
            onMouseenter: c,
            onMousemove: u,
          },
          dr(
            'div',
            { class: `${e}-base-select-option__content` },
            f
          )
        )
      return t.render
        ? t.render({ node: p, option: t, selected: n })
        : a
        ? a({ node: p, option: t, selected: n })
        : p
    },
  }),
  Kv = dn({
    name: 'NBaseSelectGroupHeader',
    props: {
      clsPrefix: { type: String, required: !0 },
      tmNode: { type: Object, required: !0 },
    },
    setup() {
      const { renderLabelRef: e, renderOptionRef: t } =
        Gt(Tf)
      return { renderLabel: e, renderOption: t }
    },
    render() {
      const {
          clsPrefix: e,
          renderLabel: t,
          renderOption: n,
          tmNode: { rawNode: o },
        } = this,
        r = dr(
          'div',
          { class: `${e}-base-select-group-header` },
          t ? t(o, !1) : Cf(o.label, o, !1)
        )
      return o.render
        ? o.render({ node: r, option: o })
        : n
        ? n({ node: r, option: o, selected: !1 })
        : r
    },
  })
const {
  cubicBezierEaseIn: Yv,
  cubicBezierEaseOut: Xv,
  transformDebounceScale: Zv,
} = ef
function Jv({
  transformOrigin: e = 'inherit',
  duration: t = '.2s',
  enterScale: n = '.9',
  originalTransform: o = '',
  originalTransition: r = '',
} = {}) {
  return [
    Ud('&.fade-in-scale-up-transition-leave-active', {
      transformOrigin: e,
      transition: `opacity ${t} ${Yv}, transform ${t} ${Yv} ${
        r && ',' + r
      }`,
    }),
    Ud('&.fade-in-scale-up-transition-enter-active', {
      transformOrigin: e,
      transition: `opacity ${t} ${Xv}, transform ${t} ${Xv} ${
        r && ',' + r
      }`,
    }),
    Ud(
      '&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to',
      { opacity: 0, transform: `${o} scale(${n})` }
    ),
    Ud(
      '&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to',
      { opacity: 1, transform: `${o} scale(${Zv})` }
    ),
  ]
}
var Qv = Kd(
    'base-select-menu',
    '\n line-height: 1.5;\n outline: none;\n z-index: 0;\n position: relative;\n border-radius: var(--border-radius);\n transition:\n background-color .3s var(--bezier),\n box-shadow .3s var(--bezier);\n background-color: var(--color);\n',
    [
      Xd('multiple', [
        Kd(
          'base-select-option',
          '\n padding-right: 28px;\n '
        ),
      ]),
      Kd('scrollbar', '\n max-height: var(--height);\n '),
      Kd(
        'virtual-list',
        '\n max-height: var(--height);\n '
      ),
      Kd(
        'base-select-option',
        '\n min-height: var(--option-height);\n font-size: var(--option-font-size);\n display: flex;\n align-items: center;\n ',
        [
          Yd(
            'content',
            '\n white-space: nowrap;\n text-overflow: ellipsis;\n overflow: hidden;\n '
          ),
        ]
      ),
      Kd(
        'base-select-group-header',
        '\n min-height: var(--option-height);\n font-size: .93em;\n display: flex;\n align-items: center;\n '
      ),
      Kd(
        'base-select-menu-option-wrapper',
        '\n position: relative;\n width: 100%;\n '
      ),
      Yd(
        'loading, empty',
        '\n display: flex;\n padding: 12px 32px;\n flex: 1;\n justify-content: center;\n '
      ),
      Yd(
        'loading',
        '\n color: var(--loading-color);\n font-size: var(--loading-size);\n '
      ),
      Yd(
        'action',
        '\n padding: 8px var(--option-padding-left);\n font-size: var(--option-font-size);\n transition: \n color .3s var(--bezier);\n border-color .3s var(--bezier);\n border-top: 1px solid var(--action-divider-color);\n color: var(--action-text-color);\n '
      ),
      Kd(
        'base-select-group-header',
        '\n position: relative;\n cursor: default;\n padding: var(--option-padding);\n color: var(--group-header-text-color);\n '
      ),
      Kd(
        'base-select-option',
        '\n cursor: pointer;\n position: relative;\n padding: var(--option-padding);\n transition:\n background-color .3s var(--bezier),\n color .3s var(--bezier),\n opacity .3s var(--bezier);\n box-sizing: border-box;\n color: var(--option-text-color);\n opacity: 1;\n ',
        [
          Ud(
            '&:active',
            '\n color: var(--option-text-color-pressed);\n '
          ),
          Xd(
            'grouped',
            '\n padding-left: calc(var(--option-padding-left) * 1.5);\n '
          ),
          Xd(
            'pending',
            '\n background-color: var(--option-color-pending);\n '
          ),
          Xd(
            'selected',
            '\n color: var(--option-text-color-active);\n background-color: var(--option-color-active);\n '
          ),
          Xd('disabled', '\n cursor: not-allowed;\n ', [
            Zd(
              'selected',
              '\n color: var(--option-text-color-disabled);\n '
            ),
            Xd(
              'selected',
              '\n opacity: var(--option-opacity-disabled);\n '
            ),
          ]),
          Yd(
            'check',
            '\n font-size: 16px;\n position: absolute;\n right: 8px;\n top: calc(50% - 7px);\n color: var(--option-check-color);\n transition: color .3s var(--bezier);\n ',
            [Jv({ enterScale: '0.5' })]
          ),
        ]
      ),
    ]
  ),
  eg = {
    height: 'calc(var(--option-height) * 7.6)',
    paddingSmall: '4px 0',
    paddingMedium: '4px 0',
    paddingLarge: '4px 0',
    paddingHuge: '4px 0',
    optionPaddingSmall: '0 12px',
    optionPaddingMedium: '0 12px',
    optionPaddingLarge: '0 12px',
    optionPaddingHuge: '0 12px',
    loadingSize: '18px',
  }
const tg = {
  name: 'InternalSelectMenu',
  common: Bv,
  peers: { Scrollbar: Nv, Empty: Iv },
  self: (e) => {
    const {
      borderRadius: t,
      popoverColor: n,
      textColor3: o,
      dividerColor: r,
      textColor2: i,
      primaryColorPressed: a,
      textColorDisabled: l,
      primaryColor: s,
      opacityDisabled: c,
      hoverColor: u,
      fontSizeSmall: d,
      fontSizeMedium: f,
      fontSizeLarge: p,
      fontSizeHuge: h,
      heightSmall: v,
      heightMedium: g,
      heightLarge: b,
      heightHuge: m,
    } = e
    return Object.assign(Object.assign({}, eg), {
      optionFontSizeSmall: d,
      optionFontSizeMedium: f,
      optionFontSizeLarge: p,
      optionFontSizeHuge: h,
      optionHeightSmall: v,
      optionHeightMedium: g,
      optionHeightLarge: b,
      optionHeightHuge: m,
      borderRadius: t,
      color: n,
      groupHeaderTextColor: o,
      actionDividerColor: r,
      optionTextColor: i,
      optionTextColorPressed: a,
      optionTextColorDisabled: l,
      optionTextColorActive: s,
      optionOpacityDisabled: c,
      optionCheckColor: s,
      optionColorPending: u,
      optionColorActive: u,
      actionTextColor: i,
      loadingColor: s,
    })
  },
}
var ng = dn({
    name: 'InternalSelectMenu',
    props: Object.assign(Object.assign({}, Bf.props), {
      clsPrefix: { type: String, required: !0 },
      scrollable: { type: Boolean, default: !0 },
      treeMate: { type: Object, required: !0 },
      multiple: Boolean,
      size: { type: String, default: 'medium' },
      value: {
        type: [String, Number, Array],
        default: null,
      },
      width: [Number, String],
      autoPending: Boolean,
      virtualScroll: { type: Boolean, default: !0 },
      show: { type: Boolean, default: !0 },
      loading: Boolean,
      focusable: Boolean,
      renderLabel: Function,
      renderOption: Function,
      onMousedown: Function,
      onScroll: Function,
      onFocus: Function,
      onBlur: Function,
      onKeyup: Function,
      onKeydown: Function,
      onTabOut: Function,
      onMouseenter: Function,
      onMouseleave: Function,
      onToggle: Function,
    }),
    setup(e) {
      const t = Bf(
          'InternalSelectMenu',
          'InternalSelectMenu',
          Qv,
          tg,
          e,
          ct(e, 'clsPrefix')
        ),
        n = nt(null),
        o = nt(null),
        r = nt(null),
        i = ur(() => e.treeMate.getFlattenedNodes()),
        a = ur(() =>
          (function (e) {
            const t = new Map()
            return (
              e.forEach((e, n) => {
                t.set(e.key, n)
              }),
              (e) => {
                var n
                return null !== (n = t.get(e)) &&
                  void 0 !== n
                  ? n
                  : null
              }
            )
          })(i.value)
        ),
        l = nt(null)
      function s() {
        const { treeMate: t } = e
        v(
          e.autoPending
            ? null === e.value
              ? t.getFirstAvailableNode()
              : e.multiple
              ? t.getNode(
                  (e.value || [])[
                    (e.value || []).length - 1
                  ]
                ) || t.getFirstAvailableNode()
              : t.getNode(e.value) ||
                t.getFirstAvailableNode()
            : null
        )
      }
      s(),
        wn(() => {
          Kt(() => {
            e.show && (s(), zt(g))
          })
        })
      const c = ur(() =>
          el(t.value.self[Wd('optionHeight', e.size)])
        ),
        u = ur(() =>
          nl(t.value.self[Wd('padding', e.size)])
        ),
        d = ur(() =>
          e.multiple && Array.isArray(e.value)
            ? new Set(e.value)
            : new Set()
        ),
        f = ur(() => {
          const e = i.value
          return e && 0 === e.length
        }),
        p = ur(() => [{ width: Pf(e.width) }, b.value])
      function h(t) {
        const { onScroll: n } = e
        n && n(t)
      }
      function v(e, t = !1) {
        ;(l.value = e), t && g()
      }
      function g() {
        var t, n
        const i = l.value
        if (!i) return
        const s = a.value(i.key)
        null !== s &&
          (e.virtualScroll
            ? null === (t = o.value) ||
              void 0 === t ||
              t.scrollTo({ index: s })
            : null === (n = r.value) ||
              void 0 === n ||
              n.scrollTo({ index: s, elSize: c.value }))
      }
      Xt(ct(e, 'treeMate'), () => {
        if (e.autoPending) {
          v(e.treeMate.getFirstAvailableNode())
        } else v(null)
      }),
        Ut(Tf, {
          handleOptionMouseEnter: function (e, t) {
            t.disabled || v(t, !1)
          },
          handleOptionClick: function (t, n) {
            n.disabled ||
              (function (t) {
                const { onToggle: n } = e
                n && n(t)
              })(n)
          },
          valueSetRef: d,
          multipleRef: ct(e, 'multiple'),
          valueRef: ct(e, 'value'),
          renderLabelRef: ct(e, 'renderLabel'),
          renderOptionRef: ct(e, 'renderOption'),
          pendingTmNodeRef: l,
        }),
        Ut(Af, n),
        wn(() => {
          const { value: e } = r
          e && e.sync()
        })
      const b = ur(() => {
          const { size: n } = e,
            {
              common: { cubicBezierEaseInOut: o },
              self: {
                height: r,
                borderRadius: i,
                color: a,
                groupHeaderTextColor: l,
                actionDividerColor: s,
                optionTextColorPressed: c,
                optionTextColor: u,
                optionTextColorDisabled: d,
                optionTextColorActive: f,
                optionOpacityDisabled: p,
                optionCheckColor: h,
                actionTextColor: v,
                optionColorPending: g,
                optionColorActive: b,
                loadingColor: m,
                loadingSize: y,
                [Wd('optionFontSize', n)]: x,
                [Wd('optionHeight', n)]: w,
                [Wd('optionPadding', n)]: C,
              },
            } = t.value
          return {
            '--height': r,
            '--action-divider-color': s,
            '--action-text-color': v,
            '--bezier': o,
            '--border-radius': i,
            '--color': a,
            '--option-font-size': x,
            '--group-header-text-color': l,
            '--option-check-color': h,
            '--option-color-pending': g,
            '--option-color-active': b,
            '--option-height': w,
            '--option-opacity-disabled': p,
            '--option-text-color': u,
            '--option-text-color-active': f,
            '--option-text-color-disabled': d,
            '--option-text-color-pressed': c,
            '--option-padding': C,
            '--option-padding-left': nl(C, 'left'),
            '--loading-color': m,
            '--loading-size': y,
          }
        }),
        m = {
          selfRef: n,
          next: function () {
            const { value: e } = l
            e && v(e.getNext({ loop: !0 }), !0)
          },
          prev: function () {
            const { value: e } = l
            e && v(e.getPrev({ loop: !0 }), !0)
          },
          getPendingTmNode: function () {
            const { value: e } = l
            return e || null
          },
        }
      return Object.assign(
        {
          mergedTheme: t,
          virtualListRef: o,
          scrollbarRef: r,
          style: p,
          itemSize: c,
          padding: u,
          flattenedNodes: i,
          empty: f,
          virtualListContainer() {
            const { value: e } = o
            return null == e ? void 0 : e.listElRef
          },
          virtualListContent() {
            const { value: e } = o
            return null == e ? void 0 : e.itemsElRef
          },
          doScroll: h,
          handleFocusin: function (t) {
            var o, r
            ;(null === (o = n.value) || void 0 === o
              ? void 0
              : o.contains(t.target)) &&
              (null === (r = e.onFocus) ||
                void 0 === r ||
                r.call(e, t))
          },
          handleFocusout: function (t) {
            var o, r
            ;(null === (o = n.value) || void 0 === o
              ? void 0
              : o.contains(t.relatedTarget)) ||
              null === (r = e.onBlur) ||
              void 0 === r ||
              r.call(e, t)
          },
          handleKeyUp: function (t) {
            var n
            Qa(t, 'action') ||
              null === (n = e.onKeyup) ||
              void 0 === n ||
              n.call(e, t)
          },
          handleKeyDown: function (t) {
            var n
            Qa(t, 'action') ||
              null === (n = e.onKeydown) ||
              void 0 === n ||
              n.call(e, t)
          },
          handleMouseDown: function (t) {
            var n
            null === (n = e.onMousedown) ||
              void 0 === n ||
              n.call(e, t),
              e.focusable || t.preventDefault()
          },
          handleVirtualListResize: function () {
            var e
            null === (e = r.value) ||
              void 0 === e ||
              e.sync()
          },
          handleVirtualListScroll: function (e) {
            var t
            null === (t = r.value) ||
              void 0 === t ||
              t.sync(),
              h(e)
          },
        },
        m
      )
    },
    render() {
      const {
        $slots: e,
        virtualScroll: t,
        clsPrefix: n,
        mergedTheme: o,
      } = this
      return dr(
        'div',
        {
          ref: 'selfRef',
          tabindex: this.focusable ? 0 : -1,
          class: [
            `${n}-base-select-menu`,
            this.multiple &&
              `${n}-base-select-menu--multiple`,
          ],
          style: this.style,
          onFocusin: this.handleFocusin,
          onFocusout: this.handleFocusout,
          onKeyup: this.handleKeyUp,
          onKeydown: this.handleKeyDown,
          onMousedown: this.handleMouseDown,
          onMouseenter: this.onMouseenter,
          onMouseleave: this.onMouseleave,
        },
        this.loading
          ? dr(
              'div',
              { class: `${n}-base-select-menu__loading` },
              dr(wp, { clsPrefix: n, strokeWidth: 20 })
            )
          : this.empty
          ? dr(
              'div',
              { class: `${n}-base-select-menu__empty` },
              Uo(e, 'empty', void 0, () => [
                dr(Hv, {
                  theme: o.peers.Empty,
                  themeOverrides: o.peerOverrides.Empty,
                }),
              ])
            )
          : dr(
              qv,
              {
                ref: 'scrollbarRef',
                theme: o.peers.Scrollbar,
                themeOverrides: o.peerOverrides.Scrollbar,
                scrollable: this.scrollable,
                container: t
                  ? this.virtualListContainer
                  : void 0,
                content: t
                  ? this.virtualListContent
                  : void 0,
                onScroll: t ? void 0 : this.doScroll,
              },
              {
                default: () =>
                  t
                    ? dr(
                        Vh,
                        {
                          ref: 'virtualListRef',
                          class: `${n}-virtual-list`,
                          items: this.flattenedNodes,
                          itemSize: this.itemSize,
                          showScrollbar: !1,
                          paddingTop: this.padding.top,
                          paddingBottom:
                            this.padding.bottom,
                          onResize:
                            this.handleVirtualListResize,
                          onScroll:
                            this.handleVirtualListScroll,
                          itemResizable: !0,
                        },
                        {
                          default: ({ item: e }) =>
                            e.isGroup
                              ? dr(Kv, {
                                  key: e.key,
                                  clsPrefix: n,
                                  tmNode: e,
                                })
                              : e.ignored
                              ? null
                              : dr(Gv, {
                                  clsPrefix: n,
                                  key: e.key,
                                  tmNode: e,
                                }),
                        }
                      )
                    : dr(
                        'div',
                        {
                          class: `${n}-base-select-menu-option-wrapper`,
                          style: {
                            paddingTop: this.padding.top,
                            paddingBottom:
                              this.padding.bottom,
                          },
                        },
                        this.flattenedNodes.map((e) =>
                          e.isGroup
                            ? dr(Kv, {
                                key: e.key,
                                clsPrefix: n,
                                tmNode: e,
                              })
                            : dr(Gv, {
                                clsPrefix: n,
                                key: e.key,
                                tmNode: e,
                              })
                        )
                      ),
              }
            ),
        e.action &&
          dr(
            'div',
            {
              class: `${n}-base-select-menu__action`,
              'data-action': !0,
            },
            Uo(e, 'action')
          ),
        e.action && dr(mp, { onFocus: this.onTabOut })
      )
    },
  }),
  og = Kd(
    'base-wave',
    '\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n border-radius: inherit;\n'
  ),
  rg = dn({
    name: 'BaseWave',
    props: { clsPrefix: { type: String, required: !0 } },
    setup(e) {
      Jf('BaseWave', og, ct(e, 'clsPrefix'))
      const t = nt(null),
        n = nt(!1)
      let o = null
      return (
        kn(() => {
          null !== o && window.clearTimeout(o)
        }),
        {
          active: n,
          selfRef: t,
          play() {
            null !== o &&
              (window.clearTimeout(o),
              (n.value = !1),
              (o = null)),
              zt(() => {
                var e
                null === (e = t.value) ||
                  void 0 === e ||
                  e.offsetHeight,
                  (n.value = !0),
                  (o = window.setTimeout(() => {
                    ;(n.value = !1), (o = null)
                  }, 1e3))
              })
          },
        }
      )
    },
    render() {
      const { clsPrefix: e } = this
      return dr('div', {
        ref: 'selfRef',
        'aria-hidden': !0,
        class: [
          `${e}-base-wave`,
          this.active && `${e}-base-wave--active`,
        ],
      })
    },
  }),
  ig = {
    space: '6px',
    spaceArrow: '10px',
    arrowOffset: '10px',
    arrowOffsetVertical: '10px',
    arrowHeight: '6px',
    padding: '8px 14px',
  }
const ag = {
    name: 'Popover',
    common: Bv,
    self: (e) => {
      const {
        boxShadow2: t,
        popoverColor: n,
        textColor2: o,
        borderRadius: r,
        fontSize: i,
        dividerColor: a,
      } = e
      return Object.assign(Object.assign({}, ig), {
        fontSize: i,
        borderRadius: r,
        color: n,
        dividerColor: a,
        textColor: o,
        boxShadow: t,
      })
    },
  },
  lg = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  }
var sg = Ud([
  Kd(
    'popover',
    '\n transition:\n box-shadow .3s var(--bezier),\n background-color .3s var(--bezier),\n color .3s var(--bezier);\n transform-origin: inherit;\n position: relative;\n font-size: var(--font-size);\n color: var(--text-color);\n box-shadow: var(--box-shadow);\n ',
    [
      Ud(
        '&.popover-transition-enter-from, &.popover-transition-leave-to',
        '\n opacity: 0;\n transform: scale(.85);\n '
      ),
      Ud(
        '&.popover-transition-enter-to, &.popover-transition-leave-from',
        '\n transform: scale(1);\n opacity: 1;\n '
      ),
      Ud(
        '&.popover-transition-enter-active',
        '\n transition:\n opacity .15s var(--bezier-ease-out),\n transform .15s var(--bezier-ease-out);\n '
      ),
      Ud(
        '&.popover-transition-leave-active',
        '\n transition:\n opacity .15s var(--bezier-ease-in),\n transform .15s var(--bezier-ease-in);\n '
      ),
      Zd(
        'raw',
        '\n background-color: var(--color);\n border-radius: var(--border-radius);\n var(--padding);\n ',
        [Zd('show-header', 'padding: var(--padding);')]
      ),
      Yd(
        'header',
        '\n padding: var(--padding);\n border-bottom: 1px solid var(--divider-color);\n transition: border-color .3s var(--bezier);\n '
      ),
      Yd('content', '\n padding: var(--padding);\n '),
      Kd(
        'popover-arrow-wrapper',
        '\n position: absolute;\n overflow: hidden;\n pointer-events: none;\n ',
        [
          Kd(
            'popover-arrow',
            '\n transition: background-color .3s var(--bezier);\n position: absolute;\n display: block;\n width: calc(var(--arrow-height) * 1.414);\n height: calc(var(--arrow-height) * 1.414);\n box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);\n transform: rotate(45deg);\n background-color: var(--color);\n pointer-events: all;\n '
          ),
        ]
      ),
    ]
  ),
  cg(
    'top-start',
    '\n top: calc(-0.707 * var(--arrow-height));\n left: var(--arrow-offset);\n '
  ),
  cg(
    'top',
    '\n top: calc(-0.707 * var(--arrow-height));\n transform: translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg);\n left: 50%;\n '
  ),
  cg(
    'top-end',
    '\n top: calc(-0.707 * var(--arrow-height));\n right: var(--arrow-offset);\n '
  ),
  cg(
    'bottom-start',
    '\n bottom: calc(-0.707 * var(--arrow-height));\n left: var(--arrow-offset);\n '
  ),
  cg(
    'bottom',
    '\n bottom: calc(-0.707 * var(--arrow-height));\n transform: translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg);\n left: 50%;\n '
  ),
  cg(
    'bottom-end',
    '\n bottom: calc(-0.707 * var(--arrow-height));\n right: var(--arrow-offset);\n '
  ),
  cg(
    'left-start',
    '\n left: calc(-0.707 * var(--arrow-height));\n top: var(--arrow-offset-vertical);\n '
  ),
  cg(
    'left',
    '\n left: calc(-0.707 * var(--arrow-height));\n transform: translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg);\n top: 50%;\n '
  ),
  cg(
    'left-end',
    '\n left: calc(-0.707 * var(--arrow-height));\n bottom: var(--arrow-offset-vertical);\n '
  ),
  cg(
    'right-start',
    '\n right: calc(-0.707 * var(--arrow-height));\n top: var(--arrow-offset-vertical);\n '
  ),
  cg(
    'right',
    '\n right: calc(-0.707 * var(--arrow-height));\n transform: translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg);\n top: 50%;\n '
  ),
  cg(
    'right-end',
    '\n right: calc(-0.707 * var(--arrow-height));\n bottom: var(--arrow-offset-vertical);\n '
  ),
])
function cg(e, t) {
  const n = e.split('-')[0],
    o = ['top', 'bottom'].includes(n)
      ? 'height: var(--space-arrow);'
      : 'width: var(--space-arrow);'
  return Ud(`[v-placement="${e}"] >`, [
    Kd('popover', `\n margin-${lg[n]}: var(--space);\n `, [
      Xd(
        'show-arrow',
        `\n margin-${lg[n]}: var(--space-arrow);\n `
      ),
      Xd('overlap', '\n margin: 0;\n '),
      Qd(
        'popover-arrow-wrapper',
        `\n right: 0;\n left: 0;\n top: 0;\n bottom: 0;\n ${n}: 100%;\n ${lg[n]}: auto;\n ${o}\n `,
        [Kd('popover-arrow', t)]
      ),
    ]),
  ])
}
const ug = Object.assign(Object.assign({}, Bf.props), {
    to: Mf.propTo,
    show: Boolean,
    trigger: String,
    showArrow: Boolean,
    delay: Number,
    duration: Number,
    raw: Boolean,
    arrowStyle: [String, Object],
    displayDirective: String,
    x: Number,
    y: Number,
    filp: Boolean,
    overlap: Boolean,
    placement: String,
    width: [Number, String],
    animated: Boolean,
    onClickoutside: Function,
    minWidth: Number,
    maxWidth: Number,
  }),
  dg = ({ arrowStyle: e, clsPrefix: t }) =>
    dr(
      'div',
      {
        key: '__popover-arrow__',
        class: `${t}-popover-arrow-wrapper`,
      },
      dr('div', { class: `${t}-popover-arrow`, style: e })
    )
var fg = dn({
  name: 'PopoverBody',
  inheritAttrs: !1,
  props: ug,
  setup(e, { slots: t, attrs: n }) {
    const { namespaceRef: o, mergedClsPrefixRef: r } =
        If(e),
      i = Bf('Popover', 'Popover', sg, ag, e, r),
      a = nt(null),
      l = Gt('NPopover'),
      s = nt(null),
      c = nt(e.show),
      u = ur(() => {
        const { trigger: t, onClickoutside: n } = e,
          o = [],
          {
            positionManuallyRef: { value: r },
          } = l
        return (
          r ||
            ('click' !== t || n || o.push([nh, g]),
            'hover' === t && o.push([eh, v])),
          n && o.push([nh, g]),
          'show' === e.displayDirective &&
            o.push([Zr, e.show]),
          o
        )
      }),
      d = ur(() => [
        {
          width: 'trigger' === e.width ? '' : Pf(e.width),
          maxWidth: Pf(e.maxWidth),
          minWidth: Pf(e.minWidth),
        },
        f.value,
      ]),
      f = ur(() => {
        const {
          common: {
            cubicBezierEaseInOut: e,
            cubicBezierEaseIn: t,
            cubicBezierEaseOut: n,
          },
          self: {
            space: o,
            spaceArrow: r,
            padding: a,
            fontSize: l,
            textColor: s,
            dividerColor: c,
            color: u,
            boxShadow: d,
            borderRadius: f,
            arrowHeight: p,
            arrowOffset: h,
            arrowOffsetVertical: v,
          },
        } = i.value
        return {
          '--box-shadow': d,
          '--bezier': e,
          '--bezier-ease-in': t,
          '--bezier-ease-out': n,
          '--font-size': l,
          '--text-color': s,
          '--color': u,
          '--divider-color': c,
          '--border-radius': f,
          '--arrow-height': p,
          '--arrow-offset': h,
          '--arrow-offset-vertical': v,
          '--padding': a,
          '--space': o,
          '--space-arrow': r,
        }
      })
    function p(t) {
      'hover' === e.trigger && l.handleMouseEnter(t)
    }
    function h(t) {
      'hover' === e.trigger && l.handleMouseLeave(t)
    }
    function v(t) {
      'hover' !== e.trigger ||
        b().contains(t.target) ||
        l.handleMouseMoveOutside(t)
    }
    function g(t) {
      ;(('click' === e.trigger &&
        !b().contains(t.target)) ||
        e.onClickoutside) &&
        l.handleClickOutside(t)
    }
    function b() {
      return l.getTriggerElement()
    }
    return (
      l.setBodyInstance({
        syncPosition: function () {
          var e
          null === (e = a.value) ||
            void 0 === e ||
            e.syncPosition()
        },
      }),
      kn(() => {
        l.setBodyInstance(null)
      }),
      Xt(ct(e, 'show'), (t) => {
        e.animated || (c.value = !!t)
      }),
      Ut(jf, s),
      Ut(Of, null),
      Ut(Ef, null),
      {
        namespace: o,
        isMounted: l.isMountedRef,
        zIndex: l.zIndexRef,
        followerRef: a,
        adjustedTo: Mf(e),
        followerEnabled: c,
        renderContentNode: function () {
          let o
          const {
              internalRenderBodyRef: { value: i },
            } = l,
            { value: a } = r
          if (i)
            o = i(
              [
                `${a}-popover`,
                e.overlap && `${a}-popover--overlap`,
              ],
              s,
              d.value,
              p,
              h
            )
          else {
            const { value: r } = l.extraClassRef
            o = dr(
              'div',
              Vo(
                {
                  class: [
                    `${a}-popover`,
                    r.map((e) => `${a}-${e}`),
                    {
                      [`${a}-popover--overlap`]: e.overlap,
                      [`${a}-popover--show-arrow`]:
                        e.showArrow,
                      [`${a}-popover--show-header`]:
                        !!t.header,
                      [`${a}-popover--raw`]: e.raw,
                    },
                  ],
                  ref: s,
                  style: d.value,
                  onMouseenter: p,
                  onMouseleave: h,
                },
                n
              ),
              [
                t.header
                  ? dr(
                      Co,
                      null,
                      dr(
                        'div',
                        { class: `${a}-popover__header` },
                        t.header()
                      ),
                      dr(
                        'div',
                        { class: `${a}-popover__content` },
                        t
                      )
                    )
                  : Uo(t, 'default'),
                e.showArrow
                  ? dg({
                      arrowStyle: e.arrowStyle,
                      clsPrefix: a,
                    })
                  : null,
              ]
            )
          }
          return 'show' === e.displayDirective || e.show
            ? eo(o, u.value)
            : null
        },
      }
    )
  },
  render() {
    return dr(
      mh,
      {
        zIndex: this.zIndex,
        show: this.show,
        enabled: this.followerEnabled,
        to: this.adjustedTo,
        x: this.x,
        y: this.y,
        placement: this.placement,
        containerClass: this.namespace,
        ref: 'followerRef',
        overlap: this.overlap,
        width: 'trigger' === this.width ? 'target' : void 0,
        teleportDisabled: this.adjustedTo === Mf.tdkey,
      },
      {
        default: () =>
          this.animated
            ? dr(
                Er,
                {
                  name: 'popover-transition',
                  appear: this.isMounted,
                  onEnter: () => {
                    this.followerEnabled = !0
                  },
                  onAfterLeave: () => {
                    this.followerEnabled = !1
                  },
                },
                { default: this.renderContentNode }
              )
            : this.renderContentNode(),
      }
    )
  },
})
const pg = Object.keys(ug),
  hg = {
    focus: ['onFocus', 'onBlur'],
    click: ['onClick'],
    hover: ['onMouseenter', 'onMouseleave'],
    manual: [],
    nested: [
      'onFocus',
      'onBlur',
      'onMouseenter',
      'onMouseleave',
      'onClick',
    ],
  }
const vg = Io('').type,
  gg = {
    show: { type: Boolean, default: void 0 },
    defaultShow: Boolean,
    showArrow: { type: Boolean, default: !0 },
    trigger: { type: String, default: 'hover' },
    delay: { type: Number, default: 100 },
    duration: { type: Number, default: 100 },
    raw: Boolean,
    placement: { type: String, default: 'top' },
    x: Number,
    y: Number,
    disabled: Boolean,
    getDisabled: Function,
    displayDirective: { type: String, default: 'if' },
    arrowStyle: [String, Object],
    filp: { type: Boolean, default: !0 },
    animated: { type: Boolean, default: !0 },
    width: { type: [Number, String], default: void 0 },
    overlap: Boolean,
    internalExtraClass: { type: Array, default: () => [] },
    onClickoutside: Function,
    'onUpdate:show': [Function, Array],
    onUpdateShow: [Function, Array],
    zIndex: Number,
    to: Mf.propTo,
    internalSyncTargetWithParent: Boolean,
    internalInheritedEventHandlers: {
      type: Array,
      default: () => [],
    },
    onShow: [Function, Array],
    onHide: [Function, Array],
    arrow: { type: Boolean, default: void 0 },
    minWidth: Number,
    maxWidth: Number,
  }
var bg = dn({
    name: 'Popover',
    inheritAttrs: !1,
    props: Object.assign(
      Object.assign(Object.assign({}, Bf.props), gg),
      { internalRenderBody: Function }
    ),
    __popover__: !0,
    setup(e) {
      const t = vf(),
        n = nt(null),
        o = ur(() => e.show),
        r = nt(e.defaultShow),
        i = hf(o, r),
        a = of(() => !e.disabled && i.value),
        l = () => {
          if (e.disabled) return !0
          const { getDisabled: t } = e
          return !!(null == t ? void 0 : t())
        },
        s = () => !l() && i.value,
        c = gf(e, ['arrow', 'showArrow']),
        u = ur(() => !e.overlap && c.value)
      let d = null
      const f = nt(null),
        p = nt(null),
        h = of(() => void 0 !== e.x && void 0 !== e.y)
      function v(t) {
        const {
          'onUpdate:show': n,
          onUpdateShow: o,
          onShow: i,
          onHide: a,
        } = e
        ;(r.value = t),
          n && xf(n, t),
          o && xf(o, t),
          t && i && xf(i, !0),
          t && a && xf(a, !1)
      }
      function g() {
        const { value: e } = f
        e && (window.clearTimeout(e), (f.value = null))
      }
      function b() {
        const { value: e } = p
        e && (window.clearTimeout(e), (p.value = null))
      }
      function m() {
        const t = l()
        if ('hover' === e.trigger && !t) {
          if ((b(), null !== f.value)) return
          if (s()) return
          const t = () => {
              v(!0), (f.value = null)
            },
            { delay: n } = e
          0 === n
            ? t()
            : (f.value = window.setTimeout(t, n))
        }
      }
      function y() {
        const t = l()
        if ('hover' === e.trigger && !t) {
          if ((g(), null !== p.value)) return
          if (!s()) return
          const t = () => {
              v(!1), (p.value = null)
            },
            { duration: n } = e
          0 === n
            ? t()
            : (p.value = window.setTimeout(t, n))
        }
      }
      return (
        Ut('NPopover', {
          getTriggerElement: function () {
            var e
            return null === (e = n.value) || void 0 === e
              ? void 0
              : e.targetRef
          },
          handleMouseEnter: m,
          handleMouseLeave: y,
          handleClickOutside: function (t) {
            var n
            s() &&
              ('click' === e.trigger && (g(), b(), v(!1)),
              null === (n = e.onClickoutside) ||
                void 0 === n ||
                n.call(e, t))
          },
          handleMouseMoveOutside: function () {
            y()
          },
          setBodyInstance: function (e) {
            d = e
          },
          positionManuallyRef: h,
          isMountedRef: t,
          zIndexRef: ct(e, 'zIndex'),
          extraClassRef: ct(e, 'internalExtraClass'),
          internalRenderBodyRef: ct(
            e,
            'internalRenderBody'
          ),
        }),
        {
          binderInstRef: n,
          positionManually: h,
          mergedShowConsideringDisabledProp: a,
          uncontrolledShow: r,
          mergedShowArrow: u,
          getMergedShow: s,
          setShow: function (e) {
            r.value = e
          },
          handleClick: function () {
            if ('click' === e.trigger && !l()) {
              g(), b()
              v(!s())
            }
          },
          handleMouseEnter: m,
          handleMouseLeave: y,
          handleFocus: function () {
            const t = l()
            if ('focus' === e.trigger && !t) {
              if (s()) return
              v(!0)
            }
          },
          handleBlur: function () {
            const t = l()
            if ('focus' === e.trigger && !t) {
              if (!s()) return
              v(!1)
            }
          },
          syncPosition: function () {
            d && d.syncPosition()
          },
        }
      )
    },
    render() {
      var e
      const { positionManually: t, $slots: n } = this
      let o,
        r = !1
      if (
        !t &&
        ((o = n.activator
          ? $f(n, 'activator')
          : $f(n, 'trigger')),
        o)
      ) {
        ;(o = Lo(o)),
          (o = o.type === vg ? dr('span', [o]) : o)
        const n = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        }
        if (
          null === (e = o.type) || void 0 === e
            ? void 0
            : e.__popover__
        )
          (r = !0),
            o.props ||
              (o.props = {
                internalSyncTargetWithParent: !0,
                internalInheritedEventHandlers: [],
              }),
            (o.props.internalSyncTargetWithParent = !0),
            o.props.internalInheritedEventHandlers
              ? (o.props.internalInheritedEventHandlers = [
                  n,
                  ...o.props.internalInheritedEventHandlers,
                ])
              : (o.props.internalInheritedEventHandlers = [
                  n,
                ])
        else {
          const { internalInheritedEventHandlers: e } =
              this,
            r = [n, ...e],
            s = {
              onBlur: (e) => {
                r.forEach((t) => {
                  t.onBlur(e)
                })
              },
              onFocus: (e) => {
                r.forEach((t) => {
                  t.onBlur(e)
                })
              },
              onClick: (e) => {
                r.forEach((t) => {
                  t.onClick(e)
                })
              },
              onMouseenter: (e) => {
                r.forEach((t) => {
                  t.onMouseenter(e)
                })
              },
              onMouseleave: (e) => {
                r.forEach((t) => {
                  t.onMouseleave(e)
                })
              },
            }
          ;(i = o),
            (a = e
              ? 'nested'
              : t
              ? 'manual'
              : this.trigger),
            (l = s),
            hg[a].forEach((e) => {
              i.props
                ? (i.props = Object.assign({}, i.props))
                : (i.props = {})
              const t = i.props[e],
                n = l[e]
              i.props[e] = t
                ? (...e) => {
                    t(...e), n(...e)
                  }
                : n
            })
        }
      }
      var i, a, l
      return dr(
        Zp,
        {
          ref: 'binderInstRef',
          syncTarget: !r,
          syncTargetWithParent:
            this.internalSyncTargetWithParent,
        },
        {
          default: () => {
            this.mergedShowConsideringDisabledProp
            const e = this.getMergedShow()
            return [
              t ? null : dr(Jp, null, { default: () => o }),
              dr(
                fg,
                mf(
                  this.$props,
                  pg,
                  Object.assign(
                    Object.assign({}, this.$attrs),
                    {
                      showArrow: this.mergedShowArrow,
                      show: e,
                    }
                  )
                ),
                n
              ),
            ]
          },
        }
      )
    },
  }),
  mg = {
    closeSizeSmall: '14px',
    closeSizeMedium: '14px',
    closeSizeLarge: '14px',
    padding: '0 7px',
    closeMargin: '0 0 0 3px',
    closeMarginRtl: '0 3px 0 0',
  }
const yg = {
  name: 'Tag',
  common: Bv,
  self: (e) => {
    const {
      textColor2: t,
      primaryColorHover: n,
      primaryColorPressed: o,
      primaryColor: r,
      infoColor: i,
      successColor: a,
      warningColor: l,
      errorColor: s,
      baseColor: c,
      borderColor: u,
      opacityDisabled: d,
      tagColor: f,
      closeColor: p,
      closeColorHover: h,
      closeColorPressed: v,
      borderRadiusSmall: g,
      fontSizeTiny: b,
      fontSizeSmall: m,
      fontSizeMedium: y,
      heightTiny: x,
      heightSmall: w,
      heightMedium: C,
    } = e
    return Object.assign(Object.assign({}, mg), {
      heightSmall: x,
      heightMedium: w,
      heightLarge: C,
      borderRadius: g,
      opacityDisabled: d,
      fontSizeSmall: b,
      fontSizeMedium: m,
      fontSizeLarge: y,
      textColorCheckable: t,
      textColorHoverCheckable: n,
      textColorPressedCheckable: o,
      textColorChecked: c,
      colorCheckable: '#0000',
      colorHoverCheckable: '#0000',
      colorPressedCheckable: '#0000',
      colorChecked: r,
      colorCheckedHover: n,
      colorCheckedPressed: o,
      border: `1px solid ${u}`,
      textColor: t,
      color: f,
      closeColor: p,
      closeColorHover: h,
      closeColorPressed: v,
      borderPrimary: `1px solid ${ml(r, { alpha: 0.3 })}`,
      textColorPrimary: r,
      colorPrimary: ml(r, { alpha: 0.1 }),
      closeColorPrimary: ml(r, { alpha: 0.75 }),
      closeColorHoverPrimary: ml(r, { alpha: 0.6 }),
      closeColorPressedPrimary: ml(r, { alpha: 0.9 }),
      borderInfo: `1px solid ${ml(i, { alpha: 0.3 })}`,
      textColorInfo: i,
      colorInfo: ml(i, { alpha: 0.1 }),
      closeColorInfo: ml(i, { alpha: 0.75 }),
      closeColorHoverInfo: ml(i, { alpha: 0.6 }),
      closeColorPressedInfo: ml(i, { alpha: 0.9 }),
      borderSuccess: `1px solid ${ml(a, { alpha: 0.3 })}`,
      textColorSuccess: a,
      colorSuccess: ml(a, { alpha: 0.1 }),
      closeColorSuccess: ml(a, { alpha: 0.75 }),
      closeColorHoverSuccess: ml(a, { alpha: 0.6 }),
      closeColorPressedSuccess: ml(a, { alpha: 0.9 }),
      borderWarning: `1px solid ${ml(l, { alpha: 0.35 })}`,
      textColorWarning: l,
      colorWarning: ml(l, { alpha: 0.12 }),
      closeColorWarning: ml(l, { alpha: 0.75 }),
      closeColorHoverWarning: ml(l, { alpha: 0.6 }),
      closeColorPressedWarning: ml(l, { alpha: 0.9 }),
      borderError: `1px solid ${ml(s, { alpha: 0.23 })}`,
      textColorError: s,
      colorError: ml(s, { alpha: 0.08 }),
      closeColorError: ml(s, { alpha: 0.65 }),
      closeColorHoverError: ml(s, { alpha: 0.5 }),
      closeColorPressedError: ml(s, { alpha: 0.8 }),
    })
  },
}
var xg = {
    color: Object,
    type: { type: String, default: 'default' },
    round: Boolean,
    size: { type: String, default: 'medium' },
    closable: Boolean,
    disabled: { type: Boolean, default: void 0 },
  },
  wg = Kd(
    'tag',
    '\n white-space: nowrap;\n position: relative;\n box-sizing: border-box;\n cursor: default;\n display: inline-flex;\n align-items: center;\n flex-wrap: nowrap;\n padding: var(--padding);\n border-radius: var(--border-radius);\n color: var(--text-color);\n background-color: var(--color);\n transition: \n border-color .3s var(--bezier),\n background-color .3s var(--bezier),\n color .3s var(--bezier),\n box-shadow .3s var(--bezier),\n opacity .3s var(--bezier);\n line-height: 1.5;\n height: var(--height);\n font-size: var(--font-size);\n',
    [
      Yd(
        'border',
        '\n pointer-events: none;\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n border-radius: inherit;\n border: var(--border);\n transition: border-color .3s var(--bezier);\n '
      ),
      Yd(
        'close',
        '\n font-size: var(--close-size);\n margin: var(--close-margin);\n transition: color .3s var(--bezier);\n cursor: pointer;\n '
      ),
      Xd(
        'round',
        '\n padding: 0 calc(var(--height) / 2);\n border-radius: calc(var(--height) / 2);\n '
      ),
      Xd('disabled', {
        cursor: 'not-allowed !important',
        opacity: 'var(--opacity-disabled)',
      }),
      Xd(
        'checkable',
        '\n cursor: pointer;\n box-shadow: none;\n color: var(--text-color-checkable);\n background-color: var(--color-checkable);\n ',
        [
          Zd('disabled', [
            Ud(
              '&:hover',
              {
                backgroundColor:
                  'var(--color-hover-checkable)',
              },
              [
                Zd('checked', {
                  color:
                    'var(--text-color-hover-checkable)',
                }),
              ]
            ),
            Ud(
              '&:active',
              {
                backgroundColor:
                  'var(--color-pressed-checkable)',
              },
              [
                Zd('checked', {
                  color:
                    'var(--text-color-pressed-checkable)',
                }),
              ]
            ),
          ]),
          Xd(
            'checked',
            {
              color: 'var(--text-color-checked)',
              backgroundColor: 'var(--color-checked)',
            },
            [
              Zd('disabled', [
                Ud('&:hover', {
                  backgroundColor:
                    'var(--color-checked-hover)',
                }),
                Ud('&:active', {
                  backgroundColor:
                    'var(--color-checked-pressed)',
                }),
              ]),
            ]
          ),
        ]
      ),
    ]
  )
function Cg(e, t, n) {
  if (!t) return
  const o = $d(),
    r = ur(() => {
      const { value: n } = t
      if (!n) return
      const o = n[e]
      return o || void 0
    }),
    i = () => {
      Kt(() => {
        const { value: t } = n,
          i = `${t}${e}Rtl`
        if (
          (function (e, t) {
            if (void 0 === e) return !1
            if (t) {
              const {
                context: { ids: n },
              } = t
              return n.has(e)
            }
            return null !== Rd(e)
          })(i, o)
        )
          return
        const { value: a } = r
        a &&
          a.style.mount({
            id: i,
            head: !0,
            props: { bPrefix: t ? `.${t}-` : void 0 },
            ssr: o,
          })
      })
    }
  return o ? i() : xn(i), r
}
var Sg = dn({
    name: 'Tag',
    props: Object.assign(
      Object.assign(Object.assign({}, Bf.props), xg),
      {
        bordered: { type: Boolean, default: void 0 },
        checked: Boolean,
        checkable: Boolean,
        onClose: [Array, Function],
        onMouseenter: Function,
        onMouseleave: Function,
        'onUpdate:checked': Function,
        onUpdateChecked: Function,
        internalStopClickPropagation: Boolean,
        onCheckedChange: {
          type: Function,
          validator: () => !0,
          default: void 0,
        },
      }
    ),
    setup(e) {
      const t = nt(null),
        {
          mergedBorderedRef: n,
          mergedClsPrefixRef: o,
          NConfigProvider: r,
        } = If(e),
        i = Bf('Tag', 'Tag', wg, yg, e, o)
      const a = {
          setTextContent(e) {
            const { value: n } = t
            n && (n.textContent = e)
          },
        },
        l = Cg(
          'Tag',
          null == r ? void 0 : r.mergedRtlRef,
          o
        )
      return Object.assign(Object.assign({}, a), {
        rtlEnabled: l,
        mergedClsPrefix: o,
        contentRef: t,
        mergedBordered: n,
        handleClick: function (t) {
          if (!e.disabled && e.checkable) {
            const {
              checked: t,
              onCheckedChange: n,
              onUpdateChecked: o,
              'onUpdate:checked': r,
            } = e
            o && o(!t), r && r(!t), n && n(!t)
          }
        },
        handleCloseClick: function (t) {
          if (
            (e.internalStopClickPropagation &&
              t.stopPropagation(),
            !e.disabled)
          ) {
            const { onClose: n } = e
            n && xf(n, t)
          }
        },
        cssVars: ur(() => {
          const {
              type: t,
              size: n,
              color: { color: o, textColor: r } = {},
            } = e,
            {
              common: { cubicBezierEaseInOut: a },
              self: {
                padding: l,
                closeMargin: s,
                closeMarginRtl: c,
                borderRadius: u,
                opacityDisabled: d,
                textColorCheckable: f,
                textColorHoverCheckable: p,
                textColorPressedCheckable: h,
                textColorChecked: v,
                colorCheckable: g,
                colorHoverCheckable: b,
                colorPressedCheckable: m,
                colorChecked: y,
                colorCheckedHover: x,
                colorCheckedPressed: w,
                [Wd('closeSize', n)]: C,
                [Wd('fontSize', n)]: S,
                [Wd('height', n)]: k,
                [Wd('color', t)]: $,
                [Wd('textColor', t)]: _,
                [Wd('border', t)]: z,
                [Wd('closeColor', t)]: P,
                [Wd('closeColorHover', t)]: E,
                [Wd('closeColorPressed', t)]: O,
              },
            } = i.value
          return {
            '--bezier': a,
            '--border-radius': u,
            '--border': z,
            '--close-color': P,
            '--close-color-hover': E,
            '--close-color-pressed': O,
            '--close-margin': s,
            '--close-margin-rtl': c,
            '--close-size': C,
            '--color': o || $,
            '--color-checkable': g,
            '--color-checked': y,
            '--color-checked-hover': x,
            '--color-checked-pressed': w,
            '--color-hover-checkable': b,
            '--color-pressed-checkable': m,
            '--font-size': S,
            '--height': k,
            '--opacity-disabled': d,
            '--padding': l,
            '--text-color': r || _,
            '--text-color-checkable': f,
            '--text-color-checked': v,
            '--text-color-hover-checkable': p,
            '--text-color-pressed-checkable': h,
          }
        }),
      })
    },
    render() {
      const {
        mergedClsPrefix: e,
        rtlEnabled: t,
        color: { borderColor: n } = {},
      } = this
      return dr(
        'div',
        {
          class: [
            `${e}-tag`,
            {
              [`${e}-tag--rtl`]: t,
              [`${e}-tag--disabled`]: this.disabled,
              [`${e}-tag--checkable`]: this.checkable,
              [`${e}-tag--checked`]:
                this.checkable && this.checked,
              [`${e}-tag--round`]: this.round,
            },
          ],
          style: this.cssVars,
          onClick: this.handleClick,
          onMouseenter: this.onMouseenter,
          onMouseleave: this.onMouseleave,
        },
        dr(
          'span',
          { class: `${e}-tag__content`, ref: 'contentRef' },
          this.$slots
        ),
        !this.checkable && this.closable
          ? dr(bp, {
              clsPrefix: e,
              class: `${e}-tag__close`,
              disabled: this.disabled,
              onClick: this.handleCloseClick,
            })
          : null,
        !this.checkable && this.mergedBordered
          ? dr('div', {
              class: `${e}-tag__border`,
              style: { borderColor: n },
            })
          : null
      )
    },
  }),
  kg = Kd(
    'base-clear',
    '\n flex-shrink: 0;\n height: 1em;\n width: 1em;\n position: relative;\n',
    [
      Ud('>', [
        Yd(
          'clear',
          '\n font-size: var(--clear-size);\n cursor: pointer;\n color: var(--clear-color);\n transition: color .3s var(--bezier);\n ',
          [
            Ud(
              '&:hover',
              '\n color: var(--clear-color-hover)!important;\n '
            ),
            Ud(
              '&:active',
              '\n color: var(--clear-color-pressed)!important;\n '
            ),
          ]
        ),
        Yd('placeholder', '\n display: flex;\n '),
        Yd(
          'clear, placeholder',
          '\n position: absolute;\n left: 50%;\n top: 50%;\n transform: translateX(-50%) translateY(-50%);\n ',
          [
            yp({
              originalTransform:
                'translateX(-50%) translateY(-50%)',
              left: '50%',
              top: '50%',
            }),
          ]
        ),
      ]),
    ]
  ),
  $g = dn({
    name: 'BaseClear',
    props: {
      clsPrefix: { type: String, required: !0 },
      show: Boolean,
      onClear: Function,
    },
    setup(e) {
      Jf('BaseClear', kg, ct(e, 'clsPrefix'))
      const { NConfigProvider: t } = If()
      return {
        NConfigProvider: t,
        handleMouseDown(e) {
          e.preventDefault()
        },
      }
    },
    render() {
      const { clsPrefix: e } = this
      return dr(
        'div',
        { class: `${e}-base-clear` },
        dr(fp, null, {
          default: () =>
            this.show
              ? dr(
                  vp,
                  {
                    clsPrefix: e,
                    key: 'dismiss',
                    class: `${e}-base-clear__clear`,
                    onClick: this.onClear,
                    onMousedown: this.handleMouseDown,
                    'data-clear': !0,
                  },
                  { default: () => dr(dp, null) }
                )
              : dr(
                  'div',
                  {
                    key: 'icon',
                    class: `${e}-base-clear__placeholder`,
                  },
                  this.$slots
                ),
        })
      )
    },
  }),
  _g = dn({
    name: 'InternalSelectionSuffix',
    props: {
      clsPrefix: { type: String, required: !0 },
      showArrow: { type: Boolean, default: void 0 },
      showClear: { type: Boolean, default: void 0 },
      loading: Boolean,
      onClear: Function,
    },
    setup: (e) => () => {
      const { clsPrefix: t } = e
      return dr(
        wp,
        {
          clsPrefix: t,
          class: `${t}-base-suffix`,
          strokeWidth: 24,
          scale: 0.85,
          show: e.loading,
        },
        {
          default: () =>
            e.showArrow
              ? dr(
                  $g,
                  {
                    clsPrefix: t,
                    show: e.showClear,
                    onClear: e.onClear,
                  },
                  {
                    default: () =>
                      dr(
                        vp,
                        {
                          clsPrefix: t,
                          class: `${t}-base-suffix__arrow`,
                        },
                        { default: () => dr(up, null) }
                      ),
                  }
                )
              : null,
        }
      )
    },
  }),
  zg = {
    paddingSingle: '0 26px 0 14px',
    clearSize: '16px',
    arrowSize: '16px',
  }
const Pg = {
  name: 'InternalSelection',
  common: Bv,
  peers: { Popover: ag },
  self: (e) => {
    const {
      borderRadius: t,
      textColor2: n,
      textColorDisabled: o,
      inputColor: r,
      inputColorDisabled: i,
      primaryColor: a,
      primaryColorHover: l,
      warningColor: s,
      warningColorHover: c,
      errorColor: u,
      errorColorHover: d,
      borderColor: f,
      iconColor: p,
      iconColorDisabled: h,
      clearColor: v,
      clearColorHover: g,
      clearColorPressed: b,
      placeholderColor: m,
      placeholderColorDisabled: y,
      fontSizeTiny: x,
      fontSizeSmall: w,
      fontSizeMedium: C,
      fontSizeLarge: S,
      heightTiny: k,
      heightSmall: $,
      heightMedium: _,
      heightLarge: z,
    } = e
    return Object.assign(Object.assign({}, zg), {
      fontSizeTiny: x,
      fontSizeSmall: w,
      fontSizeMedium: C,
      fontSizeLarge: S,
      heightTiny: k,
      heightSmall: $,
      heightMedium: _,
      heightLarge: z,
      borderRadius: t,
      textColor: n,
      textColorDisabled: o,
      placeholderColor: m,
      placeholderColorDisabled: y,
      color: r,
      colorDisabled: i,
      colorActive: r,
      border: `1px solid ${f}`,
      borderHover: `1px solid ${l}`,
      borderActive: `1px solid ${a}`,
      borderFocus: `1px solid ${l}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 0 2px ${ml(a, { alpha: 0.2 })}`,
      boxShadowFocus: `0 0 0 2px ${ml(a, { alpha: 0.2 })}`,
      caretColor: a,
      arrowColor: p,
      arrowColorDisabled: h,
      loadingColor: a,
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${c}`,
      borderActiveWarning: `1px solid ${s}`,
      borderFocusWarning: `1px solid ${c}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: `0 0 0 2px ${ml(s, {
        alpha: 0.2,
      })}`,
      boxShadowFocusWarning: `0 0 0 2px ${ml(s, {
        alpha: 0.2,
      })}`,
      colorActiveWarning: r,
      caretColorWarning: s,
      borderError: `1px solid ${u}`,
      borderHoverError: `1px solid ${d}`,
      borderActiveError: `1px solid ${u}`,
      borderFocusError: `1px solid ${d}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 0 2px ${ml(u, {
        alpha: 0.2,
      })}`,
      boxShadowFocusError: `0 0 0 2px ${ml(u, {
        alpha: 0.2,
      })}`,
      colorActiveError: r,
      caretColorError: u,
      clearColor: v,
      clearColorHover: g,
      clearColorPressed: b,
    })
  },
}
var Eg = Ud([
    Kd(
      'base-selection',
      '\n position: relative;\n z-index: auto;\n box-shadow: none;\n width: 100%;\n max-width: 100%;\n display: inline-block;\n vertical-align: bottom;\n border-radius: var(--border-radius);\n min-height: var(--height);\n line-height: 1.5;\n font-size: var(--font-size);\n ',
      [
        Kd(
          'base-loading',
          '\n color: var(--loading-color);\n '
        ),
        Kd('base-selection-tags', {
          minHeight: 'var(--height)',
        }),
        Yd(
          'border, state-border',
          '\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n pointer-events: none;\n border: var(--border);\n border-radius: inherit;\n transition:\n box-shadow .3s var(--bezier),\n border-color .3s var(--bezier);\n '
        ),
        Yd(
          'state-border',
          '\n z-index: 1;\n border-color: #0000;\n '
        ),
        Kd(
          'base-suffix',
          '\n cursor: pointer;\n position: absolute;\n top: 50%;\n transform: translateY(-50%);\n right: 10px;\n ',
          [
            Yd(
              'arrow',
              '\n font-size: var(--arrow-size);\n color: var(--arrow-color);\n transition: color .3s var(--bezier);\n '
            ),
          ]
        ),
        Kd(
          'base-selection-overlay',
          '\n display: flex;\n align-items: center;\n white-space: nowrap;\n overflow: hidden;\n pointer-events: none;\n position: absolute;\n top: 0;\n right: 0;\n bottom: 0;\n left: 0;\n padding: var(--padding-single);\n transition: color .3s var(--bezier);\n '
        ),
        Kd(
          'base-selection-placeholder',
          '\n color: var(--placeholder-color);\n '
        ),
        Kd(
          'base-selection-tags',
          '\n cursor: pointer;\n outline: none;\n box-sizing: border-box;\n position: relative;\n z-index: auto;\n display: flex;\n padding: 3px 26px 0 14px;\n flex-wrap: wrap;\n align-items: center;\n width: 100%;\n vertical-align: bottom;\n background-color: var(--color);\n border-radius: inherit;\n transition:\n color .3s var(--bezier),\n box-shadow .3s var(--bezier),\n background-color .3s var(--bezier);\n '
        ),
        Kd(
          'base-selection-label',
          '\n height: var(--height);\n display: inline-flex;\n width: 100%;\n vertical-align: bottom;\n cursor: pointer;\n outline: none;\n z-index: auto;\n box-sizing: border-box;\n position: relative;\n transition:\n color .3s var(--bezier),\n box-shadow .3s var(--bezier),\n background-color .3s var(--bezier);\n border-radius: inherit;\n background-color: var(--color);\n align-items: center;\n ',
          [
            Kd(
              'base-selection-input',
              '\n line-height: inherit;\n outline: none;\n cursor: pointer;\n box-sizing: border-box;\n border:none;\n width: 100%;\n padding: var(--padding-single);\n background-color: #0000;\n color: var(--text-color);\n transition: color .3s var(--bezier);\n caret-color: var(--caret-color);\n ',
              [
                Yd(
                  'content',
                  '\n text-overflow: ellipsis;\n overflow: hidden;\n white-space: nowrap; \n '
                ),
              ]
            ),
            Yd(
              'render-label',
              '\n color: var(--text-color);\n '
            ),
          ]
        ),
        Zd('disabled', [
          Ud('&:hover', [
            Yd(
              'state-border',
              '\n box-shadow: var(--box-shadow-hover);\n border: var(--border-hover);\n '
            ),
          ]),
          Xd('focus', [
            Yd(
              'state-border',
              '\n box-shadow: var(--box-shadow-focus);\n border: var(--border-focus);\n '
            ),
          ]),
          Xd('active', [
            Yd(
              'state-border',
              '\n box-shadow: var(--box-shadow-active);\n border: var(--border-active);\n '
            ),
            Kd('base-selection-label', {
              backgroundColor: 'var(--color-active)',
            }),
            Kd('base-selection-tags', {
              backgroundColor: 'var(--color-active)',
            }),
          ]),
        ]),
        Xd('disabled', { cursor: 'not-allowed' }, [
          Yd(
            'arrow',
            '\n color: var(--arrow-color-disabled);\n '
          ),
          Kd(
            'base-selection-label',
            '\n cursor: not-allowed;\n background-color: var(--color-disabled);\n ',
            [
              Kd(
                'base-selection-input',
                '\n cursor: not-allowed;\n color: var(--text-color-disabled);\n '
              ),
              Yd(
                'render-label',
                '\n color: var(--text-color-disabled);\n '
              ),
            ]
          ),
          Kd(
            'base-selection-tags',
            '\n cursor: not-allowed;\n background-color: var(--color-disabled);\n '
          ),
          Kd(
            'base-selection-placeholder',
            '\n cursor: not-allowed;\n color: var(--placeholder-color-disabled);\n '
          ),
        ]),
        Kd(
          'base-selection-input-tag',
          '\n height: calc(var(--height) - 6px);\n line-height: calc(var(--height) - 6px);\n outline: none;\n display: none;\n position: relative;\n margin-bottom: 3px;\n max-width: 100%;\n vertical-align: bottom;\n ',
          [
            Yd(
              'input',
              '\n min-width: 1px;\n padding: 0;\n background-color: #0000;\n outline: none;\n border: none;\n max-width: 100%;\n overflow: hidden;\n width: 1em;\n line-height: inherit;\n cursor: pointer;\n color: var(--text-color);\n caret-color: var(--caret-color);\n '
            ),
            Yd(
              'mirror',
              '\n position: absolute;\n left: 0;\n top: 0;\n white-space: pre;\n visibility: hidden;\n user-select: none;\n opacity: 0;\n '
            ),
          ]
        ),
      ]
    ),
    Kd(
      'base-selection-popover',
      '\n margin-bottom: -3px;\n display: flex;\n flex-wrap: wrap;\n '
    ),
    Kd(
      'base-selection-tag-wrapper',
      '\n max-width: 100%;\n display: inline-flex;\n padding: 0 7px 3px 0;\n ',
      [
        Ud('&:last-child', { paddingRight: 0 }),
        Kd(
          'tag',
          '\n font-size: 14px;\n max-width: 100%;\n ',
          [
            Yd(
              'content',
              '\n text-overflow: ellipsis;\n overflow: hidden;\n '
            ),
          ]
        ),
      ]
    ),
    ['warning', 'error'].map((e) =>
      Jd(
        e,
        Kd('base-selection', [
          Yd('state-border', {
            border: `var(--border-${e})`,
          }),
          Zd('disabled', [
            Ud('&:hover', [
              Yd(
                'state-border',
                `\n box-shadow: var(--box-shadow-hover-${e});\n border: var(--border-hover-${e});\n `
              ),
            ]),
            Xd('active', [
              Yd(
                'state-border',
                `\n box-shadow: var(--box-shadow-active-${e});\n border: var(--border-active-${e});\n `
              ),
              Kd('base-selection-label', {
                backgroundColor: `var(--color-active-${e})`,
              }),
              Kd('base-selection-tags', {
                backgroundColor: `var(--box-shadow-active-${e})`,
              }),
            ]),
            Xd('focus', [
              Yd(
                'state-border',
                `\n box-shadow: var(--box-shadow-focus-${e});\n border: var(--border-focus-${e});\n `
              ),
            ]),
          ]),
        ])
      )
    ),
  ]),
  Og = dn({
    name: 'InternalSelection',
    props: Object.assign(Object.assign({}, Bf.props), {
      clsPrefix: { type: String, required: !0 },
      bordered: { type: Boolean, default: void 0 },
      active: Boolean,
      pattern: { type: String, default: null },
      placeholder: String,
      selectedOption: { type: Object, default: null },
      selectedOptions: { type: Array, default: null },
      multiple: Boolean,
      filterable: Boolean,
      clearable: Boolean,
      disabled: Boolean,
      size: { type: String, default: 'medium' },
      loading: Boolean,
      autofocus: Boolean,
      showArrow: { type: Boolean, default: !0 },
      inputProps: Object,
      focused: Boolean,
      renderTag: Function,
      onKeyup: Function,
      onKeydown: Function,
      onClick: Function,
      onBlur: Function,
      onFocus: Function,
      onDeleteOption: Function,
      maxTagCount: [String, Number],
      onClear: Function,
      onPatternInput: Function,
      renderLabel: Function,
    }),
    setup(e) {
      const t = nt(null),
        n = nt(null),
        o = nt(null),
        r = nt(null),
        i = nt(null),
        a = nt(null),
        l = nt(null),
        s = nt(null),
        c = nt(null),
        u = nt(null),
        d = nt(!1),
        f = nt(!1),
        p = nt(!1),
        h = Bf(
          'InternalSelection',
          'InternalSelection',
          Eg,
          Pg,
          e,
          ct(e, 'clsPrefix')
        ),
        v = ur(
          () =>
            e.clearable &&
            !e.disabled &&
            (p.value || e.active)
        ),
        g = ur(() =>
          e.selectedOption
            ? e.renderTag
              ? e.renderTag({
                  option: e.selectedOption,
                  handleClose: () => {},
                })
              : e.renderLabel
              ? e.renderLabel(e.selectedOption, !0)
              : Cf(
                  e.selectedOption.label,
                  e.selectedOption,
                  !0
                )
            : e.placeholder
        ),
        b = ur(() => {
          const t = e.selectedOption
          if (t) return t.label
        }),
        m = ur(() =>
          e.multiple
            ? !(
                !Array.isArray(e.selectedOptions) ||
                !e.selectedOptions.length
              )
            : null !== e.selectedOption
        )
      function y() {
        var o
        const { value: r } = t
        if (r) {
          const { value: t } = n
          t &&
            ((t.style.width = `${r.offsetWidth}px`),
            'responsive' !== e.maxTagCount &&
              (null === (o = c.value) ||
                void 0 === o ||
                o.sync()))
        }
      }
      function x(t) {
        const { onPatternInput: n } = e
        n && n(t)
      }
      function w(t) {
        !(function (t) {
          const { onDeleteOption: n } = e
          n && n(t)
        })(t)
      }
      Xt(ct(e, 'active'), (e) => {
        e ||
          (function () {
            const { value: e } = u
            e && (e.style.display = 'none')
          })()
      }),
        Xt(ct(e, 'pattern'), () => {
          e.multiple && zt(y)
        })
      const C = nt(!1)
      let S = null
      let k = null
      function $() {
        null !== k && window.clearTimeout(k)
      }
      return (
        wn(() => {
          Kt(() => {
            const t = a.value
            t &&
              (t.tabIndex = e.disabled || f.value ? -1 : 0)
          })
        }),
        {
          mergedTheme: h,
          mergedClearable: v,
          patternInputFocused: f,
          filterablePlaceholder: g,
          label: b,
          selected: m,
          showTagsPanel: d,
          isCompositing: C,
          counterRef: l,
          counterWrapperRef: s,
          patternInputMirrorRef: t,
          patternInputRef: n,
          selfRef: o,
          multipleElRef: r,
          singleElRef: i,
          patternInputWrapperRef: a,
          overflowRef: c,
          inputTagElRef: u,
          handleMouseDown: function (t) {
            e.active &&
              e.filterable &&
              t.target !== n.value &&
              t.preventDefault()
          },
          handleFocusin: function (t) {
            var n
            ;(t.relatedTarget &&
              (null === (n = o.value) || void 0 === n
                ? void 0
                : n.contains(t.relatedTarget))) ||
              (function (t) {
                const { onFocus: n } = e
                n && n(t)
              })(t)
          },
          handleClear: function (t) {
            !(function (t) {
              const { onClear: n } = e
              n && n(t)
            })(t)
          },
          handleMouseEnter: function () {
            p.value = !0
          },
          handleMouseLeave: function () {
            p.value = !1
          },
          handleDeleteOption: w,
          handlePatternKeyDown: function (t) {
            if (
              'Backspace' === t.code &&
              !e.pattern.length
            ) {
              const { selectedOptions: t } = e
              ;(null == t ? void 0 : t.length) &&
                w(t[t.length - 1])
            }
          },
          handlePatternInputInput: function (e) {
            const { value: n } = t
            if (n) {
              const t = e.target.value
              ;(n.textContent = t), y()
            }
            C.value ? (S = e) : x(e)
          },
          handlePatternInputBlur: function (e) {
            f.value = !1
          },
          handlePatternInputFocus: function () {
            f.value = !0
          },
          handleMouseEnterCounter: function () {
            e.disabled ||
              e.active ||
              ($(),
              (k = window.setTimeout(() => {
                d.value = !0
              }, 100)))
          },
          handleMouseLeaveCounter: function () {
            $()
          },
          handleFocusout: function (t) {
            var n
            ;(null === (n = o.value) || void 0 === n
              ? void 0
              : n.contains(t.relatedTarget)) ||
              (function (t) {
                const { onBlur: n } = e
                n && n(t)
              })(t)
          },
          handleCompositionEnd: function () {
            ;(C.value = !1), x(S), (S = null)
          },
          handleCompositionStart: function () {
            C.value = !0
          },
          onPopoverUpdateShow: function (e) {
            e || ($(), (d.value = !1))
          },
          focus: function () {
            if (e.filterable) {
              f.value = !1
              const { value: e } = a
              e && e.focus()
            } else if (e.multiple) {
              const { value: e } = r
              null == e || e.focus()
            } else {
              const { value: e } = i
              null == e || e.focus()
            }
          },
          focusInput: function () {
            const { value: e } = n
            e &&
              (!(function () {
                const { value: e } = u
                e && (e.style.display = 'inline-block')
              })(),
              e.focus())
          },
          blurInput: function () {
            const { value: e } = n
            e && e.blur()
          },
          updateCounter: function (e) {
            const { value: t } = l
            t && t.setTextContent(`+${e}`)
          },
          getCounter: function () {
            const { value: e } = s
            return e
          },
          getTail: function () {
            return n.value
          },
          renderLabel: e.renderLabel,
          cssVars: ur(() => {
            const { size: t } = e,
              {
                common: { cubicBezierEaseInOut: n },
                self: {
                  borderRadius: o,
                  color: r,
                  placeholderColor: i,
                  textColor: a,
                  paddingSingle: l,
                  caretColor: s,
                  colorDisabled: c,
                  textColorDisabled: u,
                  placeholderColorDisabled: d,
                  colorActive: f,
                  boxShadowFocus: p,
                  boxShadowActive: v,
                  boxShadowHover: g,
                  border: b,
                  borderFocus: m,
                  borderHover: y,
                  borderActive: x,
                  arrowColor: w,
                  arrowColorDisabled: C,
                  loadingColor: S,
                  colorActiveWarning: k,
                  boxShadowFocusWarning: $,
                  boxShadowActiveWarning: _,
                  boxShadowHoverWarning: z,
                  borderWarning: P,
                  borderFocusWarning: E,
                  borderHoverWarning: O,
                  borderActiveWarning: j,
                  colorActiveError: T,
                  boxShadowFocusError: A,
                  boxShadowActiveError: M,
                  boxShadowHoverError: F,
                  borderError: R,
                  borderFocusError: B,
                  borderHoverError: L,
                  borderActiveError: I,
                  clearColor: D,
                  clearColorHover: H,
                  clearColorPressed: N,
                  clearSize: W,
                  arrowSize: V,
                  [Wd('height', t)]: q,
                  [Wd('fontSize', t)]: U,
                },
              } = h.value
            return {
              '--bezier': n,
              '--border': b,
              '--border-active': x,
              '--border-focus': m,
              '--border-hover': y,
              '--border-radius': o,
              '--box-shadow-active': v,
              '--box-shadow-focus': p,
              '--box-shadow-hover': g,
              '--caret-color': s,
              '--color': r,
              '--color-active': f,
              '--color-disabled': c,
              '--font-size': U,
              '--height': q,
              '--padding-single': l,
              '--placeholder-color': i,
              '--placeholder-color-disabled': d,
              '--text-color': a,
              '--text-color-disabled': u,
              '--arrow-color': w,
              '--arrow-color-disabled': C,
              '--loading-color': S,
              '--color-active-warning': k,
              '--box-shadow-focus-warning': $,
              '--box-shadow-active-warning': _,
              '--box-shadow-hover-warning': z,
              '--border-warning': P,
              '--border-focus-warning': E,
              '--border-hover-warning': O,
              '--border-active-warning': j,
              '--color-active-error': T,
              '--box-shadow-focus-error': A,
              '--box-shadow-active-error': M,
              '--box-shadow-hover-error': F,
              '--border-error': R,
              '--border-focus-error': B,
              '--border-hover-error': L,
              '--border-active-error': I,
              '--clear-size': W,
              '--clear-color': D,
              '--clear-color-hover': H,
              '--clear-color-pressed': N,
              '--arrow-size': V,
            }
          }),
        }
      )
    },
    render() {
      const {
          multiple: e,
          size: t,
          disabled: n,
          filterable: o,
          maxTagCount: r,
          bordered: i,
          clsPrefix: a,
          renderTag: l,
          renderLabel: s,
        } = this,
        c = 'responsive' === r,
        u = 'number' == typeof r,
        d = c || u,
        f = dr(_g, {
          clsPrefix: a,
          loading: this.loading,
          showArrow: this.showArrow,
          showClear: this.mergedClearable && this.selected,
          onClear: this.handleClear,
        })
      let p
      if (e) {
        const e = (e) =>
            dr(
              'div',
              {
                class: `${a}-base-selection-tag-wrapper`,
                key: e.value,
              },
              l
                ? l({
                    option: e,
                    handleClose: () =>
                      this.handleDeleteOption(e),
                  })
                : dr(
                    Sg,
                    {
                      size: t,
                      closable: !e.disabled,
                      disabled: n,
                      internalStopClickPropagation: !0,
                      onClose: () =>
                        this.handleDeleteOption(e),
                    },
                    {
                      default: () =>
                        s ? s(e, !0) : Cf(e.label, e, !0),
                    }
                  )
            ),
          i = (
            u
              ? this.selectedOptions.slice(0, r)
              : this.selectedOptions
          ).map(e),
          h = o
            ? dr(
                'div',
                {
                  class: `${a}-base-selection-input-tag`,
                  ref: 'inputTagElRef',
                  key: '__input-tag__',
                },
                dr(
                  'input',
                  Object.assign({}, this.inputProps, {
                    ref: 'patternInputRef',
                    tabindex: -1,
                    disabled: n,
                    value: this.pattern,
                    autofocus: this.autofocus,
                    class: `${a}-base-selection-input-tag__input`,
                    onBlur: this.handlePatternInputBlur,
                    onFocus: this.handlePatternInputFocus,
                    onKeydown: this.handlePatternKeyDown,
                    onInput: this.handlePatternInputInput,
                    onCompositionstart:
                      this.handleCompositionStart,
                    onCompositionend:
                      this.handleCompositionEnd,
                  })
                ),
                dr(
                  'span',
                  {
                    ref: 'patternInputMirrorRef',
                    class: `${a}-base-selection-input-tag__mirror`,
                  },
                  this.pattern ? this.pattern : ''
                )
              )
            : null,
          v = c
            ? () =>
                dr(
                  'div',
                  {
                    class: `${a}-base-selection-tag-wrapper`,
                    ref: 'counterWrapperRef',
                  },
                  dr(Sg, {
                    ref: 'counterRef',
                    onMouseenter:
                      this.handleMouseEnterCounter,
                    onMouseleave:
                      this.handleMouseLeaveCounter,
                    disabled: n,
                  })
                )
            : void 0
        let g
        if (u) {
          const e = this.selectedOptions.length - r
          e > 0 &&
            (g = dr(
              'div',
              {
                class: `${a}-base-selection-tag-wrapper`,
                key: '__counter__',
              },
              dr(
                Sg,
                {
                  ref: 'counterRef',
                  onMouseenter:
                    this.handleMouseEnterCounter,
                  disabled: n,
                },
                { default: () => `+${e}` }
              )
            ))
        }
        const b = c
            ? o
              ? dr(
                  Uh,
                  {
                    ref: 'overflowRef',
                    updateCounter: this.updateCounter,
                    getCounter: this.getCounter,
                    getTail: this.getTail,
                    style: {
                      width: '100%',
                      display: 'flex',
                      overflow: 'hidden',
                    },
                  },
                  {
                    default: () => i,
                    counter: v,
                    tail: () => h,
                  }
                )
              : dr(
                  Uh,
                  {
                    ref: 'overflowRef',
                    updateCounter: this.updateCounter,
                    getCounter: this.getCounter,
                    style: {
                      width: '100%',
                      display: 'flex',
                      overflow: 'hidden',
                    },
                  },
                  { default: () => i, counter: v }
                )
            : u
            ? i.concat(g)
            : i,
          m = d
            ? () =>
                dr(
                  'div',
                  { class: `${a}-base-selection-popover` },
                  c ? i : this.selectedOptions.map(e)
                )
            : void 0,
          y = d
            ? {
                show: this.showTagsPanel,
                trigger: 'hover',
                overlap: !0,
                placement: 'top',
                width: 'trigger',
                onUpdateShow: this.onPopoverUpdateShow,
                theme: this.mergedTheme.peers.Popover,
                themeOverrides:
                  this.mergedTheme.peerOverrides.Popover,
              }
            : null,
          x =
            this.selected ||
            this.pattern ||
            this.isCompositing
              ? null
              : dr(
                  'div',
                  {
                    class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
                  },
                  this.placeholder
                )
        if (o) {
          const e = dr(
            'div',
            {
              ref: 'patternInputWrapperRef',
              class: `${a}-base-selection-tags`,
            },
            b,
            c ? null : h,
            f
          )
          p = dr(
            Co,
            null,
            d
              ? dr(bg, Object.assign({}, y), {
                  trigger: () => e,
                  default: m,
                })
              : e,
            x
          )
        } else {
          const e = dr(
            'div',
            {
              ref: 'multipleElRef',
              class: `${a}-base-selection-tags`,
              tabindex: n ? void 0 : 0,
            },
            b,
            f
          )
          p = dr(
            Co,
            null,
            d
              ? dr(bg, Object.assign({}, y), {
                  trigger: () => e,
                  default: m,
                })
              : e,
            x
          )
        }
      } else if (o) {
        const e =
          !this.pattern &&
          (this.active || !this.selected) &&
          !this.isCompositing
        p = dr(
          'div',
          {
            ref: 'patternInputWrapperRef',
            class: `${a}-base-selection-label`,
          },
          dr(
            'input',
            Object.assign({}, this.inputProps, {
              ref: 'patternInputRef',
              class: `${a}-base-selection-input`,
              value:
                this.patternInputFocused && this.active
                  ? this.pattern
                  : '',
              placeholder: '',
              readonly: n,
              disabled: n,
              tabindex: -1,
              autofocus: this.autofocus,
              onFocus: this.handlePatternInputFocus,
              onBlur: this.handlePatternInputBlur,
              onInput: this.handlePatternInputInput,
              onCompositionstart:
                this.handleCompositionStart,
              onCompositionend: this.handleCompositionEnd,
            })
          ),
          e || (this.patternInputFocused && this.active)
            ? null
            : dr(
                'div',
                {
                  class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
                  key: 'input',
                },
                l
                  ? l({
                      option: this.selectedOption,
                      handleClose: () => {},
                    })
                  : s
                  ? s(this.selectedOption, !0)
                  : Cf(this.label, this.selectedOption, !0)
              ),
          e
            ? dr(
                'div',
                {
                  class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
                  key: 'placeholder',
                },
                this.filterablePlaceholder
              )
            : null,
          f
        )
      } else
        p = dr(
          'div',
          {
            ref: 'singleElRef',
            class: `${a}-base-selection-label`,
            tabindex: this.disabled ? void 0 : 0,
          },
          void 0 !== this.label
            ? dr(
                'div',
                {
                  class: `${a}-base-selection-input`,
                  title: kf(this.label),
                  key: 'input',
                },
                dr(
                  'div',
                  {
                    class: `${a}-base-selection-input__content`,
                  },
                  l
                    ? l({
                        option: this.selectedOption,
                        handleClose: () => {},
                      })
                    : s
                    ? s(this.selectedOption, !0)
                    : Cf(
                        this.label,
                        this.selectedOption,
                        !0
                      )
                )
              )
            : dr(
                'div',
                {
                  class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
                  key: 'placeholder',
                },
                this.placeholder
              ),
          f
        )
      return dr(
        'div',
        {
          ref: 'selfRef',
          class: [
            `${a}-base-selection`,
            {
              [`${a}-base-selection--active`]: this.active,
              [`${a}-base-selection--selected`]:
                this.selected ||
                (this.active && this.pattern),
              [`${a}-base-selection--disabled`]:
                this.disabled,
              [`${a}-base-selection--multiple`]:
                this.multiple,
              [`${a}-base-selection--focus`]: this.focused,
            },
          ],
          style: this.cssVars,
          onClick: this.onClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onKeyup: this.onKeyup,
          onKeydown: this.onKeydown,
          onFocusin: this.handleFocusin,
          onFocusout: this.handleFocusout,
          onMousedown: this.handleMouseDown,
        },
        p,
        i
          ? dr('div', {
              class: `${a}-base-selection__border`,
            })
          : null,
        i
          ? dr('div', {
              class: `${a}-base-selection__state-border`,
            })
          : null
      )
    },
  })
const { cubicBezierEaseInOut: jg } = ef
const {
  cubicBezierEaseInOut: Tg,
  cubicBezierEaseOut: Ag,
  cubicBezierEaseIn: Mg,
} = ef
var Fg = {
  paddingTiny: '0 8px',
  paddingSmall: '0 10px',
  paddingMedium: '0 12px',
  paddingLarge: '0 14px',
  clearSize: '16px',
}
const Rg = {
    name: 'Input',
    common: Bv,
    self: (e) => {
      const {
        textColor2: t,
        textColor3: n,
        textColorDisabled: o,
        primaryColor: r,
        primaryColorHover: i,
        inputColor: a,
        inputColorDisabled: l,
        borderColor: s,
        warningColor: c,
        warningColorHover: u,
        errorColor: d,
        errorColorHover: f,
        borderRadius: p,
        lineHeight: h,
        fontSizeTiny: v,
        fontSizeSmall: g,
        fontSizeMedium: b,
        fontSizeLarge: m,
        heightTiny: y,
        heightSmall: x,
        heightMedium: w,
        heightLarge: C,
        actionColor: S,
        clearColor: k,
        clearColorHover: $,
        clearColorPressed: _,
        placeholderColor: z,
        placeholderColorDisabled: P,
        iconColor: E,
        iconColorDisabled: O,
        iconColorHover: j,
        iconColorPressed: T,
      } = e
      return Object.assign(Object.assign({}, Fg), {
        countTextColor: n,
        heightTiny: y,
        heightSmall: x,
        heightMedium: w,
        heightLarge: C,
        fontSizeTiny: v,
        fontSizeSmall: g,
        fontSizeMedium: b,
        fontSizeLarge: m,
        lineHeight: h,
        lineHeightTextarea: h,
        borderRadius: p,
        iconSize: '16px',
        groupLabelColor: S,
        groupLabelTextColor: t,
        textColor: t,
        textColorDisabled: o,
        textDecorationColor: t,
        caretColor: r,
        placeholderColor: z,
        placeholderColorDisabled: P,
        color: a,
        colorDisabled: l,
        colorFocus: a,
        groupLabelBorder: `1px solid ${s}`,
        border: `1px solid ${s}`,
        borderHover: `1px solid ${i}`,
        borderDisabled: `1px solid ${s}`,
        borderFocus: `1px solid ${i}`,
        boxShadowFocus: `0 0 0 2px ${ml(r, {
          alpha: 0.2,
        })}`,
        loadingColor: r,
        loadingColorWarning: c,
        borderWarning: `1px solid ${c}`,
        borderHoverWarning: `1px solid ${u}`,
        colorFocusWarning: a,
        borderFocusWarning: `1px solid ${u}`,
        boxShadowFocusWarning: `0 0 0 2px ${ml(c, {
          alpha: 0.2,
        })}`,
        caretColorWarning: c,
        loadingColorError: d,
        borderError: `1px solid ${d}`,
        borderHoverError: `1px solid ${f}`,
        colorFocusError: a,
        borderFocusError: `1px solid ${f}`,
        boxShadowFocusError: `0 0 0 2px ${ml(d, {
          alpha: 0.2,
        })}`,
        caretColorError: d,
        clearColor: k,
        clearColorHover: $,
        clearColorPressed: _,
        iconColor: E,
        iconColorDisabled: O,
        iconColorHover: j,
        iconColorPressed: T,
        suffixTextColor: t,
      })
    },
  },
  Bg = Symbol('input')
function Lg(e) {
  return ['', void 0, null].includes(e)
}
var Ig = dn({
    name: 'InputWordCount',
    setup(e, { slots: t }) {
      const {
          mergedValueRef: n,
          maxlengthRef: o,
          mergedClsPrefixRef: r,
        } = Gt(Bg),
        i = ur(() => {
          const { value: e } = n
          return null === e || Array.isArray(e)
            ? 0
            : (function (e) {
                let t = 0
                for (const n of e) t++
                return t
              })(e)
        })
      return () => {
        const { value: e } = o,
          { value: a } = n
        return dr(
          'span',
          { class: `${r.value}-input-word-count` },
          t.default
            ? t.default({
                value:
                  null === a || Array.isArray(a) ? '' : a,
              })
            : void 0 === e
            ? i.value
            : `${i.value} / ${e}`
        )
      }
    },
  }),
  Dg = Ud([
    Kd(
      'input',
      '\n max-width: 100%;\n cursor: text;\n line-height: 1.5;\n z-index: auto;\n outline: none;\n box-sizing: border-box;\n position: relative;\n display: inline-flex;\n border-radius: var(--border-radius);\n background-color: var(--color);\n transition: background-color .3s var(--bezier);\n font-size: var(--font-size);\n --padding-vertical: calc((var(--height) - 1.5 * var(--font-size)) / 2);\n ',
      [
        Yd(
          'input, textarea',
          '\n overflow: hidden;\n flex-grow: 1;\n position: relative;\n '
        ),
        Yd(
          'input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder',
          '\n box-sizing: border-box;\n font-size: inherit;\n line-height: 1.5;\n font-family: inherit;\n border: none;\n outline: none;\n background-color: #0000;\n text-align: inherit;\n transition:\n caret-color .3s var(--bezier),\n color .3s var(--bezier),\n text-decoration-color .3s var(--bezier);\n '
        ),
        Yd(
          'input-el, textarea-el',
          '\n -webkit-appearance: none;\n width: 100%;\n min-width: 0;\n text-decoration-color: var(--text-decoration-color);\n color: var(--text-color);\n caret-color: var(--caret-color);\n ',
          [Ud('&::placeholder', { color: '#0000' })]
        ),
        Xd('round', [
          Zd('textarea', {
            borderRadius: 'calc(var(--height) / 2)',
          }),
        ]),
        Yd(
          'placeholder',
          '\n pointer-events: none;\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n overflow: hidden;\n color: var(--placeholder-color);\n ',
          [
            Ud('span', {
              width: '100%',
              display: 'inline-block',
            }),
          ]
        ),
        Zd('autosize', { width: '100%' }),
        Xd('autosize', [
          Yd(
            'textarea-el, input-el',
            '\n position: absolute;\n top: 0;\n left: 0;\n height: 100%;\n '
          ),
        ]),
        Kd(
          'input-wrapper',
          '\n overflow: hidden;\n display: inline-flex;\n flex-grow: 1;\n position: relative;\n padding-left: var(--padding-left);\n padding-right: var(--padding-right);\n '
        ),
        Yd(
          'input-mirror',
          '\n padding: 0;\n height: var(--height);\n overflow: hidden;\n visibility: hidden;\n position: static;\n white-space: nowrap;\n pointer-events: none;\n '
        ),
        Yd(
          'input-el',
          '\n padding: 0;\n height: var(--height);\n line-height: var(--height);\n ',
          [
            Ud('+', [
              Yd(
                'placeholder',
                '\n display: flex;\n align-items: center; \n '
              ),
            ]),
          ]
        ),
        Zd('textarea', [
          Yd('placeholder', { whiteSpace: 'nowrap' }),
        ]),
        Yd(
          'eye',
          '\n transition: color .3s var(--bezier);\n '
        ),
        Xd('textarea', { width: '100%' }, [
          Kd(
            'input-word-count',
            '\n position: absolute;\n right: var(--padding-right);\n bottom: var(--padding-vertical);\n '
          ),
          Xd('resizable', [
            Kd(
              'input-wrapper',
              '\n resize: vertical;\n overflow: auto;\n min-height: var(--height);\n '
            ),
          ]),
          Yd(
            'textarea-el, textarea-mirror, placeholder',
            '\n width: 100%;\n height: 100%;\n padding-left: 0;\n padding-right: 0;\n padding-top: var(--padding-vertical);\n padding-bottom: var(--padding-vertical);\n display: inline-block;\n vertical-align: bottom;\n box-sizing: border-box;\n line-height: var(--line-height-textarea);\n margin: 0;\n resize: none;\n '
          ),
          Yd(
            'textarea-mirror',
            '\n pointer-events: none;\n overflow: hidden;\n visibility: hidden;\n position: static;\n white-space: pre-wrap;\n overflow-wrap: break-word;\n '
          ),
        ]),
        Xd('pair', [
          Yd('input-el, placeholder', {
            textAlign: 'center',
          }),
          Yd(
            'separator',
            '\n display: flex;\n align-items: center;\n transition: color .3s var(--bezier);\n color: var(--text-color);\n ',
            [
              Kd('icon', '\n color: var(--icon-color);\n '),
              Kd(
                'base-icon',
                '\n color: var(--icon-color);\n '
              ),
            ]
          ),
        ]),
        Xd(
          'disabled',
          {
            cursor: 'not-allowed',
            backgroundColor: 'var(--color-disabled)',
          },
          [
            Yd('border', {
              border: 'var(--border-disabled)',
            }),
            Yd('input-el, textarea-el', {
              cursor: 'not-allowed',
              color: 'var(--text-color-disabled)',
              textDecorationColor:
                'var(--text-color-disabled)',
            }),
            Yd('placeholder', {
              color: 'var(--placeholder-color-disabled)',
            }),
            Yd(
              'separator',
              { color: 'var(--text-color-disabled)' },
              [
                Kd(
                  'icon',
                  '\n color: var(--icon-color-disabled);\n '
                ),
                Kd(
                  'base-icon',
                  '\n color: var(--icon-color-disabled);\n '
                ),
              ]
            ),
            Yd(
              'suffix, prefix',
              { color: 'var(--text-color-disabled)' },
              [
                Kd(
                  'icon',
                  '\n color: var(--icon-color-disabled);\n '
                ),
                Kd(
                  'internal-icon',
                  '\n color: var(--icon-color-disabled);\n '
                ),
              ]
            ),
          ]
        ),
        Zd('disabled', [
          Yd(
            'eye',
            '\n color: var(--icon-color);\n cursor: pointer;\n ',
            [
              Ud(
                '&:hover',
                '\n color: var(--icon-color-hover);\n '
              ),
              Ud(
                '&:active',
                '\n color: var(--icon-color-pressed);\n '
              ),
            ]
          ),
          Xd(
            'focus',
            { backgroundColor: 'var(--color-focus)' },
            [
              Yd('state-border', {
                border: 'var(--border-focus)',
                boxShadow: 'var(--box-shadow-focus)',
              }),
            ]
          ),
          Ud('&:hover', [
            Yd('state-border', {
              border: 'var(--border-focus)',
            }),
          ]),
        ]),
        Yd(
          'border, state-border',
          '\n box-sizing: border-box;\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n pointer-events: none;\n border-radius: inherit;\n border: var(--border);\n transition:\n box-shadow .3s var(--bezier),\n border-color .3s var(--bezier);\n '
        ),
        Yd(
          'state-border',
          '\n border-color: #0000;\n z-index: 1;\n '
        ),
        Yd('prefix', { marginRight: '4px' }),
        Yd('suffix', '\n margin-left: 4px;\n '),
        Yd(
          'suffix, prefix',
          '\n transition: color .3s var(--bezier);\n flex-wrap: nowrap;\n flex-shrink: 0;\n line-height: var(--height);\n white-space: nowrap;\n display: inline-flex;\n align-items: center;\n justify-content: center;\n color: var(--suffix-text-color);\n ',
          [
            Kd(
              'base-loading',
              '\n font-size: var(--icon-size);\n margin-left: 4px;\n color: var(--loading-color);\n '
            ),
            Kd(
              'base-clear',
              '\n font-size: var(--icon-size);\n margin-left: 4px;\n ',
              [
                Yd('placeholder', [
                  Kd(
                    'base-icon',
                    '\n transition: color .3s var(--bezier);\n color: var(--icon-color);\n font-size: var(--icon-size);\n '
                  ),
                ]),
              ]
            ),
            Kd(
              'icon',
              '\n transition: color .3s var(--bezier);\n color: var(--icon-color);\n font-size: var(--icon-size);\n '
            ),
            Kd(
              'base-icon',
              '\n font-size: var(--icon-size);\n '
            ),
          ]
        ),
        Kd(
          'input-word-count',
          '\n pointer-events: none;\n line-height: 1.5;\n font-size: .85em;\n color: var(--count-text-color);\n transition: color .3s var(--bezier);\n margin-left: 4px;\n font-variant: tabular-nums;\n '
        ),
      ]
    ),
    ['warning', 'error'].map((e) =>
      Jd(
        e,
        Kd('input', [
          Zd('disabled', [
            Kd(
              'base-loading',
              `\n color: var(--loading-color-${e})\n `
            ),
            Yd('input-el, textarea-el', {
              caretColor: `var(--caret-color-${e})`,
            }),
            Yd('state-border', {
              border: `var(--border-${e})`,
            }),
            Ud('&:hover', [
              Yd(
                'state-border',
                `\n border: var(--border-hover-${e});\n `
              ),
            ]),
            Ud(
              '&:focus',
              {
                backgroundColor: `var(--color-focus-${e})`,
              },
              [
                Yd(
                  'state-border',
                  `\n box-shadow: var(--box-shadow-focus-${e});\n border: var(--border-focus-${e});\n `
                ),
              ]
            ),
            Xd(
              'focus',
              {
                backgroundColor: `var(--color-focus-${e})`,
              },
              [
                Yd(
                  'state-border',
                  `\n box-shadow: var(--box-shadow-focus-${e});\n border: var(--border-focus-${e});\n `
                ),
              ]
            ),
          ]),
        ])
      )
    ),
  ])
var Hg = dn({
  name: 'Input',
  props: Object.assign(Object.assign({}, Bf.props), {
    bordered: { type: Boolean, default: void 0 },
    type: { type: String, default: 'text' },
    placeholder: [Array, String],
    defaultValue: { type: [String, Array], default: null },
    value: [String, Array],
    disabled: { type: Boolean, default: void 0 },
    size: String,
    rows: { type: [Number, String], default: 3 },
    round: Boolean,
    minlength: [String, Number],
    maxlength: [String, Number],
    clearable: Boolean,
    autosize: { type: [Boolean, Object], default: !1 },
    pair: Boolean,
    separator: String,
    readonly: { type: [String, Boolean], default: !1 },
    passivelyActivated: Boolean,
    showPasswordOn: String,
    stateful: { type: Boolean, default: !0 },
    autofocus: Boolean,
    inputProps: Object,
    resizable: { type: Boolean, default: !0 },
    showCount: Boolean,
    loading: { type: Boolean, default: void 0 },
    onMousedown: Function,
    onKeydown: Function,
    onKeyup: Function,
    onInput: [Function, Array],
    onFocus: [Function, Array],
    onBlur: [Function, Array],
    onClick: [Function, Array],
    onChange: [Function, Array],
    onClear: [Function, Array],
    'onUpdate:value': [Function, Array],
    onUpdateValue: [Function, Array],
    textDecoration: [String, Array],
    attrSize: { type: Number, default: 20 },
    onInputBlur: [Function, Array],
    onInputFocus: [Function, Array],
    onDeactivate: [Function, Array],
    onActivate: [Function, Array],
    onWrapperFocus: [Function, Array],
    onWrapperBlur: [Function, Array],
    internalDeactivateOnEnter: Boolean,
    internalForceFocus: Boolean,
    showPasswordToggle: Boolean,
  }),
  setup(e) {
    const { mergedClsPrefixRef: t, mergedBorderedRef: n } =
        If(e),
      o = Bf('Input', 'Input', Dg, Rg, e, t),
      r = nt(null),
      i = nt(null),
      a = nt(null),
      l = nt(null),
      s = nt(null),
      c = nt(null),
      { localeRef: u } = Zf('Input'),
      d = nt(e.defaultValue),
      f = hf(ct(e, 'value'), d),
      p = kl(e),
      { mergedSizeRef: h, mergedDisabledRef: v } = p,
      g = nt(!1),
      b = nt(!1),
      m = nt(!1),
      y = nt(!1)
    let x = null
    const w = ur(() => {
        const { placeholder: t, pair: n } = e
        return n
          ? Array.isArray(t)
            ? t
            : void 0 === t
            ? ['', '']
            : [t, t]
          : void 0 === t
          ? [u.value.placeholder]
          : [t]
      }),
      C = ur(() => {
        const { value: e } = m,
          { value: t } = f,
          { value: n } = w
        return (
          !e &&
          (Lg(t) || (Array.isArray(t) && Lg(t[0]))) &&
          n[0]
        )
      }),
      S = ur(() => {
        const { value: e } = m,
          { value: t } = f,
          { value: n } = w
        return (
          !e &&
          n[1] &&
          (Lg(t) || (Array.isArray(t) && Lg(t[1])))
        )
      }),
      k = of(() => e.internalForceFocus || g.value),
      $ = of(() => {
        if (
          v.value ||
          e.readonly ||
          !e.clearable ||
          (!k.value && !b.value)
        )
          return !1
        const { value: t } = f,
          { value: n } = k
        return e.pair
          ? !(!Array.isArray(t) || (!t[0] && !t[1])) &&
              (b.value || n)
          : !!t && (b.value || n)
      }),
      _ = ur(() => {
        const { showPasswordOn: t } = e
        return (
          t || (e.showPasswordToggle ? 'click' : void 0)
        )
      }),
      z = nt(!1),
      P = ur(() => {
        const { textDecoration: t } = e
        return t
          ? Array.isArray(t)
            ? t.map((e) => ({ textDecoration: e }))
            : [{ textDecoration: t }]
          : ['', '']
      }),
      E = ur(() => {
        const { maxlength: t } = e
        return void 0 === t ? void 0 : Number(t)
      })
    wn(() => {
      const { value: e } = f
      Array.isArray(e) || B(e)
    })
    const O = tr().proxy
    function j(t) {
      const {
          onUpdateValue: n,
          'onUpdate:value': o,
          onInput: r,
        } = e,
        { nTriggerFormInput: i } = p
      n && xf(n, t),
        o && xf(o, t),
        r && xf(r, t),
        (d.value = t),
        i()
    }
    function T(t) {
      const { onChange: n } = e,
        { nTriggerFormChange: o } = p
      n && xf(n, t), (d.value = t), o()
    }
    function A(t, n = 0, o = 'input') {
      const r = t.target.value
      if ((B(r), (x = r), m.value)) return
      const i = r
      if (e.pair) {
        let { value: e } = f
        ;(e = Array.isArray(e) ? [...e] : ['', '']),
          (e[n] = i),
          'input' === o ? j(e) : T(e)
      } else 'input' === o ? j(i) : T(i)
      O.$forceUpdate()
    }
    function M(t, n) {
      ;(null === t.relatedTarget ||
        (t.relatedTarget !== s.value &&
          t.relatedTarget !== c.value &&
          t.relatedTarget !== i.value &&
          t.relatedTarget !== r.value)) &&
        ('focus' === n
          ? (!(function (t) {
              const { onFocus: n } = e,
                { nTriggerFormFocus: o } = p
              n && xf(n, t), o()
            })(t),
            (g.value = !0))
          : 'blur' === n &&
            (!(function (t) {
              const { onBlur: n } = e,
                { nTriggerFormBlur: o } = p
              n && xf(n, t), o()
            })(t),
            (g.value = !1)))
    }
    function F() {
      e.passivelyActivated &&
        ((y.value = !1),
        zt(() => {
          var e
          null === (e = r.value) ||
            void 0 === e ||
            e.focus()
        }))
    }
    function R() {
      var t, n, o
      v.value ||
        (e.passivelyActivated
          ? null === (t = r.value) ||
            void 0 === t ||
            t.focus()
          : (null === (n = i.value) ||
              void 0 === n ||
              n.focus(),
            null === (o = s.value) ||
              void 0 === o ||
              o.focus()))
    }
    function B(t) {
      const { type: n, pair: o, autosize: r } = e
      if (!o && r)
        if ('textarea' === n) {
          const { value: e } = a
          e &&
            (e.textContent = (null != t ? t : '') + '\r\n')
        } else {
          const { value: e } = l
          e &&
            (t
              ? (e.textContent = t)
              : (e.innerHTML = '&nbsp;'))
        }
    }
    let L = null
    Kt(() => {
      const { autosize: t, type: n } = e
      t && 'textarea' === n
        ? (L = Xt(f, (e) => {
            Array.isArray(e) || e === x || B(e)
          }))
        : null == L || L()
    }),
      Ut(Bg, {
        mergedValueRef: f,
        maxlengthRef: E,
        mergedClsPrefixRef: t,
      })
    const I = {
      wrapperElRef: r,
      inputElRef: s,
      textareaElRef: i,
      isCompositing: m,
      focus: R,
      blur: function () {
        var e
        ;(null === (e = r.value) || void 0 === e
          ? void 0
          : e.contains(document.activeElement)) &&
          document.activeElement.blur()
      },
      deactivate: function () {
        const { value: e } = r
        ;(null == e
          ? void 0
          : e.contains(document.activeElement)) &&
          e !== document.activeElement &&
          F()
      },
      activate: function () {
        v.value ||
          (i.value
            ? i.value.focus()
            : s.value && s.value.focus())
      },
    }
    return Object.assign(Object.assign({}, I), {
      wrapperElRef: r,
      inputElRef: s,
      inputMirrorElRef: l,
      inputEl2Ref: c,
      textareaElRef: i,
      textareaMirrorElRef: a,
      uncontrolledValue: d,
      mergedValue: f,
      passwordVisible: z,
      mergedPlaceholder: w,
      showPlaceholder1: C,
      showPlaceholder2: S,
      mergedFocus: k,
      isComposing: m,
      activated: y,
      showClearButton: $,
      mergedSize: h,
      mergedDisabled: v,
      textDecorationStyle: P,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: _,
      handleCompositionStart: function () {
        m.value = !0
      },
      handleCompositionEnd: function (e) {
        ;(m.value = !1),
          e.target === c.value ? A(e, 1) : A(e, 0)
      },
      handleInput: A,
      handleInputBlur: function (t) {
        !(function (t) {
          const { onInputBlur: n } = e
          n && xf(n, t)
        })(t),
          t.relatedTarget === r.value &&
            (function () {
              const { onDeactivate: t } = e
              t && xf(t)
            })(),
          (null === t.relatedTarget ||
            (t.relatedTarget !== s.value &&
              t.relatedTarget !== c.value &&
              t.relatedTarget !== i.value)) &&
            (y.value = !1),
          M(t, 'blur')
      },
      handleInputFocus: function (t) {
        !(function (t) {
          const { onInputFocus: n } = e
          n && xf(n, t)
        })(t),
          (g.value = !0),
          (y.value = !0),
          (function () {
            const { onActivate: t } = e
            t && xf(t)
          })(),
          M(t, 'focus')
      },
      handleWrapperBlur: function (t) {
        e.passivelyActivated &&
          (!(function (t) {
            const { onWrapperBlur: n } = e
            n && xf(n, t)
          })(t),
          M(t, 'blur'))
      },
      handleWrapperFocus: function (t) {
        e.passivelyActivated &&
          ((g.value = !0),
          (function (t) {
            const { onWrapperFocus: n } = e
            n && xf(n, t)
          })(t),
          M(t, 'focus'))
      },
      handleMouseEnter: function () {
        b.value = !0
      },
      handleMouseLeave: function () {
        b.value = !1
      },
      handleMouseDown: function (t) {
        const { onMousedown: n } = e
        n && n(t)
        const { tagName: o } = t.target
        if ('INPUT' !== o && 'TEXTAREA' !== o) {
          if (e.resizable) {
            const { value: e } = r
            if (e) {
              const {
                  left: n,
                  top: o,
                  width: r,
                  height: i,
                } = e.getBoundingClientRect(),
                a = 14
              if (
                n + r - a < t.clientX &&
                t.clientY < n + r &&
                o + i - a < t.clientY &&
                t.clientY < o + i
              )
                return
            }
          }
          t.preventDefault(), g.value || R()
        }
      },
      handleChange: function (e, t) {
        A(e, t, 'change')
      },
      handleClick: function (t) {
        !(function (t) {
          const { onClick: n } = e
          n && xf(n, t)
        })(t)
      },
      handleClear: function (t) {
        !(function (t) {
          const { onClear: n } = e
          n && xf(n, t)
        })(t),
          e.pair ? j(['', '']) : j('')
      },
      handlePasswordToggleClick: function () {
        v.value ||
          ('click' === _.value && (z.value = !z.value))
      },
      handlePasswordToggleMousedown: function (e) {
        if (v.value) return
        e.preventDefault()
        const t = (e) => {
          e.preventDefault(), pf('mouseup', document, t)
        }
        if (
          (ff('mouseup', document, t),
          'mousedown' !== _.value)
        )
          return
        z.value = !0
        const n = () => {
          ;(z.value = !1), pf('mouseup', document, n)
        }
        ff('mouseup', document, n)
      },
      handleWrapperKeyDown: function (t) {
        var n
        switch (
          (null === (n = e.onKeydown) ||
            void 0 === n ||
            n.call(e, t),
          t.code)
        ) {
          case 'Escape':
            F()
            break
          case 'Enter':
          case 'NumpadEnter':
            !(function (t) {
              var n, o
              if (e.passivelyActivated) {
                const { value: r } = y
                if (r)
                  return void (
                    e.internalDeactivateOnEnter && F()
                  )
                t.preventDefault(),
                  'textarea' === e.type
                    ? null === (n = i.value) ||
                      void 0 === n ||
                      n.focus()
                    : null === (o = s.value) ||
                      void 0 === o ||
                      o.focus()
              }
            })(t)
        }
      },
      handleTextAreaMirrorResize: function () {
        ;(() => {
          if ('textarea' === e.type) {
            const { autosize: t } = e
            if ('boolean' == typeof t) return
            if (!i.value) return
            const {
                paddingTop: n,
                paddingBottom: o,
                lineHeight: r,
              } = window.getComputedStyle(i.value),
              l = Number(n.slice(0, -2)),
              s = Number(o.slice(0, -2)),
              c = Number(r.slice(0, -2)),
              { value: u } = a
            if (!u) return
            if (t.minRows) {
              const e = `${
                l + s + c * Math.max(t.minRows, 1)
              }px`
              u.style.minHeight = e
            }
            if (t.maxRows) {
              const e = `${l + s + c * t.maxRows}px`
              u.style.maxHeight = e
            }
          }
        })()
      },
      mergedTheme: o,
      cssVars: ur(() => {
        const { value: e } = h,
          {
            common: { cubicBezierEaseInOut: t },
            self: {
              color: n,
              borderRadius: r,
              textColor: i,
              caretColor: a,
              caretColorError: l,
              caretColorWarning: s,
              textDecorationColor: c,
              border: u,
              borderDisabled: d,
              borderHover: f,
              borderFocus: p,
              placeholderColor: v,
              placeholderColorDisabled: g,
              lineHeightTextarea: b,
              colorDisabled: m,
              colorFocus: y,
              textColorDisabled: x,
              boxShadowFocus: w,
              iconSize: C,
              colorFocusWarning: S,
              boxShadowFocusWarning: k,
              borderWarning: $,
              borderFocusWarning: _,
              borderHoverWarning: z,
              colorFocusError: P,
              boxShadowFocusError: E,
              borderError: O,
              borderFocusError: j,
              borderHoverError: T,
              clearSize: A,
              clearColor: M,
              clearColorHover: F,
              clearColorPressed: R,
              iconColor: B,
              iconColorDisabled: L,
              suffixTextColor: I,
              countTextColor: D,
              iconColorHover: H,
              iconColorPressed: N,
              loadingColor: W,
              loadingColorError: V,
              loadingColorWarning: q,
              [Wd('padding', e)]: U,
              [Wd('fontSize', e)]: G,
              [Wd('height', e)]: K,
            },
          } = o.value,
          { left: Y, right: X } = nl(U)
        return {
          '--bezier': t,
          '--count-text-color': D,
          '--color': n,
          '--font-size': G,
          '--border-radius': r,
          '--height': K,
          '--padding-left': Y,
          '--padding-right': X,
          '--text-color': i,
          '--caret-color': a,
          '--text-decoration-color': c,
          '--border': u,
          '--border-disabled': d,
          '--border-hover': f,
          '--border-focus': p,
          '--placeholder-color': v,
          '--placeholder-color-disabled': g,
          '--icon-size': C,
          '--line-height-textarea': b,
          '--color-disabled': m,
          '--color-focus': y,
          '--text-color-disabled': x,
          '--box-shadow-focus': w,
          '--loading-color': W,
          '--caret-color-warning': s,
          '--color-focus-warning': S,
          '--box-shadow-focus-warning': k,
          '--border-warning': $,
          '--border-focus-warning': _,
          '--border-hover-warning': z,
          '--loading-color-warning': q,
          '--caret-color-error': l,
          '--color-focus-error': P,
          '--box-shadow-focus-error': E,
          '--border-error': O,
          '--border-focus-error': j,
          '--border-hover-error': T,
          '--loading-color-error': V,
          '--clear-color': M,
          '--clear-size': A,
          '--clear-color-hover': F,
          '--clear-color-pressed': R,
          '--icon-color': B,
          '--icon-color-hover': H,
          '--icon-color-pressed': N,
          '--icon-color-disabled': L,
          '--suffix-text-color': I,
        }
      }),
    })
  },
  render() {
    const { mergedClsPrefix: e } = this
    return dr(
      'div',
      {
        ref: 'wrapperElRef',
        class: [
          `${e}-input`,
          {
            [`${e}-input--disabled`]: this.mergedDisabled,
            [`${e}-input--textarea`]:
              'textarea' === this.type,
            [`${e}-input--resizable`]:
              this.resizable && !this.autosize,
            [`${e}-input--autosize`]: this.autosize,
            [`${e}-input--round`]:
              this.round && !('textarea' === this.type),
            [`${e}-input--pair`]: this.pair,
            [`${e}-input--focus`]: this.mergedFocus,
            [`${e}-input--stateful`]: this.stateful,
          },
        ],
        style: this.cssVars,
        tabindex:
          this.mergedDisabled ||
          !this.passivelyActivated ||
          this.activated
            ? void 0
            : 0,
        onFocus: this.handleWrapperFocus,
        onBlur: this.handleWrapperBlur,
        onClick: this.handleClick,
        onMousedown: this.handleMouseDown,
        onMouseenter: this.handleMouseEnter,
        onMouseleave: this.handleMouseLeave,
        onCompositionstart: this.handleCompositionStart,
        onCompositionend: this.handleCompositionEnd,
        onKeyup: this.onKeyup,
        onKeydown: this.handleWrapperKeyDown,
      },
      dr(
        'div',
        { class: `${e}-input-wrapper` },
        this.$slots.affix || this.$slots.prefix
          ? dr(
              'div',
              { class: `${e}-input__prefix` },
              Uo(this.$slots, 'affix', void 0, () => [
                Uo(this.$slots, 'prefix'),
              ])
            )
          : null,
        'textarea' === this.type
          ? dr(
              'div',
              { class: `${e}-input__textarea` },
              dr(
                'textarea',
                Object.assign({}, this.inputProps, {
                  ref: 'textareaElRef',
                  class: `${e}-input__textarea-el`,
                  autofocus: this.autofocus,
                  rows: Number(this.rows),
                  placeholder: this.placeholder,
                  value: this.mergedValue,
                  disabled: this.mergedDisabled,
                  maxlength: this.maxlength,
                  minlength: this.minlength,
                  readonly: this.readonly,
                  tabindex:
                    this.passivelyActivated &&
                    !this.activated
                      ? -1
                      : void 0,
                  style: this.textDecorationStyle[0],
                  onBlur: this.handleInputBlur,
                  onFocus: this.handleInputFocus,
                  onInput: this.handleInput,
                  onChange: this.handleChange,
                })
              ),
              this.showPlaceholder1
                ? dr(
                    'div',
                    {
                      class: `${e}-input__placeholder`,
                      key: 'placeholder',
                    },
                    this.mergedPlaceholder[0]
                  )
                : null,
              this.autosize
                ? dr(
                    Nh,
                    {
                      onResize:
                        this.handleTextAreaMirrorResize,
                    },
                    {
                      default: () =>
                        dr('div', {
                          ref: 'textareaMirrorElRef',
                          class: `${e}-input__textarea-mirror`,
                          key: 'mirror',
                        }),
                    }
                  )
                : null
            )
          : dr(
              'div',
              { class: `${e}-input__input` },
              dr(
                'input',
                Object.assign({}, this.inputProps, {
                  ref: 'inputElRef',
                  type:
                    'password' === this.type &&
                    this.mergedShowPasswordOn &&
                    this.passwordVisible
                      ? 'text'
                      : this.type,
                  class: `${e}-input__input-el`,
                  tabindex:
                    this.passivelyActivated &&
                    !this.activated
                      ? -1
                      : void 0,
                  placeholder: this.mergedPlaceholder[0],
                  disabled: this.mergedDisabled,
                  maxlength: this.maxlength,
                  minlength: this.minlength,
                  value: Array.isArray(this.mergedValue)
                    ? this.mergedValue[0]
                    : this.mergedValue,
                  readonly: this.readonly,
                  autofocus: this.autofocus,
                  size: this.attrSize,
                  style: this.textDecorationStyle[0],
                  onBlur: this.handleInputBlur,
                  onFocus: this.handleInputFocus,
                  onInput: (e) => this.handleInput(e, 0),
                  onChange: (e) => this.handleChange(e, 0),
                })
              ),
              this.showPlaceholder1
                ? dr(
                    'div',
                    { class: `${e}-input__placeholder` },
                    dr(
                      'span',
                      null,
                      this.mergedPlaceholder[0]
                    )
                  )
                : null,
              this.autosize
                ? dr(
                    'div',
                    {
                      class: `${e}-input__input-mirror`,
                      key: 'mirror',
                      ref: 'inputMirrorElRef',
                    },
                    ' '
                  )
                : null
            ),
        !this.pair &&
          (this.$slots.suffix ||
            this.clearable ||
            this.showCount ||
            this.mergedShowPasswordOn ||
            void 0 !== this.loading)
          ? dr('div', { class: `${e}-input__suffix` }, [
              this.clearable || this.$slots.clear
                ? dr(
                    $g,
                    {
                      clsPrefix: e,
                      show: this.showClearButton,
                      onClear: this.handleClear,
                    },
                    {
                      default: () =>
                        Uo(this.$slots, 'clear'),
                    }
                  )
                : null,
              Uo(this.$slots, 'suffix'),
              void 0 !== this.loading
                ? dr(_g, {
                    clsPrefix: e,
                    loading: this.loading,
                    showArrow: !1,
                    showClear: !1,
                    style: this.cssVars,
                  })
                : null,
              this.showCount && 'textarea' !== this.type
                ? dr(Ig, null)
                : null,
              this.mergedShowPasswordOn &&
              'password' === this.type
                ? dr(
                    vp,
                    {
                      clsPrefix: e,
                      class: `${e}-input__eye`,
                      onMousedown:
                        this.handlePasswordToggleMousedown,
                      onClick:
                        this.handlePasswordToggleClick,
                    },
                    {
                      default: () =>
                        this.passwordVisible
                          ? dr(op, null)
                          : dr(rp, null),
                    }
                  )
                : null,
            ])
          : null
      ),
      this.pair
        ? dr(
            'span',
            { class: `${e}-input__separator` },
            Uo(this.$slots, 'separator', void 0, () => [
              this.separator,
            ])
          )
        : null,
      this.pair
        ? dr(
            'div',
            { class: `${e}-input-wrapper` },
            dr(
              'div',
              { class: `${e}-input__input` },
              dr('input', {
                ref: 'inputEl2Ref',
                type: this.type,
                class: `${e}-input__input-el`,
                tabindex:
                  this.passivelyActivated && !this.activated
                    ? -1
                    : void 0,
                placeholder: this.mergedPlaceholder[1],
                disabled: this.mergedDisabled,
                maxlength: this.maxlength,
                minlength: this.minlength,
                value: Array.isArray(this.mergedValue)
                  ? this.mergedValue[1]
                  : void 0,
                readonly: this.readonly,
                style: this.textDecorationStyle[1],
                onBlur: this.handleInputBlur,
                onFocus: this.handleInputFocus,
                onInput: (e) => this.handleInput(e, 1),
                onChange: (e) => this.handleChange(e, 1),
              }),
              this.showPlaceholder2
                ? dr(
                    'div',
                    { class: `${e}-input__placeholder` },
                    dr(
                      'span',
                      null,
                      this.mergedPlaceholder[1]
                    )
                  )
                : null
            ),
            dr('div', { class: `${e}-input__suffix` }, [
              this.clearable || this.$slots.clear
                ? dr(
                    $g,
                    {
                      clsPrefix: e,
                      show: this.showClearButton,
                      onClear: this.handleClear,
                    },
                    {
                      default: () =>
                        Uo(this.$slots, 'clear'),
                    }
                  )
                : null,
              Uo(this.$slots, 'suffix'),
            ])
          )
        : null,
      this.mergedBordered
        ? dr('div', { class: `${e}-input__border` })
        : null,
      this.mergedBordered
        ? dr('div', { class: `${e}-input__state-border` })
        : null,
      this.showCount && 'textarea' === this.type
        ? dr(Ig, null, { default: this.$slots.count })
        : null
    )
  },
})
function Ng(e) {
  return 'group' === e.type
}
function Wg(e) {
  return 'ignored' === e.type
}
const Vg = {
  getKey: function (e) {
    return Ng(e)
      ? e.name || e.key || 'key-required'
      : e.value
  },
  getIsGroup: Ng,
  getIgnored: Wg,
}
function qg(e, t) {
  try {
    return !!(
      1 +
      t
        .toString()
        .toLowerCase()
        .indexOf(e.trim().toLowerCase())
    )
  } catch (n) {
    return !1
  }
}
function Ug(e) {
  return bl(e, [255, 255, 255, 0.16])
}
function Gg(e) {
  return bl(e, [0, 0, 0, 0.12])
}
var Kg = {
  paddingTiny: '0 6px',
  paddingSmall: '0 10px',
  paddingMedium: '0 14px',
  paddingLarge: '0 18px',
  paddingRoundTiny: '0 10px',
  paddingRoundSmall: '0 14px',
  paddingRoundMedium: '0 18px',
  paddingRoundLarge: '0 22px',
  iconMarginTiny: '6px',
  iconMarginSmall: '6px',
  iconMarginMedium: '6px',
  iconMarginLarge: '6px',
  iconSizeTiny: '14px',
  iconSizeSmall: '18px',
  iconSizeMedium: '18px',
  iconSizeLarge: '20px',
  rippleDuration: '.6s',
}
const Yg = {
    name: 'Button',
    common: Bv,
    self: (e) => {
      const {
        heightTiny: t,
        heightSmall: n,
        heightMedium: o,
        heightLarge: r,
        borderRadius: i,
        fontSizeTiny: a,
        fontSizeSmall: l,
        fontSizeMedium: s,
        fontSizeLarge: c,
        opacityDisabled: u,
        textColor1: d,
        textColor2: f,
        textColor3: p,
        primaryColorHover: h,
        primaryColorPressed: v,
        borderColor: g,
        primaryColor: b,
        baseColor: m,
        infoColor: y,
        infoColorHover: x,
        infoColorPressed: w,
        successColor: C,
        successColorHover: S,
        successColorPressed: k,
        warningColor: $,
        warningColorHover: _,
        warningColorPressed: z,
        errorColor: P,
        errorColorHover: E,
        errorColorPressed: O,
        fontWeight: j,
      } = e
      return Object.assign(Object.assign({}, Kg), {
        heightTiny: t,
        heightSmall: n,
        heightMedium: o,
        heightLarge: r,
        borderRadiusTiny: i,
        borderRadiusSmall: i,
        borderRadiusMedium: i,
        borderRadiusLarge: i,
        fontSizeTiny: a,
        fontSizeSmall: l,
        fontSizeMedium: s,
        fontSizeLarge: c,
        opacityDisabled: u,
        color: '#0000',
        colorHover: '#0000',
        colorPressed: '#0000',
        colorFocus: '#0000',
        colorDisabled: '#0000',
        textColor: f,
        textColorHover: h,
        textColorPressed: v,
        textColorFocus: h,
        textColorDisabled: f,
        textColorText: f,
        textColorTextDepth1: d,
        textColorTextDepth2: f,
        textColorTextDepth3: p,
        textColorTextHover: h,
        textColorTextPressed: v,
        textColorTextFocus: h,
        textColorTextDisabled: f,
        textColorGhost: f,
        textColorGhostHover: h,
        textColorGhostPressed: v,
        textColorGhostFocus: h,
        textColorGhostDisabled: f,
        border: `1px solid ${g}`,
        borderHover: `1px solid ${h}`,
        borderPressed: `1px solid ${v}`,
        borderFocus: `1px solid ${h}`,
        borderDisabled: `1px solid ${g}`,
        rippleColor: b,
        colorPrimary: b,
        colorHoverPrimary: h,
        colorPressedPrimary: v,
        colorFocusPrimary: h,
        colorDisabledPrimary: b,
        textColorPrimary: m,
        textColorHoverPrimary: m,
        textColorPressedPrimary: m,
        textColorFocusPrimary: m,
        textColorDisabledPrimary: m,
        textColorTextPrimary: b,
        textColorTextHoverPrimary: h,
        textColorTextPressedPrimary: v,
        textColorTextFocusPrimary: h,
        textColorTextDisabledPrimary: f,
        textColorGhostPrimary: b,
        textColorGhostHoverPrimary: h,
        textColorGhostPressedPrimary: v,
        textColorGhostFocusPrimary: h,
        textColorGhostDisabledPrimary: b,
        borderPrimary: `1px solid ${b}`,
        borderHoverPrimary: `1px solid ${h}`,
        borderPressedPrimary: `1px solid ${v}`,
        borderFocusPrimary: `1px solid ${h}`,
        borderDisabledPrimary: `1px solid ${b}`,
        rippleColorPrimary: b,
        colorInfo: y,
        colorHoverInfo: x,
        colorPressedInfo: w,
        colorFocusInfo: x,
        colorDisabledInfo: y,
        textColorInfo: m,
        textColorHoverInfo: m,
        textColorPressedInfo: m,
        textColorFocusInfo: m,
        textColorDisabledInfo: m,
        textColorTextInfo: y,
        textColorTextHoverInfo: x,
        textColorTextPressedInfo: w,
        textColorTextFocusInfo: x,
        textColorTextDisabledInfo: f,
        textColorGhostInfo: y,
        textColorGhostHoverInfo: x,
        textColorGhostPressedInfo: w,
        textColorGhostFocusInfo: x,
        textColorGhostDisabledInfo: y,
        borderInfo: `1px solid ${y}`,
        borderHoverInfo: `1px solid ${x}`,
        borderPressedInfo: `1px solid ${w}`,
        borderFocusInfo: `1px solid ${x}`,
        borderDisabledInfo: `1px solid ${y}`,
        rippleColorInfo: y,
        colorSuccess: C,
        colorHoverSuccess: S,
        colorPressedSuccess: k,
        colorFocusSuccess: S,
        colorDisabledSuccess: C,
        textColorSuccess: m,
        textColorHoverSuccess: m,
        textColorPressedSuccess: m,
        textColorFocusSuccess: m,
        textColorDisabledSuccess: m,
        textColorTextSuccess: C,
        textColorTextHoverSuccess: S,
        textColorTextPressedSuccess: k,
        textColorTextFocusSuccess: S,
        textColorTextDisabledSuccess: f,
        textColorGhostSuccess: C,
        textColorGhostHoverSuccess: S,
        textColorGhostPressedSuccess: k,
        textColorGhostFocusSuccess: S,
        textColorGhostDisabledSuccess: C,
        borderSuccess: `1px solid ${C}`,
        borderHoverSuccess: `1px solid ${S}`,
        borderPressedSuccess: `1px solid ${k}`,
        borderFocusSuccess: `1px solid ${S}`,
        borderDisabledSuccess: `1px solid ${C}`,
        rippleColorSuccess: C,
        colorWarning: $,
        colorHoverWarning: _,
        colorPressedWarning: z,
        colorFocusWarning: _,
        colorDisabledWarning: $,
        textColorWarning: m,
        textColorHoverWarning: m,
        textColorPressedWarning: m,
        textColorFocusWarning: m,
        textColorDisabledWarning: m,
        textColorTextWarning: $,
        textColorTextHoverWarning: _,
        textColorTextPressedWarning: z,
        textColorTextFocusWarning: _,
        textColorTextDisabledWarning: f,
        textColorGhostWarning: $,
        textColorGhostHoverWarning: _,
        textColorGhostPressedWarning: z,
        textColorGhostFocusWarning: _,
        textColorGhostDisabledWarning: $,
        borderWarning: `1px solid ${$}`,
        borderHoverWarning: `1px solid ${_}`,
        borderPressedWarning: `1px solid ${z}`,
        borderFocusWarning: `1px solid ${_}`,
        borderDisabledWarning: `1px solid ${$}`,
        rippleColorWarning: $,
        colorError: P,
        colorHoverError: E,
        colorPressedError: O,
        colorFocusError: E,
        colorDisabledError: P,
        textColorError: m,
        textColorHoverError: m,
        textColorPressedError: m,
        textColorFocusError: m,
        textColorDisabledError: m,
        textColorTextError: P,
        textColorTextHoverError: E,
        textColorTextPressedError: O,
        textColorTextFocusError: E,
        textColorTextDisabledError: f,
        textColorGhostError: P,
        textColorGhostHoverError: E,
        textColorGhostPressedError: O,
        textColorGhostFocusError: E,
        textColorGhostDisabledError: P,
        borderError: `1px solid ${P}`,
        borderHoverError: `1px solid ${E}`,
        borderPressedError: `1px solid ${O}`,
        borderFocusError: `1px solid ${E}`,
        borderDisabledError: `1px solid ${P}`,
        rippleColorError: P,
        waveOpacity: '0.6',
        fontWeightText: j,
        fontWeight: j,
        fontWeighGhost: j,
      })
    },
  },
  Xg = '0!important',
  Zg = '-1px!important'
function Jg(e) {
  return Xd(e + '-type', [
    Ud('& +', [
      Kd('button', {}, [
        Xd(e + '-type', [
          Yd('border', { borderLeftWidth: Xg }),
          Yd('state-border', { left: Zg }),
        ]),
      ]),
    ]),
  ])
}
function Qg(e) {
  return Xd(e + '-type', [
    Ud('& +', [
      Kd('button', [
        Xd(e + '-type', [
          Yd('border', { borderTopWidth: Xg }),
          Yd('state-border', { top: Zg }),
        ]),
      ]),
    ]),
  ])
}
var eb = Kd(
  'button-group',
  '\n flex-wrap: nowrap;\n display: inline-flex;\n position: relative;\n',
  [
    Zd('vertical', { flexDirection: 'row' }, [
      Kd('button', [
        Ud(
          '&:first-child:not(:last-child)',
          `\n margin-right: ${Xg};\n border-top-right-radius: ${Xg};\n border-bottom-right-radius: ${Xg};\n `
        ),
        Ud(
          '&:last-child:not(:first-child)',
          `\n margin-left: ${Xg};\n border-top-left-radius: ${Xg};\n border-bottom-left-radius: ${Xg};\n `
        ),
        Ud(
          '&:not(:first-child):not(:last-child)',
          `\n margin-left: ${Xg};\n margin-right: ${Xg};\n border-radius: ${Xg};\n `
        ),
        Jg('default'),
        Xd('ghost', [
          Jg('primary'),
          Jg('info'),
          Jg('success'),
          Jg('warning'),
          Jg('error'),
        ]),
      ]),
    ]),
    Xd('vertical', { flexDirection: 'column' }, [
      Kd('button', [
        Ud(
          '&:first-child:not(:last-child)',
          `\n margin-bottom: ${Xg};\n margin-left: ${Xg};\n margin-right: ${Xg};\n border-bottom-left-radius: ${Xg};\n border-bottom-right-radius: ${Xg};\n `
        ),
        Ud(
          '&:last-child:not(:first-child)',
          `\n margin-top: ${Xg};\n margin-left: ${Xg};\n margin-right: ${Xg};\n border-top-left-radius: ${Xg};\n border-top-right-radius: ${Xg};\n `
        ),
        Ud(
          '&:not(:first-child):not(:last-child)',
          `\n margin: ${Xg};\n border-radius: ${Xg};\n `
        ),
        Qg('default'),
        Xd('ghost', [
          Qg('primary'),
          Qg('info'),
          Qg('success'),
          Qg('warning'),
          Qg('error'),
        ]),
      ]),
    ]),
  ]
)
const tb = Symbol('button-group')
dn({
  name: 'ButtonGroup',
  props: {
    size: { type: String, default: void 0 },
    vertical: Boolean,
  },
  setup(e) {
    const { mergedClsPrefixRef: t } = If(e)
    return (
      Jf('ButtonGroup', eb, t),
      Ut(tb, e),
      { mergedClsPrefix: t }
    )
  },
  render() {
    const { mergedClsPrefix: e } = this
    return dr(
      'div',
      {
        class: [
          `${e}-button-group`,
          this.vertical && `${e}-button-group--vertical`,
        ],
        role: 'group',
      },
      this.$slots
    )
  },
})
var nb = Ud([
  Kd(
    'button',
    '\n font-weight: var(--font-weight);\n line-height: 1;\n font-family: inherit;\n padding: var(--padding);\n height: var(--height);\n font-size: var(--font-size);\n border-radius: var(--border-radius);\n color: var(--text-color);\n background-color: var(--color);\n width: var(--width);\n white-space: nowrap;\n outline: none;\n position: relative;\n z-index: auto;\n border: none;\n display: inline-flex;\n flex-wrap: nowrap;\n align-items: center;\n justify-content: center;\n user-select: none;\n text-align: center;\n cursor: pointer;\n text-decoration: none;\n transition:\n color .3s var(--bezier),\n background-color .3s var(--bezier),\n opacity .3s var(--bezier),\n border-color .3s var(--bezier);\n ',
    [
      Xd('color', [
        Yd('border', {
          borderColor: 'var(--border-color)',
        }),
        Xd('disabled', [
          Yd('border', {
            borderColor: 'var(--border-color-disabled)',
          }),
        ]),
        Zd('disabled', [
          Ud('&:focus', [
            Yd('state-border', {
              borderColor: 'var(--border-color-focus)',
            }),
          ]),
          Ud('&:hover', [
            Yd('state-border', {
              borderColor: 'var(--border-color-hover)',
            }),
          ]),
          Ud('&:active', [
            Yd('state-border', {
              borderColor: 'var(--border-color-pressed)',
            }),
          ]),
          Xd('pressed', [
            Yd('state-border', {
              borderColor: 'var(--border-color-pressed)',
            }),
          ]),
        ]),
      ]),
      Xd(
        'disabled',
        {
          backgroundColor: 'var(--color-disabled)',
          color: 'var(--text-color-disabled)',
        },
        [Yd('border', { border: 'var(--border-disabled)' })]
      ),
      Zd('disabled', [
        Ud(
          '&:focus',
          {
            backgroundColor: 'var(--color-focus)',
            color: 'var(--text-color-focus)',
          },
          [
            Yd('state-border', {
              border: 'var(--border-focus)',
            }),
          ]
        ),
        Ud(
          '&:hover',
          {
            backgroundColor: 'var(--color-hover)',
            color: 'var(--text-color-hover)',
          },
          [
            Yd('state-border', {
              border: 'var(--border-hover)',
            }),
          ]
        ),
        Ud(
          '&:active',
          {
            backgroundColor: 'var(--color-pressed)',
            color: 'var(--text-color-pressed)',
          },
          [
            Yd('state-border', {
              border: 'var(--border-pressed)',
            }),
          ]
        ),
        Xd(
          'pressed',
          {
            backgroundColor: 'var(--color-pressed)',
            color: 'var(--text-color-pressed)',
          },
          [
            Yd('state-border', {
              border: 'var(--border-pressed)',
            }),
          ]
        ),
      ]),
      Kd(
        'base-wave',
        '\n pointer-events: none;\n top: 0;\n right: 0;\n bottom: 0;\n left: 0;\n animation-iteration-count: 1;\n animation-duration: var(--ripple-duration);\n animation-timing-function: var(--bezier-ease-out), var(--bezier-ease-out);\n ',
        [
          Xd('active', {
            zIndex: 1,
            animationName:
              'button-wave-spread, button-wave-opacity',
          }),
        ]
      ),
      'undefined' != typeof window &&
      'MozBoxSizing' in document.createElement('div').style
        ? Ud('&::moz-focus-inner', { border: 0 })
        : null,
      Yd(
        'border, state-border',
        '\n position: absolute;\n left: 0;\n top: 0;\n right: 0;\n bottom: 0;\n border-radius: inherit;\n transition: border-color .3s var(--bezier);\n pointer-events: none;\n '
      ),
      Yd('border', { border: 'var(--border)' }),
      Yd('state-border', {
        border: 'var(--border)',
        borderColor: '#0000',
        zIndex: 1,
      }),
      Yd(
        'icon',
        '\n margin: var(--icon-margin);\n margin-left: 0;\n height: var(--icon-size);\n width: var(--icon-size);\n max-width: var(--icon-size);\n font-size: var(--icon-size);\n position: relative;\n flex-shrink: 0;\n ',
        [
          Kd(
            'icon-slot',
            '\n height: var(--icon-size);\n width: var(--icon-size);\n position: absolute;\n left: 0;\n top: 50%;\n transform: translateY(-50%);\n display: flex;\n ',
            [
              yp({
                top: '50%',
                originalTransform: 'translateY(-50%)',
              }),
            ]
          ),
          (function ({
            duration: e = '.2s',
            delay: t = '.1s',
          } = {}) {
            return [
              Ud(
                '&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to',
                { opacity: 1 }
              ),
              Ud(
                '&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from',
                '\n opacity: 0!important;\n margin-left: 0!important;\n margin-right: 0!important;\n '
              ),
              Ud(
                '&.fade-in-width-expand-transition-leave-active',
                `\n overflow: hidden;\n transition:\n opacity ${e} ${jg},\n max-width ${e} ${jg} ${t},\n margin-left ${e} ${jg} ${t},\n margin-right ${e} ${jg} ${t};\n `
              ),
              Ud(
                '&.fade-in-width-expand-transition-enter-active',
                `\n overflow: hidden;\n transition:\n opacity ${e} ${jg} ${t},\n max-width ${e} ${jg},\n margin-left ${e} ${jg},\n margin-right ${e} ${jg};\n `
              ),
            ]
          })(),
        ]
      ),
      Yd(
        'content',
        '\n display: flex;\n align-items: center;\n flex-wrap: nowrap;\n ',
        [
          Ud('~', [
            Yd('icon', {
              margin: 'var(--icon-margin)',
              marginRight: 0,
            }),
          ]),
        ]
      ),
      Xd('block', '\n display: flex;\n width: 100%;\n '),
      Xd('dashed', [
        Yd('border, state-border', {
          borderStyle: 'dashed !important',
        }),
      ]),
      Xd('disabled', {
        cursor: 'not-allowed',
        opacity: 'var(--opacity-disabled)',
      }),
    ]
  ),
  Ud('@keyframes button-wave-spread', {
    from: { boxShadow: '0 0 0.5px 0 var(--ripple-color)' },
    to: {
      boxShadow: '0 0 0.5px 4.5px var(--ripple-color)',
    },
  }),
  Ud('@keyframes button-wave-opacity', {
    from: { opacity: 'var(--wave-opacity)' },
    to: { opacity: 0 },
  }),
])
const ob = dn({
  name: 'Button',
  props: Object.assign(Object.assign({}, Bf.props), {
    color: String,
    textColor: String,
    text: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    circle: Boolean,
    size: String,
    ghost: Boolean,
    round: Boolean,
    depth: [Number, String],
    focusable: { type: Boolean, default: !0 },
    keyboard: { type: Boolean, default: !0 },
    tag: { type: String, default: 'button' },
    type: { type: String, default: 'default' },
    dashed: Boolean,
    iconPlacement: { type: String, default: 'left' },
    attrType: { type: String, default: 'button' },
    onClick: [Function, Array],
    bordered: { type: Boolean, default: !0 },
  }),
  setup(e) {
    const t = nt(null),
      n = nt(null),
      o = nt(!1),
      r = of(
        () =>
          !e.text &&
          (!e.color || e.ghost || e.dashed) &&
          e.bordered
      ),
      i = Gt(tb, {}),
      { mergedSizeRef: a } = kl(
        {},
        {
          defaultSize: 'medium',
          mergedSize: (t) => {
            const { size: n } = e
            if (n) return n
            const { size: o } = i
            if (o) return o
            const { mergedSize: r } = t || {}
            return r ? r.value : 'medium'
          },
        }
      ),
      l = ur(() => e.focusable && !e.disabled),
      { mergedClsPrefixRef: s, NConfigProvider: c } = If(e),
      u = Bf('Button', 'Button', nb, Yg, e, s),
      d = Cg(
        'Button',
        null == c ? void 0 : c.mergedRtlRef,
        s
      )
    return {
      selfRef: t,
      waveRef: n,
      mergedClsPrefix: s,
      mergedFocusable: l,
      mergedSize: a,
      showBorder: r,
      enterPressed: o,
      rtlEnabled: d,
      handleMouseDown: (n) => {
        var o
        n.preventDefault(),
          e.disabled ||
            (l.value &&
              (null === (o = t.value) ||
                void 0 === o ||
                o.focus({ preventScroll: !0 })))
      },
      handleKeyDown: (t) => {
        switch (t.code) {
          case 'Enter':
          case 'NumpadEnter':
            if (!e.keyboard) return
            t.preventDefault(), (o.value = !0)
        }
      },
      handleBlur: () => {
        o.value = !1
      },
      handleKeyUp: (n) => {
        switch (n.code) {
          case 'Enter':
          case 'NumpadEnter':
            if (!e.keyboard) return void n.preventDefault()
            ;(o.value = !1),
              zt(() => {
                var n
                e.disabled ||
                  null === (n = t.value) ||
                  void 0 === n ||
                  n.click()
              })
        }
      },
      handleClick: (t) => {
        if (!e.disabled) {
          const { onClick: o } = e
          if ((o && xf(o, t), !e.text)) {
            const { value: e } = n
            e && e.play()
          }
        }
      },
      customColorCssVars: ur(() => {
        const { color: t } = e
        if (!t) return null
        const n = Ug(t)
        return {
          '--border-color': t,
          '--border-color-hover': n,
          '--border-color-pressed': Gg(t),
          '--border-color-focus': n,
          '--border-color-disabled': t,
        }
      }),
      cssVars: ur(() => {
        const t = u.value,
          {
            common: {
              cubicBezierEaseInOut: n,
              cubicBezierEaseOut: o,
            },
            self: r,
          } = t,
          {
            rippleDuration: i,
            opacityDisabled: l,
            fontWeightText: s,
            fontWeighGhost: c,
            fontWeight: d,
          } = r,
          f = a.value,
          {
            dashed: p,
            type: h,
            ghost: v,
            text: g,
            color: b,
            round: m,
            circle: y,
            textColor: x,
          } = e,
          w = { fontWeight: g ? s : v ? c : d }
        let C = {
          '--color': 'initial',
          '--color-hover': 'initial',
          '--color-pressed': 'initial',
          '--color-focus': 'initial',
          '--color-disabled': 'initial',
          '--ripple-color': 'initial',
          '--text-color': 'initial',
          '--text-color-hover': 'initial',
          '--text-color-pressed': 'initial',
          '--text-color-focus': 'initial',
          '--text-color-disabled': 'initial',
        }
        if (g) {
          const { depth: t } = e,
            n = x || b
          C = {
            '--color': '#0000',
            '--color-hover': '#0000',
            '--color-pressed': '#0000',
            '--color-focus': '#0000',
            '--color-disabled': '#0000',
            '--ripple-color': '#0000',
            '--text-color':
              n ||
              ('default' === h && void 0 !== t
                ? r[Wd('textColorTextDepth', String(t))]
                : r[Wd('textColorText', h)]),
            '--text-color-hover': n
              ? Ug(n)
              : r[Wd('textColorTextHover', h)],
            '--text-color-pressed': n
              ? Gg(n)
              : r[Wd('textColorTextPressed', h)],
            '--text-color-focus': n
              ? Ug(n)
              : r[Wd('textColorTextHover', h)],
            '--text-color-disabled':
              n || r[Wd('textColorTextDisabled', h)],
          }
        } else if (v || p) {
          const e = x || b
          C = {
            '--color': '#0000',
            '--color-hover': '#0000',
            '--color-pressed': '#0000',
            '--color-focus': '#0000',
            '--color-disabled': '#0000',
            '--ripple-color': b || r[Wd('rippleColor', h)],
            '--text-color': e || r[Wd('textColorGhost', h)],
            '--text-color-hover': e
              ? Ug(e)
              : r[Wd('textColorGhostHover', h)],
            '--text-color-pressed': e
              ? Gg(e)
              : r[Wd('textColorGhostPressed', h)],
            '--text-color-focus': e
              ? Ug(e)
              : r[Wd('textColorGhostHover', h)],
            '--text-color-disabled':
              e || r[Wd('textColorGhostDisabled', h)],
          }
        } else
          C = {
            '--color': b || r[Wd('color', h)],
            '--color-hover': b
              ? Ug(b)
              : r[Wd('colorHover', h)],
            '--color-pressed': b
              ? Gg(b)
              : r[Wd('colorPressed', h)],
            '--color-focus': b
              ? Ug(b)
              : r[Wd('colorFocus', h)],
            '--color-disabled':
              b || r[Wd('colorDisabled', h)],
            '--ripple-color': b || r[Wd('rippleColor', h)],
            '--text-color':
              x ||
              (b
                ? r.textColorPrimary
                : r[Wd('textColor', h)]),
            '--text-color-hover':
              x ||
              (b
                ? r.textColorHoverPrimary
                : r[Wd('textColorHover', h)]),
            '--text-color-pressed':
              x ||
              (b
                ? r.textColorPressedPrimary
                : r[Wd('textColorPressed', h)]),
            '--text-color-focus':
              x ||
              (b
                ? r.textColorFocusPrimary
                : r[Wd('textColorFocus', h)]),
            '--text-color-disabled':
              x ||
              (b
                ? r.textColorDisabledPrimary
                : r[Wd('textColorDisabled', h)]),
          }
        let S = {
          '--border': 'initial',
          '--border-hover': 'initial',
          '--border-pressed': 'initial',
          '--border-focus': 'initial',
          '--border-disabled': 'initial',
        }
        S = g
          ? {
              '--border': 'none',
              '--border-hover': 'none',
              '--border-pressed': 'none',
              '--border-focus': 'none',
              '--border-disabled': 'none',
            }
          : {
              '--border': r[Wd('border', h)],
              '--border-hover': r[Wd('borderHover', h)],
              '--border-pressed': r[Wd('borderPressed', h)],
              '--border-focus': r[Wd('borderFocus', h)],
              '--border-disabled':
                r[Wd('borderDisabled', h)],
            }
        const {
            [Wd('height', f)]: k,
            [Wd('fontSize', f)]: $,
            [Wd('padding', f)]: _,
            [Wd('paddingRound', f)]: z,
            [Wd('iconSize', f)]: P,
            [Wd('borderRadius', f)]: E,
            [Wd('iconMargin', f)]: O,
            waveOpacity: j,
          } = r,
          T = {
            '--width': y && !g ? k : 'initial',
            '--height': g ? 'initial' : k,
            '--font-size': $,
            '--padding': y || g ? 'initial' : m ? z : _,
            '--icon-size': P,
            '--icon-margin': O,
            '--border-radius': g
              ? 'initial'
              : y || m
              ? k
              : E,
          }
        return Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                {
                  '--bezier': n,
                  '--bezier-ease-out': o,
                  '--ripple-duration': i,
                  '--opacity-disabled': l,
                  '--wave-opacity': j,
                },
                w
              ),
              C
            ),
            S
          ),
          T
        )
      }),
    }
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, tag: n } = this
    return dr(
      n,
      {
        ref: 'selfRef',
        class: [
          `${t}-button`,
          `${t}-button--${this.type}-type`,
          `${t}-button--${this.mergedSize}-type`,
          this.rtlEnabled && `${t}-button--rtl`,
          this.disabled && `${t}-button--disabled`,
          this.block && `${t}-button--block`,
          this.enterPressed && `${t}-button--pressed`,
          !this.text &&
            this.dashed &&
            `${t}-button--dashed`,
          this.color && `${t}-button--color`,
          this.ghost && `${t}-button--ghost`,
        ],
        tabindex: this.mergedFocusable ? 0 : -1,
        type: this.attrType,
        style: this.cssVars,
        disabled: this.disabled,
        onClick: this.handleClick,
        onBlur: this.handleBlur,
        onMousedown: this.handleMouseDown,
        onKeyup: this.handleKeyUp,
        onKeydown: this.handleKeyDown,
      },
      e.default && 'right' === this.iconPlacement
        ? dr('div', { class: `${t}-button__content` }, e)
        : null,
      dr(
        pp,
        { width: !0 },
        {
          default: () =>
            e.icon || this.loading
              ? dr(
                  'span',
                  {
                    class: `${t}-button__icon`,
                    style: { margin: e.default ? '' : 0 },
                  },
                  dr(fp, null, {
                    default: () =>
                      this.loading
                        ? dr(wp, {
                            clsPrefix: t,
                            key: 'loading',
                            class: `${t}-icon-slot`,
                            strokeWidth: 20,
                          })
                        : dr(
                            'div',
                            {
                              key: 'icon',
                              class: `${t}-icon-slot`,
                              role: 'none',
                            },
                            Uo(e, 'icon')
                          ),
                  })
                )
              : null,
        }
      ),
      e.default && 'left' === this.iconPlacement
        ? dr('span', { class: `${t}-button__content` }, e)
        : null,
      this.text
        ? null
        : dr(rg, { ref: 'waveRef', clsPrefix: t }),
      this.showBorder
        ? dr('div', {
            'aria-hidden': !0,
            class: `${t}-button__border`,
            style: this.customColorCssVars,
          })
        : null,
      this.showBorder
        ? dr('div', {
            'aria-hidden': !0,
            class: `${t}-button__state-border`,
            style: this.customColorCssVars,
          })
        : null
    )
  },
})
const rb = {
  name: 'Select',
  common: Bv,
  peers: { InternalSelection: Pg, InternalSelectMenu: tg },
  self: function (e) {
    const { boxShadow2: t } = e
    return { menuBoxShadow: t }
  },
}
var ib = Ud([
  Kd(
    'select',
    '\n z-index: auto;\n outline: none;\n width: 100%;\n position: relative;\n '
  ),
  Kd(
    'select-menu',
    '\n margin: 4px 0;\n box-shadow: var(--menu-box-shadow);\n ',
    [Jv()]
  ),
])
var ab = dn({
    name: 'Select',
    props: Object.assign(Object.assign({}, Bf.props), {
      to: Mf.propTo,
      bordered: { type: Boolean, default: void 0 },
      clearable: Boolean,
      options: { type: Array, default: () => [] },
      defaultValue: {
        type: [String, Number, Array],
        default: null,
      },
      value: [String, Number, Array],
      placeholder: String,
      multiple: Boolean,
      size: String,
      filterable: Boolean,
      disabled: { type: Boolean, default: void 0 },
      remote: Boolean,
      loading: Boolean,
      filter: {
        type: Function,
        default: function (e, t) {
          return (
            !!t &&
            ('string' == typeof t.label
              ? qg(e, t.label)
              : void 0 !== t.value &&
                qg(e, String(t.value)))
          )
        },
      },
      placement: { type: String, default: 'bottom-start' },
      widthMode: { type: String, default: 'trigger' },
      tag: Boolean,
      onCreate: {
        type: Function,
        default: (e) => ({ label: e, value: e }),
      },
      fallbackOption: {
        type: [Function, Boolean],
        default: () => (e) => ({
          label: String(e),
          value: e,
        }),
      },
      show: { type: Boolean, default: void 0 },
      showArrow: { type: Boolean, default: !0 },
      maxTagCount: [Number, String],
      consistentMenuWidth: { type: Boolean, default: !0 },
      virtualScroll: { type: Boolean, default: !0 },
      renderLabel: Function,
      renderOption: Function,
      renderTag: Function,
      'onUpdate:value': [Function, Array],
      inputProps: Object,
      onUpdateValue: [Function, Array],
      onBlur: [Function, Array],
      onClear: [Function, Array],
      onFocus: [Function, Array],
      onScroll: [Function, Array],
      onSearch: [Function, Array],
      onUpdateShow: [Function, Array],
      'onUpdate:show': [Function, Array],
      onChange: {
        type: [Function, Array],
        validator: () => !0,
        default: void 0,
      },
      items: {
        type: Array,
        validator: () => !0,
        default: void 0,
      },
      displayDirective: { type: String, default: 'show' },
    }),
    setup(e) {
      const {
          mergedClsPrefixRef: t,
          mergedBorderedRef: n,
          namespaceRef: o,
        } = If(e),
        r = Bf('Select', 'Select', ib, rb, e, t),
        i = nt(e.defaultValue),
        a = hf(ct(e, 'value'), i),
        l = nt(!1),
        s = nt(''),
        c = ur(() => Vp(k.value, Vg)),
        u = ur(() =>
          (function (e) {
            const t = new Map()
            return (
              e.forEach((e) => {
                Ng(e)
                  ? e.children.forEach((e) => {
                      t.set(e.value, e)
                    })
                  : t.set(e.value, e)
              }),
              t
            )
          })(e.options)
        ),
        d = nt(!1),
        f = hf(ct(e, 'show'), d),
        p = nt(null),
        h = nt(null),
        v = nt(null),
        { localeRef: g } = Zf('Select'),
        b = ur(() => {
          var t
          return null !== (t = e.placeholder) &&
            void 0 !== t
            ? t
            : g.value.placeholder
        }),
        m = gf(e, ['items', 'options']),
        y = nt([]),
        x = nt([]),
        w = nt(new Map()),
        C = ur(() => {
          const { fallbackOption: t } = e
          return (
            !!t &&
            ((e) => Object.assign(t(e), { value: e }))
          )
        }),
        S = ur(() =>
          x.value.concat(y.value).concat(m.value)
        ),
        k = ur(() => {
          if (e.remote) return m.value
          {
            const { value: t } = S,
              { value: n } = s
            if (n.length && e.filterable) {
              const { filter: o } = e
              return (function (e, t, n) {
                return t
                  ? (function e(o) {
                      if (!Array.isArray(o)) return []
                      const r = []
                      for (const i of o)
                        if (Ng(i)) {
                          const t = e(i.children)
                          t.length &&
                            r.push(
                              Object.assign({}, i, {
                                children: t,
                              })
                            )
                        } else {
                          if (Wg(i)) continue
                          t(n, i) && r.push(i)
                        }
                      return r
                    })(e)
                  : e
              })(t, o, n)
            }
            return t
          }
        })
      function $(t) {
        const n = e.remote,
          { value: o } = w,
          { value: r } = u,
          { value: i } = C,
          a = []
        return (
          t.forEach((e) => {
            if (r.has(e)) a.push(r.get(e))
            else if (n && o.has(e)) a.push(o.get(e))
            else if (i) {
              const t = i(e)
              t && a.push(t)
            }
          }),
          a
        )
      }
      const _ = ur(() => {
          if (e.multiple) {
            const { value: e } = a
            return Array.isArray(e) ? $(e) : []
          }
          return null
        }),
        z = ur(() => {
          const { value: t } = a
          return e.multiple ||
            Array.isArray(t) ||
            null === t
            ? null
            : $([t])[0] || null
        }),
        P = kl(e),
        { mergedSizeRef: E, mergedDisabledRef: O } = P
      function j(t, n) {
        const {
            onChange: o,
            'onUpdate:value': r,
            onUpdateValue: a,
          } = e,
          { nTriggerFormChange: l, nTriggerFormInput: s } =
            P
        o && xf(o, t, n),
          a && xf(a, t, n),
          r && xf(r, t, n),
          (i.value = t),
          l(),
          s()
      }
      function T(t) {
        const { onBlur: n } = e,
          { nTriggerFormBlur: o } = P
        n && xf(n, t), o()
      }
      function A() {
        var t
        const { remote: n, multiple: o } = e
        if (n) {
          const { value: e } = w
          if (o)
            null === (t = _.value) ||
              void 0 === t ||
              t.forEach((t) => {
                e.set(t.value, t)
              })
          else {
            const t = z.value
            t && e.set(t.value, t)
          }
        }
      }
      function M(t) {
        const { onUpdateShow: n, 'onUpdate:show': o } = e
        n && xf(n, t), o && xf(o, t), (d.value = t)
      }
      function F() {
        O.value ||
          ((s.value = ''),
          M(!0),
          (d.value = !0),
          e.filterable &&
            (function () {
              var e
              null === (e = p.value) ||
                void 0 === e ||
                e.focusInput()
            })())
      }
      function R() {
        M(!1)
      }
      function B(e) {
        L(e.rawNode)
      }
      function L(t) {
        if (O.value) return
        const { tag: n, remote: o } = e
        if (n && !o) {
          const { value: e } = x,
            t = e[0] || null
          t && (y.value.push(t), (x.value = []))
        }
        if ((o && w.value.set(t.value, t), e.multiple)) {
          const r = (function (t) {
              if (!Array.isArray(t)) return []
              if (C.value) return Array.from(t)
              {
                const { remote: n } = e,
                  { value: o } = u
                if (n) {
                  const { value: e } = w
                  return t.filter(
                    (t) => o.has(t) || e.has(t)
                  )
                }
                return t.filter((e) => o.has(e))
              }
            })(a.value),
            i = r.findIndex((e) => e === t.value)
          if (~i) {
            if ((r.splice(i, 1), n && !o)) {
              const e = I(t.value)
              ~e && (y.value.splice(e, 1), (s.value = ''))
            }
          } else r.push(t.value), (s.value = '')
          j(r, $(r))
        } else {
          if (n && !o) {
            const e = I(t.value)
            y.value = ~e ? [y.value[e]] : []
          }
          N(), R(), j(t.value, t)
        }
      }
      function I(e) {
        return y.value.findIndex((t) => t.value === e)
      }
      function D(t) {
        var n, o, r, i
        switch (t.code) {
          case 'Space':
            if (e.filterable) break
          case 'Enter':
          case 'NumpadEnter':
            if (f.value) {
              const t =
                null === (n = v.value) || void 0 === n
                  ? void 0
                  : n.getPendingTmNode()
              t ? B(t) : e.filterable || (R(), N())
            } else F()
            t.preventDefault()
            break
          case 'ArrowUp':
            if (e.loading) return
            f.value &&
              (null === (o = v.value) ||
                void 0 === o ||
                o.prev())
            break
          case 'ArrowDown':
            if (e.loading) return
            f.value
              ? null === (r = v.value) ||
                void 0 === r ||
                r.next()
              : F()
            break
          case 'Escape':
            R(),
              null === (i = p.value) ||
                void 0 === i ||
                i.focus()
        }
      }
      function H(t) {
        switch (t.code) {
          case 'Space':
            e.filterable || t.preventDefault()
            break
          case 'ArrowUp':
          case 'ArrowDown':
            t.preventDefault()
        }
      }
      function N() {
        var e
        null === (e = p.value) || void 0 === e || e.focus()
      }
      function W() {
        var e
        null === (e = h.value) ||
          void 0 === e ||
          e.syncPosition()
      }
      return (
        A(),
        Xt(ct(e, 'options'), A),
        Xt(k, () => {
          f.value && zt(W)
        }),
        Xt(a, () => {
          f.value && zt(W)
        }),
        {
          mergedClsPrefix: t,
          mergedBordered: n,
          namespace: o,
          treeMate: c,
          isMounted: vf(),
          triggerRef: p,
          menuRef: v,
          pattern: s,
          uncontrolledShow: d,
          mergedShow: f,
          adjustedTo: Mf(e),
          uncontrolledValue: i,
          mergedValue: a,
          followerRef: h,
          localizedPlaceholder: b,
          selectedOption: z,
          selectedOptions: _,
          mergedSize: E,
          mergedDisabled: O,
          focused: l,
          handleMenuFocus: function (e) {
            l.value = !0
          },
          handleMenuBlur: function (e) {
            var t
            ;(null === (t = p.value) || void 0 === t
              ? void 0
              : t.$el.contains(e.relatedTarget)) ||
              ((l.value = !1), T(e), R())
          },
          handleMenuTabOut: function () {
            var e
            null === (e = p.value) ||
              void 0 === e ||
              e.focus(),
              R()
          },
          handleTriggerClick: function () {
            O.value || (f.value ? e.filterable || R() : F())
          },
          handleToggle: B,
          handleDeleteOption: L,
          handlePatternInput: function (t) {
            f.value || F()
            const { value: n } = t.target
            s.value = n
            const { tag: o, remote: r } = e
            if (
              ((function (t) {
                const { onSearch: n } = e
                n && xf(n, t)
              })(n),
              o && !r)
            ) {
              if (!n) return void (x.value = [])
              const t = e.onCreate(n)
              m.value.some((e) => e.value === t.value) ||
              y.value.some((e) => e.value === t.value)
                ? (x.value = [])
                : (x.value = [t])
            }
          },
          handleClear: function (t) {
            t.stopPropagation()
            const { multiple: n } = e
            !n && e.filterable && R(),
              (function () {
                const { onClear: t } = e
                t && xf(t)
              })(),
              n ? j([], []) : j(null, null)
          },
          handleTriggerBlur: function (e) {
            var t, n
            ;(null ===
              (n =
                null === (t = v.value) || void 0 === t
                  ? void 0
                  : t.selfRef) || void 0 === n
              ? void 0
              : n.contains(e.relatedTarget)) ||
              ((l.value = !1), T(e), R())
          },
          handleTriggerFocus: function (t) {
            !(function (t) {
              const { onFocus: n } = e,
                { nTriggerFormFocus: o } = P
              n && xf(n, t), o()
            })(t),
              (l.value = !0)
          },
          handleKeyDown: H,
          handleKeyUp: D,
          syncPosition: W,
          handleMenuLeave: function () {
            s.value = ''
          },
          handleMenuClickOutside: function (e) {
            var t
            f.value &&
              ((null === (t = p.value) || void 0 === t
                ? void 0
                : t.$el.contains(e.target)) ||
                R())
          },
          handleMenuScroll: function (t) {
            !(function (t) {
              const { onScroll: n } = e
              n && xf(n, t)
            })(t)
          },
          handleMenuKeyup: D,
          handleMenuKeydown: H,
          handleMenuMousedown: function (e) {
            Qa(e, 'action') || e.preventDefault()
          },
          mergedTheme: r,
          cssVars: ur(() => {
            const {
              self: { menuBoxShadow: e },
            } = r.value
            return { '--menu-box-shadow': e }
          }),
        }
      )
    },
    render() {
      const { $slots: e, mergedClsPrefix: t } = this
      return dr(
        'div',
        { class: `${t}-select` },
        dr(Zp, null, {
          default: () => [
            dr(Jp, null, {
              default: () =>
                dr(Og, {
                  ref: 'triggerRef',
                  inputProps: this.inputProps,
                  clsPrefix: t,
                  showArrow: this.showArrow,
                  maxTagCount: this.maxTagCount,
                  bordered: this.mergedBordered,
                  active: this.mergedShow,
                  pattern: this.pattern,
                  placeholder: this.localizedPlaceholder,
                  selectedOption: this.selectedOption,
                  selectedOptions: this.selectedOptions,
                  multiple: this.multiple,
                  renderTag: this.renderTag,
                  renderLabel: this.renderLabel,
                  filterable: this.filterable,
                  clearable: this.clearable,
                  disabled: this.mergedDisabled,
                  size: this.mergedSize,
                  theme:
                    this.mergedTheme.peers
                      .InternalSelection,
                  themeOverrides:
                    this.mergedTheme.peerOverrides
                      .InternalSelection,
                  loading: this.loading,
                  focused: this.focused,
                  onClick: this.handleTriggerClick,
                  onDeleteOption: this.handleDeleteOption,
                  onPatternInput: this.handlePatternInput,
                  onClear: this.handleClear,
                  onBlur: this.handleTriggerBlur,
                  onFocus: this.handleTriggerFocus,
                  onKeydown: this.handleKeyDown,
                  onKeyup: this.handleKeyUp,
                }),
            }),
            dr(
              mh,
              {
                ref: 'followerRef',
                show: this.mergedShow,
                to: this.adjustedTo,
                teleportDisabled:
                  this.adjustedTo === Mf.tdkey,
                containerClass: this.namespace,
                width: this.consistentMenuWidth
                  ? 'target'
                  : void 0,
                minWidth: 'target',
                placement: this.placement,
              },
              {
                default: () =>
                  dr(
                    Er,
                    {
                      name: 'fade-in-scale-up-transition',
                      appear: this.isMounted,
                      onLeave: this.handleMenuLeave,
                    },
                    {
                      default: () =>
                        (this.mergedShow ||
                          'show' ===
                            this.displayDirective) &&
                        eo(
                          dr(
                            ng,
                            {
                              ref: 'menuRef',
                              virtualScroll:
                                this.consistentMenuWidth &&
                                this.virtualScroll,
                              class: `${t}-select-menu`,
                              clsPrefix: t,
                              focusable: !0,
                              autoPending: !0,
                              theme:
                                this.mergedTheme.peers
                                  .InternalSelectMenu,
                              themeOverrides:
                                this.mergedTheme
                                  .peerOverrides
                                  .InternalSelectMenu,
                              treeMate: this.treeMate,
                              multiple: this.multiple,
                              size: 'medium',
                              renderOption:
                                this.renderOption,
                              renderLabel: this.renderLabel,
                              value: this.mergedValue,
                              style: this.cssVars,
                              onToggle: this.handleToggle,
                              onScroll:
                                this.handleMenuScroll,
                              onFocus: this.handleMenuFocus,
                              onBlur: this.handleMenuBlur,
                              onKeyup: this.handleMenuKeyup,
                              onKeydown:
                                this.handleMenuKeydown,
                              onTabOut:
                                this.handleMenuTabOut,
                              onMousedown:
                                this.handleMenuMousedown,
                              show: this.mergedShow,
                            },
                            e
                          ),
                          'show' === this.displayDirective
                            ? [
                                [Zr, this.mergedShow],
                                [
                                  nh,
                                  this
                                    .handleMenuClickOutside,
                                ],
                              ]
                            : [
                                [
                                  nh,
                                  this
                                    .handleMenuClickOutside,
                                ],
                              ]
                        ),
                    }
                  ),
              }
            ),
          ],
        })
      )
    },
  }),
  lb = {
    blankHeightSmall: '28px',
    blankHeightMedium: '34px',
    blankHeightLarge: '40px',
    feedbackPadding: '4px 0 0 2px',
    feedbackHeightSmall: '24px',
    feedbackHeightMedium: '24px',
    feedbackHeightLarge: '26px',
    feedbackFontSizeSmall: '13px',
    feedbackFontSizeMedium: '14px',
    feedbackFontSizeLarge: '14px',
    labelFontSizeLeftSmall: '14px',
    labelFontSizeLeftMedium: '14px',
    labelFontSizeLeftLarge: '15px',
    labelFontSizeTopSmall: '13px',
    labelFontSizeTopMedium: '14px',
    labelFontSizeTopLarge: '14px',
    labelHeightSmall: '24px',
    labelHeightMedium: '26px',
    labelHeightLarge: '28px',
    labelPaddingVertical: '0 0 8px 2px',
    labelPaddingHorizontal: '0 12px 0 0',
    labelTextAlignVertical: 'left',
    labelTextAlignHorizontal: 'right',
  }
const sb = {
  name: 'Form',
  common: Bv,
  self: (e) => {
    const {
      textColor1: t,
      errorColor: n,
      warningColor: o,
      lineHeight: r,
      textColor3: i,
    } = e
    return Object.assign(Object.assign({}, lb), {
      lineHeight: r,
      labelTextColor: t,
      asteriskColor: n,
      feedbackTextColorError: n,
      feedbackTextColorWarning: o,
      feedbackTextColor: i,
    })
  },
}
var cb = Kd('form', [
  Xd(
    'inline',
    '\n width: 100%;\n display: inline-flex;\n align-items: flex-start;\n align-content: space-around;\n ',
    [
      Kd(
        'form-item',
        { width: 'auto', marginRight: '18px' },
        [Ud('&:last-child', { marginRight: 0 })]
      ),
    ]
  ),
])
const ub = Symbol('form'),
  db = Symbol('formItemInsts')
var fb = function (e, t, n, o) {
  return new (n || (n = Promise))(function (r, i) {
    function a(e) {
      try {
        s(o.next(e))
      } catch (t) {
        i(t)
      }
    }
    function l(e) {
      try {
        s(o.throw(e))
      } catch (t) {
        i(t)
      }
    }
    function s(e) {
      var t
      e.done
        ? r(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t)
              })).then(a, l)
    }
    s((o = o.apply(e, t || [])).next())
  })
}
var pb = dn({
  name: 'Form',
  props: Object.assign(Object.assign({}, Bf.props), {
    inline: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    labelPlacement: { type: String, default: 'top' },
    model: { type: Object, default: () => {} },
    rules: Object,
    disabled: Boolean,
    size: String,
    showRequireMark: { type: Boolean, default: void 0 },
    requireMarkPlacement: String,
    showFeedback: { type: Boolean, default: !0 },
    onSubmit: {
      type: Function,
      default: (e) => e.preventDefault(),
    },
    showLabel: { type: Boolean, default: void 0 },
  }),
  setup(e) {
    const { mergedClsPrefixRef: t } = If(e)
    Bf('Form', 'Form', cb, sb, e, t)
    const n = {}
    Ut(ub, e), Ut(db, { formItems: n })
    const o = {
      validate: function (e, t = () => !0) {
        return fb(this, void 0, void 0, function* () {
          return yield new Promise((o, r) => {
            const i = []
            for (const e of wf(n)) {
              const o = n[e]
              for (const e of o)
                e.path &&
                  i.push(e.internalValidate(null, t))
            }
            Promise.all(i).then((t) => {
              if (t.some((e) => !e.valid)) {
                const n = t
                  .filter((e) => e.errors)
                  .map((e) => e.errors)
                e ? e(n) : r(n)
              } else e ? e() : o()
            })
          })
        })
      },
      restoreValidation: function () {
        for (const e of wf(n)) {
          const t = n[e]
          for (const e of t) e.restoreValidation()
        }
      },
    }
    return Object.assign(o, { mergedClsPrefix: t })
  },
  render() {
    const { mergedClsPrefix: e } = this
    return dr(
      'form',
      {
        class: [
          `${e}-form`,
          this.inline && `${e}-form--inline`,
        ],
        onSubmit: this.onSubmit,
      },
      this.$slots
    )
  },
})
function hb() {
  return (hb =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) &&
            (e[o] = n[o])
      }
      return e
    }).apply(this, arguments)
}
function vb(e) {
  return (vb = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
}
function gb(e, t) {
  return (gb =
    Object.setPrototypeOf ||
    function (e, t) {
      return (e.__proto__ = t), e
    })(e, t)
}
function bb() {
  if ('undefined' == typeof Reflect || !Reflect.construct)
    return !1
  if (Reflect.construct.sham) return !1
  if ('function' == typeof Proxy) return !0
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    )
  } catch (e) {
    return !1
  }
}
function mb(e, t, n) {
  return (mb = bb()
    ? Reflect.construct
    : function (e, t, n) {
        var o = [null]
        o.push.apply(o, t)
        var r = new (Function.bind.apply(e, o))()
        return n && gb(r, n.prototype), r
      }).apply(null, arguments)
}
function yb(e) {
  var t = 'function' == typeof Map ? new Map() : void 0
  return (yb = function (e) {
    if (
      null === e ||
      ((n = e),
      -1 ===
        Function.toString.call(n).indexOf('[native code]'))
    )
      return e
    var n
    if ('function' != typeof e)
      throw new TypeError(
        'Super expression must either be null or a function'
      )
    if (void 0 !== t) {
      if (t.has(e)) return t.get(e)
      t.set(e, o)
    }
    function o() {
      return mb(e, arguments, vb(this).constructor)
    }
    return (
      (o.prototype = Object.create(e.prototype, {
        constructor: {
          value: o,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
      gb(o, e)
    )
  })(e)
}
var xb = /%[sdj%]/g,
  wb = function () {}
function Cb(e) {
  if (!e || !e.length) return null
  var t = {}
  return (
    e.forEach(function (e) {
      var n = e.field
      ;(t[n] = t[n] || []), t[n].push(e)
    }),
    t
  )
}
function Sb(e) {
  for (
    var t = arguments.length,
      n = new Array(t > 1 ? t - 1 : 0),
      o = 1;
    o < t;
    o++
  )
    n[o - 1] = arguments[o]
  var r = 0,
    i = n.length
  if ('function' == typeof e) return e.apply(null, n)
  if ('string' == typeof e) {
    var a = e.replace(xb, function (e) {
      if ('%%' === e) return '%'
      if (r >= i) return e
      switch (e) {
        case '%s':
          return String(n[r++])
        case '%d':
          return Number(n[r++])
        case '%j':
          try {
            return JSON.stringify(n[r++])
          } catch (t) {
            return '[Circular]'
          }
          break
        default:
          return e
      }
    })
    return a
  }
  return e
}
function kb(e, t) {
  return (
    null == e ||
    !('array' !== t || !Array.isArray(e) || e.length) ||
    !(
      !(function (e) {
        return (
          'string' === e ||
          'url' === e ||
          'hex' === e ||
          'email' === e ||
          'date' === e ||
          'pattern' === e
        )
      })(t) ||
      'string' != typeof e ||
      e
    )
  )
}
function $b(e, t, n) {
  var o = 0,
    r = e.length
  !(function i(a) {
    if (a && a.length) n(a)
    else {
      var l = o
      ;(o += 1), l < r ? t(e[l], i) : n([])
    }
  })([])
}
'undefined' != typeof process && process.env
var _b = (function (e) {
  var t, n
  function o(t, n) {
    var o
    return (
      ((o =
        e.call(this, 'Async Validation Error') ||
        this).errors = t),
      (o.fields = n),
      o
    )
  }
  return (
    (n = e),
    ((t = o).prototype = Object.create(n.prototype)),
    (t.prototype.constructor = t),
    gb(t, n),
    o
  )
})(yb(Error))
function zb(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function (t, i) {
      $b(
        (function (e) {
          var t = []
          return (
            Object.keys(e).forEach(function (n) {
              t.push.apply(t, e[n] || [])
            }),
            t
          )
        })(e),
        n,
        function (e) {
          return o(e), e.length ? i(new _b(e, Cb(e))) : t(r)
        }
      )
    })
    return (
      i.catch(function (e) {
        return e
      }),
      i
    )
  }
  var a =
      !0 === t.firstFields
        ? Object.keys(e)
        : t.firstFields || [],
    l = Object.keys(e),
    s = l.length,
    c = 0,
    u = [],
    d = new Promise(function (t, i) {
      var d = function (e) {
        if ((u.push.apply(u, e), ++c === s))
          return o(u), u.length ? i(new _b(u, Cb(u))) : t(r)
      }
      l.length || (o(u), t(r)),
        l.forEach(function (t) {
          var o = e[t]
          ;-1 !== a.indexOf(t)
            ? $b(o, n, d)
            : (function (e, t, n) {
                var o = [],
                  r = 0,
                  i = e.length
                function a(e) {
                  o.push.apply(o, e || []),
                    ++r === i && n(o)
                }
                e.forEach(function (e) {
                  t(e, a)
                })
              })(o, n, d)
        })
    })
  return (
    d.catch(function (e) {
      return e
    }),
    d
  )
}
function Pb(e, t) {
  return function (n) {
    var o, r
    return (
      (o = e.fullFields
        ? (function (e, t) {
            for (var n = e, o = 0; o < t.length; o++) {
              if (null == n) return n
              n = n[t[o]]
            }
            return n
          })(t, e.fullFields)
        : t[n.field || e.fullField]),
      (r = n) && void 0 !== r.message
        ? ((n.field = n.field || e.fullField),
          (n.fieldValue = o),
          n)
        : {
            message: 'function' == typeof n ? n() : n,
            fieldValue: o,
            field: n.field || e.fullField,
          }
    )
  }
}
function Eb(e, t) {
  if (t)
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n]
        'object' == typeof o && 'object' == typeof e[n]
          ? (e[n] = hb({}, e[n], o))
          : (e[n] = o)
      }
  return e
}
var Ob = function (e, t, n, o, r, i) {
    !e.required ||
      (n.hasOwnProperty(e.field) && !kb(t, i || e.type)) ||
      o.push(Sb(r.messages.required, e.fullField))
  },
  jb = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    url: new RegExp(
      '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
      'i'
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  },
  Tb = {
    integer: function (e) {
      return Tb.number(e) && parseInt(e, 10) === e
    },
    float: function (e) {
      return Tb.number(e) && !Tb.integer(e)
    },
    array: function (e) {
      return Array.isArray(e)
    },
    regexp: function (e) {
      if (e instanceof RegExp) return !0
      try {
        return !!new RegExp(e)
      } catch (t) {
        return !1
      }
    },
    date: function (e) {
      return (
        'function' == typeof e.getTime &&
        'function' == typeof e.getMonth &&
        'function' == typeof e.getYear &&
        !isNaN(e.getTime())
      )
    },
    number: function (e) {
      return !isNaN(e) && 'number' == typeof e
    },
    object: function (e) {
      return 'object' == typeof e && !Tb.array(e)
    },
    method: function (e) {
      return 'function' == typeof e
    },
    email: function (e) {
      return (
        'string' == typeof e &&
        e.length <= 320 &&
        !!e.match(jb.email)
      )
    },
    url: function (e) {
      return (
        'string' == typeof e &&
        e.length <= 2048 &&
        !!e.match(jb.url)
      )
    },
    hex: function (e) {
      return 'string' == typeof e && !!e.match(jb.hex)
    },
  },
  Ab = {
    required: Ob,
    whitespace: function (e, t, n, o, r) {
      ;(/^\s+$/.test(t) || '' === t) &&
        o.push(Sb(r.messages.whitespace, e.fullField))
    },
    type: function (e, t, n, o, r) {
      if (e.required && void 0 === t) Ob(e, t, n, o, r)
      else {
        var i = e.type
        ;[
          'integer',
          'float',
          'array',
          'regexp',
          'object',
          'method',
          'email',
          'number',
          'date',
          'url',
          'hex',
        ].indexOf(i) > -1
          ? Tb[i](t) ||
            o.push(
              Sb(r.messages.types[i], e.fullField, e.type)
            )
          : i &&
            typeof t !== e.type &&
            o.push(
              Sb(r.messages.types[i], e.fullField, e.type)
            )
      }
    },
    range: function (e, t, n, o, r) {
      var i = 'number' == typeof e.len,
        a = 'number' == typeof e.min,
        l = 'number' == typeof e.max,
        s = t,
        c = null,
        u = 'number' == typeof t,
        d = 'string' == typeof t,
        f = Array.isArray(t)
      if (
        (u
          ? (c = 'number')
          : d
          ? (c = 'string')
          : f && (c = 'array'),
        !c)
      )
        return !1
      f && (s = t.length),
        d &&
          (s = t.replace(
            /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            '_'
          ).length),
        i
          ? s !== e.len &&
            o.push(
              Sb(r.messages[c].len, e.fullField, e.len)
            )
          : a && !l && s < e.min
          ? o.push(
              Sb(r.messages[c].min, e.fullField, e.min)
            )
          : l && !a && s > e.max
          ? o.push(
              Sb(r.messages[c].max, e.fullField, e.max)
            )
          : a &&
            l &&
            (s < e.min || s > e.max) &&
            o.push(
              Sb(
                r.messages[c].range,
                e.fullField,
                e.min,
                e.max
              )
            )
    },
    enum: function (e, t, n, o, r) {
      ;(e.enum = Array.isArray(e.enum) ? e.enum : []),
        -1 === e.enum.indexOf(t) &&
          o.push(
            Sb(
              r.messages.enum,
              e.fullField,
              e.enum.join(', ')
            )
          )
    },
    pattern: function (e, t, n, o, r) {
      if (e.pattern)
        if (e.pattern instanceof RegExp)
          (e.pattern.lastIndex = 0),
            e.pattern.test(t) ||
              o.push(
                Sb(
                  r.messages.pattern.mismatch,
                  e.fullField,
                  t,
                  e.pattern
                )
              )
        else if ('string' == typeof e.pattern) {
          new RegExp(e.pattern).test(t) ||
            o.push(
              Sb(
                r.messages.pattern.mismatch,
                e.fullField,
                t,
                e.pattern
              )
            )
        }
    },
  },
  Mb = function (e, t, n, o, r) {
    var i = e.type,
      a = []
    if (
      e.required ||
      (!e.required && o.hasOwnProperty(e.field))
    ) {
      if (kb(t, i) && !e.required) return n()
      Ab.required(e, t, o, a, r, i),
        kb(t, i) || Ab.type(e, t, o, a, r)
    }
    n(a)
  },
  Fb = {
    string: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t, 'string') && !e.required) return n()
        Ab.required(e, t, o, i, r, 'string'),
          kb(t, 'string') ||
            (Ab.type(e, t, o, i, r),
            Ab.range(e, t, o, i, r),
            Ab.pattern(e, t, o, i, r),
            !0 === e.whitespace &&
              Ab.whitespace(e, t, o, i, r))
      }
      n(i)
    },
    method: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t && Ab.type(e, t, o, i, r)
      }
      n(i)
    },
    number: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (
          ('' === t && (t = void 0), kb(t) && !e.required)
        )
          return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t &&
            (Ab.type(e, t, o, i, r),
            Ab.range(e, t, o, i, r))
      }
      n(i)
    },
    boolean: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t && Ab.type(e, t, o, i, r)
      }
      n(i)
    },
    regexp: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          kb(t) || Ab.type(e, t, o, i, r)
      }
      n(i)
    },
    integer: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t &&
            (Ab.type(e, t, o, i, r),
            Ab.range(e, t, o, i, r))
      }
      n(i)
    },
    float: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t &&
            (Ab.type(e, t, o, i, r),
            Ab.range(e, t, o, i, r))
      }
      n(i)
    },
    array: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (null == t && !e.required) return n()
        Ab.required(e, t, o, i, r, 'array'),
          null != t &&
            (Ab.type(e, t, o, i, r),
            Ab.range(e, t, o, i, r))
      }
      n(i)
    },
    object: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t && Ab.type(e, t, o, i, r)
      }
      n(i)
    },
    enum: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r),
          void 0 !== t && Ab.enum(e, t, o, i, r)
      }
      n(i)
    },
    pattern: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t, 'string') && !e.required) return n()
        Ab.required(e, t, o, i, r),
          kb(t, 'string') || Ab.pattern(e, t, o, i, r)
      }
      n(i)
    },
    date: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t, 'date') && !e.required) return n()
        var a
        if ((Ab.required(e, t, o, i, r), !kb(t, 'date')))
          (a = t instanceof Date ? t : new Date(t)),
            Ab.type(e, a, o, i, r),
            a && Ab.range(e, a.getTime(), o, i, r)
      }
      n(i)
    },
    url: Mb,
    hex: Mb,
    email: Mb,
    required: function (e, t, n, o, r) {
      var i = [],
        a = Array.isArray(t) ? 'array' : typeof t
      Ab.required(e, t, o, i, r, a), n(i)
    },
    any: function (e, t, n, o, r) {
      var i = []
      if (
        e.required ||
        (!e.required && o.hasOwnProperty(e.field))
      ) {
        if (kb(t) && !e.required) return n()
        Ab.required(e, t, o, i, r)
      }
      n(i)
    },
  }
function Rb() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s',
    },
    clone: function () {
      var e = JSON.parse(JSON.stringify(this))
      return (e.clone = this.clone), e
    },
  }
}
var Bb = Rb(),
  Lb = (function () {
    function e(e) {
      ;(this.rules = null),
        (this._messages = Bb),
        this.define(e)
    }
    var t = e.prototype
    return (
      (t.define = function (e) {
        var t = this
        if (!e)
          throw new Error(
            'Cannot configure a schema with no rules'
          )
        if ('object' != typeof e || Array.isArray(e))
          throw new Error('Rules must be an object')
        ;(this.rules = {}),
          Object.keys(e).forEach(function (n) {
            var o = e[n]
            t.rules[n] = Array.isArray(o) ? o : [o]
          })
      }),
      (t.messages = function (e) {
        return (
          e && (this._messages = Eb(Rb(), e)),
          this._messages
        )
      }),
      (t.validate = function (t, n, o) {
        var r = this
        void 0 === n && (n = {}),
          void 0 === o && (o = function () {})
        var i = t,
          a = n,
          l = o
        if (
          ('function' == typeof a && ((l = a), (a = {})),
          !this.rules ||
            0 === Object.keys(this.rules).length)
        )
          return l && l(null, i), Promise.resolve(i)
        if (a.messages) {
          var s = this.messages()
          s === Bb && (s = Rb()),
            Eb(s, a.messages),
            (a.messages = s)
        } else a.messages = this.messages()
        var c = {}
        ;(a.keys || Object.keys(this.rules)).forEach(
          function (e) {
            var n = r.rules[e],
              o = i[e]
            n.forEach(function (n) {
              var a = n
              'function' == typeof a.transform &&
                (i === t && (i = hb({}, i)),
                (o = i[e] = a.transform(o))),
                ((a =
                  'function' == typeof a
                    ? { validator: a }
                    : hb({}, a)).validator =
                  r.getValidationMethod(a)),
                a.validator &&
                  ((a.field = e),
                  (a.fullField = a.fullField || e),
                  (a.type = r.getType(a)),
                  (c[e] = c[e] || []),
                  c[e].push({
                    rule: a,
                    value: o,
                    source: i,
                    field: e,
                  }))
            })
          }
        )
        var u = {}
        return zb(
          c,
          a,
          function (t, n) {
            var o,
              r = t.rule,
              l = !(
                ('object' !== r.type &&
                  'array' !== r.type) ||
                ('object' != typeof r.fields &&
                  'object' != typeof r.defaultField)
              )
            function s(e, t) {
              return hb({}, t, {
                fullField: r.fullField + '.' + e,
                fullFields: r.fullFields
                  ? [].concat(r.fullFields, [e])
                  : [e],
              })
            }
            function c(o) {
              void 0 === o && (o = [])
              var c = Array.isArray(o) ? o : [o]
              !a.suppressWarning &&
                c.length &&
                e.warning('async-validator:', c),
                c.length &&
                  void 0 !== r.message &&
                  (c = [].concat(r.message))
              var d = c.map(Pb(r, i))
              if (a.first && d.length)
                return (u[r.field] = 1), n(d)
              if (l) {
                if (r.required && !t.value)
                  return (
                    void 0 !== r.message
                      ? (d = []
                          .concat(r.message)
                          .map(Pb(r, i)))
                      : a.error &&
                        (d = [
                          a.error(
                            r,
                            Sb(a.messages.required, r.field)
                          ),
                        ]),
                    n(d)
                  )
                var f = {}
                r.defaultField &&
                  Object.keys(t.value).map(function (e) {
                    f[e] = r.defaultField
                  }),
                  (f = hb({}, f, t.rule.fields))
                var p = {}
                Object.keys(f).forEach(function (e) {
                  var t = f[e],
                    n = Array.isArray(t) ? t : [t]
                  p[e] = n.map(s.bind(null, e))
                })
                var h = new e(p)
                h.messages(a.messages),
                  t.rule.options &&
                    ((t.rule.options.messages = a.messages),
                    (t.rule.options.error = a.error)),
                  h.validate(
                    t.value,
                    t.rule.options || a,
                    function (e) {
                      var t = []
                      d && d.length && t.push.apply(t, d),
                        e && e.length && t.push.apply(t, e),
                        n(t.length ? t : null)
                    }
                  )
              } else n(d)
            }
            ;(l =
              l &&
              (r.required || (!r.required && t.value))),
              (r.field = t.field),
              r.asyncValidator
                ? (o = r.asyncValidator(
                    r,
                    t.value,
                    c,
                    t.source,
                    a
                  ))
                : r.validator &&
                  (!0 ===
                  (o = r.validator(
                    r,
                    t.value,
                    c,
                    t.source,
                    a
                  ))
                    ? c()
                    : !1 === o
                    ? c(
                        'function' == typeof r.message
                          ? r.message(
                              r.fullField || r.field
                            )
                          : r.message ||
                              (r.fullField || r.field) +
                                ' fails'
                      )
                    : o instanceof Array
                    ? c(o)
                    : o instanceof Error && c(o.message)),
              o &&
                o.then &&
                o.then(
                  function () {
                    return c()
                  },
                  function (e) {
                    return c(e)
                  }
                )
          },
          function (e) {
            !(function (e) {
              for (
                var t, n, o = [], r = {}, a = 0;
                a < e.length;
                a++
              )
                (t = e[a]),
                  (n = void 0),
                  Array.isArray(t)
                    ? (o = (n = o).concat.apply(n, t))
                    : o.push(t)
              o.length ? ((r = Cb(o)), l(o, r)) : l(null, i)
            })(e)
          },
          i
        )
      }),
      (t.getType = function (e) {
        if (
          (void 0 === e.type &&
            e.pattern instanceof RegExp &&
            (e.type = 'pattern'),
          'function' != typeof e.validator &&
            e.type &&
            !Fb.hasOwnProperty(e.type))
        )
          throw new Error(
            Sb('Unknown rule type %s', e.type)
          )
        return e.type || 'string'
      }),
      (t.getValidationMethod = function (e) {
        if ('function' == typeof e.validator)
          return e.validator
        var t = Object.keys(e),
          n = t.indexOf('message')
        return (
          -1 !== n && t.splice(n, 1),
          1 === t.length && 'required' === t[0]
            ? Fb.required
            : Fb[this.getType(e)] || void 0
        )
      }),
      e
    )
  })()
;(Lb.register = function (e, t) {
  if ('function' != typeof t)
    throw new Error(
      'Cannot register a validator by type, validator is not a function'
    )
  Fb[e] = t
}),
  (Lb.warning = wb),
  (Lb.messages = Bb),
  (Lb.validators = Fb)
var Ib = dn({
  name: 'FormItemFeedback',
  props: {
    clsPrefix: { type: String, required: !0 },
    explains: Array,
    feedback: String,
  },
  render() {
    var e
    const { feedback: t, clsPrefix: n } = this
    return t
      ? dr(
          'div',
          {
            key: t,
            class: `${n}-form-item-feedback__line`,
          },
          t
        )
      : null === (e = this.explains) || void 0 === e
      ? void 0
      : e.map((e) =>
          dr(
            'div',
            {
              key: e,
              class: `${n}-form-item-feedback__line`,
            },
            e
          )
        )
  },
})
const { cubicBezierEaseInOut: Db } = ef
var Hb = Kd(
    'form-item',
    { display: 'grid', lineHeight: 'var(--line-height)' },
    [
      Kd(
        'form-item-label',
        '\n grid-area: label;\n align-items: center;\n line-height: 1.25;\n text-align: var(--label-text-align);\n font-size: var(--label-font-size);\n height: var(--label-height);\n padding: var(--label-padding);\n color: var(--label-text-color);\n transition: color .3s var(--bezier);\n box-sizing: border-box;\n ',
        [
          Yd(
            'asterisk',
            '\n color: var(--asterisk-color);\n transition: color .3s var(--bezier);\n '
          ),
        ]
      ),
      Kd('form-item-blank', {
        gridArea: 'blank',
        minHeight: 'var(--blank-height)',
      }),
      Xd(
        'left-labelled',
        '\n grid-template-areas:\n "label blank"\n "label feedback";\n grid-template-columns: auto minmax(0, 1fr);\n ',
        [
          Kd(
            'form-item-label',
            '\n height: var(--blank-height);\n line-height: var(--blank-height);\n box-sizing: border-box;\n white-space: nowrap;\n flex-shrink: 0;\n flex-grow: 0;\n '
          ),
        ]
      ),
      Xd(
        'top-labelled',
        '\n grid-template-areas:\n "label"\n "blank"\n "feedback";\n grid-template-rows: var(--label-height) 1fr;\n grid-template-columns: minmax(0, 100%);\n ',
        [
          Xd(
            'no-label',
            '\n grid-template-areas:\n "blank"\n "feedback";\n grid-template-rows: 1fr;\n '
          ),
          Kd('form-item-label', {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'var(--label-text-align)',
          }),
        ]
      ),
      Kd(
        'form-item-blank',
        '\n box-sizing: border-box;\n display: flex;\n align-items: center;\n position: relative;\n '
      ),
      Kd(
        'form-item-feedback-wrapper',
        '\n grid-area: feedback;\n box-sizing: border-box;\n min-height: var(--feedback-height);\n font-size: var(--feedback-font-size);\n padding: var(--feedback-padding);\n line-height: 1.25;\n transform-origin: top left;\n ',
        [
          Kd(
            'form-item-feedback',
            {
              transition: 'color .3s var(--bezier)',
              color: 'var(--feedback-text-color)',
            },
            [
              Xd('warning', {
                color: 'var(--feedback-text-color-warning)',
              }),
              Xd('error', {
                color: 'var(--feedback-text-color-error)',
              }),
              (function ({
                name: e = 'fade-down',
                fromOffset: t = '-4px',
                enterDuration: n = '.3s',
                leaveDuration: o = '.3s',
                enterCubicBezier: r = Db,
                leaveCubicBezier: i = Db,
              } = {}) {
                return [
                  Ud(
                    `&.${e}-transition-enter-from, &.${e}-transition-leave-to`,
                    {
                      opacity: 0,
                      transform: `translateY(${t})`,
                    }
                  ),
                  Ud(
                    `&.${e}-transition-enter-to, &.${e}-transition-leave-from`,
                    {
                      opacity: 1,
                      transform: 'translateY(0)',
                    }
                  ),
                  Ud(`&.${e}-transition-leave-active`, {
                    transition: `opacity ${o} ${i}, transform ${o} ${i}`,
                  }),
                  Ud(`&.${e}-transition-enter-active`, {
                    transition: `opacity ${n} ${r}, transform ${n} ${r}`,
                  }),
                ]
              })({
                fromOffset: '-3px',
                enterDuration: '.3s',
                leaveDuration: '.2s',
              }),
            ]
          ),
        ]
      ),
    ]
  ),
  Nb = function (e, t, n, o) {
    return new (n || (n = Promise))(function (r, i) {
      function a(e) {
        try {
          s(o.next(e))
        } catch (t) {
          i(t)
        }
      }
      function l(e) {
        try {
          s(o.throw(e))
        } catch (t) {
          i(t)
        }
      }
      function s(e) {
        var t
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t)
                })).then(a, l)
      }
      s((o = o.apply(e, t || [])).next())
    })
  }
function Wb(e, t) {
  return (...n) => {
    var o
    try {
      const r = e(...n)
      return (!t &&
        ('boolean' == typeof r ||
          r instanceof Error ||
          Array.isArray(r))) ||
        (null === (o = r) || void 0 === o ? void 0 : o.then)
        ? r
        : (void 0 === r ||
            Sf(
              'form-item/validate',
              `You return a ${typeof r} typed value in the validator method, which is not recommended. Please use ` +
                (t
                  ? '`Promise`'
                  : '`boolean`, `Error` or `Promise`') +
                ' typed value instead.'
            ),
          !0)
    } catch (r) {
      return (
        Sf(
          'form-item/validate',
          "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."
        ),
        void console.error(r)
      )
    }
  }
}
var Vb = dn({
  name: 'FormItem',
  props: Object.assign(Object.assign({}, Bf.props), {
    label: String,
    labelWidth: [Number, String],
    labelStyle: [String, Object],
    labelAlign: String,
    labelPlacement: String,
    path: String,
    first: Boolean,
    rulePath: String,
    required: Boolean,
    showRequireMark: { type: Boolean, default: void 0 },
    requireMarkPlacement: String,
    showFeedback: { type: Boolean, default: void 0 },
    rule: [Object, Array],
    size: String,
    ignorePathChange: Boolean,
    validationStatus: String,
    feedback: String,
    showLabel: { type: Boolean, default: void 0 },
  }),
  setup(e) {
    Ff(db, 'formItems', ct(e, 'path'))
    const { mergedClsPrefixRef: t } = If(e),
      n = Gt(ub, null),
      o = (function (e) {
        const t = Gt(ub, null)
        return {
          mergedSize: ur(() =>
            void 0 !== e.size
              ? e.size
              : void 0 !== (null == t ? void 0 : t.size)
              ? t.size
              : 'medium'
          ),
        }
      })(e),
      r = (function (e) {
        const t = Gt(ub, null),
          n = ur(() => {
            if ('top' === o.value) return
            const { labelWidth: n } = e
            return void 0 !== n
              ? Pf(n)
              : void 0 !==
                (null == t ? void 0 : t.labelWidth)
              ? Pf(t.labelWidth)
              : void 0
          }),
          o = ur(() => {
            const { labelPlacement: n } = e
            return void 0 !== n
              ? n
              : (null == t ? void 0 : t.labelPlacement)
              ? t.labelPlacement
              : 'top'
          }),
          r = ur(() => {
            const { labelAlign: n } = e
            return (
              n ||
              ((null == t ? void 0 : t.labelAlign)
                ? t.labelAlign
                : void 0)
            )
          }),
          i = ur(() => [{ width: n.value }, e.labelStyle]),
          a = ur(() => {
            const { showRequireMark: n } = e
            return void 0 !== n
              ? n
              : null == t
              ? void 0
              : t.showRequireMark
          }),
          l = ur(() => {
            const { requireMarkPlacement: n } = e
            return void 0 !== n
              ? n
              : null == t
              ? void 0
              : t.requireMarkPlacement
          }),
          s = nt(!1),
          c = ur(() => {
            const { validationStatus: t } = e
            return void 0 !== t
              ? t
              : s.value
              ? 'error'
              : void 0
          }),
          u = ur(() => {
            const { showFeedback: n } = e
            return void 0 !== n
              ? n
              : void 0 ===
                  (null == t ? void 0 : t.showFeedback) ||
                  t.showFeedback
          }),
          d = ur(() => {
            const { showLabel: n } = e
            return void 0 !== n
              ? n
              : void 0 ===
                  (null == t ? void 0 : t.showLabel) ||
                  t.showLabel
          })
        return {
          validationErrored: s,
          mergedLabelStyle: i,
          mergedLabelPlacement: o,
          mergedLabelAlign: r,
          mergedShowRequireMark: a,
          mergedRequireMarkPlacement: l,
          mergedValidationStatus: c,
          mergedShowFeedback: u,
          mergedShowLabel: d,
        }
      })(e),
      { validationErrored: i } = r,
      { mergedRequired: a, mergedRules: l } = (function (
        e
      ) {
        const t = Gt(ub, null),
          n = ur(() => {
            const { rulePath: t } = e
            if (void 0 !== t) return t
            const { path: n } = e
            return void 0 !== n ? n : void 0
          }),
          o = ur(() => {
            const o = [],
              { rule: r } = e
            if (
              (void 0 !== r &&
                (Array.isArray(r)
                  ? o.push(...r)
                  : o.push(r)),
              t)
            ) {
              const { rules: e } = t,
                { value: r } = n
              if (void 0 !== e && void 0 !== r) {
                const t = Oc(e, r)
                void 0 !== t &&
                  (Array.isArray(t)
                    ? o.push(...t)
                    : o.push(t))
              }
            }
            return o
          }),
          r = ur(() => o.value.some((e) => e.required)),
          i = ur(() => r.value || e.required)
        return { mergedRules: o, mergedRequired: i }
      })(e),
      { mergedSize: s } = o,
      { mergedLabelPlacement: c, mergedLabelAlign: u } = r,
      d = nt([]),
      f = nt(Cl()),
      p = ur(() => {
        const { feedback: t } = e
        return null != t || d.value.length
      }),
      h = n ? ct(n, 'disabled') : nt(!1),
      v = Bf('Form', 'FormItem', Hb, sb, e, t)
    function g() {
      ;(d.value = []),
        (i.value = !1),
        e.feedback && (f.value = Cl())
    }
    Xt(ct(e, 'path'), () => {
      e.ignorePathChange || g()
    })
    const b = (
      t = null,
      o = () => !0,
      r = { suppressWarning: !0 }
    ) =>
      Nb(this, void 0, void 0, function* () {
        const { path: a } = e
        r ? r.first || (r.first = e.first) : (r = {})
        const { value: s } = l,
          c = n ? Oc(n.model, a, null) : void 0,
          u = (
            t
              ? s.filter((e) =>
                  Array.isArray(e.trigger)
                    ? e.trigger.includes(t)
                    : e.trigger === t
                )
              : s
          )
            .filter(o)
            .map((e) => {
              const t = Object.assign({}, e)
              return (
                t.validator &&
                  (t.validator = Wb(t.validator, !1)),
                t.asyncValidator &&
                  (t.asyncValidator = Wb(
                    t.asyncValidator,
                    !0
                  )),
                t
              )
            })
        if (!u.length)
          return yield Promise.resolve({ valid: !0 })
        const f = null != a ? a : '__n_no_path__',
          p = new Lb({ [f]: u })
        return yield new Promise((e) => {
          p.validate({ [f]: c }, r, (t, n) => {
            ;(null == t ? void 0 : t.length)
              ? ((d.value = t.map(
                  (e) =>
                    (null == e ? void 0 : e.message) || ''
                )),
                (i.value = !0),
                e({ valid: !1, errors: t }))
              : (g(), e({ valid: !0 }))
          })
        })
      })
    Ut(Sl, {
      path: ct(e, 'path'),
      disabled: h,
      mergedSize: o.mergedSize,
      restoreValidation: g,
      handleContentBlur: function () {
        b('blur')
      },
      handleContentChange: function () {
        b('change')
      },
      handleContentFocus: function () {
        b('focus')
      },
      handleContentInput: function () {
        b('input')
      },
    })
    const m = {
      validate: function (e, t) {
        return Nb(this, void 0, void 0, function* () {
          let n, o, r, i
          return (
            'string' == typeof e
              ? ((n = e), (o = t))
              : null !== e &&
                'object' == typeof e &&
                ((n = e.trigger),
                (o = e.callback),
                (r = e.shouldRuleBeApplied),
                (i = e.options)),
            yield new Promise((e, t) => {
              b(n, r, i).then(({ valid: n, errors: r }) => {
                n ? (o && o(), e()) : (o && o(r), t(r))
              })
            })
          )
        })
      },
      restoreValidation: g,
      internalValidate: b,
    }
    return Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(
            {
              mergedClsPrefix: t,
              mergedRequired: a,
              hasFeedback: p,
              feedbackId: f,
              explains: d,
            },
            r
          ),
          o
        ),
        m
      ),
      {
        cssVars: ur(() => {
          var e
          const { value: t } = s,
            { value: n } = c,
            o = 'top' === n ? 'vertical' : 'horizontal',
            {
              common: { cubicBezierEaseInOut: r },
              self: {
                labelTextColor: i,
                asteriskColor: a,
                lineHeight: l,
                feedbackTextColor: d,
                feedbackTextColorWarning: f,
                feedbackTextColorError: p,
                feedbackPadding: h,
                [Wd('labelHeight', t)]: g,
                [Wd('blankHeight', t)]: b,
                [Wd('feedbackFontSize', t)]: m,
                [Wd('feedbackHeight', t)]: y,
                [Wd('labelPadding', o)]: x,
                [Wd('labelTextAlign', o)]: w,
                [Wd(Wd('labelFontSize', n), t)]: C,
              },
            } = v.value
          let S =
            null !== (e = u.value) && void 0 !== e ? e : w
          'top' === n &&
            (S = 'right' === S ? 'flex-end' : 'flex-start')
          return {
            '--bezier': r,
            '--line-height': l,
            '--blank-height': b,
            '--label-font-size': C,
            '--label-text-align': S,
            '--label-height': g,
            '--label-padding': x,
            '--asterisk-color': a,
            '--label-text-color': i,
            '--feedback-padding': h,
            '--feedback-font-size': m,
            '--feedback-height': y,
            '--feedback-text-color': d,
            '--feedback-text-color-warning': f,
            '--feedback-text-color-error': p,
          }
        }),
      }
    )
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t,
      mergedShowLabel: n,
      mergedShowRequireMark: o,
      mergedRequireMarkPlacement: r,
    } = this
    return dr(
      'div',
      {
        class: [
          `${t}-form-item`,
          `${t}-form-item--${this.mergedSize}-size`,
          `${t}-form-item--${this.mergedLabelPlacement}-labelled`,
          !n && `${t}-form-item--no-label`,
        ],
        style: this.cssVars,
      },
      n && (this.label || e.label)
        ? dr(
            'label',
            {
              class: `${t}-form-item-label`,
              style: this.mergedLabelStyle,
            },
            'left' !== r
              ? Uo(e, 'label', void 0, () => [this.label])
              : null,
            (void 0 !== o ? o : this.mergedRequired)
              ? dr(
                  'span',
                  {
                    class: `${t}-form-item-label__asterisk`,
                  },
                  'left' !== r ? ' *' : '* '
                )
              : null,
            'left' === r
              ? Uo(e, 'label', void 0, () => [this.label])
              : null
          )
        : null,
      dr(
        'div',
        {
          class: [
            `${t}-form-item-blank`,
            this.mergedValidationStatus &&
              `${t}-form-item-blank--${this.mergedValidationStatus}`,
          ],
        },
        e
      ),
      this.mergedShowFeedback
        ? dr(
            'div',
            {
              key: this.feedbackId,
              class: `${t}-form-item-feedback-wrapper`,
            },
            dr(
              Er,
              {
                name: 'fade-down-transition',
                mode: 'out-in',
              },
              {
                default: () => {
                  const e = dr(Ib, {
                      clsPrefix: t,
                      explains: this.explains,
                      feedback: this.feedback,
                    }),
                    {
                      hasFeedback: n,
                      mergedValidationStatus: o,
                    } = this
                  return n
                    ? dr(
                        'div',
                        'warning' === o
                          ? {
                              key: 'controlled-warning',
                              class: `${t}-form-item-feedback ${t}-form-item-feedback--warning`,
                            }
                          : 'error' === o
                          ? {
                              key: 'controlled-error',
                              class: `${t}-form-item-feedback ${t}-form-item-feedback--error`,
                            }
                          : 'success' === o
                          ? {
                              key: 'controlled-success',
                              class: `${t}-form-item-feedback ${t}-form-item-feedback--success`,
                            }
                          : {
                              key: 'controlled-default',
                              class: `${t}-form-item-feedback`,
                            },
                        e
                      )
                    : null
                },
              }
            )
          )
        : null
    )
  },
})
const qb = {
  name: 'Layout',
  common: Bv,
  peers: { Scrollbar: Nv },
  self: (e) => {
    const {
      baseColor: t,
      textColor2: n,
      bodyColor: o,
      cardColor: r,
      dividerColor: i,
      actionColor: a,
      scrollbarColor: l,
      scrollbarColorHover: s,
      invertedColor: c,
    } = e
    return {
      textColor: n,
      textColorInverted: '#FFF',
      color: o,
      colorEmbedded: a,
      headerColor: r,
      headerColorInverted: c,
      footerColor: a,
      footerColorInverted: c,
      headerBorderColor: i,
      headerBorderColorInverted: c,
      footerBorderColor: i,
      footerBorderColorInverted: c,
      siderBorderColor: i,
      siderBorderColorInverted: c,
      siderColor: r,
      siderColorInverted: c,
      siderToggleButtonBorder: `1px solid ${i}`,
      siderToggleButtonColor: t,
      siderToggleButtonIconColor: n,
      siderToggleButtonIconColorInverted: n,
      siderToggleBarColor: bl(o, l),
      siderToggleBarColorHover: bl(o, s),
      __invertScrollbar: 'true',
    }
  },
}
var Ub = Kd(
  'layout',
  '\n color: var(--text-color);\n background-color: var(--color);\n box-sizing: border-box;\n position: relative;\n z-index: auto;\n flex: auto;\n overflow: hidden;\n transition:\n box-shadow .3s var(--bezier),\n background-color .3s var(--bezier),\n color .3s var(--bezier);\n',
  [
    Kd(
      'layout-scroll-container',
      '\n overflow-x: hidden;\n box-sizing: border-box;\n height: 100%;\n '
    ),
    Xd(
      'absolute-positioned',
      '\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n '
    ),
  ]
)
const Gb = Symbol('layoutSiderInjection'),
  Kb = { type: String, default: 'static' },
  Yb = {
    embedded: Boolean,
    position: Kb,
    nativeScrollbar: { type: Boolean, default: !0 },
    scrollbarProps: Object,
    onScroll: Function,
    contentStyle: { type: [String, Object], default: '' },
    hasSider: Boolean,
    siderPlacement: { type: String, default: 'left' },
  },
  Xb = Symbol('layout')
function Zb(e) {
  return dn({
    name: e ? 'LayoutContent' : 'Layout',
    props: Object.assign(Object.assign({}, Bf.props), Yb),
    setup(e) {
      const t = nt(null),
        n = nt(null),
        { mergedClsPrefixRef: o } = If(e),
        r = Bf('Layout', 'Layout', Ub, qb, e, o)
      Ut(Xb, e)
      const i = {
        scrollTo: function (o, r) {
          if (e.nativeScrollbar) {
            const { value: e } = t
            e &&
              (void 0 === r
                ? e.scrollTo(o)
                : e.scrollTo(o, r))
          } else {
            const { value: e } = n
            e && e.scrollTo(o, r)
          }
        },
      }
      return Object.assign(
        {
          mergedClsPrefix: o,
          scrollableElRef: t,
          scrollbarInstRef: n,
          hasSiderStyle: {
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%',
            flexDirection: 'row',
          },
          mergedTheme: r,
          cssVars: ur(() => {
            const {
              common: { cubicBezierEaseInOut: t },
              self: n,
            } = r.value
            return {
              '--bezier': t,
              '--color': e.embedded
                ? n.colorEmbedded
                : n.color,
              '--text-color': n.textColor,
            }
          }),
        },
        i
      )
    },
    render() {
      const { mergedClsPrefix: t, hasSider: n } = this,
        o = n ? this.hasSiderStyle : void 0
      return dr(
        'div',
        {
          class: [
            e && `${t}-layout-content`,
            `${t}-layout`,
            `${t}-layout--${this.position}-positioned`,
          ],
          style: this.cssVars,
        },
        this.nativeScrollbar
          ? dr(
              'div',
              {
                ref: 'scrollableElRef',
                class: `${t}-layout-scroll-container`,
                style: [this.contentStyle, o],
                onScroll: this.onScroll,
              },
              this.$slots
            )
          : dr(
              qv,
              Object.assign({}, this.scrollbarProps, {
                onScroll: this.onScroll,
                ref: 'scrollbarInstRef',
                theme: this.mergedTheme.peers.Scrollbar,
                themeOverrides:
                  this.mergedTheme.peerOverrides.Scrollbar,
                contentStyle: [this.contentStyle, o],
              }),
              this.$slots
            )
      )
    },
  })
}
var Jb = Zb(!1),
  Qb = Zb(!0),
  em = Kd(
    'layout-header',
    '\n transition:\n color .3s var(--bezier),\n background-color .3s var(--bezier),\n box-shadow .3s var(--bezier),\n border-color .3s var(--bezier);\n box-sizing: border-box;\n width: 100%;\n background-color: var(--color);\n color: var(--text-color);\n',
    [
      Xd(
        'absolute-positioned',
        '\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n '
      ),
      Xd(
        'bordered',
        '\n border-bottom: solid 1px var(--border-color);\n '
      ),
    ]
  )
const tm = {
  position: Kb,
  inverted: Boolean,
  bordered: { type: Boolean, default: !1 },
}
var nm = dn({
    name: 'LayoutHeader',
    props: Object.assign(Object.assign({}, Bf.props), tm),
    setup(e) {
      const { mergedClsPrefixRef: t } = If(e),
        n = Bf('Layout', 'LayoutHeader', em, qb, e, t)
      return {
        mergedClsPrefix: t,
        cssVars: ur(() => {
          const {
              common: { cubicBezierEaseInOut: t },
              self: o,
            } = n.value,
            r = { '--bezier': t }
          return (
            e.inverted
              ? ((r['--color'] = o.headerColorInverted),
                (r['--text-color'] = o.textColorInverted),
                (r['--border-color'] =
                  o.headerBorderColorInverted))
              : ((r['--color'] = o.headerColor),
                (r['--text-color'] = o.textColor),
                (r['--border-color'] =
                  o.headerBorderColor)),
            r
          )
        }),
      }
    },
    render() {
      const { mergedClsPrefix: e } = this
      return dr(
        'div',
        {
          class: [
            `${e}-layout-header`,
            this.position &&
              `${e}-layout-header--${this.position}-positioned`,
            this.bordered && `${e}-layout-header--bordered`,
          ],
          style: this.cssVars,
        },
        this.$slots
      )
    },
  }),
  om = Kd(
    'layout-sider',
    '\n flex-shrink: 0;\n box-sizing: border-box;\n position: relative;\n z-index: 1;\n color: var(--text-color);\n transition:\n color .3s var(--bezier),\n border-color .3s var(--bezier),\n min-width .3s var(--bezier),\n max-width .3s var(--bezier),\n transform .3s var(--bezier),\n background-color .3s var(--bezier);\n background-color: var(--color);\n display: flex;\n justify-content: flex-end;\n',
    [
      Xd(
        'right-placement',
        '\n justify-content: flex-start;\n ',
        [
          Xd(
            'bordered',
            '\n border-right: none;\n border-left: 1px solid var(--border-color);\n '
          ),
          Xd('collapsed', [
            Kd('layout-toggle-button', [
              Kd(
                'base-icon',
                '\n transform: rotate(180deg);\n '
              ),
            ]),
            Kd('layout-toggle-bar', [
              Ud('&:hover', [
                Yd('top', {
                  transform:
                    'rotate(-12deg) scale(1.15) translateY(-2px)',
                }),
                Yd('bottom', {
                  transform:
                    'rotate(12deg) scale(1.15) translateY(2px)',
                }),
              ]),
            ]),
          ]),
          Kd(
            'layout-toggle-button',
            '\n left: 0;\n transform: translateX(-50%) translateY(-50%);\n ',
            [Kd('base-icon', '\n transform: rotate(0);\n ')]
          ),
          Kd(
            'layout-toggle-bar',
            '\n left: -28px;\n transform: rotate(180deg);\n ',
            [
              Ud('&:hover', [
                Yd('top', {
                  transform:
                    'rotate(12deg) scale(1.15) translateY(-2px)',
                }),
                Yd('bottom', {
                  transform:
                    'rotate(-12deg) scale(1.15) translateY(2px)',
                }),
              ]),
            ]
          ),
        ]
      ),
      Xd('collapsed', [
        Kd('layout-toggle-bar', [
          Ud('&:hover', [
            Yd('top', {
              transform:
                'rotate(-12deg) scale(1.15) translateY(-2px)',
            }),
            Yd('bottom', {
              transform:
                'rotate(12deg) scale(1.15) translateY(2px)',
            }),
          ]),
        ]),
        Kd('layout-toggle-button', [
          Kd('base-icon', '\n transform: rotate(0);\n '),
        ]),
      ]),
      Kd(
        'layout-toggle-button',
        '\n transition:\n color .3s var(--bezier),\n right .3s var(--bezier),\n left .3s var(--bezier),\n border-color .3s var(--bezier),\n background-color .3s var(--bezier);\n cursor: pointer;\n width: 24px;\n height: 24px;\n position: absolute;\n top: 50%;\n right: 0;\n border-radius: 50%;\n display: flex;\n align-items: center;\n justify-content: center;\n font-size: 18px;\n color: var(--toggle-button-icon-color);\n border: var(--toggle-button-border);\n background-color: var(--toggle-button-color);\n box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);\n transform: translateX(50%) translateY(-50%);\n ',
        [
          Kd(
            'base-icon',
            '\n transition: transform .3s var(--bezier);\n transform: rotate(180deg);\n '
          ),
        ]
      ),
      Kd(
        'layout-toggle-bar',
        '\n cursor: pointer;\n height: 72px;\n width: 32px;\n position: absolute;\n top: calc(50% - 36px);\n right: -28px;\n ',
        [
          Yd(
            'top, bottom',
            '\n position: absolute;\n width: 4px;\n border-radius: 2px;\n height: 38px;\n left: 14px;\n transition: \n background-color .3s var(--bezier),\n transform .3s var(--bezier);\n '
          ),
          Yd(
            'bottom',
            '\n position: absolute;\n top: 34px;\n '
          ),
          Ud('&:hover', [
            Yd('top', {
              transform:
                'rotate(12deg) scale(1.15) translateY(-2px)',
            }),
            Yd('bottom', {
              transform:
                'rotate(-12deg) scale(1.15) translateY(2px)',
            }),
          ]),
          Yd('top, bottom', {
            backgroundColor: 'var(--toggle-bar-color)',
          }),
          Ud('&:hover', [
            Yd('top, bottom', {
              backgroundColor:
                'var(--toggle-bar-color-hover)',
            }),
          ]),
        ]
      ),
      Yd(
        'border',
        '\n position: absolute;\n top: 0;\n right: 0;\n bottom: 0;\n width: 1px;\n transition: background-color .3s var(--bezier);\n '
      ),
      Kd(
        'layout-sider-scroll-container',
        '\n flex-grow: 1;\n flex-shrink: 0;\n box-sizing: border-box;\n height: 100%;\n opacity: 0;\n transition: opacity .3s var(--bezier);\n max-width: 100%;\n '
      ),
      Xd('show-content', [
        Kd('layout-sider-scroll-container', { opacity: 1 }),
      ]),
      Xd(
        'absolute-positioned',
        '\n position: absolute;\n left: 0;\n top: 0;\n bottom: 0;\n '
      ),
      Xd(
        'bordered',
        '\n border-right: 1px solid var(--border-color);\n '
      ),
    ]
  ),
  rm = dn({
    name: 'LayoutToggleButton',
    props: {
      clsPrefix: { type: String, required: !0 },
      onClick: Function,
    },
    render() {
      const { clsPrefix: e } = this
      return dr(
        'div',
        {
          class: `${e}-layout-toggle-button`,
          onClick: this.onClick,
        },
        dr(
          vp,
          { clsPrefix: e },
          { default: () => dr(tp, null) }
        )
      )
    },
  }),
  im = dn({
    props: {
      clsPrefix: { type: String, required: !0 },
      onClick: Function,
    },
    render() {
      const { clsPrefix: e } = this
      return dr(
        'div',
        {
          onClick: this.onClick,
          class: `${e}-layout-toggle-bar`,
        },
        dr('div', { class: `${e}-layout-toggle-bar__top` }),
        dr('div', {
          class: `${e}-layout-toggle-bar__bottom`,
        })
      )
    },
  })
const am = {
  position: Kb,
  bordered: Boolean,
  collapsedWidth: { type: Number, default: 48 },
  width: { type: [Number, String], default: 272 },
  contentStyle: { type: [String, Object], default: '' },
  collapseMode: { type: String, default: 'transform' },
  collapsed: { type: Boolean, default: void 0 },
  defaultCollapsed: Boolean,
  showCollapsedContent: { type: Boolean, default: !0 },
  showTrigger: { type: [Boolean, String], default: !1 },
  nativeScrollbar: { type: Boolean, default: !0 },
  inverted: Boolean,
  scrollbarProps: Object,
  triggerStyle: [String, Object],
  collapsedTriggerStyle: [String, Object],
  'onUpdate:collapsed': [Function, Array],
  onUpdateCollapsed: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  onExpand: [Function, Array],
  onCollapse: [Function, Array],
  onScroll: Function,
}
var lm = dn({
    name: 'LayoutSider',
    props: Object.assign(Object.assign({}, Bf.props), am),
    setup(e) {
      const t = Gt(Xb),
        n = nt(null),
        o = nt(null),
        r = ur(() =>
          Pf(s.value ? e.collapsedWidth : e.width)
        ),
        i = ur(() =>
          'transform' !== e.collapseMode
            ? {}
            : { minWidth: Pf(e.width) }
        ),
        a = ur(() => (t ? t.siderPlacement : 'left')),
        l = nt(e.defaultCollapsed),
        s = hf(ct(e, 'collapsed'), l)
      Ut(Gb, {
        collapsedRef: s,
        collapseModeRef: ct(e, 'collapseMode'),
      })
      const { mergedClsPrefixRef: c } = If(e),
        u = Bf('Layout', 'LayoutSider', om, qb, e, c)
      const d = {
        scrollTo: function (t, r) {
          if (e.nativeScrollbar) {
            const { value: e } = n
            e &&
              (void 0 === r
                ? e.scrollTo(t)
                : e.scrollTo(t, r))
          } else {
            const { value: e } = o
            e && e.scrollTo(t, r)
          }
        },
      }
      return Object.assign(
        {
          scrollableElRef: n,
          scrollbarInstRef: o,
          mergedClsPrefix: c,
          mergedTheme: u,
          styleMaxWidth: r,
          mergedCollapsed: s,
          scrollContainerStyle: i,
          siderPlacement: a,
          handleTransitionend: function (t) {
            var n, o
            'max-width' === t.propertyName &&
              (s.value
                ? null === (n = e.onAfterLeave) ||
                  void 0 === n ||
                  n.call(e)
                : null === (o = e.onAfterEnter) ||
                  void 0 === o ||
                  o.call(e))
          },
          handleTriggerClick: function () {
            const {
                'onUpdate:collapsed': t,
                onUpdateCollapsed: n,
                onExpand: o,
                onCollapse: r,
              } = e,
              { value: i } = s
            n && xf(n, !i),
              t && xf(t, !i),
              (l.value = !i),
              i ? o && xf(o) : r && xf(r)
          },
          cssVars: ur(() => {
            const {
                common: { cubicBezierEaseInOut: t },
                self: n,
              } = u.value,
              {
                siderToggleButtonColor: o,
                siderToggleButtonBorder: r,
                siderToggleBarColor: i,
                siderToggleBarColorHover: a,
              } = n,
              l = {
                '--bezier': t,
                '--toggle-button-color': o,
                '--toggle-button-border': r,
                '--toggle-bar-color': i,
                '--toggle-bar-color-hover': a,
              }
            return (
              e.inverted
                ? ((l['--color'] = n.siderColorInverted),
                  (l['--text-color'] = n.textColorInverted),
                  (l['--border-color'] =
                    n.siderBorderColorInverted),
                  (l['--toggle-button-icon-color'] =
                    n.siderToggleButtonIconColorInverted),
                  (l.__invertScrollbar =
                    n.__invertScrollbar))
                : ((l['--color'] = n.siderColor),
                  (l['--text-color'] = n.textColor),
                  (l['--border-color'] =
                    n.siderBorderColor),
                  (l['--toggle-button-icon-color'] =
                    n.siderToggleButtonIconColor)),
              l
            )
          }),
        },
        d
      )
    },
    render() {
      const {
        mergedClsPrefix: e,
        mergedCollapsed: t,
        showTrigger: n,
      } = this
      return dr(
        'aside',
        {
          class: [
            `${e}-layout-sider`,
            `${e}-layout-sider--${this.position}-positioned`,
            `${e}-layout-sider--${this.siderPlacement}-placement`,
            this.bordered && `${e}-layout-sider--bordered`,
            t && `${e}-layout-sider--collapsed`,
            (!t || this.showCollapsedContent) &&
              `${e}-layout-sider--show-content`,
          ],
          onTransitionend: this.handleTransitionend,
          style: [
            this.cssVars,
            {
              maxWidth: this.styleMaxWidth,
              width: Pf(this.width),
            },
          ],
        },
        this.nativeScrollbar
          ? dr(
              'div',
              {
                class: `${e}-layout-sider-scroll-container`,
                onScroll: this.onScroll,
                style: [
                  this.scrollContainerStyle,
                  this.contentStyle,
                  { overflow: 'auto' },
                ],
                ref: 'scrollableElRef',
              },
              this.$slots
            )
          : dr(
              qv,
              Object.assign({}, this.scrollbarProps, {
                onScroll: this.onScroll,
                ref: 'scrollbarInstRef',
                style: this.scrollContainerStyle,
                contentStyle: this.contentStyle,
                theme: this.mergedTheme.peers.Scrollbar,
                themeOverrides:
                  this.mergedTheme.peerOverrides.Scrollbar,
                builtinThemeOverrides:
                  this.inverted &&
                  'true' === this.cssVars.__invertScrollbar
                    ? {
                        colorHover:
                          'rgba(255, 255, 255, .4)',
                        color: 'rgba(255, 255, 255, .3)',
                      }
                    : void 0,
              }),
              this.$slots
            ),
        n
          ? dr('bar' === n ? im : rm, {
              clsPrefix: e,
              style: t
                ? this.collapsedTriggerStyle
                : this.triggerStyle,
              onClick: this.handleTriggerClick,
            })
          : null
      )
    },
  }),
  sm = {
    margin: '0 0 8px 0',
    padding: '10px 20px',
    maxWidth: '720px',
    minWidth: '420px',
    iconMargin: '0 10px 0 0',
    closeMargin: '0 0 0 12px',
    closeSize: '16px',
    iconSize: '20px',
    fontSize: '14px',
  }
const cm = {
    name: 'Message',
    common: Bv,
    self: (e) => {
      const {
        textColor2: t,
        closeColor: n,
        closeColorHover: o,
        closeColorPressed: r,
        infoColor: i,
        successColor: a,
        errorColor: l,
        warningColor: s,
        popoverColor: c,
        boxShadow2: u,
        primaryColor: d,
        lineHeight: f,
        borderRadius: p,
      } = e
      return Object.assign(Object.assign({}, sm), {
        textColorInfo: t,
        textColorSuccess: t,
        textColorError: t,
        textColorWarning: t,
        textColorLoading: t,
        colorInfo: c,
        colorSuccess: c,
        colorError: c,
        colorWarning: c,
        colorLoading: c,
        boxShadowInfo: u,
        boxShadowSuccess: u,
        boxShadowError: u,
        boxShadowWarning: u,
        boxShadowLoading: u,
        iconColorInfo: i,
        iconColorSuccess: a,
        iconColorWarning: s,
        iconColorError: l,
        iconColorLoading: d,
        closeColorInfo: n,
        closeColorHoverInfo: o,
        closeColorPressedInfo: r,
        closeColorSuccess: n,
        closeColorHoverSuccess: o,
        closeColorPressedSuccess: r,
        closeColorError: n,
        closeColorHoverError: o,
        closeColorPressedError: r,
        closeColorWarning: n,
        closeColorHoverWarning: o,
        closeColorPressedWarning: r,
        closeColorLoading: n,
        closeColorHoverLoading: o,
        closeColorPressedLoading: r,
        loadingColor: d,
        lineHeight: f,
        borderRadius: p,
      })
    },
  },
  um = {
    icon: Function,
    type: { type: String, default: 'info' },
    content: [String, Number, Function],
    closable: Boolean,
    keepAliveOnHover: Boolean,
    onClose: Function,
    onMouseenter: Function,
    onMouseleave: Function,
  }
var dm = Ud([
  Kd(
    'message-wrapper',
    '\n margin: var(--margin);\n z-index: 0;\n transform-origin: top center;\n display: flex;\n ',
    [
      (function ({
        overflow: e = 'hidden',
        duration: t = '.3s',
        originalTransition: n = '',
        leavingDelay: o = '0s',
        foldPadding: r = !1,
        enterToProps: i,
        leaveToProps: a,
        reverse: l = !1,
      } = {}) {
        const s = l ? 'leave' : 'enter',
          c = l ? 'enter' : 'leave'
        return [
          Ud(
            `&.fade-in-height-expand-transition-${c}-from,\n &.fade-in-height-expand-transition-${s}-to`,
            Object.assign(Object.assign({}, i), {
              opacity: 1,
            })
          ),
          Ud(
            `&.fade-in-height-expand-transition-${c}-to,\n &.fade-in-height-expand-transition-${s}-from`,
            Object.assign(Object.assign({}, a), {
              opacity: 0,
              marginTop: '0 !important',
              marginBottom: '0 !important',
              paddingTop: r ? '0 !important' : void 0,
              paddingBottom: r ? '0 !important' : void 0,
            })
          ),
          Ud(
            `&.fade-in-height-expand-transition-${c}-active`,
            `\n overflow: ${e};\n transition:\n max-height ${t} ${Tg} ${o},\n opacity ${t} ${Ag} ${o},\n margin-top ${t} ${Tg} ${o},\n margin-bottom ${t} ${Tg} ${o},\n padding-top ${t} ${Tg} ${o},\n padding-bottom ${t} ${Tg} ${o}\n ${
              n ? ',' + n : ''
            }\n `
          ),
          Ud(
            `&.fade-in-height-expand-transition-${s}-active`,
            `\n overflow: ${e};\n transition:\n max-height ${t} ${Tg},\n opacity ${t} ${Mg},\n margin-top ${t} ${Tg},\n margin-bottom ${t} ${Tg},\n padding-top ${t} ${Tg},\n padding-bottom ${t} ${Tg}\n ${
              n ? ',' + n : ''
            }\n `
          ),
        ]
      })({
        overflow: 'visible',
        originalTransition: 'transform .3s var(--bezier)',
        enterToProps: { transform: 'scale(1)' },
        leaveToProps: { transform: 'scale(0.85)' },
      }),
    ]
  ),
  Kd(
    'message',
    '\n box-sizing: border-box;\n display: flex;\n align-items: center;\n transition:\n color .3s var(--bezier),\n box-shadow .3s var(--bezier),\n background-color .3s var(--bezier),\n opacity .3s var(--bezier),\n transform .3s var(--bezier),\n margin-bottom .3s var(--bezier);\n padding: var(--padding);\n border-radius: var(--border-radius);\n flex-wrap: nowrap;\n overflow: hidden;\n max-width: var(--max-width);\n color: var(--text-color);\n background-color: var(--color);\n box-shadow: var(--box-shadow);\n ',
    [
      Yd(
        'content',
        '\n display: inline-block;\n line-height: var(--line-height);\n font-size: var(--font-size);\n '
      ),
      Yd(
        'icon',
        '\n position: relative;\n margin: var(--icon-margin);\n height: var(--icon-size);\n width: var(--icon-size);\n font-size: var(--icon-size);\n flex-shrink: 0;\n ',
        [
          [
            'info',
            'success',
            'warning',
            'error',
            'loading',
          ].map((e) =>
            Xd(`${e}-type`, [
              Ud(
                '> *',
                `\n color: var(--icon-color-${e});\n transition: color .3s var(--bezier);\n `
              ),
            ])
          ),
          Ud(
            '> *',
            '\n position: absolute;\n left: 0;\n top: 0;\n right: 0;\n bottom: 0;\n ',
            [yp()]
          ),
        ]
      ),
      Yd(
        'close',
        '\n font-size: var(--close-size);\n margin: var(--close-margin);\n transition: color .3s var(--bezier);\n flex-shrink: 0;\n ',
        [
          Ud(
            '&:hover',
            '\n color: var(--close-color-hover);\n '
          ),
          Ud(
            '&:active',
            '\n color: var(--close-color-pressed);\n '
          ),
        ]
      ),
    ]
  ),
  Kd(
    'message-container',
    '\n z-index: 6000;\n position: fixed;\n height: 0;\n overflow: visible;\n display: flex;\n flex-direction: column;\n align-items: center;\n ',
    [
      Xd('top', '\n top: 12px;\n left: 0;\n right: 0;\n '),
      Xd(
        'top-left',
        '\n top: 12px;\n left: 12px;\n right: 0;\n align-items: flex-start;\n '
      ),
      Xd(
        'top-right',
        '\n top: 12px;\n left: 0;\n right: 12px;\n align-items: flex-end;\n '
      ),
      Xd(
        'bottom',
        '\n bottom: 4px;\n left: 0;\n right: 0;\n justify-content: flex-end;\n '
      ),
      Xd(
        'bottom-left',
        '\n bottom: 4px;\n left: 12px;\n right: 0;\n justify-content: flex-end;\n align-items: flex-start;\n '
      ),
      Xd(
        'bottom-right',
        '\n bottom: 4px;\n left: 0;\n right: 12px;\n justify-content: flex-end;\n align-items: flex-end;\n '
      ),
    ]
  ),
])
const fm = {
  info: dr(lp, null),
  success: dr(sp, null),
  warning: dr(cp, null),
  error: dr(ap, null),
}
var pm = dn({
  name: 'Message',
  props: um,
  setup(e) {
    const { props: t, mergedClsPrefixRef: n } = Gt(mm),
      o = Bf('Message', 'Message', dm, cm, t, n)
    return {
      mergedClsPrefix: n,
      handleClose() {
        var t
        null === (t = e.onClose) ||
          void 0 === t ||
          t.call(e)
      },
      cssVars: ur(() => {
        const { type: t } = e,
          {
            common: { cubicBezierEaseInOut: n },
            self: {
              padding: r,
              margin: i,
              maxWidth: a,
              iconMargin: l,
              closeMargin: s,
              closeSize: c,
              iconSize: u,
              fontSize: d,
              lineHeight: f,
              borderRadius: p,
              iconColorInfo: h,
              iconColorSuccess: v,
              iconColorWarning: g,
              iconColorError: b,
              iconColorLoading: m,
              [Wd('textColor', t)]: y,
              [Wd('boxShadow', t)]: x,
              [Wd('color', t)]: w,
              [Wd('closeColor', t)]: C,
              [Wd('closeColorPressed', t)]: S,
              [Wd('closeColorHover', t)]: k,
            },
          } = o.value
        return {
          '--bezier': n,
          '--margin': i,
          '--padding': r,
          '--max-width': a,
          '--font-size': d,
          '--icon-margin': l,
          '--icon-size': u,
          '--close-size': c,
          '--close-margin': s,
          '--text-color': y,
          '--color': w,
          '--box-shadow': x,
          '--icon-color-info': h,
          '--icon-color-success': v,
          '--icon-color-warning': g,
          '--icon-color-error': b,
          '--icon-color-loading': m,
          '--close-color': C,
          '--close-color-pressed': S,
          '--close-color-hover': k,
          '--line-height': f,
          '--border-radius': p,
        }
      }),
      placement: t.placement,
    }
  },
  render() {
    const {
      icon: e,
      type: t,
      closable: n,
      content: o,
      mergedClsPrefix: r,
      cssVars: i,
      handleClose: a,
    } = this
    return dr(
      'div',
      {
        class: `${r}-message-wrapper`,
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: Object.assign(Object.assign({}, i), {
          alignItems: this.placement.startsWith('top')
            ? 'flex-start'
            : 'flex-end',
        }),
      },
      dr(
        'div',
        { class: `${r}-message ${r}-message--${t}-type` },
        dr(
          'div',
          {
            class: `${r}-message__icon ${r}-message__icon--${t}-type`,
          },
          dr(fp, null, { default: () => [hm(e, t, r)] })
        ),
        dr(
          'div',
          { class: `${r}-message__content` },
          Cf(o)
        ),
        n
          ? dr(bp, {
              clsPrefix: r,
              class: `${r}-message__close`,
              onClick: a,
            })
          : null
      )
    )
  },
})
function hm(e, t, n) {
  return 'function' == typeof e
    ? e()
    : dr(
        vp,
        { clsPrefix: n, key: t },
        {
          default: () =>
            'loading' === t
              ? dr(wp, {
                  clsPrefix: n,
                  strokeWidth: 24,
                  scale: 0.85,
                })
              : fm[t],
        }
      )
}
var vm = dn({
  name: 'MessageEnvironment',
  props: Object.assign(Object.assign({}, um), {
    duration: { type: Number, default: 3e3 },
    onAfterLeave: Function,
    onLeave: Function,
    internalKey: { type: String, required: !0 },
    onInternalAfterLeave: Function,
    onHide: Function,
    onAfterHide: Function,
  }),
  setup(e) {
    let t = null
    const n = nt(!0)
    function o() {
      const { duration: n } = e
      n && (t = window.setTimeout(r, n))
    }
    function r() {
      const { onHide: o } = e
      ;(n.value = !1),
        t && (window.clearTimeout(t), (t = null)),
        o && o()
    }
    return (
      wn(() => {
        o()
      }),
      {
        show: n,
        hide: r,
        handleClose: function () {
          const { onClose: t } = e
          t && t(), r()
        },
        handleAfterLeave: function () {
          const {
            onAfterLeave: t,
            onInternalAfterLeave: n,
            onAfterHide: o,
            internalKey: r,
          } = e
          t && t(), n && n(r), o && o()
        },
        handleMouseleave: function (e) {
          e.currentTarget === e.target && o()
        },
        handleMouseenter: function (e) {
          e.currentTarget === e.target &&
            null !== t &&
            (window.clearTimeout(t), (t = null))
        },
        deactivate: function () {
          r()
        },
      }
    )
  },
  render() {
    return dr(
      pp,
      {
        appear: !0,
        onAfterLeave: this.handleAfterLeave,
        onLeave: this.onLeave,
      },
      {
        default: () => [
          this.show
            ? dr(pm, {
                content: this.content,
                type: this.type,
                icon: this.icon,
                closable: this.closable,
                onClose: this.handleClose,
                onMouseenter: this.keepAliveOnHover
                  ? this.handleMouseenter
                  : void 0,
                onMouseleave: this.keepAliveOnHover
                  ? this.handleMouseleave
                  : void 0,
              })
            : null,
        ],
      }
    )
  },
})
const gm = Symbol('messageApi'),
  bm = Object.assign(Object.assign({}, Bf.props), {
    to: [String, Object],
    duration: { type: Number, default: 3e3 },
    keepAliveOnHover: Boolean,
    max: Number,
    placement: { type: String, default: 'top' },
    closable: Boolean,
    containerStyle: [String, Object],
  }),
  mm = Symbol('messageProvider')
var ym = dn({
  name: 'MessageProvider',
  props: bm,
  setup(e) {
    const { mergedClsPrefixRef: t } = If(e),
      n = nt([]),
      o = nt({}),
      r = {
        info: (e, t) =>
          i(
            e,
            Object.assign(Object.assign({}, t), {
              type: 'info',
            })
          ),
        success: (e, t) =>
          i(
            e,
            Object.assign(Object.assign({}, t), {
              type: 'success',
            })
          ),
        warning: (e, t) =>
          i(
            e,
            Object.assign(Object.assign({}, t), {
              type: 'warning',
            })
          ),
        error: (e, t) =>
          i(
            e,
            Object.assign(Object.assign({}, t), {
              type: 'error',
            })
          ),
        loading: (e, t) =>
          i(
            e,
            Object.assign(Object.assign({}, t), {
              type: 'loading',
            })
          ),
        destroyAll: function () {
          Object.values(o.value).forEach((e) => {
            e.hide()
          })
        },
      }
    function i(t, r = {}) {
      const i = Cl(),
        a = Ue(
          Object.assign(Object.assign({}, r), {
            content: t,
            key: i,
            destroy: () => {
              o.value[i].hide()
            },
          })
        ),
        { max: l } = e
      return (
        l && n.value.length >= l && n.value.shift(),
        n.value.push(a),
        a
      )
    }
    return (
      Ut(mm, { props: e, mergedClsPrefixRef: t }),
      Ut(gm, r),
      Object.assign(
        {
          mergedClsPrefix: t,
          messageRefs: o,
          messageList: n,
          handleAfterLeave: function (e) {
            n.value.splice(
              n.value.findIndex((t) => t.key === e),
              1
            ),
              delete o.value[e]
          },
        },
        r
      )
    )
  },
  render() {
    var e
    return dr(
      Co,
      null,
      Uo(this.$slots, 'default'),
      this.messageList.length
        ? dr(
            go,
            {
              to:
                null !== (e = this.to) && void 0 !== e
                  ? e
                  : 'body',
            },
            dr(
              'div',
              {
                class: [
                  `${this.mergedClsPrefix}-message-container`,
                  `${this.mergedClsPrefix}-message-container--${this.placement}`,
                ],
                key: 'message-container',
                style: this.containerStyle,
              },
              this.messageList.map((e) =>
                dr(
                  vm,
                  Object.assign(
                    {
                      ref: (t) => {
                        t && (this.messageRefs[e.key] = t)
                      },
                      internalKey: e.key,
                      onInternalAfterLeave:
                        this.handleAfterLeave,
                    },
                    (function (e, t = [], n) {
                      const o = {}
                      return (
                        Object.getOwnPropertyNames(
                          e
                        ).forEach((n) => {
                          t.includes(n) || (o[n] = e[n])
                        }),
                        Object.assign(o, n)
                      )
                    })(e, ['destroy'], void 0),
                    {
                      duration:
                        void 0 === e.duration
                          ? this.duration
                          : e.duration,
                      keepAliveOnHover:
                        void 0 === e.keepAliveOnHover
                          ? this.keepAliveOnHover
                          : e.keepAliveOnHover,
                      closable:
                        void 0 === e.closable
                          ? this.closable
                          : e.closable,
                    }
                  )
                )
              )
            )
          )
        : null
    )
  },
})
function xm() {
  const e = Gt(gm, null)
  return (
    null === e &&
      (function (e, t) {
        throw new Error(`[naive/${e}]: ${t}`)
      })(
        'use-message',
        'No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A.'
      ),
    e
  )
}
function wm({
  componentPrefix: e = 'N',
  components: t = [],
} = {}) {
  const n = []
  function o(t, n, o) {
    t.component(e + n) || t.component(e + n, o)
  }
  return {
    version: '2.19.9',
    componentPrefix: e,
    install: function (e) {
      n.includes(e) ||
        (n.push(e),
        t.forEach((t) => {
          const { name: n, alias: r } = t
          o(e, n, t),
            r &&
              r.forEach((n) => {
                o(e, n, t)
              })
        }))
    },
  }
}
export {
  Du as A,
  ob as B,
  Io as C,
  Co as F,
  Hg as N,
  Bo as a,
  ja as b,
  jo as c,
  dn as d,
  Fi as e,
  ti as f,
  wm as g,
  ab as h,
  pb as i,
  Vb as j,
  Ka as k,
  Jb as l,
  nm as m,
  Qb as n,
  Po as o,
  lm as p,
  ym as q,
  bo as r,
  qo as s,
  s as t,
  xm as u,
  yo as v,
  Ht as w,
  xd as x,
  Cd as y,
  nt as z,
}
