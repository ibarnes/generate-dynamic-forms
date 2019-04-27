import { IGrip } from './grip';

export interface IStage {
  stages_id: number;
  enabled: string;
  dt_created: Date;
  dt_available: Date;
  dt_end: Date;
  object_type: string;
  object_layer: string;
  cores_id: number;
  stage_type: string;
  stage_name: string;
  application_name: string;
  applications_id: number;
  containers_id: number;
  identities_id: number;
  stage_link: string;
  gripList: any;
  grips: IGrip[];
  formbodySpan?: any;
}
