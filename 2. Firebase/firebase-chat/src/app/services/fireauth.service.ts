import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { UserModel } from "../models/user-model";

@Injectable({
  providedIn: "root"
})
export class FireauthService {
  user: UserModel = { name: "", uid: "", avatar: "" };

  constructor(public fireauth: AngularFireAuth) {
    fireauth.authState.subscribe(authUser => {
      if (!authUser) {
        return;
      } else {
        console.log(authUser);
        this.user.name = authUser["displayName"];
        this.user.uid = authUser["uid"];
        this.user.avatar = authUser["photoURL"];
      }
      console.log(this.user);
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

      default:
        break;
    }
  }
  logout() {
    this.user = { name: "", uid: "", avatar: "" };
    this.fireauth.auth.signOut();
  }
}
