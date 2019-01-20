import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import * as firebase from 'firebase';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore
  ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAllPosts(): Observable<any[]> {
    const postsCollection: AngularFirestoreCollection<any> = this.afs.collection('posts');
    return postsCollection.valueChanges();
  }

  generatePost(): {} {
    return {
      category: faker.fake('{{name.firstName}}'),
      city: faker.fake('{{address.city}}'),
      content: faker.fake('{{lorem.paragraph}}'),
      createdAt: this.timestamp,
      imagesUrls:  [
        'http://lorempixel.com/800/800/city/1/',
        'http://lorempixel.com/800/400/city/2',
        'http://lorempixel.com/400/700/city/3/'
      ],
      // tslint:disable-next-line:max-line-length
      recordUrl: 'https://firebasestorage.googleapis.com/v0/b/khdima-ceb5e.appspot.com/o/recordings%2Faudio.mp3?alt=media&token=d6f8a77c-706d-441a-8393-29ba2d6f0278',
      title : faker.fake('{{name.title}}'),
      userDisplayName: faker.fake('{{name.firstName}} {{name.lastName}}'),
      userPhotoURL: faker.fake('{{image.people}}'),
      userUid: faker.fake('{{random.uuid}}'),
    };
  }

  addPost(post: {}) {
    this.afs.collection('posts').add(post);
  }

}
