import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NwcTasksFormsWebPartStrings';
import NwcTasksForms from './components/NwcTasksForms';
import { INwcTasksFormsProps } from './components/INwcTasksFormsProps';

export interface INwcTasksFormsWebPartProps {
  tenantName: string;
  clientId: string;
  filterWorkflows: string;
}

export default class NwcTasksFormsWebPart extends BaseClientSideWebPart<INwcTasksFormsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INwcTasksFormsProps> = React.createElement(
      NwcTasksForms,
      {
        needsConfiguration: this._needsConfiguration(),
        tenantName: this.properties.tenantName,
        clientId: this.properties.clientId,
        filterWorkflows: this.properties.filterWorkflows,
        currentUserEmail: this.context.pageContext.user.email,
        errorHandler: this._onError
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('tenantName', {
                  label: strings.TenantNameFieldLabel
                }),
                PropertyPaneTextField('clientId', {
                  label: strings.ClientIdFieldLabel
                })
              ]
            },
            {
              groupName: strings.FilterGroupName,
              groupFields: [
                PropertyPaneTextField('filterWorkflows', {
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
  }

  private _onError = (errorMessage: string): void => {
    // render the message for the error that occurred in the web part
    this.context.statusRenderer.renderError(this.domElement, errorMessage);
  }

  private _needsConfiguration(): boolean {
    return !this.properties.tenantName || this.properties.tenantName.length === 0
      || !this.properties.clientId || this.properties.tenantName.length === 0;
  }

}