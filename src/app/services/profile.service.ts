import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IStage } from '../dynamic/models/stage';
import { IObjectPropSet } from '../dynamic/models/objectpropset';
import { IObjectPropOptSet } from '../dynamic/models/objectpropoptset';
import { ObjectBase } from '../dynamic/models/objectbase';
import { DropDownObject } from '../dynamic/models/dropdownobject';
import { TextboxObject } from '../dynamic/models/textboxobject';
import { RadioButtonObject } from '../dynamic/models/radiobuttonobject';
import { DateObject } from '../dynamic/models/dateobject';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  headers: HttpHeaders;
  _pagefileurl: string = 'src/app/assets/page.json';
  _optionfile: string = './assets/option.json';
  _testfileurl: string = './assets/test.json';
  objectPropSets: IObjectPropSet[];
  objectbase: ObjectBase<string>[];
  rooturl = environment.rooturl;


  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  }

  getProfile() {
    console.log(this.rooturl + 'getprofileobjects');
    return this.http.get<IStage[]>(this.rooturl + 'getprofileobjects');

  }

  getVerifySSN(stages: IStage[]) {

    let stage: IStage = stages.find(element => element.stages_id === 1006);
    return JSON.stringify(stage.grips[0].objectSets);
  }

  //Transform the objectsets into formgroups
  getFormObjects(stages: IStage[], stage_id: number) {

    let objects: ObjectBase<any>[] = [];
    let stage: IStage = stages.find(element => element.stages_id === stage_id);
    let objectType: string = '';
    let id: string = '';
    let label: string = '';
    let placeholder: string = '';
    let order: string = '';

    stage.grips[0].objectSets.forEach(objectSet => {

      objectType = objectSet.object_type;

      id = objectSet.objectPropSets.find(element => element.property_name === "ID") != null ? objectSet.objectPropSets.find(element => element.property_name === "ID").property_value : '';

      label = objectSet.objectPropSets.find(element => element.property_name === "Label") != null ? objectSet.objectPropSets.find(element => element.property_name === "Label").property_value : '';

      placeholder = objectSet.objectPropSets.find(element => element.property_name === "Placeholder") ?
        objectSet.objectPropSets.find(element => element.property_name === "Placeholder").property_value : '';

      order = objectSet.objectPropSets.find(element => element.property_name === "Order") ?
        objectSet.objectPropSets.find(element => element.property_name === "Order").property_value : '';

      if (objectType == 'Text_Box') {
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
        objects.push(new RadioButtonObject({
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
        objects.push(new DateObject({
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

