export interface INwcTasksFormsProps {
  tenantName: string;
  clientId: string;
  filterWorkflows: string;
  needsConfiguration: boolean;
  errorHandler: (errorMessage: string) => void;
}