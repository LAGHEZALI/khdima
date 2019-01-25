import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    keyWords: [''],
    category: [''],
    city: [''],
    period: [''],
    withImage: [false],
    withAudio: [false],
  });

  cities: string[] = [
    'Rabat', 'Casablanca', 'Mohammedia', 'Marrakesh', 'Tanger', 'Fes', 'Meknes'
  ].sort();

  categories: string[] = [
    'Menuiserie', 'Plomberie', 'Maçonnerie', 'Cuisine'
  ].sort();

  periods: string[] = [
    'Dernière Heure', 'Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Cette Année'
  ].sort();

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.searchForm.value);
  }

  clear() {
    this.searchForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }
}
