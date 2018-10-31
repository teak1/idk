System.register(["./util/CSS"], function (exports_1, context_1) {
    "use strict";
    var CSS_1, Layer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            }
        ],
        execute: function () {
            Layer = class Layer {
                constructor(element) {
                    this.canvas = document.createElement("canvas");
                    this.width = 720;
                    this.height = 720;
                    this.z_index = 0;
                    this.init(element);
                }
                setWidth(size) {
                    if (size) {
                        this.width = size;
                    }
                }
                setHeight(size) {
                    if (size) {
                        this.height = size;
                    }
                }
                setSize(width, height) {
                    this.setWidth(width);
                    this.setHeight(height);
                }
                init(elem) {
                    this.setSize(720, 720);
                    this.canvas.setAttribute("stle", CSS_1.CSS.get({
                        position: "absolute"
                    }));
                    elem.appendChild(this.canvas);
                }
            };
            exports_1("Layer", Layer);
        }
    };
});
//# sourceMappingURL=Layer.js.map