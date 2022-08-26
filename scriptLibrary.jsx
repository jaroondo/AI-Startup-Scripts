// © 2022 Ing. Jaroslav ONDO

// #script "Startup"
// #includepath "../Prepress"
// #include "PrepressLib.jsxinc"
// #targetengine "session"

/////////////////////////////////////////////////////////////////////////////
// LIBRARY
/////////////////////////////////////////////////////////////////////////////

// GLOBAL VARIABLES

var inksArr = [];

// XMP

function loadXMPLibrary() {
	// load the XMPScript library
	if (!ExternalObject.AdobeXMPScript) {
		try {
			ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
		} catch (e) {
			alert("Unable to load the AdobeXMPScript library!");
			return false;
		}
	}
	return true;
}

function unloadXMPLibrary() {
	// unload the XMPScript library
	if (ExternalObject.AdobeXMPScript) {
		try {
			ExternalObject.AdobeXMPScript.unload();
			ExternalObject.AdobeXMPScript = undefined;
		} catch (e) {
			alert("Unable to unload the AdobeXMPScript library!");
		}
	}
}

// My functions

function getSwatch(subStr) {
	// testuje vyskyt znaku "^", vrati swatch s orezanym menom -3 znaky z lava
	var list = app.activeDocument.swatches;
	var result = {};
	var cutSubStr = "";
	if (subStr.toString().charAt(2) == String.fromCharCode(94)) {
		cutSubStr = subStr.toString().substr(3);
		subStr = cutSubStr;
	}
	for (var i = 0; i < list.length; i++) {
		if (RegExp(subStr).test(list[i].name)) {
			result = list[i];
			break;
		}
	}
	return result;
}

function forAll(array, callBack) {
	// apply callback function on all items of array
	for (var i = 0; i < array.length; i++) {
		callBack(array[i]);
	}
}

function getObjPropsValues(object) {
	// vrati hodnoty premennych objektu ako pole
	var result = [];
	for (var property in object) {
		result.push(object[property]);
	}
	return result;
}

function getEgInks() {
	// vrati Esko Inks ako objekt typu pole
	var nameSpace = "http://ns.esko-graphics.com/grinfo/1.0/";
	var myAiFile = new File(app.activeDocument.fullName);
	var egInks = new EgInks();

	function EgInk() {
		//definicia objektu esko graphics ink
		this.id = 0;
		this.name = ""; // black, Black, Black 6
		this.type = ""; // process, pantone, designer
		this.book = ""; // process, pms1000c, none
		this.egname = ""; // meno výťažku (ink), môže sa líšiť od name
		this.frequency = 0.0; // ink coverage
		this.angle = 0.0; // scale number (Plato), pre InDD nepoužite
		this.dotshape = ""; // "" (none = negativ), string (pozitiv)
		this.r = 0.0; // Rgb godnota
		this.g = 0.0; // rGb hodnota
		this.b = 0.0; // rgB hodnota
		this.attribute = ""; // normal, opaque, varnish, technical
		this.printingmethod = ""; // unknown, string
		this.swatch = {};
	}

	function EgInks() {
		//definicia array-like objektu esko graphic inks
		this.length = 0;
		this.add = function () {
			// funkcia pridat novy ink
			var i = this.length;
			this[i] = new EgInk();
			this[i].id = i;
			this.length++;
		};
		this.lastItem = function () {
			// funkcia vrati poslednu polozku
			var i = this.length;
			if (i > 0) {
				return this[i - 1];
			} else {
				alert("egInks.length = 0, nema ziadnu polozku");
			}
		};
	}

	if (loadXMPLibrary()) {
		// read xml packet
		xmpFile = new XMPFile(myAiFile.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
		var myXmp = xmpFile.getXMP();
		if (myXmp) {
			var xmpInksCount = myXmp.countArrayItems(nameSpace, "inks");
			// $.writeln("Inks Count: " + xmpInksCount);
			for (var i = 1; i <= xmpInksCount; i++) {
				egInks.add();
				for (var property in egInks.lastItem()) {
					if (property !== "id") {
						egInks.lastItem()[property] = myXmp.getProperty(nameSpace, "inks[" + i + "]/egInk:" + property);
					}
				}
				// $.writeln(getObjPropsValues(egInks.lastItem()));
			}
		}
		xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
		unloadXMPLibrary();
	}
	forAll(egInks, linkSwatches);
	return egInks;
}

function linkSwatches(item) {
	//nalinkuje swatch
	item.swatch = getSwatch(item.name);
}

function show(item) {
	// zobrazi v konzole key:value parametre objektu do 2. urovne
	for (var key in item) {
		// if (item[key].constructor.name != "Document") {
		try {
			$.writeln(key + " : " + item[key] + " | " + item[key].constructor.name);
			var object = item[key];
			if (object.constructor.name != "Document") {
				for (var property in object) {
					$.writeln("  ." + property + " : " + object[property] + " | " + object[property].constructor.name);
				}
			}
		} catch (x_x) {
			// $.writeln([x_x.message, x_x.line, $.stack].join("\n"));
		} finally {
		}
	}
	$.writeln("---------------------------------");
}
// TESTING
// $.writeln("Library executed");
