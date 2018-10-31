System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function readString(dir) {
        return new Promise(function (resolve, reject) {
            fetch(dir)
                .then(content => content.text())
                .then(content => resolve(content))
                .catch(error => reject(error));
        });
    }
    exports_1("readString", readString);
    function saveString(obj) {
        return "";
    }
    exports_1("saveString", saveString);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=file.js.map