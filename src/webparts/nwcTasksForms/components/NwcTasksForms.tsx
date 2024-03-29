import * as React from 'react';
import styles from './NwcTasksForms.module.scss';

import { INwcTasksFormsProps } from './INwcTasksFormsProps';
import { INwcTasksFormsState } from './INwcTasksFormsState';

import {
  DetailsList,
  IColumn,
  Label,
  Pivot,
  PivotItem,
  SelectionMode,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';

import createAuth0Client, { Auth0Client, IdToken } from '@auth0/auth0-spa-js';
import { AppSettings } from '../../../AppSettings';

import { INintexFormReponse } from '../../../models/Response/INintexFormReponse';
import { INintexTaskResponse } from '../../../models/Response/INintexTaskResponse';

import { INintexForm } from '../../../models/Display/INintexForm';
import { INintexTask } from '../../../models/Display/INintexTask';

export default class NwcTasksForms extends React.Component<INwcTasksFormsProps, INwcTasksFormsState> {

  protected auth0: Auth0Client = undefined;

  public constructor(props: INwcTasksFormsProps) {
    super(props);

    const nwcTasksColumns: IColumn[] = [
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
        onColumnClick: this._onTasksColumnClick
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
        onColumnClick: this._onTasksColumnClick
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
        onColumnClick: this._onTasksColumnClick
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
        onRender: (item) => {
          if (item.status) {
            // uppercase for 1st letter
            let displayText: string = item.status;
            displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
            return <span>{displayText}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
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
        onRender: (item) => {
          if (item.created) {
            return <span>{getFormattedLocalDateTime(item.created)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
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
        onRender: (item) => {
          if (item.dueDate) {
            return <span>{getFormattedLocalDateTime(item.dueDate)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
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
        onRender: (item) => {
          if ((item.formUrl)) {
            return <a target='_blank' href={item.formUrl}>View Task Form</a>;
          }
          // if ((item.urls) && (item.urls.formUrl)) {
          //   return <a target='_blank' href={item.urls.formUrl}>View Task Form</a>;
          // }
        },
        onColumnClick: this._onTasksColumnClick
      }
    ];

    const nwcFormsColumns: IColumn[] = [
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
        onRender: (item) => {
          // get the displayname from form - or - from the workflow, if the formname is empty
          let displayText: string = '';

          if (item.name && item.name !== '') {
            displayText = item.name;
          } else {
            displayText = item.workflow.name;
          }

          if (item.urls) {
            return <a target='_blank' href={item.urls.formUrl}>{displayText}</a>;
          } else {
            return <span>{item.name}</span>;
          }
        },
        onColumnClick: this._onFormsColumnClick
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
        onColumnClick: this._onFormsColumnClick
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
        onRender: (item) => {
          if (item.lastModified) {
            return <span>{getFormattedLocalDateTime(item.lastModified)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onFormsColumnClick
      }
    ];

    this.state = {
      nwcTasks: [],
      tasksColumns: nwcTasksColumns,
      tasksLoading: false,
      nwcForms: [],
      formsColumns: nwcFormsColumns,
      formsLoading: false
    };
  }

  public componentDidMount(): void {

    // if NOT needing config settings - ie. assuming webpart properties are filled in
    if (!this.props.needsConfiguration) {
      this.getTasks();
      this.getForms();
    } else {
      this.state = {
        ...this.state,
        nwcTasks: _sampleTasks(),
        nwcForms: _sampleForms()
      };
    }
  }

  public render(): React.ReactElement<INwcTasksFormsProps> {
    return (
      <div className={styles.nwcTasksForms}>
        <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Open Activities</Label>
        <Pivot>
          {this.renderForms()}
          {this.renderTasks()}
        </Pivot>
      </div>
    );
  }

  // =====================================================================================================
  // API functionality - get Tasks and Forms
  // =====================================================================================================

  // need to determine geo-region / url
  private getGeoPrefixUrl = (idToken: IdToken) => {
    // check the token from auth0
    const apiUrl: string = idToken['http://ntx.identity/api-uri'];
    return apiUrl;
  }

  // determine the list of tasks, dependent on a workflow filter - if any ?
  private filterTasks = (tasks: INintexTaskResponse[]): INintexTask[] => {

    // map to display mode for NintexTasks
    const returnTasks: INintexTask[] = [];

    let workflowFilters: string[] = [];
    if (this.props.filterWorkflows !== '') {
      workflowFilters = this.props.filterWorkflows.split(/\r?\n/);
    }
    debugger;
    tasks.map(t => {
      // check to see if there's a filter for workflows - if not, then just return
      t.taskAssignments.forEach(ta => {
        let correctUser: boolean = false;
        let includeFromFilter: boolean = false;

        correctUser = (ta.assignee === this.props.currentUserEmail);

        if (workflowFilters.length === 0) {
          includeFromFilter = true;
        } else {
          workflowFilters.forEach(filter => {
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

  }

  // determine the list of forms, dependent on a workflow filter - if any
  // [[ QUESTION: filter for workflow ?? ]]
  private filterForms = (forms: INintexFormReponse[]): INintexForm[] => {

    // map to display mode for NintexForms
    const returnForms: INintexForm[] = forms.map(f => {
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

  }

  // setup the auth connection object
  private configureClient = async () => {

    this.auth0 = await createAuth0Client({
      domain: AppSettings.domain,               // from config appSettings
      client_id: this.props.clientId,           // from webpart property
      audience: AppSettings.audience,           // from config appSettings
      redirect_uri: window.location.origin,     // current page
      cacheLocation: 'localstorage',
      scope: 'tenant_name_' + this.props.tenantName     // from webpart property
    });

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();
    if (!isAuthenticated) {
      await this.auth0.loginWithPopup();
    }
  }

  // call API to load list of tasks
  private getTasks = async () => {

    await this.configureClient();

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();

    if (isAuthenticated) {

      // set state to LOADING for TASKS
      this.state = {
        ...this.state,
        tasksLoading: true
      };
      this.forceUpdate();

      const token: string = await this.auth0.getTokenSilently();
      const idToken: IdToken = await this.auth0.getIdTokenClaims();

      // https://developer.nintex.com/reference#get-tasks
      let tasksUrl: string = this.getGeoPrefixUrl(idToken) + '/workflows/v2/tasks';
      tasksUrl += '?status=active';

      fetch(tasksUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(json => {
          if (json.tasks) {
            this.state = {
              ...this.state,
              nwcTasks: this.filterTasks(json.tasks),
              tasksLoading: false
            };
            this.forceUpdate();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  // call API to load list of forms
  private getForms = async () => {

    await this.configureClient();

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();

    if (isAuthenticated) {

      // set state to LOADING for FORMS
      this.state = {
        ...this.state,
        formsLoading: true
      };
      this.forceUpdate();

      const token: string = await this.auth0.getTokenSilently();
      const idToken: IdToken = await this.auth0.getIdTokenClaims();

      const tasksUrl: string = this.getGeoPrefixUrl(idToken) + '/workflows/v1/forms';

      fetch(tasksUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(json => {
          if (json.forms) {
            this.state = {
              ...this.state,
              nwcForms: this.filterForms(json.forms),
              formsLoading: false
            };
            this.forceUpdate();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  // =====================================================================================================
  // UI functionality - render links & outcomes
  // =====================================================================================================

  private _onTasksColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { tasksColumns } = this.state;
    let { nwcTasks } = this.state;
    let isSortedDescending: boolean = column.isSortedDescending;

    // If we’ve sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    nwcTasks = _copyAndSort(nwcTasks, column.fieldName!, isSortedDescending);

    this.state = {
      ...this.state,
      nwcTasks: nwcTasks,
      tasksColumns: tasksColumns.map(col => {
        col.isSorted = col.key === column.key;
        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }
        return col;
      })
    };
  }

  private _onFormsColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { formsColumns } = this.state;
    let { nwcForms } = this.state;
    let isSortedDescending: boolean = column.isSortedDescending;

    // If we’ve sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    nwcForms = _copyAndSort(nwcForms, column.fieldName!, isSortedDescending);

    this.state = {
      ...this.state,
      nwcForms: nwcForms,
      formsColumns: formsColumns.map(col => {
        col.isSorted = col.key === column.key;
        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }
        return col;
      })
    };
  }

  private renderForms = () => {
    if (this.state.nwcForms.length > 0) {
      return <PivotItem linkText='Form' itemCount={this.state.nwcForms.length}  >
        {this.state.formsLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <DetailsList
            items={this.state.nwcForms}
            selectionMode={SelectionMode.none}
            columns={this.state.formsColumns}
            isHeaderVisible={true} />
        }
      </PivotItem>;
    } else {
      // empty
      return <PivotItem linkText='Form' >
        {this.state.formsLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <Label style={{ marginLeft: '10px', marginTop: '12px' }}>No Forms Found</Label>
        }
      </PivotItem>;
    }
  }

  private renderTasks = () => {
    if (this.state.nwcTasks.length > 0) {
      return <PivotItem linkText='Task' itemCount={this.state.nwcTasks.length}  >
        {this.state.tasksLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <DetailsList
            items={this.state.nwcTasks}
            selectionMode={SelectionMode.none}
            columns={this.state.tasksColumns}
            isHeaderVisible={true}
          />
        }
      </PivotItem>;
    } else {
      // empty
      return <PivotItem linkText='Task'  >
        {this.state.tasksLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <Label style={{ marginLeft: '10px', marginTop: '12px' }}>No Tasks Found</Label>
        }
      </PivotItem>;
    }
  }

}

// =====================================================================================================
// auxiliary functions - out of the components
// =====================================================================================================

function getFormattedLocalDateTime(inputDateTime: string): string {

  const utcDateTime: Date = new Date(inputDateTime);
  const localDateTime: Date = new Date(utcDateTime.getTime() - (utcDateTime.getTimezoneOffset() * 60000));

  const day: string = localDateTime.toLocaleDateString('en-US', { day: 'numeric' });
  const month: string = localDateTime.toLocaleDateString('en-US', { month: 'short' });
  const year: string = localDateTime.toLocaleDateString('en-US', { year: 'numeric' });
  const formattedDate: string = (day + ' ' + month + ' ' + year);

  let hours: string = localDateTime.getUTCHours().toString();
  if (hours.length === 1) {
    hours = '0' + hours;
  }

  let mins: string = localDateTime.getUTCMinutes().toString();
  if (mins.length === 1) {
    mins = '0' + mins;
  }
  const morningAfternoon: string = localDateTime.getUTCHours() >= 12 ? 'PM' : 'AM';
  const formattedTime: string = (hours + ':' + mins + ' ' + morningAfternoon);

  return formattedDate + ' - ' + formattedTime;

}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key: any = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

// =====================================================================================================
// sample data (TESTING)
// =====================================================================================================

function _sampleForms(): INintexForm[] {
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

function _sampleTasks(): INintexTask[] {
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