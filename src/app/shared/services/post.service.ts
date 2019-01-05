import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllPosts(): Observable<any[]> {
    const postsCollection: AngularFirestoreCollection<any> = this.afs.collection('posts');
    return postsCollection.valueChanges();
  }

}
