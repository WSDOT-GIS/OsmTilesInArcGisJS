/*global require, esri*/
/*jslint browser:true*/
/// <reference path="jsapi_vsdoc_v32_2012.js" />
require(["dojo/on", "dojo/query", "esri/map", "esri/layers/WebTiledLayer", "esri/layers/osm", "dojo/domReady!"], function (on, query) {
	"use strict";

	var map, changeLayers;

	map = new esri.Map("map");

	function createLayer(type, ext) {
		/// <summary>Creates an esri.layers.WebTiledLayer using MapQuest open tiles.</summary>
		/// <param name="type" type="String">The type of tiles "map" (OSM) or "sat" (Open Aerial). (Optional.  Defaults to "map".)</param>
		/// <param name="ext" type="String">The image file extension: "png" or "jpg". (Optional. Defaults to "png").</param>
		/// <returns type="esri.layers.WebTiledLayer" />
		var layer, mqSubDomains, osmSubDomains;
		mqSubDomains = ["otile1", "otile2", "otile3", "otile4"];
		osmSubDomains = ["a", "b", "c"];
		if (!type) {
			type = "map";
		}
		if (!ext) {
			ext = "png";
		}
		if (type === "mapQuestOsm") {
			layer = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/map/${level}/${col}/${row}." + ext, {
				"id": "mapQuestOSM",
				"subDomains": mqSubDomains,
				"copyright": '© OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
			});
		} else if (type === "mapQuestOpenAerial") {
			layer = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/sat/${level}/${col}/${row}." + ext, {
				"id": "mapQuestOpenAerial",
				"subDomains": mqSubDomains,
				"copyright": 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
			});
		} else if (type === "openCycleMap") {
			layer = new esri.layers.WebTiledLayer("http://${subDomain}.tile.opencyclemap.org/cycle/${level}/${col}/${row}.png", {
				id: "openCycleMap",
				subDomains: osmSubDomains,
				copyright: '© OpenStreetMap contributors'
			});
		} else if (type === "openStreetMap") {
			////layer = new esri.layers.WebTiledLayer("http://${subDomain}.tile.openstreetmap.org/${level}/${col}/${row}." + ext, {
			////	"id": id,
			////	"subDomains": osmSubDomains,
			////	"copyright": '© OpenStreetMap contributors'
			////});
			layer = new esri.layers.OpenStreetMapLayer({
				id: "openStreetMap",
				displayLevels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
			});
		}
		
		return layer;
	}

	function hideOtherLayers(/*String*/ id) {
		/// <summary>Hides all of the layers in the map EXCEPT for the one specified by the id parameter.</summary>
		/// <param name="id" type="String">The id of the layer that WILL NOT be hidden.</param>

		var i, l, currentId, layer;

		for (i = 0, l = map.layerIds.length; i < l; i += 1) {
			currentId = map.layerIds[i];
			if (currentId !== id) {
				layer = map.getLayer(currentId);
				if (layer) {
					layer.hide();
				}
			}
		}
	}

	changeLayers = function () {
		/// <summary>Changes the layers when a radio button is clicked.</summary>
		var id, layer;
		if (!this) {
			id = query("#tools > input:checked")[0].value;  //"mapQuestOsm";
		} else {
			id = this.value;
		}

		if (id) {
			// Get the layer (if it already exists).
			layer = map.getLayer(id);
			hideOtherLayers(id);
			// Create the layer if it does not already exist.
			if (!layer) {
				layer = createLayer(id);
				map.addLayer(layer);
			} else {
				layer.show();
			}

		}
	};

	// Resize the map when the browser window resizes.
	// dojo.connect(window, 'resize', map, map.resize);
	on(window, "resize", function () {
		map.resize();
	});

	changeLayers();

	// Attach event handler code to radio button inputs.
	on(query("#tools > input[type=radio]"), "click", changeLayers);

});