import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterSuccessComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

}
