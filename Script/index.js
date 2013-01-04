/*global require, esri*/
require(["dojo/on", "esri/map", "esri/layers/WebTiledLayer", "dojo/domReady!"], function (on) {
	"use strict";

	var map, mqSubDomains, mqLayer;

	map = new esri.Map("map");
	// dojo.connect(window, 'resize', map, map.resize);
	on(window, "resize", function () {
		map.resize();
	});


	mqSubDomains = ["otile1", "otile2", "otile3", "otile4"];
	mqLayer = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/osm/${level}/${col}/${row}.png", {
		"id": "mapQuest",
		"subDomains": mqSubDomains,
		"copyright": '© OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
	});

	map.addLayer(mqLayer);
});