## Firebase ( AngularFire & Cloud Functions )

https://github.com/angular/angularfire

### Create Firebase project

Note: Database (Real-time Database) & Storage rules must be set to `true` to work in development environment https://console.firebase.google.com/

### AngularFire

#### Configure AngularFire

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

#### Using AngularFire

- ##### Firestore (real-time database)

  - ###### Get Collection

    ```typescript
    import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
    // ...
    // This is a reference to the collection needed from Firestore
    private itemsCollection: AngularFirestoreCollection<ItemModel?>;

    constructor(private firestore: AngularFirestore) {}

    // GET FIREBASE COLLECTION
    getCollection() {
      // .collection(<"FIREBASE_COLLECTION">, query => query.<operations>)
      // [OPTIONAL] QUERY DEFINITION
      // query.orderBy("<COLLECTION_FIELD", "desc"|"asc")
      // query.limit(10)
      this.itemsCollection = this.firestore.collection<ItemModel?>(
      "<COLLECTION>", query? => query.'<OPERATIONS>');
      return this.itemsCollection.valueChanges();
    }
    ```

  - ###### Add Item to Collection

    ```typescript
    import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
    // ...
    // This is a reference to the collection needed from Firestore
    private itemsCollection: AngularFirestoreCollection<ItemModel?>;

    constructor(private firestore: AngularFirestore) {}

    // Add item to Firestore collection
    add2Collection() {
      let newItem: CollectionModel = {
        // TODO create a new value to be pushed to Firestore
      };
      this.itemsCollection = this.firestore.collection<ItemModel?>("<COLLECTION>");
      return this.itemsCollection.add(newItem);
    }
    ```

- ##### Firestore (file upload)

  1.  ###### File data models (FileModel & FileRef)

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

  2.  ###### Dropzone Directive

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

  3.  ###### Firestore Service

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

  4.  ###### Component configuration

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

- ##### Fireauth (user authentication)

  `fireauth.service.ts`

  ```typescript
  import { AngularFireAuth } from '@angular/fire/auth';
  import { auth } from 'firebase';
  import { UserModel } from '../models/user-model';

  export class FireauthService {
    user: UserModel = {
      name: '',
      uid: '',
      avatar: ''
      // All user proprties to be store when authenticate must be declaredin UserModel
    };

    constructor(public fireauth: AngularFireAuth) {
      fireauth.authState.subscribe(authUser => {
        if (!authUser) {
          return;
        } else {
          // Asign all Fireauth properties from response in 'authUser' to our UserModel
          this.user.name = authUser['displayName'];
          this.user.uid = authUser['uid'];
          this.user.avatar = authUser['photoURL'];
          // ...
        }
      });
    }

    login(provider: string) {
      switch (provider) {
        case 'google':
          this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
          break;
        case 'facebook':
          this.fireauth.auth.signInWithPopup(new auth.FacebookAuthProvider());
          break;
        case 'twitter':
          this.fireauth.auth.signInWithPopup(new auth.TwitterAuthProvider());
          break;
        // ... include all Social Media providers to authenticate with FireAuth
        default:
          break;
      }
    }

    logout() {
      // Clear UserModel properties and sign-out
      this.user = { name: '', uid: '', avatar: '' };
      this.fireauth.auth.signOut();
    }
  }
  ```

### Firebase ( Simple REST usage )

- #### Fireauth Authentication ( Email & Password )

  1. ##### Firebase Authentication Setup

     https://firebase.google.com/docs/reference/rest/auth
     _Go to_ `https://console.firebase.google.com/`, _create a new application and configure the 'Sign-in Methods' with the social media providers to log-in_

  2. ##### Create a model (class) to handle formulary inputs

     ```console
        ng g class models/user-model
     ```

     `user-model.ts`

     ```typescript
     export class UserModel {
       // All property declarations goes here
       // Ex.
       // username: string;
       // age: number;
       // activeUser: boolean;
     }
     ```

  3. ##### Auth Service

     ```console
       ng generate service services/auth-firebase
     ```

     `auth-firebase.service.ts`

     ```typescript
     import { Injectable } from '@angular/core';
     import { HttpClient } from '@angular/common/http';
     import { UserModel } from '../models/user-model';
     import { map } from 'rxjs/operators';

     @Injectable({
       providedIn: 'root'
     })
     export class AuthFirebaseService {
       firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
       apiKey = '[API_KEY]';
       userToken: string;

       constructor(private http: HttpClient) {
         this.readToken();
       }

       // AUTH OPERATIONS GOES HERE

       storeToken(idToken: string) {
         this.userToken = idToken;
         localStorage.setItem('idToken', idToken);
         let nowDate = new Date();
         nowDate.setSeconds(3600); // Firebase define the token expiration within an hour  (3600 secs)
         localStorage.setItem('token_expiration', nowDate.getTime().toString());
       }

       readToken() {
         if (localStorage.getItem('idToken')) {
           this.userToken = localStorage.getItem('idToken');
         } else {
           this.userToken = '';
         }
         return this.userToken;
       }

       isAuthenticated() {
         if (this.userToken.length < 2) {
           return false;
         }

         const expiration = Number(localStorage.getItem('token_expiration'));
         const expirationDate = new Date();
         expirationDate.setTime(expiration);

         if (expirationDate > new Date()) {
           // Compares the expiration time with the actual time
           return true;
         } else {
           return false;
         }
       }
     }
     ```

  4. ##### FireAuth REST Functions

     - ###### Register User

       _Note: Password needs to be 6 character at least to match Firebase constraints_

       ```
         Request: POST
         URL: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
         PAYLOAD
         email                 <user.email>
         password              <user.password>
         returnSecureToken     <boolean>
       ```

       ```json
         Register Response
       {
         "idToken": "[ID_TOKEN]",
         "email": "[user@example.com]",
         "refreshToken": "[REFRESH_TOKEN]",
         "expiresIn": "3600",
         "localId": "tRcfmLH7..."
       }
       ```

       `auth-firebase.service.ts`

       ```typescript
         registerUser(user: UserModel) {
           // Create user (Email & Password)
           // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
           const authData = {
             // UserModel needs to have properties 'email' and 'password' set
             email: user.email,
             password: user.password,
             displayName: user.username,
             returnSecureToken: true
             // Can be simplify as '... user' and it will take only the common properties (user & email) without including other explicit declared parameters
           };

           return this.http
             .post(`${this.firebaseUrl}signUp?key=${this.apiKey}`, authData)
             .pipe(
               map(response => {
                 this.storeToken(response["idToken"]);
                 return response;
             })
           );
         }
       ```

     - ###### Login

       _Note: The user must be already register in database_

       ```
         Request: POST
         URL: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

         PAYLOAD
         email                 <user.email>
         password              <user.password>
         returnSecureToken     <boolean>
       ```

       ```json
         Login Response
       {
          "localId": "ZY1rJK0eYLg...",
          "email": "[user@example.com]",
          "displayName": "",
          "idToken": "[ID_TOKEN]",
          "registered": true,
          "refreshToken": "[REFRESH_TOKEN]",
          "expiresIn": "3600"
       }
       ```

       `auth-firebase.service.ts`

       ```typescript
         login(user: UserModel) {
           // Sign-in (Email & Password)
           // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
           const authData = {
             // UserModel needs to have properties 'email' and 'password' set
             email: user.email,
             password: user.password,
             returnSecureToken: true
             // Can be simplify as '... user' and it will take only the common properties (user & email) without including other explicit declared parameters
           };

           return this.http
             .post( `${this.firebaseUrl}signInWithPassword?key=${this.apiKey}`,authData)
             .pipe(
               map(response => {
                   this.storeToken(response["idToken"]);
                   return response;
               })
             );
           }
       ```

     - ###### Retreive User's Data

       ```
         Request: POST
         URL: https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
         PAYLOAD
         idToken      <user.idToken>
       ```

       ```json
         User Data Response
       {
         "users": [
           {
             "localId": "ZY1rJK0...",
             "email": "user@example.com",
             "emailVerified": false,
             "displayName": "John Doe",
             "providerUserInfo": [
               {
                 "providerId": "password",
                 "displayName": "John Doe",
                 "photoUrl": "http://localhost:8080/img1234567890/photo.png",
                 "federatedId": "user@example.com",
                 "email": "user@example.com",
                 "rawId": "user@example.com",
                 "screenName": "user@example.com"
               }
             ],
             "photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
             "passwordHash": "...",
             "passwordUpdatedAt": 1.484124177E12,
             "validSince": "1484124177",
             "disabled": false,
             "lastLoginAt": "1484628946000",
             "createdAt": "1484124142000",
             "customAuth": false
           }
         ]
       }
       ```

       `auth-firebase.service.ts`

       ```typescript
         getUserData(token: string) {
           // Get User Data from 'idToken'
           // https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
           return this.http.post(
             `${this.firebaseUrl}lookup?key=${this.apiKey}`,
             { idToken: token }
           );
         }
       ```

     - ###### Logout

       `auth-firebase.service.ts`

       ```typescript
         logout() {
           localStorage.removeItem("idToken");
         }
       ```

- #### Firestore Real-time Database CRUD (REST)

  _Note: Notice the `.json` termintation after calling all the HTTP Request Services, this is a mandatory usage for the API calls_

  `firebase.service.ts`

      ```typescript
      export class FirebaseService {

        private firebase = '<FIREBASE_PROJECT_URL>';
        constructor(private http: HttpClient) {}


        // HTTP REQUEST : POST
        // Returns the FirebaseID when the POST request is submitted
        add2Collection(object: objectModel) {
          return (
           this.http
              .post(`${this.firebase}/<COLLECTION>.json`, object)
             // With this pipe we return the exact same object + the recently created Firebase ID
             .pipe(
               map(response => {
                 object.firebaseID = response['name'];
                  return object;
               })
              )
          );
        }


        // HTTP REQUEST : GET
        // Return the entire collection (no Firebase ID included in the object attributes)
        // AS OBJECT
        getCollection() {
         return (
            this.http
              .get(`${this.firebase}/<COLLECTION>.json`)
             // With this pipe we return the entire collection with each element containing it's Firebase ID
              // AS ARRAY
             .pipe(
                map(response => {
                  if (!response) {
                    return [];
                  } else {
                   const firebaseIDs = Object.keys(response); //Retreive all the keys, in this case Firebase IDs
                    const firebaseData = Object.values(response); //Retreive all the properties contained by each key (without the key)
                   for (let i = 0; i < firebaseIDs.length; i++) {
                      firebaseData[i].firebaseID = firebaseIDs[i];
                    }
                    return firebaseData;
                  }
                })
              )
          );
        }


        // HTTP REQUEST : GET
        // Return an unique object referenced by the Firebase ID
        getItemByID(firebaseID: string) {
         return this.http.get(`${this.firebase}/<COLLECTION>/${firebaseID}.json`);
        }


        // HTTP REQUEST : PUT
        // Returns an object with modified properties (updated), but same Firebase ID
        updateItem(object: ObjectModel) {
        // Neccesarly pre-processing to remove redundancies using Firebase ID
        // while updating an element from database
          const objectTemp = {
            ...object
          };
          delete objectTemp.firebaseID;
          return this.http.put(`${this.firebase}/<COLLECTION>/${object.firebaseID}.json`, objectTemp);
        }


        // HTTP REQUEST : DELETE
        // Removes from database the unique object referenced by it's Firebase ID
        deleteItem(firebaseID: string) {
          return this.http.delete(`${this.firebase}/<COLLECTION>/${firebaseID}.json`);
        }
      }
      ```

### Cloud Functions (Express backend server)

The Firebase Functions (HTTP REST Calls) must be called using the `HttpClientModule`

1. ##### Setup Firebase Cloud Functions

   ```console
   npm install -g firebase-tools
   ```

   - Create a folder to allocate the backend and navigate `cd` to it in terminal
   - Install firebase functions

     ```console
     firebase login
     firebase init
     ```

     Select

     - `Functions: Configure and deploy Cloud Functions`
     - `Use an existing project` and then the project name
     - `TypeScript` , `Yes`, `Yes`

   - Install Express dependencies

     ```console
     cd functions
     npm install express cors
     npm install @types/express --save-dev
     npm install @types/cors --save-dev
     ```

   Navigate to the `Firebase Console > Project Settings > Service Credentials` and click on `Generate new private key` (this will downdload a .json file).

   Rename it as `serviceAccountKey` and paste it on the `src` and `lib` folders, then modify the `index.ts` as follows:

   ```typescript
   import * as functions from 'firebase-functions';
   import * as admin from 'firebase-admin';
   import * as express from 'express';
   import * as cors from 'cors';

   // Firebase Cloud Functions Configuration
   var serviceAccount = require('./service-account-key.json');
   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: '<FIREBASE_PROJECT_URL>'
   });

   const db = admin.firestore();

   // Express Configuration
   const app = express();
   app.use(cors({ origin: true }));

   // REST Functions goes here

   // Export REST server
   export const api = functions.https.onRequest(app);
   ```

2. ##### Create REST Functions (Express)

   To start the development type this commands to enable the hot-reload and recompiling while working on functions

   ```console
   cd functions
   tsc --watch
   firebase serve
   ```

   - ###### GET Requests (Retreive Firebase Collections)

     `index.ts`

     ```typescript
     // GET REQUEST
     // http://<FIREBASE_URL>/api/getCollection
     app.get('/getCollection', async (req, res) => {
       const collectionRef = db.collection('<COLLECTION>');
       const snapshot = await collectionRef.get();
       const itemsInCollection = snapshot.docs.map(item => item.data());
       res.json(itemsInCollection);
     });
     ```

   - ###### POST Requests (Operate Firebase Collections)

     `index.ts`

     ```typescript
     // POST REQUEST
     // http://<FIREBASE_URL>/api/postItem/<ITEM_ID>
     app.post('/postItem/:itemID', async (req, res) => {
       const itemID = req.params.itemID; // Retreives content in param [itemID]
       const collection = '<COLLECTION>';
       const itemRef = db.collection(collection).doc(itemID);
       const snapshot = await itemRef.get();

       if (!snapshot.exists) {
         res.status(404).json({
           ok: false,
           error: `Item with ID (${itemID}) wasn't found in (${collection}) collection`
         });
       } else {
         const item = snapshot.data() || {}; // Binds item from undefined
         await itemRef.update({
           // More updates to item properties goes here
           <ITEM_PROPERTY>: NEW_VALUE
           // ...
         });

         res.json({
           ok: true,
           msg: `Item (${itemID}) was updated successfully`
         });
       }
     });
     ```

3. ##### Deploy Backend Functions ( Production )
   ```console
   cd <Backend_Project_Root_Dir>
   firebase deploy
   ```
   Note: This uploads to the `Firebase Project > Functions` all the REST calls created in Express declarations, and generates a new Firebase URL to call in production.

### Firebase Hosting

1. ###### Build Angular Project

   ```console
   ng build --prod
   ```

   ###### [Optional] Install Firebase Tools & Login ( if hasn't been done, yet )

   ```
   sudo npm install -g firebase-tools
   firebase login
   ```

2. ##### Enable Firebase Hosting (on project)

   ```console
   firebase init
   ```

   Select

   - `Hosting: Configure and deploy Firebase Hosting sites`
   - Select your Firebase Project
   - Configure public directory as `./dist/<YOUR_PROJECT_NAME>`
   - Configure as single-app`Yes`
   - Overrite /dist/<YOUR_PROJECT_NAME>/index.html `No`

3. ##### Deploy Angular Project

   ```console
   firebase deploy
   ```

   _Note: In case of error verify the `firebase.json` file and set hosting/public property as follows`"hosting: "public": "./dist/<YOUR_PROJECT_NAME>"`_
