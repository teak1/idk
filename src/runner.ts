let Register_Map = {
	IP: 0,
	ACC: 0
};
for (var i = 0; i < 256; i++) {
	Register_Map["R" + i] = 0;
}
Register_Map["JSM"] = 0;
for (var i = 0; i < 7; i++) {
	Register_Map["JS" + i] = 0;
}
for (var i = 0; i < 4; i++) {
	Register_Map["RET" + i] = 0;
}
export class Runner {
	IP_FLAG: string = "IP";
	Opperations: Array<OP> = [];
	Instructions: Array<Instruction> = [];
	IMap = {};
	intervul: number;
	log: string[] = [];
	parse(code: string[]) {
		this.Opperations = [];
		code.forEach(operation => {
			var parts = operation.split(" ");
			var INS = parts.shift();
			if (this.Instructions.some(_ => _.is(INS))) {
				this.Opperations.push(new OP(this.IMap[INS], parts, this));
			}
		});
	}
	exit() {
		clearInterval(this.intervul);
		this.intervul = undefined;
	}
	getValue(thing) {
		if (this.isNumber(Number(thing))) {
			return Number(thing);
		} else {
			return this.getRegister(thing);
		}
	}
	isNumber(value) {
		if (Number(value) + "" === "NaN") return false;
		return true;
	}
	addInstruction(tag: string, Inst: Instruction) {
		this.Instructions.push(Inst);
		this.IMap[tag] = Inst;
	}
	getRegister(name: string) {
		if (Register_Map[name] != undefined) return Register_Map[name];
		return this.throw("invalid register");
	}
	setRegister(name: string, value: number) {
		if (Register_Map[name] != undefined) return Register_Map[name] = value;
		return this.throw("invalid register");
	}
	throw(error: string) {
		console.warn(error);
	}
	step() {
		var IP: any = this.getRegister(this.IP_FLAG);
		this.Opperations[IP].run();
		if (this.getRegister(this.IP_FLAG) === IP) this.setRegister(this.IP_FLAG, IP + 1);
	}
	return(index: number, value: number) {
		this.getRegister("RET" + index);
		this.setRegister("RET" + index, value);
	}
	resetRegisters() {
		let _Register_Map = {
			IP: 0,
			ACC: 0
		};
		for (var i = 0; i < 256; i++) {
			_Register_Map["R" + i] = 0;
		}
		_Register_Map["JSM"] = 0;
		for (var i = 0; i < 7; i++) {
			_Register_Map["JS" + i] = 0;
		}
		for (var i = 0; i < 4; i++) {
			_Register_Map["RET" + i] = 0;
		}
		Register_Map = _Register_Map;
		return Register_Map;
	}
	run(speed?: number) {
		if (this.intervul > -1) return this.throw("already running");
		this.intervul = setInterval(() => this.step(), speed || 100);
	}
}
class OP {
	INS: Instruction;
	LINE: string[];
	p: Runner;
	constructor(INS, LINE, P) {
		this.INS = INS;
		this.LINE = LINE;
		this.p = P;
	}
	run() {
		this.p.log.push("0x" + (Register_Map.IP).toString(16) + " " + this.INS.type + " " + this.LINE.join(" "));
		this.INS.op.apply(this, this.LINE.map(_ => {
			if (Number(_) + "" === "NaN") return _;
			return Number(_);
		}));
	}
}
export class Instruction {
	type: string;
	op: Function;
	constructor(type, op) {
		this.type = type;
		this.op = op;
	}
	is(type) {
		return this.type === type;
	}
}
export default {
	Register_Map: Register_Map,
	OP,
	Instruction,
	Runner
};