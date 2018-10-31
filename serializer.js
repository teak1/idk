window.Serializer = (function () {
	SerializableParentClass = {};

	function getObjectAtPath(obj, path, val) {
		let Segments = path.split(".");
		let tmp = obj;
		let ending;
		if (val) {
			ending = Segments.pop();
		}
		for (var seg of Segments) {
			tmp = tmp[seg];
		}
		if (val) {
			tmp[ending] = val;
		}
		return tmp;
	}
	return {
		addDeserializationPassin(name, func) {
			if (name) {
				SerializableParentClass[name] = func;
			}
			return SerializableParentClass;
		},
		Serializer: function Serializer(obj, seperator, point) {
			var SEPERATOR = seperator || "￾";
			var POINTERS = point || {};
			return {
				serialize(final, path, itt, arr) {
					path = path || "";
					itt = itt || 0;
					if (itt > 10) {
						return ["U￿￿"];
					}
					var raw = [""];
					// console.log(obj, itt);
					var key = Object.keys(obj);
					var bottom = 0;
					for (const item of key) {
						if (obj.constructor === Window) {
							// debugger;
							if (item === "frames" || item === "self" || (obj[item] && obj[item].window != undefined))
								continue;
						}
						let IS_CURRENT_INF = false;
						if (obj instanceof Object || true) {
							for (var data in POINTERS) {
								if (obj[item] === POINTERS[data]) {
									raw.push(`IN￿${item}￿${data}`);
									IS_CURRENT_INF = true;
									continue;
								}
							}
						}
						if (IS_CURRENT_INF)
							continue;
						POINTERS[path + (path === "" ? "" : ".") + item] = obj[item];
						console.log(POINTERS);
						// debugger;
						if (obj[item] === undefined) {
							raw.push(`U￿${item}`);
						} else if (obj[item] === null) {
							raw.push(`N￿${item}`);
						} else if (obj[item].constructor === Function) {
							// console.log("F", obj[item]);
							var code = obj[item].toString();
							if (code.match(/\) { \[native code\] }/)) {
								console.log("NOT LOADING", item, code);
							} else {
								raw.push(`F￿${item}￿${escape(code)}`);
							}
						} else if (obj[item].constructor === String) {
							raw.push(`S￿${item}￿${escape(obj[item])}`);
						} else
							/*if (obj[item] instanceof HTMLElement) {
															   console.log(obj[item]);
														   } else/**/
							if (obj[item].constructor === Number) {
								raw.push(`N￿${item}￿${obj[item]}`);
							}
						else if (obj[item].constructor === Boolean) {
							raw.push(`B￿${item}￿${1 - obj[item]}`);
						} else {
							var subobject = Serializer(obj[item], SEPERATOR, POINTERS).serialize(true, path + (path === "" ? "" : ".") + item, itt + 1);
							var size = subobject.length;
							raw.push(`I￿${item}￿${size}`);
							subobject.forEach(element => {
								raw.push(element);
							});
						}
					}
					if (raw.length > 1)
						raw[0] = "SC￿" + (raw.length - 1);
					return final ? raw : raw.join(SEPERATOR);
				},
				deserialize(isobj, path, TO_CHECK) {
					TO_CHECK = TO_CHECK || [];
					path = path || "";
					var raw = obj.split(SEPERATOR);
					var out = !isobj ? {} : [];
					var express_array = true;
					for (var i = 1; i < raw.length; i++) {
						var parts = raw[i].split("￿");
						switch (parts[0]) {
							case "I":
								var section = [];
								for (var j = 1; j < 1 + Number(parts[2]); j++) {
									section.push(raw[i + j]);
								}
								i += Number(parts[2]);
								var result = Serializer(section.join(SEPERATOR), SEPERATOR, POINTERS).deserialize(false, path + (path != "" ? "." : "") + parts[1], TO_CHECK);
								// debugger;
								if (!Object.keys(result).join("").match(/[^0-9]/)) {
									result = Object.assign([], result);
								}
								out[parts[1]] = result;
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "N":
								out[parts[1]] = Number(parts[2]);
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "U":
								out[parts[1]] = undefined;
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "B":
								out[parts[1]] = !Number(parts[2]);
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "N":
								out[parts[1]] = null;
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "S":
								out[parts[1]] = unescape(parts[2]);
								POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								break;
							case "F":
								try {
									var keys = Object.keys(SerializableParentClass);
									var func = Function.apply(Function, [...keys, "return " + unescape(parts[2])]);
									var args = [];
									for (var j = 0; j < keys.length; j++) {
										args.push(SerializableParentClass[keys[i]]);
									}
									// console.log(func);
									out[parts[1]] = func.apply({}, args);
									POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								} catch (e) {
									console.warn("FAILED TO LOAD SCRIPT\n", unescape(parts[2]), "\n", e);
								}
								break;
							case "IN":
								// debugger;
								if (POINTERS[parts[2]]) {
									out[parts[1]] = POINTERS[parts[2]];
									POINTERS[path + (path != "" ? "." : "") + parts[1]] = out[parts[1]];
								} else {
									out[parts[1]] = [path + (path != "" ? "." : "") + parts[1], parts[2]];
									TO_CHECK.push(path + (path != "" ? "." : "") + parts[1]);
								}
						}
					}
					if (!Object.keys(out).join("").match(/[^0-9]/g)) {
						out = Object.assign({}, out);
					}
					if (path.length === 0) {
						for (var pth of TO_CHECK) {
							var a = getObjectAtPath(out, pth);
							var b = getObjectAtPath(out, a[1]);
							getObjectAtPath(out, pth, b);
						}
					}
					return out;
				}
			}
		}
	}
})();

let ObjectForSerialization = {
	bool: true,
	Array: [{
		hello: "world"
	}],
	string: "hello world",
	func: function basicFunction(name) {
		console.log("hello " + name);
	}
}
console.log("ORIGINAL", ObjectForSerialization);
let serialized = Serializer.Serializer(ObjectForSerialization).serialize();
console.log("SERIALIZED OUTPUT", serialized);
let deserialize = Serializer.Serializer(serialized).deserialize();
console.log("DESERIALIZED", deserialize);