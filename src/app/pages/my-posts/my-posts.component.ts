import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { Bid } from 'src/app/shared/models/bid';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    public navCtrl: NgxNavigationWithDataComponent
  ) {
    this.postService.getMyPosts().subscribe(
      (newposts: Post[]) => {
        for ( const post of newposts) {
          this.postService.getPostBids(post.id).subscribe(
            (bids: Bid[]) => {
              post.bids = bids;
              this.posts.push(post);
          });
        }
    });
  }

  select(post: Post) {
    //  this.router.navigate(['post'],  { queryParams: { page: 1 } });
    this.navCtrl.navigate('post', {post: post});
  }

  ngOnInit() {
  }

}
