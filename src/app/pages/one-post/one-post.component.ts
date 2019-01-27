import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Post } from 'src/app/shared/models/post';

import { WavesurferComponent } from 'src/app/layouts/modals/wavesurfer/wavesurfer.component';
import { MatDialog } from '@angular/material';
import { GaleryComponent } from 'src/app/layouts/modals/galery/galery.component';
import { AddBidComponent } from 'src/app/layouts/modals/add-bid/add-bid.component';
import { PostService } from 'src/app/shared/services/post.service';
import { Bid } from 'src/app/shared/models/bid';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss']
})
export class OnePostComponent implements OnInit {

  post: Post;

  totalText = 'Loading Text...';

  minText = this.totalText.substring(0, 100);

  text = this.minText + '...';

  state = false;

  buttonShowHideIcon = 'down';
  buttonShowHideColor = 'primary';

  constructor(
    public navCtrl: NgxNavigationWithDataComponent,
    public dialog: MatDialog,
    private postService: PostService
  ) {
    this.post = this.navCtrl.get('post');
  }

  ngOnInit() {
  }

  wavesurfer() {
    if (this.post.recordUrl !== '') {
      this.dialog.open(WavesurferComponent, {
        width: '90%',
        panelClass: ['animated', 'bounceIn', 'faster'],
        disableClose: true,
        data: this.post.recordUrl
      });
    }
  }

  galery() {
    if (this.post.imagesUrls.length > 0) {
      this.dialog.open(GaleryComponent, {
        width: '95%',
        panelClass: ['animated', 'faceIn', 'faster'],
        data: this.post.imagesUrls
      });
    }
  }

  bid() {
    this.dialog.open(AddBidComponent, {
      width: '95%',
      panelClass: ['animated', 'faceIn', 'faster'],
      data: this.post.id
    });
  }

  initReadMore() {
    this.totalText = this.post.content;
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
