import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-khdima-menu',
  templateUrl: './khdima-menu.component.html',
  styleUrls: ['./khdima-menu.component.scss']
})
export class KhdimaMenuComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<KhdimaMenuComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  addPost() {
    this.router.navigate(['add-post']);
  }

}
