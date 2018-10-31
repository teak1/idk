System.register("VisializeJS/util/Errors", [], function (exports_1, context_1) {
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
                    VEC_DIF_DIM: class VEC_DIF_DIM extends Error {
                        constructor(msg) {
                            super();
                            this.message = msg;
                        }
                    }
                },
                input: {
                    NODE_NOT_EXISTANT: makeError("NODE_NOT_EXISTANT")
                },
                UNDEFINED_REFERENCE: makeError("UNDEFINED_REFERENCE")
            });
        }
    };
});
System.register("VisializeJS/util/Vector", ["VisializeJS/util/Errors"], function (exports_2, context_2) {
    "use strict";
    var Errors_1, getterDict, _Vector, Vector2, Vector3, Vector4;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            }
        ],
        execute: function () {
            getterDict = {};
            _Vector = class _Vector {
                constructor(size = 0, refs = "", ...a) {
                    this.size = size;
                    this.refs = refs;
                    this.values = new Array(this.size);
                    for (var i = 0; i < this.values.length; i++) {
                        this.values[i] = 0;
                        if (a.length > i) {
                            this.values[i] = a[i];
                        }
                        if (!getterDict[this.refs[i]])
                            getterDict[this.refs[i]] = new Function(`return{get(){return this.get(this,"${this.refs[i]}");},set(value){return this.set(this,"${this.refs[i]}",value);}}`);
                        Object.defineProperty(this, this.refs[i], getterDict[this.refs[i]]());
                    }
                }
                get(self, name) {
                    if (self.refs.indexOf(name) >= 0) {
                        return self.values[self.refs.indexOf(name)];
                    }
                }
                set(self = this, name, value) {
                    if (self.refs.indexOf(name) >= 0) {
                        return self.values[self.refs.indexOf(name)] = value;
                    }
                }
                validateOther(other) {
                    if (this.refs != other.refs) {
                        throw new Errors_1.default.vector.VEC_DIF_DIM("VECTOR NOT CONSISTANT DIMENTION");
                    }
                }
                clone() {
                    var next = this.constructor;
                    var vec = new next();
                    for (var i in this.values) {
                        vec.values[i] = this.values[i];
                    }
                    return vec;
                }
                zero() {
                    var next = this.constructor;
                    var vec = new next();
                    for (var i in vec.values) {
                        vec.values[i] = 0;
                    }
                    return vec;
                }
                operate(self, other, operation, thi) {
                    for (var i = 0; i < self.values.length; i++) {
                        operation(self, other, i, thi);
                    }
                    return self;
                }
                add(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._add);
                }
                _add(self, other, index) {
                    self.values[index] += other.values[index];
                }
                sub(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._sub);
                }
                _sub(self, other, index) {
                    self.values[index] -= other.values[index];
                }
                mult(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._mult);
                }
                _mult(self, other, index) {
                    self.values[index] *= other.values[index];
                }
                div(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._div);
                }
                _div(self, other, index) {
                    self.values[index] /= other.values[index];
                }
                max(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._max, this);
                }
                _max(self, other, index, thi) {
                    self.values[index] = other.values[index] < thi.values[index] ? thi.values[index] : other.values[index];
                }
                min(other) {
                    this.validateOther(other);
                    var op = this.clone();
                    return this.operate(op, other, this._min, this);
                }
                _min(self, other, index, thi) {
                    self.values[index] = other.values[index] > thi.values[index] ? thi.values[index] : other.values[index];
                }
                dot(other) {
                    this.validateOther(other);
                    var acc = 0;
                    this.values.forEach((v, i) => { acc += v * other.values[i]; });
                    return acc;
                }
                dist(other) {
                    this.validateOther(other);
                    var acc = 0;
                    for (var i = 0; i < this.values.length; i++) {
                        acc += Math.pow(this.values[i] - other.values[i], 2);
                    }
                    return Math.sqrt(acc);
                }
                mag() {
                    return this.dist(this.zero());
                }
            };
            exports_2("_Vector", _Vector);
            Vector2 = class Vector2 extends _Vector {
                constructor(x, y) {
                    super(2, "xy", x, y);
                }
            };
            exports_2("Vector2", Vector2);
            Vector3 = class Vector3 extends _Vector {
                constructor(x, y, z) {
                    super(3, "xyz", x, y, z);
                }
                /**
                 * NOTE: you can make vector3 specific functins here.
                 *
                 */
                cross(vec) {
                    return new Vector3(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
                }
                getPerpendicularAboutY() {
                    //I dont understand what this does but you have it so have fun.
                    //https://github.com/DakotaLarson/Tanks-Server/blob/master/src/vector/Vector3.ts#L30-L32
                    return new Vector3(this.z, this.y, this.x * -1);
                }
            };
            exports_2("Vector3", Vector3);
            Vector4 = class Vector4 extends _Vector {
                constructor(x, y, z, a) {
                    super(4, "xyza", x, y, z, a);
                }
            };
            exports_2("Vector4", Vector4);
            exports_2("default", {
                Vector2: Vector2,
                Vector3: Vector3,
                Vector4: Vector4,
                Vector: _Vector
            });
            /*
            *angleBetween
            *signed angle between
            *cross product
            *lerp
            *Magnitude
            *Max
            *Min
            *Normalize
            *reflect
            *SmoothDamp
            *direction
            */ 
        }
    };
});
System.register("VisializeJS/core/InputPoint", ["VisializeJS/util/Vector"], function (exports_3, context_3) {
    "use strict";
    var Vector, InputPoint;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Vector_1) {
                Vector = Vector_1;
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
            };
            exports_3("InputPoint", InputPoint);
            exports_3("default", {
                InputPoint
            });
        }
    };
});
System.register("VisializeJS/core/Node", ["VisializeJS/util/Vector"], function (exports_4, context_4) {
    "use strict";
    var Vector, Node;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Vector_2) {
                Vector = Vector_2;
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
            exports_4("Node", Node);
        }
    };
});
System.register("VisializeJS/core/Connector", ["VisializeJS/util/Vector", "VisializeJS/util/Errors"], function (exports_5, context_5) {
    "use strict";
    var Vector, Errors_2, Connector;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (Vector_3) {
                Vector = Vector_3;
            },
            function (Errors_2_1) {
                Errors_2 = Errors_2_1;
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
                        throw new Errors_2.default.UNDEFINED_REFERENCE();
                    if (this.connections.indexOf(node) < 0)
                        throw new Errors_2.default.input.NODE_NOT_EXISTANT("node to disconnect is not connected to InputPoint");
                    this.connections[this.connections.indexOf(node)] = undefined;
                }
            };
            exports_5("Connector", Connector);
            exports_5("default", {
                Connector
            });
        }
    };
});
System.register("VisializeJS/util/CSS", [], function (exports_6, context_6) {
    "use strict";
    var VAR_NAMES, ROOT, CSS;
    var __moduleName = context_6 && context_6.id;
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
            exports_6("CSS", CSS = {
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
System.register("VisializeJS/core/CssVarNames", ["VisializeJS/util/CSS"], function (exports_7, context_7) {
    "use strict";
    var CSS_1, names;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            }
        ],
        execute: function () {
            exports_7("names", names = {
                NODE_BORDER_COLOR: CSS_1.CSS.KEY("NODE_BORDER_COLOR"),
                NODE_BACKGROUND_COLOR: CSS_1.CSS.KEY("NODE_BACKGROUND_COLOR"),
                NODE_CONNECTION_COLOR: CSS_1.CSS.KEY("NODE_CONNECTION_COLOR")
            });
            exports_7("default", {});
        }
    };
});
System.register("lib", ["VisializeJS/core/Connector", "VisializeJS/core/Node", "VisializeJS/util/CSS", "VisializeJS/util/Errors", "VisializeJS/util/Vector", "VisializeJS/core/CssVarNames"], function (exports_8, context_8) {
    "use strict";
    var InputPoint, Node, CSS, Errors, Vector, CSSKEYS, Connector;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (InputPoint_1) {
                InputPoint = InputPoint_1;
                Connector = InputPoint_1;
            },
            function (Node_1) {
                Node = Node_1;
            },
            function (CSS_2) {
                CSS = CSS_2;
            },
            function (Errors_3) {
                Errors = Errors_3;
            },
            function (Vector_4) {
                Vector = Vector_4;
            },
            function (CSSKEYS_1) {
                CSSKEYS = CSSKEYS_1;
            }
        ],
        execute: function () {
            exports_8("default", {
                InputPoint,
                Node,
                CSS,
                Errors,
                Vector,
                CSSKEYS,
                Connector
            });
        }
    };
});
System.register("main", ["lib"], function (exports_9, context_9) {
    "use strict";
    var lib_1, VisializeJS;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (lib_1_1) {
                lib_1 = lib_1_1;
            }
        ],
        execute: function () {
            exports_9("VisializeJS", VisializeJS = lib_1.default);
            window["VisualizeJS"] = lib_1.default;
        }
    };
});
//# sourceMappingURL=build.js.map