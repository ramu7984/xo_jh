//@ui5-bundle com/aramco/b2b/Catalog/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/aramco/b2b/Catalog/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ErrorHandler"],function(t,e,s,i){"use strict";return t.extend("com.aramco.b2b.Catalog.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this._oErrorHandler=new i(this);this.setModel(s.createDeviceModel(),"device");this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"com/aramco/b2b/Catalog/controller/App.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("com.aramco.b2b.Catalog.controller.App",{onInit:function(){var e,n,o=this.getView().getBusyIndicatorDelay();e=new t({busy:true,delay:0});this.setModel(e,"appView");n=function(){e.setProperty("/busy",false);e.setProperty("/delay",o)};this.getOwnerComponent().getModel().metadataLoaded().then(n);this.getOwnerComponent().getModel().attachMetadataFailed(n);this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"com/aramco/b2b/Catalog/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/library"],function(e,t,r){"use strict";var o=r.URLHelper;return e.extend("com.aramco.b2b.Catalog.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))}})});
},
	"com/aramco/b2b/Catalog/controller/ErrorHandler.js":function(){sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("com.aramco.b2b.Catalog.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle();this._oComponent=e;this._oModel=e.getModel();this._bMessageOpen=false;this._sErrorText=this._oResourceBundle.getText("errorText");this._oModel.attachMetadataFailed(function(e){var s=e.getParameters();this._showServiceError(s.response)},this);this._oModel.attachRequestFailed(function(e){var s=e.getParameters();if(s.response.statusCode!=="404"||s.response.statusCode===404&&s.response.responseText.indexOf("Cannot POST")===0){this._showServiceError(s.response)}},this)},_showServiceError:function(e){if(this._bMessageOpen){return}this._bMessageOpen=true;s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"com/aramco/b2b/Catalog/controller/NotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(o){"use strict";return o.extend("com.aramco.b2b.Catalog.controller.NotFound",{onLinkPressed:function(){this.getRouter().navTo("worklist")}})});
},
	"com/aramco/b2b/Catalog/controller/Object.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History","../model/formatter"],function(e,t,n,o){"use strict";return e.extend("com.aramco.b2b.Catalog.controller.Object",{formatter:o,onInit:function(){var e,n=new t({busy:true,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);e=this.getView().getBusyIndicatorDelay();this.setModel(n,"objectView");this.getOwnerComponent().getModel().metadataLoaded().then(function(){n.setProperty("/delay",e)})},onNavBack:function(){var e=n.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("worklist",{},true)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("CatalogHeader",{SubscriptionID:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("objectView"),n=this.getModel();this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){n.metadataLoaded().then(function(){t.setProperty("/busy",true)})},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=this.getModel("objectView"),n=e.getElementBinding();if(!n.getBoundContext()){this.getRouter().getTargets().display("objectNotFound");return}var o=this.getResourceBundle(),i=e.getBindingContext().getObject(),a=i.GenID,r=i.B2BAgreementIndicator;t.setProperty("/busy",false);t.setProperty("/shareSendEmailSubject",o.getText("shareSendEmailObjectSubject",[a]));t.setProperty("/shareSendEmailMessage",o.getText("shareSendEmailObjectMessage",[r,a,location.href]))}})});
},
	"com/aramco/b2b/Catalog/controller/Worklist.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,r,n){"use strict";return e.extend("com.aramco.b2b.Catalog.controller.Worklist",{formatter:o,onInit:function(){var e=new t({ui:{COM9:[]}});this.getView().setModel(e,"ui")},onSelectContractID:function(e){var t=this.getView().getModel("ui");var o=this.getView().getModel();var n=e.getSource().getSelectedKey();var i;i=[];i.push(new r("ContractID","EQ",n));o.read("/CatalogHeader",{filters:i,success:function(e,o){t.setProperty("/ui/COM9",e.results)},error:function(){}})},onPress:function(e){this.getRouter().navTo("object",{objectId:e.getSource().getBindingContext().getProperty("SubscriptionID")})},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var o=e.getParameter("query");if(o&&o.length>0){t=[new r("B2BAgreementIndicator",n.Contains,o)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("GenID")})},_applySearch:function(e){var t=this.byId("table"),o=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){o.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}},onPressSubmit:function(e){console.log(e)}})});
},
	"com/aramco/b2b/Catalog/i18n/i18n.properties":'# This is the resource bundle for Supplier Enrichment\n\n#XTIT: Application name\nappTitle=Supplier Enrichment\n\nsuppTabTitle=Contract List\n\n#YDES: Application description\nappDescription= Supplier Enrichment\n#YDES: Application description\nSubscriptionID= Subscription\n#YDES: Application description\ncontractID= Contract\n#YDES: Application description\n9COM= 9COM\nstatus=Subscription Status\nSupplierERPID= Supplier\nContractType= Contract\nPurchaseGroup= PurchaseGroup\nContractExpiryDate= ContractExpiryDate\nContractCurrency= ContractCurrency\nB2BAgreementIndicator= B2BAgreementIndicator\nItemUpdateControl= ItemUpdateControl\nPriceUpdateControl= PriceUpdateControl\nSubscriptionStatus= SubscriptionStatus\nChangeInitiator= ChangeInitiator\nCIFCreationStatus= CIFCreationStatus\nSupplierANID= SupplierANID\nActiveVersionID= ActiveVersionID\nCreatedBy= CreatedBy\nCreationTimestamp= CreationTimestamp\nLastChangedBy= LastChangedBy\nLastChangedTimestamp= LastChangedTimestamp\nIsLocked= IsLocked\nSupplierEmail= SupplierEmail\nChildSubscriptionStatus= ChildSubscriptionStatus\nRejectionComments= RejectionComments\n\n\n\n\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Worklist view title\nworklistViewTitle=Manage <CatalogHeaderPlural>\n\n#XTIT: Worklist page title\nworklistTitle=Supplier Enrichment\n\n#XTIT: Table view title\nworklistTableTitle=<CatalogHeaderPlural>\n\n#XTOL: Tooltip for the search field\nworklistSearchTooltip=Enter an <CatalogHeader> name or a part of it.\n\n#XBLI: text for a table with no data with filter or search\nworklistNoDataWithSearchText=No matching <CatalogHeaderPlural> found\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=<CatalogHeader> ({0})\n\n#XTIT: The title of the column containing the B2BAgreementIndicator of CatalogHeader\ntableNameColumnTitle=<B2BAgreementIndicator>\n\n#XTIT: The title of the column containing the ActiveVersionID and the unit of measure\ntableUnitNumberColumnTitle=<ActiveVersionID>\n\n#XBLI: text for a table with no data\ntableNoDataText=No <CatalogHeaderPlural> are currently available\n\n#XLNK: text for link in \'not found\' pages\nbackToWorklist=Show Supplier Enrichment\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Object view title\nobjectViewTitle=<CatalogHeader> Details\n\n#XTIT: Object page title\nobjectTitle=<CatalogHeader>\n\n\n#XTIT: Label for the B2BAgreementIndicator\nB2BAgreementIndicatorLabel=B2BAgreementIndicator\n\n#XTIT: Label for the ActiveVersionID\nActiveVersionIDLabel=ActiveVersionID\n\n\n#~~~ Share Menu Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The CatalogHeader not found text is displayed when there is no CatalogHeader with this id\nnoObjectFoundText=This <CatalogHeader> is not available\n\n#YMSG: The CatalogHeader not available text is displayed when there is no data when starting the app\nnoObjectsAvailableText=No <CatalogHeaderPlural> are currently available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.',
	"com/aramco/b2b/Catalog/localService/metadata.xml":'<edmx:Edmx xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx" Version="1.0"><edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="2.0"><Schema xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\n\t\t\txmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://schemas.microsoft.com/ado/2008/09/edm"\n\t\t\tNamespace="B2B.services.b2bodata"><EntityType Name="CatalogHeaderType"><Key><PropertyRef Name="GenID"/></Key><Property Name="GenID" Type="Edm.String" Nullable="false" MaxLength="40"/><Property Name="SubscriptionID" Type="Edm.String" MaxLength="30"/><Property Name="SupplierERPID" Type="Edm.String" MaxLength="10"/><Property Name="ContractID" Type="Edm.String" MaxLength="10"/><Property Name="ContractType" Type="Edm.String" MaxLength="4"/><Property Name="PurchaseGroup" Type="Edm.String" MaxLength="4"/><Property Name="NINECOMID" Type="Edm.String" MaxLength="10"/><Property Name="ContractExpiryDate" Type="Edm.DateTime"/><Property Name="ContractCurrency" Type="Edm.String" MaxLength="3"/><Property Name="B2BAgreementIndicator" Type="Edm.String" MaxLength="1"/><Property Name="ItemUpdateControl" Type="Edm.String" MaxLength="1"/><Property Name="PriceUpdateControl" Type="Edm.String" MaxLength="1"/><Property Name="SubscriptionStatus" Type="Edm.String" MaxLength="1"/><Property Name="ChangeInitiator" Type="Edm.String" MaxLength="1"/><Property Name="CIFCreationStatus" Type="Edm.String" MaxLength="1"/><Property Name="SupplierANID" Type="Edm.String" MaxLength="20"/><Property Name="ActiveVersionID" Type="Edm.Int32"/><Property Name="CreatedBy" Type="Edm.String" MaxLength="20"/><Property Name="CreationTimestamp" Type="Edm.String" MaxLength="20"/><Property Name="LastChangedBy" Type="Edm.String" MaxLength="20"/><Property Name="LastChangedTimestamp" Type="Edm.String" MaxLength="20"/><Property Name="IsLocked" Type="Edm.String" MaxLength="20"/><Property Name="SupplierEmail" Type="Edm.String" MaxLength="20"/><Property Name="ChildSubscriptionStatus" Type="Edm.String" MaxLength="20"/><Property Name="RejectionComments" Type="Edm.String" MaxLength="20"/></EntityType><EntityType Name="Paramater1Type"><Key><PropertyRef Name="SelectIndex"/></Key><Property Name="SelectIndex" Type="Edm.Int32" Nullable="false"/><Property Name="Value" Type="Edm.String" MaxLength="40"/></EntityType><EntityType Name="Paramater2Type"><Key><PropertyRef Name="SelectIndex"/></Key><Property Name="SelectIndex" Type="Edm.Int32" Nullable="false"/><Property Name="Value" Type="Edm.String" MaxLength="40"/></EntityType><EntityType Name="Paramater3Type"><Key><PropertyRef Name="SelectIndex"/></Key><Property Name="SelectIndex" Type="Edm.Int32" Nullable="false"/><Property Name="Value" Type="Edm.String" MaxLength="40"/></EntityType><EntityType Name="Paramater4Type"><Key><PropertyRef Name="SelectIndex"/></Key><Property Name="SelectIndex" Type="Edm.Int32" Nullable="false"/><Property Name="Value" Type="Edm.String" MaxLength="40"/></EntityType><EntityContainer Name="b2bodata" m:IsDefaultEntityContainer="true"><EntitySet Name="CatalogHeader" EntityType="B2B.services.b2bodata.CatalogHeaderType"/><EntitySet Name="Paramater1" EntityType="B2B.services.b2bodata.Paramater1Type"/><EntitySet Name="Paramater2" EntityType="B2B.services.b2bodata.Paramater2Type"/><EntitySet Name="Paramater3" EntityType="B2B.services.b2bodata.Paramater3Type"/><EntitySet Name="Paramater4" EntityType="B2B.services.b2bodata.Paramater4Type"/></EntityContainer></Schema></edmx:DataServices></edmx:Edmx>',
	"com/aramco/b2b/Catalog/localService/mockserver.js":function(){sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,a){"use strict";var o,i="com/aramco/b2b/Catalog/",n=i+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(i+"manifest.json"),l=new t(p);l.attachRequestCompleted(function(){var t=new r(window.location.href),c=sap.ui.require.toUrl(n),p=l.getProperty("/sap.app/dataSources/mainService"),f=sap.ui.require.toUrl(i+p.settings.localUri),d=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";d=d&&new URI(d).absoluteTo(sap.ui.require.toUrl(i)).toString();if(!o){o=new e({rootUri:d})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(f,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=o.getRequests();var g=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){g(500,"metadata Error",e)}})}var v=u.errorType||t.get("errorType"),h=v==="badRequest"?400:500;if(v){m.forEach(function(e){g(h,v,e)})}o.setRequests(m);o.start();a.info("Running the app with mock data");s()});l.attachRequestFailed(function(){var e="Failed to load application manifest";a.error(e);c(new Error(e))})})},getMockServer:function(){return o}};return s});
},
	"com/aramco/b2b/Catalog/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.aramco.b2b.Catalog","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"resources":"resources.json","dataSources":{"mainService":{"uri":"/HANA_DB/B2B/services/b2bodata.xsodata/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}},"sourceTemplate":{"id":"sap.ui.ui5-template-plugin.1worklist","version":"1.105.1"}},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"com.aramco.b2b.Catalog.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.66.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.aramco.b2b.Catalog.i18n.i18n"}},"":{"dataSource":"mainService","preload":true}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"com.aramco.b2b.Catalog.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"CatalogHeader/{objectId}","name":"object","target":["object"]}],"targets":{"worklist":{"viewName":"Worklist","viewId":"worklist","viewLevel":1,"title":"{i18n>worklistViewTitle}"},"object":{"viewName":"Object","viewId":"object","viewLevel":2,"title":"{i18n>objectViewTitle}"},"objectNotFound":{"viewName":"ObjectNotFound","viewId":"objectNotFound"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}}},"sap.platform.hcp":{"uri":"webapp","_version":"1.1.0"}}',
	"com/aramco/b2b/Catalog/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{numberUnit:function(n){if(!n){return""}return parseFloat(n).toFixed(2)}}});
},
	"com/aramco/b2b/Catalog/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/aramco/b2b/Catalog/view/App.view.xml":'<mvc:View\n\tcontrollerName="com.aramco.b2b.Catalog.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App\n\t\tid="app"\n\t\tbusy="{appView>/busy}"\n\t\tbusyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>\n',
	"com/aramco/b2b/Catalog/view/NotFound.view.xml":'<mvc:View\n\tcontrollerName="com.aramco.b2b.Catalog.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>notFoundTitle}"\n\t\ttext="{i18n>notFoundText}"\n\t\ticon="sap-icon://document"\n\t\tid="page"\n\t\tdescription=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed"/></customDescription></MessagePage></mvc:View>',
	"com/aramco/b2b/Catalog/view/Object.view.xml":'<mvc:View controllerName="com.aramco.b2b.Catalog.controller.Object" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:c="sap.ui.core"\n\txmlns:t="sap.ui.table" xmlns:fr="sap.f" xmlns:f="sap.ui.layout.form"><Page showHeader="false" enableScrolling="true" class="sapUiResponsivePadding--header sapUiResponsivePadding--footer"><content><VBox fitContainer="true"><Toolbar class="sapUiSizeCompact headerBackColor" width="100%" visible="true"><Image src="./img/Aramco.jpg" width="8%"></Image><Label text="{i18n>appTitle}" design="Bold" class="headingText"/><ToolbarSpacer></ToolbarSpacer><HBox visible="{=!${device>/system/phone}}"><fr:Avatar displaySize="XS" backgroundColor="Transparent"/><Label text="Ramakrishna" design="Bold" class="sapUiTinyMarginEnd"/><Label text=" Phone :" design="Bold"/><Text text="+966 56 XXXXXXXX"/></HBox></Toolbar><HBox visible="{=!${device>/system/phone}}"><Label text="" design="Bold" class="sapUiTinyMarginEnd"/></HBox><HBox fitContainer="true" width="100%"><VBox fitContainer="true" width="100%"><layoutData><FlexItemData growFactor="1"/></layoutData><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title="Catalog Update"><Label id="labelInContract" displayOnly="true" wrapping="true" text="Contract ID"/><Select items="{/ContractIDEntitySet}" change="onSelectContractID"><items><c:Item key="{ContractID}" text="{ContractID}"/></items></Select><Label id="labelInContractType" displayOnly="true" wrapping="true" text="Contract Type"/><RadioButtonGroup xmlns="sap.m" columns="1" id="group0"><buttons><RadioButton text="9COM" id="button0"/><RadioButton text="9CAT" id="button1"/></buttons></RadioButtonGroup><Label id="labelIn9COM" displayOnly="true" wrapping="true" text="9COM"/><Select items="{ui>/ui/COM9}"><items><c:Item key="{ui>NINECOMID}" text="{ui>NINECOMID}"/></items></Select></f:SimpleForm></VBox><VBox fitContainer="true" width="100%"><layoutData><FlexItemData growFactor="1"/></layoutData><items><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="Subscription ID" width="100%"/><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="Effective Date" width="100%"/><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="ExpirationDate" width="100%"/><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="Price Update Control" width="100%"/><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="Item udate control" width="100%"/><Label text="{i18n>SupplierERPID}" width="100%"/><Text text="Currency" width="100%"/></f:SimpleForm></items></VBox><items/></HBox><IconTabBar upperCase="true" expandable="false" applyContentPadding="true" stretchContentHeight="true" class="sapUiResponsiveContentPadding"><items><IconTabFilter text="Item Details"><c:Fragment fragmentName="com.aramco.b2b.Catalog..view.fragments.ItemTable" type="XML"/></IconTabFilter><IconTabFilter text="Catalog Line Upload"><c:Fragment fragmentName="com.aramco.b2b.Catalog..view.fragments.SingleEntry" type="XML"/></IconTabFilter><IconTabFilter text="Bulk Upload"><c:Fragment fragmentName="com.aramco.b2b.Catalog..view.fragments.BulkUpload" type="XML"/></IconTabFilter></items><layoutData><FlexItemData growFactor="1" baseSize="0%"/></layoutData></IconTabBar></VBox></content><footer><OverflowToolbar><content><ToolbarSpacer/><Button xmlns="sap.m" text="Submit" press="onPressSubmit"/></content></OverflowToolbar></footer></Page></mvc:View>',
	"com/aramco/b2b/Catalog/view/ObjectNotFound.view.xml":'<mvc:View\n\tcontrollerName="com.aramco.b2b.Catalog.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>objectTitle}"\n\t\ttext="{i18n>noObjectFoundText}"\n\t\ticon="sap-icon://product"\n\t\tdescription=""\n\t\tid="page"><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed" /></customDescription></MessagePage></mvc:View>',
	"com/aramco/b2b/Catalog/view/Worklist.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:c="sap.ui.core" xmlns:fr="sap.f" xmlns:t="sap.ui.table"\n\txmlns:f="sap.ui.layout.form" controllerName="com.aramco.b2b.Catalog.controller.Worklist" height="100%"><Page showHeader="false" showFooter="true"><content><Toolbar class="sapUiSizeCompact headerBackColor" width="100%" visible="true"><Image src="./img/Aramco.jpg" width="8%"></Image><Label text="{i18n>appTitle}" design="Bold" class="headingText"/><ToolbarSpacer></ToolbarSpacer><HBox visible="{=!${device>/system/phone}}"><fr:Avatar displaySize="XS" backgroundColor="Transparent"/><Label text="Ramakrishna" design="Bold" class="sapUiTinyMarginEnd"/><Label text=" Phone :" design="Bold"/><Text text="+966 56 XXX XXXXX"/></HBox></Toolbar><HBox visible="{=!${device>/system/phone}}"><Label text="" design="Bold" class="sapUiTinyMarginEnd"/></HBox><Table id="idTblReqService" items="{ path: \'/CatalogHeader\' , sorter: { path: \'SubscriptionID\' } }" selectionChange="onSelectionRequestTableRow"\n\t\t\t\t mode="MultiSelect"><headerToolbar><OverflowToolbar><Title text="{i18n>suppTabTitle}"/><ToolbarSpacer/><SearchField search="onTblSearch" class="sapUiSizeCompact sapUiSmallMarginEnd sapUiSmallMarginTop" width="60%"/></OverflowToolbar></headerToolbar><columns><Column id="Supplier" width="12em"><Text text="{i18n>Supplier}"/></Column><Column id="SupplierERPID" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>SupplierERPID}"/></Column><Column id="ContractID" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>ContractID}"/></Column><Column id="ContractType" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>ContractType}"/></Column><Column id="NINECOMID" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>9COM}"/></Column><Column id="SubscriptionStatus" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>SubscriptionStatus}"/></Column><Column id="RejectionComments" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>RejectionComments}"/></Column></columns><items><ColumnListItem type="Active" press="onPress"><cells><Text text="{SubscriptionID}"/><Text text="{SupplierERPID}"/><Text text="{ContractID}"/><Text text="{ContractType}"/><Text text="{NINECOMID}"/><Text text="{SubscriptionStatus}"/><Text text="{RejectionComments}"/></cells></ColumnListItem></items></Table></content><footer><Toolbar><Button icon="sap-icon://message-popup" text="{/messagesLength}" type="Emphasized" press="onMessageButtonPress"/></Toolbar></footer></Page></mvc:View>',
	"com/aramco/b2b/Catalog/view/fragments/BulkUpload.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><HBox><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Download New Subscription Template"\n\t\t\tsubheader="This template will be used to upload new catalog" mode="HeaderMode" frameType="TwoByOne" press="press"><TileContent><ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png"/></TileContent></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Upload Subscription"\n\t\t\tsubheader="This option will be used to upload(or update) new(or existing) catalog" mode="HeaderMode" frameType="TwoByOne" press="press"><TileContent><ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png"/></TileContent></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Download Available Subscription"\n\t\t\tsubheader="Existing Catalog for the selected contract/9COM will be downloaded" mode="HeaderMode" press="press" frameType="TwoByOne"><TileContent><ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png"/></TileContent></GenericTile></HBox></core:FragmentDefinition>',
	"com/aramco/b2b/Catalog/view/fragments/CSVFileDownload.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Dialog id="helloDialog" title="Please Select"><content><HBox><Select items="{/Paramater1}"><items><core:Item key="{SelectIndex}" text="{Value}"/></items></Select><Select items="{/Paramater2}"><items><core:Item key="{SelectIndex}" text="{Value}"/></items></Select><Select items="{/Paramater3}"><items><core:Item key="{SelectIndex}" text="{Value}"/></items></Select><Select items="{/Paramater4}"><items><core:Item key="{SelectIndex}" text="{Value}"/></items></Select></HBox></content><beginButton><Button></Button></beginButton><endButton><Button></Button></endButton></Dialog></core:FragmentDefinition>',
	"com/aramco/b2b/Catalog/view/fragments/ItemTable.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Table id="productsTable"\n\t\titems="{/CatalogItems}"><headerToolbar><OverflowToolbar></OverflowToolbar></headerToolbar><columns><Column id="productCol" width="12em"><Text text="Product" /></Column><Column id="supplierCol" minScreenWidth="Tablet" demandPopin="true"><Text text="Supplier" /></Column><Column id="dimensionsCol" visible="false" minScreenWidth="Tablet" demandPopin="true" hAlign="End"><Text text="Dimensions" /></Column><Column id="weightCol" visible="false" minScreenWidth="Tablet" demandPopin="true" hAlign="Center"><Text text="Weight" /></Column><Column id="priceCol" hAlign="End"><Text text="Price" /></Column></columns><items><ColumnListItem vAlign="Middle"><cells><Text text="{SubscriptionID}" /><Text text="{ItemUniqueKey}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /><Text text="{SupplierName}" /></cells></ColumnListItem></items></Table></core:FragmentDefinition>',
	"com/aramco/b2b/Catalog/view/fragments/SingleEntry.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form" xmlns:u="sap.ui.unified"\n\txmlns:core="sap.ui.core"><IconTabBar upperCase="true" expandable="false" applyContentPadding="true" stretchContentHeight="true" class="sapUiResponsiveContentPadding"><items><IconTabFilter text="Item Details"><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="Supplier Part ID"/><Input xmlns="sap.m" value="{SupplierPartID}"/><Label text="Item Description"/><Input xmlns="sap.m" value="{ItemDescription}"/><Label text="Unit Price"/><Input xmlns="sap.m" value="{UnitPrice}"/><Label text="Unit of Measure"/><Input xmlns="sap.m" value="{UnitOfMeasure}"/><Label text="Short Name"/><Input xmlns="sap.m" value="{ShortName}"/><Label text="Manufacturer Name"/><Input value="{ManufacturerName}"/><Label text="Manufacturer Part ID"/><Input value="{ManufacturerPartID}"/><Label text="custom- Country of Origin"/><Input value="{MaterialCountryOfOrigin}"/><Label text="Lead Time"/><Input value="{LeadTime}"/><Label text="Minimum Quantity"/><Input value="{MinimumQuantity}"/><Label text="Quantity Interval"/><Input value="{QuantityInterval}"/><Label text="Keywords"/><Input value="{Keywords}"/><Label text="hazardousmaterials"/><CheckBox text="" selected="{path: \'hazardousmaterials\',formatter: \'.formatter.returnBoolean\'}"/><Label text="green"/><CheckBox text="" selected="{path: \'green\',formatter: \'.formatter.returnBoolean\'}"/></f:SimpleForm></IconTabFilter><IconTabFilter text="Item Images"><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="Image1"/><u:FileUploader name="myFileUpload" uploadUrl="upload/" tooltip="Upload your file to the local server" uploadComplete="handleUploadComplete"/><Label text="Image2"/><u:FileUploader name="myFileUpload" uploadUrl="upload/" tooltip="Upload your file to the local server" uploadComplete="handleUploadComplete"/><Label text="Image3"/><u:FileUploader name="myFileUpload" uploadUrl="upload/" tooltip="Upload your file to the local server" uploadComplete="handleUploadComplete"/><Label text="Image4"/><u:FileUploader name="myFileUpload" uploadUrl="upload/" tooltip="Upload your file to the local server" uploadComplete="handleUploadComplete"/><Label text="Image5"/><u:FileUploader name="myFileUpload" uploadUrl="upload/" tooltip="Upload your file to the local server" uploadComplete="handleUploadComplete"/></f:SimpleForm></IconTabFilter><IconTabFilter text="Related Items"><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="RelatedItem1"/><Input value="{RelatedItem1}"/><Label text="RelatedItem2"/><Input value="{RelatedItem2}"/><Label text="RelatedItem3"/><Input value="{RelatedItem3}"/></f:SimpleForm></IconTabFilter><IconTabFilter text="Item Specification Key Value Pairs"><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="Item Specification1-Key"/><Input value="{ItemSpecification1Key}"/><Label text="Item Specification1-Value"/><Input value="{ItemSpecification1Value}"/><Label text="Item Specification2-Key"/><Input value="{ItemSpecification2Key}"/><Label text="Item Specification2-Value"/><Input value="{ItemSpecification2Value}"/></f:SimpleForm></IconTabFilter><IconTabFilter text="Parametric Key Value Pairs"><f:SimpleForm layout="ResponsiveGridLayout" editable="true" title=""><Label text="Parametric1-Key"/><Input value="{Parameter1Key}"/><Label text="Parametric1-Value"/><Input value="{Parameter1Value}"/><Label text="Parametric2-Key"/><Input value="{Parameter2Key}"/><Label text="Parametric2-Value"/><Input value="{Parameter2Value}"/></f:SimpleForm></IconTabFilter></items><layoutData><FlexItemData growFactor="1" baseSize="0%"/></layoutData></IconTabBar></core:FragmentDefinition>'
}});