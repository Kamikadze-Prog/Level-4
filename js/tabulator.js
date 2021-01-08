/* Tabulator v4.9.2 (c) Oliver Folkerd */
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
;
!function(e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Tabulator = t()
}(this, function() {
    "use strict";
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e) {
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var t = Object(this)
                , o = t.length >>> 0;
            if ("function" != typeof e)
                throw new TypeError("predicate must be a function");
            for (var i = arguments[1], n = 0; n < o; ) {
                var s = t[n];
                if (e.call(i, s, n, t))
                    return n;
                n++
            }
            return -1
        }
    }),
    Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e) {
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var t = Object(this)
                , o = t.length >>> 0;
            if ("function" != typeof e)
                throw new TypeError("predicate must be a function");
            for (var i = arguments[1], n = 0; n < o; ) {
                var s = t[n];
                if (e.call(i, s, n, t))
                    return s;
                n++
            }
        }
    }),
    String.prototype.includes || (String.prototype.includes = function(e, t) {
            if (e instanceof RegExp)
                throw TypeError("first argument must not be a RegExp");
            return void 0 === t && (t = 0),
            -1 !== this.indexOf(e, t)
        }
    ),
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function(e, t) {
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var o = Object(this)
                , i = o.length >>> 0;
            if (0 === i)
                return !1;
            for (var n = 0 | t, s = Math.max(n >= 0 ? n : i - Math.abs(n), 0); s < i; ) {
                if (function(e, t) {
                    return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
                }(o[s], e))
                    return !0;
                s++
            }
            return !1
        }
    }),
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(e, t) {
            if (null === e || void 0 === e)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var o = Object(e), i = 1; i < arguments.length; i++) {
                var n = arguments[i];
                if (null !== n && void 0 !== n)
                    for (var s in n)
                        Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s])
            }
            return o
        },
        writable: !0,
        configurable: !0
    });
    var t = function(e) {
        this.table = e,
            this.blockHozScrollEvent = !1,
            this.headersElement = this.createHeadersElement(),
            this.element = this.createHeaderElement(),
            this.rowManager = null,
            this.columns = [],
            this.columnsByIndex = [],
            this.columnsByField = {},
            this.scrollLeft = 0,
            this.element.insertBefore(this.headersElement, this.element.firstChild)
    };
    t.prototype.createHeadersElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-headers"),
            e
    }
        ,
        t.prototype.createHeaderElement = function() {
            var e = document.createElement("div");
            return e.classList.add("tabulator-header"),
            this.table.options.headerVisible || e.classList.add("tabulator-header-hidden"),
                e
        }
        ,
        t.prototype.initialize = function() {}
        ,
        t.prototype.setRowManager = function(e) {
            this.rowManager = e
        }
        ,
        t.prototype.getElement = function() {
            return this.element
        }
        ,
        t.prototype.getHeadersElement = function() {
            return this.headersElement
        }
        ,
        t.prototype.scrollHorizontal = function(e) {
            var t = 0
                , o = this.element.scrollWidth - this.table.element.clientWidth;
            this.element.scrollLeft = e,
                e > o ? (t = e - o,
                    this.element.style.marginLeft = -t + "px") : this.element.style.marginLeft = 0,
                this.scrollLeft = e,
            this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.scrollHorizontal()
        }
        ,
        t.prototype.generateColumnsFromRowData = function(e) {
            var t, o, i = [], n = this.table.options.autoColumnsDefinitions;
            if (e && e.length) {
                t = e[0];
                for (var s in t) {
                    var a = {
                        field: s,
                        title: s
                    }
                        , r = t[s];
                    switch (void 0 === r ? "undefined" : _typeof(r)) {
                        case "undefined":
                            o = "string";
                            break;
                        case "boolean":
                            o = "boolean";
                            break;
                        case "object":
                            o = Array.isArray(r) ? "array" : "string";
                            break;
                        default:
                            o = isNaN(r) || "" === r ? r.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i) ? "alphanum" : "string" : "number"
                    }
                    a.sorter = o,
                        i.push(a)
                }
                if (n)
                    switch (void 0 === n ? "undefined" : _typeof(n)) {
                        case "function":
                            this.table.options.columns = n.call(this.table, i);
                            break;
                        case "object":
                            Array.isArray(n) ? i.forEach(function(e) {
                                var t = n.find(function(t) {
                                    return t.field === e.field
                                });
                                t && Object.assign(e, t)
                            }) : i.forEach(function(e) {
                                n[e.field] && Object.assign(e, n[e.field])
                            }),
                                this.table.options.columns = i
                    }
                else
                    this.table.options.columns = i;
                this.setColumns(this.table.options.columns)
            }
        }
        ,
        t.prototype.setColumns = function(e, t) {
            for (var o = this; o.headersElement.firstChild; )
                o.headersElement.removeChild(o.headersElement.firstChild);
            o.columns = [],
                o.columnsByIndex = [],
                o.columnsByField = {},
            o.table.modExists("frozenColumns") && o.table.modules.frozenColumns.reset(),
                e.forEach(function(e, t) {
                    o._addColumn(e)
                }),
                o._reIndexColumns(),
            o.table.options.responsiveLayout && o.table.modExists("responsiveLayout", !0) && o.table.modules.responsiveLayout.initialize(),
            this.table.options.virtualDomHoz && this.table.vdomHoz.reinitialize(!1, !0),
                o.redraw(!0)
        }
        ,
        t.prototype._addColumn = function(e, t, o) {
            var i = new n(e,this)
                , s = i.getElement()
                , a = o ? this.findColumnIndex(o) : o;
            if (o && a > -1) {
                var r = this.columns.indexOf(o.getTopColumn())
                    , l = o.getElement();
                t ? (this.columns.splice(r, 0, i),
                    l.parentNode.insertBefore(s, l)) : (this.columns.splice(r + 1, 0, i),
                    l.parentNode.insertBefore(s, l.nextSibling))
            } else
                t ? (this.columns.unshift(i),
                    this.headersElement.insertBefore(i.getElement(), this.headersElement.firstChild)) : (this.columns.push(i),
                    this.headersElement.appendChild(i.getElement())),
                    i.columnRendered();
            return i
        }
        ,
        t.prototype.registerColumnField = function(e) {
            e.definition.field && (this.columnsByField[e.definition.field] = e)
        }
        ,
        t.prototype.registerColumnPosition = function(e) {
            this.columnsByIndex.push(e)
        }
        ,
        t.prototype._reIndexColumns = function() {
            this.columnsByIndex = [],
                this.columns.forEach(function(e) {
                    e.reRegisterPosition()
                })
        }
        ,
        t.prototype._verticalAlignHeaders = function() {
            var e = this
                , t = 0;
            e.columns.forEach(function(e) {
                var o;
                e.clearVerticalAlign(),
                (o = e.getHeight()) > t && (t = o)
            }),
                e.columns.forEach(function(o) {
                    o.verticalAlign(e.table.options.columnHeaderVertAlign, t)
                }),
                e.rowManager.adjustTableSize()
        }
        ,
        t.prototype.findColumn = function(e) {
            var t = this;
            if ("object" != (void 0 === e ? "undefined" : _typeof(e)))
                return this.columnsByField[e] || !1;
            if (e instanceof n)
                return e;
            if (e instanceof o)
                return e._getSelf() || !1;
            if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) {
                return t.columns.find(function(t) {
                    return t.element === e
                }) || !1
            }
            return !1
        }
        ,
        t.prototype.getColumnByField = function(e) {
            return this.columnsByField[e]
        }
        ,
        t.prototype.getColumnsByFieldRoot = function(e) {
            var t = this
                , o = [];
            return Object.keys(this.columnsByField).forEach(function(i) {
                i.split(".")[0] === e && o.push(t.columnsByField[i])
            }),
                o
        }
        ,
        t.prototype.getColumnByIndex = function(e) {
            return this.columnsByIndex[e]
        }
        ,
        t.prototype.getFirstVisibileColumn = function(e) {
            var e = this.columnsByIndex.findIndex(function(e) {
                return e.visible
            });
            return e > -1 && this.columnsByIndex[e]
        }
        ,
        t.prototype.getColumns = function() {
            return this.columns
        }
        ,
        t.prototype.findColumnIndex = function(e) {
            return this.columnsByIndex.findIndex(function(t) {
                return e === t
            })
        }
        ,
        t.prototype.getRealColumns = function() {
            return this.columnsByIndex
        }
        ,
        t.prototype.traverse = function(e) {
            this.columnsByIndex.forEach(function(t, o) {
                e(t, o)
            })
        }
        ,
        t.prototype.getDefinitions = function(e) {
            var t = this
                , o = [];
            return t.columnsByIndex.forEach(function(t) {
                (!e || e && t.visible) && o.push(t.getDefinition())
            }),
                o
        }
        ,
        t.prototype.getDefinitionTree = function() {
            var e = this
                , t = [];
            return e.columns.forEach(function(e) {
                t.push(e.getDefinition(!0))
            }),
                t
        }
        ,
        t.prototype.getComponents = function(e) {
            var t = this
                , o = [];
            return (e ? t.columns : t.columnsByIndex).forEach(function(e) {
                o.push(e.getComponent())
            }),
                o
        }
        ,
        t.prototype.getWidth = function() {
            var e = 0;
            return this.columnsByIndex.forEach(function(t) {
                t.visible && (e += t.getWidth())
            }),
                e
        }
        ,
        t.prototype.moveColumn = function(e, t, o) {
            this.moveColumnActual(e, t, o),
            this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.initialize(),
            this.table.modExists("columnCalcs") && this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),
                t.element.parentNode.insertBefore(e.element, t.element),
            o && t.element.parentNode.insertBefore(t.element, e.element),
                this._verticalAlignHeaders(),
                this.table.rowManager.reinitialize()
        }
        ,
        t.prototype.moveColumnActual = function(e, t, o) {
            e.parent.isGroup ? this._moveColumnInArray(e.parent.columns, e, t, o) : this._moveColumnInArray(this.columns, e, t, o),
                this._moveColumnInArray(this.columnsByIndex, e, t, o, !0),
            this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.initialize(),
            this.table.options.virtualDomHoz && this.table.vdomHoz.reinitialize(!0),
            this.table.options.columnMoved && this.table.options.columnMoved.call(this.table, e.getComponent(), this.table.columnManager.getComponents()),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.columns && this.table.modules.persistence.save("columns")
        }
        ,
        t.prototype._moveColumnInArray = function(e, t, o, i, n) {
            var s, a = this, r = e.indexOf(t), l = [];
            r > -1 && (e.splice(r, 1),
                s = e.indexOf(o),
                s > -1 ? i && (s += 1) : s = r,
                e.splice(s, 0, t),
            n && (this.table.options.dataTree && this.table.modExists("dataTree", !0) && this.table.rowManager.rows.forEach(function(e) {
                l = l.concat(a.table.modules.dataTree.getTreeChildren(e, !1, !0))
            }),
                l = l.concat(this.table.rowManager.rows),
                l.forEach(function(e) {
                    if (e.cells.length) {
                        var t = e.cells.splice(r, 1)[0];
                        e.cells.splice(s, 0, t)
                    }
                })))
        }
        ,
        t.prototype.scrollToColumn = function(e, t, o) {
            var i = this
                , n = 0
                , s = 0
                , a = 0
                , r = e.getElement();
            return new Promise(function(l, c) {
                    if (void 0 === t && (t = i.table.options.scrollToColumnPosition),
                    void 0 === o && (o = i.table.options.scrollToColumnIfVisible),
                        e.visible) {
                        switch (t) {
                            case "middle":
                            case "center":
                                a = -i.element.clientWidth / 2;
                                break;
                            case "right":
                                a = r.clientWidth - i.headersElement.clientWidth
                        }
                        if (!o && (s = r.offsetLeft) > 0 && s + r.offsetWidth < i.element.clientWidth)
                            return !1;
                        n = r.offsetLeft + a,
                            n = Math.max(Math.min(n, i.table.rowManager.element.scrollWidth - i.table.rowManager.element.clientWidth), 0),
                            i.table.rowManager.scrollHorizontal(n),
                            i.scrollHorizontal(n),
                            l()
                    } else
                        console.warn("Scroll Error - Column not visible"),
                            c("Scroll Error - Column not visible")
                }
            )
        }
        ,
        t.prototype.generateCells = function(e) {
            var t = this
                , o = [];
            return t.columnsByIndex.forEach(function(t) {
                o.push(t.generateCell(e))
            }),
                o
        }
        ,
        t.prototype.getFlexBaseWidth = function() {
            var e = this
                , t = e.table.element.clientWidth
                , o = 0;
            return e.rowManager.element.scrollHeight > e.rowManager.element.clientHeight && (t -= e.rowManager.element.offsetWidth - e.rowManager.element.clientWidth),
                this.columnsByIndex.forEach(function(i) {
                    var n, s, a;
                    i.visible && (n = i.definition.width || 0,
                        s = void 0 === i.minWidth ? e.table.options.columnMinWidth : parseInt(i.minWidth),
                        a = "string" == typeof n ? n.indexOf("%") > -1 ? t / 100 * parseInt(n) : parseInt(n) : n,
                        o += a > s ? a : s)
                }),
                o
        }
        ,
        t.prototype.addColumn = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    var a = i._addColumn(e, t, o);
                    i._reIndexColumns(),
                    i.table.options.responsiveLayout && i.table.modExists("responsiveLayout", !0) && i.table.modules.responsiveLayout.initialize(),
                    i.table.modExists("columnCalcs") && i.table.modules.columnCalcs.recalc(i.table.rowManager.activeRows),
                        i.redraw(!0),
                    "fitColumns" != i.table.modules.layout.getMode() && a.reinitializeWidth(),
                        i._verticalAlignHeaders(),
                        i.table.rowManager.reinitialize(),
                    i.table.options.virtualDomHoz && i.table.vdomHoz.reinitialize(),
                        n(a)
                }
            )
        }
        ,
        t.prototype.deregisterColumn = function(e) {
            var t, o = e.getField();
            o && delete this.columnsByField[o],
                t = this.columnsByIndex.indexOf(e),
            t > -1 && this.columnsByIndex.splice(t, 1),
                t = this.columns.indexOf(e),
            t > -1 && this.columns.splice(t, 1),
            this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.initialize(),
                this._verticalAlignHeaders(),
                this.redraw()
        }
        ,
        t.prototype.redraw = function(e) {
            e && (h.prototype.helpers.elVisible(this.element) && this._verticalAlignHeaders(),
                this.table.rowManager.resetScroll(),
                this.table.rowManager.reinitialize()),
                ["fitColumns", "fitDataStretch"].indexOf(this.table.modules.layout.getMode()) > -1 ? this.table.modules.layout.layout() : e ? this.table.modules.layout.layout() : this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update(),
            this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layout(),
            this.table.modExists("columnCalcs") && this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),
            e && (this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.columns && this.table.modules.persistence.save("columns"),
            this.table.modExists("columnCalcs") && this.table.modules.columnCalcs.redraw()),
                this.table.footerManager.redraw()
        }
    ;
    var o = function(e) {
        this._column = e,
            this.type = "ColumnComponent"
    };
    o.prototype.getElement = function() {
        return this._column.getElement()
    }
        ,
        o.prototype.getDefinition = function() {
            return this._column.getDefinition()
        }
        ,
        o.prototype.getField = function() {
            return this._column.getField()
        }
        ,
        o.prototype.getCells = function() {
            var e = [];
            return this._column.cells.forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        o.prototype.getVisibility = function() {
            return console.warn("getVisibility function is deprecated, you should now use the isVisible function"),
                this._column.visible
        }
        ,
        o.prototype.isVisible = function() {
            return this._column.visible
        }
        ,
        o.prototype.show = function() {
            this._column.isGroup ? this._column.columns.forEach(function(e) {
                e.show()
            }) : this._column.show()
        }
        ,
        o.prototype.hide = function() {
            this._column.isGroup ? this._column.columns.forEach(function(e) {
                e.hide()
            }) : this._column.hide()
        }
        ,
        o.prototype.toggle = function() {
            this._column.visible ? this.hide() : this.show()
        }
        ,
        o.prototype.delete = function() {
            return this._column.delete()
        }
        ,
        o.prototype.getSubColumns = function() {
            var e = [];
            return this._column.columns.length && this._column.columns.forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        o.prototype.getParentColumn = function() {
            return this._column.parent instanceof n && this._column.parent.getComponent()
        }
        ,
        o.prototype._getSelf = function() {
            return this._column
        }
        ,
        o.prototype.scrollTo = function() {
            return this._column.table.columnManager.scrollToColumn(this._column)
        }
        ,
        o.prototype.getTable = function() {
            return this._column.table
        }
        ,
        o.prototype.headerFilterFocus = function() {
            this._column.table.modExists("filter", !0) && this._column.table.modules.filter.setHeaderFilterFocus(this._column)
        }
        ,
        o.prototype.reloadHeaderFilter = function() {
            this._column.table.modExists("filter", !0) && this._column.table.modules.filter.reloadHeaderFilter(this._column)
        }
        ,
        o.prototype.getHeaderFilterValue = function() {
            if (this._column.table.modExists("filter", !0))
                return this._column.table.modules.filter.getHeaderFilterValue(this._column)
        }
        ,
        o.prototype.setHeaderFilterValue = function(e) {
            this._column.table.modExists("filter", !0) && this._column.table.modules.filter.setHeaderFilterValue(this._column, e)
        }
        ,
        o.prototype.move = function(e, t) {
            var o = this._column.table.columnManager.findColumn(e);
            o ? this._column.table.columnManager.moveColumn(this._column, o, t) : console.warn("Move Error - No matching column found:", o)
        }
        ,
        o.prototype.getNextColumn = function() {
            var e = this._column.nextColumn();
            return !!e && e.getComponent()
        }
        ,
        o.prototype.getPrevColumn = function() {
            var e = this._column.prevColumn();
            return !!e && e.getComponent()
        }
        ,
        o.prototype.updateDefinition = function(e) {
            return this._column.updateDefinition(e)
        }
        ,
        o.prototype.getWidth = function() {
            return this._column.getWidth()
        }
        ,
        o.prototype.setWidth = function(e) {
            var t;
            return t = !0 === e ? this._column.reinitializeWidth(!0) : this._column.setWidth(e),
            this._column.table.options.virtualDomHoz && this._column.table.vdomHoz.reinitialize(!0),
                t
        }
        ,
        o.prototype.validate = function() {
            return this._column.validate()
        }
    ;
    var n = function e(t, o) {
        var i = this;
        this.table = o.table,
            this.definition = t,
            this.parent = o,
            this.type = "column",
            this.columns = [],
            this.cells = [],
            this.element = this.createElement(),
            this.contentElement = !1,
            this.titleHolderElement = !1,
            this.titleElement = !1,
            this.groupElement = this.createGroupElement(),
            this.isGroup = !1,
            this.tooltip = !1,
            this.hozAlign = "",
            this.vertAlign = "",
            this.field = "",
            this.fieldStructure = "",
            this.getFieldValue = "",
            this.setFieldValue = "",
            this.titleFormatterRendered = !1,
            this.setField(this.definition.field),
        this.table.options.invalidOptionWarnings && this.checkDefinition(),
            this.modules = {},
            this.cellEvents = {
                cellClick: !1,
                cellDblClick: !1,
                cellContext: !1,
                cellTap: !1,
                cellDblTap: !1,
                cellTapHold: !1,
                cellMouseEnter: !1,
                cellMouseLeave: !1,
                cellMouseOver: !1,
                cellMouseOut: !1,
                cellMouseMove: !1
            },
            this.width = null,
            this.widthStyled = "",
            this.maxWidth = null,
            this.maxWidthStyled = "",
            this.minWidth = null,
            this.minWidthStyled = "",
            this.widthFixed = !1,
            this.visible = !0,
            this.component = null,
            this._mapDepricatedFunctionality(),
            t.columns ? (this.isGroup = !0,
                t.columns.forEach(function(t, o) {
                    var n = new e(t,i);
                    i.attachColumn(n)
                }),
                i.checkColumnVisibility()) : o.registerColumnField(this),
        t.rowHandle && !1 !== this.table.options.movableRows && this.table.modExists("moveRow") && this.table.modules.moveRow.setHandle(!0),
            this._buildHeader(),
            this.bindModuleColumns()
    };
    n.prototype.createElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-col"),
            e.setAttribute("role", "columnheader"),
            e.setAttribute("aria-sort", "none"),
            e
    }
        ,
        n.prototype.createGroupElement = function() {
            var e = document.createElement("div");
            return e.classList.add("tabulator-col-group-cols"),
                e
        }
        ,
        n.prototype.checkDefinition = function() {
            var e = this;
            Object.keys(this.definition).forEach(function(t) {
                -1 === e.defaultOptionList.indexOf(t) && console.warn("Invalid column definition option in '" + (e.field || e.definition.title) + "' column:", t)
            })
        }
        ,
        n.prototype.setField = function(e) {
            this.field = e,
                this.fieldStructure = e ? this.table.options.nestedFieldSeparator ? e.split(this.table.options.nestedFieldSeparator) : [e] : [],
                this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData,
                this.setFieldValue = this.fieldStructure.length > 1 ? this._setNestedData : this._setFlatData
        }
        ,
        n.prototype.registerColumnPosition = function(e) {
            this.parent.registerColumnPosition(e)
        }
        ,
        n.prototype.registerColumnField = function(e) {
            this.parent.registerColumnField(e)
        }
        ,
        n.prototype.reRegisterPosition = function() {
            this.isGroup ? this.columns.forEach(function(e) {
                e.reRegisterPosition()
            }) : this.registerColumnPosition(this)
        }
        ,
        n.prototype._mapDepricatedFunctionality = function() {
            void 0 !== this.definition.hideInHtml && (this.definition.htmlOutput = !this.definition.hideInHtml,
                console.warn("hideInHtml column definition property is deprecated, you should now use htmlOutput")),
            void 0 !== this.definition.align && (this.definition.hozAlign = this.definition.align,
                console.warn("align column definition property is deprecated, you should now use hozAlign")),
            void 0 !== this.definition.downloadTitle && (this.definition.titleDownload = this.definition.downloadTitle,
                console.warn("downloadTitle definition property is deprecated, you should now use titleDownload"))
        }
        ,
        n.prototype.setTooltip = function() {
            var e = this
                , t = e.definition
                , o = t.headerTooltip || !1 === t.tooltip ? t.headerTooltip : e.table.options.tooltipsHeader;
            o ? !0 === o ? t.field ? e.table.modules.localize.bind("columns|" + t.field, function(o) {
                e.element.setAttribute("title", o || t.title)
            }) : e.element.setAttribute("title", t.title) : ("function" == typeof o && !1 === (o = o(e.getComponent())) && (o = ""),
                e.element.setAttribute("title", o)) : e.element.setAttribute("title", "")
        }
        ,
        n.prototype._buildHeader = function() {
            for (var e = this, t = e.definition; e.element.firstChild; )
                e.element.removeChild(e.element.firstChild);
            t.headerVertical && (e.element.classList.add("tabulator-col-vertical"),
            "flip" === t.headerVertical && e.element.classList.add("tabulator-col-vertical-flip")),
                e.contentElement = e._bindEvents(),
                e.contentElement = e._buildColumnHeaderContent(),
                e.element.appendChild(e.contentElement),
                e.isGroup ? e._buildGroupHeader() : e._buildColumnHeader(),
                e.setTooltip(),
            e.table.options.resizableColumns && e.table.modExists("resizeColumns") && e.table.modules.resizeColumns.initializeColumn("header", e, e.element),
            t.headerFilter && e.table.modExists("filter") && e.table.modExists("edit") && (void 0 !== t.headerFilterPlaceholder && t.field && e.table.modules.localize.setHeaderFilterColumnPlaceholder(t.field, t.headerFilterPlaceholder),
                e.table.modules.filter.initializeColumn(e)),
            e.table.modExists("frozenColumns") && e.table.modules.frozenColumns.initializeColumn(e),
            e.table.options.movableColumns && !e.isGroup && e.table.modExists("moveColumn") && e.table.modules.moveColumn.initializeColumn(e),
            (t.topCalc || t.bottomCalc) && e.table.modExists("columnCalcs") && e.table.modules.columnCalcs.initializeColumn(e),
            e.table.modExists("persistence") && e.table.modules.persistence.config.columns && e.table.modules.persistence.initializeColumn(e),
                e.element.addEventListener("mouseenter", function(t) {
                    e.setTooltip()
                })
        }
        ,
        n.prototype._bindEvents = function() {
            var e, t, o, i = this, n = i.definition;
            "function" == typeof n.headerClick && i.element.addEventListener("click", function(e) {
                n.headerClick(e, i.getComponent())
            }),
            "function" == typeof n.headerDblClick && i.element.addEventListener("dblclick", function(e) {
                n.headerDblClick(e, i.getComponent())
            }),
            "function" == typeof n.headerContext && i.element.addEventListener("contextmenu", function(e) {
                n.headerContext(e, i.getComponent())
            }),
            "function" == typeof n.headerTap && (o = !1,
                i.element.addEventListener("touchstart", function(e) {
                    o = !0
                }, {
                    passive: !0
                }),
                i.element.addEventListener("touchend", function(e) {
                    o && n.headerTap(e, i.getComponent()),
                        o = !1
                })),
            "function" == typeof n.headerDblTap && (e = null,
                i.element.addEventListener("touchend", function(t) {
                    e ? (clearTimeout(e),
                        e = null,
                        n.headerDblTap(t, i.getComponent())) : e = setTimeout(function() {
                        clearTimeout(e),
                            e = null
                    }, 300)
                })),
            "function" == typeof n.headerTapHold && (t = null,
                i.element.addEventListener("touchstart", function(e) {
                    clearTimeout(t),
                        t = setTimeout(function() {
                            clearTimeout(t),
                                t = null,
                                o = !1,
                                n.headerTapHold(e, i.getComponent())
                        }, 1e3)
                }, {
                    passive: !0
                }),
                i.element.addEventListener("touchend", function(e) {
                    clearTimeout(t),
                        t = null
                })),
            "function" == typeof n.cellClick && (i.cellEvents.cellClick = n.cellClick),
            "function" == typeof n.cellDblClick && (i.cellEvents.cellDblClick = n.cellDblClick),
            "function" == typeof n.cellContext && (i.cellEvents.cellContext = n.cellContext),
            "function" == typeof n.cellMouseEnter && (i.cellEvents.cellMouseEnter = n.cellMouseEnter),
            "function" == typeof n.cellMouseLeave && (i.cellEvents.cellMouseLeave = n.cellMouseLeave),
            "function" == typeof n.cellMouseOver && (i.cellEvents.cellMouseOver = n.cellMouseOver),
            "function" == typeof n.cellMouseOut && (i.cellEvents.cellMouseOut = n.cellMouseOut),
            "function" == typeof n.cellMouseMove && (i.cellEvents.cellMouseMove = n.cellMouseMove),
            "function" == typeof n.cellTap && (i.cellEvents.cellTap = n.cellTap),
            "function" == typeof n.cellDblTap && (i.cellEvents.cellDblTap = n.cellDblTap),
            "function" == typeof n.cellTapHold && (i.cellEvents.cellTapHold = n.cellTapHold),
            "function" == typeof n.cellEdited && (i.cellEvents.cellEdited = n.cellEdited),
            "function" == typeof n.cellEditing && (i.cellEvents.cellEditing = n.cellEditing),
            "function" == typeof n.cellEditCancelled && (i.cellEvents.cellEditCancelled = n.cellEditCancelled)
        }
        ,
        n.prototype._buildColumnHeader = function() {
            var e = this
                , t = this.definition
                , o = this.table;
            if (o.modExists("sort") && o.modules.sort.initializeColumn(this, this.titleHolderElement),
            (t.headerContextMenu || t.headerClickMenu || t.headerMenu) && o.modExists("menu") && o.modules.menu.initializeColumnHeader(this),
            o.modExists("format") && o.modules.format.initializeColumn(this),
            void 0 !== t.editor && o.modExists("edit") && o.modules.edit.initializeColumn(this),
            void 0 !== t.validator && o.modExists("validate") && o.modules.validate.initializeColumn(this),
            o.modExists("mutator") && o.modules.mutator.initializeColumn(this),
            o.modExists("accessor") && o.modules.accessor.initializeColumn(this),
            _typeof(o.options.responsiveLayout) && o.modExists("responsiveLayout") && o.modules.responsiveLayout.initializeColumn(this),
            void 0 !== t.visible && (t.visible ? this.show(!0) : this.hide(!0)),
                t.cssClass) {
                t.cssClass.split(" ").forEach(function(t) {
                    e.element.classList.add(t)
                })
            }
            t.field && this.element.setAttribute("tabulator-field", t.field),
                this.setMinWidth(void 0 === t.minWidth ? this.table.options.columnMinWidth : parseInt(t.minWidth)),
            (t.maxWidth || this.table.options.columnMaxWidth) && !1 !== t.maxWidth && this.setMaxWidth(void 0 === t.maxWidth ? this.table.options.columnMaxWidth : parseInt(t.maxWidth)),
                this.reinitializeWidth(),
                this.tooltip = this.definition.tooltip || !1 === this.definition.tooltip ? this.definition.tooltip : this.table.options.tooltips,
                this.hozAlign = void 0 === this.definition.hozAlign ? this.table.options.cellHozAlign : this.definition.hozAlign,
                this.vertAlign = void 0 === this.definition.vertAlign ? this.table.options.cellVertAlign : this.definition.vertAlign,
                this.titleElement.style.textAlign = this.definition.headerHozAlign || this.table.options.headerHozAlign
        }
        ,
        n.prototype._buildColumnHeaderContent = function() {
            var e = (this.definition,
                this.table,
                document.createElement("div"));
            return e.classList.add("tabulator-col-content"),
                this.titleHolderElement = document.createElement("div"),
                this.titleHolderElement.classList.add("tabulator-col-title-holder"),
                e.appendChild(this.titleHolderElement),
                this.titleElement = this._buildColumnHeaderTitle(),
                this.titleHolderElement.appendChild(this.titleElement),
                e
        }
        ,
        n.prototype._buildColumnHeaderTitle = function() {
            var e = this
                , t = e.definition
                , o = e.table
                , i = document.createElement("div");
            if (i.classList.add("tabulator-col-title"),
                t.editableTitle) {
                var n = document.createElement("input");
                n.classList.add("tabulator-title-editor"),
                    n.addEventListener("click", function(e) {
                        e.stopPropagation(),
                            n.focus()
                    }),
                    n.addEventListener("change", function() {
                        t.title = n.value,
                            o.options.columnTitleChanged.call(e.table, e.getComponent())
                    }),
                    i.appendChild(n),
                    t.field ? o.modules.localize.bind("columns|" + t.field, function(e) {
                        n.value = e || t.title || "&nbsp;"
                    }) : n.value = t.title || "&nbsp;"
            } else
                t.field ? o.modules.localize.bind("columns|" + t.field, function(o) {
                    e._formatColumnHeaderTitle(i, o || t.title || "&nbsp;")
                }) : e._formatColumnHeaderTitle(i, t.title || "&nbsp;");
            return i
        }
        ,
        n.prototype._formatColumnHeaderTitle = function(e, t) {
            var o, i, n, s, a, r = this;
            if (this.definition.titleFormatter && this.table.modExists("format"))
                switch (o = this.table.modules.format.getFormatter(this.definition.titleFormatter),
                    a = function(e) {
                        r.titleFormatterRendered = e
                    }
                    ,
                    s = {
                        getValue: function() {
                            return t
                        },
                        getElement: function() {
                            return e
                        }
                    },
                    n = this.definition.titleFormatterParams || {},
                    n = "function" == typeof n ? n() : n,
                    i = o.call(this.table.modules.format, s, n, a),
                    void 0 === i ? "undefined" : _typeof(i)) {
                    case "object":
                        i instanceof Node ? e.appendChild(i) : (e.innerHTML = "",
                            console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", i));
                        break;
                    case "undefined":
                    case "null":
                        e.innerHTML = "";
                        break;
                    default:
                        e.innerHTML = i
                }
            else
                e.innerHTML = t
        }
        ,
        n.prototype._buildGroupHeader = function() {
            var e = this;
            if (this.element.classList.add("tabulator-col-group"),
                this.element.setAttribute("role", "columngroup"),
                this.element.setAttribute("aria-title", this.definition.title),
                this.definition.cssClass) {
                this.definition.cssClass.split(" ").forEach(function(t) {
                    e.element.classList.add(t)
                })
            }
            (this.definition.headerContextMenu || this.definition.headerMenu) && this.table.modExists("menu") && this.table.modules.menu.initializeColumnHeader(this),
                this.titleElement.style.textAlign = this.definition.headerHozAlign || this.table.options.headerHozAlign,
                this.element.appendChild(this.groupElement)
        }
        ,
        n.prototype._getFlatData = function(e) {
            return e[this.field]
        }
        ,
        n.prototype._getNestedData = function(e) {
            for (var t, o = e, i = this.fieldStructure, n = i.length, s = 0; s < n && (o = o[i[s]],
                t = o,
                o); s++)
                ;
            return t
        }
        ,
        n.prototype._setFlatData = function(e, t) {
            this.field && (e[this.field] = t)
        }
        ,
        n.prototype._setNestedData = function(e, t) {
            for (var o = e, i = this.fieldStructure, n = i.length, s = 0; s < n; s++)
                if (s == n - 1)
                    o[i[s]] = t;
                else {
                    if (!o[i[s]]) {
                        if (void 0 === t)
                            break;
                        o[i[s]] = {}
                    }
                    o = o[i[s]]
                }
        }
        ,
        n.prototype.attachColumn = function(e) {
            var t = this;
            t.groupElement ? (t.columns.push(e),
                t.groupElement.appendChild(e.getElement())) : console.warn("Column Warning - Column being attached to another column instead of column group")
        }
        ,
        n.prototype.verticalAlign = function(e, t) {
            var o = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : t || this.parent.getHeadersElement().clientHeight;
            this.element.style.height = o + "px",
            this.isGroup && (this.groupElement.style.minHeight = o - this.contentElement.offsetHeight + "px"),
            this.isGroup || "top" === e || (this.element.style.paddingTop = "bottom" === e ? this.element.clientHeight - this.contentElement.offsetHeight + "px" : (this.element.clientHeight - this.contentElement.offsetHeight) / 2 + "px"),
                this.columns.forEach(function(t) {
                    t.verticalAlign(e)
                })
        }
        ,
        n.prototype.clearVerticalAlign = function() {
            this.element.style.paddingTop = "",
                this.element.style.height = "",
                this.element.style.minHeight = "",
                this.groupElement.style.minHeight = "",
                this.columns.forEach(function(e) {
                    e.clearVerticalAlign()
                })
        }
        ,
        n.prototype.bindModuleColumns = function() {
            "rownum" == this.definition.formatter && (this.table.rowManager.rowNumColumn = this)
        }
        ,
        n.prototype.getElement = function() {
            return this.element
        }
        ,
        n.prototype.getGroupElement = function() {
            return this.groupElement
        }
        ,
        n.prototype.getField = function() {
            return this.field
        }
        ,
        n.prototype.getFirstColumn = function() {
            return this.isGroup ? !!this.columns.length && this.columns[0].getFirstColumn() : this
        }
        ,
        n.prototype.getLastColumn = function() {
            return this.isGroup ? !!this.columns.length && this.columns[this.columns.length - 1].getLastColumn() : this
        }
        ,
        n.prototype.getColumns = function() {
            return this.columns
        }
        ,
        n.prototype.getCells = function() {
            return this.cells
        }
        ,
        n.prototype.getTopColumn = function() {
            return this.parent.isGroup ? this.parent.getTopColumn() : this
        }
        ,
        n.prototype.getDefinition = function(e) {
            var t = [];
            return this.isGroup && e && (this.columns.forEach(function(e) {
                t.push(e.getDefinition(!0))
            }),
                this.definition.columns = t),
                this.definition
        }
        ,
        n.prototype.checkColumnVisibility = function() {
            var e = !1;
            this.columns.forEach(function(t) {
                t.visible && (e = !0)
            }),
                e ? (this.show(),
                    this.parent.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), !1)) : this.hide()
        }
        ,
        n.prototype.show = function(e, t) {
            this.visible || (this.visible = !0,
                this.element.style.display = "",
            this.parent.isGroup && this.parent.checkColumnVisibility(),
                this.cells.forEach(function(e) {
                    e.show()
                }),
            this.isGroup || null !== this.width || this.reinitializeWidth(),
                this.table.columnManager._verticalAlignHeaders(),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.columns && this.table.modules.persistence.save("columns"),
            !t && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible),
            e || this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), !0),
            this.parent.isGroup && this.parent.matchChildWidths(),
            !this.silent && this.table.options.virtualDomHoz && this.table.vdomHoz.reinitialize())
        }
        ,
        n.prototype.hide = function(e, t) {
            this.visible && (this.visible = !1,
                this.element.style.display = "none",
                this.table.columnManager._verticalAlignHeaders(),
            this.parent.isGroup && this.parent.checkColumnVisibility(),
                this.cells.forEach(function(e) {
                    e.hide()
                }),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.columns && this.table.modules.persistence.save("columns"),
            !t && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible),
            e || this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), !1),
            this.parent.isGroup && this.parent.matchChildWidths(),
            !this.silent && this.table.options.virtualDomHoz && this.table.vdomHoz.reinitialize())
        }
        ,
        n.prototype.matchChildWidths = function() {
            var e = 0;
            this.contentElement && this.columns.length && (this.columns.forEach(function(t) {
                t.visible && (e += t.getWidth())
            }),
                this.contentElement.style.maxWidth = e - 1 + "px",
            this.parent.isGroup && this.parent.matchChildWidths())
        }
        ,
        n.prototype.removeChild = function(e) {
            var t = this.columns.indexOf(e);
            t > -1 && this.columns.splice(t, 1),
            this.columns.length || this.delete()
        }
        ,
        n.prototype.setWidth = function(e) {
            this.widthFixed = !0,
                this.setWidthActual(e)
        }
        ,
        n.prototype.setWidthActual = function(e) {
            isNaN(e) && (e = Math.floor(this.table.element.clientWidth / 100 * parseInt(e))),
                e = Math.max(this.minWidth, e),
            this.maxWidth && (e = Math.min(this.maxWidth, e)),
                this.width = e,
                this.widthStyled = e ? e + "px" : "",
                this.element.style.width = this.widthStyled,
            this.isGroup || this.cells.forEach(function(e) {
                e.setWidth()
            }),
            this.parent.isGroup && this.parent.matchChildWidths(),
            this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layout()
        }
        ,
        n.prototype.checkCellHeights = function() {
            var e = [];
            this.cells.forEach(function(t) {
                t.row.heightInitialized && (null !== t.row.getElement().offsetParent ? (e.push(t.row),
                    t.row.clearCellHeight()) : t.row.heightInitialized = !1)
            }),
                e.forEach(function(e) {
                    e.calcHeight()
                }),
                e.forEach(function(e) {
                    e.setCellHeight()
                })
        }
        ,
        n.prototype.getWidth = function() {
            var e = 0;
            return this.isGroup ? this.columns.forEach(function(t) {
                t.visible && (e += t.getWidth())
            }) : e = this.width,
                e
        }
        ,
        n.prototype.getHeight = function() {
            return this.element.offsetHeight
        }
        ,
        n.prototype.setMinWidth = function(e) {
            this.minWidth = e,
                this.minWidthStyled = e ? e + "px" : "",
                this.element.style.minWidth = this.minWidthStyled,
                this.cells.forEach(function(e) {
                    e.setMinWidth()
                })
        }
        ,
        n.prototype.setMaxWidth = function(e) {
            this.maxWidth = e,
                this.maxWidthStyled = e ? e + "px" : "",
                this.element.style.maxWidth = this.maxWidthStyled,
                this.cells.forEach(function(e) {
                    e.setMaxWidth()
                })
        }
        ,
        n.prototype.delete = function() {
            var e = this;
            return new Promise(function(t, o) {
                    e.isGroup && e.columns.forEach(function(e) {
                        e.delete()
                    }),
                    e.table.modExists("edit") && e.table.modules.edit.currentCell.column === e && e.table.modules.edit.cancelEdit();
                    for (var i = e.cells.length, n = 0; n < i; n++)
                        e.cells[0].delete();
                    e.element.parentNode && e.element.parentNode.removeChild(e.element),
                        e.element = !1,
                        e.contentElement = !1,
                        e.titleElement = !1,
                        e.groupElement = !1,
                    e.parent.isGroup && e.parent.removeChild(e),
                        e.table.columnManager.deregisterColumn(e),
                    e.table.options.virtualDomHoz && e.table.vdomHoz.reinitialize(!0),
                        t()
                }
            )
        }
        ,
        n.prototype.columnRendered = function() {
            this.titleFormatterRendered && this.titleFormatterRendered()
        }
        ,
        n.prototype.validate = function() {
            var e = [];
            return this.cells.forEach(function(t) {
                t.validate() || e.push(t.getComponent())
            }),
            !e.length || e
        }
        ,
        n.prototype.generateCell = function(e) {
            var t = this
                , o = new u(t,e);
            return this.cells.push(o),
                o
        }
        ,
        n.prototype.nextColumn = function() {
            var e = this.table.columnManager.findColumnIndex(this);
            return e > -1 && this._nextVisibleColumn(e + 1)
        }
        ,
        n.prototype._nextVisibleColumn = function(e) {
            var t = this.table.columnManager.getColumnByIndex(e);
            return !t || t.visible ? t : this._nextVisibleColumn(e + 1)
        }
        ,
        n.prototype.prevColumn = function() {
            var e = this.table.columnManager.findColumnIndex(this);
            return e > -1 && this._prevVisibleColumn(e - 1)
        }
        ,
        n.prototype._prevVisibleColumn = function(e) {
            var t = this.table.columnManager.getColumnByIndex(e);
            return !t || t.visible ? t : this._prevVisibleColumn(e - 1)
        }
        ,
        n.prototype.reinitializeWidth = function(e) {
            this.widthFixed = !1,
            void 0 === this.definition.width || e || this.setWidth(this.definition.width),
            this.table.modExists("filter") && this.table.modules.filter.hideHeaderFilterElements(),
                this.fitToData(),
            this.table.modExists("filter") && this.table.modules.filter.showHeaderFilterElements()
        }
        ,
        n.prototype.fitToData = function() {
            var e = this;
            this.widthFixed || (this.element.style.width = "",
                e.cells.forEach(function(e) {
                    e.clearWidth()
                }));
            var t = this.element.offsetWidth;
            e.width && this.widthFixed || (e.cells.forEach(function(e) {
                var o = e.getWidth();
                o > t && (t = o)
            }),
            t && e.setWidthActual(t + 1))
        }
        ,
        n.prototype.updateDefinition = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    var n;
                    t.isGroup ? (console.warn("Column Update Error - The updateDefinition function is only available on ungrouped columns"),
                        i("Column Update Error - The updateDefinition function is only available on columns, not column groups")) : t.parent.isGroup ? (n = Object.assign({}, t.getDefinition()),
                        n = Object.assign(n, e),
                        t.table.columnManager.addColumn(n, !1, t).then(function(e) {
                            n.field == t.field && (t.field = !1),
                                t.delete().then(function() {
                                    o(e.getComponent())
                                }).catch(function(e) {
                                    i(e)
                                })
                        }).catch(function(e) {
                            i(e)
                        })) : (console.warn("Column Update Error - The updateDefinition function is only available on ungrouped columns"),
                        i("Column Update Error - The updateDefinition function is only available on columns, not column groups"))
                }
            )
        }
        ,
        n.prototype.deleteCell = function(e) {
            var t = this.cells.indexOf(e);
            t > -1 && this.cells.splice(t, 1)
        }
        ,
        n.prototype.defaultOptionList = ["title", "field", "columns", "visible", "align", "hozAlign", "vertAlign", "width", "minWidth", "maxWidth", "widthGrow", "widthShrink", "resizable", "frozen", "responsive", "tooltip", "cssClass", "rowHandle", "hideInHtml", "print", "htmlOutput", "sorter", "sorterParams", "formatter", "formatterParams", "variableHeight", "editable", "editor", "editorParams", "validator", "mutator", "mutatorParams", "mutatorData", "mutatorDataParams", "mutatorEdit", "mutatorEditParams", "mutatorClipboard", "mutatorClipboardParams", "accessor", "accessorParams", "accessorData", "accessorDataParams", "accessorDownload", "accessorDownloadParams", "accessorClipboard", "accessorClipboardParams", "accessorPrint", "accessorPrintParams", "accessorHtmlOutput", "accessorHtmlOutputParams", "clipboard", "download", "downloadTitle", "topCalc", "topCalcParams", "topCalcFormatter", "topCalcFormatterParams", "bottomCalc", "bottomCalcParams", "bottomCalcFormatter", "bottomCalcFormatterParams", "cellClick", "cellDblClick", "cellContext", "cellTap", "cellDblTap", "cellTapHold", "cellMouseEnter", "cellMouseLeave", "cellMouseOver", "cellMouseOut", "cellMouseMove", "cellEditing", "cellEdited", "cellEditCancelled", "headerSort", "headerSortStartingDir", "headerSortTristate", "headerClick", "headerDblClick", "headerContext", "headerTap", "headerDblTap", "headerTapHold", "headerTooltip", "headerVertical", "headerHozAlign", "editableTitle", "titleFormatter", "titleFormatterParams", "headerFilter", "headerFilterPlaceholder", "headerFilterParams", "headerFilterEmptyCheck", "headerFilterFunc", "headerFilterFuncParams", "headerFilterLiveFilter", "print", "headerContextMenu", "headerMenu", "contextMenu", "clickMenu", "formatterPrint", "formatterPrintParams", "formatterClipboard", "formatterClipboardParams", "formatterHtmlOutput", "formatterHtmlOutputParams", "titlePrint", "titleClipboard", "titleHtmlOutput", "titleDownload"],
        n.prototype.getComponent = function() {
            return this.component || (this.component = new o(this)),
                this.component
        }
    ;
    var s = function(e) {
        this.table = e,
            this.element = this.createHolderElement(),
            this.tableElement = this.createTableElement(),
            this.heightFixer = this.createTableElement(),
            this.columnManager = null,
            this.height = 0,
            this.firstRender = !1,
            this.renderMode = "virtual",
            this.fixedHeight = !1,
            this.rows = [],
            this.activeRows = [],
            this.activeRowsCount = 0,
            this.displayRows = [],
            this.displayRowsCount = 0,
            this.scrollTop = 0,
            this.scrollLeft = 0,
            this.vDomRowHeight = 20,
            this.vDomTop = 0,
            this.vDomBottom = 0,
            this.vDomScrollPosTop = 0,
            this.vDomScrollPosBottom = 0,
            this.vDomTopPad = 0,
            this.vDomBottomPad = 0,
            this.vDomMaxRenderChain = 90,
            this.vDomWindowBuffer = 0,
            this.vDomWindowMinTotalRows = 20,
            this.vDomWindowMinMarginRows = 5,
            this.vDomTopNewRows = [],
            this.vDomBottomNewRows = [],
            this.rowNumColumn = !1,
            this.redrawBlock = !1,
            this.redrawBlockRestoreConfig = !1,
            this.redrawBlockRederInPosition = !1
    };
    s.prototype.createHolderElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-tableHolder"),
            e.setAttribute("tabindex", 0),
            e
    }
        ,
        s.prototype.createTableElement = function() {
            var e = document.createElement("div");
            return e.classList.add("tabulator-table"),
                e
        }
        ,
        s.prototype.getElement = function() {
            return this.element
        }
        ,
        s.prototype.getTableElement = function() {
            return this.tableElement
        }
        ,
        s.prototype.getRowPosition = function(e, t) {
            return t ? this.activeRows.indexOf(e) : this.rows.indexOf(e)
        }
        ,
        s.prototype.setColumnManager = function(e) {
            this.columnManager = e
        }
        ,
        s.prototype.initialize = function() {
            var e = this;
            e.setRenderMode(),
                e.element.appendChild(e.tableElement),
                e.firstRender = !0,
                e.element.addEventListener("scroll", function() {
                    var t = e.element.scrollLeft;
                    e.scrollLeft != t && (e.columnManager.scrollHorizontal(t),
                    e.table.options.groupBy && e.table.modules.groupRows.scrollHeaders(t),
                    e.table.modExists("columnCalcs") && e.table.modules.columnCalcs.scrollHorizontal(t),
                        e.table.options.scrollHorizontal(t)),
                        e.scrollLeft = t
                }),
            "virtual" === this.renderMode && e.element.addEventListener("scroll", function() {
                var t = e.element.scrollTop
                    , o = e.scrollTop > t;
                e.scrollTop != t ? (e.scrollTop = t,
                    e.scrollVertical(o),
                "scroll" == e.table.options.ajaxProgressiveLoad && e.table.modules.ajax.nextPage(e.element.scrollHeight - e.element.clientHeight - t),
                    e.table.options.scrollVertical(t)) : e.scrollTop = t
            })
        }
        ,
        s.prototype.findRow = function(e) {
            var t = this;
            if ("object" != (void 0 === e ? "undefined" : _typeof(e))) {
                if (void 0 === e || null === e)
                    return !1;
                return t.rows.find(function(o) {
                    return o.data[t.table.options.index] == e
                }) || !1
            }
            if (e instanceof l)
                return e;
            if (e instanceof r)
                return e._getSelf() || !1;
            if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) {
                return t.rows.find(function(t) {
                    return t.getElement() === e
                }) || !1
            }
            return !1
        }
        ,
        s.prototype.getRowFromDataObject = function(e) {
            return this.rows.find(function(t) {
                return t.data === e
            }) || !1
        }
        ,
        s.prototype.getRowFromPosition = function(e, t) {
            return t ? this.activeRows[e] : this.rows[e]
        }
        ,
        s.prototype.scrollToRow = function(e, t, o) {
            var i, n = this, s = this.getDisplayRows().indexOf(e), a = e.getElement(), r = 0;
            return new Promise(function(e, l) {
                    if (s > -1) {
                        if (void 0 === t && (t = n.table.options.scrollToRowPosition),
                        void 0 === o && (o = n.table.options.scrollToRowIfVisible),
                        "nearest" === t)
                            switch (n.renderMode) {
                                case "classic":
                                    i = h.prototype.helpers.elOffset(a).top,
                                        t = Math.abs(n.element.scrollTop - i) > Math.abs(n.element.scrollTop + n.element.clientHeight - i) ? "bottom" : "top";
                                    break;
                                case "virtual":
                                    t = Math.abs(n.vDomTop - s) > Math.abs(n.vDomBottom - s) ? "bottom" : "top"
                            }
                        if (!o && h.prototype.helpers.elVisible(a) && (r = h.prototype.helpers.elOffset(a).top - h.prototype.helpers.elOffset(n.element).top) > 0 && r < n.element.clientHeight - a.offsetHeight)
                            return !1;
                        switch (n.renderMode) {
                            case "classic":
                                n.element.scrollTop = h.prototype.helpers.elOffset(a).top - h.prototype.helpers.elOffset(n.element).top + n.element.scrollTop;
                                break;
                            case "virtual":
                                n._virtualRenderFill(s, !0)
                        }
                        switch (t) {
                            case "middle":
                            case "center":
                                n.element.scrollHeight - n.element.scrollTop == n.element.clientHeight ? n.element.scrollTop = n.element.scrollTop + (a.offsetTop - n.element.scrollTop) - (n.element.scrollHeight - a.offsetTop) / 2 : n.element.scrollTop = n.element.scrollTop - n.element.clientHeight / 2;
                                break;
                            case "bottom":
                                n.element.scrollHeight - n.element.scrollTop == n.element.clientHeight ? n.element.scrollTop = n.element.scrollTop - (n.element.scrollHeight - a.offsetTop) + a.offsetHeight : n.element.scrollTop = n.element.scrollTop - n.element.clientHeight + a.offsetHeight
                        }
                        e()
                    } else
                        console.warn("Scroll Error - Row not visible"),
                            l("Scroll Error - Row not visible")
                }
            )
        }
        ,
        s.prototype.setData = function(e, t, o) {
            var i = this
                , n = this;
            return new Promise(function(s, a) {
                    t && i.getDisplayRows().length ? n.table.options.pagination ? n._setDataActual(e, !0) : i.reRenderInPosition(function() {
                        n._setDataActual(e)
                    }) : (i.table.options.autoColumns && o && i.table.columnManager.generateColumnsFromRowData(e),
                        i.resetScroll(),
                        i._setDataActual(e)),
                        s()
                }
            )
        }
        ,
        s.prototype._setDataActual = function(e, t) {
            var o = this;
            o.table.options.dataLoading.call(this.table, e),
                this._wipeElements(),
            this.table.options.history && this.table.modExists("history") && this.table.modules.history.clear(),
                Array.isArray(e) ? (this.table.modExists("selectRow") && this.table.modules.selectRow.clearSelectionData(),
                this.table.options.reactiveData && this.table.modExists("reactiveData", !0) && this.table.modules.reactiveData.watchData(e),
                    e.forEach(function(e, t) {
                        if (e && "object" === (void 0 === e ? "undefined" : _typeof(e))) {
                            var i = new l(e,o);
                            o.rows.push(i)
                        } else
                            console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:", e)
                    }),
                    o.refreshActiveData(!1, !1, t),
                    o.table.options.dataLoaded.call(this.table, e)) : console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", void 0 === e ? "undefined" : _typeof(e), "\nData:     ", e)
        }
        ,
        s.prototype._wipeElements = function() {
            this.rows.forEach(function(e) {
                e.wipe()
            }),
            this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.wipe(),
                this.rows = [],
                this.activeRows = [],
                this.activeRowsCount = 0,
                this.displayRows = [],
                this.displayRowsCount = 0,
                this.adjustTableSize()
        }
        ,
        s.prototype.deleteRow = function(e, t) {
            var o = this.rows.indexOf(e)
                , i = this.activeRows.indexOf(e);
            i > -1 && this.activeRows.splice(i, 1),
            o > -1 && this.rows.splice(o, 1),
                this.setActiveRows(this.activeRows),
                this.displayRowIterator(function(t) {
                    var o = t.indexOf(e);
                    o > -1 && t.splice(o, 1)
                }),
            t || this.reRenderInPosition(),
                this.regenerateRowNumbers(),
                this.table.options.rowDeleted.call(this.table, e.getComponent()),
            this.table.options.dataChanged && this.table.options.dataChanged.call(this.table, this.getData()),
                this.table.options.groupBy && this.table.modExists("groupRows") ? this.table.modules.groupRows.updateGroupRows(!0) : this.table.options.pagination && this.table.modExists("page") ? this.refreshActiveData(!1, !1, !0) : this.table.options.pagination && this.table.modExists("page") && this.refreshActiveData("page")
        }
        ,
        s.prototype.addRow = function(e, t, o, i) {
            var n = this.addRowActual(e, t, o, i);
            return this.table.options.history && this.table.modExists("history") && this.table.modules.history.action("rowAdd", n, {
                data: e,
                pos: t,
                index: o
            }),
                n
        }
        ,
        s.prototype.addRows = function(e, t, o) {
            var i = this
                , n = this
                , s = 0
                , a = [];
            return new Promise(function(r, l) {
                    t = i.findAddRowPos(t),
                    Array.isArray(e) || (e = [e]),
                        s = e.length - 1,
                    (void 0 === o && t || void 0 !== o && !t) && e.reverse(),
                        e.forEach(function(e, i) {
                            var s = n.addRow(e, t, o, !0);
                            a.push(s)
                        }),
                        i.table.options.groupBy && i.table.modExists("groupRows") ? i.table.modules.groupRows.updateGroupRows(!0) : i.table.options.pagination && i.table.modExists("page") ? i.refreshActiveData(!1, !1, !0) : i.reRenderInPosition(),
                    i.table.modExists("columnCalcs") && i.table.modules.columnCalcs.recalc(i.table.rowManager.activeRows),
                        i.regenerateRowNumbers(),
                        r(a)
                }
            )
        }
        ,
        s.prototype.findAddRowPos = function(e) {
            return void 0 === e && (e = this.table.options.addRowPos),
            "pos" === e && (e = !0),
            "bottom" === e && (e = !1),
                e
        }
        ,
        s.prototype.addRowActual = function(e, t, o, i) {
            var n, s, a = e instanceof l ? e : new l(e || {},this), r = this.findAddRowPos(t), c = -1;
            if (!o && this.table.options.pagination && "page" == this.table.options.paginationAddRow && (s = this.getDisplayRows(),
                r ? s.length ? o = s[0] : this.activeRows.length && (o = this.activeRows[this.activeRows.length - 1],
                    r = !1) : s.length && (o = s[s.length - 1],
                    r = !(s.length < this.table.modules.page.getPageSize()))),
            void 0 !== o && (o = this.findRow(o)),
            this.table.options.groupBy && this.table.modExists("groupRows")) {
                this.table.modules.groupRows.assignRowToGroup(a);
                var u = a.getGroup().rows;
                u.length > 1 && (!o || o && -1 == u.indexOf(o) ? r ? u[0] !== a && (o = u[0],
                    this._moveRowInArray(a.getGroup().rows, a, o, !r)) : u[u.length - 1] !== a && (o = u[u.length - 1],
                    this._moveRowInArray(a.getGroup().rows, a, o, !r)) : this._moveRowInArray(a.getGroup().rows, a, o, !r))
            }
            return o && (c = this.rows.indexOf(o)),
                o && c > -1 ? (n = this.activeRows.indexOf(o),
                    this.displayRowIterator(function(e) {
                        var t = e.indexOf(o);
                        t > -1 && e.splice(r ? t : t + 1, 0, a)
                    }),
                n > -1 && this.activeRows.splice(r ? n : n + 1, 0, a),
                    this.rows.splice(r ? c : c + 1, 0, a)) : r ? (this.displayRowIterator(function(e) {
                    e.unshift(a)
                }),
                    this.activeRows.unshift(a),
                    this.rows.unshift(a)) : (this.displayRowIterator(function(e) {
                    e.push(a)
                }),
                    this.activeRows.push(a),
                    this.rows.push(a)),
                this.setActiveRows(this.activeRows),
                this.table.options.rowAdded.call(this.table, a.getComponent()),
            this.table.options.dataChanged && this.table.options.dataChanged.call(this.table, this.getData()),
            i || this.reRenderInPosition(),
                a
        }
        ,
        s.prototype.moveRow = function(e, t, o) {
            this.table.options.history && this.table.modExists("history") && this.table.modules.history.action("rowMove", e, {
                posFrom: this.getRowPosition(e),
                posTo: this.getRowPosition(t),
                to: t,
                after: o
            }),
                this.moveRowActual(e, t, o),
                this.regenerateRowNumbers(),
                this.table.options.rowMoved.call(this.table, e.getComponent())
        }
        ,
        s.prototype.moveRowActual = function(e, t, o) {
            var i = this;
            if (this._moveRowInArray(this.rows, e, t, o),
                this._moveRowInArray(this.activeRows, e, t, o),
                this.displayRowIterator(function(n) {
                    i._moveRowInArray(n, e, t, o)
                }),
            this.table.options.groupBy && this.table.modExists("groupRows")) {
                !o && t instanceof H && (t = this.table.rowManager.prevDisplayRow(e) || t);
                var n = t.getGroup()
                    , s = e.getGroup();
                n === s ? this._moveRowInArray(n.rows, e, t, o) : (s && s.removeRow(e),
                    n.insertRow(e, t, o))
            }
        }
        ,
        s.prototype._moveRowInArray = function(e, t, o, i) {
            var n, s, a, r;
            if (t !== o && (n = e.indexOf(t),
            n > -1 && (e.splice(n, 1),
                s = e.indexOf(o),
                s > -1 ? i ? e.splice(s + 1, 0, t) : e.splice(s, 0, t) : e.splice(n, 0, t)),
            e === this.getDisplayRows())) {
                a = n < s ? n : s,
                    r = s > n ? s : n + 1;
                for (var l = a; l <= r; l++)
                    e[l] && this.styleRow(e[l], l)
            }
        }
        ,
        s.prototype.clearData = function() {
            this.setData([])
        }
        ,
        s.prototype.getRowIndex = function(e) {
            return this.findRowIndex(e, this.rows)
        }
        ,
        s.prototype.getDisplayRowIndex = function(e) {
            var t = this.getDisplayRows().indexOf(e);
            return t > -1 && t
        }
        ,
        s.prototype.nextDisplayRow = function(e, t) {
            var o = this.getDisplayRowIndex(e)
                , i = !1;
            return !1 !== o && o < this.displayRowsCount - 1 && (i = this.getDisplayRows()[o + 1]),
                !i || i instanceof l && "row" == i.type ? i : this.nextDisplayRow(i, t)
        }
        ,
        s.prototype.prevDisplayRow = function(e, t) {
            var o = this.getDisplayRowIndex(e)
                , i = !1;
            return o && (i = this.getDisplayRows()[o - 1]),
                !t || !i || i instanceof l && "row" == i.type ? i : this.prevDisplayRow(i, t)
        }
        ,
        s.prototype.findRowIndex = function(e, t) {
            var o;
            return !!((e = this.findRow(e)) && (o = t.indexOf(e)) > -1) && o
        }
        ,
        s.prototype.getData = function(e, t) {
            var o = [];
            return this.getRows(e).forEach(function(e) {
                "row" == e.type && o.push(e.getData(t || "data"))
            }),
                o
        }
        ,
        s.prototype.getComponents = function(e) {
            var t = [];
            return this.getRows(e).forEach(function(e) {
                t.push(e.getComponent())
            }),
                t
        }
        ,
        s.prototype.getDataCount = function(e) {
            return this.getRows(e).length
        }
        ,
        s.prototype._genRemoteRequest = function() {
            var e = this
                , t = this.table
                , o = t.options
                , i = {};
            if (t.modExists("page")) {
                if (o.ajaxSorting) {
                    var n = this.table.modules.sort.getSort();
                    n.forEach(function(e) {
                        delete e.column
                    }),
                        i[this.table.modules.page.paginationDataSentNames.sorters] = n
                }
                if (o.ajaxFiltering) {
                    var s = this.table.modules.filter.getFilters(!0, !0);
                    i[this.table.modules.page.paginationDataSentNames.filters] = s
                }
                this.table.modules.ajax.setParams(i, !0)
            }
            t.modules.ajax.sendRequest().then(function(t) {
                e._setDataActual(t, !0)
            }).catch(function(e) {})
        }
        ,
        s.prototype.filterRefresh = function() {
            var e = this.table
                , t = e.options
                , o = this.scrollLeft;
            t.ajaxFiltering ? "remote" == t.pagination && e.modExists("page") ? (e.modules.page.reset(!0),
                e.modules.page.setPage(1).then(function() {}).catch(function() {})) : t.ajaxProgressiveLoad ? e.modules.ajax.loadData().then(function() {}).catch(function() {}) : this._genRemoteRequest() : this.refreshActiveData("filter"),
                this.scrollHorizontal(o)
        }
        ,
        s.prototype.sorterRefresh = function(e) {
            var t = this.table
                , o = this.table.options
                , i = this.scrollLeft;
            o.ajaxSorting ? ("remote" == o.pagination || o.progressiveLoad) && t.modExists("page") ? (t.modules.page.reset(!0),
                t.modules.page.setPage(1).then(function() {}).catch(function() {})) : o.ajaxProgressiveLoad ? t.modules.ajax.loadData().then(function() {}).catch(function() {}) : this._genRemoteRequest() : this.refreshActiveData(e ? "filter" : "sort"),
                this.scrollHorizontal(i)
        }
        ,
        s.prototype.scrollHorizontal = function(e) {
            this.scrollLeft = e,
                this.element.scrollLeft = e,
            this.table.options.groupBy && this.table.modules.groupRows.scrollHeaders(e),
            this.table.modExists("columnCalcs") && this.table.modules.columnCalcs.scrollHorizontal(e)
        }
        ,
        s.prototype.refreshActiveData = function(e, t, o) {
            var i, n = this, s = this.table, a = ["all", "filter", "sort", "display", "freeze", "group", "tree", "page"];
            if (this.redrawBlock)
                return void ((!this.redrawBlockRestoreConfig || a.indexOf(e) < a.indexOf(this.redrawBlockRestoreConfig.stage)) && (this.redrawBlockRestoreConfig = {
                    stage: e,
                    skipStage: t,
                    renderInPosition: o
                }));
            switch (n.table.modExists("edit") && n.table.modules.edit.cancelEdit(),
            e || (e = "all"),
            s.options.selectable && !s.options.selectablePersistence && s.modExists("selectRow") && s.modules.selectRow.deselectRows(),
                e) {
                case "all":
                case "filter":
                    t ? t = !1 : s.modExists("filter") ? n.setActiveRows(s.modules.filter.filter(n.rows)) : n.setActiveRows(n.rows.slice(0));
                case "sort":
                    t ? t = !1 : s.modExists("sort") && s.modules.sort.sort(this.activeRows),
                        this.regenerateRowNumbers();
                case "display":
                    this.resetDisplayRows();
                case "freeze":
                    t ? t = !1 : this.table.modExists("frozenRows") && s.modules.frozenRows.isFrozen() && (s.modules.frozenRows.getDisplayIndex() || s.modules.frozenRows.setDisplayIndex(this.getNextDisplayIndex()),
                        i = s.modules.frozenRows.getDisplayIndex(),
                    !0 !== (i = n.setDisplayRows(s.modules.frozenRows.getRows(this.getDisplayRows(i - 1)), i)) && s.modules.frozenRows.setDisplayIndex(i));
                case "group":
                    t ? t = !1 : s.options.groupBy && s.modExists("groupRows") && (s.modules.groupRows.getDisplayIndex() || s.modules.groupRows.setDisplayIndex(this.getNextDisplayIndex()),
                        i = s.modules.groupRows.getDisplayIndex(),
                    !0 !== (i = n.setDisplayRows(s.modules.groupRows.getRows(this.getDisplayRows(i - 1)), i)) && s.modules.groupRows.setDisplayIndex(i));
                case "tree":
                    t ? t = !1 : s.options.dataTree && s.modExists("dataTree") && (s.modules.dataTree.getDisplayIndex() || s.modules.dataTree.setDisplayIndex(this.getNextDisplayIndex()),
                        i = s.modules.dataTree.getDisplayIndex(),
                    !0 !== (i = n.setDisplayRows(s.modules.dataTree.getRows(this.getDisplayRows(i - 1)), i)) && s.modules.dataTree.setDisplayIndex(i)),
                    s.options.pagination && s.modExists("page") && !o && "local" == s.modules.page.getMode() && s.modules.page.reset();
                case "page":
                    t ? t = !1 : s.options.pagination && s.modExists("page") && (s.modules.page.getDisplayIndex() || s.modules.page.setDisplayIndex(this.getNextDisplayIndex()),
                        i = s.modules.page.getDisplayIndex(),
                    "local" == s.modules.page.getMode() && s.modules.page.setMaxRows(this.getDisplayRows(i - 1).length),
                    !0 !== (i = n.setDisplayRows(s.modules.page.getRows(this.getDisplayRows(i - 1)), i)) && s.modules.page.setDisplayIndex(i))
            }
            h.prototype.helpers.elVisible(n.element) && (o ? n.reRenderInPosition() : ("all" === e && this.table.options.virtualDomHoz && this.table.vdomHoz.dataChange(),
                n.renderTable(),
            s.options.layoutColumnsOnNewData && n.table.columnManager.redraw(!0))),
            s.modExists("columnCalcs") && s.modules.columnCalcs.recalc(this.activeRows)
        }
        ,
        s.prototype.regenerateRowNumbers = function() {
            var e = this;
            this.rowNumColumn && this.activeRows.forEach(function(t) {
                var o = t.getCell(e.rowNumColumn);
                o && o._generateContents()
            })
        }
        ,
        s.prototype.setActiveRows = function(e) {
            this.activeRows = e,
                this.activeRowsCount = this.activeRows.length
        }
        ,
        s.prototype.resetDisplayRows = function() {
            this.displayRows = [],
                this.displayRows.push(this.activeRows.slice(0)),
                this.displayRowsCount = this.displayRows[0].length,
            this.table.modExists("frozenRows") && this.table.modules.frozenRows.setDisplayIndex(0),
            this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.setDisplayIndex(0),
            this.table.options.pagination && this.table.modExists("page") && this.table.modules.page.setDisplayIndex(0)
        }
        ,
        s.prototype.getNextDisplayIndex = function() {
            return this.displayRows.length
        }
        ,
        s.prototype.setDisplayRows = function(e, t) {
            var o = !0;
            return t && void 0 !== this.displayRows[t] ? (this.displayRows[t] = e,
                o = !0) : (this.displayRows.push(e),
                o = t = this.displayRows.length - 1),
            t == this.displayRows.length - 1 && (this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length),
                o
        }
        ,
        s.prototype.getDisplayRows = function(e) {
            return void 0 === e ? this.displayRows.length ? this.displayRows[this.displayRows.length - 1] : [] : this.displayRows[e] || []
        }
        ,
        s.prototype.getVisibleRows = function(e) {
            var t = this.element.scrollTop
                , o = this.element.clientHeight + t
                , i = !1
                , n = 0
                , s = 0
                , a = this.getDisplayRows();
            if (e) {
                this.getDisplayRows();
                for (var r = this.vDomTop; r <= this.vDomBottom; r++)
                    if (a[r])
                        if (i) {
                            if (!(o - a[r].getElement().offsetTop >= 0))
                                break;
                            s = r
                        } else if (t - a[r].getElement().offsetTop >= 0)
                            n = r;
                        else {
                            if (i = !0,
                                !(o - a[r].getElement().offsetTop >= 0))
                                break;
                            s = r
                        }
            } else
                n = this.vDomTop,
                    s = this.vDomBottom;
            return a.slice(n, s + 1)
        }
        ,
        s.prototype.displayRowIterator = function(e) {
            this.displayRows.forEach(e),
                this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length
        }
        ,
        s.prototype.getRows = function(e) {
            var t;
            switch (e) {
                case "active":
                    t = this.activeRows;
                    break;
                case "display":
                    t = this.table.rowManager.getDisplayRows();
                    break;
                case "visible":
                    t = this.getVisibleRows(!0);
                    break;
                case "selected":
                    t = this.table.modules.selectRow.selectedRows;
                    break;
                default:
                    t = this.rows
            }
            return t
        }
        ,
        s.prototype.reRenderInPosition = function(e) {
            if ("virtual" == this.getRenderMode())
                if (this.redrawBlock)
                    e ? e() : this.redrawBlockRederInPosition = !0;
                else {
                    for (var t = this.element.scrollTop, o = !1, i = !1, n = this.scrollLeft, s = this.getDisplayRows(), a = this.vDomTop; a <= this.vDomBottom; a++)
                        if (s[a]) {
                            var r = t - s[a].getElement().offsetTop;
                            if (!(!1 === i || Math.abs(r) < i))
                                break;
                            i = r,
                                o = a
                        }
                    e && e(),
                        this._virtualRenderFill(!1 === o ? this.displayRowsCount - 1 : o, !0, i || 0),
                        this.scrollHorizontal(n)
                }
            else
                this.renderTable(),
                e && e()
        }
        ,
        s.prototype.setRenderMode = function() {
            this.table.options.virtualDom ? (this.renderMode = "virtual",
                this.table.element.clientHeight || this.table.options.height ? this.fixedHeight = !0 : this.fixedHeight = !1) : this.renderMode = "classic"
        }
        ,
        s.prototype.getRenderMode = function() {
            return this.renderMode
        }
        ,
        s.prototype.renderTable = function() {
            switch (this.table.options.renderStarted.call(this.table),
                this.element.scrollTop = 0,
                this.renderMode) {
                case "classic":
                    this._simpleRender();
                    break;
                case "virtual":
                    this._virtualRenderFill()
            }
            this.firstRender && (this.displayRowsCount ? (this.firstRender = !1,
                this.table.modules.layout.layout()) : this.renderEmptyScroll()),
            this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layout(),
            this.displayRowsCount || this.table.options.placeholder && (this.table.options.placeholder.setAttribute("tabulator-render-mode", this.renderMode),
                this.getElement().appendChild(this.table.options.placeholder),
                this.table.options.placeholder.style.width = this.table.columnManager.getWidth() + "px"),
                this.table.options.renderComplete.call(this.table)
        }
        ,
        s.prototype._simpleRender = function() {
            this._clearVirtualDom(),
                this.displayRowsCount ? this.checkClassicModeGroupHeaderWidth() : this.renderEmptyScroll()
        }
        ,
        s.prototype.checkClassicModeGroupHeaderWidth = function() {
            var e = this
                , t = this.tableElement
                , o = !0;
            e.getDisplayRows().forEach(function(i, n) {
                e.styleRow(i, n),
                    t.appendChild(i.getElement()),
                    i.initialize(!0),
                "group" !== i.type && (o = !1)
            }),
                t.style.minWidth = o ? e.table.columnManager.getWidth() + "px" : ""
        }
        ,
        s.prototype.renderEmptyScroll = function() {
            this.table.options.placeholder ? this.tableElement.style.display = "none" : this.tableElement.style.minWidth = this.table.columnManager.getWidth() + "px"
        }
        ,
        s.prototype._clearVirtualDom = function() {
            var e = this.tableElement;
            for (this.table.options.placeholder && this.table.options.placeholder.parentNode && this.table.options.placeholder.parentNode.removeChild(this.table.options.placeholder); e.firstChild; )
                e.removeChild(e.firstChild);
            e.style.paddingTop = "",
                e.style.paddingBottom = "",
                e.style.minWidth = "",
                e.style.minHeight = "",
                e.style.display = "",
                e.style.visibility = "",
                this.scrollTop = 0,
                this.scrollLeft = 0,
                this.vDomTop = 0,
                this.vDomBottom = 0,
                this.vDomTopPad = 0,
                this.vDomBottomPad = 0
        }
        ,
        s.prototype.styleRow = function(e, t) {
            var o = e.getElement();
            t % 2 ? (o.classList.add("tabulator-row-even"),
                o.classList.remove("tabulator-row-odd")) : (o.classList.add("tabulator-row-odd"),
                o.classList.remove("tabulator-row-even"))
        }
        ,
        s.prototype._virtualRenderFill = function(e, t, o) {
            var i = this
                , n = i.tableElement
                , s = i.element
                , a = 0
                , r = 0
                , l = 0
                , c = 0
                , u = !0
                , d = i.getDisplayRows();
            if (e = e || 0,
                o = o || 0,
                e) {
                for (; n.firstChild; )
                    n.removeChild(n.firstChild);
                var p = (i.displayRowsCount - e + 1) * i.vDomRowHeight;
                p < i.height && (e -= Math.ceil((i.height - p) / i.vDomRowHeight)) < 0 && (e = 0),
                    a = Math.min(Math.max(Math.floor(i.vDomWindowBuffer / i.vDomRowHeight), i.vDomWindowMinMarginRows), e),
                    e -= a
            } else
                i._clearVirtualDom();
            if (i.displayRowsCount && h.prototype.helpers.elVisible(i.element)) {
                for (i.vDomTop = e,
                         i.vDomBottom = e - 1; (r <= i.height + i.vDomWindowBuffer || c < i.vDomWindowMinTotalRows) && i.vDomBottom < i.displayRowsCount - 1; ) {
                    var m = i.vDomBottom + 1
                        , f = d[m]
                        , g = 0;
                    i.styleRow(f, m),
                        n.appendChild(f.getElement()),
                        f.initialize(),
                    f.heightInitialized || f.normalizeHeight(!0),
                        g = f.getHeight(),
                        c < a ? l += g : r += g,
                    g > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * g),
                    "group" !== f.type && (u = !1),
                        i.vDomBottom++,
                        c++
                }
                e ? (i.vDomTopPad = t ? i.vDomRowHeight * this.vDomTop + o : i.scrollTop - l,
                    i.vDomBottomPad = i.vDomBottom == i.displayRowsCount - 1 ? 0 : Math.max(i.vDomScrollHeight - i.vDomTopPad - r - l, 0)) : (this.vDomTopPad = 0,
                    i.vDomRowHeight = Math.floor((r + l) / c),
                    i.vDomBottomPad = i.vDomRowHeight * (i.displayRowsCount - i.vDomBottom - 1),
                    i.vDomScrollHeight = l + r + i.vDomBottomPad - i.height),
                    n.style.paddingTop = i.vDomTopPad + "px",
                    n.style.paddingBottom = i.vDomBottomPad + "px",
                t && (this.scrollTop = i.vDomTopPad + l + o - (this.element.scrollWidth > this.element.clientWidth ? this.element.offsetHeight - this.element.clientHeight : 0)),
                    this.scrollTop = Math.min(this.scrollTop, this.element.scrollHeight - this.height),
                this.element.scrollWidth > this.element.offsetWidth && t && (this.scrollTop += this.element.offsetHeight - this.element.clientHeight),
                    this.vDomScrollPosTop = this.scrollTop,
                    this.vDomScrollPosBottom = this.scrollTop,
                    s.scrollTop = this.scrollTop,
                    n.style.minWidth = u ? i.table.columnManager.getWidth() + "px" : "",
                i.table.options.groupBy && "fitDataFill" != i.table.modules.layout.getMode() && i.displayRowsCount == i.table.modules.groupRows.countGroups() && (i.tableElement.style.minWidth = i.table.columnManager.getWidth())
            } else
                this.renderEmptyScroll();
            this.fixedHeight || this.adjustTableSize()
        }
        ,
        s.prototype.scrollVertical = function(e) {
            var t = this.scrollTop - this.vDomScrollPosTop
                , o = this.scrollTop - this.vDomScrollPosBottom
                , i = 2 * this.vDomWindowBuffer;
            if (-t > i || o > i) {
                var n = this.scrollLeft;
                this._virtualRenderFill(Math.floor(this.element.scrollTop / this.element.scrollHeight * this.displayRowsCount)),
                    this.scrollHorizontal(n)
            } else
                e ? (t < 0 && this._addTopRow(-t),
                o < 0 && (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer ? this._removeBottomRow(-o) : this.vDomScrollPosBottom = this.scrollTop)) : (t >= 0 && (this.scrollTop > this.vDomWindowBuffer ? this._removeTopRow(t) : this.vDomScrollPosTop = this.scrollTop),
                o >= 0 && this._addBottomRow(o))
        }
        ,
        s.prototype._addTopRow = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                , o = this.tableElement
                , i = this.getDisplayRows();
            if (this.vDomTop) {
                var n = this.vDomTop - 1
                    , s = i[n]
                    , a = s.getHeight() || this.vDomRowHeight;
                e >= a && (this.styleRow(s, n),
                    o.insertBefore(s.getElement(), o.firstChild),
                s.initialized && s.heightInitialized || (this.vDomTopNewRows.push(s),
                s.heightInitialized || s.clearCellHeight()),
                    s.initialize(),
                    this.vDomTopPad -= a,
                this.vDomTopPad < 0 && (this.vDomTopPad = n * this.vDomRowHeight),
                n || (this.vDomTopPad = 0),
                    o.style.paddingTop = this.vDomTopPad + "px",
                    this.vDomScrollPosTop -= a,
                    this.vDomTop--),
                    e = -(this.scrollTop - this.vDomScrollPosTop),
                s.getHeight() > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * s.getHeight()),
                    t < this.vDomMaxRenderChain && this.vDomTop && e >= (i[this.vDomTop - 1].getHeight() || this.vDomRowHeight) ? this._addTopRow(e, t + 1) : this._quickNormalizeRowHeight(this.vDomTopNewRows)
            }
        }
        ,
        s.prototype._removeTopRow = function(e) {
            var t = this.tableElement
                , o = this.getDisplayRows()[this.vDomTop]
                , i = o.getHeight() || this.vDomRowHeight;
            if (e >= i) {
                var n = o.getElement();
                n.parentNode.removeChild(n),
                    this.vDomTopPad += i,
                    t.style.paddingTop = this.vDomTopPad + "px",
                    this.vDomScrollPosTop += this.vDomTop ? i : i + this.vDomWindowBuffer,
                    this.vDomTop++,
                    e = this.scrollTop - this.vDomScrollPosTop,
                    this._removeTopRow(e)
            }
        }
        ,
        s.prototype._addBottomRow = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                , o = this.tableElement
                , i = this.getDisplayRows();
            if (this.vDomBottom < this.displayRowsCount - 1) {
                var n = this.vDomBottom + 1
                    , s = i[n]
                    , a = s.getHeight() || this.vDomRowHeight;
                e >= a && (this.styleRow(s, n),
                    o.appendChild(s.getElement()),
                s.initialized && s.heightInitialized || (this.vDomBottomNewRows.push(s),
                s.heightInitialized || s.clearCellHeight()),
                    s.initialize(),
                    this.vDomBottomPad -= a,
                (this.vDomBottomPad < 0 || n == this.displayRowsCount - 1) && (this.vDomBottomPad = 0),
                    o.style.paddingBottom = this.vDomBottomPad + "px",
                    this.vDomScrollPosBottom += a,
                    this.vDomBottom++),
                    e = this.scrollTop - this.vDomScrollPosBottom,
                s.getHeight() > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * s.getHeight()),
                    t < this.vDomMaxRenderChain && this.vDomBottom < this.displayRowsCount - 1 && e >= (i[this.vDomBottom + 1].getHeight() || this.vDomRowHeight) ? this._addBottomRow(e, t + 1) : this._quickNormalizeRowHeight(this.vDomBottomNewRows)
            }
        }
        ,
        s.prototype._removeBottomRow = function(e) {
            var t = this.tableElement
                , o = this.getDisplayRows()[this.vDomBottom]
                , i = o.getHeight() || this.vDomRowHeight;
            if (e >= i) {
                var n = o.getElement();
                n.parentNode && n.parentNode.removeChild(n),
                    this.vDomBottomPad += i,
                this.vDomBottomPad < 0 && (this.vDomBottomPad = 0),
                    t.style.paddingBottom = this.vDomBottomPad + "px",
                    this.vDomScrollPosBottom -= i,
                    this.vDomBottom--,
                    e = -(this.scrollTop - this.vDomScrollPosBottom),
                    this._removeBottomRow(e)
            }
        }
        ,
        s.prototype._quickNormalizeRowHeight = function(e) {
            e.forEach(function(e) {
                e.calcHeight()
            }),
                e.forEach(function(e) {
                    e.setCellHeight()
                }),
                e.length = 0
        }
        ,
        s.prototype.normalizeHeight = function() {
            this.activeRows.forEach(function(e) {
                e.normalizeHeight()
            })
        }
        ,
        s.prototype.adjustTableSize = function() {
            var e, t = this.element.clientHeight;
            if ("virtual" === this.renderMode) {
                var o = Math.floor(this.columnManager.getElement().getBoundingClientRect().height + (this.table.footerManager && this.table.footerManager.active && !this.table.footerManager.external ? this.table.footerManager.getElement().getBoundingClientRect().height : 0));
                this.fixedHeight ? (this.element.style.minHeight = "calc(100% - " + o + "px)",
                    this.element.style.height = "calc(100% - " + o + "px)",
                    this.element.style.maxHeight = "calc(100% - " + o + "px)") : (this.element.style.height = "",
                    this.element.style.height = this.table.element.clientHeight - o + "px",
                    this.element.scrollTop = this.scrollTop),
                    this.height = this.element.clientHeight,
                    this.vDomWindowBuffer = this.table.options.virtualDomBuffer || this.height,
                this.fixedHeight || t == this.element.clientHeight || ((e = this.table.modExists("resizeTable")) && !this.table.modules.resizeTable.autoResize || !e) && this.redraw()
            }
        }
        ,
        s.prototype.reinitialize = function() {
            this.rows.forEach(function(e) {
                e.reinitialize(!0)
            })
        }
        ,
        s.prototype.blockRedraw = function() {
            this.redrawBlock = !0,
                this.redrawBlockRestoreConfig = !1
        }
        ,
        s.prototype.restoreRedraw = function() {
            this.redrawBlock = !1,
                this.redrawBlockRestoreConfig ? (this.refreshActiveData(this.redrawBlockRestoreConfig.stage, this.redrawBlockRestoreConfig.skipStage, this.redrawBlockRestoreConfig.renderInPosition),
                    this.redrawBlockRestoreConfig = !1) : this.redrawBlockRederInPosition && this.reRenderInPosition(),
                this.redrawBlockRederInPosition = !1
        }
        ,
        s.prototype.redraw = function(e) {
            var t = this.scrollLeft;
            this.adjustTableSize(),
                this.table.tableWidth = this.table.element.clientWidth,
                e ? this.renderTable() : ("classic" == this.renderMode ? this.table.options.groupBy ? this.refreshActiveData("group", !1, !1) : this._simpleRender() : (this.reRenderInPosition(),
                    this.scrollHorizontal(t)),
                this.displayRowsCount || this.table.options.placeholder && this.getElement().appendChild(this.table.options.placeholder))
        }
        ,
        s.prototype.resetScroll = function() {
            if (this.element.scrollLeft = 0,
                this.element.scrollTop = 0,
            "ie" === this.table.browser) {
                var e = document.createEvent("Event");
                e.initEvent("scroll", !1, !0),
                    this.element.dispatchEvent(e)
            } else
                this.element.dispatchEvent(new Event("scroll"))
        }
    ;
    var a = function(e) {
        this.table = e,
            this.element = this.table.rowManager.tableElement,
            this.holderEl = this.table.rowManager.element,
            this.leftCol = 0,
            this.rightCol = 0,
            this.scrollLeft = 0,
            this.vDomScrollPosLeft = 0,
            this.vDomScrollPosRight = 0,
            this.vDomPadLeft = 0,
            this.vDomPadRight = 0,
            this.fitDataColAvg = 0,
            this.window = 200,
            this.initialized = !1,
            this.columns = [],
        this.compatabilityCheck() && this.initialize()
    };
    a.prototype.compatabilityCheck = function() {
        var e = this.table.options
            , t = !0;
        return "fitDataTable" == e.layout && (console.warn("Horizontal Vitrual DOM is not compatible with fitDataTable layout mode"),
            t = !1),
        e.responsiveLayout && (console.warn("Horizontal Vitrual DOM is not compatible with responsive columns"),
            t = !1),
        this.table.rtl && (console.warn("Horizontal Vitrual DOM is not currently compatible with RTL text direction"),
            t = !1),
        e.columns && e.columns.find(function(e) {
            return e.frozen
        }) && (console.warn("Horizontal Vitrual DOM is not compatible with frozen columns"),
            t = !1),
        t || (e.virtualDomHoz = !1),
            t
    }
        ,
        a.prototype.initialize = function() {
            var e = this;
            this.holderEl.addEventListener("scroll", function() {
                var t = e.holderEl.scrollLeft;
                e.scrollLeft != t && (e.scrollLeft = t,
                    e.scroll(t - (e.vDomScrollPosLeft + e.window)))
            })
        }
        ,
        a.prototype.deinitialize = function() {
            this.initialized = !1
        }
        ,
        a.prototype.clear = function() {
            this.columns = [],
                this.leftCol = -1,
                this.rightCol = 0,
                this.vDomScrollPosLeft = 0,
                this.vDomScrollPosRight = 0,
                this.vDomPadLeft = 0,
                this.vDomPadRight = 0
        }
        ,
        a.prototype.dataChange = function() {
            var e, t, o, i = !1, n = 0, s = 0;
            if ("fitData" === this.table.options.layout) {
                if (this.table.columnManager.columnsByIndex.forEach(function(e) {
                    !e.definition.width && e.visible && (i = !0)
                }),
                i && i && this.table.rowManager.getDisplayRows().length && (this.vDomScrollPosRight = this.scrollLeft + this.holderEl.clientWidth + this.window,
                    this.table.options.groupBy ? (e = this.table.modules.groupRows.getGroups(!1)[0],
                        t = e.getRows(!1)[0]) : t = this.table.rowManager.getDisplayRows()[0],
                    t)) {
                    o = t.getElement(),
                        t.generateCells(),
                        this.element.appendChild(o);
                    for (var s = 0; s < t.cells.length; s++) {
                        var a = t.cells[s];
                        if (o.appendChild(a.getElement()),
                            a.column.reinitializeWidth(),
                        (n += a.column.getWidth()) > this.vDomScrollPosRight)
                            break
                    }
                    for (o.parentNode.removeChild(o),
                             this.fitDataColAvg = Math.floor(n / (s + 1)),
                             s; s < this.table.columnManager.columnsByIndex.length; s++)
                        this.table.columnManager.columnsByIndex[s].setWidth(this.fitDataColAvg);
                    this.reinitialize(!1, !0)
                }
            } else
                "fitColumns" === this.table.options.layout && (this.table.modules.layout.layout(),
                    this.table.vdomHoz.reinitialize(!1, !0))
        }
        ,
        a.prototype.fitDataLayoutOverride = function() {
            for (var e = this.leftCol; e <= this.rightCol; e++)
                this.columns[e].reinitializeWidth()
        }
        ,
        a.prototype.reinitialize = function(e, t) {
            var o = this
                , i = {
                cols: this.columns,
                leftCol: this.leftCol,
                rightCol: this.rightCol
            };
            if (!e || this.initialized) {
                this.clear(),
                    this.scrollLeft = this.holderEl.scrollLeft,
                    this.vDomScrollPosLeft = this.scrollLeft - this.window,
                    this.vDomScrollPosRight = this.scrollLeft + this.holderEl.clientWidth + this.window;
                var n = 0;
                this.table.columnManager.columnsByIndex.forEach(function(e) {
                    var t = {};
                    if (e.visible) {
                        var i = e.getWidth();
                        t.leftPos = n,
                            t.rightPos = n + i,
                            n + i > o.vDomScrollPosLeft && n < o.vDomScrollPosRight ? (-1 == o.leftCol && (o.leftCol = o.columns.length,
                                o.vDomPadLeft = n),
                                o.rightCol = o.columns.length) : -1 !== o.leftCol && (o.vDomPadRight += i),
                            o.columns.push(e),
                            e.modules.vdomHoz = t,
                            n += i
                    }
                }),
                    this.element.style.paddingLeft = this.vDomPadLeft + "px",
                    this.element.style.paddingRight = this.vDomPadRight + "px",
                    this.initialized = !0,
                t || e && !this.reinitChanged(i) || this.renitializeRows(),
                    this.holderEl.scrollLeft = this.scrollLeft
            }
        }
        ,
        a.prototype.reinitChanged = function(e) {
            var t = this
                , o = !0;
            return e.cols.length !== this.columns.length || e.leftCol !== this.leftCol || e.rightCol !== this.rightCol || (e.cols.forEach(function(e, i) {
                e !== t.columns[i] && (o = !1)
            }),
                !o)
        }
        ,
        a.prototype.renitializeRows = function() {
            var e = this;
            this.table.rowManager.getVisibleRows().forEach(function(t) {
                e.reinitializeRow(t, !0)
            })
        }
        ,
        a.prototype.scroll = function(e) {
            this.vDomScrollPosLeft += e,
                this.vDomScrollPosRight += e,
                e > .8 * this.holderEl.clientWidth ? this.reinitialize() : e > 0 ? (this.addColRight(),
                    this.removeColLeft()) : (this.addColLeft(),
                    this.removeColRight())
        }
        ,
        a.prototype.colPositionAdjust = function(e, t, o) {
            for (var i = e; i < t; i++) {
                var n = this.columns[i];
                n.modules.vdomHoz.leftPos -= o,
                    n.modules.vdomHoz.rightPos -= o
            }
        }
        ,
        a.prototype.addColRight = function() {
            var e, t, o, i = this.columns[this.rightCol + 1];
            i && i.modules.vdomHoz.leftPos <= this.vDomScrollPosRight && (e = this.table.rowManager.getVisibleRows(),
                e.forEach(function(e) {
                    if ("group" !== e.type) {
                        var t = e.getCell(i);
                        e.getElement().appendChild(t.getElement()),
                            t.cellRendered()
                    }
                }),
            this.fitDataColAvg && (t = i.getWidth()) === this.fitDataColAvg && (i.reinitializeWidth(),
            (o = t - i.getWidth()) && (i.modules.vdomHoz.rightPos -= o,
                this.colPositionAdjust(this.rightCol + 1, this.columns.length, o))),
                this.rightCol++,
                this.rightCol >= this.columns.length - 1 ? this.vDomPadRight = 0 : this.vDomPadRight -= i.getWidth(),
                this.element.style.paddingRight = this.vDomPadRight + "px",
                this.addColRight())
        }
        ,
        a.prototype.addColLeft = function() {
            var e = this.columns[this.leftCol - 1];
            if (e && e.modules.vdomHoz.rightPos >= this.vDomScrollPosLeft) {
                this.table.rowManager.getVisibleRows().forEach(function(t) {
                    if ("group" !== t.type) {
                        var o = t.getCell(e);
                        t.getElement().prepend(o.getElement()),
                            o.cellRendered()
                    }
                }),
                    this.leftCol ? this.vDomPadLeft -= e.getWidth() : this.vDomPadLeft = 0,
                    this.element.style.paddingLeft = this.vDomPadLeft + "px",
                    this.leftCol--,
                    this.addColLeft()
            }
        }
        ,
        a.prototype.removeColRight = function(e) {
            var t, e = this.columns[this.rightCol];
            e && e.modules.vdomHoz.leftPos > this.vDomScrollPosRight && (t = this.table.rowManager.getVisibleRows(),
                e.modules.vdomHoz.visible = !1,
                t.forEach(function(t) {
                    if ("group" !== t.type) {
                        var o = t.getCell(e);
                        t.getElement().removeChild(o.getElement())
                    }
                }),
                this.vDomPadRight += e.getWidth(),
                this.element.style.paddingRight = this.vDomPadRight + "px",
                this.rightCol--,
                this.removeColRight())
        }
        ,
        a.prototype.removeColLeft = function() {
            var e, t = this.columns[this.leftCol];
            t && t.modules.vdomHoz.rightPos < this.vDomScrollPosLeft && (e = this.table.rowManager.getVisibleRows(),
                e.forEach(function(e) {
                    if ("group" !== e.type) {
                        var o = e.getCell(t);
                        e.getElement().removeChild(o.getElement())
                    }
                }),
                this.vDomPadLeft += t.getWidth(),
                this.element.style.paddingLeft = this.vDomPadLeft + "px",
                this.leftCol++,
                this.removeColLeft())
        }
        ,
        a.prototype.initializeRow = function(e) {
            if ("group" !== e.type) {
                e.modules.vdomHoz = {
                    leftCol: this.leftCol,
                    rightCol: this.rightCol
                };
                for (var t = this.leftCol; t <= this.rightCol; t++) {
                    var o = this.columns[t];
                    if (o && o.visible) {
                        var i = e.getCell(o);
                        e.getElement().appendChild(i.getElement()),
                            i.cellRendered()
                    }
                }
            }
        }
        ,
        a.prototype.reinitializeRow = function(e, t) {
            if ("group" !== e.type && (t || !e.modules.vdomHoz || e.modules.vdomHoz.leftCol !== this.leftCol || e.modules.vdomHoz.rightCol !== this.rightCol)) {
                for (var o = e.getElement(); o.firstChild; )
                    o.removeChild(o.firstChild);
                this.initializeRow(e)
            }
        }
    ;
    var r = function(e) {
        this._row = e
    };
    r.prototype.getData = function(e) {
        return this._row.getData(e)
    }
        ,
        r.prototype.getElement = function() {
            return this._row.getElement()
        }
        ,
        r.prototype.getCells = function() {
            var e = [];
            return this._row.getCells().forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        r.prototype.getCell = function(e) {
            var t = this._row.getCell(e);
            return !!t && t.getComponent()
        }
        ,
        r.prototype.getIndex = function() {
            return this._row.getData("data")[this._row.table.options.index]
        }
        ,
        r.prototype.getPosition = function(e) {
            return this._row.table.rowManager.getRowPosition(this._row, e)
        }
        ,
        r.prototype.delete = function() {
            return this._row.delete()
        }
        ,
        r.prototype.scrollTo = function() {
            return this._row.table.rowManager.scrollToRow(this._row)
        }
        ,
        r.prototype.pageTo = function() {
            if (this._row.table.modExists("page", !0))
                return this._row.table.modules.page.setPageToRow(this._row)
        }
        ,
        r.prototype.move = function(e, t) {
            this._row.moveToRow(e, t)
        }
        ,
        r.prototype.update = function(e) {
            return this._row.updateData(e)
        }
        ,
        r.prototype.normalizeHeight = function() {
            this._row.normalizeHeight(!0)
        }
        ,
        r.prototype.select = function() {
            this._row.table.modules.selectRow.selectRows(this._row)
        }
        ,
        r.prototype.deselect = function() {
            this._row.table.modules.selectRow.deselectRows(this._row)
        }
        ,
        r.prototype.toggleSelect = function() {
            this._row.table.modules.selectRow.toggleRow(this._row)
        }
        ,
        r.prototype.isSelected = function() {
            return this._row.table.modules.selectRow.isRowSelected(this._row)
        }
        ,
        r.prototype._getSelf = function() {
            return this._row
        }
        ,
        r.prototype.validate = function() {
            return this._row.validate()
        }
        ,
        r.prototype.freeze = function() {
            this._row.table.modExists("frozenRows", !0) && this._row.table.modules.frozenRows.freezeRow(this._row)
        }
        ,
        r.prototype.unfreeze = function() {
            this._row.table.modExists("frozenRows", !0) && this._row.table.modules.frozenRows.unfreezeRow(this._row)
        }
        ,
        r.prototype.isFrozen = function() {
            if (this._row.table.modExists("frozenRows", !0)) {
                return this._row.table.modules.frozenRows.rows.indexOf(this._row) > -1
            }
            return !1
        }
        ,
        r.prototype.treeCollapse = function() {
            this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.collapseRow(this._row)
        }
        ,
        r.prototype.treeExpand = function() {
            this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.expandRow(this._row)
        }
        ,
        r.prototype.treeToggle = function() {
            this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.toggleRow(this._row)
        }
        ,
        r.prototype.getTreeParent = function() {
            return !!this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.getTreeParent(this._row)
        }
        ,
        r.prototype.getTreeChildren = function() {
            return !!this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.getTreeChildren(this._row, !0)
        }
        ,
        r.prototype.addTreeChild = function(e, t, o) {
            return !!this._row.table.modExists("dataTree", !0) && this._row.table.modules.dataTree.addTreeChildRow(this._row, e, t, o)
        }
        ,
        r.prototype.reformat = function() {
            return this._row.reinitialize()
        }
        ,
        r.prototype.getGroup = function() {
            return this._row.getGroup().getComponent()
        }
        ,
        r.prototype.getTable = function() {
            return this._row.table
        }
        ,
        r.prototype.getNextRow = function() {
            var e = this._row.nextRow();
            return e ? e.getComponent() : e
        }
        ,
        r.prototype.getPrevRow = function() {
            var e = this._row.prevRow();
            return e ? e.getComponent() : e
        }
    ;
    var l = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "row";
        this.table = t.table,
            this.parent = t,
            this.data = {},
            this.type = o,
            this.element = !1,
            this.modules = {},
            this.cells = [],
            this.height = 0,
            this.heightStyled = "",
            this.manualHeight = !1,
            this.outerHeight = 0,
            this.initialized = !1,
            this.heightInitialized = !1,
            this.component = null,
            this.created = !1,
            this.setData(e)
    };
    l.prototype.create = function() {
        this.created || (this.created = !0,
            this.generateElement())
    }
        ,
        l.prototype.createElement = function() {
            var e = document.createElement("div");
            e.classList.add("tabulator-row"),
                e.setAttribute("role", "row"),
                this.element = e
        }
        ,
        l.prototype.getElement = function() {
            return this.create(),
                this.element
        }
        ,
        l.prototype.detachElement = function() {
            this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element)
        }
        ,
        l.prototype.generateElement = function() {
            var e, t, o, i = this;
            this.createElement(),
            !1 !== i.table.options.selectable && i.table.modExists("selectRow") && i.table.modules.selectRow.initializeRow(this),
            !1 !== i.table.options.movableRows && i.table.modExists("moveRow") && i.table.modules.moveRow.initializeRow(this),
            !1 !== i.table.options.dataTree && i.table.modExists("dataTree") && i.table.modules.dataTree.initializeRow(this),
            "collapse" === i.table.options.responsiveLayout && i.table.modExists("responsiveLayout") && i.table.modules.responsiveLayout.initializeRow(this),
            (i.table.options.rowContextMenu || i.table.options.rowClickMenu) && this.table.modExists("menu") && i.table.modules.menu.initializeRow(this),
            i.table.options.rowClick && i.element.addEventListener("click", function(e) {
                i.table.options.rowClick(e, i.getComponent())
            }),
            i.table.options.rowDblClick && i.element.addEventListener("dblclick", function(e) {
                i.table.options.rowDblClick(e, i.getComponent())
            }),
            i.table.options.rowContext && i.element.addEventListener("contextmenu", function(e) {
                i.table.options.rowContext(e, i.getComponent())
            }),
            i.table.options.rowMouseEnter && i.element.addEventListener("mouseenter", function(e) {
                i.table.options.rowMouseEnter(e, i.getComponent())
            }),
            i.table.options.rowMouseLeave && i.element.addEventListener("mouseleave", function(e) {
                i.table.options.rowMouseLeave(e, i.getComponent())
            }),
            i.table.options.rowMouseOver && i.element.addEventListener("mouseover", function(e) {
                i.table.options.rowMouseOver(e, i.getComponent())
            }),
            i.table.options.rowMouseOut && i.element.addEventListener("mouseout", function(e) {
                i.table.options.rowMouseOut(e, i.getComponent())
            }),
            i.table.options.rowMouseMove && i.element.addEventListener("mousemove", function(e) {
                i.table.options.rowMouseMove(e, i.getComponent())
            }),
            i.table.options.rowTap && (o = !1,
                i.element.addEventListener("touchstart", function(e) {
                    o = !0
                }, {
                    passive: !0
                }),
                i.element.addEventListener("touchend", function(e) {
                    o && i.table.options.rowTap(e, i.getComponent()),
                        o = !1
                })),
            i.table.options.rowDblTap && (e = null,
                i.element.addEventListener("touchend", function(t) {
                    e ? (clearTimeout(e),
                        e = null,
                        i.table.options.rowDblTap(t, i.getComponent())) : e = setTimeout(function() {
                        clearTimeout(e),
                            e = null
                    }, 300)
                })),
            i.table.options.rowTapHold && (t = null,
                i.element.addEventListener("touchstart", function(e) {
                    clearTimeout(t),
                        t = setTimeout(function() {
                            clearTimeout(t),
                                t = null,
                                o = !1,
                                i.table.options.rowTapHold(e, i.getComponent())
                        }, 1e3)
                }, {
                    passive: !0
                }),
                i.element.addEventListener("touchend", function(e) {
                    clearTimeout(t),
                        t = null
                }))
        }
        ,
        l.prototype.generateCells = function() {
            this.cells = this.table.columnManager.generateCells(this)
        }
        ,
        l.prototype.initialize = function(e) {
            var t = this;
            if (this.create(),
            !this.initialized || e) {
                for (this.deleteCells(); this.element.firstChild; )
                    this.element.removeChild(this.element.firstChild);
                this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layoutRow(this),
                    this.generateCells(),
                    this.table.options.virtualDomHoz && this.table.vdomHoz.initialized ? this.table.vdomHoz.initializeRow(this) : this.cells.forEach(function(e) {
                        t.element.appendChild(e.getElement()),
                            e.cellRendered()
                    }),
                e && this.normalizeHeight(),
                this.table.options.dataTree && this.table.modExists("dataTree") && this.table.modules.dataTree.layoutRow(this),
                "collapse" === this.table.options.responsiveLayout && this.table.modExists("responsiveLayout") && this.table.modules.responsiveLayout.layoutRow(this),
                this.table.options.rowFormatter && this.table.options.rowFormatter(this.getComponent()),
                this.table.options.resizableRows && this.table.modExists("resizeRows") && this.table.modules.resizeRows.initializeRow(this),
                    this.initialized = !0
            } else
                this.table.options.virtualDomHoz && this.table.vdomHoz.reinitializeRow(this)
        }
        ,
        l.prototype.reinitializeHeight = function() {
            this.heightInitialized = !1,
            this.element && null !== this.element.offsetParent && this.normalizeHeight(!0)
        }
        ,
        l.prototype.reinitialize = function(e) {
            this.initialized = !1,
                this.heightInitialized = !1,
            this.manualHeight || (this.height = 0,
                this.heightStyled = ""),
            this.element && null !== this.element.offsetParent && this.initialize(!0),
            this.table.options.dataTree && this.table.modExists("dataTree", !0) && this.table.modules.dataTree.getTreeChildren(this, !1, !0).forEach(function(e) {
                e.reinitialize(!0)
            })
        }
        ,
        l.prototype.calcHeight = function(e) {
            var t = 0
                , o = this.table.options.resizableRows ? this.element.clientHeight : 0;
            this.cells.forEach(function(e) {
                var o = e.getHeight();
                o > t && (t = o)
            }),
                this.height = e ? Math.max(t, o) : this.manualHeight ? this.height : Math.max(t, o),
                this.heightStyled = this.height ? this.height + "px" : "",
                this.outerHeight = this.element.offsetHeight
        }
        ,
        l.prototype.setCellHeight = function() {
            this.cells.forEach(function(e) {
                e.setHeight()
            }),
                this.heightInitialized = !0
        }
        ,
        l.prototype.clearCellHeight = function() {
            this.cells.forEach(function(e) {
                e.clearHeight()
            })
        }
        ,
        l.prototype.normalizeHeight = function(e) {
            e && this.clearCellHeight(),
                this.calcHeight(e),
                this.setCellHeight()
        }
        ,
        l.prototype.setHeight = function(e, t) {
            (this.height != e || t) && (this.manualHeight = !0,
                this.height = e,
                this.heightStyled = e ? e + "px" : "",
                this.setCellHeight(),
                this.outerHeight = this.element.offsetHeight)
        }
        ,
        l.prototype.getHeight = function() {
            return this.outerHeight
        }
        ,
        l.prototype.getWidth = function() {
            return this.element.offsetWidth
        }
        ,
        l.prototype.deleteCell = function(e) {
            var t = this.cells.indexOf(e);
            t > -1 && this.cells.splice(t, 1)
        }
        ,
        l.prototype.setData = function(e) {
            this.table.modExists("mutator") && (e = this.table.modules.mutator.transformRow(e, "data")),
                this.data = e,
            this.table.options.reactiveData && this.table.modExists("reactiveData", !0) && this.table.modules.reactiveData.watchRow(this)
        }
        ,
        l.prototype.updateData = function(e) {
            var t, o = this, i = this.element && h.prototype.helpers.elVisible(this.element), n = {};
            return new Promise(function(s, a) {
                    "string" == typeof e && (e = JSON.parse(e)),
                    o.table.options.reactiveData && o.table.modExists("reactiveData", !0) && o.table.modules.reactiveData.block(),
                        o.table.modExists("mutator") ? (n = Object.assign(n, o.data),
                            n = Object.assign(n, e),
                            t = o.table.modules.mutator.transformRow(n, "data", e)) : t = e;
                    for (var r in t)
                        o.data[r] = t[r];
                    o.table.options.reactiveData && o.table.modExists("reactiveData", !0) && o.table.modules.reactiveData.unblock();
                    for (var r in e) {
                        o.table.columnManager.getColumnsByFieldRoot(r).forEach(function(e) {
                            var n = o.getCell(e.getField());
                            if (n) {
                                var s = e.getFieldValue(t);
                                n.getValue() != s && (n.setValueProcessData(s),
                                i && n.cellRendered())
                            }
                        })
                    }
                    o.table.options.groupUpdateOnCellEdit && o.table.options.groupBy && o.table.modExists("groupRows") && o.table.modules.groupRows.reassignRowToGroup(o.row),
                        i ? (o.normalizeHeight(!0),
                        o.table.options.rowFormatter && o.table.options.rowFormatter(o.getComponent())) : (o.initialized = !1,
                            o.height = 0,
                            o.heightStyled = ""),
                    !1 !== o.table.options.dataTree && o.table.modExists("dataTree") && o.table.modules.dataTree.redrawNeeded(e) && (o.table.modules.dataTree.initializeRow(o),
                    i && (o.table.modules.dataTree.layoutRow(o),
                        o.table.rowManager.refreshActiveData("tree", !1, !0))),
                        o.table.options.rowUpdated.call(o.table, o.getComponent()),
                    o.table.options.dataChanged && o.table.options.dataChanged.call(o.table, o.table.rowManager.getData()),
                        s()
                }
            )
        }
        ,
        l.prototype.getData = function(e) {
            return e && this.table.modExists("accessor") ? this.table.modules.accessor.transformRow(this, e) : this.data
        }
        ,
        l.prototype.getCell = function(e) {
            return e = this.table.columnManager.findColumn(e),
                this.cells.find(function(t) {
                    return t.column === e
                })
        }
        ,
        l.prototype.getCellIndex = function(e) {
            return this.cells.findIndex(function(t) {
                return t === e
            })
        }
        ,
        l.prototype.findNextEditableCell = function(e) {
            var t = !1;
            if (e < this.cells.length - 1)
                for (var o = e + 1; o < this.cells.length; o++) {
                    var i = this.cells[o];
                    if (i.column.modules.edit && h.prototype.helpers.elVisible(i.getElement())) {
                        var n = !0;
                        if ("function" == typeof i.column.modules.edit.check && (n = i.column.modules.edit.check(i.getComponent())),
                            n) {
                            t = i;
                            break
                        }
                    }
                }
            return t
        }
        ,
        l.prototype.findPrevEditableCell = function(e) {
            var t = !1;
            if (e > 0)
                for (var o = e - 1; o >= 0; o--) {
                    var i = this.cells[o]
                        , n = !0;
                    if (i.column.modules.edit && h.prototype.helpers.elVisible(i.getElement()) && ("function" == typeof i.column.modules.edit.check && (n = i.column.modules.edit.check(i.getComponent())),
                        n)) {
                        t = i;
                        break
                    }
                }
            return t
        }
        ,
        l.prototype.getCells = function() {
            return this.cells
        }
        ,
        l.prototype.nextRow = function() {
            return this.table.rowManager.nextDisplayRow(this, !0) || !1
        }
        ,
        l.prototype.prevRow = function() {
            return this.table.rowManager.prevDisplayRow(this, !0) || !1
        }
        ,
        l.prototype.moveToRow = function(e, t) {
            var o = this.table.rowManager.findRow(e);
            o ? (this.table.rowManager.moveRowActual(this, o, !t),
                this.table.rowManager.refreshActiveData("display", !1, !0)) : console.warn("Move Error - No matching row found:", e)
        }
        ,
        l.prototype.validate = function() {
            var e = [];
            return this.cells.forEach(function(t) {
                t.validate() || e.push(t.getComponent())
            }),
            !e.length || e
        }
        ,
        l.prototype.delete = function() {
            var e = this;
            return new Promise(function(t, o) {
                    var i, n;
                    e.table.options.history && e.table.modExists("history") && (e.table.options.groupBy && e.table.modExists("groupRows") ? (n = e.getGroup().rows,
                    (i = n.indexOf(e)) && (i = n[i - 1])) : (i = e.table.rowManager.getRowIndex(e)) && (i = e.table.rowManager.rows[i - 1]),
                        e.table.modules.history.action("rowDelete", e, {
                            data: e.getData(),
                            pos: !i,
                            index: i
                        })),
                        e.deleteActual(),
                        t()
                }
            )
        }
        ,
        l.prototype.deleteActual = function(e) {
            this.table.rowManager.getRowIndex(this);
            this.detatchModules(),
            this.table.options.reactiveData && this.table.modExists("reactiveData", !0),
            this.modules.group && this.modules.group.removeRow(this),
                this.table.rowManager.deleteRow(this, e),
                this.deleteCells(),
                this.initialized = !1,
                this.heightInitialized = !1,
                this.element = !1,
            this.table.options.dataTree && this.table.modExists("dataTree", !0) && this.table.modules.dataTree.rowDelete(this),
            this.table.modExists("columnCalcs") && (this.table.options.groupBy && this.table.modExists("groupRows") ? this.table.modules.columnCalcs.recalcRowGroup(this) : this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows))
        }
        ,
        l.prototype.detatchModules = function() {
            this.table.modExists("selectRow") && this.table.modules.selectRow._deselectRow(this, !0),
            this.table.modExists("edit") && this.table.modules.edit.currentCell.row === this && this.table.modules.edit.cancelEdit(),
            this.table.modExists("frozenRows") && this.table.modules.frozenRows.detachRow(this)
        }
        ,
        l.prototype.deleteCells = function() {
            for (var e = this.cells.length, t = 0; t < e; t++)
                this.cells[0].delete()
        }
        ,
        l.prototype.wipe = function() {
            if (this.detatchModules(),
                this.deleteCells(),
                this.element) {
                for (; this.element.firstChild; )
                    this.element.removeChild(this.element.firstChild);
                this.element.parentNode && this.element.parentNode.removeChild(this.element)
            }
            this.element = !1,
                this.modules = {}
        }
        ,
        l.prototype.getGroup = function() {
            return this.modules.group || !1
        }
        ,
        l.prototype.getComponent = function() {
            return this.component || (this.component = new r(this)),
                this.component
        }
    ;
    var c = function(e) {
        this._cell = e
    };
    c.prototype.getValue = function() {
        return this._cell.getValue()
    }
        ,
        c.prototype.getOldValue = function() {
            return this._cell.getOldValue()
        }
        ,
        c.prototype.getInitialValue = function() {
            return this._cell.initialValue
        }
        ,
        c.prototype.getElement = function() {
            return this._cell.getElement()
        }
        ,
        c.prototype.getRow = function() {
            return this._cell.row.getComponent()
        }
        ,
        c.prototype.getData = function() {
            return this._cell.row.getData()
        }
        ,
        c.prototype.getField = function() {
            return this._cell.column.getField()
        }
        ,
        c.prototype.getColumn = function() {
            return this._cell.column.getComponent()
        }
        ,
        c.prototype.setValue = function(e, t) {
            void 0 === t && (t = !0),
                this._cell.setValue(e, t)
        }
        ,
        c.prototype.restoreOldValue = function() {
            this._cell.setValueActual(this._cell.getOldValue())
        }
        ,
        c.prototype.restoreInitialValue = function() {
            this._cell.setValueActual(this._cell.initialValue)
        }
        ,
        c.prototype.edit = function(e) {
            return this._cell.edit(e)
        }
        ,
        c.prototype.cancelEdit = function() {
            this._cell.cancelEdit()
        }
        ,
        c.prototype.isEdited = function() {
            return !!this._cell.modules.edit && this._cell.modules.edit.edited
        }
        ,
        c.prototype.clearEdited = function() {
            self.table.modExists("edit", !0) && this._cell.table.modules.edit.clearEdited(this._cell)
        }
        ,
        c.prototype.isValid = function() {
            return !this._cell.modules.validate || !this._cell.modules.validate.invalid
        }
        ,
        c.prototype.validate = function() {
            return this._cell.validate()
        }
        ,
        c.prototype.clearValidation = function() {
            this._cell.table.modExists("validate", !0) && this._cell.table.modules.validate.clearValidation(this._cell)
        }
        ,
        c.prototype.nav = function() {
            return this._cell.nav()
        }
        ,
        c.prototype.checkHeight = function() {
            this._cell.checkHeight()
        }
        ,
        c.prototype.getTable = function() {
            return this._cell.table
        }
        ,
        c.prototype._getSelf = function() {
            return this._cell
        }
    ;
    var u = function(e, t) {
        this.table = e.table,
            this.column = e,
            this.row = t,
            this.element = null,
            this.value = null,
            this.initialValue,
            this.oldValue = null,
            this.modules = {},
            this.height = null,
            this.width = null,
            this.minWidth = null,
            this.component = null,
            this.loaded = !1,
            this.build()
    };
    u.prototype.build = function() {
        this.generateElement(),
            this.setWidth(),
            this._configureCell(),
            this.setValueActual(this.column.getFieldValue(this.row.data)),
            this.initialValue = this.value
    }
        ,
        u.prototype.generateElement = function() {
            this.element = document.createElement("div"),
                this.element.className = "tabulator-cell",
                this.element.setAttribute("role", "gridcell"),
                this.element = this.element
        }
        ,
        u.prototype._configureCell = function() {
            var e = this
                , t = e.column.cellEvents
                , o = e.element
                , i = this.column.getField()
                , n = {
                top: "flex-start",
                bottom: "flex-end",
                middle: "center"
            }
                , s = {
                left: "flex-start",
                right: "flex-end",
                center: "center"
            };
            if (o.style.textAlign = e.column.hozAlign,
            e.column.vertAlign && (o.style.display = "inline-flex",
                o.style.alignItems = n[e.column.vertAlign] || "",
            e.column.hozAlign && (o.style.justifyContent = s[e.column.hozAlign] || "")),
            i && o.setAttribute("tabulator-field", i),
                e.column.definition.cssClass) {
                e.column.definition.cssClass.split(" ").forEach(function(e) {
                    o.classList.add(e)
                })
            }
            "hover" === this.table.options.tooltipGenerationMode && o.addEventListener("mouseenter", function(t) {
                e._generateTooltip()
            }),
                e._bindClickEvents(t),
                e._bindTouchEvents(t),
                e._bindMouseEvents(t),
            e.column.modules.edit && e.table.modules.edit.bindEditor(e),
            e.column.definition.rowHandle && !1 !== e.table.options.movableRows && e.table.modExists("moveRow") && e.table.modules.moveRow.initializeCell(e),
            e.column.visible || e.hide()
        }
        ,
        u.prototype._bindClickEvents = function(e) {
            var t = this
                , o = t.element;
            (e.cellClick || t.table.options.cellClick) && o.addEventListener("click", function(o) {
                var i = t.getComponent();
                e.cellClick && e.cellClick.call(t.table, o, i),
                t.table.options.cellClick && t.table.options.cellClick.call(t.table, o, i)
            }),
                e.cellDblClick || this.table.options.cellDblClick ? o.addEventListener("dblclick", function(o) {
                    var i = t.getComponent();
                    e.cellDblClick && e.cellDblClick.call(t.table, o, i),
                    t.table.options.cellDblClick && t.table.options.cellDblClick.call(t.table, o, i)
                }) : o.addEventListener("dblclick", function(e) {
                    if (!t.table.modExists("edit") || t.table.modules.edit.currentCell !== t) {
                        e.preventDefault();
                        try {
                            if (document.selection) {
                                var o = document.body.createTextRange();
                                o.moveToElementText(t.element),
                                    o.select()
                            } else if (window.getSelection) {
                                var o = document.createRange();
                                o.selectNode(t.element),
                                    window.getSelection().removeAllRanges(),
                                    window.getSelection().addRange(o)
                            }
                        } catch (e) {}
                    }
                }),
            (e.cellContext || this.table.options.cellContext) && o.addEventListener("contextmenu", function(o) {
                var i = t.getComponent();
                e.cellContext && e.cellContext.call(t.table, o, i),
                t.table.options.cellContext && t.table.options.cellContext.call(t.table, o, i)
            })
        }
        ,
        u.prototype._bindMouseEvents = function(e) {
            var t = this
                , o = t.element;
            (e.cellMouseEnter || t.table.options.cellMouseEnter) && o.addEventListener("mouseenter", function(o) {
                var i = t.getComponent();
                e.cellMouseEnter && e.cellMouseEnter.call(t.table, o, i),
                t.table.options.cellMouseEnter && t.table.options.cellMouseEnter.call(t.table, o, i)
            }),
            (e.cellMouseLeave || t.table.options.cellMouseLeave) && o.addEventListener("mouseleave", function(o) {
                var i = t.getComponent();
                e.cellMouseLeave && e.cellMouseLeave.call(t.table, o, i),
                t.table.options.cellMouseLeave && t.table.options.cellMouseLeave.call(t.table, o, i)
            }),
            (e.cellMouseOver || t.table.options.cellMouseOver) && o.addEventListener("mouseover", function(o) {
                var i = t.getComponent();
                e.cellMouseOver && e.cellMouseOver.call(t.table, o, i),
                t.table.options.cellMouseOver && t.table.options.cellMouseOver.call(t.table, o, i)
            }),
            (e.cellMouseOut || t.table.options.cellMouseOut) && o.addEventListener("mouseout", function(o) {
                var i = t.getComponent();
                e.cellMouseOut && e.cellMouseOut.call(t.table, o, i),
                t.table.options.cellMouseOut && t.table.options.cellMouseOut.call(t.table, o, i)
            }),
            (e.cellMouseMove || t.table.options.cellMouseMove) && o.addEventListener("mousemove", function(o) {
                var i = t.getComponent();
                e.cellMouseMove && e.cellMouseMove.call(t.table, o, i),
                t.table.options.cellMouseMove && t.table.options.cellMouseMove.call(t.table, o, i)
            })
        }
        ,
        u.prototype._bindTouchEvents = function(e) {
            var t, o, i, n = this, s = n.element;
            (e.cellTap || this.table.options.cellTap) && (i = !1,
                s.addEventListener("touchstart", function(e) {
                    i = !0
                }, {
                    passive: !0
                }),
                s.addEventListener("touchend", function(t) {
                    if (i) {
                        var o = n.getComponent();
                        e.cellTap && e.cellTap.call(n.table, t, o),
                        n.table.options.cellTap && n.table.options.cellTap.call(n.table, t, o)
                    }
                    i = !1
                })),
            (e.cellDblTap || this.table.options.cellDblTap) && (t = null,
                s.addEventListener("touchend", function(o) {
                    if (t) {
                        clearTimeout(t),
                            t = null;
                        var i = n.getComponent();
                        e.cellDblTap && e.cellDblTap.call(n.table, o, i),
                        n.table.options.cellDblTap && n.table.options.cellDblTap.call(n.table, o, i)
                    } else
                        t = setTimeout(function() {
                            clearTimeout(t),
                                t = null
                        }, 300)
                })),
            (e.cellTapHold || this.table.options.cellTapHold) && (o = null,
                s.addEventListener("touchstart", function(t) {
                    clearTimeout(o),
                        o = setTimeout(function() {
                            clearTimeout(o),
                                o = null,
                                i = !1;
                            var s = n.getComponent();
                            e.cellTapHold && e.cellTapHold.call(n.table, t, s),
                            n.table.options.cellTapHold && n.table.options.cellTapHold.call(n.table, t, s)
                        }, 1e3)
                }, {
                    passive: !0
                }),
                s.addEventListener("touchend", function(e) {
                    clearTimeout(o),
                        o = null
                }))
        }
        ,
        u.prototype._generateContents = function() {
            var e;
            switch (e = this.table.modExists("format") ? this.table.modules.format.formatValue(this) : this.element.innerHTML = this.value,
                void 0 === e ? "undefined" : _typeof(e)) {
                case "object":
                    if (e instanceof Node) {
                        for (; this.element.firstChild; )
                            this.element.removeChild(this.element.firstChild);
                        this.element.appendChild(e)
                    } else
                        this.element.innerHTML = "",
                        null != e && console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", e);
                    break;
                case "undefined":
                case "null":
                    this.element.innerHTML = "";
                    break;
                default:
                    this.element.innerHTML = e
            }
        }
        ,
        u.prototype.cellRendered = function() {
            this.table.modExists("format") && this.table.modules.format.cellRendered && this.table.modules.format.cellRendered(this)
        }
        ,
        u.prototype._generateTooltip = function() {
            var e = this.column.tooltip;
            e ? (!0 === e ? e = this.value : "function" == typeof e && !1 === (e = e(this.getComponent())) && (e = ""),
            void 0 === e && (e = ""),
                this.element.setAttribute("title", e)) : this.element.setAttribute("title", "")
        }
        ,
        u.prototype.getElement = function(e) {
            return this.loaded || (this.loaded = !0,
            e || this.layoutElement()),
                this.element
        }
        ,
        u.prototype.getValue = function() {
            return this.value
        }
        ,
        u.prototype.getOldValue = function() {
            return this.oldValue
        }
        ,
        u.prototype.setValue = function(e, t) {
            var o, i = this.setValueProcessData(e, t);
            i && (this.table.options.history && this.table.modExists("history") && this.table.modules.history.action("cellEdit", this, {
                oldValue: this.oldValue,
                newValue: this.value
            }),
                o = this.getComponent(),
            this.column.cellEvents.cellEdited && this.column.cellEvents.cellEdited.call(this.table, o),
            this.table.options.groupUpdateOnCellEdit && this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.reassignRowToGroup(this.row),
                this.cellRendered(),
                this.table.options.cellEdited.call(this.table, o),
            this.table.options.dataChanged && this.table.options.dataChanged.call(this.table, this.table.rowManager.getData()))
        }
        ,
        u.prototype.setValueProcessData = function(e, t) {
            var o = !1;
            return this.value != e && (o = !0,
            t && this.column.modules.mutate && (e = this.table.modules.mutator.transformCell(this, e))),
                this.setValueActual(e),
            o && this.table.modExists("columnCalcs") && (this.column.definition.topCalc || this.column.definition.bottomCalc) && (this.table.options.groupBy && this.table.modExists("groupRows") ? ("table" != this.table.options.columnCalcs && "both" != this.table.options.columnCalcs || this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),
            "table" != this.table.options.columnCalcs && this.table.modules.columnCalcs.recalcRowGroup(this.row)) : this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows)),
                o
        }
        ,
        u.prototype.setValueActual = function(e) {
            this.oldValue = this.value,
                this.value = e,
            this.table.options.reactiveData && this.table.modExists("reactiveData") && this.table.modules.reactiveData.block(),
                this.column.setFieldValue(this.row.data, e),
            this.table.options.reactiveData && this.table.modExists("reactiveData") && this.table.modules.reactiveData.unblock(),
            this.loaded && this.layoutElement()
        }
        ,
        u.prototype.layoutElement = function() {
            this._generateContents(),
                this._generateTooltip(),
            this.table.options.resizableColumns && this.table.modExists("resizeColumns") && "row" === this.row.type && this.table.modules.resizeColumns.initializeColumn("cell", this.column, this.element),
            (this.column.definition.contextMenu || this.column.definition.clickMenu) && this.table.modExists("menu") && this.table.modules.menu.initializeCell(this),
            this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layoutElement(this.element, this.column)
        }
        ,
        u.prototype.setWidth = function() {
            this.width = this.column.width,
                this.element.style.width = this.column.widthStyled
        }
        ,
        u.prototype.clearWidth = function() {
            this.width = "",
                this.element.style.width = ""
        }
        ,
        u.prototype.getWidth = function() {
            return this.width || this.element.offsetWidth
        }
        ,
        u.prototype.setMinWidth = function() {
            this.minWidth = this.column.minWidth,
                this.element.style.minWidth = this.column.minWidthStyled
        }
        ,
        u.prototype.setMaxWidth = function() {
            this.maxWidth = this.column.maxWidth,
                this.element.style.maxWidth = this.column.maxWidthStyled
        }
        ,
        u.prototype.checkHeight = function() {
            this.row.reinitializeHeight()
        }
        ,
        u.prototype.clearHeight = function() {
            this.element.style.height = "",
                this.height = null
        }
        ,
        u.prototype.setHeight = function() {
            this.height = this.row.height,
                this.element.style.height = this.row.heightStyled
        }
        ,
        u.prototype.getHeight = function() {
            return this.height || this.element.offsetHeight
        }
        ,
        u.prototype.show = function() {
            this.element.style.display = this.column.vertAlign ? "inline-flex" : ""
        }
        ,
        u.prototype.hide = function() {
            this.element.style.display = "none"
        }
        ,
        u.prototype.edit = function(e) {
            if (this.table.modExists("edit", !0))
                return this.table.modules.edit.editCell(this, e)
        }
        ,
        u.prototype.cancelEdit = function() {
            if (this.table.modExists("edit", !0)) {
                var e = this.table.modules.edit.getCurrentCell();
                e && e._getSelf() === this ? this.table.modules.edit.cancelEdit() : console.warn("Cancel Editor Error - This cell is not currently being edited ")
            }
        }
        ,
        u.prototype.validate = function() {
            if (this.column.modules.validate && this.table.modExists("validate", !0)) {
                return !0 === this.table.modules.validate.validate(this.column.modules.validate, this, this.getValue())
            }
            return !0
        }
        ,
        u.prototype.delete = function() {
            !this.table.rowManager.redrawBlock && this.element.parentNode && this.element.parentNode.removeChild(this.element),
            this.modules.validate && this.modules.validate.invalid && this.table.modules.validate.clearValidation(this),
            this.modules.edit && this.modules.edit.edited && this.table.modules.edit.clearEdited(this),
            this.table.options.history && this.table.modules.history.clearComponentHistory(this),
                this.element = !1,
                this.column.deleteCell(this),
                this.row.deleteCell(this),
                this.calcs = {}
        }
        ,
        u.prototype.nav = function() {
            var e = this
                , t = !1
                , o = this.row.getCellIndex(this);
            return {
                next: function() {
                    var t, o = this.right();
                    return !!o || !(!(t = e.table.rowManager.nextDisplayRow(e.row, !0)) || !(o = t.findNextEditableCell(-1))) && (o.edit(),
                        !0)
                },
                prev: function() {
                    var t, o = this.left();
                    return !!o || !(!(t = e.table.rowManager.prevDisplayRow(e.row, !0)) || !(o = t.findPrevEditableCell(t.cells.length))) && (o.edit(),
                        !0)
                },
                left: function() {
                    return !!(t = e.row.findPrevEditableCell(o)) && (t.edit(),
                        !0)
                },
                right: function() {
                    return !!(t = e.row.findNextEditableCell(o)) && (t.edit(),
                        !0)
                },
                up: function() {
                    var t = e.table.rowManager.prevDisplayRow(e.row, !0);
                    t && t.cells[o].edit()
                },
                down: function() {
                    var t = e.table.rowManager.nextDisplayRow(e.row, !0);
                    t && t.cells[o].edit()
                }
            }
        }
        ,
        u.prototype.getIndex = function() {
            this.row.getCellIndex(this)
        }
        ,
        u.prototype.getComponent = function() {
            return this.component || (this.component = new c(this)),
                this.component
        }
    ;
    var d = function(e) {
        this.table = e,
            this.active = !1,
            this.element = this.createElement(),
            this.external = !1,
            this.links = [],
            this._initialize()
    };
    d.prototype.createElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-footer"),
            e
    }
        ,
        d.prototype._initialize = function(e) {
            if (this.table.options.footerElement)
                switch (_typeof(this.table.options.footerElement)) {
                    case "string":
                        "<" === this.table.options.footerElement[0] ? this.element.innerHTML = this.table.options.footerElement : (this.external = !0,
                            this.element = document.querySelector(this.table.options.footerElement));
                        break;
                    default:
                        this.element = this.table.options.footerElement
                }
        }
        ,
        d.prototype.getElement = function() {
            return this.element
        }
        ,
        d.prototype.append = function(e, t) {
            this.activate(t),
                this.element.appendChild(e),
                this.table.rowManager.adjustTableSize()
        }
        ,
        d.prototype.prepend = function(e, t) {
            this.activate(t),
                this.element.insertBefore(e, this.element.firstChild),
                this.table.rowManager.adjustTableSize()
        }
        ,
        d.prototype.remove = function(e) {
            e.parentNode.removeChild(e),
                this.deactivate()
        }
        ,
        d.prototype.deactivate = function(e) {
            this.element.firstChild && !e || (this.external || this.element.parentNode.removeChild(this.element),
                this.active = !1)
        }
        ,
        d.prototype.activate = function(e) {
            this.active || (this.active = !0,
            this.external || (this.table.element.appendChild(this.getElement()),
                this.table.element.style.display = "")),
            e && this.links.push(e)
        }
        ,
        d.prototype.redraw = function() {
            this.links.forEach(function(e) {
                e.footerRedraw()
            })
        }
    ;
    var h = function e(t, o) {
        this.options = {},
            this.columnManager = null,
            this.rowManager = null,
            this.footerManager = null,
            this.vdomHoz = null,
            this.browser = "",
            this.browserSlow = !1,
            this.browserMobile = !1,
            this.rtl = !1,
            this.modules = {},
        this.initializeElement(t) && (this.initializeOptions(o || {}),
            this._create()),
            e.prototype.comms.register(this)
    };
    h.prototype.defaultOptions = {
        height: !1,
        minHeight: !1,
        maxHeight: !1,
        layout: "fitData",
        layoutColumnsOnNewData: !1,
        columnMinWidth: 40,
        columnMaxWidth: !1,
        columnHeaderVertAlign: "top",
        columnVertAlign: !1,
        resizableColumns: !0,
        resizableRows: !1,
        autoResize: !0,
        columns: [],
        cellHozAlign: "",
        cellVertAlign: "",
        headerHozAlign: "",
        data: [],
        autoColumns: !1,
        autoColumnsDefinitions: !1,
        reactiveData: !1,
        nestedFieldSeparator: ".",
        tooltips: !1,
        tooltipsHeader: !1,
        tooltipGenerationMode: "load",
        initialSort: !1,
        initialFilter: !1,
        initialHeaderFilter: !1,
        columnHeaderSortMulti: !0,
        sortOrderReverse: !1,
        headerSort: !0,
        headerSortTristate: !1,
        headerSortElement: "<div class='tabulator-arrow'></div>",
        footerElement: !1,
        index: "id",
        textDirection: "auto",
        keybindings: [],
        tabEndNewRow: !1,
        invalidOptionWarnings: !0,
        clipboard: !1,
        clipboardCopyStyled: !0,
        clipboardCopyConfig: !1,
        clipboardCopyFormatter: !1,
        clipboardCopyRowRange: "active",
        clipboardPasteParser: "table",
        clipboardPasteAction: "insert",
        clipboardCopied: function() {},
        clipboardPasted: function() {},
        clipboardPasteError: function() {},
        downloadDataFormatter: !1,
        downloadReady: function(e, t) {
            return t
        },
        downloadComplete: !1,
        downloadConfig: {},
        downloadRowRange: "active",
        dataTree: !1,
        dataTreeFilter: !0,
        dataTreeSort: !0,
        dataTreeElementColumn: !1,
        dataTreeBranchElement: !0,
        dataTreeChildIndent: 9,
        dataTreeChildField: "_children",
        dataTreeCollapseElement: !1,
        dataTreeExpandElement: !1,
        dataTreeStartExpanded: !1,
        dataTreeRowExpanded: function() {},
        dataTreeRowCollapsed: function() {},
        dataTreeChildColumnCalcs: !1,
        dataTreeSelectPropagate: !1,
        printAsHtml: !1,
        printFormatter: !1,
        printHeader: !1,
        printFooter: !1,
        printCopyStyle: !0,
        printStyled: !0,
        printVisibleRows: !0,
        printRowRange: "visible",
        printConfig: {},
        addRowPos: "bottom",
        selectable: "highlight",
        selectableRangeMode: "drag",
        selectableRollingSelection: !0,
        selectablePersistence: !0,
        selectableCheck: function(e, t) {
            return !0
        },
        headerFilterLiveFilterDelay: 300,
        headerFilterPlaceholder: !1,
        headerVisible: !0,
        history: !1,
        locale: !1,
        langs: {},
        virtualDom: !0,
        virtualDomBuffer: 0,
        virtualDomHoz: !1,
        persistentLayout: !1,
        persistentSort: !1,
        persistentFilter: !1,
        persistenceID: "",
        persistenceMode: !0,
        persistenceReaderFunc: !1,
        persistenceWriterFunc: !1,
        persistence: !1,
        responsiveLayout: !1,
        responsiveLayoutCollapseStartOpen: !0,
        responsiveLayoutCollapseUseFormatters: !0,
        responsiveLayoutCollapseFormatter: !1,
        pagination: !1,
        paginationSize: !1,
        paginationInitialPage: 1,
        paginationButtonCount: 5,
        paginationSizeSelector: !1,
        paginationElement: !1,
        paginationDataSent: {},
        paginationDataReceived: {},
        paginationAddRow: "page",
        ajaxURL: !1,
        ajaxURLGenerator: !1,
        ajaxParams: {},
        ajaxConfig: "get",
        ajaxContentType: "form",
        ajaxRequestFunc: !1,
        ajaxLoader: !0,
        ajaxLoaderLoading: !1,
        ajaxLoaderError: !1,
        ajaxFiltering: !1,
        ajaxSorting: !1,
        ajaxProgressiveLoad: !1,
        ajaxProgressiveLoadDelay: 0,
        ajaxProgressiveLoadScrollMargin: 0,
        groupBy: !1,
        groupStartOpen: !0,
        groupValues: !1,
        groupUpdateOnCellEdit: !1,
        groupHeader: !1,
        groupHeaderPrint: null,
        groupHeaderClipboard: null,
        groupHeaderHtmlOutput: null,
        groupHeaderDownload: null,
        htmlOutputConfig: !1,
        movableColumns: !1,
        movableRows: !1,
        movableRowsConnectedTables: !1,
        movableRowsConnectedElements: !1,
        movableRowsSender: !1,
        movableRowsReceiver: "insert",
        movableRowsSendingStart: function() {},
        movableRowsSent: function() {},
        movableRowsSentFailed: function() {},
        movableRowsSendingStop: function() {},
        movableRowsReceivingStart: function() {},
        movableRowsReceived: function() {},
        movableRowsReceivedFailed: function() {},
        movableRowsReceivingStop: function() {},
        movableRowsElementDrop: function() {},
        scrollToRowPosition: "top",
        scrollToRowIfVisible: !0,
        scrollToColumnPosition: "left",
        scrollToColumnIfVisible: !0,
        rowFormatter: !1,
        rowFormatterPrint: null,
        rowFormatterClipboard: null,
        rowFormatterHtmlOutput: null,
        placeholder: !1,
        tableBuilding: function() {},
        tableBuilt: function() {},
        renderStarted: function() {},
        renderComplete: function() {},
        rowClick: !1,
        rowDblClick: !1,
        rowContext: !1,
        rowTap: !1,
        rowDblTap: !1,
        rowTapHold: !1,
        rowMouseEnter: !1,
        rowMouseLeave: !1,
        rowMouseOver: !1,
        rowMouseOut: !1,
        rowMouseMove: !1,
        rowContextMenu: !1,
        rowClickMenu: !1,
        rowAdded: function() {},
        rowDeleted: function() {},
        rowMoved: function() {},
        rowUpdated: function() {},
        rowSelectionChanged: function() {},
        rowSelected: function() {},
        rowDeselected: function() {},
        rowResized: function() {},
        cellClick: !1,
        cellDblClick: !1,
        cellContext: !1,
        cellTap: !1,
        cellDblTap: !1,
        cellTapHold: !1,
        cellMouseEnter: !1,
        cellMouseLeave: !1,
        cellMouseOver: !1,
        cellMouseOut: !1,
        cellMouseMove: !1,
        cellEditing: function() {},
        cellEdited: function() {},
        cellEditCancelled: function() {},
        columnMoved: !1,
        columnResized: function() {},
        columnTitleChanged: function() {},
        columnVisibilityChanged: function() {},
        htmlImporting: function() {},
        htmlImported: function() {},
        dataLoading: function() {},
        dataLoaded: function() {},
        dataEdited: !1,
        dataChanged: !1,
        ajaxRequesting: function() {},
        ajaxResponse: !1,
        ajaxError: function() {},
        dataFiltering: !1,
        dataFiltered: !1,
        dataSorting: function() {},
        dataSorted: function() {},
        groupToggleElement: "arrow",
        groupClosedShowCalcs: !1,
        dataGrouping: function() {},
        dataGrouped: !1,
        groupVisibilityChanged: function() {},
        groupClick: !1,
        groupDblClick: !1,
        groupContext: !1,
        groupContextMenu: !1,
        groupClickMenu: !1,
        groupTap: !1,
        groupDblTap: !1,
        groupTapHold: !1,
        columnCalcs: !0,
        pageLoaded: function() {},
        localized: function() {},
        validationMode: "blocking",
        validationFailed: function() {},
        historyUndo: function() {},
        historyRedo: function() {},
        scrollHorizontal: function() {},
        scrollVertical: function() {}
    },
        h.prototype.initializeOptions = function(e) {
            if (!1 !== e.invalidOptionWarnings)
                for (var t in e)
                    void 0 === this.defaultOptions[t] && console.warn("Invalid table constructor option:", t);
            for (var t in this.defaultOptions)
                t in e ? this.options[t] = e[t] : Array.isArray(this.defaultOptions[t]) ? this.options[t] = Object.assign([], this.defaultOptions[t]) : "object" === _typeof(this.defaultOptions[t]) && null !== this.defaultOptions[t] ? this.options[t] = Object.assign({}, this.defaultOptions[t]) : this.options[t] = this.defaultOptions[t]
        }
        ,
        h.prototype.initializeElement = function(e) {
            return "undefined" != typeof HTMLElement && e instanceof HTMLElement ? (this.element = e,
                !0) : "string" == typeof e ? (this.element = document.querySelector(e),
            !!this.element || (console.error("Tabulator Creation Error - no element found matching selector: ", e),
                !1)) : (console.error("Tabulator Creation Error - Invalid element provided:", e),
                !1)
        }
        ,
        h.prototype.rtlCheck = function() {
            var e = window.getComputedStyle(this.element);
            switch (this.options.textDirection) {
                case "auto":
                    if ("rtl" !== e.direction)
                        break;
                case "rtl":
                    this.element.classList.add("tabulator-rtl"),
                        this.rtl = !0;
                    break;
                case "ltr":
                    this.element.classList.add("tabulator-ltr");
                default:
                    this.rtl = !1
            }
        }
        ,
        h.prototype._mapDepricatedFunctionality = function() {
            (this.options.persistentLayout || this.options.persistentSort || this.options.persistentFilter) && (this.options.persistence || (this.options.persistence = {})),
            this.options.dataEdited && (console.warn("DEPRECATION WARNING - dataEdited option has been deprecated, please use the dataChanged option instead"),
                this.options.dataChanged = this.options.dataEdited),
            this.options.downloadDataFormatter && console.warn("DEPRECATION WARNING - downloadDataFormatter option has been deprecated"),
            void 0 !== this.options.clipboardCopyHeader && (this.options.columnHeaders = this.options.clipboardCopyHeader,
                console.warn("DEPRECATION WARNING - clipboardCopyHeader option has been deprecated, please use the columnHeaders property on the clipboardCopyConfig option")),
            !0 !== this.options.printVisibleRows && (console.warn("printVisibleRows option is deprecated, you should now use the printRowRange option"),
                this.options.persistence.printRowRange = "active"),
            !0 !== this.options.printCopyStyle && (console.warn("printCopyStyle option is deprecated, you should now use the printStyled option"),
                this.options.persistence.printStyled = this.options.printCopyStyle),
            this.options.persistentLayout && (console.warn("persistentLayout option is deprecated, you should now use the persistence option"),
            !0 !== this.options.persistence && void 0 === this.options.persistence.columns && (this.options.persistence.columns = !0)),
            this.options.persistentSort && (console.warn("persistentSort option is deprecated, you should now use the persistence option"),
            !0 !== this.options.persistence && void 0 === this.options.persistence.sort && (this.options.persistence.sort = !0)),
            this.options.persistentFilter && (console.warn("persistentFilter option is deprecated, you should now use the persistence option"),
            !0 !== this.options.persistence && void 0 === this.options.persistence.filter && (this.options.persistence.filter = !0)),
            this.options.columnVertAlign && (console.warn("columnVertAlign option is deprecated, you should now use the columnHeaderVertAlign option"),
                this.options.columnHeaderVertAlign = this.options.columnVertAlign)
        }
        ,
        h.prototype._clearSelection = function() {
            this.element.classList.add("tabulator-block-select"),
                window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty(),
                this.element.classList.remove("tabulator-block-select")
        }
        ,
        h.prototype._create = function() {
            this._clearObjectPointers(),
                this._mapDepricatedFunctionality(),
                this.bindModules(),
                this.rtlCheck(),
            "TABLE" === this.element.tagName && this.modExists("htmlTableImport", !0) && this.modules.htmlTableImport.parseTable(),
                this.columnManager = new t(this),
                this.rowManager = new s(this),
                this.footerManager = new d(this),
                this.columnManager.setRowManager(this.rowManager),
                this.rowManager.setColumnManager(this.columnManager),
            this.options.virtualDomHoz && (this.vdomHoz = new a(this)),
                this._buildElement(),
                this._loadInitialData()
        }
        ,
        h.prototype._clearObjectPointers = function() {
            this.options.columns = this.options.columns.slice(0),
            this.options.reactiveData || (this.options.data = this.options.data.slice(0))
        }
        ,
        h.prototype._buildElement = function() {
            var e = this
                , t = this.element
                , o = this.modules
                , i = this.options;
            for (i.tableBuilding.call(this),
                     t.classList.add("tabulator"),
                     t.setAttribute("role", "grid"); t.firstChild; )
                t.removeChild(t.firstChild);
            i.height && (i.height = isNaN(i.height) ? i.height : i.height + "px",
                t.style.height = i.height),
            !1 !== i.minHeight && (i.minHeight = isNaN(i.minHeight) ? i.minHeight : i.minHeight + "px",
                t.style.minHeight = i.minHeight),
            !1 !== i.maxHeight && (i.maxHeight = isNaN(i.maxHeight) ? i.maxHeight : i.maxHeight + "px",
                t.style.maxHeight = i.maxHeight),
                this.columnManager.initialize(),
                this.rowManager.initialize(),
                this._detectBrowser(),
            this.modExists("layout", !0) && o.layout.initialize(i.layout),
                o.localize.initialize(),
            !1 !== i.headerFilterPlaceholder && o.localize.setHeaderFilterPlaceholder(i.headerFilterPlaceholder);
            for (var n in i.langs)
                o.localize.installLang(n, i.langs[n]);
            if (o.localize.setLocale(i.locale),
            "string" == typeof i.placeholder) {
                var s = document.createElement("div");
                s.classList.add("tabulator-placeholder");
                var a = document.createElement("span");
                a.innerHTML = i.placeholder,
                    s.appendChild(a),
                    i.placeholder = s
            }
            if (t.appendChild(this.columnManager.getElement()),
                t.appendChild(this.rowManager.getElement()),
            i.footerElement && this.footerManager.activate(),
            i.persistence && this.modExists("persistence", !0) && o.persistence.initialize(),
            i.movableRows && this.modExists("moveRow") && o.moveRow.initialize(),
            i.autoColumns && this.options.data && this.columnManager.generateColumnsFromRowData(this.options.data),
            this.modExists("columnCalcs") && o.columnCalcs.initialize(),
                this.columnManager.setColumns(i.columns),
            i.dataTree && this.modExists("dataTree", !0) && o.dataTree.initialize(),
            this.modExists("frozenRows") && this.modules.frozenRows.initialize(),
            (i.persistence && this.modExists("persistence", !0) && o.persistence.config.sort || i.initialSort) && this.modExists("sort", !0)) {
                var r = [];
                i.persistence && this.modExists("persistence", !0) && o.persistence.config.sort ? !1 === (r = o.persistence.load("sort")) && i.initialSort && (r = i.initialSort) : i.initialSort && (r = i.initialSort),
                    o.sort.setSort(r)
            }
            if ((i.persistence && this.modExists("persistence", !0) && o.persistence.config.filter || i.initialFilter) && this.modExists("filter", !0)) {
                var l = [];
                i.persistence && this.modExists("persistence", !0) && o.persistence.config.filter ? !1 === (l = o.persistence.load("filter")) && i.initialFilter && (l = i.initialFilter) : i.initialFilter && (l = i.initialFilter),
                    o.filter.setFilter(l)
            }
            i.initialHeaderFilter && this.modExists("filter", !0) && i.initialHeaderFilter.forEach(function(t) {
                var i = e.columnManager.findColumn(t.field);
                if (!i)
                    return console.warn("Column Filter Error - No matching column found:", t.field),
                        !1;
                o.filter.setHeaderFilterValue(i, t.value)
            }),
            this.modExists("ajax") && o.ajax.initialize(),
            i.pagination && this.modExists("page", !0) && o.page.initialize(),
            i.groupBy && this.modExists("groupRows", !0) && o.groupRows.initialize(),
            this.modExists("keybindings") && o.keybindings.initialize(),
            this.modExists("selectRow") && o.selectRow.clearSelectionData(!0),
            i.autoResize && this.modExists("resizeTable") && o.resizeTable.initialize(),
            this.modExists("clipboard") && o.clipboard.initialize(),
            i.printAsHtml && this.modExists("print") && o.print.initialize(),
                i.tableBuilt.call(this)
        }
        ,
        h.prototype._loadInitialData = function() {
            var e = this;
            if (e.options.pagination && e.modExists("page"))
                if (e.modules.page.reset(!0, !0),
                "local" == e.options.pagination) {
                    if (e.options.data.length)
                        e.rowManager.setData(e.options.data, !1, !0);
                    else {
                        if ((e.options.ajaxURL || e.options.ajaxURLGenerator) && e.modExists("ajax"))
                            return void e.modules.ajax.loadData(!1, !0).then(function() {}).catch(function() {
                                e.options.paginationInitialPage && e.modules.page.setPage(e.options.paginationInitialPage)
                            });
                        e.rowManager.setData(e.options.data, !1, !0)
                    }
                    e.options.paginationInitialPage && e.modules.page.setPage(e.options.paginationInitialPage)
                } else
                    e.options.ajaxURL ? e.modules.page.setPage(e.options.paginationInitialPage).then(function() {}).catch(function() {}) : e.rowManager.setData([], !1, !0);
            else
                e.options.data.length ? e.rowManager.setData(e.options.data) : (e.options.ajaxURL || e.options.ajaxURLGenerator) && e.modExists("ajax") ? e.modules.ajax.loadData(!1, !0).then(function() {}).catch(function() {}) : e.rowManager.setData(e.options.data, !1, !0)
        }
        ,
        h.prototype.destroy = function() {
            var e = this.element;
            for (h.prototype.comms.deregister(this),
                 this.options.reactiveData && this.modExists("reactiveData", !0) && this.modules.reactiveData.unwatchData(),
                     this.rowManager.rows.forEach(function(e) {
                         e.wipe()
                     }),
                     this.rowManager.rows = [],
                     this.rowManager.activeRows = [],
                     this.rowManager.displayRows = [],
                 this.options.autoResize && this.modExists("resizeTable") && this.modules.resizeTable.clearBindings(),
                 this.modExists("keybindings") && this.modules.keybindings.clearBindings(); e.firstChild; )
                e.removeChild(e.firstChild);
            e.classList.remove("tabulator")
        }
        ,
        h.prototype._detectBrowser = function() {
            var e = navigator.userAgent || navigator.vendor || window.opera;
            e.indexOf("Trident") > -1 ? (this.browser = "ie",
                this.browserSlow = !0) : e.indexOf("Edge") > -1 ? (this.browser = "edge",
                this.browserSlow = !0) : e.indexOf("Firefox") > -1 ? (this.browser = "firefox",
                this.browserSlow = !1) : (this.browser = "other",
                this.browserSlow = !1),
                this.browserMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
        }
        ,
        h.prototype.blockRedraw = function() {
            return this.rowManager.blockRedraw()
        }
        ,
        h.prototype.restoreRedraw = function() {
            return this.rowManager.restoreRedraw()
        }
        ,
        h.prototype.setDataFromLocalFile = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    var n = document.createElement("input");
                    n.type = "file",
                        n.accept = e || ".json,application/json",
                        n.addEventListener("change", function(e) {
                            var s, a = n.files[0], r = new FileReader;
                            r.readAsText(a),
                                r.onload = function(e) {
                                    try {
                                        s = JSON.parse(r.result)
                                    } catch (e) {
                                        return console.warn("File Load Error - File contents is invalid JSON", e),
                                            void i(e)
                                    }
                                    t.setData(s).then(function(e) {
                                        o(e)
                                    }).catch(function(e) {
                                        o(e)
                                    })
                                }
                                ,
                                r.onerror = function(e) {
                                    console.warn("File Load Error - Unable to read file"),
                                        i()
                                }
                        }),
                        n.click()
                }
            )
        }
        ,
        h.prototype.setData = function(e, t, o) {
            return this.modExists("ajax") && this.modules.ajax.blockActiveRequest(),
                this._setData(e, t, o, !1, !0)
        }
        ,
        h.prototype._setData = function(e, t, o, i, n) {
            var s = this;
            return "string" != typeof e ? e ? s.rowManager.setData(e, i, n) : s.modExists("ajax") && (s.modules.ajax.getUrl || s.options.ajaxURLGenerator) ? "remote" == s.options.pagination && s.modExists("page", !0) ? (s.modules.page.reset(!0, !0),
                s.modules.page.setPage(1)) : s.modules.ajax.loadData(i, n) : s.rowManager.setData([], i, n) : 0 == e.indexOf("{") || 0 == e.indexOf("[") ? s.rowManager.setData(JSON.parse(e), i, n) : s.modExists("ajax", !0) ? (t && s.modules.ajax.setParams(t),
            o && s.modules.ajax.setConfig(o),
                s.modules.ajax.setUrl(e),
                "remote" == s.options.pagination && s.modExists("page", !0) ? (s.modules.page.reset(!0, !0),
                    s.modules.page.setPage(1)) : s.modules.ajax.loadData(i, n)) : void 0
        }
        ,
        h.prototype.clearData = function() {
            this.modExists("ajax") && this.modules.ajax.blockActiveRequest(),
                this.rowManager.clearData()
        }
        ,
        h.prototype.getData = function(e) {
            return !0 === e && (console.warn("passing a boolean to the getData function is deprecated, you should now pass the string 'active'"),
                e = "active"),
                this.rowManager.getData(e)
        }
        ,
        h.prototype.getDataCount = function(e) {
            return !0 === e && (console.warn("passing a boolean to the getDataCount function is deprecated, you should now pass the string 'active'"),
                e = "active"),
                this.rowManager.getDataCount(e)
        }
        ,
        h.prototype.searchRows = function(e, t, o) {
            if (this.modExists("filter", !0))
                return this.modules.filter.search("rows", e, t, o)
        }
        ,
        h.prototype.searchData = function(e, t, o) {
            if (this.modExists("filter", !0))
                return this.modules.filter.search("data", e, t, o)
        }
        ,
        h.prototype.getHtml = function(e, t, o) {
            if (this.modExists("export", !0))
                return this.modules.export.getHtml(e, t, o)
        }
        ,
        h.prototype.print = function(e, t, o) {
            if (this.modExists("print", !0))
                return this.modules.print.printFullscreen(e, t, o)
        }
        ,
        h.prototype.getAjaxUrl = function() {
            if (this.modExists("ajax", !0))
                return this.modules.ajax.getUrl()
        }
        ,
        h.prototype.replaceData = function(e, t, o) {
            return this.modExists("ajax") && this.modules.ajax.blockActiveRequest(),
                this._setData(e, t, o, !0)
        }
        ,
        h.prototype.updateData = function(e) {
            var t = this
                , o = this
                , i = 0;
            return new Promise(function(n, s) {
                    t.modExists("ajax") && t.modules.ajax.blockActiveRequest(),
                    "string" == typeof e && (e = JSON.parse(e)),
                        e ? e.forEach(function(e) {
                            var t = o.rowManager.findRow(e[o.options.index]);
                            t && (i++,
                                t.updateData(e).then(function() {
                                    --i || n()
                                }))
                        }) : (console.warn("Update Error - No data provided"),
                            s("Update Error - No data provided"))
                }
            )
        }
        ,
        h.prototype.addData = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    i.modExists("ajax") && i.modules.ajax.blockActiveRequest(),
                    "string" == typeof e && (e = JSON.parse(e)),
                        e ? i.rowManager.addRows(e, t, o).then(function(e) {
                            var t = [];
                            e.forEach(function(e) {
                                t.push(e.getComponent())
                            }),
                                n(t)
                        }) : (console.warn("Update Error - No data provided"),
                            s("Update Error - No data provided"))
                }
            )
        }
        ,
        h.prototype.updateOrAddData = function(e) {
            var t = this
                , o = this
                , i = []
                , n = 0;
            return new Promise(function(s, a) {
                    t.modExists("ajax") && t.modules.ajax.blockActiveRequest(),
                    "string" == typeof e && (e = JSON.parse(e)),
                        e ? e.forEach(function(e) {
                            var t = o.rowManager.findRow(e[o.options.index]);
                            n++,
                                t ? t.updateData(e).then(function() {
                                    n--,
                                        i.push(t.getComponent()),
                                    n || s(i)
                                }) : o.rowManager.addRows(e).then(function(e) {
                                    n--,
                                        i.push(e[0].getComponent()),
                                    n || s(i)
                                })
                        }) : (console.warn("Update Error - No data provided"),
                            a("Update Error - No data provided"))
                }
            )
        }
        ,
        h.prototype.getRow = function(e) {
            var t = this.rowManager.findRow(e);
            return t ? t.getComponent() : (console.warn("Find Error - No matching row found:", e),
                !1)
        }
        ,
        h.prototype.getRowFromPosition = function(e, t) {
            var o = this.rowManager.getRowFromPosition(e, t);
            return o ? o.getComponent() : (console.warn("Find Error - No matching row found:", e),
                !1)
        }
        ,
        h.prototype.deleteRow = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    function n() {
                        ++a == e.length && r && (s.rowManager.reRenderInPosition(),
                            o())
                    }
                    var s = t
                        , a = 0
                        , r = 0
                        , l = [];
                    Array.isArray(e) || (e = [e]),
                        e.forEach(function(e) {
                            var o = t.rowManager.findRow(e, !0);
                            o ? l.push(o) : (console.warn("Delete Error - No matching row found:", e),
                                i("Delete Error - No matching row found"),
                                n())
                        }),
                        l.sort(function(e, o) {
                            return t.rowManager.rows.indexOf(e) > t.rowManager.rows.indexOf(o) ? 1 : -1
                        }),
                        l.forEach(function(e) {
                            e.delete().then(function() {
                                r++,
                                    n()
                            }).catch(function(e) {
                                n(),
                                    i(e)
                            })
                        })
                }
            )
        }
        ,
        h.prototype.addRow = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    "string" == typeof e && (e = JSON.parse(e)),
                        i.rowManager.addRows(e, t, o).then(function(e) {
                            i.modExists("columnCalcs") && i.modules.columnCalcs.recalc(i.rowManager.activeRows),
                                n(e[0].getComponent())
                        })
                }
            )
        }
        ,
        h.prototype.updateOrAddRow = function(e, t) {
            var o = this;
            return new Promise(function(i, n) {
                    var s = o.rowManager.findRow(e);
                    "string" == typeof t && (t = JSON.parse(t)),
                        s ? s.updateData(t).then(function() {
                            o.modExists("columnCalcs") && o.modules.columnCalcs.recalc(o.rowManager.activeRows),
                                i(s.getComponent())
                        }).catch(function(e) {
                            n(e)
                        }) : s = o.rowManager.addRows(t).then(function(e) {
                            o.modExists("columnCalcs") && o.modules.columnCalcs.recalc(o.rowManager.activeRows),
                                i(e[0].getComponent())
                        }).catch(function(e) {
                            n(e)
                        })
                }
            )
        }
        ,
        h.prototype.updateRow = function(e, t) {
            var o = this;
            return new Promise(function(i, n) {
                    var s = o.rowManager.findRow(e);
                    "string" == typeof t && (t = JSON.parse(t)),
                        s ? s.updateData(t).then(function() {
                            i(s.getComponent())
                        }).catch(function(e) {
                            n(e)
                        }) : (console.warn("Update Error - No matching row found:", e),
                            n("Update Error - No matching row found"))
                }
            )
        }
        ,
        h.prototype.scrollToRow = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    var a = i.rowManager.findRow(e);
                    a ? i.rowManager.scrollToRow(a, t, o).then(function() {
                        n()
                    }).catch(function(e) {
                        s(e)
                    }) : (console.warn("Scroll Error - No matching row found:", e),
                        s("Scroll Error - No matching row found"))
                }
            )
        }
        ,
        h.prototype.moveRow = function(e, t, o) {
            var i = this.rowManager.findRow(e);
            i ? i.moveToRow(t, o) : console.warn("Move Error - No matching row found:", e)
        }
        ,
        h.prototype.getRows = function(e) {
            return !0 === e && (console.warn("passing a boolean to the getRows function is deprecated, you should now pass the string 'active'"),
                e = "active"),
                this.rowManager.getComponents(e)
        }
        ,
        h.prototype.getRowPosition = function(e, t) {
            var o = this.rowManager.findRow(e);
            return o ? this.rowManager.getRowPosition(o, t) : (console.warn("Position Error - No matching row found:", e),
                !1)
        }
        ,
        h.prototype.copyToClipboard = function(e) {
            this.modExists("clipboard", !0) && this.modules.clipboard.copy(e)
        }
        ,
        h.prototype.setColumns = function(e) {
            this.columnManager.setColumns(e)
        }
        ,
        h.prototype.getColumns = function(e) {
            return this.columnManager.getComponents(e)
        }
        ,
        h.prototype.getColumn = function(e) {
            var t = this.columnManager.findColumn(e);
            return t ? t.getComponent() : (console.warn("Find Error - No matching column found:", e),
                !1)
        }
        ,
        h.prototype.getColumnDefinitions = function() {
            return this.columnManager.getDefinitionTree()
        }
        ,
        h.prototype.getColumnLayout = function() {
            if (this.modExists("persistence", !0))
                return this.modules.persistence.parseColumns(this.columnManager.getColumns())
        }
        ,
        h.prototype.setColumnLayout = function(e) {
            return !!this.modExists("persistence", !0) && (this.columnManager.setColumns(this.modules.persistence.mergeDefinition(this.options.columns, e)),
                !0)
        }
        ,
        h.prototype.showColumn = function(e) {
            var t = this.columnManager.findColumn(e);
            if (!t)
                return console.warn("Column Show Error - No matching column found:", e),
                    !1;
            t.show(),
            this.options.responsiveLayout && this.modExists("responsiveLayout", !0) && this.modules.responsiveLayout.update()
        }
        ,
        h.prototype.hideColumn = function(e) {
            var t = this.columnManager.findColumn(e);
            if (!t)
                return console.warn("Column Hide Error - No matching column found:", e),
                    !1;
            t.hide(),
            this.options.responsiveLayout && this.modExists("responsiveLayout", !0) && this.modules.responsiveLayout.update()
        }
        ,
        h.prototype.toggleColumn = function(e) {
            var t = this.columnManager.findColumn(e);
            if (!t)
                return console.warn("Column Visibility Toggle Error - No matching column found:", e),
                    !1;
            t.visible ? t.hide() : t.show()
        }
        ,
        h.prototype.addColumn = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    var a = i.columnManager.findColumn(o);
                    i.columnManager.addColumn(e, t, a).then(function(e) {
                        n(e.getComponent())
                    }).catch(function(e) {
                        s(e)
                    })
                }
            )
        }
        ,
        h.prototype.deleteColumn = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    var n = t.columnManager.findColumn(e);
                    n ? n.delete().then(function() {
                        o()
                    }).catch(function(e) {
                        i(e)
                    }) : (console.warn("Column Delete Error - No matching column found:", e),
                        i())
                }
            )
        }
        ,
        h.prototype.updateColumnDefinition = function(e, t) {
            var o = this;
            return new Promise(function(i, n) {
                    var s = o.columnManager.findColumn(e);
                    s ? s.updateDefinition(t).then(function(e) {
                        i(e)
                    }).catch(function(e) {
                        n(e)
                    }) : (console.warn("Column Update Error - No matching column found:", e),
                        n())
                }
            )
        }
        ,
        h.prototype.moveColumn = function(e, t, o) {
            var i = this.columnManager.findColumn(e)
                , n = this.columnManager.findColumn(t);
            i ? n ? this.columnManager.moveColumn(i, n, o) : console.warn("Move Error - No matching column found:", n) : console.warn("Move Error - No matching column found:", e)
        }
        ,
        h.prototype.scrollToColumn = function(e, t, o) {
            var i = this;
            return new Promise(function(n, s) {
                    var a = i.columnManager.findColumn(e);
                    a ? i.columnManager.scrollToColumn(a, t, o).then(function() {
                        n()
                    }).catch(function(e) {
                        s(e)
                    }) : (console.warn("Scroll Error - No matching column found:", e),
                        s("Scroll Error - No matching column found"))
                }
            )
        }
        ,
        h.prototype.setLocale = function(e) {
            this.modules.localize.setLocale(e)
        }
        ,
        h.prototype.getLocale = function() {
            return this.modules.localize.getLocale()
        }
        ,
        h.prototype.getLang = function(e) {
            return this.modules.localize.getLang(e)
        }
        ,
        h.prototype.redraw = function(e) {
            this.columnManager.redraw(e),
                this.rowManager.redraw(e)
        }
        ,
        h.prototype.setHeight = function(e) {
            "classic" !== this.rowManager.renderMode ? (this.options.height = isNaN(e) ? e : e + "px",
                this.element.style.height = this.options.height,
                this.rowManager.setRenderMode(),
                this.rowManager.redraw()) : console.warn("setHeight function is not available in classic render mode")
        }
        ,
        h.prototype.setSort = function(e, t) {
            this.modExists("sort", !0) && (this.modules.sort.setSort(e, t),
                this.rowManager.sorterRefresh())
        }
        ,
        h.prototype.getSorters = function() {
            if (this.modExists("sort", !0))
                return this.modules.sort.getSort()
        }
        ,
        h.prototype.clearSort = function() {
            this.modExists("sort", !0) && (this.modules.sort.clear(),
                this.rowManager.sorterRefresh())
        }
        ,
        h.prototype.setFilter = function(e, t, o, i) {
            this.modExists("filter", !0) && (this.modules.filter.setFilter(e, t, o, i),
                this.rowManager.filterRefresh())
        }
        ,
        h.prototype.refreshFilter = function() {
            this.modExists("filter", !0) && this.rowManager.filterRefresh()
        }
        ,
        h.prototype.addFilter = function(e, t, o, i) {
            this.modExists("filter", !0) && (this.modules.filter.addFilter(e, t, o, i),
                this.rowManager.filterRefresh())
        }
        ,
        h.prototype.getFilters = function(e) {
            if (this.modExists("filter", !0))
                return this.modules.filter.getFilters(e)
        }
        ,
        h.prototype.setHeaderFilterFocus = function(e) {
            if (this.modExists("filter", !0)) {
                var t = this.columnManager.findColumn(e);
                if (!t)
                    return console.warn("Column Filter Focus Error - No matching column found:", e),
                        !1;
                this.modules.filter.setHeaderFilterFocus(t)
            }
        }
        ,
        h.prototype.getHeaderFilterValue = function(e) {
            if (this.modExists("filter", !0)) {
                var t = this.columnManager.findColumn(e);
                if (t)
                    return this.modules.filter.getHeaderFilterValue(t);
                console.warn("Column Filter Error - No matching column found:", e)
            }
        }
        ,
        h.prototype.setHeaderFilterValue = function(e, t) {
            if (this.modExists("filter", !0)) {
                var o = this.columnManager.findColumn(e);
                if (!o)
                    return console.warn("Column Filter Error - No matching column found:", e),
                        !1;
                this.modules.filter.setHeaderFilterValue(o, t)
            }
        }
        ,
        h.prototype.getHeaderFilters = function() {
            if (this.modExists("filter", !0))
                return this.modules.filter.getHeaderFilters()
        }
        ,
        h.prototype.removeFilter = function(e, t, o) {
            this.modExists("filter", !0) && (this.modules.filter.removeFilter(e, t, o),
                this.rowManager.filterRefresh())
        }
        ,
        h.prototype.clearFilter = function(e) {
            this.modExists("filter", !0) && (this.modules.filter.clearFilter(e),
                this.rowManager.filterRefresh())
        }
        ,
        h.prototype.clearHeaderFilter = function() {
            this.modExists("filter", !0) && (this.modules.filter.clearHeaderFilter(),
                this.rowManager.filterRefresh())
        }
        ,
        h.prototype.selectRow = function(e) {
            this.modExists("selectRow", !0) && (!0 === e && (console.warn("passing a boolean to the selectRowselectRow function is deprecated, you should now pass the string 'active'"),
                e = "active"),
                this.modules.selectRow.selectRows(e))
        }
        ,
        h.prototype.deselectRow = function(e) {
            this.modExists("selectRow", !0) && this.modules.selectRow.deselectRows(e)
        }
        ,
        h.prototype.toggleSelectRow = function(e) {
            this.modExists("selectRow", !0) && this.modules.selectRow.toggleRow(e)
        }
        ,
        h.prototype.getSelectedRows = function() {
            if (this.modExists("selectRow", !0))
                return this.modules.selectRow.getSelectedRows()
        }
        ,
        h.prototype.getSelectedData = function() {
            if (this.modExists("selectRow", !0))
                return this.modules.selectRow.getSelectedData()
        }
        ,
        h.prototype.getInvalidCells = function() {
            if (this.modExists("validate", !0))
                return this.modules.validate.getInvalidCells()
        }
        ,
        h.prototype.clearCellValidation = function(e) {
            var t = this;
            this.modExists("validate", !0) && (e || (e = this.modules.validate.getInvalidCells()),
            Array.isArray(e) || (e = [e]),
                e.forEach(function(e) {
                    t.modules.validate.clearValidation(e._getSelf())
                }))
        }
        ,
        h.prototype.validate = function(e) {
            var t = [];
            return this.rowManager.rows.forEach(function(e) {
                var o = e.validate();
                !0 !== o && (t = t.concat(o))
            }),
            !t.length || t
        }
        ,
        h.prototype.setMaxPage = function(e) {
            if (!this.options.pagination || !this.modExists("page"))
                return !1;
            this.modules.page.setMaxPage(e)
        }
        ,
        h.prototype.setPage = function(e) {
            return this.options.pagination && this.modExists("page") ? this.modules.page.setPage(e) : new Promise(function(e, t) {
                    t()
                }
            )
        }
        ,
        h.prototype.setPageToRow = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    t.options.pagination && t.modExists("page") ? (e = t.rowManager.findRow(e),
                        e ? t.modules.page.setPageToRow(e).then(function() {
                            o()
                        }).catch(function() {
                            i()
                        }) : i()) : i()
                }
            )
        }
        ,
        h.prototype.setPageSize = function(e) {
            if (!this.options.pagination || !this.modExists("page"))
                return !1;
            this.modules.page.setPageSize(e),
                this.modules.page.setPage(1).then(function() {}).catch(function() {})
        }
        ,
        h.prototype.getPageSize = function() {
            if (this.options.pagination && this.modExists("page", !0))
                return this.modules.page.getPageSize()
        }
        ,
        h.prototype.previousPage = function() {
            if (!this.options.pagination || !this.modExists("page"))
                return !1;
            this.modules.page.previousPage()
        }
        ,
        h.prototype.nextPage = function() {
            if (!this.options.pagination || !this.modExists("page"))
                return !1;
            this.modules.page.nextPage()
        }
        ,
        h.prototype.getPage = function() {
            return !(!this.options.pagination || !this.modExists("page")) && this.modules.page.getPage()
        }
        ,
        h.prototype.getPageMax = function() {
            return !(!this.options.pagination || !this.modExists("page")) && this.modules.page.getPageMax()
        }
        ,
        h.prototype.setGroupBy = function(e) {
            if (!this.modExists("groupRows", !0))
                return !1;
            this.options.groupBy = e,
                this.modules.groupRows.initialize(),
                this.rowManager.refreshActiveData("display"),
            this.options.persistence && this.modExists("persistence", !0) && this.modules.persistence.config.group && this.modules.persistence.save("group")
        }
        ,
        h.prototype.setGroupValues = function(e) {
            if (!this.modExists("groupRows", !0))
                return !1;
            this.options.groupValues = e,
                this.modules.groupRows.initialize(),
                this.rowManager.refreshActiveData("display"),
            this.options.persistence && this.modExists("persistence", !0) && this.modules.persistence.config.group && this.modules.persistence.save("group")
        }
        ,
        h.prototype.setGroupStartOpen = function(e) {
            if (!this.modExists("groupRows", !0))
                return !1;
            this.options.groupStartOpen = e,
                this.modules.groupRows.initialize(),
                this.options.groupBy ? (this.rowManager.refreshActiveData("group"),
                this.options.persistence && this.modExists("persistence", !0) && this.modules.persistence.config.group && this.modules.persistence.save("group")) : console.warn("Grouping Update - cant refresh view, no groups have been set")
        }
        ,
        h.prototype.setGroupHeader = function(e) {
            if (!this.modExists("groupRows", !0))
                return !1;
            this.options.groupHeader = e,
                this.modules.groupRows.initialize(),
                this.options.groupBy ? (this.rowManager.refreshActiveData("group"),
                this.options.persistence && this.modExists("persistence", !0) && this.modules.persistence.config.group && this.modules.persistence.save("group")) : console.warn("Grouping Update - cant refresh view, no groups have been set")
        }
        ,
        h.prototype.getGroups = function(e) {
            return !!this.modExists("groupRows", !0) && this.modules.groupRows.getGroups(!0)
        }
        ,
        h.prototype.getGroupedData = function() {
            if (this.modExists("groupRows", !0))
                return this.options.groupBy ? this.modules.groupRows.getGroupedData() : this.getData()
        }
        ,
        h.prototype.getEditedCells = function() {
            if (this.modExists("edit", !0))
                return this.modules.edit.getEditedCells()
        }
        ,
        h.prototype.clearCellEdited = function(e) {
            var t = this;
            this.modExists("edit", !0) && (e || (e = this.modules.edit.getEditedCells()),
            Array.isArray(e) || (e = [e]),
                e.forEach(function(e) {
                    t.modules.edit.clearEdited(e._getSelf())
                }))
        }
        ,
        h.prototype.getCalcResults = function() {
            return !!this.modExists("columnCalcs", !0) && this.modules.columnCalcs.getResults()
        }
        ,
        h.prototype.recalc = function() {
            this.modExists("columnCalcs", !0) && this.modules.columnCalcs.recalcAll(this.rowManager.activeRows)
        }
        ,
        h.prototype.navigatePrev = function() {
            var e = !1;
            return !(!this.modExists("edit", !0) || !(e = this.modules.edit.currentCell)) && e.nav().prev()
        }
    ,
    h.prototype.navigateNext = function() {
        var e = !1;
        return !(!this.modExists("edit", !0) || !(e = this.modules.edit.currentCell)) && e.nav().next()
    }
    ,
    h.prototype.navigateLeft = function() {
        var t = !1;
        return !(!this.modExists("edit", !0) || !(t = this.modules.edit.currentCell)) && (e.preventDefault(),
            t.nav().left())
    }
    ,
    h.prototype.navigateRight = function() {
        var t = !1;
        return !(!this.modExists("edit", !0) || !(t = this.modules.edit.currentCell)) && (e.preventDefault(),
            t.nav().right())
    }
    ,
    h.prototype.navigateUp = function() {
        var t = !1;
        return !(!this.modExists("edit", !0) || !(t = this.modules.edit.currentCell)) && (e.preventDefault(),
            t.nav().up())
    }
    ,
    h.prototype.navigateDown = function() {
        var t = !1;
        return !(!this.modExists("edit", !0) || !(t = this.modules.edit.currentCell)) && (e.preventDefault(),
            t.nav().down())
    }
    ,
    h.prototype.undo = function() {
        return !(!this.options.history || !this.modExists("history", !0)) && this.modules.history.undo()
    }
    ,
    h.prototype.redo = function() {
        return !(!this.options.history || !this.modExists("history", !0)) && this.modules.history.redo()
    }
    ,
    h.prototype.getHistoryUndoSize = function() {
        return !(!this.options.history || !this.modExists("history", !0)) && this.modules.history.getHistoryUndoSize()
    }
    ,
    h.prototype.getHistoryRedoSize = function() {
        return !(!this.options.history || !this.modExists("history", !0)) && this.modules.history.getHistoryRedoSize()
    }
    ,
    h.prototype.clearHistory = function() {
        return !(!this.options.history || !this.modExists("history", !0)) && this.modules.history.clear()
    }
    ,
    h.prototype.download = function(e, t, o, i) {
        this.modExists("download", !0) && this.modules.download.download(e, t, o, i)
    }
    ,
    h.prototype.downloadToTab = function(e, t, o, i) {
        this.modExists("download", !0) && this.modules.download.download(e, t, o, i, !0)
    }
    ,
    h.prototype.tableComms = function(e, t, o, i) {
        this.modules.comms.receive(e, t, o, i)
    }
    ,
    h.prototype.moduleBindings = {},
    h.prototype.extendModule = function(e, t, o) {
        if (h.prototype.moduleBindings[e]) {
            var i = h.prototype.moduleBindings[e].prototype[t];
            if (i)
                if ("object" == (void 0 === o ? "undefined" : _typeof(o)))
                    for (var n in o)
                        i[n] = o[n];
                else
                    console.warn("Module Error - Invalid value type, it must be an object");
            else
                console.warn("Module Error - property does not exist:", t)
        } else
            console.warn("Module Error - module does not exist:", e)
    }
    ,
    h.prototype.registerModule = function(e, t) {
        h.prototype.moduleBindings[e] = t
    }
    ,
    h.prototype.bindModules = function() {
        this.modules = {};
        for (var e in h.prototype.moduleBindings)
            this.modules[e] = new h.prototype.moduleBindings[e](this)
    }
    ,
    h.prototype.modExists = function(e, t) {
        return !!this.modules[e] || (t && console.error("Tabulator Module Not Installed: " + e),
            !1)
    }
    ,
    h.prototype.helpers = {
        elVisible: function(e) {
            return !(e.offsetWidth <= 0 && e.offsetHeight <= 0)
        },
        elOffset: function(e) {
            var t = e.getBoundingClientRect();
            return {
                top: t.top + window.pageYOffset - document.documentElement.clientTop,
                left: t.left + window.pageXOffset - document.documentElement.clientLeft
            }
        },
        deepClone: function(e) {
            var t = Object.assign(Array.isArray(e) ? [] : {}, e);
            for (var o in e)
                null != e[o] && "object" === _typeof(e[o]) && (e[o]instanceof Date ? t[o] = new Date(e[o]) : t[o] = this.deepClone(e[o]));
            return t
        }
    },
    h.prototype.comms = {
        tables: [],
        register: function(e) {
            h.prototype.comms.tables.push(e)
        },
        deregister: function(e) {
            var t = h.prototype.comms.tables.indexOf(e);
            t > -1 && h.prototype.comms.tables.splice(t, 1)
        },
        lookupTable: function(e, t) {
            var o, i, n = [];
            if ("string" == typeof e) {
                if (o = document.querySelectorAll(e),
                    o.length)
                    for (var s = 0; s < o.length; s++)
                        (i = h.prototype.comms.matchElement(o[s])) && n.push(i)
            } else
                "undefined" != typeof HTMLElement && e instanceof HTMLElement || e instanceof h ? (i = h.prototype.comms.matchElement(e)) && n.push(i) : Array.isArray(e) ? e.forEach(function(e) {
                    n = n.concat(h.prototype.comms.lookupTable(e))
                }) : t || console.warn("Table Connection Error - Invalid Selector", e);
            return n
        },
        matchElement: function(e) {
            return h.prototype.comms.tables.find(function(t) {
                return e instanceof h ? t === e : t.element === e
            })
        }
    },
    h.prototype.findTable = function(e) {
        var t = h.prototype.comms.lookupTable(e, !0);
        return !(Array.isArray(t) && !t.length) && t
    }
    ;
    var p = function(e) {
        this.table = e,
            this.mode = null
    };
    p.prototype.initialize = function(e) {
        this.modes[e] ? this.mode = e : (console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + e),
            this.mode = "fitData"),
            this.table.element.setAttribute("tabulator-layout", this.mode)
    }
        ,
        p.prototype.getMode = function() {
            return this.mode
        }
        ,
        p.prototype.layout = function() {
            this.modes[this.mode].call(this, this.table.columnManager.columnsByIndex),
            0 === this.mode.indexOf("fitData") && this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.columns && this.table.modules.persistence.save("columns")
        }
        ,
        p.prototype.modes = {
            fitData: function(e) {
                this.table.options.virtualDomHoz ? this.table.vdomHoz.fitDataLayoutOverride() : e.forEach(function(e) {
                    e.reinitializeWidth()
                }),
                this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update()
            },
            fitDataFill: function(e) {
                e.forEach(function(e) {
                    e.reinitializeWidth()
                }),
                this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update()
            },
            fitDataTable: function(e) {
                e.forEach(function(e) {
                    e.reinitializeWidth()
                }),
                this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update()
            },
            fitDataStretch: function(e) {
                var t = this
                    , o = 0
                    , i = this.table.rowManager.element.clientWidth
                    , n = 0
                    , s = !1;
                e.forEach(function(e, i) {
                    e.widthFixed || e.reinitializeWidth(),
                    (t.table.options.responsiveLayout ? e.modules.responsive.visible : e.visible) && (s = e),
                    e.visible && (o += e.getWidth())
                }),
                    s ? (n = i - o + s.getWidth(),
                    this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && (s.setWidth(0),
                        this.table.modules.responsiveLayout.update()),
                        n > 0 ? s.setWidth(n) : s.reinitializeWidth()) : this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update()
            },
            fitColumns: function(e) {
                function t(e) {
                    return "string" == typeof e ? e.indexOf("%") > -1 ? n / 100 * parseInt(e) : parseInt(e) : e
                }
                function o(e, i, n, s) {
                    function a(e) {
                        return n * (e.column.definition.widthGrow || 1)
                    }
                    function l(e) {
                        return t(e.width) - n * (e.column.definition.widthShrink || 0)
                    }
                    var c = []
                        , u = 0
                        , d = 0
                        , h = 0
                        , p = r
                        , m = 0
                        , f = 0
                        , g = [];
                    return e.forEach(function(e, t) {
                        var o = s ? l(e) : a(e);
                        e.column.minWidth >= o ? c.push(e) : e.column.maxWidth && e.column.maxWidth < o ? (e.width = e.column.maxWidth,
                            i -= e.column.maxWidth,
                        (p -= s ? e.column.definition.widthShrink || 1 : e.column.definition.widthGrow || 1) && (n = Math.floor(i / p))) : (g.push(e),
                            f += s ? e.column.definition.widthShrink || 1 : e.column.definition.widthGrow || 1)
                    }),
                        c.length ? (c.forEach(function(e) {
                            u += s ? e.width - e.column.minWidth : e.column.minWidth,
                                e.width = e.column.minWidth
                        }),
                            d = i - u,
                            h = f ? Math.floor(d / f) : d,
                            m = d - h * f,
                            m += o(g, d, h, s)) : (m = f ? i - Math.floor(i / f) * f : i,
                            g.forEach(function(e) {
                                e.width = s ? l(e) : a(e)
                            })),
                        m
                }
                var i = this
                    , n = i.table.element.clientWidth
                    , s = 0
                    , a = 0
                    , r = 0
                    , l = 0
                    , c = []
                    , u = []
                    , d = 0
                    , h = 0
                    , p = 0;
                this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", !0) && this.table.modules.responsiveLayout.update(),
                this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight && (n -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth),
                    e.forEach(function(e) {
                        var o, i, n;
                        e.visible && (o = e.definition.width,
                            i = parseInt(e.minWidth),
                            o ? (n = t(o),
                                s += n > i ? n : i,
                            e.definition.widthShrink && (u.push({
                                column: e,
                                width: n > i ? n : i
                            }),
                                d += e.definition.widthShrink)) : (c.push({
                                column: e,
                                width: 0
                            }),
                                r += e.definition.widthGrow || 1))
                    }),
                    a = n - s,
                    l = Math.floor(a / r);
                var p = o(c, a, l, !1);
                c.length && p > 0 && (c[c.length - 1].width += +p),
                    c.forEach(function(e) {
                        a -= e.width
                    }),
                    h = Math.abs(p) + a,
                h > 0 && d && (p = o(u, h, Math.floor(h / d), !0)),
                u.length && (u[u.length - 1].width -= p),
                    c.forEach(function(e) {
                        e.column.setWidth(e.width)
                    }),
                    u.forEach(function(e) {
                        e.column.setWidth(e.width)
                    })
            }
        },
        h.prototype.registerModule("layout", p);
    var m = function(e) {
        this.table = e,
            this.locale = "default",
            this.lang = !1,
            this.bindings = {},
            this.langList = {}
    };
    m.prototype.initialize = function() {
        this.langList = h.prototype.helpers.deepClone(this.langs)
    }
        ,
        m.prototype.setHeaderFilterPlaceholder = function(e) {
            this.langList.default.headerFilters.default = e
        }
        ,
        m.prototype.setHeaderFilterColumnPlaceholder = function(e, t) {
            this.langList.default.headerFilters.columns[e] = t,
            this.lang && !this.lang.headerFilters.columns[e] && (this.lang.headerFilters.columns[e] = t)
        }
        ,
        m.prototype.installLang = function(e, t) {
            this.langList[e] ? this._setLangProp(this.langList[e], t) : this.langList[e] = t
        }
        ,
        m.prototype._setLangProp = function(e, t) {
            for (var o in t)
                e[o] && "object" == _typeof(e[o]) ? this._setLangProp(e[o], t[o]) : e[o] = t[o]
        }
        ,
        m.prototype.setLocale = function(e) {
            function t(e, o) {
                for (var i in e)
                    "object" == _typeof(e[i]) ? (o[i] || (o[i] = {}),
                        t(e[i], o[i])) : o[i] = e[i]
            }
            var o = this;
            if (e = e || "default",
            !0 === e && navigator.language && (e = navigator.language.toLowerCase()),
            e && !o.langList[e]) {
                var i = e.split("-")[0];
                o.langList[i] ? (console.warn("Localization Error - Exact matching locale not found, using closest match: ", e, i),
                    e = i) : (console.warn("Localization Error - Matching locale not found, using default: ", e),
                    e = "default")
            }
            o.locale = e,
                o.lang = h.prototype.helpers.deepClone(o.langList.default || {}),
            "default" != e && t(o.langList[e], o.lang),
                o.table.options.localized.call(o.table, o.locale, o.lang),
                o._executeBindings()
        }
        ,
        m.prototype.getLocale = function(e) {
            return self.locale
        }
        ,
        m.prototype.getLang = function(e) {
            return e ? this.langList[e] : this.lang
        }
        ,
        m.prototype.getText = function(e, t) {
            var e = t ? e + "|" + t : e
                , o = e.split("|");
            return this._getLangElement(o, this.locale) || ""
        }
        ,
        m.prototype._getLangElement = function(e, t) {
            var o = this
                , i = o.lang;
            return e.forEach(function(e) {
                var t;
                i && (t = i[e],
                    i = void 0 !== t && t)
            }),
                i
        }
        ,
        m.prototype.bind = function(e, t) {
            this.bindings[e] || (this.bindings[e] = []),
                this.bindings[e].push(t),
                t(this.getText(e), this.lang)
        }
        ,
        m.prototype._executeBindings = function() {
            var e = this;
            for (var t in e.bindings)
                !function(t) {
                    e.bindings[t].forEach(function(o) {
                        o(e.getText(t), e.lang)
                    })
                }(t)
        }
        ,
        m.prototype.langs = {
            default: {
                groups: {
                    item: "item",
                    items: "items"
                },
                columns: {},
                ajax: {
                    loading: "Loading",
                    error: "Error"
                },
                pagination: {
                    page_size: "Page Size",
                    page_title: "Show Page",
                    first: "First",
                    first_title: "First Page",
                    last: "Last",
                    last_title: "Last Page",
                    prev: "Prev",
                    prev_title: "Prev Page",
                    next: "Next",
                    next_title: "Next Page",
                    all: "All"
                },
                headerFilters: {
                    default: "filter column...",
                    columns: {}
                }
            }
        },
        h.prototype.registerModule("localize", m);
    var f = function(e) {
        this.table = e
    };
    f.prototype.getConnections = function(e) {
        var t, o = this, i = [];
        return t = h.prototype.comms.lookupTable(e),
            t.forEach(function(e) {
                o.table !== e && i.push(e)
            }),
            i
    }
        ,
        f.prototype.send = function(e, t, o, i) {
            var n = this
                , s = this.getConnections(e);
            s.forEach(function(e) {
                e.tableComms(n.table.element, t, o, i)
            }),
            !s.length && e && console.warn("Table Connection Error - No tables matching selector found", e)
        }
        ,
        f.prototype.receive = function(e, t, o, i) {
            if (this.table.modExists(t))
                return this.table.modules[t].commsReceived(e, o, i);
            console.warn("Inter-table Comms Error - no such module:", t)
        }
        ,
        h.prototype.registerModule("comms", f);
    var g = function(e) {
        this.table = e,
            this.allowedTypes = ["", "data", "download", "clipboard", "print", "htmlOutput"]
    };
    g.prototype.initializeColumn = function(e) {
        var t = this
            , o = !1
            , i = {};
        this.allowedTypes.forEach(function(n) {
            var s, a = "accessor" + (n.charAt(0).toUpperCase() + n.slice(1));
            e.definition[a] && (s = t.lookupAccessor(e.definition[a])) && (o = !0,
                i[a] = {
                    accessor: s,
                    params: e.definition[a + "Params"] || {}
                })
        }),
        o && (e.modules.accessor = i)
    }
        ,
        g.prototype.lookupAccessor = function(e) {
            var t = !1;
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    this.accessors[e] ? t = this.accessors[e] : console.warn("Accessor Error - No such accessor found, ignoring: ", e);
                    break;
                case "function":
                    t = e
            }
            return t
        }
        ,
        g.prototype.transformRow = function(e, t) {
            var o = "accessor" + (t.charAt(0).toUpperCase() + t.slice(1))
                , i = e.getComponent()
                , n = h.prototype.helpers.deepClone(e.data || {});
            return this.table.columnManager.traverse(function(e) {
                var s, a, r, l;
                e.modules.accessor && (a = e.modules.accessor[o] || e.modules.accessor.accessor || !1) && "undefined" != (s = e.getFieldValue(n)) && (l = e.getComponent(),
                    r = "function" == typeof a.params ? a.params(s, n, t, l, i) : a.params,
                    e.setFieldValue(n, a.accessor(s, n, t, r, l, i)))
            }),
                n
        }
        ,
        g.prototype.accessors = {},
        h.prototype.registerModule("accessor", g);
    var b = function(e) {
        this.table = e,
            this.config = !1,
            this.url = "",
            this.urlGenerator = !1,
            this.params = !1,
            this.loaderElement = this.createLoaderElement(),
            this.msgElement = this.createMsgElement(),
            this.loadingElement = !1,
            this.errorElement = !1,
            this.loaderPromise = !1,
            this.progressiveLoad = !1,
            this.loading = !1,
            this.requestOrder = 0
    };
    b.prototype.initialize = function() {
        var e;
        this.loaderElement.appendChild(this.msgElement),
        this.table.options.ajaxLoaderLoading && ("string" == typeof this.table.options.ajaxLoaderLoading ? (e = document.createElement("template"),
            e.innerHTML = this.table.options.ajaxLoaderLoading.trim(),
            this.loadingElement = e.content.firstChild) : this.loadingElement = this.table.options.ajaxLoaderLoading),
            this.loaderPromise = this.table.options.ajaxRequestFunc || this.defaultLoaderPromise,
            this.urlGenerator = this.table.options.ajaxURLGenerator || this.defaultURLGenerator,
        this.table.options.ajaxLoaderError && ("string" == typeof this.table.options.ajaxLoaderError ? (e = document.createElement("template"),
            e.innerHTML = this.table.options.ajaxLoaderError.trim(),
            this.errorElement = e.content.firstChild) : this.errorElement = this.table.options.ajaxLoaderError),
        this.table.options.ajaxParams && this.setParams(this.table.options.ajaxParams),
        this.table.options.ajaxConfig && this.setConfig(this.table.options.ajaxConfig),
        this.table.options.ajaxURL && this.setUrl(this.table.options.ajaxURL),
        this.table.options.ajaxProgressiveLoad && (this.table.options.pagination ? (this.progressiveLoad = !1,
            console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time")) : this.table.modExists("page") ? (this.progressiveLoad = this.table.options.ajaxProgressiveLoad,
            this.table.modules.page.initializeProgressive(this.progressiveLoad)) : console.error("Pagination plugin is required for progressive ajax loading"))
    }
        ,
        b.prototype.createLoaderElement = function() {
            var e = document.createElement("div");
            return e.classList.add("tabulator-loader"),
                e
        }
        ,
        b.prototype.createMsgElement = function() {
            var e = document.createElement("div");
            return e.classList.add("tabulator-loader-msg"),
                e.setAttribute("role", "alert"),
                e
        }
        ,
        b.prototype.setParams = function(e, t) {
            if (t) {
                this.params = this.params || {};
                for (var o in e)
                    this.params[o] = e[o]
            } else
                this.params = e
        }
        ,
        b.prototype.getParams = function() {
            return this.params || {}
        }
        ,
        b.prototype.setConfig = function(e) {
            if (this._loadDefaultConfig(),
            "string" == typeof e)
                this.config.method = e;
            else
                for (var t in e)
                    this.config[t] = e[t]
        }
        ,
        b.prototype._loadDefaultConfig = function(e) {
            var t = this;
            if (!t.config || e) {
                t.config = {};
                for (var o in t.defaultConfig)
                    t.config[o] = t.defaultConfig[o]
            }
        }
        ,
        b.prototype.setUrl = function(e) {
            this.url = e
        }
        ,
        b.prototype.getUrl = function() {
            return this.url
        }
        ,
        b.prototype.loadData = function(e, t) {
            return this.progressiveLoad ? this._loadDataProgressive() : this._loadDataStandard(e, t)
        }
        ,
        b.prototype.nextPage = function(e) {
            var t;
            this.loading || (t = this.table.options.ajaxProgressiveLoadScrollMargin || 2 * this.table.rowManager.getElement().clientHeight,
            e < t && this.table.modules.page.nextPage().then(function() {}).catch(function() {}))
        }
        ,
        b.prototype.blockActiveRequest = function() {
            this.requestOrder++
        }
        ,
        b.prototype._loadDataProgressive = function() {
            return this.table.rowManager.setData([]),
                this.table.modules.page.setPage(1)
        }
        ,
        b.prototype._loadDataStandard = function(e, t) {
            var o = this;
            return new Promise(function(i, n) {
                    o.sendRequest(e).then(function(s) {
                        o.table.rowManager.setData(s, e, t).then(function() {
                            i()
                        }).catch(function(e) {
                            n(e)
                        })
                    }).catch(function(e) {
                        n(e)
                    })
                }
            )
        }
        ,
        b.prototype.generateParamsList = function(e, t) {
            var o = this
                , i = [];
            if (t = t || "",
                Array.isArray(e))
                e.forEach(function(e, n) {
                    i = i.concat(o.generateParamsList(e, t ? t + "[" + n + "]" : n))
                });
            else if ("object" === (void 0 === e ? "undefined" : _typeof(e)))
                for (var n in e)
                    i = i.concat(o.generateParamsList(e[n], t ? t + "[" + n + "]" : n));
            else
                i.push({
                    key: t,
                    value: e
                });
            return i
        }
        ,
        b.prototype.serializeParams = function(e) {
            var t = this.generateParamsList(e)
                , o = [];
            return t.forEach(function(e) {
                o.push(encodeURIComponent(e.key) + "=" + encodeURIComponent(e.value))
            }),
                o.join("&")
        }
        ,
        b.prototype.sendRequest = function(e) {
            var t, o = this, i = this, n = i.url;
            return i.requestOrder++,
                t = i.requestOrder,
                i._loadDefaultConfig(),
                new Promise(function(s, a) {
                        !1 !== i.table.options.ajaxRequesting.call(o.table, i.url, i.params) ? (i.loading = !0,
                        e || i.showLoader(),
                            o.loaderPromise(n, i.config, i.params).then(function(e) {
                                t === i.requestOrder ? (i.table.options.ajaxResponse && (e = i.table.options.ajaxResponse.call(i.table, i.url, i.params, e)),
                                    s(e),
                                    i.hideLoader(),
                                    i.loading = !1) : console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made")
                            }).catch(function(e) {
                                console.error("Ajax Load Error: ", e),
                                    i.table.options.ajaxError.call(i.table, e),
                                    i.showError(),
                                    setTimeout(function() {
                                        i.hideLoader()
                                    }, 3e3),
                                    i.loading = !1,
                                    a(e)
                            })) : a()
                    }
                )
        }
        ,
        b.prototype.showLoader = function() {
            if ("function" == typeof this.table.options.ajaxLoader ? this.table.options.ajaxLoader() : this.table.options.ajaxLoader) {
                for (this.hideLoader(); this.msgElement.firstChild; )
                    this.msgElement.removeChild(this.msgElement.firstChild);
                this.msgElement.classList.remove("tabulator-error"),
                    this.msgElement.classList.add("tabulator-loading"),
                    this.loadingElement ? this.msgElement.appendChild(this.loadingElement) : this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|loading"),
                    this.table.element.appendChild(this.loaderElement)
            }
        }
        ,
        b.prototype.showError = function() {
            for (this.hideLoader(); this.msgElement.firstChild; )
                this.msgElement.removeChild(this.msgElement.firstChild);
            this.msgElement.classList.remove("tabulator-loading"),
                this.msgElement.classList.add("tabulator-error"),
                this.errorElement ? this.msgElement.appendChild(this.errorElement) : this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|error"),
                this.table.element.appendChild(this.loaderElement)
        }
        ,
        b.prototype.hideLoader = function() {
            this.loaderElement.parentNode && this.loaderElement.parentNode.removeChild(this.loaderElement)
        }
        ,
        b.prototype.defaultConfig = {
            method: "GET"
        },
        b.prototype.defaultURLGenerator = function(e, t, o) {
            return e && o && Object.keys(o).length && (t.method && "get" != t.method.toLowerCase() || (t.method = "get",
                e += (e.includes("?") ? "&" : "?") + this.modules.ajax.serializeParams(o))),
                e
        }
        ,
        b.prototype.defaultLoaderPromise = function(e, t, o) {
            var i, n = this;
            return new Promise(function(s, a) {
                    if (e = n.urlGenerator.call(n.table, e, t, o),
                    "GET" != t.method.toUpperCase())
                        if (i = "object" === _typeof(n.table.options.ajaxContentType) ? n.table.options.ajaxContentType : n.contentTypeFormatters[n.table.options.ajaxContentType]) {
                            for (var r in i.headers)
                                t.headers || (t.headers = {}),
                                void 0 === t.headers[r] && (t.headers[r] = i.headers[r]);
                            t.body = i.body.call(n, e, t, o)
                        } else
                            console.warn("Ajax Error - Invalid ajaxContentType value:", n.table.options.ajaxContentType);
                    e ? (void 0 === t.headers && (t.headers = {}),
                    void 0 === t.headers.Accept && (t.headers.Accept = "application/json"),
                    void 0 === t.headers["X-Requested-With"] && (t.headers["X-Requested-With"] = "XMLHttpRequest"),
                    void 0 === t.mode && (t.mode = "cors"),
                        "cors" == t.mode ? (void 0 === t.headers["Access-Control-Allow-Origin"] && (t.headers["Access-Control-Allow-Origin"] = window.location.origin),
                        void 0 === t.credentials && (t.credentials = "same-origin")) : void 0 === t.credentials && (t.credentials = "include"),
                        fetch(e, t).then(function(e) {
                            e.ok ? e.json().then(function(e) {
                                s(e)
                            }).catch(function(e) {
                                a(e),
                                    console.warn("Ajax Load Error - Invalid JSON returned", e)
                            }) : (console.error("Ajax Load Error - Connection Error: " + e.status, e.statusText),
                                a(e))
                        }).catch(function(e) {
                            console.error("Ajax Load Error - Connection Error: ", e),
                                a(e)
                        })) : (console.warn("Ajax Load Error - No URL Set"),
                        s([]))
                }
            )
        }
        ,
        b.prototype.contentTypeFormatters = {
            json: {
                headers: {
                    "Content-Type": "application/json"
                },
                body: function(e, t, o) {
                    return JSON.stringify(o)
                }
            },
            form: {
                headers: {},
                body: function(e, t, o) {
                    var i = this.generateParamsList(o)
                        , n = new FormData;
                    return i.forEach(function(e) {
                        n.append(e.key, e.value)
                    }),
                        n
                }
            }
        },
        h.prototype.registerModule("ajax", b);
    var v = function(e) {
        this._row = e
    };
    v.prototype.getData = function(e) {
        return this._row.getData(e)
    }
        ,
        v.prototype.getElement = function() {
            return this._row.getElement()
        }
        ,
        v.prototype.getTable = function() {
            return this._row.table
        }
        ,
        v.prototype.getCells = function() {
            var e = [];
            return this._row.getCells().forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        v.prototype.getCell = function(e) {
            var t = this._row.getCell(e);
            return !!t && t.getComponent()
        }
        ,
        v.prototype._getSelf = function() {
            return this._row
        }
    ;
    var y = function(e) {
        this.table = e,
            this.topCalcs = [],
            this.botCalcs = [],
            this.genColumn = !1,
            this.topElement = this.createElement(),
            this.botElement = this.createElement(),
            this.topRow = !1,
            this.botRow = !1,
            this.topInitialized = !1,
            this.botInitialized = !1,
            this.initialize()
    };
    y.prototype.createElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-calcs-holder"),
            e
    }
        ,
        y.prototype.initialize = function() {
            this.genColumn = new n({
                field: "value"
            },this)
        }
        ,
        y.prototype.registerColumnField = function() {}
        ,
        y.prototype.initializeColumn = function(e) {
            var t = e.definition
                , o = {
                topCalcParams: t.topCalcParams || {},
                botCalcParams: t.bottomCalcParams || {}
            };
            if (t.topCalc) {
                switch (_typeof(t.topCalc)) {
                    case "string":
                        this.calculations[t.topCalc] ? o.topCalc = this.calculations[t.topCalc] : console.warn("Column Calc Error - No such calculation found, ignoring: ", t.topCalc);
                        break;
                    case "function":
                        o.topCalc = t.topCalc
                }
                o.topCalc && (e.modules.columnCalcs = o,
                    this.topCalcs.push(e),
                "group" != this.table.options.columnCalcs && this.initializeTopRow())
            }
            if (t.bottomCalc) {
                switch (_typeof(t.bottomCalc)) {
                    case "string":
                        this.calculations[t.bottomCalc] ? o.botCalc = this.calculations[t.bottomCalc] : console.warn("Column Calc Error - No such calculation found, ignoring: ", t.bottomCalc);
                        break;
                    case "function":
                        o.botCalc = t.bottomCalc
                }
                o.botCalc && (e.modules.columnCalcs = o,
                    this.botCalcs.push(e),
                "group" != this.table.options.columnCalcs && this.initializeBottomRow())
            }
        }
        ,
        y.prototype.removeCalcs = function() {
            var e = !1;
            this.topInitialized && (this.topInitialized = !1,
                this.topElement.parentNode.removeChild(this.topElement),
                e = !0),
            this.botInitialized && (this.botInitialized = !1,
                this.table.footerManager.remove(this.botElement),
                e = !0),
            e && this.table.rowManager.adjustTableSize()
        }
        ,
        y.prototype.initializeTopRow = function() {
            this.topInitialized || (this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling),
                this.topInitialized = !0)
        }
        ,
        y.prototype.initializeBottomRow = function() {
            this.botInitialized || (this.table.footerManager.prepend(this.botElement),
                this.botInitialized = !0)
        }
        ,
        y.prototype.scrollHorizontal = function(e) {
            this.botInitialized && this.botRow && (this.botRow.getElement().style.marginLeft = -e + "px")
        }
        ,
        y.prototype.recalc = function(e) {
            var t;
            if (this.topInitialized || this.botInitialized) {
                if (this.rowsToData(e),
                    this.topInitialized) {
                    for (this.topRow && this.topRow.deleteCells(),
                             t = this.generateRow("top", this.rowsToData(e)),
                             this.topRow = t; this.topElement.firstChild; )
                        this.topElement.removeChild(this.topElement.firstChild);
                    this.topElement.appendChild(t.getElement()),
                        t.initialize(!0)
                }
                if (this.botInitialized) {
                    for (this.botRow && this.botRow.deleteCells(),
                             t = this.generateRow("bottom", this.rowsToData(e)),
                             this.botRow = t; this.botElement.firstChild; )
                        this.botElement.removeChild(this.botElement.firstChild);
                    this.botElement.appendChild(t.getElement()),
                        t.initialize(!0)
                }
                this.table.rowManager.adjustTableSize(),
                this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layout()
            }
        }
        ,
        y.prototype.recalcRowGroup = function(e) {
            this.recalcGroup(this.table.modules.groupRows.getRowGroup(e))
        }
        ,
        y.prototype.recalcAll = function() {
            var e = this;
            if ((this.topCalcs.length || this.botCalcs.length) && ("group" !== this.table.options.columnCalcs && this.recalc(this.table.rowManager.activeRows),
            this.table.options.groupBy && "table" !== this.table.options.columnCalcs)) {
                table.modules.groupRows.getChildGroups().forEach(function(t) {
                    e.recalcGroup(t)
                })
            }
        }
        ,
        y.prototype.recalcGroup = function(e) {
            var t, o;
            e && e.calcs && (e.calcs.bottom && (t = this.rowsToData(e.rows),
                o = this.generateRowData("bottom", t),
                e.calcs.bottom.updateData(o),
                e.calcs.bottom.reinitialize()),
            e.calcs.top && (t = this.rowsToData(e.rows),
                o = this.generateRowData("top", t),
                e.calcs.top.updateData(o),
                e.calcs.top.reinitialize()))
        }
        ,
        y.prototype.generateTopRow = function(e) {
            return this.generateRow("top", this.rowsToData(e))
        }
        ,
        y.prototype.generateBottomRow = function(e) {
            return this.generateRow("bottom", this.rowsToData(e))
        }
        ,
        y.prototype.rowsToData = function(e) {
            var t = this
                , o = [];
            return e.forEach(function(e) {
                if (o.push(e.getData()),
                t.table.options.dataTree && t.table.options.dataTreeChildColumnCalcs && e.modules.dataTree.open) {
                    var i = t.rowsToData(t.table.modules.dataTree.getFilteredTreeChildren(e));
                    o = o.concat(i)
                }
            }),
                o
        }
        ,
        y.prototype.generateRow = function(e, t) {
            var o, i = this, n = this.generateRowData(e, t);
            return i.table.modExists("mutator") && i.table.modules.mutator.disable(),
                o = new l(n,this,"calc"),
            i.table.modExists("mutator") && i.table.modules.mutator.enable(),
                o.getElement().classList.add("tabulator-calcs", "tabulator-calcs-" + e),
                o.component = !1,
                o.getComponent = function() {
                    return this.component || (this.component = new v(this)),
                        this.component
                }
                ,
                o.generateCells = function() {
                    var t = [];
                    i.table.columnManager.columnsByIndex.forEach(function(n) {
                        i.genColumn.setField(n.getField()),
                            i.genColumn.hozAlign = n.hozAlign,
                            n.definition[e + "CalcFormatter"] && i.table.modExists("format") ? i.genColumn.modules.format = {
                                formatter: i.table.modules.format.getFormatter(n.definition[e + "CalcFormatter"]),
                                params: n.definition[e + "CalcFormatterParams"] || {}
                            } : i.genColumn.modules.format = {
                                formatter: i.table.modules.format.getFormatter("plaintext"),
                                params: {}
                            },
                            i.genColumn.definition.cssClass = n.definition.cssClass;
                        var s = new u(i.genColumn,o);
                        s.getElement(),
                            s.column = n,
                            s.setWidth(),
                            n.cells.push(s),
                            t.push(s),
                        n.visible || s.hide()
                    }),
                        this.cells = t
                }
                ,
                o
        }
        ,
        y.prototype.generateRowData = function(e, t) {
            var o, i, n = {}, s = "top" == e ? this.topCalcs : this.botCalcs, a = "top" == e ? "topCalc" : "botCalc";
            return s.forEach(function(e) {
                var s = [];
                e.modules.columnCalcs && e.modules.columnCalcs[a] && (t.forEach(function(t) {
                    s.push(e.getFieldValue(t))
                }),
                    i = a + "Params",
                    o = "function" == typeof e.modules.columnCalcs[i] ? e.modules.columnCalcs[i](s, t) : e.modules.columnCalcs[i],
                    e.setFieldValue(n, e.modules.columnCalcs[a](s, t, o)))
            }),
                n
        }
        ,
        y.prototype.hasTopCalcs = function() {
            return !!this.topCalcs.length
        }
        ,
        y.prototype.hasBottomCalcs = function() {
            return !!this.botCalcs.length
        }
        ,
        y.prototype.redraw = function() {
            this.topRow && this.topRow.normalizeHeight(!0),
            this.botRow && this.botRow.normalizeHeight(!0)
        }
        ,
        y.prototype.getResults = function() {
            var e, t = this, o = {};
            return this.table.options.groupBy && this.table.modExists("groupRows") ? (e = this.table.modules.groupRows.getGroups(!0),
                e.forEach(function(e) {
                    o[e.getKey()] = t.getGroupResults(e)
                })) : o = {
                top: this.topRow ? this.topRow.getData() : {},
                bottom: this.botRow ? this.botRow.getData() : {}
            },
                o
        }
        ,
        y.prototype.getGroupResults = function(e) {
            var t = this
                , o = e._getSelf()
                , i = e.getSubGroups()
                , n = {};
            return i.forEach(function(e) {
                n[e.getKey()] = t.getGroupResults(e)
            }),
                {
                    top: o.calcs.top ? o.calcs.top.getData() : {},
                    bottom: o.calcs.bottom ? o.calcs.bottom.getData() : {},
                    groups: n
                }
        }
        ,
        y.prototype.calculations = {
            avg: function(e, t, o) {
                var i = 0
                    , n = void 0 !== o.precision ? o.precision : 2;
                return e.length && (i = e.reduce(function(e, t) {
                    return Number(e) + Number(t)
                }),
                    i /= e.length,
                    i = !1 !== n ? i.toFixed(n) : i),
                    parseFloat(i).toString()
            },
            max: function(e, t, o) {
                var i = null
                    , n = void 0 !== o.precision && o.precision;
                return e.forEach(function(e) {
                    ((e = Number(e)) > i || null === i) && (i = e)
                }),
                    null !== i ? !1 !== n ? i.toFixed(n) : i : ""
            },
            min: function(e, t, o) {
                var i = null
                    , n = void 0 !== o.precision && o.precision;
                return e.forEach(function(e) {
                    ((e = Number(e)) < i || null === i) && (i = e)
                }),
                    null !== i ? !1 !== n ? i.toFixed(n) : i : ""
            },
            sum: function(e, t, o) {
                var i = 0
                    , n = void 0 !== o.precision && o.precision;
                return e.length && e.forEach(function(e) {
                    e = Number(e),
                        i += isNaN(e) ? 0 : Number(e)
                }),
                    !1 !== n ? i.toFixed(n) : i
            },
            concat: function(e, t, o) {
                var i = 0;
                return e.length && (i = e.reduce(function(e, t) {
                    return String(e) + String(t)
                })),
                    i
            },
            count: function(e, t, o) {
                var i = 0;
                return e.length && e.forEach(function(e) {
                    e && i++
                }),
                    i
            }
        },
        h.prototype.registerModule("columnCalcs", y);
    var w = function(e) {
        this.table = e,
            this.mode = !0,
            this.pasteParser = function() {}
            ,
            this.pasteAction = function() {}
            ,
            this.customSelection = !1,
            this.rowRange = !1,
            this.blocked = !0
    };
    w.prototype.initialize = function() {
        var e = this;
        this.mode = this.table.options.clipboard,
            this.rowRange = this.table.options.clipboardCopyRowRange,
        !0 !== this.mode && "copy" !== this.mode || this.table.element.addEventListener("copy", function(t) {
            var o, i, n;
            if (!e.blocked) {
                if (t.preventDefault(),
                    e.customSelection)
                    o = e.customSelection,
                    e.table.options.clipboardCopyFormatter && (o = e.table.options.clipboardCopyFormatter("plain", o));
                else {
                    var n = e.table.modules.export.generateExportList(e.table.options.clipboardCopyConfig, e.table.options.clipboardCopyStyled, e.rowRange, "clipboard");
                    i = e.table.modules.export.genereateHTMLTable(n),
                        o = i ? e.generatePlainContent(n) : "",
                    e.table.options.clipboardCopyFormatter && (o = e.table.options.clipboardCopyFormatter("plain", o),
                        i = e.table.options.clipboardCopyFormatter("html", i))
                }
                window.clipboardData && window.clipboardData.setData ? window.clipboardData.setData("Text", o) : t.clipboardData && t.clipboardData.setData ? (t.clipboardData.setData("text/plain", o),
                i && t.clipboardData.setData("text/html", i)) : t.originalEvent && t.originalEvent.clipboardData.setData && (t.originalEvent.clipboardData.setData("text/plain", o),
                i && t.originalEvent.clipboardData.setData("text/html", i)),
                    e.table.options.clipboardCopied.call(e.table, o, i),
                    e.reset()
            }
        }),
        !0 !== this.mode && "paste" !== this.mode || this.table.element.addEventListener("paste", function(t) {
            e.paste(t)
        }),
            this.setPasteParser(this.table.options.clipboardPasteParser),
            this.setPasteAction(this.table.options.clipboardPasteAction)
    }
        ,
        w.prototype.reset = function() {
            this.blocked = !0,
                this.customSelection = !1
        }
        ,
        w.prototype.generatePlainContent = function(e) {
            var t = [];
            return e.forEach(function(e) {
                var o = [];
                e.columns.forEach(function(t) {
                    var i = "";
                    if (t)
                        if ("group" === e.type && (t.value = t.component.getKey()),
                        null === t.value)
                            i = "";
                        else
                            switch (_typeof(t.value)) {
                                case "object":
                                    i = JSON.stringify(t.value);
                                    break;
                                case "undefined":
                                    i = "";
                                    break;
                                default:
                                    i = t.value
                            }
                    o.push(i)
                }),
                    t.push(o.join("\t"))
            }),
                t.join("\n")
        }
        ,
        w.prototype.copy = function(e, t) {
            var e, o, i;
            this.blocked = !1,
                this.customSelection = !1,
            !0 !== this.mode && "copy" !== this.mode || (this.rowRange = e || this.table.options.clipboardCopyRowRange,
                void 0 !== window.getSelection && void 0 !== document.createRange ? (e = document.createRange(),
                    e.selectNodeContents(this.table.element),
                    o = window.getSelection(),
                o.toString() && t && (this.customSelection = o.toString()),
                    o.removeAllRanges(),
                    o.addRange(e)) : void 0 !== document.selection && void 0 !== document.body.createTextRange && (i = document.body.createTextRange(),
                    i.moveToElementText(this.table.element),
                    i.select()),
                document.execCommand("copy"),
            o && o.removeAllRanges())
        }
        ,
        w.prototype.setPasteAction = function(e) {
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    this.pasteAction = this.pasteActions[e],
                    this.pasteAction || console.warn("Clipboard Error - No such paste action found:", e);
                    break;
                case "function":
                    this.pasteAction = e
            }
        }
        ,
        w.prototype.setPasteParser = function(e) {
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    this.pasteParser = this.pasteParsers[e],
                    this.pasteParser || console.warn("Clipboard Error - No such paste parser found:", e);
                    break;
                case "function":
                    this.pasteParser = e
            }
        }
        ,
        w.prototype.paste = function(e) {
            var t, o, i;
            this.checkPaseOrigin(e) && (t = this.getPasteData(e),
                o = this.pasteParser.call(this, t),
                o ? (e.preventDefault(),
                this.table.modExists("mutator") && (o = this.mutateData(o)),
                    i = this.pasteAction.call(this, o),
                    this.table.options.clipboardPasted.call(this.table, t, o, i)) : this.table.options.clipboardPasteError.call(this.table, t))
        }
        ,
        w.prototype.mutateData = function(e) {
            var t = this
                , o = [];
            return Array.isArray(e) ? e.forEach(function(e) {
                o.push(t.table.modules.mutator.transformRow(e, "clipboard"))
            }) : o = e,
                o
        }
        ,
        w.prototype.checkPaseOrigin = function(e) {
            var t = !0;
            return ("DIV" != e.target.tagName || this.table.modules.edit.currentCell) && (t = !1),
                t
        }
        ,
        w.prototype.getPasteData = function(e) {
            var t;
            return window.clipboardData && window.clipboardData.getData ? t = window.clipboardData.getData("Text") : e.clipboardData && e.clipboardData.getData ? t = e.clipboardData.getData("text/plain") : e.originalEvent && e.originalEvent.clipboardData.getData && (t = e.originalEvent.clipboardData.getData("text/plain")),
                t
        }
        ,
        w.prototype.pasteParsers = {
            table: function(e) {
                var t = []
                    , o = !0
                    , i = this.table.columnManager.columns
                    , n = []
                    , s = [];
                return e = e.split("\n"),
                    e.forEach(function(e) {
                        t.push(e.split("\t"))
                    }),
                !(!t.length || 1 === t.length && t[0].length < 2) && (!0,
                    t[0].forEach(function(e) {
                        var t = i.find(function(t) {
                            return e && t.definition.title && e.trim() && t.definition.title.trim() === e.trim()
                        });
                        t ? n.push(t) : o = !1
                    }),
                o || (o = !0,
                    n = [],
                    t[0].forEach(function(e) {
                        var t = i.find(function(t) {
                            return e && t.field && e.trim() && t.field.trim() === e.trim()
                        });
                        t ? n.push(t) : o = !1
                    }),
                o || (n = this.table.columnManager.columnsByIndex)),
                o && t.shift(),
                    t.forEach(function(e) {
                        var t = {};
                        e.forEach(function(e, o) {
                            n[o] && (t[n[o].field] = e)
                        }),
                            s.push(t)
                    }),
                    s)
            }
        },
        w.prototype.pasteActions = {
            replace: function(e) {
                return this.table.setData(e)
            },
            update: function(e) {
                return this.table.updateOrAddData(e)
            },
            insert: function(e) {
                return this.table.addData(e)
            }
        },
        h.prototype.registerModule("clipboard", w);
    var E = function(e) {
        this.table = e,
            this.indent = 10,
            this.field = "",
            this.collapseEl = null,
            this.expandEl = null,
            this.branchEl = null,
            this.elementField = !1,
            this.startOpen = function() {}
            ,
            this.displayIndex = 0
    };
    E.prototype.initialize = function() {
        var e = null
            , t = this.table.columnManager.getFirstVisibileColumn()
            , o = this.table.options;
        switch (this.field = o.dataTreeChildField,
            this.indent = o.dataTreeChildIndent,
            this.elementField = o.dataTreeElementColumn || !!t && t.field,
        o.dataTreeBranchElement && (!0 === o.dataTreeBranchElement ? (this.branchEl = document.createElement("div"),
            this.branchEl.classList.add("tabulator-data-tree-branch")) : "string" == typeof o.dataTreeBranchElement ? (e = document.createElement("div"),
            e.innerHTML = o.dataTreeBranchElement,
            this.branchEl = e.firstChild) : this.branchEl = o.dataTreeBranchElement),
            o.dataTreeCollapseElement ? "string" == typeof o.dataTreeCollapseElement ? (e = document.createElement("div"),
                e.innerHTML = o.dataTreeCollapseElement,
                this.collapseEl = e.firstChild) : this.collapseEl = o.dataTreeCollapseElement : (this.collapseEl = document.createElement("div"),
                this.collapseEl.classList.add("tabulator-data-tree-control"),
                this.collapseEl.tabIndex = 0,
                this.collapseEl.innerHTML = "<div class='tabulator-data-tree-control-collapse'></div>"),
            o.dataTreeExpandElement ? "string" == typeof o.dataTreeExpandElement ? (e = document.createElement("div"),
                e.innerHTML = o.dataTreeExpandElement,
                this.expandEl = e.firstChild) : this.expandEl = o.dataTreeExpandElement : (this.expandEl = document.createElement("div"),
                this.expandEl.classList.add("tabulator-data-tree-control"),
                this.expandEl.tabIndex = 0,
                this.expandEl.innerHTML = "<div class='tabulator-data-tree-control-expand'></div>"),
            _typeof(o.dataTreeStartExpanded)) {
            case "boolean":
                this.startOpen = function(e, t) {
                    return o.dataTreeStartExpanded
                }
                ;
                break;
            case "function":
                this.startOpen = o.dataTreeStartExpanded;
                break;
            default:
                this.startOpen = function(e, t) {
                    return o.dataTreeStartExpanded[t]
                }
        }
    }
        ,
        E.prototype.initializeRow = function(e) {
            var t = e.getData()[this.field]
                , o = Array.isArray(t)
                , i = o || !o && "object" === (void 0 === t ? "undefined" : _typeof(t)) && null !== t;
            !i && e.modules.dataTree && e.modules.dataTree.branchEl && e.modules.dataTree.branchEl.parentNode.removeChild(e.modules.dataTree.branchEl),
            !i && e.modules.dataTree && e.modules.dataTree.controlEl && e.modules.dataTree.controlEl.parentNode.removeChild(e.modules.dataTree.controlEl),
                e.modules.dataTree = {
                    index: e.modules.dataTree ? e.modules.dataTree.index : 0,
                    open: !!i && (e.modules.dataTree ? e.modules.dataTree.open : this.startOpen(e.getComponent(), 0)),
                    controlEl: !(!e.modules.dataTree || !i) && e.modules.dataTree.controlEl,
                    branchEl: !(!e.modules.dataTree || !i) && e.modules.dataTree.branchEl,
                    parent: !!e.modules.dataTree && e.modules.dataTree.parent,
                    children: i
                }
        }
        ,
        E.prototype.layoutRow = function(e) {
            var t = this.elementField ? e.getCell(this.elementField) : e.getCells()[0]
                , o = t.getElement()
                , i = e.modules.dataTree;
            i.branchEl && (i.branchEl.parentNode && i.branchEl.parentNode.removeChild(i.branchEl),
                i.branchEl = !1),
            i.controlEl && (i.controlEl.parentNode && i.controlEl.parentNode.removeChild(i.controlEl),
                i.controlEl = !1),
                this.generateControlElement(e, o),
                e.getElement().classList.add("tabulator-tree-level-" + i.index),
            i.index && (this.branchEl ? (i.branchEl = this.branchEl.cloneNode(!0),
                o.insertBefore(i.branchEl, o.firstChild),
                this.table.rtl ? i.branchEl.style.marginRight = (i.branchEl.offsetWidth + i.branchEl.style.marginLeft) * (i.index - 1) + i.index * this.indent + "px" : i.branchEl.style.marginLeft = (i.branchEl.offsetWidth + i.branchEl.style.marginRight) * (i.index - 1) + i.index * this.indent + "px") : this.table.rtl ? o.style.paddingRight = parseInt(window.getComputedStyle(o, null).getPropertyValue("padding-right")) + i.index * this.indent + "px" : o.style.paddingLeft = parseInt(window.getComputedStyle(o, null).getPropertyValue("padding-left")) + i.index * this.indent + "px")
        }
        ,
        E.prototype.generateControlElement = function(e, t) {
            var o = this
                , i = e.modules.dataTree
                , t = t || e.getCells()[0].getElement()
                , n = i.controlEl;
            !1 !== i.children && (i.open ? (i.controlEl = this.collapseEl.cloneNode(!0),
                i.controlEl.addEventListener("click", function(t) {
                    t.stopPropagation(),
                        o.collapseRow(e)
                })) : (i.controlEl = this.expandEl.cloneNode(!0),
                i.controlEl.addEventListener("click", function(t) {
                    t.stopPropagation(),
                        o.expandRow(e)
                })),
                i.controlEl.addEventListener("mousedown", function(e) {
                    e.stopPropagation()
                }),
                n && n.parentNode === t ? n.parentNode.replaceChild(i.controlEl, n) : t.insertBefore(i.controlEl, t.firstChild))
        }
        ,
        E.prototype.setDisplayIndex = function(e) {
            this.displayIndex = e
        }
        ,
        E.prototype.getDisplayIndex = function() {
            return this.displayIndex
        }
        ,
        E.prototype.getRows = function(e) {
            var t = this
                , o = [];
            return e.forEach(function(e, i) {
                var n, s;
                o.push(e),
                e instanceof l && (e.create(),
                    n = e.modules.dataTree.children,
                n.index || !1 === n.children || (s = t.getChildren(e),
                    s.forEach(function(e) {
                        e.create(),
                            o.push(e)
                    })))
            }),
                o
        }
        ,
        E.prototype.getChildren = function(e, t) {
            var o = this
                , i = e.modules.dataTree
                , n = []
                , s = [];
            return !1 !== i.children && (i.open || t) && (Array.isArray(i.children) || (i.children = this.generateChildren(e)),
                n = this.table.modExists("filter") && this.table.options.dataTreeFilter ? this.table.modules.filter.filter(i.children) : i.children,
            this.table.modExists("sort") && this.table.options.dataTreeSort && this.table.modules.sort.sort(n),
                n.forEach(function(e) {
                    s.push(e),
                        o.getChildren(e).forEach(function(e) {
                            s.push(e)
                        })
                })),
                s
        }
        ,
        E.prototype.generateChildren = function(e) {
            var t = this
                , o = []
                , i = e.getData()[this.field];
            return Array.isArray(i) || (i = [i]),
                i.forEach(function(i) {
                    var n = new l(i || {},t.table.rowManager);
                    n.create(),
                        n.modules.dataTree.index = e.modules.dataTree.index + 1,
                        n.modules.dataTree.parent = e,
                    n.modules.dataTree.children && (n.modules.dataTree.open = t.startOpen(n.getComponent(), n.modules.dataTree.index)),
                        o.push(n)
                }),
                o
        }
        ,
        E.prototype.expandRow = function(e, t) {
            var o = e.modules.dataTree;
            !1 !== o.children && (o.open = !0,
                e.reinitialize(),
                this.table.rowManager.refreshActiveData("tree", !1, !0),
                this.table.options.dataTreeRowExpanded(e.getComponent(), e.modules.dataTree.index))
        }
        ,
        E.prototype.collapseRow = function(e) {
            var t = e.modules.dataTree;
            !1 !== t.children && (t.open = !1,
                e.reinitialize(),
                this.table.rowManager.refreshActiveData("tree", !1, !0),
                this.table.options.dataTreeRowCollapsed(e.getComponent(), e.modules.dataTree.index))
        }
        ,
        E.prototype.toggleRow = function(e) {
            var t = e.modules.dataTree;
            !1 !== t.children && (t.open ? this.collapseRow(e) : this.expandRow(e))
        }
        ,
        E.prototype.getTreeParent = function(e) {
            return !!e.modules.dataTree.parent && e.modules.dataTree.parent.getComponent()
        }
        ,
        E.prototype.getFilteredTreeChildren = function(e) {
            var t, o = e.modules.dataTree, i = [];
            return o.children && (Array.isArray(o.children) || (o.children = this.generateChildren(e)),
                t = this.table.modExists("filter") && this.table.options.dataTreeFilter ? this.table.modules.filter.filter(o.children) : o.children,
                t.forEach(function(e) {
                    e instanceof l && i.push(e)
                })),
                i
        }
        ,
        E.prototype.rowDelete = function(e) {
            var t, o = e.modules.dataTree.parent;
            o && (t = this.findChildIndex(e, o),
            !1 !== t && o.data[this.field].splice(t, 1),
            o.data[this.field].length || delete o.data[this.field],
                this.initializeRow(o),
                this.layoutRow(o)),
                this.table.rowManager.refreshActiveData("tree", !1, !0)
        }
        ,
        E.prototype.addTreeChildRow = function(e, t, o, i) {
            var n = !1;
            "string" == typeof t && (t = JSON.parse(t)),
            Array.isArray(e.data[this.field]) || (e.data[this.field] = [],
                e.modules.dataTree.open = this.startOpen(e.getComponent(), e.modules.dataTree.index)),
            void 0 !== i && !1 !== (n = this.findChildIndex(i, e)) && e.data[this.field].splice(o ? n : n + 1, 0, t),
            !1 === n && (o ? e.data[this.field].unshift(t) : e.data[this.field].push(t)),
                this.initializeRow(e),
                this.layoutRow(e),
                this.table.rowManager.refreshActiveData("tree", !1, !0)
        }
        ,
        E.prototype.findChildIndex = function(e, t) {
            var o = this
                , i = !1;
            return "object" == (void 0 === e ? "undefined" : _typeof(e)) ? e instanceof l ? i = e.data : e instanceof r ? i = e._getSelf().data : "undefined" != typeof HTMLElement && e instanceof HTMLElement && t.modules.dataTree && (i = t.modules.dataTree.children.find(function(t) {
                return t instanceof l && t.element === e
            })) && (i = i.data) : i = void 0 !== e && null !== e && t.data[this.field].find(function(t) {
                return t.data[o.table.options.index] == e
            }),
            i && (Array.isArray(t.data[this.field]) && (i = t.data[this.field].indexOf(i)),
            -1 == i && (i = !1)),
                i
        }
        ,
        E.prototype.getTreeChildren = function(e, t, o) {
            var i = this
                , n = e.modules.dataTree
                , s = [];
            return n.children && (Array.isArray(n.children) || (n.children = this.generateChildren(e)),
                n.children.forEach(function(e) {
                    e instanceof l && (s.push(t ? e.getComponent() : e),
                    o && (s = s.concat(i.getTreeChildren(e, t, o))))
                })),
                s
        }
        ,
        E.prototype.checkForRestyle = function(e) {
            e.row.cells.indexOf(e) || e.row.reinitialize()
        }
        ,
        E.prototype.getChildField = function() {
            return this.field
        }
        ,
        E.prototype.redrawNeeded = function(e) {
            return !!this.field && void 0 !== e[this.field] || !!this.elementField && void 0 !== e[this.elementField]
        }
        ,
        h.prototype.registerModule("dataTree", E);
    var C = function(e) {
        this.table = e
    };
    C.prototype.download = function(e, t, o, i, n) {
        function s(o, i) {
            n ? !0 === n ? a.triggerDownload(o, i, e, t, !0) : n(o) : a.triggerDownload(o, i, e, t)
        }
        var a = this
            , r = !1;
        if ("function" == typeof e ? r = e : a.downloaders[e] ? r = a.downloaders[e] : console.warn("Download Error - No such download type found: ", e),
            r) {
            var l = this.generateExportList(i);
            r.call(this.table, l, o || {}, s)
        }
    }
        ,
        C.prototype.generateExportList = function(e) {
            var t = this.table.modules.export.generateExportList(this.table.options.downloadConfig, !1, e || this.table.options.downloadRowRange, "download")
                , o = this.table.options.groupHeaderDownload;
            return o && !Array.isArray(o) && (o = [o]),
                t.forEach(function(e) {
                    var t;
                    "group" === e.type && (t = e.columns[0],
                    o && o[e.indent] && (t.value = o[e.indent](t.value, e.component._group.getRowCount(), e.component._group.getData(), e.component)))
                }),
                t
        }
        ,
        C.prototype.triggerDownload = function(e, t, o, i, n) {
            var s = document.createElement("a")
                , a = new Blob([e],{
                type: t
            })
                , i = i || "Tabulator." + ("function" == typeof o ? "txt" : o);
            (a = this.table.options.downloadReady.call(this.table, e, a)) && (n ? window.open(window.URL.createObjectURL(a)) : navigator.msSaveOrOpenBlob ? navigator.msSaveOrOpenBlob(a, i) : (s.setAttribute("href", window.URL.createObjectURL(a)),
                s.setAttribute("download", i),
                s.style.display = "none",
                document.body.appendChild(s),
                s.click(),
                document.body.removeChild(s)),
            this.table.options.downloadComplete && this.table.options.downloadComplete())
        }
        ,
        C.prototype.commsReceived = function(e, t, o) {
            switch (t) {
                case "intercept":
                    this.download(o.type, "", o.options, o.active, o.intercept)
            }
        }
        ,
        C.prototype.downloaders = {
            csv: function(e, t, o) {
                var i = t && t.delimiter ? t.delimiter : ","
                    , n = []
                    , s = [];
                e.forEach(function(e) {
                    var t = [];
                    switch (e.type) {
                        case "group":
                            console.warn("Download Warning - CSV downloader cannot process row groups");
                            break;
                        case "calc":
                            console.warn("Download Warning - CSV downloader cannot process column calculations");
                            break;
                        case "header":
                            e.columns.forEach(function(e, t) {
                                e && 1 === e.depth && (s[t] = void 0 === e.value || null === e.value ? "" : '"' + String(e.value).split('"').join('""') + '"')
                            });
                            break;
                        case "row":
                            e.columns.forEach(function(e) {
                                if (e) {
                                    switch (_typeof(e.value)) {
                                        case "object":
                                            e.value = JSON.stringify(e.value);
                                            break;
                                        case "undefined":
                                        case "null":
                                            e.value = ""
                                    }
                                    t.push('"' + String(e.value).split('"').join('""') + '"')
                                }
                            }),
                                n.push(t.join(i))
                    }
                }),
                s.length && n.unshift(s.join(i)),
                    n = n.join("\n"),
                t.bom && (n = "\ufeff" + n),
                    o(n, "text/csv")
            },
            json: function(e, t, o) {
                var i = [];
                e.forEach(function(e) {
                    var t = {};
                    switch (e.type) {
                        case "header":
                            break;
                        case "group":
                            console.warn("Download Warning - JSON downloader cannot process row groups");
                            break;
                        case "calc":
                            console.warn("Download Warning - JSON downloader cannot process column calculations");
                            break;
                        case "row":
                            e.columns.forEach(function(e) {
                                e && (t[e.component.getField()] = e.value)
                            }),
                                i.push(t)
                    }
                }),
                    i = JSON.stringify(i, null, "\t"),
                    o(i, "application/json")
            },
            pdf: function(e, t, o) {
                function i(e, t) {
                    var o = [];
                    return e.columns.forEach(function(e) {
                        var i;
                        if (e) {
                            switch (_typeof(e.value)) {
                                case "object":
                                    e.value = JSON.stringify(e.value);
                                    break;
                                case "undefined":
                                case "null":
                                    e.value = ""
                            }
                            i = {
                                content: e.value,
                                colSpan: e.width,
                                rowSpan: e.height
                            },
                            t && (i.styles = t),
                                o.push(i)
                        } else
                            o.push("")
                    }),
                        o
                }
                var n = []
                    , s = []
                    , a = {}
                    , r = t.rowGroupStyles || {
                    fontStyle: "bold",
                    fontSize: 12,
                    cellPadding: 6,
                    fillColor: 220
                }
                    , l = t.rowCalcStyles || {
                    fontStyle: "bold",
                    fontSize: 10,
                    cellPadding: 4,
                    fillColor: 232
                }
                    , c = t.jsPDF || {}
                    , u = t && t.title ? t.title : "";
                c.orientation || (c.orientation = t.orientation || "landscape"),
                c.unit || (c.unit = "pt"),
                    e.forEach(function(e) {
                        switch (e.type) {
                            case "header":
                                n.push(i(e));
                                break;
                            case "group":
                                s.push(i(e, r));
                                break;
                            case "calc":
                                s.push(i(e, l));
                                break;
                            case "row":
                                s.push(i(e))
                        }
                    });
                var d = new jsPDF(c);
                t && t.autoTable && (a = "function" == typeof t.autoTable ? t.autoTable(d) || {} : t.autoTable),
                u && (a.addPageContent = function(e) {
                        d.text(u, 40, 30)
                    }
                ),
                    a.head = n,
                    a.body = s,
                    d.autoTable(a),
                t && t.documentProcessing && t.documentProcessing(d),
                    o(d.output("arraybuffer"), "application/pdf")
            },
            xlsx: function(e, t, o) {
                function i() {
                    var t = []
                        , o = []
                        , i = {}
                        , n = {
                        s: {
                            c: 0,
                            r: 0
                        },
                        e: {
                            c: e[0] ? e[0].columns.reduce(function(e, t) {
                                return e + (t && t.width ? t.width : 1)
                            }, 0) : 0,
                            r: e.length
                        }
                    };
                    return e.forEach(function(e, i) {
                        var n = [];
                        e.columns.forEach(function(e, t) {
                            e ? (n.push(e.value instanceof Date || "object" !== _typeof(e.value) ? e.value : JSON.stringify(e.value)),
                            (e.width > 1 || e.height > -1) && o.push({
                                s: {
                                    r: i,
                                    c: t
                                },
                                e: {
                                    r: i + e.height - 1,
                                    c: t + e.width - 1
                                }
                            })) : n.push("")
                        }),
                            t.push(n)
                    }),
                        XLSX.utils.sheet_add_aoa(i, t),
                        i["!ref"] = XLSX.utils.encode_range(n),
                    o.length && (i["!merges"] = o),
                        i
                }
                var n, s = this, a = t.sheetName || "Sheet1", r = XLSX.utils.book_new();
                if (r.SheetNames = [],
                    r.Sheets = {},
                    t.sheetOnly)
                    return void o(i());
                if (t.sheets)
                    for (var l in t.sheets)
                        !0 === t.sheets[l] ? (r.SheetNames.push(l),
                            r.Sheets[l] = i()) : (r.SheetNames.push(l),
                            this.modules.comms.send(t.sheets[l], "download", "intercept", {
                                type: "xlsx",
                                options: {
                                    sheetOnly: !0
                                },
                                active: s.active,
                                intercept: function(e) {
                                    r.Sheets[l] = e
                                }
                            }));
                else
                    r.SheetNames.push(a),
                        r.Sheets[a] = i();
                t.documentProcessing && (r = t.documentProcessing(r)),
                    n = XLSX.write(r, {
                        bookType: "xlsx",
                        bookSST: !0,
                        type: "binary"
                    }),
                    o(function(e) {
                        for (var t = new ArrayBuffer(e.length), o = new Uint8Array(t), i = 0; i != e.length; ++i)
                            o[i] = 255 & e.charCodeAt(i);
                        return t
                    }(n), "application/octet-stream")
            },
            html: function(e, t, o) {
                this.modExists("export", !0) && o(this.modules.export.genereateHTMLTable(e), "text/html")
            }
        },
        h.prototype.registerModule("download", C);
    var x = function(e) {
        this.table = e,
            this.currentCell = !1,
            this.mouseClick = !1,
            this.recursionBlock = !1,
            this.invalidEdit = !1,
            this.editedCells = []
    };
    x.prototype.initializeColumn = function(e) {
        var t = this
            , o = {
            editor: !1,
            blocked: !1,
            check: e.definition.editable,
            params: e.definition.editorParams || {}
        };
        switch (_typeof(e.definition.editor)) {
            case "string":
                "tick" === e.definition.editor && (e.definition.editor = "tickCross",
                    console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor")),
                    t.editors[e.definition.editor] ? o.editor = t.editors[e.definition.editor] : console.warn("Editor Error - No such editor found: ", e.definition.editor);
                break;
            case "function":
                o.editor = e.definition.editor;
                break;
            case "boolean":
                !0 === e.definition.editor && ("function" != typeof e.definition.formatter ? ("tick" === e.definition.formatter && (e.definition.formatter = "tickCross",
                    console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor")),
                    t.editors[e.definition.formatter] ? o.editor = t.editors[e.definition.formatter] : o.editor = t.editors.input) : console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", e.definition.formatter))
        }
        o.editor && (e.modules.edit = o)
    }
        ,
        x.prototype.getCurrentCell = function() {
            return !!this.currentCell && this.currentCell.getComponent()
        }
        ,
        x.prototype.clearEditor = function(e) {
            var t, o = this.currentCell;
            if (this.invalidEdit = !1,
                o) {
                for (this.currentCell = !1,
                         t = o.getElement(),
                         e ? o.validate() : t.classList.remove("tabulator-validation-fail"),
                         t.classList.remove("tabulator-editing"); t.firstChild; )
                    t.removeChild(t.firstChild);
                o.row.getElement().classList.remove("tabulator-row-editing")
            }
        }
        ,
        x.prototype.cancelEdit = function() {
            if (this.currentCell) {
                var e = this.currentCell
                    , t = this.currentCell.getComponent();
                this.clearEditor(!0),
                    e.setValueActual(e.getValue()),
                    e.cellRendered(),
                ("textarea" == e.column.definition.editor || e.column.definition.variableHeight) && e.row.normalizeHeight(!0),
                e.column.cellEvents.cellEditCancelled && e.column.cellEvents.cellEditCancelled.call(this.table, t),
                    this.table.options.cellEditCancelled.call(this.table, t)
            }
        }
        ,
        x.prototype.bindEditor = function(e) {
            var t = this
                , o = e.getElement(!0);
            o.setAttribute("tabindex", 0),
                o.addEventListener("click", function(e) {
                    o.classList.contains("tabulator-editing") || o.focus({
                        preventScroll: !0
                    })
                }),
                o.addEventListener("mousedown", function(e) {
                    2 === e.button ? e.preventDefault() : t.mouseClick = !0
                }),
                o.addEventListener("focus", function(o) {
                    t.recursionBlock || t.edit(e, o, !1)
                })
        }
        ,
        x.prototype.focusCellNoEvent = function(e, t) {
            this.recursionBlock = !0,
            t && "ie" === this.table.browser || e.getElement().focus({
                preventScroll: !0
            }),
                this.recursionBlock = !1
        }
        ,
        x.prototype.editCell = function(e, t) {
            this.focusCellNoEvent(e),
                this.edit(e, !1, t)
        }
        ,
        x.prototype.focusScrollAdjust = function(e) {
            if ("virtual" == this.table.rowManager.getRenderMode()) {
                var t = this.table.rowManager.element.scrollTop
                    , o = this.table.rowManager.element.clientHeight + this.table.rowManager.element.scrollTop
                    , i = e.row.getElement();
                i.offsetTop;
                i.offsetTop < t ? this.table.rowManager.element.scrollTop -= t - i.offsetTop : i.offsetTop + i.offsetHeight > o && (this.table.rowManager.element.scrollTop += i.offsetTop + i.offsetHeight - o);
                var n = this.table.rowManager.element.scrollLeft
                    , s = this.table.rowManager.element.clientWidth + this.table.rowManager.element.scrollLeft
                    , a = e.getElement();
                a.offsetLeft;
                this.table.modExists("frozenColumns") && (n += parseInt(this.table.modules.frozenColumns.leftMargin),
                    s -= parseInt(this.table.modules.frozenColumns.rightMargin)),
                this.table.options.virtualDomHoz && (n -= parseInt(this.table.vdomHoz.vDomPadLeft),
                    s -= parseInt(this.table.vdomHoz.vDomPadLeft)),
                    a.offsetLeft < n ? this.table.rowManager.element.scrollLeft -= n - a.offsetLeft : a.offsetLeft + a.offsetWidth > s && (this.table.rowManager.element.scrollLeft += a.offsetLeft + a.offsetWidth - s)
            }
        }
        ,
        x.prototype.edit = function(e, t, o) {
            function i(t) {
                if (c.currentCell === e) {
                    var o = !0;
                    return e.column.modules.validate && c.table.modExists("validate") && "manual" != c.table.options.validationMode && (o = c.table.modules.validate.validate(e.column.modules.validate, e, t)),
                        !0 === o || "highlight" === c.table.options.validationMode ? (c.clearEditor(),
                        e.modules.edit || (e.modules.edit = {}),
                            e.modules.edit.edited = !0,
                        -1 == c.editedCells.indexOf(e) && c.editedCells.push(e),
                            e.setValue(t, !0),
                        c.table.options.dataTree && c.table.modExists("dataTree") && c.table.modules.dataTree.checkForRestyle(e),
                        !0 === o || (h.classList.add("tabulator-validation-fail"),
                            c.table.options.validationFailed.call(c.table, e.getComponent(), t, o),
                            !1)) : (c.invalidEdit = !0,
                            h.classList.add("tabulator-validation-fail"),
                            c.focusCellNoEvent(e, !0),
                            d(),
                            c.table.options.validationFailed.call(c.table, e.getComponent(), t, o),
                            !1)
                }
            }
            function n() {
                c.currentCell === e && (c.cancelEdit(),
                c.table.options.dataTree && c.table.modExists("dataTree") && c.table.modules.dataTree.checkForRestyle(e))
            }
            function s(e) {
                d = e
            }
            var a, r, l, c = this, u = !0, d = function() {}, h = e.getElement();
            if (this.currentCell)
                return void (this.invalidEdit || this.cancelEdit());
            if (e.column.modules.edit.blocked)
                return this.mouseClick = !1,
                    h.blur(),
                    !1;
            switch (t && t.stopPropagation(),
                _typeof(e.column.modules.edit.check)) {
                case "function":
                    u = e.column.modules.edit.check(e.getComponent());
                    break;
                case "boolean":
                    u = e.column.modules.edit.check
            }
            if (u || o) {
                if (c.cancelEdit(),
                    c.currentCell = e,
                    this.focusScrollAdjust(e),
                    r = e.getComponent(),
                this.mouseClick && (this.mouseClick = !1,
                e.column.cellEvents.cellClick && e.column.cellEvents.cellClick.call(this.table, t, r)),
                e.column.cellEvents.cellEditing && e.column.cellEvents.cellEditing.call(this.table, r),
                    c.table.options.cellEditing.call(this.table, r),
                    l = "function" == typeof e.column.modules.edit.params ? e.column.modules.edit.params(r) : e.column.modules.edit.params,
                !1 === (a = e.column.modules.edit.editor.call(c, r, s, i, n, l)))
                    return h.blur(),
                        !1;
                if (!(a instanceof Node))
                    return console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", a),
                        h.blur(),
                        !1;
                for (h.classList.add("tabulator-editing"),
                         e.row.getElement().classList.add("tabulator-row-editing"); h.firstChild; )
                    h.removeChild(h.firstChild);
                h.appendChild(a),
                    d();
                for (var p = h.children, m = 0; m < p.length; m++)
                    p[m].addEventListener("click", function(e) {
                        e.stopPropagation()
                    });
                return !0
            }
            return this.mouseClick = !1,
                h.blur(),
                !1
        }
        ,
        x.prototype.maskInput = function(e, t) {
            function o(t) {
                var r = i[t];
                void 0 !== r && r !== a && r !== n && r !== s && (e.value = e.value + "" + r,
                    o(t + 1))
            }
            var i = t.mask
                , n = void 0 !== t.maskLetterChar ? t.maskLetterChar : "A"
                , s = void 0 !== t.maskNumberChar ? t.maskNumberChar : "9"
                , a = void 0 !== t.maskWildcardChar ? t.maskWildcardChar : "*"
                , r = !1;
            e.addEventListener("keydown", function(t) {
                var o = e.value.length
                    , l = t.key;
                if (t.keyCode > 46) {
                    if (o >= i.length)
                        return t.preventDefault(),
                            t.stopPropagation(),
                            r = !1,
                            !1;
                    switch (i[o]) {
                        case n:
                            if (l.toUpperCase() == l.toLowerCase())
                                return t.preventDefault(),
                                    t.stopPropagation(),
                                    r = !1,
                                    !1;
                            break;
                        case s:
                            if (isNaN(l))
                                return t.preventDefault(),
                                    t.stopPropagation(),
                                    r = !1,
                                    !1;
                            break;
                        case a:
                            break;
                        default:
                            if (l !== i[o])
                                return t.preventDefault(),
                                    t.stopPropagation(),
                                    r = !1,
                                    !1
                    }
                    r = !0
                }
            }),
                e.addEventListener("keyup", function(i) {
                    i.keyCode > 46 && t.maskAutoFill && o(e.value.length)
                }),
            e.placeholder || (e.placeholder = i),
            t.maskAutoFill && o(e.value.length)
        }
        ,
        x.prototype.getEditedCells = function() {
            var e = [];
            return this.editedCells.forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        x.prototype.clearEdited = function(e) {
            var t;
            e.modules.edit && e.modules.edit.edited && (e.modules.edit.edited = !1,
            e.modules.validate && (e.modules.validate.invalid = !1)),
            (t = this.editedCells.indexOf(e)) > -1 && this.editedCells.splice(t, 1)
        }
        ,
        x.prototype.editors = {
            input: function(e, t, o, i, n) {
                function s(e) {
                    (null === a || void 0 === a) && "" !== r.value || r.value !== a ? o(r.value) && (a = r.value) : i()
                }
                var a = e.getValue()
                    , r = document.createElement("input");
                if (r.setAttribute("type", n.search ? "search" : "text"),
                    r.style.padding = "4px",
                    r.style.width = "100%",
                    r.style.boxSizing = "border-box",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var l in n.elementAttributes)
                        "+" == l.charAt(0) ? (l = l.slice(1),
                            r.setAttribute(l, r.getAttribute(l) + n.elementAttributes["+" + l])) : r.setAttribute(l, n.elementAttributes[l]);
                return r.value = void 0 !== a ? a : "",
                    t(function() {
                        r.focus({
                            preventScroll: !0
                        }),
                            r.style.height = "100%"
                    }),
                    r.addEventListener("change", s),
                    r.addEventListener("blur", s),
                    r.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 13:
                                s(e);
                                break;
                            case 27:
                                i();
                                break;
                            case 35:
                            case 36:
                                e.stopPropagation()
                        }
                    }),
                n.mask && this.table.modules.edit.maskInput(r, n),
                    r
            },
            textarea: function(e, t, o, i, n) {
                function s(t) {
                    (null === a || void 0 === a) && "" !== c.value || c.value !== a ? (o(c.value) && (a = c.value),
                        setTimeout(function() {
                            e.getRow().normalizeHeight()
                        }, 300)) : i()
                }
                var a = e.getValue()
                    , r = n.verticalNavigation || "hybrid"
                    , l = String(null !== a && void 0 !== a ? a : "")
                    , c = (l.match(/(?:\r\n|\r|\n)/g),
                    document.createElement("textarea"))
                    , u = 0;
                if (c.style.display = "block",
                    c.style.padding = "2px",
                    c.style.height = "100%",
                    c.style.width = "100%",
                    c.style.boxSizing = "border-box",
                    c.style.whiteSpace = "pre-wrap",
                    c.style.resize = "none",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var d in n.elementAttributes)
                        "+" == d.charAt(0) ? (d = d.slice(1),
                            c.setAttribute(d, c.getAttribute(d) + n.elementAttributes["+" + d])) : c.setAttribute(d, n.elementAttributes[d]);
                return c.value = l,
                    t(function() {
                        c.focus({
                            preventScroll: !0
                        }),
                            c.style.height = "100%",
                            c.scrollHeight,
                            c.style.height = c.scrollHeight + "px",
                            e.getRow().normalizeHeight()
                    }),
                    c.addEventListener("change", s),
                    c.addEventListener("blur", s),
                    c.addEventListener("keyup", function() {
                        c.style.height = "";
                        var t = c.scrollHeight;
                        c.style.height = t + "px",
                        t != u && (u = t,
                            e.getRow().normalizeHeight())
                    }),
                    c.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 27:
                                i();
                                break;
                            case 38:
                                ("editor" == r || "hybrid" == r && c.selectionStart) && (e.stopImmediatePropagation(),
                                    e.stopPropagation());
                                break;
                            case 40:
                                ("editor" == r || "hybrid" == r && c.selectionStart !== c.value.length) && (e.stopImmediatePropagation(),
                                    e.stopPropagation());
                                break;
                            case 35:
                            case 36:
                                e.stopPropagation()
                        }
                    }),
                n.mask && this.table.modules.edit.maskInput(c, n),
                    c
            },
            number: function(e, t, o, i, n) {
                function s() {
                    var e = l.value;
                    isNaN(e) || "" === e || (e = Number(e)),
                        e !== a ? o(e) && (a = e) : i()
                }
                var a = e.getValue()
                    , r = n.verticalNavigation || "editor"
                    , l = document.createElement("input");
                if (l.setAttribute("type", "number"),
                void 0 !== n.max && l.setAttribute("max", n.max),
                void 0 !== n.min && l.setAttribute("min", n.min),
                void 0 !== n.step && l.setAttribute("step", n.step),
                    l.style.padding = "4px",
                    l.style.width = "100%",
                    l.style.boxSizing = "border-box",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var c in n.elementAttributes)
                        "+" == c.charAt(0) ? (c = c.slice(1),
                            l.setAttribute(c, l.getAttribute(c) + n.elementAttributes["+" + c])) : l.setAttribute(c, n.elementAttributes[c]);
                l.value = a;
                var u = function(e) {
                    s()
                };
                return t(function() {
                    l.removeEventListener("blur", u),
                        l.focus({
                            preventScroll: !0
                        }),
                        l.style.height = "100%",
                        l.addEventListener("blur", u)
                }),
                    l.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 13:
                                s();
                                break;
                            case 27:
                                i();
                                break;
                            case 38:
                            case 40:
                                "editor" == r && (e.stopImmediatePropagation(),
                                    e.stopPropagation());
                                break;
                            case 35:
                            case 36:
                                e.stopPropagation()
                        }
                    }),
                n.mask && this.table.modules.edit.maskInput(l, n),
                    l
            },
            range: function(e, t, o, i, n) {
                function s() {
                    var e = r.value;
                    isNaN(e) || "" === e || (e = Number(e)),
                        e != a ? o(e) && (a = e) : i()
                }
                var a = e.getValue()
                    , r = document.createElement("input");
                if (r.setAttribute("type", "range"),
                void 0 !== n.max && r.setAttribute("max", n.max),
                void 0 !== n.min && r.setAttribute("min", n.min),
                void 0 !== n.step && r.setAttribute("step", n.step),
                    r.style.padding = "4px",
                    r.style.width = "100%",
                    r.style.boxSizing = "border-box",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var l in n.elementAttributes)
                        "+" == l.charAt(0) ? (l = l.slice(1),
                            r.setAttribute(l, r.getAttribute(l) + n.elementAttributes["+" + l])) : r.setAttribute(l, n.elementAttributes[l]);
                return r.value = a,
                    t(function() {
                        r.focus({
                            preventScroll: !0
                        }),
                            r.style.height = "100%"
                    }),
                    r.addEventListener("blur", function(e) {
                        s()
                    }),
                    r.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 13:
                                s();
                                break;
                            case 27:
                                i()
                        }
                    }),
                    r
            },
            select: function(e, t, o, i, n) {
                function s(t) {
                    var o, i = {}, n = x.table.getData();
                    return o = t ? x.table.columnManager.getColumnByField(t) : e.getColumn()._getSelf(),
                        o ? n.forEach(function(e) {
                            var t = o.getFieldValue(e);
                            null !== t && void 0 !== t && "" !== t && (i[t] = !0)
                        }) : console.warn("unable to find matching column to create select lookup list:", t),
                        Object.keys(i)
                }
                function a(t, o) {
                    function i(e) {
                        var e = {
                            label: e.label,
                            value: e.value,
                            itemParams: e.itemParams,
                            elementAttributes: e.elementAttributes,
                            element: !1
                        };
                        return o.indexOf(e.value) > -1 && c(e),
                            s.push(e),
                            a.push(e),
                            e
                    }
                    var s = []
                        , a = [];
                    if ("function" == typeof t && (t = t(e)),
                        Array.isArray(t))
                        t.forEach(function(e) {
                            var t;
                            "object" === (void 0 === e ? "undefined" : _typeof(e)) ? e.options ? (t = {
                                label: e.label,
                                group: !0,
                                itemParams: e.itemParams,
                                elementAttributes: e.elementAttributes,
                                element: !1
                            },
                                a.push(t),
                                e.options.forEach(function(e) {
                                    i(e)
                                })) : i(e) : (t = {
                                label: e,
                                value: e,
                                element: !1
                            },
                            o.indexOf(t.value) > -1 && c(t),
                                s.push(t),
                                a.push(t))
                        });
                    else
                        for (var l in t) {
                            var u = {
                                label: t[l],
                                value: l,
                                element: !1
                            };
                            o.indexOf(u.value) > -1 && c(u),
                                s.push(u),
                                a.push(u)
                        }
                    n.sortValuesList && (s.sort(function(e, t) {
                        return e.label < t.label ? -1 : e.label > t.label ? 1 : 0
                    }),
                        a.sort(function(e, t) {
                            return e.label < t.label ? -1 : e.label > t.label ? 1 : 0
                        }),
                    "asc" !== n.sortValuesList && (s.reverse(),
                        a.reverse())),
                        S = s,
                        P = a,
                        r()
                }
                function r() {
                    for (; k.firstChild; )
                        k.removeChild(k.firstChild);
                    P.forEach(function(t) {
                        var o = t.element;
                        if (!o) {
                            if (o = document.createElement("div"),
                                t.label = n.listItemFormatter ? n.listItemFormatter(t.value, t.label, e, o, t.itemParams) : t.label,
                                t.group ? (o.classList.add("tabulator-edit-select-list-group"),
                                    o.tabIndex = 0,
                                    o.innerHTML = "" === t.label ? "&nbsp;" : t.label) : (o.classList.add("tabulator-edit-select-list-item"),
                                    o.tabIndex = 0,
                                    o.innerHTML = "" === t.label ? "&nbsp;" : t.label,
                                    o.addEventListener("click", function() {
                                        F = !0,
                                            setTimeout(function() {
                                                F = !1
                                            }, 10),
                                            z ? (d(t),
                                                T.focus()) : p(t)
                                    }),
                                A.indexOf(t) > -1 && o.classList.add("active")),
                            t.elementAttributes && "object" == _typeof(t.elementAttributes))
                                for (var i in t.elementAttributes)
                                    "+" == i.charAt(0) ? (i = i.slice(1),
                                        o.setAttribute(i, T.getAttribute(i) + t.elementAttributes["+" + i])) : o.setAttribute(i, t.elementAttributes[i]);
                            o.addEventListener("mousedown", function() {
                                _ = !1,
                                    setTimeout(function() {
                                        _ = !0
                                    }, 10)
                            }),
                                t.element = o
                        }
                        k.appendChild(o)
                    })
                }
                function l(e, t) {
                    !z && H && H.element && H.element.classList.remove("active"),
                    H && H.element && H.element.classList.remove("focused"),
                        H = e,
                    e.element && (e.element.classList.add("focused"),
                    t && e.element.classList.add("active")),
                    e && e.element && e.element.scrollIntoView && e.element.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start"
                    })
                }
                function c(e) {
                    -1 == A.indexOf(e) && (A.push(e),
                        l(e, !0)),
                        f()
                }
                function u(e) {
                    var t = A[e];
                    e > -1 && (A.splice(e, 1),
                    t.element && t.element.classList.remove("active"))
                }
                function d(e) {
                    e || (e = H);
                    var t = A.indexOf(e);
                    t > -1 ? u(t) : (!0 !== z && A.length >= z && u(0),
                        c(e)),
                        f()
                }
                function p(e) {
                    y(),
                    e || (e = H),
                    e && (T.value = e.label,
                        o(e.value)),
                        D = [e.value]
                }
                function m(e) {
                    e || y();
                    var t = [];
                    A.forEach(function(e) {
                        t.push(e.value)
                    }),
                        D = t,
                        o(t)
                }
                function f() {
                    var e = [];
                    A.forEach(function(t) {
                        e.push(t.label)
                    }),
                        T.value = e.join(", "),
                    !1 === x.currentCell && m(!0)
                }
                function g() {
                    for (var e = A.length, t = 0; t < e; t++)
                        u(0)
                }
                function b() {
                    y(),
                        i()
                }
                function v() {
                    if (A = [],
                        !k.parentNode) {
                        !0 === n.values ? a(s(), D) : "string" == typeof n.values ? a(s(n.values), D) : a(n.values || [], D);
                        var e = h.prototype.helpers.elOffset(R);
                        k.style.minWidth = R.offsetWidth + "px",
                            k.style.top = e.top + R.offsetHeight + "px",
                            k.style.left = e.left + "px",
                            k.addEventListener("mousedown", function(e) {
                                _ = !1,
                                    setTimeout(function() {
                                        _ = !0
                                    }, 10)
                            }),
                            document.body.appendChild(k)
                    }
                }
                function y() {
                    k.parentNode && k.parentNode.removeChild(k),
                        w()
                }
                function w() {
                    x.table.rowManager.element.removeEventListener("scroll", b)
                }
                function E(e) {
                    clearTimeout(B);
                    var t = String.fromCharCode(event.keyCode).toLowerCase();
                    N += t.toLowerCase();
                    var o = S.find(function(e) {
                        return void 0 !== e.label && e.label.toLowerCase().startsWith(N)
                    });
                    o && l(o, !z),
                        B = setTimeout(function() {
                            N = ""
                        }, 800)
                }
                var C = this
                    , x = this
                    , R = e.getElement()
                    , M = e.getValue()
                    , L = n.verticalNavigation || "editor"
                    , D = void 0 !== M || null === M ? Array.isArray(M) ? M : [M] : void 0 !== n.defaultValue ? n.defaultValue : []
                    , T = document.createElement("input")
                    , k = document.createElement("div")
                    , z = n.multiselect
                    , S = []
                    , H = {}
                    , P = []
                    , A = []
                    , _ = !0
                    , F = !1
                    , N = ""
                    , B = null;
                if ((Array.isArray(n) || !Array.isArray(n) && "object" === (void 0 === n ? "undefined" : _typeof(n)) && !n.values) && (console.warn("DEPRECATION WARNING - values for the select editor must now be passed into the values property of the editorParams object, not as the editorParams object"),
                    n = {
                        values: n
                    }),
                    T.setAttribute("type", "text"),
                    T.style.padding = "4px",
                    T.style.width = "100%",
                    T.style.boxSizing = "border-box",
                    T.style.cursor = "default",
                    T.readOnly = 0 != this.currentCell,
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var O in n.elementAttributes)
                        "+" == O.charAt(0) ? (O = O.slice(1),
                            T.setAttribute(O, T.getAttribute(O) + n.elementAttributes["+" + O])) : T.setAttribute(O, n.elementAttributes[O]);
                return T.value = void 0 !== M || null === M ? M : "",
                    T.addEventListener("search", function(e) {
                        T.value || (g(),
                            m())
                    }),
                    T.addEventListener("keydown", function(e) {
                        var t;
                        switch (e.keyCode) {
                            case 38:
                                t = S.indexOf(H),
                                ("editor" == L || "hybrid" == L && t) && (e.stopImmediatePropagation(),
                                    e.stopPropagation(),
                                    e.preventDefault(),
                                t > 0 && l(S[t - 1], !z));
                                break;
                            case 40:
                                t = S.indexOf(H),
                                ("editor" == L || "hybrid" == L && t < S.length - 1) && (e.stopImmediatePropagation(),
                                    e.stopPropagation(),
                                    e.preventDefault(),
                                t < S.length - 1 && (-1 == t ? l(S[0], !z) : l(S[t + 1], !z)));
                                break;
                            case 37:
                            case 39:
                                e.stopImmediatePropagation(),
                                    e.stopPropagation(),
                                    e.preventDefault();
                                break;
                            case 13:
                                z ? d() : p();
                                break;
                            case 27:
                                b();
                                break;
                            case 9:
                                break;
                            default:
                                !1 === x.currentCell && e.preventDefault(),
                                e.keyCode >= 38 && e.keyCode <= 90 && E(e.keyCode)
                        }
                    }),
                    T.addEventListener("blur", function(e) {
                        _ && (z ? m() : b())
                    }),
                    T.addEventListener("focus", function(e) {
                        F || v()
                    }),
                    k = document.createElement("div"),
                    k.classList.add("tabulator-edit-select-list"),
                    t(function() {
                        T.style.height = "100%",
                            T.focus({
                                preventScroll: !0
                            })
                    }),
                    setTimeout(function() {
                        C.table.rowManager.element.addEventListener("scroll", b)
                    }, 10),
                    T
            },
            autocomplete: function(e, t, o, i, n) {
                function s() {
                    !0 === n.values ? S = a() : "string" == typeof n.values && (S = a(n.values))
                }
                function a(t) {
                    var o, i = {}, s = E.table.getData();
                    return o = t ? E.table.columnManager.getColumnByField(t) : e.getColumn()._getSelf(),
                        o ? (s.forEach(function(e) {
                            var t = o.getFieldValue(e);
                            null !== t && void 0 !== t && "" !== t && (i[t] = !0)
                        }),
                            i = n.sortValuesList ? "asc" == n.sortValuesList ? Object.keys(i).sort() : Object.keys(i).sort().reverse() : Object.keys(i)) : console.warn("unable to find matching column to create autocomplete lookup list:", t),
                        i
                }
                function r(e, t) {
                    var o, i, s = [];
                    o = S || (n.values || []),
                        n.searchFunc ? (s = n.searchFunc(e, o),
                            s instanceof Promise ? (l(void 0 !== n.searchingPlaceholder ? n.searchingPlaceholder : "Searching..."),
                                s.then(function(e) {
                                    d(c(e), t)
                                }).catch(function(e) {
                                    console.err("error in autocomplete search promise:", e)
                                })) : d(c(s), t)) : (i = c(o),
                            "" === e ? n.showListOnEmpty && (s = i) : i.forEach(function(t) {
                                null === t.value && void 0 === t.value || (String(t.value).toLowerCase().indexOf(String(e).toLowerCase()) > -1 || String(t.title).toLowerCase().indexOf(String(e).toLowerCase()) > -1) && s.push(t)
                            }),
                            d(s, t))
                }
                function l(e) {
                    var t = document.createElement("div");
                    u(),
                    !1 !== e && (t.classList.add("tabulator-edit-select-list-notice"),
                        t.tabIndex = 0,
                        e instanceof Node ? t.appendChild(e) : t.innerHTML = e,
                        D.appendChild(t))
                }
                function c(e) {
                    var t = [];
                    if (Array.isArray(e))
                        e.forEach(function(e) {
                            var o = {};
                            "object" === (void 0 === e ? "undefined" : _typeof(e)) ? (o.title = n.listItemFormatter ? n.listItemFormatter(e.value, e.label) : e.label,
                                o.value = e.value) : (o.title = n.listItemFormatter ? n.listItemFormatter(e, e) : e,
                                o.value = e),
                                t.push(o)
                        });
                    else
                        for (var o in e) {
                            var i = {
                                title: n.listItemFormatter ? n.listItemFormatter(o, e[o]) : e[o],
                                value: o
                            };
                            t.push(i)
                        }
                    return t
                }
                function u() {
                    for (; D.firstChild; )
                        D.removeChild(D.firstChild)
                }
                function d(e, t) {
                    e.length ? p(e, t) : n.emptyPlaceholder && l(n.emptyPlaceholder)
                }
                function p(e, t) {
                    var o = !1;
                    u(),
                        T = e,
                        T.forEach(function(e) {
                            var i = e.element;
                            i || (i = document.createElement("div"),
                                i.classList.add("tabulator-edit-select-list-item"),
                                i.tabIndex = 0,
                                i.innerHTML = e.title,
                                i.addEventListener("click", function(t) {
                                    g(e),
                                        m()
                                }),
                                i.addEventListener("mousedown", function(e) {
                                    z = !1,
                                        setTimeout(function() {
                                            z = !0
                                        }, 10)
                                }),
                                e.element = i,
                            t && e.value == x && (L.value = e.title,
                                e.element.classList.add("active"),
                                o = !0),
                            e === k && (e.element.classList.add("active"),
                                o = !0)),
                                D.appendChild(i)
                        }),
                    o || g(!1)
                }
                function m() {
                    b(),
                        k ? x !== k.value ? (x = k.value,
                            L.value = k.title,
                            o(k.value)) : i() : n.freetext ? (x = L.value,
                            o(L.value)) : n.allowEmpty && "" === L.value ? (x = L.value,
                            o(L.value)) : i()
                }
                function f() {
                    if (!D.parentNode) {
                        for (console.log("show", M); D.firstChild; )
                            D.removeChild(D.firstChild);
                        var e = h.prototype.helpers.elOffset(C);
                        D.style.minWidth = C.offsetWidth + "px",
                            D.style.top = e.top + C.offsetHeight + "px",
                            D.style.left = e.left + "px",
                            document.body.appendChild(D)
                    }
                }
                function g(e, t) {
                    k && k.element && k.element.classList.remove("active"),
                        k = e,
                    e && e.element && e.element.classList.add("active"),
                    e && e.element && e.element.scrollIntoView && e.element.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start"
                    })
                }
                function b() {
                    D.parentNode && D.parentNode.removeChild(D),
                        y()
                }
                function v() {
                    b(),
                        i()
                }
                function y() {
                    E.table.rowManager.element.removeEventListener("scroll", v)
                }
                var w = this
                    , E = this
                    , C = e.getElement()
                    , x = e.getValue()
                    , R = n.verticalNavigation || "editor"
                    , M = void 0 !== x || null === x ? x : void 0 !== n.defaultValue ? n.defaultValue : ""
                    , L = document.createElement("input")
                    , D = document.createElement("div")
                    , T = []
                    , k = !1
                    , z = !0
                    , S = !1;
                if (L.setAttribute("type", "search"),
                    L.style.padding = "4px",
                    L.style.width = "100%",
                    L.style.boxSizing = "border-box",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var H in n.elementAttributes)
                        "+" == H.charAt(0) ? (H = H.slice(1),
                            L.setAttribute(H, L.getAttribute(H) + n.elementAttributes["+" + H])) : L.setAttribute(H, n.elementAttributes[H]);
                return D.classList.add("tabulator-edit-select-list"),
                    D.addEventListener("mousedown", function(e) {
                        z = !1,
                            setTimeout(function() {
                                z = !0
                            }, 10)
                    }),
                    L.addEventListener("keydown", function(e) {
                        var t;
                        switch (e.keyCode) {
                            case 38:
                                t = T.indexOf(k),
                                ("editor" == R || "hybrid" == R && t) && (e.stopImmediatePropagation(),
                                    e.stopPropagation(),
                                    e.preventDefault(),
                                    g(t > 0 ? T[t - 1] : !1));
                                break;
                            case 40:
                                t = T.indexOf(k),
                                ("editor" == R || "hybrid" == R && t < T.length - 1) && (e.stopImmediatePropagation(),
                                    e.stopPropagation(),
                                    e.preventDefault(),
                                t < T.length - 1 && g(-1 == t ? T[0] : T[t + 1]));
                                break;
                            case 37:
                            case 39:
                                e.stopImmediatePropagation(),
                                    e.stopPropagation();
                                break;
                            case 13:
                                m();
                                break;
                            case 27:
                                v();
                                break;
                            case 36:
                            case 35:
                                e.stopImmediatePropagation()
                        }
                    }),
                    L.addEventListener("keyup", function(e) {
                        switch (e.keyCode) {
                            case 38:
                            case 37:
                            case 39:
                            case 40:
                            case 13:
                            case 27:
                                break;
                            default:
                                r(L.value)
                        }
                    }),
                    L.addEventListener("search", function(e) {
                        r(L.value)
                    }),
                    L.addEventListener("blur", function(e) {
                        z && m()
                    }),
                    L.addEventListener("focus", function(e) {
                        var t = M;
                        s(),
                            f(),
                            L.value = t,
                            r(t, !0)
                    }),
                    t(function() {
                        L.style.height = "100%",
                            L.focus({
                                preventScroll: !0
                            })
                    }),
                n.mask && this.table.modules.edit.maskInput(L, n),
                    setTimeout(function() {
                        w.table.rowManager.element.addEventListener("scroll", v)
                    }, 10),
                    s(),
                    L.value = M,
                    r(M, !0),
                    L
            },
            star: function(e, t, o, i, n) {
                function s(e) {
                    h.forEach(function(t, o) {
                        o < e ? ("ie" == r.table.browser ? t.setAttribute("class", "tabulator-star-active") : t.classList.replace("tabulator-star-inactive", "tabulator-star-active"),
                            t.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>') : ("ie" == r.table.browser ? t.setAttribute("class", "tabulator-star-inactive") : t.classList.replace("tabulator-star-active", "tabulator-star-inactive"),
                            t.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>')
                    })
                }
                function a(e) {
                    c = e,
                        s(e)
                }
                var r = this
                    , l = e.getElement()
                    , c = e.getValue()
                    , u = l.getElementsByTagName("svg").length || 5
                    , d = l.getElementsByTagName("svg")[0] ? l.getElementsByTagName("svg")[0].getAttribute("width") : 14
                    , h = []
                    , p = document.createElement("div")
                    , m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                if (l.style.whiteSpace = "nowrap",
                    l.style.overflow = "hidden",
                    l.style.textOverflow = "ellipsis",
                    p.style.verticalAlign = "middle",
                    p.style.display = "inline-block",
                    p.style.padding = "4px",
                    m.setAttribute("width", d),
                    m.setAttribute("height", d),
                    m.setAttribute("viewBox", "0 0 512 512"),
                    m.setAttribute("xml:space", "preserve"),
                    m.style.padding = "0 1px",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var f in n.elementAttributes)
                        "+" == f.charAt(0) ? (f = f.slice(1),
                            p.setAttribute(f, p.getAttribute(f) + n.elementAttributes["+" + f])) : p.setAttribute(f, n.elementAttributes[f]);
                for (var g = 1; g <= u; g++)
                    !function(e) {
                        var t = document.createElement("span")
                            , i = m.cloneNode(!0);
                        h.push(i),
                            t.addEventListener("mouseenter", function(t) {
                                t.stopPropagation(),
                                    t.stopImmediatePropagation(),
                                    s(e)
                            }),
                            t.addEventListener("mousemove", function(e) {
                                e.stopPropagation(),
                                    e.stopImmediatePropagation()
                            }),
                            t.addEventListener("click", function(t) {
                                t.stopPropagation(),
                                    t.stopImmediatePropagation(),
                                    o(e),
                                    l.blur()
                            }),
                            t.appendChild(i),
                            p.appendChild(t)
                    }(g);
                return c = Math.min(parseInt(c), u),
                    s(c),
                    p.addEventListener("mousemove", function(e) {
                        s(0)
                    }),
                    p.addEventListener("click", function(e) {
                        o(0)
                    }),
                    l.addEventListener("blur", function(e) {
                        i()
                    }),
                    l.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 39:
                                a(c + 1);
                                break;
                            case 37:
                                a(c - 1);
                                break;
                            case 13:
                                o(c);
                                break;
                            case 27:
                                i()
                        }
                    }),
                    p
            },
            progress: function(e, t, o, i, n) {
                function s() {
                    var e = window.getComputedStyle(l, null)
                        , t = d * Math.round(m.offsetWidth / ((l.clientWidth - parseInt(e.getPropertyValue("padding-left")) - parseInt(e.getPropertyValue("padding-right"))) / 100)) + u;
                    o(t),
                        l.setAttribute("aria-valuenow", t),
                        l.setAttribute("aria-label", h)
                }
                var a, r, l = e.getElement(), c = void 0 === n.max ? l.getElementsByTagName("div")[0].getAttribute("max") || 100 : n.max, u = void 0 === n.min ? l.getElementsByTagName("div")[0].getAttribute("min") || 0 : n.min, d = (c - u) / 100, h = e.getValue() || 0, p = document.createElement("div"), m = document.createElement("div");
                if (p.style.position = "absolute",
                    p.style.right = "0",
                    p.style.top = "0",
                    p.style.bottom = "0",
                    p.style.width = "5px",
                    p.classList.add("tabulator-progress-handle"),
                    m.style.display = "inline-block",
                    m.style.position = "relative",
                    m.style.height = "100%",
                    m.style.backgroundColor = "#488CE9",
                    m.style.maxWidth = "100%",
                    m.style.minWidth = "0%",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var f in n.elementAttributes)
                        "+" == f.charAt(0) ? (f = f.slice(1),
                            m.setAttribute(f, m.getAttribute(f) + n.elementAttributes["+" + f])) : m.setAttribute(f, n.elementAttributes[f]);
                return l.style.padding = "4px 4px",
                    h = Math.min(parseFloat(h), c),
                    h = Math.max(parseFloat(h), u),
                    h = Math.round((h - u) / d),
                    m.style.width = h + "%",
                    l.setAttribute("aria-valuemin", u),
                    l.setAttribute("aria-valuemax", c),
                    m.appendChild(p),
                    p.addEventListener("mousedown", function(e) {
                        a = e.screenX,
                            r = m.offsetWidth
                    }),
                    p.addEventListener("mouseover", function() {
                        p.style.cursor = "ew-resize"
                    }),
                    l.addEventListener("mousemove", function(e) {
                        a && (m.style.width = r + e.screenX - a + "px")
                    }),
                    l.addEventListener("mouseup", function(e) {
                        a && (e.stopPropagation(),
                            e.stopImmediatePropagation(),
                            a = !1,
                            r = !1,
                            s())
                    }),
                    l.addEventListener("keydown", function(e) {
                        switch (e.keyCode) {
                            case 39:
                                e.preventDefault(),
                                    m.style.width = m.clientWidth + l.clientWidth / 100 + "px";
                                break;
                            case 37:
                                e.preventDefault(),
                                    m.style.width = m.clientWidth - l.clientWidth / 100 + "px";
                                break;
                            case 9:
                            case 13:
                                s();
                                break;
                            case 27:
                                i()
                        }
                    }),
                    l.addEventListener("blur", function() {
                        i()
                    }),
                    m
            },
            tickCross: function(e, t, o, i, n) {
                function s(e) {
                    return l ? e ? u ? c : r.checked : r.checked && !u ? (r.checked = !1,
                        r.indeterminate = !0,
                        u = !0,
                        c) : (u = !1,
                        r.checked) : r.checked
                }
                var a = e.getValue()
                    , r = document.createElement("input")
                    , l = n.tristate
                    , c = void 0 === n.indeterminateValue ? null : n.indeterminateValue
                    , u = !1;
                if (r.setAttribute("type", "checkbox"),
                    r.style.marginTop = "5px",
                    r.style.boxSizing = "border-box",
                n.elementAttributes && "object" == _typeof(n.elementAttributes))
                    for (var d in n.elementAttributes)
                        "+" == d.charAt(0) ? (d = d.slice(1),
                            r.setAttribute(d, r.getAttribute(d) + n.elementAttributes["+" + d])) : r.setAttribute(d, n.elementAttributes[d]);
                return r.value = a,
                !l || void 0 !== a && a !== c && "" !== a || (u = !0,
                    r.indeterminate = !0),
                "firefox" != this.table.browser && t(function() {
                    r.focus({
                        preventScroll: !0
                    })
                }),
                    r.checked = !0 === a || "true" === a || "True" === a || 1 === a,
                    t(function() {
                        r.focus()
                    }),
                    r.addEventListener("change", function(e) {
                        o(s())
                    }),
                    r.addEventListener("blur", function(e) {
                        o(s(!0))
                    }),
                    r.addEventListener("keydown", function(e) {
                        13 == e.keyCode && o(s()),
                        27 == e.keyCode && i()
                    }),
                    r
            }
        },
        h.prototype.registerModule("edit", x);
    var R = function(e, t, o, i) {
        this.type = e,
            this.columns = t,
            this.component = o || !1,
            this.indent = i || 0
    }
        , M = function(e, t, o, i, n) {
        this.value = e,
            this.component = t || !1,
            this.width = o,
            this.height = i,
            this.depth = n
    }
        , L = function(e) {
        this.table = e,
            this.config = {},
            this.cloneTableStyle = !0,
            this.colVisProp = ""
    };
    L.prototype.generateExportList = function(e, t, o, i) {
        this.cloneTableStyle = t,
            this.config = e || {},
            this.colVisProp = i;
        var n = !1 !== this.config.columnHeaders ? this.headersToExportRows(this.generateColumnGroupHeaders()) : []
            , s = this.bodyToExportRows(this.rowLookup(o));
        return n.concat(s)
    }
        ,
        L.prototype.genereateTable = function(e, t, o, i) {
            var n = this.generateExportList(e, t, o, i);
            return this.genereateTableElement(n)
        }
        ,
        L.prototype.rowLookup = function(e) {
            var t = this
                , o = [];
            if ("function" == typeof e)
                e.call(this.table).forEach(function(e) {
                    (e = t.table.rowManager.findRow(e)) && o.push(e)
                });
            else
                switch (e) {
                    case !0:
                    case "visible":
                        o = this.table.rowManager.getVisibleRows(!0);
                        break;
                    case "all":
                        o = this.table.rowManager.rows;
                        break;
                    case "selected":
                        o = this.table.modules.selectRow.selectedRows;
                        break;
                    case "active":
                    default:
                        o = this.table.options.pagination ? this.table.rowManager.getDisplayRows(this.table.rowManager.displayRows.length - 2) : this.table.rowManager.getDisplayRows()
                }
            return Object.assign([], o)
        }
        ,
        L.prototype.generateColumnGroupHeaders = function() {
            var e = this
                , t = [];
            return (!1 !== this.config.columnGroups ? this.table.columnManager.columns : this.table.columnManager.columnsByIndex).forEach(function(o) {
                var i = e.processColumnGroup(o);
                i && t.push(i)
            }),
                t
        }
        ,
        L.prototype.processColumnGroup = function(e) {
            var t = this
                , o = e.columns
                , i = 0
                , n = e.definition["title" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))] || e.definition.title
                , s = {
                title: n,
                column: e,
                depth: 1
            };
            if (o.length) {
                if (s.subGroups = [],
                    s.width = 0,
                    o.forEach(function(e) {
                        var o = t.processColumnGroup(e);
                        o && (s.width += o.width,
                            s.subGroups.push(o),
                        o.depth > i && (i = o.depth))
                    }),
                    s.depth += i,
                    !s.width)
                    return !1
            } else {
                if (!this.columnVisCheck(e))
                    return !1;
                s.width = 1
            }
            return s
        }
        ,
        L.prototype.columnVisCheck = function(e) {
            return !1 !== e.definition[this.colVisProp] && (e.visible || !e.visible && e.definition[this.colVisProp])
        }
        ,
        L.prototype.headersToExportRows = function(e) {
            function t(e, n) {
                var s = i - n;
                if (void 0 === o[n] && (o[n] = []),
                    e.height = e.subGroups ? 1 : s - e.depth + 1,
                    o[n].push(e),
                e.height > 1)
                    for (var a = 1; a < e.height; a++)
                        void 0 === o[n + a] && (o[n + a] = []),
                            o[n + a].push(!1);
                if (e.width > 1)
                    for (var r = 1; r < e.width; r++)
                        o[n].push(!1);
                e.subGroups && e.subGroups.forEach(function(e) {
                    t(e, n + 1)
                })
            }
            var o = []
                , i = 0
                , n = [];
            return e.forEach(function(e) {
                e.depth > i && (i = e.depth)
            }),
                e.forEach(function(e) {
                    t(e, 0)
                }),
                o.forEach(function(e) {
                    var t = [];
                    e.forEach(function(e) {
                        e ? t.push(new M(e.title,e.column.getComponent(),e.width,e.height,e.depth)) : t.push(null)
                    }),
                        n.push(new R("header",t))
                }),
                n
        }
        ,
        L.prototype.bodyToExportRows = function(e) {
            var t = this
                , o = []
                , i = [];
            return this.table.columnManager.columnsByIndex.forEach(function(e) {
                t.columnVisCheck(e) && o.push(e.getComponent())
            }),
            !1 !== this.config.columnCalcs && this.table.modExists("columnCalcs") && (this.table.modules.columnCalcs.topInitialized && e.unshift(this.table.modules.columnCalcs.topRow),
            this.table.modules.columnCalcs.botInitialized && e.push(this.table.modules.columnCalcs.botRow)),
                e = e.filter(function(e) {
                    switch (e.type) {
                        case "group":
                            return !1 !== t.config.rowGroups;
                        case "calc":
                            return !1 !== t.config.columnCalcs;
                        case "row":
                            return !(t.table.options.dataTree && !1 === t.config.dataTree && e.modules.dataTree.parent)
                    }
                    return !0
                }),
                e.forEach(function(e, n) {
                    var s = e.getData(t.colVisProp)
                        , a = []
                        , r = 0;
                    switch (e.type) {
                        case "group":
                            r = e.level,
                                a.push(new M(e.key,e.getComponent(),o.length,1));
                            break;
                        case "calc":
                        case "row":
                            o.forEach(function(e) {
                                a.push(new M(e._column.getFieldValue(s),e,1,1))
                            }),
                            t.table.options.dataTree && !1 !== t.config.dataTree && (r = e.modules.dataTree.index)
                    }
                    i.push(new R(e.type,a,e.getComponent(),r))
                }),
                i
        }
        ,
        L.prototype.genereateTableElement = function(e) {
            var t = this
                , o = document.createElement("table")
                , i = document.createElement("thead")
                , n = document.createElement("tbody")
                , s = this.lookupTableStyles()
                , a = this.table.options["rowFormatter" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))]
                , r = {};
            return r.rowFormatter = null !== a ? a : this.table.options.rowFormatter,
            this.table.options.dataTree && !1 !== this.config.dataTree && this.table.modExists("columnCalcs") && (r.treeElementField = this.table.modules.dataTree.elementField),
                r.groupHeader = this.table.options["groupHeader" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))],
            r.groupHeader && !Array.isArray(r.groupHeader) && (r.groupHeader = [r.groupHeader]),
                o.classList.add("tabulator-print-table"),
                this.mapElementStyles(this.table.columnManager.getHeadersElement(), i, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]),
            e.length > 1e3 && console.warn("It may take a long time to render an HTML table with more than 1000 rows"),
                e.forEach(function(e, o) {
                    switch (e.type) {
                        case "header":
                            i.appendChild(t.genereateHeaderElement(e, r, s));
                            break;
                        case "group":
                            n.appendChild(t.genereateGroupElement(e, r, s));
                            break;
                        case "calc":
                            n.appendChild(t.genereateCalcElement(e, r, s));
                            break;
                        case "row":
                            var a = t.genereateRowElement(e, r, s);
                            t.mapElementStyles(o % 2 && s.evenRow ? s.evenRow : s.oddRow, a, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]),
                                n.appendChild(a)
                    }
                }),
            i.innerHTML && o.appendChild(i),
                o.appendChild(n),
                this.mapElementStyles(this.table.element, o, ["border-top", "border-left", "border-right", "border-bottom"]),
                o
        }
        ,
        L.prototype.lookupTableStyles = function() {
            var e = {};
            return this.cloneTableStyle && window.getComputedStyle && (e.oddRow = this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)"),
                e.evenRow = this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)"),
                e.calcRow = this.table.element.querySelector(".tabulator-row.tabulator-calcs"),
                e.firstRow = this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)"),
                e.firstGroup = this.table.element.getElementsByClassName("tabulator-group")[0],
            e.firstRow && (e.styleCells = e.firstRow.getElementsByClassName("tabulator-cell"),
                e.firstCell = e.styleCells[0],
                e.lastCell = e.styleCells[e.styleCells.length - 1])),
                e
        }
        ,
        L.prototype.genereateHeaderElement = function(e, t, o) {
            var i = this
                , n = document.createElement("tr");
            return e.columns.forEach(function(e) {
                if (e) {
                    var t = document.createElement("th")
                        , o = e.component._column.definition.cssClass ? e.component._column.definition.cssClass.split(" ") : [];
                    t.colSpan = e.width,
                        t.rowSpan = e.height,
                        t.innerHTML = e.value,
                    i.cloneTableStyle && (t.style.boxSizing = "border-box"),
                        o.forEach(function(e) {
                            t.classList.add(e)
                        }),
                        i.mapElementStyles(e.component.getElement(), t, ["text-align", "border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]),
                        i.mapElementStyles(e.component._column.contentElement, t, ["padding-top", "padding-left", "padding-right", "padding-bottom"]),
                        e.component._column.visible ? i.mapElementStyles(e.component.getElement(), t, ["width"]) : e.component._column.definition.width && (t.style.width = e.component._column.definition.width + "px"),
                    e.component._column.parent && i.mapElementStyles(e.component._column.parent.groupElement, t, ["border-top"]),
                        n.appendChild(t)
                }
            }),
                n
        }
        ,
        L.prototype.genereateGroupElement = function(e, t, o) {
            var i = document.createElement("tr")
                , n = document.createElement("td")
                , s = e.columns[0];
            return i.classList.add("tabulator-print-table-row"),
                t.groupHeader && t.groupHeader[e.indent] ? s.value = t.groupHeader[e.indent](s.value, e.component._group.getRowCount(), e.component._group.getData(), e.component) : !1 === t.groupHeader ? s.value = s.value : s.value = e.component._group.generator(s.value, e.component._group.getRowCount(), e.component._group.getData(), e.component),
                n.colSpan = s.width,
                n.innerHTML = s.value,
                i.classList.add("tabulator-print-table-group"),
                i.classList.add("tabulator-group-level-" + e.indent),
            s.component.isVisible() && i.classList.add("tabulator-group-visible"),
                this.mapElementStyles(o.firstGroup, i, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]),
                this.mapElementStyles(o.firstGroup, n, ["padding-top", "padding-left", "padding-right", "padding-bottom"]),
                i.appendChild(n),
                i
        }
        ,
        L.prototype.genereateCalcElement = function(e, t, o) {
            var i = this.genereateRowElement(e, t, o);
            return i.classList.add("tabulator-print-table-calcs"),
                this.mapElementStyles(o.calcRow, i, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]),
                i
        }
        ,
        L.prototype.genereateRowElement = function(e, t, o) {
            var n = this
                , s = document.createElement("tr");
            return s.classList.add("tabulator-print-table-row"),
                e.columns.forEach(function(a) {
                    if (a) {
                        var r = document.createElement("td")
                            , l = a.component._column
                            , c = a.value
                            , u = {
                            modules: {},
                            getValue: function() {
                                return c
                            },
                            getField: function() {
                                return l.definition.field
                            },
                            getElement: function() {
                                return r
                            },
                            getColumn: function() {
                                return l.getComponent()
                            },
                            getData: function() {
                                return e.component.getData()
                            },
                            getRow: function() {
                                return e.component
                            },
                            getComponent: function() {
                                return u
                            },
                            column: l
                        };
                        if ((l.definition.cssClass ? l.definition.cssClass.split(" ") : []).forEach(function(e) {
                            r.classList.add(e)
                        }),
                        n.table.modExists("format") && !1 !== n.config.formatCells)
                            c = n.table.modules.format.formatExportValue(u, n.colVisProp);
                        else
                            switch (void 0 === c ? "undefined" : _typeof(c)) {
                                case "object":
                                    c = JSON.stringify(c);
                                    break;
                                case "undefined":
                                case "null":
                                    c = "";
                                    break;
                                default:
                                    c = c
                            }
                        c instanceof Node ? r.appendChild(c) : r.innerHTML = c,
                        o.firstCell && (n.mapElementStyles(o.firstCell, r, ["padding-top", "padding-left", "padding-right", "padding-bottom", "border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size"]),
                        l.definition.align && (r.style.textAlign = l.definition.align)),
                        n.table.options.dataTree && !1 !== n.config.dataTree && (t.treeElementField && t.treeElementField == l.field || !t.treeElementField && 0 == i) && (e.component._row.modules.dataTree.controlEl && r.insertBefore(e.component._row.modules.dataTree.controlEl.cloneNode(!0), r.firstChild),
                        e.component._row.modules.dataTree.branchEl && r.insertBefore(e.component._row.modules.dataTree.branchEl.cloneNode(!0), r.firstChild)),
                            s.appendChild(r),
                        u.modules.format && u.modules.format.renderedCallback && u.modules.format.renderedCallback(),
                        t.rowFormatter && !1 !== n.config.formatCells && t.rowFormatter(e.component)
                    }
                }),
                s
        }
        ,
        L.prototype.genereateHTMLTable = function(e) {
            var t = document.createElement("div");
            return t.appendChild(this.genereateTableElement(e)),
                t.innerHTML
        }
        ,
        L.prototype.getHtml = function(e, t, o, i) {
            var n = this.generateExportList(o || this.table.options.htmlOutputConfig, t, e, i || "htmlOutput");
            return this.genereateHTMLTable(n)
        }
        ,
        L.prototype.mapElementStyles = function(e, t, o) {
            if (this.cloneTableStyle && e && t) {
                var i = {
                    "background-color": "backgroundColor",
                    color: "fontColor",
                    width: "width",
                    "font-weight": "fontWeight",
                    "font-family": "fontFamily",
                    "font-size": "fontSize",
                    "text-align": "textAlign",
                    "border-top": "borderTop",
                    "border-left": "borderLeft",
                    "border-right": "borderRight",
                    "border-bottom": "borderBottom",
                    "padding-top": "paddingTop",
                    "padding-left": "paddingLeft",
                    "padding-right": "paddingRight",
                    "padding-bottom": "paddingBottom"
                };
                if (window.getComputedStyle) {
                    var n = window.getComputedStyle(e);
                    o.forEach(function(e) {
                        t.style[i[e]] = n.getPropertyValue(e)
                    })
                }
            }
        }
        ,
        h.prototype.registerModule("export", L);
    var D = function(e) {
        this.table = e,
            this.filterList = [],
            this.headerFilters = {},
            this.headerFilterColumns = [],
            this.prevHeaderFilterChangeCheck = "",
            this.prevHeaderFilterChangeCheck = "{}",
            this.changed = !1
    };
    D.prototype.initializeColumn = function(e, t) {
        function o(t) {
            var o, a = "input" == e.modules.filter.tagType && "text" == e.modules.filter.attrType || "textarea" == e.modules.filter.tagType ? "partial" : "match", r = "", l = "";
            if (void 0 === e.modules.filter.prevSuccess || e.modules.filter.prevSuccess !== t) {
                if (e.modules.filter.prevSuccess = t,
                    e.modules.filter.emptyFunc(t))
                    delete n.headerFilters[s];
                else {
                    switch (e.modules.filter.value = t,
                        _typeof(e.definition.headerFilterFunc)) {
                        case "string":
                            n.filters[e.definition.headerFilterFunc] ? (r = e.definition.headerFilterFunc,
                                    o = function(o) {
                                        var i = e.definition.headerFilterFuncParams || {}
                                            , s = e.getFieldValue(o);
                                        return i = "function" == typeof i ? i(t, s, o) : i,
                                            n.filters[e.definition.headerFilterFunc](t, s, o, i)
                                    }
                            ) : console.warn("Header Filter Error - Matching filter function not found: ", e.definition.headerFilterFunc);
                            break;
                        case "function":
                            o = function(o) {
                                var i = e.definition.headerFilterFuncParams || {}
                                    , n = e.getFieldValue(o);
                                return i = "function" == typeof i ? i(t, n, o) : i,
                                    e.definition.headerFilterFunc(t, n, o, i)
                            }
                                ,
                                r = o
                    }
                    if (!o)
                        switch (a) {
                            case "partial":
                                o = function(o) {
                                    var i = e.getFieldValue(o);
                                    return void 0 !== i && null !== i && String(i).toLowerCase().indexOf(String(t).toLowerCase()) > -1
                                }
                                    ,
                                    r = "like";
                                break;
                            default:
                                o = function(o) {
                                    return e.getFieldValue(o) == t
                                }
                                    ,
                                    r = "="
                        }
                    n.headerFilters[s] = {
                        value: t,
                        func: o,
                        type: r,
                        params: i || {}
                    }
                }
                l = JSON.stringify(n.headerFilters),
                n.prevHeaderFilterChangeCheck !== l && (n.prevHeaderFilterChangeCheck = l,
                    n.changed = !0,
                    n.table.rowManager.filterRefresh())
            }
            return !0
        }
        var i, n = this, s = e.getField();
        e.modules.filter = {
            success: o,
            attrType: !1,
            tagType: !1,
            emptyFunc: !1
        },
            this.generateHeaderFilterElement(e)
    }
        ,
        D.prototype.generateHeaderFilterElement = function(e, t, o) {
            function i() {}
            var n, s, a, r, l, c, u, d = this, h = this, p = e.modules.filter.success, m = e.getField();
            if (e.modules.filter.headerElement && e.modules.filter.headerElement.parentNode && e.contentElement.removeChild(e.modules.filter.headerElement.parentNode),
                m) {
                switch (e.modules.filter.emptyFunc = e.definition.headerFilterEmptyCheck || function(e) {
                    return !e && "0" !== e && 0 !== e
                }
                    ,
                    n = document.createElement("div"),
                    n.classList.add("tabulator-header-filter"),
                    _typeof(e.definition.headerFilter)) {
                    case "string":
                        h.table.modules.edit.editors[e.definition.headerFilter] ? (s = h.table.modules.edit.editors[e.definition.headerFilter],
                        "tick" !== e.definition.headerFilter && "tickCross" !== e.definition.headerFilter || e.definition.headerFilterEmptyCheck || (e.modules.filter.emptyFunc = function(e) {
                                return !0 !== e && !1 !== e
                            }
                        )) : console.warn("Filter Error - Cannot build header filter, No such editor found: ", e.definition.editor);
                        break;
                    case "function":
                        s = e.definition.headerFilter;
                        break;
                    case "boolean":
                        e.modules.edit && e.modules.edit.editor ? s = e.modules.edit.editor : e.definition.formatter && h.table.modules.edit.editors[e.definition.formatter] ? (s = h.table.modules.edit.editors[e.definition.formatter],
                        "tick" !== e.definition.formatter && "tickCross" !== e.definition.formatter || e.definition.headerFilterEmptyCheck || (e.modules.filter.emptyFunc = function(e) {
                                return !0 !== e && !1 !== e
                            }
                        )) : s = h.table.modules.edit.editors.input
                }
                if (s) {
                    if (r = {
                        getValue: function() {
                            return void 0 !== t ? t : ""
                        },
                        getField: function() {
                            return e.definition.field
                        },
                        getElement: function() {
                            return n
                        },
                        getColumn: function() {
                            return e.getComponent()
                        },
                        getRow: function() {
                            return {
                                normalizeHeight: function() {}
                            }
                        }
                    },
                        u = e.definition.headerFilterParams || {},
                        u = "function" == typeof u ? u.call(h.table) : u,
                        !(a = s.call(this.table.modules.edit, r, function() {}, p, i, u)))
                        return void console.warn("Filter Error - Cannot add filter to " + m + " column, editor returned a value of false");
                    if (!(a instanceof Node))
                        return void console.warn("Filter Error - Cannot add filter to " + m + " column, editor should return an instance of Node, the editor returned:", a);
                    m ? h.table.modules.localize.bind("headerFilters|columns|" + e.definition.field, function(e) {
                        a.setAttribute("placeholder", void 0 !== e && e ? e : h.table.modules.localize.getText("headerFilters|default"))
                    }) : h.table.modules.localize.bind("headerFilters|default", function(e) {
                        a.setAttribute("placeholder", void 0 !== h.column.definition.headerFilterPlaceholder && h.column.definition.headerFilterPlaceholder ? h.column.definition.headerFilterPlaceholder : e)
                    }),
                        a.addEventListener("click", function(e) {
                            e.stopPropagation(),
                                a.focus()
                        }),
                        a.addEventListener("focus", function(e) {
                            var t = d.table.columnManager.element.scrollLeft;
                            t !== d.table.rowManager.element.scrollLeft && (d.table.rowManager.scrollHorizontal(t),
                                d.table.columnManager.scrollHorizontal(t))
                        }),
                        l = !1,
                        c = function(e) {
                            l && clearTimeout(l),
                                l = setTimeout(function() {
                                    p(a.value)
                                }, h.table.options.headerFilterLiveFilterDelay)
                        }
                        ,
                        e.modules.filter.headerElement = a,
                        e.modules.filter.attrType = a.hasAttribute("type") ? a.getAttribute("type").toLowerCase() : "",
                        e.modules.filter.tagType = a.tagName.toLowerCase(),
                    !1 !== e.definition.headerFilterLiveFilter && ("autocomplete" !== e.definition.headerFilter && "tickCross" !== e.definition.headerFilter && ("autocomplete" !== e.definition.editor && "tickCross" !== e.definition.editor || !0 !== e.definition.headerFilter) && (a.addEventListener("keyup", c),
                        a.addEventListener("search", c),
                    "number" == e.modules.filter.attrType && a.addEventListener("change", function(e) {
                        p(a.value)
                    }),
                    "text" == e.modules.filter.attrType && "ie" !== this.table.browser && a.setAttribute("type", "search")),
                    "input" != e.modules.filter.tagType && "select" != e.modules.filter.tagType && "textarea" != e.modules.filter.tagType || a.addEventListener("mousedown", function(e) {
                        e.stopPropagation()
                    })),
                        n.appendChild(a),
                        e.contentElement.appendChild(n),
                    o || h.headerFilterColumns.push(e)
                }
            } else
                console.warn("Filter Error - Cannot add header filter, column has no field set:", e.definition.title)
        }
        ,
        D.prototype.hideHeaderFilterElements = function() {
            this.headerFilterColumns.forEach(function(e) {
                e.modules.filter && e.modules.filter.headerElement && (e.modules.filter.headerElement.style.display = "none")
            })
        }
        ,
        D.prototype.showHeaderFilterElements = function() {
            this.headerFilterColumns.forEach(function(e) {
                e.modules.filter && e.modules.filter.headerElement && (e.modules.filter.headerElement.style.display = "")
            })
        }
        ,
        D.prototype.setHeaderFilterFocus = function(e) {
            e.modules.filter && e.modules.filter.headerElement ? e.modules.filter.headerElement.focus() : console.warn("Column Filter Focus Error - No header filter set on column:", e.getField())
        }
        ,
        D.prototype.getHeaderFilterValue = function(e) {
            if (e.modules.filter && e.modules.filter.headerElement)
                return e.modules.filter.headerElement.value;
            console.warn("Column Filter Error - No header filter set on column:", e.getField())
        }
        ,
        D.prototype.setHeaderFilterValue = function(e, t) {
            e && (e.modules.filter && e.modules.filter.headerElement ? (this.generateHeaderFilterElement(e, t, !0),
                e.modules.filter.success(t)) : console.warn("Column Filter Error - No header filter set on column:", e.getField()))
        }
        ,
        D.prototype.reloadHeaderFilter = function(e) {
            e && (e.modules.filter && e.modules.filter.headerElement ? this.generateHeaderFilterElement(e, e.modules.filter.value, !0) : console.warn("Column Filter Error - No header filter set on column:", e.getField()))
        }
        ,
        D.prototype.hasChanged = function() {
            var e = this.changed;
            return this.changed = !1,
                e
        }
        ,
        D.prototype.setFilter = function(e, t, o, i) {
            var n = this;
            n.filterList = [],
            Array.isArray(e) || (e = [{
                field: e,
                type: t,
                value: o,
                params: i
            }]),
                n.addFilter(e)
        }
        ,
        D.prototype.addFilter = function(e, t, o, i) {
            var n = this;
            Array.isArray(e) || (e = [{
                field: e,
                type: t,
                value: o,
                params: i
            }]),
                e.forEach(function(e) {
                    (e = n.findFilter(e)) && (n.filterList.push(e),
                        n.changed = !0)
                }),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.filter && this.table.modules.persistence.save("filter")
        }
        ,
        D.prototype.findFilter = function(e) {
            var t, o = this;
            if (Array.isArray(e))
                return this.findSubFilters(e);
            var i = !1;
            return "function" == typeof e.field ? i = function(t) {
                    return e.field(t, e.type || {})
                }
                : o.filters[e.type] ? (t = o.table.columnManager.getColumnByField(e.field),
                        i = t ? function(i) {
                                return o.filters[e.type](e.value, t.getFieldValue(i), i, e.params || {})
                            }
                            : function(t) {
                                return o.filters[e.type](e.value, t[e.field], t, e.params || {})
                            }
                ) : console.warn("Filter Error - No such filter type found, ignoring: ", e.type),
                e.func = i,
            !!e.func && e
        }
        ,
        D.prototype.findSubFilters = function(e) {
            var t = this
                , o = [];
            return e.forEach(function(e) {
                (e = t.findFilter(e)) && o.push(e)
            }),
            !!o.length && o
        }
        ,
        D.prototype.getFilters = function(e, t) {
            var o = [];
            return e && (o = this.getHeaderFilters()),
            t && o.forEach(function(e) {
                "function" == typeof e.type && (e.type = "function")
            }),
                o = o.concat(this.filtersToArray(this.filterList, t))
        }
        ,
        D.prototype.filtersToArray = function(e, t) {
            var o = this
                , i = [];
            return e.forEach(function(e) {
                var n;
                Array.isArray(e) ? i.push(o.filtersToArray(e, t)) : (n = {
                    field: e.field,
                    type: e.type,
                    value: e.value
                },
                t && "function" == typeof n.type && (n.type = "function"),
                    i.push(n))
            }),
                i
        }
        ,
        D.prototype.getHeaderFilters = function() {
            var e = [];
            for (var t in this.headerFilters)
                e.push({
                    field: t,
                    type: this.headerFilters[t].type,
                    value: this.headerFilters[t].value
                });
            return e
        }
        ,
        D.prototype.removeFilter = function(e, t, o) {
            var i = this;
            Array.isArray(e) || (e = [{
                field: e,
                type: t,
                value: o
            }]),
                e.forEach(function(e) {
                    var t = -1;
                    t = "object" == _typeof(e.field) ? i.filterList.findIndex(function(t) {
                        return e === t
                    }) : i.filterList.findIndex(function(t) {
                        return e.field === t.field && e.type === t.type && e.value === t.value
                    }),
                        t > -1 ? (i.filterList.splice(t, 1),
                            i.changed = !0) : console.warn("Filter Error - No matching filter type found, ignoring: ", e.type)
                }),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.filter && this.table.modules.persistence.save("filter")
        }
        ,
        D.prototype.clearFilter = function(e) {
            this.filterList = [],
            e && this.clearHeaderFilter(),
                this.changed = !0,
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.filter && this.table.modules.persistence.save("filter")
        }
        ,
        D.prototype.clearHeaderFilter = function() {
            var e = this;
            this.headerFilters = {},
                e.prevHeaderFilterChangeCheck = "{}",
                this.headerFilterColumns.forEach(function(t) {
                    void 0 !== t.modules.filter.value && delete t.modules.filter.value,
                        t.modules.filter.prevSuccess = void 0,
                        e.reloadHeaderFilter(t)
                }),
                this.changed = !0
        }
        ,
        D.prototype.search = function(e, t, o, i) {
            var n = this
                , s = []
                , a = [];
            return Array.isArray(t) || (t = [{
                field: t,
                type: o,
                value: i
            }]),
                t.forEach(function(e) {
                    (e = n.findFilter(e)) && a.push(e)
                }),
                this.table.rowManager.rows.forEach(function(t) {
                    var o = !0;
                    a.forEach(function(e) {
                        n.filterRecurse(e, t.getData()) || (o = !1)
                    }),
                    o && s.push("data" === e ? t.getData("data") : t.getComponent())
                }),
                s
        }
        ,
        D.prototype.filter = function(e, t) {
            var o = this
                , i = []
                , n = [];
            return o.table.options.dataFiltering && o.table.options.dataFiltering.call(o.table, o.getFilters()),
                o.table.options.ajaxFiltering || !o.filterList.length && !Object.keys(o.headerFilters).length ? i = e.slice(0) : e.forEach(function(e) {
                    o.filterRow(e) && i.push(e)
                }),
            o.table.options.dataFiltered && (i.forEach(function(e) {
                n.push(e.getComponent())
            }),
                o.table.options.dataFiltered.call(o.table, o.getFilters(), n)),
                i
        }
        ,
        D.prototype.filterRow = function(e, t) {
            var o = this
                , i = !0
                , n = e.getData();
            o.filterList.forEach(function(e) {
                o.filterRecurse(e, n) || (i = !1)
            });
            for (var s in o.headerFilters)
                o.headerFilters[s].func(n) || (i = !1);
            return i
        }
        ,
        D.prototype.filterRecurse = function(e, t) {
            var o = this
                , i = !1;
            return Array.isArray(e) ? e.forEach(function(e) {
                o.filterRecurse(e, t) && (i = !0)
            }) : i = e.func(t),
                i
        }
        ,
        D.prototype.filters = {
            "=": function(e, t, o, i) {
                return t == e
            },
            "<": function(e, t, o, i) {
                return t < e
            },
            "<=": function(e, t, o, i) {
                return t <= e
            },
            ">": function(e, t, o, i) {
                return t > e
            },
            ">=": function(e, t, o, i) {
                return t >= e
            },
            "!=": function(e, t, o, i) {
                return t != e
            },
            regex: function(e, t, o, i) {
                return "string" == typeof e && (e = new RegExp(e)),
                    e.test(t)
            },
            like: function(e, t, o, i) {
                return null === e || void 0 === e ? t === e : void 0 !== t && null !== t && String(t).toLowerCase().indexOf(e.toLowerCase()) > -1
            },
            keywords: function(e, t, o, i) {
                var n = e.toLowerCase().split(void 0 === i.separator ? " " : i.separator)
                    , s = String(null === t || void 0 === t ? "" : t).toLowerCase()
                    , a = [];
                return n.forEach(function(e) {
                    s.includes(e) && a.push(!0)
                }),
                    i.matchAll ? a.length === n.length : !!a.length
            },
            starts: function(e, t, o, i) {
                return null === e || void 0 === e ? t === e : void 0 !== t && null !== t && String(t).toLowerCase().startsWith(e.toLowerCase())
            },
            ends: function(e, t, o, i) {
                return null === e || void 0 === e ? t === e : void 0 !== t && null !== t && String(t).toLowerCase().endsWith(e.toLowerCase())
            },
            in: function(e, t, o, i) {
                return Array.isArray(e) ? !e.length || e.indexOf(t) > -1 : (console.warn("Filter Error - filter value is not an array:", e),
                    !1)
            }
        },
        h.prototype.registerModule("filter", D);
    var T = function(e) {
        this.table = e
    };
    T.prototype.initializeColumn = function(e) {
        e.modules.format = this.lookupFormatter(e, ""),
        void 0 !== e.definition.formatterPrint && (e.modules.format.print = this.lookupFormatter(e, "Print")),
        void 0 !== e.definition.formatterClipboard && (e.modules.format.clipboard = this.lookupFormatter(e, "Clipboard")),
        void 0 !== e.definition.formatterHtmlOutput && (e.modules.format.htmlOutput = this.lookupFormatter(e, "HtmlOutput"))
    }
        ,
        T.prototype.lookupFormatter = function(e, t) {
            var o = {
                params: e.definition["formatter" + t + "Params"] || {}
            }
                , i = e.definition["formatter" + t];
            switch (void 0 === i ? "undefined" : _typeof(i)) {
                case "string":
                    "tick" === i && (i = "tickCross",
                    void 0 === o.params.crossElement && (o.params.crossElement = !1),
                        console.warn("DEPRECATION WARNING - the tick formatter has been deprecated, please use the tickCross formatter with the crossElement param set to false")),
                        this.formatters[i] ? o.formatter = this.formatters[i] : (console.warn("Formatter Error - No such formatter found: ", i),
                            o.formatter = this.formatters.plaintext);
                    break;
                case "function":
                    o.formatter = i;
                    break;
                default:
                    o.formatter = this.formatters.plaintext
            }
            return o
        }
        ,
        T.prototype.cellRendered = function(e) {
            e.modules.format && e.modules.format.renderedCallback && !e.modules.format.rendered && (e.modules.format.renderedCallback(),
                e.modules.format.rendered = !0)
        }
        ,
        T.prototype.formatValue = function(e) {
            function t(t) {
                e.modules.format || (e.modules.format = {}),
                    e.modules.format.renderedCallback = t,
                    e.modules.format.rendered = !1
            }
            var o = e.getComponent()
                , i = "function" == typeof e.column.modules.format.params ? e.column.modules.format.params(o) : e.column.modules.format.params;
            return e.column.modules.format.formatter.call(this, o, i, t)
        }
        ,
        T.prototype.formatExportValue = function(e, t) {
            var o, i = e.column.modules.format[t];
            if (i) {
                var n = function(t) {
                    e.modules.format || (e.modules.format = {}),
                        e.modules.format.renderedCallback = t,
                        e.modules.format.rendered = !1
                };
                return o = "function" == typeof i.params ? i.params(component) : i.params,
                    i.formatter.call(this, e.getComponent(), o, n)
            }
            return this.formatValue(e)
        }
        ,
        T.prototype.sanitizeHTML = function(e) {
            if (e) {
                var t = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                };
                return String(e).replace(/[&<>"'`=\/]/g, function(e) {
                    return t[e]
                })
            }
            return e
        }
        ,
        T.prototype.emptyToSpace = function(e) {
            return null === e || void 0 === e || "" === e ? "&nbsp;" : e
        }
        ,
        T.prototype.getFormatter = function(e) {
            var e;
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    this.formatters[e] ? e = this.formatters[e] : (console.warn("Formatter Error - No such formatter found: ", e),
                        e = this.formatters.plaintext);
                    break;
                case "function":
                    e = e;
                    break;
                default:
                    e = this.formatters.plaintext
            }
            return e
        }
        ,
        T.prototype.formatters = {
            plaintext: function(e, t, o) {
                return this.emptyToSpace(this.sanitizeHTML(e.getValue()))
            },
            html: function(e, t, o) {
                return e.getValue()
            },
            textarea: function(e, t, o) {
                return e.getElement().style.whiteSpace = "pre-wrap",
                    this.emptyToSpace(this.sanitizeHTML(e.getValue()))
            },
            money: function(e, t, o) {
                var i, n, s, a, r = parseFloat(e.getValue()), l = t.decimal || ".", c = t.thousand || ",", u = t.symbol || "", d = !!t.symbolAfter, h = void 0 !== t.precision ? t.precision : 2;
                if (isNaN(r))
                    return this.emptyToSpace(this.sanitizeHTML(e.getValue()));
                for (i = !1 !== h ? r.toFixed(h) : r,
                         i = String(i).split("."),
                         n = i[0],
                         s = i.length > 1 ? l + i[1] : "",
                         a = /(\d+)(\d{3})/; a.test(n); )
                    n = n.replace(a, "$1" + c + "$2");
                return d ? n + s + u : u + n + s
            },
            link: function(e, t, o) {
                var i, n = e.getValue(), s = t.urlPrefix || "", a = t.download, r = n, l = document.createElement("a");
                if (t.labelField && (i = e.getData(),
                    r = i[t.labelField]),
                    t.label)
                    switch (_typeof(t.label)) {
                        case "string":
                            r = t.label;
                            break;
                        case "function":
                            r = t.label(e)
                    }
                if (r) {
                    if (t.urlField && (i = e.getData(),
                        n = i[t.urlField]),
                        t.url)
                        switch (_typeof(t.url)) {
                            case "string":
                                n = t.url;
                                break;
                            case "function":
                                n = t.url(e)
                        }
                    return l.setAttribute("href", s + n),
                    t.target && l.setAttribute("target", t.target),
                    t.download && (a = "function" == typeof a ? a(e) : !0 === a ? "" : a,
                        l.setAttribute("download", a)),
                        l.innerHTML = this.emptyToSpace(this.sanitizeHTML(r)),
                        l
                }
                return "&nbsp;"
            },
            image: function(e, t, o) {
                var i = document.createElement("img")
                    , n = e.getValue();
                switch (t.urlPrefix && (n = t.urlPrefix + e.getValue()),
                t.urlSuffix && (n += t.urlSuffix),
                    i.setAttribute("src", n),
                    _typeof(t.height)) {
                    case "number":
                        i.style.height = t.height + "px";
                        break;
                    case "string":
                        i.style.height = t.height
                }
                switch (_typeof(t.width)) {
                    case "number":
                        i.style.width = t.width + "px";
                        break;
                    case "string":
                        i.style.width = t.width
                }
                return i.addEventListener("load", function() {
                    e.getRow().normalizeHeight()
                }),
                    i
            },
            tickCross: function(e, t, o) {
                var i = e.getValue()
                    , n = e.getElement()
                    , s = t.allowEmpty
                    , a = t.allowTruthy
                    , r = void 0 !== t.tickElement ? t.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>'
                    , l = void 0 !== t.crossElement ? t.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
                return a && i || !0 === i || "true" === i || "True" === i || 1 === i || "1" === i ? (n.setAttribute("aria-checked", !0),
                r || "") : !s || "null" !== i && "" !== i && null !== i && void 0 !== i ? (n.setAttribute("aria-checked", !1),
                l || "") : (n.setAttribute("aria-checked", "mixed"),
                    "")
            },
            datetime: function(e, t, o) {
                var i = t.inputFormat || "YYYY-MM-DD hh:mm:ss"
                    , n = t.outputFormat || "DD/MM/YYYY hh:mm:ss"
                    , s = void 0 !== t.invalidPlaceholder ? t.invalidPlaceholder : ""
                    , a = e.getValue()
                    , r = moment(a, i);
                return r.isValid() ? t.timezone ? r.tz(t.timezone).format(n) : r.format(n) : !0 === s ? a : "function" == typeof s ? s(a) : s
            },
            datetimediff: function(e, t, o) {
                var i = t.inputFormat || "YYYY-MM-DD hh:mm:ss"
                    , n = void 0 !== t.invalidPlaceholder ? t.invalidPlaceholder : ""
                    , s = void 0 !== t.suffix && t.suffix
                    , a = void 0 !== t.unit ? t.unit : void 0
                    , r = void 0 !== t.humanize && t.humanize
                    , l = void 0 !== t.date ? t.date : moment()
                    , c = e.getValue()
                    , u = moment(c, i);
                return u.isValid() ? r ? moment.duration(u.diff(l)).humanize(s) : u.diff(l, a) + (s ? " " + s : "") : !0 === n ? c : "function" == typeof n ? n(c) : n
            },
            lookup: function(e, t, o) {
                var i = e.getValue();
                return void 0 === t[i] ? (console.warn("Missing display value for " + i),
                    i) : t[i]
            },
            star: function(e, t, o) {
                var i = e.getValue()
                    , n = e.getElement()
                    , s = t && t.stars ? t.stars : 5
                    , a = document.createElement("span")
                    , r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                a.style.verticalAlign = "middle",
                    r.setAttribute("width", "14"),
                    r.setAttribute("height", "14"),
                    r.setAttribute("viewBox", "0 0 512 512"),
                    r.setAttribute("xml:space", "preserve"),
                    r.style.padding = "0 1px",
                    i = i && !isNaN(i) ? parseInt(i) : 0,
                    i = Math.max(0, Math.min(i, s));
                for (var l = 1; l <= s; l++) {
                    var c = r.cloneNode(!0);
                    c.innerHTML = l <= i ? '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>' : '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',
                        a.appendChild(c)
                }
                return n.style.whiteSpace = "nowrap",
                    n.style.overflow = "hidden",
                    n.style.textOverflow = "ellipsis",
                    n.setAttribute("aria-label", i),
                    a
            },
            traffic: function(e, t, o) {
                var i, n, s = this.sanitizeHTML(e.getValue()) || 0, a = document.createElement("span"), r = t && t.max ? t.max : 100, l = t && t.min ? t.min : 0, c = t && void 0 !== t.color ? t.color : ["red", "orange", "green"], u = "#666666";
                if (!isNaN(s) && void 0 !== e.getValue()) {
                    switch (a.classList.add("tabulator-traffic-light"),
                        n = parseFloat(s) <= r ? parseFloat(s) : r,
                        n = parseFloat(n) >= l ? parseFloat(n) : l,
                        i = (r - l) / 100,
                        n = Math.round((n - l) / i),
                        void 0 === c ? "undefined" : _typeof(c)) {
                        case "string":
                            u = c;
                            break;
                        case "function":
                            u = c(s);
                            break;
                        case "object":
                            if (Array.isArray(c)) {
                                var d = 100 / c.length
                                    , h = Math.floor(n / d);
                                h = Math.min(h, c.length - 1),
                                    h = Math.max(h, 0),
                                    u = c[h];
                                break
                            }
                    }
                    return a.style.backgroundColor = u,
                        a
                }
            },
            progress: function(e, t, o) {
                var i, n, s, a, r, l = this.sanitizeHTML(e.getValue()) || 0, u = e.getElement(), d = t && t.max ? t.max : 100, h = t && t.min ? t.min : 0, p = t && t.legendAlign ? t.legendAlign : "center";
                switch (n = parseFloat(l) <= d ? parseFloat(l) : d,
                    n = parseFloat(n) >= h ? parseFloat(n) : h,
                    i = (d - h) / 100,
                    n = Math.round((n - h) / i),
                    _typeof(t.color)) {
                    case "string":
                        s = t.color;
                        break;
                    case "function":
                        s = t.color(l);
                        break;
                    case "object":
                        if (Array.isArray(t.color)) {
                            var m = 100 / t.color.length
                                , f = Math.floor(n / m);
                            f = Math.min(f, t.color.length - 1),
                                f = Math.max(f, 0),
                                s = t.color[f];
                            break
                        }
                    default:
                        s = "#2DC214"
                }
                switch (_typeof(t.legend)) {
                    case "string":
                        a = t.legend;
                        break;
                    case "function":
                        a = t.legend(l);
                        break;
                    case "boolean":
                        a = l;
                        break;
                    default:
                        a = !1
                }
                switch (_typeof(t.legendColor)) {
                    case "string":
                        r = t.legendColor;
                        break;
                    case "function":
                        r = t.legendColor(l);
                        break;
                    case "object":
                        if (Array.isArray(t.legendColor)) {
                            var m = 100 / t.legendColor.length
                                , f = Math.floor(n / m);
                            f = Math.min(f, t.legendColor.length - 1),
                                f = Math.max(f, 0),
                                r = t.legendColor[f]
                        }
                        break;
                    default:
                        r = "#000"
                }
                u.style.minWidth = "30px",
                    u.style.position = "relative",
                    u.setAttribute("aria-label", n);
                var g = document.createElement("div");
                if (g.style.display = "inline-block",
                    g.style.position = "relative",
                    g.style.width = n + "%",
                    g.style.backgroundColor = s,
                    g.style.height = "100%",
                    g.setAttribute("data-max", d),
                    g.setAttribute("data-min", h),
                    a) {
                    var b = document.createElement("div");
                    b.style.position = "absolute",
                        b.style.top = "4px",
                        b.style.left = 0,
                        b.style.textAlign = p,
                        b.style.width = "100%",
                        b.style.color = r,
                        b.innerHTML = a
                }
                return o(function() {
                    if (!(e instanceof c)) {
                        var t = document.createElement("div");
                        t.style.position = "absolute",
                            t.style.top = "4px",
                            t.style.bottom = "4px",
                            t.style.left = "4px",
                            t.style.right = "4px",
                            u.appendChild(t),
                            u = t
                    }
                    u.appendChild(g),
                    a && u.appendChild(b)
                }),
                    ""
            },
            color: function(e, t, o) {
                return e.getElement().style.backgroundColor = this.sanitizeHTML(e.getValue()),
                    ""
            },
            buttonTick: function(e, t, o) {
                return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>'
            },
            buttonCross: function(e, t, o) {
                return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>'
            },
            rownum: function(e, t, o) {
                return this.table.rowManager.activeRows.indexOf(e.getRow()._getSelf()) + 1
            },
            handle: function(e, t, o) {
                return e.getElement().classList.add("tabulator-row-handle"),
                    "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>"
            },
            responsiveCollapse: function(e, t, o) {
                function i(e) {
                    var t = s.element;
                    s.open = e,
                    t && (s.open ? (n.classList.add("open"),
                        t.style.display = "") : (n.classList.remove("open"),
                        t.style.display = "none"))
                }
                var n = document.createElement("div")
                    , s = e.getRow()._row.modules.responsiveLayout;
                return n.classList.add("tabulator-responsive-collapse-toggle"),
                    n.innerHTML = "<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>",
                    e.getElement().classList.add("tabulator-row-handle"),
                    n.addEventListener("click", function(e) {
                        e.stopImmediatePropagation(),
                            i(!s.open)
                    }),
                    i(s.open),
                    n
            },
            rowSelection: function(e, t, o) {
                var i = this
                    , n = document.createElement("input");
                if (n.type = "checkbox",
                    this.table.modExists("selectRow", !0))
                    if (n.addEventListener("click", function(e) {
                        e.stopPropagation()
                    }),
                    "function" == typeof e.getRow) {
                        var s = e.getRow();
                        s instanceof r ? (n.addEventListener("change", function(e) {
                            s.toggleSelect()
                        }),
                            n.checked = s.isSelected && s.isSelected(),
                            this.table.modules.selectRow.registerRowSelectCheckbox(s, n)) : n = ""
                    } else
                        n.addEventListener("change", function(e) {
                            i.table.modules.selectRow.selectedRows.length ? i.table.deselectRow() : i.table.selectRow(t.rowRange)
                        }),
                            this.table.modules.selectRow.registerHeaderSelectCheckbox(n);
                return n
            }
        },
        h.prototype.registerModule("format", T);
    var k = function(e) {
        this.table = e,
            this.leftColumns = [],
            this.rightColumns = [],
            this.leftMargin = 0,
            this.rightMargin = 0,
            this.rightPadding = 0,
            this.initializationMode = "left",
            this.active = !1,
            this.scrollEndTimer = !1
    };
    k.prototype.reset = function() {
        this.initializationMode = "left",
            this.leftColumns = [],
            this.rightColumns = [],
            this.leftMargin = 0,
            this.rightMargin = 0,
            this.rightMargin = 0,
            this.active = !1,
            this.table.columnManager.headersElement.style.marginLeft = 0,
            this.table.columnManager.element.style.paddingRight = 0
    }
        ,
        k.prototype.initializeColumn = function(e) {
            var t = {
                margin: 0,
                edge: !1
            };
            e.isGroup || (this.frozenCheck(e) ? (t.position = this.initializationMode,
                "left" == this.initializationMode ? this.leftColumns.push(e) : this.rightColumns.unshift(e),
                this.active = !0,
                e.modules.frozen = t) : this.initializationMode = "right")
        }
        ,
        k.prototype.frozenCheck = function(e) {
            return e.parent.isGroup && e.definition.frozen && console.warn("Frozen Column Error - Parent column group must be frozen, not individual columns or sub column groups"),
                e.parent.isGroup ? this.frozenCheck(e.parent) : e.definition.frozen
        }
        ,
        k.prototype.scrollHorizontal = function() {
            var e, t = this;
            this.active && (clearTimeout(this.scrollEndTimer),
                this.scrollEndTimer = setTimeout(function() {
                    t.layout()
                }, 100),
                e = this.table.rowManager.getVisibleRows(),
                this.calcMargins(),
                this.layoutColumnPosition(),
                this.layoutCalcRows(),
                e.forEach(function(e) {
                    "row" === e.type && t.layoutRow(e)
                }),
                this.table.rowManager.tableElement.style.marginRight = this.rightMargin)
        }
        ,
        k.prototype.calcMargins = function() {
            this.leftMargin = this._calcSpace(this.leftColumns, this.leftColumns.length) + "px",
                this.table.columnManager.headersElement.style.marginLeft = this.leftMargin,
                this.rightMargin = this._calcSpace(this.rightColumns, this.rightColumns.length) + "px",
                this.table.columnManager.element.style.paddingRight = this.rightMargin,
                this.rightPadding = this.table.rowManager.element.clientWidth + this.table.columnManager.scrollLeft
        }
        ,
        k.prototype.layoutCalcRows = function() {
            this.table.modExists("columnCalcs") && (this.table.modules.columnCalcs.topInitialized && this.table.modules.columnCalcs.topRow && this.layoutRow(this.table.modules.columnCalcs.topRow),
            this.table.modules.columnCalcs.botInitialized && this.table.modules.columnCalcs.botRow && this.layoutRow(this.table.modules.columnCalcs.botRow))
        }
        ,
        k.prototype.layoutColumnPosition = function(e) {
            var t = this
                , o = [];
            this.leftColumns.forEach(function(i, n) {
                if (i.modules.frozen.margin = t._calcSpace(t.leftColumns, n) + t.table.columnManager.scrollLeft + "px",
                    n == t.leftColumns.length - 1 ? i.modules.frozen.edge = !0 : i.modules.frozen.edge = !1,
                    i.parent.isGroup) {
                    var s = t.getColGroupParentElement(i);
                    o.includes(s) || (t.layoutElement(s, i),
                        o.push(s)),
                    i.modules.frozen.edge && s.classList.add("tabulator-frozen-" + i.modules.frozen.position)
                } else
                    t.layoutElement(i.getElement(), i);
                e && i.cells.forEach(function(e) {
                    t.layoutElement(e.getElement(!0), i)
                })
            }),
                this.rightColumns.forEach(function(o, i) {
                    o.modules.frozen.margin = t.rightPadding - t._calcSpace(t.rightColumns, i + 1) + "px",
                        i == t.rightColumns.length - 1 ? o.modules.frozen.edge = !0 : o.modules.frozen.edge = !1,
                        o.parent.isGroup ? t.layoutElement(t.getColGroupParentElement(o), o) : t.layoutElement(o.getElement(), o),
                    e && o.cells.forEach(function(e) {
                        t.layoutElement(e.getElement(!0), o)
                    })
                })
        }
        ,
        k.prototype.getColGroupParentElement = function(e) {
            return e.parent.isGroup ? this.getColGroupParentElement(e.parent) : e.getElement()
        }
        ,
        k.prototype.layout = function() {
            var e = this;
            e.active && (this.calcMargins(),
                e.table.rowManager.getDisplayRows().forEach(function(t) {
                    "row" === t.type && e.layoutRow(t)
                }),
                this.layoutCalcRows(),
                this.layoutColumnPosition(!0),
                this.table.rowManager.tableElement.style.marginRight = this.rightMargin)
        }
        ,
        k.prototype.layoutRow = function(e) {
            var t = this;
            e.getElement().style.paddingLeft = this.leftMargin,
                this.leftColumns.forEach(function(o) {
                    var i = e.getCell(o);
                    i && t.layoutElement(i.getElement(!0), o)
                }),
                this.rightColumns.forEach(function(o) {
                    var i = e.getCell(o);
                    i && t.layoutElement(i.getElement(!0), o)
                })
        }
        ,
        k.prototype.layoutElement = function(e, t) {
            t.modules.frozen && (e.style.position = "absolute",
                e.style.left = t.modules.frozen.margin,
                e.classList.add("tabulator-frozen"),
            t.modules.frozen.edge && e.classList.add("tabulator-frozen-" + t.modules.frozen.position))
        }
        ,
        k.prototype._calcSpace = function(e, t) {
            for (var o = 0, i = 0; i < t; i++)
                e[i].visible && (o += e[i].getWidth());
            return o
        }
        ,
        h.prototype.registerModule("frozenColumns", k);
    var z = function(e) {
        this.table = e,
            this.topElement = document.createElement("div"),
            this.rows = [],
            this.displayIndex = 0
    };
    z.prototype.initialize = function() {
        this.rows = [],
            this.topElement.classList.add("tabulator-frozen-rows-holder"),
            this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling)
    }
        ,
        z.prototype.setDisplayIndex = function(e) {
            this.displayIndex = e
        }
        ,
        z.prototype.getDisplayIndex = function() {
            return this.displayIndex
        }
        ,
        z.prototype.isFrozen = function() {
            return !!this.rows.length
        }
        ,
        z.prototype.getRows = function(e) {
            var t = e.slice(0);
            return this.rows.forEach(function(e) {
                var o = t.indexOf(e);
                o > -1 && t.splice(o, 1)
            }),
                t
        }
        ,
        z.prototype.freezeRow = function(e) {
            e.modules.frozen ? console.warn("Freeze Error - Row is already frozen") : (e.modules.frozen = !0,
                this.topElement.appendChild(e.getElement()),
                e.initialize(),
                e.normalizeHeight(),
                this.table.rowManager.adjustTableSize(),
                this.rows.push(e),
                this.table.rowManager.refreshActiveData("display"),
                this.styleRows())
        }
        ,
        z.prototype.unfreezeRow = function(e) {
            this.rows.indexOf(e);
            e.modules.frozen ? (e.modules.frozen = !1,
                this.detachRow(e),
                this.table.rowManager.adjustTableSize(),
                this.table.rowManager.refreshActiveData("display"),
            this.rows.length && this.styleRows()) : console.warn("Freeze Error - Row is already unfrozen")
        }
        ,
        z.prototype.detachRow = function(e) {
            var t = this.rows.indexOf(e);
            if (t > -1) {
                var o = e.getElement();
                o.parentNode.removeChild(o),
                    this.rows.splice(t, 1)
            }
        }
        ,
        z.prototype.styleRows = function(e) {
            var t = this;
            this.rows.forEach(function(e, o) {
                t.table.rowManager.styleRow(e, o)
            })
        }
        ,
        h.prototype.registerModule("frozenRows", z);
    var S = function(e) {
        this._group = e,
            this.type = "GroupComponent"
    };
    S.prototype.getKey = function() {
        return this._group.key
    }
        ,
        S.prototype.getField = function() {
            return this._group.field
        }
        ,
        S.prototype.getElement = function() {
            return this._group.element
        }
        ,
        S.prototype.getRows = function() {
            return this._group.getRows(!0)
        }
        ,
        S.prototype.getSubGroups = function() {
            return this._group.getSubGroups(!0)
        }
        ,
        S.prototype.getParentGroup = function() {
            return !!this._group.parent && this._group.parent.getComponent()
        }
        ,
        S.prototype.getVisibility = function() {
            return console.warn("getVisibility function is deprecated, you should now use the isVisible function"),
                this._group.visible
        }
        ,
        S.prototype.isVisible = function() {
            return this._group.visible
        }
        ,
        S.prototype.show = function() {
            this._group.show()
        }
        ,
        S.prototype.hide = function() {
            this._group.hide()
        }
        ,
        S.prototype.toggle = function() {
            this._group.toggleVisibility()
        }
        ,
        S.prototype._getSelf = function() {
            return this._group
        }
        ,
        S.prototype.getTable = function() {
            return this._group.groupManager.table
        }
    ;
    var H = function(e, t, o, i, n, s, a) {
        this.groupManager = e,
            this.parent = t,
            this.key = i,
            this.level = o,
            this.field = n,
            this.hasSubGroups = o < e.groupIDLookups.length - 1,
            this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow,
            this.type = "group",
            this.old = a,
            this.rows = [],
            this.groups = [],
            this.groupList = [],
            this.generator = s,
            this.elementContents = !1,
            this.height = 0,
            this.outerHeight = 0,
            this.initialized = !1,
            this.calcs = {},
            this.initialized = !1,
            this.modules = {},
            this.arrowElement = !1,
            this.visible = a ? a.visible : void 0 !== e.startOpen[o] ? e.startOpen[o] : e.startOpen[0],
            this.component = null,
            this.createElements(),
            this.addBindings(),
            this.createValueGroups()
    };
    H.prototype.wipe = function() {
        this.groupList.length ? this.groupList.forEach(function(e) {
            e.wipe()
        }) : (this.element = !1,
            this.arrowElement = !1,
            this.elementContents = !1)
    }
        ,
        H.prototype.createElements = function() {
            var e = document.createElement("div");
            e.classList.add("tabulator-arrow"),
                this.element = document.createElement("div"),
                this.element.classList.add("tabulator-row"),
                this.element.classList.add("tabulator-group"),
                this.element.classList.add("tabulator-group-level-" + this.level),
                this.element.setAttribute("role", "rowgroup"),
                this.arrowElement = document.createElement("div"),
                this.arrowElement.classList.add("tabulator-group-toggle"),
                this.arrowElement.appendChild(e),
            !1 !== this.groupManager.table.options.movableRows && this.groupManager.table.modExists("moveRow") && this.groupManager.table.modules.moveRow.initializeGroupHeader(this)
        }
        ,
        H.prototype.createValueGroups = function() {
            var e = this
                , t = this.level + 1;
            this.groupManager.allowedValues && this.groupManager.allowedValues[t] && this.groupManager.allowedValues[t].forEach(function(o) {
                e._createGroup(o, t)
            })
        }
        ,
        H.prototype.addBindings = function() {
            var e, t, o, i, n = this;
            n.groupManager.table.options.groupClick && n.element.addEventListener("click", function(e) {
                n.groupManager.table.options.groupClick.call(n.groupManager.table, e, n.getComponent())
            }),
            n.groupManager.table.options.groupDblClick && n.element.addEventListener("dblclick", function(e) {
                n.groupManager.table.options.groupDblClick.call(n.groupManager.table, e, n.getComponent())
            }),
            n.groupManager.table.options.groupContext && n.element.addEventListener("contextmenu", function(e) {
                n.groupManager.table.options.groupContext.call(n.groupManager.table, e, n.getComponent())
            }),
            (n.groupManager.table.options.groupContextMenu || n.groupManager.table.options.groupClickMenu) && n.groupManager.table.modExists("menu") && n.groupManager.table.modules.menu.initializeGroup.call(n.groupManager.table.modules.menu, n),
            n.groupManager.table.options.groupTap && (o = !1,
                n.element.addEventListener("touchstart", function(e) {
                    o = !0
                }, {
                    passive: !0
                }),
                n.element.addEventListener("touchend", function(e) {
                    o && n.groupManager.table.options.groupTap(e, n.getComponent()),
                        o = !1
                })),
            n.groupManager.table.options.groupDblTap && (e = null,
                n.element.addEventListener("touchend", function(t) {
                    e ? (clearTimeout(e),
                        e = null,
                        n.groupManager.table.options.groupDblTap(t, n.getComponent())) : e = setTimeout(function() {
                        clearTimeout(e),
                            e = null
                    }, 300)
                })),
            n.groupManager.table.options.groupTapHold && (t = null,
                n.element.addEventListener("touchstart", function(e) {
                    clearTimeout(t),
                        t = setTimeout(function() {
                            clearTimeout(t),
                                t = null,
                                o = !1,
                                n.groupManager.table.options.groupTapHold(e, n.getComponent())
                        }, 1e3)
                }, {
                    passive: !0
                }),
                n.element.addEventListener("touchend", function(e) {
                    clearTimeout(t),
                        t = null
                })),
            n.groupManager.table.options.groupToggleElement && (i = "arrow" == n.groupManager.table.options.groupToggleElement ? n.arrowElement : n.element,
                i.addEventListener("click", function(e) {
                    e.stopPropagation(),
                        e.stopImmediatePropagation(),
                        n.toggleVisibility()
                }))
        }
        ,
        H.prototype._createGroup = function(e, t) {
            var o = t + "_" + e
                , i = new H(this.groupManager,this,t,e,this.groupManager.groupIDLookups[t].field,this.groupManager.headerGenerator[t] || this.groupManager.headerGenerator[0],!!this.old && this.old.groups[o]);
            this.groups[o] = i,
                this.groupList.push(i)
        }
        ,
        H.prototype._addRowToGroup = function(e) {
            var t = this.level + 1;
            if (this.hasSubGroups) {
                var o = this.groupManager.groupIDLookups[t].func(e.getData())
                    , i = t + "_" + o;
                this.groupManager.allowedValues && this.groupManager.allowedValues[t] ? this.groups[i] && this.groups[i].addRow(e) : (this.groups[i] || this._createGroup(o, t),
                    this.groups[i].addRow(e))
            }
        }
        ,
        H.prototype._addRow = function(e) {
            this.rows.push(e),
                e.modules.group = this
        }
        ,
        H.prototype.insertRow = function(e, t, o) {
            var i = this.conformRowData({});
            e.updateData(i);
            var n = this.rows.indexOf(t);
            n > -1 ? o ? this.rows.splice(n + 1, 0, e) : this.rows.splice(n, 0, e) : o ? this.rows.push(e) : this.rows.unshift(e),
                e.modules.group = this,
                this.generateGroupHeaderContents(),
            this.groupManager.table.modExists("columnCalcs") && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modules.columnCalcs.recalcGroup(this),
                this.groupManager.updateGroupRows(!0)
        }
        ,
        H.prototype.scrollHeader = function(e) {
            this.arrowElement.style.marginLeft = e,
                this.groupList.forEach(function(t) {
                    t.scrollHeader(e)
                })
        }
        ,
        H.prototype.getRowIndex = function(e) {}
        ,
        H.prototype.conformRowData = function(e) {
            return this.field ? e[this.field] = this.key : console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function"),
            this.parent && (e = this.parent.conformRowData(e)),
                e
        }
        ,
        H.prototype.removeRow = function(e) {
            var t = this.rows.indexOf(e)
                , o = e.getElement();
            t > -1 && this.rows.splice(t, 1),
                this.groupManager.table.options.groupValues || this.rows.length ? (o.parentNode && o.parentNode.removeChild(o),
                    this.generateGroupHeaderContents(),
                this.groupManager.table.modExists("columnCalcs") && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modules.columnCalcs.recalcGroup(this)) : (this.parent ? this.parent.removeGroup(this) : this.groupManager.removeGroup(this),
                    this.groupManager.updateGroupRows(!0))
        }
        ,
        H.prototype.removeGroup = function(e) {
            var t, o = e.level + "_" + e.key;
            this.groups[o] && (delete this.groups[o],
                t = this.groupList.indexOf(e),
            t > -1 && this.groupList.splice(t, 1),
            this.groupList.length || (this.parent ? this.parent.removeGroup(this) : this.groupManager.removeGroup(this)))
        }
        ,
        H.prototype.getHeadersAndRows = function(e) {
            var t = [];
            return t.push(this),
                this._visSet(),
                this.visible ? this.groupList.length ? this.groupList.forEach(function(o) {
                    t = t.concat(o.getHeadersAndRows(e))
                }) : (!e && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasTopCalcs() && (this.calcs.top && (this.calcs.top.detachElement(),
                    this.calcs.top.deleteCells()),
                    this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows),
                    t.push(this.calcs.top)),
                    t = t.concat(this.rows),
                !e && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasBottomCalcs() && (this.calcs.bottom && (this.calcs.bottom.detachElement(),
                    this.calcs.bottom.deleteCells()),
                    this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows),
                    t.push(this.calcs.bottom))) : this.groupList.length || "table" == this.groupManager.table.options.columnCalcs || this.groupManager.table.modExists("columnCalcs") && (!e && this.groupManager.table.modules.columnCalcs.hasTopCalcs() && (this.calcs.top && (this.calcs.top.detachElement(),
                    this.calcs.top.deleteCells()),
                this.groupManager.table.options.groupClosedShowCalcs && (this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows),
                    t.push(this.calcs.top))),
                !e && this.groupManager.table.modules.columnCalcs.hasBottomCalcs() && (this.calcs.bottom && (this.calcs.bottom.detachElement(),
                    this.calcs.bottom.deleteCells()),
                this.groupManager.table.options.groupClosedShowCalcs && (this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows),
                    t.push(this.calcs.bottom)))),
                t
        }
        ,
        H.prototype.getData = function(e, t) {
            var o = [];
            return this._visSet(),
            (!e || e && this.visible) && this.rows.forEach(function(e) {
                o.push(e.getData(t || "data"))
            }),
                o
        }
        ,
        H.prototype.getRowCount = function() {
            var e = 0;
            return this.groupList.length ? this.groupList.forEach(function(t) {
                e += t.getRowCount()
            }) : e = this.rows.length,
                e
        }
        ,
        H.prototype.toggleVisibility = function() {
            this.visible ? this.hide() : this.show()
        }
        ,
        H.prototype.hide = function() {
            this.visible = !1,
                "classic" != this.groupManager.table.rowManager.getRenderMode() || this.groupManager.table.options.pagination ? this.groupManager.updateGroupRows(!0) : (this.element.classList.remove("tabulator-group-visible"),
                    this.groupList.length ? this.groupList.forEach(function(e) {
                        e.getHeadersAndRows().forEach(function(e) {
                            e.detachElement()
                        })
                    }) : this.rows.forEach(function(e) {
                        var t = e.getElement();
                        t.parentNode.removeChild(t)
                    }),
                    this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex()),
                    this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth()),
                this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), !1)
        }
        ,
        H.prototype.show = function() {
            var e = this;
            if (e.visible = !0,
            "classic" != this.groupManager.table.rowManager.getRenderMode() || this.groupManager.table.options.pagination)
                this.groupManager.updateGroupRows(!0);
            else {
                this.element.classList.add("tabulator-group-visible");
                var t = e.getElement();
                this.groupList.length ? this.groupList.forEach(function(e) {
                    e.getHeadersAndRows().forEach(function(e) {
                        var o = e.getElement();
                        t.parentNode.insertBefore(o, t.nextSibling),
                            e.initialize(),
                            t = o
                    })
                }) : e.rows.forEach(function(e) {
                    var o = e.getElement();
                    t.parentNode.insertBefore(o, t.nextSibling),
                        e.initialize(),
                        t = o
                }),
                    this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex()),
                    this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth()
            }
            this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), !0)
        }
        ,
        H.prototype._visSet = function() {
            var e = [];
            "function" == typeof this.visible && (this.rows.forEach(function(t) {
                e.push(t.getData())
            }),
                this.visible = this.visible(this.key, this.getRowCount(), e, this.getComponent()))
        }
        ,
        H.prototype.getRowGroup = function(e) {
            var t = !1;
            return this.groupList.length ? this.groupList.forEach(function(o) {
                var i = o.getRowGroup(e);
                i && (t = i)
            }) : this.rows.find(function(t) {
                return t === e
            }) && (t = this),
                t
        }
        ,
        H.prototype.getSubGroups = function(e) {
            var t = [];
            return this.groupList.forEach(function(o) {
                t.push(e ? o.getComponent() : o)
            }),
                t
        }
        ,
        H.prototype.getRows = function(e) {
            var t = [];
            return this.rows.forEach(function(o) {
                t.push(e ? o.getComponent() : o)
            }),
                t
        }
        ,
        H.prototype.generateGroupHeaderContents = function() {
            var e = [];
            for (this.rows.forEach(function(t) {
                e.push(t.getData())
            }),
                     this.elementContents = this.generator(this.key, this.getRowCount(), e, this.getComponent()); this.element.firstChild; )
                this.element.removeChild(this.element.firstChild);
            "string" == typeof this.elementContents ? this.element.innerHTML = this.elementContents : this.element.appendChild(this.elementContents),
                this.element.insertBefore(this.arrowElement, this.element.firstChild)
        }
        ,
        H.prototype.getPath = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return e.unshift(this.key),
            this.parent && this.parent.getPath(e),
                e
        }
        ,
        H.prototype.getElement = function() {
            this.addBindingsd = !1,
                this._visSet(),
                this.visible ? this.element.classList.add("tabulator-group-visible") : this.element.classList.remove("tabulator-group-visible");
            for (var e = 0; e < this.element.childNodes.length; ++e)
                this.element.childNodes[e].parentNode.removeChild(this.element.childNodes[e]);
            return this.generateGroupHeaderContents(),
                this.element
        }
        ,
        H.prototype.detachElement = function() {
            this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element)
        }
        ,
        H.prototype.normalizeHeight = function() {
            this.setHeight(this.element.clientHeight)
        }
        ,
        H.prototype.initialize = function(e) {
            this.initialized && !e || (this.normalizeHeight(),
                this.initialized = !0)
        }
        ,
        H.prototype.reinitialize = function() {
            this.initialized = !1,
                this.height = 0,
            h.prototype.helpers.elVisible(this.element) && this.initialize(!0)
        }
        ,
        H.prototype.setHeight = function(e) {
            this.height != e && (this.height = e,
                this.outerHeight = this.element.offsetHeight)
        }
        ,
        H.prototype.getHeight = function() {
            return this.outerHeight
        }
        ,
        H.prototype.getGroup = function() {
            return this
        }
        ,
        H.prototype.reinitializeHeight = function() {}
        ,
        H.prototype.calcHeight = function() {}
        ,
        H.prototype.setCellHeight = function() {}
        ,
        H.prototype.clearCellHeight = function() {}
        ,
        H.prototype.getComponent = function() {
            return this.component || (this.component = new S(this)),
                this.component
        }
    ;
    var P = function(e) {
        this.table = e,
            this.groupIDLookups = !1,
            this.startOpen = [function() {
                return !1
            }
            ],
            this.headerGenerator = [function() {
                return ""
            }
            ],
            this.groupList = [],
            this.allowedValues = !1,
            this.groups = {},
            this.displayIndex = 0
    };
    P.prototype.initialize = function() {
        var e = this
            , t = e.table.options.groupBy
            , o = e.table.options.groupStartOpen
            , i = e.table.options.groupHeader;
        if (this.allowedValues = e.table.options.groupValues,
        Array.isArray(t) && Array.isArray(i) && t.length > i.length && console.warn("Error creating group headers, groupHeader array is shorter than groupBy array"),
            e.headerGenerator = [function() {
                return ""
            }
            ],
            this.startOpen = [function() {
                return !1
            }
            ],
            e.table.modules.localize.bind("groups|item", function(t, o) {
                e.headerGenerator[0] = function(e, i, n) {
                    return (void 0 === e ? "" : e) + "<span>(" + i + " " + (1 === i ? t : o.groups.items) + ")</span>"
                }
            }),
            this.groupIDLookups = [],
        Array.isArray(t) || t)
            this.table.modExists("columnCalcs") && "table" != this.table.options.columnCalcs && "both" != this.table.options.columnCalcs && this.table.modules.columnCalcs.removeCalcs();
        else if (this.table.modExists("columnCalcs") && "group" != this.table.options.columnCalcs) {
            var n = this.table.columnManager.getRealColumns();
            n.forEach(function(t) {
                t.definition.topCalc && e.table.modules.columnCalcs.initializeTopRow(),
                t.definition.bottomCalc && e.table.modules.columnCalcs.initializeBottomRow()
            })
        }
        Array.isArray(t) || (t = [t]),
            t.forEach(function(t, o) {
                var i, n;
                "function" == typeof t ? i = t : (n = e.table.columnManager.getColumnByField(t),
                        i = n ? function(e) {
                                return n.getFieldValue(e)
                            }
                            : function(e) {
                                return e[t]
                            }
                ),
                    e.groupIDLookups.push({
                        field: "function" != typeof t && t,
                        func: i,
                        values: !!e.allowedValues && e.allowedValues[o]
                    })
            }),
        o && (Array.isArray(o) || (o = [o]),
            o.forEach(function(e) {
                e = "function" == typeof e ? e : function() {
                    return !0
                }
            }),
            e.startOpen = o),
        i && (e.headerGenerator = Array.isArray(i) ? i : [i]),
            this.initialized = !0
    }
        ,
        P.prototype.setDisplayIndex = function(e) {
            this.displayIndex = e
        }
        ,
        P.prototype.getDisplayIndex = function() {
            return this.displayIndex
        }
        ,
        P.prototype.getRows = function(e) {
            return this.groupIDLookups.length ? (this.table.options.dataGrouping.call(this.table),
                this.generateGroups(e),
            this.table.options.dataGrouped && this.table.options.dataGrouped.call(this.table, this.getGroups(!0)),
                this.updateGroupRows()) : e.slice(0)
        }
        ,
        P.prototype.getGroups = function(e) {
            var t = [];
            return this.groupList.forEach(function(o) {
                t.push(e ? o.getComponent() : o)
            }),
                t
        }
        ,
        P.prototype.getChildGroups = function(e) {
            var t = this
                , o = [];
            return e || (e = this),
                e.groupList.forEach(function(e) {
                    e.groupList.length ? o = o.concat(t.getChildGroups(e)) : o.push(e)
                }),
                o
        }
        ,
        P.prototype.wipe = function() {
            this.groupList.forEach(function(e) {
                e.wipe()
            })
        }
        ,
        P.prototype.pullGroupListData = function(e) {
            var t = this
                , o = [];
            return e.forEach(function(e) {
                var i = {};
                i.level = 0,
                    i.rowCount = 0,
                    i.headerContent = "";
                var n = [];
                e.hasSubGroups ? (n = t.pullGroupListData(e.groupList),
                    i.level = e.level,
                    i.rowCount = n.length - e.groupList.length,
                    i.headerContent = e.generator(e.key, i.rowCount, e.rows, e),
                    o.push(i),
                    o = o.concat(n)) : (i.level = e.level,
                    i.headerContent = e.generator(e.key, e.rows.length, e.rows, e),
                    i.rowCount = e.getRows().length,
                    o.push(i),
                    e.getRows().forEach(function(e) {
                        o.push(e.getData("data"))
                    }))
            }),
                o
        }
        ,
        P.prototype.getGroupedData = function() {
            return this.pullGroupListData(this.groupList)
        }
        ,
        P.prototype.getRowGroup = function(e) {
            var t = !1;
            return this.groupList.forEach(function(o) {
                var i = o.getRowGroup(e);
                i && (t = i)
            }),
                t
        }
        ,
        P.prototype.countGroups = function() {
            return this.groupList.length
        }
        ,
        P.prototype.generateGroups = function(e) {
            var t = this
                , o = t.groups;
            t.groups = {},
                t.groupList = [],
                this.allowedValues && this.allowedValues[0] ? (this.allowedValues[0].forEach(function(e) {
                    t.createGroup(e, 0, o)
                }),
                    e.forEach(function(e) {
                        t.assignRowToExistingGroup(e, o)
                    })) : e.forEach(function(e) {
                    t.assignRowToGroup(e, o)
                })
        }
        ,
        P.prototype.createGroup = function(e, t, o) {
            var i, n = t + "_" + e;
            o = o || [],
                i = new H(this,!1,t,e,this.groupIDLookups[0].field,this.headerGenerator[0],o[n]),
                this.groups[n] = i,
                this.groupList.push(i)
        }
        ,
        P.prototype.assignRowToExistingGroup = function(e, t) {
            var o = this.groupIDLookups[0].func(e.getData())
                , i = "0_" + o;
            this.groups[i] && this.groups[i].addRow(e)
        }
        ,
        P.prototype.assignRowToGroup = function(e, t) {
            var o = this.groupIDLookups[0].func(e.getData())
                , i = !this.groups["0_" + o];
            return i && this.createGroup(o, 0, t),
                this.groups["0_" + o].addRow(e),
                !i
        }
        ,
        P.prototype.reassignRowToGroup = function(e) {
            var t = e.getGroup()
                , o = t.getPath()
                , i = this.getExpectedPath(e);
            o.length == i.length && o.every(function(e, t) {
                return e === i[t]
            }) || (t.removeRow(e),
                this.assignRowToGroup(e, self.groups),
                this.table.rowManager.refreshActiveData("group", !1, !0))
        }
        ,
        P.prototype.getExpectedPath = function(e) {
            var t = []
                , o = e.getData();
            return this.groupIDLookups.forEach(function(e) {
                t.push(e.func(o))
            }),
                t
        }
        ,
        P.prototype.updateGroupRows = function(e) {
            var t = this
                , o = [];
            if (t.groupList.forEach(function(e) {
                o = o.concat(e.getHeadersAndRows())
            }),
                e) {
                var i = t.table.rowManager.setDisplayRows(o, this.getDisplayIndex());
                !0 !== i && this.setDisplayIndex(i),
                    t.table.rowManager.refreshActiveData("group", !0, !0)
            }
            return o
        }
        ,
        P.prototype.scrollHeaders = function(e) {
            this.table.options.virtualDomHoz && (e -= this.table.vdomHoz.vDomPadLeft),
                e += "px",
                this.groupList.forEach(function(t) {
                    t.scrollHeader(e)
                })
        }
        ,
        P.prototype.removeGroup = function(e) {
            var t, o = e.level + "_" + e.key;
            this.groups[o] && (delete this.groups[o],
            (t = this.groupList.indexOf(e)) > -1 && this.groupList.splice(t, 1))
        }
        ,
        h.prototype.registerModule("groupRows", P);
    var A = function(e) {
        this.table = e,
            this.history = [],
            this.index = -1
    };
    A.prototype.clear = function() {
        this.history = [],
            this.index = -1
    }
        ,
        A.prototype.action = function(e, t, o) {
            this.history = this.history.slice(0, this.index + 1),
                this.history.push({
                    type: e,
                    component: t,
                    data: o
                }),
                this.index++
        }
        ,
        A.prototype.getHistoryUndoSize = function() {
            return this.index + 1
        }
        ,
        A.prototype.getHistoryRedoSize = function() {
            return this.history.length - (this.index + 1)
        }
        ,
        A.prototype.clearComponentHistory = function(e) {
            var t = this.history.findIndex(function(t) {
                return t.component === e
            });
            t > -1 && (this.history.splice(t, 1),
            t <= this.index && this.index--,
                this.clearComponentHistory(e))
        }
        ,
        A.prototype.undo = function() {
            if (this.index > -1) {
                var e = this.history[this.index];
                return this.undoers[e.type].call(this, e),
                    this.index--,
                    this.table.options.historyUndo.call(this.table, e.type, e.component.getComponent(), e.data),
                    !0
            }
            return console.warn("History Undo Error - No more history to undo"),
                !1
        }
        ,
        A.prototype.redo = function() {
            if (this.history.length - 1 > this.index) {
                this.index++;
                var e = this.history[this.index];
                return this.redoers[e.type].call(this, e),
                    this.table.options.historyRedo.call(this.table, e.type, e.component.getComponent(), e.data),
                    !0
            }
            return console.warn("History Redo Error - No more history to redo"),
                !1
        }
        ,
        A.prototype.undoers = {
            cellEdit: function(e) {
                e.component.setValueProcessData(e.data.oldValue)
            },
            rowAdd: function(e) {
                e.component.deleteActual()
            },
            rowDelete: function(e) {
                var t = this.table.rowManager.addRowActual(e.data.data, e.data.pos, e.data.index);
                this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.updateGroupRows(!0),
                    this._rebindRow(e.component, t)
            },
            rowMove: function(e) {
                this.table.rowManager.moveRowActual(e.component, this.table.rowManager.rows[e.data.posFrom], !e.data.after),
                    this.table.rowManager.redraw()
            }
        },
        A.prototype.redoers = {
            cellEdit: function(e) {
                e.component.setValueProcessData(e.data.newValue)
            },
            rowAdd: function(e) {
                var t = this.table.rowManager.addRowActual(e.data.data, e.data.pos, e.data.index);
                this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.updateGroupRows(!0),
                    this._rebindRow(e.component, t)
            },
            rowDelete: function(e) {
                e.component.deleteActual()
            },
            rowMove: function(e) {
                this.table.rowManager.moveRowActual(e.component, this.table.rowManager.rows[e.data.posTo], e.data.after),
                    this.table.rowManager.redraw()
            }
        },
        A.prototype._rebindRow = function(e, t) {
            this.history.forEach(function(o) {
                if (o.component instanceof l)
                    o.component === e && (o.component = t);
                else if (o.component instanceof u && o.component.row === e) {
                    var i = o.component.column.getField();
                    i && (o.component = t.getCell(i))
                }
            })
        }
        ,
        h.prototype.registerModule("history", A);
    var _ = function(e) {
        this.table = e,
            this.fieldIndex = [],
            this.hasIndex = !1
    };
    _.prototype.parseTable = function() {
        var e = this
            , t = e.table.element
            , o = e.table.options
            , i = (o.columns,
            t.getElementsByTagName("th"))
            , n = t.getElementsByTagName("tbody")[0]
            , s = [];
        e.hasIndex = !1,
            e.table.options.htmlImporting.call(this.table),
            n = n ? n.getElementsByTagName("tr") : [],
            e._extractOptions(t, o),
            i.length ? e._extractHeaders(i, n) : e._generateBlankHeaders(i, n);
        for (var a = 0; a < n.length; a++) {
            var r = n[a]
                , l = r.getElementsByTagName("td")
                , c = {};
            e.hasIndex || (c[o.index] = a);
            for (var u = 0; u < l.length; u++) {
                var d = l[u];
                void 0 !== this.fieldIndex[u] && (c[this.fieldIndex[u]] = d.innerHTML)
            }
            s.push(c)
        }
        var h = document.createElement("div")
            , p = t.attributes;
        for (var u in p)
            "object" == _typeof(p[u]) && h.setAttribute(p[u].name, p[u].value);
        t.parentNode.replaceChild(h, t),
            o.data = s,
            e.table.options.htmlImported.call(this.table),
            this.table.element = h
    }
        ,
        _.prototype._extractOptions = function(e, t, o) {
            var i = e.attributes
                , n = o ? Object.assign([], o) : Object.keys(t)
                , s = {};
            n.forEach(function(e) {
                s[e.toLowerCase()] = e
            });
            for (var a in i) {
                var r, l = i[a];
                l && "object" == (void 0 === l ? "undefined" : _typeof(l)) && l.name && 0 === l.name.indexOf("tabulator-") && (r = l.name.replace("tabulator-", ""),
                void 0 !== s[r] && (t[s[r]] = this._attribValue(l.value)))
            }
        }
        ,
        _.prototype._attribValue = function(e) {
            return "true" === e || "false" !== e && e
        }
        ,
        _.prototype._findCol = function(e) {
            return this.table.options.columns.find(function(t) {
                return t.title === e
            }) || !1
        }
        ,
        _.prototype._extractHeaders = function(e, t) {
            for (var o = 0; o < e.length; o++) {
                var i, s = e[o], a = !1, r = this._findCol(s.textContent);
                r ? a = !0 : r = {
                    title: s.textContent.trim()
                },
                r.field || (r.field = s.textContent.trim().toLowerCase().replace(" ", "_")),
                    i = s.getAttribute("width"),
                i && !r.width && (r.width = i),
                    s.attributes,
                    this._extractOptions(s, r, n.prototype.defaultOptionList),
                    this.fieldIndex[o] = r.field,
                r.field == this.table.options.index && (this.hasIndex = !0),
                a || this.table.options.columns.push(r)
            }
        }
        ,
        _.prototype._generateBlankHeaders = function(e, t) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o]
                    , n = {
                    title: "",
                    field: "col" + o
                };
                this.fieldIndex[o] = n.field;
                var s = i.getAttribute("width");
                s && (n.width = s),
                    this.table.options.columns.push(n)
            }
        }
        ,
        h.prototype.registerModule("htmlTableImport", _);
    var F = function(e) {
        this.table = e,
            this.watchKeys = null,
            this.pressedKeys = null,
            this.keyupBinding = !1,
            this.keydownBinding = !1
    };
    F.prototype.initialize = function() {
        var e = this.table.options.keybindings
            , t = {};
        if (this.watchKeys = {},
            this.pressedKeys = [],
        !1 !== e) {
            for (var o in this.bindings)
                t[o] = this.bindings[o];
            if (Object.keys(e).length)
                for (var i in e)
                    t[i] = e[i];
            this.mapBindings(t),
                this.bindEvents()
        }
    }
        ,
        F.prototype.mapBindings = function(e) {
            var t = this
                , o = this;
            for (var i in e)
                !function(i) {
                    t.actions[i] ? e[i] && ("object" !== _typeof(e[i]) && (e[i] = [e[i]]),
                        e[i].forEach(function(e) {
                            o.mapBinding(i, e)
                        })) : console.warn("Key Binding Error - no such action:", i)
                }(i)
        }
        ,
        F.prototype.mapBinding = function(e, t) {
            var o = this
                , i = {
                action: this.actions[e],
                keys: [],
                ctrl: !1,
                shift: !1,
                meta: !1
            };
            t.toString().toLowerCase().split(" ").join("").split("+").forEach(function(e) {
                switch (e) {
                    case "ctrl":
                        i.ctrl = !0;
                        break;
                    case "shift":
                        i.shift = !0;
                        break;
                    case "meta":
                        i.meta = !0;
                        break;
                    default:
                        e = parseInt(e),
                            i.keys.push(e),
                        o.watchKeys[e] || (o.watchKeys[e] = []),
                            o.watchKeys[e].push(i)
                }
            })
        }
        ,
        F.prototype.bindEvents = function() {
            var e = this;
            this.keyupBinding = function(t) {
                var o = t.keyCode
                    , i = e.watchKeys[o];
                i && (e.pressedKeys.push(o),
                    i.forEach(function(o) {
                        e.checkBinding(t, o)
                    }))
            }
                ,
                this.keydownBinding = function(t) {
                    var o = t.keyCode;
                    if (e.watchKeys[o]) {
                        var i = e.pressedKeys.indexOf(o);
                        i > -1 && e.pressedKeys.splice(i, 1)
                    }
                }
                ,
                this.table.element.addEventListener("keydown", this.keyupBinding),
                this.table.element.addEventListener("keyup", this.keydownBinding)
        }
        ,
        F.prototype.clearBindings = function() {
            this.keyupBinding && this.table.element.removeEventListener("keydown", this.keyupBinding),
            this.keydownBinding && this.table.element.removeEventListener("keyup", this.keydownBinding)
        }
        ,
        F.prototype.checkBinding = function(e, t) {
            var o = this
                , i = !0;
            return e.ctrlKey == t.ctrl && e.shiftKey == t.shift && e.metaKey == t.meta && (t.keys.forEach(function(e) {
                -1 == o.pressedKeys.indexOf(e) && (i = !1)
            }),
            i && t.action.call(o, e),
                !0)
        }
        ,
        F.prototype.bindings = {
            navPrev: "shift + 9",
            navNext: 9,
            navUp: 38,
            navDown: 40,
            scrollPageUp: 33,
            scrollPageDown: 34,
            scrollToStart: 36,
            scrollToEnd: 35,
            undo: "ctrl + 90",
            redo: "ctrl + 89",
            copyToClipboard: "ctrl + 67"
        },
        F.prototype.actions = {
            keyBlock: function(e) {
                e.stopPropagation(),
                    e.preventDefault()
            },
            scrollPageUp: function(e) {
                var t = this.table.rowManager
                    , o = t.scrollTop - t.height;
                t.element.scrollHeight;
                e.preventDefault(),
                t.displayRowsCount && (o >= 0 ? t.element.scrollTop = o : t.scrollToRow(t.getDisplayRows()[0])),
                    this.table.element.focus()
            },
            scrollPageDown: function(e) {
                var t = this.table.rowManager
                    , o = t.scrollTop + t.height
                    , i = t.element.scrollHeight;
                e.preventDefault(),
                t.displayRowsCount && (o <= i ? t.element.scrollTop = o : t.scrollToRow(t.getDisplayRows()[t.displayRowsCount - 1])),
                    this.table.element.focus()
            },
            scrollToStart: function(e) {
                var t = this.table.rowManager;
                e.preventDefault(),
                t.displayRowsCount && t.scrollToRow(t.getDisplayRows()[0]),
                    this.table.element.focus()
            },
            scrollToEnd: function(e) {
                var t = this.table.rowManager;
                e.preventDefault(),
                t.displayRowsCount && t.scrollToRow(t.getDisplayRows()[t.displayRowsCount - 1]),
                    this.table.element.focus()
            },
            navPrev: function(e) {
                var t = !1;
                this.table.modExists("edit") && (t = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t.nav().prev())
            },
            navNext: function(e) {
                var t, o = !1, i = this.table.options.tabEndNewRow;
                this.table.modExists("edit") && (o = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t = o.nav(),
                t.next() || i && (o.getElement().firstChild.blur(),
                    i = !0 === i ? this.table.addRow({}) : "function" == typeof i ? this.table.addRow(i(o.row.getComponent())) : this.table.addRow(Object.assign({}, i)),
                    i.then(function() {
                        setTimeout(function() {
                            t.next()
                        })
                    })))
            },
            navLeft: function(e) {
                var t = !1;
                this.table.modExists("edit") && (t = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t.nav().left())
            },
            navRight: function(e) {
                var t = !1;
                this.table.modExists("edit") && (t = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t.nav().right())
            },
            navUp: function(e) {
                var t = !1;
                this.table.modExists("edit") && (t = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t.nav().up())
            },
            navDown: function(e) {
                var t = !1;
                this.table.modExists("edit") && (t = this.table.modules.edit.currentCell) && (e.preventDefault(),
                    t.nav().down())
            },
            undo: function(e) {
                this.table.options.history && this.table.modExists("history") && this.table.modExists("edit") && (this.table.modules.edit.currentCell || (e.preventDefault(),
                    this.table.modules.history.undo()))
            },
            redo: function(e) {
                this.table.options.history && this.table.modExists("history") && this.table.modExists("edit") && (this.table.modules.edit.currentCell || (e.preventDefault(),
                    this.table.modules.history.redo()))
            },
            copyToClipboard: function(e) {
                this.table.modules.edit.currentCell || this.table.modExists("clipboard", !0) && this.table.modules.clipboard.copy(!1, !0)
            }
        },
        h.prototype.registerModule("keybindings", F);
    var N = function(e) {
        this.table = e,
            this.menuElements = [],
            this.blurEvent = this.hideMenu.bind(this),
            this.escEvent = this.escMenu.bind(this),
            this.nestedMenuBlock = !1,
            this.positionReversedX = !1
    };
    N.prototype.initializeColumnHeader = function(e) {
        var t, o = this;
        e.definition.headerContextMenu && (e.getElement().addEventListener("contextmenu", this.LoadMenuEvent.bind(this, e, e.definition.headerContextMenu)),
            this.tapHold(e, e.definition.headerContextMenu)),
        e.definition.headerMenu && (t = document.createElement("span"),
            t.classList.add("tabulator-header-menu-button"),
            t.innerHTML = "&vellip;",
            t.addEventListener("click", function(t) {
                t.stopPropagation(),
                    t.preventDefault(),
                    o.LoadMenuEvent(e, e.definition.headerMenu, t)
            }),
            e.titleElement.insertBefore(t, e.titleElement.firstChild))
    }
        ,
        N.prototype.LoadMenuEvent = function(e, t, o) {
            t = "function" == typeof t ? t.call(this.table, e.getComponent(), o) : t,
                this.loadMenu(o, e, t)
        }
        ,
        N.prototype.tapHold = function(e, t) {
            var o = this
                , i = e.getElement()
                , n = null
                , s = !1;
            i.addEventListener("touchstart", function(i) {
                clearTimeout(n),
                    s = !1,
                    n = setTimeout(function() {
                        clearTimeout(n),
                            n = null,
                            s = !0,
                            o.LoadMenuEvent(e, t, i)
                    }, 1e3)
            }, {
                passive: !0
            }),
                i.addEventListener("touchend", function(e) {
                    clearTimeout(n),
                        n = null,
                    s && e.preventDefault()
                })
        }
        ,
        N.prototype.initializeCell = function(e) {
            e.column.definition.contextMenu && (e.getElement(!0).addEventListener("contextmenu", this.LoadMenuEvent.bind(this, e, e.column.definition.contextMenu)),
                this.tapHold(e, e.column.definition.contextMenu)),
            e.column.definition.clickMenu && e.getElement(!0).addEventListener("click", this.LoadMenuEvent.bind(this, e, e.column.definition.clickMenu))
        }
        ,
        N.prototype.initializeRow = function(e) {
            this.table.options.rowContextMenu && (e.getElement().addEventListener("contextmenu", this.LoadMenuEvent.bind(this, e, this.table.options.rowContextMenu)),
                this.tapHold(e, this.table.options.rowContextMenu)),
            this.table.options.rowClickMenu && e.getElement().addEventListener("click", this.LoadMenuEvent.bind(this, e, this.table.options.rowClickMenu))
        }
        ,
        N.prototype.initializeGroup = function(e) {
            this.table.options.groupContextMenu && (e.getElement().addEventListener("contextmenu", this.LoadMenuEvent.bind(this, e, this.table.options.groupContextMenu)),
                this.tapHold(e, this.table.options.groupContextMenu)),
            this.table.options.groupClickMenu && e.getElement().addEventListener("click", this.LoadMenuEvent.bind(this, e, this.table.options.groupClickMenu))
        }
        ,
        N.prototype.loadMenu = function(e, t, o, i) {
            var n = this
                , s = !(e instanceof MouseEvent)
                , a = document.createElement("div");
            if (a.classList.add("tabulator-menu"),
            s || e.preventDefault(),
            o && o.length) {
                if (!i) {
                    if (this.nestedMenuBlock) {
                        if (this.isOpen())
                            return
                    } else
                        this.nestedMenuBlock = setTimeout(function() {
                            n.nestedMenuBlock = !1
                        }, 100);
                    this.hideMenu(),
                        this.menuElements = []
                }
                o.forEach(function(e) {
                    var o = document.createElement("div")
                        , i = e.label
                        , s = e.disabled;
                    e.separator ? o.classList.add("tabulator-menu-separator") : (o.classList.add("tabulator-menu-item"),
                    "function" == typeof i && (i = i.call(n.table, t.getComponent())),
                        i instanceof Node ? o.appendChild(i) : o.innerHTML = i,
                    "function" == typeof s && (s = s.call(n.table, t.getComponent())),
                        s ? (o.classList.add("tabulator-menu-item-disabled"),
                            o.addEventListener("click", function(e) {
                                e.stopPropagation()
                            })) : e.menu && e.menu.length ? o.addEventListener("click", function(i) {
                            i.stopPropagation(),
                                n.hideOldSubMenus(a),
                                n.loadMenu(i, t, e.menu, o)
                        }) : e.action && o.addEventListener("click", function(o) {
                            e.action(o, t.getComponent())
                        }),
                    e.menu && e.menu.length && o.classList.add("tabulator-menu-item-submenu")),
                        a.appendChild(o)
                }),
                    a.addEventListener("click", function(e) {
                        n.hideMenu()
                    }),
                    this.menuElements.push(a),
                    this.positionMenu(a, i, s, e)
            }
        }
        ,
        N.prototype.hideOldSubMenus = function(e) {
            var t = this.menuElements.indexOf(e);
            if (t > -1)
                for (var o = this.menuElements.length - 1; o > t; o--) {
                    var i = this.menuElements[o];
                    i.parentNode && i.parentNode.removeChild(i),
                        this.menuElements.pop()
                }
        }
        ,
        N.prototype.positionMenu = function(e, t, o, i) {
            var n, s, a, r = this, l = Math.max(document.body.offsetHeight, window.innerHeight);
            t ? (a = h.prototype.helpers.elOffset(t),
                n = a.left + t.offsetWidth,
                s = a.top - 1) : (n = o ? i.touches[0].pageX : i.pageX,
                s = o ? i.touches[0].pageY : i.pageY,
                this.positionReversedX = !1),
                e.style.top = s + "px",
                e.style.left = n + "px",
                setTimeout(function() {
                    r.table.rowManager.element.addEventListener("scroll", r.blurEvent),
                        document.body.addEventListener("click", r.blurEvent),
                        document.body.addEventListener("contextmenu", r.blurEvent),
                        window.addEventListener("resize", r.blurEvent),
                        document.body.addEventListener("keydown", r.escEvent)
                }, 100),
                document.body.appendChild(e),
            s + e.offsetHeight >= l && (e.style.top = "",
                e.style.bottom = t ? l - a.top - t.offsetHeight - 1 + "px" : l - s + "px"),
            (n + e.offsetWidth >= document.body.offsetWidth || this.positionReversedX) && (e.style.left = "",
                e.style.right = t ? document.documentElement.offsetWidth - a.left + "px" : document.documentElement.offsetWidth - n + "px",
                this.positionReversedX = !0)
        }
        ,
        N.prototype.isOpen = function() {
            return !!this.menuElements.length
        }
        ,
        N.prototype.escMenu = function(e) {
            27 == e.keyCode && this.hideMenu()
        }
        ,
        N.prototype.hideMenu = function() {
            this.menuElements.forEach(function(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }),
                document.body.removeEventListener("keydown", this.escEvent),
                document.body.removeEventListener("click", this.blurEvent),
                document.body.removeEventListener("contextmenu", this.blurEvent),
                window.removeEventListener("resize", this.blurEvent),
                this.table.rowManager.element.removeEventListener("scroll", this.blurEvent)
        }
        ,
        N.prototype.menus = {},
        h.prototype.registerModule("menu", N);
    var B = function(e) {
        this.table = e,
            this.placeholderElement = this.createPlaceholderElement(),
            this.hoverElement = !1,
            this.checkTimeout = !1,
            this.checkPeriod = 250,
            this.moving = !1,
            this.toCol = !1,
            this.toColAfter = !1,
            this.startX = 0,
            this.autoScrollMargin = 40,
            this.autoScrollStep = 5,
            this.autoScrollTimeout = !1,
            this.touchMove = !1,
            this.moveHover = this.moveHover.bind(this),
            this.endMove = this.endMove.bind(this)
    };
    B.prototype.createPlaceholderElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-col"),
            e.classList.add("tabulator-col-placeholder"),
            e
    }
        ,
        B.prototype.initializeColumn = function(e) {
            var t, o = this, i = {};
            e.modules.frozen || (t = e.getElement(),
                i.mousemove = function(i) {
                    e.parent === o.moving.parent && ((o.touchMove ? i.touches[0].pageX : i.pageX) - h.prototype.helpers.elOffset(t).left + o.table.columnManager.element.scrollLeft > e.getWidth() / 2 ? o.toCol === e && o.toColAfter || (t.parentNode.insertBefore(o.placeholderElement, t.nextSibling),
                        o.moveColumn(e, !0)) : (o.toCol !== e || o.toColAfter) && (t.parentNode.insertBefore(o.placeholderElement, t),
                        o.moveColumn(e, !1)))
                }
                    .bind(o),
                t.addEventListener("mousedown", function(t) {
                    o.touchMove = !1,
                    1 === t.which && (o.checkTimeout = setTimeout(function() {
                        o.startMove(t, e)
                    }, o.checkPeriod))
                }),
                t.addEventListener("mouseup", function(e) {
                    1 === e.which && o.checkTimeout && clearTimeout(o.checkTimeout)
                }),
                o.bindTouchEvents(e)),
                e.modules.moveColumn = i
        }
        ,
        B.prototype.bindTouchEvents = function(e) {
            var t, o, i, n, s, a, r, l = this, c = e.getElement(), u = !1;
            c.addEventListener("touchstart", function(c) {
                l.checkTimeout = setTimeout(function() {
                    l.touchMove = !0,
                        t = e,
                        o = e.nextColumn(),
                        n = o ? o.getWidth() / 2 : 0,
                        i = e.prevColumn(),
                        s = i ? i.getWidth() / 2 : 0,
                        a = 0,
                        r = 0,
                        u = !1,
                        l.startMove(c, e)
                }, l.checkPeriod)
            }, {
                passive: !0
            }),
                c.addEventListener("touchmove", function(c) {
                    var d, h;
                    l.moving && (l.moveHover(c),
                    u || (u = c.touches[0].pageX),
                        d = c.touches[0].pageX - u,
                        d > 0 ? o && d - a > n && (h = o) !== e && (u = c.touches[0].pageX,
                            h.getElement().parentNode.insertBefore(l.placeholderElement, h.getElement().nextSibling),
                            l.moveColumn(h, !0)) : i && -d - r > s && (h = i) !== e && (u = c.touches[0].pageX,
                            h.getElement().parentNode.insertBefore(l.placeholderElement, h.getElement()),
                            l.moveColumn(h, !1)),
                    h && (t = h,
                        o = h.nextColumn(),
                        a = n,
                        n = o ? o.getWidth() / 2 : 0,
                        i = h.prevColumn(),
                        r = s,
                        s = i ? i.getWidth() / 2 : 0))
                }, {
                    passive: !0
                }),
                c.addEventListener("touchend", function(e) {
                    l.checkTimeout && clearTimeout(l.checkTimeout),
                    l.moving && l.endMove(e)
                })
        }
        ,
        B.prototype.startMove = function(e, t) {
            var o = t.getElement();
            this.moving = t,
                this.startX = (this.touchMove ? e.touches[0].pageX : e.pageX) - h.prototype.helpers.elOffset(o).left,
                this.table.element.classList.add("tabulator-block-select"),
                this.placeholderElement.style.width = t.getWidth() + "px",
                this.placeholderElement.style.height = t.getHeight() + "px",
                o.parentNode.insertBefore(this.placeholderElement, o),
                o.parentNode.removeChild(o),
                this.hoverElement = o.cloneNode(!0),
                this.hoverElement.classList.add("tabulator-moving"),
                this.table.columnManager.getElement().appendChild(this.hoverElement),
                this.hoverElement.style.left = "0",
                this.hoverElement.style.bottom = "0",
            this.touchMove || (this._bindMouseMove(),
                document.body.addEventListener("mousemove", this.moveHover),
                document.body.addEventListener("mouseup", this.endMove)),
                this.moveHover(e)
        }
        ,
        B.prototype._bindMouseMove = function() {
            this.table.columnManager.columnsByIndex.forEach(function(e) {
                e.modules.moveColumn.mousemove && e.getElement().addEventListener("mousemove", e.modules.moveColumn.mousemove)
            })
        }
        ,
        B.prototype._unbindMouseMove = function() {
            this.table.columnManager.columnsByIndex.forEach(function(e) {
                e.modules.moveColumn.mousemove && e.getElement().removeEventListener("mousemove", e.modules.moveColumn.mousemove)
            })
        }
        ,
        B.prototype.moveColumn = function(e, t) {
            var o = this.moving.getCells();
            this.toCol = e,
                this.toColAfter = t,
                t ? e.getCells().forEach(function(e, t) {
                    var i = e.getElement(!0);
                    i.parentNode.insertBefore(o[t].getElement(), i.nextSibling)
                }) : e.getCells().forEach(function(e, t) {
                    var i = e.getElement(!0);
                    i.parentNode.insertBefore(o[t].getElement(), i)
                })
        }
        ,
        B.prototype.endMove = function(e) {
            (1 === e.which || this.touchMove) && (this._unbindMouseMove(),
                this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling),
                this.placeholderElement.parentNode.removeChild(this.placeholderElement),
                this.hoverElement.parentNode.removeChild(this.hoverElement),
                this.table.element.classList.remove("tabulator-block-select"),
            this.toCol && this.table.columnManager.moveColumnActual(this.moving, this.toCol, this.toColAfter),
                this.moving = !1,
                this.toCol = !1,
                this.toColAfter = !1,
            this.touchMove || (document.body.removeEventListener("mousemove", this.moveHover),
                document.body.removeEventListener("mouseup", this.endMove)))
        }
        ,
        B.prototype.moveHover = function(e) {
            var t, o = this, i = o.table.columnManager.getElement(), n = i.scrollLeft, s = (o.touchMove ? e.touches[0].pageX : e.pageX) - h.prototype.helpers.elOffset(i).left + n;
            o.hoverElement.style.left = s - o.startX + "px",
            s - n < o.autoScrollMargin && (o.autoScrollTimeout || (o.autoScrollTimeout = setTimeout(function() {
                t = Math.max(0, n - 5),
                    o.table.rowManager.getElement().scrollLeft = t,
                    o.autoScrollTimeout = !1
            }, 1))),
            n + i.clientWidth - s < o.autoScrollMargin && (o.autoScrollTimeout || (o.autoScrollTimeout = setTimeout(function() {
                t = Math.min(i.clientWidth, n + 5),
                    o.table.rowManager.getElement().scrollLeft = t,
                    o.autoScrollTimeout = !1
            }, 1)))
        }
        ,
        h.prototype.registerModule("moveColumn", B);
    var O = function(e) {
        this.table = e,
            this.placeholderElement = this.createPlaceholderElement(),
            this.hoverElement = !1,
            this.checkTimeout = !1,
            this.checkPeriod = 150,
            this.moving = !1,
            this.toRow = !1,
            this.toRowAfter = !1,
            this.hasHandle = !1,
            this.startY = 0,
            this.startX = 0,
            this.moveHover = this.moveHover.bind(this),
            this.endMove = this.endMove.bind(this),
            this.tableRowDropEvent = !1,
            this.touchMove = !1,
            this.connection = !1,
            this.connectionSelectorsTables = !1,
            this.connectionSelectorsElements = !1,
            this.connectionElements = [],
            this.connections = [],
            this.connectedTable = !1,
            this.connectedRow = !1
    };
    O.prototype.createPlaceholderElement = function() {
        var e = document.createElement("div");
        return e.classList.add("tabulator-row"),
            e.classList.add("tabulator-row-placeholder"),
            e
    }
        ,
        O.prototype.initialize = function(e) {
            this.connectionSelectorsTables = this.table.options.movableRowsConnectedTables,
                this.connectionSelectorsElements = this.table.options.movableRowsConnectedElements,
                this.connection = this.connectionSelectorsTables || this.connectionSelectorsElements
        }
        ,
        O.prototype.setHandle = function(e) {
            this.hasHandle = e
        }
        ,
        O.prototype.initializeGroupHeader = function(e) {
            var t = this
                , o = {};
            o.mouseup = function(e) {
                t.tableRowDrop(e, row)
            }
                .bind(t),
                o.mousemove = function(o) {
                    if (o.pageY - h.prototype.helpers.elOffset(e.element).top + t.table.rowManager.element.scrollTop > e.getHeight() / 2) {
                        if (t.toRow !== e || !t.toRowAfter) {
                            var i = e.getElement();
                            i.parentNode.insertBefore(t.placeholderElement, i.nextSibling),
                                t.moveRow(e, !0)
                        }
                    } else if (t.toRow !== e || t.toRowAfter) {
                        var i = e.getElement();
                        i.previousSibling && (i.parentNode.insertBefore(t.placeholderElement, i),
                            t.moveRow(e, !1))
                    }
                }
                    .bind(t),
                e.modules.moveRow = o
        }
        ,
        O.prototype.initializeRow = function(e) {
            var t, o = this, i = {};
            i.mouseup = function(t) {
                o.tableRowDrop(t, e)
            }
                .bind(o),
                i.mousemove = function(t) {
                    var i = e.getElement();
                    t.pageY - h.prototype.helpers.elOffset(i).top + o.table.rowManager.element.scrollTop > e.getHeight() / 2 ? o.toRow === e && o.toRowAfter || (i.parentNode.insertBefore(o.placeholderElement, i.nextSibling),
                        o.moveRow(e, !0)) : (o.toRow !== e || o.toRowAfter) && (i.parentNode.insertBefore(o.placeholderElement, i),
                        o.moveRow(e, !1))
                }
                    .bind(o),
            this.hasHandle || (t = e.getElement(),
                t.addEventListener("mousedown", function(t) {
                    1 === t.which && (o.checkTimeout = setTimeout(function() {
                        o.startMove(t, e)
                    }, o.checkPeriod))
                }),
                t.addEventListener("mouseup", function(e) {
                    1 === e.which && o.checkTimeout && clearTimeout(o.checkTimeout)
                }),
                this.bindTouchEvents(e, e.getElement())),
                e.modules.moveRow = i
        }
        ,
        O.prototype.initializeCell = function(e) {
            var t = this
                , o = e.getElement(!0);
            o.addEventListener("mousedown", function(o) {
                1 === o.which && (t.checkTimeout = setTimeout(function() {
                    t.startMove(o, e.row)
                }, t.checkPeriod))
            }),
                o.addEventListener("mouseup", function(e) {
                    1 === e.which && t.checkTimeout && clearTimeout(t.checkTimeout)
                }),
                this.bindTouchEvents(e.row, o)
        }
        ,
        O.prototype.bindTouchEvents = function(e, t) {
            var o, i, n, s, a, r, l, c = this, u = !1;
            t.addEventListener("touchstart", function(t) {
                c.checkTimeout = setTimeout(function() {
                    c.touchMove = !0,
                        o = e,
                        i = e.nextRow(),
                        s = i ? i.getHeight() / 2 : 0,
                        n = e.prevRow(),
                        a = n ? n.getHeight() / 2 : 0,
                        r = 0,
                        l = 0,
                        u = !1,
                        c.startMove(t, e)
                }, c.checkPeriod)
            }, {
                passive: !0
            }),
                this.moving,
                this.toRow,
                this.toRowAfter,
                t.addEventListener("touchmove", function(t) {
                    var d, h;
                    c.moving && (t.preventDefault(),
                        c.moveHover(t),
                    u || (u = t.touches[0].pageY),
                        d = t.touches[0].pageY - u,
                        d > 0 ? i && d - r > s && (h = i) !== e && (u = t.touches[0].pageY,
                            h.getElement().parentNode.insertBefore(c.placeholderElement, h.getElement().nextSibling),
                            c.moveRow(h, !0)) : n && -d - l > a && (h = n) !== e && (u = t.touches[0].pageY,
                            h.getElement().parentNode.insertBefore(c.placeholderElement, h.getElement()),
                            c.moveRow(h, !1)),
                    h && (o = h,
                        i = h.nextRow(),
                        r = s,
                        s = i ? i.getHeight() / 2 : 0,
                        n = h.prevRow(),
                        l = a,
                        a = n ? n.getHeight() / 2 : 0))
                }),
                t.addEventListener("touchend", function(e) {
                    c.checkTimeout && clearTimeout(c.checkTimeout),
                    c.moving && (c.endMove(e),
                        c.touchMove = !1)
                })
        }
        ,
        O.prototype._bindMouseMove = function() {
            this.table.rowManager.getDisplayRows().forEach(function(e) {
                "row" !== e.type && "group" !== e.type || !e.modules.moveRow.mousemove || e.getElement().addEventListener("mousemove", e.modules.moveRow.mousemove)
            })
        }
        ,
        O.prototype._unbindMouseMove = function() {
            this.table.rowManager.getDisplayRows().forEach(function(e) {
                "row" !== e.type && "group" !== e.type || !e.modules.moveRow.mousemove || e.getElement().removeEventListener("mousemove", e.modules.moveRow.mousemove)
            })
        }
        ,
        O.prototype.startMove = function(e, t) {
            var o = t.getElement();
            this.setStartPosition(e, t),
                this.moving = t,
                this.table.element.classList.add("tabulator-block-select"),
                this.placeholderElement.style.width = t.getWidth() + "px",
                this.placeholderElement.style.height = t.getHeight() + "px",
                this.connection ? (this.table.element.classList.add("tabulator-movingrow-sending"),
                    this.connectToTables(t)) : (o.parentNode.insertBefore(this.placeholderElement, o),
                    o.parentNode.removeChild(o)),
                this.hoverElement = o.cloneNode(!0),
                this.hoverElement.classList.add("tabulator-moving"),
                this.connection ? (document.body.appendChild(this.hoverElement),
                    this.hoverElement.style.left = "0",
                    this.hoverElement.style.top = "0",
                    this.hoverElement.style.width = this.table.element.clientWidth + "px",
                    this.hoverElement.style.whiteSpace = "nowrap",
                    this.hoverElement.style.overflow = "hidden",
                    this.hoverElement.style.pointerEvents = "none") : (this.table.rowManager.getTableElement().appendChild(this.hoverElement),
                    this.hoverElement.style.left = "0",
                    this.hoverElement.style.top = "0",
                    this._bindMouseMove()),
                document.body.addEventListener("mousemove", this.moveHover),
                document.body.addEventListener("mouseup", this.endMove),
                this.moveHover(e)
        }
        ,
        O.prototype.setStartPosition = function(e, t) {
            var o, i, n = this.touchMove ? e.touches[0].pageX : e.pageX, s = this.touchMove ? e.touches[0].pageY : e.pageY;
            o = t.getElement(),
                this.connection ? (i = o.getBoundingClientRect(),
                    this.startX = i.left - n + window.pageXOffset,
                    this.startY = i.top - s + window.pageYOffset) : this.startY = s - o.getBoundingClientRect().top
        }
        ,
        O.prototype.endMove = function(e) {
            e && 1 !== e.which && !this.touchMove || (this._unbindMouseMove(),
            this.connection || (this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling),
                this.placeholderElement.parentNode.removeChild(this.placeholderElement)),
                this.hoverElement.parentNode.removeChild(this.hoverElement),
                this.table.element.classList.remove("tabulator-block-select"),
            this.toRow && this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter),
                this.moving = !1,
                this.toRow = !1,
                this.toRowAfter = !1,
                document.body.removeEventListener("mousemove", this.moveHover),
                document.body.removeEventListener("mouseup", this.endMove),
            this.connection && (this.table.element.classList.remove("tabulator-movingrow-sending"),
                this.disconnectFromTables()))
        }
        ,
        O.prototype.moveRow = function(e, t) {
            this.toRow = e,
                this.toRowAfter = t
        }
        ,
        O.prototype.moveHover = function(e) {
            this.connection ? this.moveHoverConnections.call(this, e) : this.moveHoverTable.call(this, e)
        }
        ,
        O.prototype.moveHoverTable = function(e) {
            var t = this.table.rowManager.getElement()
                , o = t.scrollTop
                , i = (this.touchMove ? e.touches[0].pageY : e.pageY) - t.getBoundingClientRect().top + o;
            this.hoverElement.style.top = i - this.startY + "px"
        }
        ,
        O.prototype.moveHoverConnections = function(e) {
            this.hoverElement.style.left = this.startX + (this.touchMove ? e.touches[0].pageX : e.pageX) + "px",
                this.hoverElement.style.top = this.startY + (this.touchMove ? e.touches[0].pageY : e.pageY) + "px"
        }
        ,
        O.prototype.elementRowDrop = function(e, t, o) {
            this.table.options.movableRowsElementDrop && this.table.options.movableRowsElementDrop(e, t, !!o && o.getComponent())
        }
        ,
        O.prototype.connectToTables = function(e) {
            var t, o = this;
            this.connectionSelectorsTables && (t = this.table.modules.comms.getConnections(this.connectionSelectorsTables),
                this.table.options.movableRowsSendingStart.call(this.table, t),
                this.table.modules.comms.send(this.connectionSelectorsTables, "moveRow", "connect", {
                    row: e
                })),
            this.connectionSelectorsElements && (this.connectionElements = [],
            Array.isArray(this.connectionSelectorsElements) || (this.connectionSelectorsElements = [this.connectionSelectorsElements]),
                this.connectionSelectorsElements.forEach(function(e) {
                    "string" == typeof e ? o.connectionElements = o.connectionElements.concat(Array.prototype.slice.call(document.querySelectorAll(e))) : o.connectionElements.push(e)
                }),
                this.connectionElements.forEach(function(e) {
                    var t = function(t) {
                        o.elementRowDrop(t, e, o.moving)
                    };
                    e.addEventListener("mouseup", t),
                        e.tabulatorElementDropEvent = t,
                        e.classList.add("tabulator-movingrow-receiving")
                }))
        }
        ,
        O.prototype.disconnectFromTables = function() {
            var e;
            this.connectionSelectorsTables && (e = this.table.modules.comms.getConnections(this.connectionSelectorsTables),
                this.table.options.movableRowsSendingStop.call(this.table, e),
                this.table.modules.comms.send(this.connectionSelectorsTables, "moveRow", "disconnect")),
                this.connectionElements.forEach(function(e) {
                    e.classList.remove("tabulator-movingrow-receiving"),
                        e.removeEventListener("mouseup", e.tabulatorElementDropEvent),
                        delete e.tabulatorElementDropEvent
                })
        }
        ,
        O.prototype.connect = function(e, t) {
            var o = this;
            return this.connectedTable ? (console.warn("Move Row Error - Table cannot accept connection, already connected to table:", this.connectedTable),
                !1) : (this.connectedTable = e,
                this.connectedRow = t,
                this.table.element.classList.add("tabulator-movingrow-receiving"),
                o.table.rowManager.getDisplayRows().forEach(function(e) {
                    "row" === e.type && e.modules.moveRow && e.modules.moveRow.mouseup && e.getElement().addEventListener("mouseup", e.modules.moveRow.mouseup)
                }),
                o.tableRowDropEvent = o.tableRowDrop.bind(o),
                o.table.element.addEventListener("mouseup", o.tableRowDropEvent),
                this.table.options.movableRowsReceivingStart.call(this.table, t, e),
                !0)
        }
        ,
        O.prototype.disconnect = function(e) {
            var t = this;
            e === this.connectedTable ? (this.connectedTable = !1,
                this.connectedRow = !1,
                this.table.element.classList.remove("tabulator-movingrow-receiving"),
                t.table.rowManager.getDisplayRows().forEach(function(e) {
                    "row" === e.type && e.modules.moveRow && e.modules.moveRow.mouseup && e.getElement().removeEventListener("mouseup", e.modules.moveRow.mouseup)
                }),
                t.table.element.removeEventListener("mouseup", t.tableRowDropEvent),
                this.table.options.movableRowsReceivingStop.call(this.table, e)) : console.warn("Move Row Error - trying to disconnect from non connected table")
        }
        ,
        O.prototype.dropComplete = function(e, t, o) {
            var i = !1;
            if (o) {
                switch (_typeof(this.table.options.movableRowsSender)) {
                    case "string":
                        i = this.senders[this.table.options.movableRowsSender];
                        break;
                    case "function":
                        i = this.table.options.movableRowsSender
                }
                i ? i.call(this, this.moving.getComponent(), t ? t.getComponent() : void 0, e) : this.table.options.movableRowsSender && console.warn("Mover Row Error - no matching sender found:", this.table.options.movableRowsSender),
                    this.table.options.movableRowsSent.call(this.table, this.moving.getComponent(), t ? t.getComponent() : void 0, e)
            } else
                this.table.options.movableRowsSentFailed.call(this.table, this.moving.getComponent(), t ? t.getComponent() : void 0, e);
            this.endMove()
        }
        ,
        O.prototype.tableRowDrop = function(e, t) {
            var o = !1
                , i = !1;
            switch (e.stopImmediatePropagation(),
                _typeof(this.table.options.movableRowsReceiver)) {
                case "string":
                    o = this.receivers[this.table.options.movableRowsReceiver];
                    break;
                case "function":
                    o = this.table.options.movableRowsReceiver
            }
            o ? i = o.call(this, this.connectedRow.getComponent(), t ? t.getComponent() : void 0, this.connectedTable) : console.warn("Mover Row Error - no matching receiver found:", this.table.options.movableRowsReceiver),
                i ? this.table.options.movableRowsReceived.call(this.table, this.connectedRow.getComponent(), t ? t.getComponent() : void 0, this.connectedTable) : this.table.options.movableRowsReceivedFailed.call(this.table, this.connectedRow.getComponent(), t ? t.getComponent() : void 0, this.connectedTable),
                this.table.modules.comms.send(this.connectedTable, "moveRow", "dropcomplete", {
                    row: t,
                    success: i
                })
        }
        ,
        O.prototype.receivers = {
            insert: function(e, t, o) {
                return this.table.addRow(e.getData(), void 0, t),
                    !0
            },
            add: function(e, t, o) {
                return this.table.addRow(e.getData()),
                    !0
            },
            update: function(e, t, o) {
                return !!t && (t.update(e.getData()),
                    !0)
            },
            replace: function(e, t, o) {
                return !!t && (this.table.addRow(e.getData(), void 0, t),
                    t.delete(),
                    !0)
            }
        },
        O.prototype.senders = {
            delete: function(e, t, o) {
                e.delete()
            }
        },
        O.prototype.commsReceived = function(e, t, o) {
            switch (t) {
                case "connect":
                    return this.connect(e, o.row);
                case "disconnect":
                    return this.disconnect(e);
                case "dropcomplete":
                    return this.dropComplete(e, o.row, o.success)
            }
        }
        ,
        h.prototype.registerModule("moveRow", O);
    var I = function(e) {
        this.table = e,
            this.allowedTypes = ["", "data", "edit", "clipboard"],
            this.enabled = !0
    };
    I.prototype.initializeColumn = function(e) {
        var t = this
            , o = !1
            , i = {};
        this.allowedTypes.forEach(function(n) {
            var s, a = "mutator" + (n.charAt(0).toUpperCase() + n.slice(1));
            e.definition[a] && (s = t.lookupMutator(e.definition[a])) && (o = !0,
                i[a] = {
                    mutator: s,
                    params: e.definition[a + "Params"] || {}
                })
        }),
        o && (e.modules.mutate = i)
    }
        ,
        I.prototype.lookupMutator = function(e) {
            var t = !1;
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    this.mutators[e] ? t = this.mutators[e] : console.warn("Mutator Error - No such mutator found, ignoring: ", e);
                    break;
                case "function":
                    t = e
            }
            return t
        }
        ,
        I.prototype.transformRow = function(e, t, o) {
            var i, n = this, s = "mutator" + (t.charAt(0).toUpperCase() + t.slice(1));
            return this.enabled && n.table.columnManager.traverse(function(n) {
                var a, r, l;
                n.modules.mutate && (a = n.modules.mutate[s] || n.modules.mutate.mutator || !1) && (i = n.getFieldValue(void 0 !== o ? o : e),
                "data" != t && void 0 === i || (l = n.getComponent(),
                    r = "function" == typeof a.params ? a.params(i, e, t, l) : a.params,
                    n.setFieldValue(e, a.mutator(i, e, t, r, l))))
            }),
                e
        }
        ,
        I.prototype.transformCell = function(e, t) {
            var o = e.column.modules.mutate.mutatorEdit || e.column.modules.mutate.mutator || !1
                , i = {};
            return o ? (i = Object.assign(i, e.row.getData()),
                e.column.setFieldValue(i, t),
                o.mutator(t, i, "edit", o.params, e.getComponent())) : t
        }
        ,
        I.prototype.enable = function() {
            this.enabled = !0
        }
        ,
        I.prototype.disable = function() {
            this.enabled = !1
        }
        ,
        I.prototype.mutators = {},
        h.prototype.registerModule("mutator", I);
    var V = function(e) {
        this.table = e,
            this.mode = "local",
            this.progressiveLoad = !1,
            this.size = 0,
            this.page = 1,
            this.count = 5,
            this.max = 1,
            this.displayIndex = 0,
            this.initialLoad = !0,
            this.pageSizes = [],
            this.dataReceivedNames = {},
            this.dataSentNames = {},
            this.createElements()
    };
    V.prototype.createElements = function() {
        var e;
        this.element = document.createElement("span"),
            this.element.classList.add("tabulator-paginator"),
            this.pagesElement = document.createElement("span"),
            this.pagesElement.classList.add("tabulator-pages"),
            e = document.createElement("button"),
            e.classList.add("tabulator-page"),
            e.setAttribute("type", "button"),
            e.setAttribute("role", "button"),
            e.setAttribute("aria-label", ""),
            e.setAttribute("title", ""),
            this.firstBut = e.cloneNode(!0),
            this.firstBut.setAttribute("data-page", "first"),
            this.prevBut = e.cloneNode(!0),
            this.prevBut.setAttribute("data-page", "prev"),
            this.nextBut = e.cloneNode(!0),
            this.nextBut.setAttribute("data-page", "next"),
            this.lastBut = e.cloneNode(!0),
            this.lastBut.setAttribute("data-page", "last"),
        this.table.options.paginationSizeSelector && (this.pageSizeSelect = document.createElement("select"),
            this.pageSizeSelect.classList.add("tabulator-page-size"))
    }
        ,
        V.prototype.generatePageSizeSelectList = function() {
            var e = this
                , t = [];
            if (this.pageSizeSelect) {
                if (Array.isArray(this.table.options.paginationSizeSelector))
                    t = this.table.options.paginationSizeSelector,
                        this.pageSizes = t,
                    -1 == this.pageSizes.indexOf(this.size) && t.unshift(this.size);
                else if (-1 == this.pageSizes.indexOf(this.size)) {
                    t = [];
                    for (var o = 1; o < 5; o++)
                        t.push(this.size * o);
                    this.pageSizes = t
                } else
                    t = this.pageSizes;
                for (; this.pageSizeSelect.firstChild; )
                    this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);
                t.forEach(function(t) {
                    var o = document.createElement("option");
                    o.value = t,
                        !0 === t ? e.table.modules.localize.bind("pagination|all", function(e) {
                            o.innerHTML = e
                        }) : o.innerHTML = t,
                        e.pageSizeSelect.appendChild(o)
                }),
                    this.pageSizeSelect.value = this.size
            }
        }
        ,
        V.prototype.initialize = function(e) {
            var t, o, i, n = this;
            this.dataSentNames = Object.assign({}, this.paginationDataSentNames),
                this.dataSentNames = Object.assign(this.dataSentNames, this.table.options.paginationDataSent),
                this.dataReceivedNames = Object.assign({}, this.paginationDataReceivedNames),
                this.dataReceivedNames = Object.assign(this.dataReceivedNames, this.table.options.paginationDataReceived),
                n.table.modules.localize.bind("pagination|first", function(e) {
                    n.firstBut.innerHTML = e
                }),
                n.table.modules.localize.bind("pagination|first_title", function(e) {
                    n.firstBut.setAttribute("aria-label", e),
                        n.firstBut.setAttribute("title", e)
                }),
                n.table.modules.localize.bind("pagination|prev", function(e) {
                    n.prevBut.innerHTML = e
                }),
                n.table.modules.localize.bind("pagination|prev_title", function(e) {
                    n.prevBut.setAttribute("aria-label", e),
                        n.prevBut.setAttribute("title", e)
                }),
                n.table.modules.localize.bind("pagination|next", function(e) {
                    n.nextBut.innerHTML = e
                }),
                n.table.modules.localize.bind("pagination|next_title", function(e) {
                    n.nextBut.setAttribute("aria-label", e),
                        n.nextBut.setAttribute("title", e)
                }),
                n.table.modules.localize.bind("pagination|last", function(e) {
                    n.lastBut.innerHTML = e
                }),
                n.table.modules.localize.bind("pagination|last_title", function(e) {
                    n.lastBut.setAttribute("aria-label", e),
                        n.lastBut.setAttribute("title", e)
                }),
                n.firstBut.addEventListener("click", function() {
                    n.setPage(1).then(function() {}).catch(function() {})
                }),
                n.prevBut.addEventListener("click", function() {
                    n.previousPage().then(function() {}).catch(function() {})
                }),
                n.nextBut.addEventListener("click", function() {
                    n.nextPage().then(function() {}).catch(function() {})
                }),
                n.lastBut.addEventListener("click", function() {
                    n.setPage(n.max).then(function() {}).catch(function() {})
                }),
            n.table.options.paginationElement && (n.element = n.table.options.paginationElement),
            this.pageSizeSelect && (t = document.createElement("label"),
                n.table.modules.localize.bind("pagination|page_size", function(e) {
                    n.pageSizeSelect.setAttribute("aria-label", e),
                        n.pageSizeSelect.setAttribute("title", e),
                        t.innerHTML = e
                }),
                n.element.appendChild(t),
                n.element.appendChild(n.pageSizeSelect),
                n.pageSizeSelect.addEventListener("change", function(e) {
                    n.setPageSize("true" == n.pageSizeSelect.value || n.pageSizeSelect.value),
                        n.setPage(1).then(function() {}).catch(function() {})
                })),
                n.element.appendChild(n.firstBut),
                n.element.appendChild(n.prevBut),
                n.element.appendChild(n.pagesElement),
                n.element.appendChild(n.nextBut),
                n.element.appendChild(n.lastBut),
            n.table.options.paginationElement || e || n.table.footerManager.append(n.element, n),
                n.mode = n.table.options.pagination,
                n.table.options.paginationSize ? n.size = n.table.options.paginationSize : (o = document.createElement("div"),
                    o.classList.add("tabulator-row"),
                    o.style.visibility = e,
                    i = document.createElement("div"),
                    i.classList.add("tabulator-cell"),
                    i.innerHTML = "Page Row Test",
                    o.appendChild(i),
                    n.table.rowManager.getTableElement().appendChild(o),
                    n.size = Math.floor(n.table.rowManager.getElement().clientHeight / o.offsetHeight),
                    n.table.rowManager.getTableElement().removeChild(o)),
                n.count = n.table.options.paginationButtonCount,
                n.generatePageSizeSelectList()
        }
        ,
        V.prototype.initializeProgressive = function(e) {
            this.initialize(!0),
                this.mode = "progressive_" + e,
                this.progressiveLoad = !0
        }
        ,
        V.prototype.setDisplayIndex = function(e) {
            this.displayIndex = e
        }
        ,
        V.prototype.getDisplayIndex = function() {
            return this.displayIndex
        }
        ,
        V.prototype.setMaxRows = function(e) {
            this.max = e ? !0 === this.size ? 1 : Math.ceil(e / this.size) : 1,
            this.page > this.max && (this.page = this.max)
        }
        ,
        V.prototype.reset = function(e, t) {
            return ("local" == this.mode || e) && (this.page = 1),
            t && (this.initialLoad = !0),
                !0
        }
        ,
        V.prototype.setMaxPage = function(e) {
            e = parseInt(e),
                this.max = e || 1,
            this.page > this.max && (this.page = this.max,
                this.trigger())
        }
        ,
        V.prototype.setPage = function(e) {
            var t = this
                , o = this;
            switch (e) {
                case "first":
                    return this.setPage(1);
                case "prev":
                    return this.previousPage();
                case "next":
                    return this.nextPage();
                case "last":
                    return this.setPage(this.max)
            }
            return new Promise(function(i, n) {
                    e = parseInt(e),
                        e > 0 && e <= t.max || "local" !== t.mode ? (t.page = e,
                            t.trigger().then(function() {
                                i()
                            }).catch(function() {
                                n()
                            }),
                        o.table.options.persistence && o.table.modExists("persistence", !0) && o.table.modules.persistence.config.page && o.table.modules.persistence.save("page")) : (console.warn("Pagination Error - Requested page is out of range of 1 - " + t.max + ":", e),
                            n())
                }
            )
        }
        ,
        V.prototype.setPageToRow = function(e) {
            var t = this;
            return new Promise(function(o, i) {
                    var n = t.table.rowManager.getDisplayRows(t.displayIndex - 1)
                        , s = n.indexOf(e);
                    if (s > -1) {
                        var a = !0 === t.size ? 1 : Math.ceil((s + 1) / t.size);
                        t.setPage(a).then(function() {
                            o()
                        }).catch(function() {
                            i()
                        })
                    } else
                        console.warn("Pagination Error - Requested row is not visible"),
                            i()
                }
            )
        }
        ,
        V.prototype.setPageSize = function(e) {
            !0 !== e && (e = parseInt(e)),
            e > 0 && (this.size = e),
            this.pageSizeSelect && this.generatePageSizeSelectList(),
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.page && this.table.modules.persistence.save("page")
        }
        ,
        V.prototype._setPageButtons = function() {
            for (var e = this, t = Math.floor((this.count - 1) / 2), o = Math.ceil((this.count - 1) / 2), i = this.max - this.page + t + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - t, 1), n = this.page <= o ? Math.min(this.count, this.max) : Math.min(this.page + o, this.max); e.pagesElement.firstChild; )
                e.pagesElement.removeChild(e.pagesElement.firstChild);
            1 == e.page ? (e.firstBut.disabled = !0,
                e.prevBut.disabled = !0) : (e.firstBut.disabled = !1,
                e.prevBut.disabled = !1),
                e.page == e.max ? (e.lastBut.disabled = !0,
                    e.nextBut.disabled = !0) : (e.lastBut.disabled = !1,
                    e.nextBut.disabled = !1);
            for (var s = i; s <= n; s++)
                s > 0 && s <= e.max && e.pagesElement.appendChild(e._generatePageButton(s));
            this.footerRedraw()
        }
        ,
        V.prototype._generatePageButton = function(e) {
            var t = this
                , o = document.createElement("button");
            return o.classList.add("tabulator-page"),
            e == t.page && o.classList.add("active"),
                o.setAttribute("type", "button"),
                o.setAttribute("role", "button"),
                t.table.modules.localize.bind("pagination|page_title", function(t) {
                    o.setAttribute("aria-label", t + " " + e),
                        o.setAttribute("title", t + " " + e)
                }),
                o.setAttribute("data-page", e),
                o.textContent = e,
                o.addEventListener("click", function(o) {
                    t.setPage(e).then(function() {}).catch(function() {})
                }),
                o
        }
        ,
        V.prototype.previousPage = function() {
            var e = this;
            return new Promise(function(t, o) {
                    e.page > 1 ? (e.page--,
                        e.trigger().then(function() {
                            t()
                        }).catch(function() {
                            o()
                        }),
                    e.table.options.persistence && e.table.modExists("persistence", !0) && e.table.modules.persistence.config.page && e.table.modules.persistence.save("page")) : (console.warn("Pagination Error - Previous page would be less than page 1:", 0),
                        o())
                }
            )
        }
        ,
        V.prototype.nextPage = function() {
            var e = this;
            return new Promise(function(t, o) {
                    e.page < e.max ? (e.page++,
                        e.trigger().then(function() {
                            t()
                        }).catch(function() {
                            o()
                        }),
                    e.table.options.persistence && e.table.modExists("persistence", !0) && e.table.modules.persistence.config.page && e.table.modules.persistence.save("page")) : (e.progressiveLoad || console.warn("Pagination Error - Next page would be greater than maximum page of " + e.max + ":", e.max + 1),
                        o())
                }
            )
        }
        ,
        V.prototype.getPage = function() {
            return this.page
        }
        ,
        V.prototype.getPageMax = function() {
            return this.max
        }
        ,
        V.prototype.getPageSize = function(e) {
            return this.size
        }
        ,
        V.prototype.getMode = function() {
            return this.mode
        }
        ,
        V.prototype.getRows = function(e) {
            var t, o, i;
            if ("local" == this.mode) {
                t = [],
                    !0 === this.size ? (o = 0,
                        i = e.length) : (o = this.size * (this.page - 1),
                        i = o + parseInt(this.size)),
                    this._setPageButtons();
                for (var n = o; n < i; n++)
                    e[n] && t.push(e[n]);
                return t
            }
            return this._setPageButtons(),
                e.slice(0)
        }
        ,
        V.prototype.trigger = function() {
            var e, t = this;
            return new Promise(function(o, i) {
                    switch (t.mode) {
                        case "local":
                            e = t.table.rowManager.scrollLeft,
                                t.table.rowManager.refreshActiveData("page"),
                                t.table.rowManager.scrollHorizontal(e),
                                t.table.options.pageLoaded.call(t.table, t.getPage()),
                                o();
                            break;
                        case "remote":
                        case "progressive_load":
                        case "progressive_scroll":
                            t.table.modules.ajax.blockActiveRequest(),
                                t._getRemotePage().then(function() {
                                    o()
                                }).catch(function() {
                                    i()
                                });
                            break;
                        default:
                            console.warn("Pagination Error - no such pagination mode:", t.mode),
                                i()
                    }
                }
            )
        }
        ,
        V.prototype._getRemotePage = function() {
            var e, t, o = this, i = this;
            return new Promise(function(n, s) {
                    if (i.table.modExists("ajax", !0) || s(),
                        e = h.prototype.helpers.deepClone(i.table.modules.ajax.getParams() || {}),
                        t = i.table.modules.ajax.getParams(),
                        t[o.dataSentNames.page] = i.page,
                    o.size && (t[o.dataSentNames.size] = o.size),
                    o.table.options.ajaxSorting && o.table.modExists("sort")) {
                        var a = i.table.modules.sort.getSort();
                        a.forEach(function(e) {
                            delete e.column
                        }),
                            t[o.dataSentNames.sorters] = a
                    }
                    if (o.table.options.ajaxFiltering && o.table.modExists("filter")) {
                        var r = i.table.modules.filter.getFilters(!0, !0);
                        t[o.dataSentNames.filters] = r
                    }
                    i.table.modules.ajax.setParams(t),
                        i.table.modules.ajax.sendRequest(o.progressiveLoad).then(function(e) {
                            i._parseRemoteData(e),
                                n()
                        }).catch(function(e) {
                            s()
                        }),
                        i.table.modules.ajax.setParams(e)
                }
            )
        }
        ,
        V.prototype._parseRemoteData = function(e) {
            var t, e, o, i = this;
            if (void 0 === e[this.dataReceivedNames.last_page] && console.warn("Remote Pagination Error - Server response missing '" + this.dataReceivedNames.last_page + "' property"),
                e[this.dataReceivedNames.data]) {
                if (this.max = parseInt(e[this.dataReceivedNames.last_page]) || 1,
                    this.progressiveLoad)
                    switch (this.mode) {
                        case "progressive_load":
                            1 == this.page ? this.table.rowManager.setData(e[this.dataReceivedNames.data], !1, this.initialLoad && 1 == this.page) : this.table.rowManager.addRows(e[this.dataReceivedNames.data]),
                            this.page < this.max && setTimeout(function() {
                                i.nextPage().then(function() {}).catch(function() {})
                            }, i.table.options.ajaxProgressiveLoadDelay);
                            break;
                        case "progressive_scroll":
                            e = this.table.rowManager.getData().concat(e[this.dataReceivedNames.data]),
                                this.table.rowManager.setData(e, !0, this.initialLoad && 1 == this.page),
                                o = this.table.options.ajaxProgressiveLoadScrollMargin || 2 * this.table.rowManager.element.clientHeight,
                            i.table.rowManager.element.scrollHeight <= i.table.rowManager.element.clientHeight + o && i.nextPage().then(function() {}).catch(function() {})
                    }
                else
                    t = this.table.rowManager.scrollLeft,
                        this.table.rowManager.setData(e[this.dataReceivedNames.data], !1, this.initialLoad && 1 == this.page),
                        this.table.rowManager.scrollHorizontal(t),
                        this.table.columnManager.scrollHorizontal(t),
                        this.table.options.pageLoaded.call(this.table, this.getPage());
                this.initialLoad = !1
            } else
                console.warn("Remote Pagination Error - Server response missing '" + this.dataReceivedNames.data + "' property")
        }
        ,
        V.prototype.footerRedraw = function() {
            var e = this.table.footerManager.element;
            Math.ceil(e.clientWidth) - e.scrollWidth < 0 ? this.pagesElement.style.display = "none" : (this.pagesElement.style.display = "",
            Math.ceil(e.clientWidth) - e.scrollWidth < 0 && (this.pagesElement.style.display = "none"))
        }
        ,
        V.prototype.paginationDataSentNames = {
            page: "page",
            size: "size",
            sorters: "sorters",
            filters: "filters"
        },
        V.prototype.paginationDataReceivedNames = {
            current_page: "current_page",
            last_page: "last_page",
            data: "data"
        },
        h.prototype.registerModule("page", V);
    var j = function(e) {
        this.table = e,
            this.mode = "",
            this.id = "",
            this.defWatcherBlock = !1,
            this.config = {},
            this.readFunc = !1,
            this.writeFunc = !1
    };
    j.prototype.localStorageTest = function() {
        var e = "_tabulator_test";
        try {
            return window.localStorage.setItem(e, e),
                window.localStorage.removeItem(e),
                !0
        } catch (e) {
            return !1
        }
    }
        ,
        j.prototype.initialize = function() {
            var e, t = this.table.options.persistenceMode, o = this.table.options.persistenceID;
            this.mode = !0 !== t ? t : this.localStorageTest() ? "local" : "cookie",
                this.table.options.persistenceReaderFunc ? "function" == typeof this.table.options.persistenceReaderFunc ? this.readFunc = this.table.options.persistenceReaderFunc : this.readers[this.table.options.persistenceReaderFunc] ? this.readFunc = this.readers[this.table.options.persistenceReaderFunc] : console.warn("Persistence Read Error - invalid reader set", this.table.options.persistenceReaderFunc) : this.readers[this.mode] ? this.readFunc = this.readers[this.mode] : console.warn("Persistence Read Error - invalid reader set", this.mode),
                this.table.options.persistenceWriterFunc ? "function" == typeof this.table.options.persistenceWriterFunc ? this.writeFunc = this.table.options.persistenceWriterFunc : this.readers[this.table.options.persistenceWriterFunc] ? this.writeFunc = this.readers[this.table.options.persistenceWriterFunc] : console.warn("Persistence Write Error - invalid reader set", this.table.options.persistenceWriterFunc) : this.writers[this.mode] ? this.writeFunc = this.writers[this.mode] : console.warn("Persistence Write Error - invalid writer set", this.mode),
                this.id = "tabulator-" + (o || this.table.element.getAttribute("id") || ""),
                this.config = {
                    sort: !0 === this.table.options.persistence || this.table.options.persistence.sort,
                    filter: !0 === this.table.options.persistence || this.table.options.persistence.filter,
                    group: !0 === this.table.options.persistence || this.table.options.persistence.group,
                    page: !0 === this.table.options.persistence || this.table.options.persistence.page,
                    columns: !0 === this.table.options.persistence ? ["title", "width", "visible"] : this.table.options.persistence.columns
                },
            this.config.page && (e = this.retreiveData("page")) && (void 0 === e.paginationSize || !0 !== this.config.page && !this.config.page.size || (this.table.options.paginationSize = e.paginationSize),
            void 0 === e.paginationInitialPage || !0 !== this.config.page && !this.config.page.page || (this.table.options.paginationInitialPage = e.paginationInitialPage)),
            this.config.group && (e = this.retreiveData("group")) && (void 0 === e.groupBy || !0 !== this.config.group && !this.config.group.groupBy || (this.table.options.groupBy = e.groupBy),
            void 0 === e.groupStartOpen || !0 !== this.config.group && !this.config.group.groupStartOpen || (this.table.options.groupStartOpen = e.groupStartOpen),
            void 0 === e.groupHeader || !0 !== this.config.group && !this.config.group.groupHeader || (this.table.options.groupHeader = e.groupHeader)),
            this.config.columns && (this.table.options.columns = this.load("columns", this.table.options.columns))
        }
        ,
        j.prototype.initializeColumn = function(e) {
            var t, o, i = this;
            this.config.columns && (this.defWatcherBlock = !0,
                t = e.getDefinition(),
                o = !0 === this.config.columns ? Object.keys(t) : this.config.columns,
                o.forEach(function(e) {
                    var o = Object.getOwnPropertyDescriptor(t, e)
                        , n = t[e];
                    o && Object.defineProperty(t, e, {
                        set: function(e) {
                            n = e,
                            i.defWatcherBlock || i.save("columns"),
                            o.set && o.set(e)
                        },
                        get: function() {
                            return o.get && o.get(),
                                n
                        }
                    })
                }),
                this.defWatcherBlock = !1)
        }
        ,
        j.prototype.load = function(e, t) {
            var o = this.retreiveData(e);
            return t && (o = o ? this.mergeDefinition(t, o) : t),
                o
        }
        ,
        j.prototype.retreiveData = function(e) {
            return !!this.readFunc && this.readFunc(this.id, e)
        }
        ,
        j.prototype.mergeDefinition = function(e, t) {
            var o = this
                , i = [];
            return t = t || [],
                t.forEach(function(t, n) {
                    var s, a = o._findColumn(e, t);
                    a && (!0 === o.config.columns || void 0 == o.config.columns ? (s = Object.keys(a),
                        s.push("width")) : s = o.config.columns,
                        s.forEach(function(e) {
                            "columns" !== e && void 0 !== t[e] && (a[e] = t[e])
                        }),
                    a.columns && (a.columns = o.mergeDefinition(a.columns, t.columns)),
                        i.push(a))
                }),
                e.forEach(function(e, n) {
                    o._findColumn(t, e) || (i.length > n ? i.splice(n, 0, e) : i.push(e))
                }),
                i
        }
        ,
        j.prototype._findColumn = function(e, t) {
            var o = t.columns ? "group" : t.field ? "field" : "object";
            return e.find(function(e) {
                switch (o) {
                    case "group":
                        return e.title === t.title && e.columns.length === t.columns.length;
                    case "field":
                        return e.field === t.field;
                    case "object":
                        return e === t
                }
            })
        }
        ,
        j.prototype.save = function(e) {
            var t = {};
            switch (e) {
                case "columns":
                    t = this.parseColumns(this.table.columnManager.getColumns());
                    break;
                case "filter":
                    t = this.table.modules.filter.getFilters();
                    break;
                case "sort":
                    t = this.validateSorters(this.table.modules.sort.getSort());
                    break;
                case "group":
                    t = this.getGroupConfig();
                    break;
                case "page":
                    t = this.getPageConfig()
            }
            this.writeFunc && this.writeFunc(this.id, e, t)
        }
        ,
        j.prototype.validateSorters = function(e) {
            return e.forEach(function(e) {
                e.column = e.field,
                    delete e.field
            }),
                e
        }
        ,
        j.prototype.getGroupConfig = function() {
            var e = {};
            return this.config.group && ((!0 === this.config.group || this.config.group.groupBy) && (e.groupBy = this.table.options.groupBy),
            (!0 === this.config.group || this.config.group.groupStartOpen) && (e.groupStartOpen = this.table.options.groupStartOpen),
            (!0 === this.config.group || this.config.group.groupHeader) && (e.groupHeader = this.table.options.groupHeader)),
                e
        }
        ,
        j.prototype.getPageConfig = function() {
            var e = {};
            return this.config.page && ((!0 === this.config.page || this.config.page.size) && (e.paginationSize = this.table.modules.page.getPageSize()),
            (!0 === this.config.page || this.config.page.page) && (e.paginationInitialPage = this.table.modules.page.getPage())),
                e
        }
        ,
        j.prototype.parseColumns = function(e) {
            var t = this
                , o = []
                , i = ["headerContextMenu", "headerMenu", "contextMenu", "clickMenu"];
            return e.forEach(function(e) {
                var n, s = {}, a = e.getDefinition();
                e.isGroup ? (s.title = a.title,
                    s.columns = t.parseColumns(e.getColumns())) : (s.field = e.getField(),
                    !0 === t.config.columns || void 0 == t.config.columns ? (n = Object.keys(a),
                        n.push("width")) : n = t.config.columns,
                    n.forEach(function(t) {
                        switch (t) {
                            case "width":
                                s.width = e.getWidth();
                                break;
                            case "visible":
                                s.visible = e.visible;
                                break;
                            default:
                                "function" != typeof a[t] && -1 === i.indexOf(t) && (s[t] = a[t])
                        }
                    })),
                    o.push(s)
            }),
                o
        }
        ,
        j.prototype.readers = {
            local: function(e, t) {
                var o = localStorage.getItem(e + "-" + t);
                return !!o && JSON.parse(o)
            },
            cookie: function(e, t) {
                var o, i, n = document.cookie, s = e + "-" + t, a = n.indexOf(s + "=");
                return a > -1 && (n = n.substr(a),
                    o = n.indexOf(";"),
                o > -1 && (n = n.substr(0, o)),
                    i = n.replace(s + "=", "")),
                !!i && JSON.parse(i)
            }
        },
        j.prototype.writers = {
            local: function(e, t, o) {
                localStorage.setItem(e + "-" + t, JSON.stringify(o))
            },
            cookie: function(e, t, o) {
                var i = new Date;
                i.setDate(i.getDate() + 1e4),
                    document.cookie = e + "-" + t + "=" + JSON.stringify(o) + "; expires=" + i.toUTCString()
            }
        },
        h.prototype.registerModule("persistence", j);
    var W = function(e) {
        this.table = e,
            this.element = !1,
            this.manualBlock = !1
    };
    W.prototype.initialize = function() {
        window.addEventListener("beforeprint", this.replaceTable.bind(this)),
            window.addEventListener("afterprint", this.cleanup.bind(this))
    }
        ,
        W.prototype.replaceTable = function() {
            this.manualBlock || (this.element = document.createElement("div"),
                this.element.classList.add("tabulator-print-table"),
                this.element.appendChild(this.table.modules.export.genereateTable(this.table.options.printConfig, this.table.options.printStyled, this.table.options.printRowRange, "print")),
                this.table.element.style.display = "none",
                this.table.element.parentNode.insertBefore(this.element, this.table.element))
        }
        ,
        W.prototype.cleanup = function() {
            document.body.classList.remove("tabulator-print-fullscreen-hide"),
            this.element && this.element.parentNode && (this.element.parentNode.removeChild(this.element),
                this.table.element.style.display = "")
        }
        ,
        W.prototype.printFullscreen = function(e, t, o) {
            var i, n, s = window.scrollX, a = window.scrollY, r = document.createElement("div"), l = document.createElement("div"), c = this.table.modules.export.genereateTable(void 0 !== o ? o : this.table.options.printConfig, void 0 !== t ? t : this.table.options.printStyled, e, "print");
            this.manualBlock = !0,
                this.element = document.createElement("div"),
                this.element.classList.add("tabulator-print-fullscreen"),
            this.table.options.printHeader && (r.classList.add("tabulator-print-header"),
                i = "function" == typeof this.table.options.printHeader ? this.table.options.printHeader.call(this.table) : this.table.options.printHeader,
                "string" == typeof i ? r.innerHTML = i : r.appendChild(i),
                this.element.appendChild(r)),
                this.element.appendChild(c),
            this.table.options.printFooter && (l.classList.add("tabulator-print-footer"),
                n = "function" == typeof this.table.options.printFooter ? this.table.options.printFooter.call(this.table) : this.table.options.printFooter,
                "string" == typeof n ? l.innerHTML = n : l.appendChild(n),
                this.element.appendChild(l)),
                document.body.classList.add("tabulator-print-fullscreen-hide"),
                document.body.appendChild(this.element),
            this.table.options.printFormatter && this.table.options.printFormatter(this.element, c),
                window.print(),
                this.cleanup(),
                window.scrollTo(s, a),
                this.manualBlock = !1
        }
        ,
        h.prototype.registerModule("print", W);
    var G = function(e) {
        this.table = e,
            this.data = !1,
            this.blocked = !1,
            this.origFuncs = {},
            this.currentVersion = 0
    };
    G.prototype.watchData = function(e) {
        var t, o = this;
        this.currentVersion++,
            t = this.currentVersion,
            o.unwatchData(),
            o.data = e,
            o.origFuncs.push = e.push,
            Object.defineProperty(o.data, "push", {
                enumerable: !1,
                configurable: !0,
                value: function() {
                    var i = Array.from(arguments);
                    return o.blocked || t !== o.currentVersion || i.forEach(function(e) {
                        o.table.rowManager.addRowActual(e, !1)
                    }),
                        o.origFuncs.push.apply(e, arguments)
                }
            }),
            o.origFuncs.unshift = e.unshift,
            Object.defineProperty(o.data, "unshift", {
                enumerable: !1,
                configurable: !0,
                value: function() {
                    var i = Array.from(arguments);
                    return o.blocked || t !== o.currentVersion || i.forEach(function(e) {
                        o.table.rowManager.addRowActual(e, !0)
                    }),
                        o.origFuncs.unshift.apply(e, arguments)
                }
            }),
            o.origFuncs.shift = e.shift,
            Object.defineProperty(o.data, "shift", {
                enumerable: !1,
                configurable: !0,
                value: function() {
                    var i;
                    return o.blocked || t !== o.currentVersion || o.data.length && (i = o.table.rowManager.getRowFromDataObject(o.data[0])) && i.deleteActual(),
                        o.origFuncs.shift.call(e)
                }
            }),
            o.origFuncs.pop = e.pop,
            Object.defineProperty(o.data, "pop", {
                enumerable: !1,
                configurable: !0,
                value: function() {
                    var i;
                    return o.blocked || t !== o.currentVersion || o.data.length && (i = o.table.rowManager.getRowFromDataObject(o.data[o.data.length - 1])) && i.deleteActual(),
                        o.origFuncs.pop.call(e)
                }
            }),
            o.origFuncs.splice = e.splice,
            Object.defineProperty(o.data, "splice", {
                enumerable: !1,
                configurable: !0,
                value: function() {
                    var i, n = Array.from(arguments), s = n[0] < 0 ? e.length + n[0] : n[0], a = n[1], r = !!n[2] && n.slice(2);
                    if (!o.blocked && t === o.currentVersion) {
                        if (r && (i = !!e[s] && o.table.rowManager.getRowFromDataObject(e[s]),
                            i ? r.forEach(function(e) {
                                o.table.rowManager.addRowActual(e, !0, i, !0)
                            }) : (r = r.slice().reverse(),
                                r.forEach(function(e) {
                                    o.table.rowManager.addRowActual(e, !0, !1, !0)
                                }))),
                        0 !== a) {
                            var l = e.slice(s, void 0 === n[1] ? n[1] : s + a);
                            l.forEach(function(e, t) {
                                var i = o.table.rowManager.getRowFromDataObject(e);
                                i && i.deleteActual(t !== l.length - 1)
                            })
                        }
                        (r || 0 !== a) && o.table.rowManager.reRenderInPosition()
                    }
                    return o.origFuncs.splice.apply(e, arguments)
                }
            })
    }
        ,
        G.prototype.unwatchData = function() {
            if (!1 !== this.data)
                for (var e in this.origFuncs)
                    Object.defineProperty(this.data, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: this.origFuncs.key
                    })
        }
        ,
        G.prototype.watchRow = function(e) {
            var t = e.getData();
            this.blocked = !0;
            for (var o in t)
                this.watchKey(e, t, o);
            this.table.options.dataTree && this.watchTreeChildren(e),
                this.blocked = !1
        }
        ,
        G.prototype.watchTreeChildren = function(e) {
            function t() {
                o.table.modules.dataTree.initializeRow(e),
                    o.table.modules.dataTree.layoutRow(e),
                    o.table.rowManager.refreshActiveData("tree", !1, !0)
            }
            var o = this
                , i = e.getData()[this.table.options.dataTreeChildField]
                , n = {};
            i && (n.push = i.push,
                Object.defineProperty(i, "push", {
                    enumerable: !1,
                    configurable: !0,
                    value: function() {
                        var e = n.push.apply(i, arguments);
                        return t(),
                            e
                    }
                }),
                n.unshift = i.unshift,
                Object.defineProperty(i, "unshift", {
                    enumerable: !1,
                    configurable: !0,
                    value: function() {
                        var e = n.unshift.apply(i, arguments);
                        return t(),
                            e
                    }
                }),
                n.shift = i.shift,
                Object.defineProperty(i, "shift", {
                    enumerable: !1,
                    configurable: !0,
                    value: function() {
                        var e = n.shift.call(i);
                        return t(),
                            e
                    }
                }),
                n.pop = i.pop,
                Object.defineProperty(i, "pop", {
                    enumerable: !1,
                    configurable: !0,
                    value: function() {
                        var e = n.pop.call(i);
                        return t(),
                            e
                    }
                }),
                n.splice = i.splice,
                Object.defineProperty(i, "splice", {
                    enumerable: !1,
                    configurable: !0,
                    value: function() {
                        var e = n.splice.apply(i, arguments);
                        return t(),
                            e
                    }
                }))
        }
        ,
        G.prototype.watchKey = function(e, t, o) {
            var i = this
                , n = Object.getOwnPropertyDescriptor(t, o)
                , s = t[o]
                , a = this.currentVersion;
            Object.defineProperty(t, o, {
                set: function(t) {
                    if (s = t,
                    !i.blocked && a === i.currentVersion) {
                        var r = {};
                        r[o] = t,
                            e.updateData(r)
                    }
                    n.set && n.set(t)
                },
                get: function() {
                    return n.get && n.get(),
                        s
                }
            })
        }
        ,
        G.prototype.unwatchRow = function(e) {
            var t = e.getData();
            for (var o in t)
                Object.defineProperty(t, o, {
                    value: t[o]
                })
        }
        ,
        G.prototype.block = function() {
            this.blocked = !0
        }
        ,
        G.prototype.unblock = function() {
            this.blocked = !1
        }
        ,
        h.prototype.registerModule("reactiveData", G);
    var U = function(e) {
        this.table = e,
            this.startColumn = !1,
            this.startX = !1,
            this.startWidth = !1,
            this.handle = null,
            this.prevHandle = null
    };
    U.prototype.initializeColumn = function(e, t, o) {
        var i = this
            , n = !1
            , s = this.table.options.resizableColumns;
        if ("header" === e && (n = "textarea" == t.definition.formatter || t.definition.variableHeight,
            t.modules.resize = {
                variableHeight: n
            }),
        !0 === s || s == e) {
            var a = document.createElement("div");
            a.className = "tabulator-col-resize-handle";
            var r = document.createElement("div");
            r.className = "tabulator-col-resize-handle prev",
                a.addEventListener("click", function(e) {
                    e.stopPropagation()
                });
            var l = function(e) {
                var o = t.getLastColumn();
                o && i._checkResizability(o) && (i.startColumn = t,
                    i._mouseDown(e, o, a))
            };
            a.addEventListener("mousedown", l),
                a.addEventListener("touchstart", l, {
                    passive: !0
                }),
                a.addEventListener("dblclick", function(e) {
                    var o = t.getLastColumn();
                    o && i._checkResizability(o) && (e.stopPropagation(),
                        o.reinitializeWidth(!0))
                }),
                r.addEventListener("click", function(e) {
                    e.stopPropagation()
                });
            var c = function(e) {
                var o, n, s;
                (o = t.getFirstColumn()) && (n = i.table.columnManager.findColumnIndex(o),
                (s = n > 0 && i.table.columnManager.getColumnByIndex(n - 1)) && i._checkResizability(s) && (i.startColumn = t,
                    i._mouseDown(e, s, r)))
            };
            r.addEventListener("mousedown", c),
                r.addEventListener("touchstart", c, {
                    passive: !0
                }),
                r.addEventListener("dblclick", function(e) {
                    var o, n, s;
                    (o = t.getFirstColumn()) && (n = i.table.columnManager.findColumnIndex(o),
                    (s = n > 0 && i.table.columnManager.getColumnByIndex(n - 1)) && i._checkResizability(s) && (e.stopPropagation(),
                        s.reinitializeWidth(!0)))
                }),
                o.appendChild(a),
                o.appendChild(r)
        }
    }
        ,
        U.prototype._checkResizability = function(e) {
            return void 0 !== e.definition.resizable ? e.definition.resizable : this.table.options.resizableColumns
        }
        ,
        U.prototype._mouseDown = function(e, t, o) {
            function i(e) {
                s.table.rtl ? t.setWidth(s.startWidth - ((void 0 === e.screenX ? e.touches[0].screenX : e.screenX) - s.startX)) : t.setWidth(s.startWidth + ((void 0 === e.screenX ? e.touches[0].screenX : e.screenX) - s.startX)),
                s.table.options.virtualDomHoz && s.table.vdomHoz.reinitialize(!0),
                !s.table.browserSlow && t.modules.resize && t.modules.resize.variableHeight && t.checkCellHeights()
            }
            function n(e) {
                s.startColumn.modules.edit && (s.startColumn.modules.edit.blocked = !1),
                s.table.browserSlow && t.modules.resize && t.modules.resize.variableHeight && t.checkCellHeights(),
                    document.body.removeEventListener("mouseup", n),
                    document.body.removeEventListener("mousemove", i),
                    o.removeEventListener("touchmove", i),
                    o.removeEventListener("touchend", n),
                    s.table.element.classList.remove("tabulator-block-select"),
                s.table.options.persistence && s.table.modExists("persistence", !0) && s.table.modules.persistence.config.columns && s.table.modules.persistence.save("columns"),
                    s.table.options.columnResized.call(s.table, t.getComponent())
            }
            var s = this;
            s.table.element.classList.add("tabulator-block-select"),
                e.stopPropagation(),
            s.startColumn.modules.edit && (s.startColumn.modules.edit.blocked = !0),
                s.startX = void 0 === e.screenX ? e.touches[0].screenX : e.screenX,
                s.startWidth = t.getWidth(),
                document.body.addEventListener("mousemove", i),
                document.body.addEventListener("mouseup", n),
                o.addEventListener("touchmove", i, {
                    passive: !0
                }),
                o.addEventListener("touchend", n)
        }
        ,
        h.prototype.registerModule("resizeColumns", U);
    var X = function(e) {
        this.table = e,
            this.startColumn = !1,
            this.startY = !1,
            this.startHeight = !1,
            this.handle = null,
            this.prevHandle = null
    };
    X.prototype.initializeRow = function(e) {
        var t = this
            , o = e.getElement()
            , i = document.createElement("div");
        i.className = "tabulator-row-resize-handle";
        var n = document.createElement("div");
        n.className = "tabulator-row-resize-handle prev",
            i.addEventListener("click", function(e) {
                e.stopPropagation()
            });
        var s = function(o) {
            t.startRow = e,
                t._mouseDown(o, e, i)
        };
        i.addEventListener("mousedown", s),
            i.addEventListener("touchstart", s, {
                passive: !0
            }),
            n.addEventListener("click", function(e) {
                e.stopPropagation()
            });
        var a = function(o) {
            var i = t.table.rowManager.prevDisplayRow(e);
            i && (t.startRow = i,
                t._mouseDown(o, i, n))
        };
        n.addEventListener("mousedown", a),
            n.addEventListener("touchstart", a, {
                passive: !0
            }),
            o.appendChild(i),
            o.appendChild(n)
    }
        ,
        X.prototype._mouseDown = function(e, t, o) {
            function i(e) {
                t.setHeight(s.startHeight + ((void 0 === e.screenY ? e.touches[0].screenY : e.screenY) - s.startY))
            }
            function n(e) {
                document.body.removeEventListener("mouseup", i),
                    document.body.removeEventListener("mousemove", i),
                    o.removeEventListener("touchmove", i),
                    o.removeEventListener("touchend", n),
                    s.table.element.classList.remove("tabulator-block-select"),
                    s.table.options.rowResized.call(this.table, t.getComponent())
            }
            var s = this;
            s.table.element.classList.add("tabulator-block-select"),
                e.stopPropagation(),
                s.startY = void 0 === e.screenY ? e.touches[0].screenY : e.screenY,
                s.startHeight = t.getHeight(),
                document.body.addEventListener("mousemove", i),
                document.body.addEventListener("mouseup", n),
                o.addEventListener("touchmove", i, {
                    passive: !0
                }),
                o.addEventListener("touchend", n)
        }
        ,
        h.prototype.registerModule("resizeRows", X);
    var q = function(e) {
        this.table = e,
            this.binding = !1,
            this.observer = !1,
            this.containerObserver = !1,
            this.tableHeight = 0,
            this.tableWidth = 0,
            this.containerHeight = 0,
            this.containerWidth = 0,
            this.autoResize = !1
    };
    q.prototype.initialize = function(e) {
        var t, o = this, i = this.table;
        this.tableHeight = i.element.clientHeight,
            this.tableWidth = i.element.clientWidth,
        i.element.parentNode && (this.containerHeight = i.element.parentNode.clientHeight,
            this.containerWidth = i.element.parentNode.clientWidth),
            "undefined" != typeof ResizeObserver && "virtual" === i.rowManager.getRenderMode() ? (this.autoResize = !0,
                this.observer = new ResizeObserver(function(e) {
                        if (!i.browserMobile || i.browserMobile && !i.modules.edit.currentCell) {
                            var t = Math.floor(e[0].contentRect.height)
                                , n = Math.floor(e[0].contentRect.width);
                            o.tableHeight == t && o.tableWidth == n || (o.tableHeight = t,
                                o.tableWidth = n,
                            i.element.parentNode && (o.containerHeight = i.element.parentNode.clientHeight,
                                o.containerWidth = i.element.parentNode.clientWidth),
                            i.options.virtualDomHoz && i.vdomHoz.reinitialize(!0),
                                i.redraw())
                        }
                    }
                ),
                this.observer.observe(i.element),
                t = window.getComputedStyle(i.element),
            this.table.element.parentNode && !this.table.rowManager.fixedHeight && (t.getPropertyValue("max-height") || t.getPropertyValue("min-height")) && (this.containerObserver = new ResizeObserver(function(e) {
                    if (!i.browserMobile || i.browserMobile && !i.modules.edit.currentCell) {
                        var t = Math.floor(e[0].contentRect.height)
                            , n = Math.floor(e[0].contentRect.width);
                        o.containerHeight == t && o.containerWidth == n || (o.containerHeight = t,
                            o.containerWidth = n,
                            o.tableHeight = i.element.clientHeight,
                            o.tableWidth = i.element.clientWidth),
                        i.options.virtualDomHoz && i.vdomHoz.reinitialize(!0),
                            i.redraw()
                    }
                }
            ),
                this.containerObserver.observe(this.table.element.parentNode))) : (this.binding = function() {
                (!i.browserMobile || i.browserMobile && !i.modules.edit.currentCell) && (i.options.virtualDomHoz && i.vdomHoz.reinitialize(!0),
                    i.redraw())
            }
                ,
                window.addEventListener("resize", this.binding))
    }
        ,
        q.prototype.clearBindings = function(e) {
            this.binding && window.removeEventListener("resize", this.binding),
            this.observer && this.observer.unobserve(this.table.element),
            this.containerObserver && this.containerObserver.unobserve(this.table.element.parentNode)
        }
        ,
        h.prototype.registerModule("resizeTable", q);
    var Y = function(e) {
        this.table = e,
            this.columns = [],
            this.hiddenColumns = [],
            this.mode = "",
            this.index = 0,
            this.collapseFormatter = [],
            this.collapseStartOpen = !0,
            this.collapseHandleColumn = !1
    };
    Y.prototype.initialize = function() {
        var e = this
            , t = [];
        this.mode = this.table.options.responsiveLayout,
            this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData,
            this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen,
            this.hiddenColumns = [],
            this.table.columnManager.columnsByIndex.forEach(function(o, i) {
                o.modules.responsive && o.modules.responsive.order && o.modules.responsive.visible && (o.modules.responsive.index = i,
                    t.push(o),
                o.visible || "collapse" !== e.mode || e.hiddenColumns.push(o))
            }),
            t = t.reverse(),
            t = t.sort(function(e, t) {
                return t.modules.responsive.order - e.modules.responsive.order || t.modules.responsive.index - e.modules.responsive.index
            }),
            this.columns = t,
        "collapse" === this.mode && this.generateCollapsedContent();
        for (var o = this.table.columnManager.columnsByIndex, i = Array.isArray(o), n = 0, o = i ? o : o[Symbol.iterator](); ; ) {
            var s;
            if (i) {
                if (n >= o.length)
                    break;
                s = o[n++]
            } else {
                if (n = o.next(),
                    n.done)
                    break;
                s = n.value
            }
            var a = s;
            if ("responsiveCollapse" == a.definition.formatter) {
                this.collapseHandleColumn = a;
                break
            }
        }
        this.collapseHandleColumn && (this.hiddenColumns.length ? this.collapseHandleColumn.show() : this.collapseHandleColumn.hide())
    }
        ,
        Y.prototype.initializeColumn = function(e) {
            var t = e.getDefinition();
            e.modules.responsive = {
                order: void 0 === t.responsive ? 1 : t.responsive,
                visible: !1 !== t.visible
            }
        }
        ,
        Y.prototype.initializeRow = function(e) {
            var t;
            "calc" !== e.type && (t = document.createElement("div"),
                t.classList.add("tabulator-responsive-collapse"),
                e.modules.responsiveLayout = {
                    element: t,
                    open: this.collapseStartOpen
                },
            this.collapseStartOpen || (t.style.display = "none"))
        }
        ,
        Y.prototype.layoutRow = function(e) {
            var t = e.getElement();
            e.modules.responsiveLayout && (t.appendChild(e.modules.responsiveLayout.element),
                this.generateCollapsedRowContent(e))
        }
        ,
        Y.prototype.updateColumnVisibility = function(e, t) {
            e.modules.responsive && (e.modules.responsive.visible = t,
                this.initialize())
        }
        ,
        Y.prototype.hideColumn = function(e) {
            var t = this.hiddenColumns.length;
            e.hide(!1, !0),
            "collapse" === this.mode && (this.hiddenColumns.unshift(e),
                this.generateCollapsedContent(),
            this.collapseHandleColumn && !t && this.collapseHandleColumn.show())
        }
        ,
        Y.prototype.showColumn = function(e) {
            var t;
            e.show(!1, !0),
                e.setWidth(e.getWidth()),
            "collapse" === this.mode && (t = this.hiddenColumns.indexOf(e),
            t > -1 && this.hiddenColumns.splice(t, 1),
                this.generateCollapsedContent(),
            this.collapseHandleColumn && !this.hiddenColumns.length && this.collapseHandleColumn.hide())
        }
        ,
        Y.prototype.update = function() {
            for (var e = this, t = !0; t; ) {
                var o = "fitColumns" == e.table.modules.layout.getMode() ? e.table.columnManager.getFlexBaseWidth() : e.table.columnManager.getWidth()
                    , i = (e.table.options.headerVisible ? e.table.columnManager.element.clientWidth : e.table.element.clientWidth) - o;
                if (i < 0) {
                    var n = e.columns[e.index];
                    n ? (e.hideColumn(n),
                        e.index++) : t = !1
                } else {
                    var s = e.columns[e.index - 1];
                    s && i > 0 && i >= s.getWidth() ? (e.showColumn(s),
                        e.index--) : t = !1
                }
                e.table.rowManager.activeRowsCount || e.table.rowManager.renderEmptyScroll()
            }
        }
        ,
        Y.prototype.generateCollapsedContent = function() {
            var e = this;
            this.table.rowManager.getDisplayRows().forEach(function(t) {
                e.generateCollapsedRowContent(t)
            })
        }
        ,
        Y.prototype.generateCollapsedRowContent = function(e) {
            var t, o;
            if (e.modules.responsiveLayout) {
                for (t = e.modules.responsiveLayout.element; t.firstChild; )
                    t.removeChild(t.firstChild);
                o = this.collapseFormatter(this.generateCollapsedRowData(e)),
                o && t.appendChild(o)
            }
        }
        ,
        Y.prototype.generateCollapsedRowData = function(e) {
            var t, o = this, i = e.getData(), n = [];
            return this.hiddenColumns.forEach(function(s) {
                var a = s.getFieldValue(i);
                s.definition.title && s.field && (s.modules.format && o.table.options.responsiveLayoutCollapseUseFormatters ? (t = {
                    value: !1,
                    data: {},
                    getValue: function() {
                        return a
                    },
                    getData: function() {
                        return i
                    },
                    getElement: function() {
                        return document.createElement("div")
                    },
                    getRow: function() {
                        return e.getComponent()
                    },
                    getColumn: function() {
                        return s.getComponent()
                    }
                },
                    n.push({
                        field: s.field,
                        title: s.definition.title,
                        value: s.modules.format.formatter.call(o.table.modules.format, t, s.modules.format.params)
                    })) : n.push({
                    field: s.field,
                    title: s.definition.title,
                    value: a
                }))
            }),
                n
        }
        ,
        Y.prototype.formatCollapsedData = function(e) {
            var t = document.createElement("table");
            return e.forEach(function(e) {
                var o, i = document.createElement("tr"), n = document.createElement("td"), s = document.createElement("td"), a = document.createElement("strong");
                n.appendChild(a),
                    this.table.modules.localize.bind("columns|" + e.field, function(t) {
                        a.innerText = t || e.title
                    }),
                    e.value instanceof Node ? (o = document.createElement("div"),
                        o.appendChild(e.value),
                        s.appendChild(o)) : s.innerHTML = e.value,
                    i.appendChild(n),
                    i.appendChild(s),
                    t.appendChild(i)
            }, this),
                Object.keys(e).length ? t : ""
        }
        ,
        h.prototype.registerModule("responsiveLayout", Y);
    var K = function(e) {
        this.table = e,
            this.selecting = !1,
            this.lastClickedRow = !1,
            this.selectPrev = [],
            this.selectedRows = [],
            this.headerCheckboxElement = null
    };
    K.prototype.clearSelectionData = function(e) {
        this.selecting = !1,
            this.lastClickedRow = !1,
            this.selectPrev = [],
            this.selectedRows = [],
        e || this._rowSelectionChanged()
    }
        ,
        K.prototype.initializeRow = function(e) {
            var t = this
                , o = e.getElement()
                , i = function e() {
                setTimeout(function() {
                    t.selecting = !1
                }, 50),
                    document.body.removeEventListener("mouseup", e)
            };
            e.modules.select = {
                selected: !1
            },
                t.table.options.selectableCheck.call(this.table, e.getComponent()) ? (o.classList.add("tabulator-selectable"),
                    o.classList.remove("tabulator-unselectable"),
                t.table.options.selectable && "highlight" != t.table.options.selectable && ("click" === t.table.options.selectableRangeMode ? o.addEventListener("click", function(o) {
                    if (o.shiftKey) {
                        t.table._clearSelection(),
                            t.lastClickedRow = t.lastClickedRow || e;
                        var i = t.table.rowManager.getDisplayRowIndex(t.lastClickedRow)
                            , n = t.table.rowManager.getDisplayRowIndex(e)
                            , s = i <= n ? i : n
                            , a = i >= n ? i : n
                            , r = t.table.rowManager.getDisplayRows().slice(0)
                            , l = r.splice(s, a - s + 1);
                        o.ctrlKey || o.metaKey ? (l.forEach(function(o) {
                            o !== t.lastClickedRow && (!0 === t.table.options.selectable || t.isRowSelected(e) ? t.toggleRow(o) : t.selectedRows.length < t.table.options.selectable && t.toggleRow(o))
                        }),
                            t.lastClickedRow = e) : (t.deselectRows(void 0, !0),
                        !0 !== t.table.options.selectable && l.length > t.table.options.selectable && (l = l.slice(0, t.table.options.selectable)),
                            t.selectRows(l)),
                            t.table._clearSelection()
                    } else
                        o.ctrlKey || o.metaKey ? (t.toggleRow(e),
                            t.lastClickedRow = e) : (t.deselectRows(void 0, !0),
                            t.selectRows(e),
                            t.lastClickedRow = e)
                }) : (o.addEventListener("click", function(o) {
                    t.table.modExists("edit") && t.table.modules.edit.getCurrentCell() || t.table._clearSelection(),
                    t.selecting || t.toggleRow(e)
                }),
                    o.addEventListener("mousedown", function(o) {
                        if (o.shiftKey)
                            return t.table._clearSelection(),
                                t.selecting = !0,
                                t.selectPrev = [],
                                document.body.addEventListener("mouseup", i),
                                document.body.addEventListener("keyup", i),
                                t.toggleRow(e),
                                !1
                    }),
                    o.addEventListener("mouseenter", function(o) {
                        t.selecting && (t.table._clearSelection(),
                            t.toggleRow(e),
                        t.selectPrev[1] == e && t.toggleRow(t.selectPrev[0]))
                    }),
                    o.addEventListener("mouseout", function(o) {
                        t.selecting && (t.table._clearSelection(),
                            t.selectPrev.unshift(e))
                    })))) : (o.classList.add("tabulator-unselectable"),
                    o.classList.remove("tabulator-selectable"))
        }
        ,
        K.prototype.toggleRow = function(e) {
            this.table.options.selectableCheck.call(this.table, e.getComponent()) && (e.modules.select && e.modules.select.selected ? this._deselectRow(e) : this._selectRow(e))
        }
        ,
        K.prototype.selectRows = function(e) {
            var t, o = this;
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "undefined":
                    this.table.rowManager.rows.forEach(function(e) {
                        o._selectRow(e, !0, !0)
                    }),
                        this._rowSelectionChanged();
                    break;
                case "string":
                    t = this.table.rowManager.findRow(e),
                        t ? this._selectRow(t, !0, !0) : this.table.rowManager.getRows(e).forEach(function(e) {
                            o._selectRow(e, !0, !0)
                        }),
                        this._rowSelectionChanged();
                    break;
                default:
                    Array.isArray(e) ? (e.forEach(function(e) {
                        o._selectRow(e, !0, !0)
                    }),
                        this._rowSelectionChanged()) : this._selectRow(e, !1, !0)
            }
        }
        ,
        K.prototype._selectRow = function(e, t, o) {
            if (!isNaN(this.table.options.selectable) && !0 !== this.table.options.selectable && !o && this.selectedRows.length >= this.table.options.selectable) {
                if (!this.table.options.selectableRollingSelection)
                    return !1;
                this._deselectRow(this.selectedRows[0])
            }
            var i = this.table.rowManager.findRow(e);
            i ? -1 == this.selectedRows.indexOf(i) && (i.getElement().classList.add("tabulator-selected"),
            i.modules.select || (i.modules.select = {}),
                i.modules.select.selected = !0,
            i.modules.select.checkboxEl && (i.modules.select.checkboxEl.checked = !0),
                this.selectedRows.push(i),
            this.table.options.dataTreeSelectPropagate && this.childRowSelection(i, !0),
            t || this.table.options.rowSelected.call(this.table, i.getComponent()),
                this._rowSelectionChanged(t)) : t || console.warn("Selection Error - No such row found, ignoring selection:" + e)
        }
        ,
        K.prototype.isRowSelected = function(e) {
            return -1 !== this.selectedRows.indexOf(e)
        }
        ,
        K.prototype.deselectRows = function(e, t) {
            var o, i = this;
            if (void 0 === e) {
                o = i.selectedRows.length;
                for (var n = 0; n < o; n++)
                    i._deselectRow(i.selectedRows[0], !0);
                i._rowSelectionChanged(t)
            } else
                Array.isArray(e) ? (e.forEach(function(e) {
                    i._deselectRow(e, !0)
                }),
                    i._rowSelectionChanged(t)) : i._deselectRow(e, t)
        }
        ,
        K.prototype._deselectRow = function(e, t) {
            var o, i = this, n = i.table.rowManager.findRow(e);
            n ? (o = i.selectedRows.findIndex(function(e) {
                return e == n
            })) > -1 && (n.getElement().classList.remove("tabulator-selected"),
            n.modules.select || (n.modules.select = {}),
                n.modules.select.selected = !1,
            n.modules.select.checkboxEl && (n.modules.select.checkboxEl.checked = !1),
                i.selectedRows.splice(o, 1),
            this.table.options.dataTreeSelectPropagate && this.childRowSelection(n, !1),
            t || i.table.options.rowDeselected.call(this.table, n.getComponent()),
                i._rowSelectionChanged(t)) : t || console.warn("Deselection Error - No such row found, ignoring selection:" + e)
        }
        ,
        K.prototype.getSelectedData = function() {
            var e = [];
            return this.selectedRows.forEach(function(t) {
                e.push(t.getData())
            }),
                e
        }
        ,
        K.prototype.getSelectedRows = function() {
            var e = [];
            return this.selectedRows.forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        K.prototype._rowSelectionChanged = function(e) {
            this.headerCheckboxElement && (0 === this.selectedRows.length ? (this.headerCheckboxElement.checked = !1,
                this.headerCheckboxElement.indeterminate = !1) : this.table.rowManager.rows.length === this.selectedRows.length ? (this.headerCheckboxElement.checked = !0,
                this.headerCheckboxElement.indeterminate = !1) : (this.headerCheckboxElement.indeterminate = !0,
                this.headerCheckboxElement.checked = !1)),
            e || this.table.options.rowSelectionChanged.call(this.table, this.getSelectedData(), this.getSelectedRows())
        }
        ,
        K.prototype.registerRowSelectCheckbox = function(e, t) {
            e._row.modules.select || (e._row.modules.select = {}),
                e._row.modules.select.checkboxEl = t
        }
        ,
        K.prototype.registerHeaderSelectCheckbox = function(e) {
            this.headerCheckboxElement = e
        }
        ,
        K.prototype.childRowSelection = function(e, t) {
            var o = this.table.modules.dataTree.getChildren(e, !0);
            if (t)
                for (var i = o, n = Array.isArray(i), s = 0, i = n ? i : i[Symbol.iterator](); ; ) {
                    var a;
                    if (n) {
                        if (s >= i.length)
                            break;
                        a = i[s++]
                    } else {
                        if (s = i.next(),
                            s.done)
                            break;
                        a = s.value
                    }
                    var r = a;
                    this._selectRow(r, !0)
                }
            else
                for (var l = o, c = Array.isArray(l), u = 0, l = c ? l : l[Symbol.iterator](); ; ) {
                    var d;
                    if (c) {
                        if (u >= l.length)
                            break;
                        d = l[u++]
                    } else {
                        if (u = l.next(),
                            u.done)
                            break;
                        d = u.value
                    }
                    var h = d;
                    this._deselectRow(h, !0)
                }
        }
        ,
        h.prototype.registerModule("selectRow", K);
    var J = function(e) {
        this.table = e,
            this.sortList = [],
            this.changed = !1
    };
    J.prototype.initializeColumn = function(e, t) {
        var o, i, n = this, s = !1;
        switch (_typeof(e.definition.sorter)) {
            case "string":
                n.sorters[e.definition.sorter] ? s = n.sorters[e.definition.sorter] : console.warn("Sort Error - No such sorter found: ", e.definition.sorter);
                break;
            case "function":
                s = e.definition.sorter
        }
        e.modules.sort = {
            sorter: s,
            dir: "none",
            params: e.definition.sorterParams || {},
            startingDir: e.definition.headerSortStartingDir || "asc",
            tristate: void 0 !== e.definition.headerSortTristate ? e.definition.headerSortTristate : this.table.options.headerSortTristate
        },
        (void 0 === e.definition.headerSort ? !1 !== this.table.options.headerSort : !1 !== e.definition.headerSort) && (o = e.getElement(),
            o.classList.add("tabulator-sortable"),
            i = document.createElement("div"),
            i.classList.add("tabulator-col-sorter"),
            "object" == _typeof(this.table.options.headerSortElement) ? i.appendChild(this.table.options.headerSortElement) : i.innerHTML = this.table.options.headerSortElement,
            t.appendChild(i),
            e.modules.sort.element = i,
            o.addEventListener("click", function(t) {
                var o = ""
                    , i = []
                    , s = !1;
                if (e.modules.sort) {
                    if (e.modules.sort.tristate)
                        o = "none" == e.modules.sort.dir ? e.modules.sort.startingDir : e.modules.sort.dir == e.modules.sort.startingDir ? "asc" == e.modules.sort.dir ? "desc" : "asc" : "none";
                    else
                        switch (e.modules.sort.dir) {
                            case "asc":
                                o = "desc";
                                break;
                            case "desc":
                                o = "asc";
                                break;
                            default:
                                o = e.modules.sort.startingDir
                        }
                    n.table.options.columnHeaderSortMulti && (t.shiftKey || t.ctrlKey) ? (i = n.getSort(),
                        s = i.findIndex(function(t) {
                            return t.field === e.getField()
                        }),
                        s > -1 ? (i[s].dir = o,
                        s != i.length - 1 && (s = i.splice(s, 1)[0],
                        "none" != o && i.push(s))) : "none" != o && i.push({
                            column: e,
                            dir: o
                        }),
                        n.setSort(i)) : "none" == o ? n.clear() : n.setSort(e, o),
                        n.table.rowManager.sorterRefresh(!n.sortList.length)
                }
            }))
    }
        ,
        J.prototype.hasChanged = function() {
            var e = this.changed;
            return this.changed = !1,
                e
        }
        ,
        J.prototype.getSort = function() {
            var e = this
                , t = [];
            return e.sortList.forEach(function(e) {
                e.column && t.push({
                    column: e.column.getComponent(),
                    field: e.column.getField(),
                    dir: e.dir
                })
            }),
                t
        }
        ,
        J.prototype.setSort = function(e, t) {
            var o = this
                , i = [];
            Array.isArray(e) || (e = [{
                column: e,
                dir: t
            }]),
                e.forEach(function(e) {
                    var t;
                    t = o.table.columnManager.findColumn(e.column),
                        t ? (e.column = t,
                            i.push(e),
                            o.changed = !0) : console.warn("Sort Warning - Sort field does not exist and is being ignored: ", e.column)
                }),
                o.sortList = i,
            this.table.options.persistence && this.table.modExists("persistence", !0) && this.table.modules.persistence.config.sort && this.table.modules.persistence.save("sort")
        }
        ,
        J.prototype.clear = function() {
            this.setSort([])
        }
        ,
        J.prototype.findSorter = function(e) {
            var t, o = this.table.rowManager.activeRows[0], i = "string";
            if (o && (o = o.getData(),
                e.getField()))
                switch (t = e.getFieldValue(o),
                    void 0 === t ? "undefined" : _typeof(t)) {
                    case "undefined":
                        i = "string";
                        break;
                    case "boolean":
                        i = "boolean";
                        break;
                    default:
                        isNaN(t) || "" === t ? t.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i) && (i = "alphanum") : i = "number"
                }
            return this.sorters[i]
        }
        ,
        J.prototype.sort = function(e) {
            var t = this
                , o = this.table.options.sortOrderReverse ? t.sortList.slice().reverse() : t.sortList
                , i = []
                , n = [];
            t.table.options.dataSorting && t.table.options.dataSorting.call(t.table, t.getSort()),
                t.clearColumnHeaders(),
                t.table.options.ajaxSorting ? o.forEach(function(e, o) {
                    t.setColumnHeader(e.column, e.dir)
                }) : (o.forEach(function(e, o) {
                    var n = e.column.modules.sort;
                    e.column && n && (n.sorter || (n.sorter = t.findSorter(e.column)),
                        e.params = "function" == typeof n.params ? n.params(e.column.getComponent(), e.dir) : n.params,
                        i.push(e)),
                        t.setColumnHeader(e.column, e.dir)
                }),
                i.length && t._sortItems(e, i)),
            t.table.options.dataSorted && (e.forEach(function(e) {
                n.push(e.getComponent())
            }),
                t.table.options.dataSorted.call(t.table, t.getSort(), n))
        }
        ,
        J.prototype.clearColumnHeaders = function() {
            this.table.columnManager.getRealColumns().forEach(function(e) {
                e.modules.sort && (e.modules.sort.dir = "none",
                    e.getElement().setAttribute("aria-sort", "none"))
            })
        }
        ,
        J.prototype.setColumnHeader = function(e, t) {
            e.modules.sort.dir = t,
                e.getElement().setAttribute("aria-sort", t)
        }
        ,
        J.prototype._sortItems = function(e, t) {
            var o = this
                , i = t.length - 1;
            e.sort(function(e, n) {
                for (var s, a = i; a >= 0; a--) {
                    var r = t[a];
                    if (0 !== (s = o._sortRow(e, n, r.column, r.dir, r.params)))
                        break
                }
                return s
            })
        }
        ,
        J.prototype._sortRow = function(e, t, o, i, n) {
            var s, a, r = "asc" == i ? e : t, l = "asc" == i ? t : e;
            return e = o.getFieldValue(r.getData()),
                t = o.getFieldValue(l.getData()),
                e = void 0 !== e ? e : "",
                t = void 0 !== t ? t : "",
                s = r.getComponent(),
                a = l.getComponent(),
                o.modules.sort.sorter.call(this, e, t, s, a, o.getComponent(), i, n)
        }
        ,
        J.prototype.sorters = {
            number: function(e, t, o, i, n, s, a) {
                var r = a.alignEmptyValues
                    , l = a.decimalSeparator
                    , c = a.thousandSeparator
                    , u = 0;
                if (e = String(e),
                    t = String(t),
                c && (e = e.split(c).join(""),
                    t = t.split(c).join("")),
                l && (e = e.split(l).join("."),
                    t = t.split(l).join(".")),
                    e = parseFloat(e),
                    t = parseFloat(t),
                    isNaN(e))
                    u = isNaN(t) ? 0 : -1;
                else {
                    if (!isNaN(t))
                        return e - t;
                    u = 1
                }
                return ("top" === r && "desc" === s || "bottom" === r && "asc" === s) && (u *= -1),
                    u
            },
            string: function(e, t, o, i, n, s, a) {
                var r, l = a.alignEmptyValues, c = 0;
                if (e) {
                    if (t) {
                        switch (_typeof(a.locale)) {
                            case "boolean":
                                a.locale && (r = this.table.modules.localize.getLocale());
                                break;
                            case "string":
                                r = a.locale
                        }
                        return String(e).toLowerCase().localeCompare(String(t).toLowerCase(), r)
                    }
                    c = 1
                } else
                    c = t ? -1 : 0;
                return ("top" === l && "desc" === s || "bottom" === l && "asc" === s) && (c *= -1),
                    c
            },
            date: function(e, t, o, i, n, s, a) {
                return a.format || (a.format = "DD/MM/YYYY"),
                    this.sorters.datetime.call(this, e, t, o, i, n, s, a)
            },
            time: function(e, t, o, i, n, s, a) {
                return a.format || (a.format = "HH:mm"),
                    this.sorters.datetime.call(this, e, t, o, i, n, s, a)
            },
            datetime: function(e, t, o, i, n, s, a) {
                var r = a.format || "DD/MM/YYYY HH:mm:ss"
                    , l = a.alignEmptyValues
                    , c = 0;
                if ("undefined" != typeof moment) {
                    if (e = moment(e, r),
                        t = moment(t, r),
                        e.isValid()) {
                        if (t.isValid())
                            return e - t;
                        c = 1
                    } else
                        c = t.isValid() ? -1 : 0;
                    return ("top" === l && "desc" === s || "bottom" === l && "asc" === s) && (c *= -1),
                        c
                }
                console.error("Sort Error - 'datetime' sorter is dependant on moment.js")
            },
            boolean: function(e, t, o, i, n, s, a) {
                return (!0 === e || "true" === e || "True" === e || 1 === e ? 1 : 0) - (!0 === t || "true" === t || "True" === t || 1 === t ? 1 : 0)
            },
            array: function(e, t, o, i, n, s, a) {
                function r(e) {
                    switch (u) {
                        case "length":
                            return e.length;
                        case "sum":
                            return e.reduce(function(e, t) {
                                return e + t
                            });
                        case "max":
                            return Math.max.apply(null, e);
                        case "min":
                            return Math.min.apply(null, e);
                        case "avg":
                            return e.reduce(function(e, t) {
                                return e + t
                            }) / e.length
                    }
                }
                var l = 0
                    , c = 0
                    , u = a.type || "length"
                    , d = a.alignEmptyValues
                    , h = 0;
                if (Array.isArray(e)) {
                    if (Array.isArray(t))
                        return l = e ? r(e) : 0,
                            c = t ? r(t) : 0,
                        l - c;
                    d = 1
                } else
                    d = Array.isArray(t) ? -1 : 0;
                return ("top" === d && "desc" === s || "bottom" === d && "asc" === s) && (h *= -1),
                    h
            },
            exists: function(e, t, o, i, n, s, a) {
                return (void 0 === e ? 0 : 1) - (void 0 === t ? 0 : 1)
            },
            alphanum: function(e, t, o, i, n, s, a) {
                var r, l, c, u, d, h = 0, p = /(\d+)|(\D+)/g, m = /\d/, f = a.alignEmptyValues, g = 0;
                if (e || 0 === e) {
                    if (t || 0 === t) {
                        if (isFinite(e) && isFinite(t))
                            return e - t;
                        if (r = String(e).toLowerCase(),
                            l = String(t).toLowerCase(),
                        r === l)
                            return 0;
                        if (!m.test(r) || !m.test(l))
                            return r > l ? 1 : -1;
                        for (r = r.match(p),
                                 l = l.match(p),
                                 d = r.length > l.length ? l.length : r.length; h < d; )
                            if (c = r[h],
                                u = l[h++],
                            c !== u)
                                return isFinite(c) && isFinite(u) ? ("0" === c.charAt(0) && (c = "." + c),
                                "0" === u.charAt(0) && (u = "." + u),
                                c - u) : c > u ? 1 : -1;
                        return r.length > l.length
                    }
                    g = 1
                } else
                    g = t || 0 === t ? -1 : 0;
                return ("top" === f && "desc" === s || "bottom" === f && "asc" === s) && (g *= -1),
                    g
            }
        },
        h.prototype.registerModule("sort", J);
    var $ = function(e) {
        this.table = e,
            this.invalidCells = []
    };
    return $.prototype.initializeColumn = function(e) {
        var t, o = this, i = [];
        e.definition.validator && (Array.isArray(e.definition.validator) ? e.definition.validator.forEach(function(e) {
            (t = o._extractValidator(e)) && i.push(t)
        }) : (t = this._extractValidator(e.definition.validator)) && i.push(t),
            e.modules.validate = !!i.length && i)
    }
        ,
        $.prototype._extractValidator = function(e) {
            var t, o, i;
            switch (void 0 === e ? "undefined" : _typeof(e)) {
                case "string":
                    return i = e.indexOf(":"),
                        i > -1 ? (t = e.substring(0, i),
                            o = e.substring(i + 1)) : t = e,
                        this._buildValidator(t, o);
                case "function":
                    return this._buildValidator(e);
                case "object":
                    return this._buildValidator(e.type, e.parameters)
            }
        }
        ,
        $.prototype._buildValidator = function(e, t) {
            var o = "function" == typeof e ? e : this.validators[e];
            return o ? {
                type: "function" == typeof e ? "function" : e,
                func: o,
                params: t
            } : (console.warn("Validator Setup Error - No matching validator found:", e),
                !1)
        }
        ,
        $.prototype.validate = function(e, t, o) {
            var i = this
                , n = []
                , s = this.invalidCells.indexOf(t);
            return e && e.forEach(function(e) {
                e.func.call(i, t.getComponent(), o, e.params) || n.push({
                    type: e.type,
                    parameters: e.params
                })
            }),
                n = !n.length || n,
            t.modules.validate || (t.modules.validate = {}),
                !0 === n ? (t.modules.validate.invalid = !1,
                    t.getElement().classList.remove("tabulator-validation-fail"),
                s > -1 && this.invalidCells.splice(s, 1)) : (t.modules.validate.invalid = !0,
                "manual" !== this.table.options.validationMode && t.getElement().classList.add("tabulator-validation-fail"),
                -1 == s && this.invalidCells.push(t)),
                n
        }
        ,
        $.prototype.getInvalidCells = function() {
            var e = [];
            return this.invalidCells.forEach(function(t) {
                e.push(t.getComponent())
            }),
                e
        }
        ,
        $.prototype.clearValidation = function(e) {
            var t;
            e.modules.validate && e.modules.validate.invalid && (e.getElement().classList.remove("tabulator-validation-fail"),
                e.modules.validate.invalid = !1,
            (t = this.invalidCells.indexOf(e)) > -1 && this.invalidCells.splice(t, 1))
        }
        ,
        $.prototype.validators = {
            integer: function(e, t, o) {
                return "" === t || null === t || void 0 === t || "number" == typeof (t = Number(t)) && isFinite(t) && Math.floor(t) === t
            },
            float: function(e, t, o) {
                return "" === t || null === t || void 0 === t || "number" == typeof (t = Number(t)) && isFinite(t) && t % 1 != 0
            },
            numeric: function(e, t, o) {
                return "" === t || null === t || void 0 === t || !isNaN(t)
            },
            string: function(e, t, o) {
                return "" === t || null === t || void 0 === t || isNaN(t)
            },
            max: function(e, t, o) {
                return "" === t || null === t || void 0 === t || parseFloat(t) <= o
            },
            min: function(e, t, o) {
                return "" === t || null === t || void 0 === t || parseFloat(t) >= o
            },
            starts: function(e, t, o) {
                return "" === t || null === t || void 0 === t || String(t).toLowerCase().startsWith(String(o).toLowerCase())
            },
            ends: function(e, t, o) {
                return "" === t || null === t || void 0 === t || String(t).toLowerCase().endsWith(String(o).toLowerCase())
            },
            minLength: function(e, t, o) {
                return "" === t || null === t || void 0 === t || String(t).length >= o
            },
            maxLength: function(e, t, o) {
                return "" === t || null === t || void 0 === t || String(t).length <= o
            },
            in: function(e, t, o) {
                return "" === t || null === t || void 0 === t || ("string" == typeof o && (o = o.split("|")),
                "" === t || o.indexOf(t) > -1)
            },
            regex: function(e, t, o) {
                return "" === t || null === t || void 0 === t || new RegExp(o).test(t)
            },
            unique: function(e, t, o) {
                if ("" === t || null === t || void 0 === t)
                    return !0;
                var i = !0
                    , n = e.getData()
                    , s = e.getColumn()._getSelf();
                return this.table.rowManager.rows.forEach(function(e) {
                    var o = e.getData();
                    o !== n && t == s.getFieldValue(o) && (i = !1)
                }),
                    i
            },
            required: function(e, t, o) {
                return "" !== t && null !== t && void 0 !== t
            }
        },
        h.prototype.registerModule("validate", $),
        h
});
