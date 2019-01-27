import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  user() {
    this.auth.getCurrentCollectionUser().then((user) => console.log(user));
  }
}
