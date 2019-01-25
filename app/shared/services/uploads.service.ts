import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
import {Post} from './../models/post';
import * as firebase from 'firebase';


import { AngularFireDatabase } from '@angular/fire/database';

import { from } from 'rxjs';
import { User } from '../models/user';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  post: Post
  
  private urlDoc:string
  private basePath = '/files';
  constructor(private db: AngularFireDatabase) {
  this.post =new Post("","","","")
  this.post.imagesUrls= new Array()
  }

  pushFileToStorage(fileUpload: Upload, progress: {percentage: number},post :Post) {
    this.postinit(post);
    
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
 
     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(" arreur !! \n "+error)
      },
      () => {
        // success

        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.post.imagesUrls.push(downloadURL);
          this.saveFileData(fileUpload);
        });
             }
    );
   
  
}
pushFile(fileUpload: Upload,user:User): string {
   
  
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
  
     
       uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          console.log('URL:' + fileUpload.url);
          user.photoURL=downloadURL;
          this.saveUser(user);
        });
         
         return    fileUpload.url
    
   
  

}
pushFilesToStorage(files: FileList[], progress: {percentage: number},post:Post) {
  this.postinit(post);
    
    //this.post =new Post("uid","userid","title","cat","content","url","name",20,"mozambi9","record")
    let i :number
    let file
    let fileUpload:Upload
    
    for(i=0;i< files.length;i++)
    {   
        file = files[i];
        fileUpload = new Upload(file);
       
        const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
 
     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(" arreur !! \n "+error)
      },
      () => {
        // success

        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.post.title= downloadURL;
          this.saveFileData(fileUpload);
        });
      }
    );
    }
  
}
saveUser(user:User) {
  this.db.list('Users').push(user)
    .then(_ => console.log('success user'))  
}
saveFilesData() {
     this.db.list('post').push(this.post)
       .then(_ => console.log('success'))  
 }
 saveFileData(fileUpload: Upload) {

    this.db.list('post').push(this.post)
      .then(_ => console.log('success'))  
}
postinit(post:Post)
{
this.post.category=post.category
this.post.city=post.city
this.post.content=post.content
this.post.title=post.title
}
}
