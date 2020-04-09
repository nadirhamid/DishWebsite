function slide(e, t) {
    var n = $(e);
    n.removeClass("nudge");
    var r = $($(e).data("controls")),
        i = n.children().length - 1,
        o = parseInt(n.data("index")) + (t ? 1 : -1);
    i < o ? o = 0 : o < 0 && (o = i);
    var a = n.children().first().outerWidth(!0) * o;
    r.children().removeClass("active"), r.find('*[data-index="' + o + '"]').addClass("active"), n.data("index", o), n.attr("style", "transform: translate(-" + a + "px)")
}

function initCleanerMap() {
    mapElement = document.getElementById("cleanerMap"), centerLatLng = new google.maps.LatLng(mapElement.dataset.lat, mapElement.dataset.lng);
    var e = {
        center: centerLatLng,
        zoom: 15,
        disableDefaultUI: !0,
        styles: [{
            featureType: "poi.business",
            stylers: [{
                visibility: "off"
            }]
        }]
    };
    window.cleanerMap = new google.maps.Map(mapElement, e), window.mapBounds = new google.maps.LatLngBounds, window.userMarker = new google.maps.Marker({
        position: centerLatLng,
        map: cleanerMap,
        icon: {
            url: "//cdn.DishRemoval.com/production/assets/cleaner_map/city_area_pin-7c3d42597a6798272ad0b3d3657e15d5c90774eec66c181c4f010130e8038003.png",
            scaledSize: new google.maps.Size(45, 58)
        },
        title: mapElement.dataset.location
    }), mapBounds.extend(centerLatLng), mapPinUrls = ["//cdn.DishRemoval.com/production/assets/cleaner_map/map_pin_1-cd0f2901476cae21a3ab05ed4f073f2b031445cd5082a0aa88b872207246407e.svg", "//cdn.DishRemoval.com/production/assets/cleaner_map/map_pin_2-bdf92cd999b71b047d21d53d5728b8a1eabd34edffc62a5fc687450e26c415a9.svg", "//cdn.DishRemoval.com/production/assets/cleaner_map/map_pin_3-b26d9d4c405c56d5ff5c79881d44cda1056916cc3f194cbb93960fd49915a3a4.svg", "//cdn.DishRemoval.com/production/assets/cleaner_map/map_pin_4-12f26a97f0dfc3a94255f45a87597228a2500d2ead992ddcdc6eeed929034016.svg", "//cdn.DishRemoval.com/production/assets/cleaner_map/map_pin_5-ddbe0b9e7059e2b8420a4b68374aec4dc1eb9a65f68a598ed8efa446c2ba8a61.svg"];
    for (var t = 1, n = document.getElementsByClassName("js-cleaner-item"), r = 0; r < n.length; r++) cleanerElement = n[r], latLng = new google.maps.LatLng(cleanerElement.dataset.lat, cleanerElement.dataset.lng), mapBounds.extend(latLng), new google.maps.Marker({
        position: latLng,
        map: cleanerMap,
        icon: {
            url: mapPinUrls[t++],
            scaledSize: new google.maps.Size(24, 24)
        },
        title: cleanerElement.dataset.name
    });
    cleanerMap.fitBounds(mapBounds)
}

function updateWalkingTimeText(t, e, n, r, i) {
    var o = new google.maps.DirectionsService,
        a = {
            origin: new google.maps.LatLng(e, n),
            destination: new google.maps.LatLng(r, i),
            travelMode: google.maps.DirectionsTravelMode.WALKING
        };
    o.route(a, function (e) {
        t.innerHTML = e.routes[0].legs[0].duration.text
    })
}

function updateCleanerDistance(e, t, n, r, i) {
    var o = new google.maps.LatLng(t, n);
    window.userMarker.setPosition(o), window.mapBounds.extend(o), window.cleanerMap.fitBounds(mapBounds), updateWalkingTimeText(e, r, i, t, n)
}

function updateCleanerDistances(n, r) {
    for (var i = document.getElementsByClassName("cleaner-walking-time"), e = 0; e < i.length; e++) i[e].innerHTML = "...";
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function (e) {
        for (var t = 0; t < i.length; t++) updateCleanerDistance(i[t], e.coords.latitude, e.coords.longitude, n, r);
        for (elements = document.getElementsByClassName("calculate-cleaner-distance"); 0 < elements.length;) elements[0].parentNode.removeChild(elements[0]);
        dataLayer.push({
            event: "distance-calculated",
            lat: e.coords.latitude,
            lon: e.coords.longitude
        })
    })
}

function initCleanerInfoMap() {
    mapElement = document.getElementById("cleanerMap"), centerLatLng = new google.maps.LatLng(mapElement.dataset.lat, mapElement.dataset.lng);
    var e = {
        center: centerLatLng,
        zoom: 15,
        disableDefaultUI: !0
    };
    window.cleanerMap = new google.maps.Map(mapElement, e), window.mapBounds = new google.maps.LatLngBounds, window.userMarker = new google.maps.Marker({
        position: centerLatLng,
        map: cleanerMap,
        title: mapElement.dataset.location
    }), mapBounds.extend(centerLatLng)
}

function debounce(i, o, a) {
    var s;
    return function () {
        var e = this,
            t = arguments,
            n = function () {
                s = null, a || i.apply(e, t)
            },
            r = a && !s;
        clearTimeout(s), s = setTimeout(n, o), r && i.apply(e, t)
    }
}! function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (E, e) {
    "use strict";

    function m(e, t) {
        var n = (t = t || ne).createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }

    function s(e) {
        var t = !!e && "length" in e && e.length,
            n = me.type(e);
        return "function" !== n && !me.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }

    function l(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }

    function t(e, n, r) {
        return me.isFunction(n) ? me.grep(e, function (e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? me.grep(e, function (e) {
            return e === n !== r
        }) : "string" != typeof n ? me.grep(e, function (e) {
            return -1 < se.call(n, e) !== r
        }) : ke.test(n) ? me.filter(n, e, r) : (n = me.filter(n, e), me.grep(e, function (e) {
            return -1 < se.call(n, e) !== r && 1 === e.nodeType
        }))
    }

    function n(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function c(e) {
        var n = {};
        return me.each(e.match(Ne) || [], function (e, t) {
            n[t] = !0
        }), n
    }

    function d(e) {
        return e
    }

    function f(e) {
        throw e
    }

    function u(e, t, n, r) {
        var i;
        try {
            e && me.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && me.isFunction(i = e.then) ? i.call(e, t, n) : t.apply(undefined, [e].slice(r))
        } catch (e) {
            n.apply(undefined, [e])
        }
    }

    function r() {
        ne.removeEventListener("DOMContentLoaded", r), E.removeEventListener("load", r), me.ready()
    }

    function i() {
        this.expando = me.expando + i.uid++
    }

    function o(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Me.test(e) ? JSON.parse(e) : e)
    }

    function p(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType)
            if (r = "data-" + t.replace(Oe, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = o(n)
                } catch (i) {}
                Pe.set(e, t, n)
            } else n = undefined;
        return n
    }

    function h(e, t, n, r) {
        var i, o = 1,
            a = 20,
            s = r ? function () {
                return r.cur()
            } : function () {
                return me.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (me.cssNumber[t] ? "" : "px"),
            c = (me.cssNumber[t] || "px" !== l && +u) && Re.exec(me.css(e, t));
        if (c && c[3] !== l)
            for (l = l || c[3], n = n || [], c = +u || 1; c /= o = o || ".5", me.style(e, t, c + l), o !== (o = s() / u) && 1 !== o && --a;);
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }

    function g(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            i = ze[r];
        return i || (t = n.body.appendChild(n.createElement(r)), i = me.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), ze[r] = i)
    }

    function y(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = He.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && _e(r) && (i[o] = g(r))) : "none" !== n && (i[o] = "none", He.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
        return e
    }

    function v(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], t === undefined || t && l(e, t) ? me.merge([e], n) : n
    }

    function b(e, t) {
        for (var n = 0, r = e.length; n < r; n++) He.set(e[n], "globalEval", !t || He.get(t[n], "globalEval"))
    }

    function x(e, t, n, r, i) {
        for (var o, a, s, u, l, c, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
            if ((o = e[p]) || 0 === o)
                if ("object" === me.type(o)) me.merge(f, o.nodeType ? [o] : o);
                else if (Je.test(o)) {
            for (a = a || d.appendChild(t.createElement("div")), s = (Xe.exec(o) || ["", ""])[1].toLowerCase(), u = Ge[s] || Ge._default, a.innerHTML = u[1] + me.htmlPrefilter(o) + u[2], c = u[0]; c--;) a = a.lastChild;
            me.merge(f, a.childNodes), (a = d.firstChild).textContent = ""
        } else f.push(t.createTextNode(o));
        for (d.textContent = "", p = 0; o = f[p++];)
            if (r && -1 < me.inArray(o, r)) i && i.push(o);
            else if (l = me.contains(o.ownerDocument, o), a = v(d.appendChild(o), "script"), l && b(a), n)
            for (c = 0; o = a[c++];) Ve.test(o.type || "") && n.push(o);
        return d
    }

    function a() {
        return !0
    }

    function w() {
        return !1
    }

    function T() {
        try {
            return ne.activeElement
        } catch (e) {}
    }

    function C(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = undefined), t) C(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = undefined) : null == i && ("string" == typeof n ? (i = r, r = undefined) : (i = r, r = n, n = undefined)), !1 === i) i = w;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function (e) {
            return me().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = me.guid++)), e.each(function () {
            me.event.add(this, t, i, r, n)
        })
    }

    function k(e, t) {
        return l(e, "table") && l(11 !== t.nodeType ? t : t.firstChild, "tr") && me(">tbody", e)[0] || e
    }

    function S(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function j(e) {
        var t = ot.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function D(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (He.hasData(e) && (o = He.access(e), a = He.set(t, o), l = o.events))
                for (i in delete a.handle, a.events = {}, l)
                    for (n = 0, r = l[i].length; n < r; n++) me.event.add(t, i, l[i][n]);
            Pe.hasData(e) && (s = Pe.access(e), u = me.extend({}, s), Pe.set(t, u))
        }
    }

    function L(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ue.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function N(n, r, i, o) {
        r = oe.apply([], r);
        var e, t, a, s, u, l, c = 0,
            d = n.length,
            f = d - 1,
            p = r[0],
            h = me.isFunction(p);
        if (h || 1 < d && "string" == typeof p && !pe.checkClone && it.test(p)) return n.each(function (e) {
            var t = n.eq(e);
            h && (r[0] = p.call(this, e, t.html())), N(t, r, i, o)
        });
        if (d && (t = (e = x(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = me.map(v(e, "script"), S)).length; c < d; c++) u = e, c !== f && (u = me.clone(u, !0, !0), s && me.merge(a, v(u, "script"))), i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, me.map(a, j), c = 0; c < s; c++) u = a[c], Ve.test(u.type || "") && !He.access(u, "globalEval") && me.contains(l, u) && (u.src ? me._evalUrl && me._evalUrl(u.src) : m(u.textContent.replace(at, ""), l))
        }
        return n
    }

    function A(e, t, n) {
        for (var r, i = t ? me.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || me.cleanData(v(r)), r.parentNode && (n && me.contains(r.ownerDocument, r) && b(v(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function q(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || lt(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || me.contains(e.ownerDocument, e) || (a = me.style(e, t)), !pe.pixelMarginRight() && ut.test(a) && st.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), a !== undefined ? a + "" : a
    }

    function $(e, t) {
        return {
            get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }

    function F(e) {
        if (e in mt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = ht.length; n--;)
            if ((e = ht[n] + t) in mt) return e
    }

    function H(e) {
        var t = me.cssProps[e];
        return t || (t = me.cssProps[e] = F(e) || e), t
    }

    function P(e, t, n) {
        var r = Re.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function M(e, t, n, r, i) {
        var o, a = 0;
        for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (a += me.css(e, n + Be[o], !0, i)), r ? ("content" === n && (a -= me.css(e, "padding" + Be[o], !0, i)), "margin" !== n && (a -= me.css(e, "border" + Be[o] + "Width", !0, i))) : (a += me.css(e, "padding" + Be[o], !0, i), "padding" !== n && (a += me.css(e, "border" + Be[o] + "Width", !0, i)));
        return a
    }

    function O(e, t, n) {
        var r, i = lt(e),
            o = q(e, t, i),
            a = "border-box" === me.css(e, "boxSizing", !1, i);
        return ut.test(o) ? o : (r = a && (pe.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (o = parseFloat(o) || 0) + M(e, t, n || (a ? "border" : "content"), r, i) + "px")
    }

    function I(e, t, n, r, i) {
        return new I.prototype.init(e, t, n, r, i)
    }

    function R() {
        yt && (!1 === ne.hidden && E.requestAnimationFrame ? E.requestAnimationFrame(R) : E.setTimeout(R, me.fx.interval), me.fx.tick())
    }

    function B() {
        return E.setTimeout(function () {
            gt = undefined
        }), gt = me.now()
    }

    function _(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Be[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function W(e, t, n) {
        for (var r, i = (X.tweeners[t] || []).concat(X.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function z(e, t, n) {
        var r, i, o, a, s, u, l, c, d = "width" in t || "height" in t,
            f = this,
            p = {},
            h = e.style,
            m = e.nodeType && _e(e),
            g = He.get(e, "fxshow");
        for (r in n.queue || (null == (a = me._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
                a.unqueued || s()
            }), a.unqueued++, f.always(function () {
                f.always(function () {
                    a.unqueued--, me.queue(e, "fx").length || a.empty.fire()
                })
            })), t)
            if (i = t[r], xt.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                    if ("show" !== i || !g || g[r] === undefined) continue;
                    m = !0
                }
                p[r] = g && g[r] || me.style(e, r)
            } if ((u = !me.isEmptyObject(t)) || !me.isEmptyObject(p))
            for (r in d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = g && g.display) && (l = He.get(e, "display")), "none" === (c = me.css(e, "display")) && (l ? c = l : (y([e], !0), l = e.style.display || l, c = me.css(e, "display"), y([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === me.css(e, "float") && (u || (f.done(function () {
                    h.display = l
                }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function () {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), u = !1, p) u || (g ? "hidden" in g && (m = g.hidden) : g = He.access(e, "fxshow", {
                display: l
            }), o && (g.hidden = !m), m && y([e], !0), f.done(function () {
                for (r in m || y([e]), He.remove(e, "fxshow"), p) me.style(e, r, p[r])
            })), u = W(m ? g[r] : 0, r, f), r in g || (g[r] = u.start, m && (u.end = u.start, u.start = 0))
    }

    function U(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (i = t[r = me.camelCase(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = me.cssHooks[r]) && "expand" in a)
                for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
            else t[r] = i
    }

    function X(o, e, t) {
        var n, a, r = 0,
            i = X.prefilters.length,
            s = me.Deferred().always(function () {
                delete u.elem
            }),
            u = function () {
                if (a) return !1;
                for (var e = gt || B(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
            },
            l = s.promise({
                elem: o,
                props: me.extend({}, e),
                opts: me.extend(!0, {
                    specialEasing: {},
                    easing: me.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: gt || B(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    var n = me.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function (e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; t < n; t++) l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
                }
            }),
            c = l.props;
        for (U(c, l.opts.specialEasing); r < i; r++)
            if (n = X.prefilters[r].call(l, o, c, l.opts)) return me.isFunction(n.stop) && (me._queueHooks(l.elem, l.opts.queue).stop = me.proxy(n.stop, n)), n;
        return me.map(c, W, l), me.isFunction(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), me.fx.timer(me.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l
    }

    function V(e) {
        return (e.match(Ne) || []).join(" ")
    }

    function G(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function Q(n, e, r, i) {
        var t;
        if (Array.isArray(e)) me.each(e, function (e, t) {
            r || At.test(n) ? i(n, t) : Q(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
        });
        else if (r || "object" !== me.type(e)) i(n, e);
        else
            for (t in e) Q(n + "[" + t + "]", e[t], r, i)
    }

    function Y(o) {
        return function (e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(Ne) || [];
            if (me.isFunction(t))
                for (; n = i[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function J(t, i, o, a) {
        function s(e) {
            var r;
            return u[e] = !0, me.each(t[e] || [], function (e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || l || u[n] ? l ? !(r = n) : void 0 : (i.dataTypes.unshift(n), s(n), !1)
            }), r
        }
        var u = {},
            l = t === Wt;
        return s(i.dataTypes[0]) || !u["*"] && s("*")
    }

    function K(e, t) {
        var n, r, i = me.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && me.extend(!0, e, r), e
    }

    function Z(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                } if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o) return o !== u[0] && u.unshift(o), n[o]
    }

    function ee(e, t, n, r) {
        var i, o, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (!(a = l[u + " " + o] || l["* " + o]))
                for (i in l)
                    if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                        break
                    } if (!0 !== a)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: a ? d : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    var te = [],
        ne = E.document,
        re = Object.getPrototypeOf,
        ie = te.slice,
        oe = te.concat,
        ae = te.push,
        se = te.indexOf,
        ue = {},
        le = ue.toString,
        ce = ue.hasOwnProperty,
        de = ce.toString,
        fe = de.call(Object),
        pe = {},
        he = "3.2.1",
        me = function (e, t) {
            return new me.fn.init(e, t)
        },
        ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ye = /^-ms-/,
        ve = /-([a-z])/g,
        be = function (e, t) {
            return t.toUpperCase()
        };
    me.fn = me.prototype = {
        jquery: he,
        constructor: me,
        length: 0,
        toArray: function () {
            return ie.call(this)
        },
        get: function (e) {
            return null == e ? ie.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function (e) {
            var t = me.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function (e) {
            return me.each(this, e)
        },
        map: function (n) {
            return this.pushStack(me.map(this, function (e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function () {
            return this.pushStack(ie.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: ae,
        sort: te.sort,
        splice: te.splice
    }, me.extend = me.fn.extend = function (e) {
        var t, n, r, i, o, a, s = e || {},
            u = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[u] || {}, u++), "object" == typeof s || me.isFunction(s) || (s = {}), u === l && (s = this, u--); u < l; u++)
            if (null != (t = arguments[u]))
                for (n in t) r = s[n], s !== (i = t[n]) && (c && i && (me.isPlainObject(i) || (o = Array.isArray(i))) ? (o ? (o = !1, a = r && Array.isArray(r) ? r : []) : a = r && me.isPlainObject(r) ? r : {}, s[n] = me.extend(c, a, i)) : i !== undefined && (s[n] = i));
        return s
    }, me.extend({
        expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
            throw new Error(e)
        },
        noop: function () {},
        isFunction: function (e) {
            return "function" === me.type(e)
        },
        isWindow: function (e) {
            return null != e && e === e.window
        },
        isNumeric: function (e) {
            var t = me.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function (e) {
            var t, n;
            return !(!e || "[object Object]" !== le.call(e)) && (!(t = re(e)) || "function" == typeof (n = ce.call(t, "constructor") && t.constructor) && de.call(n) === fe)
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[le.call(e)] || "object" : typeof e
        },
        globalEval: function (e) {
            m(e)
        },
        camelCase: function (e) {
            return e.replace(ye, "ms-").replace(ve, be)
        },
        each: function (e, t) {
            var n, r = 0;
            if (s(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function (e) {
            return null == e ? "" : (e + "").replace(ge, "")
        },
        makeArray: function (e, t) {
            var n = t || [];
            return null != e && (s(Object(e)) ? me.merge(n, "string" == typeof e ? [e] : e) : ae.call(n, e)), n
        },
        inArray: function (e, t, n) {
            return null == t ? -1 : se.call(t, e, n)
        },
        merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function (e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function (e, t, n) {
            var r, i, o = 0,
                a = [];
            if (s(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
            return oe.apply([], a)
        },
        guid: 1,
        proxy: function (e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), me.isFunction(e) ? (r = ie.call(arguments, 2), (i = function () {
                return e.apply(t || this, r.concat(ie.call(arguments)))
            }).guid = e.guid = e.guid || me.guid++, i) : undefined
        },
        now: Date.now,
        support: pe
    }), "function" == typeof Symbol && (me.fn[Symbol.iterator] = te[Symbol.iterator]), me.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        ue["[object " + t + "]"] = t.toLowerCase()
    });
    var xe = function (n) {
        function x(e, t, n, r) {
            var i, o, a, s, u, l, c, d = t && t.ownerDocument,
                f = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return n;
            if (!r && ((t ? t.ownerDocument || t : B) !== $ && q(t), t = t || $, H)) {
                if (11 !== f && (u = ye.exec(e)))
                    if (i = u[1]) {
                        if (9 === f) {
                            if (!(a = t.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (d && (a = d.getElementById(i)) && I(t, a) && a.id === i) return n.push(a), n
                    } else {
                        if (u[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = u[3]) && T.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(i)), n
                    } if (T.qsa && !X[e + " "] && (!P || !P.test(e))) {
                    if (1 !== f) d = t, c = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(we, Te) : t.setAttribute("id", s = R), o = (l = S(e)).length; o--;) l[o] = "#" + s + " " + m(l[o]);
                        c = l.join(","), d = ve.test(e) && h(t.parentNode) || t
                    }
                    if (c) try {
                        return K.apply(n, d.querySelectorAll(c)), n
                    } catch (p) {} finally {
                        s === R && t.removeAttribute("id")
                    }
                }
            }
            return D(e.replace(se, "$1"), t, n, r)
        }

        function e() {
            function n(e, t) {
                return r.push(e + " ") > C.cacheLength && delete n[r.shift()], n[e + " "] = t
            }
            var r = [];
            return n
        }

        function u(e) {
            return e[R] = !0, e
        }

        function i(e) {
            var t = $.createElement("fieldset");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function t(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) C.attrHandle[n[r]] = t
        }

        function l(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function r(t) {
            return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function o(n) {
            return function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }

        function a(t) {
            return function (e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && Ee(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function s(a) {
            return u(function (o) {
                return o = +o, u(function (e, t) {
                    for (var n, r = a([], e.length, o), i = r.length; i--;) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function h(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function c() {}

        function m(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function d(s, e, t) {
            var u = e.dir,
                l = e.next,
                c = l || u,
                d = t && "parentNode" === c,
                f = W++;
            return e.first ? function (e, t, n) {
                for (; e = e[u];)
                    if (1 === e.nodeType || d) return s(e, t, n);
                return !1
            } : function (e, t, n) {
                var r, i, o, a = [_, f];
                if (n) {
                    for (; e = e[u];)
                        if ((1 === e.nodeType || d) && s(e, t, n)) return !0
                } else
                    for (; e = e[u];)
                        if (1 === e.nodeType || d)
                            if (i = (o = e[R] || (e[R] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === _ && r[1] === f) return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n)) return !0
                            } return !1
            }
        }

        function f(i) {
            return 1 < i.length ? function (e, t, n) {
                for (var r = i.length; r--;)
                    if (!i[r](e, t, n)) return !1;
                return !0
            } : i[0]
        }

        function v(e, t, n) {
            for (var r = 0, i = t.length; r < i; r++) x(e, t[r], n);
            return n
        }

        function w(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function b(p, h, m, g, y, e) {
            return g && !g[R] && (g = b(g)), y && !y[R] && (y = b(y, e)), u(function (e, t, n, r) {
                var i, o, a, s = [],
                    u = [],
                    l = t.length,
                    c = e || v(h || "*", n.nodeType ? [n] : n, []),
                    d = !p || !e && h ? c : w(c, s, p, n, r),
                    f = m ? y || (e ? p : l || g) ? [] : t : d;
                if (m && m(d, f, n, r), g)
                    for (i = w(f, u), g(i, [], n, r), o = i.length; o--;)(a = i[o]) && (f[u[o]] = !(d[u[o]] = a));
                if (e) {
                    if (y || p) {
                        if (y) {
                            for (i = [], o = f.length; o--;)(a = f[o]) && i.push(d[o] = a);
                            y(null, f = [], i, r)
                        }
                        for (o = f.length; o--;)(a = f[o]) && -1 < (i = y ? ee(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else f = w(f === t ? f.splice(l, f.length) : f), y ? y(null, t, f, r) : K.apply(t, f)
            })
        }

        function p(e) {
            for (var i, t, n, r = e.length, o = C.relative[e[0].type], a = o || C.relative[" "], s = o ? 1 : 0, u = d(function (e) {
                    return e === i
                }, a, !0), l = d(function (e) {
                    return -1 < ee(i, e)
                }, a, !0), c = [function (e, t, n) {
                    var r = !o && (n || t !== L) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null, r
                }]; s < r; s++)
                if (t = C.relative[e[s].type]) c = [d(f(c), t)];
                else {
                    if ((t = C.filter[e[s].type].apply(null, e[s].matches))[R]) {
                        for (n = ++s; n < r && !C.relative[e[n].type]; n++);
                        return b(1 < s && f(c), 1 < s && m(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), t, s < n && p(e.slice(s, n)), n < r && p(e = e.slice(n)), n < r && m(e))
                    }
                    c.push(t)
                } return f(c)
        }

        function g(g, y) {
            var v = 0 < y.length,
                b = 0 < g.length,
                e = function (e, t, n, r, i) {
                    var o, a, s, u = 0,
                        l = "0",
                        c = e && [],
                        d = [],
                        f = L,
                        p = e || b && C.find.TAG("*", i),
                        h = _ += null == f ? 1 : Math.random() || .1,
                        m = p.length;
                    for (i && (L = t === $ || t || i); l !== m && null != (o = p[l]); l++) {
                        if (b && o) {
                            for (a = 0, t || o.ownerDocument === $ || (q(o), n = !H); s = g[a++];)
                                if (s(o, t || $, n)) {
                                    r.push(o);
                                    break
                                } i && (_ = h)
                        }
                        v && ((o = !s && o) && u--, e && c.push(o))
                    }
                    if (u += l, v && l !== u) {
                        for (a = 0; s = y[a++];) s(c, d, t, n);
                        if (e) {
                            if (0 < u)
                                for (; l--;) c[l] || d[l] || (d[l] = Y.call(r));
                            d = w(d)
                        }
                        K.apply(r, d), i && !e && 0 < d.length && 1 < u + y.length && x.uniqueSort(r)
                    }
                    return i && (_ = h, L = f), c
                };
            return v ? u(e) : e
        }
        var y, T, C, E, k, S, j, D, L, N, A, q, $, F, H, P, M, O, I, R = "sizzle" + 1 * new Date,
            B = n.document,
            _ = 0,
            W = 0,
            z = e(),
            U = e(),
            X = e(),
            V = function (e, t) {
                return e === t && (A = !0), 0
            },
            G = {}.hasOwnProperty,
            Q = [],
            Y = Q.pop,
            J = Q.push,
            K = Q.push,
            Z = Q.slice,
            ee = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
            oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            ae = new RegExp(ne + "+", "g"),
            se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ue = new RegExp("^" + ne + "*," + ne + "*"),
            le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(oe),
            fe = new RegExp("^" + re + "$"),
            pe = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re + "|[*])"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + oe),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ve = /[+~]/,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            xe = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            Te = function (e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            Ce = function () {
                q()
            },
            Ee = d(function (e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            K.apply(Q = Z.call(B.childNodes), B.childNodes), Q[B.childNodes.length].nodeType
        } catch (ke) {
            K = {
                apply: Q.length ? function (e, t) {
                    J.apply(e, Z.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        for (y in T = x.support = {}, k = x.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, q = x.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : B;
                return r !== $ && 9 === r.nodeType && r.documentElement && (F = ($ = r).documentElement, H = !k($), B !== $ && (n = $.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), T.attributes = i(function (e) {
                    return e.className = "i", !e.getAttribute("className")
                }), T.getElementsByTagName = i(function (e) {
                    return e.appendChild($.createComment("")), !e.getElementsByTagName("*").length
                }), T.getElementsByClassName = ge.test($.getElementsByClassName), T.getById = i(function (e) {
                    return F.appendChild(e).id = R, !$.getElementsByName || !$.getElementsByName(R).length
                }), T.getById ? (C.filter.ID = function (e) {
                    var t = e.replace(be, xe);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }, C.find.ID = function (e, t) {
                    if ("undefined" != typeof t.getElementById && H) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (C.filter.ID = function (e) {
                    var n = e.replace(be, xe);
                    return function (e) {
                        var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return t && t.value === n
                    }
                }, C.find.ID = function (e, t) {
                    if ("undefined" != typeof t.getElementById && H) {
                        var n, r, i, o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                            for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                        }
                        return []
                    }
                }), C.find.TAG = T.getElementsByTagName ? function (e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
                } : function (e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" !== e) return o;
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }, C.find.CLASS = T.getElementsByClassName && function (e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && H) return t.getElementsByClassName(e)
                }, M = [], P = [], (T.qsa = ge.test($.querySelectorAll)) && (i(function (e) {
                    F.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || P.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + R + "-]").length || P.push("~="), e.querySelectorAll(":checked").length || P.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || P.push(".#.+[+~]")
                }), i(function (e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = $.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && P.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && P.push(":enabled", ":disabled"), F.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
                })), (T.matchesSelector = ge.test(O = F.matches || F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector)) && i(function (e) {
                    T.disconnectedMatch = O.call(e, "*"), O.call(e, "[s!='']:x"), M.push("!=", oe)
                }), P = P.length && new RegExp(P.join("|")), M = M.length && new RegExp(M.join("|")), t = ge.test(F.compareDocumentPosition), I = t || ge.test(F.contains) ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, V = t ? function (e, t) {
                    if (e === t) return A = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === $ || e.ownerDocument === B && I(B, e) ? -1 : t === $ || t.ownerDocument === B && I(B, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
                } : function (e, t) {
                    if (e === t) return A = !0, 0;
                    var n, r = 0,
                        i = e.parentNode,
                        o = t.parentNode,
                        a = [e],
                        s = [t];
                    if (!i || !o) return e === $ ? -1 : t === $ ? 1 : i ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                    if (i === o) return l(e, t);
                    for (n = e; n = n.parentNode;) a.unshift(n);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (; a[r] === s[r];) r++;
                    return r ? l(a[r], s[r]) : a[r] === B ? -1 : s[r] === B ? 1 : 0
                }), $
            }, x.matches = function (e, t) {
                return x(e, null, null, t)
            }, x.matchesSelector = function (e, t) {
                if ((e.ownerDocument || e) !== $ && q(e), t = t.replace(ce, "='$1']"), T.matchesSelector && H && !X[t + " "] && (!M || !M.test(t)) && (!P || !P.test(t))) try {
                    var n = O.call(e, t);
                    if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (ke) {}
                return 0 < x(t, $, null, [e]).length
            }, x.contains = function (e, t) {
                return (e.ownerDocument || e) !== $ && q(e), I(e, t)
            }, x.attr = function (e, t) {
                (e.ownerDocument || e) !== $ && q(e);
                var n = C.attrHandle[t.toLowerCase()],
                    r = n && G.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !H) : undefined;
                return r !== undefined ? r : T.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, x.escape = function (e) {
                return (e + "").replace(we, Te)
            }, x.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, x.uniqueSort = function (e) {
                var t, n = [],
                    r = 0,
                    i = 0;
                if (A = !T.detectDuplicates, N = !T.sortStable && e.slice(0), e.sort(V), A) {
                    for (; t = e[i++];) t === e[i] && (r = n.push(i));
                    for (; r--;) e.splice(n[r], 1)
                }
                return N = null, e
            }, E = x.getText = function (e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r++];) n += E(t);
                return n
            }, (C = x.selectors = {
                cacheLength: 50,
                createPseudo: u,
                match: pe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (
                            e[3] || x.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && x.error(e[0]), e
                    },
                    PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(be, xe).toLowerCase();
                        return "*" === e ? function () {
                            return !0
                        } : function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function (e) {
                        var t = z[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (n, r, i) {
                        return function (e) {
                            var t = x.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(ae, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function (h, e, t, m, g) {
                        var y = "nth" !== h.slice(0, 3),
                            v = "last" !== h.slice(-4),
                            b = "of-type" === e;
                        return 1 === m && 0 === g ? function (e) {
                            return !!e.parentNode
                        } : function (e, t, n) {
                            var r, i, o, a, s, u, l = y !== v ? "nextSibling" : "previousSibling",
                                c = e.parentNode,
                                d = b && e.nodeName.toLowerCase(),
                                f = !n && !b,
                                p = !1;
                            if (c) {
                                if (y) {
                                    for (; l;) {
                                        for (a = e; a = a[l];)
                                            if (b ? a.nodeName.toLowerCase() === d : 1 === a.nodeType) return !1;
                                        u = l = "only" === h && !u && "nextSibling"
                                    }
                                    return !0
                                }
                                if (u = [v ? c.firstChild : c.lastChild], v && f) {
                                    for (p = (s = (r = (i = (o = (a = c)[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === _ && r[1]) && r[2], a = s && c.childNodes[s]; a = ++s && a && a[l] || (p = s = 0) || u.pop();)
                                        if (1 === a.nodeType && ++p && a === e) {
                                            i[h] = [_, s, p];
                                            break
                                        }
                                } else if (f && (p = s = (r = (i = (o = (a = e)[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === _ && r[1]), !1 === p)
                                    for (;
                                        (a = ++s && a && a[l] || (p = s = 0) || u.pop()) && ((b ? a.nodeName.toLowerCase() !== d : 1 !== a.nodeType) || !++p || (f && ((i = (o = a[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [_, p]), a !== e)););
                                return (p -= g) === m || p % m == 0 && 0 <= p / m
                            }
                        }
                    },
                    PSEUDO: function (e, o) {
                        var t, a = C.pseudos[e] || C.setFilters[e.toLowerCase()] || x.error("unsupported pseudo: " + e);
                        return a[R] ? a(o) : 1 < a.length ? (t = [e, e, "", o], C.setFilters.hasOwnProperty(e.toLowerCase()) ? u(function (e, t) {
                            for (var n, r = a(e, o), i = r.length; i--;) e[n = ee(e, r[i])] = !(t[n] = r[i])
                        }) : function (e) {
                            return a(e, 0, t)
                        }) : a
                    }
                },
                pseudos: {
                    not: u(function (e) {
                        var r = [],
                            i = [],
                            s = j(e.replace(se, "$1"));
                        return s[R] ? u(function (e, t, n, r) {
                            for (var i, o = s(e, null, r, []), a = e.length; a--;)(i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function (e, t, n) {
                            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                        }
                    }),
                    has: u(function (t) {
                        return function (e) {
                            return 0 < x(t, e).length
                        }
                    }),
                    contains: u(function (t) {
                        return t = t.replace(be, xe),
                            function (e) {
                                return -1 < (e.textContent || e.innerText || E(e)).indexOf(t)
                            }
                    }),
                    lang: u(function (n) {
                        return fe.test(n || "") || x.error("unsupported lang: " + n), n = n.replace(be, xe).toLowerCase(),
                            function (e) {
                                var t;
                                do {
                                    if (t = H ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function (e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function (e) {
                        return e === F
                    },
                    focus: function (e) {
                        return e === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: a(!1),
                    disabled: a(!0),
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function (e) {
                        return !C.pseudos.empty(e)
                    },
                    header: function (e) {
                        return me.test(e.nodeName)
                    },
                    input: function (e) {
                        return he.test(e.nodeName)
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: s(function () {
                        return [0]
                    }),
                    last: s(function (e, t) {
                        return [t - 1]
                    }),
                    eq: s(function (e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: s(function (e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: s(function (e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: s(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: s(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = C.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) C.pseudos[y] = r(y);
        for (y in {
                submit: !0,
                reset: !0
            }) C.pseudos[y] = o(y);
        return c.prototype = C.filters = C.pseudos, C.setFilters = new c, S = x.tokenize = function (e, t) {
            var n, r, i, o, a, s, u, l = U[e + " "];
            if (l) return t ? 0 : l.slice(0);
            for (a = e, s = [], u = C.preFilter; a;) {
                for (o in n && !(r = ue.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = le.exec(a)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace(se, " ")
                    }), a = a.slice(n.length)), C.filter) !(r = pe[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? x.error(e) : U(e, s).slice(0)
        }, j = x.compile = function (e, t) {
            var n, r = [],
                i = [],
                o = X[e + " "];
            if (!o) {
                for (t || (t = S(e)), n = t.length; n--;)(o = p(t[n]))[R] ? r.push(o) : i.push(o);
                (o = X(e, g(i, r))).selector = e
            }
            return o
        }, D = x.select = function (e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e,
                c = !r && S(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && H && C.relative[o[1].type]) {
                    if (!(t = (C.find.ID(a.matches[0].replace(be, xe), t) || [])[0])) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !C.relative[s = a.type]);)
                    if ((u = C.find[s]) && (r = u(a.matches[0].replace(be, xe), ve.test(o[0].type) && h(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && m(o))) return K.apply(n, r), n;
                        break
                    }
            }
            return (l || j(e, c))(r, t, !H, n, !t || ve.test(e) && h(t.parentNode) || t), n
        }, T.sortStable = R.split("").sort(V).join("") === R, T.detectDuplicates = !!A, q(), T.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition($.createElement("fieldset"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || t("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), T.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || t("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || t(te, function (e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), x
    }(E);
    me.find = xe, me.expr = xe.selectors, me.expr[":"] = me.expr.pseudos, me.uniqueSort = me.unique = xe.uniqueSort, me.text = xe.getText, me.isXMLDoc = xe.isXML, me.contains = xe.contains, me.escapeSelector = xe.escape;
    var we = function (e, t, n) {
            for (var r = [], i = n !== undefined;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && me(e).is(n)) break;
                    r.push(e)
                } return r
        },
        Te = function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        Ce = me.expr.match.needsContext,
        Ee = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        ke = /^.[^:#\[\.,]*$/;
    me.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? me.find.matchesSelector(r, e) ? [r] : [] : me.find.matches(e, me.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, me.fn.extend({
        find: function (e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(me(e).filter(function () {
                for (t = 0; t < r; t++)
                    if (me.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) me.find(e, i[t], n);
            return 1 < r ? me.uniqueSort(n) : n
        },
        filter: function (e) {
            return this.pushStack(t(this, e || [], !1))
        },
        not: function (e) {
            return this.pushStack(t(this, e || [], !0))
        },
        is: function (e) {
            return !!t(this, "string" == typeof e && Ce.test(e) ? me(e) : e || [], !1).length
        }
    });
    var Se, je = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (me.fn.init = function (e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || Se, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : me.isFunction(e) ? n.ready !== undefined ? n.ready(e) : e(me) : me.makeArray(e, this);
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : je.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
            if (t = t instanceof me ? t[0] : t, me.merge(this, me.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ne, !0)), Ee.test(r[1]) && me.isPlainObject(t))
                for (r in t) me.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
        }
        return (i = ne.getElementById(r[2])) && (this[0] = i, this.length = 1), this
    }).prototype = me.fn, Se = me(ne);
    var De = /^(?:parents|prev(?:Until|All))/,
        Le = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    me.fn.extend({
        has: function (e) {
            var t = me(e, this),
                n = t.length;
            return this.filter(function () {
                for (var e = 0; e < n; e++)
                    if (me.contains(this, t[e])) return !0
            })
        },
        closest: function (e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && me(e);
            if (!Ce.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && me.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? me.uniqueSort(o) : o)
        },
        index: function (e) {
            return e ? "string" == typeof e ? se.call(me(e), this[0]) : se.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            return this.pushStack(me.uniqueSort(me.merge(this.get(), me(e, t))))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), me.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return we(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return we(e, "parentNode", n)
        },
        next: function (e) {
            return n(e, "nextSibling")
        },
        prev: function (e) {
            return n(e, "previousSibling")
        },
        nextAll: function (e) {
            return we(e, "nextSibling")
        },
        prevAll: function (e) {
            return we(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return we(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return we(e, "previousSibling", n)
        },
        siblings: function (e) {
            return Te((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return Te(e.firstChild)
        },
        contents: function (e) {
            return l(e, "iframe") ? e.contentDocument : (l(e, "template") && (e = e.content || e), me.merge([], e.childNodes))
        }
    }, function (r, i) {
        me.fn[r] = function (e, t) {
            var n = me.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = me.filter(t, n)), 1 < this.length && (Le[r] || me.uniqueSort(n), De.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var Ne = /[^\x20\t\r\n\f]+/g;
    me.Callbacks = function (r) {
        r = "string" == typeof r ? c(r) : me.extend({}, r);
        var i, e, t, n, o = [],
            a = [],
            s = -1,
            u = function () {
                for (n = n || r.once, t = i = !0; a.length; s = -1)
                    for (e = a.shift(); ++s < o.length;) !1 === o[s].apply(e[0], e[1]) && r.stopOnFalse && (s = o.length, e = !1);
                r.memory || (e = !1), i = !1, n && (o = e ? [] : "")
            },
            l = {
                add: function () {
                    return o && (e && !i && (s = o.length - 1, a.push(e)), function n(e) {
                        me.each(e, function (e, t) {
                            me.isFunction(t) ? r.unique && l.has(t) || o.push(t) : t && t.length && "string" !== me.type(t) && n(t)
                        })
                    }(arguments), e && !i && u()), this
                },
                remove: function () {
                    return me.each(arguments, function (e, t) {
                        for (var n; - 1 < (n = me.inArray(t, o, n));) o.splice(n, 1), n <= s && s--
                    }), this
                },
                has: function (e) {
                    return e ? -1 < me.inArray(e, o) : 0 < o.length
                },
                empty: function () {
                    return o && (o = []), this
                },
                disable: function () {
                    return n = a = [], o = e = "", this
                },
                disabled: function () {
                    return !o
                },
                lock: function () {
                    return n = a = [], e || i || (o = e = ""), this
                },
                locked: function () {
                    return !!n
                },
                fireWith: function (e, t) {
                    return n || (t = [e, (t = t || []).slice ? t.slice() : t], a.push(t), i || u()), this
                },
                fire: function () {
                    return l.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!t
                }
            };
        return l
    }, me.extend({
        Deferred: function (e) {
            var o = [
                    ["notify", "progress", me.Callbacks("memory"), me.Callbacks("memory"), 2],
                    ["resolve", "done", me.Callbacks("once memory"), me.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", me.Callbacks("once memory"), me.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function () {
                        return i
                    },
                    always: function () {
                        return s.done(arguments).fail(arguments), this
                    },
                    "catch": function (e) {
                        return a.then(null, e)
                    },
                    pipe: function () {
                        var i = arguments;
                        return me.Deferred(function (r) {
                            me.each(o, function (e, t) {
                                var n = me.isFunction(i[t[4]]) && i[t[4]];
                                s[t[1]](function () {
                                    var e = n && n.apply(this, arguments);
                                    e && me.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function (t, n, r) {
                        function l(o, a, s, u) {
                            return function () {
                                var n = this,
                                    r = arguments,
                                    t = function () {
                                        var e, t;
                                        if (!(o < c)) {
                                            if ((e = s.apply(n, r)) === a.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, me.isFunction(t) ? u ? t.call(e, l(c, a, d, u), l(c, a, f, u)) : (c++, t.call(e, l(c, a, d, u), l(c, a, f, u), l(c, a, d, a.notifyWith))) : (s !== d && (n = undefined, r = [e]), (u || a.resolveWith)(n, r))
                                        }
                                    },
                                    i = u ? t : function () {
                                        try {
                                            t()
                                        } catch (e) {
                                            me.Deferred.exceptionHook && me.Deferred.exceptionHook(e, i.stackTrace), c <= o + 1 && (s !== f && (n = undefined, r = [e]), a.rejectWith(n, r))
                                        }
                                    };
                                o ? i() : (me.Deferred.getStackHook && (i.stackTrace = me.Deferred.getStackHook()), E.setTimeout(i))
                            }
                        }
                        var c = 0;
                        return me.Deferred(function (e) {
                            o[0][3].add(l(0, e, me.isFunction(r) ? r : d, e.notifyWith)), o[1][3].add(l(0, e, me.isFunction(t) ? t : d)), o[2][3].add(l(0, e, me.isFunction(n) ? n : f))
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? me.extend(e, a) : a
                    }
                },
                s = {};
            return me.each(o, function (e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function () {
                    i = r
                }, o[3 - e][2].disable, o[0][2].lock), n.add(t[3].fire), s[t[0]] = function () {
                    return s[t[0] + "With"](this === s ? undefined : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function (e) {
            var n = arguments.length,
                t = n,
                r = Array(t),
                i = ie.call(arguments),
                o = me.Deferred(),
                a = function (t) {
                    return function (e) {
                        r[t] = this, i[t] = 1 < arguments.length ? ie.call(arguments) : e, --n || o.resolveWith(r, i)
                    }
                };
            if (n <= 1 && (u(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || me.isFunction(i[t] && i[t].then))) return o.then();
            for (; t--;) u(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var Ae = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    me.Deferred.exceptionHook = function (e, t) {
        E.console && E.console.warn && e && Ae.test(e.name) && E.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, me.readyException = function (e) {
        E.setTimeout(function () {
            throw e
        })
    };
    var qe = me.Deferred();
    me.fn.ready = function (e) {
        return qe.then(e)["catch"](function (e) {
            me.readyException(e)
        }), this
    }, me.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
            (!0 === e ? --me.readyWait : me.isReady) || (me.isReady = !0) !== e && 0 < --me.readyWait || qe.resolveWith(ne, [me])
        }
    }), me.ready.then = qe.then, "complete" === ne.readyState || "loading" !== ne.readyState && !ne.documentElement.doScroll ? E.setTimeout(me.ready) : (ne.addEventListener("DOMContentLoaded", r), E.addEventListener("load", r));
    var $e = function (e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === me.type(n))
                for (s in i = !0, n) $e(e, t, s, n[s], !0, o, a);
            else if (r !== undefined && (i = !0, me.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                    return l.call(me(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        Fe = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    i.uid = 1, i.prototype = {
        cache: function (e) {
            var t = e[this.expando];
            return t || (t = {}, Fe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function (e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[me.camelCase(t)] = n;
            else
                for (r in t) i[me.camelCase(r)] = t[r];
            return i
        },
        get: function (e, t) {
            return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][me.camelCase(t)]
        },
        access: function (e, t, n) {
            return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function (e, t) {
            var n, r = e[this.expando];
            if (r !== undefined) {
                if (t !== undefined) {
                    n = (t = Array.isArray(t) ? t.map(me.camelCase) : (t = me.camelCase(t)) in r ? [t] : t.match(Ne) || []).length;
                    for (; n--;) delete r[t[n]]
                }(t === undefined || me.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = undefined : delete e[this.expando])
            }
        },
        hasData: function (e) {
            var t = e[this.expando];
            return t !== undefined && !me.isEmptyObject(t)
        }
    };
    var He = new i,
        Pe = new i,
        Me = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Oe = /[A-Z]/g;
    me.extend({
        hasData: function (e) {
            return Pe.hasData(e) || He.hasData(e)
        },
        data: function (e, t, n) {
            return Pe.access(e, t, n)
        },
        removeData: function (e, t) {
            Pe.remove(e, t)
        },
        _data: function (e, t, n) {
            return He.access(e, t, n)
        },
        _removeData: function (e, t) {
            He.remove(e, t)
        }
    }), me.fn.extend({
        data: function (n, e) {
            var t, r, i, o = this[0],
                a = o && o.attributes;
            if (n !== undefined) return "object" == typeof n ? this.each(function () {
                Pe.set(this, n)
            }) : $e(this, function (e) {
                var t;
                if (o && e === undefined) return (t = Pe.get(o, n)) !== undefined ? t : (t = p(o, n)) !== undefined ? t : void 0;
                this.each(function () {
                    Pe.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (i = Pe.get(o), 1 === o.nodeType && !He.get(o, "hasDataAttrs"))) {
                for (t = a.length; t--;) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = me.camelCase(r.slice(5)), p(o, r, i[r]));
                He.set(o, "hasDataAttrs", !0)
            }
            return i
        },
        removeData: function (e) {
            return this.each(function () {
                Pe.remove(this, e)
            })
        }
    }), me.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = He.get(e, t), n && (!r || Array.isArray(n) ? r = He.access(e, t, me.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = me.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = me._queueHooks(e, t),
                a = function () {
                    me.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return He.get(e, n) || He.access(e, n, {
                empty: me.Callbacks("once memory").add(function () {
                    He.remove(e, [t + "queue", n])
                })
            })
        }
    }), me.fn.extend({
        queue: function (t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? me.queue(this[0], t) : n === undefined ? this : this.each(function () {
                var e = me.queue(this, t, n);
                me._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && me.dequeue(this, t)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                me.dequeue(this, e)
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, t) {
            var n, r = 1,
                i = me.Deferred(),
                o = this,
                a = this.length,
                s = function () {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; a--;)(n = He.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var Ie = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Re = new RegExp("^(?:([+-])=|)(" + Ie + ")([a-z%]*)$", "i"),
        Be = ["Top", "Right", "Bottom", "Left"],
        _e = function (e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && me.contains(e.ownerDocument, e) && "none" === me.css(e, "display")
        },
        We = function (e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.apply(e, r || []), t) e.style[o] = a[o];
            return i
        },
        ze = {};
    me.fn.extend({
        show: function () {
            return y(this, !0)
        },
        hide: function () {
            return y(this)
        },
        toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                _e(this) ? me(this).show() : me(this).hide()
            })
        }
    });
    var Ue = /^(?:checkbox|radio)$/i,
        Xe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ve = /^$|\/(?:java|ecma)script/i,
        Ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td;
    var Qe, Ye, Je = /<|&#?\w+;/;
    Qe = ne.createDocumentFragment().appendChild(ne.createElement("div")), (Ye = ne.createElement("input")).setAttribute("type", "radio"), Ye.setAttribute("checked", "checked"), Ye.setAttribute("name", "t"), Qe.appendChild(Ye), pe.checkClone = Qe.cloneNode(!0).cloneNode(!0).lastChild.checked, Qe.innerHTML = "<textarea>x</textarea>", pe.noCloneChecked = !!Qe.cloneNode(!0).lastChild.defaultValue;
    var Ke = ne.documentElement,
        Ze = /^key/,
        et = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        tt = /^([^.]*)(?:\.(.+)|)/;
    me.event = {
        global: {},
        add: function (t, e, n, r, i) {
            var o, a, s, u, l, c, d, f, p, h, m, g = He.get(t);
            if (g)
                for (n.handler && (n = (o = n).handler, i = o.selector), i && me.find.matchesSelector(Ke, i), n.guid || (n.guid = me.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function (e) {
                        return void 0 !== me && me.event.triggered !== e.type ? me.event.dispatch.apply(t, arguments) : undefined
                    }), l = (e = (e || "").match(Ne) || [""]).length; l--;) p = m = (s = tt.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (d = me.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = me.event.special[p] || {}, c = me.extend({
                    type: p,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && me.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (f = u[p]) || ((f = u[p] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)), d.add && (d.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), me.event.global[p] = !0)
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, u, l, c, d, f, p, h, m, g = He.hasData(e) && He.get(e);
            if (g && (u = g.events)) {
                for (l = (t = (t || "").match(Ne) || [""]).length; l--;)
                    if (p = m = (s = tt.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                        for (d = me.event.special[p] || {}, f = u[p = (r ? d.delegateType : d.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) c = f[o], !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
                        a && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || me.removeEvent(e, p, g.handle), delete u[p])
                    } else
                        for (p in u) me.event.remove(e, p + t[l], n, r, !0);
                me.isEmptyObject(u) && He.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            var t, n, r, i, o, a, s = me.event.fix(e),
                u = new Array(arguments.length),
                l = (He.get(this, "events") || {})[s.type] || [],
                c = me.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = me.event.handlers.call(this, s, l), t = 0;
                    (i = a[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, (r = ((me.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) !== undefined && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s), s.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) a[i = (r = t[n]).selector + " "] === undefined && (a[i] = r.needsContext ? -1 < me(i, this).index(l) : me.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function (t, e) {
            Object.defineProperty(me.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: me.isFunction(e) ? function () {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function () {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function (e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function (e) {
            return e[me.expando] ? e : new me.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== T() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === T() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && l(this, "input")) return this.click(), !1
                },
                _default: function (e) {
                    return l(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, me.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, me.Event = function (e, t) {
        if (!(this instanceof me.Event)) return new me.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? a : w, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && me.extend(this, t), this.timeStamp = e && e.timeStamp || me.now(), this[me.expando] = !0
    }, me.Event.prototype = {
        constructor: me.Event,
        isDefaultPrevented: w,
        isPropagationStopped: w,
        isImmediatePropagationStopped: w,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = a, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = a, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = a, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, me.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (e) {
            var t = e.button;
            return null == e.which && Ze.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && t !== undefined && et.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, me.event.addProp), me.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, o) {
        me.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function (e) {
                var t, n = this,
                    r = e.relatedTarget,
                    i = e.handleObj;
                return r && (r === n || me.contains(n, r)) || (e.type = i.origType, t = i.handler.apply(this, arguments), e.type = o), t
            }
        }
    }), me.fn.extend({
        on: function (e, t, n, r) {
            return C(this, e, t, n, r)
        },
        one: function (e, t, n, r) {
            return C(this, e, t, n, r, 1)
        },
        off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, me(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = w), this.each(function () {
                me.event.remove(this, e, n, t)
            });
            for (i in e) this.off(i, t, e[i]);
            return this
        }
    });
    var nt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        rt = /<script|<style|<link/i,
        it = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ot = /^true\/(.*)/,
        at = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    me.extend({
        htmlPrefilter: function (e) {
            return e.replace(nt, "<$1></$2>")
        },
        clone: function (e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = me.contains(e.ownerDocument, e);
            if (!(pe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || me.isXMLDoc(e)))
                for (a = v(s), r = 0, i = (o = v(e)).length; r < i; r++) L(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || v(e), a = a || v(s), r = 0, i = o.length; r < i; r++) D(o[r], a[r]);
                else D(e, s);
            return 0 < (a = v(s, "script")).length && b(a, !u && v(e, "script")), s
        },
        cleanData: function (e) {
            for (var t, n, r, i = me.event.special, o = 0;
                (n = e[o]) !== undefined; o++)
                if (Fe(n)) {
                    if (t = n[He.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? me.event.remove(n, r) : me.removeEvent(n, r, t.handle);
                        n[He.expando] = undefined
                    }
                    n[Pe.expando] && (n[Pe.expando] = undefined)
                }
        }
    }), me.fn.extend({
        detach: function (e) {
            return A(this, e, !0)
        },
        remove: function (e) {
            return A(this, e)
        },
        text: function (e) {
            return $e(this, function (e) {
                return e === undefined ? me.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function () {
            return N(this, arguments, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || k(this, e).appendChild(e)
            })
        },
        prepend: function () {
            return N(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = k(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function () {
            return N(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return N(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (me.cleanData(v(e, !1)), e.textContent = "");
            return this
        },
        clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return me.clone(this, e, t)
            })
        },
        html: function (e) {
            return $e(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !rt.test(e) && !Ge[(Xe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = me.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (me.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function () {
            var n = [];
            return N(this, arguments, function (e) {
                var t = this.parentNode;
                me.inArray(this, n) < 0 && (me.cleanData(v(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), me.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, a) {
        me.fn[e] = function (e) {
            for (var t, n = [], r = me(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), me(r[o])[a](t), ae.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var st = /^margin/,
        ut = new RegExp("^(" + Ie + ")(?!px)[a-z%]+$", "i"),
        lt = function (e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = E), t.getComputedStyle(e)
        };
    ! function () {
        function e() {
            if (a) {
                a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Ke.appendChild(o);
                var e = E.getComputedStyle(a);
                t = "1%" !== e.top, i = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", r = "4px" === e.marginRight, Ke.removeChild(o), a = null
            }
        }
        var t, n, r, i, o = ne.createElement("div"),
            a = ne.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", pe.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(a), me.extend(pe, {
            pixelPosition: function () {
                return e(), t
            },
            boxSizingReliable: function () {
                return e(), n
            },
            pixelMarginRight: function () {
                return e(), r
            },
            reliableMarginLeft: function () {
                return e(), i
            }
        }))
    }();
    var ct = /^(none|table(?!-c[ea]).+)/,
        dt = /^--/,
        ft = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        pt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ht = ["Webkit", "Moz", "ms"],
        mt = ne.createElement("div").style;
    me.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = q(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = me.camelCase(t),
                    u = dt.test(t),
                    l = e.style;
                if (u || (t = H(s)), a = me.cssHooks[t] || me.cssHooks[s], n === undefined) return a && "get" in a && (i = a.get(e, !1, r)) !== undefined ? i : l[t];
                "string" === (o = typeof n) && (i = Re.exec(n)) && i[1] && (n = h(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (me.cssNumber[s] ? "" : "px")), pe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && (n = a.set(e, n, r)) === undefined || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = me.camelCase(t);
            return dt.test(t) || (t = H(s)), (a = me.cssHooks[t] || me.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), i === undefined && (i = q(e, t, r)), "normal" === i && t in pt && (i = pt[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), me.each(["height", "width"], function (e, a) {
        me.cssHooks[a] = {
            get: function (e, t, n) {
                if (t) return !ct.test(me.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? O(e, a, n) : We(e, ft, function () {
                    return O(e, a, n)
                })
            },
            set: function (e, t, n) {
                var r, i = n && lt(e),
                    o = n && M(e, a, n, "border-box" === me.css(e, "boxSizing", !1, i), i);
                return o && (r = Re.exec(t)) && "px" !== (r[3] || "px") && (e.style[a] = t, t = me.css(e, a)), P(e, t, o)
            }
        }
    }), me.cssHooks.marginLeft = $(pe.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(q(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
            marginLeft: 0
        }, function () {
            return e.getBoundingClientRect().left
        })) + "px"
    }), me.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (i, o) {
        me.cssHooks[i + o] = {
            expand: function (e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Be[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, st.test(i) || (me.cssHooks[i + o].set = P)
    }), me.fn.extend({
        css: function (e, t) {
            return $e(this, function (e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = lt(e), i = t.length; a < i; a++) o[t[a]] = me.css(e, t[a], !1, r);
                    return o
                }
                return n !== undefined ? me.style(e, t, n) : me.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), (me.Tween = I).prototype = {
        constructor: I,
        init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || me.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (me.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = I.propHooks[this.prop];
            return this.options.duration ? this.pos = t = me.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (
                this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = me.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function (e) {
                me.fx.step[e.prop] ? me.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[me.cssProps[e.prop]] && !me.cssHooks[e.prop] ? e.elem[e.prop] = e.now : me.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, me.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, me.fx = I.prototype.init, me.fx.step = {};
    var gt, yt, vt, bt, xt = /^(?:toggle|show|hide)$/,
        wt = /queueHooks$/;
    me.Animation = me.extend(X, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return h(n.elem, e, Re.exec(t), n), n
            }]
        },
        tweener: function (e, t) {
            me.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ne);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], X.tweeners[n] = X.tweeners[n] || [], X.tweeners[n].unshift(t)
        },
        prefilters: [z],
        prefilter: function (e, t) {
            t ? X.prefilters.unshift(e) : X.prefilters.push(e)
        }
    }), me.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? me.extend({}, e) : {
            complete: n || !n && t || me.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !me.isFunction(t) && t
        };
        return me.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in me.fx.speeds ? r.duration = me.fx.speeds[r.duration] : r.duration = me.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            me.isFunction(r.old) && r.old.call(this), r.queue && me.dequeue(this, r.queue)
        }, r
    }, me.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(_e).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (t, e, n, r) {
            var i = me.isEmptyObject(t),
                o = me.speed(e, n, r),
                a = function () {
                    var e = X(this, me.extend({}, t), o);
                    (i || He.get(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function (i, e, o) {
            var a = function (e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = undefined), e && !1 !== i && this.queue(i || "fx", []), this.each(function () {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = me.timers,
                    r = He.get(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && wt.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || me.dequeue(this, i)
            })
        },
        finish: function (a) {
            return !1 !== a && (a = a || "fx"), this.each(function () {
                var e, t = He.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = me.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, me.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), me.each(["toggle", "show", "hide"], function (e, r) {
        var i = me.fn[r];
        me.fn[r] = function (e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(_(r, !0), e, t, n)
        }
    }), me.each({
        slideDown: _("show"),
        slideUp: _("hide"),
        slideToggle: _("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, r) {
        me.fn[e] = function (e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), me.timers = [], me.fx.tick = function () {
        var e, t = 0,
            n = me.timers;
        for (gt = me.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || me.fx.stop(), gt = undefined
    }, me.fx.timer = function (e) {
        me.timers.push(e), me.fx.start()
    }, me.fx.interval = 13, me.fx.start = function () {
        yt || (yt = !0, R())
    }, me.fx.stop = function () {
        yt = null
    }, me.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, me.fn.delay = function (r, e) {
        return r = me.fx && me.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
            var n = E.setTimeout(e, r);
            t.stop = function () {
                E.clearTimeout(n)
            }
        })
    }, vt = ne.createElement("input"), bt = ne.createElement("select").appendChild(ne.createElement("option")), vt.type = "checkbox", pe.checkOn = "" !== vt.value, pe.optSelected = bt.selected, (vt = ne.createElement("input")).value = "t", vt.type = "radio", pe.radioValue = "t" === vt.value;
    var Tt, Ct = me.expr.attrHandle;
    me.fn.extend({
        attr: function (e, t) {
            return $e(this, me.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function (e) {
            return this.each(function () {
                me.removeAttr(this, e)
            })
        }
    }), me.extend({
        attr: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? me.prop(e, t, n) : (1 === o && me.isXMLDoc(e) || (i = me.attrHooks[t.toLowerCase()] || (me.expr.match.bool.test(t) ? Tt : undefined)), n !== undefined ? null === n ? void me.removeAttr(e, t) : i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = me.find.attr(e, t)) ? undefined : r)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!pe.radioValue && "radio" === t && l(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function (e, t) {
            var n, r = 0,
                i = t && t.match(Ne);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];) e.removeAttribute(n)
        }
    }), Tt = {
        set: function (e, t, n) {
            return !1 === t ? me.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, me.each(me.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var a = Ct[t] || me.find.attr;
        Ct[t] = function (e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = Ct[o], Ct[o] = r, r = null != a(e, t, n) ? o : null, Ct[o] = i), r
        }
    });
    var Et = /^(?:input|select|textarea|button)$/i,
        kt = /^(?:a|area)$/i;
    me.fn.extend({
        prop: function (e, t) {
            return $e(this, me.prop, e, t, 1 < arguments.length)
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[me.propFix[e] || e]
            })
        }
    }), me.extend({
        prop: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && me.isXMLDoc(e) || (t = me.propFix[t] || t, i = me.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = me.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || kt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), pe.optSelected || (me.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), me.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        me.propFix[this.toLowerCase()] = this
    }), me.fn.extend({
        addClass: function (t) {
            var e, n, r, i, o, a, s, u = 0;
            if (me.isFunction(t)) return this.each(function (e) {
                me(this).addClass(t.call(this, e, G(this)))
            });
            if ("string" == typeof t && t)
                for (e = t.match(Ne) || []; n = this[u++];)
                    if (i = G(n), r = 1 === n.nodeType && " " + V(i) + " ") {
                        for (a = 0; o = e[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = V(r)) && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function (t) {
            var e, n, r, i, o, a, s, u = 0;
            if (me.isFunction(t)) return this.each(function (e) {
                me(this).removeClass(t.call(this, e, G(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(Ne) || []; n = this[u++];)
                    if (i = G(n), r = 1 === n.nodeType && " " + V(i) + " ") {
                        for (a = 0; o = e[a++];)
                            for (; - 1 < r.indexOf(" " + o + " ");) r = r.replace(" " + o + " ", " ");
                        i !== (s = V(r)) && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function (i, t) {
            var o = typeof i;
            return "boolean" == typeof t && "string" === o ? t ? this.addClass(i) : this.removeClass(i) : me.isFunction(i) ? this.each(function (e) {
                me(this).toggleClass(i.call(this, e, G(this), t), t)
            }) : this.each(function () {
                var e, t, n, r;
                if ("string" === o)
                    for (t = 0, n = me(this), r = i.match(Ne) || []; e = r[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else i !== undefined && "boolean" !== o || ((e = G(this)) && He.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : He.get(this, "__className__") || ""))
            })
        },
        hasClass: function (e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && -1 < (" " + V(G(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var St = /\r/g;
    me.fn.extend({
        val: function (n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = me.isFunction(n), this.each(function (e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, me(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = me.map(t, function (e) {
                    return null == e ? "" : e + ""
                })), (r = me.valHooks[this.type] || me.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, t, "value") !== undefined || (this.value = t))
            })) : t ? (r = me.valHooks[t.type] || me.valHooks[t.nodeName.toLowerCase()]) && "get" in r && (e = r.get(t, "value")) !== undefined ? e : "string" == typeof (e = t.value) ? e.replace(St, "") : null == e ? "" : e : void 0
        }
    }), me.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = me.find.attr(e, "value");
                    return null != t ? t : V(me.text(e))
                }
            },
            select: {
                get: function (e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !l(n.parentNode, "optgroup"))) {
                            if (t = me(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function (e, t) {
                    for (var n, r, i = e.options, o = me.makeArray(t), a = i.length; a--;)((r = i[a]).selected = -1 < me.inArray(me.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), me.each(["radio", "checkbox"], function () {
        me.valHooks[this] = {
            set: function (e, t) {
                if (Array.isArray(t)) return e.checked = -1 < me.inArray(me(e).val(), t)
            }
        }, pe.checkOn || (me.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var jt = /^(?:focusinfocus|focusoutblur)$/;
    me.extend(me.event, {
        trigger: function (e, t, n, r) {
            var i, o, a, s, u, l, c, d = [n || ne],
                f = ce.call(e, "type") ? e.type : e,
                p = ce.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = a = n = n || ne, 3 !== n.nodeType && 8 !== n.nodeType && !jt.test(f + me.event.triggered) && (-1 < f.indexOf(".") && (f = (p = f.split(".")).shift(), p.sort()), u = f.indexOf(":") < 0 && "on" + f, (e = e[me.expando] ? e : new me.Event(f, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = null == t ? [e] : me.makeArray(t, [e]), c = me.event.special[f] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !me.isWindow(n)) {
                    for (s = c.delegateType || f, jt.test(s + f) || (o = o.parentNode); o; o = o.parentNode) d.push(o), a = o;
                    a === (n.ownerDocument || ne) && d.push(a.defaultView || a.parentWindow || E)
                }
                for (i = 0;
                    (o = d[i++]) && !e.isPropagationStopped();) e.type = 1 < i ? s : c.bindType || f, (l = (He.get(o, "events") || {})[e.type] && He.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && Fe(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = f, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !Fe(n) || u && me.isFunction(n[f]) && !me.isWindow(n) && ((a = n[u]) && (n[u] = null), n[me.event.triggered = f](), me.event.triggered = undefined, a && (n[u] = a)), e.result
            }
        },
        simulate: function (e, t, n) {
            var r = me.extend(new me.Event, n, {
                type: e,
                isSimulated: !0
            });
            me.event.trigger(r, null, t)
        }
    }), me.fn.extend({
        trigger: function (e, t) {
            return this.each(function () {
                me.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return me.event.trigger(e, t, n, !0)
        }
    }), me.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
        me.fn[n] = function (e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), me.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), pe.focusin = "onfocusin" in E, pe.focusin || me.each({
        focus: "focusin",
        blur: "focusout"
    }, function (n, r) {
        var i = function (e) {
            me.event.simulate(r, e.target, me.event.fix(e))
        };
        me.event.special[r] = {
            setup: function () {
                var e = this.ownerDocument || this,
                    t = He.access(e, r);
                t || e.addEventListener(n, i, !0), He.access(e, r, (t || 0) + 1)
            },
            teardown: function () {
                var e = this.ownerDocument || this,
                    t = He.access(e, r) - 1;
                t ? He.access(e, r, t) : (e.removeEventListener(n, i, !0), He.remove(e, r))
            }
        }
    });
    var Dt = E.location,
        Lt = me.now(),
        Nt = /\?/;
    me.parseXML = function (e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new E.DOMParser).parseFromString(e, "text/xml")
        } catch (n) {
            t = undefined
        }
        return t && !t.getElementsByTagName("parsererror").length || me.error("Invalid XML: " + e), t
    };
    var At = /\[\]$/,
        qt = /\r?\n/g,
        $t = /^(?:submit|button|image|reset|file)$/i,
        Ft = /^(?:input|select|textarea|keygen)/i;
    me.param = function (e, t) {
        var n, r = [],
            i = function (e, t) {
                var n = me.isFunction(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !me.isPlainObject(e)) me.each(e, function () {
            i(this.name, this.value)
        });
        else
            for (n in e) Q(n, e[n], t, i);
        return r.join("&")
    }, me.fn.extend({
        serialize: function () {
            return me.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = me.prop(this, "elements");
                return e ? me.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !me(this).is(":disabled") && Ft.test(this.nodeName) && !$t.test(e) && (this.checked || !Ue.test(e))
            }).map(function (e, t) {
                var n = me(this).val();
                return null == n ? null : Array.isArray(n) ? me.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(qt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(qt, "\r\n")
                }
            }).get()
        }
    });
    var Ht = /%20/g,
        Pt = /#.*$/,
        Mt = /([?&])_=[^&]*/,
        Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        It = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Rt = /^(?:GET|HEAD)$/,
        Bt = /^\/\//,
        _t = {},
        Wt = {},
        zt = "*/".concat("*"),
        Ut = ne.createElement("a");
    Ut.href = Dt.href, me.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Dt.href,
            type: "GET",
            isLocal: It.test(Dt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": me.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? K(K(e, me.ajaxSettings), t) : K(me.ajaxSettings, e)
        },
        ajaxPrefilter: Y(_t),
        ajaxTransport: Y(Wt),
        ajax: function (e, t) {
            function n(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0, p && E.clearTimeout(p), c = undefined, f = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = Z(g, T, n)), s = ee(g, s, T, i), i ? (g.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (me.lastModified[d] = u), (u = T.getResponseHeader("etag")) && (me.etag[d] = u)), 204 === e || "HEAD" === g.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? b.resolveWith(y, [o, l, T]) : b.rejectWith(y, [T, l, a]), T.statusCode(w), w = undefined, m && v.trigger(i ? "ajaxSuccess" : "ajaxError", [T, g, i ? o : a]), x.fireWith(y, [T, l]), m && (v.trigger("ajaxComplete", [T, g]), --me.active || me.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var c, d, f, r, p, i, h, m, o, a, g = me.ajaxSetup({}, t),
                y = g.context || g,
                v = g.context && (y.nodeType || y.jquery) ? me(y) : me.event,
                b = me.Deferred(),
                x = me.Callbacks("once memory"),
                w = g.statusCode || {},
                s = {},
                u = {},
                l = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (h) {
                            if (!r)
                                for (r = {}; t = Ot.exec(f);) r[t[1].toLowerCase()] = t[2];
                            t = r[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return h ? f : null
                    },
                    setRequestHeader: function (e, t) {
                        return null == h && (e = u[e.toLowerCase()] = u[e.toLowerCase()] || e, s[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return null == h && (g.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (h) T.always(e[T.status]);
                            else
                                for (t in e) w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function (e) {
                        var t = e || l;
                        return c && c.abort(t), n(0, t), this
                    }
                };
            if (b.promise(T), g.url = ((e || g.url || Dt.href) + "").replace(Bt, Dt.protocol + "//"), g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(Ne) || [""], null == g.crossDomain) {
                i = ne.createElement("a");
                try {
                    i.href = g.url, i.href = i.href, g.crossDomain = Ut.protocol + "//" + Ut.host != i.protocol + "//" + i.host
                } catch (C) {
                    g.crossDomain = !0
                }
            }
            if (g.data && g.processData && "string" != typeof g.data && (g.data = me.param(g.data, g.traditional)), J(_t, g, t, T), h) return T;
            for (o in (m = me.event && g.global) && 0 == me.active++ && me.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Rt.test(g.type), d = g.url.replace(Pt, ""), g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(Ht, "+")) : (a = g.url.slice(d.length), g.data && (d += (Nt.test(d) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (d = d.replace(Mt, "$1"), a = (Nt.test(d) ? "&" : "?") + "_=" + Lt++ + a), g.url = d + a), g.ifModified && (me.lastModified[d] && T.setRequestHeader("If-Modified-Since", me.lastModified[d]), me.etag[d] && T.setRequestHeader("If-None-Match", me.etag[d])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && T.setRequestHeader("Content-Type", g.contentType), T.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : g.accepts["*"]), g.headers) T.setRequestHeader(o, g.headers[o]);
            if (g.beforeSend && (!1 === g.beforeSend.call(y, T, g) || h)) return T.abort();
            if (l = "abort", x.add(g.complete), T.done(g.success), T.fail(g.error), c = J(Wt, g, t, T)) {
                if (T.readyState = 1, m && v.trigger("ajaxSend", [T, g]), h) return T;
                g.async && 0 < g.timeout && (p = E.setTimeout(function () {
                    T.abort("timeout")
                }, g.timeout));
                try {
                    h = !1, c.send(s, n)
                } catch (C) {
                    if (h) throw C;
                    n(-1, C)
                }
            } else n(-1, "No Transport");
            return T
        },
        getJSON: function (e, t, n) {
            return me.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return me.get(e, undefined, t, "script")
        }
    }), me.each(["get", "post"], function (e, i) {
        me[i] = function (e, t, n, r) {
            return me.isFunction(t) && (r = r || n, n = t, t = undefined), me.ajax(me.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, me.isPlainObject(e) && e))
        }
    }), me._evalUrl = function (e) {
        return me.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, me.fn.extend({
        wrapAll: function (e) {
            var t;
            return this[0] && (me.isFunction(e) && (e = e.call(this[0])), t = me(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function (n) {
            return me.isFunction(n) ? this.each(function (e) {
                me(this).wrapInner(n.call(this, e))
            }) : this.each(function () {
                var e = me(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function (t) {
            var n = me.isFunction(t);
            return this.each(function (e) {
                me(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function (e) {
            return this.parent(e).not("body").each(function () {
                me(this).replaceWith(this.childNodes)
            }), this
        }
    }), me.expr.pseudos.hidden = function (e) {
        return !me.expr.pseudos.visible(e)
    }, me.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, me.ajaxSettings.xhr = function () {
        try {
            return new E.XMLHttpRequest
        } catch (e) {}
    };
    var Xt = {
            0: 200,
            1223: 204
        },
        Vt = me.ajaxSettings.xhr();
    pe.cors = !!Vt && "withCredentials" in Vt, pe.ajax = Vt = !!Vt, me.ajaxTransport(function (o) {
        var a, s;
        if (pe.cors || Vt && !o.crossDomain) return {
            send: function (e, t) {
                var n, r = o.xhr();
                if (r.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                    for (n in o.xhrFields) r[n] = o.xhrFields[n];
                for (n in o.mimeType && r.overrideMimeType && r.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                a = function (e) {
                    return function () {
                        a && (a = s = r.onload = r.onerror = r.onabort = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Xt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()))
                    }
                }, r.onload = a(), s = r.onerror = a("error"), r.onabort !== undefined ? r.onabort = s : r.onreadystatechange = function () {
                    4 === r.readyState && E.setTimeout(function () {
                        a && s()
                    })
                }, a = a("abort");
                try {
                    r.send(o.hasContent && o.data || null)
                } catch (i) {
                    if (a) throw i
                }
            },
            abort: function () {
                a && a()
            }
        }
    }), me.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1)
    }), me.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (e) {
                return me.globalEval(e), e
            }
        }
    }), me.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), me.ajaxTransport("script", function (n) {
        var r, i;
        if (n.crossDomain) return {
            send: function (e, t) {
                r = me("<script>").prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function (e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), ne.head.appendChild(r[0])
            },
            abort: function () {
                i && i()
            }
        }
    });
    var Gt, Qt = [],
        Yt = /(=)\?(?=&|$)|\?\?/;
    me.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Qt.pop() || me.expando + "_" + Lt++;
            return this[e] = !0, e
        }
    }), me.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Yt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = me.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Yt, "$1" + r) : !1 !== e.jsonp && (e.url += (Nt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return o || me.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = E[r], E[r] = function () {
            o = arguments
        }, n.always(function () {
            i === undefined ? me(E).removeProp(r) : E[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Qt.push(r)), o && me.isFunction(i) && i(o[0]), o = i = undefined
        }), "script"
    }), pe.createHTMLDocument = ((Gt = ne.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Gt.childNodes.length), me.parseHTML = function (e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (pe.createHTMLDocument ? ((r = (t = ne.implementation.createHTMLDocument("")).createElement("base")).href = ne.location.href, t.head.appendChild(r)) : t = ne), o = !n && [], (i = Ee.exec(e)) ? [t.createElement(i[1])] : (i = x([e], t, o), o && o.length && me(o).remove(), me.merge([], i.childNodes)));
        var r, i, o
    }, me.fn.load = function (e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = V(e.slice(s)), e = e.slice(0, s)), me.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), 0 < a.length && me.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, a.html(r ? me("<div>").append(me.parseHTML(e)).find(r) : e)
        }).always(n && function (e, t) {
            a.each(function () {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, me.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        me.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), me.expr.pseudos.animated = function (t) {
        return me.grep(me.timers, function (e) {
            return t === e.elem
        }).length
    }, me.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, a, s, u, l = me.css(e, "position"),
                c = me(e),
                d = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = me.css(e, "top"), u = me.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), me.isFunction(t) && (t = t.call(e, n, me.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : c.css(d)
        }
    }, me.fn.extend({
        offset: function (t) {
            if (arguments.length) return t === undefined ? this : this.each(function (e) {
                me.offset.setOffset(this, t, e)
            });
            var e, n, r, i, o = this[0];
            return o ? o.getClientRects().length ? (r = o.getBoundingClientRect(), n = (e = o.ownerDocument).documentElement, i = e.defaultView, {
                top: r.top + i.pageYOffset - n.clientTop,
                left: r.left + i.pageXOffset - n.clientLeft
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function () {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === me.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), l(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + me.css(e[0], "borderTopWidth", !0),
                    left: r.left + me.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - me.css(n, "marginTop", !0),
                    left: t.left - r.left - me.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent; e && "static" === me.css(e, "position");) e = e.offsetParent;
                return e || Ke
            })
        }
    }), me.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, i) {
        var o = "pageYOffset" === i;
        me.fn[t] = function (e) {
            return $e(this, function (e, t, n) {
                var r;
                if (me.isWindow(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), n === undefined) return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }), me.each(["top", "left"], function (e, n) {
        me.cssHooks[n] = $(pe.pixelPosition, function (e, t) {
            if (t) return t = q(e, n), ut.test(t) ? me(e).position()[n] + "px" : t
        })
    }), me.each({
        Height: "height",
        Width: "width"
    }, function (a, s) {
        me.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function (r, o) {
            me.fn[o] = function (e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return $e(this, function (e, t, n) {
                    var r;
                    return me.isWindow(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : n === undefined ? me.css(e, t, i) : me.style(e, t, n, i)
                }, s, n ? e : undefined, n)
            }
        })
    }), me.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), me.holdReady = function (e) {
        e ? me.readyWait++ : me.ready(!0)
    }, me.isArray = Array.isArray, me.parseJSON = JSON.parse, me.nodeName = l, "function" == typeof define && define.amd && define("jquery", [], function () {
        return me
    });
    var Jt = E.jQuery,
        Kt = E.$;
    return me.noConflict = function (e) {
        return E.$ === me && (E.$ = Kt), e && E.jQuery === me && (E.jQuery = Jt), me
    }, e || (E.jQuery = E.$ = me), me
}),
function (c, u) {
    "use strict";
    var l;
    c.rails !== u && c.error("jquery-ujs has already been loaded!");
    var e = c(document);
    c.rails = l = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function () {
            return c("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function () {
            return c("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function (e) {
            var t = l.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function () {
            c('form input[name="' + l.csrfParam() + '"]').val(l.csrfToken())
        },
        fire: function (e, t, n) {
            var r = c.Event(t);
            return e.trigger(r, n), !1 !== r.result
        },
        confirm: function (e) {
            return confirm(e)
        },
        ajax: function (e) {
            return c.ajax(e)
        },
        href: function (e) {
            return e[0].href
        },
        isRemote: function (e) {
            return e.data("remote") !== u && !1 !== e.data("remote")
        },
        handleRemote: function (r) {
            var e, t, n, i, o, a;
            if (l.fire(r, "ajax:before")) {
                if (i = r.data("with-credentials") || null, o = r.data("type") || c.ajaxSettings && c.ajaxSettings.dataType, r.is("form")) {
                    e = r.data("ujs:submit-button-formmethod") || r.attr("method"), t = r.data("ujs:submit-button-formaction") || r.attr("action"), n = c(r[0]).serializeArray();
                    var s = r.data("ujs:submit-button");
                    s && (n.push(s), r.data("ujs:submit-button", null)), r.data("ujs:submit-button-formmethod", null), r.data("ujs:submit-button-formaction", null)
                } else r.is(l.inputChangeSelector) ? (e = r.data("method"), t = r.data("url"), n = r.serialize(), r.data("params") && (n = n + "&" + r.data("params"))) : r.is(l.buttonClickSelector) ? (e = r.data("method") || "get", t = r.data("url"), n = r.serialize(), r.data("params") && (n = n + "&" + r.data("params"))) : (e = r.data("method"), t = l.href(r), n = r.data("params") || null);
                return a = {
                    type: e || "GET",
                    data: n,
                    dataType: o,
                    beforeSend: function (e, t) {
                        if (t.dataType === u && e.setRequestHeader("accept", "*/*;q=0.5, " + t.accepts.script), !l.fire(r, "ajax:beforeSend", [e, t])) return !1;
                        r.trigger("ajax:send", e)
                    },
                    success: function (e, t, n) {
                        r.trigger("ajax:success", [e, t, n])
                    },
                    complete: function (e, t) {
                        r.trigger("ajax:complete", [e, t])
                    },
                    error: function (e, t, n) {
                        r.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: l.isCrossDomain(t)
                }, i && (a.xhrFields = {
                    withCredentials: i
                }), t && (a.url = t), l.ajax(a)
            }
            return !1
        },
        isCrossDomain: function (e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            } catch (r) {
                return !0
            }
        },
        handleMethod: function (e) {
            var t = l.href(e),
                n = e.data("method"),
                r = e.attr("target"),
                i = l.csrfToken(),
                o = l.csrfParam(),
                a = c('<form method="post" action="' + t + '"></form>'),
                s = '<input name="_method" value="' + n + '" type="hidden" />';
            o === u || i === u || l.isCrossDomain(t) || (s += '<input name="' + o + '" value="' + i + '" type="hidden" />'), r && a.attr("target", r), a.hide().append(s).appendTo("body"), a.submit()
        },
        formElements: function (e, t) {
            return e.is("form") ? c(e[0].elements).filter(t) : e.find(t)
        },
        disableFormElements: function (e) {
            l.formElements(e, l.disableSelector).each(function () {
                l.disableFormElement(c(this))
            })
        },
        disableFormElement: function (e) {
            var t, n;
            t = e.is("button") ? "html" : "val", (n = e.data("disable-with")) !== u && (e.data("ujs:enable-with", e[t]()), e[t](n)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
        },
        enableFormElements: function (e) {
            l.formElements(e, l.enableSelector).each(function () {
                l.enableFormElement(c(this))
            })
        },
        enableFormElement: function (e) {
            var t = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== u && (e[t](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
        },
        allowAction: function (e) {
            var t, n = e.data("confirm"),
                r = !1;
            if (!n) return !0;
            if (l.fire(e, "confirm")) {
                try {
                    r = l.confirm(n)
                } catch (i) {
                    (console.error || console.log).call(console, i.stack || i)
                }
                t = l.fire(e, "confirm:complete", [r])
            }
            return r && t
        },
        blankInputs: function (e, t, n) {
            var r, i, o, a = c(),
                s = t || "input,textarea",
                u = e.find(s),
                l = {};
            return u.each(function () {
                (r = c(this)).is("input[type=radio]") ? (o = r.attr("name"), l[o] || (0 === e.find('input[type=radio]:checked[name="' + o + '"]').length && (i = e.find('input[type=radio][name="' + o + '"]'), a = a.add(i)), l[o] = o)) : (r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : !!r.val()) === n && (a = a.add(r))
            }), !!a.length && a
        },
        nonBlankInputs: function (e, t) {
            return l.blankInputs(e, t, !0)
        },
        stopEverything: function (e) {
            return c(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (e) {
            var t = e.data("disable-with");
            t !== u && (e.data("ujs:enable-with", e.html()), e.html(t)), e.bind("click.railsDisable", function (e) {
                return l.stopEverything(e)
            }), e.data("ujs:disabled", !0)
        },
        enableElement: function (e) {
            e.data("ujs:enable-with") !== u && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
        }
    }, l.fire(e, "rails:attachBindings") && (c.ajaxPrefilter(function (e, t, n) {
        e.crossDomain || l.CSRFProtection(n)
    }), c(window).on("pageshow.rails", function () {
        c(c.rails.enableSelector).each(function () {
            var e = c(this);
            e.data("ujs:disabled") && c.rails.enableFormElement(e)
        }), c(c.rails.linkDisableSelector).each(function () {
            var e = c(this);
            e.data("ujs:disabled") && c.rails.enableElement(e)
        })
    }), e.on("ajax:complete", l.linkDisableSelector, function () {
        l.enableElement(c(this))
    }), e.on("ajax:complete", l.buttonDisableSelector, function () {
        l.enableFormElement(c(this))
    }), e.on("click.rails", l.linkClickSelector, function (e) {
        var t = c(this),
            n = t.data("method"),
            r = t.data("params"),
            i = e.metaKey || e.ctrlKey;
        if (!l.allowAction(t)) return l.stopEverything(e);
        if (!i && t.is(l.linkDisableSelector) && l.disableElement(t), l.isRemote(t)) {
            if (i && (!n || "GET" === n) && !r) return !0;
            var o = l.handleRemote(t);
            return !1 === o ? l.enableElement(t) : o.fail(function () {
                l.enableElement(t)
            }), !1
        }
        return n ? (l.handleMethod(t), !1) : void 0
    }), e.on("click.rails", l.buttonClickSelector, function (e) {
        var t = c(this);
        if (!l.allowAction(t) || !l.isRemote(t)) return l.stopEverything(e);
        t.is(l.buttonDisableSelector) && l.disableFormElement(t);
        var n = l.handleRemote(t);
        return !1 === n ? l.enableFormElement(t) : n.fail(function () {
            l.enableFormElement(t)
        }), !1
    }), e.on("change.rails", l.inputChangeSelector, function (e) {
        var t = c(this);
        return l.allowAction(t) && l.isRemote(t) ? (l.handleRemote(t), !1) : l.stopEverything(e)
    }), e.on("submit.rails", l.formSubmitSelector, function (e) {
        var t, n, r = c(this),
            i = l.isRemote(r);
        if (!l.allowAction(r)) return l.stopEverything(e);
        if (r.attr("novalidate") === u)
            if (r.data("ujs:formnovalidate-button") === u) {
                if ((t = l.blankInputs(r, l.requiredInputSelector, !1)) && l.fire(r, "ajax:aborted:required", [t])) return l.stopEverything(e)
            } else r.data("ujs:formnovalidate-button", u);
        if (i) {
            if (n = l.nonBlankInputs(r, l.fileInputSelector)) {
                setTimeout(function () {
                    l.disableFormElements(r)
                }, 13);
                var o = l.fire(r, "ajax:aborted:file", [n]);
                return o || setTimeout(function () {
                    l.enableFormElements(r)
                }, 13), o
            }
            return l.handleRemote(r), !1
        }
        setTimeout(function () {
            l.disableFormElements(r)
        }, 13)
    }), e.on("click.rails", l.formInputClickSelector, function (e) {
        var t = c(this);
        if (!l.allowAction(t)) return l.stopEverything(e);
        var n = t.attr("name"),
            r = n ? {
                name: n,
                value: t.val()
            } : null,
            i = t.closest("form");
        0 === i.length && (i = c("#" + t.attr("form"))), i.data("ujs:submit-button", r), i.data("ujs:formnovalidate-button", t.attr("formnovalidate")), i.data("ujs:submit-button-formaction", t.attr("formaction")), i.data("ujs:submit-button-formmethod", t.attr("formmethod"))
    }), e.on("ajax:send.rails", l.formSubmitSelector, function (e) {
        this === e.target && l.disableFormElements(c(this))
    }), e.on("ajax:complete.rails", l.formSubmitSelector, function (e) {
        this === e.target && l.enableFormElements(c(this))
    }), c(function () {
        l.refreshCSRFTokens()
    }))
}(jQuery), $(document).on("click", ".js-reveal", function () {
    $this = $(this), $($this.data("target")).removeClass("hidden"), $this.data("remove") && $this.remove()
}), $(document).on("click", ".js-toggle", function () {
    $this = $(this), toggleText = $this.data("toggleText"), $this.data("toggleText", $(this).text()), $this.text(toggleText), $($this.data("target")).toggleClass("hidden")
}), $(document).ready(function () {
    for (var e = document.querySelectorAll("input, textarea"), t = 0; t < e.length; t++) e[t].addEventListener("blur", function () {
        this.checkValidity() ? this.classList.remove("has-error") : this.classList.add("has-error")
    }), e[t].addEventListener("input", function () {
        this.classList.remove("has-error")
    })
}), $(document).on("input", ".js-select-reveal", function () {
    $this = $(this), $target = $($this.data("target")), $hideTarget = $($this.data("hideTarget")), $this.data("revealValue").includes($this.val()) ? ($hideTarget.addClass("hidden"), $target.removeClass("hidden"), $hideTarget.attr("disabled", !0), $target.removeAttr("disabled"), $this.data("clear") && $hideTarget.val("")) : ($target.addClass("hidden"), $hideTarget.removeClass("hidden"), $hideTarget.removeAttr("disabled"), $target.attr("disabled", !0), $this.data("clear") && $target.val(""))
}), $(document).on("click", ".js-modal-confirm", function (e) {
    e.preventDefault(), $submit = $(this), $target = $($submit.data("target")), MicroModal.init(), MicroModal.show($submit.data("target").substr(1)), $target.find(".js-confirm").one("click", function () {
        $form = $submit.closest("form"), $form[0].checkValidity() && $form.submit()
    })
}), $.fn.isInViewport = function () {
    var e = $(this).offset().top,
        t = e + $(this).outerHeight(),
        n = $(window).scrollTop(),
        r = n + $(window).height();
    return n < t && e < r
}, $(document).on("swipeleft", ".js-slider", function () {
    slide(this, !0)
}), $(document).on("swiperight", ".js-slider", function () {
    slide(this, !1)
}), $(document).on("click", ".js-slider-control", function () {
    var e = $(this);
    e.removeClass("nudge");
    var t = $(e.data("target")),
        n = parseInt(e.data("index")),
        r = t.children().first().outerWidth(!0) * n;
    t.data("index", n), t.attr("style", "transform: translate(-" + r + "px)"), e.addClass("active"), e.siblings().removeClass("active")
}), $(document).on("click", ".js-slider-left", function () {
    slide($($(this).data("target")), !1)
}), $(document).on("click", ".js-slider-right", function () {
    slide($($(this).data("target")), !0)
}), $(document).on("scroll", function () {
    $(".js-slider.nudge").each(function () {
        $this = $(this), 0 == $this.data("index") && $this.isInViewport() && $this.attr("style", "margin-left: " + (20 * Math.random() - 10) + "px;")
    })
});
var yall = function () {
    "use strict";
    return function (a) {
        var r = (a = a || {}).lazyClass || "lazy",
            s = a.lazyBackgroundClass || "lazy-bg",
            i = "idleLoadTimeout" in a ? a.idleLoadTimeout : 200,
            o = a.observeChanges || !1,
            n = a.events || {},
            u = window,
            l = "requestIdleCallback",
            e = "IntersectionObserver",
            c = ["srcset", "src", "poster"],
            d = [],
            f = function (e, t) {
                return d.slice.call((t || document).querySelectorAll(e || "img." + r + ",video." + r + ",iframe." + r + ",." + s))
            },
            p = function (e) {
                var t, n, r = e.parentNode;
                for (var i in "PICTURE" == r.nodeName && (n = r), "VIDEO" == e.nodeName && (n = e), t = f("source", n)) h(t[i]);
                h(e), e.autoplay && e.load();
                var o = e.classList;
                o.contains(s) && (o.remove(s), o.add(a.lazyBackgroundLoaded || "lazy-bg-loaded"))
            },
            t = function (e) {
                for (var t in n) e.addEventListener(t, n[t].listener || n[t], n[t].options || void 0);
                y.observe(e)
            },
            h = function (t) {
                c.forEach(function (e) {
                    e in t.dataset && u.requestAnimationFrame(function () {
                        t[e] = t.dataset[e]
                    })
                })
            },
            m = f();
        if (/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent))
            for (var g in m) p(m[g]);
        else if (e in u && e + "Entry" in u && "isIntersecting" in u[e + "Entry"].prototype) {
            var y = new u[e](function (e, n) {
                e.forEach(function (e) {
                    if (e.isIntersecting) {
                        var t = e.target;
                        l in u && i ? u[l](function () {
                            p(t)
                        }, {
                            timeout: i
                        }) : p(t), t.classList.remove(r), n.unobserve(t), (m = m.filter(function (e) {
                            return e != t
                        })).length || o || y.disconnect()
                    }
                })
            }, {
                rootMargin: ("threshold" in a ? a.threshold : 200) + "px 0%"
            });
            for (var v in m) t(m[v]);
            o && new MutationObserver(function () {
                f().forEach(function (e) {
                    m.indexOf(e) < 0 && (m.push(e), t(e))
                })
            }).observe(f(a.observeRootSelector || "body")[0], a.mutationObserverOptions || {
                childList: !0,
                subtree: !0
            })
        }
    }
}();
! function (a, e) {
    if ("function" != typeof a.createEvent) return;
    var s, u, l, c, d, f, p, h, m, t = function (e) {
            var t = e.toLowerCase(),
                n = "MS" + e;
            return navigator.msPointerEnabled ? n : !!window.PointerEvent && t
        },
        n = function (e) {
            return "on" + e in window && e
        },
        g = {
            useJquery: !e.IGNORE_JQUERY && "undefined" != typeof jQuery,
            swipeThreshold: e.SWIPE_THRESHOLD || 10,
            tapThreshold: e.TAP_THRESHOLD || 150,
            dbltapThreshold: e.DBL_TAP_THRESHOLD || 200,
            longtapThreshold: e.LONG_TAP_THRESHOLD || 1e3,
            tapPrecision: e.TAP_PRECISION / 2 || 30,
            justTouchEvents: e.JUST_ON_TOUCH_DEVICES
        },
        y = !1,
        r = {
            touchstart: n("touchstart") || t("PointerDown"),
            touchend: n("touchend") || t("PointerUp"),
            touchmove: n("touchmove") || t("PointerMove")
        },
        v = function (e) {
            return !e.pointerId || void 0 === s || e.pointerId === s
        },
        i = function (e, t, n) {
            for (var r = t.split(" "), i = r.length; i--;) e.addEventListener(r[i], n, !1)
        },
        o = function (e) {
            return e.targetTouches ? e.targetTouches[0] : e
        },
        b = function (e) {
            return e.targetTouches && 1 < e.targetTouches.length
        },
        x = function () {
            return (new Date).getTime()
        },
        w = function (e, t, n, r) {
            var i = a.createEvent("Event");
            if (i.originalEvent = n, (r = r || {}).x = u, r.y = l, r.distance = r.distance, g.useJquery && (i = jQuery.Event(t, {
                    originalEvent: n
                }), jQuery(e).trigger(i, r)), i.initEvent) {
                for (var o in r) i[o] = r[o];
                i.initEvent(t, !0, !0), e.dispatchEvent(i)
            }
            for (; e;) e["on" + t] && e["on" + t](i), e = e.parentNode
        },
        T = function (e) {
            if (v(e) && !b(e) && (s = e.pointerId, "mousedown" !== e.type && (y = !0), "mousedown" !== e.type || !y)) {
                var t = o(e);
                c = u = t.pageX, d = l = t.pageY, m = setTimeout(function () {
                    w(e.target, "longtap", e), p = e.target
                }, g.longtapThreshold), f = x(), k++
            }
        },
        C = function (e) {
            if (v(e) && !b(e))
                if (s = undefined, "mouseup" === e.type && y) y = !1;
                else {
                    var t = [],
                        n = x(),
                        r = d - l,
                        i = c - u;
                    if (clearTimeout(h), clearTimeout(m), i <= -g.swipeThreshold && t.push("swiperight"), i >= g.swipeThreshold && t.push("swipeleft"), r <= -g.swipeThreshold && t.push("swipedown"), r >= g.swipeThreshold && t.push("swipeup"), t.length) {
                        for (var o = 0; o < t.length; o++) {
                            var a = t[o];
                            w(e.target, a, e, {
                                distance: {
                                    x: Math.abs(i),
                                    y: Math.abs(r)
                                }
                            })
                        }
                        k = 0
                    } else c >= u - g.tapPrecision && c <= u + g.tapPrecision && d >= l - g.tapPrecision && d <= l + g.tapPrecision && 0 <= f + g.tapThreshold - n && (w(e.target, 2 <= k && p === e.target ? "dbltap" : "tap", e), p = e.target), h = setTimeout(function () {
                        k = 0
                    }, g.dbltapThreshold)
                }
        },
        E = function (e) {
            if (v(e) && ("mousemove" !== e.type || !y)) {
                var t = o(e);
                u = t.pageX, l = t.pageY
            }
        },
        k = 0;
    i(a, r.touchstart + (g.justTouchEvents ? "" : " mousedown"), T), i(a, r.touchend + (g.justTouchEvents ? "" : " mouseup"), C), i(a, r.touchmove + (g.justTouchEvents ? "" : " mousemove"), E), e.tocca = function (e) {
        for (var t in e) g[t] = e[t];
        return g
    }
}(document, window), document.addEventListener("DOMContentLoaded", function () {
        yall({
            observeChanges: !0
        })
    }),
    function (e, n) {
        e.addEventListener("load", function () {
            var t = n.querySelector(".js-dropdown");
            t && t.addEventListener("click", function (e) {
                if (e.preventDefault(), e.stopPropagation(), !e.target.classList.contains("js-dropdown-option")) return t.classList.add("is-active");
                window.location = e.target.dataset.redirect
            }, !1), n.body.addEventListener("click", function () {
                t && t.classList.contains("is-active") && t.classList.remove("is-active")
            }, !1)
        }, !1)
    }(window, document);