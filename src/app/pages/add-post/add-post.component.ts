import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';

import { MatDialog } from '@angular/material';
import { RecordComponent } from 'src/app/layouts/modals/record/record.component';
import { UploadGaleryComponent } from 'src/app/layouts/modals/upload-galery/upload-galery.component';
import { UploadsService } from 'src/app/shared/services/uploads.service';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/models/post';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AddPostSuccessComponent } from 'src/app/layouts/modals/add-post-success/add-post-success.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, AfterViewInit {

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    city: ['', Validators.required]
  });

  cityOptions: string[] = ['Rabat', 'Casablanca', 'Tanger', 'Marrakesh'].sort();
  filteredCityOptions: Observable<string[]>;

  workerTypeOptions: string[] = ['Plomberie', 'Maçonnerie', 'Menuiserie'].sort();
  filteredWorkerTypeOptions: Observable<string[]>;

  filesCount = 0;

  audioCount = 0;
  imageCount = 0;
  audioUrl = '';

  constructor (
    private fb: FormBuilder,
    public dialog: MatDialog,
    private uploadService: UploadsService,
    private postService: PostService
    ) {
  }

  ngOnInit() {
    this.filteredCityOptions = this.form.controls.city.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.cityOptions))
    );

    this.filteredWorkerTypeOptions = this.form.controls.category.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.workerTypeOptions))
    );

  }

  ngAfterViewInit(): void {
  }

  submit() {
    const post = new Post(
      'uid',
      'userUID',
      this.form.controls.title.value,
      this.form.controls.category.value,
      this.form.controls.description.value,
      'userPhotoURL',
      'user DisplayName',
      null,
      this.form.controls.city.value,
      [],
      ''
    );

    LoadingService.on();
    LoadingService.update('Création de votre Poste...', 0);

    this.postService.addPost(post)
    .then(res => {
      this.dialog.open(AddPostSuccessComponent, {
        width: '85%',
        panelClass: ['animated', 'bounceIn', 'faster']
      });
    }, err => {
      //  error dialog
    })
    .finally(() => {
      LoadingService.off();
    });
  }

  private _filter(value: string, options: string[]  ): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  images() {
    this.dialog.open(UploadGaleryComponent, {
      width: '80%',
      panelClass: ['animated', 'bounceIn', 'faster'],
      disableClose: true,
    }).afterClosed().subscribe( () => {
      this.imageCount = this.uploadService.images.length;
    });
  }

  record() {
    this.dialog.open(RecordComponent, {
      width: '80%',
      panelClass: ['animated', 'bounceIn', 'faster'],
      disableClose: true,
    }).afterClosed().subscribe( () => {
      if (sessionStorage.getItem('audioUrl')) {
        this.audioCount = 1;
        this.audioUrl = sessionStorage.getItem('audioUrl');
      } else {
        this.audioCount = 0;
        this.audioUrl = '';
      }
    });
  }

}
