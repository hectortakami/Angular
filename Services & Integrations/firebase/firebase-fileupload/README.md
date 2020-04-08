## Firebase (Angular Fire)

https://github.com/angular/angularfire

### Create Firebase project

Note: Database (Real-time Database) & Storage rules must be set to `true` to work in development environment https://console.firebase.google.com/

### Configure AngularFire

```console
npm install firebase @angular/fire --save
```

`environment.ts`

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

`app.module.ts`

```typescript
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { auth } from "firebase/app"
// ...
imports: [
   BrowserModule,
   AngularFireModule.initializeApp(environment.firebase),
   AngularFirestoreModule,    // firestore
   AngularFireStorageModule,  // storage
   AngularFireAuthModule,     // auth
  ],
```

### Using AngularFire

- #### Firestore (real-time database)

- #### Firestore (file upload)

  1.  ##### File data models (FileModel & FileRef)

      ```console
      ng generate class file-model --skipTests
      ng genrate interface file-ref --skipTest
      ```

      _FileModel `file-model.ts` handles file metadata_

      ```typescript
      export class FileModel {
        constructor(
          public file: File,
          public fileName = file.name,
          public url?: string,
          public uploadProgress: number = 0,
          public status: boolean = false // Sets value true when the file is already uploaded
        ) {}
      }
      ```

      _FileRef `file-model.ts` references the file when is already uploaded_

      ```typescript
      export interface FileRef {
        fileName: string;
        url: string;
      }
      ```

  2.  ##### Dropzone Directive

      ```console
      ng generate directive directives/ng-drop-files --skipTests
      ```

      _Stores the files when the user dragged them to the drop-zone, validates the filetype and removes file redundancy_

      `ng-drop-files.directive.ts`

      ```typescript
      import {
        Directive,
        EventEmitter,
        HostListener,
        Output,
        Input
      } from '@angular/core';
      import { FileModel } from '../models/file-model';

      @Directive({
        selector: '[appNgDropFiles]'
      })
      export class NgDropFilesDirective {
        @Input() droppedFiles: FileModel[] = [];
        @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

        constructor() {}

        @HostListener('dragover', ['$event'])
        public onDragEnter(event: any) {
          this._preventBrowser2Open(event);
          this.mouseHover.emit(true);
        }

        @HostListener('dragleave', ['$event'])
        public onDragExit(event: any) {
          this.mouseHover.emit(false);
        }

        @HostListener('drop', ['$event'])
        public onDrop(event: any) {
          const transference = this._getTransference(event);
          if (transference) {
            this._extractFiles(transference.files);
            this._preventBrowser2Open(event);
            this.mouseHover.emit(false);
          }
        }

        private _getTransference(event: any) {
          return event.dataTransfer
            ? event.dataTransfer
            : event.originalEvent.dataTransfer;
        }

        private _extractFiles(fileList: FileList) {
          for (const index in Object.getOwnPropertyNames(fileList)) {
            const tempFile = fileList[index];

            if (this._validateFile(tempFile)) {
              const newFile = new FileModel(tempFile);
              this.droppedFiles.push(newFile);
            }
          }
          console.log(this.droppedFiles);
        }

        // Validaciones
        private _validateFile(file: File): boolean {
          if (
            !this._preventDuplicateFiles(file.name) &&
            this._preventFileType(file.type)
          ) {
            return true;
          } else {
            return false;
          }
        }

        private _preventBrowser2Open(event) {
          event.preventDefault();
          event.stopPropagation();
        }

        private _preventDuplicateFiles(filename: string): boolean {
          for (const file of this.droppedFiles) {
            if (file.fileName === filename) {
              console.log('The files ' + filename + ' was already added.');
              return true;
            }
          }
          return false;
        }

        private _preventFileType(fileType: string): boolean {
          if (fileType === '' || fileType === undefined) {
            return false;
          } else {
            // Define allowed doctype file types
            if (fileType.startsWith('image')) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
      ```

  3.  ##### Firestore Service

      `firestore.service.ts`

      Uploads the file to the storage, creates a reference of the file to the Real-time database & retreives all files references (url) in certain collection

      ```typescript
      import { Injectable } from '@angular/core';
      import { Observable } from 'rxjs';

      import { FileModel } from '../models/file-model';
      import { FileRef } from '../models/file-ref';

      import {
        AngularFirestore,
        AngularFirestoreCollection
      } from '@angular/fire/firestore';
      import * as firebase from 'firebase';

      @Injectable()
      export class FirestoreService {
        private fileCollection: AngularFirestoreCollection<FileRef>;

        files: Observable<FileRef[]>;
        private FILE_FOLDER = 'img'; // Firebase Storage collection name

        constructor(private firestore: AngularFirestore) {
          // Firebase Real-time collection name (for each file URL reference)
          this.fileCollection = firestore.collection<FileRef>('files');
          this.files = this.fileCollection.valueChanges();
        }

        // Retreives all files stored in 'files' collection
        loadStorage() {
          this.fileCollection = this.firestore.collection<FileRef>(
            'files',
            query => query.orderBy('fileName', 'asc')
          );
          return this.fileCollection.valueChanges();
        }

        // Upload files to Firebase Storage
        upload2Firestorage(files: FileModel[]) {
          const storageRef = firebase.storage().ref();

          for (const item of files) {
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

        // Create a reference in Real-time database to the 'files' collection
        // Each element contains the Firestore URL to be later used (once uploaded)
        _storeFileRef(item: FileModel) {
          const fileRef: FileRef = {
            fileName: item.fileName,
            url: item.url
          };
          this.fileCollection.add(fileRef);
        }
      }
      ```

  4.  ##### Component configuration

      - ###### File-Upload Component

        `file-upload.component.html`

        ```html
        <!-- Assign the ng-drop-files directive -->
        <!-- Listen the events when user drags over the element a file -->
        <!-- Set 'uploadedFiles' to whatever the user drags as result in'droppedFiles' -->
        <!-- Set a CSS class to the component to retro user when files drop -->
        <div
          appNgDropFiles
          (mouseHover)="hoverDropzone = $event"
          [droppedFiles]="uploadedFiles"
          [ngClass]="{ 'CSS-ON-DRAGGED-FILE': hoverDropzone }"
        >
          <!-- Drop zone content -->
        </div>
        ```

        `file-upload.component.ts`

        ```typescript
        import { FirebaseService } from 'src/app/services/firebase.service';
        import { FileModel } from 'src/app/models/file-model';
        // ...
        export class UploadComponent {
          hoverDropzone = false;
          uploadedFiles: FileModel[] = [];
          constructor(private firebase: FirebaseService) {
            // Note: File Size in MB
            // (file: File) = ((file.size / 1024) / 1024)
          }
          clearLoading() {
            this.uploadedFiles = [];
          }
          uploadFiles() {
            if (this.uploadedFiles.length > 0) {
              this.firebase.upload2Firestorage(this.uploadedFiles);
            }
          }
        }
        ```

      - ###### List-files Component

        `list-files.component.ts`

        ```typescript
        import { FirebaseService } from 'src/app/services/firebase.service';
        // ...
        export class HomeComponent implements OnInit {
          loading = false;
          files: any[] = [];
          constructor(private firebase: FirebaseService) {
            this.loading = true;
            this.firebase.loadStorage().subscribe(response => {
              this.files = response;
              this.loading = false;
            });
          }
        }
        ```

- #### Fireauth (user authentication)
