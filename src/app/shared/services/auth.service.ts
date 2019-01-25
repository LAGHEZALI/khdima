import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  signup(value: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        value.uid = res.user.uid;
        this.addUser(value);
        resolve(res);
      }, err => reject(err));
    });
  }

  addUser(value: User) {
    // JSON add uid 
    this.afs.collection('users').add(value).then(res => {
      console.log(res);
    }, err => console.log(err));
  }

  signin(value: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
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
