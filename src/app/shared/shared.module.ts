import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FireModule } from './modules/fire.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PretyJsonPipe } from './pipes/prety-json.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { CookieService } from 'ngx-cookie-service';

const modules = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  FireModule,
  ScrollingModule
];

const services = [
  CookieService
];

const declarations = [
  PretyJsonPipe,
  TimeAgoPipe
];

@NgModule({
  declarations: [declarations],
  providers: [services, PretyJsonPipe],
  imports: [modules],
  exports: [modules, declarations]
})
export class SharedModule { }
