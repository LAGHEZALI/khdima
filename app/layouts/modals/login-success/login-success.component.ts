import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginSuccessComponent>
  ) { }

  ngOnInit(
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }

  dontShow(): void {
    this.dialogRef.close();
  }
}
