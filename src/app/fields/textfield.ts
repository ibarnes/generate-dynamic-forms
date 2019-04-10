import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'textfield',
  template: `
    <div>
      <mat-form-field hideRequiredMarker appearance="outline" [id]="object.id">
        <mat-label>{{object.label}}</mat-label>
        <input matInput mask="000-00-0000" [required]="object.required" [formControlName]="object.id" [(ngModel)]="object.id" />
        <button mat-button matSuffix mat-icon-button aria-label="Clear" (click)="clearField(object.id)">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </div>
  `
})
export class TextfieldComponent implements OnInit {
  @Input() object:any;
  @Input() form:any;
  
  get isValid() { return this.form.controls[this.object.name].valid; }
  get isDirty() { return this.form.controls[this.object.name].dirty; }

  constructor() { }

  ngOnInit() {
  }

}