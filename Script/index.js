/*global require, esri*/
/*jslint browser:true*/
require(["dojo/on", "dojo/query", "esri/map", "esri/layers/WebTiledLayer", "esri/layers/osm", "dojo/domReady!"], function (on, query) {
	"use strict";

	var map, mqLayer, oaLayer, osmLayer, changeLayers;

	map = new esri.Map("map");

	function createLayer(id, type, ext) {
		/// <summary>Creates an esri.layers.WebTiledLayer using MapQuest open tiles.</summary>
		/// <param name="id" type="String">The id that you want to give the layer. (Required)</param>
		/// <param name="type" type="String">The type of tiles "map" (OSM) or "sat" (Open Aerial). (Optional.  Defaults to "map".)</param>
		/// <param name="ext" type="String">The image file extension: "png" or "jpg". (Optional. Defaults to "png").</param>
		/// <returns type="esri.layers.WebTiledLayer" />
		var layer, mqSubDomains;
		mqSubDomains = ["otile1", "otile2", "otile3", "otile4"];
		if (!type) {
			type = "map";
		}
		if (!ext) {
			ext = "png";
		}
		if (type === "map") {
			layer = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/map/${level}/${col}/${row}." + ext, {
				"id": id,
				"subDomains": mqSubDomains,
				"copyright": '© OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
			});
		} else if (type === "sat") {
			layer = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/sat/${level}/${col}/${row}." + ext, {
				"id": id,
				"subDomains": mqSubDomains,
				"copyright": 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
			});
		} else if (type === "osm") {
			layer = new esri.layers.OpenStreetMapLayer({
				id: id,
				displayLevels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
			});
		}
		
		return layer;
	}

	changeLayers = function () {
		/// <summary>Changes the layers when a radio button is clicked.</summary>
		var type;
		if (!this) {
			type = "osm";
		} else {
			type = this.value;
		}

		if (type === "map") {
			if (!mqLayer) {
				mqLayer = createLayer("mapQuest", "map", "png");
				map.addLayer(mqLayer);
			}
			mqLayer.show();
			if (oaLayer) {
				oaLayer.hide();
			}
			if (osmLayer) {
				osmLayer.hide();
			}
		} else if (type === "sat") {
			if (!oaLayer) {
				oaLayer = createLayer("openAerial", "sat", "png");
				map.addLayer(oaLayer);
			}
			oaLayer.show();
			if (mqLayer) {
				mqLayer.hide();
			}
			if (osmLayer) {
				osmLayer.hide();
			}
		} else if (type === "osm") {
			if (!osmLayer) {
				osmLayer = createLayer("osm", "osm");
				map.addLayer(osmLayer);
			}
			osmLayer.show();
			if (oaLayer) {
				oaLayer.hide();
			}
			if (mqLayer) {
				mqLayer.hide();
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