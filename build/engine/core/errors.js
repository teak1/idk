System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                vector: {
                    VEC_DIF_DIM: class VEC_DIF_DIM extends Error {
                        constructor(msg) {
                            super();
                            this.message = msg;
                        }
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=errors.js.map