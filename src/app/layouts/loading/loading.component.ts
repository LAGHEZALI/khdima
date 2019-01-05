import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

let isLoading: boolean;
let message: string;
LoadingService.isLoading.subscribe(value => {
  message = LoadingService.message;
  isLoading = value;
});

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get isLoading() {
    return isLoading;
  }

  get message() {
    return message;
  }

  close() {
    LoadingService.off();
  }

}
