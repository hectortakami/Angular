## AngularFire

##### Installation

https://github.com/angular/angularfire/blob/v5/docs/install-and-setup.md

1. Add AngularFire to the Angular project

   ```console
   npm install @angular/fire firebase --save
   ```

2. Configure the `src/environments/environment.ts` file

   ```typescript
     production: false,
     firebase: {
       apiKey: '<your-key>',
       authDomain: '<your-project-authdomain>',
       databaseURL: '<your-database-URL>',
       projectId: '<your-project-id>',
       storageBucket: '<your-storage-bucket>',
       messagingSenderId: '<your-messaging-sender-id>'
     }
   ```

   _Navigate to your Firebase project `Overview > Create Web App` to retreive all project credentials, also the `Database > Rules` must be set to 'true'_ `allow read, write: if <true>`

3. Import AngularFire in `app.module.ts`

   ```typescript
   // Angular Fire Imports
   import { environment } from "../environments/environment";
   import { AngularFireModule } from "@angular/fire";
   import { AngularFirestoreModule } from "@angular/fire/firestore";
   import { AngularFireStorageModule } from "@angular/fire/storage";
   import { AngularFireAuth } from "@angular/fire/auth";
   import { auth } from "firebase/app";
   // ...
   imports: [
     AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule, // firestore
     AngularFireAuthModule, // auth
     AngularFireStorageModule // storage
   ],
   ```

##### FireStore Usage

_firestore.service.ts_

```typescript
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

export class FirestoreService {
  private itemsCollection: AngularFirestoreCollection<CollectionModel>;

  constructor(private firestore: AngularFirestore) {}

  loadCollection() {
    // .collection(<"FIREBASE_COLLECTION">, query => query.<operations>)
    this.itemsCollection = this.firestore.collection<CollectionModel>(
      "<COLLECTION>", query => query.'<OPERATIONS>'
      // Queries Example
      // query.orderBy("<COLLECTION_FIELD", "desc"|"asc") orders by the specified field the return data
      // query.limit(10) returns the last 10 registers of the collection
    );
    return this.itemsCollection.valueChanges();
  }

  append2Collection() {
    let newItem: CollectionModel = {
      // TODO create a new value to be pushed to Firestore
    };
    return this.itemsCollection.add(newItem);
  }
}
```

##### FireAuth Usage

_fireauth.service.ts_

```typescript
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { UserModel } from "../models/user-model";

export class FireauthService {
  user: UserModel = {
    name: "",
    uid: "",
    avatar: ""
    // All user proprties to be store when authenticate must be declaredin UserModel
  };

  constructor(public fireauth: AngularFireAuth) {
    fireauth.authState.subscribe(authUser => {
      if (!authUser) {
        return;
      } else {
        // Asign all Fireauth properties from response in 'authUser' to our UserModel
        this.user.name = authUser["displayName"];
        this.user.uid = authUser["uid"];
        this.user.avatar = authUser["photoURL"];
        // ...
      }
    });
  }

  login(provider: string) {
    switch (provider) {
      case "google":
        this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
      case "facebook":
        this.fireauth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        break;
      case "twitter":
        this.fireauth.auth.signInWithPopup(new auth.TwitterAuthProvider());
        break;
      // ... include all Social Media providers to authenticate with FireAuth
      default:
        break;
    }
  }

  logout() {
    // Clear UserModel properties and sign-out
    this.user = { name: "", uid: "", avatar: "" };
    this.fireauth.auth.signOut();
  }
}
```
