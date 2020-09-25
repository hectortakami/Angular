import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user-model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthFirebaseService {
  firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
  apiKey = "AIzaSyBDVoArNYBVMokMi-XbTaLjshyZst6USMc";
  userToken: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  registerUser(user: UserModel) {
    // Create user (Email & Password)
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    const authData = {
      // UserModel needs to have properties 'email' and 'password' set
      // ...user,
      email: user.email,
      password: user.password,
      displayName: user.username,
      returnSecureToken: true
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

  login(user: UserModel) {
    // Sign-in (Email & Password)
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
    const authData = {
      // UserModel needs to have properties 'email' and 'password' set
      ...user,
      returnSecureToken: true
    };
    return this.http
      .post(
        `${this.firebaseUrl}signInWithPassword?key=${this.apiKey}`,
        authData
      )
      .pipe(
        map(response => {
          this.storeToken(response["idToken"]);
          return response;
        })
      );
  }

  getUserData(token: string) {
    // Get User Data from 'idToken'
    // https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
    return this.http.post(`${this.firebaseUrl}lookup?key=${this.apiKey}`, {
      idToken: token
    });
  }

  logout() {
    localStorage.removeItem("idToken");
  }

  storeToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("idToken", idToken);

    let nowDate = new Date();
    nowDate.setSeconds(3600); // Firebase define the token expiration within an hour (3600 secs)
    localStorage.setItem("token_expiration", nowDate.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem("idToken")) {
      this.userToken = localStorage.getItem("idToken");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  isAuthenticated() {
    if (this.userToken.length < 2) {
      return false;
    }

    const expiration = Number(localStorage.getItem("token_expiration"));
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
