System.register([], function (exports_1, context_1) {
    "use strict";
    var VAR_NAMES, ROOT, CSS;
    var __moduleName = context_1 && context_1.id;
    function _() {
        try {
            document.head.appendChild(ROOT);
        }
        catch (e) {
            setTimeout(_);
        }
    }
    function getNewVarName() {
        var o = "";
        for (var i = 0; i < 32; i++) {
            o += Math.floor(Math.random() * 36).toString(36);
        }
        return o;
    }
    return {
        setters: [],
        execute: function () {
            VAR_NAMES = {};
            ROOT = document.createElement("style");
            _();
            exports_1("CSS", CSS = {
                UPDATE_DEFAULTS(values) {
                    var o = {};
                    for (var key in values) {
                        if (VAR_NAMES[key] && values[key]) {
                            var name = VAR_NAMES[key];
                            o[name] = values[key];
                        }
                    }
                    var wrapper = `:root{${CSS.get(o)}}`;
                    ROOT.innerText = wrapper;
                },
                KEY(key) {
                    var var_name = "--" + getNewVarName();
                    for (var name in VAR_NAMES) {
                        if (var_name === VAR_NAMES[name])
                            return CSS.KEY(key);
                    }
                    VAR_NAMES[key] = var_name;
                    return VAR_NAMES[key];
                },
                getKey(KEY) {
                    if (VAR_NAMES[KEY]) {
                        return VAR_NAMES[KEY];
                    }
                    return CSS.KEY(KEY);
                },
                var(object) {
                    return `var(${object})`;
                },
                get(object) {
                    object = CSS.getFromString(object);
                    var css = [];
                    for (var key in object) {
                        css.push(`${key}:${object[key]};`);
                    }
                    return css.join("");
                },
                merge(CSSA, CSSB) {
                    if (CSSA.constructor === String) {
                        CSSA = CSS.getFromString(CSSA);
                    }
                    if (CSSB.constructor === String) {
                        CSSB = CSS.getFromString(CSSB);
                    }
                    return CSS.get(Object.assign({}, CSSA, CSSB));
                },
                getFromString(str) {
                    if (str.constructor === Object)
                        return str;
                    var obj = {};
                    for (var part of str.split(";")) {
                        if (part === "")
                            continue;
                        obj[part.split(":")[0]] = part.split(":")[1];
                    }
                    return obj;
                }
            });
        }
    };
});
//# sourceMappingURL=CSS.js.map