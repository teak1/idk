System.register(["./Errors"], function (exports_1, context_1) {
    "use strict";
    var Errors_1, getterDict, _Vector, Vector2, Vector3, Vector4;
    var __moduleName = context_1 && context_1.id;
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
            exports_1("_Vector", _Vector);
            Vector2 = class Vector2 extends _Vector {
                constructor(x, y) {
                    super(2, "xy", x, y);
                }
            };
            exports_1("Vector2", Vector2);
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
            exports_1("Vector3", Vector3);
            Vector4 = class Vector4 extends _Vector {
                constructor(x, y, z, a) {
                    super(4, "xyza", x, y, z, a);
                }
            };
            exports_1("Vector4", Vector4);
            exports_1("default", {
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
//# sourceMappingURL=Vector.js.map