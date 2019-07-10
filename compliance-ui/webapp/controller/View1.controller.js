sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.document.compliance.compliance-ui.controller.View1", {
		onInit: function () {
			var jsonModel = new sap.ui.model.json.JSONModel();
			jsonModel.loadData("/docuchain/liststremitems", null, false);
			this.getView().setModel(jsonModel);
			
			debugger;
		}
	});
});