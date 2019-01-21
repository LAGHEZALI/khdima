import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-khdima-menu',
  templateUrl: './khdima-menu.component.html',
  styleUrls: ['./khdima-menu.component.scss']
})
export class KhdimaMenuComponent implements OnInit {

  options = [
    {name: 'Recherche / Filtrer', icon: 'search'},
    {name: 'Ajouter un poste', icon: 'plus-circle'},
    {name: 'Classement Metier', icon: 'sort-amount-up'},
    {name: 'Reporter un bug', icon: 'bug'},
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<KhdimaMenuComponent>
  ) { }

  ngOnInit() {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
