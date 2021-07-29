import * as React from 'react';
import { INwcTasksFormsProps } from './INwcTasksFormsProps';
import { INwcTasksFormsState } from './INwcTasksFormsState';
import { Auth0Client } from '@auth0/auth0-spa-js';
export default class NwcTasksForms extends React.Component<INwcTasksFormsProps, INwcTasksFormsState> {
    protected auth0: Auth0Client;
    constructor(props: INwcTasksFormsProps);
    componentDidMount(): void;
    render(): React.ReactElement<INwcTasksFormsProps>;
    private getGeoPrefixUrl;
    private filterTasks;
    private filterForms;
    private configureClient;
    private getTasks;
    private getForms;
    private _onTasksColumnClick;
    private _onFormsColumnClick;
    private renderForms;
    private renderTasks;
}
