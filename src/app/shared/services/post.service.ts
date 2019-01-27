import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import * as firebase from 'firebase';
import * as faker from 'faker';
import { UploadsService } from './uploads.service';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore,
    private uploadService: UploadsService,
    private auth: AuthService
  ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAllPosts(): Observable<any[]> {
    const postsCollection: AngularFirestoreCollection<any> = this.afs.collection('posts');
    return postsCollection.valueChanges();
  }

  getMyPosts(): Observable<Post[]> {
    const postsCollection: AngularFirestoreCollection<any> =
      this.afs.collection('posts', ref => ref.where('userUid', '==', this.auth.currentUser().uid));
    return postsCollection.valueChanges();
  }

  getPostBids(postId: string): Observable<any[]> {
    const bidsCollection: AngularFirestoreCollection<any>
      = this.afs.collection('posts').doc(postId).collection('bids');
    return bidsCollection.valueChanges();
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

  addPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.auth.getCurrentCollectionUser()
      .then( (user: User) => {
        post.userUid = user.uid;
        post.userPhotoURL = user.photoURL;
        post.dateCreated = this.timestamp;
        post.userDisplayName = user.firstName + ' ' + user.lastName;
        this.afs.collection('posts').add(post.getData())
          .then((value) => {
            if (this.uploadService.images.length > 0) {
              let l  = this.uploadService.images.length;
              this.uploadService.uploadImages(this.uploadService.images, 'posts/' + value.id, []);
              this.uploadService.finish.subscribe((urls: string[]) => {
                if (urls.length === l && l !== -1) {
                  l = -1;
                  this.uploadService.uploadRecord(this.uploadService.recordUrl, value.id, 'records/' + value.id)
                  .then( (audioUrl) => {
                    LoadingService.update('Création de votre Poste...', 0);
                    this.addImagUrls(urls, audioUrl, value.id)
                    .then( (postWithImg) => {
                      resolve(postWithImg);
                    });
                  });
                }
              });
            } else {
              this.uploadService.uploadRecord(this.uploadService.recordUrl, value.id, 'records/' + value.id)
                .then( (audioUrl) => {
                  LoadingService.update('Création de votre Poste...', 0);
                  this.addImagUrls([], audioUrl, value.id)
                  .then( (postWithImg) => {
                    resolve(postWithImg);
                  });
                });
            }
          });
      });
    });
  }

  addImagUrls(urls: string[], audioUrl: string, id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('posts').doc(id).update({
        'imagesUrls': urls,
        'recordUrl': audioUrl,
        'id': id,
      })
      .then( (post) => {
        resolve(post);
      });
    });
  }

}
