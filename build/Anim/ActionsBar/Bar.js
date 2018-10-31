System.register(["./CSS"], function (exports_1, context_1) {
    "use strict";
    var CSS_1, ActionBar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            }
        ],
        execute: function () {
            ActionBar = class ActionBar {
                constructor(layers) {
                    this.layers = 1;
                    this.layerElts = new Array();
                    this.layers = layers || this.layers;
                    for (var index = 0; index < this.layers; index++) {
                        this.layerElts.push(this.newLayerElt(index));
                    }
                }
                newLayerElt(layerNum) {
                    var div = document.createElement("div");
                    CSS_1.default.
                    ;
                    return div;
                }
            };
            exports_1("ActionBar", ActionBar);
        }
    };
});
//# sourceMappingURL=Bar.js.map