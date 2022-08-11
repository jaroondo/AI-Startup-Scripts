// © 2022 Ing. Jaroslav ONDO

// #script "Startup"
// #includepath "../Prepress"
// #include "PrepressLib.jsxinc"
// #targetengine "session"

/////////////////////////////////////////////////////////////////////////////
// Library
/////////////////////////////////////////////////////////////////////////////

// return array of active document items
function getDocumentElements(setName) {
  var doc = app.activeDocument;
  var result = [];

  for (var i = 0; i < doc[setName].length; i++) {
    result.push(doc[setName][i]);
  }

  return result;
}
/* argument "setName" values:
    "assets": "[Assets]",
    "artboards": "[Artboards]",
    "compoundPathItems": "[CompoundPathItems]",
    "layers": "[Layers]",
    "pageItems": "[PageItems]",
    "pathItems": "[PathItems]",
    "tags": "[Tags]",
    "views": "[Views]",
    "rasterItems": "[RasterItems]",
    "placedItems": "[PlacedItems]",
    "embeddedItems": "[EmbeddedItems]",
    "meshItems": "[MeshItems]",
    "pluginItems": "[PluginItems]",
    "graphItems": "[GraphItems]",
    "nonNativeItems": "[NonNativeItems]",
    "groupItems": "[GroupItems]",
    "textFrames": "[TextFrames]",
    "stories": "[Stories]",
    "characterStyles": "[CharacterStyles]",
    "paragraphStyles": "[ParagraphStyles]",
    "listStyles": "[ListStyles]",
    "swatches": "[Swatches]",
    "swatchGroups": "[SwatchGroups]",
    "gradients": "[Gradients]",
    "patterns": "[Patterns]",
    "spots": "[Spots]",
    "symbols": "[Symbols]",
    "symbolItems": "[SymbolItems]",
    "brushes": "[Brushes]",
    "graphicStyles": "[GraphicStyles]",
    "variables": "[Variables]",
    "dataSets": "[DataSets]",
    "legacyTextItems": "[LegacyTextItems]",
    "symmetryRepeatItems": "[SymmetryRepeatItems]",
    "radialRepeatItems": "[RadialRepeatItems]",
    "gridRepeatItems": "[GridRepeatItems]"
*/

// apply callback function on all items of array
function forAll(array, callBack) {
  for (var i = 0; i < array.length; i++) {
    callBack(array[i]);
  }
}
