let VALID_VAR_CHARS: Array<String> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
let ROOT: HTMLStyleElement = document.createElement("style");
function _() {
	try {
		document.head.appendChild(ROOT);
	} catch (e) {
		setTimeout(_);
	}
}
_();
export class CSSAtrib {
	name: String;
	value: String;
}
export class CSS {
	var_names: Object = {};
	var_values: Object = {};
	var_keys: Array<String> = [];
	get(name: string) {
		if (this.var_names[name]) return this.getReference(name);
	}
	set(name: string, value: string) {
		if (!value) return;
		if (name) {
			if (this.var_names[name]) {
				this.var_values[this.var_names[name]] = value;
				this.rebuildValues();
				return this.var_values;
			} else {
				let _name: String = this.getVarKey();
				this.var_names[name] = _name;
				this.var_values[this.var_names[name]] = value;
				this.rebuildValues();
				return this.var_values;
			}
		} else {
			this.rebuildValues();
			return;
		}
	}
	private rebuildValues() {
		var cssString: string = ":root{";
		var atribs: Array<String> = [];
		for (var name in this.var_names) {
			var value = this.var_names[name];
			cssString += `--${value}:${this.var_values[value]}`;
		}
		cssString += atribs.join(";") + ";}";
		ROOT.innerText = cssString;
	}
	private getVarKey() {
		var key = new Array(32).fill(0).map(_ => VALID_VAR_CHARS[Math.floor(Math.random() * VALID_VAR_CHARS.length)]).join("");
		if (this.var_keys.indexOf(key) > 0) return this.getVarKey();
		return key;
	}
	getReference(name: string) {
		return `var(--${this.var_names[name]})`;
	}
}