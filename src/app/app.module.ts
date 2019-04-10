import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProfileService } from './services/profile.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextfieldComponent } from './fields/textfield';

import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatSortModule, MatCardModule,
  MatStepperModule, MatSlideToggleModule, MatExpansionModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatBadgeModule, MatTabsModule, MatRadioModule
} from '@angular/material';

import {
  MatPaginatorModule, MatTableModule, MatTableDataSource,
  MatFormFieldModule, MatInputModule, MatGridListModule, MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSelectModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    MatRadioModule,
    FlexLayoutModule
  ],
  declarations: [AppComponent, HelloComponent, DynamicFormComponent, TextfieldComponent],
  bootstrap: [AppComponent],
  providers: [ProfileService]
})

export class AppModule {

  constructor(router: Router) {
  }
}
