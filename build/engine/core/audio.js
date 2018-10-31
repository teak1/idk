System.register([], function (exports_1, context_1) {
    "use strict";
    var AudioObject;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            AudioObject = class AudioObject extends Audio {
                constructor(src) {
                    super(src);
                    this.volume = 1;
                }
            };
            exports_1("default", AudioObject);
        }
    };
});
//# sourceMappingURL=audio.js.map