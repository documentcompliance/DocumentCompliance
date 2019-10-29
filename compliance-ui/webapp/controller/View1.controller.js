sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("com.sap.document.compliance.compliance-ui.controller.View1", {
		formatter: formatter,
		onInit: function () {

			/*var keyModel = new sap.ui.model.json.JSONModel();
			keyModel.loadData("/docuchain/liststreamkeys", null, false);
			this.getView().setModel(keyModel, "master");*/

			this.jsonModel = new sap.ui.model.json.JSONModel();
			
			var seller = window.location.href.split("?")[window.location.href.split("?").length-1].split("=")[1];
			this.jsonModel.loadData("/docuchain/liststreamitems/" + seller, null, false);

			var masterModel = new sap.ui.model.json.JSONModel();
			var documentData = this.jsonModel.getData();
			documentData = this.getSortedData(this.jsonModel.getData(), "blocktime", false);
			masterModel.setData(documentData);
			this.getView().setModel(masterModel, "master");
			
			this.byId("master").setTitle("Documents (" + this.jsonModel.getData().length + ")");

			var detailModel = new sap.ui.model.json.JSONModel();
			detailModel.setData(this.jsonModel.getData()[0].data.json);
			this.getView().setModel(detailModel);
			
			var imgSrc;
			if(seller === 'ganesh.namasivaya@sap.com') {
				imgSrc = "https://logos-download.com/wp-content/uploads/2016/08/SAP_logo.png";
			} else if (seller === 'srikanth.jayaraman@sap.com') {
				imgSrc = "https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2014/09/Pirelli-Logo.png";
			}
			var logoModel = new sap.ui.model.json.JSONModel({
				src: imgSrc
			});
			this.getView().setModel(logoModel, "logoModel");
		},

		getSortedData: function (data, prop, isAsc) {
		    return data.sort((a, b) => {
		        return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
		    });
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