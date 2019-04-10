import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IStage } from '../models/stage';
import { IGrip } from '../models/grip';
import { IObjectSet } from '../models/objectset';
import { IObjectPropSet } from '../models/objectpropset';
import { IObjectPropOptSet } from '../models/objectpropoptset';
import { ObjectBase } from '../classes/objectbase';
import { DropDownObject } from '../classes/dropdownobject';
import { TextboxObject } from '../classes/textboxobject';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  headers: HttpHeaders;
  _pagefileurl: string = '../../assets/page.json';
  _optionfile: string = './assets/option.json';
  _testfileurl: string = './assets/test.json';
  objectPropSets: IObjectPropSet[];
  objectbase: ObjectBase<string>[];

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  }

  getProfile() {
    return this.http.get<IStage[]>(this._pagefileurl);
  }

  //Transform the objectsets into formgroups
  getFormObjects(stages: IStage[]) {

    let group: any = {};
    let objects: ObjectBase<any>[] = [];
    let stage: IStage = stages.find(element => element.stages_id === 1006);
    let objectSet: IObjectSet[] = stage.grips.find(e => e.grips_id === 1005).objectSets;
    let objectType: string = '';
    let id: string = '';
    let label: string = '';
    let placeholder: string = '';
    let order: string = '';

    stage.grips[0].objectSets.forEach(objectSet => {

      objectType = objectSet.object_type;

      id = objectSet.objectPropSets.find(element => element.property_name === "ID") != null ? objectSet.objectPropSets.find(element => element.property_name === "ID").property_value: '';

      label = objectSet.objectPropSets.find(element => element.property_name === "Label")!= null ?  objectSet.objectPropSets.find(element => element.property_name === "Label").property_value : '';

      placeholder = objectSet.objectPropSets.find(element => element.property_name === "Placeholder") ? 
      objectSet.objectPropSets.find(element => element.property_name === "Placeholder").property_value : '';

      order = objectSet.objectPropSets.find(element => element.property_name === "Order") ? 
      objectSet.objectPropSets.find(element => element.property_name === "Order").property_value : '';

      if (objectType == 'Text') {
        objects.push(new TextboxObject({
          id: id,
          label: label,
          value: placeholder,
          required: true,
          order: order
        }));

      }
      else if (objectType == 'Drop_Down') {
        objects.push(new DropDownObject({
          id: id,
          label: label,
          options: [
            { key: 'solid', value: 'Solid' },
            { key: 'great', value: 'Great' },
            { key: 'good', value: 'Good' },
            { key: 'unproven', value: 'Unproven' }
          ],
          order: order
        }));
      }
      else if (objectType == 'Radio_Button') {
        objects.push(new DropDownObject({
          id: id,
          label: label,
          options: [
            { key: 'solid', value: 'Solid' },
            { key: 'great', value: 'Great' },
            { key: 'good', value: 'Good' },
            { key: 'unproven', value: 'Unproven' }
          ],
          order: order
        }));
      }
      else if (objectType == 'Date') {
        objects.push(new TextboxObject({
          id: id,
          label: label,
          value: placeholder,
          required: true,
          order: order
        }));
      }

    });
    
    return objects;  //.sort((a, b) => a.order - b.order);
  }

  toFormGroup(objects: ObjectBase<any>[]) {
    {
      let group: any = {};

      objects.forEach(object => {
        group[object.id] = object.required ? new FormControl(object.value || '', Validators.required)
          : new FormControl(object.value || '');
      });

      return new FormGroup(group);
    }
  }

  getOption() {
    return this.http.get<IObjectPropOptSet>(this._optionfile);
  }



}
