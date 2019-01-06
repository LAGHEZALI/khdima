import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() data: Post;

  totalText = 'Loading Text...';

  minText = this.totalText.substring(0, 100);

  text = this.minText + '...';

  state = false;

  buttonShowHideIcon = 'down';
  buttonShowHideColor = 'primary';

  constructor() {
  }

  ngOnInit() {
    this.totalText = this.data.content;
    this.minText = this.totalText.substring(0, 100);
    this.text = this.minText + '...';
    this.state = false;
  }

  readMore() {
    if (!this.state) {
      this.text = this.totalText;
      this.buttonShowHideIcon = 'up';
      this.buttonShowHideColor = 'accent';
    } else {
      this.text = this.minText + '...';
      this.buttonShowHideIcon = 'down';
      this.buttonShowHideColor = 'primary';
    }
    this.state = !this.state;
  }

}
