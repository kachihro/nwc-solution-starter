export interface INwcTasksFormsProps {
    tenantName: string;
    clientId: string;
    filterWorkflows: string;
    needsConfiguration: boolean;
    currentUserEmail: string;
    errorHandler: (errorMessage: string) => void;
}
