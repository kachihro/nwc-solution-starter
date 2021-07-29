import { INintexTaskResponseAssignment } from './INintexTaskResponseAssignment';
export interface INintexTaskResponse {
    id: string;
    name?: string;
    description?: string;
    status?: string;
    createdDate?: string;
    dueDate?: string;
    workflowName?: string;
    workflowId?: string;
    taskAssignments: INintexTaskResponseAssignment[];
}
