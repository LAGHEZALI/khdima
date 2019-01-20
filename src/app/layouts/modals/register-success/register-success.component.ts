import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TranslationService } from './../../../shared/pipes/translation.service';
@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {

  constructor(private translationService: TranslationService,
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
