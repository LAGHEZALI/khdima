import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';

import { MatDialog } from '@angular/material';
import { RecordComponent } from 'src/app/layouts/modals/record/record.component';

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
  audioUrl = '';

  constructor (
    private fb: FormBuilder,
    public dialog: MatDialog
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
  }

  private _filter(value: string, options: string[]  ): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
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
