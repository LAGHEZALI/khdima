import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';
import { PostService } from 'src/app/shared/services/post.service';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, AfterViewInit {


  posts: Observable<Post[]> = of(new Array(10));

  mySwiper: Swiper;

  constructor(
    private postService: PostService
  ) {
    //  this.posts = this.postService.getAllPosts();
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
        dynamicBullets: true
      }
    });
  }

}
