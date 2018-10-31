System.register(["../util/Vector", "../util/Errors"], function (exports_1, context_1) {
    "use strict";
    var Vector, Errors_1, Connector;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1) {
                Vector = Vector_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            Connector = class Connector {
                constructor() {
                    this.position = new Vector.Vector3(0, 0, 0);
                    this.connections = new Array(2);
                }
                setConnections(index, new_target) {
                    if (this.connections[index]) {
                        this.disconnect(this.connections[index]);
                    }
                    this.connect(index, new_target);
                }
                connect(index, node) {
                    if (this.connections[index]) {
                        this.disconnect(this.connections[index]);
                    }
                    this.connections[index] = node;
                }
                disconnect(node) {
                    if (node === undefined)
                        throw new Errors_1.default.UNDEFINED_REFERENCE();
                    if (this.connections.indexOf(node) < 0)
                        throw new Errors_1.default.input.NODE_NOT_EXISTANT("node to disconnect is not connected to InputPoint");
                    this.connections[this.connections.indexOf(node)] = undefined;
                }
                getValue() {
                    this.connections[0].getValue();
                }
            };
            exports_1("Connector", Connector);
            exports_1("default", {
                Connector
            });
        }
    };
});
//# sourceMappingURL=Connector.js.map