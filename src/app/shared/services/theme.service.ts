import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static theme = new BehaviorSubject<boolean>(false);
  static themeX = false;

  static switchTheme() {
    ThemeService.themeX = !ThemeService.themeX;
    ThemeService.theme.next(ThemeService.themeX);
  }

  constructor() { }
}
