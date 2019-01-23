import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  /*
    Français: 'fr'
    Arabic: 'ar'
    English: 'en'
  */

  static switchLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

  static getLang(): string {
    return localStorage.getItem('lang');
  }

  constructor() {
    this.initLang();
  }

  initLang() {
    if (!LanguageService.getLang()) {
      LanguageService.switchLang('fr');
    }
  }
}
