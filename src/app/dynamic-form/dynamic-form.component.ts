import { Component, Input, OnInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectBase } from '../classes/objectbase';
import { ProfileService } from '../services/profile.service';
import { TextfieldComponent } from '../fields/textfield';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() object: ObjectBase<any>[]; 

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
   // this.form = this.profileService.toFormGroup(this.object);
  }

}