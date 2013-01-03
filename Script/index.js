/*global require*/
require(["dojo/string", "esri/map", "esri/layers/WebTiledLayer", "dojo/domReady!"], function () {
	"use strict";

	var map, mqSubDomains, mapQuest;

	map = new esri.Map("map");

	mqSubDomains = ["mtile01", "mtile02", "mtile03", "mtile04"];
	mapQuest = new esri.layers.WebTiledLayer("http://${subDomain}.mqcdn.com/tiles/1.0.0/vx/map/${level}/${col}/${row}.jpg", {
		"id": "mapQuest",
		"subDomains": mqSubDomains,
		"copyright": "MapQuest © 2012"
	});

	map.addLayer(mapQuest);
});