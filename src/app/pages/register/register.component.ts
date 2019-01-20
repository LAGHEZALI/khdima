import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { RegisterErrorComponent } from 'src/app/layouts/modals/register-error/register-error.component';
import { RegisterSuccessComponent } from 'src/app/layouts/modals/register-success/register-success.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { TranslationService } from './../../shared/pipes/translation.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    displayName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
  }

  submit() {
    LoadingService.on('Inscription en cours');
    this.auth.signup(this.registerForm.value)
    .then(res => {
      this.openSuccessDialog();
    }, err => {
      this.openErrorDialog();
    })
    .finally(() => {
      LoadingService.off();
    });
  }

  openErrorDialog(): void {
    this.dialog.open(RegisterErrorComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(RegisterSuccessComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }
}
