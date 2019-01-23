import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SearchComponent } from '../../modals/search/search.component';

@Component({
  selector: 'app-khdima-menu',
  templateUrl: './khdima-menu.component.html',
  styleUrls: ['./khdima-menu.component.scss']
})
export class KhdimaMenuComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<KhdimaMenuComponent>,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  addPost() {
    this.router.navigate(['add-post']);
    this.close();
  }

  search() {
    this.close();
    this.dialog.open(SearchComponent, {
      width: '70%',
      panelClass: ['animated', 'bounceIn', 'faster'],
      disableClose: true
    });
  }
}
