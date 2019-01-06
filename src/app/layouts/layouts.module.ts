import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { RegisterSuccessComponent } from './modals/register-success/register-success.component';
import { RegisterErrorComponent } from './modals/register-error/register-error.component';
import { LoginErrorComponent } from './modals/login-error/login-error.component';
import { LoginSuccessComponent } from './modals/login-success/login-success.component';
import { WavesurferComponent } from './modals/wavesurfer/wavesurfer.component';

@NgModule({
  declarations: [LoadingComponent, RegisterSuccessComponent, RegisterErrorComponent, LoginErrorComponent, LoginSuccessComponent, WavesurferComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
