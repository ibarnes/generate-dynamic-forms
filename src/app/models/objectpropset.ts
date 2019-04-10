import { IObjectPropOptSet } from './objectpropoptset';

export interface IObjectPropSet {
  obj_prop_sets_id: number;
  enabled: string;
  dt_created: Date;
  dt_available?: any;
  dt_end?: any;
  stage_type: string;
  stage_name: string;
  grip_type: string;
  grip_name: string;
  object_type: string;
  containers_id: number;
  identities_id: number;
  object_layer: string;
  value_datatype: string;
  object_sets_id: number;
  object_prop_type: string;
  property_name: string;
  has_parent: string;
  has_child: string;
  parent_obj_prop_sets_id: number;
  property_value: string;
  objectPropOptSets: IObjectPropOptSet[];
  propFiles?: any;
  propStrings?: any;
  propNumb?: any;
  propDate?: any;
  files?: any;
}
