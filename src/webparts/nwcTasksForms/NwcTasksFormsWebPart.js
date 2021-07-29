"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("NwcTasksFormsWebPartStrings");
var NwcTasksForms_1 = require("./components/NwcTasksForms");
var NwcTasksFormsWebPart = /** @class */ (function (_super) {
    __extends(NwcTasksFormsWebPart, _super);
    function NwcTasksFormsWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onError = function (errorMessage) {
            // render the message for the error that occurred in the web part
            _this.context.statusRenderer.renderError(_this.domElement, errorMessage);
        };
        return _this;
    }
    NwcTasksFormsWebPart.prototype.render = function () {
        var element = React.createElement(NwcTasksForms_1.default, {
            needsConfiguration: this._needsConfiguration(),
            tenantName: this.properties.tenantName,
            clientId: this.properties.clientId,
            filterWorkflows: this.properties.filterWorkflows,
            currentUserEmail: this.context.pageContext.user.email,
            errorHandler: this._onError
        });
        ReactDom.render(element, this.domElement);
    };
    NwcTasksFormsWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    // protected get dataVersion(): Version {
    //   return Version.parse('1.0');
    // }
    NwcTasksFormsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('tenantName', {
                                    label: strings.TenantNameFieldLabel
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('clientId', {
                                    label: strings.ClientIdFieldLabel
                                })
                            ]
                        },
                        {
                            groupName: strings.FilterGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('filterWorkflows', {
                                    label: strings.WorkflowsToFilterLabel,
                                    multiline: true,
                                    rows: 6
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    NwcTasksFormsWebPart.prototype._needsConfiguration = function () {
        return !this.properties.tenantName || this.properties.tenantName.length === 0
            || !this.properties.clientId || this.properties.tenantName.length === 0;
    };
    return NwcTasksFormsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = NwcTasksFormsWebPart;
//# sourceMappingURL=NwcTasksFormsWebPart.js.map