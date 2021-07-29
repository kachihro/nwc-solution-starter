import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface INwcTasksFormsWebPartProps {
    tenantName: string;
    clientId: string;
    filterWorkflows: string;
}
export default class NwcTasksFormsWebPart extends BaseClientSideWebPart<INwcTasksFormsWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private _onError;
    private _needsConfiguration;
}
