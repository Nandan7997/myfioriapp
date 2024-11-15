/*global QUnit*/

sap.ui.define([
	"myfioriapp/controller/FormView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FormView Controller");

	QUnit.test("I should test the FormView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
