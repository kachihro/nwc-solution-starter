import { INintexTaskResponseAssignment } from './INintexTaskResponseAssignment';

export interface INintexTaskResponse {
    id: string;
    name?: string;
    description?: string;
    status?: string;
    createdDate?: string;
    dueDate?: string;
    // message?: string;
    // outcomes?: string[];
    // subject?: string;
    // initiator?: string;
    // modified?: string;
    taskAssignments: INintexTaskResponseAssignment[];
}
