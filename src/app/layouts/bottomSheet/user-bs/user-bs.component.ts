import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bs',
  templateUrl: './user-bs.component.html',
  styleUrls: ['./user-bs.component.scss']
})
export class UserBsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserBsComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  myPosts() {
    this.router.navigate(['my-posts']);
    this.close();
  }

}
