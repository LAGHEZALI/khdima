import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

let data: {};
LoadingService.data.subscribe(value => {
  data = value;
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

  get data() {
    return data;
  }

  close() {
    LoadingService.off();
  }

}
