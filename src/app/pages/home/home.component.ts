import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  on() {
    LoadingService.on('Loading ...');
  }

  off() {
    LoadingService.off();
  }

}
