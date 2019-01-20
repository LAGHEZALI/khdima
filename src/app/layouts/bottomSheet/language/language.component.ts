import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { TranslationService } from '../../../shared/pipes/translation.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  langages = [
    {name: 'Francais', flag: 'fr', raised: true},
    {name: 'Arabe', flag: 'ma', raised: false},
    {name: 'English', flag: 'gb', raised: false}
  ];

  constructor(private translationService: TranslationService,
    private bottomSheetRef: MatBottomSheetRef<LanguageComponent>
  ) { }

  ngOnInit() {
  }

  close() {
    console.log('click');
    this.bottomSheetRef.dismiss();
  }

}