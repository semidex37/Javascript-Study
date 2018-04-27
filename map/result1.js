// "document.writeln('<link rel="stylesheet" href="//sgisapi.kostat.go.kr/maps/sop.css">');

/*
 sop 0.1-dev,
 */
!function (t, i, e) {
    function o() {
        var i = t.sop;
        r.noConflict = function () {
            return t.sop = i, this
        }, t.sop = r
    }

    function s(i, n, o) {
        function s(t) {
            return t >= 200 && 300 > t || 304 === t
        }

        function r() {
            u.status === e || s(u.status) ? n.call(u, null, u) : n.call(u, u, null)
        }

        var a = !1;
        if ("undefined" == typeof t.XMLHttpRequest)return n(Error("Browser not supported"));
        if ("undefined" == typeof o) {
            var h = i.match(/^\s*https?:\/\/[^\/]*/);
            o = h && h[0] !== location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
        }
        var u = new t.XMLHttpRequest;
        if (o && !("withCredentials" in u)) {
            u = new t.XDomainRequest;
            var l = n;
            n = function () {
                if (a) l.apply(this, arguments); else {
                    var t = this, i = arguments;
                    setTimeout(function () {
                        l.apply(t, i)
                    }, 0)
                }
            }
        }
        return "onload" in u ? u.onload = r : u.onreadystatechange = function () {
                4 === u.readyState && r()
            }, u.onerror = function (t) {
            n.call(this, t || !0, null), n = function () {
            }
        }, u.onprogress = function () {
        }, u.ontimeout = function (t) {
            n.call(this, t, null), n = function () {
            }
        }, u.onabort = function (t) {
            n.call(this, t, null), n = function () {
            }
        }, u.open("GET", i, !0), u.send(null), a = !0, u
    }

    var r = {version: "0.1-dev"};
    "object" == typeof module && "object" == typeof module.exports ? module.exports = r : "function" == typeof define && define.amd ? define(r) : o(), r.Util = {
        extend: function (t) {
            var i, e, n, o;
            for (e = 1, n = arguments.length; n > e; e++) {
                o = arguments[e];
                for (i in o)t[i] = o[i]
            }
            return t
        },
        create: Object.create || function () {
            function t() {
            }

            return function (i) {
                return t.prototype = i, new t
            }
        }(),
        bind: function (t, i) {
            var e = Array.prototype.slice;
            if (t.bind)return t.bind.apply(t, e.call(arguments, 1));
            var n = e.call(arguments, 2);
            return function () {
                return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments)
            }
        },
        stamp: function (t) {
            return t._sop_id = t._sop_id || ++r.Util.lastId, t._sop_id
        },
        lastId: 0,
        throttle: function (t, i, e) {
            var n, o, s, r;
            return r = function () {
                n = !1, o && (s.apply(e, o), o = !1)
            }, s = function () {
                n ? o = arguments : (t.apply(e, arguments), setTimeout(r, i), n = !0)
            }
        },
        wrapNum: function (t, i, e) {
            var n = i[1], o = i[0], s = n - o;
            return t === n && e ? t : ((t - o) % s + s) % s + o
        },
        falseFn: function () {
            return !1
        },
        formatNum: function (t, i) {
            var e = Math.pow(10, i || 5);
            return Math.round(t * e) / e
        },
        trim: function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function (t) {
            return r.Util.trim(t).split(/\s+/)
        },
        setOptions: function (t, i) {
            t.hasOwnProperty("options") || (t.options = t.options ? r.Util.create(t.options) : {});
            for (var e in i)t.options[e] = i[e];
            return t.options
        },
        getParamString: function (t, i, e) {
            var n = [];
            for (var o in t)n.push(encodeURIComponent(e ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
            return (i && -1 !== i.indexOf("?") ? "&" : "?") + n.join("&")
        },
        template: function (t, i) {
            return t.replace(r.Util.templateRe, function (t, n) {
                var o = i[n];
                if (o === e)throw new Error("No value provided for variable " + t);
                return "function" == typeof o && (o = o(i)), o
            })
        },
        templateRe: /\{ *([\w_]+) *\}/g,
        isArray: Array.isArray || function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        indexOf: function (t, i) {
            for (var e = 0; e < t.length; e++)if (t[e] === i)return e;
            return -1
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
        isUndefined: function (t) {
            return "undefined" == typeof t
        },
        typeOf: function (t) {
            var i = Object.prototype.toString;
            return this._OBJ2TYPE[i.call(t)] || (t ? "object" : null === t ? "null" : "undefined")
        },
        _OBJ2TYPE: {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Object]": "object",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Error]": "error"
        }
    }, function () {
        function i(i) {
            return t["webkit" + i] || t["moz" + i] || t["ms" + i]
        }

        function e(i) {
            var e = +new Date, o = Math.max(0, 16 - (e - n));
            return n = e + o, t.setTimeout(i, o)
        }

        var n = 0, o = t.requestAnimationFrame || i("RequestAnimationFrame") || e, s = t.cancelAnimationFrame || i("CancelAnimationFrame") || i("CancelRequestAnimationFrame") || function (i) {
                t.clearTimeout(i)
            };
        r.Util.requestAnimFrame = function (i, n, s) {
            return s && o === e ? void i.call(n) : o.call(t, r.bind(i, n))
        }, r.Util.cancelAnimFrame = function (i) {
            i && s.call(t, i)
        }
    }(), r.extend = r.Util.extend, r.bind = r.Util.bind, r.stamp = r.Util.stamp, r.setOptions = r.Util.setOptions, r.Class = function () {
    }, r.Class.extend = function (t) {
        var i = function () {
            this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
        }, e = i.__super__ = this.prototype, n = r.Util.create(e);
        n.constructor = i, i.prototype = n;
        for (var o in this)this.hasOwnProperty(o) && "prototype" !== o && (i[o] = this[o]);
        return t.statics && (r.extend(i, t.statics), delete t.statics), t.includes && (r.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = r.Util.extend(r.Util.create(n.options), t.options)), r.extend(n, t), n._initHooks = [], n.callInitHooks = function () {
            if (!this._initHooksCalled) {
                e.callInitHooks && e.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var t = 0, i = n._initHooks.length; i > t; t++)n._initHooks[t].call(this)
            }
        }, i
    }, r.Class.include = function (t) {
        r.extend(this.prototype, t)
    }, r.Class.mergeOptions = function (t) {
        r.extend(this.prototype.options, t)
    }, r.Class.addInitHook = function (t) {
        var i = Array.prototype.slice.call(arguments, 1), e = "function" == typeof t ? t : function () {
                this[t].apply(this, i)
            };
        this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(e)
    }, r.Evented = r.Class.extend({
        on: function (t, i, e) {
            if ("object" == typeof t)for (var n in t)this._on(n, t[n], i); else {
                t = r.Util.splitWords(t);
                for (var o = 0, s = t.length; s > o; o++)this._on(t[o], i, e)
            }
            return this
        }, off: function (t, i, e) {
            if (t)if ("object" == typeof t)for (var n in t)this._off(n, t[n], i); else {
                t = r.Util.splitWords(t);
                for (var o = 0, s = t.length; s > o; o++)this._off(t[o], i, e)
            } else delete this._events;
            return this
        }, _on: function (t, i, e) {
            var n = this._events = this._events || {}, o = e && e !== this && r.stamp(e);
            if (o) {
                var s = t + "_idx", a = t + "_len", h = n[s] = n[s] || {}, u = r.stamp(i) + "_" + o;
                h[u] || (h[u] = {fn: i, ctx: e}, n[a] = (n[a] || 0) + 1)
            } else n[t] = n[t] || [], n[t].push({fn: i})
        }, _off: function (t, i, e) {
            var n = this._events, o = t + "_idx", s = t + "_len";
            if (n) {
                if (!i)return delete n[t], delete n[o], void delete n[s];
                var a, h, u, l, c, d = e && e !== this && r.stamp(e);
                if (d) c = r.stamp(i) + "_" + d, a = n[o], a && a[c] && (l = a[c], delete a[c], n[s]--); else if (a = n[t])for (h = 0, u = a.length; u > h; h++)if (a[h].fn === i) {
                    l = a[h], a.splice(h, 1);
                    break
                }
                l && (l.fn = r.Util.falseFn)
            }
        }, fire: function (t, i, e) {
            if (!this.listens(t, e))return this;
            var n = r.Util.extend({}, i, {type: t, target: this}), o = this._events;
            if (o) {
                var s, a, h, u, l = o[t + "_idx"];
                if (o[t])for (h = o[t].slice(), s = 0, a = h.length; a > s; s++)h[s].fn.call(this, n);
                for (u in l)l[u].fn.call(l[u].ctx, n)
            }
            return e && this._propagateEvent(n), this
        }, listens: function (t, i) {
            var e = this._events;
            if (e && (e[t] || e[t + "_len"]))return !0;
            if (i)for (var n in this._eventParents)if (this._eventParents[n].listens(t, i))return !0;
            return !1
        }, once: function (t, i, e) {
            if ("object" == typeof t) {
                for (var n in t)this.once(n, t[n], i);
                return this
            }
            var o = r.bind(function () {
                this.off(t, i, e).off(t, o, e)
            }, this);
            return this.on(t, i, e).on(t, o, e)
        }, addEventParent: function (t) {
            return this._eventParents = this._eventParents || {}, this._eventParents[r.stamp(t)] = t, this
        }, removeEventParent: function (t) {
            return this._eventParents && delete this._eventParents[r.stamp(t)], this
        }, _propagateEvent: function (t) {
            for (var i in this._eventParents)this._eventParents[i].fire(t.type, r.extend({layer: t.target}, t), !0)
        }
    });
    var a = r.Evented.prototype;
    a.addEventListener = a.on, a.removeEventListener = a.clearAllEventListeners = a.off, a.addOneTimeEventListener = a.once, a.fireEvent = a.fire, a.hasEventListeners = a.listens, r.Mixin = {Events: a}, function () {
        var e = navigator.userAgent.toLowerCase(), n = i.documentElement, o = "ActiveXObject" in t, s = -1 !== e.indexOf("msie 9"), a = -1 !== e.indexOf("webkit"), h = -1 !== e.indexOf("phantom"), u = -1 !== e.search("android [23]"), l = -1 !== e.indexOf("chrome"), c = -1 !== e.indexOf("gecko") && !a && !t.opera && !o, d = "undefined" != typeof orientation, m = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !t.PointerEvent, p = t.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || m, f = o && "transition" in n.style, _ = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !u, v = "MozPerspective" in n.style, g = "OTransition" in n.style, y = !t.L_NO_TOUCH && !h && (p || "ontouchstart" in t || t.DocumentTouch && i instanceof t.DocumentTouch), M = !1;
        "function" == typeof XMLHttpRequest && (M = !0), r.Browser = {
            ie: o,
            ielt9: o && !i.addEventListener || s,
            webkit: a,
            gecko: c,
            android: -1 !== e.indexOf("android"),
            android23: u,
            chrome: l,
            safari: !l && -1 !== e.indexOf("safari"),
            ie3d: f,
            webkit3d: _,
            gecko3d: v,
            opera12: g,
            any3d: !t.L_DISABLE_3D && (f || _ || v) && !g && !h,
            mobile: d,
            mobileWebkit: d && a,
            mobileWebkit3d: d && _,
            mobileOpera: d && t.opera,
            mobileGecko: d && c,
            touch: !!y,
            msPointer: !!m,
            pointer: !!p,
            retina: (t.devicePixelRatio || t.screen.deviceXDPI / t.screen.logicalXDPI) > 1,
            xhr: M
        }
    }(), r.Const = r.Class.extend({
        statics: {
            IMAGE_PATH: function () {
                var t, e, n, o, s = i.getElementsByTagName("script"), r = /[\/^]sop[\-\._]?([\w\-\._]*)\.js\??/;
                for (t = 0, e = s.length; e > t; t++)if (n = s[t].src, n.match(r))return o = n.split(r)[0], (o ? o + "/" : "") + "images";
                return "//sgisapi.kostat.go.kr/maps/images"
            }()
        }
    }), r.Point = function (t, i, e) {
        this.x = e ? Math.round(t) : t, this.y = e ? Math.round(i) : i
    }, r.Point.prototype = {
        clone: function () {
            return new r.Point(this.x, this.y)
        }, add: function (t) {
            return this.clone()._add(r.point(t))
        }, _add: function (t) {
            return this.x += t.x, this.y += t.y, this
        }, subtract: function (t) {
            return this.clone()._subtract(r.point(t))
        }, _subtract: function (t) {
            return this.x -= t.x, this.y -= t.y, this
        }, divideBy: function (t) {
            return this.clone()._divideBy(t)
        }, _divideBy: function (t) {
            return this.x /= t, this.y /= t, this
        }, multiplyBy: function (t) {
            return this.clone()._multiplyBy(t)
        }, _multiplyBy: function (t) {
            return this.x *= t, this.y *= t, this
        }, scaleBy: function (t) {
            return new r.Point(this.x * t.x, this.y * t.y)
        }, unscaleBy: function (t) {
            return new r.Point(this.x / t.x, this.y / t.y)
        }, round: function () {
            return this.clone()._round()
        }, _round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }, floor: function () {
            return this.clone()._floor()
        }, _floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }, ceil: function () {
            return this.clone()._ceil()
        }, _ceil: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }, distanceTo: function (t) {
            t = r.point(t);
            var i = t.x - this.x, e = t.y - this.y;
            return Math.sqrt(i * i + e * e)
        }, equals: function (t) {
            return t = r.point(t), t.x === this.x && t.y === this.y
        }, contains: function (t) {
            return t = r.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        }, toString: function () {
            return "Point(" + r.Util.formatNum(this.x) + ", " + r.Util.formatNum(this.y) + ")"
        }
    }, r.point = function (t, i, n) {
        return t instanceof r.Point ? t : r.Util.isArray(t) ? new r.Point(t[0], t[1]) : t === e || null === t ? t : new r.Point(t, i, n)
    }, r.Bounds = function (t, i) {
        if (t)for (var e = i ? [t, i] : t, n = 0, o = e.length; o > n; n++)this.extend(e[n])
    }, r.Bounds.prototype = {
        extend: function (t) {
            return t = r.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
        }, getCenter: function (t) {
            return new r.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
        }, getBottomLeft: function () {
            return new r.Point(this.min.x, this.max.y)
        }, getTopRight: function () {
            return new r.Point(this.max.x, this.min.y)
        }, getSize: function () {
            return this.max.subtract(this.min)
        }, contains: function (t) {
            var i, e;
            return t = "number" == typeof t[0] || t instanceof r.Point ? r.point(t) : r.bounds(t), t instanceof r.Bounds ? (i = t.min, e = t.max) : i = e = t, i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y
        }, intersects: function (t) {
            t = r.bounds(t);
            var i = this.min, e = this.max, n = t.min, o = t.max, s = o.x >= i.x && n.x <= e.x, a = o.y >= i.y && n.y <= e.y;
            return s && a
        }, overlaps: function (t) {
            t = r.bounds(t);
            var i = this.min, e = this.max, n = t.min, o = t.max, s = o.x > i.x && n.x < e.x, a = o.y > i.y && n.y < e.y;
            return s && a
        }, isValid: function () {
            return !(!this.min || !this.max)
        }
    }, r.bounds = function (t, i) {
        return !t || t instanceof r.Bounds ? t : new r.Bounds(t, i)
    }, r.Transformation = function (t, i, e, n) {
        this._a = t, this._b = i, this._c = e, this._d = n
    }, r.Transformation.prototype = {
        transform: function (t, i) {
            return this._transform(t.clone(), i)
        }, _transform: function (t, i) {
            return i = i || 1, t.x = i * (this._a * t.x + this._b), t.y = i * (this._c * t.y + this._d), t
        }, untransform: function (t, i) {
            return i = i || 1, new r.Point((t.x / i - this._b) / this._a, (t.y / i - this._d) / this._c)
        }
    }, r.DomUtil = {
        get: function (t) {
            return "string" == typeof t ? i.getElementById(t) : t
        }, getStyle: function (t, e) {
            var n = t.style[e] || t.currentStyle && t.currentStyle[e];
            if ((!n || "auto" === n) && i.defaultView) {
                var o = i.defaultView.getComputedStyle(t, null);
                n = o ? o[e] : null
            }
            return "auto" === n ? null : n
        }, create: function (t, e, n) {
            var o = i.createElement(t);
            return o.className = e, n && n.appendChild(o), o
        }, remove: function (t) {
            var i = t.parentNode;
            i && i.removeChild(t)
        }, empty: function (t) {
            for (; t.firstChild;)t.removeChild(t.firstChild)
        }, toFront: function (t) {
            t.parentNode.appendChild(t)
        }, toBack: function (t) {
            var i = t.parentNode;
            i.insertBefore(t, i.firstChild)
        }, hasClass: function (t, i) {
            if (t.classList !== e)return t.classList.contains(i);
            var n = r.DomUtil.getClass(t);
            return n.length > 0 && new RegExp("(^|\\s)" + i + "(\\s|$)").test(n)
        }, addClass: function (t, i) {
            if (t.classList !== e)for (var n = r.Util.splitWords(i), o = 0, s = n.length; s > o; o++)t.classList.add(n[o]); else if (!r.DomUtil.hasClass(t, i)) {
                var a = r.DomUtil.getClass(t);
                r.DomUtil.setClass(t, (a ? a + " " : "") + i)
            }
        }, removeClass: function (t, i) {
            t.classList !== e ? t.classList.remove(i) : r.DomUtil.setClass(t, r.Util.trim((" " + r.DomUtil.getClass(t) + " ").replace(" " + i + " ", " ")))
        }, setClass: function (t, i) {
            t.className.baseVal === e ? t.className = i : t.className.baseVal = i
        }, getClass: function (t) {
            return t.className.baseVal === e ? t.className : t.className.baseVal
        }, setOpacity: function (t, i) {
            "opacity" in t.style ? t.style.opacity = i : "filter" in t.style && r.DomUtil._setOpacityIE(t, i)
        }, _setOpacityIE: function (t, i) {
            var e = !1, n = "DXImageTransform.Microsoft.Alpha";
            try {
                e = t.filters.item(n)
            } catch (o) {
                if (1 === i)return
            }
            i = Math.round(100 * i), e ? (e.Enabled = 100 !== i, e.Opacity = i) : t.style.filter += " progid:" + n + "(opacity=" + i + ")"
        }, testProp: function (t) {
            for (var e = i.documentElement.style, n = 0; n < t.length; n++)if (t[n] in e)return t[n];
            return !1
        }, setTransform: function (t, i, e) {
            var n = i || new r.Point(0, 0);
            t.style[r.DomUtil.TRANSFORM] = "translate3d(" + n.x + "px," + n.y + "px,0)" + (e ? " scale(" + e + ")" : "")
        }, setPosition: function (t, i) {
            t._sop_pos = i, r.Browser.any3d ? r.DomUtil.setTransform(t, i) : (t.style.left = i.x + "px", t.style.top = i.y + "px")
        }, getPosition: function (t) {
            return t._sop_pos
        }
    }, function () {
        r.DomUtil.TRANSFORM = r.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
        var e = r.DomUtil.TRANSITION = r.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
        if (r.DomUtil.TRANSITION_END = "webkitTransition" === e || "OTransition" === e ? e + "End" : "transitionend", "onselectstart" in i) r.DomUtil.disableTextSelection = function () {
            r.DomEvent.on(t, "selectstart", r.DomEvent.preventDefault)
        }, r.DomUtil.enableTextSelection = function () {
            r.DomEvent.off(t, "selectstart", r.DomEvent.preventDefault)
        }; else {
            var n = r.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            r.DomUtil.disableTextSelection = function () {
                if (n) {
                    var t = i.documentElement.style;
                    this._userSelect = t[n], t[n] = "none"
                }
            }, r.DomUtil.enableTextSelection = function () {
                n && (i.documentElement.style[n] = this._userSelect, delete this._userSelect)
            }
        }
        r.DomUtil.disableImageDrag = function () {
            r.DomEvent.on(t, "dragstart", r.DomEvent.preventDefault)
        }, r.DomUtil.enableImageDrag = function () {
            r.DomEvent.off(t, "dragstart", r.DomEvent.preventDefault)
        }, r.DomUtil.preventOutline = function (i) {
            r.DomUtil.restoreOutline(), this._outlineElement = i, this._outlineStyle = i.style.outline, i.style.outline = "none", r.DomEvent.on(t, "keydown", r.DomUtil.restoreOutline, this)
        }, r.DomUtil.restoreOutline = function () {
            this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, delete this._outlineElement, delete this._outlineStyle, r.DomEvent.off(t, "keydown", r.DomUtil.restoreOutline, this))
        }
    }(), r.UTMK = function (t, i, n) {
        if (isNaN(t) || isNaN(i))throw new Error("Invalid UTMK object: (" + t + ", " + i + ")");
        this.x = +t, this.y = +i, n !== e && (this.alt = +n)
    }, r.UTMK.prototype = {
        equals: function (t, i) {
            if (!t)return !1;
            t = r.utmk(t);
            var n = Math.max(Math.abs(this.x - t.x), Math.abs(this.y - t.y));
            return (i === e ? 1e-9 : i) >= n
        }, toString: function (t) {
            return "UTMK(" + r.Util.formatNum(this.x, t) + ", " + r.Util.formatNum(this.y, t) + ")"
        }, distanceTo: function (t) {
            return r.CRS.UTMK.distance(this, r.utmk(t))
        }, wrap: function () {
            return r.CRS.UTMK.wrapUTMK(this)
        }
    }, r.UTMK.PROJ_CODE = "SR-ORG:7308", r.UTMK.PROJ_DEF = "+proj=tmerc +lat_0=38.0 +lon_0=127.5 +x_0=1000000.0 +y_0=2000000.0 +k=0.9996 +a=6378137.0 +b=6356752.3141403 +ellps=GRS80 +towgs84=0,0,0 +datum=WGS84 +no_defs", r.utmk = function (t, i) {
        return t instanceof r.UTMK ? t : r.Util.isArray(t) && "object" != typeof t[0] ? 3 === t.length ? new r.UTMK(t[0], t[1], t[2]) : new r.UTMK(t[0], t[1]) : t === e || null === t ? t : "object" == typeof t && "x" in t ? new r.UTMK(t.x, "y" in t ? t.y : 0) : i === e ? null : new r.UTMK(t, i)
    }, r.UTMKBounds = function (t, i) {
        if (t)for (var e = i ? [t, i] : t, n = 0, o = e.length; o > n; n++)this.extend(e[n])
    }, r.UTMKBounds.prototype = {
        extend: function (t) {
            var i, e, n = this._southWest, o = this._northEast;
            if (t instanceof r.UTMK) i = t, e = t; else {
                if (!(t instanceof r.UTMKBounds))return t ? this.extend(r.utmk(t) || r.utmkBounds(t)) : this;
                if (i = t._southWest, e = t._northEast, !i || !e)return this
            }
            return n || o ? (n.x = Math.min(i.x, n.x), n.y = Math.min(i.y, n.y), o.x = Math.max(e.x, o.x), o.y = Math.max(e.y, o.y)) : (this._southWest = new r.UTMK(i.x, i.y), this._northEast = new r.UTMK(e.x, e.y)), this
        }, pad: function (t) {
            var i = this._southWest, e = this._northEast, n = Math.abs(i.y - e.y) * t, o = Math.abs(i.x - e.x) * t;
            return new r.UTMKBounds(new r.UTMK(i.x - o, i.y - n), new r.UTMK(e.x + o, e.y + n))
        }, getCenter: function () {
            return new r.UTMK((this._southWest.x + this._northEast.x) / 2, (this._southWest.y + this._northEast.y) / 2)
        }, getSouthWest: function () {
            return this._southWest
        }, getNorthEast: function () {
            return this._northEast
        }, getNorthWest: function () {
            return new r.UTMK(this.getWest(), this.getNorth())
        }, getSouthEast: function () {
            return new r.UTMK(this.getEast(), this.getSouth())
        }, getWest: function () {
            return this._southWest.x
        }, getSouth: function () {
            return this._southWest.y
        }, getEast: function () {
            return this._northEast.x
        }, getNorth: function () {
            return this._northEast.y
        }, contains: function (t) {
            t = "number" == typeof t[0] || t instanceof r.UTMK ? r.utmk(t) : r.utmkBounds(t);
            var i, e, n = this._southWest, o = this._northEast;
            return t instanceof r.UTMKBounds ? (i = t.getSouthWest(), e = t.getNorthEast()) : i = e = t, i.x >= n.x && e.x <= o.x && i.y >= n.y && e.y <= o.y
        }, intersects: function (t) {
            t = r.utmkBounds(t);
            var i = this._southWest, e = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), s = o.y >= i.y && n.y <= e.y, a = o.x >= i.x && n.x <= e.x;
            return s && a
        }, overlaps: function (t) {
            t = r.utmkBounds(t);
            var i = this._southWest, e = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), s = o.y > i.y && n.y < e.y, a = o.x > i.x && n.x < e.x;
            return s && a
        }, toBBoxString: function () {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        }, equals: function (t) {
            return t ? (t = r.utmkBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast())) : !1
        }, isValid: function () {
            return !(!this._southWest || !this._northEast)
        }
    }, r.utmkBounds = function (t, i) {
        return !t || t instanceof r.UTMKBounds ? t : new r.UTMKBounds(t, i)
    }, r.Projection = {}, r.Projection.UTMK = {
        bounds: r.bounds([171162, 1214781], [1744026, 2787645]),
        utmkBounds: r.utmkBounds([[171162, 1214781], [1744026, 2787645]]),
        project: function (t) {
            return new r.Point(t.x, t.y)
        },
        unproject: function (t) {
            return new r.UTMK(t.x, t.y)
        }
    }, r.CRS = {
        utmkToPoint: function (t, i) {
            var e = this.projection.project(t), n = this.scale(i);
            return this.transformation._transform(e, n)
        }, pointToUTMK: function (t, i) {
            var e = this.scale(i), n = this.transformation.untransform(t, e);
            return this.projection.unproject(n)
        }, project: function (t) {
            return this.projection.project(t)
        }, unproject: function (t) {
            return this.projection.unproject(t)
        }, scale: function (t) {
            return 256 * Math.pow(2, t)
        }, getProjectedBounds: function (t) {
            if (this.infinite)return null;
            var i = this.projection.bounds, e = this.scale(t), n = this.transformation.transform(i.min, e), o = this.transformation.transform(i.max, e);
            return r.bounds(n, o)
        }, wrapUTMK: function (t) {
            var i = this.wrapX ? r.Util.wrapNum(t.x, this.wrapX, !0) : t.x, e = this.wrapY ? r.Util.wrapNum(t.y, this.wrapY, !0) : t.y;
            return r.utmk(i, e)
        }
    }, r.CRS.UTMK = r.extend({}, r.CRS, {
        projection: r.Projection.UTMK,
        transformation: new r.Transformation(1, -171162, -1, 2787645),
        resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25],
        _scales: function () {
            for (var t = [], i = 0, e = this.resolutions.length; e > i; i++)t[i] = 1 / this.resolutions[i];
            return t
        },
        scale: function (t) {
            return t = Math.round(t), "function" == typeof this._scales && (this._scales = this._scales()), this._scales[t]
        },
        distance: function (t, i) {
            var e = i.x - t.x, n = i.y - t.y;
            return Math.sqrt(e * e + n * n)
        },
        code: "UTMK"
    }), r.Map = r.Evented.extend({
        options: {crs: r.CRS.UTMK, fadeAnimation: !0, trackResize: !0, markerZoomAnimation: !0, maxBoundsViscosity: 0},
        initialize: function (t, i) {
            i = r.setOptions(this, i), this._initContainer(t), this._initLayout(), this._onResize = r.bind(this._onResize, this), this._initEvents(), i.maxBounds && this.setMaxBounds(i.maxBounds), i.zoom !== e && (this._zoom = this._limitZoom(i.zoom)), i.center && i.zoom !== e && this.setView(r.utmk(i.center), i.zoom, {reset: !0}), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this.callInitHooks(), this._addLayers(this.options.layers)
        },
        setView: function (t, i) {
            return i = i === e ? this.getZoom() : i, this._resetView(r.utmk(t), i), this
        },
        setZoom: function (t, i) {
            return this._loaded ? this.setView(this.getCenter(), t, {zoom: i}) : (this._zoom = t, this)
        },
        zoomIn: function (t, i) {
            return this.setZoom(this._zoom + (t || 1), i)
        },
        zoomOut: function (t, i) {
            return this.setZoom(this._zoom - (t || 1), i)
        },
        setZoomAround: function (t, i, e) {
            var n = this.getZoomScale(i), o = this.getSize().divideBy(2), s = t instanceof r.Point ? t : this.utmkToContainerPoint(t), a = s.subtract(o).multiplyBy(1 - 1 / n), h = this.containerPointToUTMK(o.add(a));
            return this.setView(h, i, {zoom: e})
        },
        _getBoundsCenterZoom: function (t, i) {
            i = i || {}, t = t.getBounds ? t.getBounds() : r.utmkBounds(t);
            var e = r.point(i.paddingTopLeft || i.padding || [0, 0]), n = r.point(i.paddingBottomRight || i.padding || [0, 0]), o = this.getBoundsZoom(t, !1, e.add(n));
            o = i.maxZoom ? Math.min(i.maxZoom, o) : o;
            var s = n.subtract(e).divideBy(2), a = this.project(t.getSouthWest(), o), h = this.project(t.getNorthEast(), o), u = this.unproject(a.add(h).divideBy(2).add(s), o);
            return {center: u, zoom: o}
        },
        fitBounds: function (t, i) {
            var e = this._getBoundsCenterZoom(t, i);
            return this.setView(e.center, e.zoom, i)
        },
        panTo: function (t, i) {
            return this.setView(t, this._zoom, {pan: i})
        },
        panBy: function (t) {
            return this.fire("movestart"), this._rawPanBy(r.point(t)), this.fire("move"), this.fire("moveend")
        },
        setMaxBounds: function (t) {
            return (t = r.utmkBounds(t)) ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : this.off("moveend", this._panInsideMaxBounds)
        },
        setMinZoom: function (t) {
            return this.options.minZoom = t, this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(t) : this
        },
        setMaxZoom: function (t) {
            return this.options.maxZoom = t, this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(t) : this
        },
        panInsideBounds: function (t, i) {
            var e = this.getCenter(), n = this._limitCenter(e, this._zoom, r.utmkBounds(t));
            return e.equals(n) ? this : this.panTo(n, i)
        },
        invalidateSize: function (t) {
            if (!this._loaded)return this;
            t = r.extend({animate: !1, pan: !0}, t === !0 ? {animate: !0} : t);
            var i = this.getSize();
            this._sizeChanged = !0, this._lastCenter = null;
            var e = this.getSize(), n = i.divideBy(2).round(), o = e.divideBy(2).round(), s = n.subtract(o);
            return s.x || s.y ? (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(r.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: i,
                    newSize: e
                })) : this
        },
        stop: function () {
            return r.Util.cancelAnimFrame(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
        },
        addHandler: function (t, i) {
            if (!i)return this;
            var e = this[t] = new i(this);
            return this._handlers.push(e), this.options[t] && e.enable(), this
        },
        remove: function () {
            this._initEvents(!0);
            try {
                delete this._container._sop
            } catch (t) {
                this._container._sop = e
            }
            r.DomUtil.remove(this._mapPane), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this._loaded && this.fire("unload");
            for (var i in this._layers)this._layers[i].remove();
            return this
        },
        createPane: function (t, i) {
            var e = "sop-pane" + (t ? " sop-" + t.replace("Pane", "") + "-pane" : ""), n = r.DomUtil.create("div", e, i || this._mapPane);
            return t && (this._panes[t] = n), n
        },
        getCenter: function () {
            return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToUTMK(this._getCenterLayerPoint())
        },
        getZoom: function () {
            return this._zoom
        },
        getBounds: function () {
            var t = this.getPixelBounds(), i = this.unproject(t.getBottomLeft()), e = this.unproject(t.getTopRight());
            return new r.UTMKBounds(i, e)
        },
        getMinZoom: function () {
            return this.options.minZoom === e ? this._layersMinZoom || 0 : this.options.minZoom
        },
        getMaxZoom: function () {
            return this.options.maxZoom === e ? this._layersMaxZoom === e ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function (t, i, e) {
            t = r.utmkBounds(t);
            var n, o = this.getMinZoom() - (i ? 1 : 0), s = this.getMaxZoom(), a = this.getSize(), h = t.getNorthWest(), u = t.getSouthEast(), l = !0;
            e = r.point(e || [0, 0]);
            do o++, n = this.project(u, o).subtract(this.project(h, o)).add(e).floor(), l = i ? n.x < a.x || n.y < a.y : a.contains(n); while (l && s >= o);
            return l && i ? null : i ? o : o - 1
        },
        getSize: function () {
            return (!this._size || this._sizeChanged) && (this._size = new r.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
        },
        getPixelBounds: function (t, i) {
            var e = this._getTopLeftPoint(t, i);
            return new r.Bounds(e, e.add(this.getSize()))
        },
        getPixelOrigin: function () {
            return this._checkIfLoaded(), this._pixelOrigin
        },
        getPixelWorldBounds: function (t) {
            return this.options.crs.getProjectedBounds(t === e ? this.getZoom() : t)
        },
        getPane: function (t) {
            return "string" == typeof t ? this._panes[t] : t
        },
        getPanes: function () {
            return this._panes
        },
        getContainer: function () {
            return this._container
        },
        getZoomScale: function (t, i) {
            var n = this.options.crs;
            return i = i === e ? this._zoom : i, n.scale(t) / n.scale(i)
        },
        getScaleZoom: function (t, i) {
            return i = i === e ? this._zoom : i, i + Math.log(t) / Math.LN2
        },
        project: function (t, i) {
            return i = i === e ? this._zoom : i, this.options.crs.utmkToPoint(r.utmk(t), i)
        },
        unproject: function (t, i) {
            return i = i === e ? this._zoom : i, this.options.crs.pointToUTMK(r.point(t), i)
        },
        layerPointToUTMK: function (t) {
            var i = r.point(t).add(this.getPixelOrigin());
            return this.unproject(i)
        },
        utmkToLayerPoint: function (t) {
            var i = this.project(r.utmk(t))._round();
            return i._subtract(this.getPixelOrigin())
        },
        wrapUTMK: function (t) {
            return this.options.crs.wrapUTMK(r.utmk(t))
        },
        distance: function (t, i) {
            return this.options.crs.distance(r.utmk(t), r.utmk(i))
        },
        containerPointToLayerPoint: function (t) {
            return r.point(t).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function (t) {
            return r.point(t).add(this._getMapPanePos())
        },
        containerPointToUTMK: function (t) {
            var i = this.containerPointToLayerPoint(r.point(t));
            return this.layerPointToUTMK(i)
        },
        utmkToContainerPoint: function (t) {
            return this.layerPointToContainerPoint(this.utmkToLayerPoint(r.utmk(t)))
        },
        mouseEventToContainerPoint: function (t) {
            return r.DomEvent.getMousePosition(t, this._container)
        },
        mouseEventToLayerPoint: function (t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
        },
        mouseEventToUTMK: function (t) {
            return this.layerPointToUTMK(this.mouseEventToLayerPoint(t))
        },
        _initContainer: function (t) {
            var i = this._container = r.DomUtil.get(t);
            if (!i)throw new Error("Map container not found.");
            if (i._sop)throw new Error("Map container is already initialized.");
            r.DomEvent.addListener(i, "scroll", this._onScroll, this), i._sop = !0
        },
        _initLayout: function () {
            var t = this._container;
            this._fadeAnimated = this.options.fadeAnimation && r.Browser.any3d, r.DomUtil.addClass(t, "sop-container" + (r.Browser.touch ? " sop-touch" : "") + (r.Browser.retina ? " sop-retina" : "") + (r.Browser.ielt9 ? " sop-oldie" : "") + (r.Browser.safari ? " sop-safari" : "") + (this._fadeAnimated ? " sop-fade-anim" : ""));
            var i = r.DomUtil.getStyle(t, "position");
            "absolute" !== i && "relative" !== i && "fixed" !== i && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
        },
        _initPanes: function () {
            var t = this._panes = {};
            this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), r.DomUtil.setPosition(this._mapPane, new r.Point(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("infowindowPane"), this.options.markerZoomAnimation || (r.DomUtil.addClass(t.markerPane, "sop-zoom-hide"), r.DomUtil.addClass(t.shadowPane, "sop-zoom-hide"))
        },
        _resetView: function (t, i) {
            r.DomUtil.setPosition(this._mapPane, new r.Point(0, 0));
            var e = !this._loaded;
            this._loaded = !0, i = this._limitZoom(i);
            var n = this._zoom !== i;
            this._moveStart(n)._move(t, i)._moveEnd(n), this.fire("viewreset"), e && this.fire("load")
        },
        _moveStart: function (t) {
            return t && this.fire("zoomstart"), this.fire("movestart")
        },
        _move: function (t, i, n) {
            i === e && (i = this._zoom);
            var o = this._zoom !== i;
            return this._zoom = i, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), o && this.fire("zoom", n), this.fire("move", n)
        },
        _moveEnd: function (t) {
            return t && this.fire("zoomend"), this.fire("moveend")
        },
        _rawPanBy: function (t) {
            r.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
        },
        _getZoomSpan: function () {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _panInsideMaxBounds: function () {
            this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function () {
            if (!this._loaded)throw new Error("Set map center and zoom first.")
        },
        _initEvents: function (i) {
            if (r.DomEvent) {
                this._targets = {}, this._targets[r.stamp(this._container)] = this;
                var e = i ? "off" : "on";
                r.DomEvent[e](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), this.options.trackResize && r.DomEvent[e](t, "resize", this._onResize, this), this.on("absclickstart", function () {
                    this.absClick = !0
                }), this.on("absclickend", function () {
                    this.absClick = !1
                })
            }
        },
        _onResize: function () {
            r.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = r.Util.requestAnimFrame(function () {
                this.invalidateSize({debounceMoveend: !0})
            }, this, !1, this._container)
        },
        _onScroll: function () {
            this._container.scrollTop = 0, this._container.scrollLeft = 0
        },
        _findEventTargets: function (t, i) {
            for (var e, n = [], o = "mouseout" === i || "mouseover" === i, s = t.target || t.srcElement, a = !1; s;) {
                if (e = this._targets[r.stamp(s)], e && ("click" === i || "preclick" === i) && !t._simulated && this._draggableMoved(e)) {
                    a = !0;
                    break
                }
                if (e && e.listens(i, !0)) {
                    if (o && !r.DomEvent._isExternalTarget(s, t))break;
                    if (n.push(e), o)break
                }
                if (s === this._container)break;
                s = s.parentNode
            }
            return n.length || a || o || !r.DomEvent._isExternalTarget(s, t) || (n = [this]), n
        },
        _handleDOMEvent: function (t) {
            if (this._loaded && !r.DomEvent._skipped(t)) {
                var i = "keypress" === t.type && 13 === t.keyCode ? "click" : t.type;
                if ("click" === t.type) {
                    var e = r.Util.extend({}, t);
                    e.type = "preclick", this._handleDOMEvent(e)
                }
                "mousedown" === i && r.DomUtil.preventOutline(t.target || t.srcElement), this._fireDOMEvent(t, i)
            }
        },
        _fireDOMEvent: function (t, i, e) {
            if (!t._stopped && (e = (e || []).concat(this._findEventTargets(t, i)), e.length)) {
                var n = e[0];
                "contextmenu" === i && n.listens(i, !0) && r.DomEvent.preventDefault(t);
                var o = {originalEvent: t};
                if ("keypress" !== t.type) {
                    var s = n instanceof r.Marker;
                    o.containerPoint = s ? this.utmkToContainerPoint(n.getUTMK()) : this.mouseEventToContainerPoint(t), o.layerPoint = this.containerPointToLayerPoint(o.containerPoint), o.utmk = s ? n.getUTMK() : this.layerPointToUTMK(o.layerPoint)
                }
                for (var a = 0; a < e.length; a++)if (e[a].fire(i, o, !0), o.originalEvent._stopped || e[a].options.nonBubblingEvents && -1 !== r.Util.indexOf(e[a].options.nonBubblingEvents, i))return
            }
        },
        _draggableMoved: function (t) {
            return t = t.options.draggable ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
        },
        _clearHandlers: function () {
            for (var t = 0, i = this._handlers.length; i > t; t++)this._handlers[t].disable()
        },
        whenReady: function (t, i) {
            return this._loaded ? t.call(i || this, {target: this}) : this.on("load", t, i), this
        },
        _getMapPanePos: function () {
            return r.DomUtil.getPosition(this._mapPane) || new r.Point(0, 0)
        },
        _moved: function () {
            var t = this._getMapPanePos();
            return t && !t.equals([0, 0])
        },
        _getTopLeftPoint: function (t, i) {
            var n = t && i !== e ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin();
            return n.subtract(this._getMapPanePos())
        },
        _getNewPixelOrigin: function (t, i) {
            var e = this.getSize()._divideBy(2);
            return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round()
        },
        _utmkToNewLayerPoint: function (t, i, e) {
            var n = this._getNewPixelOrigin(e, i);
            return this.project(t, i)._subtract(n)
        },
        _getCenterLayerPoint: function () {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function (t) {
            return this.utmkToLayerPoint(t).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function (t, i, e) {
            if (!e)return t;
            var n = this.project(t, i), o = this.getSize().divideBy(2), s = new r.Bounds(n.subtract(o), n.add(o)), a = this._getBoundsOffset(s, e, i);
            return this.unproject(n.add(a), i)
        },
        _limitOffset: function (t, i) {
            if (!i)return t;
            var e = this.getPixelBounds(), n = new r.Bounds(e.min.add(t), e.max.add(t));
            return t.add(this._getBoundsOffset(n, i))
        },
        _getBoundsOffset: function (t, i, e) {
            var n = this.project(i.getNorthWest(), e).subtract(t.min), o = this.project(i.getSouthEast(), e).subtract(t.max), s = this._rebound(n.x, -o.x), a = this._rebound(n.y, -o.y);
            return new r.Point(s, a)
        },
        _rebound: function (t, i) {
            return t + i > 0 ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
        },
        _limitZoom: function (t) {
            var i = this.getMinZoom(), e = this.getMaxZoom();
            return r.Browser.any3d || (t = Math.round(t)), Math.max(i, Math.min(e, t))
        }
    }), r.map = function (t, i) {
        return new r.Map(t, i)
    }, r.Layer = r.Evented.extend({
        options: {pane: "overlayPane"}, addTo: function (t) {
            return t.addLayer(this), this
        }, remove: function () {
            return this.removeFrom(this._map || this._mapToAdd)
        }, removeFrom: function (t) {
            return t && t.removeLayer(this), this
        }, getPane: function (t) {
            return this._map.getPane(t ? this.options[t] || t : this.options.pane)
        }, addInteractiveTarget: function (t) {
            return this._map._targets[r.stamp(t)] = this, this
        }, removeInteractiveTarget: function (t) {
            return delete this._map._targets[r.stamp(t)], this
        }, isInfoWindowOpen: function () {
            return this._infowindow.isOpen()
        }, _layerAdd: function (t) {
            var i = t.target;
            i.hasLayer(this) && (this._map = i, this._zoomAnimated = i._zoomAnimated, this.onAdd(i), this.getAttribution && this._map.attributionControl && this._map.attributionControl.addAttribution(this.getAttribution()), this.getEvents && i.on(this.getEvents(), this), this.fire("add"), i.fire("layeradd", {layer: this}))
        }
    }), r.Map.include({
        addLayer: function (t) {
            var i = r.stamp(t);
            return this._layers[i] ? t : (this._layers[i] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
        }, removeLayer: function (t) {
            var i = r.stamp(t);
            return this._layers[i] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), t.getEvents && this.off(t.getEvents(), t), delete this._layers[i], this._loaded && (this.fire("layerremove", {layer: t}), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
        }, hasLayer: function (t) {
            return !!t && r.stamp(t) in this._layers
        }, eachLayer: function (t, i) {
            for (var e in this._layers)t.call(i, this._layers[e]);
            return this
        }, _addLayers: function (t) {
            t = t ? r.Util.isArray(t) ? t : [t] : [];
            for (var i = 0, e = t.length; e > i; i++)this.addLayer(t[i])
        }, _addZoomLimit: function (t) {
            (isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[r.stamp(t)] = t, this._updateZoomLevels())
        }, _removeZoomLimit: function (t) {
            var i = r.stamp(t);
            this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i], this._updateZoomLevels())
        }, _updateZoomLevels: function () {
            var t = 1 / 0, i = -(1 / 0), n = this._getZoomSpan();
            for (var o in this._zoomBoundLayers) {
                var s = this._zoomBoundLayers[o].options;
                t = s.minZoom === e ? t : Math.min(t, s.minZoom), i = s.maxZoom === e ? i : Math.max(i, s.maxZoom)
            }
            this._layersMaxZoom = i === -(1 / 0) ? e : i, this._layersMinZoom = t === 1 / 0 ? e : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange")
        }
    }), r.GridLayer = r.Layer.extend({
        options: {
            pane: "tilePane",
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: r.Browser.mobile,
            updateInterval: 200,
            attribution: null,
            zIndex: null,
            bounds: null,
            minZoom: 0
        }, initialize: function (t) {
            t = r.setOptions(this, t)
        }, onAdd: function () {
            this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update()
        }, beforeAdd: function (t) {
            t._addZoomLimit(this)
        }, onRemove: function (t) {
            r.DomUtil.remove(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = null
        }, bringToFront: function () {
            return this._map && (r.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)), this
        }, bringToBack: function () {
            return this._map && (r.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)), this
        }, getAttribution: function () {
            return this.options.attribution
        }, getContainer: function () {
            return this._container
        }, setOpacity: function (t) {
            return this.options.opacity = t, this._updateOpacity(), this
        }, setZIndex: function (t) {
            return this.options.zIndex = t, this._updateZIndex(), this
        }, isLoading: function () {
            return this._loading
        }, redraw: function () {
            return this._map && (this._removeAllTiles(), this._update()), this
        }, getEvents: function () {
            var t = {viewreset: this._resetAll, zoom: this._resetView, moveend: this._onMoveEnd};
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = r.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        }, createTile: function () {
            return i.createElement("div")
        }, getTileSize: function () {
            var t = this.options.tileSize;
            return t instanceof r.Point ? t : new r.Point(t, t)
        }, _updateZIndex: function () {
            this._container && this.options.zIndex !== e && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        }, _setAutoZIndex: function (t) {
            for (var i, e = this.getPane().children, n = -t(-(1 / 0), 1 / 0), o = 0, s = e.length; s > o; o++)i = e[o].style.zIndex, e[o] !== this._container && i && (n = t(n, +i));
            isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
        }, _updateOpacity: function () {
            if (this._map) {
                var t = this.options.opacity;
                if (!r.Browser.ielt9 && !this._map._fadeAnimated)return void r.DomUtil.setOpacity(this._container, t);
                var i = +new Date, e = !1, n = !1;
                for (var o in this._tiles) {
                    var s = this._tiles[o];
                    if (s.current && s.loaded) {
                        var a = Math.min(1, (i - s.loaded) / 200);
                        1 > a ? (r.DomUtil.setOpacity(s.el, t * a), e = !0) : (r.DomUtil.setOpacity(s.el, t), s.active && (n = !0), s.active = !0)
                    }
                }
                n && this._pruneTiles(), e && (r.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = r.Util.requestAnimFrame(this._updateOpacity, this))
            }
        }, _initContainer: function () {
            this._container || (this._container = r.DomUtil.create("div", "sop-layer"), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
        }, _updateLevels: function () {
            var t = this._tileZoom, i = this.options.maxZoom;
            for (var e in this._levels)this._levels[e].el.children.length || e === t ? this._levels[e].el.style.zIndex = i - Math.abs(t - e) : (r.DomUtil.remove(this._levels[e].el), delete this._levels[e]);
            var n = this._levels[t], o = this._map;
            return n || (n = this._levels[t] = {}, n.el = r.DomUtil.create("div", "sop-tile-container sop-zoom-animated", this._container), n.el.style.zIndex = i, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), r.Util.falseFn(n.el.offsetWidth)), this._level = n, n
        }, _pruneTiles: function () {
            var t, i, e = this._map.getZoom();
            if (e > this.options.maxZoom || e < this.options.minZoom)return this._removeAllTiles();
            for (t in this._tiles)i = this._tiles[t], i.retain = i.current;
            for (t in this._tiles)if (i = this._tiles[t], i.current && !i.active) {
                var n = i.coords;
                this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
            }
            for (t in this._tiles)this._tiles[t].retain || this._removeTile(t)
        }, _removeAllTiles: function () {
            for (var t in this._tiles)this._removeTile(t)
        }, _resetAll: function () {
            for (var t in this._levels)r.DomUtil.remove(this._levels[t].el), delete this._levels[t];
            this._removeAllTiles(), this._tileZoom = null, this._resetView()
        }, _retainParent: function (t, i, e, n) {
            var o = Math.floor(t / 2), s = Math.floor(i / 2), r = e - 1, a = o + ":" + s + ":" + r, h = this._tiles[a];
            return h && h.active ? (h.retain = !0, !0) : (h && h.loaded && (h.retain = !0), r > n ? this._retainParent(o, s, r, n) : !1)
        }, _retainChildren: function (t, i, e, n) {
            for (var o = 2 * t; 2 * t + 2 > o; o++)for (var s = 2 * i; 2 * i + 2 > s; s++) {
                var r = o + ":" + s + ":" + (e + 1), a = this._tiles[r];
                a && a.active ? a.retain = !0 : (a && a.loaded && (a.retain = !0), n > e + 1 && this._retainChildren(o, s, e + 1, n))
            }
        }, _resetView: function (t) {
            var i = t && t.pinch;
            this._setView(this._map.getCenter(), this._map.getZoom(), i, i)
        }, _animateZoom: function (t) {
            this._setView(t.center, t.zoom, !0, t.noUpdate)
        }, _setView: function (t, i, n, o) {
            var s = Math.round(i), r = this._tileZoom !== s;
            !o && r && (this._abortLoading && this._abortLoading(), this._tileZoom = s, this._updateLevels(), this._resetGrid(), s !== e && this._update(t, s), n || this._pruneTiles()), this._setZoomTransforms(t, i)
        }, _setZoomTransforms: function (t, i) {
            for (var e in this._levels)this._setZoomTransform(this._levels[e], t, i)
        }, _setZoomTransform: function (t, i, e) {
            var n = this._map.getZoomScale(e, t.zoom), o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round();
            r.Browser.any3d ? r.DomUtil.setTransform(t.el, o, n) : r.DomUtil.setPosition(t.el, o)
        }, _resetGrid: function () {
            var t = this._map, i = t.options.crs, e = this._tileSize = this.getTileSize(), n = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
            o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = i.wrapLng && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)], this._wrapY = i.wrapLat && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)]
        }, _onMoveEnd: function () {
            this._map && (this._update(), this._pruneTiles())
        }, _getTiledPixelBounds: function (t, i, e) {
            var n = this._map, o = n.getZoomScale(i, e), s = n.project(t, e).floor(), a = n.getSize().divideBy(2 * o);
            return new r.Bounds(s.subtract(a), s.add(a))
        }, _update: function (t, n) {
            var o = this._map;
            if (o) {
                t === e && (t = o.getCenter()), n === e && (n = o.getZoom());
                var s = Math.round(n);
                if (!(s > this.options.maxZoom || s < this.options.minZoom)) {
                    var a = this._getTiledPixelBounds(t, n, s), h = this._pxBoundsToTileRange(a), u = h.getCenter(), l = [];
                    for (var c in this._tiles)this._tiles[c].current = !1;
                    for (var d = h.min.y; d <= h.max.y; d++)for (var m = h.min.x; m <= h.max.x; m++) {
                        var p = new r.Point(m, d);
                        if (p.z = s, this._isValidTile(p)) {
                            var f = this._tiles[this._tileCoordsToKey(p)];
                            f && f.coords.z === s ? f.current = !0 : l.push(p)
                        }
                    }
                    if (l.sort(function (t, i) {
                            return t.distanceTo(u) - i.distanceTo(u)
                        }), 0 !== l.length) {
                        this._loading || (this._loading = !0, this.fire("loading"));
                        var _ = i.createDocumentFragment();
                        for (m = 0; m < l.length; m++)this._addTile(l[m], _);
                        this._level.el.appendChild(_)
                    }
                }
            }
        }, _isValidTile: function (t) {
            var i = this._map.options.crs;
            if (!i.infinite) {
                var e = this._globalTileRange;
                if (!i.wrapX && (t.x < e.min.x || t.x > e.max.x) || !i.wrapY && (t.y < e.min.y || t.y > e.max.y))return !1
            }
            if (!this.options.bounds)return !0;
            var n = this._tileCoordsToBounds(t);
            return r.utmkBounds(this.options.bounds).overlaps(n)
        }, _keyToBounds: function (t) {
            return this._tileCoordsToBounds(this._keyToTileCoords(t))
        }, _tileCoordsToBounds: function (t) {
            var i = this._map, e = this.getTileSize(), n = t.scaleBy(e), o = n.add(e), s = i.wrapUTMK(i.unproject(n, t.z)), a = i.wrapUTMK(i.unproject(o, t.z));
            return new r.UTMKBounds(s, a)
        }, _tileCoordsToKey: function (t) {
            return t.x + ":" + t.y
        }, _keyToTileCoords: function (t) {
            var i = t.split(":"), e = new r.Point(+i[0], +i[1]);
            return e.z = +i[2], e
        }, _removeTile: function (t) {
            var i = this._tiles[t];
            i && (r.DomUtil.remove(i.el), delete this._tiles[t], this.fire("tileunload", {
                tile: i.el,
                coords: this._keyToTileCoords(t)
            }))
        }, _initTile: function (t) {
            r.DomUtil.addClass(t, "sop-tile");
            var i = this.getTileSize();
            t.style.width = i.x + "px", t.style.height = i.y + "px", t.onselectstart = r.Util.falseFn, t.onmousemove = r.Util.falseFn, r.Browser.ielt9 && this.options.opacity < 1 && r.DomUtil.setOpacity(t, this.options.opacity), r.Browser.android && !r.Browser.android23 && (t.style.WebkitBackfaceVisibility = "hidden")
        }, _addTile: function (t, i) {
            var e = this._getTilePos(t), n = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), r.bind(this._tileReady, this, t));
            this._initTile(o), this.createTile.length < 2 && setTimeout(r.bind(this._tileReady, this, t, null, o), 0), r.DomUtil.setPosition(o, e), this._tiles[n] = {
                el: o,
                coords: t,
                current: !0
            }, i.appendChild(o), this.fire("tileloadstart", {tile: o, coords: t})
        }, _tileReady: function (t, i, e) {
            if (this._map) {
                i && this.fire("tileerror", {error: i, tile: e, coords: t});
                var n = this._tileCoordsToKey(t);
                e = this._tiles[n], e && (e.loaded = +new Date, this._map._fadeAnimated ? (r.DomUtil.setOpacity(e.el, 0), r.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = r.Util.requestAnimFrame(this._updateOpacity, this)) : (e.active = !0, this._pruneTiles()), r.DomUtil.addClass(e.el, "sop-tile-loaded"), this.fire("tileload", {
                    tile: e.el,
                    coords: t
                }), this._noTilesToLoad() && (this._loading = !1, this.fire("load")))
            }
        }, _getTilePos: function (t) {
            return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
        }, _wrapCoords: function (t) {
            var i = new r.Point(this._wrapX ? r.Util.wrapNum(t.x, this._wrapX) : t.x, this._wrapY ? r.Util.wrapNum(t.y, this._wrapY) : t.y);
            return i.z = t.z, i
        }, _pxBoundsToTileRange: function (t) {
            var i = this.getTileSize();
            return new r.Bounds(t.min.unscaleBy(i).floor(), t.max.unscaleBy(i).ceil().subtract([1, 1]))
        }, _noTilesToLoad: function () {
            for (var t in this._tiles)if (!this._tiles[t].loaded)return !1;
            return !0
        }
    }), r.gridLayer = function (t) {
        return new r.GridLayer(t)
    }, r.TileLayer = r.GridLayer.extend({
        options: {
            maxZoom: 18,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            maxNativeZoom: null,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        }, initialize: function (t, i) {
            this._url = t, i = r.setOptions(this, i), i.detectRetina && r.Browser.retina && i.maxZoom > 0 && (i.tileSize = Math.floor(i.tileSize / 2), i.zoomOffset++, i.minZoom = Math.max(0, i.minZoom), i.maxZoom--), "string" == typeof i.subdomains && (i.subdomains = i.subdomains.split("")), r.Browser.android || this.on("tileunload", this._onTileRemove)
        }, setUrl: function (t, i) {
            return this._url = t, i || this.redraw(), this
        }, createTile: function (t, e) {
            var n = i.createElement("img");
            return n.onload = r.bind(this._tileOnLoad, this, e, n), n.onerror = r.bind(this._tileOnError, this, e, n), this.options.crossOrigin && (n.crossOrigin = ""), n.alt = "", n.src = this.getTileUrl(t), n
        }, getTileUrl: function (t) {
            return r.Util.template(this._url, r.extend({
                r: this.options.detectRetina && r.Browser.retina && this.options.maxZoom > 0 ? "@2x" : "",
                s: this._getSubdomain(t),
                x: t.x,
                y: this.options.tms ? this._globalTileRange.max.y - t.y : t.y,
                z: this._getZoomForUrl()
            }, this.options))
        }, _tileOnLoad: function (t, i) {
            r.Browser.ielt9 ? setTimeout(r.bind(t, this, null, i), 0) : t(null, i)
        }, _tileOnError: function (t, i, e) {
            var n = this.options.errorTileUrl;
            n && (i.src = n), t(e, i)
        }, getTileSize: function () {
            var t = this._map, i = r.GridLayer.prototype.getTileSize.call(this), e = this._tileZoom + this.options.zoomOffset, n = this.options.maxNativeZoom;
            return null !== n && e > n ? i.divideBy(t.getZoomScale(n, e)).round() : i
        }, _onTileRemove: function (t) {
            t.tile.onload = null
        }, _getZoomForUrl: function () {
            var t = this.options, i = this._tileZoom;
            return t.zoomReverse && (i = t.maxZoom - i), i += t.zoomOffset, t.maxNativeZoom ? Math.min(i, t.maxNativeZoom) : i
        }, _getSubdomain: function (t) {
            var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[i]
        }, _abortLoading: function () {
            var t, i;
            for (t in this._tiles)i = this._tiles[t].el, i.onload = r.Util.falseFn, i.onerror = r.Util.falseFn, i.complete || (i.src = r.Util.emptyImageUrl, r.DomUtil.remove(i))
        }
    }), r.tileLayer = function (t, i) {
        return new r.TileLayer(t, i)
    }, r.StatisticTileLayer = r.TileLayer.extend({
        options: {
            url: "//sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png",
            errorTileUrl: "//sgisapi.kostat.go.kr/tiles/missing.png",
            maxZoom: 13,
            minZoom: 0,
            zoomReverse: !1,
            continuousWorld: !1,
            tms: !1
        }, initialize: function (t, i) {
            ("string" == typeof t || "object" == typeof i) && (this.options.url = t, r.setOptions(this, i)), r.TileLayer.prototype.initialize.call(this, this.options.url, this.options)
        }, getTileUrl: function (t) {
            var i = this.options.tms ? this._tileNumBounds.max.y - t.y : t.y;
            return r.Util.template(this._url, r.extend({
                x: "C" + this.fillZero(t.x.toString(16), 8),
                y: "R" + this.fillZero(i.toString(16), 8),
                z: this.fillZero(this._getZoomForUrl().toString(10), 2)
            }, this.options))
        }, fillZero: function (t, i) {
            return "00000000".substr(0, i - (t + "").length) + t
        }
    }), r.Map.mergeOptions({statisticTileLayer: !0}), r.Map.addInitHook(function () {
        this.options.statisticTileLayer && (r.Map.mergeOptions({
            crs: r.CRS.UTMK,
            maxBounds: r.CRS.UTMK.projection.utmkBounds
        }), this.statisticTileLayer = (new r.StatisticTileLayer).addTo(this))
    }), r.BuildingLayer = r.GridLayer.extend({
        options: {minZoom: 0, maxZoom: 13}, initialize: function (t) {
            t = r.setOptions(this, t)
        }, createTile: function () {
            var t = i.createElement("div");
            return t.style.background = "white", t
        }
    }), r.Map.mergeOptions({buildingLayer: !1}), r.Map.addInitHook(function () {
        this.options.buildingLayer && (r.Map.mergeOptions({
            crs: r.CRS.UTMK,
            maxBounds: r.CRS.UTMK.projection.utmkBounds
        }), this.buildingLayer = (new r.BuildingLayer).addTo(this))
    }), r.TileLayer.WMS = r.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
        }, options: {crs: null, uppercase: !1}, initialize: function (t, i) {
            this._url = t;
            var e = r.extend({}, this.defaultWmsParams);
            for (var n in i)n in this.options || (e[n] = i[n]);
            i = r.setOptions(this, i), e.width = e.height = i.tileSize * (i.detectRetina && r.Browser.retina ? 2 : 1), this.wmsParams = e
        }, onAdd: function (t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var i = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[i] = this._crs.code, r.TileLayer.prototype.onAdd.call(this, t)
        }, getTileUrl: function (t) {
            var i = this._tileCoordsToBounds(t), e = this._crs.project(i.getNorthWest()), n = this._crs.project(i.getSouthEast()), o = (this._wmsVersion >= 1.3 && this._crs === r.CRS.EPSG4326 ? [n.y, e.x, e.y, n.x] : [e.x, n.y, n.x, e.y]).join(","), s = r.TileLayer.prototype.getTileUrl.call(this, t);
            return s + r.Util.getParamString(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o
        }, setParams: function (t, i) {
            return r.extend(this.wmsParams, t), i || this.redraw(), this
        }
    }), r.tileLayer.wms = function (t, i) {
        return new r.TileLayer.WMS(t, i)
    }, r.ImageOverlay = r.Layer.extend({
        options: {opacity: 1, alt: "", interactive: !1},
        initialize: function (t, i, e) {
            this._url = t, this._bounds = r.utmkBounds(i), r.setOptions(this, e)
        },
        onAdd: function () {
            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (r.DomUtil.addClass(this._image, "sop-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset()
        },
        onRemove: function () {
            r.DomUtil.remove(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function (t) {
            return this.options.opacity = t, this._image && this._updateOpacity(), this
        },
        setStyle: function (t) {
            return t.opacity && this.setOpacity(t.opacity), this
        },
        bringToFront: function () {
            return this._map && r.DomUtil.toFront(this._image), this
        },
        bringToBack: function () {
            return this._map && r.DomUtil.toBack(this._image), this
        },
        setUrl: function (t) {
            return this._url = t, this._image && (this._image.src = t), this
        },
        getAttribution: function () {
            return this.options.attribution
        },
        getEvents: function () {
            var t = {zoom: this._reset, viewreset: this._reset};
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        getBounds: function () {
            return this._bounds
        },
        getElement: function () {
            return this._image
        },
        _initImage: function () {
            var t = this._image = r.DomUtil.create("img", "sop-image-layer " + (this._zoomAnimated ? "sop-zoom-animated" : ""));
            t.onselectstart = r.Util.falseFn, t.onmousemove = r.Util.falseFn, t.onload = r.bind(this.fire, this, "load"), this.options.crossOrigin && (t.crossOrigin = ""), t.src = this._url, t.alt = this.options.alt
        },
        _animateZoom: function (t) {
            var i, e, n, o, s = this._map.getZoomScale(t.zoom), a = this._map._utmkToNewLayerPoint(this._bounds.getNorthWest(), t.zoom, t.center);
            n = this._image.width / 2, o = this._image.height / 2, s > 1 ? (i = n * s - n, e = o * s - o, a.x += i, a.y += e) : (i = n - n * s, e = o - o * s, a.x -= i, a.y -= e), r.DomUtil.setTransform(this._image, a, s)
        },
        _reset: function () {
            var t = this._image, i = new r.Bounds(this._map.utmkToLayerPoint(this._bounds.getNorthWest()), this._map.utmkToLayerPoint(this._bounds.getSouthEast())), e = i.getSize();
            r.DomUtil.setPosition(t, i.min), t.style.width = e.x + "px", t.style.height = e.y + "px"
        },
        _updateOpacity: function () {
            r.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    }), r.imageOverlay = function (t, i, e) {
        return new r.ImageOverlay(t, i, e)
    }, r.Icon = r.Class.extend({
        initialize: function (t) {
            r.setOptions(this, t)
        }, createIcon: function (t) {
            return this._createIcon("icon", t)
        }, createShadow: function (t) {
            return this._createIcon("shadow", t)
        }, _createIcon: function (t, i) {
            var e = this._getIconUrl(t);
            if (!e) {
                if ("icon" === t)throw new Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            var n = this._createImg(e, i && "IMG" === i.tagName ? i : null);
            return this._setIconStyles(n, t), n
        }, _setIconStyles: function (t, i) {
            var e = this.options, n = r.point(e[i + "Size"]), o = r.point("shadow" === i && e.shadowAnchor || e.iconAnchor || n && n.divideBy(2, !0));
            t.className = "sop-marker-" + i + " " + (e.className || ""), o && (t.style.marginLeft = -o.x + "px", t.style.marginTop = -o.y + "px"), n && (t.style.width = n.x + "px", t.style.height = n.y + "px")
        }, _createImg: function (t, e) {
            return e = e || i.createElement("img"), e.src = t, e
        }, _getIconUrl: function (t) {
            return r.Browser.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
        }
    }), r.icon = function (t) {
        return new r.Icon(t)
    }, r.Icon.Default = r.Icon.extend({
        options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            infoWindowAnchor: [1, -34],
            shadowSize: [41, 41],
            iconUrl: "//sgisapi.kostat.go.kr/maps/images/marker-icon.png",
            shadowUrl: "//sgisapi.kostat.go.kr/maps/images/marker-shadow.png"
        }, _getIconUrl: function (t) {
            var i = t + "Url";
            if (this.options[i])return this.options[i];
            var e = r.Const.IMAGE_PATH;
            if (!e)throw new Error("Couldn't autodetect sop.Const.imagePath, set it manually.");
            return e + "/marker-" + t + (r.Browser.retina && "icon" === t ? "-2x" : "") + ".png"
        }
    }), r.Icon.Default.imagePath = function () {
        var t, e, n, o, s = i.getElementsByTagName("script"), r = /[\/^]sop[\-\._]?([\w\-\._]*)\.js\??/;
        for (t = 0, e = s.length; e > t; t++)if (n = s[t].src, n.match(r))return o = n.split(r)[0], (o ? o + "/" : "") + "images"
    }(), r.Marker = r.Layer.extend({
        options: {
            pane: "markerPane",
            nonBubblingEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
            icon: new r.Icon.Default,
            interactive: !0,
            keyboard: !0,
            zIndexOffset: 0,
            opacity: 1,
            riseOffset: 250
        }, initialize: function (t, i) {
            r.setOptions(this, i), this._utmk = r.utmk(t)
        }, onAdd: function (t) {
            this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._initIcon(), this.update()
        }, onRemove: function () {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), this._removeIcon(), this._removeShadow(), this.removeCaption()
        }, getEvents: function () {
            var t = {zoom: this.update, viewreset: this.update};
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        }, getUTMK: function () {
            return this._utmk
        }, setUTMK: function (t) {
            var i = this._utmk;
            return this._utmk = r.utmk(t), this.update(), this.fire("move", {oldUtmk: i, utmk: this._utmk})
        }, setZIndexOffset: function (t) {
            return this.options.zIndexOffset = t, this.update()
        }, setIcon: function (t) {
            return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._infoWindow && this.bindInfoWindow(this._infoWindow), this
        }, getElement: function () {
            return this._icon
        }, update: function () {
            if (this._icon) {
                var t = this._map.utmkToLayerPoint(this._utmk).round();
                this._setPos(t)
            }
            return this._updateCaptionPos(), this
        }, _initIcon: function () {
            var t = this.options, i = "sop-zoom-" + (this._zoomAnimated ? "animated" : "hide"), e = t.icon.createIcon(this._icon), n = !1;
            e !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (e.title = t.title), t.alt && (e.alt = t.alt)), r.DomUtil.addClass(e, i), t.keyboard && (e.tabIndex = "0"), this._icon = e, this._initInteraction(), t.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var o = t.icon.createShadow(this._shadow), s = !1;
            o !== this._shadow && (this._removeShadow(), s = !0), o && r.DomUtil.addClass(o, i), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), o && s && this.getPane("shadowPane").appendChild(this._shadow)
        }, _removeIcon: function () {
            this.options.riseOnHover && this.off(this._icon, {
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            }), r.DomUtil.remove(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null
        }, _removeShadow: function () {
            this._shadow && r.DomUtil.remove(this._shadow), this._shadow = null
        }, _setPos: function (t) {
            r.DomUtil.setPosition(this._icon, t), this._shadow && r.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
        }, _updateZIndex: function (t) {
            this._icon.style.zIndex = this._zIndex + t
        }, _animateZoom: function (t) {
            var i = this._map._utmkToNewLayerPoint(this._utmk, t.zoom, t.center).round();
            this._setPos(i), this._updateCaptionPos(t)
        }, _initInteraction: function () {
            if (this.options.interactive && (r.DomUtil.addClass(this._icon, "sop-interactive"), this.addInteractiveTarget(this._icon), r.Handler.MarkerDrag)) {
                var t = this.options.draggable;
                this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new r.Handler.MarkerDrag(this), t && this.dragging.enable()
            }
        }, setOpacity: function (t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
        }, _updateOpacity: function () {
            var t = this.options.opacity;
            r.DomUtil.setOpacity(this._icon, t), this._shadow && r.DomUtil.setOpacity(this._shadow, t)
        }, _bringToFront: function () {
            this._updateZIndex(this.options.riseOffset)
        }, _resetZIndex: function () {
            this._updateZIndex(0)
        }, setCaption: function (t, i) {
            i = i || this._utmk, this.captionObj = new r.Caption(this, i, t)
        }, _updateCaptionPos: function (t) {
            this.captionObj && this.captionObj._updateCaptionPos(this._utmk, t)
        }, getCaption: function () {
            return this.captionObj._getCaption()
        }, removeCaption: function () {
            this.captionObj && (this.captionObj._removeCaption(), this._catpionObj = null)
        }
    }), r.marker = function (t, i) {
        return new r.Marker(t, i)
    }, r.DivIcon = r.Icon.extend({
        options: {iconSize: [12, 12], className: "sop-div-icon", html: !1},
        createIcon: function (t) {
            var e = t && "DIV" === t.tagName ? t : i.createElement("div"), n = this.options;
            return e.innerHTML = n.html !== !1 ? n.html : "", n.bgPos && (e.style.backgroundPosition = -n.bgPos.x + "px " + -n.bgPos.y + "px"), this._setIconStyles(e, "icon"), e
        },
        createShadow: function () {
            return null
        }
    }), r.divIcon = function (t) {
        return new r.DivIcon(t)
    }, r.Map.mergeOptions({closeInfoWindowOnClick: !0}), r.InfoWindow = r.Layer.extend({
        options: {
            pane: "infowindowPane",
            minWidth: 50,
            maxWidth: 300,
            offset: [0, 7],
            autoPan: !0,
            autoPanPadding: [5, 5],
            closeButton: !0,
            autoClose: !0,
            zoomAnimation: !0
        }, initialize: function (t, i) {
            r.setOptions(this, t), this._source = i
        }, onAdd: function (t) {
            this._zoomAnimated = this._zoomAnimated && this.options.zoomAnimation, this._container || this._initLayout(), t._fadeAnimated && r.DomUtil.setOpacity(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && r.DomUtil.setOpacity(this._container, 1), t.fire("infowindowopen", {infoWindow: this}), this._source && (this._source.fire("infowindowopen", {infoWindow: this}, !0), this._source.on("preclick", r.DomEvent.stopPropagation))
        }, openOn: function (t) {
            return t.openInfoWindow(this), this
        }, onRemove: function (t) {
            t._fadeAnimated ? (r.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(r.bind(r.DomUtil.remove, r.DomUtil, this._container), 200)) : r.DomUtil.remove(this._container), t.fire("infowindowclose", {infoWindow: this}), this._source && this._source.fire("infowindowclose", {infoWindow: this}, !0)
        }, getUTMK: function () {
            return this._utmk
        }, setUTMK: function (t) {
            return this._utmk = r.utmk(t), this._map && (this._updatePosition(), this._adjustPan()), this
        }, getContent: function () {
            return this._content
        }, setContent: function (t) {
            return this._content = t, this.update(), this
        }, getElement: function () {
            return this._container
        }, update: function () {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        }, getEvents: function () {
            var t = {zoom: this._updatePosition, viewreset: this._updatePosition};
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closeInfoWindowOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
        }, isOpen: function () {
            return !!this._map && this._map.hasLayer(this)
        }, _close: function () {
            this._map && this._map.closeInfoWindow(this)
        }, _initLayout: function () {
            var t = "sop-infowindow", i = this._container = r.DomUtil.create("div", t + " " + (this.options.className || "") + " sop-zoom-" + (this._zoomAnimated ? "animated" : "hide"));
            if (this.options.closeButton) {
                var e = this._closeButton = r.DomUtil.create("a", t + "-close-button", i);
                e.href = "#close", e.innerHTML = "&#215;", r.DomEvent.on(e, "click", this._onCloseButtonClick, this)
            }
            var n = this._wrapper = r.DomUtil.create("div", t + "-content-wrapper", i);
            this._contentNode = r.DomUtil.create("div", t + "-content", n), r.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n, "contextmenu", r.DomEvent.stopPropagation), this._tipContainer = r.DomUtil.create("div", t + "-tip-container", i), this._tip = r.DomUtil.create("div", t + "-tip", this._tipContainer)
        }, _updateContent: function () {
            if (this._content) {
                var t = this._contentNode, i = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof i) t.innerHTML = i; else {
                    for (; t.hasChildNodes();)t.removeChild(t.firstChild);
                    t.appendChild(i)
                }
                this.fire("contentupdate")
            }
        }, _updateLayout: function () {
            var t = this._contentNode, i = t.style;
            i.width = "", i.whiteSpace = "nowrap";
            var e = t.offsetWidth;
            e = Math.min(e, this.options.maxWidth), e = Math.max(e, this.options.minWidth), i.width = e + 1 + "px", i.whiteSpace = "", i.height = "";
            var n = t.offsetHeight, o = this.options.maxHeight, s = "sop-infowindow-scrolled";
            o && n > o ? (i.height = o + "px", r.DomUtil.addClass(t, s)) : r.DomUtil.removeClass(t, s), this._containerWidth = this._container.offsetWidth
        }, _updatePosition: function () {
            if (this._map) {
                var t = this._map.utmkToLayerPoint(this._utmk), i = r.point(this.options.offset);
                this._zoomAnimated ? r.DomUtil.setPosition(this._container, t) : i = i.add(t);
                var e = this._containerBottom = -i.y, n = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x;
                this._container.style.bottom = e + "px", this._container.style.left = n + "px"
            }
        }, _animateZoom: function (t) {
            var i = this._map._utmkToNewLayerPoint(this._utmk, t.zoom, t.center);
            r.DomUtil.setPosition(this._container, i)
        }, _adjustPan: function () {
            if (this.options.autoPan) {
                var t = this._map, i = this._container.offsetHeight, e = this._containerWidth, n = new r.Point(this._containerLeft, -i - this._containerBottom);
                this._zoomAnimated && n._add(r.DomUtil.getPosition(this._container));
                var o = t.layerPointToContainerPoint(n), s = r.point(this.options.autoPanPadding), a = r.point(this.options.autoPanPaddingTopLeft || s), h = r.point(this.options.autoPanPaddingBottomRight || s), u = t.getSize(), l = 0, c = 0;
                o.x + e + h.x > u.x && (l = o.x + e - u.x + h.x), o.x - l - a.x < 0 && (l = o.x - a.x), o.y + i + h.y > u.y && (c = o.y + i - u.y + h.y), o.y - c - a.y < 0 && (c = o.y - a.y), (l || c) && t.fire("autopanstart").panBy([l, c])
            }
        }, _onCloseButtonClick: function (t) {
            this._close(), r.DomEvent.stop(t)
        }
    }), r.infoWindow = function (t, i) {
        return new r.InfoWindow(t, i)
    }, r.Map.include({
        openInfoWindow: function (t, i, e) {
            return t instanceof r.InfoWindow || (t = new r.InfoWindow(e).setContent(t)), i && t.setUTMK(i), this.hasLayer(t) ? this : (this._infoWindow && this._infoWindow.options.autoClose && this.closeInfoWindow(), this._infoWindow = t, this.addLayer(t))
        }, closeInfoWindow: function (t) {
            return t && t !== this._infoWindow || (t = this._infoWindow, this._infoWindow = null), t && this.removeLayer(t), this
        }
    }), r.Layer.include({
        bindInfoWindow: function (t, i) {
            return t instanceof r.InfoWindow ? (r.setOptions(t, i), this._infoWindow = t, t._source = this) : ((!this._infoWindow || i) && (this._infoWindow = new r.InfoWindow(i, this)), this._infoWindow.setContent(t)), this._infoWindowHandlersAdded || (this.on({
                click: this._openInfoWindow,
                remove: this.closeInfoWindow,
                move: this._moveInfoWindow
            }), this._infoWindowHandlersAdded = !0), this._originalInfoWindowOffset = this._infoWindow.options.offset, this
        }, unbindInfoWindow: function () {
            return this._infoWindow && (this.off({
                click: this._openInfoWindow,
                remove: this.closeInfoWindow,
                move: this._moveInfoWindow
            }), this._infoWindowHandlersAdded = !1, this._infoWindow = null), this
        }, openInfoWindow: function (t, i) {
            if (t instanceof r.Layer || (i = t, t = this), t instanceof r.FeatureGroup)for (var e in this._layers) {
                t = this._layers[e];
                break
            }
            return i || (i = t.getCenter ? t.getCenter() : t.getUTMK()), this._infoWindow && this._map && (this._infoWindow.options.offset = this._infoWindowAnchor(t), this._infoWindow._source = t, this._infoWindow.update(), this._map.openInfoWindow(this._infoWindow, i)), this
        }, closeInfoWindow: function () {
            return this._infoWindow && this._infoWindow._close(), this
        }, toggleInfoWindow: function (t) {
            return this._infoWindow && (this._infoWindow._map ? this.closeInfoWindow() : this.openInfoWindow(t)), this
        }, setInfoWindowContent: function (t) {
            return this._infoWindow && this._infoWindow.setContent(t), this
        }, getInfoWindow: function () {
            return this._infoWindow;
        }, _openInfoWindow: function (t) {
            var i = t.layer || t.target;
            if (this._infoWindow && this._map)return i instanceof r.Path ? void this.openInfoWindow(t.layer || t.target, t.utmk) : void(this._map.hasLayer(this._infoWindow) && this._infoWindow._source === i ? this.closeInfoWindow() : this.openInfoWindow(i, t.utmk))
        }, _infoWindowAnchor: function (t) {
            var i = t._getInfoWindowAnchor ? t._getInfoWindowAnchor() : [0, 0], e = this._originalInfoWindowOffset || r.InfoWindow.prototype.options.offset;
            return r.point(i).add(e)
        }, _moveInfoWindow: function (t) {
            this._infoWindow.setUTMK(t.utmk)
        }
    }), r.Marker.include({
        _getInfoWindowAnchor: function () {
            return this.options.icon.options.infoWindowAnchor || [0, 0]
        }
    }), r.LayerGroup = r.Layer.extend({
        initialize: function (t) {
            this._layers = {};
            var i, e;
            if (t)for (i = 0, e = t.length; e > i; i++)this.addLayer(t[i])
        }, addLayer: function (t) {
            var i = this.getLayerId(t);
            return this._layers[i] = t, this._map && this._map.addLayer(t), this
        }, removeLayer: function (t) {
            var i = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]), delete this._layers[i], this
        }, hasLayer: function (t) {
            return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
        }, clearLayers: function () {
            for (var t in this._layers)this.removeLayer(this._layers[t]);
            return this
        }, invoke: function (t) {
            var i, e, n = Array.prototype.slice.call(arguments, 1);
            for (i in this._layers)e = this._layers[i], e[t] && e[t].apply(e, n);
            return this
        }, onAdd: function (t) {
            for (var i in this._layers)t.addLayer(this._layers[i])
        }, onRemove: function (t) {
            for (var i in this._layers)t.removeLayer(this._layers[i])
        }, eachLayer: function (t, i) {
            for (var e in this._layers)t.call(i, this._layers[e]);
            return this
        }, getLayer: function (t) {
            return this._layers[t]
        }, getLayers: function () {
            var t = [];
            for (var i in this._layers)t.push(this._layers[i]);
            return t
        }, setZIndex: function (t) {
            return this.invoke("setZIndex", t)
        }, getLayerId: function (t) {
            return r.stamp(t)
        }
    }), r.layerGroup = function (t) {
        return new r.LayerGroup(t)
    }, r.FeatureGroup = r.LayerGroup.extend({
        addLayer: function (t) {
            return this.hasLayer(t) ? this : (t.addEventParent(this), r.LayerGroup.prototype.addLayer.call(this, t), this.fire("layeradd", {layer: t}))
        }, removeLayer: function (t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), r.LayerGroup.prototype.removeLayer.call(this, t), this.fire("layerremove", {layer: t})) : this
        }, setStyle: function (t) {
            return this.invoke("setStyle", t)
        }, bringToFront: function () {
            return this.invoke("bringToFront")
        }, bringToBack: function () {
            return this.invoke("bringToBack")
        }, getBounds: function () {
            var t = new r.UTMKBounds;
            for (var i in this._layers) {
                var e = this._layers[i];
                t.extend(e.getBounds ? e.getBounds() : e.getUTMK())
            }
            return t
        }
    }), r.featureGroup = function (t) {
        return new r.FeatureGroup(t)
    }, r.Renderer = r.Layer.extend({
        options: {padding: .1}, initialize: function (t) {
            r.setOptions(this, t), r.stamp(this)
        }, onAdd: function () {
            this._container || (this._initContainer(), this._zoomAnimated && r.DomUtil.addClass(this._container, "sop-zoom-animated")), this.getPane().appendChild(this._container), this._update()
        }, onRemove: function () {
            r.DomUtil.remove(this._container)
        }, getEvents: function () {
            var t = {viewreset: this._reset, zoom: this._updateTransform, moveend: this._update};
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        }, _animateZoom: function (t) {
            var i, e, n, o, s = this._map.getZoomScale(t.zoom, this._zoom), a = this._map._utmkToNewLayerPoint(this._topLeft, t.zoom, t.center);
            return this._container.width.baseVal ? (i = this._container.width.baseVal.value, e = this._container.height.baseVal.value, n = i / 2, o = e / 2, s > 1 ? (i = n * s - n, e = o * s - o, a.x += i, a.y += e) : (i = n - n * s, e = o - o * s, a.x -= i, a.y -= e), void r.DomUtil.setTransform(this._container, a, s)) : void r.DomUtil.setTransform(this._container, a, s)
        }, _updateTransform: function () {
            var t = this._map.getZoom(), i = this._map.getCenter(), e = this._map.getZoomScale(t, this._zoom), n = this._map._utmkToNewLayerPoint(this._topLeft, t, i);
            r.DomUtil.setTransform(this._container, n, e)
        }, _reset: function () {
            this._update(), this._updateTransform()
        }, _update: function () {
            var t = this.options.padding, i = this._map.getSize(), e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();
            this._bounds = new r.Bounds(e, e.add(i.multiplyBy(1 + 2 * t)).round()), this._topLeft = this._map.layerPointToUTMK(e), this._zoom = this._map.getZoom()
        }
    }), r.Map.include({
        getRenderer: function (t) {
            var i = t.options.renderer || this._getPaneRenderer(t.options.pane);
            return i = i || this.options.renderer || this._renderer, i || (i = this._renderer = r.SVG && r.svg() || r.Canvas && r.canvas()), this.hasLayer(i) || this.addLayer(i), i
        }, _getPaneRenderer: function (t) {
            if ("overlayPane" === t || t === e)return !1;
            var i = this._paneRenderers[t];
            return i === e && (i = r.SVG && r.svg({pane: t}) || r.Canvas && r.canvas({pane: t}), this._paneRenderers[t] = i), i
        }
    }), r.Path = r.Layer.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0
        }, onAdd: function () {
            this._renderer = this._map.getRenderer(this), this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
        }, onRemove: function () {
            this._renderer._removePath(this)
        }, getEvents: function () {
            return {zoomend: this._project, moveend: this._update, viewreset: this._reset}
        }, redraw: function () {
            return this._map && this._renderer._updatePath(this), this
        }, setStyle: function (t) {
            return r.setOptions(this, t), this._renderer && this._renderer._updateStyle(this), this
        }, bringToFront: function () {
            return this._renderer && this._renderer._bringToFront(this), this
        }, bringToBack: function () {
            return this._renderer && this._renderer._bringToBack(this), this
        }, getElement: function () {
            return this._path
        }, _reset: function () {
            this._project(), this._update()
        }, _clickTolerance: function () {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (r.Browser.touch ? 10 : 0)
        }
    }), r.LineUtil = {
        simplify: function (t, i) {
            if (!i || !t.length)return t.slice();
            var e = i * i;
            return t = this._reducePoints(t, e), t = this._simplifyDP(t, e)
        }, pointToSegmentDistance: function (t, i, e) {
            return Math.sqrt(this._sqClosestPointOnSegment(t, i, e, !0))
        }, closestPointOnSegment: function (t, i, e) {
            return this._sqClosestPointOnSegment(t, i, e)
        }, _simplifyDP: function (t, i) {
            var n = t.length, o = typeof Uint8Array != e + "" ? Uint8Array : Array, s = new o(n);
            s[0] = s[n - 1] = 1, this._simplifyDPStep(t, s, i, 0, n - 1);
            var r, a = [];
            for (r = 0; n > r; r++)s[r] && a.push(t[r]);
            return a
        }, _simplifyDPStep: function (t, i, e, n, o) {
            var s, r, a, h = 0;
            for (r = n + 1; o - 1 >= r; r++)a = this._sqClosestPointOnSegment(t[r], t[n], t[o], !0), a > h && (s = r, h = a);
            h > e && (i[s] = 1, this._simplifyDPStep(t, i, e, n, s), this._simplifyDPStep(t, i, e, s, o))
        }, _reducePoints: function (t, i) {
            for (var e = [t[0]], n = 1, o = 0, s = t.length; s > n; n++)this._sqDist(t[n], t[o]) > i && (e.push(t[n]), o = n);
            return s - 1 > o && e.push(t[s - 1]), e
        }, clipSegment: function (t, i, e, n, o) {
            var s, r, a, h = n ? this._lastCode : this._getBitCode(t, e), u = this._getBitCode(i, e);
            for (this._lastCode = u; ;) {
                if (!(h | u))return [t, i];
                if (h & u)return !1;
                s = h || u, r = this._getEdgeIntersection(t, i, s, e, o), a = this._getBitCode(r, e), s === h ? (t = r, h = a) : (i = r, u = a)
            }
        }, _getEdgeIntersection: function (t, i, e, n, o) {
            var s, a, h = i.x - t.x, u = i.y - t.y, l = n.min, c = n.max;
            return 8 & e ? (s = t.x + h * (c.y - t.y) / u, a = c.y) : 4 & e ? (s = t.x + h * (l.y - t.y) / u, a = l.y) : 2 & e ? (s = c.x, a = t.y + u * (c.x - t.x) / h) : 1 & e && (s = l.x, a = t.y + u * (l.x - t.x) / h), new r.Point(s, a, o)
        }, _getBitCode: function (t, i) {
            var e = 0;
            return t.x < i.min.x ? e |= 1 : t.x > i.max.x && (e |= 2), t.y < i.min.y ? e |= 4 : t.y > i.max.y && (e |= 8), e
        }, _sqDist: function (t, i) {
            var e = i.x - t.x, n = i.y - t.y;
            return e * e + n * n
        }, _sqClosestPointOnSegment: function (t, i, e, n) {
            var o, s = i.x, a = i.y, h = e.x - s, u = e.y - a, l = h * h + u * u;
            return l > 0 && (o = ((t.x - s) * h + (t.y - a) * u) / l, o > 1 ? (s = e.x, a = e.y) : o > 0 && (s += h * o, a += u * o)), h = t.x - s, u = t.y - a, n ? h * h + u * u : new r.Point(s, a)
        }
    }, r.Polyline = r.Path.extend({
        options: {smoothFactor: 1}, initialize: function (t, i) {
            r.setOptions(this, i), this._setUTMKs(t)
        }, getUTMKs: function () {
            return this._utmks
        }, setUTMKs: function (t) {
            return this._setUTMKs(t), this.redraw()
        }, isEmpty: function () {
            return !this._utmks.length
        }, spliceUTMKs: function () {
            var t = [].splice.apply(this._utmks, arguments);
            return this._setUTMKs(this._utmks), this.redraw(), t
        }, closestLayerPoint: function (t) {
            for (var i, e, n = 1 / 0, o = null, s = r.LineUtil._sqClosestPointOnSegment, a = 0, h = this._parts.length; h > a; a++)for (var u = this._parts[a], l = 1, c = u.length; c > l; l++) {
                i = u[l - 1], e = u[l];
                var d = s(t, i, e, !0);
                n > d && (n = d, o = s(t, i, e))
            }
            return o && (o.distance = Math.sqrt(n)), o
        }, getCenter: function () {
            var t, i, e, n, o, s, r, a = this._rings[0], h = a.length;
            if (!h)return null;
            for (t = 0, i = 0; h - 1 > t; t++)i += a[t].distanceTo(a[t + 1]) / 2;
            if (0 === i)return this._map.layerPointToUTMK(a[0]);
            for (t = 0, n = 0; h - 1 > t; t++)if (o = a[t], s = a[t + 1], e = o.distanceTo(s), n += e, n > i)return r = (n - i) / e, this._map.layerPointToUTMK([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
        }, getBounds: function () {
            return this._bounds
        }, addUTMK: function (t, i) {
            return i = i || this._defaultShape(), t = r.utmk(t), i.push(t), this._bounds.extend(t), this.redraw()
        }, _setUTMKs: function (t) {
            this._bounds = new r.UTMKBounds, this._utmks = this._convertUTMKs(t)
        }, _defaultShape: function () {
            return r.Polyline._flat(this._utmks) ? this._utmks : this._utmks[0]
        }, _convertUTMKs: function (t) {
            for (var i = [], e = r.Polyline._flat(t), n = 0, o = t.length; o > n; n++)e ? (i[n] = r.utmk(t[n]), this._bounds.extend(i[n])) : i[n] = this._convertUTMKs(t[n]);
            return i
        }, _project: function () {
            this._rings = [], this._projectUTMKs(this._utmks, this._rings);
            var t = this._clickTolerance(), i = new r.Point(t, -t);
            this._bounds.isValid() && (this._pxBounds = new r.Bounds(this._map.utmkToLayerPoint(this._bounds.getSouthWest())._subtract(i), this._map.utmkToLayerPoint(this._bounds.getNorthEast())._add(i)))
        }, _projectUTMKs: function (t, i) {
            var e, n, o = t[0] instanceof r.UTMK, s = t.length;
            if (o) {
                for (n = [], e = 0; s > e; e++)n[e] = this._map.utmkToLayerPoint(t[e]);
                i.push(n)
            } else for (e = 0; s > e; e++)this._projectUTMKs(t[e], i)
        }, _clipPoints: function () {
            var t = this._renderer._bounds;
            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                if (this.options.noClip)return void(this._parts = this._rings);
                var i, e, n, o, s, a, h, u = this._parts;
                for (i = 0, n = 0, o = this._rings.length; o > i; i++)for (h = this._rings[i], e = 0, s = h.length; s - 1 > e; e++)a = r.LineUtil.clipSegment(h[e], h[e + 1], t, e, !0), a && (u[n] = u[n] || [], u[n].push(a[0]), (a[1] !== h[e + 1] || e === s - 2) && (u[n].push(a[1]), n++))
            }
        }, _simplifyPoints: function () {
            for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; n > e; e++)t[e] = r.LineUtil.simplify(t[e], i)
        }, _update: function () {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
        }, _updatePath: function () {
            this._renderer._updatePoly(this)
        }
    }), r.polyline = function (t, i) {
        return new r.Polyline(t, i)
    }, r.Polyline._flat = function (t) {
        return !r.Util.isArray(t[0]) || "object" != typeof t[0][0] && "undefined" != typeof t[0][0]
    }, r.PolyUtil = {}, r.PolyUtil.clipPolygon = function (t, i, e) {
        var n, o, s, a, h, u, l, c, d, m = [1, 4, 2, 8], p = r.LineUtil;
        for (o = 0, l = t.length; l > o; o++)t[o]._code = p._getBitCode(t[o], i);
        for (a = 0; 4 > a; a++) {
            for (c = m[a], n = [], o = 0, l = t.length, s = l - 1; l > o; s = o++)h = t[o], u = t[s], h._code & c ? u._code & c || (d = p._getEdgeIntersection(u, h, c, i, e), d._code = p._getBitCode(d, i), n.push(d)) : (u._code & c && (d = p._getEdgeIntersection(u, h, c, i, e), d._code = p._getBitCode(d, i), n.push(d)), n.push(h));
            t = n
        }
        return t
    }, r.Polygon = r.Polyline.extend({
        options: {fill: !0}, isEmpty: function () {
            return !this._utmks.length || !this._utmks[0].length
        }, getCenter: function () {
            var t, i, e, n, o, s, r, a, h, u = this._rings[0], l = u.length;
            if (!l)return null;
            for (s = r = a = 0, t = 0, i = l - 1; l > t; i = t++)e = u[t], n = u[i], o = e.y * n.x - n.y * e.x, r += (e.x + n.x) * o, a += (e.y + n.y) * o, s += 3 * o;
            return h = 0 === s ? u[0] : [r / s, a / s], this._map.layerPointToUTMK(h)
        }, _convertUTMKs: function (t) {
            var i = r.Polyline.prototype._convertUTMKs.call(this, t), e = i.length;
            return e >= 2 && i[0] instanceof r.UTMK && i[0].equals(i[e - 1]) && i.pop(), i
        }, _setUTMKs: function (t) {
            r.Polyline.prototype._setUTMKs.call(this, t), r.Polyline._flat(this._utmks) && (this._utmks = [this._utmks])
        }, _defaultShape: function () {
            return r.Polyline._flat(this._utmks[0]) ? this._utmks[0] : this._utmks[0][0]
        }, _clipPoints: function () {
            var t = this._renderer._bounds, i = this.options.weight, e = new r.Point(i, i);
            if (t = new r.Bounds(t.min.subtract(e), t.max.add(e)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                if (this.options.noClip)return void(this._parts = this._rings);
                for (var n, o = 0, s = this._rings.length; s > o; o++)n = r.PolyUtil.clipPolygon(this._rings[o], t, !0), n.length && this._parts.push(n)
            }
        }, _updatePath: function () {
            this._renderer._updatePoly(this, !0), this._updateCaptionPos()
        }, setCaption: function (t, i) {
            i = i || this.getCenter(), this.captionObj = new r.Caption(this, r.utmk(i), t)
        }, _updateCaptionPos: function (t) {
            this.captionObj && this.captionObj._updateCaptionPos(this.captionObj.getCaptionPosition(), t)
        }, getCaption: function () {
            return this.captionObj._getCaption()
        }, removeCaption: function () {
            this.captionObj && (this.captionObj._removeCaption(), this._catpionObj = null)
        }, getEvents: function () {
            var t = {zoomend: this._project, moveend: this._update, viewreset: this._reset};
            return t.zoomanim = this._updateCaptionPos, t
        }, onRemove: function () {
            this._renderer._removePath(this), this.removeCaption()
        }
    }), r.polygon = function (t, i) {
        return new r.Polygon(t, i)
    }, r.Rectangle = r.Polygon.extend({
        initialize: function (t, i) {
            r.Polygon.prototype.initialize.call(this, this._boundsToUTMKs(t), i)
        }, setBounds: function (t) {
            this.setUTMKs(this._boundsToUTMKs(t))
        }, _boundsToUTMKs: function (t) {
            return t = r.utmkBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    }), r.rectangle = function (t, i) {
        return new r.Rectangle(t, i)
    }, r.CircleMarker = r.Path.extend({
        options: {fill: !0, radius: 10}, initialize: function (t, i) {
            r.setOptions(this, i), this._utmk = r.utmk(t), this._radius = this.options.radius
        }, setUTMK: function (t) {
            return this._utmk = r.utmk(t), this.redraw(), this.fire("move", {utmk: this._utmk})
        }, getUTMK: function () {
            return this._utmk
        }, setRadius: function (t) {
            return this.options.radius = this._radius = t, this.redraw()
        }, getRadius: function () {
            return this._radius
        }, setStyle: function (t) {
            var i = t && t.radius || this._radius;
            return r.Path.prototype.setStyle.call(this, t), this.setRadius(i), this
        }, _project: function () {
            this._point = this._map.utmkToLayerPoint(this._utmk), this._updateBounds()
        }, _updateBounds: function () {
            var t = this._radius, i = this._radiusY || t, e = this._clickTolerance(), n = [t + e, i + e];
            this._pxBounds = new r.Bounds(this._point.subtract(n), this._point.add(n))
        }, _update: function () {
            this._map && this._updatePath()
        }, _updatePath: function () {
            this._renderer._updateCircle(this), this._updateCaptionPos()
        }, _empty: function () {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        }, setCaption: function (t, i) {
            i = i || this._utmk, this.captionObj = new r.Caption(this, i, t)
        }, _updateCaptionPos: function (t) {
            this.captionObj && this.captionObj._updateCaptionPos(this._utmk, t)
        }, getCaption: function () {
            return this.captionObj._getCaption()
        }, removeCaption: function () {
            this.captionObj && (this.captionObj._removeCaption(), this._catpionObj = null)
        }, getEvents: function () {
            var t = {zoomend: this._project, moveend: this._update, viewreset: this._reset};
            return t.zoomanim = this._updateCaptionPos, t
        }, onRemove: function () {
            this._renderer._removePath(this), this.removeCaption()
        }
    }), r.circleMarker = function (t, i) {
        return new r.CircleMarker(t, i)
    }, r.Circle = r.CircleMarker.extend({
        initialize: function (t, i, e) {
            r.setOptions(this, e), this._utmk = r.utmk(t), this._mRadius = i
        }, setRadius: function (t) {
            return this._mRadius = t, this.redraw()
        }, getRadius: function () {
            return this._mRadius
        }, getBounds: function () {
            this._radiusY || (this._radiusY = this._radius);
            var t = [this._radius, this._radiusY];
            return new r.UTMKBounds(this._map.layerPointToUTMK(this._point.subtract(t)), this._map.layerPointToUTMK(this._point.add(t)))
        }, setStyle: r.Path.prototype.setStyle, _project: function () {
            var t = this._map, i = t.options.crs, e = i.unproject(i.project(this._utmk).subtract([this._mRadius, 0]));
            this._point = t.utmkToLayerPoint(this._utmk), this._radius = this._point.x - t.utmkToLayerPoint(e).x, this._radiusY = this._radius, this._updateBounds()
        }
    }), r.circle = function (t, i, e) {
        return new r.Circle(t, i, e)
    }, r.SVG = r.Renderer.extend({
        _initContainer: function () {
            this._container = r.SVG.create("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = r.SVG.create("g"), this._container.appendChild(this._rootGroup)
        }, _update: function () {
            if (!this._map._animatingZoom || !this._bounds) {
                r.Renderer.prototype._update.call(this);
                var t = this._bounds, i = t.getSize(), e = this._container;
                this._svgSize && this._svgSize.equals(i) || (this._svgSize = i, e.setAttribute("width", i.x), e.setAttribute("height", i.y)), r.DomUtil.setPosition(e, t.min), e.setAttribute("viewBox", [t.min.x, t.min.y, i.x, i.y].join(" "))
            }
        }, _initPath: function (t) {
            var i = t._path = r.SVG.create("path");
            t.options.className && r.DomUtil.addClass(i, t.options.className), t.options.interactive && r.DomUtil.addClass(i, "sop-interactive"), this._updateStyle(t)
        }, _addPath: function (t) {
            this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path)
        }, _removePath: function (t) {
            r.DomUtil.remove(t._path), t.removeInteractiveTarget(t._path)
        }, _updatePath: function (t) {
            t._project(), t._update()
        }, _updateStyle: function (t) {
            var i = t._path, e = t.options;
            i && (e.stroke ? (i.setAttribute("stroke", e.color), i.setAttribute("stroke-opacity", e.opacity), i.setAttribute("stroke-width", e.weight), i.setAttribute("stroke-linecap", e.lineCap), i.setAttribute("stroke-linejoin", e.lineJoin), e.dashArray ? i.setAttribute("stroke-dasharray", e.dashArray) : i.removeAttribute("stroke-dasharray"), e.dashOffset ? i.setAttribute("stroke-dashoffset", e.dashOffset) : i.removeAttribute("stroke-dashoffset")) : i.setAttribute("stroke", "none"), e.fill ? (i.setAttribute("fill", e.fillColor || e.color), i.setAttribute("fill-opacity", e.fillOpacity), i.setAttribute("fill-rule", e.fillRule || "evenodd")) : i.setAttribute("fill", "none"), i.setAttribute("pointer-events", e.pointerEvents || (e.interactive ? "visiblePainted" : "none")))
        }, _updatePoly: function (t, i) {
            this._setPath(t, r.SVG.pointsToPath(t._parts, i))
        }, _updateCircle: function (t) {
            var i = t._point, e = t._radius, n = t._radiusY || e, o = "a" + e + "," + n + " 0 1,0 ", s = t._empty() ? "M0 0" : "M" + (i.x - e) + "," + i.y + o + 2 * e + ",0 " + o + 2 * -e + ",0 ";
            this._setPath(t, s)
        }, _setPath: function (t, i) {
            t._path.setAttribute("d", i)
        }, _bringToFront: function (t) {
            r.DomUtil.toFront(t._path)
        }, _bringToBack: function (t) {
            r.DomUtil.toBack(t._path)
        }
    }), r.extend(r.SVG, {
        create: function (t) {
            return i.createElementNS("http://www.w3.org/2000/svg", t)
        }, pointsToPath: function (t, i) {
            var e, n, o, s, a, h, u = "";
            for (e = 0, o = t.length; o > e; e++) {
                for (a = t[e], n = 0, s = a.length; s > n; n++)h = a[n], u += (n ? "L" : "M") + h.x + " " + h.y;
                u += i ? r.Browser.svg ? "z" : "x" : ""
            }
            return u || "M0 0"
        }
    }), r.Browser.svg = !(!i.createElementNS || !r.SVG.create("svg").createSVGRect), r.svg = function (t) {
        return r.Browser.svg || r.Browser.vml ? new r.SVG(t) : null
    }, r.Browser.vml = !r.Browser.svg && function () {
            try {
                var t = i.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var e = t.firstChild;
                return e.style.behavior = "url(#default#VML)", e && "object" == typeof e.adj
            } catch (n) {
                return !1
            }
        }(), r.SVG.include(r.Browser.vml ? {
            _initContainer: function () {
                this._container = r.DomUtil.create("div", "sop-vml-container"), this._paths = {}, this._initEvents()
            }, _update: function () {
                this._map._animatingZoom || r.Renderer.prototype._update.call(this)
            }, _initPath: function (t) {
                var i = t._container = r.SVG.create("shape");
                r.DomUtil.addClass(i, "sop-vml-shape " + (this.options.className || "")), i.coordsize = "1 1", t._path = r.SVG.create("path"), i.appendChild(t._path), this._updateStyle(t)
            }, _addPath: function (t) {
                var i = t._container;
                this._container.appendChild(i), t.options.interactive && t.addInteractiveTarget(i)
            }, _removePath: function (t) {
                var i = t._container;
                r.DomUtil.remove(i), t.removeInteractiveTarget(i)
            }, _updateStyle: function (t) {
                var i = t._stroke, e = t._fill, n = t.options, o = t._container;
                o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (i || (i = t._stroke = r.SVG.create("stroke"), o.appendChild(i)), i.weight = n.weight + "px", i.color = n.color, i.opacity = n.opacity, n.dashArray ? i.dashStyle = r.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : i.dashStyle = "", i.endcap = n.lineCap.replace("butt", "flat"), i.joinstyle = n.lineJoin) : i && (o.removeChild(i), t._stroke = null), n.fill ? (e || (e = t._fill = r.SVG.create("fill"), o.appendChild(e)), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (o.removeChild(e), t._fill = null)
            }, _updateCircle: function (t) {
                var i = t._point.round(), e = Math.round(t._radius), n = Math.round(t._radiusY || e);
                this._setPath(t, t._empty() ? "M0 0" : "AL " + i.x + "," + i.y + " " + e + "," + n + " 0,23592600")
            }, _setPath: function (t, i) {
                t._path.v = i
            }, _bringToFront: function (t) {
                r.DomUtil.toFront(t._container)
            }, _bringToBack: function (t) {
                r.DomUtil.toBack(t._container)
            }
        } : {}), r.Browser.vml && (r.SVG.create = function () {
        try {
            return i.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function (t) {
                return i.createElement("<lvml:" + t + ' class="lvml">')
            }
        } catch (t) {
            return function (t) {
                return i.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }()), r.Canvas = r.Renderer.extend({
        onAdd: function () {
            r.Renderer.prototype.onAdd.call(this), this._layers = this._layers || {}, this._draw()
        }, _initContainer: function () {
            var t = this._container = i.createElement("canvas");
            r.DomEvent.on(t, "mousemove", this._onMouseMove, this).on(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), this._ctx = t.getContext("2d")
        }, _update: function () {
            if (!this._map._animatingZoom || !this._bounds) {
                r.Renderer.prototype._update.call(this);
                var t = this._bounds, i = this._container, e = t.getSize(), n = r.Browser.retina ? 2 : 1;
                r.DomUtil.setPosition(i, t.min), i.width = n * e.x, i.height = n * e.y, i.style.width = e.x + "px", i.style.height = e.y + "px", r.Browser.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y)
            }
        }, _initPath: function (t) {
            this._layers[r.stamp(t)] = t
        }, _addPath: r.Util.falseFn, _removePath: function (t) {
            t._removed = !0, this._requestRedraw(t)
        }, _updatePath: function (t) {
            this._redrawBounds = t._pxBounds, this._draw(!0), t._project(), t._update(), this._draw(), this._redrawBounds = null
        }, _updateStyle: function (t) {
            this._requestRedraw(t)
        }, _requestRedraw: function (t) {
            this._map && (this._redrawBounds = this._redrawBounds || new r.Bounds, this._redrawBounds.extend(t._pxBounds.min).extend(t._pxBounds.max), this._redrawRequest = this._redrawRequest || r.Util.requestAnimFrame(this._redraw, this))
        }, _redraw: function () {
            this._redrawRequest = null, this._draw(!0), this._draw(), this._redrawBounds = null
        }, _draw: function (t) {
            this._clear = t;
            var i;
            for (var e in this._layers)i = this._layers[e], (!this._redrawBounds || i._pxBounds.intersects(this._redrawBounds)) && i._updatePath(), t && i._removed && (delete i._removed, delete this._layers[e])
        }, _updatePoly: function (t, i) {
            var e, n, o, s, r = t._parts, a = r.length, h = this._ctx;
            if (a) {
                for (h.beginPath(), e = 0; a > e; e++) {
                    for (n = 0, o = r[e].length; o > n; n++)s = r[e][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
                    i && h.closePath()
                }
                this._fillStroke(h, t)
            }
        }, _updateCircle: function (t) {
            if (!t._empty()) {
                var i = t._point, e = this._ctx, n = t._radius, o = (t._radiusY || n) / n;
                1 !== o && (e.save(), e.scale(1, o)), e.beginPath(), e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1), 1 !== o && e.restore(), this._fillStroke(e, t)
            }
        }, _fillStroke: function (t, i) {
            var e = this._clear, n = i.options;
            t.globalCompositeOperation = e ? "destination-out" : "source-over", n.fill && (t.globalAlpha = e ? 1 : n.fillOpacity, t.fillStyle = n.fillColor || n.color, t.fill(n.fillRule || "evenodd")), n.stroke && 0 !== n.weight && (t.globalAlpha = e ? 1 : n.opacity, i._prevWeight = t.lineWidth = e ? i._prevWeight + 1 : n.weight, t.strokeStyle = n.color, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.stroke())
        }, _onClick: function (t) {
            var i = this._map.mouseEventToLayerPoint(t);
            for (var e in this._layers)this._layers[e]._containsPoint(i) && (r.DomEvent._fakeStop(t), this._fireEvent(this._layers[e], t))
        }, _onMouseMove: function (t) {
            if (this._map && !this._map._animatingZoom) {
                var i = this._map.mouseEventToLayerPoint(t);
                this._handleMouseOut(t, i), this._handleMouseHover(t, i)
            }
        }, _handleMouseOut: function (t, i) {
            var e = this._hoveredLayer;
            e && !e._containsPoint(i) && (r.DomUtil.removeClass(this._container, "sop-interactive"), this._fireEvent(e, t, "mouseout"), this._hoveredLayer = null)
        }, _handleMouseHover: function (t, i) {
            var e, n;
            if (!this._hoveredLayer)for (e in this._layers)if (n = this._layers[e], n.options.interactive && n._containsPoint(i)) {
                r.DomUtil.addClass(this._container, "sop-interactive"), this._fireEvent(n, t, "mouseover"), this._hoveredLayer = n;
                break
            }
            this._hoveredLayer && this._fireEvent(this._hoveredLayer, t)
        }, _fireEvent: function (t, i, e) {
            this._map._fireDOMEvent(i, e || i.type, [t])
        }, _bringToFront: r.Util.falseFn, _bringToBack: r.Util.falseFn
    }), r.Browser.canvas = function () {
        return !!i.createElement("canvas").getContext
    }(), r.canvas = function (t) {
        return r.Browser.canvas ? new r.Canvas(t) : null
    }, r.Polyline.prototype._containsPoint = function (t, i) {
        var e, n, o, s, a, h, u = this._clickTolerance();
        if (!this._pxBounds.contains(t))return !1;
        for (e = 0, s = this._parts.length; s > e; e++)for (h = this._parts[e], n = 0, a = h.length, o = a - 1; a > n; o = n++)if ((i || 0 !== n) && r.LineUtil.pointToSegmentDistance(t, h[o], h[n]) <= u)return !0;
        return !1
    }, r.Polygon.prototype._containsPoint = function (t) {
        var i, e, n, o, s, a, h, u, l = !1;
        if (!this._pxBounds.contains(t))return !1;
        for (o = 0, h = this._parts.length; h > o; o++)for (i = this._parts[o], s = 0, u = i.length, a = u - 1; u > s; a = s++)e = i[s], n = i[a], e.y > t.y != n.y > t.y && t.x < (n.x - e.x) * (t.y - e.y) / (n.y - e.y) + e.x && (l = !l);
        return l || r.Polyline.prototype._containsPoint.call(this, t, !0)
    }, r.CircleMarker.prototype._containsPoint = function (t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
    }, r.GeoJSON = r.FeatureGroup.extend({
        initialize: function (t, i) {
            r.setOptions(this, i), this._layers = {}, t && this.addData(t)
        }, addData: function (t) {
            var i, e, n, o = r.Util.isArray(t) ? t : t.features;
            if (o) {
                for (i = 0, e = o.length; e > i; i++)n = o[i], (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                return this
            }
            var s = this.options;
            if (s.filter && !s.filter(t))return this;
            var a = r.GeoJSON.geometryToLayer(t, s);
            return a ? (a.feature = r.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), s.onEachFeature && s.onEachFeature(t, a), this.addLayer(a)) : this
        }, resetStyle: function (t) {
            return t.options = t.defaultOptions, this._setLayerStyle(t, this.options.style), this
        }, setStyle: function (t) {
            return this.eachLayer(function (i) {
                this._setLayerStyle(i, t)
            }, this)
        }, _setLayerStyle: function (t, i) {
            "function" == typeof i && (i = i(t.feature)), t.setStyle && t.setStyle(i)
        }
    }), r.extend(r.GeoJSON, {
        geometryToLayer: function (t, i) {
            var e, n, o, s, a = "Feature" === t.type ? t.geometry : t, h = a ? a.coordinates : null, u = [], l = i && i.pointToLayer, c = i && i.coordsToUTMK || this.coordsToUTMK;
            if (!h && !a)return null;
            switch (a.type) {
                case"Point":
                    return e = c(h), l ? l(t, e) : new r.Marker(e);
                case"MultiPoint":
                    for (o = 0, s = h.length; s > o; o++)e = c(h[o]), u.push(l ? l(t, e) : new r.Marker(e));
                    return new r.FeatureGroup(u);
                case"LineString":
                case"MultiLineString":
                    return n = this.coordsToUTMKs(h, "LineString" === a.type ? 0 : 1, c), new r.Polyline(n, i);
                case"Polygon":
                case"MultiPolygon":
                    return n = this.coordsToUTMKs(h, "Polygon" === a.type ? 1 : 2, c), new r.Polygon(n, i);
                case"GeometryCollection":
                    for (o = 0, s = a.geometries.length; s > o; o++) {
                        var d = this.geometryToLayer({
                            geometry: a.geometries[o],
                            type: "Feature",
                            properties: t.properties
                        }, i);
                        d && u.push(d)
                    }
                    return new r.FeatureGroup(u);
                default:
                    throw new Error("Invalid GeoJSON object.")
            }
        }, coordsToUTMK: function (t) {
            return new r.UTMK(t[0], t[1], t[2])
        }, coordsToUTMKs: function (t, i, e) {
            for (var n, o = [], s = 0, r = t.length; r > s; s++)n = i ? this.coordsToUTMKs(t[s], i - 1, e) : (e || this.coordsToUTMK)(t[s]), o.push(n);
            return o
        }, utmkToCoords: function (t) {
            return t.alt !== e ? [t.x, t.y, t.alt] : [t.x, t.y]
        }, utmksToCoords: function (t, i, e) {
            for (var n = [], o = 0, s = t.length; s > o; o++)n.push(i ? r.GeoJSON.utmksToCoords(t[o], i - 1, e) : r.GeoJSON.utmkToCoords(t[o]));
            return !i && e && n.push(n[0]), n
        }, getFeature: function (t, i) {
            return t.feature ? r.extend({}, t.feature, {geometry: i}) : r.GeoJSON.asFeature(i)
        }, asFeature: function (t) {
            return "Feature" === t.type ? t : {type: "Feature", properties: {}, geometry: t}
        }
    });
    var h = {
        toGeoJSON: function () {
            return r.GeoJSON.getFeature(this, {type: "Point", coordinates: r.GeoJSON.utmkToCoords(this.getUTMK())})
        }
    };
    r.Marker.include(h), r.Circle.include(h), r.CircleMarker.include(h), r.Polyline.prototype.toGeoJSON = function () {
        var t = !r.Polyline._flat(this._utmks), i = r.GeoJSON.utmksToCoords(this._utmks, t ? 1 : 0);
        return r.GeoJSON.getFeature(this, {type: (t ? "Multi" : "") + "LineString", coordinates: i})
    }, r.Polygon.prototype.toGeoJSON = function () {
        var t = !r.Polyline._flat(this._utmks), i = t && !r.Polyline._flat(this._utmks[0]), e = r.GeoJSON.utmksToCoords(this._utmks, i ? 2 : t ? 1 : 0, !0);
        return t || (e = [e]), r.GeoJSON.getFeature(this, {type: (i ? "Multi" : "") + "Polygon", coordinates: e})
    }, r.LayerGroup.include({
        toMultiPoint: function () {
            var t = [];
            return this.eachLayer(function (i) {
                t.push(i.toGeoJSON().geometry.coordinates)
            }), r.GeoJSON.getFeature(this, {type: "MultiPoint", coordinates: t})
        }, toGeoJSON: function () {
            var t = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === t)return this.toMultiPoint();
            var i = "GeometryCollection" === t, e = [];
            return this.eachLayer(function (t) {
                if (t.toGeoJSON) {
                    var n = t.toGeoJSON();
                    e.push(i ? n.geometry : r.GeoJSON.asFeature(n))
                }
            }), i ? r.GeoJSON.getFeature(this, {geometries: e, type: "GeometryCollection"}) : {
                    type: "FeatureCollection",
                    features: e
                }
        }
    }), r.geoJson = function (t, i) {
        return new r.GeoJSON(t, i)
    };
    var u = "_sop_events";
    r.DomEvent = {
        on: function (t, i, e, n) {
            if ("object" == typeof i)for (var o in i)this._on(t, o, i[o], e); else {
                i = r.Util.splitWords(i);
                for (var s = 0, a = i.length; a > s; s++)this._on(t, i[s], e, n)
            }
            return this
        }, off: function (t, i, e, n) {
            if ("object" == typeof i)for (var o in i)this._off(t, o, i[o], e); else {
                i = r.Util.splitWords(i);
                for (var s = 0, a = i.length; a > s; s++)this._off(t, i[s], e, n)
            }
            return this
        }, _on: function (i, e, n, o) {
            var s = e + r.stamp(n) + (o ? "_" + r.stamp(o) : "");
            if (i[u] && i[u][s])return this;
            var a = function (e) {
                return n.call(o || i, e || t.event)
            }, h = a;
            return r.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(i, e, a, s) : r.Browser.touch && "dblclick" === e && this.addDoubleTapListener ? this.addDoubleTapListener(i, a, s) : "addEventListener" in i ? "mousewheel" === e ? (i.addEventListener("DOMMouseScroll", a, !1), i.addEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? (a = function (e) {
                                    e = e || t.event, r.DomEvent._checkMouse(i, e) || h(e)
                                }, i.addEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1)) : ("click" === e && r.Browser.android && (a = function (t) {
                                    return r.DomEvent._filterClick(t, h)
                                }), i.addEventListener(e, a, !1)) : "attachEvent" in i && i.attachEvent("on" + e, a), i[u] = i[u] || {}, i[u][s] = a, this
        }, _off: function (t, i, e, n) {
            var o = i + r.stamp(e) + (n ? "_" + r.stamp(n) : ""), s = t[u] && t[u][o];
            return s ? (r.Browser.pointer && 0 === i.indexOf("touch") ? this.removePointerListener(t, i, o) : r.Browser.touch && "dblclick" === i && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, o) : "removeEventListener" in t ? "mousewheel" === i ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(i, s, !1)) : t.removeEventListener("mouseenter" === i ? "mouseover" : "mouseleave" === i ? "mouseout" : i, s, !1) : "detachEvent" in t && t.detachEvent("on" + i, s), t[u][o] = null, this) : this
        }, stopPropagation: function (t) {
            return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, r.DomEvent._skipped(t), this
        }, disableScrollPropagation: function (t) {
            return r.DomEvent.on(t, "mousewheel MozMousePixelScroll", r.DomEvent.stopPropagation)
        }, disableClickPropagation: function (t) {
            var i = r.DomEvent.stopPropagation;
            return r.DomEvent.on(t, r.Draggable.START.join(" "), i), r.DomEvent.on(t, {
                click: r.DomEvent._fakeStop,
                dblclick: i
            })
        }, preventDefault: function (t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
        }, stop: function (t) {
            return r.DomEvent.preventDefault(t).stopPropagation(t)
        }, getMousePosition: function (t, i) {
            if (!i)return new r.Point(t.clientX, t.clientY);
            var e = i.getBoundingClientRect();
            return new r.Point(t.clientX - e.left - i.clientLeft, t.clientY - e.top - i.clientTop)
        }, getWheelDelta: function (t) {
            var i = 0;
            return t.wheelDelta && (i = t.wheelDelta / 120), t.detail && (i = -t.detail / 3), i
        }, _skipEvents: {}, _fakeStop: function (t) {
            r.DomEvent._skipEvents[t.type] = !0
        }, _skipped: function (t) {
            var i = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1, i
        }, _isExternalTarget: function (t, i) {
            var e = i.relatedTarget;
            if (!e)return !0;
            try {
                for (; e && e !== t;)e = e.parentNode
            } catch (n) {
                return !1
            }
            return e !== t
        }, _checkMouse: function (t, i) {
            var e = i.relatedTarget;
            if (!e)return !0;
            try {
                for (; e && e !== t;)e = e.parentNode
            } catch (n) {
                return !1
            }
            return e !== t
        }, _filterClick: function (t, i) {
            var e = t.timeStamp || t.originalEvent.timeStamp, n = r.DomEvent._lastClick && e - r.DomEvent._lastClick;
            return n && n > 100 && 500 > n || t.target._simulatedClick && !t._simulated ? void r.DomEvent.stop(t) : (r.DomEvent._lastClick = e, void i(t))
        }
    }, r.DomEvent.addListener = r.DomEvent.on, r.DomEvent.removeListener = r.DomEvent.off, r.Draggable = r.Evented.extend({
        statics: {
            START: r.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {mousedown: "mouseup", touchstart: "touchend", pointerdown: "touchend", MSPointerDown: "touchend"},
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        }, initialize: function (t, i, e) {
            this._element = t, this._dragStartTarget = i || t, this._preventOutline = e
        }, enable: function () {
            this._enabled || (r.DomEvent.on(this._dragStartTarget, r.Draggable.START.join(" "), this._onDown, this), this._enabled = !0)
        }, disable: function () {
            this._enabled && (r.DomEvent.off(this._dragStartTarget, r.Draggable.START.join(" "), this._onDown, this), this._enabled = !1, this._moved = !1)
        }, _onDown: function (t) {
            if (this._moved = !1, !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (r.DomEvent.stopPropagation(t), this._preventOutline && r.DomUtil.preventOutline(this._element), !r.DomUtil.hasClass(this._element, "sop-zoom-anim") && (r.DomUtil.disableImageDrag(), r.DomUtil.disableTextSelection(), !this._moving))) {
                this.fire("down");
                var e = t.touches ? t.touches[0] : t;
                this._startPoint = new r.Point(e.clientX, e.clientY), this._startPos = this._newPos = r.DomUtil.getPosition(this._element), r.DomEvent.on(i, r.Draggable.MOVE[t.type], this._onMove, this).on(i, r.Draggable.END[t.type], this._onUp, this)
            }
        }, _onMove: function (t) {
            if (t.touches && t.touches.length > 1)return void(this._moved = !0);
            var e = t.touches && 1 === t.touches.length ? t.touches[0] : t, n = new r.Point(e.clientX, e.clientY), o = n.subtract(this._startPoint);
            (o.x || o.y) && (r.Browser.touch && Math.abs(o.x) + Math.abs(o.y) < 3 || (r.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = r.DomUtil.getPosition(this._element).subtract(o), r.DomUtil.addClass(i.body, "sop-dragging"), this._lastTarget = t.target || t.srcElement, r.DomUtil.addClass(this._lastTarget, "sop-drag-target")), this._newPos = this._startPos.add(o), this._moving = !0, r.Util.cancelAnimFrame(this._animRequest), this._lastEvent = t, this._animRequest = r.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
        }, _updatePosition: function () {
            var t = {originalEvent: this._lastEvent};
            this.fire("predrag", t), r.DomUtil.setPosition(this._element, this._newPos), this.fire("drag", t)
        }, _onUp: function () {
            r.DomUtil.removeClass(i.body, "sop-dragging"), this._lastTarget && (r.DomUtil.removeClass(this._lastTarget, "sop-drag-target"), this._lastTarget = null);
            for (var t in r.Draggable.MOVE)r.DomEvent.off(i, r.Draggable.MOVE[t], this._onMove, this).off(i, r.Draggable.END[t], this._onUp, this);
            r.DomUtil.enableImageDrag(), r.DomUtil.enableTextSelection(), this._moved && this._moving && (r.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {distance: this._newPos.distanceTo(this._startPos)})), this._moving = !1
        }
    }), r.Handler = r.Class.extend({
        initialize: function (t) {
            this._map = t
        }, enable: function () {
            this._enabled || (this._enabled = !0, this.addHooks())
        }, disable: function () {
            this._enabled && (this._enabled = !1, this.removeHooks())
        }, enabled: function () {
            return !!this._enabled
        }
    }), r.Map.mergeOptions({
        dragging: !0,
        inertia: !r.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1
    }), r.Map.Drag = r.Handler.extend({
        addHooks: function () {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new r.Draggable(t._mapPane, t._container), this._draggable.on({
                    down: this._onDown,
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
            }
            r.DomUtil.addClass(this._map._container, "sop-grab"), this._draggable.enable()
        }, removeHooks: function () {
            r.DomUtil.removeClass(this._map._container, "sop-grab"), this._draggable.disable()
        }, moved: function () {
            return this._draggable && this._draggable._moved
        }, _onDown: function () {
            this._map.stop()
        }, _onDragStart: function () {
            var t = this._map;
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var i = r.utmkBounds(this._map.options.maxBounds);
                this._offsetLimit = r.bounds(this._map.utmkToContainerPoint(i.getNorthWest()).multiplyBy(-1), this._map.utmkToContainerPoint(i.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else this._offsetLimit = null;
            t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
        }, _onDrag: function (t) {
            if (this._map.options.inertia) {
                var i = this._lastTime = +new Date, e = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(e), this._times.push(i), i - this._times[0] > 50 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move", t).fire("drag", t)
        }, _onZoomEnd: function () {
            var t = this._map.getSize().divideBy(2), i = this._map.utmkToLayerPoint([0, 0]);
            this._initialWorldOffset = i.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        }, _viscousLimit: function (t, i) {
            return t - (t - i) * this._viscosity
        }, _onPreDragLimit: function () {
            if (this._viscosity && this._offsetLimit) {
                var t = this._draggable._newPos.subtract(this._draggable._startPos), i = this._offsetLimit;
                t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)), t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)), t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)), t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)), this._draggable._newPos = this._draggable._startPos.add(t)
            }
        }, _onPreDragWrap: function () {
            var t = this._worldWidth, i = Math.round(t / 2), e = this._initialWorldOffset, n = this._draggable._newPos.x, o = (n - i + e) % t + i - e, s = (n + i + e) % t - i - e, r = Math.abs(o + e) < Math.abs(s + e) ? o : s;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r
        }, _onDragEnd: function (t) {
            var i = this._map, e = i.options, n = !e.inertia || this._times.length < 2;
            if (i.fire("dragend", t), n) i.fire("moveend"); else {
                var o = this._lastPos.subtract(this._positions[0]), s = (this._lastTime - this._times[0]) / 1e3, a = e.easeLinearity, h = o.multiplyBy(a / s), u = h.distanceTo([0, 0]), l = Math.min(e.inertiaMaxSpeed, u), c = h.multiplyBy(l / u), d = l / (e.inertiaDeceleration * a), m = c.multiplyBy(-d / 2).round();
                m.x || m.y ? (m = i._limitOffset(m, i.options.maxBounds), r.Util.requestAnimFrame(function () {
                        i.panBy(m, {duration: d, easeLinearity: a, noMoveStart: !0, animate: !0})
                    })) : i.fire("moveend")
            }
        }
    }), r.Map.addInitHook("addHandler", "dragging", r.Map.Drag), r.Map.mergeOptions({doubleClickZoom: !0}), r.Map.DoubleClickZoom = r.Handler.extend({
        addHooks: function () {
            this._map.on("dblclick", this._onDoubleClick, this)
        }, removeHooks: function () {
            this._map.off("dblclick", this._onDoubleClick, this)
        }, _onDoubleClick: function (t) {
            var i = this._map, e = i.getZoom(), n = t.originalEvent.shiftKey ? Math.ceil(e) - 1 : Math.floor(e) + 1;
            "center" === i.options.doubleClickZoom ? i.setZoom(n) : i.setZoomAround(t.containerPoint, n)
        }
    }), r.Map.addInitHook("addHandler", "doubleClickZoom", r.Map.DoubleClickZoom), r.Map.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40
    }), r.Map.ScrollWheelZoom = r.Handler.extend({
        addHooks: function () {
            r.DomEvent.on(this._map._container, {
                mousewheel: this._onWheelScroll,
                MozMousePixelScroll: r.DomEvent.preventDefault
            }, this), this._delta = 0
        }, removeHooks: function () {
            r.DomEvent.off(this._map._container, {
                mousewheel: this._onWheelScroll,
                MozMousePixelScroll: r.DomEvent.preventDefault
            }, this)
        }, _onWheelScroll: function (t) {
            var i = r.DomEvent.getWheelDelta(t), e = this._map.options.wheelDebounceTime;
            this._delta += i, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var n = Math.max(e - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(r.bind(this._performZoom, this), n), r.DomEvent.stop(t)
        }, _performZoom: function () {
            var t = this._map, i = this._delta, e = t.getZoom();
            t.stop(), i = i > 0 ? Math.ceil(i) : Math.floor(i), i = Math.max(Math.min(i, 4), -4), i = t._limitZoom(e + i) - e, this._delta = 0, this._startTime = null, i && ("center" === t.options.scrollWheelZoom ? t.setZoom(e + i) : t.setZoomAround(this._lastMousePos, e + i))
        }
    }), r.Map.addInitHook("addHandler", "scrollWheelZoom", r.Map.ScrollWheelZoom), r.extend(r.DomEvent, {
        _touchstart: r.Browser.msPointer ? "MSPointerDown" : r.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: r.Browser.msPointer ? "MSPointerUp" : r.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function (t, i, e) {
            function n(t) {
                var i;
                if (i = r.Browser.pointer ? r.DomEvent._pointersCount : t.touches.length, !(i > 1)) {
                    var e = Date.now(), n = e - (s || e);
                    a = t.touches ? t.touches[0] : t, h = n > 0 && u >= n, s = e
                }
            }

            function o() {
                if (h) {
                    if (r.Browser.pointer) {
                        var t, e, n = {};
                        for (e in a)t = a[e], n[e] = t && t.bind ? t.bind(a) : t;
                        a = n
                    }
                    a.type = "dblclick", i(a), s = null
                }
            }

            var s, a, h = !1, u = 250, l = "_sop_", c = this._touchstart, d = this._touchend;
            return t[l + c + e] = n, t[l + d + e] = o, t.addEventListener(c, n, !1), t.addEventListener(d, o, !1), this
        },
        removeDoubleTapListener: function (t, i) {
            var e = "_sop_", n = t[e + this._touchend + i];
            return t.removeEventListener(this._touchstart, t[e + this._touchstart + i], !1), t.removeEventListener(this._touchend, n, !1), this
        }
    }), r.extend(r.DomEvent, {
        POINTER_DOWN: r.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: r.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: r.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: r.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        _pointers: {},
        addPointerListener: function (t, i, e, n) {
            return "touchstart" === i ? this._addPointerStart(t, e, n) : "touchmove" === i ? this._addPointerMove(t, e, n) : "touchend" === i && this._addPointerEnd(t, e, n), this
        },
        removePointerListener: function (t, i, e) {
            var n = t["_sop_" + i + e];
            return "touchstart" === i ? t.removeEventListener(this.POINTER_DOWN, n, !1) : "touchmove" === i ? t.removeEventListener(this.POINTER_MOVE, n, !1) : "touchend" === i && (t.removeEventListener(this.POINTER_UP, n, !1), t.removeEventListener(this.POINTER_CANCEL, n, !1)), this
        },
        _addPointerStart: function (t, e, n) {
            var o = r.bind(function (t) {
                r.DomEvent.preventDefault(t), this._pointers[t.pointerId] = t, this._handlePointer(t, e)
            }, this);
            if (t["_sop_touchstart" + n] = o, t.addEventListener(this.POINTER_DOWN, o, !1), !this._pointerDocListener) {
                var s = r.bind(this._globalPointerUp, this);
                i.documentElement.addEventListener(this.POINTER_DOWN, r.bind(this._globalPointerDown, this), !0), i.documentElement.addEventListener(this.POINTER_MOVE, r.bind(this._globalPointerMove, this), !0), i.documentElement.addEventListener(this.POINTER_UP, s, !0), i.documentElement.addEventListener(this.POINTER_CANCEL, s, !0), this._pointerDocListener = !0
            }
        },
        _globalPointerDown: function (t) {
            this._pointers[t.pointerId] = t, this._pointersCount++
        },
        _globalPointerMove: function (t) {
            this._pointers[t.pointerId] && (this._pointers[t.pointerId] = t)
        },
        _globalPointerUp: function (t) {
            delete this._pointers[t.pointerId], this._pointersCount--
        },
        _handlePointer: function (t, i) {
            t.touches = [];
            for (var e in this._pointers)t.touches.push(this._pointers[e]);
            t.changedTouches = [t], i(t)
        },
        _addPointerMove: function (t, i, e) {
            var n = r.bind(function (t) {
                (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && this._handlePointer(t, i)
            }, this);
            t["_sop_touchmove" + e] = n, t.addEventListener(this.POINTER_MOVE, n, !1)
        },
        _addPointerEnd: function (t, i, e) {
            var n = r.bind(function (t) {
                this._handlePointer(t, i)
            }, this);
            t["_sop_touchend" + e] = n, t.addEventListener(this.POINTER_UP, n, !1), t.addEventListener(this.POINTER_CANCEL, n, !1)
        }
    }), r.Map.mergeOptions({
        touchZoom: r.Browser.touch && !r.Browser.android23,
        bounceAtZoomLimits: !0
    }), r.Map.TouchZoom = r.Handler.extend({
        addHooks: function () {
            r.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        }, removeHooks: function () {
            r.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        }, _onTouchStart: function (t) {
            var e = this._map;
            if (t.touches && 2 === t.touches.length && !e._animatingZoom && !this._zooming) {
                var n = e.mouseEventToContainerPoint(t.touches[0]), o = e.mouseEventToContainerPoint(t.touches[1]);
                this._centerPoint = e.getSize()._divideBy(2), this._startUTMK = e.containerPointToUTMK(this._centerPoint), "center" !== e.options.touchZoom && (this._pinchStartUTMK = e.containerPointToUTMK(n.add(o)._divideBy(2))), this._startDist = n.distanceTo(o), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e.stop(), r.DomEvent.on(i, "touchmove", this._onTouchMove, this).on(i, "touchend", this._onTouchEnd, this), r.DomEvent.preventDefault(t)
            }
        }, _onTouchMove: function (t) {
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = this._map, e = i.mouseEventToContainerPoint(t.touches[0]), n = i.mouseEventToContainerPoint(t.touches[1]), o = e.distanceTo(n) / this._startDist;
                if (this._zoom = i.getScaleZoom(o, this._startZoom), "center" === i.options.touchZoom) {
                    if (this._center = this._startUTMK, 1 === o)return
                } else {
                    var s = e._add(n)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === o && 0 === s.x && 0 === s.y)return;
                    this._center = i.unproject(i.project(this._pinchStartUTMK).subtract(s))
                }
                (i.options.bounceAtZoomLimits || !(this._zoom <= i.getMinZoom() && 1 > o || this._zoom >= i.getMaxZoom() && o > 1)) && (this._moved || (this._moved = !0), r.DomEvent.preventDefault(t))
            }
        }, _onTouchEnd: function () {
            if (!this._moved || !this._zooming)return void(this._zooming = !1);
            this._zooming = !1, r.DomEvent.off(i, "touchmove", this._onTouchMove).off(i, "touchend", this._onTouchEnd);
            var t = this._zoom;
            t = this._map._limitZoom(t - this._startZoom > 0 ? Math.ceil(t) : Math.floor(t)), this._map.setZoom(t)
        }
    }), r.Map.addInitHook("addHandler", "touchZoom", r.Map.TouchZoom), r.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    }), r.Map.Tap = r.Handler.extend({
        addHooks: function () {
            r.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        }, removeHooks: function () {
            r.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        }, _onDown: function (t) {
            if (t.touches) {
                if (r.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1)return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                var e = t.touches[0], n = e.target;
                this._startPos = this._newPos = new r.Point(e.clientX, e.clientY), n.tagName && "a" === n.tagName.toLowerCase() && r.DomUtil.addClass(n, "sop-active"), this._holdTimeout = setTimeout(r.bind(function () {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", e))
                }, this), 1e3), this._simulateEvent("mousedown", e), r.DomEvent.on(i, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        }, _onUp: function (t) {
            if (clearTimeout(this._holdTimeout), r.DomEvent.off(i, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this), this._fireClick && t && t.changedTouches) {
                var e = t.changedTouches[0], n = e.target;
                n && n.tagName && "a" === n.tagName.toLowerCase() && r.DomUtil.removeClass(n, "sop-active"), this._simulateEvent("mouseup", e), this._isTapValid() && this._simulateEvent("click", e)
            }
        }, _isTapValid: function () {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        }, _onMove: function (t) {
            var i = t.touches[0];
            this._newPos = new r.Point(i.clientX, i.clientY)
        }, _simulateEvent: function (e, n) {
            var o = i.createEvent("MouseEvents");
            o._simulated = !0, n.target._simulatedClick = !0, o.initMouseEvent(e, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(o)
        }
    }), r.Browser.touch && !r.Browser.pointer && r.Map.addInitHook("addHandler", "tap", r.Map.Tap), r.Map.mergeOptions({boxZoom: !0}), r.Map.BoxZoom = r.Handler.extend({
        initialize: function (t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane
        }, addHooks: function () {
            r.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        }, removeHooks: function () {
            r.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
        }, moved: function () {
            return this._moved
        }, _onMouseDown: function (t) {
            return !t.shiftKey || 1 !== t.which && 1 !== t.button ? !1 : (this._moved = !1, r.DomUtil.disableTextSelection(), r.DomUtil.disableImageDrag(), this._startPoint = this._map.mouseEventToContainerPoint(t), void r.DomEvent.on(i, {
                    contextmenu: r.DomEvent.stop,
                    mousemove: this._onMouseMove,
                    mouseup: this._onMouseUp,
                    keydown: this._onKeyDown
                }, this))
        }, _onMouseMove: function (t) {
            this._moved || (this._moved = !0, this._box = r.DomUtil.create("div", "sop-zoom-box", this._container), r.DomUtil.addClass(this._container, "sop-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
            var i = new r.Bounds(this._point, this._startPoint), e = i.getSize();
            r.DomUtil.setPosition(this._box, i.min), this._box.style.width = e.x + "px", this._box.style.height = e.y + "px"
        }, _finish: function () {
            this._moved && (r.DomUtil.remove(this._box), r.DomUtil.removeClass(this._container, "sop-crosshair")), r.DomUtil.enableTextSelection(), r.DomUtil.enableImageDrag(), r.DomEvent.off(i, {
                contextmenu: r.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        }, _onMouseUp: function (t) {
            if (1 !== t.which && 1 !== t.button)return !1;
            if (this._finish(), this._moved) {
                var i = new r.UTMKBounds(this._map.containerPointToUTMK(this._startPoint), this._map.containerPointToUTMK(this._point));
                this._map.fitBounds(i).fire("boxzoomend", {boxZoomBounds: i})
            }
        }, _onKeyDown: function (t) {
            27 === t.keyCode && this._finish()
        }
    }), r.Map.addInitHook("addHandler", "boxZoom", r.Map.BoxZoom), r.Map.mergeOptions({
        keyboard: !0,
        keyboardPanOffset: 80,
        keyboardZoomOffset: 1
    }), r.Map.Keyboard = r.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        }, initialize: function (t) {
            this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
        }, addHooks: function () {
            var t = this._map._container;
            -1 === t.tabIndex && (t.tabIndex = "0"), r.DomEvent.on(t, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.on({focus: this._addHooks, blur: this._removeHooks}, this)
        }, removeHooks: function () {
            this._removeHooks(), r.DomEvent.off(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.off({focus: this._addHooks, blur: this._removeHooks}, this)
        }, _onMouseDown: function () {
            if (!this._focused) {
                var e = i.body, n = i.documentElement, o = e.scrollTop || n.scrollTop, s = e.scrollLeft || n.scrollLeft;
                this._map._container.focus(), t.scrollTo(s, o)
            }
        }, _onFocus: function () {
            this._focused = !0, this._map.fire("focus")
        }, _onBlur: function () {
            this._focused = !1, this._map.fire("blur")
        }, _setPanOffset: function (t) {
            var i, e, n = this._panKeys = {}, o = this.keyCodes;
            for (i = 0, e = o.left.length; e > i; i++)n[o.left[i]] = [-1 * t, 0];
            for (i = 0, e = o.right.length; e > i; i++)n[o.right[i]] = [t, 0];
            for (i = 0, e = o.down.length; e > i; i++)n[o.down[i]] = [0, t];
            for (i = 0, e = o.up.length; e > i; i++)n[o.up[i]] = [0, -1 * t]
        }, _setZoomOffset: function (t) {
            var i, e, n = this._zoomKeys = {}, o = this.keyCodes;
            for (i = 0, e = o.zoomIn.length; e > i; i++)n[o.zoomIn[i]] = t;
            for (i = 0, e = o.zoomOut.length; e > i; i++)n[o.zoomOut[i]] = -t
        }, _addHooks: function () {
            r.DomEvent.on(i, "keydown", this._onKeyDown, this)
        }, _removeHooks: function () {
            r.DomEvent.off(i, "keydown", this._onKeyDown, this)
        }, _onKeyDown: function (t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                var i = t.keyCode, e = this._map;
                if (i in this._panKeys) {
                    if (e._panAnim && e._panAnim._inProgress)return;
                    e.panBy(this._panKeys[i]), e.options.maxBounds && e.panInsideBounds(e.options.maxBounds)
                } else if (i in this._zoomKeys) e.setZoom(e.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[i]); else {
                    if (27 !== i)return;
                    e.closePopup()
                }
                r.DomEvent.stop(t)
            }
        }
    }), r.Map.addInitHook("addHandler", "keyboard", r.Map.Keyboard), r.Handler.MarkerDrag = r.Handler.extend({
        initialize: function (t) {
            this._marker = t
        }, addHooks: function () {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new r.Draggable(t, t, !0)), this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable(), r.DomUtil.addClass(t, "sop-marker-draggable")
        }, removeHooks: function () {
            this._draggable.off({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable(), this._marker._icon && r.DomUtil.removeClass(this._marker._icon, "sop-marker-draggable")
        }, moved: function () {
            return this._draggable && this._draggable._moved
        }, _onDragStart: function () {
            this._marker.closeInfoWindow().fire("movestart").fire("dragstart")
        }, _onDrag: function (t) {
            var i = this._marker, e = i._shadow, n = r.DomUtil.getPosition(i._icon), o = i._map.layerPointToUTMK(n);
            e && r.DomUtil.setPosition(e, n), i._utmk = o, i.fire("move", t).fire("drag", t), i.captionObj && i.captionObj._updateCaptionPos(o)
        }, _onDragEnd: function (t) {
            this._marker.fire("moveend").fire("dragend", t)
        }
    }), r.Control = r.Class.extend({
        options: {position: "topright"}, initialize: function (t) {
            r.setOptions(this, t)
        }, getPosition: function () {
            return this.options.position
        }, setPosition: function (t) {
            var i = this._map;
            return i && i.removeControl(this), this.options.position = t, i && i.addControl(this), this
        }, getContainer: function () {
            return this._container
        }, addTo: function (t) {
            this._map = t;
            var i = this._container = this.onAdd(t), e = this.getPosition(), n = t._controlCorners[e];
            return r.DomUtil.addClass(i, "sop-control"), -1 !== e.indexOf("bottom") ? n.insertBefore(i, n.firstChild) : n.appendChild(i), this
        }, remove: function () {
            return this._map ? (r.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this) : this
        }, _refocusOnMap: function (t) {
            this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
        }
    }), r.control = function (t) {
        return new r.Control(t)
    }, r.Map.include({
        addControl: function (t) {
            return t.addTo(this), this
        }, removeControl: function (t) {
            return t.remove(), this
        }, _initControlPos: function () {
            function t(t, o) {
                var s = e + t + " " + e + o;
                i[t + o] = r.DomUtil.create("div", s, n)
            }

            var i = this._controlCorners = {}, e = "sop-", n = this._controlContainer = r.DomUtil.create("div", e + "control-container", this._container);
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
        }, _clearControlPos: function () {
            r.DomUtil.remove(this._controlContainer)
        }
    }), r.Control.Zoomslider = r.Control.extend({
        options: {
            position: "topright",
            sliderHeight: 180,
            stepHeight: 9,
            styleNS: "sop-control-zoomSlider",
            zoomInfo: {1: "전국", 3: "도", 5: "시군구", 8: "동리", 11: "거리"}
        }, onAdd: function (t) {
            return this._map = t, this._ui = this._createUI(), this._sliderDrag = new r.Control.Zoomslider.Drag(this._ui.slider, this.options.stepHeight), t.whenReady(this._initSliderDrag, this).whenReady(this._initEvents, this).whenReady(this._updateSize, this).whenReady(this._updateSliderDragValue, this).whenReady(this._updateBarValue, this).whenReady(this._updateDisabled, this), this._ui.bar
        }, onRemove: function (t) {
            t.off("zoomlevelschange", this._updateSize, this).off("zoomend zoomlevelschange", this._updateSliderDragValue, this).off("zoomend zoomlevelschange", this._updateBarValue, this).off("zoomend zoomlevelschange", this._updateDisabled, this)
        }, _createUI: function () {
            var t = {}, i = this.options.styleNS;
            return t.bar = r.DomUtil.create("div", i + " sop-bar"), t.zoomIn = this._createZoomBtn("in", "top", t.bar), t.wrap = r.DomUtil.create("div", i + "-wrap sop-bar-part", t.bar), t.zoomOut = this._createZoomBtn("out", "bottom", t.bar), t.deactiveBar = r.DomUtil.create("div", i + "-bar-deactive", t.wrap), t.activeBar = r.DomUtil.create("div", i + "-bar-active", t.wrap), t.slider = r.DomUtil.create("div", i + "-slider"), 14 === this._zoomLevels() && this._map.statisticTileLayer && this._createLevelInfoUI(t, i), r.DomUtil.addClass(t.zoomIn, "sop-control-background"), r.DomUtil.addClass(t.zoomOut, "sop-control-background"), r.DomUtil.addClass(t.deactiveBar, "sop-control-background"), r.DomUtil.addClass(t.activeBar, "sop-control-background"), r.DomUtil.addClass(t.slider, "sop-control-background"), r.DomEvent.disableClickPropagation(t.bar), r.DomEvent.disableClickPropagation(t.slider), t
        }, _createLevelInfoUI: function (t, i) {
            var e, n, o, s;
            e = this.getPosition(), n = e.match(/left|right/), n && (e = n[0]), s = i + "-bar-levelInfo-" + e, t.levelInfo = r.DomUtil.create("div", s, t.bar), t.levelInfo.style.display = "none";
            for (o in this.options.zoomInfo) {
                t.levelInfo[o] = r.DomUtil.create("div", s + "-" + o, t.levelInfo), r.DomUtil.addClass(t.levelInfo[o], i + "-bar-levelInfo-background"), t.levelInfo[o].style.position = "absolute";
                var a = this.options.stepHeight * (this._zoomLevels() - 1 - o) - 1;
                r.DomUtil.setPosition(t.levelInfo[o], r.point(0, a))
            }
        }, _createZoomBtn: function (t, i, e) {
            var n = this.options.styleNS + "-" + t + " sop-bar-part sop-bar-part-" + i, o = r.DomUtil.create("a", n, e);
            return o.href = "#", o.title = "Zoom " + t, r.DomEvent.on(o, "click", r.DomEvent.preventDefault), o
        }, _initSliderDrag: function () {
            this._sliderDrag.enable(), this._ui.deactiveBar.appendChild(this._ui.slider)
        }, _initEvents: function () {
            this._map.on("zoomlevelschange", this._updateSize, this).on("zoomend zoomlevelschange", this._updateSliderDragValue, this).on("zoomend zoomlevelschange", this._updateBarValue, this).on("mouseup", this._clearInterval, this).on("drag", this._clearInterval, this).on("zoomend zoomlevelschange", this._updateDisabled, this), r.DomEvent.on(this._ui.deactiveBar, "click", this._onSliderClick, this), r.DomEvent.on(this._ui.activeBar, "click", this._onSliderClick, this), r.DomEvent.on(this._ui.zoomIn, "click mousedown", this._zoomIn, this), r.DomEvent.on(this._ui.zoomOut, "click mousedown", this._zoomOut, this), r.DomEvent.on(this._ui.zoomIn, "drag", this._clearInterval, this), r.DomEvent.on(this._ui.zoomOut, "drag", this._clearInterval, this), this._sliderDrag.on("drag", this._updateMapZoom, this), r.DomEvent.on(this._ui.wrap, "mouseover", this._showZoomLevelInfo, this), r.DomEvent.on(this._ui.wrap, "mouseout", this._hideZoomlevelInfo, this), r.DomEvent.on(t, "resize", this._browserResize, this), r.DomEvent.on(t, "onload", this._browserResize, this)
        }, _onSliderClick: function (t) {
            var i = t.touches && 1 === t.touches.length ? t.touches[0] : t, e = r.DomEvent.getMousePosition(i, this._ui.deactiveBar).y;
            this._sliderDrag.setPosition(e), this._updateMapZoom()
        }, _clearInterval: function () {
            t.clearTimeout(this._interval), delete this._interval
        }, _zoomIn: function (t) {
            return "number" == typeof t ? void this._map.zoomIn(1) : void("click" === t.type ? this._mDown || this._map.zoomIn(t.shiftKey ? 3 : 1) : "mousedown" === t.type && (this._mDown = !1, this._interval = setInterval(r.Util.bind(function () {
                        this._mDown = !0, this._zoomIn(1)
                    }, this), 500)))
        }, _zoomOut: function (t) {
            return "number" == typeof t ? void this._map.zoomOut(1) : void("click" === t.type ? this._mDown || this._map.zoomOut(t.shiftKey ? 3 : 1) : "mousedown" === t.type && (this._mDown = !1, this._interval = setInterval(r.Util.bind(function () {
                        this._mDown = !0, this._zoomOut(1)
                    }, this), 500)))
        }, _zoomLevels: function () {
            var t = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
            return 1 / 0 > t ? t : 0
        }, _showZoomLevelInfo: function () {
            this._ui.levelInfo && (this._ui.levelInfo.style.display = "block")
        }, _hideZoomlevelInfo: function () {
            this._ui.levelInfo && (this._ui.levelInfo.style.display = "none")
        }, _toZoomLevel: function (t) {
            return t + this._map.getMinZoom()
        }, _toValue: function (t) {
            return t - this._map.getMinZoom()
        }, _updateSize: function () {
            var t = this._zoomLevels();
            this._sliderDrag.setSteps(t)
        }, _updateMapZoom: function (t) {
            var i = this._sliderDrag.getValue(), e = this._toZoomLevel(i);
            this._updateBarValue(e);
            var n = "object" == typeof t ? !1 : !0;
            this._map.setZoom(e, {animate: n})
        }, _updateSliderDragValue: function () {
            this._sliderDrag.setValue(this._toValue(this._map.getZoom()))
        }, _updateBarValue: function (t) {
            var i = "object" == typeof t ? this._map.getZoom() : t, e = this.options.stepHeight;
            this._ui.deactiveBar.style.height = e * (this._map.getMaxZoom() - i + 1) + "px", this._ui.activeBar.style.height = e * (i - this._map.getMinZoom() + 1) + "px"
        }, _updateDisabled: function () {
            var t = this._map.getZoom(), i = this.options.styleNS + "-disabled";
            r.DomUtil.removeClass(this._ui.zoomIn, i), r.DomUtil.removeClass(this._ui.zoomOut, i), t === this._map.getMinZoom() && r.DomUtil.addClass(this._ui.zoomOut, i), t === this._map.getMaxZoom() && r.DomUtil.addClass(this._ui.zoomIn, i)
        }, _browserResize: function () {
            var e = t.innerWidth || i.documentElement.clientWidth || i.body.clientWidth, n = t.innerHeight || i.documentElement.clientHeight || i.body.clientHeight;
            500 > e || 500 > n ? this._ui.wrap.style.display = "none" : this._ui.wrap.style.display = "block"
        }
    }), r.Map.mergeOptions({zoomControl: !1, zoomSliderControl: !0}), r.Map.addInitHook(function () {
        this.options.zoomSliderControl && (this.zoomSliderControl = new r.Control.Zoomslider, this.addControl(this.zoomSliderControl))
    }), r.control.zoomSlider = function (t) {
        return new r.Control.Zoomslider(t)
    }, r.Control.Zoomslider.Drag = r.Draggable.extend({
        initialize: function (t, i) {
            r.Draggable.prototype.initialize.call(this, t, t), this._element = t, this._stepHeight = i, this._lastY = "", this.on("predrag", function () {
                this._newPos.x = 0, this._newPos.y = this._adjust(this._newPos.y)
            }, this)
        }, _adjust: function (t) {
            var i = Math.ceil(this._toValue(t));
            return i = Math.max(0, Math.min(this._maxValue, i)), this._toY(i)
        }, _toY: function (t) {
            return this._k * (this._maxValue - t) + this._m / 2
        }, _toValue: function (t) {
            return this._maxValue - (t - this._m / 2) / this._k
        }, setSteps: function (t) {
            this._maxValue = t - 1, this._k = this._stepHeight, this._m = this._element.clientHeight
        }, setPosition: function (t) {
            r.DomUtil.setPosition(this._element, r.point(0, this._adjust(t)))
        }, setValue: function (t) {
            this.setPosition(this._toY(t))
        }, getValue: function () {
            return this._toValue(r.DomUtil.getPosition(this._element).y)
        }
    }), r.Control.Zoom = r.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        }, onAdd: function (t) {
            var i = "sop-control-zoom", e = r.DomUtil.create("div", i + " sop-bar"), n = this.options;
            return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + "-in", e, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + "-out", e, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), e
        }, onRemove: function (t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
        }, disable: function () {
            return this._disabled = !0, this._updateDisabled(), this
        }, enable: function () {
            return this._disabled = !1, this._updateDisabled(), this
        }, _zoomIn: function (t) {
            this._disabled || this._map.zoomIn(t.shiftKey ? 3 : 1)
        }, _zoomOut: function (t) {
            this._disabled || this._map.zoomOut(t.shiftKey ? 3 : 1)
        }, _createButton: function (t, i, e, n, o) {
            var s = r.DomUtil.create("a", e, n);
            return s.innerHTML = t, s.href = "#", s.title = i, r.DomEvent.on(s, "mousedown dblclick", r.DomEvent.stopPropagation).on(s, "click", r.DomEvent.stop).on(s, "click", o, this).on(s, "click", this._refocusOnMap, this), s
        }, _updateDisabled: function () {
            var t = this._map, i = "sop-disabled";
            r.DomUtil.removeClass(this._zoomInButton, i), r.DomUtil.removeClass(this._zoomOutButton, i), (this._disabled || t._zoom === t.getMinZoom()) && r.DomUtil.addClass(this._zoomOutButton, i), (this._disabled || t._zoom === t.getMaxZoom()) && r.DomUtil.addClass(this._zoomInButton, i)
        }
    }), r.Map.mergeOptions({zoomControl: !0}), r.Map.addInitHook(function () {
        this.options.zoomControl && (this.zoomControl = new r.Control.Zoom, this.addControl(this.zoomControl))
    }), r.control.zoom = function (t) {
        return new r.Control.Zoom(t)
    }, r.Control.Attribution = r.Control.extend({
        options: {position: "bottomright"}, initialize: function (t) {
            r.setOptions(this, t), this._attributions = {}
        }, onAdd: function (t) {
            if (this._container = r.DomUtil.create("div", "sop-control-attribution"), r.DomEvent && r.DomEvent.disableClickPropagation(this._container), !this.options.prefix) {
                var i = '<a style=color:#ffffff; href="http://kostat.go.kr" title="통계청">';
                i += '<div class="sop-control-background"', i += 'style="background-position: -78px -316px;', i += 'width: 55px; height: 15px; margin: 5px 0;"></div>', this.options.prefix = i
            }
            for (var e in t._layers)t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
            return this._update(), this._container
        }, setPrefix: function (t) {
            return this.options.prefix = t, this._update(), this
        }, addAttribution: function (t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this
        }, removeAttribution: function (t) {
            return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this
        }, _update: function () {
            if (this._map) {
                var t = [];
                for (var i in this._attributions)this._attributions[i] && t.push(i);
                var e = [];
                this.options.prefix && e.push(this.options.prefix), t.length && e.push(t.join(", ")), this._container.innerHTML = e.join(" | ")
            }
        }
    }), r.Map.mergeOptions({attributionControl: !0}), r.Map.addInitHook(function () {
        this.options.attributionControl && (this.attributionControl = (new r.Control.Attribution).addTo(this))
    }), r.control.attribution = function (t) {
        return new r.Control.Attribution(t)
    }, r.Control.Scale = r.Control.extend({
        options: {position: "bottomleft", maxWidth: 50, updateWhenIdle: !0},
        onAdd: function (t) {
            var i = "sop-control-scale", e = r.DomUtil.create("div", i), n = this.options;
            return this._addScales(n, i, e), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), e
        },
        onRemove: function (t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function (t, i, e) {
            this._mScaleTitle = r.DomUtil.create("div", i + "-title", e), this._mScale = r.DomUtil.create("div", i + "-image", e), r.DomUtil.addClass(this._mScale, "sop-control-background")
        },
        _update: function () {
            var t = this._map, i = t.getSize().y / 2, e = r.CRS.UTMK.distance(t.containerPointToUTMK([0, i]), t.containerPointToUTMK([this.options.maxWidth, i]));
            this._updateScales(e)
        },
        _updateScales: function (t) {
            t && this._updateMetric(t)
        },
        _updateMetric: function (t) {
            var i = 2e3 > t ? Math.round(t) + "m" : Math.round(t / 1e3) + "km";
            this._mScaleTitle.innerHTML = i
        }
    }), r.Map.mergeOptions({scale: !1}), r.Map.addInitHook(function () {
        this.options.scale && (this.scale = new r.Control.Scale, this.addControl(this.scale))
    }), r.control.scale = function (t) {
        return new r.Control.Scale(t)
    }, r.Control.Pan = r.Control.extend({
        options: {
            position: "topleft",
            panInfo: {
                panup: {desc: "위로 이동", origin: r.point(25, 6)},
                panleft: {desc: "왼쪽으로 이동", origin: r.point(8, 23)},
                panright: {desc: "오른쪽으로 이동", origin: r.point(44, 23)},
                pandown: {desc: "아래로 이동", origin: r.point(25, 44)}
            }
        }, onAdd: function (t) {
            var i = "sop-control-pan", e = r.DomUtil.create("div", i), n = this.options;
            return r.DomUtil.addClass(e, "sop-control-background"), this._addPanButton(n.panInfo.panup, i + "-up", e), this._addPanButton(n.panInfo.panleft, i + "-left", e), this._addPanButton(n.panInfo.panright, i + "-right", e), this._addPanButton(n.panInfo.pandown, i + "-down", e), r.DomEvent.on(e, "click mousedown dblclick ", r.DomEvent.stopPropagation), t.whenReady(r.Util.falseFn, this), e
        }, onRemove: function (t) {
            var i = r.DomUtil.get(t._controlCorners.topleft);
            r.DomUtil.hasClass(i, "sop-control-pan") && r.DomUtil.removeClass(i, "sop-control-pan")
        }, _mouseDown: function (t) {
            var i = this.options.panInfo, e = 20;
            this._moveX = this._moveX || 0, this._moveY = this._moveY || 0, r.Browser.ielt9 ? this._eleTarget = this._eleTarget || t.srcElement : this._eleTarget = t.target, i.panup.element === this._eleTarget ? this._moveY -= e : i.panleft.element === this._eleTarget ? this._moveX -= e : i.panright.element === this._eleTarget ? this._moveX += e : i.pandown.element === this._eleTarget && (this._moveY += e), this._pressTimeoutId = setTimeout(r.bind(this._mouseDown, this, t), 100), this._map.panBy(r.point(this._moveX, this._moveY))
        }, _mouseUp: function () {
            clearTimeout(this._pressTimeoutId), this._moveX = 0, this._moveY = 0, delete this._eleTarget
        }, _click: function () {
            this._map.panBy(r.point(50, 50))
        }, _addPanButton: function (t, i, e) {
            var n = r.DomUtil.create("div", i, e);
            r.DomUtil.addClass(n, "sop-control-background"), n.style.position = "absolute", r.DomUtil.setPosition(n, t.origin, !0), r.DomEvent.on(n, "click mousedown dblclick mouseup", r.DomEvent.stopPropagation).on(n, "mousedown mouseup", r.DomEvent.stop).on(n, "mousedown", this._mouseDown, this).on(n, "mouseup mouseleave", this._mouseUp, this).on(n, "mousedown mouseup", this._refocusOnMap, this), t.element = n
        }
    }), r.Map.mergeOptions({panControl: !1}), r.Map.addInitHook(function () {
        !r.Browser.mobile && this.options.panControl && (this.panControl = new r.Control.Pan, this.addControl(this.panControl))
    }), r.control.pan = function (t) {
        return new r.Control.Pan(t)
    }, r.Control.Layers = r.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1
        }, initialize: function (t, i, e) {
            r.setOptions(this, e), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
            for (var n in t)this._addLayer(t[n], n);
            for (n in i)this._addLayer(i[n], n, !0)
        }, onAdd: function () {
            return this._initLayout(), this._update(), this._container
        }, addBaseLayer: function (t, i) {
            return this._addLayer(t, i), this._update()
        }, addOverlay: function (t, i) {
            return this._addLayer(t, i, !0), this._update()
        }, removeLayer: function (t) {
            return t.off("add remove", this._onLayerChange, this), delete this._layers[r.stamp(t)], this._update()
        }, _initLayout: function () {
            var t = "sop-control-layers", i = this._container = r.DomUtil.create("div", t);
            i.setAttribute("aria-haspopup", !0), r.Browser.touch ? r.DomEvent.on(i, "click", r.DomEvent.stopPropagation) : r.DomEvent.disableClickPropagation(i).disableScrollPropagation(i);
            var e = this._form = r.DomUtil.create("form", t + "-list");
            if (this.options.collapsed) {
                r.Browser.android || r.DomEvent.on(i, {mouseenter: this._expand, mouseleave: this._collapse}, this);
                var n = this._layersLink = r.DomUtil.create("a", t + "-toggle", i);
                n.href = "#", n.title = "Layers", r.Browser.touch ? r.DomEvent.on(n, "click", r.DomEvent.stop).on(n, "click", this._expand, this) : r.DomEvent.on(n, "focus", this._expand, this), r.DomEvent.on(e, "click", function () {
                    setTimeout(r.bind(this._onInputClick, this), 0)
                }, this), this._map.on("click", this._collapse, this)
            } else this._expand();
            this._baseLayersList = r.DomUtil.create("div", t + "-base", e), this._separator = r.DomUtil.create("div", t + "-separator", e), this._overlaysList = r.DomUtil.create("div", t + "-overlays", e), i.appendChild(e)
        }, _addLayer: function (t, i, e) {
            t.on("add remove", this._onLayerChange, this);
            var n = r.stamp(t);
            this._layers[n] = {
                layer: t,
                name: i,
                overlay: e
            }, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
        }, _update: function () {
            if (!this._container)return this;
            r.DomUtil.empty(this._baseLayersList), r.DomUtil.empty(this._overlaysList);
            var t, i, e, n, o = 0;
            for (e in this._layers)n = this._layers[e], this._addItem(n), i = i || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
            return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = i && t ? "" : "none", this
        }, _onLayerChange: function (t) {
            this._handlingClick || this._update();
            var i = this._layers[r.stamp(t.target)].overlay, e = i ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
            e && this._map.fire(e, t.target)
        }, _createRadioElement: function (t, e) {
            var n = '<input type="radio" class="sop-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", o = i.createElement("div");
            return o.innerHTML = n, o.firstChild
        }, _addItem: function (t) {
            var e, n = i.createElement("label"), o = this._map.hasLayer(t.layer);
            t.overlay ? (e = i.createElement("input"), e.type = "checkbox", e.className = "sop-control-layers-selector", e.defaultChecked = o) : e = this._createRadioElement("sop-base-layers", o), e.layerId = r.stamp(t.layer), r.DomEvent.on(e, "click", this._onInputClick, this);
            var s = i.createElement("span");
            s.innerHTML = " " + t.name;
            var a = i.createElement("div");
            n.appendChild(a), a.appendChild(e), a.appendChild(s);
            var h = t.overlay ? this._overlaysList : this._baseLayersList;
            return h.appendChild(n), n
        }, _onInputClick: function () {
            var t, i, e, n = this._form.getElementsByTagName("input"), o = [], s = [];
            this._handlingClick = !0;
            for (var r = 0, a = n.length; a > r; r++)t = n[r], i = this._layers[t.layerId].layer, e = this._map.hasLayer(i), t.checked && !e ? o.push(i) : !t.checked && e && s.push(i);
            for (r = 0; r < s.length; r++)this._map.removeLayer(s[r]);
            for (r = 0; r < o.length; r++)this._map.addLayer(o[r]);
            this._handlingClick = !1, this._refocusOnMap()
        }, _expand: function () {
            r.DomUtil.addClass(this._container, "sop-control-layers-expanded");
            var t = this._map._size.y - 4 * this._container.offsetTop;
            t < this._form.clientHeight && (r.DomUtil.addClass(this._form, "sop-control-layers-scrollbar"), this._form.style.height = t + "px")
        }, _collapse: function () {
            r.DomUtil.removeClass(this._container, "sop-control-layers-expanded")
        }
    }), r.control.layers = function (t, i, e) {
        return new r.Control.Layers(t, i, e)
    }, r.Control.Measure = {}, r.Control.Measure.Overlay = r.Class.extend({
        initialize: function (t) {
            this._map = t, this._activated = !1, this._infoWindowGroup = new r.LayerGroup
        }, _isActivated: function () {
            return this._activated
        }, setActivate: function (t) {
            this._activated = t
        }, initMeasureEvents: function () {
            this._map.on("click", this._startVector, this), this._map.on("contextmenu", this.deactivated, this)
        }, removeMeasureEvents: function () {
            this._map.off("click", this._startVector, this), this._map.off("click", this._addVertex, this), this._map.off("mousemove", this._updateVector, this), this._map.off("contextmenu", this.deactivated, this)
        }, _initWindow: function (t) {
            this._infoWindow = r.infoWindow({
                keepInView: !1,
                closeOnClick: !1,
                closeButton: !1,
                offset: [100, -10],
                autoPan: !1
            }).setUTMK(t).addTo(this._infoWindowGroup)
        }
    }), r.Control.Measure.Distance = r.Control.Measure.Overlay.extend({
        shapeOptions: {
            stroke: !0,
            color: "#6799FF",
            weight: 4,
            opacity: .7,
            fill: !1
        },
        guideOptions: {
            stroke: !0,
            color: "#6799FF",
            weight: 4,
            opacity: .3,
            fill: !1,
            renderer: r.canvas(),
            clickable: !1
        },
        controlName: "distanceControl",
        initialize: function (t) {
            r.Control.Measure.Overlay.prototype.initialize.call(this, t), this._polylineGroup = new r.LayerGroup, this._markersGroup = new r.LayerGroup, this._distanceGorup = []
        },
        _createUI: function (t) {
            return this.ui = {}, this.ui = r.DomUtil.create("div", "sop-distance-out", t), r.DomUtil.addClass(this.ui, "sop-control-background"), this.ui
        },
        activated: function () {
            this.setActivate(!0), this.initMeasureEvents(), this._switchOnButton()
        },
        deactivated: function (t) {
            this._polyline && this._polyline.getUTMKs().length > 0 && this._endVector(t), this.setActivate(!1), this.removeMeasureEvents(), this._switchOffButton()
        },
        initVector: function () {
            this._polyline = new r.Polyline([], this.shapeOptions), this._markers = new r.LayerGroup, this._polylineGroup.addLayer(this._polyline), this._markersGroup.addLayer(this._markers), this._map.addLayer(this._polylineGroup), this._map.addLayer(this._markersGroup), this._map.addLayer(this._infoWindowGroup)
        },
        onRemove: function () {
            this._polylineGroup.clearLayers(), this._markersGroup.clearLayers(), this._infoWindowGroup.clearLayers(), this._markers && this._markers.clearLayers()
        },
        _switchOnButton: function () {
            r.DomUtil.removeClass(this.ui, "sop-distance-out"), r.DomUtil.addClass(this.ui, "sop-distance-selected")
        },
        _switchOffButton: function () {
            r.DomUtil.removeClass(this.ui, "sop-distance-selected"), r.DomUtil.addClass(this.ui, "sop-distance-out")
        },
        _startVector: function (t) {
            this.initVector(), this._addStartMarker(t.utmk), this._addMarker(t.utmk), 2 === this._markers.getLayers().length && (this._polyline.addUTMK(this._mouseMarker.getUTMK()), this._map.off("click", this._startVector, this), this._map.on("mousemove", this._updateVector, this), this._distanceGorup = [], this._guideLine = new r.Polyline(this._polyline.getUTMKs(), this.guideOptions).addTo(this._map), this._guideLine.addUTMK(t.utmk), r.DomUtil.addClass(this._guideLine._renderer._container, "sop-clickable"), this._initWindow(t.utmk), this._infoWindow.setContent(this.setDistanceInfo(0)), this._infoWindow._container.onselectstart = function () {
                return !1
            }, this._infoWindow._container.onmousedown = function () {
                return !1
            }, this._infoWindow._tipContainer.style.display = "none")
        },
        _updateVector: function (t) {
            if (this._activated) {
                var i = this._polyline.getUTMKs(), e = i[i.length - 1];
                this._guideLine.setUTMKs([e, t.utmk]), this._guideLine.redraw(), this._guideLine.bringToFront(), this._realTimeDistance = e.distanceTo(t.utmk);
                for (var n = 0, o = 0; o < this._distanceGorup.length; o++)n += this._distanceGorup[o];
                n += this._realTimeDistance, this._infoWindow.setUTMK(t.utmk);
                var s = this.setDistanceInfo(n);
                s += '<div class="sop-measusre-distanceInfo">마우스 오른쪽 버튼을<br>누르면 마침&nbsp;', s += '<span class="sop-measure-bluemouse"></span></div>', this._infoWindow.setContent(s), this._map.on("click", this._addVertex, this), r.DomEvent.preventDefault(t.originalEvent)
            }
        },
        _addVertex: function (t) {
            this._activated && (this._polyline.addUTMK(t.utmk), this._addMarker(t.utmk, !0), this._polyline.bringToFront())
        },
        _endVector: function (t) {
            var i = this._guideLine.getUTMKs(), e = t.utmk ? t.utmk : i[i.length - 1];
            this._polyline.addUTMK(e), this._addMarker(e, !1), this._addCloseButton(e), this._guideLine.setUTMKs([]), this._polyline = null, r.DomUtil.removeClass(this._guideLine._renderer._container, "sop-clickable");
            for (var n = 0, o = 0; o < this._distanceGorup.length; o++)n += this._distanceGorup[o];
            this._infoWindow.setUTMK(e).setContent(this.setDistanceInfo(n))
        },
        _addStartMarker: function (t) {
            var i = r.divIcon({
                className: "sop-control-background sop-distance-start",
                iconAnchor: [0, 0],
                iconSize: [37, 21]
            });
            this._startMarker = r.marker(t, {icon: i}).addTo(this._markers)
        },
        _addMarker: function (t, i) {
            var e = r.divIcon({
                className: "sop-control-background sop-distance-icon",
                iconAnchor: [5, 5],
                iconSize: [11, 11]
            });
            this._mouseMarker = r.marker(t, {icon: e}), this._mouseMarker.addTo(this._markers), this._mouseMarker._bringToFront();
            var n = this._markers.getLayers()[this._markers.getLayers().length - 2].getUTMK(), o = n.distanceTo(t);
            this._distanceGorup.push(o);
            var s = 900 + this._markers.getLayers().length;
            this._mouseMarker._zIndex = s, this._mouseMarker._setPos = function (t) {
                r.DomUtil.setPosition(this._icon, t), this._shadow && r.DomUtil.setPosition(this._shadow, t)
            }, i && this._mouseMarker.setCaption({
                title: this._setMeterToKm(o),
                backgroundColor: "white",
                border: "2px solid",
                borderColor: "#1F51B7",
                zIndex: s
            })
        },
        _addCloseButton: function (t) {
            var i = r.divIcon({
                className: "sop-control-background sop-distance-delete",
                iconAnchor: [-10, 5],
                iconSize: [18, 17]
            }), e = r.marker(t, {icon: i, zIndexOffset: 1e3}).addTo(this._markers);
            e.on("click", function () {
                var t = this._markersGroup.getLayers();
                for (var i in t)t[i].hasLayer(e) && (this._markersGroup.removeLayer(t[i]), this._polylineGroup.removeLayer(this._polylineGroup.getLayers()[i]), this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[i]))
            }, this)
        },
        _setMeterToKm: function (t) {
            if (t > 1e3) {
                var i = t / 1e3;
                return '<font color = "red" > ' + Math.floor(i) + " </font > km"
            }
            return '<font color="red">' + Math.floor(t) + "</font> m"
        },
        _getTime: function (t, i) {
            var e = t / i, n = Math.floor(e / 60), o = Math.floor(e % 60), s = {m: o};
            return n > 0 && (s.h = n), s
        },
        _getTimeHtml: function (t, i) {
            var e = this._getTime(t, i), n = "";
            return e.h && (n = '<font color="red">' + e.h + "</font>시간 "), n += '<font color="red">' + e.m + "</font>분"
        },
        setDistanceInfo: function (t) {
            var i = this._setMeterToKm(t), e = '<table class="sop-measure-infoWindow">';
            return e += '<tr><td>총거리</td><td class="sop-masure-infoValue">' + i + "</td></tr>", e += "</table>"
        }
    }), r.Control.Measure.Area = r.Control.Measure.Overlay.extend({
        shapeOptions: {
            stroke: !0,
            weight: 4,
            opacity: .6,
            fill: !0,
            fillColor: null,
            fillOpacity: .3,
            color: "#F29661"
        }, controlName: "areaControl", initialize: function (t) {
            r.Control.Measure.Overlay.prototype.initialize.call(this, t), this._polygonGroup = new r.LayerGroup, this._markersGroup = new r.LayerGroup
        }, _createUI: function (t) {
            return this.ui = {}, this.ui = r.DomUtil.create("div", "sop-area-out", t), r.DomUtil.addClass(this.ui, "sop-control-background"), this.ui
        }, activated: function () {
            this.setActivate(!0), this.initMeasureEvents(), this._switchOnButton()
        }, deactivated: function (t) {
            this._polygon && this._polygon.getUTMKs().length > 0 && this._endVector(t), this.setActivate(!1), this.removeMeasureEvents(), this._switchOffButton()
        }, onRemove: function () {
            this._polygonGroup.clearLayers(), this._markersGroup.clearLayers(), this._infoWindowGroup.clearLayers(), this._markers && this._markers.clearLayers()
        }, initVector: function () {
            this._polygon = new r.Polygon([], this.shapeOptions), this._markers = new r.LayerGroup, this._polygonGroup.addLayer(this._polygon), this._markersGroup.addLayer(this._markers), this._map.addLayer(this._polygonGroup), this._map.addLayer(this._markersGroup), this._map.addLayer(this._infoWindowGroup)
        }, _switchOnButton: function () {
            r.DomUtil.removeClass(this.ui, "sop-area-out"), r.DomUtil.addClass(this.ui, "sop-area-selected")
        }, _switchOffButton: function () {
            r.DomUtil.removeClass(this.ui, "sop-area-selected"), r.DomUtil.addClass(this.ui, "sop-area-out")
        }, _startVector: function (t) {
            this.initVector(), this._activated && (this._addMarker(t.utmk), 1 === this._markers.getLayers().length && (this._polygon.addUTMK(this._mouseMarker.getUTMK()), this._map.off("click", this._startVector, this), this._map.on("mousemove", this._updateVector, this), this._initWindow(t.utmk), this._infoWindow._tipContainer.style.display = "none"))
        }, _updateVector: function (t) {
            if (this._activated) {
                var i = this._polygon.getUTMKs();
                if (i = r.Polyline._flat(i) ? i : i[0], i.length > 1) {
                    i.pop(), i.push(t.utmk), this._polygon.setUTMKs(i), this._polygon.bringToFront(), this._map.on("click", this._addVertex, this), this._infoWindow.setUTMK(t.utmk);
                    var e = '<div class="sop-measusre-areaInfo">마우스 오른쪽 버튼을<br>누르면 마침&nbsp;';
                    e += '<span class="sop-measure-orangeemouse"></span></div>', this._infoWindow.setContent(e)
                } else 1 === i.length && this._polygon.addUTMK(t.utmk)
            }
        }, _addVertex: function (t) {
            this._activated && (this._polygon.addUTMK(t.utmk), this._polygon.bringToFront(), this._polygon.redraw(), this._addMarker(t.utmk))
        }, _endVector: function (t) {
            var i = this._getArea(), e = this._polygon.getUTMKs(), n = t.utmk ? t.utmk : e[e.length - 1];
            this._polygon = null, this._infoWindow.setContent(this.setAreaInfo(i)), this._infoWindow._container.onselectstart = function () {
                return !1
            }, this._infoWindow._container.onmousedown = function () {
                return !1
            }, this._addMarker(n), this._addCloseButton(n)
        }, _addMarker: function (t) {
            var i = r.divIcon({
                className: "sop-control-background sop-area-icon",
                iconAnchor: [5, 5],
                iconSize: [11, 11]
            });
            this._mouseMarker = r.marker(t, {icon: i}).addTo(this._markers);
            var e = 900 + this._markers.getLayers().length;
            this._mouseMarker._zIndex = e, this._mouseMarker._bringToFront(), this._mouseMarker._setPos = function (t) {
                r.DomUtil.setPosition(this._icon, t), this._shadow && r.DomUtil.setPosition(this._shadow, t)
            }
        }, _addCloseButton: function (t) {
            var i = r.divIcon({
                className: "sop-control-background sop-area-delete",
                iconAnchor: [-10, 5],
                iconSize: [18, 17]
            }), e = r.marker(t, {icon: i}).addTo(this._markers);
            e._bringToFront(), e.on("click", function () {
                var t = this._markersGroup.getLayers();
                for (var i in t)t[i].hasLayer(e) && (this._markersGroup.removeLayer(t[i]), this._polygonGroup.removeLayer(this._polygonGroup.getLayers()[i]), this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[i]))
            }, this)
        }, _getArea: function () {
            var t = this._polygon.getUTMKs();
            if (t = r.Polyline._flat(t) ? t : t[0], t.length < 3)return 0;
            for (var i = t.length - 1, e = 0, n = 0; n < t.length; n++) {
                var o = t[i], s = t[n];
                e += (o.x + s.x) * (o.y - s.y), i = n
            }
            return e /= 2, 0 > e && (e = -e), e
        }, _getAreaTransformation: function (t) {
            var i;
            return t > 1e6 ? (t /= 1e6, i = "km²") : i = "m²", {value: t.toFixed(3), unit: i}
        }, _getAreaHtml: function (t) {
            return t ? '<font color="red">' + Math.floor(t.value) + "</font>" + t.unit : '<font color="red">0</font>m'
        }, setAreaInfo: function (t) {
            var i = this._getAreaTransformation(t), e = '<table class="sop-measure-infoWindow">';
            return e += '<tr><td>총면적</td><td class="sop-masure-infoValue">' + this._getAreaHtml(i) + "</td></tr>", e += "</table>"
        }
    }), r.Control.MeasureManager = r.Control.extend({
        options: {position: "topright"}, initialize: function (t) {
            r.Control.prototype.initialize.call(this, t)
        }, onAdd: function (t) {
            return this._map = t, this._ui = this._createMeasureUI(), t.whenReady(this._initUIEvents, this), this._ui.bar
        }, addControl: function (t) {
            this.controlGroup = this.controlGroup || {}, this.controlGroup[t.controlName] = t
        }, _createMeasureUI: function () {
            var t = {}, i = this.options.styleNS;
            t.bar = r.DomUtil.create("div", i + " sop-bar");
            for (var e in this.controlGroup)t[e] = this.controlGroup[e]._createUI(t.bar), r.DomEvent.on(t[e], "click", this._changeButtonStatus, this);
            return t.clear = r.DomUtil.create("div", "sop-clear-out", t.bar), r.DomUtil.addClass(t.clear, "sop-control-background"), r.DomEvent.disableClickPropagation(t.bar), t
        }, _initUIEvents: function () {
            r.DomEvent.on(this._ui.clear, "click", this._changeButtonStatus, this)
        }, _changeButtonStatus: function (t) {
            r.Browser.ielt9 ? this._eleTarget = t.srcElement : this._eleTarget = t.target;
            for (var i in this._ui)this._ui[i] === this._eleTarget && (this.selectedTarget = i);
            if (this.oldSelectedTarget === this.selectedTarget) {
                if ("clear" === this.selectedTarget)return;
                if (this.controlGroup[this.selectedTarget]._isActivated())return
            }
            for (var e in this.controlGroup)e === this.selectedTarget ? this.controlGroup[this.selectedTarget].activated() : this.controlGroup[e].deactivated(t), "clear" === this.selectedTarget && (this.oldSelectedTarget = null, this.controlGroup[e].onRemove());
            this.oldSelectedTarget = this.selectedTarget
        }
    }), r.Map.mergeOptions({measureControl: !0}), r.Map.addInitHook(function () {
        this.options.measureControl && (this.measureControl = new r.Control.MeasureManager, this.measureControl.addControl(new r.Control.Measure.Distance(this)), this.measureControl.addControl(new r.Control.Measure.Area(this)), this.addControl(this.measureControl))
    }), r.control.measureManager = function (t) {
        return new r.Control.MeasureManager(t)
    }, r.PosAnimation = r.Evented.extend({
        run: function (t, i, e, n) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = e || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = r.DomUtil.getPosition(t), this._offset = i.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
        }, stop: function () {
            this._inProgress && (this._step(!0), this._complete())
        }, _animate: function () {
            this._animId = r.Util.requestAnimFrame(this._animate, this), this._step()
        }, _step: function (t) {
            var i = +new Date - this._startTime, e = 1e3 * this._duration;
            e > i ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1), this._complete())
        }, _runFrame: function (t, i) {
            var e = this._startPos.add(this._offset.multiplyBy(t));
            i && e._round(), r.DomUtil.setPosition(this._el, e), this.fire("step")
        }, _complete: function () {
            r.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
        }, _easeOut: function (t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    }), r.Map.include({
        setView: function (t, i, n) {
            if (i = i === e ? this._zoom : this._limitZoom(i), t = this._limitCenter(r.utmk(t), i, this.options.maxBounds), n = n || {}, this._panAnim && this._panAnim.stop(), this._loaded && !n.reset && n !== !0) {
                n.animate !== e && (n.zoom = r.extend({animate: n.animate}, n.zoom), n.pan = r.extend({animate: n.animate}, n.pan));
                var o = this._zoom !== i ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, n.zoom) : this._tryAnimatedPan(t, n.pan);
                if (o)return clearTimeout(this._sizeTimer), this
            }
            return this._resetView(t, i), this
        }, panBy: function (t, i) {
            if (t = r.point(t).round(), i = i || {}, !t.x && !t.y)return this;
            if (i.animate !== !0 && !this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
            if (this._panAnim || (this._panAnim = new r.PosAnimation, this._panAnim.on({
                    step: this._onPanTransitionStep,
                    end: this._onPanTransitionEnd
                }, this)), i.noMoveStart || this.fire("movestart"), i.animate !== !1) {
                r.DomUtil.addClass(this._mapPane, "sop-pan-anim");
                var e = this._getMapPanePos().subtract(t);
                this._panAnim.run(this._mapPane, e, i.duration || .25, i.easeLinearity)
            } else this._rawPanBy(t), this.fire("move").fire("moveend");
            return this
        }, _onPanTransitionStep: function () {
            this.fire("move")
        }, _onPanTransitionEnd: function () {
            r.DomUtil.removeClass(this._mapPane, "sop-pan-anim"), this.fire("moveend")
        }, _tryAnimatedPan: function (t, i) {
            var e = this._getCenterOffset(t)._floor();
            return (i && i.animate) === !0 || this.getSize().contains(e) ? (this.panBy(e, i), (i && i.animate) !== !1) : !1
        }
    }), r.PosAnimation = r.DomUtil.TRANSITION ? r.PosAnimation : r.PosAnimation.extend({
            run: function (t, i, e, n) {
                this.stop(), this._el = t, this._inProgress = !0, this._duration = e || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = r.DomUtil.getPosition(t), this._offset = i.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
            }, stop: function () {
                this._inProgress && (this._step(), this._complete())
            }, _animate: function () {
                this._animId = r.Util.requestAnimFrame(this._animate, this), this._step()
            }, _step: function () {
                var t = +new Date - this._startTime, i = 1e3 * this._duration;
                i > t ? this._runFrame(this._easeOut(t / i)) : (this._runFrame(1), this._complete())
            }, _runFrame: function (t) {
                var i = this._startPos.add(this._offset.multiplyBy(t));
                r.DomUtil.setPosition(this._el, i), this.fire("step")
            }, _complete: function () {
                r.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
            }, _easeOut: function (t) {
                return 1 - Math.pow(1 - t, this._easeOutPower)
            }
        }), r.Map.mergeOptions({zoomAnimation: !0, zoomAnimationThreshold: 4});
    var l = r.DomUtil.TRANSITION && r.Browser.any3d && !r.Browser.mobileOpera;
    l && r.Map.addInitHook(function () {
        this._zoomAnimated = this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), r.DomEvent.on(this._proxy, r.DomUtil.TRANSITION_END, this._catchTransitionEnd, this))
    }), r.Map.include(l ? {
            _createAnimProxy: function () {
                var t = this._proxy = r.DomUtil.create("div", "sop-proxy sop-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function (i) {
                    var e = r.DomUtil.TRANSFORM, n = t.style[e];
                    r.DomUtil.setTransform(t, this.project(i.center, i.zoom), this.getZoomScale(i.zoom, 1)), n === t.style[e] && this._animatingZoom && this._onZoomTransitionEnd()
                }, this), this.on("load moveend", function () {
                    var i = this.getCenter(), e = this.getZoom();
                    r.DomUtil.setTransform(t, this.project(i, e), this.getZoomScale(e, 1))
                }, this)
            }, _catchTransitionEnd: function (t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
            }, _nothingToAnimate: function () {
                return !this._container.getElementsByClassName("sop-zoom-animated").length
            }, _tryAnimatedZoom: function (t, i, e) {
                if (this._animatingZoom)return !0;
                if (e = e || {}, !this._zoomAnimated || e.animate === !1 || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold)return !1;
                var n = this.getZoomScale(i), o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                return e.animate === !0 || this.getSize().contains(o) ? (r.Util.requestAnimFrame(function () {
                        this._moveStart(!0)._animateZoom(t, i, !0)
                    }, this), !0) : !1
            }, _animateZoom: function (t, i, e, n) {
                e && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = i, r.DomUtil.addClass(this._mapPane, "sop-zoom-anim")), this.fire("zoomanim", {
                    center: t,
                    zoom: i,
                    noUpdate: n
                })
            }, _onZoomTransitionEnd: function () {
                this._animatingZoom = !1, r.DomUtil.removeClass(this._mapPane, "sop-zoom-anim"), this._move(this._animateToCenter, this._animateToZoom)._moveEnd(!0)
            }
        } : {}), r.Caption = r.Class.extend({
        options: {riseOffset: 2}, initialize: function (t, i, e) {
            this._pos = i, this._layer = t, this._setCaption(e)
        }, getCaptionPosition: function () {
            return this._pos
        }, _getCaption: function () {
            return this._caption.title
        }, _setCaption: function (t) {
            if (!t)throw new Error("CaptionOption not found.");
            if (!t.title)throw new Error("Title is undefined");
            this._caption = t, this._updateCaption()
        }, _updateCaption: function () {
            if (this._caption) {
                this._captionDiv || (this._captionDiv = r.DomUtil.create("div", "sop-caption sop-zoom-animated", this._layer.getPane()), this._captionspan = r.DomUtil.create("span", "sop-caption-span", this._captionDiv)), this._captionspan.innerHTML = this._caption.title, this._captionspan.style.backgroundColor = this._caption.backgroundColor || "", this._captionspan.style.color = this._caption.color || "#000000", this._captionspan.style.fontSize = this._caption.size || 9, this._captionspan.style.border = this._caption.border || "0px", this._captionspan.style.borderColor = this._caption.borderColor || "#000000", this._captionspan.showAllZoomLevel = this._caption.showAllZoomLevel || !1, this._captionspan.onselectstart = function () {
                    return !1
                }, this._captionspan.onmousedown = function () {
                    return !1
                };
                var t, i = r.point(0, 0);
                i.x = this._captionspan.offsetWidth / 2, i.y = this._captionspan.offsetHeight / 2, t = this._layer._map.utmkToLayerPoint(this._pos), t = t.subtract(i), r.DomUtil.setPosition(this._captionDiv, t), this._caption.zIndex || (this._caption.zIndex = this.options.riseOffset), this._updateZIndex(this._caption.zIndex)
            } else this.removeCaption()
        }, _updateCaptionPos: function (t, i) {
            var e, n = r.point(0, 0);
            this._caption && (i ? (e = this._layer._map._utmkToNewLayerPoint(t, i.zoom, i.center).round(), n.x = this._captionspan.offsetWidth / 2, n.y = this._captionspan.offsetHeight / 2, e = e.subtract(n), r.DomUtil.setPosition(this._captionDiv, e)) : (e = this._layer._map.utmkToLayerPoint(t), n.x = this._captionspan.offsetWidth / 2, n.y = this._captionspan.offsetHeight / 2, e = e.subtract(n), r.DomUtil.setPosition(this._captionDiv, e)))
        }, _removeCaption: function () {
            this._captionDiv && r.DomUtil.remove(this._captionDiv), this._captionDiv = null, this._caption = null
        }, _updateZIndex: function (t) {
            this._captionDiv.style.zIndex = t
        }
    }), function (t, i) {
        "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? module.exports = i() : t.returnExports = i()
    }(this, function () {
        function t(t) {
            return t = +t, t !== t ? t = 0 : 0 !== t && t !== 1 / 0 && t !== -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))), t
        }

        function i(t) {
            var i = typeof t;
            return null === t || "undefined" === i || "boolean" === i || "number" === i || "string" === i
        }

        function e(t) {
            var e, n, o;
            if (i(t))return t;
            if (n = t.valueOf, f(n) && (e = n.call(t), i(e)))return e;
            if (o = t.toString, f(o) && (e = o.call(t), i(e)))return e;
            throw new TypeError
        }

        function n() {
        }

        var o, s = Array.prototype, r = Object.prototype, a = Function.prototype, h = String.prototype, u = Number.prototype, l = s.slice, c = s.splice, d = (s.push, s.unshift), m = a.call, p = r.toString, f = function (t) {
            return "[object Function]" === r.toString.call(t)
        }, _ = function (t) {
            return "[object RegExp]" === r.toString.call(t)
        }, v = function (t) {
            return "[object Array]" === p.call(t)
        }, g = function (t) {
            return "[object String]" === p.call(t)
        }, y = function (t) {
            var i = p.call(t), e = "[object Arguments]" === i;
            return e || (e = !v(t) && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && f(t.callee)), e
        }, M = Object.defineProperty && function () {
                try {
                    return Object.defineProperty({}, "x", {}), !0
                } catch (t) {
                    return !1
                }
            }();
        o = M ? function (t, i, e, n) {
                !n && i in t || Object.defineProperty(t, i, {configurable: !0, enumerable: !1, writable: !0, value: e})
            } : function (t, i, e, n) {
                !n && i in t || (t[i] = e)
            };
        var x = function (t, i, e) {
            for (var n in i)r.hasOwnProperty.call(i, n) && o(t, n, i[n], e)
        }, b = function (t) {
            if (null == t)throw new TypeError("can't convert " + t + " to object");
            return Object(t)
        }, w = function (t) {
            return t >>> 0
        };
        x(a, {
            bind: function (t) {
                var i = this;
                if (!f(i))throw new TypeError("Function.prototype.bind called on incompatible " + i);
                for (var e = l.call(arguments, 1), o = function () {
                    if (this instanceof h) {
                        var n = i.apply(this, e.concat(l.call(arguments)));
                        return Object(n) === n ? n : this
                    }
                    return i.apply(t, e.concat(l.call(arguments)))
                }, s = Math.max(0, i.length - e.length), r = [], a = 0; s > a; a++)r.push("$" + a);
                var h = Function("binder", "return function (" + r.join(",") + "){return binder.apply(this,arguments)}")(o);
                return i.prototype && (n.prototype = i.prototype, h.prototype = new n, n.prototype = null), h
            }
        });
        var T, P, C, k, S, U = m.bind(r.hasOwnProperty);
        (S = U(r, "__defineGetter__")) && (T = m.bind(r.__defineGetter__), P = m.bind(r.__defineSetter__), C = m.bind(r.__lookupGetter__), k = m.bind(r.__lookupSetter__));
        var E = function () {
            var t = [1, 2], i = t.splice();
            return 2 === t.length && v(i) && 0 === i.length
        }();
        x(s, {
            splice: function (t, i) {
                return 0 === arguments.length ? [] : c.apply(this, arguments)
            }
        }, E);
        var L = function () {
            var t = {};
            return s.splice.call(t, 0, 0, 1), 1 === t.length
        }();
        x(s, {
            splice: function (i, e) {
                if (0 === arguments.length)return [];
                var n = arguments;
                return this.length = Math.max(t(this.length), 0), arguments.length > 0 && "number" != typeof e && (n = l.call(arguments), n.length < 2 ? n.push(this.length - i) : n[1] = t(e)), c.apply(this, n)
            }
        }, !L);
        var D = 1 !== [].unshift(0);
        x(s, {
            unshift: function () {
                return d.apply(this, arguments), this.length
            }
        }, D), x(Array, {isArray: v});
        var O = Object("a"), z = "a" !== O[0] || !(0 in O), I = function (t) {
            var i = !0, e = !0;
            return t && (t.call("foo", function (t, e, n) {
                "object" != typeof n && (i = !1)
            }), t.call([1], function () {
                "use strict";
                e = "string" == typeof this
            }, "x")), !!t && i && e
        };
        x(s, {
            forEach: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = arguments[1], o = -1, s = e.length >>> 0;
                if (!f(t))throw new TypeError;
                for (; ++o < s;)o in e && t.call(n, e[o], o, i)
            }
        }, !I(s.forEach)), x(s, {
            map: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = e.length >>> 0, o = Array(n), s = arguments[1];
                if (!f(t))throw new TypeError(t + " is not a function");
                for (var r = 0; n > r; r++)r in e && (o[r] = t.call(s, e[r], r, i));
                return o
            }
        }, !I(s.map)), x(s, {
            filter: function (t) {
                var i, e = b(this), n = z && g(this) ? this.split("") : e, o = n.length >>> 0, s = [], r = arguments[1];
                if (!f(t))throw new TypeError(t + " is not a function");
                for (var a = 0; o > a; a++)a in n && (i = n[a], t.call(r, i, a, e) && s.push(i));
                return s
            }
        }, !I(s.filter)), x(s, {
            every: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = e.length >>> 0, o = arguments[1];
                if (!f(t))throw new TypeError(t + " is not a function");
                for (var s = 0; n > s; s++)if (s in e && !t.call(o, e[s], s, i))return !1;
                return !0
            }
        }, !I(s.every)), x(s, {
            some: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = e.length >>> 0, o = arguments[1];
                if (!f(t))throw new TypeError(t + " is not a function");
                for (var s = 0; n > s; s++)if (s in e && t.call(o, e[s], s, i))return !0;
                return !1
            }
        }, !I(s.some));
        var A = !1;
        s.reduce && (A = "object" == typeof s.reduce.call("es5", function (t, i, e, n) {
                return n
            })), x(s, {
            reduce: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = e.length >>> 0;
                if (!f(t))throw new TypeError(t + " is not a function");
                if (!n && 1 === arguments.length)throw new TypeError("reduce of empty array with no initial value");
                var o, s = 0;
                if (arguments.length >= 2) o = arguments[1]; else for (; ;) {
                    if (s in e) {
                        o = e[s++];
                        break
                    }
                    if (++s >= n)throw new TypeError("reduce of empty array with no initial value")
                }
                for (; n > s; s++)s in e && (o = t.call(void 0, o, e[s], s, i));
                return o
            }
        }, !A);
        var B = !1;
        s.reduceRight && (B = "object" == typeof s.reduceRight.call("es5", function (t, i, e, n) {
                return n
            })), x(s, {
            reduceRight: function (t) {
                var i = b(this), e = z && g(this) ? this.split("") : i, n = e.length >>> 0;
                if (!f(t))throw new TypeError(t + " is not a function");
                if (!n && 1 === arguments.length)throw new TypeError("reduceRight of empty array with no initial value");
                var o, s = n - 1;
                if (arguments.length >= 2) o = arguments[1]; else for (; ;) {
                    if (s in e) {
                        o = e[s--];
                        break
                    }
                    if (--s < 0)throw new TypeError("reduceRight of empty array with no initial value")
                }
                if (0 > s)return o;
                do s in e && (o = t.call(void 0, o, e[s], s, i)); while (s--);
                return o
            }
        }, !B);
        var j = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
        x(s, {
            indexOf: function (i) {
                var e = z && g(this) ? this.split("") : b(this), n = e.length >>> 0;
                if (!n)return -1;
                var o = 0;
                for (arguments.length > 1 && (o = t(arguments[1])), o = o >= 0 ? o : Math.max(0, n + o); n > o; o++)if (o in e && e[o] === i)return o;
                return -1
            }
        }, j);
        var N = Array.prototype.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
        x(s, {
            lastIndexOf: function (i) {
                var e = z && g(this) ? this.split("") : b(this), n = e.length >>> 0;
                if (!n)return -1;
                var o = n - 1;
                for (arguments.length > 1 && (o = Math.min(o, t(arguments[1]))), o = o >= 0 ? o : n - Math.abs(o); o >= 0; o--)if (o in e && i === e[o])return o;
                return -1
            }
        }, N);
        var Z = !{toString: null}.propertyIsEnumerable("toString"), G = function () {
        }.propertyIsEnumerable("prototype"), R = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], F = R.length;
        x(Object, {
            keys: function (t) {
                var i = f(t), e = y(t), n = null !== t && "object" == typeof t, o = n && g(t);
                if (!n && !i && !e)throw new TypeError("Object.keys called on a non-object");
                var s = [], r = G && i;
                if (o || e)for (var a = 0; a < t.length; ++a)s.push(String(a)); else for (var h in t)r && "prototype" === h || !U(t, h) || s.push(String(h));
                if (Z)for (var u = t.constructor, l = u && u.prototype === t, c = 0; F > c; c++) {
                    var d = R[c];
                    l && "constructor" === d || !U(t, d) || s.push(d)
                }
                return s
            }
        });
        var K = Object.keys && function () {
                return 2 === Object.keys(arguments).length
            }(1, 2), W = Object.keys;
        x(Object, {
            keys: function (t) {
                return W(y(t) ? s.slice.call(t) : t)
            }
        }, !K);
        var q = -621987552e5, H = "-000001", V = Date.prototype.toISOString && -1 === new Date(q).toISOString().indexOf(H);
        x(Date.prototype, {
            toISOString: function () {
                var t, i, e, n, o;
                if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                for (n = this.getUTCFullYear(), o = this.getUTCMonth(), n += Math.floor(o / 12), o = (o % 12 + 12) % 12, t = [o + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], n = (0 > n ? "-" : n > 9999 ? "+" : "") + ("00000" + Math.abs(n)).slice(n >= 0 && 9999 >= n ? -4 : -6), i = t.length; i--;)e = t[i], 10 > e && (t[i] = "0" + e);
                return n + "-" + t.slice(0, 2).join("-") + "T" + t.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
            }
        }, V);
        var J = !1;
        try {
            J = Date.prototype.toJSON && null === new Date(NaN).toJSON() && -1 !== new Date(q).toJSON().indexOf(H) && Date.prototype.toJSON.call({
                    toISOString: function () {
                        return !0
                    }
                })
        } catch (X) {
        }
        J || (Date.prototype.toJSON = function (t) {
            var i, n = Object(this), o = e(n);
            if ("number" == typeof o && !isFinite(o))return null;
            if (i = n.toISOString, "function" != typeof i)throw new TypeError("toISOString property is not callable");
            return i.call(n)
        });
        var Y = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"), Q = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")), $ = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
        (!Date.parse || $ || Q || !Y) && (Date = function (t) {
            function i(e, n, o, s, r, a, h) {
                var u = arguments.length;
                if (this instanceof t) {
                    var l = 1 === u && String(e) === e ? new t(i.parse(e)) : u >= 7 ? new t(e, n, o, s, r, a, h) : u >= 6 ? new t(e, n, o, s, r, a) : u >= 5 ? new t(e, n, o, s, r) : u >= 4 ? new t(e, n, o, s) : u >= 3 ? new t(e, n, o) : u >= 2 ? new t(e, n) : u >= 1 ? new t(e) : new t;
                    return l.constructor = i, l
                }
                return t.apply(this, arguments)
            }

            function e(t, i) {
                var e = i > 1 ? 1 : 0;
                return s[i] + Math.floor((t - 1969 + e) / 4) - Math.floor((t - 1901 + e) / 100) + Math.floor((t - 1601 + e) / 400) + 365 * (t - 1970)
            }

            function n(i) {
                return Number(new t(1970, 0, 1, 0, 0, 0, i))
            }

            var o = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), s = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            for (var r in t)i[r] = t[r];
            return i.now = t.now, i.UTC = t.UTC, i.prototype = t.prototype, i.prototype.constructor = i, i.parse = function a(i) {
                var s = o.exec(i);
                if (s) {
                    var r, h = Number(s[1]), a = Number(s[2] || 1) - 1, u = Number(s[3] || 1) - 1, l = Number(s[4] || 0), c = Number(s[5] || 0), d = Number(s[6] || 0), m = Math.floor(1e3 * Number(s[7] || 0)), p = Boolean(s[4] && !s[8]), f = "-" === s[9] ? 1 : -1, _ = Number(s[10] || 0), v = Number(s[11] || 0);
                    return (c > 0 || d > 0 || m > 0 ? 24 : 25) > l && 60 > c && 60 > d && 1e3 > m && a > -1 && 12 > a && 24 > _ && 60 > v && u > -1 && u < e(h, a + 1) - e(h, a) && (r = 60 * (24 * (e(h, a) + u) + l + _ * f), r = 1e3 * (60 * (r + c + v * f) + d) + m, p && (r = n(r)), r >= -864e13 && 864e13 >= r) ? r : NaN
                }
                return t.parse.apply(this, arguments)
            }, i
        }(Date)), Date.now || (Date.now = function () {
            return (new Date).getTime()
        });
        var tt = u.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)), it = {
            base: 1e7,
            size: 6,
            data: [0, 0, 0, 0, 0, 0],
            multiply: function (t, i) {
                for (var e = -1; ++e < it.size;)i += t * it.data[e], it.data[e] = i % it.base, i = Math.floor(i / it.base)
            },
            divide: function (t) {
                for (var i = it.size, e = 0; --i >= 0;)e += it.data[i], it.data[i] = Math.floor(e / t), e = e % t * it.base
            },
            numToString: function () {
                for (var t = it.size, i = ""; --t >= 0;)if ("" !== i || 0 === t || 0 !== it.data[t]) {
                    var e = String(it.data[t]);
                    "" === i ? i = e : i += "0000000".slice(0, 7 - e.length) + e
                }
                return i
            },
            pow: function mt(t, i, e) {
                return 0 === i ? e : i % 2 === 1 ? mt(t, i - 1, e * t) : mt(t * t, i / 2, e)
            },
            log: function (t) {
                for (var i = 0; t >= 4096;)i += 12, t /= 4096;
                for (; t >= 2;)i += 1, t /= 2;
                return i
            }
        };
        x(u, {
            toFixed: function (t) {
                var i, e, n, o, s, r, a, h;
                if (i = Number(t), i = i !== i ? 0 : Math.floor(i), 0 > i || i > 20)throw new RangeError("Number.toFixed called with invalid number of decimals");
                if (e = Number(this), e !== e)return "NaN";
                if (-1e21 >= e || e >= 1e21)return String(e);
                if (n = "", 0 > e && (n = "-", e = -e), o = "0", e > 1e-21)if (s = it.log(e * it.pow(2, 69, 1)) - 69, r = 0 > s ? e * it.pow(2, -s, 1) : e / it.pow(2, s, 1), r *= 4503599627370496, s = 52 - s, s > 0) {
                    for (it.multiply(0, r), a = i; a >= 7;)it.multiply(1e7, 0), a -= 7;
                    for (it.multiply(it.pow(10, a, 1), 0), a = s - 1; a >= 23;)it.divide(1 << 23), a -= 23;
                    it.divide(1 << a), it.multiply(1, 1), it.divide(2), o = it.numToString()
                } else it.multiply(0, r), it.multiply(1 << -s, 0), o = it.numToString() + "0.00000000000000000000".slice(2, 2 + i);
                return i > 0 ? (h = o.length, o = i >= h ? n + "0.0000000000000000000".slice(0, i - h + 2) + o : n + o.slice(0, h - i) + "." + o.slice(h - i)) : o = n + o, o
            }
        }, tt);
        var et = h.split;
        2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
                var t = void 0 === /()??/.exec("")[1];
                h.split = function (i, e) {
                    var n = this;
                    if (void 0 === i && 0 === e)return [];
                    if ("[object RegExp]" !== p.call(i))return et.call(this, i, e);
                    var o, r, a, h, u = [], l = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : ""), c = 0;
                    for (i = new RegExp(i.source, l + "g"), n += "", t || (o = new RegExp("^" + i.source + "$(?!\\s)", l)), e = void 0 === e ? -1 >>> 0 : w(e); (r = i.exec(n)) && (a = r.index + r[0].length, !(a > c && (u.push(n.slice(c, r.index)), !t && r.length > 1 && r[0].replace(o, function () {
                        for (var t = 1; t < arguments.length - 2; t++)void 0 === arguments[t] && (r[t] = void 0)
                    }), r.length > 1 && r.index < n.length && s.push.apply(u, r.slice(1)), h = r[0].length, c = a, u.length >= e)));)i.lastIndex === r.index && i.lastIndex++;
                    return c === n.length ? (h || !i.test("")) && u.push("") : u.push(n.slice(c)), u.length > e ? u.slice(0, e) : u
                }
            }() : "0".split(void 0, 0).length && (h.split = function (t, i) {
                return void 0 === t && 0 === i ? [] : et.call(this, t, i)
            });
        var nt = h.replace, ot = function () {
            var t = [];
            return "x".replace(/x(.)?/g, function (i, e) {
                t.push(e)
            }), 1 === t.length && "undefined" == typeof t[0]
        }();
        ot || (h.replace = function (t, i) {
            var e = f(i), n = _(t) && /\)[*?]/.test(t.source);
            if (e && n) {
                var o = function (e) {
                    var n = arguments.length, o = t.lastIndex;
                    t.lastIndex = 0;
                    var s = t.exec(e);
                    return t.lastIndex = o, s.push(arguments[n - 2], arguments[n - 1]), i.apply(this, s)
                };
                return nt.call(this, t, o)
            }
            return nt.call(this, t, i)
        });
        var st = h.substr, rt = "".substr && "b" !== "0b".substr(-1);
        x(h, {
            substr: function (t, i) {
                return st.call(this, 0 > t && (t = this.length + t) < 0 ? 0 : t, i)
            }
        }, rt);
        var at = "	\n\f\r   ᠎             　\u2028\u2029\ufeff", ht = "​", ut = "[" + at + "]", lt = new RegExp("^" + ut + ut + "*"), ct = new RegExp(ut + ut + "*$"), dt = h.trim && (at.trim() || !ht.trim());
        x(h, {
            trim: function () {
                if (void 0 === this || null === this)throw new TypeError("can't convert " + this + " to object");
                return String(this).replace(lt, "").replace(ct, "")
            }
        }, dt), (8 !== parseInt(at + "08") || 22 !== parseInt(at + "0x16")) && (parseInt = function (t) {
            var i = /^0[xX]/;
            return function (e, n) {
                return e = String(e).trim(), Number(n) || (n = i.test(e) ? 16 : 10), t(e, n)
            }
        }(parseInt))
    }), !function (i) {
        if ("object" == typeof exports) module.exports = i(); else if ("function" == typeof define && define.amd) define(i); else {
            var e;
            "undefined" != typeof t ? e = t : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.proj4 = i()
        }
    }(function () {
        return function t(i, e, n) {
            function o(r, a) {
                if (!e[r]) {
                    if (!i[r]) {
                        var h = "function" == typeof require && require;
                        if (!a && h)return h(r, !0);
                        if (s)return s(r, !0);
                        throw new Error("Cannot find module '" + r + "'")
                    }
                    var u = e[r] = {exports: {}};
                    i[r][0].call(u.exports, function (t) {
                        var e = i[r][1][t];
                        return o(e ? e : t)
                    }, u, u.exports, t, i, e, n)
                }
                return e[r].exports
            }

            for (var s = "function" == typeof require && require, r = 0; r < n.length; r++)o(n[r]);
            return o
        }({
            1: [function (t, i, e) {
                function n(t, i, e) {
                    if (!(this instanceof n))return new n(t, i, e);
                    if (Array.isArray(t)) this.x = t[0], this.y = t[1], this.z = t[2] || 0; else if ("object" == typeof t) this.x = t.x, this.y = t.y, this.z = t.z || 0; else if ("string" == typeof t && "undefined" == typeof i) {
                        var o = t.split(",");
                        this.x = parseFloat(o[0], 10), this.y = parseFloat(o[1], 10), this.z = parseFloat(o[2], 10) || 0
                    } else this.x = t, this.y = i, this.z = e || 0;
                    console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
                }

                var o = t("mgrs");
                n.fromMGRS = function (t) {
                    return new n(o.toPoint(t))
                }, n.prototype.toMGRS = function (t) {
                    return o.forward([this.x, this.y], t)
                }, i.exports = n
            }, {mgrs: 66}],
            2: [function (t, i, e) {
                function n(t, i) {
                    if (!(this instanceof n))return new n(t);
                    i = i || function (t) {
                            if (t)throw t
                        };
                    var e = o(t);
                    if ("object" != typeof e)return void i(t);
                    var r = a(e), h = n.projections.get(r.projName);
                    h ? (s(this, r), s(this, h), this.init(), i(null, this)) : i(t)
                }

                var o = t("./parseCode"), s = t("./extend"), r = t("./projections"), a = t("./deriveConstants");
                n.projections = r, n.projections.start(), i.exports = n
            }, {"./deriveConstants": 32, "./extend": 33, "./parseCode": 36, "./projections": 38}],
            3: [function (t, i, n) {
                i.exports = function (t, i, n) {
                    var o, s, r, a = n.x, h = n.y, u = n.z || 0;
                    for (r = 0; 3 > r; r++)if (!i || 2 !== r || n.z !== e)switch (0 === r ? (o = a, s = "x") : 1 === r ? (o = h, s = "y") : (o = u, s = "z"), t.axis[r]) {
                        case"e":
                            n[s] = o;
                            break;
                        case"w":
                            n[s] = -o;
                            break;
                        case"n":
                            n[s] = o;
                            break;
                        case"s":
                            n[s] = -o;
                            break;
                        case"u":
                            n[s] !== e && (n.z = o);
                            break;
                        case"d":
                            n[s] !== e && (n.z = -o);
                            break;
                        default:
                            return null
                    }
                    return n
                }
            }, {}],
            4: [function (t, i, e) {
                var n = Math.PI / 2, o = t("./sign");
                i.exports = function (t) {
                    return Math.abs(t) < n ? t : t - o(t) * Math.PI
                }
            }, {"./sign": 21}],
            5: [function (t, i, e) {
                var n = 2 * Math.PI, o = t("./sign");
                i.exports = function (t) {
                    return Math.abs(t) < Math.PI ? t : t - o(t) * n
                }
            }, {"./sign": 21}],
            6: [function (t, i, e) {
                i.exports = function (t) {
                    return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t)
                }
            }, {}],
            7: [function (t, i, e) {
                i.exports = function (t) {
                    return 1 - .25 * t * (1 + t / 16 * (3 + 1.25 * t))
                }
            }, {}],
            8: [function (t, i, e) {
                i.exports = function (t) {
                    return .375 * t * (1 + .25 * t * (1 + .46875 * t))
                }
            }, {}],
            9: [function (t, i, e) {
                i.exports = function (t) {
                    return .05859375 * t * t * (1 + .75 * t)
                }
            }, {}],
            10: [function (t, i, e) {
                i.exports = function (t) {
                    return t * t * t * (35 / 3072)
                }
            }, {}],
            11: [function (t, i, e) {
                i.exports = function (t, i, e) {
                    var n = i * e;
                    return t / Math.sqrt(1 - n * n)
                }
            }, {}],
            12: [function (t, i, e) {
                i.exports = function (t, i, e, n, o) {
                    var s, r;
                    s = t / i;
                    for (var a = 0; 15 > a; a++)if (r = (t - (i * s - e * Math.sin(2 * s) + n * Math.sin(4 * s) - o * Math.sin(6 * s))) / (i - 2 * e * Math.cos(2 * s) + 4 * n * Math.cos(4 * s) - 6 * o * Math.cos(6 * s)), s += r, Math.abs(r) <= 1e-10)return s;
                    return NaN
                }
            }, {}],
            13: [function (t, i, e) {
                var n = Math.PI / 2;
                i.exports = function (t, i) {
                    var e = 1 - (1 - t * t) / (2 * t) * Math.log((1 - t) / (1 + t));
                    if (Math.abs(Math.abs(i) - e) < 1e-6)return 0 > i ? -1 * n : n;
                    for (var o, s, r, a, h = Math.asin(.5 * i), u = 0; 30 > u; u++)if (s = Math.sin(h), r = Math.cos(h), a = t * s, o = Math.pow(1 - a * a, 2) / (2 * r) * (i / (1 - t * t) - s / (1 - a * a) + .5 / t * Math.log((1 - a) / (1 + a))), h += o, Math.abs(o) <= 1e-10)return h;
                    return NaN
                }
            }, {}],
            14: [function (t, i, e) {
                i.exports = function (t, i, e, n, o) {
                    return t * o - i * Math.sin(2 * o) + e * Math.sin(4 * o) - n * Math.sin(6 * o)
                }
            }, {}],
            15: [function (t, i, e) {
                i.exports = function (t, i, e) {
                    var n = t * i;
                    return e / Math.sqrt(1 - n * n)
                }
            }, {}],
            16: [function (t, i, e) {
                var n = Math.PI / 2;
                i.exports = function (t, i) {
                    for (var e, o, s = .5 * t, r = n - 2 * Math.atan(i), a = 0; 15 >= a; a++)if (e = t * Math.sin(r), o = n - 2 * Math.atan(i * Math.pow((1 - e) / (1 + e), s)) - r, r += o, Math.abs(o) <= 1e-10)return r;
                    return -9999
                }
            }, {}],
            17: [function (t, i, e) {
                var n = 1, o = .25, s = .046875, r = .01953125, a = .01068115234375, h = .75, u = .46875, l = .013020833333333334, c = .007120768229166667, d = .3645833333333333, m = .005696614583333333, p = .3076171875;
                i.exports = function (t) {
                    var i = [];
                    i[0] = n - t * (o + t * (s + t * (r + t * a))), i[1] = t * (h - t * (s + t * (r + t * a)));
                    var e = t * t;
                    return i[2] = e * (u - t * (l + t * c)), e *= t, i[3] = e * (d - t * m), i[4] = e * t * p, i
                }
            }, {}],
            18: [function (t, i, e) {
                var n = t("./pj_mlfn"), o = 1e-10, s = 20;
                i.exports = function (t, i, e) {
                    for (var r = 1 / (1 - i), a = t, h = s; h; --h) {
                        var u = Math.sin(a), l = 1 - i * u * u;
                        if (l = (n(a, u, Math.cos(a), e) - t) * (l * Math.sqrt(l)) * r, a -= l, Math.abs(l) < o)return a
                    }
                    return a
                }
            }, {"./pj_mlfn": 19}],
            19: [function (t, i, e) {
                i.exports = function (t, i, e, n) {
                    return e *= i, i *= i, n[0] * t - e * (n[1] + i * (n[2] + i * (n[3] + i * n[4])))
                }
            }, {}],
            20: [function (t, i, e) {
                i.exports = function (t, i) {
                    var e;
                    return t > 1e-7 ? (e = t * i, (1 - t * t) * (i / (1 - e * e) - .5 / t * Math.log((1 - e) / (1 + e)))) : 2 * i
                }
            }, {}],
            21: [function (t, i, e) {
                i.exports = function (t) {
                    return 0 > t ? -1 : 1
                }
            }, {}],
            22: [function (t, i, e) {
                i.exports = function (t, i) {
                    return Math.pow((1 - t) / (1 + t), i)
                }
            }, {}],
            23: [function (t, i, e) {
                i.exports = function (t) {
                    var i = {x: t[0], y: t[1]};
                    return t.length > 2 && (i.z = t[2]), t.length > 3 && (i.m = t[3]), i
                }
            }, {}],
            24: [function (t, i, e) {
                var n = Math.PI / 2;
                i.exports = function (t, i, e) {
                    var o = t * e, s = .5 * t;
                    return o = Math.pow((1 - o) / (1 + o), s), Math.tan(.5 * (n - i)) / o
                }
            }, {}],
            25: [function (t, i, e) {
                e.wgs84 = {
                    towgs84: "0,0,0",
                    ellipse: "WGS84",
                    datumName: "WGS84"
                }, e.ch1903 = {
                    towgs84: "674.374,15.056,405.346",
                    ellipse: "bessel",
                    datumName: "swiss"
                }, e.ggrs87 = {
                    towgs84: "-199.87,74.79,246.62",
                    ellipse: "GRS80",
                    datumName: "Greek_Geodetic_Reference_System_1987"
                }, e.nad83 = {
                    towgs84: "0,0,0",
                    ellipse: "GRS80",
                    datumName: "North_American_Datum_1983"
                }, e.nad27 = {
                    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
                    ellipse: "clrk66",
                    datumName: "North_American_Datum_1927"
                }, e.potsdam = {
                    towgs84: "606.0,23.0,413.0",
                    ellipse: "bessel",
                    datumName: "Potsdam Rauenberg 1950 DHDN"
                }, e.carthage = {
                    towgs84: "-263.0,6.0,431.0",
                    ellipse: "clark80",
                    datumName: "Carthage 1934 Tunisia"
                }, e.hermannskogel = {
                    towgs84: "653.0,-212.0,449.0",
                    ellipse: "bessel",
                    datumName: "Hermannskogel"
                }, e.ire65 = {
                    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
                    ellipse: "mod_airy",
                    datumName: "Ireland 1965"
                }, e.rassadiran = {
                    towgs84: "-133.63,-157.5,-158.62",
                    ellipse: "intl",
                    datumName: "Rassadiran"
                }, e.nzgd49 = {
                    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
                    ellipse: "intl",
                    datumName: "New Zealand Geodetic Datum 1949"
                }, e.osgb36 = {
                    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
                    ellipse: "airy",
                    datumName: "Airy 1830"
                }, e.s_jtsk = {
                    towgs84: "589,76,480",
                    ellipse: "bessel",
                    datumName: "S-JTSK (Ferro)"
                }, e.beduaram = {
                    towgs84: "-106,-87,188",
                    ellipse: "clrk80",
                    datumName: "Beduaram"
                }, e.gunung_segara = {
                    towgs84: "-403,684,41",
                    ellipse: "bessel",
                    datumName: "Gunung Segara Jakarta"
                }, e.rnb72 = {
                    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
                    ellipse: "intl",
                    datumName: "Reseau National Belge 1972"
                }
            }, {}],
            26: [function (t, i, e) {
                e.MERIT = {a: 6378137, rf: 298.257, ellipseName: "MERIT 1983"}, e.SGS85 = {
                    a: 6378136,
                    rf: 298.257,
                    ellipseName: "Soviet Geodetic System 85"
                }, e.GRS80 = {
                    a: 6378137,
                    rf: 298.257222101,
                    ellipseName: "GRS 1980(IUGG, 1980)"
                }, e.IAU76 = {a: 6378140, rf: 298.257, ellipseName: "IAU 1976"}, e.airy = {
                    a: 6377563.396,
                    b: 6356256.91,
                    ellipseName: "Airy 1830"
                }, e.APL4 = {a: 6378137, rf: 298.25, ellipseName: "Appl. Physics. 1965"}, e.NWL9D = {
                    a: 6378145,
                    rf: 298.25,
                    ellipseName: "Naval Weapons Lab., 1965"
                }, e.mod_airy = {
                    a: 6377340.189,
                    b: 6356034.446,
                    ellipseName: "Modified Airy"
                }, e.andrae = {
                    a: 6377104.43,
                    rf: 300,
                    ellipseName: "Andrae 1876 (Den., Iclnd.)"
                }, e.aust_SA = {
                    a: 6378160,
                    rf: 298.25,
                    ellipseName: "Australian Natl & S. Amer. 1969"
                }, e.GRS67 = {
                    a: 6378160,
                    rf: 298.247167427,
                    ellipseName: "GRS 67(IUGG 1967)"
                }, e.bessel = {
                    a: 6377397.155,
                    rf: 299.1528128,
                    ellipseName: "Bessel 1841"
                }, e.bess_nam = {
                    a: 6377483.865,
                    rf: 299.1528128,
                    ellipseName: "Bessel 1841 (Namibia)"
                }, e.clrk66 = {a: 6378206.4, b: 6356583.8, ellipseName: "Clarke 1866"}, e.clrk80 = {
                    a: 6378249.145,
                    rf: 293.4663,
                    ellipseName: "Clarke 1880 mod."
                }, e.clrk58 = {
                    a: 6378293.645208759,
                    rf: 294.2606763692654,
                    ellipseName: "Clarke 1858"
                }, e.CPM = {
                    a: 6375738.7,
                    rf: 334.29,
                    ellipseName: "Comm. des Poids et Mesures 1799"
                }, e.delmbr = {
                    a: 6376428,
                    rf: 311.5,
                    ellipseName: "Delambre 1810 (Belgium)"
                }, e.engelis = {a: 6378136.05, rf: 298.2566, ellipseName: "Engelis 1985"}, e.evrst30 = {
                    a: 6377276.345,
                    rf: 300.8017,
                    ellipseName: "Everest 1830"
                }, e.evrst48 = {a: 6377304.063, rf: 300.8017, ellipseName: "Everest 1948"}, e.evrst56 = {
                    a: 6377301.243,
                    rf: 300.8017,
                    ellipseName: "Everest 1956"
                }, e.evrst69 = {a: 6377295.664, rf: 300.8017, ellipseName: "Everest 1969"}, e.evrstSS = {
                    a: 6377298.556,
                    rf: 300.8017,
                    ellipseName: "Everest (Sabah & Sarawak)"
                }, e.fschr60 = {
                    a: 6378166,
                    rf: 298.3,
                    ellipseName: "Fischer (Mercury Datum) 1960"
                }, e.fschr60m = {a: 6378155, rf: 298.3, ellipseName: "Fischer 1960"}, e.fschr68 = {
                    a: 6378150,
                    rf: 298.3,
                    ellipseName: "Fischer 1968"
                }, e.helmert = {a: 6378200, rf: 298.3, ellipseName: "Helmert 1906"}, e.hough = {
                    a: 6378270,
                    rf: 297,
                    ellipseName: "Hough"
                }, e.intl = {a: 6378388, rf: 297, ellipseName: "International 1909 (Hayford)"}, e.kaula = {
                    a: 6378163,
                    rf: 298.24,
                    ellipseName: "Kaula 1961"
                }, e.lerch = {a: 6378139, rf: 298.257, ellipseName: "Lerch 1979"}, e.mprts = {
                    a: 6397300,
                    rf: 191,
                    ellipseName: "Maupertius 1738"
                }, e.new_intl = {
                    a: 6378157.5,
                    b: 6356772.2,
                    ellipseName: "New International 1967"
                }, e.plessis = {a: 6376523, rf: 6355863, ellipseName: "Plessis 1817 (France)"}, e.krass = {
                    a: 6378245,
                    rf: 298.3,
                    ellipseName: "Krassovsky, 1942"
                }, e.SEasia = {a: 6378155, b: 6356773.3205, ellipseName: "Southeast Asia"}, e.walbeck = {
                    a: 6376896,
                    b: 6355834.8467,
                    ellipseName: "Walbeck"
                }, e.WGS60 = {a: 6378165, rf: 298.3, ellipseName: "WGS 60"}, e.WGS66 = {
                    a: 6378145,
                    rf: 298.25,
                    ellipseName: "WGS 66"
                }, e.WGS7 = {a: 6378135, rf: 298.26, ellipseName: "WGS 72"}, e.WGS84 = {
                    a: 6378137,
                    rf: 298.257223563,
                    ellipseName: "WGS 84"
                }, e.sphere = {a: 6370997, b: 6370997, ellipseName: "Normal Sphere (r=6370997)"}
            }, {}],
            27: [function (t, i, e) {
                e.greenwich = 0, e.lisbon = -9.131906111111, e.paris = 2.337229166667, e.bogota = -74.080916666667, e.madrid = -3.687938888889, e.rome = 12.452333333333, e.bern = 7.439583333333, e.jakarta = 106.807719444444, e.ferro = -17.666666666667, e.brussels = 4.367975, e.stockholm = 18.058277777778, e.athens = 23.7163375, e.oslo = 10.722916666667
            }, {}],
            28: [function (t, i, e) {
                function n(t, i, e) {
                    var n;
                    return Array.isArray(e) ? (n = a(t, i, e), 3 === e.length ? [n.x, n.y, n.z] : [n.x, n.y]) : a(t, i, e)
                }

                function o(t) {
                    return t instanceof r ? t : t.oProj ? t.oProj : r(t)
                }

                function s(t, i, e) {
                    t = o(t);
                    var s, r = !1;
                    return "undefined" == typeof i ? (i = t, t = h, r = !0) : ("undefined" != typeof i.x || Array.isArray(i)) && (e = i, i = t, t = h, r = !0), i = o(i), e ? n(t, i, e) : (s = {
                            forward: function (e) {
                                return n(t, i, e)
                            }, inverse: function (e) {
                                return n(i, t, e)
                            }
                        }, r && (s.oProj = i), s)
                }

                var r = t("./Proj"), a = t("./transform"), h = r("WGS84");
                i.exports = s
            }, {"./Proj": 2, "./transform": 64}],
            29: [function (t, i, e) {
                var n = Math.PI / 2, o = 1, s = 2, r = 3, a = 4, h = 5, u = 484813681109536e-20, l = 1.0026, c = .3826834323650898, d = function (t) {
                    if (!(this instanceof d))return new d(t);
                    if (this.datum_type = a, t) {
                        if (t.datumCode && "none" === t.datumCode && (this.datum_type = h), t.datum_params) {
                            for (var i = 0; i < t.datum_params.length; i++)t.datum_params[i] = parseFloat(t.datum_params[i]);
                            (0 !== t.datum_params[0] || 0 !== t.datum_params[1] || 0 !== t.datum_params[2]) && (this.datum_type = o), t.datum_params.length > 3 && (0 !== t.datum_params[3] || 0 !== t.datum_params[4] || 0 !== t.datum_params[5] || 0 !== t.datum_params[6]) && (this.datum_type = s, t.datum_params[3] *= u, t.datum_params[4] *= u, t.datum_params[5] *= u, t.datum_params[6] = t.datum_params[6] / 1e6 + 1)
                        }
                        this.datum_type = t.grids ? r : this.datum_type, this.a = t.a, this.b = t.b, this.es = t.es, this.ep2 = t.ep2, this.datum_params = t.datum_params, this.datum_type === r && (this.grids = t.grids)
                    }
                };
                d.prototype = {
                    compare_datums: function (t) {
                        return this.datum_type !== t.datum_type ? !1 : this.a !== t.a || Math.abs(this.es - t.es) > 5e-11 ? !1 : this.datum_type === o ? this.datum_params[0] === t.datum_params[0] && this.datum_params[1] === t.datum_params[1] && this.datum_params[2] === t.datum_params[2] : this.datum_type === s ? this.datum_params[0] === t.datum_params[0] && this.datum_params[1] === t.datum_params[1] && this.datum_params[2] === t.datum_params[2] && this.datum_params[3] === t.datum_params[3] && this.datum_params[4] === t.datum_params[4] && this.datum_params[5] === t.datum_params[5] && this.datum_params[6] === t.datum_params[6] : this.datum_type === r || t.datum_type === r ? this.nadgrids === t.nadgrids : !0
                    }, geodetic_to_geocentric: function (t) {
                        var i, e, o, s, r, a, h, u = t.x, l = t.y, c = t.z ? t.z : 0, d = 0;
                        if (-n > l && l > -1.001 * n) l = -n; else if (l > n && 1.001 * n > l) l = n; else if (-n > l || l > n)return null;
                        return u > Math.PI && (u -= 2 * Math.PI), r = Math.sin(l), h = Math.cos(l), a = r * r, s = this.a / Math.sqrt(1 - this.es * a), i = (s + c) * h * Math.cos(u), e = (s + c) * h * Math.sin(u), o = (s * (1 - this.es) + c) * r, t.x = i, t.y = e, t.z = o, d
                    }, geocentric_to_geodetic: function (t) {
                        var i, e, o, s, r, a, h, u, l, c, d, m, p, f, _, v, g, y = 1e-12, M = y * y, x = 30, b = t.x, w = t.y, T = t.z ? t.z : 0;
                        if (p = !1, i = Math.sqrt(b * b + w * w), e = Math.sqrt(b * b + w * w + T * T), i / this.a < y) {
                            if (p = !0, _ = 0, e / this.a < y)return v = n, void(g = -this.b)
                        } else _ = Math.atan2(w, b);
                        o = T / e, s = i / e, r = 1 / Math.sqrt(1 - this.es * (2 - this.es) * s * s), u = s * (1 - this.es) * r, l = o * r, f = 0;
                        do f++, h = this.a / Math.sqrt(1 - this.es * l * l), g = i * u + T * l - h * (1 - this.es * l * l), a = this.es * h / (h + g), r = 1 / Math.sqrt(1 - a * (2 - a) * s * s), c = s * (1 - a) * r, d = o * r, m = d * u - c * l, u = c, l = d; while (m * m > M && x > f);
                        return v = Math.atan(d / Math.abs(c)), t.x = _, t.y = v, t.z = g, t
                    }, geocentric_to_geodetic_noniter: function (t) {
                        var i, e, o, s, r, a, h, u, d, m, p, f, _, v, g, y, M, x = t.x, b = t.y, w = t.z ? t.z : 0;
                        if (x = parseFloat(x), b = parseFloat(b), w = parseFloat(w), M = !1, 0 !== x) i = Math.atan2(b, x); else if (b > 0) i = n; else if (0 > b) i = -n; else if (M = !0, i = 0, w > 0) e = n; else {
                            if (!(0 > w))return e = n, void(o = -this.b);
                            e = -n
                        }
                        return r = x * x + b * b, s = Math.sqrt(r), a = w * l, u = Math.sqrt(a * a + r), m = a / u, f = s / u, p = m * m * m, h = w + this.b * this.ep2 * p, y = s - this.a * this.es * f * f * f, d = Math.sqrt(h * h + y * y), _ = h / d, v = y / d, g = this.a / Math.sqrt(1 - this.es * _ * _), o = v >= c ? s / v - g : -c >= v ? s / -v - g : w / _ + g * (this.es - 1), M === !1 && (e = Math.atan(_ / v)), t.x = i, t.y = e, t.z = o, t
                    }, geocentric_to_wgs84: function (t) {
                        if (this.datum_type === o) t.x += this.datum_params[0], t.y += this.datum_params[1], t.z += this.datum_params[2]; else if (this.datum_type === s) {
                            var i = this.datum_params[0], e = this.datum_params[1], n = this.datum_params[2], r = this.datum_params[3], a = this.datum_params[4], h = this.datum_params[5], u = this.datum_params[6], l = u * (t.x - h * t.y + a * t.z) + i, c = u * (h * t.x + t.y - r * t.z) + e, d = u * (-a * t.x + r * t.y + t.z) + n;
                            t.x = l, t.y = c, t.z = d
                        }
                    }, geocentric_from_wgs84: function (t) {
                        if (this.datum_type === o) t.x -= this.datum_params[0], t.y -= this.datum_params[1], t.z -= this.datum_params[2]; else if (this.datum_type === s) {
                            var i = this.datum_params[0], e = this.datum_params[1], n = this.datum_params[2], r = this.datum_params[3], a = this.datum_params[4], h = this.datum_params[5], u = this.datum_params[6], l = (t.x - i) / u, c = (t.y - e) / u, d = (t.z - n) / u;
                            t.x = l + h * c - a * d, t.y = -h * l + c + r * d, t.z = a * l - r * c + d
                        }
                    }
                }, i.exports = d
            }, {}],
            30: [function (t, i, e) {
                var n = 1, o = 2, s = 3, r = 5, a = 6378137, h = .006694379990141316;
                i.exports = function (t, i, e) {
                    function u(t) {
                        return t === n || t === o
                    }

                    var l, c, d;
                    if (t.compare_datums(i))return e;
                    if (t.datum_type === r || i.datum_type === r)return e;
                    var m = t.a, p = t.es, f = i.a, _ = i.es, v = t.datum_type;
                    if (v === s)if (0 === this.apply_gridshift(t, 0, e)) t.a = a, t.es = h; else {
                        if (!t.datum_params)return t.a = m, t.es = t.es, e;
                        for (l = 1, c = 0, d = t.datum_params.length; d > c; c++)l *= t.datum_params[c];
                        if (0 === l)return t.a = m, t.es = t.es, e;
                        v = t.datum_params.length > 3 ? o : n
                    }
                    return i.datum_type === s && (i.a = a, i.es = h), (t.es !== i.es || t.a !== i.a || u(v) || u(i.datum_type)) && (t.geodetic_to_geocentric(e), u(t.datum_type) && t.geocentric_to_wgs84(e), u(i.datum_type) && i.geocentric_from_wgs84(e), i.geocentric_to_geodetic(e)), i.datum_type === s && this.apply_gridshift(i, 1, e), t.a = m, t.es = p, i.a = f, i.es = _, e
                }
            }, {}],
            31: [function (t, i, e) {
                function n(t) {
                    var i = this;
                    if (2 === arguments.length) "+" === arguments[1][0] ? n[t] = s(arguments[1]) : n[t] = r(arguments[1]); else if (1 === arguments.length)return Array.isArray(t) ? t.map(function (t) {
                            Array.isArray(t) ? n.apply(i, t) : n(t)
                        }) : void("string" == typeof t || ("EPSG" in t ? n["EPSG:" + t.EPSG] = t : "ESRI" in t ? n["ESRI:" + t.ESRI] = t : "IAU2000" in t ? n["IAU2000:" + t.IAU2000] = t : console.log(t)))
                }

                var o = t("./global"), s = t("./projString"), r = t("./wkt");
                o(n), i.exports = n
            }, {"./global": 34, "./projString": 37, "./wkt": 65}],
            32: [function (t, i, e) {
                var n = t("./constants/Datum"), o = t("./constants/Ellipsoid"), s = t("./extend"), r = t("./datum"), a = 1e-10, h = .16666666666666666, u = .04722222222222222, l = .022156084656084655;
                i.exports = function (t) {
                    if (t.datumCode && "none" !== t.datumCode) {
                        var i = n[t.datumCode];
                        i && (t.datum_params = i.towgs84 ? i.towgs84.split(",") : null, t.ellps = i.ellipse, t.datumName = i.datumName ? i.datumName : t.datumCode)
                    }
                    if (!t.a) {
                        var e = o[t.ellps] ? o[t.ellps] : o.WGS84;
                        s(t, e)
                    }
                    return t.rf && !t.b && (t.b = (1 - 1 / t.rf) * t.a), (0 === t.rf || Math.abs(t.a - t.b) < a) && (t.sphere = !0, t.b = t.a), t.a2 = t.a * t.a, t.b2 = t.b * t.b, t.es = (t.a2 - t.b2) / t.a2, t.e = Math.sqrt(t.es), t.R_A && (t.a *= 1 - t.es * (h + t.es * (u + t.es * l)), t.a2 = t.a * t.a, t.b2 = t.b * t.b, t.es = 0), t.ep2 = (t.a2 - t.b2) / t.b2, t.k0 || (t.k0 = 1), t.axis || (t.axis = "enu"), t.datum = r(t), t
                }
            }, {"./constants/Datum": 25, "./constants/Ellipsoid": 26, "./datum": 29, "./extend": 33}],
            33: [function (t, i, n) {
                i.exports = function (t, i) {
                    t = t || {};
                    var n, o;
                    if (!i)return t;
                    for (o in i)n = i[o], n !== e && (t[o] = n);
                    return t
                }
            }, {}],
            34: [function (t, i, e) {
                i.exports = function (t) {
                    t("WGS84", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), t("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), t("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), t("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), t["EPSG:3785"] = t["EPSG:3857"], t.GOOGLE = t["EPSG:3857"], t["EPSG:900913"] = t["EPSG:3857"], t["EPSG:102113"] = t["EPSG:3857"]
                }
            }, {}],
            35: [function (t, i, e) {
                var n = t("./core");
                n.defaultDatum = "WGS84", n.Proj = t("./Proj"), n.WGS84 = new n.Proj("WGS84"), n.Point = t("./Point"), n.toPoint = t("./common/toPoint"), n.defs = t("./defs"), n.transform = t("./transform"), n.mgrs = t("mgrs"), n.version = t("../package.json").version, t("./includedProjections")(n), i.exports = n
            }, {
                "../package.json": 67,
                "./Point": 1,
                "./Proj": 2,
                "./common/toPoint": 23,
                "./core": 28,
                "./defs": 31,
                "./includedProjections": "VzEyzV",
                "./transform": 64,
                mgrs: 66
            }],
            36: [function (t, i, e) {
                function n(t) {
                    return "string" == typeof t
                }

                function o(t) {
                    return t in h
                }

                function s(t) {
                    var i = ["GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS"];
                    return i.reduce(function (i, e) {
                        return i + 1 + t.indexOf(e)
                    }, 0)
                }

                function r(t) {
                    return "+" === t[0]
                }

                function a(t) {
                    return n(t) ? o(t) ? h[t] : s(t) ? u(t) : r(t) ? l(t) : void 0 : t
                }

                var h = t("./defs"), u = t("./wkt"), l = t("./projString");
                i.exports = a
            }, {"./defs": 31, "./projString": 37, "./wkt": 65}],
            37: [function (t, i, e) {
                var n = .017453292519943295, o = t("./constants/PrimeMeridian");
                i.exports = function (t) {
                    var i = {}, e = {};
                    t.split("+").map(function (t) {
                        return t.trim()
                    }).filter(function (t) {
                        return t
                    }).forEach(function (t) {
                        var i = t.split("=");
                        i.push(!0), e[i[0].toLowerCase()] = i[1]
                    });
                    var s, r, a, h = {
                        proj: "projName", datum: "datumCode", rf: function (t) {
                            i.rf = parseFloat(t, 10)
                        }, lat_0: function (t) {
                            i.lat0 = t * n
                        }, lat_1: function (t) {
                            i.lat1 = t * n
                        }, lat_2: function (t) {
                            i.lat2 = t * n
                        }, lat_ts: function (t) {
                            i.lat_ts = t * n
                        }, lon_0: function (t) {
                            i.long0 = t * n
                        }, lon_1: function (t) {
                            i.long1 = t * n
                        }, lon_2: function (t) {
                            i.long2 = t * n
                        }, alpha: function (t) {
                            i.alpha = parseFloat(t) * n
                        }, lonc: function (t) {
                            i.longc = t * n
                        }, x_0: function (t) {
                            i.x0 = parseFloat(t, 10)
                        }, y_0: function (t) {
                            i.y0 = parseFloat(t, 10)
                        }, k_0: function (t) {
                            i.k0 = parseFloat(t, 10)
                        }, k: function (t) {
                            i.k0 = parseFloat(t, 10)
                        }, r_a: function () {
                            i.R_A = !0
                        }, zone: function (t) {
                            i.zone = parseInt(t, 10)
                        }, south: function () {
                            i.utmSouth = !0
                        }, towgs84: function (t) {
                            i.datum_params = t.split(",").map(function (t) {
                                return parseFloat(t, 10)
                            })
                        }, to_meter: function (t) {
                            i.to_meter = parseFloat(t, 10)
                        }, from_greenwich: function (t) {
                            i.from_greenwich = t * n
                        }, pm: function (t) {
                            i.from_greenwich = (o[t] ? o[t] : parseFloat(t, 10)) * n
                        }, nadgrids: function (t) {
                            "@null" === t ? i.datumCode = "none" : i.nadgrids = t
                        }, axis: function (t) {
                            var e = "ewnsud";
                            3 === t.length && -1 !== e.indexOf(t.substr(0, 1)) && -1 !== e.indexOf(t.substr(1, 1)) && -1 !== e.indexOf(t.substr(2, 1)) && (i.axis = t)
                        }
                    };
                    for (s in e)r = e[s], s in h ? (a = h[s], "function" == typeof a ? a(r) : i[a] = r) : i[s] = r;
                    return "string" == typeof i.datumCode && "WGS84" !== i.datumCode && (i.datumCode = i.datumCode.toLowerCase()), i
                }
            }, {"./constants/PrimeMeridian": 27}],
            38: [function (t, i, e) {
                function n(t, i) {
                    var e = r.length;
                    return t.names ? (r[e] = t, t.names.forEach(function (t) {
                            s[t.toLowerCase()] = e
                        }), this) : (console.log(i), !0)
                }

                var o = [t("./projections/merc"), t("./projections/longlat")], s = {}, r = [];
                e.add = n, e.get = function (t) {
                    if (!t)return !1;
                    var i = t.toLowerCase();
                    return "undefined" != typeof s[i] && r[s[i]] ? r[s[i]] : void 0
                }, e.start = function () {
                    o.forEach(n)
                }
            }, {"./projections/longlat": 50, "./projections/merc": 51}],
            39: [function (t, i, e) {
                var n = 1e-10, o = t("../common/msfnz"), s = t("../common/qsfnz"), r = t("../common/adjust_lon"), a = t("../common/asinz");
                e.init = function () {
                    Math.abs(this.lat1 + this.lat2) < n || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = o(this.e3, this.sin_po, this.cos_po), this.qs1 = s(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = o(this.e3, this.sin_po, this.cos_po), this.qs2 = s(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = s(this.e3, this.sin_po, this.cos_po), Math.abs(this.lat1 - this.lat2) > n ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
                }, e.forward = function (t) {
                    var i = t.x, e = t.y;
                    this.sin_phi = Math.sin(e), this.cos_phi = Math.cos(e);
                    var n = s(this.e3, this.sin_phi, this.cos_phi), o = this.a * Math.sqrt(this.c - this.ns0 * n) / this.ns0, a = this.ns0 * r(i - this.long0), h = o * Math.sin(a) + this.x0, u = this.rh - o * Math.cos(a) + this.y0;
                    return t.x = h, t.y = u, t
                }, e.inverse = function (t) {
                    var i, e, n, o, s, a;
                    return t.x -= this.x0, t.y = this.rh - t.y + this.y0, this.ns0 >= 0 ? (i = Math.sqrt(t.x * t.x + t.y * t.y), n = 1) : (i = -Math.sqrt(t.x * t.x + t.y * t.y), n = -1), o = 0, 0 !== i && (o = Math.atan2(n * t.x, n * t.y)), n = i * this.ns0 / this.a, this.sphere ? a = Math.asin((this.c - n * n) / (2 * this.ns0)) : (e = (this.c - n * n) / this.ns0, a = this.phi1z(this.e3, e)), s = r(o / this.ns0 + this.long0), t.x = s, t.y = a, t
                }, e.phi1z = function (t, i) {
                    var e, o, s, r, h, u = a(.5 * i);
                    if (n > t)return u;
                    for (var l = t * t, c = 1; 25 >= c; c++)if (e = Math.sin(u), o = Math.cos(u), s = t * e, r = 1 - s * s, h = .5 * r * r / o * (i / (1 - l) - e / r + .5 / t * Math.log((1 - s) / (1 + s))), u += h, Math.abs(h) <= 1e-7)return u;
                    return null
                }, e.names = ["Albers_Conic_Equal_Area", "Albers", "aea"]
            }, {"../common/adjust_lon": 5, "../common/asinz": 6, "../common/msfnz": 15, "../common/qsfnz": 20}],
            40: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = Math.PI / 2, s = 1e-10, r = t("../common/mlfn"), a = t("../common/e0fn"), h = t("../common/e1fn"), u = t("../common/e2fn"), l = t("../common/e3fn"), c = t("../common/gN"), d = t("../common/asinz"), m = t("../common/imlfn");
                e.init = function () {
                    this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0)
                }, e.forward = function (t) {
                    var i, e, d, m, p, f, _, v, g, y, M, x, b, w, T, P, C, k, S, U, E, L, D, O = t.x, z = t.y, I = Math.sin(t.y), A = Math.cos(t.y), B = n(O - this.long0);
                    return this.sphere ? Math.abs(this.sin_p12 - 1) <= s ? (t.x = this.x0 + this.a * (o - z) * Math.sin(B), t.y = this.y0 - this.a * (o - z) * Math.cos(B), t) : Math.abs(this.sin_p12 + 1) <= s ? (t.x = this.x0 + this.a * (o + z) * Math.sin(B), t.y = this.y0 + this.a * (o + z) * Math.cos(B), t) : (k = this.sin_p12 * I + this.cos_p12 * A * Math.cos(B), P = Math.acos(k), C = P / Math.sin(P), t.x = this.x0 + this.a * C * A * Math.sin(B), t.y = this.y0 + this.a * C * (this.cos_p12 * I - this.sin_p12 * A * Math.cos(B)), t) : (i = a(this.es), e = h(this.es), d = u(this.es), m = l(this.es), Math.abs(this.sin_p12 - 1) <= s ? (p = this.a * r(i, e, d, m, o), f = this.a * r(i, e, d, m, z), t.x = this.x0 + (p - f) * Math.sin(B), t.y = this.y0 - (p - f) * Math.cos(B), t) : Math.abs(this.sin_p12 + 1) <= s ? (p = this.a * r(i, e, d, m, o), f = this.a * r(i, e, d, m, z), t.x = this.x0 + (p + f) * Math.sin(B), t.y = this.y0 + (p + f) * Math.cos(B), t) : (_ = I / A, v = c(this.a, this.e, this.sin_p12), g = c(this.a, this.e, I), y = Math.atan((1 - this.es) * _ + this.es * v * this.sin_p12 / (g * A)), M = Math.atan2(Math.sin(B), this.cos_p12 * Math.tan(y) - this.sin_p12 * Math.cos(B)), S = 0 === M ? Math.asin(this.cos_p12 * Math.sin(y) - this.sin_p12 * Math.cos(y)) : Math.abs(Math.abs(M) - Math.PI) <= s ? -Math.asin(this.cos_p12 * Math.sin(y) - this.sin_p12 * Math.cos(y)) : Math.asin(Math.sin(B) * Math.cos(y) / Math.sin(M)), x = this.e * this.sin_p12 / Math.sqrt(1 - this.es), b = this.e * this.cos_p12 * Math.cos(M) / Math.sqrt(1 - this.es), w = x * b, T = b * b, U = S * S, E = U * S, L = E * S, D = L * S, P = v * S * (1 - U * T * (1 - T) / 6 + E / 8 * w * (1 - 2 * T) + L / 120 * (T * (4 - 7 * T) - 3 * x * x * (1 - 7 * T)) - D / 48 * w), t.x = this.x0 + P * Math.sin(M), t.y = this.y0 + P * Math.cos(M), t))
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i, e, p, f, _, v, g, y, M, x, b, w, T, P, C, k, S, U, E, L, D, O, z;
                    if (this.sphere) {
                        if (i = Math.sqrt(t.x * t.x + t.y * t.y), i > 2 * o * this.a)return;
                        return e = i / this.a, p = Math.sin(e), f = Math.cos(e), _ = this.long0, Math.abs(i) <= s ? v = this.lat0 : (v = d(f * this.sin_p12 + t.y * p * this.cos_p12 / i), g = Math.abs(this.lat0) - o, _ = n(Math.abs(g) <= s ? this.lat0 >= 0 ? this.long0 + Math.atan2(t.x, -t.y) : this.long0 - Math.atan2(-t.x, t.y) : this.long0 + Math.atan2(t.x * p, i * this.cos_p12 * f - t.y * this.sin_p12 * p))), t.x = _, t.y = v, t
                    }
                    return y = a(this.es), M = h(this.es), x = u(this.es), b = l(this.es), Math.abs(this.sin_p12 - 1) <= s ? (w = this.a * r(y, M, x, b, o), i = Math.sqrt(t.x * t.x + t.y * t.y), T = w - i, v = m(T / this.a, y, M, x, b), _ = n(this.long0 + Math.atan2(t.x, -1 * t.y)), t.x = _, t.y = v, t) : Math.abs(this.sin_p12 + 1) <= s ? (w = this.a * r(y, M, x, b, o), i = Math.sqrt(t.x * t.x + t.y * t.y), T = i - w, v = m(T / this.a, y, M, x, b), _ = n(this.long0 + Math.atan2(t.x, t.y)), t.x = _, t.y = v, t) : (i = Math.sqrt(t.x * t.x + t.y * t.y),
                                k = Math.atan2(t.x, t.y), P = c(this.a, this.e, this.sin_p12), S = Math.cos(k), U = this.e * this.cos_p12 * S, E = -U * U / (1 - this.es), L = 3 * this.es * (1 - E) * this.sin_p12 * this.cos_p12 * S / (1 - this.es), D = i / P, O = D - E * (1 + E) * Math.pow(D, 3) / 6 - L * (1 + 3 * E) * Math.pow(D, 4) / 24, z = 1 - E * O * O / 2 - D * O * O * O / 6, C = Math.asin(this.sin_p12 * Math.cos(O) + this.cos_p12 * Math.sin(O) * S), _ = n(this.long0 + Math.asin(Math.sin(k) * Math.sin(O) / Math.cos(C))), v = Math.atan((1 - this.es * z * this.sin_p12 / Math.sin(C)) * Math.tan(C) / (1 - this.es)), t.x = _, t.y = v, t)
                }, e.names = ["Azimuthal_Equidistant", "aeqd"]
            }, {
                "../common/adjust_lon": 5,
                "../common/asinz": 6,
                "../common/e0fn": 7,
                "../common/e1fn": 8,
                "../common/e2fn": 9,
                "../common/e3fn": 10,
                "../common/gN": 11,
                "../common/imlfn": 12,
                "../common/mlfn": 14
            }],
            41: [function (t, i, e) {
                var n = t("../common/mlfn"), o = t("../common/e0fn"), s = t("../common/e1fn"), r = t("../common/e2fn"), a = t("../common/e3fn"), h = t("../common/gN"), u = t("../common/adjust_lon"), l = t("../common/adjust_lat"), c = t("../common/imlfn"), d = Math.PI / 2, m = 1e-10;
                e.init = function () {
                    this.sphere || (this.e0 = o(this.es), this.e1 = s(this.es), this.e2 = r(this.es), this.e3 = a(this.es), this.ml0 = this.a * n(this.e0, this.e1, this.e2, this.e3, this.lat0))
                }, e.forward = function (t) {
                    var i, e, o = t.x, s = t.y;
                    if (o = u(o - this.long0), this.sphere) i = this.a * Math.asin(Math.cos(s) * Math.sin(o)), e = this.a * (Math.atan2(Math.tan(s), Math.cos(o)) - this.lat0); else {
                        var r = Math.sin(s), a = Math.cos(s), l = h(this.a, this.e, r), c = Math.tan(s) * Math.tan(s), d = o * Math.cos(s), m = d * d, p = this.es * a * a / (1 - this.es), f = this.a * n(this.e0, this.e1, this.e2, this.e3, s);
                        i = l * d * (1 - m * c * (1 / 6 - (8 - c + 8 * p) * m / 120)), e = f - this.ml0 + l * r / a * m * (.5 + (5 - c + 6 * p) * m / 24)
                    }
                    return t.x = i + this.x0, t.y = e + this.y0, t
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i, e, n = t.x / this.a, o = t.y / this.a;
                    if (this.sphere) {
                        var s = o + this.lat0;
                        i = Math.asin(Math.sin(s) * Math.cos(n)), e = Math.atan2(Math.tan(n), Math.cos(s))
                    } else {
                        var r = this.ml0 / this.a + o, a = c(r, this.e0, this.e1, this.e2, this.e3);
                        if (Math.abs(Math.abs(a) - d) <= m)return t.x = this.long0, t.y = d, 0 > o && (t.y *= -1), t;
                        var p = h(this.a, this.e, Math.sin(a)), f = p * p * p / this.a / this.a * (1 - this.es), _ = Math.pow(Math.tan(a), 2), v = n * this.a / p, g = v * v;
                        i = a - p * Math.tan(a) / f * v * v * (.5 - (1 + 3 * _) * v * v / 24), e = v * (1 - g * (_ / 3 + (1 + 3 * _) * _ * g / 15)) / Math.cos(a)
                    }
                    return t.x = u(e + this.long0), t.y = l(i), t
                }, e.names = ["Cassini", "Cassini_Soldner", "cass"]
            }, {
                "../common/adjust_lat": 4,
                "../common/adjust_lon": 5,
                "../common/e0fn": 7,
                "../common/e1fn": 8,
                "../common/e2fn": 9,
                "../common/e3fn": 10,
                "../common/gN": 11,
                "../common/imlfn": 12,
                "../common/mlfn": 14
            }],
            42: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = t("../common/qsfnz"), s = t("../common/msfnz"), r = t("../common/iqsfnz");
                e.init = function () {
                    this.sphere || (this.k0 = s(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
                }, e.forward = function (t) {
                    var i, e, s = t.x, r = t.y, a = n(s - this.long0);
                    if (this.sphere) i = this.x0 + this.a * a * Math.cos(this.lat_ts), e = this.y0 + this.a * Math.sin(r) / Math.cos(this.lat_ts); else {
                        var h = o(this.e, Math.sin(r));
                        i = this.x0 + this.a * this.k0 * a, e = this.y0 + this.a * h * .5 / this.k0
                    }
                    return t.x = i, t.y = e, t
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i, e;
                    return this.sphere ? (i = n(this.long0 + t.x / this.a / Math.cos(this.lat_ts)), e = Math.asin(t.y / this.a * Math.cos(this.lat_ts))) : (e = r(this.e, 2 * t.y * this.k0 / this.a), i = n(this.long0 + t.x / (this.a * this.k0))), t.x = i, t.y = e, t
                }, e.names = ["cea"]
            }, {"../common/adjust_lon": 5, "../common/iqsfnz": 13, "../common/msfnz": 15, "../common/qsfnz": 20}],
            43: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = t("../common/adjust_lat");
                e.init = function () {
                    this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts)
                }, e.forward = function (t) {
                    var i = t.x, e = t.y, s = n(i - this.long0), r = o(e - this.lat0);
                    return t.x = this.x0 + this.a * s * this.rc, t.y = this.y0 + this.a * r, t
                }, e.inverse = function (t) {
                    var i = t.x, e = t.y;
                    return t.x = n(this.long0 + (i - this.x0) / (this.a * this.rc)), t.y = o(this.lat0 + (e - this.y0) / this.a), t
                }, e.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
            }, {"../common/adjust_lat": 4, "../common/adjust_lon": 5}],
            44: [function (t, i, e) {
                var n = t("../common/e0fn"), o = t("../common/e1fn"), s = t("../common/e2fn"), r = t("../common/e3fn"), a = t("../common/msfnz"), h = t("../common/mlfn"), u = t("../common/adjust_lon"), l = t("../common/adjust_lat"), c = t("../common/imlfn"), d = 1e-10;
                e.init = function () {
                    Math.abs(this.lat1 + this.lat2) < d || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = n(this.es), this.e1 = o(this.es), this.e2 = s(this.es), this.e3 = r(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = a(this.e, this.sinphi, this.cosphi), this.ml1 = h(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < d ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = a(this.e, this.sinphi, this.cosphi), this.ml2 = h(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = h(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0))
                }, e.forward = function (t) {
                    var i, e = t.x, n = t.y;
                    if (this.sphere) i = this.a * (this.g - n); else {
                        var o = h(this.e0, this.e1, this.e2, this.e3, n);
                        i = this.a * (this.g - o)
                    }
                    var s = this.ns * u(e - this.long0), r = this.x0 + i * Math.sin(s), a = this.y0 + this.rh - i * Math.cos(s);
                    return t.x = r, t.y = a, t
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y = this.rh - t.y + this.y0;
                    var i, e, n, o;
                    this.ns >= 0 ? (e = Math.sqrt(t.x * t.x + t.y * t.y), i = 1) : (e = -Math.sqrt(t.x * t.x + t.y * t.y), i = -1);
                    var s = 0;
                    if (0 !== e && (s = Math.atan2(i * t.x, i * t.y)), this.sphere)return o = u(this.long0 + s / this.ns), n = l(this.g - e / this.a), t.x = o, t.y = n, t;
                    var r = this.g - e / this.a;
                    return n = c(r, this.e0, this.e1, this.e2, this.e3), o = u(this.long0 + s / this.ns), t.x = o, t.y = n, t
                }, e.names = ["Equidistant_Conic", "eqdc"]
            }, {
                "../common/adjust_lat": 4,
                "../common/adjust_lon": 5,
                "../common/e0fn": 7,
                "../common/e1fn": 8,
                "../common/e2fn": 9,
                "../common/e3fn": 10,
                "../common/imlfn": 12,
                "../common/mlfn": 14,
                "../common/msfnz": 15
            }],
            45: [function (t, i, e) {
                var n = Math.PI / 4, o = t("../common/srat"), s = Math.PI / 2, r = 20;
                e.init = function () {
                    var t = Math.sin(this.lat0), i = Math.cos(this.lat0);
                    i *= i, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t), this.C = Math.sqrt(1 + this.es * i * i / (1 - this.es)), this.phic0 = Math.asin(t / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + n) / (Math.pow(Math.tan(.5 * this.lat0 + n), this.C) * o(this.e * t, this.ratexp))
                }, e.forward = function (t) {
                    var i = t.x, e = t.y;
                    return t.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * e + n), this.C) * o(this.e * Math.sin(e), this.ratexp)) - s, t.x = this.C * i, t
                }, e.inverse = function (t) {
                    for (var i = 1e-14, e = t.x / this.C, a = t.y, h = Math.pow(Math.tan(.5 * a + n) / this.K, 1 / this.C), u = r; u > 0 && (a = 2 * Math.atan(h * o(this.e * Math.sin(t.y), -.5 * this.e)) - s, !(Math.abs(a - t.y) < i)); --u)t.y = a;
                    return u ? (t.x = e, t.y = a, t) : null
                }, e.names = ["gauss"]
            }, {"../common/srat": 22}],
            46: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = 1e-10, s = t("../common/asinz");
                e.init = function () {
                    this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1
                }, e.forward = function (t) {
                    var i, e, s, r, a, h, u, l, c = t.x, d = t.y;
                    return s = n(c - this.long0), i = Math.sin(d), e = Math.cos(d), r = Math.cos(s), h = this.sin_p14 * i + this.cos_p14 * e * r, a = 1, h > 0 || Math.abs(h) <= o ? (u = this.x0 + this.a * a * e * Math.sin(s) / h, l = this.y0 + this.a * a * (this.cos_p14 * i - this.sin_p14 * e * r) / h) : (u = this.x0 + this.infinity_dist * e * Math.sin(s), l = this.y0 + this.infinity_dist * (this.cos_p14 * i - this.sin_p14 * e * r)), t.x = u, t.y = l, t
                }, e.inverse = function (t) {
                    var i, e, o, r, a, h;
                    return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, (i = Math.sqrt(t.x * t.x + t.y * t.y)) ? (r = Math.atan2(i, this.rc), e = Math.sin(r), o = Math.cos(r), h = s(o * this.sin_p14 + t.y * e * this.cos_p14 / i), a = Math.atan2(t.x * e, i * this.cos_p14 * o - t.y * this.sin_p14 * e), a = n(this.long0 + a)) : (h = this.phic0, a = 0), t.x = a, t.y = h, t
                }, e.names = ["gnom"]
            }, {"../common/adjust_lon": 5, "../common/asinz": 6}],
            47: [function (t, i, e) {
                var n = t("../common/adjust_lon");
                e.init = function () {
                    this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = .863937979737193), this.long0 || (this.long0 = .4334234309119251), this.k0 || (this.k0 = .9999), this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq
                }, e.forward = function (t) {
                    var i, e, o, s, r, a, h, u = t.x, l = t.y, c = n(u - this.long0);
                    return i = Math.pow((1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l)), this.alfa * this.e / 2), e = 2 * (Math.atan(this.k * Math.pow(Math.tan(l / 2 + this.s45), this.alfa) / i) - this.s45), o = -c * this.alfa, s = Math.asin(Math.cos(this.ad) * Math.sin(e) + Math.sin(this.ad) * Math.cos(e) * Math.cos(o)), r = Math.asin(Math.cos(e) * Math.sin(o) / Math.cos(s)), a = this.n * r, h = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n), t.y = h * Math.cos(a) / 1, t.x = h * Math.sin(a) / 1, this.czech || (t.y *= -1, t.x *= -1), t
                }, e.inverse = function (t) {
                    var i, e, n, o, s, r, a, h, u = t.x;
                    t.x = t.y, t.y = u, this.czech || (t.y *= -1, t.x *= -1), r = Math.sqrt(t.x * t.x + t.y * t.y), s = Math.atan2(t.y, t.x), o = s / Math.sin(this.s0), n = 2 * (Math.atan(Math.pow(this.ro0 / r, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), i = Math.asin(Math.cos(this.ad) * Math.sin(n) - Math.sin(this.ad) * Math.cos(n) * Math.cos(o)), e = Math.asin(Math.cos(n) * Math.sin(o) / Math.cos(i)), t.x = this.long0 - e / this.alfa, a = i, h = 0;
                    var l = 0;
                    do t.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(i / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(a)) / (1 - this.e * Math.sin(a)), this.e / 2)) - this.s45), Math.abs(a - t.y) < 1e-10 && (h = 1), a = t.y, l += 1; while (0 === h && 15 > l);
                    return l >= 15 ? null : t
                }, e.names = ["Krovak", "krovak"]
            }, {"../common/adjust_lon": 5}],
            48: [function (t, i, e) {
                var n = Math.PI / 2, o = Math.PI / 4, s = 1e-10, r = t("../common/qsfnz"), a = t("../common/adjust_lon");
                e.S_POLE = 1, e.N_POLE = 2, e.EQUIT = 3, e.OBLIQ = 4, e.init = function () {
                    var t = Math.abs(this.lat0);
                    if (Math.abs(t - n) < s ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(t) < s ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) {
                        var i;
                        switch (this.qp = r(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = this.authset(this.es), this.mode) {
                            case this.N_POLE:
                                this.dd = 1;
                                break;
                            case this.S_POLE:
                                this.dd = 1;
                                break;
                            case this.EQUIT:
                                this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
                                break;
                            case this.OBLIQ:
                                this.rq = Math.sqrt(.5 * this.qp), i = Math.sin(this.lat0), this.sinb1 = r(this.e, i) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * i * i) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd
                        }
                    } else this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0))
                }, e.forward = function (t) {
                    var i, e, h, u, l, c, d, m, p, f, _ = t.x, v = t.y;
                    if (_ = a(_ - this.long0), this.sphere) {
                        if (l = Math.sin(v), f = Math.cos(v), h = Math.cos(_), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                            if (e = this.mode === this.EQUIT ? 1 + f * h : 1 + this.sinph0 * l + this.cosph0 * f * h, s >= e)return null;
                            e = Math.sqrt(2 / e), i = e * f * Math.sin(_), e *= this.mode === this.EQUIT ? l : this.cosph0 * l - this.sinph0 * f * h
                        } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                            if (this.mode === this.N_POLE && (h = -h), Math.abs(v + this.phi0) < s)return null;
                            e = o - .5 * v, e = 2 * (this.mode === this.S_POLE ? Math.cos(e) : Math.sin(e)), i = e * Math.sin(_), e *= h
                        }
                    } else {
                        switch (d = 0, m = 0, p = 0, h = Math.cos(_), u = Math.sin(_), l = Math.sin(v), c = r(this.e, l), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (d = c / this.qp, m = Math.sqrt(1 - d * d)), this.mode) {
                            case this.OBLIQ:
                                p = 1 + this.sinb1 * d + this.cosb1 * m * h;
                                break;
                            case this.EQUIT:
                                p = 1 + m * h;
                                break;
                            case this.N_POLE:
                                p = n + v, c = this.qp - c;
                                break;
                            case this.S_POLE:
                                p = v - n, c = this.qp + c
                        }
                        if (Math.abs(p) < s)return null;
                        switch (this.mode) {
                            case this.OBLIQ:
                            case this.EQUIT:
                                p = Math.sqrt(2 / p), e = this.mode === this.OBLIQ ? this.ymf * p * (this.cosb1 * d - this.sinb1 * m * h) : (p = Math.sqrt(2 / (1 + m * h))) * d * this.ymf, i = this.xmf * p * m * u;
                                break;
                            case this.N_POLE:
                            case this.S_POLE:
                                c >= 0 ? (i = (p = Math.sqrt(c)) * u, e = h * (this.mode === this.S_POLE ? p : -p)) : i = e = 0
                        }
                    }
                    return t.x = this.a * i + this.x0, t.y = this.a * e + this.y0, t
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i, e, o, r, h, u, l, c = t.x / this.a, d = t.y / this.a;
                    if (this.sphere) {
                        var m, p = 0, f = 0;
                        if (m = Math.sqrt(c * c + d * d), e = .5 * m, e > 1)return null;
                        switch (e = 2 * Math.asin(e), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (f = Math.sin(e), p = Math.cos(e)), this.mode) {
                            case this.EQUIT:
                                e = Math.abs(m) <= s ? 0 : Math.asin(d * f / m), c *= f, d = p * m;
                                break;
                            case this.OBLIQ:
                                e = Math.abs(m) <= s ? this.phi0 : Math.asin(p * this.sinph0 + d * f * this.cosph0 / m), c *= f * this.cosph0, d = (p - Math.sin(e) * this.sinph0) * m;
                                break;
                            case this.N_POLE:
                                d = -d, e = n - e;
                                break;
                            case this.S_POLE:
                                e -= n
                        }
                        i = 0 !== d || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(c, d) : 0
                    } else {
                        if (l = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                            if (c /= this.dd, d *= this.dd, u = Math.sqrt(c * c + d * d), s > u)return t.x = 0, t.y = this.phi0, t;
                            r = 2 * Math.asin(.5 * u / this.rq), o = Math.cos(r), c *= r = Math.sin(r), this.mode === this.OBLIQ ? (l = o * this.sinb1 + d * r * this.cosb1 / u, h = this.qp * l, d = u * this.cosb1 * o - d * this.sinb1 * r) : (l = d * r / u, h = this.qp * l, d = u * o)
                        } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                            if (this.mode === this.N_POLE && (d = -d), h = c * c + d * d, !h)return t.x = 0, t.y = this.phi0, t;
                            l = 1 - h / this.qp, this.mode === this.S_POLE && (l = -l)
                        }
                        i = Math.atan2(c, d), e = this.authlat(Math.asin(l), this.apa)
                    }
                    return t.x = a(this.long0 + i), t.y = e, t
                }, e.P00 = .3333333333333333, e.P01 = .17222222222222222, e.P02 = .10257936507936508, e.P10 = .06388888888888888, e.P11 = .0664021164021164, e.P20 = .016415012942191543, e.authset = function (t) {
                    var i, e = [];
                    return e[0] = t * this.P00, i = t * t, e[0] += i * this.P01, e[1] = i * this.P10, i *= t, e[0] += i * this.P02, e[1] += i * this.P11, e[2] = i * this.P20, e
                }, e.authlat = function (t, i) {
                    var e = t + t;
                    return t + i[0] * Math.sin(e) + i[1] * Math.sin(e + e) + i[2] * Math.sin(e + e + e)
                }, e.names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"]
            }, {"../common/adjust_lon": 5, "../common/qsfnz": 20}],
            49: [function (t, i, e) {
                var n = 1e-10, o = t("../common/msfnz"), s = t("../common/tsfnz"), r = Math.PI / 2, a = t("../common/sign"), h = t("../common/adjust_lon"), u = t("../common/phi2z");
                e.init = function () {
                    if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < n)) {
                        var t = this.b / this.a;
                        this.e = Math.sqrt(1 - t * t);
                        var i = Math.sin(this.lat1), e = Math.cos(this.lat1), r = o(this.e, i, e), a = s(this.e, this.lat1, i), h = Math.sin(this.lat2), u = Math.cos(this.lat2), l = o(this.e, h, u), c = s(this.e, this.lat2, h), d = s(this.e, this.lat0, Math.sin(this.lat0));
                        Math.abs(this.lat1 - this.lat2) > n ? this.ns = Math.log(r / l) / Math.log(a / c) : this.ns = i, isNaN(this.ns) && (this.ns = i), this.f0 = r / (this.ns * Math.pow(a, this.ns)), this.rh = this.a * this.f0 * Math.pow(d, this.ns), this.title || (this.title = "Lambert Conformal Conic")
                    }
                }, e.forward = function (t) {
                    var i = t.x, e = t.y;
                    Math.abs(2 * Math.abs(e) - Math.PI) <= n && (e = a(e) * (r - 2 * n));
                    var o, u, l = Math.abs(Math.abs(e) - r);
                    if (l > n) o = s(this.e, e, Math.sin(e)), u = this.a * this.f0 * Math.pow(o, this.ns); else {
                        if (l = e * this.ns, 0 >= l)return null;
                        u = 0
                    }
                    var c = this.ns * h(i - this.long0);
                    return t.x = this.k0 * (u * Math.sin(c)) + this.x0, t.y = this.k0 * (this.rh - u * Math.cos(c)) + this.y0, t
                }, e.inverse = function (t) {
                    var i, e, n, o, s, a = (t.x - this.x0) / this.k0, l = this.rh - (t.y - this.y0) / this.k0;
                    this.ns > 0 ? (i = Math.sqrt(a * a + l * l), e = 1) : (i = -Math.sqrt(a * a + l * l), e = -1);
                    var c = 0;
                    if (0 !== i && (c = Math.atan2(e * a, e * l)), 0 !== i || this.ns > 0) {
                        if (e = 1 / this.ns, n = Math.pow(i / (this.a * this.f0), e), o = u(this.e, n), -9999 === o)return null
                    } else o = -r;
                    return s = h(c / this.ns + this.long0), t.x = s, t.y = o, t
                }, e.names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"]
            }, {
                "../common/adjust_lon": 5,
                "../common/msfnz": 15,
                "../common/phi2z": 16,
                "../common/sign": 21,
                "../common/tsfnz": 24
            }],
            50: [function (t, i, e) {
                function n(t) {
                    return t
                }

                e.init = function () {
                }, e.forward = n, e.inverse = n, e.names = ["longlat", "identity"]
            }, {}],
            51: [function (t, i, e) {
                var n = t("../common/msfnz"), o = Math.PI / 2, s = 1e-10, r = 57.29577951308232, a = t("../common/adjust_lon"), h = Math.PI / 4, u = t("../common/tsfnz"), l = t("../common/phi2z");
                e.init = function () {
                    var t = this.b / this.a;
                    this.es = 1 - t * t, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = n(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1)
                }, e.forward = function (t) {
                    var i = t.x, e = t.y;
                    if (e * r > 90 && -90 > e * r && i * r > 180 && -180 > i * r)return null;
                    var n, l;
                    if (Math.abs(Math.abs(e) - o) <= s)return null;
                    if (this.sphere) n = this.x0 + this.a * this.k0 * a(i - this.long0), l = this.y0 + this.a * this.k0 * Math.log(Math.tan(h + .5 * e)); else {
                        var c = Math.sin(e), d = u(this.e, e, c);
                        n = this.x0 + this.a * this.k0 * a(i - this.long0), l = this.y0 - this.a * this.k0 * Math.log(d)
                    }
                    return t.x = n, t.y = l, t
                }, e.inverse = function (t) {
                    var i, e, n = t.x - this.x0, s = t.y - this.y0;
                    if (this.sphere) e = o - 2 * Math.atan(Math.exp(-s / (this.a * this.k0))); else {
                        var r = Math.exp(-s / (this.a * this.k0));
                        if (e = l(this.e, r), -9999 === e)return null
                    }
                    return i = a(this.long0 + n / (this.a * this.k0)), t.x = i, t.y = e, t
                }, e.names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
            }, {"../common/adjust_lon": 5, "../common/msfnz": 15, "../common/phi2z": 16, "../common/tsfnz": 24}],
            52: [function (t, i, e) {
                var n = t("../common/adjust_lon");
                e.init = function () {
                }, e.forward = function (t) {
                    var i = t.x, e = t.y, o = n(i - this.long0), s = this.x0 + this.a * o, r = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + e / 2.5)) * 1.25;
                    return t.x = s, t.y = r, t
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i = n(this.long0 + t.x / this.a), e = 2.5 * (Math.atan(Math.exp(.8 * t.y / this.a)) - Math.PI / 4);
                    return t.x = i, t.y = e, t
                }, e.names = ["Miller_Cylindrical", "mill"]
            }, {"../common/adjust_lon": 5}],
            53: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = 1e-10;
                e.init = function () {
                }, e.forward = function (t) {
                    for (var i = t.x, e = t.y, s = n(i - this.long0), r = e, a = Math.PI * Math.sin(e), h = 0; !0; h++) {
                        var u = -(r + Math.sin(r) - a) / (1 + Math.cos(r));
                        if (r += u, Math.abs(u) < o)break
                    }
                    r /= 2, Math.PI / 2 - Math.abs(e) < o && (s = 0);
                    var l = .900316316158 * this.a * s * Math.cos(r) + this.x0, c = 1.4142135623731 * this.a * Math.sin(r) + this.y0;
                    return t.x = l, t.y = c, t
                }, e.inverse = function (t) {
                    var i, e;
                    t.x -= this.x0, t.y -= this.y0, e = t.y / (1.4142135623731 * this.a), Math.abs(e) > .999999999999 && (e = .999999999999), i = Math.asin(e);
                    var o = n(this.long0 + t.x / (.900316316158 * this.a * Math.cos(i)));
                    o < -Math.PI && (o = -Math.PI), o > Math.PI && (o = Math.PI), e = (2 * i + Math.sin(2 * i)) / Math.PI, Math.abs(e) > 1 && (e = 1);
                    var s = Math.asin(e);
                    return t.x = o, t.y = s, t
                }, e.names = ["Mollweide", "moll"]
            }, {"../common/adjust_lon": 5}],
            54: [function (t, i, e) {
                var n = 484813681109536e-20;
                e.iterations = 1, e.init = function () {
                    this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013
                }, e.forward = function (t) {
                    var i, e = t.x, o = t.y, s = o - this.lat0, r = e - this.long0, a = s / n * 1e-5, h = r, u = 1, l = 0;
                    for (i = 1; 10 >= i; i++)u *= a, l += this.A[i] * u;
                    var c, d, m = l, p = h, f = 1, _ = 0, v = 0, g = 0;
                    for (i = 1; 6 >= i; i++)c = f * m - _ * p, d = _ * m + f * p, f = c, _ = d, v = v + this.B_re[i] * f - this.B_im[i] * _, g = g + this.B_im[i] * f + this.B_re[i] * _;
                    return t.x = g * this.a + this.x0, t.y = v * this.a + this.y0, t
                }, e.inverse = function (t) {
                    var i, e, o, s = t.x, r = t.y, a = s - this.x0, h = r - this.y0, u = h / this.a, l = a / this.a, c = 1, d = 0, m = 0, p = 0;
                    for (i = 1; 6 >= i; i++)e = c * u - d * l, o = d * u + c * l, c = e, d = o, m = m + this.C_re[i] * c - this.C_im[i] * d, p = p + this.C_im[i] * c + this.C_re[i] * d;
                    for (var f = 0; f < this.iterations; f++) {
                        var _, v, g = m, y = p, M = u, x = l;
                        for (i = 2; 6 >= i; i++)_ = g * m - y * p, v = y * m + g * p, g = _, y = v, M += (i - 1) * (this.B_re[i] * g - this.B_im[i] * y), x += (i - 1) * (this.B_im[i] * g + this.B_re[i] * y);
                        g = 1, y = 0;
                        var b = this.B_re[1], w = this.B_im[1];
                        for (i = 2; 6 >= i; i++)_ = g * m - y * p, v = y * m + g * p, g = _, y = v, b += i * (this.B_re[i] * g - this.B_im[i] * y), w += i * (this.B_im[i] * g + this.B_re[i] * y);
                        var T = b * b + w * w;
                        m = (M * b + x * w) / T, p = (x * b - M * w) / T
                    }
                    var P = m, C = p, k = 1, S = 0;
                    for (i = 1; 9 >= i; i++)k *= P, S += this.D[i] * k;
                    var U = this.lat0 + S * n * 1e5, E = this.long0 + C;
                    return t.x = E, t.y = U, t
                }, e.names = ["New_Zealand_Map_Grid", "nzmg"]
            }, {}],
            55: [function (t, i, e) {
                var n = t("../common/tsfnz"), o = t("../common/adjust_lon"), s = t("../common/phi2z"), r = Math.PI / 2, a = Math.PI / 4, h = 1e-10;
                e.init = function () {
                    this.no_off = this.no_off || !1, this.no_rot = this.no_rot || !1, isNaN(this.k0) && (this.k0 = 1);
                    var t = Math.sin(this.lat0), i = Math.cos(this.lat0), e = this.e * t;
                    this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(i, 4)), this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - e * e);
                    var s = n(this.e, this.lat0, t), r = this.bl / i * Math.sqrt((1 - this.es) / (1 - e * e));
                    1 > r * r && (r = 1);
                    var a, h;
                    if (isNaN(this.longc)) {
                        var u = n(this.e, this.lat1, Math.sin(this.lat1)), l = n(this.e, this.lat2, Math.sin(this.lat2));
                        this.lat0 >= 0 ? this.el = (r + Math.sqrt(r * r - 1)) * Math.pow(s, this.bl) : this.el = (r - Math.sqrt(r * r - 1)) * Math.pow(s, this.bl);
                        var c = Math.pow(u, this.bl), d = Math.pow(l, this.bl);
                        a = this.el / c, h = .5 * (a - 1 / a);
                        var m = (this.el * this.el - d * c) / (this.el * this.el + d * c), p = (d - c) / (d + c), f = o(this.long1 - this.long2);
                        this.long0 = .5 * (this.long1 + this.long2) - Math.atan(m * Math.tan(.5 * this.bl * f) / p) / this.bl, this.long0 = o(this.long0);
                        var _ = o(this.long1 - this.long0);
                        this.gamma0 = Math.atan(Math.sin(this.bl * _) / h), this.alpha = Math.asin(r * Math.sin(this.gamma0))
                    } else a = this.lat0 >= 0 ? r + Math.sqrt(r * r - 1) : r - Math.sqrt(r * r - 1), this.el = a * Math.pow(s, this.bl), h = .5 * (a - 1 / a), this.gamma0 = Math.asin(Math.sin(this.alpha) / r), this.long0 = this.longc - Math.asin(h * Math.tan(this.gamma0)) / this.bl;
                    this.no_off ? this.uc = 0 : this.lat0 >= 0 ? this.uc = this.al / this.bl * Math.atan2(Math.sqrt(r * r - 1), Math.cos(this.alpha)) : this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(r * r - 1), Math.cos(this.alpha))
                }, e.forward = function (t) {
                    var i, e, s, u = t.x, l = t.y, c = o(u - this.long0);
                    if (Math.abs(Math.abs(l) - r) <= h) s = l > 0 ? -1 : 1, e = this.al / this.bl * Math.log(Math.tan(a + s * this.gamma0 * .5)), i = -1 * s * r * this.al / this.bl; else {
                        var d = n(this.e, l, Math.sin(l)), m = this.el / Math.pow(d, this.bl), p = .5 * (m - 1 / m), f = .5 * (m + 1 / m), _ = Math.sin(this.bl * c), v = (p * Math.sin(this.gamma0) - _ * Math.cos(this.gamma0)) / f;
                        e = Math.abs(Math.abs(v) - 1) <= h ? Number.POSITIVE_INFINITY : .5 * this.al * Math.log((1 - v) / (1 + v)) / this.bl, i = Math.abs(Math.cos(this.bl * c)) <= h ? this.al * this.bl * c : this.al * Math.atan2(p * Math.cos(this.gamma0) + _ * Math.sin(this.gamma0), Math.cos(this.bl * c)) / this.bl
                    }
                    return this.no_rot ? (t.x = this.x0 + i, t.y = this.y0 + e) : (i -= this.uc, t.x = this.x0 + e * Math.cos(this.alpha) + i * Math.sin(this.alpha), t.y = this.y0 + i * Math.cos(this.alpha) - e * Math.sin(this.alpha)), t
                }, e.inverse = function (t) {
                    var i, e;
                    this.no_rot ? (e = t.y - this.y0, i = t.x - this.x0) : (e = (t.x - this.x0) * Math.cos(this.alpha) - (t.y - this.y0) * Math.sin(this.alpha), i = (t.y - this.y0) * Math.cos(this.alpha) + (t.x - this.x0) * Math.sin(this.alpha), i += this.uc);
                    var n = Math.exp(-1 * this.bl * e / this.al), a = .5 * (n - 1 / n), u = .5 * (n + 1 / n), l = Math.sin(this.bl * i / this.al), c = (l * Math.cos(this.gamma0) + a * Math.sin(this.gamma0)) / u, d = Math.pow(this.el / Math.sqrt((1 + c) / (1 - c)), 1 / this.bl);
                    return Math.abs(c - 1) < h ? (t.x = this.long0, t.y = r) : Math.abs(c + 1) < h ? (t.x = this.long0, t.y = -1 * r) : (t.y = s(this.e, d), t.x = o(this.long0 - Math.atan2(a * Math.cos(this.gamma0) - l * Math.sin(this.gamma0), Math.cos(this.bl * i / this.al)) / this.bl)), t
                }, e.names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"]
            }, {"../common/adjust_lon": 5, "../common/phi2z": 16, "../common/tsfnz": 24}],
            56: [function (t, i, e) {
                var n = t("../common/e0fn"), o = t("../common/e1fn"), s = t("../common/e2fn"), r = t("../common/e3fn"), a = t("../common/adjust_lon"), h = t("../common/adjust_lat"), u = t("../common/mlfn"), l = 1e-10, c = t("../common/gN"), d = 20;
                e.init = function () {
                    this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = n(this.es), this.e1 = o(this.es), this.e2 = s(this.es), this.e3 = r(this.es), this.ml0 = this.a * u(this.e0, this.e1, this.e2, this.e3, this.lat0)
                }, e.forward = function (t) {
                    var i, e, n, o = t.x, s = t.y, r = a(o - this.long0);
                    if (n = r * Math.sin(s), this.sphere) Math.abs(s) <= l ? (i = this.a * r, e = -1 * this.a * this.lat0) : (i = this.a * Math.sin(n) / Math.tan(s), e = this.a * (h(s - this.lat0) + (1 - Math.cos(n)) / Math.tan(s))); else if (Math.abs(s) <= l) i = this.a * r, e = -1 * this.ml0; else {
                        var d = c(this.a, this.e, Math.sin(s)) / Math.tan(s);
                        i = d * Math.sin(n), e = this.a * u(this.e0, this.e1, this.e2, this.e3, s) - this.ml0 + d * (1 - Math.cos(n))
                    }
                    return t.x = i + this.x0, t.y = e + this.y0, t
                }, e.inverse = function (t) {
                    var i, e, n, o, s, r, h, c, m;
                    if (n = t.x - this.x0, o = t.y - this.y0, this.sphere)if (Math.abs(o + this.a * this.lat0) <= l) i = a(n / this.a + this.long0), e = 0; else {
                        r = this.lat0 + o / this.a, h = n * n / this.a / this.a + r * r, c = r;
                        var p;
                        for (s = d; s; --s)if (p = Math.tan(c), m = -1 * (r * (c * p + 1) - c - .5 * (c * c + h) * p) / ((c - r) / p - 1), c += m, Math.abs(m) <= l) {
                            e = c;
                            break
                        }
                        i = a(this.long0 + Math.asin(n * Math.tan(c) / this.a) / Math.sin(e))
                    } else if (Math.abs(o + this.ml0) <= l) e = 0, i = a(this.long0 + n / this.a); else {
                        r = (this.ml0 + o) / this.a, h = n * n / this.a / this.a + r * r, c = r;
                        var f, _, v, g, y;
                        for (s = d; s; --s)if (y = this.e * Math.sin(c), f = Math.sqrt(1 - y * y) * Math.tan(c), _ = this.a * u(this.e0, this.e1, this.e2, this.e3, c), v = this.e0 - 2 * this.e1 * Math.cos(2 * c) + 4 * this.e2 * Math.cos(4 * c) - 6 * this.e3 * Math.cos(6 * c), g = _ / this.a, m = (r * (f * g + 1) - g - .5 * f * (g * g + h)) / (this.es * Math.sin(2 * c) * (g * g + h - 2 * r * g) / (4 * f) + (r - g) * (f * v - 2 / Math.sin(2 * c)) - v), c -= m, Math.abs(m) <= l) {
                            e = c;
                            break
                        }
                        f = Math.sqrt(1 - this.es * Math.pow(Math.sin(e), 2)) * Math.tan(e), i = a(this.long0 + Math.asin(n * f / this.a) / Math.sin(e))
                    }
                    return t.x = i, t.y = e, t
                }, e.names = ["Polyconic", "poly"]
            }, {
                "../common/adjust_lat": 4,
                "../common/adjust_lon": 5,
                "../common/e0fn": 7,
                "../common/e1fn": 8,
                "../common/e2fn": 9,
                "../common/e3fn": 10,
                "../common/gN": 11,
                "../common/mlfn": 14
            }],
            57: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = t("../common/adjust_lat"), s = t("../common/pj_enfn"), r = 20, a = t("../common/pj_mlfn"), h = t("../common/pj_inv_mlfn"), u = Math.PI / 2, l = 1e-10, c = t("../common/asinz");
                e.init = function () {
                    this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = s(this.es)
                }, e.forward = function (t) {
                    var i, e, o = t.x, s = t.y;
                    if (o = n(o - this.long0), this.sphere) {
                        if (this.m)for (var h = this.n * Math.sin(s), u = r; u; --u) {
                            var c = (this.m * s + Math.sin(s) - h) / (this.m + Math.cos(s));
                            if (s -= c, Math.abs(c) < l)break
                        } else s = 1 !== this.n ? Math.asin(this.n * Math.sin(s)) : s;
                        i = this.a * this.C_x * o * (this.m + Math.cos(s)), e = this.a * this.C_y * s
                    } else {
                        var d = Math.sin(s), m = Math.cos(s);
                        e = this.a * a(s, d, m, this.en), i = this.a * o * m / Math.sqrt(1 - this.es * d * d)
                    }
                    return t.x = i, t.y = e, t
                }, e.inverse = function (t) {
                    var i, e, s, r;
                    return t.x -= this.x0, s = t.x / this.a, t.y -= this.y0, i = t.y / this.a, this.sphere ? (i /= this.C_y, s /= this.C_x * (this.m + Math.cos(i)), this.m ? i = c((this.m * i + Math.sin(i)) / this.n) : 1 !== this.n && (i = c(Math.sin(i) / this.n)), s = n(s + this.long0), i = o(i)) : (i = h(t.y / this.a, this.es, this.en), r = Math.abs(i), u > r ? (r = Math.sin(i), e = this.long0 + t.x * Math.sqrt(1 - this.es * r * r) / (this.a * Math.cos(i)), s = n(e)) : u > r - l && (s = this.long0)), t.x = s, t.y = i, t
                }, e.names = ["Sinusoidal", "sinu"]
            }, {
                "../common/adjust_lat": 4,
                "../common/adjust_lon": 5,
                "../common/asinz": 6,
                "../common/pj_enfn": 17,
                "../common/pj_inv_mlfn": 18,
                "../common/pj_mlfn": 19
            }],
            58: [function (t, i, e) {
                e.init = function () {
                    var t = this.lat0;
                    this.lambda0 = this.long0;
                    var i = Math.sin(t), e = this.a, n = this.rf, o = 1 / n, s = 2 * o - Math.pow(o, 2), r = this.e = Math.sqrt(s);
                    this.R = this.k0 * e * Math.sqrt(1 - s) / (1 - s * Math.pow(i, 2)), this.alpha = Math.sqrt(1 + s / (1 - s) * Math.pow(Math.cos(t), 4)), this.b0 = Math.asin(i / this.alpha);
                    var a = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), h = Math.log(Math.tan(Math.PI / 4 + t / 2)), u = Math.log((1 + r * i) / (1 - r * i));
                    this.K = a - this.alpha * h + this.alpha * r / 2 * u
                }, e.forward = function (t) {
                    var i = Math.log(Math.tan(Math.PI / 4 - t.y / 2)), e = this.e / 2 * Math.log((1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))), n = -this.alpha * (i + e) + this.K, o = 2 * (Math.atan(Math.exp(n)) - Math.PI / 4), s = this.alpha * (t.x - this.lambda0), r = Math.atan(Math.sin(s) / (Math.sin(this.b0) * Math.tan(o) + Math.cos(this.b0) * Math.cos(s))), a = Math.asin(Math.cos(this.b0) * Math.sin(o) - Math.sin(this.b0) * Math.cos(o) * Math.cos(s));
                    return t.y = this.R / 2 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a))) + this.y0, t.x = this.R * r + this.x0, t
                }, e.inverse = function (t) {
                    for (var i = t.x - this.x0, e = t.y - this.y0, n = i / this.R, o = 2 * (Math.atan(Math.exp(e / this.R)) - Math.PI / 4), s = Math.asin(Math.cos(this.b0) * Math.sin(o) + Math.sin(this.b0) * Math.cos(o) * Math.cos(n)), r = Math.atan(Math.sin(n) / (Math.cos(this.b0) * Math.cos(n) - Math.sin(this.b0) * Math.tan(o))), a = this.lambda0 + r / this.alpha, h = 0, u = s, l = -1e3, c = 0; Math.abs(u - l) > 1e-7;) {
                        if (++c > 20)return;
                        h = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + s / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(u)) / 2)), l = u, u = 2 * Math.atan(Math.exp(h)) - Math.PI / 2
                    }
                    return t.x = a, t.y = u, t
                }, e.names = ["somerc"]
            }, {}],
            59: [function (t, i, e) {
                var n = Math.PI / 2, o = 1e-10, s = t("../common/sign"), r = t("../common/msfnz"), a = t("../common/tsfnz"), h = t("../common/phi2z"), u = t("../common/adjust_lon");
                e.ssfn_ = function (t, i, e) {
                    return i *= e, Math.tan(.5 * (n + t)) * Math.pow((1 - i) / (1 + i), .5 * e)
                }, e.init = function () {
                    this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= o && (this.k0 = .5 * (1 + s(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= o && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= o && (this.k0 = .5 * this.cons * r(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / a(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = r(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - n, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0))
                }, e.forward = function (t) {
                    var i, e, s, r, h, l, c = t.x, d = t.y, m = Math.sin(d), p = Math.cos(d), f = u(c - this.long0);
                    return Math.abs(Math.abs(c - this.long0) - Math.PI) <= o && Math.abs(d + this.lat0) <= o ? (t.x = NaN, t.y = NaN, t) : this.sphere ? (i = 2 * this.k0 / (1 + this.sinlat0 * m + this.coslat0 * p * Math.cos(f)), t.x = this.a * i * p * Math.sin(f) + this.x0, t.y = this.a * i * (this.coslat0 * m - this.sinlat0 * p * Math.cos(f)) + this.y0, t) : (e = 2 * Math.atan(this.ssfn_(d, m, this.e)) - n, r = Math.cos(e), s = Math.sin(e), Math.abs(this.coslat0) <= o ? (h = a(this.e, d * this.con, this.con * m), l = 2 * this.a * this.k0 * h / this.cons, t.x = this.x0 + l * Math.sin(c - this.long0), t.y = this.y0 - this.con * l * Math.cos(c - this.long0), t) : (Math.abs(this.sinlat0) < o ? (i = 2 * this.a * this.k0 / (1 + r * Math.cos(f)), t.y = i * s) : (i = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * s + this.cosX0 * r * Math.cos(f))), t.y = i * (this.cosX0 * s - this.sinX0 * r * Math.cos(f)) + this.y0), t.x = i * r * Math.sin(f) + this.x0, t))
                }, e.inverse = function (t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var i, e, s, r, a, l = Math.sqrt(t.x * t.x + t.y * t.y);
                    if (this.sphere) {
                        var c = 2 * Math.atan(l / (.5 * this.a * this.k0));
                        return i = this.long0, e = this.lat0, o >= l ? (t.x = i, t.y = e, t) : (e = Math.asin(Math.cos(c) * this.sinlat0 + t.y * Math.sin(c) * this.coslat0 / l), i = u(Math.abs(this.coslat0) < o ? this.lat0 > 0 ? this.long0 + Math.atan2(t.x, -1 * t.y) : this.long0 + Math.atan2(t.x, t.y) : this.long0 + Math.atan2(t.x * Math.sin(c), l * this.coslat0 * Math.cos(c) - t.y * this.sinlat0 * Math.sin(c))), t.x = i, t.y = e, t)
                    }
                    if (Math.abs(this.coslat0) <= o) {
                        if (o >= l)return e = this.lat0, i = this.long0, t.x = i, t.y = e, t;
                        t.x *= this.con, t.y *= this.con, s = l * this.cons / (2 * this.a * this.k0), e = this.con * h(this.e, s), i = this.con * u(this.con * this.long0 + Math.atan2(t.x, -1 * t.y))
                    } else r = 2 * Math.atan(l * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), i = this.long0, o >= l ? a = this.X0 : (a = Math.asin(Math.cos(r) * this.sinX0 + t.y * Math.sin(r) * this.cosX0 / l), i = u(this.long0 + Math.atan2(t.x * Math.sin(r), l * this.cosX0 * Math.cos(r) - t.y * this.sinX0 * Math.sin(r)))), e = -1 * h(this.e, Math.tan(.5 * (n + a)));
                    return t.x = i, t.y = e, t
                }, e.names = ["stere"]
            }, {
                "../common/adjust_lon": 5,
                "../common/msfnz": 15,
                "../common/phi2z": 16,
                "../common/sign": 21,
                "../common/tsfnz": 24
            }],
            60: [function (t, i, e) {
                var n = t("./gauss"), o = t("../common/adjust_lon");
                e.init = function () {
                    n.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"))
                }, e.forward = function (t) {
                    var i, e, s, r;
                    return t.x = o(t.x - this.long0), n.forward.apply(this, [t]), i = Math.sin(t.y), e = Math.cos(t.y), s = Math.cos(t.x), r = this.k0 * this.R2 / (1 + this.sinc0 * i + this.cosc0 * e * s), t.x = r * e * Math.sin(t.x), t.y = r * (this.cosc0 * i - this.sinc0 * e * s), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t
                }, e.inverse = function (t) {
                    var i, e, s, r, a;
                    if (t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, a = Math.sqrt(t.x * t.x + t.y * t.y)) {
                        var h = 2 * Math.atan2(a, this.R2);
                        i = Math.sin(h), e = Math.cos(h), r = Math.asin(e * this.sinc0 + t.y * i * this.cosc0 / a), s = Math.atan2(t.x * i, a * this.cosc0 * e - t.y * this.sinc0 * i)
                    } else r = this.phic0, s = 0;
                    return t.x = s, t.y = r, n.inverse.apply(this, [t]), t.x = o(t.x + this.long0), t
                }, e.names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative"]
            }, {"../common/adjust_lon": 5, "./gauss": 45}],
            61: [function (t, i, e) {
                var n = t("../common/e0fn"), o = t("../common/e1fn"), s = t("../common/e2fn"), r = t("../common/e3fn"), a = t("../common/mlfn"), h = t("../common/adjust_lon"), u = Math.PI / 2, l = 1e-10, c = t("../common/sign"), d = t("../common/asinz");
                e.init = function () {
                    this.e0 = n(this.es), this.e1 = o(this.es), this.e2 = s(this.es), this.e3 = r(this.es), this.ml0 = this.a * a(this.e0, this.e1, this.e2, this.e3, this.lat0)
                }, e.forward = function (t) {
                    var i, e, n, o = t.x, s = t.y, r = h(o - this.long0), u = Math.sin(s), l = Math.cos(s);
                    if (this.sphere) {
                        var c = l * Math.sin(r);
                        if (Math.abs(Math.abs(c) - 1) < 1e-10)return 93;
                        e = .5 * this.a * this.k0 * Math.log((1 + c) / (1 - c)), i = Math.acos(l * Math.cos(r) / Math.sqrt(1 - c * c)), 0 > s && (i = -i), n = this.a * this.k0 * (i - this.lat0)
                    } else {
                        var d = l * r, m = Math.pow(d, 2), p = this.ep2 * Math.pow(l, 2), f = Math.tan(s), _ = Math.pow(f, 2);
                        i = 1 - this.es * Math.pow(u, 2);
                        var v = this.a / Math.sqrt(i), g = this.a * a(this.e0, this.e1, this.e2, this.e3, s);
                        e = this.k0 * v * d * (1 + m / 6 * (1 - _ + p + m / 20 * (5 - 18 * _ + Math.pow(_, 2) + 72 * p - 58 * this.ep2))) + this.x0, n = this.k0 * (g - this.ml0 + v * f * (m * (.5 + m / 24 * (5 - _ + 9 * p + 4 * Math.pow(p, 2) + m / 30 * (61 - 58 * _ + Math.pow(_, 2) + 600 * p - 330 * this.ep2))))) + this.y0
                    }
                    return t.x = e, t.y = n, t
                }, e.inverse = function (t) {
                    var i, e, n, o, s, r, a = 6;
                    if (this.sphere) {
                        var m = Math.exp(t.x / (this.a * this.k0)), p = .5 * (m - 1 / m), f = this.lat0 + t.y / (this.a * this.k0), _ = Math.cos(f);
                        i = Math.sqrt((1 - _ * _) / (1 + p * p)), s = d(i), 0 > f && (s = -s), r = 0 === p && 0 === _ ? this.long0 : h(Math.atan2(p, _) + this.long0)
                    } else {
                        var v = t.x - this.x0, g = t.y - this.y0;
                        for (i = (this.ml0 + g / this.k0) / this.a, e = i, o = 0; !0 && (n = (i + this.e1 * Math.sin(2 * e) - this.e2 * Math.sin(4 * e) + this.e3 * Math.sin(6 * e)) / this.e0 - e, e += n, !(Math.abs(n) <= l)); o++)if (o >= a)return 95;
                        if (Math.abs(e) < u) {
                            var y = Math.sin(e), M = Math.cos(e), x = Math.tan(e), b = this.ep2 * Math.pow(M, 2), w = Math.pow(b, 2), T = Math.pow(x, 2), P = Math.pow(T, 2);
                            i = 1 - this.es * Math.pow(y, 2);
                            var C = this.a / Math.sqrt(i), k = C * (1 - this.es) / i, S = v / (C * this.k0), U = Math.pow(S, 2);
                            s = e - C * x * U / k * (.5 - U / 24 * (5 + 3 * T + 10 * b - 4 * w - 9 * this.ep2 - U / 30 * (61 + 90 * T + 298 * b + 45 * P - 252 * this.ep2 - 3 * w))), r = h(this.long0 + S * (1 - U / 6 * (1 + 2 * T + b - U / 20 * (5 - 2 * b + 28 * T - 3 * w + 8 * this.ep2 + 24 * P))) / M)
                        } else s = u * c(g), r = this.long0
                    }
                    return t.x = r, t.y = s, t
                }, e.names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"]
            }, {
                "../common/adjust_lon": 5,
                "../common/asinz": 6,
                "../common/e0fn": 7,
                "../common/e1fn": 8,
                "../common/e2fn": 9,
                "../common/e3fn": 10,
                "../common/mlfn": 14,
                "../common/sign": 21
            }],
            62: [function (t, i, e) {
                var n = .017453292519943295, o = t("./tmerc");
                e.dependsOn = "tmerc", e.init = function () {
                    this.zone && (this.lat0 = 0, this.long0 = (6 * Math.abs(this.zone) - 183) * n, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, o.init.apply(this), this.forward = o.forward, this.inverse = o.inverse)
                }, e.names = ["Universal Transverse Mercator System", "utm"]
            }, {"./tmerc": 61}],
            63: [function (t, i, e) {
                var n = t("../common/adjust_lon"), o = Math.PI / 2, s = 1e-10, r = t("../common/asinz");
                e.init = function () {
                    this.R = this.a
                }, e.forward = function (t) {
                    var i, e, a = t.x, h = t.y, u = n(a - this.long0);
                    Math.abs(h) <= s && (i = this.x0 + this.R * u, e = this.y0);
                    var l = r(2 * Math.abs(h / Math.PI));
                    (Math.abs(u) <= s || Math.abs(Math.abs(h) - o) <= s) && (i = this.x0, e = h >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * l) : this.y0 + Math.PI * this.R * -Math.tan(.5 * l));
                    var c = .5 * Math.abs(Math.PI / u - u / Math.PI), d = c * c, m = Math.sin(l), p = Math.cos(l), f = p / (m + p - 1), _ = f * f, v = f * (2 / m - 1), g = v * v, y = Math.PI * this.R * (c * (f - g) + Math.sqrt(d * (f - g) * (f - g) - (g + d) * (_ - g))) / (g + d);
                    0 > u && (y = -y), i = this.x0 + y;
                    var M = d + f;
                    return y = Math.PI * this.R * (v * M - c * Math.sqrt((g + d) * (d + 1) - M * M)) / (g + d), e = h >= 0 ? this.y0 + y : this.y0 - y, t.x = i, t.y = e, t
                }, e.inverse = function (t) {
                    var i, e, o, r, a, h, u, l, c, d, m, p, f;
                    return t.x -= this.x0, t.y -= this.y0, m = Math.PI * this.R, o = t.x / m, r = t.y / m, a = o * o + r * r, h = -Math.abs(r) * (1 + a), u = h - 2 * r * r + o * o, l = -2 * h + 1 + 2 * r * r + a * a, f = r * r / l + (2 * u * u * u / l / l / l - 9 * h * u / l / l) / 27, c = (h - u * u / 3 / l) / l, d = 2 * Math.sqrt(-c / 3), m = 3 * f / c / d, Math.abs(m) > 1 && (m = m >= 0 ? 1 : -1), p = Math.acos(m) / 3, e = t.y >= 0 ? (-d * Math.cos(p + Math.PI / 3) - u / 3 / l) * Math.PI : -(-d * Math.cos(p + Math.PI / 3) - u / 3 / l) * Math.PI, i = Math.abs(o) < s ? this.long0 : n(this.long0 + Math.PI * (a - 1 + Math.sqrt(1 + 2 * (o * o - r * r) + a * a)) / 2 / o), t.x = i, t.y = e, t
                }, e.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
            }, {"../common/adjust_lon": 5, "../common/asinz": 6}],
            64: [function (t, i, e) {
                var n = .017453292519943295, o = 57.29577951308232, s = 1, r = 2, a = t("./datum_transform"), h = t("./adjust_axis"), u = t("./Proj"), l = t("./common/toPoint");
                i.exports = function c(t, i, e) {
                    function d(t, i) {
                        return (t.datum.datum_type === s || t.datum.datum_type === r) && "WGS84" !== i.datumCode
                    }

                    var m;
                    return Array.isArray(e) && (e = l(e)), t.datum && i.datum && (d(t, i) || d(i, t)) && (m = new u("WGS84"), c(t, m, e), t = m), "enu" !== t.axis && h(t, !1, e), "longlat" === t.projName ? (e.x *= n, e.y *= n) : (t.to_meter && (e.x *= t.to_meter, e.y *= t.to_meter), t.inverse(e)), t.from_greenwich && (e.x += t.from_greenwich), e = a(t.datum, i.datum, e), i.from_greenwich && (e.x -= i.from_greenwich), "longlat" === i.projName ? (e.x *= o, e.y *= o) : (i.forward(e), i.to_meter && (e.x /= i.to_meter, e.y /= i.to_meter)), "enu" !== i.axis && h(i, !0, e), e
                }
            }, {"./Proj": 2, "./adjust_axis": 3, "./common/toPoint": 23, "./datum_transform": 30}],
            65: [function (t, i, e) {
                function n(t, i, e) {
                    t[i] = e.map(function (t) {
                        var i = {};
                        return o(t, i), i
                    }).reduce(function (t, i) {
                        return u(t, i)
                    }, {})
                }

                function o(t, i) {
                    var e;
                    return Array.isArray(t) ? (e = t.shift(), "PARAMETER" === e && (e = t.shift()), 1 === t.length ? Array.isArray(t[0]) ? (i[e] = {}, o(t[0], i[e])) : i[e] = t[0] : t.length ? "TOWGS84" === e ? i[e] = t : (i[e] = {}, ["UNIT", "PRIMEM", "VERT_DATUM"].indexOf(e) > -1 ? (i[e] = {
                                            name: t[0].toLowerCase(),
                                            convert: t[1]
                                        }, 3 === t.length && (i[e].auth = t[2])) : "SPHEROID" === e ? (i[e] = {
                                                name: t[0],
                                                a: t[1],
                                                rf: t[2]
                                            }, 4 === t.length && (i[e].auth = t[3])) : ["GEOGCS", "GEOCCS", "DATUM", "VERT_CS", "COMPD_CS", "LOCAL_CS", "FITTED_CS", "LOCAL_DATUM"].indexOf(e) > -1 ? (t[0] = ["name", t[0]], n(i, e, t)) : t.every(function (t) {
                                                    return Array.isArray(t)
                                                }) ? n(i, e, t) : o(t, i[e])) : i[e] = !0, void 0) : void(i[t] = !0)
                }

                function s(t, i) {
                    var e = i[0], n = i[1];
                    !(e in t) && n in t && (t[e] = t[n], 3 === i.length && (t[e] = i[2](t[e])))
                }

                function r(t) {
                    return t * h
                }

                function a(t) {
                    function i(i) {
                        var e = t.to_meter || 1;
                        return parseFloat(i, 10) * e
                    }

                    "GEOGCS" === t.type ? t.projName = "longlat" : "LOCAL_CS" === t.type ? (t.projName = "identity", t.local = !0) : "object" == typeof t.PROJECTION ? t.projName = Object.keys(t.PROJECTION)[0] : t.projName = t.PROJECTION, t.UNIT && (t.units = t.UNIT.name.toLowerCase(), "metre" === t.units && (t.units = "meter"), t.UNIT.convert && (t.to_meter = parseFloat(t.UNIT.convert, 10))), t.GEOGCS && (t.GEOGCS.DATUM ? t.datumCode = t.GEOGCS.DATUM.name.toLowerCase() : t.datumCode = t.GEOGCS.name.toLowerCase(), "d_" === t.datumCode.slice(0, 2) && (t.datumCode = t.datumCode.slice(2)), ("new_zealand_geodetic_datum_1949" === t.datumCode || "new_zealand_1949" === t.datumCode) && (t.datumCode = "nzgd49"), "wgs_1984" === t.datumCode && ("Mercator_Auxiliary_Sphere" === t.PROJECTION && (t.sphere = !0), t.datumCode = "wgs84"), "_ferro" === t.datumCode.slice(-6) && (t.datumCode = t.datumCode.slice(0, -6)), "_jakarta" === t.datumCode.slice(-8) && (t.datumCode = t.datumCode.slice(0, -8)), ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"), t.GEOGCS.DATUM && t.GEOGCS.DATUM.SPHEROID && (t.ellps = t.GEOGCS.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === t.ellps.toLowerCase().slice(0, 13) && (t.ellps = "intl"), t.a = t.GEOGCS.DATUM.SPHEROID.a, t.rf = parseFloat(t.GEOGCS.DATUM.SPHEROID.rf, 10))), t.b && !isFinite(t.b) && (t.b = t.a);
                    var e = function (i) {
                        return s(t, i)
                    }, n = [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", r], ["longitude_of_center", "Longitude_Of_Center"], ["longc", "longitude_of_center", r], ["x0", "false_easting", i], ["y0", "false_northing", i], ["long0", "central_meridian", r], ["lat0", "latitude_of_origin", r], ["lat0", "standard_parallel_1", r], ["lat1", "standard_parallel_1", r], ["lat2", "standard_parallel_2", r], ["alpha", "azimuth", r], ["srsCode", "name"]];
                    n.forEach(e), t.long0 || !t.longc || "Albers_Conic_Equal_Area" !== t.PROJECTION && "Lambert_Azimuthal_Equal_Area" !== t.PROJECTION || (t.long0 = t.longc)
                }

                var h = .017453292519943295, u = t("./extend");
                i.exports = function (t, i) {
                    var e = JSON.parse(("," + t).replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",').slice(1).replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]')), n = e.shift(), s = e.shift();
                    e.unshift(["name", s]), e.unshift(["type", n]), e.unshift("output");
                    var r = {};
                    return o(e, r), a(r.output), u(i, r.output)
                }
            }, {"./extend": 33}],
            66: [function (t, i, e) {
                function n(t) {
                    return t * (Math.PI / 180)
                }

                function o(t) {
                    return 180 * (t / Math.PI)
                }

                function s(t) {
                    var i, e, o, s, r, h, u, l, c, d = t.lat, m = t.lon, p = 6378137, f = .00669438, _ = .9996, v = n(d), g = n(m);
                    c = Math.floor((m + 180) / 6) + 1, 180 === m && (c = 60), d >= 56 && 64 > d && m >= 3 && 12 > m && (c = 32), d >= 72 && 84 > d && (m >= 0 && 9 > m ? c = 31 : m >= 9 && 21 > m ? c = 33 : m >= 21 && 33 > m ? c = 35 : m >= 33 && 42 > m && (c = 37)), i = 6 * (c - 1) - 180 + 3, l = n(i), e = f / (1 - f), o = p / Math.sqrt(1 - f * Math.sin(v) * Math.sin(v)), s = Math.tan(v) * Math.tan(v), r = e * Math.cos(v) * Math.cos(v), h = Math.cos(v) * (g - l), u = p * ((1 - f / 4 - 3 * f * f / 64 - 5 * f * f * f / 256) * v - (3 * f / 8 + 3 * f * f / 32 + 45 * f * f * f / 1024) * Math.sin(2 * v) + (15 * f * f / 256 + 45 * f * f * f / 1024) * Math.sin(4 * v) - 35 * f * f * f / 3072 * Math.sin(6 * v));
                    var y = _ * o * (h + (1 - s + r) * h * h * h / 6 + (5 - 18 * s + s * s + 72 * r - 58 * e) * h * h * h * h * h / 120) + 5e5, M = _ * (u + o * Math.tan(v) * (h * h / 2 + (5 - s + 9 * r + 4 * r * r) * h * h * h * h / 24 + (61 - 58 * s + s * s + 600 * r - 330 * e) * h * h * h * h * h * h / 720));
                    return 0 > d && (M += 1e7), {
                        northing: Math.round(M),
                        easting: Math.round(y),
                        zoneNumber: c,
                        zoneLetter: a(d)
                    }
                }

                function r(t) {
                    var i = t.northing, e = t.easting, n = t.zoneLetter, s = t.zoneNumber;
                    if (0 > s || s > 60)return null;
                    var a, h, u, l, c, d, m, p, f, _, v = .9996, g = 6378137, y = .00669438, M = (1 - Math.sqrt(1 - y)) / (1 + Math.sqrt(1 - y)), x = e - 5e5, b = i;
                    "N" > n && (b -= 1e7), p = 6 * (s - 1) - 180 + 3, a = y / (1 - y), m = b / v, f = m / (g * (1 - y / 4 - 3 * y * y / 64 - 5 * y * y * y / 256)), _ = f + (3 * M / 2 - 27 * M * M * M / 32) * Math.sin(2 * f) + (21 * M * M / 16 - 55 * M * M * M * M / 32) * Math.sin(4 * f) + 151 * M * M * M / 96 * Math.sin(6 * f), h = g / Math.sqrt(1 - y * Math.sin(_) * Math.sin(_)), u = Math.tan(_) * Math.tan(_), l = a * Math.cos(_) * Math.cos(_), c = g * (1 - y) / Math.pow(1 - y * Math.sin(_) * Math.sin(_), 1.5), d = x / (h * v);
                    var w = _ - h * Math.tan(_) / c * (d * d / 2 - (5 + 3 * u + 10 * l - 4 * l * l - 9 * a) * d * d * d * d / 24 + (61 + 90 * u + 298 * l + 45 * u * u - 252 * a - 3 * l * l) * d * d * d * d * d * d / 720);
                    w = o(w);
                    var T = (d - (1 + 2 * u + l) * d * d * d / 6 + (5 - 2 * l + 28 * u - 3 * l * l + 8 * a + 24 * u * u) * d * d * d * d * d / 120) / Math.cos(_);
                    T = p + o(T);
                    var P;
                    if (t.accuracy) {
                        var C = r({
                            northing: t.northing + t.accuracy,
                            easting: t.easting + t.accuracy,
                            zoneLetter: t.zoneLetter,
                            zoneNumber: t.zoneNumber
                        });
                        P = {top: C.lat, right: C.lon, bottom: w, left: T}
                    } else P = {lat: w, lon: T};
                    return P
                }

                function a(t) {
                    var i = "Z";
                    return 84 >= t && t >= 72 ? i = "X" : 72 > t && t >= 64 ? i = "W" : 64 > t && t >= 56 ? i = "V" : 56 > t && t >= 48 ? i = "U" : 48 > t && t >= 40 ? i = "T" : 40 > t && t >= 32 ? i = "S" : 32 > t && t >= 24 ? i = "R" : 24 > t && t >= 16 ? i = "Q" : 16 > t && t >= 8 ? i = "P" : 8 > t && t >= 0 ? i = "N" : 0 > t && t >= -8 ? i = "M" : -8 > t && t >= -16 ? i = "L" : -16 > t && t >= -24 ? i = "K" : -24 > t && t >= -32 ? i = "J" : -32 > t && t >= -40 ? i = "H" : -40 > t && t >= -48 ? i = "G" : -48 > t && t >= -56 ? i = "F" : -56 > t && t >= -64 ? i = "E" : -64 > t && t >= -72 ? i = "D" : -72 > t && t >= -80 && (i = "C"), i
                }

                function h(t, i) {
                    var e = "" + t.easting, n = "" + t.northing;
                    return t.zoneNumber + t.zoneLetter + u(t.easting, t.northing, t.zoneNumber) + e.substr(e.length - 5, i) + n.substr(n.length - 5, i)
                }

                function u(t, i, e) {
                    var n = l(e), o = Math.floor(t / 1e5), s = Math.floor(i / 1e5) % 20;
                    return c(o, s, n)
                }

                function l(t) {
                    var i = t % _;
                    return 0 === i && (i = _), i
                }

                function c(t, i, e) {
                    var n = e - 1, o = v.charCodeAt(n), s = g.charCodeAt(n), r = o + t - 1, a = s + i, h = !1;
                    r > w && (r = r - w + y - 1, h = !0), (r === M || M > o && r > M || (r > M || M > o) && h) && r++, (r === x || x > o && r > x || (r > x || x > o) && h) && (r++, r === M && r++), r > w && (r = r - w + y - 1), a > b ? (a = a - b + y - 1, h = !0) : h = !1, (a === M || M > s && a > M || (a > M || M > s) && h) && a++, (a === x || x > s && a > x || (a > x || x > s) && h) && (a++, a === M && a++), a > b && (a = a - b + y - 1);
                    var u = String.fromCharCode(r) + String.fromCharCode(a);
                    return u
                }

                function d(t) {
                    if (t && 0 === t.length)throw"MGRSPoint coverting from nothing";
                    for (var i, e = t.length, n = null, o = "", s = 0; !/[A-Z]/.test(i = t.charAt(s));) {
                        if (s >= 2)throw"MGRSPoint bad conversion from: " + t;
                        o += i, s++
                    }
                    var r = parseInt(o, 10);
                    if (0 === s || s + 3 > e)throw"MGRSPoint bad conversion from: " + t;
                    var a = t.charAt(s++);
                    if ("A" >= a || "B" === a || "Y" === a || a >= "Z" || "I" === a || "O" === a)throw"MGRSPoint zone letter " + a + " not handled: " + t;
                    n = t.substring(s, s += 2);
                    for (var h = l(r), u = m(n.charAt(0), h), c = p(n.charAt(1), h); c < f(a);)c += 2e6;
                    var d = e - s;
                    if (d % 2 !== 0)throw"MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + t;
                    var _, v, g, y, M, x = d / 2, b = 0, w = 0;
                    return x > 0 && (_ = 1e5 / Math.pow(10, x), v = t.substring(s, s + x), b = parseFloat(v) * _, g = t.substring(s + x), w = parseFloat(g) * _), y = b + u, M = w + c, {
                        easting: y,
                        northing: M,
                        zoneLetter: a,
                        zoneNumber: r,
                        accuracy: _
                    }
                }

                function m(t, i) {
                    for (var e = v.charCodeAt(i - 1), n = 1e5, o = !1; e !== t.charCodeAt(0);) {
                        if (e++, e === M && e++, e === x && e++, e > w) {
                            if (o)throw"Bad character: " + t;
                            e = y, o = !0
                        }
                        n += 1e5
                    }
                    return n
                }

                function p(t, i) {
                    if (t > "V")throw"MGRSPoint given invalid Northing " + t;
                    for (var e = g.charCodeAt(i - 1), n = 0, o = !1; e !== t.charCodeAt(0);) {
                        if (e++, e === M && e++, e === x && e++, e > b) {
                            if (o)throw"Bad character: " + t;
                            e = y, o = !0
                        }
                        n += 1e5
                    }
                    return n
                }

                function f(t) {
                    var i;
                    switch (t) {
                        case"C":
                            i = 11e5;
                            break;
                        case"D":
                            i = 2e6;
                            break;
                        case"E":
                            i = 28e5;
                            break;
                        case"F":
                            i = 37e5;
                            break;
                        case"G":
                            i = 46e5;
                            break;
                        case"H":
                            i = 55e5;
                            break;
                        case"J":
                            i = 64e5;
                            break;
                        case"K":
                            i = 73e5;
                            break;
                        case"L":
                            i = 82e5;
                            break;
                        case"M":
                            i = 91e5;
                            break;
                        case"N":
                            i = 0;
                            break;
                        case"P":
                            i = 8e5;
                            break;
                        case"Q":
                            i = 17e5;
                            break;
                        case"R":
                            i = 26e5;
                            break;
                        case"S":
                            i = 35e5;
                            break;
                        case"T":
                            i = 44e5;
                            break;
                        case"U":
                            i = 53e5;
                            break;
                        case"V":
                            i = 62e5;
                            break;
                        case"W":
                            i = 7e6;
                            break;
                        case"X":
                            i = 79e5;
                            break;
                        default:
                            i = -1
                    }
                    if (i >= 0)return i;
                    throw"Invalid zone letter: " + t
                }

                var _ = 6, v = "AJSAJS", g = "AFAFAF", y = 65, M = 73, x = 79, b = 86, w = 90;
                e.forward = function (t, i) {
                    return i = i || 5, h(s({lat: t[1], lon: t[0]}), i)
                }, e.inverse = function (t) {
                    var i = r(d(t.toUpperCase()));
                    return [i.left, i.bottom, i.right, i.top]
                }, e.toPoint = function (t) {
                    var i = e.inverse(t);
                    return [(i[2] + i[0]) / 2, (i[3] + i[1]) / 2]
                }
            }, {}],
            67: [function (t, i, e) {
                i.exports = {
                    name: "proj4",
                    version: "2.1.3-alpha",
                    description: "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
                    main: "lib/index.js",
                    directories: {test: "test", doc: "docs"},
                    scripts: {test: "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"},
                    repository: {type: "git", url: "git://github.com/proj4js/proj4js.git"},
                    author: "",
                    license: "MIT",
                    jam: {main: "dist/proj4.js", include: ["dist/proj4.js", "README.md", "AUTHORS", "LICENSE.md"]},
                    devDependencies: {
                        "grunt-cli": "~0.1.13",
                        grunt: "~0.4.2",
                        "grunt-contrib-connect": "~0.6.0",
                        "grunt-contrib-jshint": "~0.8.0",
                        chai: "~1.8.1",
                        mocha: "~1.17.1",
                        "grunt-mocha-phantomjs": "~0.4.0",
                        browserify: "~3.24.5",
                        "grunt-browserify": "~1.3.0",
                        "grunt-contrib-uglify": "~0.3.2",
                        curl: "git://github.com/cujojs/curl.git",
                        istanbul: "~0.2.4",
                        tin: "~0.4.0"
                    },
                    dependencies: {mgrs: "0.0.0"}
                }
            }, {}],
            VzEyzV: [function (t, i, e) {
                var n = [t("./lib/projections/tmerc"), t("./lib/projections/utm"), t("./lib/projections/sterea"), t("./lib/projections/stere"), t("./lib/projections/somerc"), t("./lib/projections/omerc"), t("./lib/projections/lcc"), t("./lib/projections/krovak"), t("./lib/projections/cass"), t("./lib/projections/laea"), t("./lib/projections/aea"), t("./lib/projections/gnom"), t("./lib/projections/cea"), t("./lib/projections/eqc"), t("./lib/projections/poly"), t("./lib/projections/nzmg"), t("./lib/projections/mill"), t("./lib/projections/sinu"), t("./lib/projections/moll"), t("./lib/projections/eqdc"), t("./lib/projections/vandg"), t("./lib/projections/aeqd")];
                i.exports = function (t) {
                    n.forEach(function (i) {
                        t.Proj.projections.add(i)
                    })
                }
            }, {
                "./lib/projections/aea": 39,
                "./lib/projections/aeqd": 40,
                "./lib/projections/cass": 41,
                "./lib/projections/cea": 42,
                "./lib/projections/eqc": 43,
                "./lib/projections/eqdc": 44,
                "./lib/projections/gnom": 46,
                "./lib/projections/krovak": 47,
                "./lib/projections/laea": 48,
                "./lib/projections/lcc": 49,
                "./lib/projections/mill": 52,
                "./lib/projections/moll": 53,
                "./lib/projections/nzmg": 54,
                "./lib/projections/omerc": 55,
                "./lib/projections/poly": 56,
                "./lib/projections/sinu": 57,
                "./lib/projections/somerc": 58,
                "./lib/projections/stere": 59,
                "./lib/projections/sterea": 60,
                "./lib/projections/tmerc": 61,
                "./lib/projections/utm": 62,
                "./lib/projections/vandg": 63
            }],
            "./includedProjections": [function (t, i, e) {
                i.exports = t("VzEyzV")
            }, {}]
        }, {}, [35])(35)
    }), r.Projection.Proj = r.Class.extend({
        initialize: function (t, i) {
            if (r.Projection._isProj4Obj(t)) this._proj = t; else {
                var n = t;
                if (i) proj4.defs[r.UTMK.PROJ_CODE] === e && proj4.defs(r.UTMK.PROJ_CODE, r.UTMK.PROJ_DEF), proj4.defs(n, i); else if (proj4.defs[n] === e) {
                    var o = n.split(":");
                    if (o.length > 3 && (n = o[o.length - 3] + ":" + o[o.length - 1]), proj4.defs[n] === e)throw"No projection definition for code " + n
                }
                this._proj = proj4(r.UTMK.PROJ_CODE, n)
            }
        }, project: function (t) {
            var i = this._proj.forward([t.x, t.y]);
            return new r.Point(i[0], i[1])
        }, unproject: function (t, i) {
            var e = this._proj.inverse([t.x, t.y]);
            return new r.UTMK(e[0], e[1], i)
        }
    }), r.Projection._isProj4Obj = function (t) {
        return "undefined" != typeof t.inverse && "undefined" != typeof t.forward
    }, r.Projection.ScaleDependantTransformation = function (t) {
        this.scaleTransforms = t
    }, r.Projection.ScaleDependantTransformation.prototype.transform = function (t, i) {
        return this.scaleTransforms[i].transform(t, i)
    }, r.Projection.ScaleDependantTransformation.prototype.untransform = function (t, i) {
        return this.scaleTransforms[i].untransform(t, i)
    }, r.CRS.Proj = r.Class.extend({
        includes: r.CRS,
        options: {transformation: new r.Transformation(1, 0, -1, 0)},
        initialize: function (t, i, e) {
            var n;
            if (r.Projection._isProj4Obj(t) ? (n = t, i = n.srcCode, this.projection = new r.Projection.Proj(n)) : this.projection = new r.Projection.Proj(t, i), e = e || {}, r.Util.setOptions(this, e), this.code = t, this.transformation = this.options.transformation, this.projection.bounds = this.options.bounds, this.options.origin && (this.transformation = new r.Transformation(1, -this.options.origin[0], -1, this.options.origin[1])), this.options.scales) this._scales = this.options.scales; else if (this.options.resolutions) {
                this._scales = [];
                for (var o = this.options.resolutions.length - 1; o >= 0; o--)this.options.resolutions[o] && (this._scales[o] = 1 / this.options.resolutions[o])
            }
        },
        scale: function (t) {
            return this._scales[t]
        },
        getSize: function (t) {
            var i, e, n, o = this.options.bounds;
            return o ? (i = this.scale(t), e = this.transformation.transform(o.min, i), n = this.transformation.transform(o.max, i), r.point(Math.abs(n.x - e.x), Math.abs(n.y - e.y))) : (i = 256 * Math.pow(2, t), r.point(i, i))
        }
    }), r.CRS.Proj.TMS = r.CRS.Proj.extend({
        options: {tileSize: 256}, initialize: function (t, i, e, n) {
            var o, s, a, h, u;
            r.Projection._isProj4Obj(t) ? (a = t, h = i, u = e || {}, u.origin = [h[0], h[3]], r.CRS.Proj.prototype.initialize.call(this, a, u)) : (o = t, s = i, h = e, u = n || {}, u.origin = [h[0], h[3]], r.CRS.Proj.prototype.initialize.call(this, o, s, u)), this.projectedBounds = h, this.projection.bounds = r.bounds([h[0], h[1]], [h[2], h[3]]), this._sizes = this._calculateSizes()
        }, _calculateSizes: function () {
            var t, i, e, n, o = [], s = this.projectedBounds;
            for (i = this._scales.length - 1; i >= 0; i--)this._scales[i] && (t = this.options.tileSize / this._scales[i], e = Math.ceil(parseFloat((s[2] - s[0]) / t).toPrecision(3)) * t * this._scales[i], n = Math.ceil(parseFloat((s[3] - s[1]) / t).toPrecision(3)) * t * this._scales[i], o[i] = r.point(e, n));
            return o
        }, getSize: function (t) {
            return this._sizes[t]
        }
    }), r.Ajax = r.Class.extend({
        version: "2.0-dev", initialize: function () {
            var t, i = ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            this.cancel = !1, this.async = !0;
            var e;
            if (r.Util.isUndefined(e))if (r.Browser.xhr) e = new XMLHttpRequest; else for (t = 0; t < i.length; t += 1)try {
                e = new ActiveXObject(i[t]);
                break
            } catch (n) {
            }
            r.Util.isUndefined(this.heads) && (this.heads = {}), r.Util.isUndefined(this.params) && (this.params = {}), this.xhr = e
        }, clear: function () {
            var t, i;
            for (t in this.heads)this.heads.hasOwnProperty(t) && delete this.heads[t];
            for (i in this.params)this.params.hasOwnProperty(i) && delete this.params[i];
            this.cancel = !1
        }, addHeader: function (t, i) {
            r.Util.isUndefined(this.heads) && (this.heads = this.heads || {}), this.heads[t] = i
        }, addParam: function (t, i) {
            r.Util.isUndefined(this.params) && (this.params = this.params || {}), this.params[t] = i
        }, request: function (t) {
            var i, e, n, o = "", s = this, a = t.url;
            if (this.cancel = !1, r.Util.isUndefined(t) && (t = {}), r.Util.isUndefined(a))throw new Error("url undefinded");
            n = r.Util.isUndefined(t.method) ? "GET" : t.method, this.async = r.Util.isUndefined(t.async) ? !0 : t.async, this.format = r.Util.isUndefined(t.format) ? "json" : t.format;
            for (e in this.params)this.params.hasOwnProperty(e) && (o += e + "=" + this.params[e] + "&");
            o.length > 1 && (o = o.slice(0, o.length - 1)), r.Browser.ielt9 && "GET" === n && (this.xhr = new XDomainRequest, this.xhr.onload = function () {
                "json" === s.format ? s.onSuccess(h.status, JSON.parse(h.responseText)) : s.onSuccess(h.status, h.responseText)
            }, this.xhr.onerror = function () {
                s.onFail(h.responseText)
            });
            var h = this.xhr;
            if (r.Browser.safari && (h = new XMLHttpRequest), h.onreadystatechange = function () {
                    s.cancel || (4 === h.readyState ? 200 === h.status ? "json" === s.format ? s.onSuccess(this.status, JSON.parse(h.responseText)) : "xml" === s.format ? s.onSuccess(this.status, h.responseXML) : s.onSuccess(this.status, h.responseText) : 204 === this.status ? s.onSuccess(h.status) : s.onFail(h.status) : 0 === h.readyState ? s.onNotInitialized() : 1 === h.readyState ? s.onEstablished() : 2 === h.readyState ? s.noReceived() : 3 === h.readyState && s.onProcessing())
                }, "POST" === n || "PUT" === n) {
                h.open(n, a, !0), h.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                for (i in this.heads)this.heads.hasOwnProperty(i) && h.setRequestHeader(i, this.heads[i]);
                h.send(o)
            } else {
                o.length > 0 && (a += "?" + o), h.open(n, a, !0);
                for (i in this.heads)this.heads.hasOwnProperty(i) && h.setRequestHeader(i, this.heads[i]);
                h.send()
            }
        }, onSuccess: function (t, i) {
        }, onFail: function (t) {
        }, onNotInitialized: function () {
        }, onEstablished: function () {
        }, noReceived: function () {
        }, onProcessing: function () {
        }, onCancel: function () {
        }
    }), r.Api = r.Ajax.extend({
        url: "",
        host: "//sgisapi.kostat.go.kr",
        port: "",
        context: "",
        isAccessToken: !0,
        initialize: function (t) {
            if (r.Util.isUndefined(t))throw new Error("Check opt Parameter");
            r.Ajax.prototype.initialize.call(this), t.datatype = r.Util.isUndefined(t.datatype) ? "json" : t.datatype, t.url = this.host + ":" + this.port + "/" + this.context + this.url + "." + t.datatype, r.Util.isUndefined(t.success) || (this.callbackSucesssFunc = t.success), r.Util.isUndefined(t.fail) || (this.callbackFailFunc = t.fail), this.execute(t)
        },
        execute: function (t) {
            var i, e, n = this;
            if (n.clear(), this.isAccessToken) {
                if (r.Util.isUndefined(t.accessToken))throw new Error("access Token undefined");
                n.addParam("accessToken", t.accessToken)
            }
            if ("geojson" === t.datatype || "json" === t.datatype) t.format = "json"; else {
                if ("kml" !== t.datatype && "xml" !== t.datatype)throw new Error("Check Ajax datatype");
                t.format = "xml"
            }
            if (!r.Util.isUndefined(t.param))for (i in t.param)n.addParam(i, t.param[i]);
            if (!r.Util.isUndefined(t.heaader))for (e in t.heaader)n.addHeader(e, t.heaader[e]);
            n.request(t)
        },
        onSuccess: function (t, i) {
            this.callbackSucesssFunc(t, i)
        },
        onFail: function (t) {
            this.callbackFailFunc(t)
        },
        callbackSucesssFunc: function (t, i) {
        },
        callbackFailFunc: function (t) {
        }
    }), r.api = {}, r.Api.Authentication = r.Api.extend({
        url: "/OpenAPI3/auth/authentication",
        isAccessToken: !1
    }), r.api.authentication = function (t) {
        return new r.Api.Authentication(t)
    }, r.Api.Stats = {}, r.api.stats = {}, r.Api.Stats.Population = r.Api.extend({url: "/OpenAPI3/stats/population"}), r.api.stats.population = function (t) {
        return new r.Api.Stats.Population(t)
    }, r.Api.Stats.SearchPopulation = r.Api.extend({url: "/OpenAPI3/stats/searchpopulation"}), r.api.stats.searchPopulation = function (t) {
        return new r.Api.Stats.SearchPopulation(t)
    }, r.Api.Stats.Industrycode = r.Api.extend({url: "/OpenAPI3/stats/industrycode"}), r.api.stats.industrycode = function (t) {
        return new r.Api.Stats.Industrycode(t)
    }, r.Api.Stats.Company = r.Api.extend({url: "/OpenAPI3/stats/company"}), r.api.stats.company = function (t) {
        return new r.Api.Stats.Company(t)
    }, r.Api.Stats.Household = r.Api.extend({url: "/OpenAPI3/stats/household"}), r.api.stats.household = function (t) {
        return new r.Api.Stats.Household(t)
    }, r.Api.Stats.House = r.Api.extend({url: "/OpenAPI3/stats/house"}), r.api.stats.house = function (t) {
        return new r.Api.Stats.House(t)
    }, r.Api.Stats.FarmHousehold = r.Api.extend({url: "/OpenAPI3/stats/farmhousehold"}), r.api.stats.farmhousehold = function (t) {
        return new r.Api.Stats.FarmHousehold(t)
    }, r.Api.Stats.ForestryHousehold = r.Api.extend({url: "/OpenAPI3/stats/forestryhousehold"}), r.api.stats.forestryhousehold = function (t) {
        return new r.Api.Stats.ForestryHousehold(t)
    }, r.Api.Stats.FisheryHousehold = r.Api.extend({url: "/OpenAPI3/stats/fisheryhousehold"}), r.api.stats.fisheryhousehold = function (t) {
        return new r.Api.Stats.FisheryHousehold(t)
    }, r.Api.Stats.HouseholdMember = r.Api.extend({url: "/OpenAPI3/stats/householdmember"}), r.api.stats.householdmember = function (t) {
        return new r.Api.Stats.HouseholdMember(t)
    }, r.Api.Boundary = {}, r.api.boundary = {}, r.Api.Boundary.Hadmarea = r.Api.extend({url: "/OpenAPI3/boundary/hadmarea"}), r.api.boundary.hadmarea = function (t) {
        return new r.Api.Boundary.Hadmarea(t)
    }, r.Api.Boundary.Statsarea = r.Api.extend({url: "/OpenAPI3/boundary/statsarea"}), r.api.boundary.statsarea = function (t) {
        return new r.Api.Boundary.Statsarea(t)
    }, r.Api.Boundary.Basearea = r.Api.extend({url: "/OpenAPI3/boundary/basearea"}), r.api.boundary.basearea = function (t) {
        return new r.Api.Boundary.Basearea(t)
    }, r.Api.Boundary.Userarea = r.Api.extend({url: "/OpenAPI3/boundary/userarea"}), r.api.boundary.userarea = function (t) {
        return new r.Api.Boundary.Userarea(t)
    }, r.LatLng = function (t, i) {
        if (isNaN(t) || isNaN(i))throw new Error("Invalid LatLng object: (" + t + ", " + i + ")");
        this.lat = +t, this.lng = +i;
        var n = r.UTMK.PROJ_CODE, o = r.UTMK.PROJ_DEF;
        proj4.defs[n] === e && proj4.defs(n, o);
        var s = proj4(n).forward([this.lng, this.lat]);
        r.UTMK.call(this, s[0], s[1]), this.toString = function (t) {
            var i = "UTMK(" + r.Util.formatNum(this.x, t) + ", " + r.Util.formatNum(this.y, t) + ")";
            return i += " LatLng(" + this.lat + ", " + this.lng + ")"
        }
    }, r.LatLng.prototype = r.UTMK.prototype, r.MarkerClusterGroup = r.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        }, initialize: function (t) {
            r.Util.setOptions(this, t), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = r.featureGroup();
            var i = "click dbclick mouseover mouseout mousemove contextmenu popupopen popupclose";
            this._featureGroup.on(r.FeatureGroup.EVENTS || i, this._propagateEvent, this), this._nonPointGroup = r.featureGroup(), this._nonPointGroup.on(r.FeatureGroup.EVENTS || i, this._propagateEvent, this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = []
        }, addLayer: function (t) {
            if (t instanceof r.LayerGroup) {
                var i = [];
                for (var e in t._layers)i.push(t._layers[e]);
                return this.addLayers(i)
            }
            if (!t.getUTMK)return this._nonPointGroup.addLayer(t), this;
            if (!this._map)return this._needsClustering.push(t), this;
            if (this.hasLayer(t))return this;
            this._unspiderfy && this._unspiderfy(), this._addLayer(t, this._maxZoom);
            var n = t, o = this._map.getZoom();
            if (t.__parent)for (; n.__parent._zoom >= o;)n = n.__parent;
            return this._currentShownBounds.contains(n.getUTMK()) && (this.options.animateAddingMarkers ? this._animationAddLayer(t, n) : this._animationAddLayerNonAnimated(t, n)), this
        }, removeLayer: function (t) {
            if (t instanceof r.LayerGroup) {
                var i = [];
                for (var e in t._layers)i.push(t._layers[e]);
                return this.removeLayers(i)
            }
            return t.getUTMK ? this._map ? t.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(t)), this._removeLayer(t, !0), this._featureGroup.hasLayer(t) && (this._featureGroup.removeLayer(t), t.setOpacity && t.setOpacity(1)), this) : this : (!this._arraySplice(this._needsClustering, t) && this.hasLayer(t) && this._needsRemoving.push(t), this) : (this._nonPointGroup.removeLayer(t), this)
        }, addLayers: function (t) {
            var i, e, n, o, s = this._featureGroup, a = this._nonPointGroup, h = this.options.chunkedLoading, u = this.options.chunkInterval, l = this.options.chunkProgress;
            if (this._map) {
                var c = 0, d = (new Date).getTime(), m = r.bind(function () {
                    for (var i = (new Date).getTime(); c < t.length; c++) {
                        if (h && c % 200 === 0) {
                            var e = (new Date).getTime() - i;
                            if (e > u)break
                        }
                        if (o = t[c], o.getUTMK) {
                            if (!this.hasLayer(o) && (this._addLayer(o, this._maxZoom), o.__parent && 2 === o.__parent.getChildCount())) {
                                var n = o.__parent.getAllChildMarkers(), p = n[0] === o ? n[1] : n[0];
                                s.removeLayer(p)
                            }
                        } else a.addLayer(o)
                    }
                    l && l(c, t.length, (new Date).getTime() - d), c === t.length ? (this._featureGroup.eachLayer(function (t) {
                            t instanceof r.MarkerCluster && t._iconNeedsUpdate && t._updateIcon()
                        }), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(m, this.options.chunkDelay)
                }, this);
                m()
            } else {
                for (i = [], e = 0, n = t.length; n > e; e++)o = t[e], o.getUTMK ? this.hasLayer(o) || i.push(o) : a.addLayer(o);
                this._needsClustering = this._needsClustering.concat(i)
            }
            return this
        }, removeLayers: function (t) {
            var i, e, n, o = this._featureGroup, s = this._nonPointGroup;
            if (!this._map) {
                for (i = 0, e = t.length; e > i; i++)n = t[i], this._arraySplice(this._needsClustering, n), s.removeLayer(n);
                return this
            }
            for (i = 0, e = t.length; e > i; i++)n = t[i], n.__parent ? (this._removeLayer(n, !0, !0), o.hasLayer(n) && (o.removeLayer(n), n.setOpacity && n.setOpacity(1))) : s.removeLayer(n);
            return this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), o.eachLayer(function (t) {
                t instanceof r.MarkerCluster && t._updateIcon()
            }), this
        }, clearLayers: function () {
            return this._map || (this._needsClustering = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function (t) {
                delete t.__parent
            }), this._map && this._generateInitialClusters(), this
        }, getBounds: function () {
            var t = new r.UTMKBounds;
            this._topClusterLevel && t.extend(this._topClusterLevel._bounds);
            for (var i = this._needsClustering.length - 1; i >= 0; i--)t.extend(this._needsClustering[i].getUTMK());
            return t.extend(this._nonPointGroup.getBounds()), t
        }, eachLayer: function (t, i) {
            var e, n = this._needsClustering.slice();
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(n), e = n.length - 1; e >= 0; e--)t.call(i, n[e]);
            this._nonPointGroup.eachLayer(t, i)
        }, getLayers: function () {
            var t = [];
            return this.eachLayer(function (i) {
                t.push(i)
            }), t
        }, getLayer: function (t) {
            var i = null;
            return this.eachLayer(function (e) {
                r.stamp(e) === t && (i = e)
            }), i
        }, hasLayer: function (t) {
            if (!t)return !1;
            var i, e = this._needsClustering;
            for (i = e.length - 1; i >= 0; i--)if (e[i] === t)return !0;
            for (e = this._needsRemoving, i = e.length - 1; i >= 0; i--)if (e[i] === t)return !1;
            return !(!t.__parent || t.__parent._group !== this) || this._nonPointGroup.hasLayer(t)
        }, zoomToShowLayer: function (t, i) {
            var e = function () {
                if ((t._icon || t.__parent._icon) && !this._inZoomAnimation)if (this._map.off("moveend", e, this), this.off("animationend", e, this), t._icon) i(); else if (t.__parent._icon) {
                    var n = function () {
                        this.off("spiderfied", n, this), i()
                    };
                    this.on("spiderfied", n, this), t.__parent.spiderfy()
                }
            };
            if (t._icon && this._map.getBounds().contains(t.getUTMK())) i(); else if (t.__parent._zoom < this._map.getZoom()) this._map.on("moveend", e, this), this._map.panTo(t.getUTMK()); else {
                var n = function () {
                    this._map.off("movestart", n, this), n = null
                };
                this._map.on("movestart", n, this), this._map.on("moveend", e, this), this.on("animationend", e, this), t.__parent.zoomToBounds(), n && e.call(this)
            }
        }, onAdd: function (t) {
            this._map = t;
            var i, e, n;
            if (!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";
            for (t.addLayer(this._featureGroup), t.addLayer(this._nonPointGroup), this._gridClusters || this._generateInitialClusters(), i = 0, e = this._needsRemoving.length; e > i; i++)n = this._needsRemoving[i], this._removeLayer(n, !0);
            this._needsRemoving = [], this._zoom = this._map.getZoom(), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), e = this._needsClustering,
                this._needsClustering = [], this.addLayers(e)
        }, onRemove: function (t) {
            t.off("zoomend", this._zoomEnd, this), t.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" sop-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), this._hideCoverage(), this._featureGroup.onRemove(t), this._nonPointGroup.onRemove(t), this._featureGroup.clearLayers(), this._map = null
        }, getVisibleParent: function (t) {
            for (var i = t; i && !i._icon;)i = i.__parent;
            return i || null
        }, _arraySplice: function (t, i) {
            for (var e = t.length - 1; e >= 0; e--)if (t[e] === i)return t.splice(e, 1), !0
        }, _removeLayer: function (t, i, e) {
            var n = this._gridClusters, o = this._gridUnclustered, s = this._featureGroup, r = this._map;
            if (i)for (var a = this._maxZoom; a >= 0 && o[a].removeObject(t, r.project(t.getUTMK(), a)); a--);
            var h, u = t.__parent, l = u._markers;
            for (this._arraySplice(l, t); u && (u._childCount--, !(u._zoom < 0));)i && u._childCount <= 1 ? (h = u._markers[0] === t ? u._markers[1] : u._markers[0], n[u._zoom].removeObject(u, r.project(u._cUTMK, u._zoom)), o[u._zoom].addObject(h, r.project(h.getUTMK(), u._zoom)), this._arraySplice(u.__parent._childClusters, u), u.__parent._markers.push(h), h.__parent = u.__parent, u._icon && (s.removeLayer(u), e || s.addLayer(h))) : (u._recalculateBounds(), e && u._icon || u._updateIcon()), u = u.__parent;
            delete t.__parent
        }, _isOrIsParent: function (t, i) {
            for (; i;) {
                if (t === i)return !0;
                i = i.parentNode
            }
            return !1
        }, _propagateEvent: function (t) {
            if (t.layer instanceof r.MarkerCluster) {
                if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget))return;
                t.type = "cluster" + t.type
            }
            this.fire(t.type, t)
        }, _defaultIconCreateFunction: function (t) {
            var i = t.getChildCount(), e = " marker-cluster-";
            return e += 3 > i ? "small1" : 6 > i ? "small2" : 9 > i ? "small3" : 12 > i ? "medium1" : 15 > i ? "medium2" : 18 > i ? "medium3" : "large", new r.DivIcon({
                html: "<div><span>" + i + "</span></div>",
                className: "marker-cluster" + e,
                iconSize: new r.Point(60, 60)
            })
        }, _bindEvents: function () {
            var t = this._map, i = this.options.spiderfyOnMaxZoom, e = this.options.showCoverageOnHover, n = this.options.zoomToBoundsOnClick;
            (i || n) && this.on("clusterclick", this._zoomOrSpiderfy, this), e && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), t.on("zoomend", this._hideCoverage, this))
        }, _zoomOrSpiderfy: function (t) {
            var i = this._map;
            i.getMaxZoom() === i.getZoom() ? this.options.spiderfyOnMaxZoom && t.layer.spiderfy() : this.options.zoomToBoundsOnClick && t.layer.zoomToBounds(), t.originalEvent && 13 === t.originalEvent.keyCode && i._container.focus()
        }, _showCoverage: function (t) {
            var i = this._map;
            this._inZoomAnimation || (this._shownPolygon && i.removeLayer(this._shownPolygon), t.layer.getChildCount() > 2 && t.layer !== this._spiderfied && (this._shownPolygon = new r.Polygon(t.layer.getConvexHull(), this.options.polygonOptions), i.addLayer(this._shownPolygon)))
        }, _hideCoverage: function () {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null)
        }, _unbindEvents: function () {
            var t = this.options.spiderfyOnMaxZoom, i = this.options.showCoverageOnHover, e = this.options.zoomToBoundsOnClick, n = this._map;
            (t || e) && this.off("clusterclick", this._zoomOrSpiderfy, this), i && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), n.off("zoomend", this._hideCoverage, this))
        }, _zoomEnd: function () {
            this._map && (this._mergeSplitClusters(), this._zoom = this._map._zoom, this._currentShownBounds = this._getExpandedVisibleBounds())
        }, _moveEnd: function () {
            if (!this._inZoomAnimation) {
                var t = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, t), this._currentShownBounds = t
            }
        }, _generateInitialClusters: function () {
            var t = this._map.getMaxZoom(), i = this.options.maxClusterRadius, e = i;
            "function" != typeof i && (e = function () {
                return i
            }), this.options.disableClusteringAtZoom && (t = this.options.disableClusteringAtZoom - 1), this._maxZoom = t, this._gridClusters = {}, this._gridUnclustered = {};
            for (var n = t; n >= 0; n--)this._gridClusters[n] = new r.DistanceGrid(e(n)), this._gridUnclustered[n] = new r.DistanceGrid(e(n));
            this._topClusterLevel = new r.MarkerCluster(this, -1)
        }, _addLayer: function (t, i) {
            var e, n, o = this._gridClusters, s = this._gridUnclustered;
            for (this.options.singleMarkerMode && (t.options.icon = this.options.iconCreateFunction({
                getChildCount: function () {
                    return 1
                }, getAllChildMarkers: function () {
                    return [t]
                }
            })); i >= 0; i--) {
                e = this._map.project(t.getUTMK(), i);
                var a = o[i].getNearObject(e);
                if (a)return a._addChild(t), void(t.__parent = a);
                if (a = s[i].getNearObject(e)) {
                    var h = a.__parent;
                    h && this._removeLayer(a, !1);
                    var u = new r.MarkerCluster(this, i, a, t);
                    o[i].addObject(u, this._map.project(u._cUTMK, i)), a.__parent = u, t.__parent = u;
                    var l = u;
                    for (n = i - 1; n > h._zoom; n--)l = new r.MarkerCluster(this, n, l), o[n].addObject(l, this._map.project(a.getUTMK(), n));
                    for (h._addChild(l), n = i; n >= 0 && s[n].removeObject(a, this._map.project(a.getUTMK(), n)); n--);
                    return
                }
                s[i].addObject(t, e)
            }
            this._topClusterLevel._addChild(t), t.__parent = this._topClusterLevel
        }, _enqueue: function (t) {
            this._queue.push(t), this._queueTimeout || (this._queueTimeout = setTimeout(r.bind(this._processQueue, this), 300))
        }, _processQueue: function () {
            for (var t = 0; t < this._queue.length; t++)this._queue[t].call(this);
            this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null
        }, _mergeSplitClusters: function () {
            this._processQueue(), this._zoom < this._map._zoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, this._map._zoom)) : this._zoom > this._map._zoom ? (this._animationStart(), this._animationZoomOut(this._zoom, this._map._zoom)) : this._moveEnd()
        }, _getExpandedVisibleBounds: function () {
            if (!this.options.removeOutsideVisibleBounds)return this.getBounds();
            var t = this._map, i = t.getBounds(), e = i._southWest, n = i._northEast, o = r.Browser.mobile ? 0 : Math.abs(e.x - n.x), s = r.Browser.mobile ? 0 : Math.abs(e.y - n.y);
            return new r.UTMKBounds(new r.UTMK(e.x - o, e.y - s, !0), new r.UTMK(n.x + o, n.y + s, !0))
        }, _animationAddLayerNonAnimated: function (t, i) {
            if (i === t) this._featureGroup.addLayer(t); else if (2 === i._childCount) {
                i._addToMap();
                var e = i.getAllChildMarkers();
                this._featureGroup.removeLayer(e[0]), this._featureGroup.removeLayer(e[1])
            } else i._updateIcon()
        }
    }), r.MarkerClusterGroup.include(r.DomUtil.TRANSITION ? {
            _animationStart: function () {
                this._map._mapPane.className += " sop-cluster-anim", this._inZoomAnimation++
            }, _animationEnd: function () {
                this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" sop-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend")
            }, _animationZoomIn: function (t, i) {
                var e, n = this._getExpandedVisibleBounds(), o = this._featureGroup;
                this._topClusterLevel._recursively(n, t, 0, function (s) {
                    var r, a = s._utmk, h = s._markers;
                    for (n.contains(a) || (a = null), s._isSingleParent() && t + 1 === i ? (o.removeLayer(s), s._recursivelyAddChildrenToMap(null, i, n)) : (s.setOpacity(0), s._recursivelyAddChildrenToMap(a, i, n)), e = h.length - 1; e >= 0; e--)r = h[e], n.contains(r._utmk) || o.removeLayer(r)
                }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(n, i), o.eachLayer(function (t) {
                    t instanceof r.MarkerCluster || !t._icon || t.setOpacity(1)
                }), this._topClusterLevel._recursively(n, t, i, function (t) {
                    t._recursivelyRestoreChildPositions(i)
                }), this._enqueue(function () {
                    this._topClusterLevel._recursively(n, t, 0, function (t) {
                        o.removeLayer(t), t.setOpacity(1)
                    }), this._animationEnd()
                })
            }, _animationZoomOut: function (t, i) {
                this._animationZoomOutSingle(this._topClusterLevel, t - 1, i), this._topClusterLevel._recursivelyAddChildrenToMap(null, i, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t, this._getExpandedVisibleBounds())
            }, _animationZoomOutSingle: function (t, i, e) {
                var n = this._getExpandedVisibleBounds();
                t._recursivelyAnimateChildrenInAndAddSelfToMap(n, i + 1, e);
                var o = this;
                this._forceLayout(), t._recursivelyBecomeVisible(n, e), this._enqueue(function () {
                    if (1 === t._childCount) {
                        var s = t._markers[0];
                        s.setUTMK(s.getUTMK()), s.setOpacity && s.setOpacity(1)
                    } else t._recursively(n, e, 0, function (t) {
                        t._recursivelyRemoveChildrenFromMap(n, i + 1)
                    });
                    o._animationEnd()
                })
            }, _animationAddLayer: function (t, i) {
                var e = this, n = this._featureGroup;
                n.addLayer(t), i !== t && (i._childCount > 2 ? (i._updateIcon(), this._forceLayout(), this._animationStart(), t._setPos(this._map.utmkToLayerPoint(i.getUTMK())), t.setOpacity(0), this._enqueue(function () {
                        n.removeLayer(t), t.setOpacity(1), e._animationEnd()
                    })) : (this._forceLayout(), e._animationStart(), e._animationZoomOutSingle(i, this._map.getMaxZoom(), this._map.getZoom())))
            }, _forceLayout: function () {
                r.Util.falseFn(i.body.offsetWidth)
            }
        } : {
            _animationStart: function () {
            }, _animationZoomIn: function (t, i) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, i, this._getExpandedVisibleBounds()), this.fire("animationend")
            }, _animationZoomOut: function (t, i) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, i, this._getExpandedVisibleBounds()), this.fire("animationend")
            }, _animationAddLayer: function (t, i) {
                this._animationAddLayerNonAnimated(t, i)
            }
        }), r.markerClusterGroup = function (t) {
        return new r.MarkerClusterGroup(t)
    }, r.MarkerCluster = r.Marker.extend({
        initialize: function (t, i, e, n) {
            r.Marker.prototype.initialize.call(this, e ? e._cUTMK || e.getUTMK() : new r.UTMK(0, 0), {icon: this}), this._group = t, this._zoom = i, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._bounds = new r.UTMKBounds, e && this._addChild(e), n && this._addChild(n)
        }, getAllChildMarkers: function (t) {
            t = t || [];
            for (var i = this._childClusters.length - 1; i >= 0; i--)this._childClusters[i].getAllChildMarkers(t);
            for (var e = this._markers.length - 1; e >= 0; e--)t.push(this._markers[e]);
            return t
        }, getChildCount: function () {
            return this._childCount
        }, zoomToBounds: function () {
            for (var t, i = this._childClusters.slice(), e = this._group._map, n = e.getBoundsZoom(this._bounds), o = this._zoom + 1, s = e.getZoom(); i.length > 0 && n > o;) {
                o++;
                var r = [];
                for (t = 0; t < i.length; t++)r = r.concat(i[t]._childClusters);
                i = r
            }
            n > o ? this._group._map.setView(this._utmk, o) : s >= n ? this._group._map.setView(this._utmk, s + 1) : this._group._map.fitBounds(this._bounds)
        }, getBounds: function () {
            var t = new r.UTMKBounds;
            return t.extend(this._bounds), t
        }, _updateIcon: function () {
            this._iconNeedsUpdate = !0, this._icon && this.setIcon(this)
        }, createIcon: function () {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon()
        }, createShadow: function () {
            return this._iconObj.createShadow()
        }, _addChild: function (t, i) {
            this._iconNeedsUpdate = !0, this._expandBounds(t), t instanceof r.MarkerCluster ? (i || (this._childClusters.push(t), t.__parent = this), this._childCount += t._childCount) : (i || this._markers.push(t), this._childCount++), this.__parent && this.__parent._addChild(t, !0)
        }, _expandBounds: function (t) {
            var i, e = t._wUTMK || t._utmk;
            t instanceof r.MarkerCluster ? (this._bounds.extend(t._bounds), i = t._childCount) : (this._bounds.extend(e), i = 1), this._cUTMK || (this._cUTMK = t._cUTMK || e);
            var n = this._childCount + i;
            this._wUTMK ? (this._wUTMK.x = (e.x * i + this._wUTMK.x * this._childCount) / n, this._wUTMK.y = (e.y * i + this._wUTMK.y * this._childCount) / n) : this._utmk = this._wUTMK = new r.UTMK(e.x, e.y)
        }, _addToMap: function (t) {
            t && (this._backupLatlng = this._utmk, this.setUTMK(t)), this._group._featureGroup.addLayer(this)
        }, _recursivelyAnimateChildrenIn: function (t, i, e) {
            this._recursively(t, 0, e - 1, function (t) {
                var e, n, o = t._markers;
                for (e = o.length - 1; e >= 0; e--)n = o[e], n._icon && (n._setPos(i), n.setOpacity(0))
            }, function (t) {
                var e, n, o = t._childClusters;
                for (e = o.length - 1; e >= 0; e--)n = o[e], n._icon && (n._setPos(i), n.setOpacity(0))
            })
        }, _recursivelyAnimateChildrenInAndAddSelfToMap: function (t, i, e) {
            this._recursively(t, e, 0, function (n) {
                n._recursivelyAnimateChildrenIn(t, n._group._map.utmkToLayerPoint(n.getUTMK()).round(), i), n._isSingleParent() && i - 1 === e ? (n.setOpacity(1), n._recursivelyRemoveChildrenFromMap(t, i)) : n.setOpacity(0), n._addToMap()
            })
        }, _recursivelyBecomeVisible: function (t, i) {
            this._recursively(t, 0, i, null, function (t) {
                t.setOpacity(1)
            })
        }, _recursivelyAddChildrenToMap: function (t, i, e) {
            this._recursively(e, -1, i, function (n) {
                if (i !== n._zoom)for (var o = n._markers.length - 1; o >= 0; o--) {
                    var s = n._markers[o];
                    e.contains(s._utmk) && (t && (s._backupLatlng = s.getUTMK(), s.setUTMK(t), s.setOpacity && s.setOpacity(0)), n._group._featureGroup.addLayer(s))
                }
            }, function (i) {
                i._addToMap(t)
            })
        }, _recursivelyRestoreChildPositions: function (t) {
            for (var i = this._markers.length - 1; i >= 0; i--) {
                var e = this._markers[i];
                e._backupLatlng && (e.setUTMK(e._backupLatlng), delete e._backupLatlng)
            }
            if (t - 1 === this._zoom)for (var n = this._childClusters.length - 1; n >= 0; n--)this._childClusters[n]._restorePosition(); else for (var o = this._childClusters.length - 1; o >= 0; o--)this._childClusters[o]._recursivelyRestoreChildPositions(t)
        }, _restorePosition: function () {
            this._backupLatlng && (this.setUTMK(this._backupLatlng), delete this._backupLatlng)
        }, _recursivelyRemoveChildrenFromMap: function (t, i, e) {
            var n, o;
            this._recursively(t, -1, i - 1, function (t) {
                for (o = t._markers.length - 1; o >= 0; o--)n = t._markers[o], e && e.contains(n._utmk) || (t._group._featureGroup.removeLayer(n), n.setOpacity && n.setOpacity(1))
            }, function (t) {
                for (o = t._childClusters.length - 1; o >= 0; o--)n = t._childClusters[o], e && e.contains(n._utmk) || (t._group._featureGroup.removeLayer(n), n.setOpacity && n.setOpacity(1))
            })
        }, _recursively: function (t, i, e, n, o) {
            var s, r, a = this._childClusters, h = this._zoom;
            if (i > h)for (s = a.length - 1; s >= 0; s--)r = a[s], t.intersects(r._bounds) && r._recursively(t, i, e, n, o); else if (n && n(this), o && this._zoom === e && o(this), e > h)for (s = a.length - 1; s >= 0; s--)r = a[s], t.intersects(r._bounds) && r._recursively(t, i, e, n, o)
        }, _recalculateBounds: function () {
            var t, i = this._markers, e = this._childClusters;
            for (this._bounds = new r.UTMKBounds, delete this._wUTMK, t = i.length - 1; t >= 0; t--)this._expandBounds(i[t]);
            for (t = e.length - 1; t >= 0; t--)this._expandBounds(e[t])
        }, _isSingleParent: function () {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }
    }), r.DistanceGrid = function (t) {
        this._cellSize = t, this._sqCellSize = t * t, this._grid = {}, this._objectPoint = {}
    }, r.DistanceGrid.prototype = {
        addObject: function (t, i) {
            var e = this._getCoord(i.x), n = this._getCoord(i.y), o = this._grid, s = o[n] = o[n] || {}, a = s[e] = s[e] || [], h = r.Util.stamp(t);
            this._objectPoint[h] = i, a.push(t)
        }, updateObject: function (t, i) {
            this.removeObject(t), this.addObject(t, i)
        }, removeObject: function (t, i) {
            var e, n, o = this._getCoord(i.x), s = this._getCoord(i.y), a = this._grid, h = a[s] = a[s] || {}, u = h[o] = h[o] || [];
            for (delete this._objectPoint[r.Util.stamp(t)], e = 0, n = u.length; n > e; e++)if (u[e] === t)return u.splice(e, 1), 1 === n && delete h[o], !0
        }, eachObject: function (t, i) {
            var e, n, o, s, r, a, h, u = this._grid;
            for (e in u) {
                r = u[e];
                for (n in r)for (a = r[n], o = 0, s = a.length; s > o; o++)h = t.call(i, a[o]), h && (o--, s--)
            }
        }, getNearObject: function (t) {
            var i, e, n, o, s, a, h, u, l = this._getCoord(t.x), c = this._getCoord(t.y), d = this._objectPoint, m = this._sqCellSize, p = null;
            for (i = c - 1; c + 1 >= i; i++)if (o = this._grid[i])for (e = l - 1; l + 1 >= e; e++)if (s = o[e])for (n = 0, a = s.length; a > n; n++)h = s[n], u = this._sqDist(d[r.Util.stamp(h)], t), m > u && (m = u, p = h);
            return p
        }, _getCoord: function (t) {
            return Math.floor(t / this._cellSize)
        }, _sqDist: function (t, i) {
            var e = i.x - t.x, n = i.y - t.y;
            return e * e + n * n
        }
    }, function () {
        r.QuickHull = {
            getDistant: function (t, i) {
                var e = i[1].y - i[0].y, n = i[0].x - i[1].x;
                return n * (t.y - i[0].y) + e * (t.x - i[0].x)
            }, findMostDistantPointFromBaseLine: function (t, i) {
                var e, n, o, s = 0, r = null, a = [];
                for (e = i.length - 1; e >= 0; e--)n = i[e], o = this.getDistant(n, t), o > 0 && (a.push(n), o > s && (s = o, r = n));
                return {maxPoint: r, newPoints: a}
            }, buildConvexHull: function (t, i) {
                var e = [], n = this.findMostDistantPointFromBaseLine(t, i);
                return n.maxPoint ? (e = e.concat(this.buildConvexHull([t[0], n.maxPoint], n.newPoints)), e = e.concat(this.buildConvexHull([n.maxPoint, t[1]], n.newPoints))) : [t[0]]
            }, getConvexHull: function (t) {
                var i, e = !1, n = !1, o = null, s = null;
                for (i = t.length - 1; i >= 0; i--) {
                    var r = t[i];
                    (e === !1 || r.y > e) && (o = r, e = r.y), (n === !1 || r.y < n) && (s = r, n = r.y)
                }
                var a = [].concat(this.buildConvexHull([s, o], t), this.buildConvexHull([o, s], t));
                return a
            }
        }
    }(), r.MarkerCluster.include({
        getConvexHull: function () {
            var t, i, e = this.getAllChildMarkers(), n = [];
            for (i = e.length - 1; i >= 0; i--)t = e[i].getUTMK(), n.push(t);
            return r.QuickHull.getConvexHull(n)
        }
    }), r.MarkerCluster.include({
        _2PI: 2 * Math.PI,
        _circleFootSeparation: 25,
        _circleStartAngle: Math.PI / 6,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function () {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var t, i = this.getAllChildMarkers(), e = this._group, n = e._map, o = n.utmkToLayerPoint(this._utmk);
                this._group._unspiderfy(), this._group._spiderfied = this, i.length >= this._circleSpiralSwitchover ? t = this._generatePointsSpiral(i.length, o) : (o.y += 10, t = this._generatePointsCircle(i.length, o)), this._animationSpiderfy(i, t)
            }
        },
        unspiderfy: function (t) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(t), this._group._spiderfied = null)
        },
        _generatePointsCircle: function (t, i) {
            var e, n, o = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + t), s = o / this._2PI, a = this._2PI / t, h = [];
            for (h.length = t, e = t - 1; e >= 0; e--)n = this._circleStartAngle + e * a, h[e] = new r.Point(i.x + s * Math.cos(n), i.y + s * Math.sin(n))._round();
            return h
        },
        _generatePointsSpiral: function (t, i) {
            var e, n = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthStart, o = this._group.options.spiderfyDistanceMultiplier * this._spiralFootSeparation, s = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthFactor, a = 0, h = [];
            for (h.length = t, e = t - 1; e >= 0; e--)a += o / n + 5e-4 * e, h[e] = new r.Point(i.x + n * Math.cos(a), i.y + n * Math.sin(a))._round(), n += this._2PI * s / a;
            return h
        },
        _noanimationUnspiderfy: function () {
            var t, i, e = this._group, n = e._map, o = e._featureGroup, s = this.getAllChildMarkers();
            for (this.setOpacity(1), i = s.length - 1; i >= 0; i--)t = s[i], o.removeLayer(t), t._preSpiderfyLatlng && (t.setUTMK(t._preSpiderfyLatlng), delete t._preSpiderfyLatlng), t.setZIndexOffset && t.setZIndexOffset(0), t._spiderLeg && (n.removeLayer(t._spiderLeg), delete t._spiderLeg);
            e._spiderfied = null
        }
    }), r.MarkerCluster.include(r.DomUtil.TRANSITION ? {
            SVG_ANIMATION: function () {
                return i.createElementNS("http://www.w3.org/2000/svg", "animate").toString().indexOf("SVGAnimate") > -1
            }(), _animationSpiderfy: function (t, e) {
                var n, o, s, a, h = this, u = this._group, l = u._map, c = u._featureGroup, d = l.utmkToLayerPoint(this._utmk);
                for (n = t.length - 1; n >= 0; n--)o = t[n], o.setOpacity ? (o.setZIndexOffset(1e6), o.setOpacity(0), c.addLayer(o), o._setPos(d)) : c.addLayer(o);
                u._forceLayout(), u._animationStart();
                var m = r.Path.SVG ? 0 : .3, p = r.Path.SVG_NS;
                for (n = t.length - 1; n >= 0; n--)if (a = l.layerPointToUTMK(e[n]), o = t[n], o._preSpiderfyLatlng = o._utmk, o.setUTMK(a), o.setOpacity && o.setOpacity(1), s = new r.Polyline([h._utmk, a], {
                        weight: 1.5,
                        color: "#222",
                        opacity: m
                    }), l.addLayer(s), o._spiderLeg = s, r.Path.SVG && this.SVG_ANIMATION) {
                    var f = s._path.getTotalLength();
                    s._path.setAttribute("stroke-dasharray", f + "," + f);
                    var _ = i.createElementNS(p, "animate");
                    _.setAttribute("attributeName", "stroke-dashoffset"), _.setAttribute("begin", "indefinite"), _.setAttribute("from", f), _.setAttribute("to", 0), _.setAttribute("dur", .25), s._path.appendChild(_), _.beginElement(), _ = i.createElementNS(p, "animate"), _.setAttribute("attributeName", "stroke-opacity"), _.setAttribute("attributeName", "stroke-opacity"), _.setAttribute("begin", "indefinite"), _.setAttribute("from", 0), _.setAttribute("to", .5), _.setAttribute("dur", .25), s._path.appendChild(_), _.beginElement()
                }
                if (h.setOpacity(.3), r.Path.SVG)for (this._group._forceLayout(), n = t.length - 1; n >= 0; n--)o = t[n]._spiderLeg, o.options.opacity = .5, o._path.setAttribute("stroke-opacity", .5);
                setTimeout(function () {
                    u._animationEnd(), u.fire("spiderfied")
                }, 200)
            }, _animationUnspiderfy: function (t) {
                var i, e, n, o = this._group, s = o._map, a = o._featureGroup, h = t ? s._utmkToNewLayerPoint(this._utmk, t.zoom, t.center) : s.utmkToLayerPoint(this._utmk), u = this.getAllChildMarkers(), l = r.Path.SVG && this.SVG_ANIMATION;
                for (o._animationStart(), this.setOpacity(1), e = u.length - 1; e >= 0; e--)i = u[e], i._preSpiderfyLatlng && (i.setUTMK(i._preSpiderfyLatlng), delete i._preSpiderfyLatlng, i.setOpacity ? (i._setPos(h), i.setOpacity(0)) : a.removeLayer(i), l && (n = i._spiderLeg._path.childNodes[0], n.setAttribute("to", n.getAttribute("from")), n.setAttribute("from", 0), n.beginElement(), n = i._spiderLeg._path.childNodes[1], n.setAttribute("from", .5), n.setAttribute("to", 0), n.setAttribute("stroke-opacity", 0), n.beginElement(), i._spiderLeg._path.setAttribute("stroke-opacity", 0)));
                setTimeout(function () {
                    var t = 0;
                    for (e = u.length - 1; e >= 0; e--)i = u[e], i._spiderLeg && t++;
                    for (e = u.length - 1; e >= 0; e--)i = u[e], i._spiderLeg && (i.setOpacity && (i.setOpacity(1), i.setZIndexOffset(0)), t > 1 && a.removeLayer(i), s.removeLayer(i._spiderLeg), delete i._spiderLeg);
                    o._animationEnd()
                }, 200)
            }
        } : {
            _animationSpiderfy: function (t, i) {
                var e, n, o, s, a = this._group, h = a._map, u = a._featureGroup;
                for (e = t.length - 1; e >= 0; e--)s = h.layerPointToUTMK(i[e]), n = t[e], n._preSpiderfyLatlng = n._utmk, n.setUTMK(s), n.setZIndexOffset && n.setZIndexOffset(1e6), u.addLayer(n), o = new r.Polyline([this._utmk, s], {
                    weight: 1.5,
                    color: "#222"
                }), h.addLayer(o), n._spiderLeg = o;
                this.setOpacity(.3), a.fire("spiderfied")
            }, _animationUnspiderfy: function () {
                this._noanimationUnspiderfy()
            }
        }), r.MarkerClusterGroup.include({
        _spiderfied: null, _spiderfierOnAdd: function () {
            this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), this._map.on("zoomend", this._noanimationUnspiderfy, this), r.Path.SVG && !r.Browser.touch && this._map._initPathRoot()
        }, _spiderfierOnRemove: function () {
            this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy()
        }, _unspiderfyZoomStart: function () {
            this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        }, _unspiderfyZoomAnim: function (t) {
            r.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(t))
        }, _unspiderfyWrapper: function () {
            this._unspiderfy()
        }, _unspiderfy: function (t) {
            this._spiderfied && this._spiderfied.unspiderfy(t)
        }, _noanimationUnspiderfy: function () {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy()
        }, _unspiderfyLayer: function (t) {
            t._spiderLeg && (this._featureGroup.removeLayer(t), t.setOpacity(1), t.setZIndexOffset(0), this._map.removeLayer(t._spiderLeg), delete t._spiderLeg)
        }
    }), r.ToolTip = r.Layer.extend({
        options: {
            className: "",
            clickable: !1,
            direction: "right",
            noHide: !1,
            offset: [12, -15],
            opacity: 1,
            zoomAnimation: !0
        }, initialize: function (t, i) {
            r.setOptions(this, t), this._source = i, this._animated = r.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
        }, onAdd: function (t) {
            this._map = t, this._pane = this.options.pane ? t._panes[this.options.pane] : this._source instanceof r.Marker ? t._panes.markerPane : t._panes.infowindowPane, this._container || this._initLayout(), this._pane.appendChild(this._container), this._initInteraction(), this._update(), this.setOpacity(this.options.opacity)
        }, getEvents: function () {
            var t = {viewreset: this._onViewReset};
            return this._animated && (t.zoomanim = this._zoomAnimation), r.Browser.touch && !this.options.noHide && (r.DomEvent.on(this._container, "click", this.close, this), t.click = this.close()), t
        }, onRemove: function (t) {
            this._pane.removeChild(this._container), t.off({
                zoomanim: this._zoomAnimation,
                moveend: this._onMoveEnd,
                viewreset: this._onViewReset
            }, this), this._removeInteraction(), this._map = null
        }, _initLayout: function () {
            this._container = r.DomUtil.create("div", "sop-tooltip " + this.options.className + " sop-zoom-animated"), this.updateZIndex(this._zIndex)
        }, setUTMK: function (t) {
            return this._utmk = r.utmk(t), this._map && this._updatePosition(), this
        }, setContent: function (t) {
            return this._previousContent = this._content, this._content = t, this._updateContent(), this
        }, close: function () {
            var t = this._map;
            t && (r.Browser.touch && !this.options.noHide && (r.DomEvent.off(this._container, "click", this.close), t.off("click", this.close, this)), t.removeLayer(this))
        }, updateZIndex: function (t) {
            this._zIndex = t, this._container && this._zIndex && (this._container.style.zIndex = t)
        }, setOpacity: function (t) {
            this.options.opacity = t, this._container && r.DomUtil.setOpacity(this._container, t)
        }, _update: function () {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updatePosition(), this._container.style.visibility = "")
        }, _updateContent: function () {
            this._content && this._map && this._prevContent !== this._content && "string" == typeof this._content && (this._container.innerHTML = this._content, this._prevContent = this._content, this._tooltipWidth = this._container.offsetWidth)
        }, _updatePosition: function () {
            var t = this._map.utmkToLayerPoint(this._utmk);
            this._setPosition(t)
        }, _setPosition: function (t) {
            var i = this._map, e = this._container, n = i.utmkToContainerPoint(i.getCenter()), o = i.layerPointToContainerPoint(t), s = this.options.direction, a = this._tooltipWidth, h = r.point(this.options.offset);
            "right" === s || "auto" === s && o.x < n.x ? (r.DomUtil.addClass(e, "sop-tooltip-right"), r.DomUtil.removeClass(e, "sop-tooltip-left"), t = t.add(h)) : (r.DomUtil.addClass(e, "sop-tooltip-left"), r.DomUtil.removeClass(e, "sop-tooltip-right"), t = t.add(r.point(-h.x - a, h.y))), r.DomUtil.setPosition(e, t)
        }, _zoomAnimation: function (t) {
            var i = this._map._utmkToNewLayerPoint(this._utmk, t.zoom, t.center).round();
            this._setPosition(i)
        }, _onMoveEnd: function () {
            this._animated && "auto" !== this.options.direction || this._updatePosition()
        }, _onViewReset: function (t) {
            t && t.hard && this._update()
        }, _initInteraction: function () {
            if (this.options.clickable) {
                var t = this._container, i = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                r.DomUtil.addClass(t, "sop-clickable"), r.DomEvent.on(t, "click", this._onMouseClick, this);
                for (var e = 0; e < i.length; e++)r.DomEvent.on(t, i[e], this._fireMouseEvent, this)
            }
        }, _removeInteraction: function () {
            if (this.options.clickable) {
                var t = this._container, i = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                r.DomUtil.removeClass(t, "leaflet-clickable"), r.DomEvent.off(t, "click", this._onMouseClick, this);
                for (var e = 0; e < i.length; e++)r.DomEvent.off(t, i[e], this._fireMouseEvent, this)
            }
        }, _onMouseClick: function (t) {
            this.hasEventListeners(t.type) && r.DomEvent.stopPropagation(t), this.fire(t.type, {originalEvent: t})
        }, _fireMouseEvent: function (t) {
            this.fire(t.type, {originalEvent: t}), "contextmenu" === t.type && this.hasEventListeners(t.type) && r.DomEvent.preventDefault(t), "mousedown" !== t.type ? r.DomEvent.stopPropagation(t) : r.DomEvent.preventDefault(t)
        }
    }), r.Path.include({
        bindToolTip: function (t, i) {
            return this.tooltip && this.tooltip.options === i || (this.tooltip = new r.ToolTip(i, this)), this.tooltip.setContent(t), this._showToolTipAdded || (this.on("mouseover", this._showToolTip, this).on("mousemove", this._moveToolTip, this).on("mouseout remove", this._hideToolTip, this), r.Browser.touch && this.on("click", this._showToolTip, this), this._showToolTipAdded = !0), this
        }, unbindToolTip: function () {
            return this.tooltip && (this._hideToolTip(), this.tooltip = null, this._showToolTipAdded = !1, this.off("mouseover", this._showToolTip, this).off("mousemove", this._moveToolTip, this).off("mouseout remove", this._hideToolTip, this)), this
        }, updateToolTipContent: function (t) {
            this.tooltip && this.tooltip.setContent(t)
        }, _showToolTip: function (t) {
            this.tooltip.setUTMK(t.utmk), this._map.showToolTip(this.tooltip)
        }, _moveToolTip: function (t) {
            this.tooltip.setUTMK(t.utmk)
        }, _hideToolTip: function () {
            this.tooltip.close()
        }
    }), r.Map.include({
        showToolTip: function (t) {
            return this.addLayer(t)
        }
    }), r.CommonMarkerFunction = {
        showToolTip: function () {
            return this.tooltip && this._map && (this.tooltip.setUTMK(this._utmk), this._map.showToolTip(this.tooltip)), this
        }, hideToolTip: function () {
            return this.tooltip && this.tooltip.close(), this
        }, setToolTipNoHide: function (t) {
            this._tooltipNoHide !== t && (this._tooltipNoHide = t, t ? (this._removeToolTipRevealHandlers(), this.showToolTip()) : (this._addToolTipRevealHandlers(), this.hideToolTip()))
        }, bindToolTip: function (t, i) {
            var e = this.options.icon ? this.options.icon.options.tooltipAnchor : this.options.tooltipAnchor, n = r.point(e) || r.point(0, 0);
            return n = n.add(r.ToolTip.prototype.options.offset), i && i.offset && (n = n.add(i.offset)), i = r.Util.extend({offset: n}, i), this._tooltipNoHide = i.noHide, this.tooltip || (this._tooltipNoHide || this._addToolTipRevealHandlers(), this.on("remove", this.hideToolTip, this).on("move", this._moveToolTip, this).on("add", this._onMarkerAdd, this), this._hasToolTipHandlers = !0), this.tooltip = new r.ToolTip(i, this).setContent(t), this
        }, unbindToolTip: function () {
            return this.tooltip && (this.hideToolTip(), this.tooltip = null, this._hasToolTipHandlers && (this._tooltipNoHide || this._removeToolTipRevealHandlers(), this.off("remove", this.hideToolTip, this).off("move", this._moveToolTip, this).off("add", this._onMarkerAdd, this)), this._hasToolTipHandlers = !1), this
        }, updateToolTipContent: function (t) {
            this.tooltip && this.tooltip.setContent(t)
        }, getToolTip: function () {
            return this.tooltip
        }, _onMarkerAdd: function () {
            this._tooltipNoHide && this.showToolTip()
        }, _addToolTipRevealHandlers: function () {
            this.on("mouseover", this.showToolTip, this).on("mouseout", this.hideToolTip, this), r.Browser.touch && this.on("click", this.showToolTip, this)
        }, _removeToolTipRevealHandlers: function () {
            this.off("mouseover", this.showToolTip, this).off("mouseout", this.hideToolTip, this), r.Browser.touch && this.off("click", this.showToolTip, this)
        }, _moveToolTip: function (t) {
            this.tooltip.setUTMK(t.utmk)
        }
    }, r.CircleMarker.mergeOptions({tooltipAnchor: new r.Point(0, 0)}), r.CircleMarker.include(r.CommonMarkerFunction), r.Icon.Default.mergeOptions({tooltipAnchor: new r.Point(9, -20)}), r.Marker.include(r.CommonMarkerFunction), r.Marker.include({
        _originalUpdateZIndex: r.Marker.prototype._updateZIndex,
        _updateZIndex: function (t) {
            var i = this._zIndex + t;
            this._originalUpdateZIndex(t), this.tooltip && this.tooltip.updateZIndex(i)
        },
        _originalSetOpacity: r.Marker.prototype.setOpacity,
        setOpacity: function (t, i) {
            this.options.tooltipHasSemiTransparency = i, this._originalSetOpacity(t)
        },
        _originalUpdateOpacity: r.Marker.prototype._updateOpacity,
        _updateOpacity: function () {
            var t = 0 === this.options.opacity ? 0 : 1;
            this._originalUpdateOpacity(), this.tooltip && this.tooltip.setOpacity(this.options.tooltipHasSemiTransparency ? this.options.opacity : t)
        },
        _originalSetUTMK: r.Marker.prototype.setUTMK,
        setUTMK: function (t) {
            return this.tooltip && !this._tooltipNoHide && this.hideToolTip(), this._originalSetUTMK(t)
        }
    }), r.FeatureGroup.include({
        clearLayers: function () {
            return this.unbindToolTip(), this.eachLayer(this.removeLayer, this), this
        }, bindToolTip: function (t, i) {
            return this.invoke("bindToolTip", t, i)
        }, unbindToolTip: function () {
            return this.invoke("unbindToolTip")
        }, updateToolTipContent: function (t) {
            this.invoke("updateToolTipContent", t)
        }
    }), function () {
        "use strict";
        function n(t) {
            return this instanceof n ? (this._canvas = t = "string" == typeof t ? i.getElementById(t) : t, this._ctx = t.getContext("2d"), this._width = t.width, this._height = t.height, this._max = 1, void(this._data = [])) : new n(t)
        }

        n.prototype = {
            defaultRadius: 25,
            defaultGradient: {.4: "blue", .6: "cyan", .7: "lime", .8: "yellow", 1: "red"},
            data: function (t) {
                return this._data = t, this
            },
            max: function (t) {
                return this._max = t, this
            },
            add: function (t) {
                return this._data.push(t), this
            },
            clear: function () {
                return this._data = [], this
            },
            radius: function (t, e) {
                e = e || 15;
                var n = this._circle = i.createElement("canvas"), o = n.getContext("2d"), s = this._r = t + e;
                return n.width = n.height = 2 * s, o.shadowOffsetX = o.shadowOffsetY = 200, o.shadowBlur = e, o.shadowColor = "black", o.beginPath(), o.arc(s - 200, s - 200, t, 0, 2 * Math.PI, !0), o.closePath(), o.fill(), this
            },
            gradient: function (t) {
                var e = i.createElement("canvas"), n = e.getContext("2d"), o = n.createLinearGradient(0, 0, 0, 256);
                e.width = 1, e.height = 256;
                for (var s in t)o.addColorStop(s, t[s]);
                return n.fillStyle = o, n.fillRect(0, 0, 1, 256), this._grad = n.getImageData(0, 0, 1, 256).data, this
            },
            draw: function (t) {
                this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
                var i = this._ctx;
                i.clearRect(0, 0, this._width, this._height);
                for (var n, o = 0, s = this._data.length; s > o; o++)n = this._data[o], i.globalAlpha = Math.max(n[2] / this._max, t === e ? .05 : t), i.drawImage(this._circle, n[0] - this._r, n[1] - this._r);
                var r = i.getImageData(0, 0, this._width, this._height);
                return this._colorize(r.data, this._grad), i.putImageData(r, 0, 0), this
            },
            _colorize: function (t, i) {
                for (var e, n = 3, o = t.length; o > n; n += 4)e = 4 * t[n], e && (t[n - 3] = i[e],
                    t[n - 2] = i[e + 1], t[n - 1] = i[e + 2])
            }
        }, t.simpleheat = n
    }(), r.HeatLayer = (r.Layer ? r.Layer : r.Class).extend({
        initialize: function (t, i) {
            this._utmks = t || [], r.setOptions(this, i)
        }, setUTMKs: function (t) {
            return this._utmks = t, this.redraw()
        }, addUTMK: function (t) {
            return this._utmks.push(t), this.redraw()
        }, setOptions: function (t) {
            return r.setOptions(this, t), this._heat && this._updateOptions(), this.redraw()
        }, redraw: function () {
            return !this._heat || this._frame || this._map._animating || (this._frame = r.Util.requestAnimFrame(this._redraw, this)), this
        }, onAdd: function (t) {
            this._map = t, this._canvas || this._initCanvas(), t._panes.overlayPane.appendChild(this._canvas), t.on("moveend", this._reset, this), t.options.zoomAnimation && r.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
        }, onRemove: function (t) {
            t.getPanes().overlayPane.removeChild(this._canvas), t.off("moveend", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
        }, addTo: function (t) {
            return t.addLayer(this), this
        }, _initCanvas: function () {
            var t = this._canvas = r.DomUtil.create("canvas", "sop-heatmap-layer sop-layer"), i = this._map.getSize();
            t.width = i.x, t.height = i.y;
            var e = this._map.options.zoomAnimation && r.Browser.any3d;
            r.DomUtil.addClass(t, "sop-zoom-" + (e ? "animated" : "hide")), this._heat = simpleheat(t), this._updateOptions()
        }, _updateOptions: function () {
            this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max)
        }, _reset: function () {
            var t = this._map.containerPointToLayerPoint([0, 0]);
            r.DomUtil.setPosition(this._canvas, t);
            var i = this._map.getSize();
            this._heat._width !== i.x && (this._canvas.width = this._heat._width = i.x), this._heat._height !== i.y && (this._canvas.height = this._heat._height = i.y), this._redraw()
        }, _redraw: function () {
            var t, i, n, o, s, a, h, u, l, c = [], d = this._heat._r, m = this._map.getSize(), p = new r.UTMKBounds(this._map.containerPointToUTMK(r.point([-d, -d])), this._map.containerPointToUTMK(m.add([d, d]))), f = this.options.maxZoom === e ? this._map.getMaxZoom() : this.options.maxZoom, _ = 1 / Math.pow(2, Math.max(0, Math.min(f - this._map.getZoom(), 12))), v = d / 2, g = [], y = this._map._getMapPanePos(), M = y.x % v, x = y.y % v;
            for (console.log("------------------ [ INFO ] ------------------"), console.log("radius (radius + blur)", d), console.log("Map Size", m), console.log("bounds", p), console.log("maxZoom", f), console.log("v", _), console.log("cellSize", v), console.log("panePosition", y), console.log("offsetX", M), console.log("offsetY", x), t = 0, i = this._utmks.length; i > t; t++)if (p.contains(this._utmks[t])) {
                n = this._map.utmkToContainerPoint(this._utmks[t]), s = Math.floor((n.x - M) / v) + 2, a = Math.floor((n.y - x) / v) + 2;
                var b = this._utmks[t].alt !== e ? this._utmks[t].alt : this._utmks[t][2] !== e ? +this._utmks[t][2] : 1;
                l = b * _, g[a] = g[a] || [], o = g[a][s], o ? (o[0] = (o[0] * o[2] + n.x * l) / (o[2] + l), o[1] = (o[1] * o[2] + n.y * l) / (o[2] + l), o[2] += l) : g[a][s] = [n.x, n.y, l]
            }
            for (console.log("Grid", g), t = 0, i = g.length; i > t; t++)if (g[t])for (h = 0, u = g[t].length; u > h; h++)o = g[t][h], o && c.push([Math.round(o[0]), Math.round(o[1]), Math.min(o[2], 1)]);
            this._heat.data(c).draw(this.options.minOpacity), this._frame = null
        }, _animateZoom: function (t) {
            var i = this._map.getZoomScale(t.zoom), e = this._map._getCenterOffset(t.center)._multiplyBy(-i).subtract(this._map._getMapPanePos());
            r.DomUtil.setTransform(this._canvas, e, i)
        }
    }), r.heatLayer = function (t, i) {
        return new r.HeatLayer(t, i)
    }, "undefined" != typeof module && (module.exports = s), !function (i) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = i(); else if ("function" == typeof define && define.amd) define([], i); else {
            var e;
            "undefined" != typeof t ? e = t : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.omnivore = i()
        }
    }(function () {
        var o;
        return function s(t, i, e) {
            function n(r, a) {
                if (!i[r]) {
                    if (!t[r]) {
                        var h = "function" == typeof require && require;
                        if (!a && h)return h(r, !0);
                        if (o)return o(r, !0);
                        var u = new Error("Cannot find module '" + r + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var l = i[r] = {exports: {}};
                    t[r][0].call(l.exports, function (i) {
                        var e = t[r][1][i];
                        return n(e ? e : i)
                    }, l, l.exports, s, t, i, e)
                }
                return i[r].exports
            }

            for (var o = "function" == typeof require && require, r = 0; r < e.length; r++)n(e[r]);
            return n
        }({
            1: [function (t, i, e) {
                function n(t, i) {
                    "addData" in t && t.addData(i), "setGeoJSON" in t && t.setGeoJSON(i)
                }

                function o(t, i, e) {
                    var o = e || r.geoJson();
                    return y(t, function (t, i) {
                        return t ? o.fire("error", {error: t}) : (n(o, JSON.parse(i.responseText)), void o.fire("ready"))
                    }), o
                }

                function s(t, i, e) {
                    function n(t, e) {
                        return t ? o.fire("error", {error: t}) : (d(e.responseText, i, o), void o.fire("ready"))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function a(t, i, e) {
                    function n(t, e) {
                        function n() {
                            s = !0
                        }

                        var s;
                        return t ? o.fire("error", {error: t}) : (o.on("error", n), m(e.responseText, i, o), o.off("error", n), void(s || o.fire("ready")))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function h(t, i, e) {
                    function n(t, e) {
                        function n() {
                            s = !0
                        }

                        var s;
                        return t ? o.fire("error", {error: t}) : (o.on("error", n), p(e.responseXML || e.responseText, i, o), o.off("error", n), void(s || o.fire("ready")))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function u(t, i, e) {
                    function n(t, e) {
                        function n() {
                            s = !0
                        }

                        var s;
                        return t ? o.fire("error", {error: t}) : (o.on("error", n), f(e.responseXML || e.responseText, i, o), o.off("error", n), void(s || o.fire("ready")))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function l(t, i, e) {
                    function n(t, e) {
                        return t ? o.fire("error", {error: t}) : (v(e.responseText, i, o), void o.fire("ready"))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function c(t, i, e) {
                    function n(t, e) {
                        return t ? o.fire("error", {error: t}) : (_(e.responseText, i, o), void o.fire("ready"))
                    }

                    var o = e || r.geoJson();
                    return y(t, n), o
                }

                function d(t, i, e) {
                    var o = "string" == typeof t ? JSON.parse(t) : t;
                    e = e || r.geoJson();
                    for (var s in o.objects) {
                        var a = w.feature(o, o.objects[s]);
                        a.features ? n(e, a.features) : n(e, a)
                    }
                    return e
                }

                function m(t, i, e) {
                    function o(t, i) {
                        return t ? e.fire("error", {error: t}) : void n(e, i)
                    }

                    return e = e || r.geoJson(), i = i || {}, M.csv2geojson(t, i, o), e
                }

                function p(t, i, e) {
                    var o = g(t);
                    if (!o)return e.fire("error", {error: "Could not parse GPX"});
                    e = e || r.geoJson();
                    var s = T.gpx(o);
                    return n(e, s), e
                }

                function f(t, i, e) {
                    var o = g(t);
                    if (!o)return e.fire("error", {error: "Could not parse KML"});
                    e = e || r.geoJson();
                    var s = T.kml(o);
                    return n(e, s), e
                }

                function _(t, i, e) {
                    e = e || r.geoJson(), i = i || {};
                    for (var o = b.decode(t, i.precision), s = {
                        type: "LineString",
                        coordinates: []
                    }, a = 0; a < o.length; a++)s.coordinates[a] = [o[a][1], o[a][0]];
                    return n(e, s), e
                }

                function v(t, i, e) {
                    e = e || r.geoJson();
                    var o = x(t);
                    return n(e, o), e
                }

                function g(t) {
                    return "string" == typeof t ? (new DOMParser).parseFromString(t, "text/xml") : t
                }

                var y = t("corslite"), M = t("csv2geojson"), x = t("wellknown"), b = t("polyline"), w = t("topojson/topojson.js"), T = t("togeojson");
                i.exports.polyline = c, i.exports.polyline.parse = _, i.exports.geojson = o, i.exports.topojson = s, i.exports.topojson.parse = d, i.exports.csv = a, i.exports.csv.parse = m, i.exports.gpx = h, i.exports.gpx.parse = p, i.exports.kml = u, i.exports.kml.parse = f, i.exports.wkt = l, i.exports.wkt.parse = v
            }, {corslite: 5, csv2geojson: 6, polyline: 9, togeojson: 10, "topojson/topojson.js": 11, wellknown: 12}],
            2: [function (t, i, e) {
            }, {}],
            3: [function (t, i, e) {
                i.exports = t(2)
            }, {"/Users/tmcw/src/leaflet-omnivore/node_modules/browserify/lib/_empty.js": 2}],
            4: [function (e, n, o) {
                function s() {
                }

                var r = n.exports = {};
                r.nextTick = function () {
                    var e = "undefined" != typeof t && t.setImmediate, n = "undefined" != typeof t && t.MutationObserver, o = "undefined" != typeof t && t.postMessage && t.addEventListener;
                    if (e)return function (i) {
                        return t.setImmediate(i)
                    };
                    var s = [];
                    if (n) {
                        var r = i.createElement("div"), a = new MutationObserver(function () {
                            var t = s.slice();
                            s.length = 0, t.forEach(function (t) {
                                t()
                            })
                        });
                        return a.observe(r, {attributes: !0}), function (t) {
                            s.length || r.setAttribute("yes", "no"), s.push(t)
                        }
                    }
                    return o ? (t.addEventListener("message", function (i) {
                            var e = i.source;
                            if ((e === t || null === e) && "process-tick" === i.data && (i.stopPropagation(), s.length > 0)) {
                                var n = s.shift();
                                n()
                            }
                        }, !0), function (i) {
                            s.push(i), t.postMessage("process-tick", "*")
                        }) : function (t) {
                            setTimeout(t, 0)
                        }
                }(), r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.on = s, r.addListener = s, r.once = s, r.off = s, r.removeListener = s, r.removeAllListeners = s, r.emit = s, r.binding = function (t) {
                    throw new Error("process.binding is not supported")
                }, r.cwd = function () {
                    return "/"
                }, r.chdir = function (t) {
                    throw new Error("process.chdir is not supported")
                }
            }, {}],
            5: [function (i, n, o) {
                function s(i, n, o) {
                    function s(t) {
                        return t >= 200 && 300 > t || 304 === t
                    }

                    function r() {
                        u.status === e || s(u.status) ? n.call(u, null, u) : n.call(u, u, null)
                    }

                    var a = !1;
                    if ("undefined" == typeof t.XMLHttpRequest)return n(Error("Browser not supported"));
                    if ("undefined" == typeof o) {
                        var h = i.match(/^\s*https?:\/\/[^\/]*/);
                        o = h && h[0] !== location.protocol + "//" + location.domain + (location.port ? ":" + location.port : "")
                    }
                    var u = new t.XMLHttpRequest;
                    if (o && !("withCredentials" in u)) {
                        u = new t.XDomainRequest;
                        var l = n;
                        n = function () {
                            if (a) l.apply(this, arguments); else {
                                var t = this, i = arguments;
                                setTimeout(function () {
                                    l.apply(t, i)
                                }, 0)
                            }
                        }
                    }
                    return "onload" in u ? u.onload = r : u.onreadystatechange = function () {
                            4 === u.readyState && r()
                        }, u.onerror = function (t) {
                        n.call(this, t || !0, null), n = function () {
                        }
                    }, u.onprogress = function () {
                    }, u.ontimeout = function (t) {
                        n.call(this, t, null), n = function () {
                        }
                    }, u.onabort = function (t) {
                        n.call(this, t, null), n = function () {
                        }
                    }, u.open("GET", i, !0), u.send(null), a = !0, u
                }

                "undefined" != typeof n && (n.exports = s)
            }, {}],
            6: [function (t, i, n) {
                function o(t) {
                    return !!t.match(/(Lat)(itude)?/gi)
                }

                function s(t) {
                    return !!t.match(/(L)(on|ng)(gitude)?/i)
                }

                function r(t) {
                    return "object" == typeof t ? Object.keys(t).length : 0
                }

                function a(t) {
                    var i = [",", ";", "	", "|"], e = [];
                    return i.forEach(function (i) {
                        var n = d(i).parse(t);
                        if (n.length >= 1) {
                            for (var o = r(n[0]), s = 0; s < n.length; s++)if (r(n[s]) !== o)return;
                            e.push({delimiter: i, arity: Object.keys(n[0]).length})
                        }
                    }), e.length ? e.sort(function (t, i) {
                            return i.arity - t.arity
                        })[0].delimiter : null
                }

                function h(t) {
                    var i = a(t);
                    return i ? d(i).parse(t) : null
                }

                function u(t, i, n) {
                    n || (n = i, i = {}), i.delimiter = i.delimiter || ",";
                    var r = i.latfield || "", h = i.lonfield || "", u = [], l = {
                        type: "FeatureCollection",
                        features: u
                    };
                    if ("auto" === i.delimiter && "string" == typeof t && (i.delimiter = a(t), !i.delimiter))return n({
                        type: "Error",
                        message: "Could not autodetect delimiter"
                    });
                    var c = "string" == typeof t ? d(i.delimiter).parse(t) : t;
                    if (!c.length)return n(null, l);
                    if (!r || !h) {
                        for (var p in c[0])!r && o(p) && (r = p), !h && s(p) && (h = p);
                        if (!r || !h) {
                            var f = [];
                            for (var _ in c[0])f.push(_);
                            return n({
                                type: "Error",
                                message: "Latitude and longitude fields not present",
                                data: c,
                                fields: f
                            })
                        }
                    }
                    for (var v = [], g = 0; g < c.length; g++)if (c[g][h] !== e && c[g][h] !== e) {
                        var y, M, x, b = c[g][h], w = c[g][r];
                        x = m(b, "EW"), x && (b = x), x = m(w, "NS"), x && (w = x), y = parseFloat(b), M = parseFloat(w), isNaN(y) || isNaN(M) ? v.push({
                                message: "A row contained an invalid value for latitude or longitude",
                                row: c[g]
                            }) : (i.includeLatLon || (delete c[g][h], delete c[g][r]), u.push({
                                type: "Feature",
                                properties: c[g],
                                geometry: {type: "Point", coordinates: [parseFloat(y), parseFloat(M)]}
                            }))
                    }
                    n(v.length ? v : null, l)
                }

                function l(t) {
                    for (var i = t.features, e = {
                        type: "Feature",
                        geometry: {type: "LineString", coordinates: []}
                    }, n = 0; n < i.length; n++)e.geometry.coordinates.push(i[n].geometry.coordinates);
                    return e.properties = i[0].properties, {type: "FeatureCollection", features: [e]}
                }

                function c(t) {
                    for (var i = t.features, e = {
                        type: "Feature",
                        geometry: {type: "Polygon", coordinates: [[]]}
                    }, n = 0; n < i.length; n++)e.geometry.coordinates[0].push(i[n].geometry.coordinates);
                    return e.properties = i[0].properties, {type: "FeatureCollection", features: [e]}
                }

                var d = t("dsv"), m = t("sexagesimal");
                i.exports = {
                    isLon: s,
                    isLat: o,
                    csv: d.csv.parse,
                    tsv: d.tsv.parse,
                    dsv: d,
                    auto: h,
                    csv2geojson: u,
                    toLine: l,
                    toPolygon: c
                }
            }, {dsv: 7, sexagesimal: 8}],
            7: [function (t, i, e) {
                t("fs");
                i.exports = new Function('dsv.version = "0.0.3";\n\ndsv.tsv = dsv("\\t");\ndsv.csv = dsv(",");\n\nfunction dsv(delimiter) {\n  var dsv = {},\n      reFormat = new RegExp("[\\"" + delimiter + "\\n]"),\n      delimiterCode = delimiter.charCodeAt(0);\n\n  dsv.parse = function(text, f) {\n    var o;\n    return dsv.parseRows(text, function(row, i) {\n      if (o) return o(row, i - 1);\n      var a = new Function("d", "return {" + row.map(function(name, i) {\n        return JSON.stringify(name) + ": d[" + i + "]";\n      }).join(",") + "}");\n      o = f ? function(row, i) { return f(a(row), i); }: a;\n    });\n  };\n\n  dsv.parseRows = function(text, f) {\n    var EOL = {}, // sentinel value for end-of-line\n        EOF = {}, // sentinel value for end-of-file\n        rows = [], // output rows\n        N = text.length,\n        I = 0, // current character index\n        n = 0, // the current line number\n        t, // the current token\n        eol; // is the current token followed  by EOL?\n\n    function token() {\n      if (I >= N) return EOF; // special case: end of file\n      if (eol) return eol = false, EOL; // special case: end of line\n\n      // special case: quotes\n      var j = I;\n      if (text.charCodeAt(j) === 34) {\n        var i = j;\n        while (i++ < N) {\n          if (text.charCodeAt(i) === 34) {\n            if (text.charCodeAt(i + 1) !== 34) break;\n            ++i;\n          }\n        }\n        I = i + 2;\n        var c = text.charCodeAt(i + 1);\n        if (c === 13) {\n          eol = true;\n          if (text.charCodeAt(i + 2) === 10) ++I;\n        } else if (c === 10) {\n          eol = true;\n        }\n        return text.substring(j + 1, i).replace(/""/g, "\\"");\n      }\n\n      // common case: find next delimiter or newline\n      while (I < N) {\n        var c = text.charCodeAt(I++), k = 1;\n        if (c === 10) eol = true; // \\n\n        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \\r|\\r\\n\n        else if (c !== delimiterCode) continue;\n        return text.substring(j, I - k);\n      }\n\n      // special case: last token before EOF\n      return text.substring(j);\n    }\n\n    while ((t = token()) !== EOF) {\n      var a = [];\n      while (t !== EOL && t !== EOF) {\n        a.push(t);\n        t = token();\n      }\n      if (f && !(a = f(a, n++))) continue;\n      rows.push(a);\n    }\n\n    return rows;\n  };\n\n  dsv.format = function(rows) {\n    if (Array.isArray(rows[0])) return dsv.formatRows(rows); // deprecated; use formatRows\n    var fieldSet = {}, fields = [];\n\n    // Compute unique fields in order of discovery.\n    rows.forEach(function(row) {\n      for (var field in row) {\n        if (!(field in fieldSet)) {\n          fields.push(fieldSet[field] = field);\n        }\n      }\n    });\n\n    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {\n      return fields.map(function(field) {\n        return formatValue(row[field]);\n      }).join(delimiter);\n    })).join("\\n");\n  };\n\n  dsv.formatRows = function(rows) {\n    return rows.map(formatRow).join("\\n");\n  };\n\n  function formatRow(row) {\n    return row.map(formatValue).join(delimiter);\n  }\n\n  function formatValue(text) {\n    return reFormat.test(text) ? "\\"" + text.replace(/\\"/g, "\\"\\"") + "\\"": text;\n  }\n\n  return dsv;\n}\n;return dsv')()
            }, {fs: 2}],
            8: [function (t, i, e) {
                i.exports = function (t, i) {
                    if (i || (i = "NSEW"), "string" != typeof t)return null;
                    var e = /^([0-9.]+)°? *(?:([0-9.]+)['’′‘] *)?(?:([0-9.]+)(?:''|"|”|″) *)?([NSEW])?/, n = t.match(e);
                    return n ? n[4] && -1 === i.indexOf(n[4]) ? null : ((n[1] ? parseFloat(n[1]) : 0) + (n[2] ? parseFloat(n[2]) / 60 : 0) + (n[3] ? parseFloat(n[3]) / 3600 : 0)) * (n[4] && "S" === n[4] || "W" === n[4] ? -1 : 1) : null
                }
            }, {}],
            9: [function (t, i, n) {
                function o(t, i) {
                    t = Math.round(t * i), t <<= 1, 0 > t && (t = ~t);
                    for (var e = ""; t >= 32;)e += String.fromCharCode((32 | 31 & t) + 63), t >>= 5;
                    return e += String.fromCharCode(t + 63)
                }

                var s = {};
                s.decode = function (t, i) {
                    for (var e, n, o = 0, s = 0, r = 0, a = [], h = 0, u = 0, l = null, c = Math.pow(10, i || 5); o < t.length;) {
                        l = null, h = 0, u = 0;
                        do l = t.charCodeAt(o++) - 63, u |= (31 & l) << h, h += 5; while (l >= 32);
                        e = 1 & u ? ~(u >> 1) : u >> 1, h = u = 0;
                        do l = t.charCodeAt(o++) - 63, u |= (31 & l) << h, h += 5; while (l >= 32);
                        n = 1 & u ? ~(u >> 1) : u >> 1, s += e, r += n, a.push([s / c, r / c])
                    }
                    return a
                }, s.encode = function (t, i) {
                    if (!t.length)return "";
                    for (var e = Math.pow(10, i || 5), n = o(t[0][0], e) + o(t[0][1], e), s = 1; s < t.length; s++) {
                        var r = t[s], a = t[s - 1];
                        n += o(r[0] - a[0], e), n += o(r[1] - a[1], e)
                    }
                    return n
                }, typeof i !== e && (i.exports = s)
            }, {}],
            10: [function (t, i, n) {
                (function (o) {
                    toGeoJSON = function () {
                        "use strict";
                        function i(t) {
                            if (!t || !t.length)return 0;
                            for (var i = 0, e = 0; i < t.length; i++)e = (e << 5) - e + t.charCodeAt(i) | 0;
                            return e
                        }

                        function s(t, i) {
                            return t.getElementsByTagName(i)
                        }

                        function r(t, i) {
                            return t.getAttribute(i)
                        }

                        function a(t, i) {
                            return parseFloat(r(t, i))
                        }

                        function h(t, i) {
                            var e = s(t, i);
                            return e.length ? e[0] : null
                        }

                        function u(t) {
                            return t.normalize && t.normalize(), t
                        }

                        function l(t) {
                            for (var i = 0, e = []; i < t.length; i++)e[i] = parseFloat(t[i]);
                            return e
                        }

                        function c(t) {
                            var i = {};
                            for (var e in t)t[e] && (i[e] = t[e]);
                            return i
                        }

                        function d(t) {
                            return t && u(t), t && t.firstChild && t.firstChild.nodeValue || ""
                        }

                        function m(t) {
                            return l(t.replace(y, "").split(","))
                        }

                        function p(t) {
                            for (var i = t.replace(M, "").split(x), e = [], n = 0; n < i.length; n++)e.push(m(i[n]));
                            return e
                        }

                        function f(t) {
                            var i = [a(t, "lon"), a(t, "lat")], e = h(t, "ele"), n = h(t, "time");
                            return e && i.push(parseFloat(d(e))), {coordinates: i, time: n ? d(n) : null}
                        }

                        function _() {
                            return {type: "FeatureCollection", features: []}
                        }

                        function v(t) {
                            return t.xml !== e ? t.xml : g.serializeToString(t)
                        }

                        var g, y = /\s*/g, M = /^\s*|\s*$/g, x = /\s+/;
                        "undefined" != typeof XMLSerializer ? g = new XMLSerializer : "object" != typeof n || "object" != typeof o || o.browser || (g = new (t("xmldom").XMLSerializer));
                        var b = {
                            kml: function (t) {
                                function n(t) {
                                    var i, n;
                                    return t = t || "", "#" === t.substr(0, 1) && (t = t.substr(1)), (6 === t.length || 3 === t.length) && (i = t), 8 === t.length && (n = parseInt(t.substr(0, 2), 16) / 255, i = t.substr(2)), [i, isNaN(n) ? e : n]
                                }

                                function o(t) {
                                    return l(t.split(" "))
                                }

                                function a(t) {
                                    var i = s(t, "coord", "gx"), e = [], n = [];
                                    0 === i.length && (i = s(t, "gx:coord"));
                                    for (var r = 0; r < i.length; r++)e.push(o(d(i[r])));
                                    for (var a = s(t, "when"), r = 0; r < a.length; r++)n.push(d(a[r]));
                                    return {coords: e, times: n}
                                }

                                function u(t) {
                                    var i, e, n, o, r, l = [], c = [];
                                    if (h(t, "MultiGeometry"))return u(h(t, "MultiGeometry"));
                                    if (h(t, "MultiTrack"))return u(h(t, "MultiTrack"));
                                    if (h(t, "gx:MultiTrack"))return u(h(t, "gx:MultiTrack"));
                                    for (n = 0; n < y.length; n++)if (e = s(t, y[n]))for (o = 0; o < e.length; o++)if (i = e[o], "Point" == y[n]) l.push({
                                        type: "Point",
                                        coordinates: m(d(h(i, "coordinates")))
                                    }); else if ("LineString" == y[n]) l.push({
                                        type: "LineString",
                                        coordinates: p(d(h(i, "coordinates")))
                                    }); else if ("Polygon" == y[n]) {
                                        var f = s(i, "LinearRing"), _ = [];
                                        for (r = 0; r < f.length; r++)_.push(p(d(h(f[r], "coordinates"))));
                                        l.push({type: "Polygon", coordinates: _})
                                    } else if ("Track" == y[n] || "gx:Track" == y[n]) {
                                        var v = a(i);
                                        l.push({
                                            type: "LineString",
                                            coordinates: v.coords
                                        }), v.times.length && c.push(v.times)
                                    }
                                    return {geoms: l, coordTimes: c}
                                }

                                function c(t) {
                                    var i, e = u(t), o = {}, a = d(h(t, "name")), l = d(h(t, "styleUrl")), c = d(h(t, "description")), m = h(t, "TimeSpan"), p = h(t, "ExtendedData"), f = h(t, "LineStyle"), _ = h(t, "PolyStyle");
                                    if (!e.geoms.length)return [];
                                    if (a && (o.name = a), l && g[l] && (o.styleUrl = l, o.styleHash = g[l]), c && (o.description = c), m) {
                                        var v = d(h(m, "begin")), y = d(h(m, "end"));
                                        o.timespan = {begin: v, end: y}
                                    }
                                    if (f) {
                                        var M = n(d(h(f, "color"))), x = M[0], b = M[1], w = parseFloat(d(h(f, "width")));
                                        x && (o.stroke = x), isNaN(b) || (o["stroke-opacity"] = b), isNaN(w) || (o["stroke-width"] = w)
                                    }
                                    if (_) {
                                        var T = n(d(h(_, "color"))), P = T[0], C = T[1], k = d(h(_, "fill")), S = d(h(_, "outline"));
                                        P && (o.fill = P), isNaN(C) || (o["fill-opacity"] = C), k && (o["fill-opacity"] = "1" === k ? 1 : 0), S && (o["stroke-opacity"] = "1" === S ? 1 : 0)
                                    }
                                    if (p) {
                                        var U = s(p, "Data"), E = s(p, "SimpleData");
                                        for (i = 0; i < U.length; i++)o[U[i].getAttribute("name")] = d(h(U[i], "value"));
                                        for (i = 0; i < E.length; i++)o[E[i].getAttribute("name")] = d(E[i])
                                    }
                                    e.coordTimes.length && (o.coordTimes = 1 === e.coordTimes.length ? e.coordTimes[0] : e.coordTimes);
                                    var L = {
                                        type: "Feature",
                                        geometry: 1 === e.geoms.length ? e.geoms[0] : {
                                                type: "GeometryCollection",
                                                geometries: e.geoms
                                            },
                                        properties: o
                                    };
                                    return r(t, "id") && (L.id = r(t, "id")), [L]
                                }

                                for (var f = _(), g = {}, y = ["Polygon", "LineString", "Point", "Track", "gx:Track"], M = s(t, "Placemark"), x = s(t, "Style"), b = 0; b < x.length; b++)g["#" + r(x[b], "id")] = i(v(x[b])).toString(16);
                                for (var w = 0; w < M.length; w++)f.features = f.features.concat(c(M[w]));
                                return f
                            }, gpx: function (t) {
                                function i(t, i) {
                                    var e = s(t, i), n = [], o = [], r = e.length;
                                    if (!(2 > r)) {
                                        for (var a = 0; r > a; a++) {
                                            var h = f(e[a]);
                                            n.push(h.coordinates), h.time && o.push(h.time)
                                        }
                                        return {line: n, times: o}
                                    }
                                }

                                function e(t) {
                                    for (var e, n = s(t, "trkseg"), o = [], a = [], h = 0; h < n.length; h++)e = i(n[h], "trkpt"), e.line && o.push(e.line), e.times.length && a.push(e.times);
                                    if (0 !== o.length) {
                                        var u = r(t);
                                        return a.length && (u.coordTimes = 1 === o.length ? a[0] : a), {
                                            type: "Feature",
                                            properties: u,
                                            geometry: {
                                                type: 1 === o.length ? "LineString" : "MultiLineString",
                                                coordinates: 1 === o.length ? o[0] : o
                                            }
                                        }
                                    }
                                }

                                function n(t) {
                                    var e = i(t, "rtept");
                                    if (e) {
                                        var n = {
                                            type: "Feature",
                                            properties: r(t),
                                            geometry: {type: "LineString", coordinates: e}
                                        };
                                        return e.times.length && (n.geometry.times = e.times), n
                                    }
                                }

                                function o(t) {
                                    var i = r(t);
                                    return i.sym = d(h(t, "sym")), {
                                        type: "Feature",
                                        properties: i,
                                        geometry: {type: "Point", coordinates: f(t).coordinates}
                                    }
                                }

                                function r(t) {
                                    var i, e = ["name", "desc", "author", "copyright", "link", "time", "keywords"], n = {};
                                    for (i = 0; i < e.length; i++)n[e[i]] = d(h(t, e[i]));
                                    return c(n)
                                }

                                var a, u, l = s(t, "trk"), m = s(t, "rte"), p = s(t, "wpt"), v = _();
                                for (a = 0; a < l.length; a++)u = e(l[a]), u && v.features.push(u);
                                for (a = 0; a < m.length; a++)u = n(m[a]), u && v.features.push(u);
                                for (a = 0; a < p.length; a++)v.features.push(o(p[a]));
                                return v
                            }
                        };
                        return b
                    }(), "undefined" != typeof i && (i.exports = toGeoJSON)
                }).call(this, t("_process"))
            }, {_process: 4, xmldom: 3}],
            11: [function (t, i, e) {
                !function () {
                    function t(t, i) {
                        function e(i) {
                            var e, n = t.arcs[0 > i ? ~i : i], o = n[0];
                            return t.transform ? (e = [0, 0], n.forEach(function (t) {
                                    e[0] += t[0], e[1] += t[1]
                                })) : e = n[n.length - 1], 0 > i ? [e, o] : [o, e]
                        }

                        function n(t, i) {
                            for (var e in t) {
                                var n = t[e];
                                delete i[n.start], delete n.start, delete n.end, n.forEach(function (t) {
                                    o[0 > t ? ~t : t] = 1
                                }), a.push(n)
                            }
                        }

                        var o = {}, s = {}, r = {}, a = [], h = -1;
                        return i.forEach(function (e, n) {
                            var o, s = t.arcs[0 > e ? ~e : e];
                            s.length < 3 && !s[1][0] && !s[1][1] && (o = i[++h], i[h] = e, i[n] = o)
                        }), i.forEach(function (t) {
                            var i, n, o = e(t), a = o[0], h = o[1];
                            if (i = r[a])if (delete r[i.end], i.push(t), i.end = h, n = s[h]) {
                                delete s[n.start];
                                var u = n === i ? i : i.concat(n);
                                s[u.start = i.start] = r[u.end = n.end] = u
                            } else s[i.start] = r[i.end] = i; else if (i = s[h])if (delete s[i.start], i.unshift(t), i.start = a, n = r[a]) {
                                delete r[n.end];
                                var l = n === i ? i : n.concat(i);
                                s[l.start = n.start] = r[l.end = i.end] = l
                            } else s[i.start] = r[i.end] = i; else i = [t], s[i.start = a] = r[i.end = h] = i
                        }), n(r, s), n(s, r), i.forEach(function (t) {
                            o[0 > t ? ~t : t] || a.push([t])
                        }), a
                    }

                    function e(i, e, n) {
                        function o(t) {
                            var i = 0 > t ? ~t : t;
                            (l[i] || (l[i] = [])).push({i: t, g: u})
                        }

                        function s(t) {
                            t.forEach(o)
                        }

                        function r(t) {
                            t.forEach(s)
                        }

                        function a(t) {
                            "GeometryCollection" === t.type ? t.geometries.forEach(a) : t.type in c && (u = t, c[t.type](t.arcs))
                        }

                        var h = [];
                        if (arguments.length > 1) {
                            var u, l = [], c = {
                                LineString: s,
                                MultiLineString: r,
                                Polygon: r,
                                MultiPolygon: function (t) {
                                    t.forEach(r)
                                }
                            };
                            a(e), l.forEach(arguments.length < 3 ? function (t) {
                                    h.push(t[0].i)
                                } : function (t) {
                                    n(t[0].g, t[t.length - 1].g) && h.push(t[0].i)
                                })
                        } else for (var d = 0, m = i.arcs.length; m > d; ++d)h.push(d);
                        return {type: "MultiLineString", arcs: t(i, h)}
                    }

                    function s(i, e) {
                        function o(t) {
                            t.forEach(function (i) {
                                i.forEach(function (i) {
                                    (r[i = 0 > i ? ~i : i] || (r[i] = [])).push(t)
                                })
                            }), a.push(t)
                        }

                        function s(t) {
                            return m(h(i, {type: "Polygon", arcs: [t]}).coordinates[0]) > 0
                        }

                        var r = {}, a = [], u = [];
                        return e.forEach(function (t) {
                            "Polygon" === t.type ? o(t.arcs) : "MultiPolygon" === t.type && t.arcs.forEach(o)
                        }), a.forEach(function (t) {
                            if (!t._) {
                                var i = [], e = [t];
                                for (t._ = 1, u.push(i); t = e.pop();)i.push(t), t.forEach(function (t) {
                                    t.forEach(function (t) {
                                        r[0 > t ? ~t : t].forEach(function (t) {
                                            t._ || (t._ = 1, e.push(t))
                                        })
                                    })
                                })
                            }
                        }), a.forEach(function (t) {
                            delete t._
                        }), {
                            type: "MultiPolygon", arcs: u.map(function (e) {
                                var o = [];
                                if (e.forEach(function (t) {
                                        t.forEach(function (t) {
                                            t.forEach(function (t) {
                                                r[0 > t ? ~t : t].length < 2 && o.push(t)
                                            })
                                        })
                                    }), o = t(i, o), (n = o.length) > 1)for (var a, h = s(e[0][0]), u = 0; u < n; ++u)if (h === s(o[u])) {
                                    a = o[0], o[0] = o[u], o[u] = a;
                                    break
                                }
                                return o
                            })
                        }
                    }

                    function r(t, i) {
                        return "GeometryCollection" === i.type ? {
                                type: "FeatureCollection",
                                features: i.geometries.map(function (i) {
                                    return a(t, i)
                                })
                            } : a(t, i)
                    }

                    function a(t, i) {
                        var e = {type: "Feature", id: i.id, properties: i.properties || {}, geometry: h(t, i)};
                        return null == i.id && delete e.id, e
                    }

                    function h(t, i) {
                        function e(t, i) {
                            i.length && i.pop();
                            for (var e, n = l[0 > t ? ~t : t], o = 0, s = n.length; s > o; ++o)i.push(e = n[o].slice()), h(e, o);
                            0 > t && u(i, s)
                        }

                        function n(t) {
                            return t = t.slice(), h(t, 0), t
                        }

                        function o(t) {
                            for (var i = [], n = 0, o = t.length; o > n; ++n)e(t[n], i);
                            return i.length < 2 && i.push(i[0].slice()), i
                        }

                        function s(t) {
                            for (var i = o(t); i.length < 4;)i.push(i[0].slice());
                            return i
                        }

                        function r(t) {
                            return t.map(s)
                        }

                        function a(t) {
                            var i = t.type;
                            return "GeometryCollection" === i ? {
                                    type: i,
                                    geometries: t.geometries.map(a)
                                } : i in c ? {type: i, coordinates: c[i](t)} : null
                        }

                        var h = v(t.transform), l = t.arcs, c = {
                            Point: function (t) {
                                return n(t.coordinates)
                            }, MultiPoint: function (t) {
                                return t.coordinates.map(n)
                            }, LineString: function (t) {
                                return o(t.arcs)
                            }, MultiLineString: function (t) {
                                return t.arcs.map(o)
                            }, Polygon: function (t) {
                                return r(t.arcs)
                            }, MultiPolygon: function (t) {
                                return t.arcs.map(r)
                            }
                        };
                        return a(i)
                    }

                    function u(t, i) {
                        for (var e, n = t.length, o = n - i; o < --n;)e = t[o], t[o++] = t[n], t[n] = e
                    }

                    function l(t, i) {
                        for (var e = 0, n = t.length; n > e;) {
                            var o = e + n >>> 1;
                            t[o] < i ? e = o + 1 : n = o
                        }
                        return e
                    }

                    function c(t) {
                        function i(t, i) {
                            t.forEach(function (t) {
                                0 > t && (t = ~t);
                                var e = o[t];
                                e ? e.push(i) : o[t] = [i]
                            })
                        }

                        function e(t, e) {
                            t.forEach(function (t) {
                                i(t, e)
                            })
                        }

                        function n(t, i) {
                            "GeometryCollection" === t.type ? t.geometries.forEach(function (t) {
                                    n(t, i)
                                }) : t.type in r && r[t.type](t.arcs, i)
                        }

                        var o = {}, s = t.map(function () {
                            return []
                        }), r = {
                            LineString: i, MultiLineString: e, Polygon: e, MultiPolygon: function (t, i) {
                                t.forEach(function (t) {
                                    e(t, i)
                                })
                            }
                        };
                        t.forEach(n);
                        for (var a in o)for (var h = o[a], u = h.length, c = 0; u > c; ++c)for (var d = c + 1; u > d; ++d) {
                            var m, p = h[c], f = h[d];
                            (m = s[p])[a = l(m, f)] !== f && m.splice(a, 0, f), (m = s[f])[a = l(m, p)] !== p && m.splice(a, 0, p)
                        }
                        return s
                    }

                    function d(t, i) {
                        function e(t) {
                            r.remove(t), t[1][2] = i(t), r.push(t)
                        }

                        var n, o = v(t.transform), s = g(t.transform), r = _(), a = 0;
                        for (i || (i = p), t.arcs.forEach(function (t) {
                            var e = [];
                            t.forEach(o);
                            for (var s = 1, a = t.length - 1; a > s; ++s)n = t.slice(s - 1, s + 2), n[1][2] = i(n), e.push(n), r.push(n);
                            t[0][2] = t[a][2] = 1 / 0;
                            for (var s = 0, a = e.length; a > s; ++s)n = e[s], n.previous = e[s - 1], n.next = e[s + 1]
                        }); n = r.pop();) {
                            var h = n.previous, u = n.next;
                            n[1][2] < a ? n[1][2] = a : a = n[1][2], h && (h.next = u, h[2] = n[2], e(h)), u && (u.previous = h, u[0] = n[0], e(u))
                        }
                        return t.arcs.forEach(function (t) {
                            t.forEach(s)
                        }), t
                    }

                    function m(t) {
                        for (var i, e = -1, n = t.length, o = t[n - 1], s = 0; ++e < n;)i = o, o = t[e], s += i[0] * o[1] - i[1] * o[0];
                        return .5 * s
                    }

                    function p(t) {
                        var i = t[0], e = t[1], n = t[2];
                        return Math.abs((i[0] - n[0]) * (e[1] - i[1]) - (i[0] - e[0]) * (n[1] - i[1]))
                    }

                    function f(t, i) {
                        return t[1][2] - i[1][2]
                    }

                    function _() {
                        function t(t, i) {
                            for (; i > 0;) {
                                var e = (i + 1 >> 1) - 1, o = n[e];
                                if (f(t, o) >= 0)break;
                                n[o._ = i] = o, n[t._ = i = e] = t
                            }
                        }

                        function i(t, i) {
                            for (; ;) {
                                var e = i + 1 << 1, s = e - 1, r = i, a = n[r];
                                if (o > s && f(n[s], a) < 0 && (a = n[r = s]), o > e && f(n[e], a) < 0 && (a = n[r = e]), r === i)break;
                                n[a._ = i] = a, n[t._ = i = r] = t
                            }
                        }

                        var e = {}, n = [], o = 0;
                        return e.push = function (i) {
                            return t(n[i._ = o] = i, o++), o
                        }, e.pop = function () {
                            if (!(0 >= o)) {
                                var t, e = n[0];
                                return --o > 0 && (t = n[o], i(n[t._ = 0] = t, 0)), e
                            }
                        }, e.remove = function (e) {
                            var s, r = e._;
                            if (n[r] === e)return r !== --o && (s = n[o], (f(s, e) < 0 ? t : i)(n[s._ = r] = s, r)), r
                        }, e
                    }

                    function v(t) {
                        if (!t)return y;
                        var i, e, n = t.scale[0], o = t.scale[1], s = t.translate[0], r = t.translate[1];
                        return function (t, a) {
                            a || (i = e = 0), t[0] = (i += t[0]) * n + s, t[1] = (e += t[1]) * o + r
                        }
                    }

                    function g(t) {
                        if (!t)return y;
                        var i, e, n = t.scale[0], o = t.scale[1], s = t.translate[0], r = t.translate[1];
                        return function (t, a) {
                            a || (i = e = 0);
                            var h = (t[0] - s) / n | 0, u = (t[1] - r) / o | 0;
                            t[0] = h - i, t[1] = u - e, i = h, e = u
                        }
                    }

                    function y() {
                    }

                    var M = {
                        version: "1.6.8", mesh: function (t) {
                            return h(t, e.apply(this, arguments))
                        }, meshArcs: e, merge: function (t) {
                            return h(t, s.apply(this, arguments))
                        }, mergeArcs: s, feature: r, neighbors: c, presimplify: d
                    };
                    "function" == typeof o && o.amd ? o(M) : "object" == typeof i && i.exports ? i.exports = M : this.topojson = M
                }()
            }, {}],
            12: [function (t, i, e) {
                function n(t) {
                    function i(i) {
                        var e = t.substring(v).match(i);
                        return e ? (v += e[0].length, e[0]) : null
                    }

                    function e(t) {
                        return t && _.match(/\d+/) && (t.crs = {
                            type: "name",
                            properties: {name: "urn:ogc:def:crs:EPSG::" + _}
                        }), t
                    }

                    function n() {
                        i(/^\s*/)
                    }

                    function o() {
                        n();
                        for (var t, e = 0, o = [], r = [o], a = o; t = i(/^(\()/) || i(/^(\))/) || i(/^(\,)/) || i(s);) {
                            if ("(" == t) r.push(a), a = [], r[r.length - 1].push(a), e++; else if (")" == t) {
                                if (a = r.pop(), !a)return;
                                if (e--, 0 === e)break
                            } else if ("," === t) a = [], r[r.length - 1].push(a); else {
                                if (isNaN(parseFloat(t)))return null;
                                a.push(parseFloat(t))
                            }
                            n()
                        }
                        return 0 !== e ? null : o
                    }

                    function r() {
                        for (var t, e, o = []; e = i(s) || i(/^(\,)/);)"," == e ? (o.push(t), t = []) : (t || (t = []), t.push(parseFloat(e))), n();
                        return t && o.push(t), o.length ? o : null
                    }

                    function a() {
                        if (!i(/^(point)/i))return null;
                        if (n(), !i(/^(\()/))return null;
                        var t = r();
                        return t ? (n(), i(/^(\))/) ? {type: "Point", coordinates: t[0]} : null) : null
                    }

                    function h() {
                        if (!i(/^(multipoint)/i))return null;
                        n();
                        var t = o();
                        return t ? (n(), {type: "MultiPoint", coordinates: t}) : null
                    }

                    function u() {
                        if (!i(/^(multilinestring)/i))return null;
                        n();
                        var t = o();
                        return t ? (n(), {type: "MultiLineString", coordinates: t}) : null
                    }

                    function l() {
                        if (!i(/^(linestring)/i))return null;
                        if (n(), !i(/^(\()/))return null;
                        var t = r();
                        return t && i(/^(\))/) ? {type: "LineString", coordinates: t} : null
                    }

                    function c() {
                        return i(/^(polygon)/i) ? (n(), {type: "Polygon", coordinates: o()}) : null
                    }

                    function d() {
                        return i(/^(multipolygon)/i) ? (n(), {type: "MultiPolygon", coordinates: o()}) : null
                    }

                    function m() {
                        var t, e = [];
                        if (!i(/^(geometrycollection)/i))return null;
                        if (n(), !i(/^(\()/))return null;
                        for (; t = p();)e.push(t), n(), i(/^(\,)/), n();
                        return i(/^(\))/) ? {type: "GeometryCollection", geometries: e} : null
                    }

                    function p() {
                        return a() || l() || c() || h() || u() || d() || m()
                    }

                    var f = t.split(";"), t = f.pop(), _ = (f.shift() || "").split("=").pop(), v = 0;
                    return e(p())
                }

                function o(t) {
                    function i(t) {
                        return 2 === t.length ? t[0] + " " + t[1] : 3 === t.length ? t[0] + " " + t[1] + " " + t[2] : void 0
                    }

                    function e(t) {
                        return t.map(i).join(", ")
                    }

                    function n(t) {
                        return t.map(e).map(r).join(", ")
                    }

                    function s(t) {
                        return t.map(n).map(r).join(", ")
                    }

                    function r(t) {
                        return "(" + t + ")"
                    }

                    switch ("Feature" === t.type && (t = t.geometry), t.type) {
                        case"Point":
                            return "POINT (" + i(t.coordinates) + ")";
                        case"LineString":
                            return "LINESTRING (" + e(t.coordinates) + ")";
                        case"Polygon":
                            return "POLYGON (" + n(t.coordinates) + ")";
                        case"MultiPoint":
                            return "MULTIPOINT (" + e(t.coordinates) + ")";
                        case"MultiPolygon":
                            return "MULTIPOLYGON (" + s(t.coordinates) + ")";
                        case"MultiLineString":
                            return "MULTILINESTRING (" + n(t.coordinates) + ")";
                        case"GeometryCollection":
                            return "GEOMETRYCOLLECTION (" + t.geometries.map(o).join(", ") + ")";
                        default:
                            throw new Error("stringify requires a valid GeoJSON Feature or geometry object as input")
                    }
                }

                i.exports = n, i.exports.parse = n, i.exports.stringify = o;
                var s = /^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/
            }, {}]
        }, {}, [1])(1)
    }), r.Kml = r.FeatureGroup.extend({
        regExp: {removeSpace: /\s*/g, trimSpace: /^\s*|\s*$/g, splitSpace: /\s+/},
        initialize: function (t, i) {
            var e;
            r.setOptions(this, i), this._layers = {}, this._url = t, e = r.Util.bind(this._onLoad, this), this._xhr = s(t, e)
        },
        _onLoad: function (t, i) {
            if (t)throw new Error("KML load fail.");
            this._parse(i.responseXML || i.responseText)
        },
        _parse: function (t) {
            var i, e, n, o, s, a, h = this._parseXML(t), u = this._get(h, "Placemark");
            for (i = 0, e = u.length; e > i; i++)console.log(this._getPlaceMarkType(u[i])), a = this._getFirst(u[i], "LineString"), a ? (console.log(a), n = this._nodeValue(this._getFirst(a, "coordinates")), n = this._coord(n), console.log(n), this.addLayer(r.polyline(n))) : (o = this._nodeValue(this._getFirst(u[i], "name")), s = this._nodeValue(this._getFirst(u[i], "description")), n = this._nodeValue(this._getFirst(u[i], "coordinates")), console.log(o, s, n), n = this._numArray(n.replace(this.regExp.removeSpace, "").split(",")), console.log(n), n && this.addLayer(r.marker(n).bindInfoWindow(o + "<br>" + s)))
        },
        _parseXML: function (t) {
            return "string" == typeof t ? (new DOMParser).parseFromString(t, "text/xml") : t
        },
        _get: function (t, i) {
            return t.getElementsByTagName(i)
        },
        _getFirst: function (t, i) {
            var e = this._get(t, i);
            return e.length ? e[0] : null
        },
        _attr: function (t, i) {
            return t.getAttribute(i)
        },
        _nomalize: function (t) {
            return t.normalize && t.normalize(), t
        },
        _nodeValue: function (t) {
            return t && this._nomalize(t), t && t.firstChild && t.firstChild.nodeValue || ""
        },
        _numArray: function (t) {
            var i, e, n;
            for (i = 0, n = [], e = t.length; e > i; i++)n[i] = parseFloat(t[i]);
            return n
        },
        _coordFirst: function (t) {
            return this._numArray(t.replace(this.regExp.removeSpace, "").split(","))
        },
        _coord: function (t) {
            var i, e, n = t.replace(this.regExp.trimSpace, "").split(this.regExp.splitSpace), o = [];
            for (i = 0, e = n.length; e > i; i++)o.push(this._coordFirst(n[i]));
            return o
        },
        _getPlaceMarkType: function (t) {
            for (var i, e = ["Point", "LineString"], n = 0; n < e.length; n++)return i = this._getFirst(t, e[n]), i ? e[n] : ""
        }
    }), r.kml = function (t, i, e) {
        return omnivore.kml(t, i, e)
    }
}(window, document);
// "