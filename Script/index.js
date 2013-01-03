/*global require*/
require(["dojo/string", "esri/map", "esri/layers/WebTiledLayer", "dojo/domReady!"], function () {
	"use strict";

	var map, mqSubDomains, mapQuest;

	map = new esri.Map("map");

	mqSubDomains = ["otile1", "otile2", "otile3", "otile4"];
	mapQuest = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/osm/${level}/${col}/${row}.png", {
		"id": "mapQuest",
		"subDomains": mqSubDomains,
		"copyright": "© MapQuest"
	});

	map.addLayer(mapQuest);
});