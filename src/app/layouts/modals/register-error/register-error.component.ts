import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register-error',
  templateUrl: './register-error.component.html',
  styleUrls: ['./register-error.component.scss']
})
export class RegisterErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterErrorComponent>,
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
