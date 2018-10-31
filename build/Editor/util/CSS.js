System.register([], function (exports_1, context_1) {
    "use strict";
    var CSS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("CSS", CSS = {
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
                        console.log(part);
                        obj[part.split(":")[0]] = part.split(":")[1];
                    }
                    return obj;
                }
            });
        }
    };
});
//# sourceMappingURL=CSS.js.map