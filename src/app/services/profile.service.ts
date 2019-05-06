import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
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
  _pagefileurl: string = '../../assets/page.json';
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
    return this.http.get<IStage[]>(this._pagefileurl);
  }

  getVerifySSN(stages: IStage[]) {

    let stage: IStage = stages.find(element => element.stages_id === 1006);
    return JSON.stringify(stage.grips[0].objectSets);
  }

  //Transform the objectsets into formgroups
getFormObjects(stages: IStage[], stage_id: number, grip: number)
{
    let objects: ObjectBase<any>[] = [];
    let stage: IStage = stages.find(element => element.stages_id === stage_id);
    let objectType: string = '';
    let id: string = '';
    let label: string = '';
    let placeholder: string = '';
    let order: string = '';
    let required: boolean = false;    
    let regex: string = '';    
    let maskType: string = '';
    let maxLength: string = '';
    let regexerrmes: string = '';
    let readonlycriteria: string = 'false';
    let middlename: boolean = false;
    let objectpropoptset: IObjectPropOptSet[];
    let dynclass: string = '';    
    let information: string = '';
    let requiredErrorMessage: string = '';
    let defaultValue: string = '';
    let dependsOn: string = 'false';
    let dependsOnValue: string = 'false';
    let cascadedParent: string = '';
    let cascading: boolean = false;
    let cascadedobjectpropset: IObjectPropSet[];


    stage.grips[grip].objectSets.forEach(objectSet => {

      objectType = objectSet.object_type;

      required = objectSet.objectPropSets.find(element => element.property_name === "Required") ?
        objectSet.objectPropSets.find(element => element.property_name === "Required").property_value == 'true' : false;

      regex = objectSet.objectPropSets.find(element => element.property_name === "Regex") ?
        objectSet.objectPropSets.find(element => element.property_name === "Regex").property_value : '';

      maskType = objectSet.objectPropSets.find(element => element.property_name === "MaskType") ?
        objectSet.objectPropSets.find(element => element.property_name === "MaskType").property_value : '';

      maxLength = objectSet.objectPropSets.find(element => element.property_name === "MaxLength") ?
        objectSet.objectPropSets.find(element => element.property_name === "MaxLength").property_value : '500';

      regexerrmes = objectSet.objectPropSets.find(element => element.property_name === "RegexErrorMessage") ?
        objectSet.objectPropSets.find(element => element.property_name === "RegexErrorMessage").property_value : '';

      readonlycriteria = objectSet.objectPropSets.find(element => element.property_name === "ReadOnlyCriteria") ?
        objectSet.objectPropSets.find(element => element.property_name === "ReadOnlyCriteria").property_value : 'false';

      middlename = objectSet.objectPropSets.find(element => element.property_name === "MiddleName") ?
        objectSet.objectPropSets.find(element => element.property_name === "MiddleName").property_value == 'true' : false;

      objectpropoptset = objectSet.objectPropSets.find(element => element.property_name === "Value") ?
        objectSet.objectPropSets.find(element => element.property_name === "Value").objectPropOptSets : null;

      dynclass = objectSet.objectPropSets.find(element => element.property_name === "Class") ?
        objectSet.objectPropSets.find(element => element.property_name === "Class").property_value : '';

      information = objectSet.objectPropSets.find(element => element.property_name === "Information") ?
        objectSet.objectPropSets.find(element => element.property_name === "Information").property_value : '';

      requiredErrorMessage = objectSet.objectPropSets.find(element => element.property_name === "RequiredErrorMessage") ?
        objectSet.objectPropSets.find(element => element.property_name === "RequiredErrorMessage").property_value : '';

         defaultValue = objectSet.objectPropSets.find(element => element.property_name === "Default") ?
        objectSet.objectPropSets.find(element => element.property_name === "Default").property_value : '';

      dependsOn = objectSet.objectPropSets.find(element => element.property_name === "DependsOn") ?
        objectSet.objectPropSets.find(element => element.property_name === "DependsOn").property_value : 'false';

      dependsOnValue = objectSet.objectPropSets.find(element => element.property_name === "DependsOnValue") ?
        objectSet.objectPropSets.find(element => element.property_name === "DependsOnValue").property_value : "No";

      cascading = objectSet.objectPropSets.find(element => element.property_name === "Cascading") ?
        objectSet.objectPropSets.find(element => element.property_name === "Cascading").property_value == 'true' : false;

      if (cascading) {
        cascadedobjectpropset = objectSet.objectPropSets.filter(element => element.property_name === "Value");        
        cascadedobjectpropset.forEach(objectpropset => {          
          objectpropoptset = objectpropoptset.concat(objectpropset.objectPropOptSets).filter(f => f.has_parent === 'Y');          
        });

      if (objectType == 'Text_Box' && middlename) {
        objects.push(new TextboxObject({
          controlType: 'textboxmiddlename',
          id: id,
          label: label,
          value: placeholder,
          required: required,
          order: order,
          maskType: maskType,
          regex: regex,
          regexerrmes: regexerrmes,
          readonlycriteria: readonlycriteria,
          class: dynclass,
          maxLength: maxLength,
          information: information,
          requiredErrorMessage: requiredErrorMessage
        }));

      }
      else if (objectType == 'Drop_Down') {
        objects.push(new DropDownObject({
          id: id,
          label: label,
          optionvalues: objectpropoptset,
          order: order,
          required: required,
          requiredErrorMessage: requiredErrorMessage,
          dependsOn: dependsOn,
          dependsOnValue: dependsOnValue,
          cascading: cascading 
        }));
      }
      else if (objectType == 'Date') {
        objects.push(new DateObject({
          id: id,
          label: label,
          value: placeholder,
          required: required,
          order: order,
          placeholder: placeholder
        }));
      }
      if (objectType == 'Radio_Button') {
       
        objectpropoptset.forEach(objectpropopt => {          
          if (objectpropopt.option_value === defaultValue) {
            objectpropopt.option_default = true;
          }
          else {
            objectpropopt.option_default = false;
          }
         
        });
        objects.push(new RadioButtonObject({
          id: id,
          label: label,
          optionvalues: objectpropoptset,
          order: order,          
          required: required,          
          requiredErrorMessage: requiredErrorMessage,
          information: information,
          dependsOn: dependsOn,
          dependsOnValue: dependsOnValue,
          information: information
        }));
      }
    });

    return objects.sort((a, b) => a.order - b.order);
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

