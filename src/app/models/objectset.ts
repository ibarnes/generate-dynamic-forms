import { IObjectPropSet } from './objectpropset';

export interface IObjectSet {
  object_sets_id: number;
  grips_id: number;
  enabled: string;
  dt_created: Date;
  dt_available?: any;
  dt_end?: any;
  object_type: string;
  object_layer: string;
  stage_type: string;
  stage_name: string;
  grip_type: string;
  grip_name: string;
  containers_id: number;
  identities_id: number;
  propsetList?: any;
  objectPropSets: IObjectPropSet[];
}
