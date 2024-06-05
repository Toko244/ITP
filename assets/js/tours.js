!function(i) {
    "use strict";
    var e = {};
    function o() {
        var e, o, t;
        o = i(".qodef-tours-filter-holder.qodef-tours-filter-horizontal form"),
        t = i(".qodef-tours-filter-holder.qodef-tours-filter-vertical-small form"),
        e = "undefined" != typeof qodefToursSearchData ? qodefToursSearchData.destinations : [],
        e = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: e
        }),
        o.find(".qodef-tours-destination-search").typeahead({
            hint: !0,
            highlight: !0,
            minLength: 1
        }, {
            name: "destinations",
            source: e
        }),
        t.find(".qodef-tours-destination-search").typeahead({
            hint: !0,
            highlight: !0,
            minLength: 1
        }, {
            name: "destinations",
            source: e
        })
    }
    function t() {}
    function n() {}
    function a() {}
    "undefined" != typeof qodef && (qodef.modules.destinations = e),
    e.qodefOnDocumentReady = o,
    e.qodefOnWindowLoad = t,
    e.qodefOnWindowResize = n,
    e.qodefOnWindowScroll = a,
    i(document).ready(o),
    i(window).on("load", t),
    i(window).resize(n),
    i(window).scroll(a)
},
function(h) {
    "use strict";
    var e = {};
    function o() {
        "undefined" != typeof qodef && typeof qodef || t(),
        "undefined" != typeof qodef && i(),
        h(".qodef-tour-item-single-holder").find(".qodef-tour-item-wrapper ul li a").on("click", function() {
            "#tour-item-gallery-id" === h(this).attr("href") && "function" == typeof qodef.modules.common.qodefInitGridMasonryListLayout && qodef.modules.common.qodefInitGridMasonryListLayout()
        }),
        a().fieldsHelper.init(),
        a().handleSearch.init(),
        f()
    }
    function t() {
        var e = h(".qodef-tour-item-single-holder")
          , t = e.find(".qodef-tour-item-wrapper ul li a")
          , i = e.find(".qodef-tour-item-section");
        t.first().addClass("qodef-active-item"),
        t.on("click", function() {
            t.removeClass("qodef-active-item");
            var e = h(this)
              , o = e.attr("href");
            e.addClass("qodef-active-item"),
            i.length && i.each(function() {
                var e = h(this);
                e.attr("id") === o ? (e.show(),
                "#tour-item-location-id" === o && n()) : e.hide()
            })
        })
    }
    function i() {
        h(".qodef-tour-item-single-holder").find(".qodef-tour-item-wrapper ul li a").on("click", function() {
            "#tour-item-location-id" === h(this).attr("href") && n()
        })
    }
    function n() {
        "undefined" != typeof qodef && qodef.modules.googleMap.qodefShowGoogleMap()
    }
    function a() {
        var u, c = h(".qodef-tours-search-main-filters-holder form");
        function s() {
            function o(e) {
                "" === e.val() ? e.addClass("qodef-tours-select-default-option") : e.removeClass("qodef-tours-select-default-option")
            }
            var e = h(".qodef-tours-select-placeholder");
            e.length && e.each(function() {
                var e = h(this);
                o(h(this)),
                e.on("change", function() {
                    o(h(this))
                })
            })
        }
        return u = function(e, i, o, n) {
            var a = e.find('input[type="submit"]')
              , r = h(".qodef-tours-search-content")
              , d = h(".qodef-tours-search-page-holder")
              , t = (i = void 0 === i || i,
            o = void 0 === o || o,
            n = void 0 !== n && n,
            a.data("searching-label"))
              , s = a.val()
              , t = (i && a.val(t),
            o && e.find('[name="page"]').val(1),
            r.addClass("qodef-tours-searching"),
            {
                action: "tours_search_handle_form_submission"
            });
            t.fields = e.serialize(),
            h.ajax({
                type: "GET",
                url: qodefToursAjaxURL,
                dataType: "json",
                data: t,
                success: function(e) {
                    var o, t;
                    i && a.val(s),
                    r.removeClass("qodef-tours-searching"),
                    r.find(".qodef-tours-row .qodef-tours-row-inner-holder").html(e.html),
                    o = e.url,
                    t = "",
                    location.href.match(/\?.*/) && document.referrer && (t = location.href.replace(/\?.*/, "")),
                    window.history.replaceState({
                        page: t + "?" + o
                    }, "", t + "?" + o),
                    h(".qodef-tours-search-pagination").remove(),
                    r.append(e.paginationHTML),
                    n && h("html, body").animate({
                        scrollTop: d.offset().top - 80
                    }, 700),
                    f()
                }
            })
        }
        ,
        {
            fieldsHelper: {
                init: function() {
                    var n, a, r, e, o, t, i, d;
                    d = c.find(".qodef-tours-range-input"),
                    n = c.find(".qodef-tours-price-range-field"),
                    a = c.find('[name="min_price"]'),
                    r = c.find('[name="max_price"]'),
                    e = n.data("min-price"),
                    o = n.data("max-price"),
                    t = n.data("chosen-min-price"),
                    i = n.data("chosen-max-price"),
                    d.length && d.each(function() {
                        noUiSlider.create(this, {
                            start: [t, i],
                            connect: !0,
                            step: 1,
                            range: {
                                min: [e],
                                max: [o]
                            },
                            format: {
                                to: function(e) {
                                    return Math.floor(e)
                                },
                                from: function(e) {
                                    return e
                                }
                            }
                        }).on("update", function(e) {
                            var o = e[0]
                              , e = e[1]
                              , t = n.data("currency-symbol")
                              , i = n.data("currency-symbol-position");
                            n.val(("left" === i ? t + o : o + t) + " - " + ("left" === i ? t + e : o + e)),
                            a.val(o),
                            r.val(e)
                        })
                    }),
                    d = "undefined" != typeof qodefToursSearchData ? qodefToursSearchData.tours : [],
                    d = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: d
                    }),
                    c.find(".qodef-tours-keyword-search").typeahead({
                        hint: !0,
                        highlight: !0,
                        minLength: 1
                    }, {
                        name: "tours",
                        source: d
                    }),
                    d = "undefined" != typeof qodefToursSearchData ? qodefToursSearchData.destinations : [],
                    d = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: d
                    }),
                    c.find(".qodef-tours-destination-search").typeahead({
                        hint: !0,
                        highlight: !0,
                        minLength: 1
                    }, {
                        name: "destinations",
                        source: d
                    }),
                    s()
                }
            },
            handleSearch: {
                init: function() {
                    var o, t, i, n, a, r, d, s, f, e, l;
                    o = c,
                    h("body").hasClass("post-type-archive-tour-item") && o.on("submit", function(e) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        u(o)
                    }),
                    t = c,
                    i = h(".qodef-search-ordering-item"),
                    n = t.find('[name="order_by"]'),
                    a = t.find('[name="order_type"]'),
                    i.length && i.on("click", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        var e = h(this)
                          , o = (i.removeClass("qodef-search-ordering-item-active"),
                        e.addClass("qodef-search-ordering-item-active"),
                        e.data("order-by"))
                          , e = e.data("order-type");
                        void 0 !== o && void 0 !== e && (n.val(o),
                        a.val(e)),
                        u(t, !1, !1)
                    }),
                    r = c,
                    d = h(".qodef-tours-search-view-item"),
                    s = r.find('[name="view_type"]'),
                    d.length && d.on("click", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        e = h(this),
                        d.removeClass("qodef-tours-search-view-item-active"),
                        e.addClass("qodef-tours-search-view-item-active"),
                        e = e.data("type");
                        void 0 !== e && s.val(e),
                        u(r, !1, !1)
                    }),
                    f = c,
                    e = h(".qodef-tours-search-pagination"),
                    l = f.find('[name="page"]'),
                    e.length && h(document).on("click", ".qodef-tours-search-pagination li", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        e = h(this).data("page");
                        void 0 !== e && l.val(e),
                        u(f, !0, !1, !0)
                    })
                }
            }
        }
    }
    function f() {
        var e = h(".qodef-tours-gallery-item");
        e.length && e.each(function() {
            var e = h(this)
              , o = e.find(".qodef-tours-gallery-item-content-holder")
              , t = o.find(".qodef-tours-gallery-item-excerpt")
              , i = Math.ceil(t.height());
            o.css("transform", "translate3d(0," + i + "px,0)"),
            e.mouseenter(function() {
                o.css("transform", "translate3d(0,0,0)")
            }),
            e.mouseleave(function() {
                i = Math.ceil(t.height()),
                o.css("transform", "translate3d(0," + i + "px,0)")
            })
        })
    }
    "undefined" != typeof qodef && (qodef.modules.tours = e),
    e.qodefOnDocumentReady = o,
    e.qodefInitTourItemTabs = t,
    e.qodefTourTabsMapTrigger = i,
    e.qodefToursGalleryAnimation = f,
    h(document).ready(o)
},
function(u) {
    "use strict";
    var e = {};
    function o() {
        t().init()
    }
    function c() {
        return "undefined" != typeof qodef
    }
    function t() {
        function o(n) {
            var a, r, d, s = n.find(".qodef-tours-list-pagination-data"), f = n.find(".qodef-tours-list-holder-inner");
            a = n.find(".qodef-tours-load-more-button"),
            r = n.find(".qodef-tours-pagination-holder"),
            d = !1,
            a.length && a.on("click", function(e) {
                e.preventDefault(),
                e.stopPropagation();
                var o, t, e = a.data("loading-label"), i = a.text();
                a.text(e),
                (t = (e = n).find(".qodef-tour-list-filter-item")).removeClass("qodef-tour-list-current-filter"),
                t.eq(0).addClass("qodef-tour-list-current-filter"),
                e.find(".qodef-tours-list-holder-inner").isotope({
                    filter: "*"
                }),
                d || (d = !0,
                o = function(e) {
                    var o;
                    !0 === e.havePosts ? (a.text(i),
                    o = u(e.html),
                    f.append(o),
                    f.waitForImages(function() {
                        l(f),
                        f.isotope("appended", o).isotope("reloadItems"),
                        qodef.modules.tours.qodefToursGalleryAnimation()
                    })) : (a.remove(),
                    r.html(e.message)),
                    d = !1
                }
                ,
                t = {
                    action: "setsail_tours_list_ajax_pagination",
                    fields: s.find("input").serialize()
                },
                u.ajax({
                    url: qodefToursAjaxURL,
                    data: t,
                    dataType: "json",
                    type: "POST",
                    success: function(e) {
                        e.havePosts && s.find('[name="next_page"]').val(e.nextPage),
                        c() && qodef.modules.common.qodefInitParallax(),
                        o.call(this, e)
                    }
                }))
            })
        }
        function l(e) {
            var o, t, i, n, a;
            e.parent().hasClass("qodef-tours-type-masonry") && (o = parseInt(e.find(".qodef-tours-row-item").css("padding-left")),
            t = e.find(".qodef-size-default"),
            i = e.find(".qodef-size-large-width"),
            n = e.find(".qodef-size-large-height"),
            a = e.find(".qodef-size-large-width-height"),
            e = e.find(".qodef-tours-list-grid-sizer").width(),
            t.css("height", e - 2 * o),
            n.css("height", Math.round(2 * e) - 2 * o),
            a.css("height", Math.round(2 * e) - 2 * o),
            i.css("height", e - 2 * o))
        }
        var e = u(".qodef-tours-list-holder");
        return {
            init: function() {
                e.length && void 0 !== u.fn.isotope && e.each(function() {
                    var e, t, i;
                    (e = u(this).find(".qodef-tours-list-holder-inner")).animate({
                        opacity: 1
                    }),
                    l(e),
                    e.isotope({
                        percentPosition: !0,
                        itemSelector: ".qodef-tours-row-item",
                        transitionDuration: "0.4s",
                        isInitLayout: !0,
                        hiddenStyle: {
                            opacity: 0
                        },
                        visibleStyle: {
                            opacity: 1
                        },
                        masonry: {
                            columnWidth: ".qodef-tours-list-grid-sizer"
                        }
                    }),
                    c() && qodef.modules.common.qodefInitParallax(),
                    u(window).resize(function() {
                        l(e)
                    }),
                    t = u(this),
                    (i = t.find(".qodef-tour-list-filter-item")).on("click", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        var e = u(this)
                          , o = e.data("type");
                        i.removeClass("qodef-tour-list-current-filter"),
                        e.addClass("qodef-tour-list-current-filter"),
                        o = void 0 === o ? "*" : "." + o,
                        t.find(".qodef-tours-list-holder-inner").isotope({
                            filter: o
                        })
                    }),
                    o(u(this))
                })
            }
        }
    }
    "undefined" != typeof qodef && (qodef.modules.toursListSC = e),
    e.qodefOnWindowLoad = o,
    e.toursList = t,
    u(window).on("load", o)
};
