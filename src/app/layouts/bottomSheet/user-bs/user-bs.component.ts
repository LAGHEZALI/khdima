import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-user-bs',
  templateUrl: './user-bs.component.html',
  styleUrls: ['./user-bs.component.scss']
})
export class UserBsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserBsComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
