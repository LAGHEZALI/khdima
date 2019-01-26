import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginErrorComponent } from 'src/app/layouts/modals/login-error/login-error.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { LoginSuccessComponent } from 'src/app/layouts/modals/login-success/login-success.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    phoneNumber: ['',  Validators.compose([ Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
    password: ['', Validators.required],
    remember: [true]
  });

  authType = 'email';
  passwordHide = 'password';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loadSavedLogs();
    this.onChange('email');

  }

  ngOnInit() {
  }

  submit() {
    this.rememberMe();
    LoadingService.on();
    LoadingService.update('Connexion en cours', 0);
    if (this.authType === 'email') {
      this.submitWithEmail();
    } else {
      this.submitWithPhone();
    }
  }

  submitWithPhone() {
    this.auth.signinWithPhone(this.loginForm.controls.phoneNumber.value, this.loginForm.controls.password.value)
    .then(res => {
      this.router.navigate(['/wall']);
      this.openSuccessDialog();
    }, err => {
      this.openErrorDialog();
    })
    .finally( () => {
      LoadingService.off();
    });
  }

  submitWithEmail() {
    this.auth.signinWithEmail(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    .then(res => {
      this.router.navigate(['/wall']);
      this.openSuccessDialog();
    }, err => {
      this.openErrorDialog();
    })
    .finally( () => {
      LoadingService.off();
    });
  }

  openErrorDialog(): void {
    this.dialog.open(LoginErrorComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

  onChange(val: string) {
    this.authType = val;
  }

  showHidePassword() {
    if (this.passwordHide === 'password') {
      this.passwordHide = 'text';
    } else {
      this.passwordHide = 'password';
    }
  }

  rememberMe() {

    if (this.loginForm.value.remember) {
      this.cookieService.set( 'savedLogs', JSON.stringify({
        phoneNumber: this.loginForm.value.phoneNumber,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }));
    } else {
      this.cookieService.delete('savedLogs');
    }
  }

  loadSavedLogs() {
    if (this.cookieService.check('savedLogs')) {
      const logs = JSON.parse(this.cookieService.get('savedLogs'));
      this.loginForm.controls['phoneNumber'].setValue(logs.phoneNumber);
      this.loginForm.controls['email'].setValue(logs.email);
      this.loginForm.controls['password'].setValue(logs.password);
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(LoginSuccessComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

}
