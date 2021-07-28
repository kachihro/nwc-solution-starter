import { INintexUrls } from '../Additional/INintexUrls';
import { INintexWorkflow } from '../Additional/INintexWorkflow';

export interface INintexFormReponse {
    id: string;
    name?: string;
    description?: string;
    lastModified?: string;
    urls?: INintexUrls;
    favourite?: boolean;
    workflow?: INintexWorkflow;
}
