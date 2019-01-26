import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import Swiper from 'swiper';
import { Upload } from 'src/app/shared/models/upload';
import { UploadsService } from 'src/app/shared/services/uploads.service';

@Component({
  selector: 'app-upload-galery',
  templateUrl: './upload-galery.component.html',
  styleUrls: ['./upload-galery.component.scss']
})
export class UploadGaleryComponent implements OnInit, AfterViewInit {

  swiper: any;
  selectedFiles: FileList;
  currentUpload: Upload;
  filesCount = 0;
  imagePath;

  files: File[] = [];
  imgUrls: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<UploadGaleryComponent>,
    private uploadService: UploadsService
  ) {
    if (uploadService.images.length === 0) {
      this.files = [];
      this.imgUrls = [];
    } else {
      this.files = Object.assign([], uploadService.images);
      this.imgUrls = Object.assign([], uploadService.imagesUrls);
      this.filesCount = uploadService.images.length;
    }
  }

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
    for (const url of this.imgUrls) {
      this.swiper.appendSlide(`<div class="swiper-slide">
                                  <div class="swiper-zoom-container" >
                                    <img class="w3-round w3-border w3-padding w3-card-4 w3-image" src="${url}">
                                  </div>
                              </div>`);
    }
  }

  preview(files) {

    for ( const file of files) {
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        continue;
      }
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const url = String(reader.result);
        this.imgUrls.push(url);
        this.files.push(file);
        this.filesCount = this.files.length;
        this.swiper.appendSlide(`<div class="swiper-slide">
                                    <div class="swiper-zoom-container" >
                                      <img class="w3-round w3-border w3-padding w3-card-4 w3-image" src="${url}">
                                    </div>
                                </div>`);
      };
    }
  }

  next() {
    this.swiper.slideNext();
  }

  prev() {
    this.swiper.slidePrev();
  }

  save() {
    if (this.filesCount > 0) {
      this.uploadService.images = Object.assign([], this.files);
      this.uploadService.imagesUrls = Object.assign([], this.imgUrls);
    }
    this.close();
  }

  erase() {
    this.files = [];
    this.imgUrls = [];
    this.save();
  }

  close(): void {
    this.dialogRef.close();
  }
}
