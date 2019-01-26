import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';

import { AngularFireDatabase } from '@angular/fire/database';

import { from, Observable, Subject } from 'rxjs';
import { LoadingService } from './loading.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private basePath = '/files';

  public images: File[];
  public imagesUrls: string[];
  public record: File;
  public recordUrl: string;

  public finish = new Subject<string[]>();

  constructor(private db: AngularFireDatabase) {
    this.images = [];
    this.imagesUrls = [];
    this.record = null;
    this.recordUrl = '';
  }

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
          LoadingService.update('Chargement des media', Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
        }, (error) => {
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

  uploadImages(files: File[], path: string, urls: string[]): Promise<string[]> {

    this.finish.next(urls);

    return new Promise<string[]>(resolve => {
      if (files.length > 0) {
        this.uploadImage(files[0], path)
        .then((url) => {
          urls.push(url);
          files.shift();
          this.uploadImages(files, path, urls);
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        this.finish.next(urls);
        resolve(urls);
      }
    });
  }

  uploadRecord(url: string, name: string, path: string): Promise<string> {
    return new Promise<string>(async resolve => {

      if (url === '') {
        resolve('');
      } else {
        const blob = await fetch(url).then(r => r.blob());

        const rec = this.blobToFile(blob, name);

        const fileUpload = new Upload(rec);
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/audio/${path}/${fileUpload.file.name}`)
                          .put(fileUpload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          LoadingService.update('Chargement des media', Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
        }, (error) => {
          reject(error);
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

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }
}
