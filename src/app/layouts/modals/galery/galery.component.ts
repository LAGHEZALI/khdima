import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swiper from 'swiper';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit, AfterViewInit {

  swiper: any;

  constructor(
    public dialogRef: MatDialogRef<GaleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      zoom: true,
      autoHeight: true,
      loop: true,
      spaceBetween: 30,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  next() {
    this.swiper.slideNext();
  }

  prev() {
    this.swiper.slidePrev();
  }

}
