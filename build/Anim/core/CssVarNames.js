System.register(["../util/CSS"], function (exports_1, context_1) {
    "use strict";
    var CSS_1, names;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            }
        ],
        execute: function () {
            exports_1("names", names = {
                NODE_BORDER_COLOR: CSS_1.CSS.KEY("NODE_BORDER_COLOR"),
                NODE_BACKGROUND_COLOR: CSS_1.CSS.KEY("NODE_BACKGROUND_COLOR"),
                NODE_CONNECTION_COLOR: CSS_1.CSS.KEY("NODE_CONNECTION_COLOR")
            });
            exports_1("default", names);
        }
    };
});
//# sourceMappingURL=CssVarNames.js.map