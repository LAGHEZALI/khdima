import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginErrorComponent } from 'src/app/layouts/modals/login-error/login-error.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { LoginSuccessComponent } from 'src/app/layouts/modals/login-success/login-success.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslationService } from '../../shared/services/translation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
    remember: [true]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private cookieService: CookieService, private translationService: TranslationService
  ) {
    this.loadSavedLogs();
  }

  ngOnInit() {
  }

  submit() {
    this.rememberMe();
    LoadingService.on();
    LoadingService.update('Connexion en cours', 0);
    this.auth.signin(this.loginForm.value)
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

  rememberMe() {

    if (this.loginForm.value.remember) {
      this.cookieService.set( 'savedLogs', JSON.stringify({
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
