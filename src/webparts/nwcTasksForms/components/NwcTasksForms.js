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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var NwcTasksForms_module_scss_1 = require("./NwcTasksForms.module.scss");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var auth0_spa_js_1 = require("@auth0/auth0-spa-js");
var AppSettings_1 = require("../../../AppSettings");
var NwcTasksForms = /** @class */ (function (_super) {
    __extends(NwcTasksForms, _super);
    function NwcTasksForms(props) {
        var _this = _super.call(this, props) || this;
        _this.auth0 = undefined;
        // =====================================================================================================
        // API functionality - get Tasks and Forms
        // =====================================================================================================
        // need to determine geo-region / url
        _this.getGeoPrefixUrl = function (idToken) {
            // check the token from auth0
            var apiUrl = idToken['http://ntx.identity/api-uri'];
            return apiUrl;
        };
        // determine the list of tasks, dependent on a workflow filter - if any ?
        _this.filterTasks = function (tasks) {
            // map to display mode for NintexTasks
            var returnTasks = [];
            var workflowFilters = [];
            if (_this.props.filterWorkflows !== '') {
                workflowFilters = _this.props.filterWorkflows.split(/\r?\n/);
            }
            debugger;
            tasks.map(function (t) {
                // check to see if there's a filter for workflows - if not, then just return
                t.taskAssignments.forEach(function (ta) {
                    var correctUser = false;
                    var includeFromFilter = false;
                    correctUser = (ta.assignee === _this.props.currentUserEmail);
                    if (workflowFilters.length === 0) {
                        includeFromFilter = true;
                    }
                    else {
                        workflowFilters.forEach(function (filter) {
                            // matching the filter guid
                            if (filter === t.workflowId) {
                                includeFromFilter = true;
                            }
                        });
                    }
                    // can now add to the collection to include in UI
                    if (correctUser && includeFromFilter) {
                        returnTasks.push({
                            id: t.id,
                            name: t.name,
                            description: t.description,
                            status: t.status,
                            created: t.createdDate,
                            dueDate: t.dueDate,
                            formUrl: ta.urls.formUrl,
                            workflow: t.workflowName
                        });
                    }
                });
            });
            return returnTasks;
        };
        // determine the list of forms, dependent on a workflow filter - if any
        // [[ QUESTION: filter for workflow ?? ]]
        _this.filterForms = function (forms) {
            // map to display mode for NintexForms
            var returnForms = forms.map(function (f) {
                return {
                    id: f.id,
                    name: f.name,
                    description: f.description,
                    lastModified: f.lastModified,
                    urls: f.urls,
                    favourite: f.favourite,
                    workflow: f.workflow
                };
            });
            return returnForms;
        };
        // setup the auth connection object
        _this.configureClient = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, isAuthenticated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, auth0_spa_js_1.default({
                                domain: AppSettings_1.AppSettings.domain,
                                client_id: this.props.clientId,
                                audience: AppSettings_1.AppSettings.audience,
                                redirect_uri: window.location.origin,
                                cacheLocation: 'localstorage',
                                scope: 'tenant_name_' + this.props.tenantName // from webpart property
                            })];
                    case 1:
                        _a.auth0 = _b.sent();
                        return [4 /*yield*/, this.auth0.isAuthenticated()];
                    case 2:
                        isAuthenticated = _b.sent();
                        if (!!isAuthenticated) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.auth0.loginWithPopup()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // call API to load list of tasks
        _this.getTasks = function () { return __awaiter(_this, void 0, void 0, function () {
            var isAuthenticated, token, idToken, tasksUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configureClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.auth0.isAuthenticated()];
                    case 2:
                        isAuthenticated = _a.sent();
                        if (!isAuthenticated) return [3 /*break*/, 5];
                        // set state to LOADING for TASKS
                        this.state = __assign({}, this.state, { tasksLoading: true });
                        this.forceUpdate();
                        return [4 /*yield*/, this.auth0.getTokenSilently()];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, this.auth0.getIdTokenClaims()];
                    case 4:
                        idToken = _a.sent();
                        tasksUrl = this.getGeoPrefixUrl(idToken) + '/workflows/v2/tasks';
                        tasksUrl += '?status=active';
                        fetch(tasksUrl, {
                            method: 'GET',
                            credentials: 'same-origin',
                            headers: {
                                'accept': 'application/json',
                                'authorization': "Bearer " + token
                            }
                        })
                            .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                throw new Error(response.statusText);
                            }
                        })
                            .then(function (json) {
                            if (json.tasks) {
                                _this.state = __assign({}, _this.state, { nwcTasks: _this.filterTasks(json.tasks), tasksLoading: false });
                                _this.forceUpdate();
                            }
                        })
                            .catch(function (e) {
                            console.log(e);
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // call API to load list of forms
        _this.getForms = function () { return __awaiter(_this, void 0, void 0, function () {
            var isAuthenticated, token, idToken, tasksUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configureClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.auth0.isAuthenticated()];
                    case 2:
                        isAuthenticated = _a.sent();
                        if (!isAuthenticated) return [3 /*break*/, 5];
                        // set state to LOADING for FORMS
                        this.state = __assign({}, this.state, { formsLoading: true });
                        this.forceUpdate();
                        return [4 /*yield*/, this.auth0.getTokenSilently()];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, this.auth0.getIdTokenClaims()];
                    case 4:
                        idToken = _a.sent();
                        tasksUrl = this.getGeoPrefixUrl(idToken) + '/workflows/v1/forms';
                        fetch(tasksUrl, {
                            method: 'GET',
                            credentials: 'same-origin',
                            headers: {
                                'accept': 'application/json',
                                'authorization': "Bearer " + token
                            }
                        })
                            .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                throw new Error(response.statusText);
                            }
                        })
                            .then(function (json) {
                            if (json.forms) {
                                _this.state = __assign({}, _this.state, { nwcForms: _this.filterForms(json.forms), formsLoading: false });
                                _this.forceUpdate();
                            }
                        })
                            .catch(function (e) {
                            console.log(e);
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // =====================================================================================================
        // UI functionality - render links & outcomes
        // =====================================================================================================
        _this._onTasksColumnClick = function (event, column) {
            var tasksColumns = _this.state.tasksColumns;
            var nwcTasks = _this.state.nwcTasks;
            var isSortedDescending = column.isSortedDescending;
            // If we’ve sorted this column, flip it.
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            // Sort the items.
            nwcTasks = _copyAndSort(nwcTasks, column.fieldName, isSortedDescending);
            _this.state = __assign({}, _this.state, { nwcTasks: nwcTasks, tasksColumns: tasksColumns.map(function (col) {
                    col.isSorted = col.key === column.key;
                    if (col.isSorted) {
                        col.isSortedDescending = isSortedDescending;
                    }
                    return col;
                }) });
        };
        _this._onFormsColumnClick = function (ev, column) {
            var formsColumns = _this.state.formsColumns;
            var nwcForms = _this.state.nwcForms;
            var isSortedDescending = column.isSortedDescending;
            // If we’ve sorted this column, flip it.
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            // Sort the items.
            nwcForms = _copyAndSort(nwcForms, column.fieldName, isSortedDescending);
            _this.state = __assign({}, _this.state, { nwcForms: nwcForms, formsColumns: formsColumns.map(function (col) {
                    col.isSorted = col.key === column.key;
                    if (col.isSorted) {
                        col.isSortedDescending = isSortedDescending;
                    }
                    return col;
                }) });
        };
        _this.renderForms = function () {
            if (_this.state.nwcForms.length > 0) {
                return React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: 'Form', itemCount: _this.state.nwcForms.length }, _this.state.formsLoading ?
                    React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.xSmall })
                    :
                        React.createElement(office_ui_fabric_react_1.DetailsList, { items: _this.state.nwcForms, selectionMode: office_ui_fabric_react_1.SelectionMode.none, columns: _this.state.formsColumns, isHeaderVisible: true }));
            }
            else {
                // empty
                return React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: 'Form' }, _this.state.formsLoading ?
                    React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.xSmall })
                    :
                        React.createElement(office_ui_fabric_react_1.Label, { style: { marginLeft: '10px', marginTop: '12px' } }, "No Forms Found"));
            }
        };
        _this.renderTasks = function () {
            if (_this.state.nwcTasks.length > 0) {
                return React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: 'Task', itemCount: _this.state.nwcTasks.length }, _this.state.tasksLoading ?
                    React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.xSmall })
                    :
                        React.createElement(office_ui_fabric_react_1.DetailsList, { items: _this.state.nwcTasks, selectionMode: office_ui_fabric_react_1.SelectionMode.none, columns: _this.state.tasksColumns, isHeaderVisible: true }));
            }
            else {
                // empty
                return React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: 'Task' }, _this.state.tasksLoading ?
                    React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.xSmall })
                    :
                        React.createElement(office_ui_fabric_react_1.Label, { style: { marginLeft: '10px', marginTop: '12px' } }, "No Tasks Found"));
            }
        };
        var nwcTasksColumns = [
            {
                key: 'column1',
                name: 'Name',
                fieldName: 'name',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column2',
                name: 'Description',
                fieldName: 'description',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column3',
                name: 'Workflow name',
                fieldName: 'workflow',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column4',
                name: 'Status',
                fieldName: 'status',
                minWidth: 100,
                maxWidth: 120,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onRender: function (item) {
                    if (item.status) {
                        // uppercase for 1st letter
                        var displayText = item.status;
                        displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
                        return React.createElement("span", null, displayText);
                    }
                    else {
                        return React.createElement("span", null);
                    }
                },
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column5',
                name: 'Date created',
                fieldName: 'created',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'date',
                onRender: function (item) {
                    if (item.created) {
                        return React.createElement("span", null, getFormattedLocalDateTime(item.created));
                    }
                    else {
                        return React.createElement("span", null);
                    }
                },
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column6',
                name: 'Date due',
                fieldName: 'dueDate',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'date',
                onRender: function (item) {
                    if (item.dueDate) {
                        return React.createElement("span", null, getFormattedLocalDateTime(item.dueDate));
                    }
                    else {
                        return React.createElement("span", null);
                    }
                },
                onColumnClick: _this._onTasksColumnClick
            },
            {
                key: 'column7',
                name: 'Task form',
                fieldName: 'formUrl',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onRender: function (item) {
                    if ((item.formUrl)) {
                        return React.createElement("a", { target: '_blank', href: item.formUrl }, "View Task Form");
                    }
                    // if ((item.urls) && (item.urls.formUrl)) {
                    //   return <a target='_blank' href={item.urls.formUrl}>View Task Form</a>;
                    // }
                },
                onColumnClick: _this._onTasksColumnClick
            }
        ];
        var nwcFormsColumns = [
            {
                key: 'column1',
                name: 'Name',
                fieldName: 'name',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onRender: function (item) {
                    // get the displayname from form - or - from the workflow, if the formname is empty
                    var displayText = '';
                    if (item.name && item.name !== '') {
                        displayText = item.name;
                    }
                    else {
                        displayText = item.workflow.name;
                    }
                    if (item.urls) {
                        return React.createElement("a", { target: '_blank', href: item.urls.formUrl }, displayText);
                    }
                    else {
                        return React.createElement("span", null, item.name);
                    }
                },
                onColumnClick: _this._onFormsColumnClick
            },
            {
                key: 'column2',
                name: 'Description',
                fieldName: 'description',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onColumnClick: _this._onFormsColumnClick
            },
            {
                key: 'column3',
                name: 'Last Modified',
                fieldName: 'lastModified',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                data: 'string',
                onRender: function (item) {
                    if (item.lastModified) {
                        return React.createElement("span", null, getFormattedLocalDateTime(item.lastModified));
                    }
                    else {
                        return React.createElement("span", null);
                    }
                },
                onColumnClick: _this._onFormsColumnClick
            }
        ];
        _this.state = {
            nwcTasks: [],
            tasksColumns: nwcTasksColumns,
            tasksLoading: false,
            nwcForms: [],
            formsColumns: nwcFormsColumns,
            formsLoading: false
        };
        return _this;
    }
    NwcTasksForms.prototype.componentDidMount = function () {
        // if NOT needing config settings - ie. assuming webpart properties are filled in
        if (!this.props.needsConfiguration) {
            this.getTasks();
            this.getForms();
        }
        else {
            this.state = __assign({}, this.state, { nwcTasks: _sampleTasks(), nwcForms: _sampleForms() });
        }
    };
    NwcTasksForms.prototype.render = function () {
        return (React.createElement("div", { className: NwcTasksForms_module_scss_1.default.nwcTasksForms },
            React.createElement(office_ui_fabric_react_1.Label, { style: { fontSize: '20px', fontWeight: 'bold' } }, "Open Activities"),
            React.createElement(office_ui_fabric_react_1.Pivot, null,
                this.renderForms(),
                this.renderTasks())));
    };
    return NwcTasksForms;
}(React.Component));
exports.default = NwcTasksForms;
// =====================================================================================================
// auxiliary functions - out of the components
// =====================================================================================================
function getFormattedLocalDateTime(inputDateTime) {
    var utcDateTime = new Date(inputDateTime);
    var localDateTime = new Date(utcDateTime.getTime() - (utcDateTime.getTimezoneOffset() * 60000));
    var day = localDateTime.toLocaleDateString('en-US', { day: 'numeric' });
    var month = localDateTime.toLocaleDateString('en-US', { month: 'short' });
    var year = localDateTime.toLocaleDateString('en-US', { year: 'numeric' });
    var formattedDate = (day + ' ' + month + ' ' + year);
    var hours = localDateTime.getUTCHours().toString();
    if (hours.length === 1) {
        hours = '0' + hours;
    }
    var mins = localDateTime.getUTCMinutes().toString();
    if (mins.length === 1) {
        mins = '0' + mins;
    }
    var morningAfternoon = localDateTime.getUTCHours() >= 12 ? 'PM' : 'AM';
    var formattedTime = (hours + ':' + mins + ' ' + morningAfternoon);
    return formattedDate + ' - ' + formattedTime;
}
function _copyAndSort(items, columnKey, isSortedDescending) {
    var key = columnKey;
    return items.slice(0).sort(function (a, b) { return ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1); });
}
// =====================================================================================================
// sample data (TESTING)
// =====================================================================================================
function _sampleForms() {
    return [
        {
            'id': '09858968-3eae-43a7-8a4f-060958a693a5',
            'workflow': {
                'name': 'Tom form Test 2'
            },
            'name': 'TEST - Claim request',
            'description': 'Claim request for electronics',
            'urls': {
                'formUrl': 'https://madhax.workflowcloud-test.com/forms/09858968-3eae-43a7-8a4f-060958a693a5'
            },
            'favourite': false
        },
        {
            'id': 'e70e8cdb-60e1-470a-9e91-a79982f434cf',
            'workflow': {
                'name': 'auth form -test lito 02'
            },
            'name': 'SAMPLE - auth form -test lito',
            'description': 'another test with clashing name',
            'urls': {
                'formUrl': 'https://madhax.workflowcloud-test.com/forms/e70e8cdb-60e1-470a-9e91-a79982f434cf'
            },
            'favourite': false
        },
        {
            'id': 'e222e319-500b-41c5-8ffd-8801f187c256',
            'workflow': {
                'name': 'Auth form -test lito'
            },
            'name': 'JUNK - Auth form -test lito',
            'urls': {
                'formUrl': 'https://madhax.workflowcloud-test.com/forms/e222e319-500b-41c5-8ffd-8801f187c256'
            },
            'favourite': false
        }
    ];
}
function _sampleTasks() {
    return [
        {
            'id': '09858968-3eae-43a7-8a4f-060958a693a5',
            'name': 'Claim request',
            'description': 'Claim request for electronics',
            'workflow': 'ccccc',
            'status': 'XYZ'
        },
        {
            'id': 'e70e8cdb-60e1-470a-9e91-a79982f434cf',
            'name': 'Again test lito',
            'description': 'Another test with clashing name',
            'workflow': 'ccccc',
            'status': 'ABC'
        },
        {
            'id': 'e222e319-500b-41c5-8ffd-8801f187c256',
            'name': 'Auth test lito',
            'description': 'What about this one',
            'workflow': 'ccccc',
            'status': 'LMNOP'
        },
        {
            'id': 'e222e319-500b-41c5-8ffd-8801f187c256',
            'name': 'Extra form -test lito',
            'description': 'Extra this one',
            'workflow': 'ccccc',
            'status': 'LMNOP'
        },
        {
            'id': 'e222e319-500b-41c5-8ffd-8801f187c256',
            'name': 'Form3 -test lito',
            'description': 'Form3 about this one',
            'workflow': 'ccccc',
            'status': 'QWERT'
        }
    ];
}
//# sourceMappingURL=NwcTasksForms.js.map