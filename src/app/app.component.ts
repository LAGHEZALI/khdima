import { Component } from '@angular/core';
import { InitService } from './shared/services/init.service';
import { ThemeService } from './shared/services/theme.service';
import { Router } from '@angular/router';

let theme = false;
ThemeService.theme.subscribe(value => theme = value);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showFooter: boolean;

  constructor(
    private init: InitService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/login' || this.router.url === '/register') {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    });
  }

  get theme() {
    return theme;
  }
}
