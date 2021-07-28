import { INintexUrls } from '../Additional/INintexUrls';

export interface INintexTaskResponseAssignment {
    assignee?: string;
    id: string;
    status?: string;
    urls?: INintexUrls;
}