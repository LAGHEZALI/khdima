import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';

import { AngularFireDatabase } from '@angular/fire/database';

import { from, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private basePath = '/files';

  constructor(private db: AngularFireDatabase) { }

  uploadImage(file: any, path: string): Promise<string> {

    return new Promise<string>(resolve => {

      if (file === undefined) {
        // tslint:disable-next-line:max-line-length
        resolve('https://firebasestorage.googleapis.com/v0/b/khdima-cc985.appspot.com/o/files%2Fimages%2Fprofile%2Favatar.png?alt=media&token=99c1edbf-ea0c-43bd-a1e4-df4e3771c37f');
      } else {
        const fileUpload = new Upload(file);
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/images/${path}/${fileUpload.file.name}`)
                          .put(fileUpload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          LoadingService.update('Chargement de votre Image', Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
        }, (error) => {
          console.error(error);
          // tslint:disable-next-line:max-line-length
          resolve('https://firebasestorage.googleapis.com/v0/b/khdima-cc985.appspot.com/o/files%2Fimages%2Fprofile%2Favatar.png?alt=media&token=99c1edbf-ea0c-43bd-a1e4-df4e3771c37f');
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            resolve(downloadURL);
          });
        });
      }
    });
  }
}
