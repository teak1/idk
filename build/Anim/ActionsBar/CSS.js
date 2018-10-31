System.register([], function (exports_1, context_1) {
    "use strict";
    var VALID_VAR_CHARS, ROOT, CSSAtrib, CSS;
    var __moduleName = context_1 && context_1.id;
    function _() {
        try {
            document.head.appendChild(ROOT);
        }
        catch (e) {
            setTimeout(_);
        }
    }
    return {
        setters: [],
        execute: function () {
            VALID_VAR_CHARS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
            ROOT = document.createElement("style");
            _();
            CSSAtrib = class CSSAtrib {
            };
            exports_1("CSSAtrib", CSSAtrib);
            CSS = class CSS {
                constructor() {
                    this.var_names = {};
                    this.var_values = {};
                    this.var_keys = [];
                }
                get(name) {
                    if (this.var_names[name])
                        return this.getReference(name);
                }
                set(name, value) {
                    if (!value)
                        return;
                    if (name) {
                        if (this.var_names[name]) {
                            this.var_values[this.var_names[name]] = value;
                            this.rebuildValues();
                            return this.var_values;
                        }
                        else {
                            let _name = this.getVarKey();
                            this.var_names[name] = _name;
                            this.var_values[this.var_names[name]] = value;
                            this.rebuildValues();
                            return this.var_values;
                        }
                    }
                    else {
                        this.rebuildValues();
                        return;
                    }
                }
                rebuildValues() {
                    var cssString = ":root{";
                    var atribs = [];
                    for (var name in this.var_names) {
                        var value = this.var_names[name];
                        cssString += `--${value}:${this.var_values[value]}`;
                    }
                    cssString += atribs.join(";") + ";}";
                    ROOT.innerText = cssString;
                }
                getVarKey() {
                    var key = new Array(32).fill(0).map(_ => VALID_VAR_CHARS[Math.floor(Math.random() * VALID_VAR_CHARS.length)]).join("");
                    if (this.var_keys.indexOf(key) > 0)
                        return this.getVarKey();
                    return key;
                }
                getReference(name) {
                    return `var(--${this.var_names[name]})`;
                }
            };
            exports_1("CSS", CSS);
        }
    };
});
//# sourceMappingURL=CSS.js.map