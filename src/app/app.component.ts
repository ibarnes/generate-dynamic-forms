import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { IStage } from './models/stage';
import { IObjectPropOptSet } from './models/objectpropoptset';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ObjectBase } from './classes/objectbase';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  stages: IStage[];
  ObjectPropOptSet: IObjectPropOptSet;
  pageTitle: string;
  @Input() objects: ObjectBase<any>[];
  @Input() form: FormGroup;

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    pageTitle: "Generate Dynamic Forms in Angular";
    this.loadProfile();
    
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(data => {
      this.stages = data;
      //console.log(this.stages);
      console.log(data);
      this.pageTitle = data ? data[0].stage_name : 'Something Went Wrong!';
      this.objects = this.profileService.getFormObjects(this.stages);
      this.form = this.profileService.toFormGroup(this.objects);
    });

  }

}


