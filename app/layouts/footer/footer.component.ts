import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { KhdimaMenuComponent } from '../bottomSheet/khdima-menu/khdima-menu.component';
import { UserBsComponent } from '../bottomSheet/user-bs/user-bs.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private sheet: MatBottomSheet,
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.sheet.open(KhdimaMenuComponent);
  }

  openUser() {
    this.sheet.open(UserBsComponent);
  }

}
