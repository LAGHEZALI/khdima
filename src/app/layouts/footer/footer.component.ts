import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { KhdimaMenuComponent } from '../bottomSheet/khdima-menu/khdima-menu.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private langSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.langSheet.open(KhdimaMenuComponent);
  }

}
