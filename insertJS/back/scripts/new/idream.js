var e = module,
    o = exports;
var i =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
              return typeof t;
          }
        : function(t) {
              return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
          };
window.JsonHttp = new (function() {
    var t = !1,
        e = !1,
        o = null,
        n = {},
        l = {},
        r = null,
        a = /^\d+$/,
        s = !1,
        c = "",
        _ = null,
        d = "";
    this.setDebug = function(e) {
        t = e;
    };
    this.setRSN = function(t) {
        e = t;
    };
    this.getUrl = function() {
        return o ? o() : "";
    };
    this.setSecondHandler = function(t) {
        _ = t;
    };
    this.setGetUrl = function(t) {
        o = t;
    };
    this.setWaitUI = function(t) {
        r = t;
    };
    this.subscribe = function(t, e, o) {
        var i = t.key.split("."),
            l = i[1],
            r = i[2],
            a = l + "_" + r;
        null != l && null != r
            ? (n[a] = {
                  mod: l,
                  type: r,
                  handler: e,
                  target: o
              })
            : cc.error("proto class is error!!!" + t.key);
    };
    this.sendWaitUIShow = function(t) {
        s = t;
        if (null != r && r.node && null != r.node.parent) {
            r.isShow = t;
            if (t) {
                r.scheduleOnce(function() {
                    r.node.active = r.isShow;
                }, 0.5);
                r.scheduleOnce(function() {
                    facade && facade.send("SHOW_RETRY_SEND");
                }, 15);
            } else {
                r.unscheduleAllCallbacks();
                r.node.active = t;
            }
        }
    };
    this.httpRequest = function(e, o, i, n) {
        var l =
                !(arguments.length > 4 && void 0 !== arguments[4]) ||
                arguments[4],
            r = (arguments.length > 5 &&
                void 0 !== arguments[5] &&
                arguments[5],
            this),
            a = null != o && -1 == o.indexOf("adok");
        this.sendWaitUIShow(a);
        var s = cc.loader.getXMLHttpRequest();
        s.onloadend = function() {
            if (null == s || null == s.status)
                cc.warn(e + " request is error!!!");
            else if (200 == s.status) {
                r.sendWaitUIShow(!1);
                if (null == s.response || "" == s.response || " " == s.response)
                    cc.warn(e + " request is error!!!");
                else {
                    var t = s.response;
                    if (null != t && 0 == t.indexOf("{")) {
                        var o = JSON.parse(s.response);
                        l && r.dealSub(o);
                        null != i && null != n
                            ? i.apply(n, [o])
                            : null != i && i(o);
                    } else cc.warn(e + " request is error!!!" + t);
                }
            } else cc.warn(e + " request is error!!!");
        };
        s.open("POST", e);
        if (null != o && "" != o) {
            t &&
                -1 == o.indexOf("adok") &&
                cc.log("open url:" + e + " ##send data##:" + o);
            s.send(o);
        } else s.send();
    };
    this.dealSub = function(t) {
        for (var e in t) {
            var o = t[e];
            if (o) {
                if (!this.isLinkMyUrl() && 10 * Math.random() < 5) return;
                this.dealItem(o, e);
            }
        }
    };
    this.dealItem = function(e, o) {
        for (var i in e)
            for (var l in e[i]) {
                var r = this.dealNumber(e[i][l]),
                    a = i + "_" + l,
                    s = n[a];
                if (null != s) {
                    t &&
                        cc.warn(
                            "[JosnHttp]MOD:" + i + " type:" + l + " accept"
                        );
                    if (t) s.handler.apply(s.target, [r]);
                    else
                        try {
                            s.handler.apply(s.target, [r]);
                        } catch (t) {
                            cc.warn(t.toString());
                        }
                } else
                    t &&
                        cc.warn(
                            "[JosnHttp][NOT-EXISTS]MOD:" + i + " type:" + l
                        );
            }
    };
    this.dealNumber = function(t) {
        if (!this.isLinkMyUrl()) return t;
        for (var e in t) {
            var o = t[e],
                n = "undefined" == typeof o ? "undefined" : i(o);
            null != o &&
                "number" != n &&
                ("object" == n
                    ? (t[e] = this.dealNumber(o))
                    : "string" == n &&
                      "" != n &&
                      null != n &&
                      o.length < 11 &&
                      a.test(o) &&
                      (t[e] = parseInt(o)));
        }
        return t;
    };
    this.record = function(t, e, o) {
        if ("a" == e) l[o] = t;
        else if ("u" == e) {
            var i = l[o];
            if (t instanceof Array)
                if (0 == t.length) i = t;
                else
                    for (var n = 0; n < t.length; n++) {
                        for (var r = !1, a = 0; a < i.length; a++)
                            if (i[a].id && t[n].id && i[a].id == t[n].id) {
                                i[a] = sList[n];
                                r = !0;
                            }
                        r || i.push(t[n]);
                    }
            else if (null != i && null != t) for (var e in t) i[e] = t[e];
            l[o] = i;
        }
        return l[o];
    };
    this.getServerUrl = function(t, e) {
        d = t;
        this.isLinkMyUrl() && this.httpRequest(t);
    };
    this.isLinkMyUrl = function() {
        var e = t && !cc.sys.isMobile;
        // if (!e) {
            // if (null == d && 10 * Math.random() < 5) return !1;
            // if (
            //     -1 == d.indexOf("kkk-game.com") &&
            //     -1 == d.indexOf("amoykkk.com") &&
            //     -1 == d.indexOf("xm-kkk.com") &&
            //     -1 == d.indexOf("kkkp4f.com") &&
            //     -1 == d.indexOf("id-g.com") &&
            //     -1 == d.indexOf("14817b.pathx.ucloudgda.com") &&
            //     -1 == d.indexOf("80d741.pathx.ucloudgda.com") &&
            //     -1 == d.indexOf("xianyuyouxi.com") &&
            //     d.indexOf("f90f87.pathx.ucloudgda.com")
            // )
            //     return !1;
        // }
        return !0;
    };
    this.send = function(t, o, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            l =
                !(arguments.length > 4 && void 0 !== arguments[4]) ||
                arguments[4];
        try {
            var a = null != t ? t.getJson() : "";
            if (s && c == a) return;
            null != r &&
                r.node &&
                null != r.node.parent &&
                n &&
                (r.node.active = !0);
            var d = a.indexOf("adok");
            if (-1 == d) {
                c = a;
                if (e && l) {
                    var u = this.encryptTime(_());
                    "" != u && "" != a && (a = this.encryptJson(a, u));
                }
            }
            this.httpRequest(this.getUrl(), a, o, i, !0, !0);
        } catch (t) {
            cc.log(t.toString());
        }
    };
    this.sendLast = function() {
        try {
            var t = c;
            if (e) {
                var o = this.encryptTime(_());
                "" != o && "" != t && (t = this.encryptJson(t, o));
            }
            this.httpRequest(this.getUrl(), t);
        } catch (t) {
            cc.log(t.toString());
        }
    };
    var u = [
        ["3", "1", "5", "8", "9", "7", "4", "2", "0", "6"],
        ["0", "5", "3", "2", "1", "7", "9", "4", "8", "6"],
        ["1", "0", "6", "7", "3", "8", "2", "5", "4", "9"],
        ["6", "1", "5", "4", "2", "9", "0", "3", "8", "7"],
        ["7", "6", "0", "2", "5", "8", "1", "4", "9", "3"],
        ["6", "5", "3", "4", "0", "2", "8", "1", "7", "9"],
        ["9", "6", "1", "4", "0", "5", "3", "2", "8", "7"],
        ["8", "9", "3", "1", "5", "7", "0", "6", "4", "2"],
        ["6", "2", "4", "9", "1", "5", "3", "8", "0", "7"]
    ];
    this.encryptTime = function(t) {
        for (
            var e = Math.floor(9 * Math.random()),
                t = t + "",
                o = "",
                i = t.length,
                n = 0;
            n < i;
            n++
        )
            for (var l = 0; l < u[e].length; l++)
                u[e][l] == t.substr(n, 1) && (o += l + "");
        return e + "" + o;
    };
    this.isBlank = function(t) {
        return (
            null == t ||
            "" == t ||
            " " == t ||
            "0" == t ||
            "null" == t ||
            "undefined" == t
        );
    };
    this.encryptJson = function(t, e) {
        if (this.isBlank(t)) return "";
        for (var o = !1, i = 0; i < t.length; i++)
            if (t.charCodeAt(i) > 127) {
                o = !0;
                t = encodeURI(t);
                break;
            }
        var n = "",
            l = Math.ceil(t.length / 20);
        l = (l = Math.ceil(Math.random() * l + l / 2)) > 9 ? 9 : l;
        for (var r = 0, a = 0, i = 0; i < t.length; i++) {
            n += t[r * l + a];
            if (++r * l + a >= t.length) {
                a++;
                r = 0;
            }
        }
        return n + "#" + l + (o ? "1" : "0") + e;
    };
})();

window.facade = new (function() {
    var t = !1,
        e = {},
        o = [],
        i = 0,
        n = !0;
    this.setDebug = function(e) {
        t = e;
    };
    this.setSubscribeEnable = function(t) {
        n = t;
    };
    this.send = function(o, i) {
        var l = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (n) {
            t && cc.log("[FACADE]send:" + o);
            var r = null,
                a = 0,
                s = null;
            for (var c in e) {
                var _ = e[c],
                    d = _[o];
                if (null != d)
                    if (l) {
                        var u = parseInt(c.replace("__", ""));
                        if (u > a) {
                            a = u;
                            s = _.__target;
                            r = d;
                        }
                    } else d.apply(_.__target, null != i ? [i] : null);
            }
            l && null != r && r.apply(s, null != i ? [i] : null);
        }
    };
    
    this.subscribe = function(o, n, l) {
        var r =
                !(arguments.length > 3 && void 0 !== arguments[3]) ||
                arguments[3],
            a = l.__name;
        if (null == a) {
            l.__name = a = "__" + i++;
            var s = this;
            r &&
                (l.onDestroy = function() {
                    t && cc.log("[FACADE]remove:" + o + " id:" + l.__name);
                    s.remove(l);
                });
        }
        var c = e[a];
        if (null == c) {
            c = {
                __target: l
            };
            e[a] = c;
        }
        c[o] = n;
    };
    this.remove = function(t) {
        var o = t.__name;
        e[o] = null;
        delete e[o];
    };
    this.removeAll = function() {
        e = {};
    };
    this.clostView = function(t) {
        if (t) {
            this.remove(t);
            t.node.destroy();
        }
    };
    this.addBean = function(e) {
        t && cc.log("[FACADE]addBean:" + e.constructor.name);
        o.push(e);
    };
    this.eachBean = function(e, i) {
        t && cc.log("[FACADE]eachBean:" + e);
        for (var n = 0, l = o.length; n < l; n++) {
            var r = o[n];
            if (e in r)
                try {
                    r[e].apply(r, i);
                } catch (t) {
                    cc.error(
                        "[FACADE]eachBean error: " +
                            r.constructor.name +
                            " " +
                            t.toString()
                    );
                }
        }
    };
})();
window.localcache = new (function() {
    var t = null,
        e = null,
        o = {},
        i = {};
    this.clearData = function() {
        t = null;
        e = null;
        o = {};
        i = {};
    };
    this.init = function(o, i) {
        if (!t) {
            t = o;
            e = i;
        }
    };
    this.getItem = function(i, n) {
        if (null == t) return null;
        var l = o[i];
        if (null == l) {
            var r = e[i];
            if (null == r) return null;
            l = {};
            o[i] = l;
            var a = t[i];
            if (null == a) {
                cc.warn("loacal data table " + i + " is not find!!");
                return null;
            }
            for (var s = 0, c = a.length; s < c; s++) {
                var _ = a[s];
                l[_[r]] = _;
            }
        }
        return l[n];
    };
    this.getList = function(e) {
        return null == t ? null : t[e];
    };
    this.getGroup = function(e, o, n) {
        if (null == t) return null;
        var l = i[e];
        if (null == l) {
            l = {};
            i[e] = l;
        }
        var r = l[o];
        if (null == r) {
            r = {};
            l[o] = r;
            var a = t[e];
            if (null == a) {
                cc.warn("loacal data table " + e + " is not find!!");
                return null;
            }
            for (var s = 0, c = a.length; s < c; s++) {
                var _ = a[s],
                    d = _[o];
                null == r[d] ? (r[d] = [_]) : r[d].push(_);
            }
        }
        return r[n];
    };
    this.save = function(e, n) {
        t[e] = n;
        o[e] = null;
        i[e] = null;
        cc.log("LocalCache.save: " + e + " Size:" + (null != n ? n.length : 0));
    };
    this.addData = function(e) {
        for (var o in e) t[o] = e[o];
    };
})();
var n = (function() {
    function t() {}
    t.prototype.init = function(t, e) {
        var o =
            arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
        this.endHand = t;
        this.errorHand = e;
        this.progressHand = o;
        this.cur_load_items = [];
        if (null == this.jsb_load_item) {
            var i = new jsb.Downloader();
            i.setOnFileTaskSuccess(this.onLoadEnd.bind(this));
            i.setOnTaskProgress(this.onLoadProgress.bind(this));
            i.setOnTaskError(this.onLoadError.bind(this));
            this.jsb_load_item = i;
        }
    };
    t.prototype.createDownloadFileTask = function(t, e, o) {
        var i =
                arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0,
            n =
                !(arguments.length > 4 && void 0 !== arguments[4]) ||
                arguments[4],
            l = {};
        l.url = t;
        l.storeUrl = e;
        l.key = o;
        l.size = i;
        l.isReload = n;
        n && this.addLoadItem(l);
        this.jsb_load_item.createDownloadFileTask(t, e, o);
    };
    t.prototype.clearJSBDownload = function() {
        if (null != this.jsb_load_item) {
            var t = this.jsb_load_item;
            t.setOnFileTaskSuccess(null);
            t.setOnTaskProgress(null);
            t.setOnTaskError(null);
            this.jsb_load_item = null;
        }
    };
    t.prototype.updateSecond = function() {};
    t.prototype.addLoadItem = function(t) {
        for (var e = 0; e < this.cur_load_items.length; e++)
            if (null == this.cur_load_items[e]) {
                this.cur_load_items[e] = t;
                return;
            }
        this.cur_load_items.push(t);
    };
    t.prototype.clearLoadItems = function(t) {
        for (var e = 0; e < this.cur_load_items.length; e++) {
            var o = this.cur_load_items[e];
            o && o.key == t && (this.cur_load_items[e] = null);
        }
    };
    t.prototype.onLoadProgress = function(t, e, o, i) {
        var n = t ? t.identifier : "";
        null != this.progressHand && this.progressHand(n, e, o, i);
    };
    t.prototype.isFileSizeEquip = function(t) {
        for (var e = 0; e < this.cur_load_items.length; e++) {
            var o = this.cur_load_items[e];
            if (o && o.key == t) {
                return (
                    0 == o.size ||
                    jsb.fileUtils.getFileSize(o.storeUrl) == o.size
                );
            }
        }
        return !0;
    };
    t.prototype.onLoadEnd = function(t) {
        var e = t ? t.identifier : "";
        // if (this.isFileSizeEquip(e) || t == "res/raw-assets/9e/9e8775d3-725d-4872-8764-9dd9b3da40ae.manifest") {
            this.clearLoadItems(e);
            this.endHand && this.endHand(e);
        // } else if (this.errorHand) {
        //     console.log("load item size is not equip!!!!!", e);
        //     // cc.log("load item size is not equip!!!!!", e);
        //     this.errorHand(e);
        // }
    };
    t.prototype.onLoadError = function(t, e, o, i) {
        var n = t.identifier;
        console.log("down Error: " + i, " fiel name:" + n, e, o);
        // cc.log("down Error: " + i, " fiel name:" + n, e, o);
        this.clearLoadItems(n);
        this.errorHand && this.errorHand(n);
    };
    return t;
})();
(window.idream || (window.idream = {})).MyDownloader = n;
