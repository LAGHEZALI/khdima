import { Component, OnInit, AfterViewInit } from '@angular/core';

import { PostService } from 'src/app/shared/services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, AfterViewInit {

  postsObservable: Observable<any[]>;

  constructor(
    private postService: PostService
  ) {
    this.postsObservable = this.postService.getAllPosts();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
