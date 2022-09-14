/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/aramco/b2b/Catalog/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
