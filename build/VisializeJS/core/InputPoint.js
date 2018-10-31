System.register(["../util/Vector", "./../util/Errors"], function (exports_1, context_1) {
    "use strict";
    var Vector, errors, InputPoint;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1) {
                Vector = Vector_1;
            },
            function (errors_1) {
                errors = errors_1;
            }
        ],
        execute: function () {
            InputPoint = class InputPoint {
                constructor(parent, index, name, type) {
                    this.position = new Vector.Vector3(0, 0, 0);
                    this.parent = parent;
                    this.name = name;
                    this.type = type;
                    this.index = index;
                }
                setConnection(connect) {
                    if (!this.connection) {
                        this.connection = connect;
                    }
                    else {
                        throw new errors.default.input.NODE_ALREADY_CONNECTED("node already has connection, to connect a new connection please enable multi connection or dissconnect the current connection");
                    }
                }
                getValue() {
                    return this.connection.getValue();
                }
            };
            exports_1("InputPoint", InputPoint);
            exports_1("default", {
                InputPoint
            });
        }
    };
});
//# sourceMappingURL=InputPoint.js.map