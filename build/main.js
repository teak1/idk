System.register(["./runner"], function (exports_1, context_1) {
    "use strict";
    var runner_1, Runner, MOUSEPOS, EDITING_ELEMENT, LINE_NUMBERS_ELEMENT, REGISTER_DISPLAY, LOG_ELEMENT;
    var __moduleName = context_1 && context_1.id;
    function updateLineNumbers() {
        var str = EDITING_ELEMENT.innerText.split(/[\n\r]/g);
        var len = str.length;
        var val = str[str.length - 1] === "" ? str.length - 1 : str.length;
        var nums = new Array(len < 11 ? 10 : val).fill(0).map((a, i) => "0x" + (i).toString(16).toUpperCase());
        LINE_NUMBERS_ELEMENT.innerHTML = nums.join("<br/>");
    }
    function onload() {
        LOG_ELEMENT = document.getElementsByClassName("APP_LOG")[0];
        EDITING_ELEMENT = document.getElementsByClassName("editable_code")[0];
        LINE_NUMBERS_ELEMENT = document.getElementsByClassName("line_numbers")[0];
        REGISTER_DISPLAY = document.getElementsByTagName("table")[0];
        EDITING_ELEMENT.addEventListener("keyup", updateLineNumbers);
        EDITING_ELEMENT.addEventListener("keydown", updateLineNumbers);
        EDITING_ELEMENT.addEventListener("keydown", _ => setTimeout(updateLineNumbers));
        EDITING_ELEMENT.addEventListener("keypress", updateLineNumbers);
        document.getElementsByClassName("APP_BTN")[0].addEventListener("click", () => {
            Runner.exit();
            runner_1.default.Register_Map = Runner.resetRegisters();
            Runner.parse(EDITING_ELEMENT.innerText.split(/[\n\r]/));
            Runner.run(100);
        });
        document.getElementsByClassName("APP_BTN")[1].addEventListener("click", () => {
            Runner.exit();
            runner_1.default.Register_Map = Runner.resetRegisters();
            Runner.parse(EDITING_ELEMENT.innerText.split(/[\n\r]/));
        });
        document.getElementsByClassName("APP_BTN")[2].addEventListener("click", () => {
            Runner.exit();
        });
        document.getElementsByClassName("APP_BTN")[3].addEventListener("click", () => {
            Runner.step();
        });
        frame();
        updateLineNumbers();
        fetch("./prgrm.txt").then(_ => _.text()).then(_ => {
            EDITING_ELEMENT.innerText = _;
            // Runner.parse(EDITING_ELEMENT.innerText.split(/[\r\n]/g));
            // Runner.run(100);
        });
    }
    function frame() {
        var things = [];
        Object.keys(runner_1.default.Register_Map).map(_ => `<th>&nbsp;&nbsp;${_}</th><th>0x${runner_1.default.Register_Map[_].toString(16)}</th>`).forEach(_ => things.push(_));
        var str = new Array(30);
        things.forEach((v, i) => {
            str[i % 30] = str[i % 30] || "";
            str[i % 30] += v;
        });
        REGISTER_DISPLAY.innerHTML = `<tr>${str.join("</tr><tr>")}</tr>`;
        while (Runner.log.length > 10)
            Runner.log.shift();
        LOG_ELEMENT.value = Runner.log.join("\n");
        //`<tr><th>name</th><th>${Object.keys(Register_Map).join("</th><th>")}</th></tr><tr><th>val</th><th>${Object.keys(Register_Map).map(_ => Register_Map[_]).join("</th><th>")}</th></tr>`;
        window.requestAnimationFrame(frame);
    }
    return {
        setters: [
            function (runner_1_1) {
                runner_1 = runner_1_1;
            }
        ],
        execute: function () {
            Runner = new runner_1.default.Runner();
            Runner.addInstruction("RET", new runner_1.default.Instruction("RET", function (...value) { value.forEach((_, i) => Runner.return(i, _)); }));
            Runner.addInstruction("JMP", new runner_1.default.Instruction("JMP", function (pointer) { if (pointer != undefined)
                Runner.setRegister("IP", pointer); }));
            Runner.addInstruction("JNZ", new runner_1.default.Instruction("JNZ", function (check, pointer) {
                if (Runner.getValue(check) != 0) {
                    if (pointer != undefined)
                        Runner.setRegister("IP", pointer);
                }
            }));
            Runner.addInstruction("CMT", new runner_1.default.Instruction("CMT", function () { }));
            Runner.addInstruction("ADD", new runner_1.default.Instruction("ADD", function (a, b) {
                if (Runner.isNumber(a)) {
                    if (Runner.isNumber(b)) {
                        Runner.return(0, a + b);
                    }
                    else {
                        Runner.return(0, a + Runner.getRegister(b));
                    }
                }
                else {
                    if (Runner.isNumber(b)) {
                        Runner.return(0, Runner.getRegister(a) + b);
                    }
                    else {
                        Runner.return(0, Runner.getRegister(a) + Runner.getRegister(b));
                    }
                }
            }));
            Runner.addInstruction("SUB", new runner_1.default.Instruction("SUB", function (a, b) {
                if (Runner.isNumber(a)) {
                    if (Runner.isNumber(b)) {
                        Runner.return(0, a - b);
                    }
                    else {
                        Runner.return(0, a - Runner.getRegister(b));
                    }
                }
                else {
                    if (Runner.isNumber(b)) {
                        Runner.return(0, Runner.getRegister(a) - b);
                    }
                    else {
                        Runner.return(0, Runner.getRegister(a) - Runner.getRegister(b));
                    }
                }
            }));
            Runner.addInstruction("MOV", new runner_1.default.Instruction("MOV", function (value, reg) {
                if (Runner.isNumber(value)) {
                    Runner.setRegister(reg, Number(value));
                }
                else {
                    Runner.setRegister(reg, Runner.getRegister(value.toString()));
                }
            }));
            Runner.addInstruction("EXT", new runner_1.default.Instruction("EXT", function () { console.log("exiting"); Runner.exit(); }));
            window.addEventListener("load", onload);
            onload();
            window["app"] = {
                EDITING_ELEMENT: EDITING_ELEMENT,
                REGISTER_DISPLAY: REGISTER_DISPLAY,
                LINE_NUMBERS_ELEMENT: LINE_NUMBERS_ELEMENT,
                EXECUTOR: runner_1.default,
                LOG_ELEMENT: LOG_ELEMENT,
                Runner: Runner
            };
        }
    };
});
//# sourceMappingURL=main.js.map