import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class FireModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
