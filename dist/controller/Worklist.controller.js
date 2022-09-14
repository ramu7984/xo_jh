sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,r,n){"use strict";return e.extend("com.aramco.b2b.Catalog.controller.Worklist",{formatter:o,onInit:function(){var e=new t({ui:{COM9:[]}});this.getView().setModel(e,"ui")},onSelectContractID:function(e){var t=this.getView().getModel("ui");var o=this.getView().getModel();var n=e.getSource().getSelectedKey();var i;i=[];i.push(new r("ContractID","EQ",n));o.read("/CatalogHeader",{filters:i,success:function(e,o){t.setProperty("/ui/COM9",e.results)},error:function(){}})},onPress:function(e){this.getRouter().navTo("object",{objectId:e.getSource().getBindingContext().getProperty("SubscriptionID")})},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var o=e.getParameter("query");if(o&&o.length>0){t=[new r("B2BAgreementIndicator",n.Contains,o)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("GenID")})},_applySearch:function(e){var t=this.byId("table"),o=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){o.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}},onPressSubmit:function(e){console.log(e)}})});