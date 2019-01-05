import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, AfterViewInit {

  posts: number[] = [];

  mySwiper: Swiper;

  constructor(
  ) {
    for (let index = 0; index < 100; index++) {
      this.posts.push(index);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      effect: 'cube',
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

}
