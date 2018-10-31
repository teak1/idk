System.register(["./VisializeJS/core/Connector", "./VisializeJS/core/Node", "./VisializeJS/util/CSS", "./VisializeJS/util/Errors", "./VisializeJS/util/Vector", "./VisializeJS/core/CssVarNames"], function (exports_1, context_1) {
    "use strict";
    var InputPoint, Node, CSS, Errors, Vector, CSSKEYS, Connector;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (InputPoint_1) {
                InputPoint = InputPoint_1;
                Connector = InputPoint_1;
            },
            function (Node_1) {
                Node = Node_1;
            },
            function (CSS_1) {
                CSS = CSS_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Vector_1) {
                Vector = Vector_1;
            },
            function (CSSKEYS_1) {
                CSSKEYS = CSSKEYS_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                InputPoint,
                Node,
                CSS,
                Errors,
                Vector,
                CSSKEYS,
                Connector,
                TEST: function (...testf) {
                    console.log(testf);
                }
            });
        }
    };
});
//# sourceMappingURL=lib.js.map