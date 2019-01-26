import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

let isLoading = false;
let message: string;
let uploadPerc: number;

LoadingService.data.subscribe(value => {
  isLoading = value.isLoading;
  message = value.message;
  uploadPerc = value.uploadPerc;
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

  get uploadPerc() {
    return uploadPerc;
  }

  close() {
    LoadingService.off();
  }

}
