﻿/*
 Deferred Updates plugin for Knockout http://knockoutjs.com/
 (c) Michael Best, Steven Sanderson
 License: MIT (http://www.opensource.org/licenses/mit-license.php)
 Version 3.3.0
*/
(function (a) { "function" === typeof require && "object" === typeof exports && "object" === typeof module ? module.exports = a(require("knockout")) : "function" === typeof define && define.amd ? define(["knockout"], a) : a(ko) })(function (a) {
    function h(b, D) { for (var d in b) if (b.hasOwnProperty(d) && b[d] && 0 <= b[d].toString().indexOf(D)) return d } function s(b, D) { for (var d in b) if (b.hasOwnProperty(d) && b[d] === D) return d } function ha(b, D, d, a) {
        var e = b.subscribe(D, null, "dirty", !1, a), f = b.subscribe(d, null, "change", !1, a); return {
            dispose: function () {
                e.dispose();
                f.dispose()
            }, _target: b
        }
    } var H = "object" === typeof global && global ? global : window; if (!a) throw Error("Deferred Updates requires Knockout"); if ("3.4.0" <= a.version) throw Error("This version of Deferred Updates supports Knockout version 3.3 and lower."); a.tasks = function () {
        function b(c) {
            var b = 0, d = 0; k = k._next = { _mark: !0 }; try {
                for (var a = c; a = a._next;) if (l = a, a._mark) { if (a._next) { if (5E3 <= ++d) throw Error("'Too much recursion' after processing " + b + " tasks."); k = k._next = { _mark: !0 } } } else a._done || (a._done = !0, a._func.apply(a.object,
                a.args || []), ++b)
            } finally { if (c !== g) c._next = null, k = c; else { h = []; g._next = null; n = k = g; if (f) H[e](f); f = void 0 } l = void 0 } return b
        } function D() { if (!l) return b(g) } var d, e; H.setImmediate ? (d = "setImmediate", e = "clearImmediate") : (d = "setTimeout", e = "clearTimeout"); var f, g = {}, k = g, h = [], l, n = g, t = {
            processImmediate: function (c, d, a) { h.push(n); n = k; try { return c.apply(d, a || []) } finally { try { n._next && b(n) } finally { n = h.pop() || g } } }, processDelayed: function (c, b, a) {
                2 == arguments.length && "object" == typeof b && (a = b, b = a.distinct); var e; if (e =
                b || void 0 === b) a: { e = l || n; for (var g; g = e._next; e = g) if (g._func === c && !g._done) { e._next = g._next; e._next || (k = e); e = !0; break a } e = !1 } g = a || {}; g._func = c; k = k._next = g; h.length || f || (f = H[d](D)); return !e
            }, makeProcessedCallback: function (c) { return function () { return t.processImmediate(c, this, arguments) } }
        }; a.processDeferredBindingUpdatesForNode = a.processAllDeferredBindingUpdates = function () { for (var c = g; c = c._next;) c.node && !c._done && (c._done = !0, c._func.call()) }; a.processAllDeferredUpdates = D; a.evaluateAsynchronously = function (c,
        b) { return setTimeout(t.makeProcessedCallback(c), b) }; return t
    }(); var y = a.utils, M = y.objectForEach || function (b, a) { for (var d in b) b.hasOwnProperty(d) && a(d, b[d]) }, Y = y.arrayForEach, ia = { __proto__: [] } instanceof Array ? function (b, a) { b.__proto__ = a; return b } : y.extend, f = function (b, a) { for (var d in b) if (b.hasOwnProperty(d) && b[d] && b[d][a]) return b[d] }(a, "end"), ja = h(f, ".apply(") || "ignore", T = h(f, ".push"), Z = h(f, "Only subscribable"), ka = f.isInitial ? s(f, f.isInitial) : "isInitial", z = a.computed, la = function (b, a) {
        var d = [], e;
        for (e in b) b.hasOwnProperty(e) && b[e] === a && d.push(e); return d
    }(a, z), N = s(z.fn, z), e = a.computed(function () { }), ma = s(e, e.peek) || "peek", na = s(e, e.isActive) || "isActive", $ = s(e, e.getDependenciesCount), aa = s(e, !1), oa = s(e, e.dispose), ba = "disposeWhenNodeIsRemoved", ca = "disposeWhen"; if ("hasWriteFunction" != aa) { var e = z.toString(), v; if (v = e.match(/.\.disposeWhenNodeIsRemoved\s*\|\|\s*.\.([^|\s,]+)/)) ba = v[1]; if (e = e.match(/.\.disposeWhen\s*\|\|\s*.\.([^|\s,]+)/)) ca = e[1] } var pa = h(y, "documentElement)") || h(y, "ocument)"), e =
    a.subscribable.fn; v = h(e, ".bind("); var O = h(e, "notifySubscribers"), l = (new a.subscribable).subscribe(), E = l.constructor.prototype, P = s(E, l.dispose); l.dispose(); var l = null, da, ea; O && a.extenders.rateLimit && (l = (new a.subscribable).extend({ rateLimit: 1 }), ea = h(l, "=!0") || "_rateLimitedChange", da = h(l, "||(") || "_rateLimitedBeforeChange", l = null); var A = new a.subscribable, l = s(A, 1), F, U, fa; l && (F = h(e, "return this." + l), U = h(e, "++this." + l), fa = h(e, "return this." + F + "()")); var A = null, Q, ga; a.pureComputed && (A = a.pureComputed(function () { }),
    Q = h(A, l ? '"awake"' : "!1,") || "beforeSubscriptionAdd", ga = h(A, l ? '"asleep"' : "()||") || "afterSubscriptionRemove", A = null); var R = [], u, qa = 0; f[T] = function (b) { R.push(u); u = b }; f.end = function () { u = R.pop() }; f[Z] = function (b) { if (u) { if (!a.isSubscribable(b)) throw Error("Only subscribable things can act as dependencies"); u.callback(b, b._id || (b._id = ++qa)) } }; a.ignoreDependencies = f[ja] = function (b, a, d) { try { return f[T](), b.apply(a, d || []) } finally { f.end() } }; f[$] = f.getDependenciesCount = function () { if (u) return u.computed.getDependenciesCount() };
    f[ka] = f.isInitial = function () { if (u) return u.isInitial }; var ra = e[v]; e[v] = e.subscribe = function (b, e, d, f, h) { d = d || "change"; if (h) "change" == d && (this.dependents = this.dependents || [], this.dependents.push(h)); else { var g = e ? b.bind(e) : b; b = "change" == d && a.isObservable(this) ? function (b) { n.deferUpdates && !1 !== k.deferUpdates || k.deferUpdates ? a.tasks.processDelayed(g, { args: [b] }) : g(b) } : g } var k = ra.call(this, b, null, d); k._target = this; k.event = d; k.dependent = h; k.deferUpdates = f; return k }; var I = e.notifySubscribers, B; e.notifySubscribers =
    function (b, a) { if ("change" === a || "dirty" === a || void 0 === a) if (B) B.push([this, b, a]); else try { if (B = [], I.call(this, b, a), B.length) for (var d = 0, e; e = B[d]; d++) Function.prototype.call.apply(I, e) } finally { B = null } else I.call(this, b, a) }; e.getDependents = function () { return this.dependents ? [].concat(this.dependents) : [] }; var sa = E[P]; E[P] = E.dispose = function () { sa.call(this); this.dependent && "change" == this.event && y.arrayRemoveItem(this._target.dependents, this.dependent) }; var n = function (b, e, d) {
        function h(b) {
            return b[N] === n ?
            ha(b, z, u, c) : b.subscribe(u, null, "change", !1, c)
        } function l(b, a, e) { if (H && a === c) throw Error("A 'pure' computed must not be called recursively"); q[b] = e; e._order = w++; e._version = F && a[F]() } function g() { if (!F) return !0; var b, a; for (b in q) if (q.hasOwnProperty(b) && (a = q[b], a._target[fa](a._version))) return !0 } function k() { !r && q && M(q, function (b, a) { a.dispose && a.dispose() }); q = null; w = 0; K = !0; r = x = m = !1 } function s(b, e) {
            var d = "dirty" == e, f = d && !x && !m; d ? x = !0 : m = !0; (d = c.throttleEvaluation) && 0 <= d ? (clearTimeout(V), V = a.evaluateAsynchronously(function () { t(!0) },
            d)) : c._evalRateLimited ? c._evalRateLimited() : n.deferUpdates && !1 !== c.deferUpdates || c.deferUpdates ? f = a.tasks.processDelayed(function () { t(!0) }, { node: G }) : m && (t(!0), f = !1); f && c.notifySubscribers && (c.notifySubscribers(p, "dirty"), !x && d && clearTimeout(V))
        } function u(b) { x || m ? m = !0 : s(b, "change") } function z(b) { s(b, "dirty") } function t(b) {
            if (!v) if (!m && b) x = m, c.equalityComparer && c.equalityComparer(p, J) || (J = p, c.notifySubscribers(p, void 0)); else {
                var a; a: if (K) a = !0; else {
                    if (W && W()) { if (!E) { L(); m = !1; a = !0; break a } } else E = !1;
                    a = void 0
                } if (!a) {
                    v = !0; try { var d = q, g = w; a = H ? void 0 : !w; f[T]({ callback: function (b, a) { K || (g && d[a] ? (l(a, b, d[a]), delete d[a], --g) : q[a] || l(a, b, r ? { _target: b } : h(b))) }, computed: c, isInitial: a }); q = {}; w = 0; try { var k = e ? C.call(e) : C() } finally { f.end(), g && !r && M(d, function (b, a) { a.dispose && a.dispose() }), x = m = !1 } if (!c.equalityComparer || !c.equalityComparer(p, k)) if (r || c.notifySubscribers(p, "beforeChange"), p = k, c._latestValue = p, r) { if (U) c[U]() } else b && (J = p, c.notifySubscribers(p, void 0)); a && (J = p, c.notifySubscribers(p, "awake")) } finally {
                        v =
                        !1
                    } w || L()
                }
            }
        } function c() { if (0 < arguments.length) { if ("function" === typeof I) { var a = c.deferUpdates; c.deferUpdates = !1; try { I.apply(e, arguments) } finally { c.deferUpdates = a } } else throw Error('Cannot write a value to a ko.computed unless you specify a "write" option. If you wish to read the current value, don\'t pass any parameters.'); return this } f[Z](c); (m || x || r && g()) && t(); return p } function A() { (m && !w || r && g()) && t(); return p } function B() { return m || x || 0 < w } var p, J, x = !1, m = !0, v = !1, E = !1, K = !1, C = b, H = !1, r = !1; C && "object" ==
        typeof C ? (d = C, C = d.read) : (d = d || {}, C || (C = d.read)); if ("function" != typeof C) throw Error("Pass a function that returns the value of the ko.computed"); var S, I = d.write, G = d[ba] || d.disposeWhenNodeIsRemoved || null, X = d[ca] || d.disposeWhen, W = X, L = k, q = {}, w = 0, P = [], V = null; e || (e = d.owner); a.subscribable.call(c); ia(c, n.fn); c[ma] = c.peek = A; c[$] = c.getDependenciesCount = function () { return w }; c[aa] = c.hasWriteFunction = "function" === typeof I; c[oa] = c.dispose = function () { L() }; c[na] = c.isActive = B; c.activeWhen = function (b) {
            S || (S = a.computed(function () {
                v =
                !b(); !v && m && s(void 0, "change")
            }), S.deferUpdates = !1, P.push(S))
        }; c.getDependencies = function () { var a = []; M(q, function (b, c) { a.push(c._target) }); return a }; if (O) { var R = c[O]; c[O] = function (a) { R.call(c, a); c._evalRateLimited = function () { x = m = !1; c[da](p); m = !0; c[ea](c) } } } Q && (d.pure ? (r = H = !0, c[Q] = function (a) {
            if (!K && r && "change" == a) {
                r = !1; if (m || g()) q = null, w = 0, m = !0, t(); else { var b = []; M(q, function (a, c) { b[c._order] = a }); Y(b, function (a, b) { var c = q[a], d = h(c._target); d._order = b; d._version = c._version; q[a] = d }) } K || (c.notifySubscribers(p,
                "awake"), J = p)
            }
        }, c[ga] = function (a) { K || a && "change" != a || c.getSubscriptionsCount("change") || (M(q, function (a, b) { b.dispose && (q[a] = { _target: b._target, _order: b._order, _version: b._version }, b.dispose()) }), r = !0, c.notifySubscribers(void 0, "asleep"), J = void 0) }, F && (c._originalGetVersion = c[F], c[F] = function () { r && (m || g()) && t(); return c._originalGetVersion() })) : d.deferEvaluation && (c[Q] = function (a) { "change" != a && "beforeChange" != a || A() })); G && (E = !0, G.nodeType && (W = function () { return !y[pa](G) || X && X() })); r || d.deferEvaluation ||
        t(); G && B() && G.nodeType && (L = function () { y.domNodeDisposal.removeDisposeCallback(G, L); k() }, y.domNodeDisposal.addDisposeCallback(G, L)); return c
    }; n[N] = z[N]; n.fn = z.fn; n.fn[N] = n; n.deferUpdates = !0; Y(la, function (b) { a[b] = n }); z = e = null; a.extenders.throttle = function (b, e) { if (a.isWriteableObservable(b)) { var d = null; return a.computed({ read: b, write: function (f) { clearTimeout(d); d = a.evaluateAsynchronously(function () { b(f) }, e) } }) } b.throttleEvaluation = e; return b }; a.extenders.deferred = function (a, e) { a.deferUpdates = e }; return a
});