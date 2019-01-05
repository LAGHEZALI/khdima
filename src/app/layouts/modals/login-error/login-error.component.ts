import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginErrorComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
