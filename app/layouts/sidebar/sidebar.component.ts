import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { MatBottomSheet } from '@angular/material';
import { LanguageComponent } from '../bottomSheet/language/language.component';
import { ThemeService } from 'src/app/shared/services/theme.service';

let isOpen: boolean;
SidebarService.isOpen.subscribe(value => isOpen = value);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  fullScreenLogo = 'expand';

  constructor(
    private langSheet: MatBottomSheet,
  ) { }

  close_sidebar() {
    SidebarService.close();
  }

  ngOnInit() {
  }

  showLangOptions() {
    SidebarService.close();
    this.langSheet.open(LanguageComponent);
  }

  toggleFullscreen() {
    SidebarService.close();
    this.fullScreenLogo = this.fullScreenLogo === 'expand' ? 'compress' : 'expand';
    ScreenService.toggleFullscreen();
  }

  toggleTheme() {
    SidebarService.close();
    ThemeService.switchTheme();
  }

  refresh() {
    window.location.reload();
  }

  quit() {
    window.location.href = 'exit';
  }

  get isOpen() {
    return isOpen;
  }
}
