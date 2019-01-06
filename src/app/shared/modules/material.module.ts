import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatSlideToggleModule
} from '@angular/material';

const modules = [
  CommonModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatSnackBarModule,
  MatDialogModule,
  MatBadgeModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class MaterialModule { }
