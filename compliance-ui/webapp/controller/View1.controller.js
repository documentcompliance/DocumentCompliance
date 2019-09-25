sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.document.compliance.compliance-ui.controller.View1", {
		onInit: function () {
			
			var keyModel = new sap.ui.model.json.JSONModel();
			keyModel.loadData("/docuchain/liststreamkeys", null, false);
			this.getView().setModel(keyModel, "master");
			
			this.jsonModel = new sap.ui.model.json.JSONModel();
			this.jsonModel.loadData("/docuchain/liststreamitems", null, false);
			
			
			var itemModel = new sap.ui.model.json.JSONModel();
			itemModel.setData(this.jsonModel.getData()[0].data.json);
			this.getView().setModel(itemModel);
		},
		
		onSelectInvoiceId: function(oEvent){
			var dataToFilter = this.jsonModel.getData();
			var key = oEvent.getSource().getTitle();
			
			var filteredData = dataToFilter.filter(function(v){
				return v.key === key;
			});
			
			this.getView().getModel().setData(filteredData[0].data.json);
			
			
			
		}
	});
});