import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { TranslationService } from '../../../shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  langages = [
    {name: 'Francais', flag: 'fr', raised: false, click: 'fr'},
    {name: 'العربية', flag: 'ma', raised: false, click: 'ar'},
    {name: 'English', flag: 'gb', raised: false, click: 'en'}
  ];

  constructor(private translationService: TranslationService,
    private bottomSheetRef: MatBottomSheetRef<LanguageComponent>
  ) { }

  ngOnInit() {
    this.setRaised();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  switch(lang: string) {
    LanguageService.switchLang(lang);
    this.close();
  }

  setRaised() {
    switch (LanguageService.getLang()) {
      case 'fr':
        this.langages[0].raised = true;
        break;
      case 'ar':
        this.langages[1].raised = true;
        break;
      case 'en':
        this.langages[2].raised = true;
        break;
    }
  }

}
