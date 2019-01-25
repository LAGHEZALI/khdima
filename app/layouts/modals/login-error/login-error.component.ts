import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslationService } from '../../../shared/services/translation.service';
@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent implements OnInit {

  constructor(private translationService: TranslationService,
    public dialogRef: MatDialogRef<LoginErrorComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
