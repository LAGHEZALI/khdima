import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { Upload } from 'src/app/shared/models/upload';
import { Post } from 'src/app/shared/models/post';
import { UploadsService } from '../../shared/services/uploads.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
post : Post 
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

  selectedFiles: FileList;
  currentUpload: Upload;

  loadingValue = 0;
   bufferValue = 75;

  filesCount = 0;
  progress: {percentage: number} = {percentage: 0}
  constructor(
    private fb: FormBuilder,
    private upSvc: UploadsService
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

  submit() {
       this.post = new Post(this.form.controls.title.value,this.form.controls.category.value,this.form.controls.description.value,this.form.controls.city.value)
       this.post.imagesUrls= new Array()
       this.upload()
      }

  private _filter(value: string, options: string[]  ): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.filesCount = this.selectedFiles.length;
    console.log(this.selectedFiles);
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    //this.upSvc.pushUpload(this.currentUpload);
  }

  uploadMulti() {
    /*
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload); }
    );
    */
}

uploadSimulation() {
  this.loadingValue = 0;
  this.delay(35);
}

async delay(ms: number) {
  await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
    this.loadingValue++;
    if ( this.loadingValue !== 100) {
      this.delay(ms);
    }
  });
}

record() {
  console.log('Recording...');

  Wavesurfer.record();

  Fullscreen.toggleFullscreen();

}
upload() {
  let i :number
  let file ;
  for(i=0;i< this.selectedFiles.length;i++)
  {   
      file = this.selectedFiles[i];
      this.currentUpload = new Upload(file);
      this.upSvc.pushFileToStorage(this.currentUpload, this.progress,this.post )
  }
  //this.uploadService.saveFilesData();
  //this.uploadService.pushFilesToStorage(this.selectedFiles, this.progress )
}

}
