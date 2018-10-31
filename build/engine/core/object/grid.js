System.register(["./tile", "../math/Vector", "data"], function (exports_1, context_1) {
    "use strict";
    var tile_1, Vector_1, data_1, Grid;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tile_1_1) {
                tile_1 = tile_1_1;
            },
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            }
        ],
        execute: function () {
            Grid = class Grid {
                constructor(width, height, tile_width, tile_height) {
                    this.tile_size = new Vector_1.Vector2(tile_width, tile_height);
                    this.width = width;
                    this.height = height;
                    this.tiles = [];
                    var index = 0;
                    for (var x = 0; x < this.width; x++) {
                        this.tiles.push(new Array());
                        for (var y = 0; y < this.height; y++) {
                            var src = data_1.TILES[index] || "assets/dirt_E.png";
                            index++;
                            var h = Math.random() * 5;
                            var newest = new tile_1.default(src, new Vector_1.Vector3(x, y, h), this.tile_size);
                            var background = new tile_1.default("assets/dirt_E.png", new Vector_1.Vector3(x, y, h + 4), this.tile_size);
                            this.tiles[x].push([newest, background]);
                            document.body.appendChild(background.getElement());
                            document.body.appendChild(newest.getElement());
                        }
                    }
                }
            };
            exports_1("Grid", Grid);
        }
    };
});
//# sourceMappingURL=grid.js.map