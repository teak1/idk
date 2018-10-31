System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function makeError(type, def) {
        return new Function(`return class ${type.toUpperCase()} extends Error {constructor(msg) {super();this.message = msg${def ? " || `" + def + "`;" : ";"};}}`)();
    }
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                vector: {
                    VEC_DIF_DIM: makeError("VEC_DIF_DIM")
                },
                input: {
                    NODE_NOT_EXISTANT: makeError("NODE_NOT_EXISTANT"),
                    NODE_ALREADY_CONNECTED: makeError("NODE_ALREADY_CONNECTED")
                },
                UNDEFINED_REFERENCE: makeError("UNDEFINED_REFERENCE")
            });
        }
    };
});
//# sourceMappingURL=Errors.js.map