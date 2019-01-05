import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginErrorComponent } from 'src/app/layouts/modals/login-error/login-error.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { LoginSuccessComponent } from 'src/app/layouts/modals/login-success/login-success.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    LoadingService.on('Connexion en cours');
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

  openSuccessDialog(): void {
    this.dialog.open(LoginSuccessComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

}
