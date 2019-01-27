import { Injectable } from '@angular/core';
import { Bid } from '../models/bid';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  addBid(bid: Bid): Promise<Bid> {
    return new Promise<any>((resolve, reject) => {
      this.auth.getCurrentCollectionUser()
      .then( (user: User) => {
        bid.createdAt = this.timestamp;
        bid.userUid = user.uid;
        bid.userDisplayName = user.firstName + ' ' + user.lastName;
        bid.userImageUrl = user.photoURL;
        this.afs.collection('posts').doc(bid.postId).collection('bids').add(bid.getData())
        .then( (newBid) => {
          resolve(newBid);
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  }
}
