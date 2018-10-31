System.register(["../util/Vector"], function (exports_1, context_1) {
    "use strict";
    var Vector, Node;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1) {
                Vector = Vector_1;
            }
        ],
        execute: function () {
            Node = class Node {
                constructor(Inputs, Output, Option = {}) {
                    this.position = new Vector.Vector3(0, 0, 0);
                    this.inputs = new Array();
                    this.outputs = new Array();
                    this.inputs = Inputs;
                    this.outputs = Output;
                }
            };
            exports_1("Node", Node);
        }
    };
});
//# sourceMappingURL=Node.js.map