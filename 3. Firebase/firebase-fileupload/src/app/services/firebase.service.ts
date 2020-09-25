import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../models/file-model';
import { Observable } from 'rxjs';
import { FileRef } from '../models/file-ref';

@Injectable()
export class FirebaseService {
  private fileCollection: AngularFirestoreCollection<FileRef>;
  files: Observable<FileRef[]>;

  private FILE_FOLDER = 'img';

  constructor(private firestore: AngularFirestore) {
    this.fileCollection = firestore.collection<FileRef>('files');
    this.files = this.fileCollection.valueChanges();
  }

  loadStorage() {
    this.fileCollection = this.firestore.collection<FileRef>('files', query =>
      query.orderBy('fileName', 'asc')
    );
    return this.fileCollection.valueChanges();
  }

  upload2Firestorage(imagenes: FileModel[]) {
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.status = true;
      if (item.uploadProgress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.FILE_FOLDER}/${item.fileName}`)
        .put(item.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error('Error while uploading file ', error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            item.url = downloadURL;
            this._storeFileRef(item);
          });
        }
      );
    }
  }

  _storeFileRef(item: FileModel) {
    const fileRef: FileRef = {
      fileName: item.fileName,
      url: item.url
    };
    this.fileCollection.add(fileRef);
  }
}
