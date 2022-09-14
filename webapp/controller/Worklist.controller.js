sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("com.aramco.b2b.Catalog.controller.Worklist", {
		formatter: formatter,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var oJSONModel = new JSONModel({
				ui: {
					COM9: []
				}
			});
			this.getView().setModel(oJSONModel, "ui");
		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onSelectContractID: function (oEvent) {
			var com9Model = this.getView().getModel("ui");
			var oModel = this.getView().getModel();
			var catalogID = oEvent.getSource().getSelectedKey();
			var oFilter;
			oFilter = [];
			oFilter.push(new Filter("ContractID", "EQ", catalogID));
			oModel.read("/CatalogHeader", {
				filters: oFilter,
				success: function (oData, response) {
					com9Model.setProperty("/ui/COM9", oData.results);
				},
				error: function () {}
			});
		},
		/**
		 * Event handler when a button gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function (selecetedItem) {
			// The source is the list item that got pressed
			/*this.loadFragment({
				type: "XML",
				name: "com.aramco.b2b.Catalog.view.fragments.CSVFileDownload"
			}).then(function (oDialog) {
				oDialog.open();
			});*/
			
			this.getRouter().navTo("object", {
				objectId: selecetedItem.getSource().getBindingContext().getProperty("SubscriptionID")
			});
		},
		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack: function () {
			// eslint-disable-next-line sap-no-history-manipulation
			history.go(-1);
		},
		onSearch: function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");
				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("B2BAgreementIndicator", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}
		},
		onTblSearch: function(oEvent) {
			var aFilters = [];
			var oTable = this.getView().byId("idTblReqService");
			var searchValue = oEvent.getParameter("query");
			var oFilter = new sap.ui.model.Filter("SubscriptionID", sap.ui.model.FilterOperator.Contains, searchValue);
			aFilters.push(oFilter);
			
			var mainFilter = new sap.ui.model.Filter({
						filters: aFilters,
						and: false
					});	
			oTable.getBinding("items").filter([mainFilter]);

		},
		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function (oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("GenID")
			});
		},
		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function (aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},
		/**
		 *@memberOf com.aramco.b2b.Catalog.controller.Worklist
		 */
		onPressSubmit: function (oEvent) {
			console.log(oEvent);
		}
	});
});