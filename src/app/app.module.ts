// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeStore } from './employee/state/employee.store';
import { EmployeeQuery } from './employee/state/employee.query';
import { EmployeeService } from './employee/state/employee.service';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeSearchComponent,
    EmployeeDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AkitaNgDevtools.forRoot(), // Optional for development
    ButtonsModule, // Import Kendo Buttons module
    DropDownsModule, // Import Kendo Dropdowns module
    ReactiveFormsModule,
  ],
  providers: [EmployeeStore, EmployeeQuery, EmployeeService],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
