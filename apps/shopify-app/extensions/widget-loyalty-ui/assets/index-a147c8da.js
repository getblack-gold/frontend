;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === 'childList')
        for (const o of i.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(s) {
    const i = {}
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    )
  }
  function r(s) {
    if (s.ep) return
    s.ep = !0
    const i = n(s)
    fetch(s.href, i)
  }
})()
const Gi = { context: void 0, registry: void 0 },
  Xi = (t, e) => t === e,
  G = Symbol('solid-proxy'),
  Pr = Symbol('solid-track'),
  Yi = Symbol('solid-dev-component'),
  ke = { equals: Xi }
let Ps = Ds
const yt = 1,
  Me = 2,
  As = { owned: null, cleanups: null, context: null, owner: null },
  pn = {}
var j = null
let gn = null,
  k = null,
  W = null,
  ht = null,
  Ze = 0
function er(t, e) {
  const n = k,
    r = j,
    s = t.length === 0,
    i = s ? As : { owned: null, cleanups: null, context: null, owner: e === void 0 ? r : e },
    o = s ? t : () => t(() => V(() => en(i)))
  ;(j = i), (k = null)
  try {
    return at(o, !0)
  } finally {
    ;(k = n), (j = r)
  }
}
function Z(t, e) {
  e = e ? Object.assign({}, ke, e) : ke
  const n = { value: t, observers: null, observerSlots: null, comparator: e.equals || void 0 },
    r = (s) => (typeof s == 'function' && (s = s(n.value)), Fs(n, s))
  return [Ls.bind(n), r]
}
function Kt(t, e, n) {
  const r = tn(t, e, !0, yt)
  zt(r)
}
function pt(t, e, n) {
  const r = tn(t, e, !1, yt)
  zt(r)
}
function Ft(t, e, n) {
  Ps = so
  const r = tn(t, e, !1, yt)
  ;(!n || !n.render) && (r.user = !0), ht ? ht.push(r) : zt(r)
}
function I(t, e, n) {
  n = n ? Object.assign({}, ke, n) : ke
  const r = tn(t, e, !0, 0)
  return (r.observers = null), (r.observerSlots = null), (r.comparator = n.equals || void 0), zt(r), Ls.bind(r)
}
function Ji(t, e, n) {
  let r, s, i
  ;(arguments.length === 2 && typeof e == 'object') || arguments.length === 1
    ? ((r = !0), (s = t), (i = e || {}))
    : ((r = t), (s = e), (i = n || {}))
  let o = null,
    a = pn,
    c = !1,
    l = 'initialValue' in i,
    u = typeof r == 'function' && I(r)
  const f = new Set(),
    [d, p] = (i.storage || Z)(i.initialValue),
    [y, g] = Z(void 0),
    [b, w] = Z(void 0, { equals: !1 }),
    [x, R] = Z(l ? 'ready' : 'unresolved')
  function N(F, S, v, h) {
    return (
      o === F &&
        ((o = null),
        h !== void 0 && (l = !0),
        (F === a || S === a) && i.onHydrated && queueMicrotask(() => i.onHydrated(h, { value: S })),
        (a = pn),
        D(S, v)),
      S
    )
  }
  function D(F, S) {
    at(() => {
      S === void 0 && p(() => F), R(S !== void 0 ? 'errored' : l ? 'ready' : 'unresolved'), g(S)
      for (const v of f.keys()) v.decrement()
      f.clear()
    }, !1)
  }
  function L() {
    const F = eo,
      S = d(),
      v = y()
    if (v !== void 0 && !o) throw v
    return (
      k &&
        !k.user &&
        F &&
        Kt(() => {
          b(), o && (F.resolved || f.has(F) || (F.increment(), f.add(F)))
        }),
      S
    )
  }
  function M(F = !0) {
    if (F !== !1 && c) return
    c = !1
    const S = u ? u() : r
    if (S == null || S === !1) {
      N(o, V(d))
      return
    }
    const v = a !== pn ? a : V(() => s(S, { value: d(), refetching: F }))
    return typeof v != 'object' || !(v && 'then' in v)
      ? (N(o, v, void 0, S), v)
      : ((o = v),
        (c = !0),
        queueMicrotask(() => (c = !1)),
        at(() => {
          R(l ? 'refreshing' : 'pending'), w()
        }, !1),
        v.then(
          (h) => N(v, h, void 0, S),
          (h) => N(v, void 0, $s(h), S),
        ))
  }
  return (
    Object.defineProperties(L, {
      state: { get: () => x() },
      error: { get: () => y() },
      loading: {
        get() {
          const F = x()
          return F === 'pending' || F === 'refreshing'
        },
      },
      latest: {
        get() {
          if (!l) return L()
          const F = y()
          if (F && !o) throw F
          return d()
        },
      },
    }),
    u ? Kt(() => M(!1)) : M(!1),
    [L, { refetch: M, mutate: p }]
  )
}
function Zi(t) {
  return at(t, !1)
}
function V(t) {
  if (k === null) return t()
  const e = k
  k = null
  try {
    return t()
  } finally {
    k = e
  }
}
function ue(t, e, n) {
  const r = Array.isArray(t)
  let s,
    i = n && n.defer
  return (o) => {
    let a
    if (r) {
      a = Array(t.length)
      for (let l = 0; l < t.length; l++) a[l] = t[l]()
    } else a = t()
    if (i) {
      i = !1
      return
    }
    const c = V(() => e(a, s, o))
    return (s = a), c
  }
}
function nr(t) {
  Ft(() => V(t))
}
function ot(t) {
  return j === null || (j.cleanups === null ? (j.cleanups = [t]) : j.cleanups.push(t)), t
}
function Cs() {
  return k
}
function Ts() {
  return j
}
function Rs(t, e) {
  const n = j,
    r = k
  ;(j = t), (k = null)
  try {
    return at(e, !0)
  } catch (s) {
    rr(s)
  } finally {
    ;(j = n), (k = r)
  }
}
function to(t) {
  const e = k,
    n = j
  return Promise.resolve().then(() => {
    ;(k = e), (j = n)
    let r
    return at(t, !1), (k = j = null), r ? r.done : void 0
  })
}
function Ee(t, e) {
  const n = Symbol('context')
  return { id: n, Provider: io(n), defaultValue: t }
}
function Ht(t) {
  let e
  return (e = Is(j, t.id)) !== void 0 ? e : t.defaultValue
}
function Se(t) {
  const e = I(t),
    n = I(() => Dn(e()))
  return (
    (n.toArray = () => {
      const r = n()
      return Array.isArray(r) ? r : r != null ? [r] : []
    }),
    n
  )
}
let eo
function Ls() {
  if (this.sources && this.state)
    if (this.state === yt) zt(this)
    else {
      const t = W
      ;(W = null), at(() => _e(this), !1), (W = t)
    }
  if (k) {
    const t = this.observers ? this.observers.length : 0
    k.sources ? (k.sources.push(this), k.sourceSlots.push(t)) : ((k.sources = [this]), (k.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(k), this.observerSlots.push(k.sources.length - 1))
        : ((this.observers = [k]), (this.observerSlots = [k.sources.length - 1]))
  }
  return this.value
}
function Fs(t, e, n) {
  let r = t.value
  return (
    (!t.comparator || !t.comparator(r, e)) &&
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        at(() => {
          for (let s = 0; s < t.observers.length; s += 1) {
            const i = t.observers[s],
              o = gn && gn.running
            o && gn.disposed.has(i),
              (o ? !i.tState : !i.state) && (i.pure ? W.push(i) : ht.push(i), i.observers && Ns(i)),
              o || (i.state = yt)
          }
          if (W.length > 1e6) throw ((W = []), new Error())
        }, !1)),
    e
  )
}
function zt(t) {
  if (!t.fn) return
  en(t)
  const e = j,
    n = k,
    r = Ze
  ;(k = j = t), no(t, t.value, r), (k = n), (j = e)
}
function no(t, e, n) {
  let r
  try {
    r = t.fn(e)
  } catch (s) {
    return t.pure && ((t.state = yt), t.owned && t.owned.forEach(en), (t.owned = null)), (t.updatedAt = n + 1), rr(s)
  }
  ;(!t.updatedAt || t.updatedAt <= n) &&
    (t.updatedAt != null && 'observers' in t ? Fs(t, r) : (t.value = r), (t.updatedAt = n))
}
function tn(t, e, n, r = yt, s) {
  const i = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: j,
    context: null,
    pure: n,
  }
  return j === null || (j !== As && (j.owned ? j.owned.push(i) : (j.owned = [i]))), i
}
function je(t) {
  if (t.state === 0) return
  if (t.state === Me) return _e(t)
  if (t.suspense && V(t.suspense.inFallback)) return t.suspense.effects.push(t)
  const e = [t]
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Ze); ) t.state && e.push(t)
  for (let n = e.length - 1; n >= 0; n--)
    if (((t = e[n]), t.state === yt)) zt(t)
    else if (t.state === Me) {
      const r = W
      ;(W = null), at(() => _e(t, e[0]), !1), (W = r)
    }
}
function at(t, e) {
  if (W) return t()
  let n = !1
  e || (W = []), ht ? (n = !0) : (ht = []), Ze++
  try {
    const r = t()
    return ro(n), r
  } catch (r) {
    n || (ht = null), (W = null), rr(r)
  }
}
function ro(t) {
  if ((W && (Ds(W), (W = null)), t)) return
  const e = ht
  ;(ht = null), e.length && at(() => Ps(e), !1)
}
function Ds(t) {
  for (let e = 0; e < t.length; e++) je(t[e])
}
function so(t) {
  let e,
    n = 0
  for (e = 0; e < t.length; e++) {
    const r = t[e]
    r.user ? (t[n++] = r) : je(r)
  }
  for (e = 0; e < n; e++) je(t[e])
}
function _e(t, e) {
  t.state = 0
  for (let n = 0; n < t.sources.length; n += 1) {
    const r = t.sources[n]
    if (r.sources) {
      const s = r.state
      s === yt ? r !== e && (!r.updatedAt || r.updatedAt < Ze) && je(r) : s === Me && _e(r, e)
    }
  }
}
function Ns(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const n = t.observers[e]
    n.state || ((n.state = Me), n.pure ? W.push(n) : ht.push(n), n.observers && Ns(n))
  }
}
function en(t) {
  let e
  if (t.sources)
    for (; t.sources.length; ) {
      const n = t.sources.pop(),
        r = t.sourceSlots.pop(),
        s = n.observers
      if (s && s.length) {
        const i = s.pop(),
          o = n.observerSlots.pop()
        r < s.length && ((i.sourceSlots[o] = r), (s[r] = i), (n.observerSlots[r] = o))
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--) en(t.owned[e])
    t.owned = null
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]()
    t.cleanups = null
  }
  ;(t.state = 0), (t.context = null)
}
function $s(t) {
  return t instanceof Error ? t : new Error(typeof t == 'string' ? t : 'Unknown error', { cause: t })
}
function rr(t, e = j) {
  throw $s(t)
}
function Is(t, e) {
  return t ? (t.context && t.context[e] !== void 0 ? t.context[e] : Is(t.owner, e)) : void 0
}
function Dn(t) {
  if (typeof t == 'function' && !t.length) return Dn(t())
  if (Array.isArray(t)) {
    const e = []
    for (let n = 0; n < t.length; n++) {
      const r = Dn(t[n])
      Array.isArray(r) ? e.push.apply(e, r) : e.push(r)
    }
    return e
  }
  return t
}
function io(t, e) {
  return function (r) {
    let s
    return pt(() => (s = V(() => ((j.context = { [t]: r.value }), Se(() => r.children)))), void 0), s
  }
}
function P(t, e) {
  return V(() => t(e || {}))
}
function Oe() {
  return !0
}
const Nn = {
  get(t, e, n) {
    return e === G ? n : t.get(e)
  },
  has(t, e) {
    return e === G ? !0 : t.has(e)
  },
  set: Oe,
  deleteProperty: Oe,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e)
      },
      set: Oe,
      deleteProperty: Oe,
    }
  },
  ownKeys(t) {
    return t.keys()
  },
}
function yn(t) {
  return (t = typeof t == 'function' ? t() : t) ? t : {}
}
function oo() {
  for (let t = 0, e = this.length; t < e; ++t) {
    const n = this[t]()
    if (n !== void 0) return n
  }
}
function St(...t) {
  let e = !1
  for (let i = 0; i < t.length; i++) {
    const o = t[i]
    ;(e = e || (!!o && G in o)), (t[i] = typeof o == 'function' ? ((e = !0), I(o)) : o)
  }
  if (e)
    return new Proxy(
      {
        get(i) {
          for (let o = t.length - 1; o >= 0; o--) {
            const a = yn(t[o])[i]
            if (a !== void 0) return a
          }
        },
        has(i) {
          for (let o = t.length - 1; o >= 0; o--) if (i in yn(t[o])) return !0
          return !1
        },
        keys() {
          const i = []
          for (let o = 0; o < t.length; o++) i.push(...Object.keys(yn(t[o])))
          return [...new Set(i)]
        },
      },
      Nn,
    )
  const n = {},
    r = {},
    s = new Set()
  for (let i = t.length - 1; i >= 0; i--) {
    const o = t[i]
    if (!o) continue
    const a = Object.getOwnPropertyNames(o)
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c]
      if (u === '__proto__' || u === 'constructor') continue
      const f = Object.getOwnPropertyDescriptor(o, u)
      if (!s.has(u))
        f.get
          ? (s.add(u),
            Object.defineProperty(n, u, { enumerable: !0, configurable: !0, get: oo.bind((r[u] = [f.get.bind(o)])) }))
          : (f.value !== void 0 && s.add(u), (n[u] = f.value))
      else {
        const d = r[u]
        d
          ? f.get
            ? d.push(f.get.bind(o))
            : f.value !== void 0 && d.push(() => f.value)
          : n[u] === void 0 && (n[u] = f.value)
      }
    }
  }
  return n
}
function xe(t, ...e) {
  if (G in t) {
    const s = new Set(e.length > 1 ? e.flat() : e[0]),
      i = e.map(
        (o) =>
          new Proxy(
            {
              get(a) {
                return o.includes(a) ? t[a] : void 0
              },
              has(a) {
                return o.includes(a) && a in t
              },
              keys() {
                return o.filter((a) => a in t)
              },
            },
            Nn,
          ),
      )
    return (
      i.push(
        new Proxy(
          {
            get(o) {
              return s.has(o) ? void 0 : t[o]
            },
            has(o) {
              return s.has(o) ? !1 : o in t
            },
            keys() {
              return Object.keys(t).filter((o) => !s.has(o))
            },
          },
          Nn,
        ),
      ),
      i
    )
  }
  const n = {},
    r = e.map(() => ({}))
  for (const s of Object.getOwnPropertyNames(t)) {
    const i = Object.getOwnPropertyDescriptor(t, s),
      o = !i.get && !i.set && i.enumerable && i.writable && i.configurable
    let a = !1,
      c = 0
    for (const l of e) l.includes(s) && ((a = !0), o ? (r[c][s] = i.value) : Object.defineProperty(r[c], s, i)), ++c
    a || (o ? (n[s] = i.value) : Object.defineProperty(n, s, i))
  }
  return [...r, n]
}
let ao = 0
function co() {
  return `cl-${ao++}`
}
const ks = (t) => `Stale read from <${t}>.`
function fe(t) {
  const e = t.keyed,
    n = I(() => t.when, void 0, { equals: (r, s) => (e ? r === s : !r == !s) })
  return I(
    () => {
      const r = n()
      if (r) {
        const s = t.children
        return typeof s == 'function' && s.length > 0
          ? V(() =>
              s(
                e
                  ? r
                  : () => {
                      if (!V(n)) throw ks('Show')
                      return t.when
                    },
              ),
            )
          : s
      }
      return t.fallback
    },
    void 0,
    void 0,
  )
}
function Ms(t) {
  let e = !1
  const n = (i, o) => i[0] === o[0] && (e ? i[1] === o[1] : !i[1] == !o[1]) && i[2] === o[2],
    r = Se(() => t.children),
    s = I(
      () => {
        let i = r()
        Array.isArray(i) || (i = [i])
        for (let o = 0; o < i.length; o++) {
          const a = i[o].when
          if (a) return (e = !!i[o].keyed), [o, a, i[o]]
        }
        return [-1]
      },
      void 0,
      { equals: n },
    )
  return I(
    () => {
      const [i, o, a] = s()
      if (i < 0) return t.fallback
      const c = a.children
      return typeof c == 'function' && c.length > 0
        ? V(() =>
            c(
              e
                ? o
                : () => {
                    if (V(s)[0] !== i) throw ks('Match')
                    return a.when
                  },
            ),
          )
        : c
    },
    void 0,
    void 0,
  )
}
function _t(t) {
  return t
}
const lo = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ],
  uo = new Set(['className', 'value', 'readOnly', 'formNoValidate', 'isMap', 'noModule', 'playsInline', ...lo]),
  fo = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  ho = Object.assign(Object.create(null), { className: 'class', htmlFor: 'for' }),
  po = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
  })
function go(t, e) {
  const n = po[t]
  return typeof n == 'object' ? (n[e] ? n.$ : void 0) : n
}
const yo = new Set([
    'beforeinput',
    'click',
    'dblclick',
    'contextmenu',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'touchend',
    'touchmove',
    'touchstart',
  ]),
  mo = new Set([
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'circle',
    'clipPath',
    'color-profile',
    'cursor',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'hkern',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'metadata',
    'missing-glyph',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'set',
    'stop',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'tref',
    'tspan',
    'use',
    'view',
    'vkern',
  ]),
  bo = { xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace' }
function vo(t, e, n) {
  let r = n.length,
    s = e.length,
    i = r,
    o = 0,
    a = 0,
    c = e[s - 1].nextSibling,
    l = null
  for (; o < s || a < i; ) {
    if (e[o] === n[a]) {
      o++, a++
      continue
    }
    for (; e[s - 1] === n[i - 1]; ) s--, i--
    if (s === o) {
      const u = i < r ? (a ? n[a - 1].nextSibling : n[i - a]) : c
      for (; a < i; ) t.insertBefore(n[a++], u)
    } else if (i === a) for (; o < s; ) (!l || !l.has(e[o])) && e[o].remove(), o++
    else if (e[o] === n[i - 1] && n[a] === e[s - 1]) {
      const u = e[--s].nextSibling
      t.insertBefore(n[a++], e[o++].nextSibling), t.insertBefore(n[--i], u), (e[s] = n[i])
    } else {
      if (!l) {
        l = new Map()
        let f = a
        for (; f < i; ) l.set(n[f], f++)
      }
      const u = l.get(e[o])
      if (u != null)
        if (a < u && u < i) {
          let f = o,
            d = 1,
            p
          for (; ++f < s && f < i && !((p = l.get(e[f])) == null || p !== u + d); ) d++
          if (d > u - a) {
            const y = e[o]
            for (; a < u; ) t.insertBefore(n[a++], y)
          } else t.replaceChild(n[a++], e[o++])
        } else o++
      else e[o++].remove()
    }
  }
}
const Ar = '_$DX_DELEGATE'
function wo(t, e, n, r = {}) {
  let s
  return (
    er((i) => {
      ;(s = i), e === document ? t() : B(e, t(), e.firstChild ? null : void 0, n)
    }, r.owner),
    () => {
      s(), (e.textContent = '')
    }
  )
}
function Q(t, e, n) {
  let r
  const s = () => {
      const o = document.createElement('template')
      return (o.innerHTML = t), n ? o.content.firstChild.firstChild : o.content.firstChild
    },
    i = e ? () => V(() => document.importNode(r || (r = s()), !0)) : () => (r || (r = s())).cloneNode(!0)
  return (i.cloneNode = i), i
}
function sr(t, e = window.document) {
  const n = e[Ar] || (e[Ar] = new Set())
  for (let r = 0, s = t.length; r < s; r++) {
    const i = t[r]
    n.has(i) || (n.add(i), e.addEventListener(i, To))
  }
}
function $n(t, e, n) {
  n == null ? t.removeAttribute(e) : t.setAttribute(e, n)
}
function Eo(t, e, n, r) {
  r == null ? t.removeAttributeNS(e, n) : t.setAttributeNS(e, n, r)
}
function So(t, e) {
  e == null ? t.removeAttribute('class') : (t.className = e)
}
function xo(t, e, n, r) {
  if (r) Array.isArray(n) ? ((t[`$$${e}`] = n[0]), (t[`$$${e}Data`] = n[1])) : (t[`$$${e}`] = n)
  else if (Array.isArray(n)) {
    const s = n[0]
    t.addEventListener(e, (n[0] = (i) => s.call(t, n[1], i)))
  } else t.addEventListener(e, n)
}
function js(t, e, n = {}) {
  const r = Object.keys(e || {}),
    s = Object.keys(n)
  let i, o
  for (i = 0, o = s.length; i < o; i++) {
    const a = s[i]
    !a || a === 'undefined' || e[a] || (Cr(t, a, !1), delete n[a])
  }
  for (i = 0, o = r.length; i < o; i++) {
    const a = r[i],
      c = !!e[a]
    !a || a === 'undefined' || n[a] === c || !c || (Cr(t, a, !0), (n[a] = c))
  }
  return n
}
function Oo(t, e, n) {
  if (!e) return n ? $n(t, 'style') : e
  const r = t.style
  if (typeof e == 'string') return (r.cssText = e)
  typeof n == 'string' && (r.cssText = n = void 0), n || (n = {}), e || (e = {})
  let s, i
  for (i in n) e[i] == null && r.removeProperty(i), delete n[i]
  for (i in e) (s = e[i]), s !== n[i] && (r.setProperty(i, s), (n[i] = s))
  return n
}
function nn(t, e = {}, n, r) {
  const s = {}
  return (
    r || pt(() => (s.children = Ut(t, e.children, s.children))),
    pt(() => e.ref && e.ref(t)),
    pt(() => Ao(t, e, n, !0, s, !0)),
    s
  )
}
function Po(t, e, n) {
  return V(() => t(e, n))
}
function B(t, e, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof e != 'function')) return Ut(t, e, r, n)
  pt((s) => Ut(t, e(), s, n), r)
}
function Ao(t, e, n, r, s = {}, i = !1) {
  e || (e = {})
  for (const o in s)
    if (!(o in e)) {
      if (o === 'children') continue
      s[o] = Tr(t, o, null, s[o], n, i)
    }
  for (const o in e) {
    if (o === 'children') {
      r || Ut(t, e.children)
      continue
    }
    const a = e[o]
    s[o] = Tr(t, o, a, s[o], n, i)
  }
}
function Co(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, n) => n.toUpperCase())
}
function Cr(t, e, n) {
  const r = e.trim().split(/\s+/)
  for (let s = 0, i = r.length; s < i; s++) t.classList.toggle(r[s], n)
}
function Tr(t, e, n, r, s, i) {
  let o, a, c, l, u
  if (e === 'style') return Oo(t, n, r)
  if (e === 'classList') return js(t, n, r)
  if (n === r) return r
  if (e === 'ref') i || n(t)
  else if (e.slice(0, 3) === 'on:') {
    const f = e.slice(3)
    r && t.removeEventListener(f, r), n && t.addEventListener(f, n)
  } else if (e.slice(0, 10) === 'oncapture:') {
    const f = e.slice(10)
    r && t.removeEventListener(f, r, !0), n && t.addEventListener(f, n, !0)
  } else if (e.slice(0, 2) === 'on') {
    const f = e.slice(2).toLowerCase(),
      d = yo.has(f)
    if (!d && r) {
      const p = Array.isArray(r) ? r[0] : r
      t.removeEventListener(f, p)
    }
    ;(d || n) && (xo(t, f, n, d), d && sr([f]))
  } else if (e.slice(0, 5) === 'attr:') $n(t, e.slice(5), n)
  else if (
    (u = e.slice(0, 5) === 'prop:') ||
    (c = fo.has(e)) ||
    (!s && ((l = go(e, t.tagName)) || (a = uo.has(e)))) ||
    (o = t.nodeName.includes('-'))
  )
    u && ((e = e.slice(5)), (a = !0)),
      e === 'class' || e === 'className' ? So(t, n) : o && !a && !c ? (t[Co(e)] = n) : (t[l || e] = n)
  else {
    const f = s && e.indexOf(':') > -1 && bo[e.split(':')[0]]
    f ? Eo(t, f, e, n) : $n(t, ho[e] || e, n)
  }
  return n
}
function To(t) {
  const e = `$$${t.type}`
  let n = (t.composedPath && t.composedPath()[0]) || t.target
  for (
    t.target !== n && Object.defineProperty(t, 'target', { configurable: !0, value: n }),
      Object.defineProperty(t, 'currentTarget', {
        configurable: !0,
        get() {
          return n || document
        },
      });
    n;

  ) {
    const r = n[e]
    if (r && !n.disabled) {
      const s = n[`${e}Data`]
      if ((s !== void 0 ? r.call(n, s, t) : r.call(n, t), t.cancelBubble)) return
    }
    n = n._$host || n.parentNode || n.host
  }
}
function Ut(t, e, n, r, s) {
  for (; typeof n == 'function'; ) n = n()
  if (e === n) return n
  const i = typeof e,
    o = r !== void 0
  if (((t = (o && n[0] && n[0].parentNode) || t), i === 'string' || i === 'number'))
    if ((i === 'number' && (e = e.toString()), o)) {
      let a = n[0]
      a && a.nodeType === 3 ? (a.data = e) : (a = document.createTextNode(e)), (n = It(t, n, r, a))
    } else n !== '' && typeof n == 'string' ? (n = t.firstChild.data = e) : (n = t.textContent = e)
  else if (e == null || i === 'boolean') n = It(t, n, r)
  else {
    if (i === 'function')
      return (
        pt(() => {
          let a = e()
          for (; typeof a == 'function'; ) a = a()
          n = Ut(t, a, n, r)
        }),
        () => n
      )
    if (Array.isArray(e)) {
      const a = [],
        c = n && Array.isArray(n)
      if (In(a, e, n, s)) return pt(() => (n = Ut(t, a, n, r, !0))), () => n
      if (a.length === 0) {
        if (((n = It(t, n, r)), o)) return n
      } else c ? (n.length === 0 ? Rr(t, a, r) : vo(t, n, a)) : (n && It(t), Rr(t, a))
      n = a
    } else if (e.nodeType) {
      if (Array.isArray(n)) {
        if (o) return (n = It(t, n, r, e))
        It(t, n, null, e)
      } else n == null || n === '' || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild)
      n = e
    } else console.warn('Unrecognized value. Skipped inserting', e)
  }
  return n
}
function In(t, e, n, r) {
  let s = !1
  for (let i = 0, o = e.length; i < o; i++) {
    let a = e[i],
      c = n && n[i],
      l
    if (!(a == null || a === !0 || a === !1))
      if ((l = typeof a) == 'object' && a.nodeType) t.push(a)
      else if (Array.isArray(a)) s = In(t, a, c) || s
      else if (l === 'function')
        if (r) {
          for (; typeof a == 'function'; ) a = a()
          s = In(t, Array.isArray(a) ? a : [a], Array.isArray(c) ? c : [c]) || s
        } else t.push(a), (s = !0)
      else {
        const u = String(a)
        c && c.nodeType === 3 && c.data === u ? t.push(c) : t.push(document.createTextNode(u))
      }
  }
  return s
}
function Rr(t, e, n = null) {
  for (let r = 0, s = e.length; r < s; r++) t.insertBefore(e[r], n)
}
function It(t, e, n, r) {
  if (n === void 0) return (t.textContent = '')
  const s = r || document.createTextNode('')
  if (e.length) {
    let i = !1
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o]
      if (s !== a) {
        const c = a.parentNode === t
        !i && !o ? (c ? t.replaceChild(s, a) : t.insertBefore(s, n)) : c && a.remove()
      } else i = !0
    }
  } else t.insertBefore(s, n)
  return [s]
}
const _s = !1,
  Ro = 'http://www.w3.org/2000/svg'
function Bs(t, e = !1) {
  return e ? document.createElementNS(Ro, t) : document.createElement(t)
}
function Lo(t) {
  const { useShadow: e } = t,
    n = document.createTextNode(''),
    r = () => t.mount || document.body,
    s = Ts()
  let i,
    o = !!Gi.context
  return (
    Ft(
      () => {
        i || (i = Rs(s, () => I(() => t.children)))
        const a = r()
        if (a instanceof HTMLHeadElement) {
          const [c, l] = Z(!1),
            u = () => l(!0)
          er((f) => B(a, () => (c() ? f() : i()), null)), ot(u)
        } else {
          const c = Bs(t.isSVG ? 'g' : 'div', t.isSVG),
            l = e && c.attachShadow ? c.attachShadow({ mode: 'open' }) : c
          Object.defineProperty(c, '_$host', {
            get() {
              return n.parentNode
            },
            configurable: !0,
          }),
            B(l, i),
            a.appendChild(c),
            t.ref && t.ref(c),
            ot(() => a.removeChild(c))
        }
      },
      void 0,
      { render: !o },
    ),
    n
  )
}
function Fo(t) {
  const [e, n] = xe(t, ['component']),
    r = I(() => e.component)
  return I(() => {
    const s = r()
    switch (typeof s) {
      case 'function':
        return Object.assign(s, { [Yi]: !0 }), V(() => s(n))
      case 'string':
        const i = mo.has(s),
          o = Bs(s, i)
        return nn(o, n, i), o
    }
  })
}
function Do(t, e, n) {
  return t.addEventListener(e, n), () => t.removeEventListener(e, n)
}
function No([t, e], n, r) {
  return [n ? () => n(t()) : t, r ? (s) => e(r(s)) : e]
}
function $o(t) {
  try {
    return document.querySelector(t)
  } catch {
    return null
  }
}
function qs(t, e) {
  const n = $o(`#${t}`)
  n ? n.scrollIntoView() : e && window.scrollTo(0, 0)
}
function Io() {
  const t = ['/']
  let e = 0
  const n = [],
    r = (s) => {
      e = Math.max(0, Math.min(e + s, t.length - 1))
      const i = t[e]
      n.forEach((o) => o(i))
    }
  return {
    get: () => t[e],
    set: ({ value: s, scroll: i, replace: o }) => {
      o ? (t[e] = s) : (t.splice(e + 1, t.length - e, s), e++), i && qs(s.split('#')[1] || '', !0)
    },
    back: () => {
      r(-1)
    },
    forward: () => {
      r(1)
    },
    go: r,
    listen: (s) => (
      n.push(s),
      () => {
        const i = n.indexOf(s)
        n.splice(i, 1)
      }
    ),
  }
}
function Ks(t, e, n, r) {
  let s = !1
  const i = (a) => (typeof a == 'string' ? { value: a } : a),
    o = No(Z(i(t()), { equals: (a, c) => a.value === c.value }), void 0, (a) => (!s && e(a), a))
  return (
    n &&
      ot(
        n((a = t()) => {
          ;(s = !0), o[1](i(a)), (s = !1)
        }),
      ),
    { signal: o, utils: r }
  )
}
function ko(t) {
  if (t) {
    if (Array.isArray(t)) return { signal: t }
  } else return { signal: Z({ value: '' }) }
  return t
}
function Mo() {
  return Ks(
    () => ({ value: window.location.pathname + window.location.search + window.location.hash, state: history.state }),
    ({ value: t, replace: e, scroll: n, state: r }) => {
      e ? window.history.replaceState(r, '', t) : window.history.pushState(r, '', t),
        qs(window.location.hash.slice(1), n)
    },
    (t) => Do(window, 'popstate', () => t()),
    { go: (t) => window.history.go(t) },
  )
}
function jo() {
  const t = Io()
  return Ks(t.get, t.set, t.listen, { go: t.go })
}
function _o() {
  let t = new Set()
  function e(s) {
    return t.add(s), () => t.delete(s)
  }
  let n = !1
  function r(s, i) {
    if (n) return !(n = !1)
    const o = { to: s, options: i, defaultPrevented: !1, preventDefault: () => (o.defaultPrevented = !0) }
    for (const a of t)
      a.listener({
        ...o,
        from: a.location,
        retry: (c) => {
          c && (n = !0), a.navigate(s, i)
        },
      })
    return !o.defaultPrevented
  }
  return { subscribe: e, confirm: r }
}
const Bo = /^(?:[a-z0-9]+:)?\/\//i,
  qo = /^\/+|(\/)\/+$/g
function Lt(t, e = !1) {
  const n = t.replace(qo, '$1')
  return n ? (e || /^[?#]/.test(n) ? n : '/' + n) : ''
}
function Le(t, e, n) {
  if (Bo.test(e)) return
  const r = Lt(t),
    s = n && Lt(n)
  let i = ''
  return (
    !s || e.startsWith('/') ? (i = r) : s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? (i = r + s) : (i = s),
    (i || '/') + Lt(e, !i)
  )
}
function Ko(t, e) {
  if (t == null) throw new Error(e)
  return t
}
function Us(t, e) {
  return Lt(t).replace(/\/*(\*.*)?$/g, '') + Lt(e)
}
function Uo(t) {
  const e = {}
  return (
    t.searchParams.forEach((n, r) => {
      e[r] = n
    }),
    e
  )
}
function Vo(t, e, n) {
  const [r, s] = t.split('/*', 2),
    i = r.split('/').filter(Boolean),
    o = i.length
  return (a) => {
    const c = a.split('/').filter(Boolean),
      l = c.length - o
    if (l < 0 || (l > 0 && s === void 0 && !e)) return null
    const u = { path: o ? '' : '/', params: {} },
      f = (d) => (n === void 0 ? void 0 : n[d])
    for (let d = 0; d < o; d++) {
      const p = i[d],
        y = c[d],
        g = p[0] === ':',
        b = g ? p.slice(1) : p
      if (g && mn(y, f(b))) u.params[b] = y
      else if (g || !mn(y, p)) return null
      u.path += `/${y}`
    }
    if (s) {
      const d = l ? c.slice(-l).join('/') : ''
      if (mn(d, f(s))) u.params[s] = d
      else return null
    }
    return u
  }
}
function mn(t, e) {
  const n = (r) => r.localeCompare(t, void 0, { sensitivity: 'base' }) === 0
  return e === void 0
    ? !0
    : typeof e == 'string'
    ? n(e)
    : typeof e == 'function'
    ? e(t)
    : Array.isArray(e)
    ? e.some(n)
    : e instanceof RegExp
    ? e.test(t)
    : !1
}
function Qo(t) {
  const [e, n] = t.pattern.split('/*', 2),
    r = e.split('/').filter(Boolean)
  return r.reduce((s, i) => s + (i.startsWith(':') ? 2 : 3), r.length - (n === void 0 ? 0 : 1))
}
function Vs(t) {
  const e = new Map(),
    n = Ts()
  return new Proxy(
    {},
    {
      get(r, s) {
        return (
          e.has(s) ||
            Rs(n, () =>
              e.set(
                s,
                I(() => t()[s]),
              ),
            ),
          e.get(s)()
        )
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 }
      },
      ownKeys() {
        return Reflect.ownKeys(t())
      },
    },
  )
}
function Qs(t) {
  let e = /(\/?\:[^\/]+)\?/.exec(t)
  if (!e) return [t]
  let n = t.slice(0, e.index),
    r = t.slice(e.index + e[0].length)
  const s = [n, (n += e[1])]
  for (; (e = /^(\/\:[^\/]+)\?/.exec(r)); ) s.push((n += e[1])), (r = r.slice(e[0].length))
  return Qs(r).reduce((i, o) => [...i, ...s.map((a) => a + o)], [])
}
const Wo = 100,
  Ws = Ee(),
  rn = Ee(),
  sn = () => Ko(Ht(Ws), 'Make sure your app is wrapped in a <Router />')
let de
const ir = () => de || Ht(rn) || sn().base,
  Ho = (t) => {
    const e = ir()
    return I(() => e.resolvePath(t()))
  },
  zo = (t) => {
    const e = sn()
    return I(() => {
      const n = t()
      return n !== void 0 ? e.renderPath(n) : n
    })
  },
  Hs = () => sn().location
function Go(t, e = '', n) {
  const { component: r, data: s, children: i } = t,
    o = !i || (Array.isArray(i) && !i.length),
    a = {
      key: t,
      element: r
        ? () => P(r, {})
        : () => {
            const { element: c } = t
            return c === void 0 && n ? P(n, {}) : c
          },
      preload: t.component ? r.preload : t.preload,
      data: s,
    }
  return zs(t.path).reduce((c, l) => {
    for (const u of Qs(l)) {
      const f = Us(e, u),
        d = o ? f : f.split('/*', 1)[0]
      c.push({ ...a, originalPath: u, pattern: d, matcher: Vo(d, !o, t.matchFilters) })
    }
    return c
  }, [])
}
function Xo(t, e = 0) {
  return {
    routes: t,
    score: Qo(t[t.length - 1]) * 1e4 - e,
    matcher(n) {
      const r = []
      for (let s = t.length - 1; s >= 0; s--) {
        const i = t[s],
          o = i.matcher(n)
        if (!o) return null
        r.unshift({ ...o, route: i })
      }
      return r
    },
  }
}
function zs(t) {
  return Array.isArray(t) ? t : [t]
}
function Gs(t, e = '', n, r = [], s = []) {
  const i = zs(t)
  for (let o = 0, a = i.length; o < a; o++) {
    const c = i[o]
    if (c && typeof c == 'object' && c.hasOwnProperty('path')) {
      const l = Go(c, e, n)
      for (const u of l) {
        r.push(u)
        const f = Array.isArray(c.children) && c.children.length === 0
        if (c.children && !f) Gs(c.children, u.pattern, n, r, s)
        else {
          const d = Xo([...r], s.length)
          s.push(d)
        }
        r.pop()
      }
    }
  }
  return r.length ? s : s.sort((o, a) => a.score - o.score)
}
function Yo(t, e) {
  for (let n = 0, r = t.length; n < r; n++) {
    const s = t[n].matcher(e)
    if (s) return s
  }
  return []
}
function Jo(t, e) {
  const n = new URL('http://sar'),
    r = I(
      (c) => {
        const l = t()
        try {
          return new URL(l, n)
        } catch {
          return console.error(`Invalid path ${l}`), c
        }
      },
      n,
      { equals: (c, l) => c.href === l.href },
    ),
    s = I(() => r().pathname),
    i = I(() => r().search, !0),
    o = I(() => r().hash),
    a = I(() => '')
  return {
    get pathname() {
      return s()
    },
    get search() {
      return i()
    },
    get hash() {
      return o()
    },
    get state() {
      return e()
    },
    get key() {
      return a()
    },
    query: Vs(ue(i, () => Uo(r()))),
  }
}
function Zo(t, e = '', n, r) {
  const {
      signal: [s, i],
      utils: o = {},
    } = ko(t),
    a = o.parsePath || ((v) => v),
    c = o.renderPath || ((v) => v),
    l = o.beforeLeave || _o(),
    u = Le('', e),
    f = void 0
  if (u === void 0) throw new Error(`${u} is not a valid base path`)
  u && !s().value && i({ value: u, replace: !0, scroll: !1 })
  const [d, p] = Z(!1),
    y = async (v) => {
      p(!0)
      try {
        await to(v)
      } finally {
        p(!1)
      }
    },
    [g, b] = Z(s().value),
    [w, x] = Z(s().state),
    R = Jo(g, w),
    N = [],
    D = {
      pattern: u,
      params: {},
      path: () => u,
      outlet: () => null,
      resolvePath(v) {
        return Le(u, v)
      },
    }
  if (n)
    try {
      ;(de = D), (D.data = n({ data: void 0, params: {}, location: R, navigate: M(D) }))
    } finally {
      de = void 0
    }
  function L(v, h, m) {
    V(() => {
      if (typeof h == 'number') {
        h && (o.go ? l.confirm(h, m) && o.go(h) : console.warn('Router integration does not support relative routing'))
        return
      }
      const { replace: E, resolve: A, scroll: O, state: T } = { replace: !1, resolve: !0, scroll: !0, ...m },
        $ = A ? v.resolvePath(h) : Le('', h)
      if ($ === void 0) throw new Error(`Path '${h}' is not a routable path`)
      if (N.length >= Wo) throw new Error('Too many redirects')
      const _ = g()
      if (($ !== _ || T !== w()) && !_s) {
        if (l.confirm($, m)) {
          const q = N.push({ value: _, replace: E, scroll: O, state: w() })
          y(() => {
            b($), x(T)
          }).then(() => {
            N.length === q && F({ value: $, state: T })
          })
        }
      }
    })
  }
  function M(v) {
    return (v = v || Ht(rn) || D), (h, m) => L(v, h, m)
  }
  function F(v) {
    const h = N[0]
    h &&
      ((v.value !== h.value || v.state !== h.state) && i({ ...v, replace: h.replace, scroll: h.scroll }),
      (N.length = 0))
  }
  pt(() => {
    const { value: v, state: h } = s()
    V(() => {
      v !== g() &&
        y(() => {
          b(v), x(h)
        })
    })
  })
  {
    let v = function (h) {
      if (h.defaultPrevented || h.button !== 0 || h.metaKey || h.altKey || h.ctrlKey || h.shiftKey) return
      const m = h.composedPath().find((_) => _ instanceof Node && _.nodeName.toUpperCase() === 'A')
      if (!m || !m.hasAttribute('link')) return
      const E = m.href
      if (m.target || (!E && !m.hasAttribute('state'))) return
      const A = (m.getAttribute('rel') || '').split(/\s+/)
      if (m.hasAttribute('download') || (A && A.includes('external'))) return
      const O = new URL(E)
      if (
        O.origin !== window.location.origin ||
        (u && O.pathname && !O.pathname.toLowerCase().startsWith(u.toLowerCase()))
      )
        return
      const T = a(O.pathname + O.search + O.hash),
        $ = m.getAttribute('state')
      h.preventDefault(),
        L(D, T, {
          resolve: !1,
          replace: m.hasAttribute('replace'),
          scroll: !m.hasAttribute('noscroll'),
          state: $ && JSON.parse($),
        })
    }
    var S = v
    sr(['click']), document.addEventListener('click', v), ot(() => document.removeEventListener('click', v))
  }
  return {
    base: D,
    out: f,
    location: R,
    isRouting: d,
    renderPath: c,
    parsePath: a,
    navigatorFactory: M,
    beforeLeave: l,
  }
}
function ta(t, e, n, r, s) {
  const { base: i, location: o, navigatorFactory: a } = t,
    { pattern: c, element: l, preload: u, data: f } = r().route,
    d = I(() => r().path)
  u && u()
  const p = {
    parent: e,
    pattern: c,
    get child() {
      return n()
    },
    path: d,
    params: s,
    data: e.data,
    outlet: l,
    resolvePath(y) {
      return Le(i.path(), y, d())
    },
  }
  if (f)
    try {
      ;(de = p), (p.data = f({ data: e.data, params: s, location: o, navigate: a(p) }))
    } finally {
      de = void 0
    }
  return p
}
const ea = Q('<a link>'),
  na = (t) => {
    const { source: e, url: n, base: r, data: s, out: i } = t,
      o = e || Mo(),
      a = Zo(o, r, s)
    return P(Ws.Provider, {
      value: a,
      get children() {
        return t.children
      },
    })
  },
  ra = (t) => {
    const e = sn(),
      n = ir(),
      r = Se(() => t.children),
      s = I(() => Gs(r(), Us(n.pattern, t.base || ''), sa)),
      i = I(() => Yo(s(), e.location.pathname)),
      o = Vs(() => {
        const u = i(),
          f = {}
        for (let d = 0; d < u.length; d++) Object.assign(f, u[d].params)
        return f
      })
    e.out &&
      e.out.matches.push(
        i().map(({ route: u, path: f, params: d }) => ({
          originalPath: u.originalPath,
          pattern: u.pattern,
          path: f,
          params: d,
        })),
      )
    const a = []
    let c
    const l = I(
      ue(i, (u, f, d) => {
        let p = f && u.length === f.length
        const y = []
        for (let g = 0, b = u.length; g < b; g++) {
          const w = f && f[g],
            x = u[g]
          d && w && x.route.key === w.route.key
            ? (y[g] = d[g])
            : ((p = !1),
              a[g] && a[g](),
              er((R) => {
                ;(a[g] = R),
                  (y[g] = ta(
                    e,
                    y[g - 1] || n,
                    () => l()[g + 1],
                    () => i()[g],
                    o,
                  ))
              }))
        }
        return a.splice(u.length).forEach((g) => g()), d && p ? d : ((c = y[0]), y)
      }),
    )
    return P(fe, {
      get when() {
        return l() && c
      },
      keyed: !0,
      children: (u) =>
        P(rn.Provider, {
          value: u,
          get children() {
            return u.outlet()
          },
        }),
    })
  },
  on = (t) => {
    const e = Se(() => t.children)
    return St(t, {
      get children() {
        return e()
      },
    })
  },
  sa = () => {
    const t = ir()
    return P(fe, {
      get when() {
        return t.child
      },
      keyed: !0,
      children: (e) =>
        P(rn.Provider, {
          value: e,
          get children() {
            return e.outlet()
          },
        }),
    })
  }
function Fe(t) {
  t = St({ inactiveClass: 'inactive', activeClass: 'active' }, t)
  const [, e] = xe(t, ['href', 'state', 'class', 'activeClass', 'inactiveClass', 'end']),
    n = Ho(() => t.href),
    r = zo(n),
    s = Hs(),
    i = I(() => {
      const o = n()
      if (o === void 0) return !1
      const a = Lt(o.split(/[?#]/, 1)[0]).toLowerCase(),
        c = Lt(s.pathname).toLowerCase()
      return t.end ? a === c : c.startsWith(a)
    })
  return (() => {
    const o = ea()
    return (
      nn(
        o,
        St(e, {
          get href() {
            return r() || t.href
          },
          get state() {
            return JSON.stringify(t.state)
          },
          get classList() {
            return { ...(t.class && { [t.class]: !0 }), [t.inactiveClass]: !i(), [t.activeClass]: i(), ...e.classList }
          },
          get 'aria-current'() {
            return i() ? 'page' : void 0
          },
        }),
        !1,
        !1,
      ),
      o
    )
  })()
}
const ia = Q('<h1>Available rewards screen'),
  oa = () => ia(),
  Xs = '/available-rewards',
  aa = () => P(on, { path: Xs, component: oa }),
  ca = Q('<svg stroke-width="0"></svg>', 2),
  la = Q('<title></title>', 2)
function or(t, e) {
  const n = St(t.a, e),
    [r, s] = xe(n, ['src'])
  return (() => {
    const i = ca.cloneNode(!0)
    return (
      nn(
        i,
        St(
          {
            get stroke() {
              return t.a.stroke
            },
            get color() {
              return e.color || 'currentColor'
            },
            get style() {
              return { ...e.style, overflow: 'visible' }
            },
          },
          s,
          {
            get height() {
              return e.size || '1em'
            },
            get width() {
              return e.size || '1em'
            },
            get innerHTML() {
              return t.c
            },
            xmlns: 'http://www.w3.org/2000/svg',
          },
        ),
        !0,
        !0,
      ),
      B(i, () => _s, null),
      B(
        i,
        (() => {
          const o = I(() => !!e.title)
          return () =>
            o() &&
            (() => {
              const a = la.cloneNode(!0)
              return B(a, () => e.title), a
            })()
        })(),
        null,
      ),
      i
    )
  })()
}
function ua(t) {
  return or(
    {
      a: { fill: 'currentColor', viewBox: '0 0 16 16' },
      c: '<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/><path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>',
    },
    t,
  )
}
function Zt(t) {
  return or(
    {
      a: { fill: 'currentColor', viewBox: '0 0 16 16' },
      c: '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>',
    },
    t,
  )
}
const fa = Q('<h1>Status and perks screen'),
  da = () => fa(),
  Ys = '/status-perks',
  ha = () => P(on, { path: Ys, component: da }),
  pa = Q('<h1>Earn rewards screen'),
  ga = () => pa(),
  Js = '/earn-rewards',
  ya = () => P(on, { path: Js, component: ga }),
  kn = Symbol('store-raw'),
  he = Symbol('store-node')
function Zs(t) {
  let e = t[G]
  if (!e && (Object.defineProperty(t, G, { value: (e = new Proxy(t, va)) }), !Array.isArray(t))) {
    const n = Object.keys(t),
      r = Object.getOwnPropertyDescriptors(t)
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s]
      r[o].get && Object.defineProperty(t, o, { enumerable: r[o].enumerable, get: r[o].get.bind(e) })
    }
  }
  return e
}
function xt(t) {
  let e
  return (
    t != null &&
    typeof t == 'object' &&
    (t[G] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t))
  )
}
function Vt(t, e = new Set()) {
  let n, r, s, i
  if ((n = t != null && t[kn])) return n
  if (!xt(t) || e.has(t)) return t
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? (t = t.slice(0)) : e.add(t)
    for (let o = 0, a = t.length; o < a; o++) (s = t[o]), (r = Vt(s, e)) !== s && (t[o] = r)
  } else {
    Object.isFrozen(t) ? (t = Object.assign({}, t)) : e.add(t)
    const o = Object.keys(t),
      a = Object.getOwnPropertyDescriptors(t)
    for (let c = 0, l = o.length; c < l; c++) (i = o[c]), !a[i].get && ((s = t[i]), (r = Vt(s, e)) !== s && (t[i] = r))
  }
  return t
}
function ar(t) {
  let e = t[he]
  return e || Object.defineProperty(t, he, { value: (e = Object.create(null)) }), e
}
function Mn(t, e, n) {
  return t[e] || (t[e] = ei(n))
}
function ma(t, e) {
  const n = Reflect.getOwnPropertyDescriptor(t, e)
  return (
    !n ||
      n.get ||
      !n.configurable ||
      e === G ||
      e === he ||
      (delete n.value, delete n.writable, (n.get = () => t[G][e])),
    n
  )
}
function ti(t) {
  if (Cs()) {
    const e = ar(t)
    ;(e._ || (e._ = ei()))()
  }
}
function ba(t) {
  return ti(t), Reflect.ownKeys(t)
}
function ei(t) {
  const [e, n] = Z(t, { equals: !1, internal: !0 })
  return (e.$ = n), e
}
const va = {
  get(t, e, n) {
    if (e === kn) return t
    if (e === G) return n
    if (e === Pr) return ti(t), n
    const r = ar(t),
      s = r[e]
    let i = s ? s() : t[e]
    if (e === he || e === '__proto__') return i
    if (!s) {
      const o = Object.getOwnPropertyDescriptor(t, e)
      Cs() && (typeof i != 'function' || t.hasOwnProperty(e)) && !(o && o.get) && (i = Mn(r, e, i)())
    }
    return xt(i) ? Zs(i) : i
  },
  has(t, e) {
    return e === kn || e === G || e === Pr || e === he || e === '__proto__' ? !0 : (this.get(t, e, t), e in t)
  },
  set() {
    return !0
  },
  deleteProperty() {
    return !0
  },
  ownKeys: ba,
  getOwnPropertyDescriptor: ma,
}
function Y(t, e, n, r = !1) {
  if (!r && t[e] === n) return
  const s = t[e],
    i = t.length
  n === void 0 ? delete t[e] : (t[e] = n)
  let o = ar(t),
    a
  if (((a = Mn(o, e, s)) && a.$(() => n), Array.isArray(t) && t.length !== i)) {
    for (let c = t.length; c < i; c++) (a = o[c]) && a.$()
    ;(a = Mn(o, 'length', i)) && a.$(t.length)
  }
  ;(a = o._) && a.$()
}
function ni(t, e) {
  const n = Object.keys(e)
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r]
    Y(t, s, e[s])
  }
}
function wa(t, e) {
  if ((typeof e == 'function' && (e = e(t)), (e = Vt(e)), Array.isArray(e))) {
    if (t === e) return
    let n = 0,
      r = e.length
    for (; n < r; n++) {
      const s = e[n]
      t[n] !== s && Y(t, n, s)
    }
    Y(t, 'length', r)
  } else ni(t, e)
}
function se(t, e, n = []) {
  let r,
    s = t
  if (e.length > 1) {
    r = e.shift()
    const o = typeof r,
      a = Array.isArray(t)
    if (Array.isArray(r)) {
      for (let c = 0; c < r.length; c++) se(t, [r[c]].concat(e), n)
      return
    } else if (a && o === 'function') {
      for (let c = 0; c < t.length; c++) r(t[c], c) && se(t, [c].concat(e), n)
      return
    } else if (a && o === 'object') {
      const { from: c = 0, to: l = t.length - 1, by: u = 1 } = r
      for (let f = c; f <= l; f += u) se(t, [f].concat(e), n)
      return
    } else if (e.length > 1) {
      se(t[r], e, [r].concat(n))
      return
    }
    ;(s = t[r]), (n = [r].concat(n))
  }
  let i = e[0]
  ;(typeof i == 'function' && ((i = i(s, n)), i === s)) ||
    (r === void 0 && i == null) ||
    ((i = Vt(i)), r === void 0 || (xt(s) && xt(i) && !Array.isArray(i)) ? ni(s, i) : Y(t, r, i))
}
function an(...[t, e]) {
  const n = Vt(t || {}),
    r = Array.isArray(n),
    s = Zs(n)
  function i(...o) {
    Zi(() => {
      r && o.length === 1 ? wa(n, o[0]) : se(n, o)
    })
  }
  return [s, i]
}
const jn = Symbol('store-root')
function jt(t, e, n, r, s) {
  const i = e[n]
  if (t === i) return
  if (n !== jn && (!xt(t) || !xt(i) || (s && t[s] !== i[s]))) {
    Y(e, n, t)
    return
  }
  if (Array.isArray(t)) {
    if (t.length && i.length && (!r || (s && t[0] && t[0][s] != null))) {
      let c, l, u, f, d, p, y, g
      for (
        u = 0, f = Math.min(i.length, t.length);
        u < f && (i[u] === t[u] || (s && i[u] && t[u] && i[u][s] === t[u][s]));
        u++
      )
        jt(t[u], i, u, r, s)
      const b = new Array(t.length),
        w = new Map()
      for (
        f = i.length - 1, d = t.length - 1;
        f >= u && d >= u && (i[f] === t[d] || (s && i[u] && t[u] && i[f][s] === t[d][s]));
        f--, d--
      )
        b[d] = i[f]
      if (u > d || u > f) {
        for (l = u; l <= d; l++) Y(i, l, t[l])
        for (; l < t.length; l++) Y(i, l, b[l]), jt(t[l], i, l, r, s)
        i.length > t.length && Y(i, 'length', t.length)
        return
      }
      for (y = new Array(d + 1), l = d; l >= u; l--)
        (p = t[l]), (g = s && p ? p[s] : p), (c = w.get(g)), (y[l] = c === void 0 ? -1 : c), w.set(g, l)
      for (c = u; c <= f; c++)
        (p = i[c]),
          (g = s && p ? p[s] : p),
          (l = w.get(g)),
          l !== void 0 && l !== -1 && ((b[l] = i[c]), (l = y[l]), w.set(g, l))
      for (l = u; l < t.length; l++) l in b ? (Y(i, l, b[l]), jt(t[l], i, l, r, s)) : Y(i, l, t[l])
    } else for (let c = 0, l = t.length; c < l; c++) jt(t[c], i, c, r, s)
    i.length > t.length && Y(i, 'length', t.length)
    return
  }
  const o = Object.keys(t)
  for (let c = 0, l = o.length; c < l; c++) jt(t[o[c]], i, o[c], r, s)
  const a = Object.keys(i)
  for (let c = 0, l = a.length; c < l; c++) t[a[c]] === void 0 && Y(i, a[c], void 0)
}
function ri(t, e = {}) {
  const { merge: n, key: r = 'id' } = e,
    s = Vt(t)
  return (i) => {
    if (!xt(i) || !xt(s)) return s
    const o = jt(s, { [jn]: i }, jn, n, r)
    return o === void 0 ? i : o
  }
}
class Gt {
  constructor() {
    ;(this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this))
  }
  subscribe(e) {
    return (
      this.listeners.add(e),
      this.onSubscribe(),
      () => {
        this.listeners.delete(e), this.onUnsubscribe()
      }
    )
  }
  hasListeners() {
    return this.listeners.size > 0
  }
  onSubscribe() {}
  onUnsubscribe() {}
}
const pe = typeof window > 'u' || 'Deno' in window
function J() {}
function Ea(t, e) {
  return typeof t == 'function' ? t(e) : t
}
function _n(t) {
  return typeof t == 'number' && t >= 0 && t !== 1 / 0
}
function si(t, e) {
  return Math.max(t + (e || 0) - Date.now(), 0)
}
function Lr(t, e) {
  const { type: n = 'all', exact: r, fetchStatus: s, predicate: i, queryKey: o, stale: a } = t
  if (o) {
    if (r) {
      if (e.queryHash !== cr(o, e.options)) return !1
    } else if (!ye(e.queryKey, o)) return !1
  }
  if (n !== 'all') {
    const c = e.isActive()
    if ((n === 'active' && !c) || (n === 'inactive' && c)) return !1
  }
  return !(
    (typeof a == 'boolean' && e.isStale() !== a) ||
    (typeof s < 'u' && s !== e.state.fetchStatus) ||
    (i && !i(e))
  )
}
function Fr(t, e) {
  const { exact: n, status: r, predicate: s, mutationKey: i } = t
  if (i) {
    if (!e.options.mutationKey) return !1
    if (n) {
      if (ge(e.options.mutationKey) !== ge(i)) return !1
    } else if (!ye(e.options.mutationKey, i)) return !1
  }
  return !((r && e.state.status !== r) || (s && !s(e)))
}
function cr(t, e) {
  return (e?.queryKeyHashFn || ge)(t)
}
function ge(t) {
  return JSON.stringify(t, (e, n) =>
    qn(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, s) => ((r[s] = n[s]), r), {})
      : n,
  )
}
function ye(t, e) {
  return t === e
    ? !0
    : typeof t != typeof e
    ? !1
    : t && e && typeof t == 'object' && typeof e == 'object'
    ? !Object.keys(e).some((n) => !ye(t[n], e[n]))
    : !1
}
function ii(t, e) {
  if (t === e) return t
  const n = Dr(t) && Dr(e)
  if (n || (qn(t) && qn(e))) {
    const r = n ? t.length : Object.keys(t).length,
      s = n ? e : Object.keys(e),
      i = s.length,
      o = n ? [] : {}
    let a = 0
    for (let c = 0; c < i; c++) {
      const l = n ? c : s[c]
      ;(o[l] = ii(t[l], e[l])), o[l] === t[l] && a++
    }
    return r === i && a === r ? t : o
  }
  return e
}
function Bn(t, e) {
  if ((t && !e) || (e && !t)) return !1
  for (const n in t) if (t[n] !== e[n]) return !1
  return !0
}
function Dr(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length
}
function qn(t) {
  if (!Nr(t)) return !1
  const e = t.constructor
  if (typeof e > 'u') return !0
  const n = e.prototype
  return !(!Nr(n) || !n.hasOwnProperty('isPrototypeOf'))
}
function Nr(t) {
  return Object.prototype.toString.call(t) === '[object Object]'
}
function oi(t) {
  return new Promise((e) => {
    setTimeout(e, t)
  })
}
function $r(t) {
  oi(0).then(t)
}
function Kn(t, e, n) {
  return typeof n.structuralSharing == 'function'
    ? n.structuralSharing(t, e)
    : n.structuralSharing !== !1
    ? ii(t, e)
    : e
}
function Sa(t, e, n = 0) {
  const r = [...t, e]
  return n && r.length > n ? r.slice(1) : r
}
function xa(t, e, n = 0) {
  const r = [e, ...t]
  return n && r.length > n ? r.slice(0, -1) : r
}
class Oa extends Gt {
  #t
  #e
  #n
  constructor() {
    super(),
      (this.#n = (e) => {
        if (!pe && window.addEventListener) {
          const n = () => e()
          return (
            window.addEventListener('visibilitychange', n, !1),
            () => {
              window.removeEventListener('visibilitychange', n)
            }
          )
        }
      })
  }
  onSubscribe() {
    this.#e || this.setEventListener(this.#n)
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#e?.(), (this.#e = void 0))
  }
  setEventListener(e) {
    ;(this.#n = e),
      this.#e?.(),
      (this.#e = e((n) => {
        typeof n == 'boolean' ? this.setFocused(n) : this.onFocus()
      }))
  }
  setFocused(e) {
    ;(this.#t = e), e && this.onFocus()
  }
  onFocus() {
    this.listeners.forEach((e) => {
      e()
    })
  }
  isFocused() {
    return typeof this.#t == 'boolean' ? this.#t : globalThis.document?.visibilityState !== 'hidden'
  }
}
const Be = new Oa(),
  Ir = ['online', 'offline']
class Pa extends Gt {
  #t
  #e
  #n
  constructor() {
    super(),
      (this.#n = (e) => {
        if (!pe && window.addEventListener) {
          const n = () => e()
          return (
            Ir.forEach((r) => {
              window.addEventListener(r, n, !1)
            }),
            () => {
              Ir.forEach((r) => {
                window.removeEventListener(r, n)
              })
            }
          )
        }
      })
  }
  onSubscribe() {
    this.#e || this.setEventListener(this.#n)
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#e?.(), (this.#e = void 0))
  }
  setEventListener(e) {
    ;(this.#n = e),
      this.#e?.(),
      (this.#e = e((n) => {
        typeof n == 'boolean' ? this.setOnline(n) : this.onOnline()
      }))
  }
  setOnline(e) {
    ;(this.#t = e), e && this.onOnline()
  }
  onOnline() {
    this.listeners.forEach((e) => {
      e()
    })
  }
  isOnline() {
    return typeof this.#t == 'boolean'
      ? this.#t
      : typeof navigator > 'u' || typeof navigator.onLine > 'u'
      ? !0
      : navigator.onLine
  }
}
const qe = new Pa()
function Aa(t) {
  return Math.min(1e3 * 2 ** t, 3e4)
}
function cn(t) {
  return (t ?? 'online') === 'online' ? qe.isOnline() : !0
}
class ai {
  constructor(e) {
    ;(this.revert = e?.revert), (this.silent = e?.silent)
  }
}
function bn(t) {
  return t instanceof ai
}
function ci(t) {
  let e = !1,
    n = 0,
    r = !1,
    s,
    i,
    o
  const a = new Promise((b, w) => {
      ;(i = b), (o = w)
    }),
    c = (b) => {
      r || (p(new ai(b)), t.abort?.())
    },
    l = () => {
      e = !0
    },
    u = () => {
      e = !1
    },
    f = () => !Be.isFocused() || (t.networkMode !== 'always' && !qe.isOnline()),
    d = (b) => {
      r || ((r = !0), t.onSuccess?.(b), s?.(), i(b))
    },
    p = (b) => {
      r || ((r = !0), t.onError?.(b), s?.(), o(b))
    },
    y = () =>
      new Promise((b) => {
        ;(s = (w) => {
          const x = r || !f()
          return x && b(w), x
        }),
          t.onPause?.()
      }).then(() => {
        ;(s = void 0), r || t.onContinue?.()
      }),
    g = () => {
      if (r) return
      let b
      try {
        b = t.fn()
      } catch (w) {
        b = Promise.reject(w)
      }
      Promise.resolve(b)
        .then(d)
        .catch((w) => {
          if (r) return
          const x = t.retry ?? 3,
            R = t.retryDelay ?? Aa,
            N = typeof R == 'function' ? R(n, w) : R,
            D = x === !0 || (typeof x == 'number' && n < x) || (typeof x == 'function' && x(n, w))
          if (e || !D) {
            p(w)
            return
          }
          n++,
            t.onFail?.(n, w),
            oi(N)
              .then(() => {
                if (f()) return y()
              })
              .then(() => {
                e ? p(w) : g()
              })
        })
    }
  return (
    cn(t.networkMode) ? g() : y().then(g),
    { promise: a, cancel: c, continue: () => (s?.() ? a : Promise.resolve()), cancelRetry: l, continueRetry: u }
  )
}
function Ca() {
  let t = [],
    e = 0,
    n = (u) => {
      u()
    },
    r = (u) => {
      u()
    }
  const s = (u) => {
      let f
      e++
      try {
        f = u()
      } finally {
        e--, e || a()
      }
      return f
    },
    i = (u) => {
      e
        ? t.push(u)
        : $r(() => {
            n(u)
          })
    },
    o =
      (u) =>
      (...f) => {
        i(() => {
          u(...f)
        })
      },
    a = () => {
      const u = t
      ;(t = []),
        u.length &&
          $r(() => {
            r(() => {
              u.forEach((f) => {
                n(f)
              })
            })
          })
    }
  return {
    batch: s,
    batchCalls: o,
    schedule: i,
    setNotifyFunction: (u) => {
      n = u
    },
    setBatchNotifyFunction: (u) => {
      r = u
    },
  }
}
const U = Ca()
class li {
  #t
  destroy() {
    this.clearGcTimeout()
  }
  scheduleGc() {
    this.clearGcTimeout(),
      _n(this.gcTime) &&
        (this.#t = setTimeout(() => {
          this.optionalRemove()
        }, this.gcTime))
  }
  updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? (pe ? 1 / 0 : 5 * 60 * 1e3))
  }
  clearGcTimeout() {
    this.#t && (clearTimeout(this.#t), (this.#t = void 0))
  }
}
class Ta extends li {
  #t
  #e
  #n
  #r
  #s
  #i
  #o
  #c
  constructor(e) {
    super(),
      (this.#c = !1),
      (this.#o = e.defaultOptions),
      this.#l(e.options),
      (this.#i = []),
      (this.#n = e.cache),
      (this.queryKey = e.queryKey),
      (this.queryHash = e.queryHash),
      (this.#t = e.state || Ra(this.options)),
      (this.state = this.#t),
      this.scheduleGc()
  }
  get meta() {
    return this.options.meta
  }
  #l(e) {
    ;(this.options = { ...this.#o, ...e }), this.updateGcTime(this.options.gcTime)
  }
  optionalRemove() {
    !this.#i.length && this.state.fetchStatus === 'idle' && this.#n.remove(this)
  }
  setData(e, n) {
    const r = Kn(this.state.data, e, this.options)
    return this.#a({ data: r, type: 'success', dataUpdatedAt: n?.updatedAt, manual: n?.manual }), r
  }
  setState(e, n) {
    this.#a({ type: 'setState', state: e, setStateOptions: n })
  }
  cancel(e) {
    const n = this.#r
    return this.#s?.cancel(e), n ? n.then(J).catch(J) : Promise.resolve()
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 })
  }
  reset() {
    this.destroy(), this.setState(this.#t)
  }
  isActive() {
    return this.#i.some((e) => e.options.enabled !== !1)
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive()
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.#i.some((e) => e.getCurrentResult().isStale)
  }
  isStaleByTime(e = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !si(this.state.dataUpdatedAt, e)
  }
  onFocus() {
    this.#i.find((n) => n.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#s?.continue()
  }
  onOnline() {
    this.#i.find((n) => n.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#s?.continue()
  }
  addObserver(e) {
    this.#i.includes(e) ||
      (this.#i.push(e), this.clearGcTimeout(), this.#n.notify({ type: 'observerAdded', query: this, observer: e }))
  }
  removeObserver(e) {
    this.#i.includes(e) &&
      ((this.#i = this.#i.filter((n) => n !== e)),
      this.#i.length ||
        (this.#s && (this.#c ? this.#s.cancel({ revert: !0 }) : this.#s.cancelRetry()), this.scheduleGc()),
      this.#n.notify({ type: 'observerRemoved', query: this, observer: e }))
  }
  getObserversCount() {
    return this.#i.length
  }
  invalidate() {
    this.state.isInvalidated || this.#a({ type: 'invalidate' })
  }
  fetch(e, n) {
    if (this.state.fetchStatus !== 'idle') {
      if (this.state.dataUpdatedAt && n?.cancelRefetch) this.cancel({ silent: !0 })
      else if (this.#r) return this.#s?.continueRetry(), this.#r
    }
    if ((e && this.#l(e), !this.options.queryFn)) {
      const l = this.#i.find((u) => u.options.queryFn)
      l && this.#l(l.options)
    }
    const r = new AbortController(),
      s = { queryKey: this.queryKey, meta: this.meta },
      i = (l) => {
        Object.defineProperty(l, 'signal', { enumerable: !0, get: () => ((this.#c = !0), r.signal) })
      }
    i(s)
    const o = () =>
        this.options.queryFn
          ? ((this.#c = !1), this.options.queryFn(s))
          : Promise.reject(new Error(`Missing queryFn: '${this.options.queryHash}'`)),
      a = { fetchOptions: n, options: this.options, queryKey: this.queryKey, state: this.state, fetchFn: o }
    i(a),
      this.options.behavior?.onFetch(a),
      (this.#e = this.state),
      (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== a.fetchOptions?.meta) &&
        this.#a({ type: 'fetch', meta: a.fetchOptions?.meta })
    const c = (l) => {
      ;(bn(l) && l.silent) || this.#a({ type: 'error', error: l }),
        bn(l) || (this.#n.config.onError?.(l, this), this.#n.config.onSettled?.(this.state.data, l, this)),
        this.isFetchingOptimistic || this.scheduleGc(),
        (this.isFetchingOptimistic = !1)
    }
    return (
      (this.#s = ci({
        fn: a.fetchFn,
        abort: r.abort.bind(r),
        onSuccess: (l) => {
          if (typeof l > 'u') {
            c(new Error(`${this.queryHash} data is undefined`))
            return
          }
          this.setData(l),
            this.#n.config.onSuccess?.(l, this),
            this.#n.config.onSettled?.(l, this.state.error, this),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1)
        },
        onError: c,
        onFail: (l, u) => {
          this.#a({ type: 'failed', failureCount: l, error: u })
        },
        onPause: () => {
          this.#a({ type: 'pause' })
        },
        onContinue: () => {
          this.#a({ type: 'continue' })
        },
        retry: a.options.retry,
        retryDelay: a.options.retryDelay,
        networkMode: a.options.networkMode,
      })),
      (this.#r = this.#s.promise),
      this.#r
    )
  }
  #a(e) {
    const n = (r) => {
      switch (e.type) {
        case 'failed':
          return { ...r, fetchFailureCount: e.failureCount, fetchFailureReason: e.error }
        case 'pause':
          return { ...r, fetchStatus: 'paused' }
        case 'continue':
          return { ...r, fetchStatus: 'fetching' }
        case 'fetch':
          return {
            ...r,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: e.meta ?? null,
            fetchStatus: cn(this.options.networkMode) ? 'fetching' : 'paused',
            ...(!r.dataUpdatedAt && { error: null, status: 'pending' }),
          }
        case 'success':
          return {
            ...r,
            data: e.data,
            dataUpdateCount: r.dataUpdateCount + 1,
            dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: !1,
            status: 'success',
            ...(!e.manual && { fetchStatus: 'idle', fetchFailureCount: 0, fetchFailureReason: null }),
          }
        case 'error':
          const s = e.error
          return bn(s) && s.revert && this.#e
            ? { ...this.#e }
            : {
                ...r,
                error: s,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: s,
                fetchStatus: 'idle',
                status: 'error',
              }
        case 'invalidate':
          return { ...r, isInvalidated: !0 }
        case 'setState':
          return { ...r, ...e.state }
      }
    }
    ;(this.state = n(this.state)),
      U.batch(() => {
        this.#i.forEach((r) => {
          r.onQueryUpdate()
        }),
          this.#n.notify({ query: this, type: 'updated', action: e })
      })
  }
}
function Ra(t) {
  const e = typeof t.initialData == 'function' ? t.initialData() : t.initialData,
    n = typeof e < 'u',
    r = n ? (typeof t.initialDataUpdatedAt == 'function' ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt) : 0
  return {
    data: e,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? 'success' : 'pending',
    fetchStatus: 'idle',
  }
}
class La extends Gt {
  #t
  constructor(e = {}) {
    super(), (this.config = e), (this.#t = new Map())
  }
  build(e, n, r) {
    const s = n.queryKey,
      i = n.queryHash ?? cr(s, n)
    let o = this.get(i)
    return (
      o ||
        ((o = new Ta({
          cache: this,
          queryKey: s,
          queryHash: i,
          options: e.defaultQueryOptions(n),
          state: r,
          defaultOptions: e.getQueryDefaults(s),
        })),
        this.add(o)),
      o
    )
  }
  add(e) {
    this.#t.has(e.queryHash) || (this.#t.set(e.queryHash, e), this.notify({ type: 'added', query: e }))
  }
  remove(e) {
    const n = this.#t.get(e.queryHash)
    n && (e.destroy(), n === e && this.#t.delete(e.queryHash), this.notify({ type: 'removed', query: e }))
  }
  clear() {
    U.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e)
      })
    })
  }
  get(e) {
    return this.#t.get(e)
  }
  getAll() {
    return [...this.#t.values()]
  }
  find(e) {
    const n = { exact: !0, ...e }
    return this.getAll().find((r) => Lr(n, r))
  }
  findAll(e = {}) {
    const n = this.getAll()
    return Object.keys(e).length > 0 ? n.filter((r) => Lr(e, r)) : n
  }
  notify(e) {
    U.batch(() => {
      this.listeners.forEach((n) => {
        n(e)
      })
    })
  }
  onFocus() {
    U.batch(() => {
      this.getAll().forEach((e) => {
        e.onFocus()
      })
    })
  }
  onOnline() {
    U.batch(() => {
      this.getAll().forEach((e) => {
        e.onOnline()
      })
    })
  }
}
class Fa extends li {
  #t
  #e
  #n
  #r
  constructor(e) {
    super(),
      (this.mutationId = e.mutationId),
      (this.#e = e.defaultOptions),
      (this.#n = e.mutationCache),
      (this.#t = []),
      (this.state = e.state || ui()),
      this.setOptions(e.options),
      this.scheduleGc()
  }
  setOptions(e) {
    ;(this.options = { ...this.#e, ...e }), this.updateGcTime(this.options.gcTime)
  }
  get meta() {
    return this.options.meta
  }
  addObserver(e) {
    this.#t.includes(e) ||
      (this.#t.push(e), this.clearGcTimeout(), this.#n.notify({ type: 'observerAdded', mutation: this, observer: e }))
  }
  removeObserver(e) {
    ;(this.#t = this.#t.filter((n) => n !== e)),
      this.scheduleGc(),
      this.#n.notify({ type: 'observerRemoved', mutation: this, observer: e })
  }
  optionalRemove() {
    this.#t.length || (this.state.status === 'pending' ? this.scheduleGc() : this.#n.remove(this))
  }
  continue() {
    return this.#r?.continue() ?? this.execute(this.state.variables)
  }
  async execute(e) {
    const n = () => (
        (this.#r = ci({
          fn: () =>
            this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error('No mutationFn found')),
          onFail: (s, i) => {
            this.#s({ type: 'failed', failureCount: s, error: i })
          },
          onPause: () => {
            this.#s({ type: 'pause' })
          },
          onContinue: () => {
            this.#s({ type: 'continue' })
          },
          retry: this.options.retry ?? 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode,
        })),
        this.#r.promise
      ),
      r = this.state.status === 'pending'
    try {
      if (!r) {
        this.#s({ type: 'pending', variables: e }), await this.#n.config.onMutate?.(e, this)
        const i = await this.options.onMutate?.(e)
        i !== this.state.context && this.#s({ type: 'pending', context: i, variables: e })
      }
      const s = await n()
      return (
        await this.#n.config.onSuccess?.(s, e, this.state.context, this),
        await this.options.onSuccess?.(s, e, this.state.context),
        await this.#n.config.onSettled?.(s, null, this.state.variables, this.state.context, this),
        await this.options.onSettled?.(s, null, e, this.state.context),
        this.#s({ type: 'success', data: s }),
        s
      )
    } catch (s) {
      try {
        throw (
          (await this.#n.config.onError?.(s, e, this.state.context, this),
          await this.options.onError?.(s, e, this.state.context),
          await this.#n.config.onSettled?.(void 0, s, this.state.variables, this.state.context, this),
          await this.options.onSettled?.(void 0, s, e, this.state.context),
          s)
        )
      } finally {
        this.#s({ type: 'error', error: s })
      }
    }
  }
  #s(e) {
    const n = (r) => {
      switch (e.type) {
        case 'failed':
          return { ...r, failureCount: e.failureCount, failureReason: e.error }
        case 'pause':
          return { ...r, isPaused: !0 }
        case 'continue':
          return { ...r, isPaused: !1 }
        case 'pending':
          return {
            ...r,
            context: e.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !cn(this.options.networkMode),
            status: 'pending',
            variables: e.variables,
            submittedAt: Date.now(),
          }
        case 'success':
          return {
            ...r,
            data: e.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: 'success',
            isPaused: !1,
          }
        case 'error':
          return {
            ...r,
            data: void 0,
            error: e.error,
            failureCount: r.failureCount + 1,
            failureReason: e.error,
            isPaused: !1,
            status: 'error',
          }
      }
    }
    ;(this.state = n(this.state)),
      U.batch(() => {
        this.#t.forEach((r) => {
          r.onMutationUpdate(e)
        }),
          this.#n.notify({ mutation: this, type: 'updated', action: e })
      })
  }
}
function ui() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  }
}
class Da extends Gt {
  #t
  #e
  #n
  constructor(e = {}) {
    super(), (this.config = e), (this.#t = []), (this.#e = 0)
  }
  build(e, n, r) {
    const s = new Fa({ mutationCache: this, mutationId: ++this.#e, options: e.defaultMutationOptions(n), state: r })
    return this.add(s), s
  }
  add(e) {
    this.#t.push(e), this.notify({ type: 'added', mutation: e })
  }
  remove(e) {
    ;(this.#t = this.#t.filter((n) => n !== e)), this.notify({ type: 'removed', mutation: e })
  }
  clear() {
    U.batch(() => {
      this.#t.forEach((e) => {
        this.remove(e)
      })
    })
  }
  getAll() {
    return this.#t
  }
  find(e) {
    const n = { exact: !0, ...e }
    return this.#t.find((r) => Fr(n, r))
  }
  findAll(e = {}) {
    return this.#t.filter((n) => Fr(e, n))
  }
  notify(e) {
    U.batch(() => {
      this.listeners.forEach((n) => {
        n(e)
      })
    })
  }
  resumePausedMutations() {
    return (
      (this.#n = (this.#n ?? Promise.resolve())
        .then(() => {
          const e = this.#t.filter((n) => n.state.isPaused)
          return U.batch(() => e.reduce((n, r) => n.then(() => r.continue().catch(J)), Promise.resolve()))
        })
        .then(() => {
          this.#n = void 0
        })),
      this.#n
    )
  }
}
function Na(t) {
  return {
    onFetch: (e) => {
      e.fetchFn = async () => {
        const n = e.options,
          r = e.fetchOptions?.meta?.fetchMore?.direction,
          s = e.state.data?.pages || [],
          i = e.state.data?.pageParams || [],
          o = { pages: [], pageParams: [] }
        let a = !1
        const c = (d) => {
            Object.defineProperty(d, 'signal', {
              enumerable: !0,
              get: () => (
                e.signal.aborted
                  ? (a = !0)
                  : e.signal.addEventListener('abort', () => {
                      a = !0
                    }),
                e.signal
              ),
            })
          },
          l = e.options.queryFn || (() => Promise.reject(new Error(`Missing queryFn: '${e.options.queryHash}'`))),
          u = async (d, p, y) => {
            if (a) return Promise.reject()
            if (typeof p > 'u' && d.pages.length) return Promise.resolve(d)
            const g = {
              queryKey: e.queryKey,
              pageParam: p,
              direction: y ? 'backward' : 'forward',
              meta: e.options.meta,
            }
            c(g)
            const b = await l(g),
              { maxPages: w } = e.options,
              x = y ? xa : Sa
            return { pages: x(d.pages, b, w), pageParams: x(d.pageParams, p, w) }
          }
        let f
        if (r && s.length) {
          const d = r === 'backward',
            p = d ? $a : kr,
            y = { pages: s, pageParams: i },
            g = p(n, y)
          f = await u(y, g, d)
        } else {
          f = await u(o, i[0] ?? n.defaultPageParam)
          const d = t ?? s.length
          for (let p = 1; p < d; p++) {
            const y = kr(n, f)
            f = await u(f, y)
          }
        }
        return f
      }
    },
  }
}
function kr(t, { pages: e, pageParams: n }) {
  const r = e.length - 1
  return t.getNextPageParam(e[r], e, n[r], n)
}
function $a(t, { pages: e, pageParams: n }) {
  return t.getPreviousPageParam?.(e[0], e, n[0], n)
}
let Ia = class {
  #t
  #e
  #n
  #r
  #s
  #i
  #o
  #c
  constructor(e = {}) {
    ;(this.#t = e.queryCache || new La()),
      (this.#e = e.mutationCache || new Da()),
      (this.#n = e.defaultOptions || {}),
      (this.#r = new Map()),
      (this.#s = new Map()),
      (this.#i = 0)
  }
  mount() {
    this.#i++,
      this.#i === 1 &&
        ((this.#o = Be.subscribe(() => {
          Be.isFocused() && (this.resumePausedMutations(), this.#t.onFocus())
        })),
        (this.#c = qe.subscribe(() => {
          qe.isOnline() && (this.resumePausedMutations(), this.#t.onOnline())
        })))
  }
  unmount() {
    this.#i--, this.#i === 0 && (this.#o?.(), (this.#o = void 0), this.#c?.(), (this.#c = void 0))
  }
  isFetching(e) {
    return this.#t.findAll({ ...e, fetchStatus: 'fetching' }).length
  }
  isMutating(e) {
    return this.#e.findAll({ ...e, status: 'pending' }).length
  }
  getQueryData(e) {
    return this.#t.find({ queryKey: e })?.state.data
  }
  ensureQueryData(e) {
    const n = this.getQueryData(e.queryKey)
    return n ? Promise.resolve(n) : this.fetchQuery(e)
  }
  getQueriesData(e) {
    return this.getQueryCache()
      .findAll(e)
      .map(({ queryKey: n, state: r }) => {
        const s = r.data
        return [n, s]
      })
  }
  setQueryData(e, n, r) {
    const i = this.#t.find({ queryKey: e })?.state.data,
      o = Ea(n, i)
    if (typeof o > 'u') return
    const a = this.defaultQueryOptions({ queryKey: e })
    return this.#t.build(this, a).setData(o, { ...r, manual: !0 })
  }
  setQueriesData(e, n, r) {
    return U.batch(() =>
      this.getQueryCache()
        .findAll(e)
        .map(({ queryKey: s }) => [s, this.setQueryData(s, n, r)]),
    )
  }
  getQueryState(e) {
    return this.#t.find({ queryKey: e })?.state
  }
  removeQueries(e) {
    const n = this.#t
    U.batch(() => {
      n.findAll(e).forEach((r) => {
        n.remove(r)
      })
    })
  }
  resetQueries(e, n) {
    const r = this.#t,
      s = { type: 'active', ...e }
    return U.batch(
      () => (
        r.findAll(e).forEach((i) => {
          i.reset()
        }),
        this.refetchQueries(s, n)
      ),
    )
  }
  cancelQueries(e = {}, n = {}) {
    const r = { revert: !0, ...n },
      s = U.batch(() => this.#t.findAll(e).map((i) => i.cancel(r)))
    return Promise.all(s).then(J).catch(J)
  }
  invalidateQueries(e = {}, n = {}) {
    return U.batch(() => {
      if (
        (this.#t.findAll(e).forEach((s) => {
          s.invalidate()
        }),
        e.refetchType === 'none')
      )
        return Promise.resolve()
      const r = { ...e, type: e.refetchType ?? e.type ?? 'active' }
      return this.refetchQueries(r, n)
    })
  }
  refetchQueries(e = {}, n) {
    const r = { ...n, cancelRefetch: n?.cancelRefetch ?? !0 },
      s = U.batch(() =>
        this.#t
          .findAll(e)
          .filter((i) => !i.isDisabled())
          .map((i) => {
            let o = i.fetch(void 0, r)
            return r.throwOnError || (o = o.catch(J)), i.state.fetchStatus === 'paused' ? Promise.resolve() : o
          }),
      )
    return Promise.all(s).then(J)
  }
  fetchQuery(e) {
    const n = this.defaultQueryOptions(e)
    typeof n.retry > 'u' && (n.retry = !1)
    const r = this.#t.build(this, n)
    return r.isStaleByTime(n.staleTime) ? r.fetch(n) : Promise.resolve(r.state.data)
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(J).catch(J)
  }
  fetchInfiniteQuery(e) {
    return (e.behavior = Na(e.pages)), this.fetchQuery(e)
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(J).catch(J)
  }
  resumePausedMutations() {
    return this.#e.resumePausedMutations()
  }
  getQueryCache() {
    return this.#t
  }
  getMutationCache() {
    return this.#e
  }
  getDefaultOptions() {
    return this.#n
  }
  setDefaultOptions(e) {
    this.#n = e
  }
  setQueryDefaults(e, n) {
    this.#r.set(ge(e), { queryKey: e, defaultOptions: n })
  }
  getQueryDefaults(e) {
    const n = [...this.#r.values()]
    let r = {}
    return (
      n.forEach((s) => {
        ye(e, s.queryKey) && (r = { ...r, ...s.defaultOptions })
      }),
      r
    )
  }
  setMutationDefaults(e, n) {
    this.#s.set(ge(e), { mutationKey: e, defaultOptions: n })
  }
  getMutationDefaults(e) {
    const n = [...this.#s.values()]
    let r = {}
    return (
      n.forEach((s) => {
        ye(e, s.mutationKey) && (r = { ...r, ...s.defaultOptions })
      }),
      r
    )
  }
  defaultQueryOptions(e) {
    if (e?._defaulted) return e
    const n = { ...this.#n.queries, ...(e?.queryKey && this.getQueryDefaults(e.queryKey)), ...e, _defaulted: !0 }
    return (
      n.queryHash || (n.queryHash = cr(n.queryKey, n)),
      typeof n.refetchOnReconnect > 'u' && (n.refetchOnReconnect = n.networkMode !== 'always'),
      typeof n.throwOnError > 'u' && (n.throwOnError = !!n.suspense),
      n
    )
  }
  defaultMutationOptions(e) {
    return e?._defaulted
      ? e
      : { ...this.#n.mutations, ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)), ...e, _defaulted: !0 }
  }
  clear() {
    this.#t.clear(), this.#e.clear()
  }
}
class ka extends Gt {
  #t
  #e = void 0
  #n = void 0
  #r = void 0
  #s
  #i
  #o
  #c
  #l
  #a
  #f
  #d
  #u
  #p = new Set()
  constructor(e, n) {
    super(), (this.#t = e), (this.options = n), (this.#o = null), this.bindMethods(), this.setOptions(n)
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this)
  }
  onSubscribe() {
    this.listeners.size === 1 && (this.#e.addObserver(this), Mr(this.#e, this.options) && this.#h(), this.#b())
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy()
  }
  shouldFetchOnReconnect() {
    return Un(this.#e, this.options, this.options.refetchOnReconnect)
  }
  shouldFetchOnWindowFocus() {
    return Un(this.#e, this.options, this.options.refetchOnWindowFocus)
  }
  destroy() {
    ;(this.listeners = new Set()), this.#v(), this.#w(), this.#e.removeObserver(this)
  }
  setOptions(e, n) {
    const r = this.options,
      s = this.#e
    if (
      ((this.options = this.#t.defaultQueryOptions(e)),
      Bn(r, this.options) ||
        this.#t.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#e, observer: this }),
      typeof this.options.enabled < 'u' && typeof this.options.enabled != 'boolean')
    )
      throw new Error('Expected enabled to be a boolean')
    this.options.queryKey || (this.options.queryKey = r.queryKey), this.#E()
    const i = this.hasListeners()
    i && jr(this.#e, s, this.options, r) && this.#h(),
      this.updateResult(n),
      i && (this.#e !== s || this.options.enabled !== r.enabled || this.options.staleTime !== r.staleTime) && this.#g()
    const o = this.#y()
    i && (this.#e !== s || this.options.enabled !== r.enabled || o !== this.#u) && this.#m(o)
  }
  getOptimisticResult(e) {
    const n = this.#t.getQueryCache().build(this.#t, e)
    return this.createResult(n, e)
  }
  getCurrentResult() {
    return this.#r
  }
  trackResult(e) {
    const n = {}
    return (
      Object.keys(e).forEach((r) => {
        Object.defineProperty(n, r, { configurable: !1, enumerable: !0, get: () => (this.#p.add(r), e[r]) })
      }),
      n
    )
  }
  getCurrentQuery() {
    return this.#e
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e })
  }
  fetchOptimistic(e) {
    const n = this.#t.defaultQueryOptions(e),
      r = this.#t.getQueryCache().build(this.#t, n)
    return (r.isFetchingOptimistic = !0), r.fetch().then(() => this.createResult(r, n))
  }
  fetch(e) {
    return this.#h({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#r))
  }
  #h(e) {
    this.#E()
    let n = this.#e.fetch(this.options, e)
    return e?.throwOnError || (n = n.catch(J)), n
  }
  #g() {
    if ((this.#v(), pe || this.#r.isStale || !_n(this.options.staleTime))) return
    const n = si(this.#r.dataUpdatedAt, this.options.staleTime) + 1
    this.#f = setTimeout(() => {
      this.#r.isStale || this.updateResult()
    }, n)
  }
  #y() {
    return (
      (typeof this.options.refetchInterval == 'function'
        ? this.options.refetchInterval(this.#r.data, this.#e)
        : this.options.refetchInterval) ?? !1
    )
  }
  #m(e) {
    this.#w(),
      (this.#u = e),
      !(pe || this.options.enabled === !1 || !_n(this.#u) || this.#u === 0) &&
        (this.#d = setInterval(() => {
          ;(this.options.refetchIntervalInBackground || Be.isFocused()) && this.#h()
        }, this.#u))
  }
  #b() {
    this.#g(), this.#m(this.#y())
  }
  #v() {
    this.#f && (clearTimeout(this.#f), (this.#f = void 0))
  }
  #w() {
    this.#d && (clearInterval(this.#d), (this.#d = void 0))
  }
  createResult(e, n) {
    const r = this.#e,
      s = this.options,
      i = this.#r,
      o = this.#s,
      a = this.#i,
      l = e !== r ? e.state : this.#n,
      { state: u } = e
    let { error: f, errorUpdatedAt: d, fetchStatus: p, status: y } = u,
      g = !1,
      b
    if (n._optimisticResults) {
      const L = this.hasListeners(),
        M = !L && Mr(e, n),
        F = L && jr(e, r, n, s)
      ;(M || F) && ((p = cn(e.options.networkMode) ? 'fetching' : 'paused'), u.dataUpdatedAt || (y = 'pending')),
        n._optimisticResults === 'isRestoring' && (p = 'idle')
    }
    if (n.select && typeof u.data < 'u')
      if (i && u.data === o?.data && n.select === this.#c) b = this.#l
      else
        try {
          ;(this.#c = n.select), (b = n.select(u.data)), (b = Kn(i?.data, b, n)), (this.#l = b), (this.#o = null)
        } catch (L) {
          this.#o = L
        }
    else b = u.data
    if (typeof n.placeholderData < 'u' && typeof b > 'u' && y === 'pending') {
      let L
      if (i?.isPlaceholderData && n.placeholderData === a?.placeholderData) L = i.data
      else if (
        ((L =
          typeof n.placeholderData == 'function' ? n.placeholderData(this.#a?.state.data, this.#a) : n.placeholderData),
        n.select && typeof L < 'u')
      )
        try {
          ;(L = n.select(L)), (this.#o = null)
        } catch (M) {
          this.#o = M
        }
      typeof L < 'u' && ((y = 'success'), (b = Kn(i?.data, L, n)), (g = !0))
    }
    this.#o && ((f = this.#o), (b = this.#l), (d = Date.now()), (y = 'error'))
    const w = p === 'fetching',
      x = y === 'pending',
      R = y === 'error',
      N = x && w
    return {
      status: y,
      fetchStatus: p,
      isPending: x,
      isSuccess: y === 'success',
      isError: R,
      isInitialLoading: N,
      isLoading: N,
      data: b,
      dataUpdatedAt: u.dataUpdatedAt,
      error: f,
      errorUpdatedAt: d,
      failureCount: u.fetchFailureCount,
      failureReason: u.fetchFailureReason,
      errorUpdateCount: u.errorUpdateCount,
      isFetched: u.dataUpdateCount > 0 || u.errorUpdateCount > 0,
      isFetchedAfterMount: u.dataUpdateCount > l.dataUpdateCount || u.errorUpdateCount > l.errorUpdateCount,
      isFetching: w,
      isRefetching: w && !x,
      isLoadingError: R && u.dataUpdatedAt === 0,
      isPaused: p === 'paused',
      isPlaceholderData: g,
      isRefetchError: R && u.dataUpdatedAt !== 0,
      isStale: lr(e, n),
      refetch: this.refetch,
    }
  }
  updateResult(e) {
    const n = this.#r,
      r = this.createResult(this.#e, this.options)
    if (((this.#s = this.#e.state), (this.#i = this.options), Bn(r, n))) return
    this.#s.data !== void 0 && (this.#a = this.#e), (this.#r = r)
    const s = {},
      i = () => {
        if (!n) return !0
        const { notifyOnChangeProps: o } = this.options
        if (o === 'all' || (!o && !this.#p.size)) return !0
        const a = new Set(o ?? this.#p)
        return (
          this.options.throwOnError && a.add('error'),
          Object.keys(this.#r).some((c) => {
            const l = c
            return this.#r[l] !== n[l] && a.has(l)
          })
        )
      }
    e?.listeners !== !1 && i() && (s.listeners = !0), this.#S({ ...s, ...e })
  }
  #E() {
    const e = this.#t.getQueryCache().build(this.#t, this.options)
    if (e === this.#e) return
    const n = this.#e
    ;(this.#e = e), (this.#n = e.state), this.hasListeners() && (n?.removeObserver(this), e.addObserver(this))
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#b()
  }
  #S(e) {
    U.batch(() => {
      e.listeners &&
        this.listeners.forEach((n) => {
          n(this.#r)
        }),
        this.#t.getQueryCache().notify({ query: this.#e, type: 'observerResultsUpdated' })
    })
  }
}
function Ma(t, e) {
  return e.enabled !== !1 && !t.state.dataUpdatedAt && !(t.state.status === 'error' && e.retryOnMount === !1)
}
function Mr(t, e) {
  return Ma(t, e) || (t.state.dataUpdatedAt > 0 && Un(t, e, e.refetchOnMount))
}
function Un(t, e, n) {
  if (e.enabled !== !1) {
    const r = typeof n == 'function' ? n(t) : n
    return r === 'always' || (r !== !1 && lr(t, e))
  }
  return !1
}
function jr(t, e, n, r) {
  return n.enabled !== !1 && (t !== e || r.enabled === !1) && (!n.suspense || t.state.status !== 'error') && lr(t, n)
}
function lr(t, e) {
  return t.isStaleByTime(e.staleTime)
}
let ja = class extends Gt {
  #t
  #e = void 0
  #n
  #r
  constructor(e, n) {
    super(), (this.#t = e), this.setOptions(n), this.bindMethods(), this.#s()
  }
  bindMethods() {
    ;(this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this))
  }
  setOptions(e) {
    const n = this.options
    ;(this.options = this.#t.defaultMutationOptions(e)),
      Bn(n, this.options) ||
        this.#t.getMutationCache().notify({ type: 'observerOptionsUpdated', mutation: this.#n, observer: this }),
      this.#n?.setOptions(this.options)
  }
  onUnsubscribe() {
    this.hasListeners() || this.#n?.removeObserver(this)
  }
  onMutationUpdate(e) {
    this.#s(), this.#i(e)
  }
  getCurrentResult() {
    return this.#e
  }
  reset() {
    ;(this.#n = void 0), this.#s(), this.#i()
  }
  mutate(e, n) {
    return (
      (this.#r = n),
      this.#n?.removeObserver(this),
      (this.#n = this.#t.getMutationCache().build(this.#t, this.options)),
      this.#n.addObserver(this),
      this.#n.execute(e)
    )
  }
  #s() {
    const e = this.#n?.state ?? ui()
    this.#e = {
      ...e,
      isPending: e.status === 'pending',
      isSuccess: e.status === 'success',
      isError: e.status === 'error',
      isIdle: e.status === 'idle',
      mutate: this.mutate,
      reset: this.reset,
    }
  }
  #i(e) {
    U.batch(() => {
      this.#r &&
        this.hasListeners() &&
        (e?.type === 'success'
          ? (this.#r.onSuccess?.(e.data, this.#e.variables, this.#e.context),
            this.#r.onSettled?.(e.data, null, this.#e.variables, this.#e.context))
          : e?.type === 'error' &&
            (this.#r.onError?.(e.error, this.#e.variables, this.#e.context),
            this.#r.onSettled?.(void 0, e.error, this.#e.variables, this.#e.context))),
        this.listeners.forEach((n) => {
          n(this.#e)
        })
    })
  }
}
function _a(t, e, n) {
  if (typeof e != 'object' || e === null) return
  const r = t.getMutationCache(),
    s = t.getQueryCache(),
    i = e.mutations || [],
    o = e.queries || []
  i.forEach((a) => {
    r.build(t, { ...n?.defaultOptions?.mutations, mutationKey: a.mutationKey }, a.state)
  }),
    o.forEach((a) => {
      const c = s.get(a.queryHash),
        l = { ...a.state, fetchStatus: 'idle' }
      if (c) {
        c.state.dataUpdatedAt < l.dataUpdatedAt && c.setState(l)
        return
      }
      s.build(t, { ...n?.defaultOptions?.queries, queryKey: a.queryKey, queryHash: a.queryHash }, l)
    })
}
class Ba extends Ia {
  constructor(e = {}) {
    super(e)
  }
}
const qa = Ee(void 0),
  fi = (t) => {
    const e = Ht(qa)
    if (t) return t
    if (!e) throw new Error('No QueryClient set, use QueryClientProvider to set one')
    return e
  }
function di(t, e) {
  return typeof t == 'function' ? t(...e) : !!t
}
function _r(t, e, n) {
  if (n === !1) return e
  if (typeof n == 'function') {
    const s = n(t.data, e.data)
    return { ...e, data: s }
  }
  const r = ri(e.data, { key: n })(t.data)
  return { ...e, data: r }
}
function Ka(t, e, n) {
  const r = I(() => fi(n?.())),
    s = r().defaultQueryOptions(t())
  ;(s._optimisticResults = 'optimistic'), (s.structuralSharing = !1)
  const i = new e(r(), s),
    [o, a] = an(i.getOptimisticResult(s)),
    c = () =>
      i.subscribe((y) => {
        U.batchCalls(() => {
          const g = i.options.reconcile
          u()?.data && y.data && !u.loading
            ? (a((b) => _r(b, y, g === void 0 ? 'id' : g)), d(o))
            : (a((b) => _r(b, y, g === void 0 ? 'id' : g)), f())
        })()
      })
  let l = null
  const [u, { refetch: f, mutate: d }] = Ji(
    () =>
      new Promise((y, g) => {
        l || (l = c()), o.isLoading || y(o)
      }),
    {
      initialValue: o,
      ssrLoadFrom: t().initialData ? 'initial' : 'server',
      get deferStream() {
        return t().deferStream
      },
      onHydrated(y, g) {
        if ((g.value && _a(r(), { queries: [{ queryKey: s.queryKey, queryHash: s.queryHash, state: g.value }] }), !l)) {
          const b = { ...s }
          ;(s.staleTime || !s.initialData) && (b.refetchOnMount = !1),
            i.setOptions(b),
            a(i.getOptimisticResult(b)),
            (l = c())
        }
      },
    },
  )
  ot(() => {
    l && (l(), (l = null))
  }),
    Kt(
      ue(
        () => r().defaultQueryOptions(t()),
        () => i.setOptions(r().defaultQueryOptions(t())),
        { defer: !0 },
      ),
    ),
    Kt(
      ue(
        () => o.status,
        () => {
          if (o.isError && !o.isFetching && di(i.options.throwOnError, [o.error, i.getCurrentQuery()])) throw o.error
        },
      ),
    )
  const p = {
    get(y, g) {
      const b = u()?.[g]
      return b !== void 0 ? b : Reflect.get(y, g)
    },
  }
  return new Proxy(o, p)
}
function Ua(t, e) {
  return Ka(
    I(() => t()),
    ka,
    e,
  )
}
function Pe(t, e) {
  const n = fi(e?.()),
    r = new ja(n, t()),
    s = (c, l) => {
      r.mutate(c, l).catch(Va)
    },
    [i, o] = an({ ...r.getCurrentResult(), mutate: s, mutateAsync: r.getCurrentResult().mutate })
  Kt(() => {
    r.setOptions(t())
  }),
    Kt(
      ue(
        () => i.status,
        () => {
          if (i.isError && di(r.options.throwOnError, [i.error])) throw i.error
        },
      ),
    )
  const a = r.subscribe((c) => {
    o({ ...c, mutate: s, mutateAsync: c.mutate })
  })
  return ot(a), i
}
function Va() {}
const te = new Ba(),
  hi = Ee(),
  Qa = {
    isWalletClientAvailable: !1,
    provider: void 0,
    connected: !1,
    accounts: [],
    currentAccount: void 0,
    loyalty: { redeemablePointsAmount: 0, historicalPointsAmount: 0 },
  }
function Wa(t) {
  const [e, n] = an(Qa)
  nr(async () => {
    const c = window?.fuelet
    console.log('fuel', c),
      c && n({ ...e, provider: c, isWalletClientAvailable: !0 }),
      c?.on(c.events.connection, async () => {
        const l = await c.isConnected()
        n({ ...e, connected: l })
      }),
      c?.on(c.events.accounts, (l) => {
        n({ ...e, accounts: l })
      }),
      c?.on(c.events.currentAccount, (l) => {
        n({ ...e, currentAccount: l })
      }),
      c && (await r.mutateAsync())
  })
  const r = Pe(
      () => ({ mutationFn: async () => await e?.provider?.isConnected() }),
      () => te,
    ),
    s = Pe(
      () => ({
        mutationFn: async () => {
          const c = e?.provider
          return e.connected || (await c?.connect()), await c?.currentAccount()
        },
        onSuccess(c) {
          c && n({ ...e, connected: !0, currentAccount: c })
        },
      }),
      () => te,
    ),
    i = Pe(
      () => ({
        mutationFn: async () => await e?.provider?.disconnect(),
        onSuccess(c) {
          c &&
            n({
              ...e,
              connected: !1,
              accounts: [],
              currentAccount: void 0,
              loyalty: { redeemablePointsAmount: 0, historicalPointsAmount: 0 },
            })
        },
      }),
      () => te,
    ),
    o = Ua(
      () => ({
        enabled: !!e?.connected,
        queryKey: ['loyalty', e?.currentAccount],
        queryFn: async () => ({ redeemablePointsAmount: 30, historicalPointsAmount: 1e3 }),
      }),
      () => te,
    ),
    a = Pe(
      () => ({
        mutationFn: async (c) => {
          n({ ...e, loyalty: c })
        },
      }),
      () => te,
    )
  return (
    Ft(() => {
      e?.currentAccount && o?.isSuccess && o?.data && a.mutate(o?.data)
    }),
    P(hi.Provider, {
      value: { storeOnChainIdentity: e, mutationCheckConnection: r, mutationSignIn: s, mutationSignOut: i },
      get children() {
        return t.children
      },
    })
  )
}
function pi() {
  return Ht(hi)
}
const Ha = Q(
    '<section class="flex flex-col bg-neutral-2 border border-neutral-4 rounded py-3 px-6"><div class="pb-3 leading-snug text-neutral-11 text-xs text-center grid gap-3"><p>Join our loyalty program to unlock premium rewards and exclusive perks !</p><p>The only requirement is to install the <span class="font-medium underline text-neutral-12">Fuel wallet extension</span></p></div><button class="text-sm w-1/2 rounded-full bg-neutral-12 text-neutral-1 font-bold p-1.5 mx-auto">Join',
  ),
  za = Q(
    '<div class="grid gap-4"><section class="aspect-video flex flex-col gap-1.5 justify-end pb-3 -mx-3 -mt-4 bg-neutral-2 text-neutral-12 text-lg border-b px-3 border-neutral-4 rounded"><button title="Sign out" class="absolute end-2 top-2 "><span class="sr-only">Sign out</span></button><p class="text-neutral-11 absolute top-0"><span class="pe-1 text-[0.575em]">Status:&nbsp;</span><span class="font-bold text-sm">gold</span></p><p class="leading-none flex flex-col"><span class="text-neutral-11 pb-0.5 text-[0.575em]">You can spend</span><span class="text-neutral-12 font-black text-2xl"> points</span></p></section><section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative"><h2>My available rewards</h2></section><section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative"><h2>My perks',
  ),
  Ga = Q(
    '<div class="px-1.5"><div class="mt-4 grid gap-4"><section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative"><h2>How to earn rewards</h2></section><section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative"><h2>How to redeem rewards</h2></section><section class="text-sm flex justify-between shadow border rounded p-3 min-h-24"><h2>Our partner shops',
  ),
  Xa = () => {
    const { mutationCheckConnection: t, mutationSignOut: e, storeOnChainIdentity: n, mutationSignIn: r } = pi()
    return (() => {
      const s = Ga(),
        i = s.firstChild,
        o = i.firstChild
      o.firstChild
      const a = o.nextSibling
      a.firstChild
      const c = a.nextSibling
      return (
        c.firstChild,
        B(
          s,
          P(Ms, {
            get children() {
              return [
                P(_t, {
                  get when() {
                    return t.isPending
                  },
                  children: '...',
                }),
                P(_t, {
                  get when() {
                    return n.isWalletClientAvailable === !1
                  },
                  children: 'Download Fuel wallet to get started',
                }),
                P(_t, {
                  get when() {
                    return !n.connected
                  },
                  get children() {
                    const l = Ha(),
                      u = l.firstChild,
                      f = u.nextSibling
                    return (
                      f.firstChild,
                      (f.$$click = async () => await r.mutateAsync()),
                      B(
                        f,
                        P(fe, {
                          get when() {
                            return r.isPending
                          },
                          children: '.......',
                        }),
                        null,
                      ),
                      l
                    )
                  },
                }),
                P(_t, {
                  get when() {
                    return n.connected
                  },
                  get children() {
                    const l = za(),
                      u = l.firstChild,
                      f = u.firstChild
                    f.firstChild
                    const d = f.nextSibling,
                      p = d.nextSibling,
                      y = p.firstChild,
                      g = y.nextSibling,
                      b = g.firstChild,
                      w = u.nextSibling
                    w.firstChild
                    const x = w.nextSibling
                    return (
                      x.firstChild,
                      (f.$$click = () => e.mutate()),
                      B(f, P(ua, { class: 'rtl:rotate-180' }), null),
                      B(g, () => n.loyalty?.redeemablePointsAmount, b),
                      B(w, P(Zt, { class: 'rtl:rotate-180' }), null),
                      B(
                        w,
                        P(Fe, {
                          title: 'View my available rewards',
                          class: 'absolute z-10 w-full h-full block opacity-0 inset-0',
                          href: Xs,
                          children: 'View my available rewards',
                        }),
                        null,
                      ),
                      B(x, P(Zt, { class: 'rtl:rotate-180' }), null),
                      B(
                        x,
                        P(Fe, {
                          title: 'View my perks',
                          class: 'absolute z-10 w-full h-full block opacity-0 inset-0',
                          href: Ys,
                          children: 'View my perks',
                        }),
                        null,
                      ),
                      l
                    )
                  },
                }),
              ]
            },
          }),
          i,
        ),
        B(o, P(Zt, { class: 'rtl:rotate-180' }), null),
        B(
          o,
          P(Fe, {
            title: 'Learn more about how to earn rewards',
            class: 'absolute z-10 w-full h-full block opacity-0 inset-0',
            href: Js,
            children: 'Learn more about how to earn rewards',
          }),
          null,
        ),
        B(a, P(Zt, { class: 'rtl:rotate-180' }), null),
        B(c, P(Zt, { class: 'rtl:rotate-180' }), null),
        s
      )
    })()
  },
  De = '/',
  Ya = () => P(on, { path: De, component: Xa })
sr(['click'])
const Ne = (t, e = []) => ({
    parts: (...n) => {
      if (Ja(e)) return Ne(t, n)
      throw new Error('createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?')
    },
    extendWith: (...n) => Ne(t, [...e, ...n]),
    rename: (n) => Ne(n, e),
    keys: () => e,
    build: () =>
      [...new Set(e)].reduce(
        (n, r) =>
          Object.assign(n, {
            [r]: {
              selector: [
                `&[data-scope="${kt(t)}"][data-part="${kt(r)}"]`,
                `& [data-scope="${kt(t)}"][data-part="${kt(r)}"]`,
              ].join(', '),
              attrs: { 'data-scope': kt(t), 'data-part': kt(r) },
            },
          }),
        {},
      ),
  }),
  kt = (t) =>
    t
      .replace(/([A-Z])([A-Z])/g, '$1-$2')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase(),
  Ja = (t) => t.length === 0
function Ae() {
  return !0
}
const Za = {
    get(t, e, n) {
      return e === G ? n : t.get(e)
    },
    has(t, e) {
      return t.has(e)
    },
    set: Ae,
    deleteProperty: Ae,
    getOwnPropertyDescriptor(t, e) {
      return {
        configurable: !0,
        enumerable: !0,
        get() {
          return t.get(e)
        },
        set: Ae,
        deleteProperty: Ae,
      }
    },
    ownKeys(t) {
      return t.keys()
    },
  },
  Vn = (t) => (typeof t == 'function' && !t.length ? t() : t)
function Br(t) {
  return (...e) => {
    for (const n of t) n && n(...e)
  }
}
const tc = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g
function qr(t) {
  const e = {}
  let n
  for (; (n = tc.exec(t)); ) e[n[1]] = n[2]
  return e
}
function ec(t, e) {
  if (typeof t == 'object' && typeof e == 'object') return { ...t, ...e }
  if (typeof t == 'string' && typeof e == 'string') return `${t};${e}`
  const n = typeof t == 'object' ? t : qr(t),
    r = typeof e == 'object' ? e : qr(e)
  return { ...n, ...r }
}
const vn = (t, e, n) => {
  let r
  for (const s of t) {
    const i = Vn(s)[e]
    r ? i && (r = n(r, i)) : (r = i)
  }
  return r
}
function ln(...t) {
  if (t.length === 1) return t[0]
  const e = {}
  for (const r of t) {
    const s = Vn(r)
    for (const i in s)
      if (i[0] === 'o' && i[1] === 'n' && i[2]) {
        const o = s[i],
          a = i.toLowerCase(),
          c = typeof o == 'function' ? o : Array.isArray(o) ? (o.length === 1 ? o[0] : o[0].bind(void 0, o[1])) : void 0
        c ? (e[a] ? e[a].push(c) : (e[a] = [c])) : delete e[a]
      }
  }
  const n = St(...t)
  return new Proxy(
    {
      get(r) {
        if (typeof r != 'string') return Reflect.get(n, r)
        if (r === 'style') return vn(t, 'style', ec)
        if (r === 'ref') {
          const s = []
          for (const i of t) {
            const o = Vn(i)[r]
            typeof o == 'function' && s.push(o)
          }
          return Br(s)
        }
        if (r[0] === 'o' && r[1] === 'n' && r[2]) {
          const s = e[r.toLowerCase()]
          return s ? Br(s) : Reflect.get(n, r)
        }
        return r === 'class' || r === 'className'
          ? vn(t, r, (s, i) => `${s} ${i}`)
          : r === 'classList'
          ? vn(t, r, (s, i) => ({ ...s, ...i }))
          : Reflect.get(n, r)
      },
      has(r) {
        return Reflect.has(n, r)
      },
      keys() {
        return Object.keys(n)
      },
    },
    Za,
  )
}
function nc(t) {
  return new Proxy(
    {},
    {
      get() {
        return t
      },
    },
  )
}
var rc = /[A-Z]/g,
  sc = /^ms-/,
  wn = {}
function ic(t) {
  return '-' + t.toLowerCase()
}
function oc(t) {
  if (wn.hasOwnProperty(t)) return wn[t]
  var e = t.replace(rc, ic)
  return (wn[t] = sc.test(e) ? '-' + e : e)
}
const ac = (t) => Array.isArray(t),
  cc = (t) => !(t == null || typeof t != 'object' || ac(t)),
  lc = (t) => typeof t == 'number' && !Number.isNaN(t),
  gi = (t) => typeof t == 'string',
  uc = (t) => (t.startsWith('--') ? t : oc(t))
function fc(t) {
  let e = {}
  for (const n in t) {
    const r = t[n]
    ;(!gi(r) && !lc(r)) || (e[uc(n)] = r)
  }
  return e
}
const Kr = {
  onFocus: 'onFocusIn',
  onBlur: 'onFocusOut',
  onDoubleClick: 'onDblClick',
  onChange: 'onInput',
  defaultChecked: 'checked',
  defaultValue: 'value',
  htmlFor: 'for',
  className: 'class',
}
function dc(t) {
  return t in Kr ? Kr[t] : t
}
const hc = nc((t) => {
  const e = {}
  for (const n in t) {
    const r = t[n]
    if (n === 'style' && cc(r)) {
      e.style = fc(r)
      continue
    }
    if (n === 'children') {
      gi(r) && (e.textContent = r)
      continue
    }
    e[dc(n)] = r
  }
  return e
})
function pc(t, e) {
  const { actions: n, state: r, context: s } = e ?? {},
    i = (() => {
      const o = typeof t == 'function' ? t() : t,
        a = typeof s == 'function' ? s() : s
      return a ? o.withContext(a) : o
    })()
  return (
    nr(() => {
      i.start(r),
        i.state.can('SETUP') && i.send('SETUP'),
        ot(() => {
          i.stop()
        })
    }),
    Ft(() => {
      const o = typeof s == 'function' ? s() : s
      i.setContext(o)
    }),
    Ft(() => {
      i.setOptions({ actions: n })
    }),
    i
  )
}
function gc(t, e) {
  const n = pc(t, e),
    [r, s] = an(n.getState())
  return (
    nr(() => {
      const i = n.subscribe((o) => {
        s(ri(o))
      })
      ot(() => {
        i()
      })
    }),
    [r, n.send, n]
  )
}
const yc = () => (t, e) => xe(t, e)
function Ce() {
  return !0
}
const mc = {
  get(t, e, n) {
    return e === G ? n : t.get(e)
  },
  has(t, e) {
    return t.has(e)
  },
  set: Ce,
  deleteProperty: Ce,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e)
      },
      set: Ce,
      deleteProperty: Ce,
    }
  },
  ownKeys(t) {
    return t.keys()
  },
}
function bc(t, e) {
  return new Proxy(
    {
      get(n) {
        return n in t && e(n) ? t[n] : void 0
      },
      has(n) {
        return n in t && e(n)
      },
      keys() {
        return Object.keys(t).filter(e)
      },
    },
    mc,
  )
}
function vc(t, e) {
  return Object.fromEntries(Object.entries(t).map(([n, r]) => [n, e(n, r)]))
}
const yi = (t, e) => Ec({ ...Ur(t), ...Ur(e) }),
  Ur = (t) => (typeof t == 'object' ? t : wc(t)),
  wc = (t) => {
    const e = {}
    if (!t) return e
    const n = /([^:; ]*):\s*([^;]*)/g
    let r
    for (; (r = n.exec(t)); ) e[r[1]] = r[2]
    return e
  },
  Ec = (t) => {
    if (!t) return ''
    let e = ''
    const n = Object.keys(t)
    for (let r = 0; r < n.length; r++) {
      const s = n[r],
        i = t[s]
      i != null && (r && (e += ';'), (e += `${s}:${i}`))
    }
    return e
  },
  Sc = (t) => `$$${t.toLowerCase().slice(2)}`,
  xc = (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  Oc = (t, e) => {
    const n = bc(e, (i) => typeof i == 'string' && i.slice(0, 2) === 'on'),
      r = Object.fromEntries(
        Object.keys(t)
          .filter((i) => i.startsWith('$$'))
          .map((i) => [i, t[i]]),
      ),
      s = I(() =>
        vc(n, (i, o) => {
          const a = Sc(i)
          return xc(r, a)
            ? function (...l) {
                o(...l), r[a](...l)
              }
            : i === 'style'
            ? yi(t.style.cssText, o)
            : o
        }),
      )
    nn(t, St(e, s))
  },
  Pc = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ],
  Ac = new Set(Pc),
  Cc = (t) =>
    t == null ||
    t == null ||
    (typeof t == 'object' && Object.keys(t).length === 0) ||
    (typeof t == 'string' && t.trim().length === 0),
  Tc = (t) => typeof t == 'function',
  ur = (t, e) => Object.fromEntries(Object.entries(t).filter(e)),
  Rc = (t) => ur(t, ([, e]) => !Cc(e)),
  Lc = (t) => ur(t, ([, e]) => !Tc(e)),
  Fc = (t) => ur(t, ([e, n]) => !(Ac.has(e) && !n)),
  mi = 0,
  bi = 1,
  $e = 2,
  vi = 3,
  wi = 4,
  Dc = Symbol('Fragment'),
  Ei = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ]),
  En = new Set(['script', 'style']),
  Vr = /([@.a-z0-9_:-]*)\s*?=?\s*?(['"]?)([\s\S]*?)\2\s+/gim,
  K = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<!--)([\s\S]*?)(-->)|(<!)([\s\S]*?)(>))/gm
function Nc(t) {
  const e = {}
  let n
  if (t) for (Vr.lastIndex = 0, t = ' ' + (t || '') + ' '; (n = Vr.exec(t)); ) n[0] !== ' ' && (e[n[1]] = n[3])
  return e
}
function $c(t) {
  let e, n, r, s, i, o, a, c, l
  const u = []
  ;(K.lastIndex = 0), (n = e = { type: mi, children: [] })
  let f = 0
  function d() {
    ;(s = t.substring(f, K.lastIndex - r[0].length)), s && n.children.push({ type: $e, value: s, parent: n })
  }
  for (; (r = K.exec(t)); ) {
    if (((o = r[5] || r[8]), (a = r[6] || r[9]), (c = r[7] || r[10]), En.has(n.name) && r[2] !== n.name)) {
      ;(i = K.lastIndex - r[0].length), n.children.length > 0 && (n.children[0].value += r[0])
      continue
    } else if (o === '<!--') {
      if (((i = K.lastIndex - r[0].length), En.has(n.name))) continue
      ;(l = {
        type: vi,
        value: a,
        parent: n,
        loc: [
          { start: i, end: i + o.length },
          { start: K.lastIndex - c.length, end: K.lastIndex },
        ],
      }),
        u.push(l),
        l.parent.children.push(l)
    } else if (o === '<!')
      (i = K.lastIndex - r[0].length),
        (l = {
          type: wi,
          value: a,
          parent: n,
          loc: [
            { start: i, end: i + o.length },
            { start: K.lastIndex - c.length, end: K.lastIndex },
          ],
        }),
        u.push(l),
        l.parent.children.push(l)
    else if (r[1] !== '/')
      if ((d(), En.has(n.name))) {
        ;(f = K.lastIndex), d()
        continue
      } else
        (l = {
          type: bi,
          name: r[2] + '',
          attributes: Nc(r[3]),
          parent: n,
          children: [],
          loc: [{ start: K.lastIndex - r[0].length, end: K.lastIndex }],
        }),
          u.push(l),
          l.parent.children.push(l),
          (r[4] && r[4].indexOf('/') > -1) || Ei.has(l.name)
            ? ((l.loc[1] = l.loc[0]), (l.isSelfClosingTag = !0))
            : (n = l)
    else
      d(),
        r[2] + '' === n.name
          ? ((l = n),
            (n = l.parent),
            l.loc.push({ start: K.lastIndex - r[0].length, end: K.lastIndex }),
            (s = t.substring(l.loc[0].end, l.loc[1].start)),
            l.children.length === 0 && l.children.push({ type: $e, value: s, parent: n }))
          : r[2] + '' === u[u.length - 1].name &&
            u[u.length - 1].isSelfClosingTag === !0 &&
            ((l = u[u.length - 1]), l.loc.push({ start: K.lastIndex - r[0].length, end: K.lastIndex }))
    f = K.lastIndex
  }
  return (s = t.slice(f)), n.children.push({ type: $e, value: s, parent: n }), e
}
const fr = Symbol('HTMLString'),
  Ic = Symbol('AttrString'),
  Qr = Symbol('RenderFn')
function Si(t, e = [fr]) {
  const n = { value: t }
  for (const r of e) Object.defineProperty(n, r, { value: !0, enumerable: !1, writable: !1 })
  return n
}
const kc = { '&': '&amp;', '<': '&lt;', '>': '&gt;' }
function Mc(t) {
  return t.replace(/[&<>]/g, (e) => kc[e] || e)
}
function Wr(t) {
  let e = ''
  for (const [n, r] of Object.entries(t)) e += ` ${n}="${r}"`
  return Si(e, [fr, Ic])
}
function jc(t) {
  const { name: e, attributes: n = {} } = t,
    r = t.children.map((s) => dr(s)).join('')
  if (Qr in t) {
    const s = t[Qr](n, Si(r))
    return s && s[fr] ? s.value : Mc(String(s))
  }
  return e === Dc ? r : Ei.has(e) ? `<${t.name}${Wr(n).value}>` : `<${t.name}${Wr(n).value}>${r}</${t.name}>`
}
function dr(t) {
  switch (t.type) {
    case mi:
      return t.children.map((e) => dr(e)).join('')
    case bi:
      return jc(t)
    case $e:
      return `${t.value}`
    case vi:
      return `<!--${t.value}-->`
    case wi:
      return `<!${t.value}>`
  }
}
const _c = (t, e, ...n) => n.reduce((r, s) => s(r), e(t)),
  Bc = (t, e) => {
    if (qc(t)) return t
    const { t: n } = t,
      r = $c(n),
      [s] = r.children,
      i = Object.assign({}, e, {
        class: [e?.class, s.attributes.class].filter(Boolean).join(' '),
        style: yi(e.style, s.attributes.style),
      }),
      o = _c(i, Rc, Lc, Fc)
    return Object.assign(s.attributes, o), { t: dr(r) }
  },
  qc = (t) => !Object.hasOwnProperty.call(t, 't')
function Sn(t) {
  return function (n) {
    const [r, s] = xe(n, ['asChild', 'children'])
    if (!r.asChild)
      return P(
        Fo,
        St({ component: t }, s, {
          get children() {
            return r.children
          },
        }),
      )
    const i = Se(() => Bc(r.children, s))
    return (
      Ft(() => {
        const o = i()
        o instanceof HTMLElement && Oc(o, s)
      }),
      i
    )
  }
}
function Kc() {
  const t = new Map()
  return new Proxy(Sn, {
    apply(e, n, r) {
      return Sn(r[0])
    },
    get(e, n) {
      const r = n
      return t.has(r) || t.set(r, Sn(r)), t.get(r)
    },
  })
}
const hr = Kc()
function Uc(t, e) {
  return `${t} returned \`undefined\`. Seems you forgot to wrap component within ${e}`
}
function xi(t = {}) {
  const { strict: e = !0, hookName: n = 'useContext', providerName: r = 'Provider', errorMessage: s } = t,
    i = Ee(void 0)
  function o() {
    const a = Ht(i)
    if (!a && e) {
      const c = new Error(s ?? Uc(n, r))
      throw ((c.name = 'ContextError'), Error.captureStackTrace?.(c, o), c)
    }
    return a
  }
  return [i.Provider, o, i]
}
const Qn = (t, e, n, r) => {
    const s = typeof t == 'function' ? t() : t
    return (
      s?.addEventListener(e, n, r),
      () => {
        s?.removeEventListener(e, n, r)
      }
    )
  },
  Vc = (t) => t.button === 2 || (Wc(t) && t.button === 0),
  Qc = () => /Mac|iPod|iPhone|iPad/.test(window.navigator.platform),
  Wc = (t) => (Qc() ? t.metaKey && !t.ctrlKey : t.ctrlKey && !t.metaKey)
function Hr(t, e, n) {
  if (!t) return
  const r = t.ownerDocument.defaultView || window,
    s = new r.CustomEvent(e, n)
  return t.dispatchEvent(s)
}
const zr = (t) => (t ? '' : void 0)
function Ke(t) {
  return typeof t == 'object' && t?.nodeType === Node.ELEMENT_NODE && typeof t?.nodeName == 'string'
}
function Ue(t, e) {
  return !t || !e || !Ke(t) || !Ke(e) ? !1 : t === e || t.contains(e)
}
const Hc = (t) => (t.nodeType === Node.DOCUMENT_NODE ? t : t.ownerDocument ?? document)
function zc(t) {
  const e = {
    getRootNode: (n) => n.getRootNode?.() ?? document,
    getDoc: (n) => Hc(e.getRootNode(n)),
    getWin: (n) => e.getDoc(n).defaultView ?? window,
    getActiveElement: (n) => e.getDoc(n).activeElement,
    getById: (n, r) => e.getRootNode(n).getElementById(r),
    queryById: (n, r) => {
      const s = e.getById(n, r)
      if (!s) throw new Error(`Element with id "${r}" not found.`)
      return s
    },
  }
  return { ...e, ...t }
}
const Gc = (t) => t.nodeType === Node.DOCUMENT_NODE
function pr(t) {
  return Gc(t) ? t : t?.ownerDocument ?? document
}
function Xc(t) {
  return t?.ownerDocument.defaultView ?? window
}
function Ve(t) {
  return t.composedPath?.()[0] ?? t.target
}
const Oi = () => typeof document < 'u'
function Yc() {
  return navigator.userAgentData?.platform ?? navigator.platform
}
const Pi = (t) => Oi() && t.test(Yc()),
  Jc = () => Oi() && !!navigator.maxTouchPoints,
  Zc = () => Pi(/^Mac/) && !Jc(),
  tl = () => Pi(/mac|iphone|ipad|ipod/i),
  el = () => tl() && !Zc()
function nl(t) {
  const e = new Set()
  function n(r) {
    const s = globalThis.requestAnimationFrame(r)
    e.add(() => globalThis.cancelAnimationFrame(s))
  }
  return (
    n(() => n(t)),
    function () {
      e.forEach((s) => s())
    }
  )
}
function vt(t) {
  const e = globalThis.requestAnimationFrame(t)
  return () => {
    globalThis.cancelAnimationFrame(e)
  }
}
const Ai = (t, ...e) => (typeof t == 'function' ? t(...e) : t) ?? void 0,
  Wn =
    (...t) =>
    (...e) => {
      t.forEach(function (n) {
        n?.(...e)
      })
    }
function Ci(t) {
  if (!rl(t) || t === void 0) return t
  const e = Reflect.ownKeys(t).filter((r) => typeof r == 'string'),
    n = {}
  for (const r of e) {
    const s = t[r]
    s !== void 0 && (n[r] = Ci(s))
  }
  return n
}
const rl = (t) => t && typeof t == 'object' && t.constructor === Object
function sl(...t) {
  const e = t.length === 1 ? t[0] : t[1],
    n = t.length === 2 ? t[0] : !0
}
const il = Symbol(),
  Gr = Object.getPrototypeOf,
  Hn = new WeakMap(),
  ol = (t) => t && (Hn.has(t) ? Hn.get(t) : Gr(t) === Object.prototype || Gr(t) === Array.prototype),
  al = (t) => (ol(t) && t[il]) || null,
  Xr = (t, e = !0) => {
    Hn.set(t, e)
  },
  xn = (t) => typeof t == 'object' && t !== null,
  Tt = new WeakMap(),
  ie = new WeakSet(),
  cl = (
    t = Object.is,
    e = (l, u) => new Proxy(l, u),
    n = (l) =>
      xn(l) &&
      !ie.has(l) &&
      (Array.isArray(l) || !(Symbol.iterator in l)) &&
      !(l instanceof WeakMap) &&
      !(l instanceof WeakSet) &&
      !(l instanceof Error) &&
      !(l instanceof Number) &&
      !(l instanceof Date) &&
      !(l instanceof String) &&
      !(l instanceof RegExp) &&
      !(l instanceof ArrayBuffer),
    r = (l) => {
      switch (l.status) {
        case 'fulfilled':
          return l.value
        case 'rejected':
          throw l.reason
        default:
          throw l
      }
    },
    s = new WeakMap(),
    i = (l, u, f = r) => {
      const d = s.get(l)
      if (d?.[0] === u) return d[1]
      const p = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l))
      return (
        Xr(p, !0),
        s.set(l, [u, p]),
        Reflect.ownKeys(l).forEach((y) => {
          const g = Reflect.get(l, y)
          ie.has(g)
            ? (Xr(g, !1), (p[y] = g))
            : g instanceof Promise
            ? Object.defineProperty(p, y, {
                get() {
                  return f(g)
                },
              })
            : Tt.has(g)
            ? (p[y] = Qt(g, f))
            : (p[y] = g)
        }),
        Object.freeze(p)
      )
    },
    o = new WeakMap(),
    a = [1, 1],
    c = (l) => {
      if (!xn(l)) throw new Error('object required')
      const u = o.get(l)
      if (u) return u
      let f = a[0]
      const d = new Set(),
        p = (S, v = ++a[0]) => {
          f !== v && ((f = v), d.forEach((h) => h(S, v)))
        }
      let y = a[1]
      const g = (S = ++a[1]) => (
          y !== S &&
            !d.size &&
            ((y = S),
            w.forEach(([v]) => {
              const h = v[1](S)
              h > f && (f = h)
            })),
          f
        ),
        b = (S) => (v, h) => {
          const m = [...v]
          ;(m[1] = [S, ...m[1]]), p(m, h)
        },
        w = new Map(),
        x = (S, v) => {
          if (d.size) {
            const h = v[3](b(S))
            w.set(S, [v, h])
          } else w.set(S, [v])
        },
        R = (S) => {
          const v = w.get(S)
          v && (w.delete(S), v[1]?.())
        },
        N = (S) => (
          d.add(S),
          d.size === 1 &&
            w.forEach(([h, m], E) => {
              const A = h[3](b(E))
              w.set(E, [h, A])
            }),
          () => {
            d.delete(S),
              d.size === 0 &&
                w.forEach(([h, m], E) => {
                  m && (m(), w.set(E, [h]))
                })
          }
        ),
        D = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l)),
        M = e(D, {
          deleteProperty(S, v) {
            const h = Reflect.get(S, v)
            R(v)
            const m = Reflect.deleteProperty(S, v)
            return m && p(['delete', [v], h]), m
          },
          set(S, v, h, m) {
            const E = Reflect.has(S, v),
              A = Reflect.get(S, v, m)
            if (E && (t(A, h) || (o.has(h) && t(A, o.get(h))))) return !0
            R(v), xn(h) && (h = al(h) || h)
            let O = h
            if (!Object.getOwnPropertyDescriptor(S, v)?.set)
              if (h instanceof Promise)
                h.then((T) => {
                  ;(h.status = 'fulfilled'), (h.value = T), p(['resolve', [v], T])
                }).catch((T) => {
                  ;(h.status = 'rejected'), (h.reason = T), p(['reject', [v], T])
                })
              else {
                !Tt.has(h) && n(h) && (O = gr(h))
                const T = !ie.has(O) && Tt.get(O)
                T && x(v, T)
              }
            return Reflect.set(S, v, O, m), p(['set', [v], h, A]), !0
          },
        })
      o.set(l, M)
      const F = [D, g, i, N]
      return (
        Tt.set(M, F),
        Reflect.ownKeys(l).forEach((S) => {
          const v = Object.getOwnPropertyDescriptor(l, S)
          v.get || v.set ? Object.defineProperty(D, S, v) : (M[S] = l[S])
        }),
        M
      )
    },
  ) => [c, Tt, ie, t, e, n, r, s, i, o, a],
  [ll] = cl()
function gr(t = {}) {
  return ll(t)
}
function zn(t, e, n) {
  const r = Tt.get(t)
  let s
  const i = [],
    o = r[3]
  let a = !1
  const l = o((u) => {
    if ((i.push(u), n)) {
      e(i.splice(0))
      return
    }
    s ||
      (s = Promise.resolve().then(() => {
        ;(s = void 0), a && e(i.splice(0))
      }))
  })
  return (
    (a = !0),
    () => {
      ;(a = !1), l()
    }
  )
}
function Qt(t, e) {
  const n = Tt.get(t),
    [r, s, i] = n
  return i(r, s(), e)
}
function Yr(t) {
  return ie.add(t), t
}
function ul(t, e) {
  Object.keys(e).forEach((s) => {
    if (Object.getOwnPropertyDescriptor(t, s)) throw new Error('object property already defined')
    const i = e[s],
      { get: o, set: a } = typeof i == 'function' ? { get: i } : i,
      c = {}
    ;(c.get = () => o(Qt(r))), a && (c.set = (l) => a(r, l)), Object.defineProperty(t, s, c)
  })
  const r = gr(t)
  return r
}
const fl = (t, e) => Object.is(t, e)
function Jr(t, e, n, r, s) {
  let i = Reflect.get(Qt(t), e)
  const o = s || fl
  function a() {
    const c = Qt(t)
    o(i, c[e]) || (n(c[e]), (i = Reflect.get(c, e)))
  }
  return zn(t, a, r)
}
function Qe(t) {
  if (!dl(t) || t === void 0) return t
  const e = Reflect.ownKeys(t).filter((r) => typeof r == 'string'),
    n = {}
  for (const r of e) {
    const s = t[r]
    s !== void 0 && (n[r] = Qe(s))
  }
  return n
}
const dl = (t) => t && typeof t == 'object' && t.constructor === Object,
  oe = (t) => Array.isArray(t),
  ae = (t) => !(t == null || typeof t != 'object' || oe(t)),
  hl = (t) => typeof t == 'number' && !Number.isNaN(t),
  dt = (t) => typeof t == 'string',
  Gn = (t) => typeof t == 'function'
function Ti(t, ...e) {
  for (const n of e) {
    const r = Qe(n)
    for (const s in r) ae(n[s]) ? (t[s] || (t[s] = {}), Ti(t[s], n[s])) : (t[s] = n[s])
  }
  return t
}
function Zr(t, e, n) {
  typeof n.value == 'object' && (n.value = Bt(n.value)),
    !n.enumerable || n.get || n.set || !n.configurable || !n.writable || e === '__proto__'
      ? Object.defineProperty(t, e, n)
      : (t[e] = n.value)
}
function Bt(t) {
  if (typeof t != 'object') return t
  var e = 0,
    n,
    r,
    s,
    i = Object.prototype.toString.call(t)
  if (
    (i === '[object Object]'
      ? (s = Object.create(t.__proto__ || null))
      : i === '[object Array]'
      ? (s = Array(t.length))
      : i === '[object Set]'
      ? ((s = new Set()),
        t.forEach(function (o) {
          s.add(Bt(o))
        }))
      : i === '[object Map]'
      ? ((s = new Map()),
        t.forEach(function (o, a) {
          s.set(Bt(a), Bt(o))
        }))
      : i === '[object Date]'
      ? (s = new Date(+t))
      : i === '[object RegExp]'
      ? (s = new RegExp(t.source, t.flags))
      : i === '[object DataView]'
      ? (s = new t.constructor(Bt(t.buffer)))
      : i === '[object ArrayBuffer]'
      ? (s = t.slice(0))
      : i.slice(-6) === 'Array]' && (s = new t.constructor(t)),
    s)
  ) {
    for (r = Object.getOwnPropertySymbols(t); e < r.length; e++) Zr(s, r[e], Object.getOwnPropertyDescriptor(t, r[e]))
    for (e = 0, r = Object.getOwnPropertyNames(t); e < r.length; e++)
      (Object.hasOwnProperty.call(s, (n = r[e])) && s[n] === t[n]) || Zr(s, n, Object.getOwnPropertyDescriptor(t, n))
  }
  return s || t
}
function ts(t) {
  return Bt(t)
}
function H(t) {
  return dt(t) ? { type: t } : t
}
function bt(t) {
  return t ? (oe(t) ? t.slice() : [t]) : []
}
function Ri(t) {
  return ae(t) && t.predicate != null
}
const pl = () => !0
function Li(t, e) {
  return (
    (t = t ?? pl),
    (n, r, s) => {
      if (dt(t)) {
        const i = e[t]
        return Gn(i) ? i(n, r, s) : i
      }
      return Ri(t) ? t.predicate(e)(n, r, s) : t?.(n, r, s)
    }
  )
}
function On(t, e) {
  return (n, r, s) => (Ri(t) ? t.predicate(e)(n, r, s) : t)
}
var lt = ((t) => ((t.NotStarted = 'Not Started'), (t.Running = 'Running'), (t.Stopped = 'Stopped'), t))(lt || {}),
  z = ((t) => (
    (t.Start = 'machine.start'),
    (t.Stop = 'machine.stop'),
    (t.Created = 'machine.created'),
    (t.SendParent = 'machine.send-parent'),
    (t.After = 'machine.after'),
    (t.Every = 'machine.every'),
    (t.Init = 'machine.init'),
    t
  ))(z || {}),
  Xn = ((t) => ((t.Machine = 'machine'), (t.Actor = 'machine.actor'), t))(Xn || {})
const es = (t, ...e) => (typeof t == 'function' ? t(...e) : t) ?? void 0,
  ft = (t) => t,
  Pn = () => {},
  gl = (() => {
    let t = 0
    return () => (t++, t.toString(36))
  })()
function yl(t) {
  const e = t.computed ?? ft({}),
    n = t.context ?? ft({}),
    r = gr({
      value: t.initial ?? '',
      previousValue: '',
      event: ft({}),
      previousEvent: ft({}),
      context: ul(n, e),
      done: !1,
      tags: [],
      hasTag(s) {
        return this.tags.includes(s)
      },
      matches(...s) {
        return s.includes(this.value)
      },
      can(s) {
        return ft(this).nextEvents.includes(s)
      },
      get nextEvents() {
        const s = t.states?.[this.value]?.on ?? {},
          i = t?.on ?? {}
        return Object.keys({ ...s, ...i })
      },
      get changed() {
        return this.event.value === z.Init || !this.previousValue ? !1 : this.value !== this.previousValue
      },
    })
  return ft(r)
}
function An(...t) {
  const e = t.length === 1 ? t[0] : t[1],
    n = t.length === 2 ? t[0] : !0
}
function Ie(...t) {
  const e = t.length === 1 ? t[0] : t[1],
    n = t.length === 2 ? t[0] : !0
}
function Te(t, e) {
  return (n, r) => {
    if (hl(t)) return t
    if (Gn(t)) return t(n, r)
    if (dt(t)) {
      const s = Number.parseFloat(t)
      if (!Number.isNaN(s)) return s
      if (e) {
        const i = e?.[t]
        return (
          Ie(
            i == null,
            `[@zag-js/core > determine-delay] Cannot determine delay for \`${t}\`. It doesn't exist in \`options.delays\``,
          ),
          Gn(i) ? i(n, r) : i
        )
      }
    }
  }
}
function ml(t) {
  return dt(t) ? { target: t } : t
}
function bl(t, e) {
  return (n, r, s) =>
    bt(t)
      .map(ml)
      .find((i) => Li(i.guard, e)(n, r, s) ?? i.target ?? i.actions)
}
function vl(t) {
  for (; t.length > 0; ) t.pop()
  return t
}
class yr {
  status = lt.NotStarted
  state
  initialState
  initialContext
  id
  type = Xn.Machine
  activityEvents = new Map()
  delayedEvents = new Map()
  stateListeners = new Set()
  contextListeners = new Set()
  eventListeners = new Set()
  doneListeners = new Set()
  contextWatchers = new Set()
  removeStateListener = Pn
  removeEventListener = Pn
  removeContextListener = Pn
  parent
  children = new Map()
  guardMap
  actionMap
  delayMap
  activityMap
  sync
  options
  config
  constructor(e, n) {
    ;(this.config = ts(e)),
      (this.options = ts(n ?? {})),
      (this.id = this.config.id ?? `machine-${gl()}`),
      (this.guardMap = this.options?.guards ?? {}),
      (this.actionMap = this.options?.actions ?? {}),
      (this.delayMap = this.options?.delays ?? {}),
      (this.activityMap = this.options?.activities ?? {}),
      (this.sync = this.options?.sync ?? !1),
      (this.state = yl(this.config)),
      (this.initialContext = Qt(this.state.context))
    const r = H(z.Created)
    this.executeActions(this.config?.created, r)
  }
  get stateSnapshot() {
    return ft(Qt(this.state))
  }
  getState() {
    return this.stateSnapshot
  }
  get contextSnapshot() {
    return this.stateSnapshot.context
  }
  start = (e) => {
    if (((this.state.value = ''), this.status === lt.Running)) return this
    ;(this.status = lt.Running),
      (this.removeStateListener = zn(
        this.state,
        () => {
          this.stateListeners.forEach((a) => {
            a(this.stateSnapshot)
          })
        },
        this.sync,
      )),
      (this.removeEventListener = Jr(
        this.state,
        'event',
        (a) => {
          this.executeActions(this.config.onEvent, a),
            this.eventListeners.forEach((c) => {
              c(a)
            })
        },
        this.sync,
      )),
      (this.removeContextListener = zn(
        this.state.context,
        () => {
          this.log('Context:', this.contextSnapshot),
            this.contextListeners.forEach((a) => {
              a(this.contextSnapshot)
            })
        },
        this.sync || this.options.debug,
      )),
      this.setupContextWatchers(),
      this.executeActivities(H(z.Start), bt(this.config.activities), z.Start),
      this.executeActions(this.config.entry, H(z.Start))
    const n = H(z.Init),
      r = ae(e) ? e.value : e,
      s = ae(e) ? e.context : void 0
    s && this.setContext(s)
    const i = { target: r ?? this.config.initial },
      o = this.getNextStateInfo(i, n)
    return (this.initialState = o), this.performStateChangeEffects(this.state.value, o, n), this
  }
  setupContextWatchers = () => {
    for (const [e, n] of Object.entries(this.config.watch ?? {})) {
      const r = this.options.compareFns?.[e],
        s = Jr(
          this.state.context,
          e,
          () => {
            this.executeActions(n, this.state.event)
          },
          this.sync,
          r,
        )
      this.contextWatchers.add(s)
    }
  }
  stop = () => {
    if (this.status !== lt.Stopped)
      return (
        this.performExitEffects(this.state.value, H(z.Stop)),
        this.executeActions(this.config.exit, H(z.Stop)),
        this.setState(''),
        this.setEvent(z.Stop),
        this.stopStateListeners(),
        this.stopChildren(),
        this.stopActivities(),
        this.stopDelayedEvents(),
        this.stopContextWatchers(),
        this.stopEventListeners(),
        this.stopContextListeners(),
        (this.status = lt.Stopped),
        this
      )
  }
  stopEventListeners = () => {
    this.eventListeners.clear(), this.removeEventListener()
  }
  stopContextListeners = () => {
    this.contextListeners.clear(), this.removeContextListener()
  }
  stopStateListeners = () => {
    this.removeStateListener(), this.stateListeners.clear()
  }
  stopContextWatchers = () => {
    this.contextWatchers.forEach((e) => e()), this.contextWatchers.clear()
  }
  stopDelayedEvents = () => {
    this.delayedEvents.forEach((e) => {
      e.forEach((n) => n())
    }),
      this.delayedEvents.clear()
  }
  stopActivities = (e) => {
    e
      ? (this.activityEvents.get(e)?.forEach((n) => n()),
        this.activityEvents.get(e)?.clear(),
        this.activityEvents.delete(e))
      : (this.activityEvents.forEach((n) => {
          n.forEach((r) => r()), n.clear()
        }),
        this.activityEvents.clear())
  }
  sendChild = (e, n) => {
    const r = H(e),
      s = es(n, this.contextSnapshot),
      i = this.children.get(s)
    i || Ie(`[@zag-js/core] Cannot send '${r.type}' event to unknown child`), i.send(r)
  }
  stopChild = (e) => {
    this.children.has(e) || Ie(`[@zag-js/core > stop-child] Cannot stop unknown child ${e}`),
      this.children.get(e).stop(),
      this.children.delete(e)
  }
  removeChild = (e) => {
    this.children.delete(e)
  }
  stopChildren = () => {
    this.children.forEach((e) => e.stop()), this.children.clear()
  }
  setParent = (e) => {
    this.parent = e
  }
  spawn = (e, n) => {
    const r = es(e)
    return (
      n && (r.id = n),
      (r.type = Xn.Actor),
      r.setParent(this),
      this.children.set(r.id, ft(r)),
      r
        .onDone(() => {
          this.removeChild(r.id)
        })
        .start(),
      ft(Yr(r))
    )
  }
  addActivityCleanup = (e, n) => {
    e && (this.activityEvents.has(e) ? this.activityEvents.get(e)?.add(n) : this.activityEvents.set(e, new Set([n])))
  }
  setState = (e) => {
    ;(this.state.previousValue = this.state.value), (this.state.value = e)
    const n = this.getStateNode(e)
    e == null ? vl(this.state.tags) : (this.state.tags = bt(n?.tags))
  }
  setContext = (e) => {
    e && Ti(this.state.context, e)
  }
  withContext = (e) => {
    const n = { ...this.config.context, ...Qe(e) }
    return new yr({ ...this.config, context: n }, this.options)
  }
  setOptions = (e) => {
    const n = Qe(e)
    ;(this.actionMap = { ...this.actionMap, ...n.actions }),
      (this.delayMap = { ...this.delayMap, ...n.delays }),
      (this.activityMap = { ...this.activityMap, ...n.activities }),
      (this.guardMap = { ...this.guardMap, ...n.guards })
  }
  getStateNode = (e) => {
    if (e) return this.config.states?.[e]
  }
  getNextStateInfo = (e, n) => {
    const r = this.determineTransition(e, n),
      s = !r?.target,
      i = r?.target ?? this.state.value,
      o = this.state.value !== i,
      a = this.getStateNode(i),
      l = { reenter: !s && !o && !r?.internal, transition: r, stateNode: a, target: i, changed: o }
    return this.log('NextState:', `[${n.type}]`, this.state.value, '---->', l.target), l
  }
  getActionFromDelayedTransition = (e) => {
    const n = H(z.After),
      s = Te(e.delay, this.delayMap)(this.contextSnapshot, n)
    let i
    return {
      entry: () => {
        i = globalThis.setTimeout(() => {
          const o = this.getNextStateInfo(e, n)
          this.performStateChangeEffects(this.state.value, o, n)
        }, s)
      },
      exit: () => {
        globalThis.clearTimeout(i)
      },
    }
  }
  getDelayedEventActions = (e) => {
    const n = this.getStateNode(e),
      r = H(z.After)
    if (!n || !n.after) return
    const s = [],
      i = []
    if (oe(n.after)) {
      const o = this.determineTransition(n.after, r)
      if (!o) return
      const a = this.getActionFromDelayedTransition(o)
      s.push(a.entry), i.push(a.exit)
    } else if (ae(n.after))
      for (const o in n.after) {
        const a = n.after[o]
        let c = {}
        if (oe(a)) {
          const u = this.determineTransition(a, r)
          u && (c = u)
        } else dt(a) ? (c = { target: a, delay: o }) : (c = { ...a, delay: o })
        const l = this.getActionFromDelayedTransition(c)
        s.push(l.entry), i.push(l.exit)
      }
    return { entries: s, exits: i }
  }
  get self() {
    const e = this
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      get state() {
        return e.stateSnapshot
      },
      get initialContext() {
        return e.initialContext
      },
      get initialState() {
        return e.initialState?.target ?? ''
      },
    }
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? '',
      getState: () => this.stateSnapshot,
      getAction: (e) => this.actionMap[e],
      getGuard: (e) => this.guardMap[e],
    }
  }
  get guardMeta() {
    return { state: this.stateSnapshot }
  }
  executeActions = (e, n) => {
    const r = On(e, this.guardMap)(this.contextSnapshot, n, this.guardMeta)
    for (const s of bt(r)) {
      const i = dt(s) ? this.actionMap?.[s] : s
      An(dt(s) && !i, `[@zag-js/core > execute-actions] No implementation found for action: \`${s}\``),
        i?.(this.state.context, n, this.meta)
    }
  }
  executeActivities = (e, n, r) => {
    for (const s of n) {
      const i = dt(s) ? this.activityMap?.[s] : s
      if (!i) {
        An(`[@zag-js/core > execute-activity] No implementation found for activity: \`${s}\``)
        continue
      }
      const o = i(this.state.context, e, this.meta)
      o && this.addActivityCleanup(r ?? this.state.value, o)
    }
  }
  createEveryActivities = (e, n) => {
    if (!e) return
    const r = H(z.Every)
    if (oe(e)) {
      const s = bt(e).find((c) => {
        const l = c.delay,
          f = Te(l, this.delayMap)(this.contextSnapshot, r)
        return Li(c.guard, this.guardMap)(this.contextSnapshot, r, this.guardMeta) ?? f != null
      })
      if (!s) return
      const o = Te(s.delay, this.delayMap)(this.contextSnapshot, r)
      n(() => {
        const c = globalThis.setInterval(() => {
          this.executeActions(s.actions, r)
        }, o)
        return () => {
          globalThis.clearInterval(c)
        }
      })
    } else
      for (const s in e) {
        const i = e?.[s],
          a = Te(s, this.delayMap)(this.contextSnapshot, r)
        n(() => {
          const l = globalThis.setInterval(() => {
            this.executeActions(i, r)
          }, a)
          return () => {
            globalThis.clearInterval(l)
          }
        })
      }
  }
  setEvent = (e) => {
    ;(this.state.previousEvent = this.state.event), (this.state.event = Yr(H(e)))
  }
  performExitEffects = (e, n) => {
    const r = this.state.value
    if (r === '') return
    const s = e ? this.getStateNode(e) : void 0
    this.stopActivities(r)
    const i = On(s?.exit, this.guardMap)(this.contextSnapshot, n, this.guardMeta),
      o = bt(i),
      a = this.delayedEvents.get(r)
    a && o.push(...a), this.executeActions(o, n), this.eventListeners.clear()
  }
  performEntryEffects = (e, n) => {
    const r = this.getStateNode(e),
      s = bt(r?.activities)
    this.createEveryActivities(r?.every, (c) => {
      s.unshift(c)
    }),
      s.length > 0 && this.executeActivities(n, s)
    const i = On(r?.entry, this.guardMap)(this.contextSnapshot, n, this.guardMeta),
      o = bt(i),
      a = this.getDelayedEventActions(e)
    r?.after && a && (this.delayedEvents.set(e, a?.exits), o.push(...a.entries)),
      this.executeActions(o, n),
      r?.type === 'final' &&
        ((this.state.done = !0),
        this.doneListeners.forEach((c) => {
          c(this.stateSnapshot)
        }),
        this.stop())
  }
  performTransitionEffects = (e, n) => {
    const r = this.determineTransition(e, n)
    this.executeActions(r?.actions, n)
  }
  performStateChangeEffects = (e, n, r) => {
    this.setEvent(r)
    const s = n.changed || n.reenter
    s && this.performExitEffects(e, r),
      this.performTransitionEffects(n.transition, r),
      this.setState(n.target),
      s && this.performEntryEffects(n.target, r)
  }
  determineTransition = (e, n) => bl(e, this.guardMap)?.(this.contextSnapshot, n, this.guardMeta)
  sendParent = (e) => {
    this.parent || Ie('[@zag-js/core > send-parent] Cannot send event to an unknown parent')
    const n = H(e)
    this.parent?.send(n)
  }
  log = (...e) => {}
  send = (e) => {
    const n = H(e)
    this.transition(this.state.value, n)
  }
  transition = (e, n) => {
    const r = dt(e) ? this.getStateNode(e) : e?.stateNode,
      s = H(n)
    if (!r && !this.config.on) {
      const a =
        this.status === lt.Stopped
          ? '[@zag-js/core > transition] Cannot transition a stopped machine'
          : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${e}, \`event\`: ${s.type}`
      An(a)
      return
    }
    const i = r?.on?.[s.type] ?? this.config.on?.[s.type],
      o = this.getNextStateInfo(i, s)
    return this.performStateChangeEffects(this.state.value, o, s), o.stateNode
  }
  subscribe = (e) => (
    this.stateListeners.add(e),
    this.status === lt.Running && e(this.stateSnapshot),
    () => {
      this.stateListeners.delete(e)
    }
  )
  onDone = (e) => (this.doneListeners.add(e), this)
  onTransition = (e) => (this.stateListeners.add(e), this.status === lt.Running && e(this.stateSnapshot), this)
  onChange = (e) => (this.contextListeners.add(e), this)
  onEvent = (e) => (this.eventListeners.add(e), this)
  get [Symbol.toStringTag]() {
    return 'Machine'
  }
}
const wl = (t, e) => new yr(t, e),
  [bf, El] = xi({ hookName: 'useEnvironmentContext', providerName: '<EnvironmentProvider />', strict: !1 })
function Xt(t) {
  return t.split('-')[1]
}
function mr(t) {
  return t === 'y' ? 'height' : 'width'
}
function wt(t) {
  return t.split('-')[0]
}
function Yt(t) {
  return ['top', 'bottom'].includes(wt(t)) ? 'x' : 'y'
}
function ns(t, e, n) {
  let { reference: r, floating: s } = t
  const i = r.x + r.width / 2 - s.width / 2,
    o = r.y + r.height / 2 - s.height / 2,
    a = Yt(e),
    c = mr(a),
    l = r[c] / 2 - s[c] / 2,
    u = a === 'x'
  let f
  switch (wt(e)) {
    case 'top':
      f = { x: i, y: r.y - s.height }
      break
    case 'bottom':
      f = { x: i, y: r.y + r.height }
      break
    case 'right':
      f = { x: r.x + r.width, y: o }
      break
    case 'left':
      f = { x: r.x - s.width, y: o }
      break
    default:
      f = { x: r.x, y: r.y }
  }
  switch (Xt(e)) {
    case 'start':
      f[a] -= l * (n && u ? -1 : 1)
      break
    case 'end':
      f[a] += l * (n && u ? -1 : 1)
  }
  return f
}
const Sl = async (t, e, n) => {
  const { placement: r = 'bottom', strategy: s = 'absolute', middleware: i = [], platform: o } = n,
    a = i.filter(Boolean),
    c = await (o.isRTL == null ? void 0 : o.isRTL(e))
  let l = await o.getElementRects({ reference: t, floating: e, strategy: s }),
    { x: u, y: f } = ns(l, r, c),
    d = r,
    p = {},
    y = 0
  for (let g = 0; g < a.length; g++) {
    const { name: b, fn: w } = a[g],
      {
        x,
        y: R,
        data: N,
        reset: D,
      } = await w({
        x: u,
        y: f,
        initialPlacement: r,
        placement: d,
        strategy: s,
        middlewareData: p,
        rects: l,
        platform: o,
        elements: { reference: t, floating: e },
      })
    ;(u = x ?? u),
      (f = R ?? f),
      (p = { ...p, [b]: { ...p[b], ...N } }),
      D &&
        y <= 50 &&
        (y++,
        typeof D == 'object' &&
          (D.placement && (d = D.placement),
          D.rects &&
            (l = D.rects === !0 ? await o.getElementRects({ reference: t, floating: e, strategy: s }) : D.rects),
          ({ x: u, y: f } = ns(l, d, c))),
        (g = -1))
  }
  return { x: u, y: f, placement: d, strategy: s, middlewareData: p }
}
function Jt(t, e) {
  return typeof t == 'function' ? t(e) : t
}
function Fi(t) {
  return typeof t != 'number'
    ? (function (e) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...e }
      })(t)
    : { top: t, right: t, bottom: t, left: t }
}
function We(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height }
}
async function br(t, e) {
  var n
  e === void 0 && (e = {})
  const { x: r, y: s, platform: i, rects: o, elements: a, strategy: c } = t,
    {
      boundary: l = 'clippingAncestors',
      rootBoundary: u = 'viewport',
      elementContext: f = 'floating',
      altBoundary: d = !1,
      padding: p = 0,
    } = Jt(e, t),
    y = Fi(p),
    g = a[d ? (f === 'floating' ? 'reference' : 'floating') : f],
    b = We(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(g))) == null || n
            ? g
            : g.contextElement || (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating))),
        boundary: l,
        rootBoundary: u,
        strategy: c,
      }),
    ),
    w = f === 'floating' ? { ...o.floating, x: r, y: s } : o.reference,
    x = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)),
    R = ((await (i.isElement == null ? void 0 : i.isElement(x))) &&
      (await (i.getScale == null ? void 0 : i.getScale(x)))) || { x: 1, y: 1 },
    N = We(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w, offsetParent: x, strategy: c })
        : w,
    )
  return {
    top: (b.top - N.top + y.top) / R.y,
    bottom: (N.bottom - b.bottom + y.bottom) / R.y,
    left: (b.left - N.left + y.left) / R.x,
    right: (N.right - b.right + y.right) / R.x,
  }
}
const me = Math.min,
  At = Math.max
function Yn(t, e, n) {
  return At(t, me(e, n))
}
const xl = (t) => ({
    name: 'arrow',
    options: t,
    async fn(e) {
      const { x: n, y: r, placement: s, rects: i, platform: o, elements: a } = e,
        { element: c, padding: l = 0 } = Jt(t, e) || {}
      if (c == null) return {}
      const u = Fi(l),
        f = { x: n, y: r },
        d = Yt(s),
        p = mr(d),
        y = await o.getDimensions(c),
        g = d === 'y',
        b = g ? 'top' : 'left',
        w = g ? 'bottom' : 'right',
        x = g ? 'clientHeight' : 'clientWidth',
        R = i.reference[p] + i.reference[d] - f[d] - i.floating[p],
        N = f[d] - i.reference[d],
        D = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c))
      let L = D ? D[x] : 0
      ;(L && (await (o.isElement == null ? void 0 : o.isElement(D)))) || (L = a.floating[x] || i.floating[p])
      const M = R / 2 - N / 2,
        F = L / 2 - y[p] / 2 - 1,
        S = me(u[b], F),
        v = me(u[w], F),
        h = S,
        m = L - y[p] - v,
        E = L / 2 - y[p] / 2 + M,
        A = Yn(h, E, m),
        O = Xt(s) != null && E != A && i.reference[p] / 2 - (E < h ? S : v) - y[p] / 2 < 0 ? (E < h ? h - E : m - E) : 0
      return { [d]: f[d] - O, data: { [d]: A, centerOffset: E - A + O } }
    },
  }),
  Ol = ['top', 'right', 'bottom', 'left']
Ol.reduce((t, e) => t.concat(e, e + '-start', e + '-end'), [])
const Pl = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function He(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Pl[e])
}
function Al(t, e, n) {
  n === void 0 && (n = !1)
  const r = Xt(t),
    s = Yt(t),
    i = mr(s)
  let o = s === 'x' ? (r === (n ? 'end' : 'start') ? 'right' : 'left') : r === 'start' ? 'bottom' : 'top'
  return e.reference[i] > e.floating[i] && (o = He(o)), { main: o, cross: He(o) }
}
const Cl = { start: 'end', end: 'start' }
function Cn(t) {
  return t.replace(/start|end/g, (e) => Cl[e])
}
const Tl = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'flip',
        options: t,
        async fn(e) {
          var n
          const { placement: r, middlewareData: s, rects: i, initialPlacement: o, platform: a, elements: c } = e,
            {
              mainAxis: l = !0,
              crossAxis: u = !0,
              fallbackPlacements: f,
              fallbackStrategy: d = 'bestFit',
              fallbackAxisSideDirection: p = 'none',
              flipAlignment: y = !0,
              ...g
            } = Jt(t, e),
            b = wt(r),
            w = wt(o) === o,
            x = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)),
            R =
              f ||
              (w || !y
                ? [He(o)]
                : (function (h) {
                    const m = He(h)
                    return [Cn(h), m, Cn(m)]
                  })(o))
          f ||
            p === 'none' ||
            R.push(
              ...(function (h, m, E, A) {
                const O = Xt(h)
                let T = (function ($, _, q) {
                  const st = ['left', 'right'],
                    mt = ['right', 'left'],
                    it = ['top', 'bottom'],
                    Pt = ['bottom', 'top']
                  switch ($) {
                    case 'top':
                    case 'bottom':
                      return q ? (_ ? mt : st) : _ ? st : mt
                    case 'left':
                    case 'right':
                      return _ ? it : Pt
                    default:
                      return []
                  }
                })(wt(h), E === 'start', A)
                return O && ((T = T.map(($) => $ + '-' + O)), m && (T = T.concat(T.map(Cn)))), T
              })(o, y, p, x),
            )
          const N = [o, ...R],
            D = await br(e, g),
            L = []
          let M = ((n = s.flip) == null ? void 0 : n.overflows) || []
          if ((l && L.push(D[b]), u)) {
            const { main: h, cross: m } = Al(r, i, x)
            L.push(D[h], D[m])
          }
          if (((M = [...M, { placement: r, overflows: L }]), !L.every((h) => h <= 0))) {
            var F, S
            const h = (((F = s.flip) == null ? void 0 : F.index) || 0) + 1,
              m = N[h]
            if (m) return { data: { index: h, overflows: M }, reset: { placement: m } }
            let E =
              (S = M.filter((A) => A.overflows[0] <= 0).sort((A, O) => A.overflows[1] - O.overflows[1])[0]) == null
                ? void 0
                : S.placement
            if (!E)
              switch (d) {
                case 'bestFit': {
                  var v
                  const A =
                    (v = M.map((O) => [O.placement, O.overflows.filter((T) => T > 0).reduce((T, $) => T + $, 0)]).sort(
                      (O, T) => O[1] - T[1],
                    )[0]) == null
                      ? void 0
                      : v[0]
                  A && (E = A)
                  break
                }
                case 'initialPlacement':
                  E = o
              }
            if (r !== E) return { reset: { placement: E } }
          }
          return {}
        },
      }
    )
  },
  Rl = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: 'offset',
        options: t,
        async fn(e) {
          const { x: n, y: r } = e,
            s = await (async function (i, o) {
              const { placement: a, platform: c, elements: l } = i,
                u = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)),
                f = wt(a),
                d = Xt(a),
                p = Yt(a) === 'x',
                y = ['left', 'top'].includes(f) ? -1 : 1,
                g = u && p ? -1 : 1,
                b = Jt(o, i)
              let {
                mainAxis: w,
                crossAxis: x,
                alignmentAxis: R,
              } = typeof b == 'number'
                ? { mainAxis: b, crossAxis: 0, alignmentAxis: null }
                : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...b }
              return (
                d && typeof R == 'number' && (x = d === 'end' ? -1 * R : R),
                p ? { x: x * g, y: w * y } : { x: w * y, y: x * g }
              )
            })(e, t)
          return { x: n + s.x, y: r + s.y, data: s }
        },
      }
    )
  }
function Ll(t) {
  return t === 'x' ? 'y' : 'x'
}
const Fl = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn(e) {
          const { x: n, y: r, placement: s } = e,
            {
              mainAxis: i = !0,
              crossAxis: o = !1,
              limiter: a = {
                fn: (b) => {
                  let { x: w, y: x } = b
                  return { x: w, y: x }
                },
              },
              ...c
            } = Jt(t, e),
            l = { x: n, y: r },
            u = await br(e, c),
            f = Yt(wt(s)),
            d = Ll(f)
          let p = l[f],
            y = l[d]
          if (i) {
            const b = f === 'y' ? 'bottom' : 'right'
            p = Yn(p + u[f === 'y' ? 'top' : 'left'], p, p - u[b])
          }
          if (o) {
            const b = d === 'y' ? 'bottom' : 'right'
            y = Yn(y + u[d === 'y' ? 'top' : 'left'], y, y - u[b])
          }
          const g = a.fn({ ...e, [f]: p, [d]: y })
          return { ...g, data: { x: g.x - n, y: g.y - r } }
        },
      }
    )
  },
  Dl = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'size',
        options: t,
        async fn(e) {
          const { placement: n, rects: r, platform: s, elements: i } = e,
            { apply: o = () => {}, ...a } = Jt(t, e),
            c = await br(e, a),
            l = wt(n),
            u = Xt(n),
            f = Yt(n) === 'x',
            { width: d, height: p } = r.floating
          let y, g
          l === 'top' || l === 'bottom'
            ? ((y = l),
              (g =
                u === ((await (s.isRTL == null ? void 0 : s.isRTL(i.floating))) ? 'start' : 'end') ? 'left' : 'right'))
            : ((g = l), (y = u === 'end' ? 'top' : 'bottom'))
          const b = p - c[y],
            w = d - c[g],
            x = !e.middlewareData.shift
          let R = b,
            N = w
          if (f) {
            const L = d - c.left - c.right
            N = u || x ? me(w, L) : L
          } else {
            const L = p - c.top - c.bottom
            R = u || x ? me(b, L) : L
          }
          if (x && !u) {
            const L = At(c.left, 0),
              M = At(c.right, 0),
              F = At(c.top, 0),
              S = At(c.bottom, 0)
            f
              ? (N = d - 2 * (L !== 0 || M !== 0 ? L + M : At(c.left, c.right)))
              : (R = p - 2 * (F !== 0 || S !== 0 ? F + S : At(c.top, c.bottom)))
          }
          await o({ ...e, availableWidth: N, availableHeight: R })
          const D = await s.getDimensions(i.floating)
          return d !== D.width || p !== D.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function tt(t) {
  var e
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window
}
function nt(t) {
  return tt(t).getComputedStyle(t)
}
function Di(t) {
  return t instanceof tt(t).Node
}
function Ot(t) {
  return Di(t) ? (t.nodeName || '').toLowerCase() : '#document'
}
function rt(t) {
  return t instanceof tt(t).HTMLElement
}
function gt(t) {
  return t instanceof tt(t).Element
}
function rs(t) {
  return typeof ShadowRoot < 'u' && (t instanceof tt(t).ShadowRoot || t instanceof ShadowRoot)
}
function be(t) {
  const { overflow: e, overflowX: n, overflowY: r, display: s } = nt(t)
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !['inline', 'contents'].includes(s)
}
function Nl(t) {
  return ['table', 'td', 'th'].includes(Ot(t))
}
function Jn(t) {
  const e = vr(),
    n = nt(t)
  return (
    n.transform !== 'none' ||
    n.perspective !== 'none' ||
    (!!n.containerType && n.containerType !== 'normal') ||
    (!e && !!n.backdropFilter && n.backdropFilter !== 'none') ||
    (!e && !!n.filter && n.filter !== 'none') ||
    ['transform', 'perspective', 'filter'].some((r) => (n.willChange || '').includes(r)) ||
    ['paint', 'layout', 'strict', 'content'].some((r) => (n.contain || '').includes(r))
  )
}
function vr() {
  return !(typeof CSS > 'u' || !CSS.supports) && CSS.supports('-webkit-backdrop-filter', 'none')
}
function un(t) {
  return ['html', 'body', '#document'].includes(Ot(t))
}
const ss = Math.min,
  ce = Math.max,
  ze = Math.round,
  Dt = (t) => ({ x: t, y: t })
function Ni(t) {
  const e = nt(t)
  let n = parseFloat(e.width) || 0,
    r = parseFloat(e.height) || 0
  const s = rt(t),
    i = s ? t.offsetWidth : n,
    o = s ? t.offsetHeight : r,
    a = ze(n) !== i || ze(r) !== o
  return a && ((n = i), (r = o)), { width: n, height: r, $: a }
}
function $i(t) {
  return gt(t) ? t : t.contextElement
}
function qt(t) {
  const e = $i(t)
  if (!rt(e)) return Dt(1)
  const n = e.getBoundingClientRect(),
    { width: r, height: s, $: i } = Ni(e)
  let o = (i ? ze(n.width) : n.width) / r,
    a = (i ? ze(n.height) : n.height) / s
  return (o && Number.isFinite(o)) || (o = 1), (a && Number.isFinite(a)) || (a = 1), { x: o, y: a }
}
const is = Dt(0)
function Ii(t, e, n) {
  var r, s
  if ((e === void 0 && (e = !0), !vr())) return is
  const i = t ? tt(t) : window
  return !n || (e && n !== i)
    ? is
    : {
        x: ((r = i.visualViewport) == null ? void 0 : r.offsetLeft) || 0,
        y: ((s = i.visualViewport) == null ? void 0 : s.offsetTop) || 0,
      }
}
function ve(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1)
  const s = t.getBoundingClientRect(),
    i = $i(t)
  let o = Dt(1)
  e && (r ? gt(r) && (o = qt(r)) : (o = qt(t)))
  const a = Ii(i, n, r)
  let c = (s.left + a.x) / o.x,
    l = (s.top + a.y) / o.y,
    u = s.width / o.x,
    f = s.height / o.y
  if (i) {
    const d = tt(i),
      p = r && gt(r) ? tt(r) : r
    let y = d.frameElement
    for (; y && r && p !== d; ) {
      const g = qt(y),
        b = y.getBoundingClientRect(),
        w = getComputedStyle(y),
        x = b.left + (y.clientLeft + parseFloat(w.paddingLeft)) * g.x,
        R = b.top + (y.clientTop + parseFloat(w.paddingTop)) * g.y
      ;(c *= g.x), (l *= g.y), (u *= g.x), (f *= g.y), (c += x), (l += R), (y = tt(y).frameElement)
    }
  }
  return We({ width: u, height: f, x: c, y: l })
}
function Et(t) {
  return ((Di(t) ? t.ownerDocument : t.document) || window.document).documentElement
}
function fn(t) {
  return gt(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
}
function ki(t) {
  return ve(Et(t)).left + fn(t).scrollLeft
}
function Wt(t) {
  if (Ot(t) === 'html') return t
  const e = t.assignedSlot || t.parentNode || (rs(t) && t.host) || Et(t)
  return rs(e) ? e.host : e
}
function Mi(t) {
  const e = Wt(t)
  return un(e) ? (t.ownerDocument ? t.ownerDocument.body : t.body) : rt(e) && be(e) ? e : Mi(e)
}
function wr(t, e) {
  var n
  e === void 0 && (e = [])
  const r = Mi(t),
    s = r === ((n = t.ownerDocument) == null ? void 0 : n.body),
    i = tt(r)
  return s ? e.concat(i, i.visualViewport || [], be(r) ? r : []) : e.concat(r, wr(r))
}
function os(t, e, n) {
  let r
  if (e === 'viewport')
    r = (function (s, i) {
      const o = tt(s),
        a = Et(s),
        c = o.visualViewport
      let l = a.clientWidth,
        u = a.clientHeight,
        f = 0,
        d = 0
      if (c) {
        ;(l = c.width), (u = c.height)
        const p = vr()
        ;(!p || (p && i === 'fixed')) && ((f = c.offsetLeft), (d = c.offsetTop))
      }
      return { width: l, height: u, x: f, y: d }
    })(t, n)
  else if (e === 'document')
    r = (function (s) {
      const i = Et(s),
        o = fn(s),
        a = s.ownerDocument.body,
        c = ce(i.scrollWidth, i.clientWidth, a.scrollWidth, a.clientWidth),
        l = ce(i.scrollHeight, i.clientHeight, a.scrollHeight, a.clientHeight)
      let u = -o.scrollLeft + ki(s)
      const f = -o.scrollTop
      return (
        nt(a).direction === 'rtl' && (u += ce(i.clientWidth, a.clientWidth) - c), { width: c, height: l, x: u, y: f }
      )
    })(Et(t))
  else if (gt(e))
    r = (function (s, i) {
      const o = ve(s, !0, i === 'fixed'),
        a = o.top + s.clientTop,
        c = o.left + s.clientLeft,
        l = rt(s) ? qt(s) : Dt(1)
      return { width: s.clientWidth * l.x, height: s.clientHeight * l.y, x: c * l.x, y: a * l.y }
    })(e, n)
  else {
    const s = Ii(t)
    r = { ...e, x: e.x - s.x, y: e.y - s.y }
  }
  return We(r)
}
function ji(t, e) {
  const n = Wt(t)
  return !(n === e || !gt(n) || un(n)) && (nt(n).position === 'fixed' || ji(n, e))
}
function as(t, e) {
  return rt(t) && nt(t).position !== 'fixed' ? (e ? e(t) : t.offsetParent) : null
}
function cs(t, e) {
  const n = tt(t)
  if (!rt(t)) return n
  let r = as(t, e)
  for (; r && Nl(r) && nt(r).position === 'static'; ) r = as(r, e)
  return r && (Ot(r) === 'html' || (Ot(r) === 'body' && nt(r).position === 'static' && !Jn(r)))
    ? n
    : r ||
        (function (s) {
          let i = Wt(s)
          for (; rt(i) && !un(i); ) {
            if (Jn(i)) return i
            i = Wt(i)
          }
          return null
        })(t) ||
        n
}
function $l(t, e, n) {
  const r = rt(e),
    s = Et(e),
    i = n === 'fixed',
    o = ve(t, !0, i, e)
  let a = { scrollLeft: 0, scrollTop: 0 }
  const c = Dt(0)
  if (r || (!r && !i))
    if (((Ot(e) !== 'body' || be(s)) && (a = fn(e)), rt(e))) {
      const l = ve(e, !0, i, e)
      ;(c.x = l.x + e.clientLeft), (c.y = l.y + e.clientTop)
    } else s && (c.x = ki(s))
  return { x: o.left + a.scrollLeft - c.x, y: o.top + a.scrollTop - c.y, width: o.width, height: o.height }
}
const Il = {
    getClippingRect: function (t) {
      let { element: e, boundary: n, rootBoundary: r, strategy: s } = t
      const i =
          n === 'clippingAncestors'
            ? (function (l, u) {
                const f = u.get(l)
                if (f) return f
                let d = wr(l).filter((b) => gt(b) && Ot(b) !== 'body'),
                  p = null
                const y = nt(l).position === 'fixed'
                let g = y ? Wt(l) : l
                for (; gt(g) && !un(g); ) {
                  const b = nt(g),
                    w = Jn(g)
                  w || b.position !== 'fixed' || (p = null),
                    (
                      y
                        ? !w && !p
                        : (!w && b.position === 'static' && p && ['absolute', 'fixed'].includes(p.position)) ||
                          (be(g) && !w && ji(l, g))
                    )
                      ? (d = d.filter((x) => x !== g))
                      : (p = b),
                    (g = Wt(g))
                }
                return u.set(l, d), d
              })(e, this._c)
            : [].concat(n),
        o = [...i, r],
        a = o[0],
        c = o.reduce(
          (l, u) => {
            const f = os(e, u, s)
            return (
              (l.top = ce(f.top, l.top)),
              (l.right = ss(f.right, l.right)),
              (l.bottom = ss(f.bottom, l.bottom)),
              (l.left = ce(f.left, l.left)),
              l
            )
          },
          os(e, a, s),
        )
      return { width: c.right - c.left, height: c.bottom - c.top, x: c.left, y: c.top }
    },
    convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
      let { rect: e, offsetParent: n, strategy: r } = t
      const s = rt(n),
        i = Et(n)
      if (n === i) return e
      let o = { scrollLeft: 0, scrollTop: 0 },
        a = Dt(1)
      const c = Dt(0)
      if ((s || (!s && r !== 'fixed')) && ((Ot(n) !== 'body' || be(i)) && (o = fn(n)), rt(n))) {
        const l = ve(n)
        ;(a = qt(n)), (c.x = l.x + n.clientLeft), (c.y = l.y + n.clientTop)
      }
      return {
        width: e.width * a.x,
        height: e.height * a.y,
        x: e.x * a.x - o.scrollLeft * a.x + c.x,
        y: e.y * a.y - o.scrollTop * a.y + c.y,
      }
    },
    isElement: gt,
    getDimensions: function (t) {
      return Ni(t)
    },
    getOffsetParent: cs,
    getDocumentElement: Et,
    getScale: qt,
    async getElementRects(t) {
      let { reference: e, floating: n, strategy: r } = t
      const s = this.getOffsetParent || cs,
        i = this.getDimensions
      return { reference: $l(e, await s(n), r), floating: { x: 0, y: 0, ...(await i(n)) } }
    },
    getClientRects: (t) => Array.from(t.getClientRects()),
    isRTL: (t) => nt(t).direction === 'rtl',
  },
  kl = (t, e, n) => {
    const r = new Map(),
      s = { platform: Il, ...n },
      i = { ...s.platform, _c: r }
    return Sl(t, e, { ...s, platform: i })
  }
let Zn
const Ct = new Map(),
  Ml = (t) => t.getBoundingClientRect()
function ls(t, e) {
  const { scope: n = 'rect', getRect: r = Ml, onChange: s } = e,
    i = jl({ scope: n, getRect: r }),
    o = Ct.get(t)
  return (
    o
      ? (o.callbacks.push(s), s(r(t)))
      : (Ct.set(t, { rect: {}, callbacks: [s] }), Ct.size === 1 && (Zn = requestAnimationFrame(i))),
    function () {
      const c = Ct.get(t)
      if (!c) return
      const l = c.callbacks.indexOf(s)
      l > -1 && c.callbacks.splice(l, 1),
        c.callbacks.length === 0 && (Ct.delete(t), Ct.size === 0 && cancelAnimationFrame(Zn))
    }
  )
}
function jl(t) {
  const { scope: e, getRect: n } = t,
    r = Bl(e)
  return function s() {
    const i = []
    Ct.forEach((o, a) => {
      const c = n(a)
      r(o.rect, c) || ((o.rect = c), i.push(o))
    }),
      i.forEach((o) => {
        o.callbacks.forEach((a) => a(o.rect))
      }),
      (Zn = requestAnimationFrame(s))
  }
}
const _i = (t, e) => t.width === e.width && t.height === e.height,
  Bi = (t, e) => t.top === e.top && t.left === e.left,
  _l = (t, e) => _i(t, e) && Bi(t, e)
function Bl(t) {
  return t === 'size' ? _i : t === 'position' ? Bi : _l
}
const Tn =
    (...t) =>
    () =>
      t.forEach((e) => e()),
  us = (t) => typeof t == 'object' && t !== null && t.nodeType === 1,
  fs = (t, e, n, r) => (t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r))
function ql(t) {
  const e = typeof t == 'boolean'
  return {
    ancestorResize: e ? t : t.ancestorResize ?? !0,
    ancestorScroll: e ? t : t.ancestorScroll ?? !0,
    referenceResize: e ? t : t.referenceResize ?? !0,
  }
}
function Kl(t, e, n, r = !1) {
  const { ancestorScroll: s, ancestorResize: i, referenceResize: o } = ql(r),
    a = s || i,
    c = []
  a && us(t) && c.push(...wr(t))
  function l() {
    let f = [ls(e, { scope: 'size', onChange: n })]
    return (
      o && us(t) && f.push(ls(t, { onChange: n })),
      f.push(Tn(...c.map((d) => fs(d, 'resize', n)))),
      () => f.forEach((d) => d())
    )
  }
  function u() {
    return Tn(...c.map((f) => fs(f, 'scroll', n, { passive: !0 })))
  }
  return Tn(l(), u())
}
const ee = (t) => ({ variable: t, reference: `var(${t})` }),
  ut = {
    arrowSize: ee('--arrow-size'),
    arrowSizeHalf: ee('--arrow-size-half'),
    arrowBg: ee('--arrow-background'),
    transformOrigin: ee('--transform-origin'),
    arrowOffset: ee('--arrow-offset'),
  },
  Ul = (t) => ({
    top: 'bottom center',
    'top-start': t ? `${t.x}px bottom` : 'left bottom',
    'top-end': t ? `${t.x}px bottom` : 'right bottom',
    bottom: 'top center',
    'bottom-start': t ? `${t.x}px top` : 'top left',
    'bottom-end': t ? `${t.x}px top` : 'top right',
    left: 'right center',
    'left-start': t ? `right ${t.y}px` : 'right top',
    'left-end': t ? `right ${t.y}px` : 'right bottom',
    right: 'left center',
    'right-start': t ? `left ${t.y}px` : 'left top',
    'right-end': t ? `left ${t.y}px` : 'left bottom',
  }),
  Vl = {
    name: 'transformOrigin',
    fn({ placement: t, elements: e, middlewareData: n }) {
      const { arrow: r } = n,
        s = Ul(r)[t],
        { floating: i } = e
      return i.style.setProperty(ut.transformOrigin.variable, s), { data: { transformOrigin: s } }
    },
  },
  Ql = (t) => ({
    name: 'shiftArrow',
    fn({ placement: e, middlewareData: n }) {
      const { element: r } = t
      if (n.arrow) {
        const { x: s, y: i } = n.arrow,
          o = e.split('-')[0]
        Object.assign(r.style, {
          left: s != null ? `${s}px` : '',
          top: i != null ? `${i}px` : '',
          [o]: `calc(100% + ${ut.arrowOffset.reference})`,
        })
      }
      return {}
    },
  }),
  Wl = {
    strategy: 'absolute',
    placement: 'bottom',
    listeners: !0,
    gutter: 8,
    flip: !0,
    sameWidth: !1,
    overflowPadding: 8,
  }
function Hl(t, e, n = {}) {
  if (!e || !t) return
  const r = Object.assign({}, Wl, n),
    s = e.querySelector('[data-part=arrow]'),
    i = [],
    o = typeof r.boundary == 'function' ? r.boundary() : r.boundary
  if ((r.flip && i.push(Tl({ boundary: o, padding: r.overflowPadding })), r.gutter || r.offset)) {
    const c = s ? s.offsetHeight / 2 : 0,
      l = r.offset ? r.offset : { mainAxis: r.gutter }
    l?.mainAxis != null && (l.mainAxis += c), i.push(Rl(l))
  }
  i.push(Fl({ boundary: o, crossAxis: r.overlap, padding: r.overflowPadding })),
    s && i.push(xl({ element: s, padding: 8 }), Ql({ element: s })),
    i.push(Vl),
    i.push(
      Dl({
        padding: r.overflowPadding,
        apply({ rects: c, availableHeight: l, availableWidth: u }) {
          const f = Math.round(c.reference.width)
          e.style.setProperty('--reference-width', `${f}px`),
            e.style.setProperty('--available-width', `${u}px`),
            e.style.setProperty('--available-height', `${l}px`),
            r.sameWidth && Object.assign(e.style, { width: `${f}px`, minWidth: 'unset' }),
            r.fitViewport && Object.assign(e.style, { maxWidth: `${u}px`, maxHeight: `${l}px` })
        },
      }),
    )
  function a(c = {}) {
    if (!t || !e) return
    const { placement: l, strategy: u, onComplete: f } = r
    kl(t, e, { placement: l, middleware: i, strategy: u, ...c }).then((d) => {
      const p = Math.round(d.x),
        y = Math.round(d.y)
      Object.assign(e.style, {
        position: d.strategy,
        top: '0px',
        left: '0px',
        transform: `translate3d(${p}px, ${y}px, 0)`,
      }),
        f?.(d)
    })
  }
  return a(), Wn(r.listeners ? Kl(t, e, a, r.listeners) : void 0, r.onCleanup)
}
function ds(t, e, n = {}) {
  const { defer: r, ...s } = n,
    i = r ? vt : (a) => a(),
    o = []
  return (
    o.push(
      i(() => {
        const a = typeof t == 'function' ? t() : t,
          c = typeof e == 'function' ? e() : e
        o.push(Hl(a, c, s))
      }),
    ),
    () => {
      o.forEach((a) => a?.())
    }
  )
}
const zl = { bottom: 'rotate(45deg)', left: 'rotate(135deg)', top: 'rotate(225deg)', right: 'rotate(315deg)' }
function Gl(t) {
  const { placement: e = 'bottom' } = t
  return {
    arrow: {
      position: 'absolute',
      width: ut.arrowSize.reference,
      height: ut.arrowSize.reference,
      [ut.arrowSizeHalf.variable]: `calc(${ut.arrowSize.reference} / 2)`,
      [ut.arrowOffset.variable]: `calc(${ut.arrowSizeHalf.reference} * -1)`,
    },
    arrowTip: {
      transform: zl[e.split('-')[0]],
      background: ut.arrowBg.reference,
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 'inherit',
    },
    floating: { position: 'absolute', minWidth: 'max-content', top: '0px', left: '0px' },
  }
}
const ne = new WeakMap(),
  X = []
function Xl(t, e = {}) {
  const { rootEl: n } = e,
    r = t.filter(Boolean)
  if (r.length === 0) return
  const s = r[0].ownerDocument || document,
    i = s.defaultView ?? window,
    o = new Set(r),
    a = new Set(),
    c = n ?? s.body
  let l = (p) => {
      for (let w of p.querySelectorAll('[data-live-announcer], [data-zag-top-layer]')) o.add(w)
      let y = (w) => {
          if (o.has(w) || (a.has(w.parentElement) && w.parentElement.getAttribute('role') !== 'row'))
            return NodeFilter.FILTER_REJECT
          for (let x of o) if (w.contains(x)) return NodeFilter.FILTER_SKIP
          return NodeFilter.FILTER_ACCEPT
        },
        g = s.createTreeWalker(p, NodeFilter.SHOW_ELEMENT, { acceptNode: y }),
        b = y(p)
      if ((b === NodeFilter.FILTER_ACCEPT && u(p), b !== NodeFilter.FILTER_REJECT)) {
        let w = g.nextNode()
        for (; w != null; ) u(w), (w = g.nextNode())
      }
    },
    u = (p) => {
      let y = ne.get(p) ?? 0
      ;(p.getAttribute('aria-hidden') === 'true' && y === 0) ||
        (y === 0 && p.setAttribute('aria-hidden', 'true'), a.add(p), ne.set(p, y + 1))
    }
  X.length && X[X.length - 1].disconnect(), l(c)
  const f = new i.MutationObserver((p) => {
    for (let y of p)
      if (!(y.type !== 'childList' || y.addedNodes.length === 0) && ![...o, ...a].some((g) => g.contains(y.target))) {
        for (let g of y.removedNodes) g instanceof i.Element && (o.delete(g), a.delete(g))
        for (let g of y.addedNodes)
          (g instanceof i.HTMLElement || g instanceof i.SVGElement) &&
          (g.dataset.liveAnnouncer === 'true' || g.dataset.zagTopLayer === 'true')
            ? o.add(g)
            : g instanceof i.Element && l(g)
      }
  })
  f.observe(c, { childList: !0, subtree: !0 })
  let d = {
    observe() {
      f.observe(c, { childList: !0, subtree: !0 })
    },
    disconnect() {
      f.disconnect()
    },
  }
  return (
    X.push(d),
    () => {
      f.disconnect()
      for (let p of a) {
        let y = ne.get(p)
        y === 1 ? (p.removeAttribute('aria-hidden'), ne.delete(p)) : ne.set(p, y - 1)
      }
      d === X[X.length - 1] ? (X.pop(), X.length && X[X.length - 1].observe()) : X.splice(X.indexOf(d), 1)
    }
  )
}
function Yl(t, e = {}) {
  const { defer: n } = e,
    r = n ? vt : (i) => i(),
    s = []
  return (
    s.push(
      r(() => {
        const i = typeof t == 'function' ? t() : t
        s.push(Xl(i, e))
      }),
    ),
    () => {
      s.forEach((i) => i?.())
    }
  )
}
const Er = (t) => typeof t == 'object' && t !== null && t.nodeType === 1,
  qi = (t) => Er(t) && t.tagName === 'IFRAME'
function Jl(t) {
  return Er(t) ? t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0 : !1
}
function Zl(t) {
  return parseInt(t.getAttribute('tabindex') || '0', 10) < 0
}
const Sr =
    "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type",
  Ki = (t, e = !1) => {
    if (!t) return []
    const n = Array.from(t.querySelectorAll(Sr))
    ;(e == !0 || (e == 'if-empty' && n.length === 0)) && Er(t) && we(t) && n.unshift(t)
    const s = n.filter(we)
    return (
      s.forEach((i, o) => {
        if (qi(i) && i.contentDocument) {
          const a = i.contentDocument.body
          s.splice(o, 1, ...Ki(a))
        }
      }),
      s
    )
  }
function we(t) {
  return !t || t.closest('[inert]') ? !1 : t.matches(Sr) && Jl(t)
}
function Nt(t, e) {
  if (!t) return []
  const n = Array.from(t.querySelectorAll(Sr)),
    r = n.filter(hs)
  return (
    e && hs(t) && r.unshift(t),
    r.forEach((s, i) => {
      if (qi(s) && s.contentDocument) {
        const o = s.contentDocument.body,
          a = Nt(o)
        r.splice(i, 1, ...a)
      }
    }),
    !r.length && e ? n : r
  )
}
function hs(t) {
  return t != null && t.tabIndex > 0 ? !0 : we(t) && !Zl(t)
}
function tu(t, e) {
  const [n] = Nt(t, e)
  return n || null
}
function eu(t, e) {
  const n = Nt(t, e)
  return n[n.length - 1] || null
}
function nu(t, e) {
  const n = Nt(t, e),
    r = n[0] || null,
    s = n[n.length - 1] || null
  return [r, s]
}
function ru(t, e) {
  const n = Nt(t),
    r = t?.ownerDocument || document,
    s = e ?? r.activeElement
  if (!s) return null
  const i = n.indexOf(s)
  return n[i + 1] || null
}
function su(t, e = {}) {
  const { triggerElement: n, onFocus: r } = e,
    s = t?.ownerDocument || document,
    i = s.body
  function o(a) {
    if (a.key !== 'Tab') return
    let c = null
    const [l, u] = nu(t, !0),
      f = !l && !u
    a.shiftKey && (s.activeElement === l || f)
      ? (c = n)
      : !a.shiftKey && s.activeElement === n
      ? (c = l)
      : !a.shiftKey && (s.activeElement === u || f) && (c = ru(i, n)),
      c && (a.preventDefault(), r?.(c) ?? c.focus())
  }
  return (
    s?.addEventListener('keydown', o, !0),
    () => {
      s?.removeEventListener('keydown', o, !0)
    }
  )
}
function iu(t, e) {
  const { defer: n, triggerElement: r, ...s } = e,
    i = n ? vt : (a) => a(),
    o = []
  return (
    o.push(
      i(() => {
        const a = typeof t == 'function' ? t() : t,
          c = typeof r == 'function' ? r() : r
        o.push(su(a, { triggerElement: c, ...s }))
      }),
    ),
    () => {
      o.forEach((a) => a?.())
    }
  )
}
function ou(t) {
  const e = {
    each(n) {
      for (let r = 0; r < t.frames?.length; r += 1) {
        const s = t.frames[r]
        s && n(s)
      }
    },
    addEventListener(n, r, s) {
      return (
        e.each((i) => {
          try {
            i.document.addEventListener(n, r, s)
          } catch (o) {
            console.warn(o)
          }
        }),
        () => {
          try {
            e.removeEventListener(n, r, s)
          } catch (i) {
            console.warn(i)
          }
        }
      )
    },
    removeEventListener(n, r, s) {
      e.each((i) => {
        try {
          i.document.removeEventListener(n, r, s)
        } catch (o) {
          console.warn(o)
        }
      })
    },
  }
  return e
}
const ps = 'pointerdown.outside',
  gs = 'focus.outside'
function au(t) {
  const e = t.composedPath() ?? [t.target]
  for (const n of e) if (Ke(n) && we(n)) return !0
  return !1
}
function cu(t, e) {
  const { exclude: n, onFocusOutside: r, onPointerDownOutside: s, onInteractOutside: i } = e
  if (!t) return
  const o = pr(t),
    a = Xc(t),
    c = ou(a)
  function l(g) {
    const b = Ve(g)
    return !Ke(b) || Ue(t, b) ? !1 : !n?.(b)
  }
  let u
  function f(g) {
    function b() {
      if (!(!t || !l(g))) {
        if (s || i) {
          const w = Wn(s, i)
          t.addEventListener(ps, w, { once: !0 })
        }
        Hr(t, ps, { bubbles: !1, cancelable: !0, detail: { originalEvent: g, contextmenu: Vc(g), focusable: au(g) } })
      }
    }
    g.pointerType === 'touch'
      ? (c.removeEventListener('click', b),
        o.removeEventListener('click', b),
        (u = b),
        o.addEventListener('click', b, { once: !0 }),
        c.addEventListener('click', b, { once: !0 }))
      : b()
  }
  const d = new Set(),
    p = setTimeout(() => {
      d.add(c.addEventListener('pointerdown', f, !0)), d.add(Qn(o, 'pointerdown', f, !0))
    }, 0)
  function y(g) {
    if (!(!t || !l(g))) {
      if (r || i) {
        const b = Wn(r, i)
        t.addEventListener(gs, b, { once: !0 })
      }
      Hr(t, gs, { bubbles: !1, cancelable: !0, detail: { originalEvent: g, contextmenu: !1, focusable: we(Ve(g)) } })
    }
  }
  return (
    d.add(Qn(o, 'focusin', y, !0)),
    d.add(c.addEventListener('focusin', y, !0)),
    () => {
      clearTimeout(p),
        u && (c.removeEventListener('click', u), o.removeEventListener('click', u)),
        d.forEach((g) => g())
    }
  )
}
function lu(t, e) {
  const { defer: n } = e,
    r = n ? vt : (i) => i(),
    s = []
  return (
    s.push(
      r(() => {
        const i = typeof t == 'function' ? t() : t
        s.push(cu(i, e))
      }),
    ),
    () => {
      s.forEach((i) => i?.())
    }
  )
}
function uu(t, e) {
  const n = (r) => {
    r.key === 'Escape' && e?.(r)
  }
  return Qn(pr(t), 'keydown', n)
}
const et = {
  layers: [],
  branches: [],
  count() {
    return this.layers.length
  },
  pointerBlockingLayers() {
    return this.layers.filter((t) => t.pointerBlocking)
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0]
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0
  },
  isBelowPointerBlockingLayer(t) {
    const e = this.indexOf(t),
      n = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1
    return e < n
  },
  isTopMost(t) {
    return this.layers[this.count() - 1]?.node === t
  },
  getNestedLayers(t) {
    return Array.from(this.layers).slice(this.indexOf(t) + 1)
  },
  isInNestedLayer(t, e) {
    return this.getNestedLayers(t).some((n) => Ue(n.node, e))
  },
  isInBranch(t) {
    return Array.from(this.branches).some((e) => Ue(e, t))
  },
  add(t) {
    this.layers.push(t)
  },
  addBranch(t) {
    this.branches.push(t)
  },
  remove(t) {
    const e = this.indexOf(t)
    e < 0 || (e < this.count() - 1 && this.getNestedLayers(t).forEach((r) => r.dismiss()), this.layers.splice(e, 1))
  },
  removeBranch(t) {
    const e = this.branches.indexOf(t)
    e >= 0 && this.branches.splice(e, 1)
  },
  indexOf(t) {
    return this.layers.findIndex((e) => e.node === t)
  },
  dismiss(t) {
    this.layers[this.indexOf(t)]?.dismiss()
  },
  clear() {
    this.remove(this.layers[0].node)
  },
}
let ys
function ms() {
  et.layers.forEach(({ node: t }) => {
    t.style.pointerEvents = et.isBelowPointerBlockingLayer(t) ? 'none' : 'auto'
  })
}
function fu(t) {
  t.style.pointerEvents = ''
}
const Rn = 'data-inert'
function du(t) {
  const e = pr(t)
  return (
    et.hasPointerBlockingLayer() &&
      !e.body.hasAttribute(Rn) &&
      ((ys = document.body.style.pointerEvents), (e.body.style.pointerEvents = 'none'), e.body.setAttribute(Rn, '')),
    () => {
      et.hasPointerBlockingLayer() ||
        ((e.body.style.pointerEvents = ys),
        e.body.removeAttribute(Rn),
        e.body.style.length === 0 && e.body.removeAttribute('style'))
    }
  )
}
function hu(t, e) {
  if (!t) {
    sl('[@zag-js/dismissable] node is `null` or `undefined`')
    return
  }
  const { onDismiss: n, pointerBlocking: r, exclude: s, debug: i } = e,
    o = { dismiss: n, node: t, pointerBlocking: r }
  et.add(o), ms()
  function a(d) {
    const p = Ve(d.detail.originalEvent)
    et.isBelowPointerBlockingLayer(t) ||
      et.isInBranch(p) ||
      (e.onPointerDownOutside?.(d),
      e.onInteractOutside?.(d),
      !d.defaultPrevented && (i && console.log('onPointerDownOutside:', d.detail.originalEvent), n?.()))
  }
  function c(d) {
    const p = Ve(d.detail.originalEvent)
    et.isInBranch(p) ||
      (e.onFocusOutside?.(d),
      e.onInteractOutside?.(d),
      !d.defaultPrevented && (i && console.log('onFocusOutside:', d.detail.originalEvent), n?.()))
  }
  function l(d) {
    et.isTopMost(t) && (e.onEscapeKeyDown?.(d), !d.defaultPrevented && n && (d.preventDefault(), n()))
  }
  function u(d) {
    if (!t) return !1
    const p = typeof s == 'function' ? s() : s
    return (Array.isArray(p) ? p : [p]).some((g) => Ue(g, d)) || et.isInNestedLayer(t, d)
  }
  const f = [r ? du(t) : void 0, uu(t, l), lu(t, { exclude: u, onFocusOutside: c, onPointerDownOutside: a })]
  return () => {
    et.remove(t), ms(), fu(t), f.forEach((d) => d?.())
  }
}
function pu(t, e) {
  const { defer: n } = e,
    r = n ? vt : (i) => i(),
    s = []
  return (
    s.push(
      r(() => {
        const i = typeof t == 'function' ? t() : t
        s.push(hu(i, e))
      }),
    ),
    () => {
      s.forEach((i) => i?.())
    }
  )
}
const Ln = 'data-zag-scroll-lock'
function bs(t, e) {
  if (!t) return
  const n = t.style.cssText
  return (
    Object.assign(t.style, e),
    () => {
      t.style.cssText = n
    }
  )
}
function gu(t, e, n) {
  if (!t) return
  const r = t.style.getPropertyValue(e)
  return (
    t.style.setProperty(e, n),
    () => {
      r ? t.style.setProperty(e, r) : t.style.removeProperty(e)
    }
  )
}
function yu(t) {
  const e = t.getBoundingClientRect().left
  return Math.round(e) + t.scrollLeft ? 'paddingLeft' : 'paddingRight'
}
function mu(t) {
  const e = t ?? document,
    n = e.defaultView ?? window,
    { documentElement: r, body: s } = e
  if (s.hasAttribute(Ln)) return
  s.setAttribute(Ln, '')
  const o = n.innerWidth - r.clientWidth,
    a = () => gu(r, '--scrollbar-width', `${o}px`),
    c = yu(r),
    l = () => bs(s, { overflow: 'hidden', [c]: `${o}px` }),
    u = () => {
      const { scrollX: d, scrollY: p, visualViewport: y } = n,
        g = y?.offsetLeft ?? 0,
        b = y?.offsetTop ?? 0,
        w = bs(s, {
          position: 'fixed',
          overflow: 'hidden',
          top: `${-(p - Math.floor(b))}px`,
          left: `${-(d - Math.floor(g))}px`,
          right: '0',
          [c]: `${o}px`,
        })
      return () => {
        w?.(), n.scrollTo(d, p)
      }
    },
    f = [a(), el() ? u() : l()]
  return () => {
    f.forEach((d) => d?.()), s.removeAttribute(Ln)
  }
}
/*!
 * tabbable 6.2.0
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var Ui = [
    'input:not([inert])',
    'select:not([inert])',
    'textarea:not([inert])',
    'a[href]:not([inert])',
    'button:not([inert])',
    '[tabindex]:not(slot):not([inert])',
    'audio[controls]:not([inert])',
    'video[controls]:not([inert])',
    '[contenteditable]:not([contenteditable="false"]):not([inert])',
    'details>summary:first-of-type:not([inert])',
    'details:not([inert])',
  ],
  Ge = Ui.join(','),
  Vi = typeof Element > 'u',
  $t = Vi
    ? function () {}
    : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
  Xe =
    !Vi && Element.prototype.getRootNode
      ? function (t) {
          var e
          return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t)
        }
      : function (t) {
          return t?.ownerDocument
        },
  Ye = function t(e, n) {
    var r
    n === void 0 && (n = !0)
    var s = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, 'inert'),
      i = s === '' || s === 'true',
      o = i || (n && e && t(e.parentNode))
    return o
  },
  bu = function (e) {
    var n,
      r = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, 'contenteditable')
    return r === '' || r === 'true'
  },
  Qi = function (e, n, r) {
    if (Ye(e)) return []
    var s = Array.prototype.slice.apply(e.querySelectorAll(Ge))
    return n && $t.call(e, Ge) && s.unshift(e), (s = s.filter(r)), s
  },
  Wi = function t(e, n, r) {
    for (var s = [], i = Array.from(e); i.length; ) {
      var o = i.shift()
      if (!Ye(o, !1))
        if (o.tagName === 'SLOT') {
          var a = o.assignedElements(),
            c = a.length ? a : o.children,
            l = t(c, !0, r)
          r.flatten ? s.push.apply(s, l) : s.push({ scopeParent: o, candidates: l })
        } else {
          var u = $t.call(o, Ge)
          u && r.filter(o) && (n || !e.includes(o)) && s.push(o)
          var f = o.shadowRoot || (typeof r.getShadowRoot == 'function' && r.getShadowRoot(o)),
            d = !Ye(f, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o))
          if (f && d) {
            var p = t(f === !0 ? o.children : f.children, !0, r)
            r.flatten ? s.push.apply(s, p) : s.push({ scopeParent: o, candidates: p })
          } else i.unshift.apply(i, o.children)
        }
    }
    return s
  },
  Hi = function (e) {
    return !isNaN(parseInt(e.getAttribute('tabindex'), 10))
  },
  Rt = function (e) {
    if (!e) throw new Error('No node provided')
    return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || bu(e)) && !Hi(e) ? 0 : e.tabIndex
  },
  vu = function (e, n) {
    var r = Rt(e)
    return r < 0 && n && !Hi(e) ? 0 : r
  },
  wu = function (e, n) {
    return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex
  },
  zi = function (e) {
    return e.tagName === 'INPUT'
  },
  Eu = function (e) {
    return zi(e) && e.type === 'hidden'
  },
  Su = function (e) {
    var n =
      e.tagName === 'DETAILS' &&
      Array.prototype.slice.apply(e.children).some(function (r) {
        return r.tagName === 'SUMMARY'
      })
    return n
  },
  xu = function (e, n) {
    for (var r = 0; r < e.length; r++) if (e[r].checked && e[r].form === n) return e[r]
  },
  Ou = function (e) {
    if (!e.name) return !0
    var n = e.form || Xe(e),
      r = function (a) {
        return n.querySelectorAll('input[type="radio"][name="' + a + '"]')
      },
      s
    if (typeof window < 'u' && typeof window.CSS < 'u' && typeof window.CSS.escape == 'function')
      s = r(window.CSS.escape(e.name))
    else
      try {
        s = r(e.name)
      } catch (o) {
        return (
          console.error(
            'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
            o.message,
          ),
          !1
        )
      }
    var i = xu(s, e.form)
    return !i || i === e
  },
  Pu = function (e) {
    return zi(e) && e.type === 'radio'
  },
  Au = function (e) {
    return Pu(e) && !Ou(e)
  },
  Cu = function (e) {
    var n,
      r = e && Xe(e),
      s = (n = r) === null || n === void 0 ? void 0 : n.host,
      i = !1
    if (r && r !== e) {
      var o, a, c
      for (
        i = !!(
          ((o = s) !== null && o !== void 0 && (a = o.ownerDocument) !== null && a !== void 0 && a.contains(s)) ||
          (e != null && (c = e.ownerDocument) !== null && c !== void 0 && c.contains(e))
        );
        !i && s;

      ) {
        var l, u, f
        ;(r = Xe(s)),
          (s = (l = r) === null || l === void 0 ? void 0 : l.host),
          (i = !!((u = s) !== null && u !== void 0 && (f = u.ownerDocument) !== null && f !== void 0 && f.contains(s)))
      }
    }
    return i
  },
  vs = function (e) {
    var n = e.getBoundingClientRect(),
      r = n.width,
      s = n.height
    return r === 0 && s === 0
  },
  Tu = function (e, n) {
    var r = n.displayCheck,
      s = n.getShadowRoot
    if (getComputedStyle(e).visibility === 'hidden') return !0
    var i = $t.call(e, 'details>summary:first-of-type'),
      o = i ? e.parentElement : e
    if ($t.call(o, 'details:not([open]) *')) return !0
    if (!r || r === 'full' || r === 'legacy-full') {
      if (typeof s == 'function') {
        for (var a = e; e; ) {
          var c = e.parentElement,
            l = Xe(e)
          if (c && !c.shadowRoot && s(c) === !0) return vs(e)
          e.assignedSlot ? (e = e.assignedSlot) : !c && l !== e.ownerDocument ? (e = l.host) : (e = c)
        }
        e = a
      }
      if (Cu(e)) return !e.getClientRects().length
      if (r !== 'legacy-full') return !0
    } else if (r === 'non-zero-area') return vs(e)
    return !1
  },
  Ru = function (e) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
      for (var n = e.parentElement; n; ) {
        if (n.tagName === 'FIELDSET' && n.disabled) {
          for (var r = 0; r < n.children.length; r++) {
            var s = n.children.item(r)
            if (s.tagName === 'LEGEND') return $t.call(n, 'fieldset[disabled] *') ? !0 : !s.contains(e)
          }
          return !0
        }
        n = n.parentElement
      }
    return !1
  },
  Je = function (e, n) {
    return !(n.disabled || Ye(n) || Eu(n) || Tu(n, e) || Su(n) || Ru(n))
  },
  tr = function (e, n) {
    return !(Au(n) || Rt(n) < 0 || !Je(e, n))
  },
  Lu = function (e) {
    var n = parseInt(e.getAttribute('tabindex'), 10)
    return !!(isNaN(n) || n >= 0)
  },
  Fu = function t(e) {
    var n = [],
      r = []
    return (
      e.forEach(function (s, i) {
        var o = !!s.scopeParent,
          a = o ? s.scopeParent : s,
          c = vu(a, o),
          l = o ? t(s.candidates) : a
        c === 0
          ? o
            ? n.push.apply(n, l)
            : n.push(a)
          : r.push({ documentOrder: i, tabIndex: c, item: s, isScope: o, content: l })
      }),
      r
        .sort(wu)
        .reduce(function (s, i) {
          return i.isScope ? s.push.apply(s, i.content) : s.push(i.content), s
        }, [])
        .concat(n)
    )
  },
  Du = function (e, n) {
    n = n || {}
    var r
    return (
      n.getShadowRoot
        ? (r = Wi([e], n.includeContainer, {
            filter: tr.bind(null, n),
            flatten: !1,
            getShadowRoot: n.getShadowRoot,
            shadowRootFilter: Lu,
          }))
        : (r = Qi(e, n.includeContainer, tr.bind(null, n))),
      Fu(r)
    )
  },
  Nu = function (e, n) {
    n = n || {}
    var r
    return (
      n.getShadowRoot
        ? (r = Wi([e], n.includeContainer, { filter: Je.bind(null, n), flatten: !0, getShadowRoot: n.getShadowRoot }))
        : (r = Qi(e, n.includeContainer, Je.bind(null, n))),
      r
    )
  },
  Mt = function (e, n) {
    if (((n = n || {}), !e)) throw new Error('No node provided')
    return $t.call(e, Ge) === !1 ? !1 : tr(n, e)
  },
  $u = Ui.concat('iframe').join(','),
  Fn = function (e, n) {
    if (((n = n || {}), !e)) throw new Error('No node provided')
    return $t.call(e, $u) === !1 ? !1 : Je(n, e)
  }
/*!
 * focus-trap 7.5.1
 * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
 */ function ws(t, e) {
  var n = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t)
    e &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function Es(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {}
    e % 2
      ? ws(Object(n), !0).forEach(function (r) {
          Iu(t, r, n[r])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
      : ws(Object(n)).forEach(function (r) {
          Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r))
        })
  }
  return t
}
function Iu(t, e, n) {
  return (
    (e = Mu(e)),
    e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n),
    t
  )
}
function ku(t, e) {
  if (typeof t != 'object' || t === null) return t
  var n = t[Symbol.toPrimitive]
  if (n !== void 0) {
    var r = n.call(t, e || 'default')
    if (typeof r != 'object') return r
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (e === 'string' ? String : Number)(t)
}
function Mu(t) {
  var e = ku(t, 'string')
  return typeof e == 'symbol' ? e : String(e)
}
var Ss = {
    activateTrap: function (e, n) {
      if (e.length > 0) {
        var r = e[e.length - 1]
        r !== n && r.pause()
      }
      var s = e.indexOf(n)
      s === -1 || e.splice(s, 1), e.push(n)
    },
    deactivateTrap: function (e, n) {
      var r = e.indexOf(n)
      r !== -1 && e.splice(r, 1), e.length > 0 && e[e.length - 1].unpause()
    },
  },
  ju = function (e) {
    return e.tagName && e.tagName.toLowerCase() === 'input' && typeof e.select == 'function'
  },
  _u = function (e) {
    return e?.key === 'Escape' || e?.key === 'Esc' || e?.keyCode === 27
  },
  le = function (e) {
    return e?.key === 'Tab' || e?.keyCode === 9
  },
  Bu = function (e) {
    return le(e) && !e.shiftKey
  },
  qu = function (e) {
    return le(e) && e.shiftKey
  },
  xs = function (e) {
    return setTimeout(e, 0)
  },
  Os = function (e, n) {
    var r = -1
    return (
      e.every(function (s, i) {
        return n(s) ? ((r = i), !1) : !0
      }),
      r
    )
  },
  re = function (e) {
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s]
    return typeof e == 'function' ? e.apply(void 0, r) : e
  },
  Re = function (e) {
    return e.target.shadowRoot && typeof e.composedPath == 'function' ? e.composedPath()[0] : e.target
  },
  Ku = [],
  Uu = function (e, n) {
    var r = n?.document || document,
      s = n?.trapStack || Ku,
      i = Es(
        {
          returnFocusOnDeactivate: !0,
          escapeDeactivates: !0,
          delayInitialFocus: !0,
          isKeyForward: Bu,
          isKeyBackward: qu,
        },
        n,
      ),
      o = {
        containers: [],
        containerGroups: [],
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: !1,
        paused: !1,
        delayInitialFocusTimer: void 0,
        recentNavEvent: void 0,
      },
      a,
      c = function (h, m, E) {
        return h && h[m] !== void 0 ? h[m] : i[E || m]
      },
      l = function (h, m) {
        var E = typeof m?.composedPath == 'function' ? m.composedPath() : void 0
        return o.containerGroups.findIndex(function (A) {
          var O = A.container,
            T = A.tabbableNodes
          return (
            O.contains(h) ||
            E?.includes(O) ||
            T.find(function ($) {
              return $ === h
            })
          )
        })
      },
      u = function (h) {
        var m = i[h]
        if (typeof m == 'function') {
          for (var E = arguments.length, A = new Array(E > 1 ? E - 1 : 0), O = 1; O < E; O++) A[O - 1] = arguments[O]
          m = m.apply(void 0, A)
        }
        if ((m === !0 && (m = void 0), !m)) {
          if (m === void 0 || m === !1) return m
          throw new Error('`'.concat(h, '` was specified but was not a node, or did not return a node'))
        }
        var T = m
        if (typeof m == 'string' && ((T = r.querySelector(m)), !T))
          throw new Error('`'.concat(h, '` as selector refers to no known node'))
        return T
      },
      f = function () {
        var h = u('initialFocus')
        if (h === !1) return !1
        if (h === void 0 || !Fn(h, i.tabbableOptions))
          if (l(r.activeElement) >= 0) h = r.activeElement
          else {
            var m = o.tabbableGroups[0],
              E = m && m.firstTabbableNode
            h = E || u('fallbackFocus')
          }
        if (!h) throw new Error('Your focus-trap needs to have at least one focusable element')
        return h
      },
      d = function () {
        if (
          ((o.containerGroups = o.containers.map(function (h) {
            var m = Du(h, i.tabbableOptions),
              E = Nu(h, i.tabbableOptions),
              A = m.length > 0 ? m[0] : void 0,
              O = m.length > 0 ? m[m.length - 1] : void 0,
              T = E.find(function (q) {
                return Mt(q)
              }),
              $ = E.findLast(function (q) {
                return Mt(q)
              }),
              _ = !!m.find(function (q) {
                return Rt(q) > 0
              })
            return {
              container: h,
              tabbableNodes: m,
              focusableNodes: E,
              posTabIndexesFound: _,
              firstTabbableNode: A,
              lastTabbableNode: O,
              firstDomTabbableNode: T,
              lastDomTabbableNode: $,
              nextTabbableNode: function (st) {
                var mt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
                  it = m.indexOf(st)
                return it < 0
                  ? mt
                    ? E.slice(E.indexOf(st) + 1).find(function (Pt) {
                        return Mt(Pt)
                      })
                    : E.slice(0, E.indexOf(st)).findLast(function (Pt) {
                        return Mt(Pt)
                      })
                  : m[it + (mt ? 1 : -1)]
              },
            }
          })),
          (o.tabbableGroups = o.containerGroups.filter(function (h) {
            return h.tabbableNodes.length > 0
          })),
          o.tabbableGroups.length <= 0 && !u('fallbackFocus'))
        )
          throw new Error(
            'Your focus-trap must have at least one container with at least one tabbable node in it at all times',
          )
        if (
          o.containerGroups.find(function (h) {
            return h.posTabIndexesFound
          }) &&
          o.containerGroups.length > 1
        )
          throw new Error(
            "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.",
          )
      },
      p = function v(h) {
        if (h !== !1 && h !== r.activeElement) {
          if (!h || !h.focus) {
            v(f())
            return
          }
          h.focus({ preventScroll: !!i.preventScroll }), (o.mostRecentlyFocusedNode = h), ju(h) && h.select()
        }
      },
      y = function (h) {
        var m = u('setReturnFocus', h)
        return m || (m === !1 ? !1 : h)
      },
      g = function (h) {
        var m = h.target,
          E = h.event,
          A = h.isBackward,
          O = A === void 0 ? !1 : A
        ;(m = m || Re(E)), d()
        var T = null
        if (o.tabbableGroups.length > 0) {
          var $ = l(m, E),
            _ = $ >= 0 ? o.containerGroups[$] : void 0
          if ($ < 0)
            O
              ? (T = o.tabbableGroups[o.tabbableGroups.length - 1].lastTabbableNode)
              : (T = o.tabbableGroups[0].firstTabbableNode)
          else if (O) {
            var q = Os(o.tabbableGroups, function (dn) {
              var hn = dn.firstTabbableNode
              return m === hn
            })
            if (
              (q < 0 &&
                (_.container === m ||
                  (Fn(m, i.tabbableOptions) && !Mt(m, i.tabbableOptions) && !_.nextTabbableNode(m, !1))) &&
                (q = $),
              q >= 0)
            ) {
              var st = q === 0 ? o.tabbableGroups.length - 1 : q - 1,
                mt = o.tabbableGroups[st]
              T = Rt(m) >= 0 ? mt.lastTabbableNode : mt.lastDomTabbableNode
            } else le(E) || (T = _.nextTabbableNode(m, !1))
          } else {
            var it = Os(o.tabbableGroups, function (dn) {
              var hn = dn.lastTabbableNode
              return m === hn
            })
            if (
              (it < 0 &&
                (_.container === m ||
                  (Fn(m, i.tabbableOptions) && !Mt(m, i.tabbableOptions) && !_.nextTabbableNode(m))) &&
                (it = $),
              it >= 0)
            ) {
              var Pt = it === o.tabbableGroups.length - 1 ? 0 : it + 1,
                Or = o.tabbableGroups[Pt]
              T = Rt(m) >= 0 ? Or.firstTabbableNode : Or.firstDomTabbableNode
            } else le(E) || (T = _.nextTabbableNode(m))
          }
        } else T = u('fallbackFocus')
        return T
      },
      b = function (h) {
        var m = Re(h)
        if (!(l(m, h) >= 0)) {
          if (re(i.clickOutsideDeactivates, h)) {
            a.deactivate({ returnFocus: i.returnFocusOnDeactivate })
            return
          }
          re(i.allowOutsideClick, h) || h.preventDefault()
        }
      },
      w = function (h) {
        var m = Re(h),
          E = l(m, h) >= 0
        if (E || m instanceof Document) E && (o.mostRecentlyFocusedNode = m)
        else {
          h.stopImmediatePropagation()
          var A,
            O = !0
          if (o.mostRecentlyFocusedNode)
            if (Rt(o.mostRecentlyFocusedNode) > 0) {
              var T = l(o.mostRecentlyFocusedNode),
                $ = o.containerGroups[T].tabbableNodes
              if ($.length > 0) {
                var _ = $.findIndex(function (q) {
                  return q === o.mostRecentlyFocusedNode
                })
                _ >= 0 &&
                  (i.isKeyForward(o.recentNavEvent)
                    ? _ + 1 < $.length && ((A = $[_ + 1]), (O = !1))
                    : _ - 1 >= 0 && ((A = $[_ - 1]), (O = !1)))
              }
            } else
              o.containerGroups.some(function (q) {
                return q.tabbableNodes.some(function (st) {
                  return Rt(st) > 0
                })
              }) || (O = !1)
          else O = !1
          O && (A = g({ target: o.mostRecentlyFocusedNode, isBackward: i.isKeyBackward(o.recentNavEvent) })),
            p(A || o.mostRecentlyFocusedNode || f())
        }
        o.recentNavEvent = void 0
      },
      x = function (h) {
        var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
        o.recentNavEvent = h
        var E = g({ event: h, isBackward: m })
        E && (le(h) && h.preventDefault(), p(E))
      },
      R = function (h) {
        if (_u(h) && re(i.escapeDeactivates, h) !== !1) {
          h.preventDefault(), a.deactivate()
          return
        }
        ;(i.isKeyForward(h) || i.isKeyBackward(h)) && x(h, i.isKeyBackward(h))
      },
      N = function (h) {
        var m = Re(h)
        l(m, h) >= 0 ||
          re(i.clickOutsideDeactivates, h) ||
          re(i.allowOutsideClick, h) ||
          (h.preventDefault(), h.stopImmediatePropagation())
      },
      D = function () {
        if (o.active)
          return (
            Ss.activateTrap(s, a),
            (o.delayInitialFocusTimer = i.delayInitialFocus
              ? xs(function () {
                  p(f())
                })
              : p(f())),
            r.addEventListener('focusin', w, !0),
            r.addEventListener('mousedown', b, { capture: !0, passive: !1 }),
            r.addEventListener('touchstart', b, { capture: !0, passive: !1 }),
            r.addEventListener('click', N, { capture: !0, passive: !1 }),
            r.addEventListener('keydown', R, { capture: !0, passive: !1 }),
            a
          )
      },
      L = function () {
        if (o.active)
          return (
            r.removeEventListener('focusin', w, !0),
            r.removeEventListener('mousedown', b, !0),
            r.removeEventListener('touchstart', b, !0),
            r.removeEventListener('click', N, !0),
            r.removeEventListener('keydown', R, !0),
            a
          )
      },
      M = function (h) {
        var m = h.some(function (E) {
          var A = Array.from(E.removedNodes)
          return A.some(function (O) {
            return O === o.mostRecentlyFocusedNode
          })
        })
        m && p(f())
      },
      F = typeof window < 'u' && 'MutationObserver' in window ? new MutationObserver(M) : void 0,
      S = function () {
        F &&
          (F.disconnect(),
          o.active &&
            !o.paused &&
            o.containers.map(function (h) {
              F.observe(h, { subtree: !0, childList: !0 })
            }))
      }
    return (
      (a = {
        get active() {
          return o.active
        },
        get paused() {
          return o.paused
        },
        activate: function (h) {
          if (o.active) return this
          var m = c(h, 'onActivate'),
            E = c(h, 'onPostActivate'),
            A = c(h, 'checkCanFocusTrap')
          A || d(), (o.active = !0), (o.paused = !1), (o.nodeFocusedBeforeActivation = r.activeElement), m?.()
          var O = function () {
            A && d(), D(), S(), E?.()
          }
          return A ? (A(o.containers.concat()).then(O, O), this) : (O(), this)
        },
        deactivate: function (h) {
          if (!o.active) return this
          var m = Es(
            {
              onDeactivate: i.onDeactivate,
              onPostDeactivate: i.onPostDeactivate,
              checkCanReturnFocus: i.checkCanReturnFocus,
            },
            h,
          )
          clearTimeout(o.delayInitialFocusTimer),
            (o.delayInitialFocusTimer = void 0),
            L(),
            (o.active = !1),
            (o.paused = !1),
            S(),
            Ss.deactivateTrap(s, a)
          var E = c(m, 'onDeactivate'),
            A = c(m, 'onPostDeactivate'),
            O = c(m, 'checkCanReturnFocus'),
            T = c(m, 'returnFocus', 'returnFocusOnDeactivate')
          E?.()
          var $ = function () {
            xs(function () {
              T && p(y(o.nodeFocusedBeforeActivation)), A?.()
            })
          }
          return T && O ? (O(y(o.nodeFocusedBeforeActivation)).then($, $), this) : ($(), this)
        },
        pause: function (h) {
          if (o.paused || !o.active) return this
          var m = c(h, 'onPause'),
            E = c(h, 'onPostPause')
          return (o.paused = !0), m?.(), L(), S(), E?.(), this
        },
        unpause: function (h) {
          if (!o.paused || !o.active) return this
          var m = c(h, 'onUnpause'),
            E = c(h, 'onPostUnpause')
          return (o.paused = !1), m?.(), d(), D(), S(), E?.(), this
        },
        updateContainerElements: function (h) {
          var m = [].concat(h).filter(Boolean)
          return (
            (o.containers = m.map(function (E) {
              return typeof E == 'string' ? r.querySelector(E) : E
            })),
            o.active && d(),
            S(),
            this
          )
        },
      }),
      a.updateContainerElements(e),
      a
    )
  }
const [Vu, xr] = xi({ hookName: 'usePopoverContext', providerName: '<PopoverProvider />' }),
  Qu = Ne('popover').parts(
    'arrow',
    'arrowTip',
    'anchor',
    'trigger',
    'positioner',
    'content',
    'title',
    'description',
    'closeTrigger',
  ),
  ct = Qu.build(),
  C = zc({
    getActiveEl: (t) => C.getDoc(t).activeElement,
    getAnchorId: (t) => t.ids?.anchor ?? `popover:${t.id}:anchor`,
    getTriggerId: (t) => t.ids?.trigger ?? `popover:${t.id}:trigger`,
    getContentId: (t) => t.ids?.content ?? `popover:${t.id}:content`,
    getPositionerId: (t) => t.ids?.positioner ?? `popover:${t.id}:popper`,
    getArrowId: (t) => t.ids?.arrow ?? `popover:${t.id}:arrow`,
    getTitleId: (t) => t.ids?.title ?? `popover:${t.id}:title`,
    getDescriptionId: (t) => t.ids?.description ?? `popover:${t.id}:desc`,
    getCloseTriggerId: (t) => t.ids?.closeTrigger ?? `popover:${t.id}:close`,
    getAnchorEl: (t) => C.getById(t, C.getAnchorId(t)),
    getTriggerEl: (t) => C.getById(t, C.getTriggerId(t)),
    getContentEl: (t) => C.getById(t, C.getContentId(t)),
    getPositionerEl: (t) => C.getById(t, C.getPositionerId(t)),
    getTitleEl: (t) => C.getById(t, C.getTitleId(t)),
    getDescriptionEl: (t) => C.getById(t, C.getDescriptionId(t)),
    getFocusableEls: (t) => Ki(C.getContentEl(t)),
    getFirstFocusableEl: (t) => C.getFocusableEls(t)[0],
    getDocTabbableEls: (t) => Nt(C.getDoc(t).body),
    getTabbableEls: (t) => Nt(C.getContentEl(t), 'if-empty'),
    getFirstTabbableEl: (t) => tu(C.getContentEl(t), 'if-empty'),
    getLastTabbableEl: (t) => eu(C.getContentEl(t), 'if-empty'),
    getInitialFocusEl: (t) => {
      let e = Ai(t.initialFocusEl)
      return !e && t.autoFocus && (e = C.getFirstFocusableEl(t)), e || (e = C.getContentEl(t)), e
    },
  })
function Wu(t, e, n) {
  const r = t.matches('open'),
    s = t.context.currentPlacement,
    i = t.context.currentPortalled,
    o = t.context.renderedElements,
    a = Gl({ placement: s })
  return {
    portalled: i,
    isOpen: r,
    open() {
      e('OPEN')
    },
    close() {
      e('CLOSE')
    },
    setPositioning(c = {}) {
      e({ type: 'SET_POSITIONING', options: c })
    },
    arrowProps: n.element({ id: C.getArrowId(t.context), ...ct.arrow.attrs, style: a.arrow }),
    arrowTipProps: n.element({ ...ct.arrowTip.attrs, style: a.arrowTip }),
    anchorProps: n.element({ ...ct.anchor.attrs, id: C.getAnchorId(t.context) }),
    triggerProps: n.button({
      ...ct.trigger.attrs,
      type: 'button',
      'data-placement': s,
      id: C.getTriggerId(t.context),
      'aria-haspopup': 'dialog',
      'aria-expanded': r,
      'data-expanded': zr(r),
      'aria-controls': C.getContentId(t.context),
      onClick() {
        e('TOGGLE')
      },
      onBlur(c) {
        e({ type: 'TRIGGER_BLUR', target: c.relatedTarget })
      },
    }),
    positionerProps: n.element({ id: C.getPositionerId(t.context), ...ct.positioner.attrs, style: a.floating }),
    contentProps: n.element({
      ...ct.content.attrs,
      id: C.getContentId(t.context),
      tabIndex: -1,
      role: 'dialog',
      hidden: !r,
      'data-expanded': zr(r),
      'aria-labelledby': o.title ? C.getTitleId(t.context) : void 0,
      'aria-describedby': o.description ? C.getDescriptionId(t.context) : void 0,
      'data-placement': s,
    }),
    titleProps: n.element({ ...ct.title.attrs, id: C.getTitleId(t.context) }),
    descriptionProps: n.element({ ...ct.description.attrs, id: C.getDescriptionId(t.context) }),
    closeTriggerProps: n.button({
      ...ct.closeTrigger.attrs,
      id: C.getCloseTriggerId(t.context),
      type: 'button',
      'aria-label': 'close',
      onClick() {
        e('REQUEST_CLOSE')
      },
    }),
  }
}
function Hu(t) {
  const e = Ci(t)
  return wl(
    {
      id: 'popover',
      initial: e.open ? 'open' : 'closed',
      context: {
        closeOnInteractOutside: !0,
        closeOnEsc: !0,
        autoFocus: !0,
        modal: !1,
        positioning: { placement: 'bottom', ...e.positioning },
        currentPlacement: void 0,
        ...e,
        renderedElements: { title: !0, description: !0 },
      },
      computed: { currentPortalled: (n) => !!n.modal || !!n.portalled },
      watch: { open: ['toggleVisibility'] },
      entry: ['checkRenderedElements'],
      states: {
        closed: {
          on: {
            TOGGLE: { target: 'open', actions: ['invokeOnOpen'] },
            OPEN: { target: 'open', actions: ['invokeOnOpen'] },
          },
        },
        open: {
          activities: [
            'trapFocus',
            'preventScroll',
            'hideContentBelow',
            'trackPositioning',
            'trackDismissableElement',
            'proxyTabFocus',
          ],
          entry: ['setInitialFocus'],
          on: {
            CLOSE: { target: 'closed', actions: ['invokeOnClose'] },
            REQUEST_CLOSE: { target: 'closed', actions: ['restoreFocusIfNeeded', 'invokeOnClose'] },
            TOGGLE: { target: 'closed', actions: ['invokeOnClose'] },
            SET_POSITIONING: { actions: 'setPositioning' },
          },
        },
      },
    },
    {
      activities: {
        trackPositioning(n) {
          n.currentPlacement = n.positioning.placement
          const r = C.getAnchorEl(n) ?? C.getTriggerEl(n)
          return ds(r, () => C.getPositionerEl(n), {
            ...n.positioning,
            defer: !0,
            onComplete(i) {
              n.currentPlacement = i.placement
            },
            onCleanup() {
              n.currentPlacement = void 0
            },
          })
        },
        trackDismissableElement(n, r, { send: s }) {
          const i = () => C.getContentEl(n)
          let o = !0
          return pu(i, {
            pointerBlocking: n.modal,
            exclude: C.getTriggerEl(n),
            defer: !0,
            onEscapeKeyDown(a) {
              n.onEscapeKeyDown?.(a), !n.closeOnEsc && a.preventDefault()
            },
            onInteractOutside(a) {
              n.onInteractOutside?.(a),
                !a.defaultPrevented &&
                  ((o = !(a.detail.focusable || a.detail.contextmenu)), n.closeOnInteractOutside || a.preventDefault())
            },
            onPointerDownOutside(a) {
              n.onPointerDownOutside?.(a)
            },
            onFocusOutside(a) {
              n.onFocusOutside?.(a)
            },
            onDismiss() {
              s({ type: 'REQUEST_CLOSE', src: 'interact-outside', restoreFocus: o })
            },
          })
        },
        proxyTabFocus(n) {
          return n.modal || !n.portalled
            ? void 0
            : iu(() => C.getContentEl(n), {
                triggerElement: C.getTriggerEl(n),
                defer: !0,
                onFocus(s) {
                  s.focus({ preventScroll: !0 })
                },
              })
        },
        hideContentBelow(n) {
          return n.modal ? Yl(() => [C.getContentEl(n), C.getTriggerEl(n)], { defer: !0 }) : void 0
        },
        preventScroll(n) {
          if (n.modal) return mu(C.getDoc(n))
        },
        trapFocus(n) {
          if (!n.modal) return
          let r
          return (
            nl(() => {
              const s = C.getContentEl(n)
              if (s) {
                r = Uu(s, {
                  escapeDeactivates: !1,
                  allowOutsideClick: !0,
                  preventScroll: !0,
                  returnFocusOnDeactivate: !0,
                  document: C.getDoc(n),
                  fallbackFocus: s,
                  initialFocus: Ai(n.initialFocusEl),
                })
                try {
                  r.activate()
                } catch {}
              }
            }),
            () => r?.deactivate()
          )
        },
      },
      actions: {
        setPositioning(n, r) {
          const s = C.getAnchorEl(n) ?? C.getTriggerEl(n)
          ds(s, () => C.getPositionerEl(n), { ...n.positioning, ...r.options, defer: !0, listeners: !1 })
        },
        checkRenderedElements(n) {
          vt(() => {
            Object.assign(n.renderedElements, { title: !!C.getTitleEl(n), description: !!C.getDescriptionEl(n) })
          })
        },
        setInitialFocus(n) {
          vt(() => {
            C.getInitialFocusEl(n)?.focus({ preventScroll: !0 })
          })
        },
        restoreFocusIfNeeded(n, r) {
          r.restoreFocus &&
            vt(() => {
              C.getTriggerEl(n)?.focus({ preventScroll: !0 })
            })
        },
        invokeOnOpen(n) {
          n.onOpen?.()
        },
        invokeOnClose(n) {
          n.onClose?.()
        },
        toggleVisibility(n, r, { send: s }) {
          s({ type: n.open ? 'OPEN' : 'CLOSE', src: 'controlled' })
        },
      },
    },
  )
}
const zu = (t) => {
    const e = El(),
      n = ln({ id: co(), getRootNode: e }, t),
      [r, s] = gc(Hu(n), { context: n })
    return I(() => Wu(r, s, hc))
  },
  Gu = (t) => {
    const [e, n] = yc()(t, [
        'autoFocus',
        'closeOnEsc',
        'closeOnInteractOutside',
        'getRootNode',
        'id',
        'ids',
        'initialFocusEl',
        'modal',
        'onClose',
        'onEscapeKeyDown',
        'onFocusOutside',
        'onInteractOutside',
        'onOpen',
        'onPointerDownOutside',
        'open',
        'portalled',
        'positioning',
      ]),
      r = zu(e)
    return P(Vu, {
      value: r,
      get children() {
        return n.children
      },
    })
  },
  Xu = (t) => {
    const e = xr(),
      n = ln(() => e().contentProps, t)
    return P(hr.div, n)
  },
  Yu = (t) => {
    const e = xr(),
      n = ln(() => e().positionerProps, t)
    return P(hr.div, n)
  },
  Ju = (t) => {
    const e = xr(),
      n = ln(() => e().triggerProps, t)
    return P(hr.button, n)
  }
function Zu(t) {
  return or(
    {
      a: { viewBox: '0 0 24 24' },
      c: '<path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"/>',
    },
    t,
  )
}
var tf = (t) => (typeof t == 'function' && !t.length ? t() : t)
function ef(t, e) {
  e.observe(t)
}
function nf(t, e) {
  const n = new WeakMap(),
    r = new IntersectionObserver((a, c) => {
      for (const l of a) n.get(l.target)?.(l, c)
    }, t)
  ot(() => r.disconnect())
  function s(a) {
    r.unobserve(a), n.delete(a)
  }
  function i(a, c) {
    ef(a, r), n.set(a, c)
  }
  const o = e
    ? (a, c) => {
        const l = tf(e)
        return (u) => c(l(u, { visible: V(a) }))
      }
    : (a, c) => (l) => c(l.isIntersecting)
  return (a) => {
    const [c, l] = Z(t?.initialValue ?? !1),
      u = o(c, l)
    let f
    return (
      a instanceof Element
        ? i(a, u)
        : Ft(() => {
            const d = a()
            d !== f && (f && s(f), d && i(d, u), (f = d))
          }),
      ot(() => f && s(f)),
      c
    )
  }
}
const rf = Q('<div class="absolute inset-0 w-full h-48 pointer-events-none">'),
  sf = Q('<span class=""> available points'),
  of = Q('<div class="transition-all text-sm py-2 px-3">'),
  af = Q('<span class="sr-only">Go back to dashboard'),
  cf = Q('<span class="px-3 text-sm me-auto"> available points'),
  lf = Q(
    '<div class="mb-3 flex justify-between items-center bg-neutral-3 shadow-sm border-b border-neutral-5 py-2 px-1.5 sticky inset-0 w-full z-10">',
  ),
  uf = Q('<div class="px-1.5">'),
  ff = Q(
    '<div class="relative h-full grow flex flex-col"><div class="pb-8 grow"></div><div class="border-t border-neutral-4 grid gap-1.5 sticky bottom-0 w-full left-0 p-2 bg-neutral-1 text-neutral-9 text-[0.685em] text-center font-medium"><footer>Distributed on Blackgold Loyalty Programs',
  ),
  df = (t) => {
    let e
    const { storeOnChainIdentity: n } = pi(),
      r = Hs(),
      s = nf({ threshold: 0.5 })(() => e)
    return [
      (() => {
        const i = rf(),
          o = e
        return typeof o == 'function' ? Po(o, i) : (e = i), i
      })(),
      P(Ms, {
        get children() {
          return [
            P(_t, {
              get when() {
                return r.pathname === De
              },
              get children() {
                const i = of()
                return (
                  B(
                    i,
                    P(fe, {
                      get when() {
                        return I(() => !!n?.connected)() && !s()
                      },
                      get children() {
                        const o = sf(),
                          a = o.firstChild
                        return B(o, () => n?.loyalty?.redeemablePointsAmount, a), o
                      },
                    }),
                  ),
                  pt((o) =>
                    js(
                      i,
                      {
                        '-translate-y-full': s(),
                        'translate-y-0 sticky inset-0 w-full z-10 bg-neutral-3 shadow-sm border-b border-neutral-5':
                          !s() && n?.connected,
                      },
                      o,
                    ),
                  ),
                  i
                )
              },
            }),
            P(_t, {
              get when() {
                return r.pathname !== De
              },
              get children() {
                const i = lf()
                return (
                  B(
                    i,
                    P(Fe, {
                      class: 'rtl:rotate-180',
                      href: De,
                      get children() {
                        return [af(), P(Zu, {})]
                      },
                    }),
                    null,
                  ),
                  B(
                    i,
                    P(fe, {
                      get when() {
                        return n?.connected
                      },
                      get children() {
                        const o = cf(),
                          a = o.firstChild
                        return B(o, () => n?.loyalty?.redeemablePointsAmount, a), o
                      },
                    }),
                    null,
                  ),
                  i
                )
              },
            }),
          ]
        },
      }),
      (() => {
        const i = uf()
        return B(i, () => t.children), i
      })(),
    ]
  },
  hf = () =>
    P(Wa, {
      get children() {
        return P(df, {
          get children() {
            return P(ra, {
              get children() {
                return [P(Ya, {}), P(aa, {}), P(ha, {}), P(ya, {})]
              },
            })
          },
        })
      },
    }),
  pf = () =>
    P(Gu, {
      portalled: !0,
      positioning: { placement: 'top-end' },
      get children() {
        return [
          P(Ju, {
            class: 'relative z-10 bg-neutral-12 text-neutral-1 py-1.5 px-3 rounded-full font-semibold',
            children: 'Open Popover',
          }),
          P(Lo, {
            get children() {
              return P(Yu, {
                class: 'flex justify-end z-10 max-w-[97.5dvw] w-full px-3 !min-w-[unset]',
                get children() {
                  return P(Xu, {
                    class:
                      'overflow-x-hidden h-[100dh] w-80 max-w-[95dw] sm:h-[60vh] overflow-y-auto bg-neutral-1 relative border shadow-lg ',
                    get children() {
                      const t = ff(),
                        e = t.firstChild
                      return B(e, P(hf, {})), t
                    },
                  })
                },
              })
            },
          }),
        ]
      },
    }),
  gf = document.getElementById('blckgld-ltypgrm')
wo(
  () =>
    P(na, {
      get source() {
        return jo()
      },
      get children() {
        return P(pf, {})
      },
    }),
  gf,
)
