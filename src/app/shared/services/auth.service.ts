import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadsService } from './uploads.service';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private uploadService: UploadsService
  ) { }

  signup(user: User, file: File) {

    if (user.withmeail) {
      user.email = `x${user.phoneNumber}@yyyyy.zzz`;
    }
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(fireBaseUser => {
        user.uid = fireBaseUser.user.uid;
        this.uploadService.uploadImage(file, 'profile/' + user.uid )
          .then( (photoUrl) => {
            LoadingService.update('Création de votre compte', 0);
            user.photoURL = photoUrl;
            this.addUser(user).then( (res) => {
              resolve(res);
            });
        });
      }, err => reject(err));
    });
  }

  addUser(user: User): Promise<any> {
    return new Promise<any>(resolve => {
      this.afs.collection('users').add(user.getData()).then(res => {
        resolve(res);
      }, err => console.log(err));
    });
  }

  signinWithEmail(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  signinWithPhone(phoneNumber: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users', ref => ref.where('phoneNumber', '==', phoneNumber))
      .valueChanges().subscribe((users: any[]) => {
        if (users[0] === undefined) {
          reject('User Not Found');
        } else {
          resolve(this.signinWithEmail(users[0].email, password));
        }
      });
    });
  }

  signout() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut()
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  isSignedIn(): boolean {
    return firebase.auth().currentUser ? true : false;
  }

  onAuthChange(x: any): any {
    return firebase.auth().onAuthStateChanged(x);
  }

  currentUser() {
    return firebase.auth().currentUser;
  }
}
