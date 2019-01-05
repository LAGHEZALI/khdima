import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FireModule } from './modules/fire.module';

const modules = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  FireModule
];

const services = [
];

const declarations = [
];

@NgModule({
  declarations: [declarations],
  providers: [services],
  imports: [modules],
  exports: [modules]
})
export class SharedModule { }
