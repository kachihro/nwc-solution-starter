import { IColumn } from 'office-ui-fabric-react';
import { INintexForm } from '../../../models/Display/INintexForm';
import { INintexTask } from '../../../models/Display/INintexTask';

export interface INwcTasksFormsState {
  nwcTasks: INintexTask[];
  tasksColumns: IColumn[];
  tasksLoading: boolean;
  nwcForms: INintexForm[];
  formsColumns: IColumn[];
  formsLoading: boolean;
}