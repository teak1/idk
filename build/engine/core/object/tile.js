System.register([], function (exports_1, context_1) {
    "use strict";
    var Tile;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Tile = class Tile {
                constructor(src, pos, size) {
                    this.image = new Image();
                    this.src = src;
                    this.pos = pos;
                    this.size = size;
                    this.image.setAttribute("src", this.src);
                    this.updateCSS();
                    this.layer = 0;
                }
                getElement() {
                    return this.image;
                }
                updateCSS() {
                    var zindex = this.layer;
                    this.image.setAttribute('style', `position:absolute;top:${this.pos.y * this.size.y}px;left:${this.pos.x * this.size.x}px;width:${this.size.x};height:${this.size.y}px;z-index:${zindex}`);
                }
            };
            exports_1("default", Tile);
        }
    };
});
//# sourceMappingURL=tile.js.map