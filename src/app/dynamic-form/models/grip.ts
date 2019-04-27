import { IObjectSet } from './objectset';

export interface IGrip {
  grips_id: number;
  enabled: string;
  dt_created: Date;
  dt_available?: any;
  dt_end?: any;
  stages_id: number;
  stage_type: string;
  stage_name: string;
  applications_id: number;
  containers_id: number;
  identities_id: number;
  object_type: string;
  grip_type: string;
  grip_name: string;
  objectsetList: any[];
  objectSets: IObjectSet[];
}


