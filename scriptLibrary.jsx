// © 2022 Ing. Jaroslav ONDO

// #script "Startup"
// #includepath "../Prepress"
// #include "PrepressLib.jsxinc"
// #targetengine "session"

/////////////////////////////////////////////////////////////////////////////
// LIBRARY
/////////////////////////////////////////////////////////////////////////////

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
      list[i].name = subStr;
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
