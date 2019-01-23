import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslationService } from '../../../shared/services/translation.service';
@Component({
  selector: 'app-register-error',
  templateUrl: './register-error.component.html',
  styleUrls: ['./register-error.component.scss']
})
export class RegisterErrorComponent implements OnInit {

  constructor(private translationService: TranslationService,
    public dialogRef: MatDialogRef<RegisterErrorComponent>,
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
