import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WavesurferComponent } from 'src/app/layouts/modals/wavesurfer/wavesurfer.component';
import { MatDialog } from '@angular/material';
import { GaleryComponent } from 'src/app/layouts/modals/galery/galery.component';
import { AddBidComponent } from 'src/app/layouts/modals/add-bid/add-bid.component';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { Bid } from 'src/app/shared/models/bid';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  @Input() json: string;
  @Input() index: number;

  btn = 'play';

  totalText = 'Loading Text...';

  minText = this.totalText.substring(0, 100);

  text = this.minText + '...';

  state = false;

  post: Post;
  audioCount = 0;
  imgCount = 0;
  bidsCount = 0;

  buttonShowHideIcon = 'down';
  buttonShowHideColor = 'primary';

  constructor(
    public dialog: MatDialog,
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.initReadMore();
  }

  ngAfterViewInit(): void {
    this.post = JSON.parse(this.json);
    this.audioCount = this.post.recordUrl === '' ? 0 : 1;
    this.imgCount = this.post.imagesUrls.length;
    this.postService.getPostBids(this.post.id).subscribe(
      (bids: Bid[]) => {
        this.bidsCount = bids.length;
    });
  }

  wavesurfer() {
    if (this.audioCount > 0) {
      this.dialog.open(WavesurferComponent, {
        width: '90%',
        panelClass: ['animated', 'bounceIn', 'faster'],
        disableClose: true,
        data: this.data.recordUrl
      });
    }
  }

  galery() {
    if (this.imgCount > 0) {
      this.dialog.open(GaleryComponent, {
        width: '95%',
        panelClass: ['animated', 'faceIn', 'faster'],
        data: this.data.imagesUrls
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
