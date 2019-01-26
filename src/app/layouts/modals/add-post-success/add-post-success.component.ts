import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-post-success',
  templateUrl: './add-post-success.component.html',
  styleUrls: ['./add-post-success.component.scss']
})
export class AddPostSuccessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPostSuccessComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
