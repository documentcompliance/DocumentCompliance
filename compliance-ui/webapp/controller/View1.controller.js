sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.document.compliance.compliance-ui.controller.View1", {
		onInit: function () {

			/*var keyModel = new sap.ui.model.json.JSONModel();
			keyModel.loadData("/docuchain/liststreamkeys", null, false);
			this.getView().setModel(keyModel, "master");*/

			this.jsonModel = new sap.ui.model.json.JSONModel();
			
			var seller=window.location.href.split("?")[window.location.href.split("?").length-1].split("=")[1];
			this.jsonModel.loadData("/docuchain/liststreamitems/" + seller, null, false);

			var masterModel = new sap.ui.model.json.JSONModel();
			masterModel.setData(this.jsonModel.getData());
			this.getView().setModel(masterModel, "master");

			var detailModel = new sap.ui.model.json.JSONModel();
			detailModel.setData(this.jsonModel.getData()[0].data.json);
			this.getView().setModel(detailModel);

		},

		onSelectInvoiceId: function (oEvent) {
			var dataToFilter = this.jsonModel.getData();
			var key = oEvent.getSource().getTitle();

			var filteredData = dataToFilter.filter(function (v) {
				return v.key === key;
			});

			this.getView().getModel().setData(filteredData[0].data.json);

		}
	});
});