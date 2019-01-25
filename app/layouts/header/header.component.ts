import { Component, OnInit } from '@angular/core';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

ScreenService.isMobile.subscribe( value => HeaderComponent.isMobile = value);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  static isMobile: boolean;
  login: boolean;
  route: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.onAuthChange((user: any) => this.login = user);
    router.events.subscribe( () => this.route  = router.url);
  }

  ngOnInit() {
  }

  openSidebar() {
    SidebarService.open();
  }

  closeSidebar() {
    SidebarService.close();
  }

  logout() {
    this.auth.signout();
    this.router.navigate(['/']);
  }

  get isMobile() {
    return HeaderComponent.isMobile;
  }
}
