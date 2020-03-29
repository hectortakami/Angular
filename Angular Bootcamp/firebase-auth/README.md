## Authentication

#### Firebase ( Email & Password )

1.  Create a model (class) to handle formulary inputs

    ```console
       ng g class models/user-model
    ```

    _user-model.ts_

    ```typescript
    export class UserModel {
      // All property declarations goes here
      // Ex.
      // username: string;
      // age: number;
      // activeUser: boolean;
    }
    ```

2.  Firebase Setup
    https://firebase.google.com/docs/reference/rest/auth
    _Go to_ `https://console.firebase.google.com/`, _create a new application and configure the 'Sign-in Methods' with the social media providers to log-in_

3)  Firebase Auth Service


    1.  Prepare HttpClientModule
        _app.module.ts_

        ```typescript
          import { HttpClientModule } from '@angular/common/http';
          // ...
          imports: [
            HttpClientModule
          ], // ...
        ```

    2.  Generate a service

        ```console
        ng generate service services/auth-firebase
        ```

        _auth-firebase.service.ts_

        ```typescript
        import { Injectable } from "@angular/core";
        import { HttpClient } from "@angular/common/http";
        import { UserModel } from "../models/user-model";
        import { map } from "rxjs/operators";

        @Injectable({
          providedIn: "root"
        })
        export class AuthFirebaseService {
          firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
          apiKey = "[API_KEY]";
          userToken: string;

          constructor(private http: HttpClient) {
            this.readToken();
          }

          // AUTH OPERATIONS GOES HERE

          storeToken(idToken: string) {
            this.userToken = idToken;
            localStorage.setItem("idToken", idToken);
            let nowDate = new Date();
            nowDate.setSeconds(3600); // Firebase define the token expiration within an hour (3600 secs)
            localStorage.setItem(
              "token_expiration",
              nowDate.getTime().toString()
            );
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
        ```

    3.  Setup Auth REST functionalities

        - ###### Register New User

          _Note: Password needs to be 6 character at least to register_

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

          _auth-firebase.service.ts_

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

          _register.component.ts_

          ```typescript
          constructor(private authService: AuthFirebaseService){}

          // REGISTER NEW USER USAGE
          this.authService.registerUser(<USER_MODEL>)
          .subscribe(
            response => {
              // TODO on successfull user login
              // Note: Firebase demands a 6 characters at least password to succeed
            },
            error => {
              // TODO to handle error
              // Ex. Retreive error message
              // console.log(error["error"]["error"]["message"]);
            }
          );
          ```

        - ###### User Login

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

          _auth-firebase.service.ts_

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

          _login.component.ts_

          ```typescript
          constructor(private authService: AuthFirebaseService){}

          // LOGIN SERVICE USAGE
          this.authService.login(<USER_MODEL>)
          .subscribe(
            response => {
              // TODO on successfull user login
            },
            error => {
              // TODO to handle error
            }
          ```

        - ###### Get User's Data

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

          _auth-firebase.service.ts_

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

          _show-user.component.ts_

          ```typescript
          constructor(private authService: AuthFirebaseService){}

          // GET USER'S DATA
          this.authService.getUserData(<idToken>)
          .subscribe(
            response => {
              // TODO on successfull user is found
            },
            error => {
              // TODO to handle error
            }
          );
          ```


        - ###### Logout
         _auth-firebase.service.ts_

          ```typescript
            logout() {
              localStorage.removeItem("idToken");
            }
          ```

         _logout.component.ts_
         ```typescript
            constructor(
              private authService: AuthFirebaseService,
              private router: Router
              ){}

            logout() {
              this.authService.logout();
              this.router.navigate(["/<page_after_logout>"]);
            }
         ```

#### Auth-0 SDK

https://auth0.com/

1. Install the SDK
   ```console
   npm install @auth0/auth0-spa-js --save
   ```
2. Generate a service to handle Auth-0 operations

   ```console
   ng generate service auth
   ```

3. Copy Auth-0 service implementation in the _auth.service.ts_

   ```typescript
   import { Injectable } from "@angular/core";
   import createAuth0Client from "@auth0/  auth0-spa-js";
   import Auth0Client from "@auth0/auth0-spa-js/   dist/typings/Auth0Client";
   import {
     from,
     of,
     Observable,
     BehaviorSubject,
     combineLatest,
     throwError
   } from "rxjs";
   import { tap, catchError, concatMap, shareReplay } from "rxjs/operators";
   import { Router } from "@angular/router";

   @Injectable({
     providedIn: "root"
   })
   export class AuthService {
     // Create an observable of Auth0 instance     of client
     auth0Client$ = (from(
       createAuth0Client({
         domain: "<APP_DOMAIN",
         client_id: "<CLIENT_ID>",
         redirect_uri: `${window.location.origin}  `
       })
     ) as Observable<Auth0Client>).pipe(
       shareReplay(1), // Every subscription   receives the same shared value
       catchError(err => throwError(err))
     );
     // Define observables for SDK methods that    return promises by default
     // For each Auth0 SDK method, first ensure    the client instance is ready
     // concatMap: Using the client instance,  call SDK method; SDK returns a promise
     // from: Convert that resulting promise   into an observable
     isAuthenticated$ = this.auth0Client$.pipe(
       concatMap((client: Auth0Client) => from(client.isAuthenticated())),
       tap(res => (this.loggedIn = res))
     );
     handleRedirectCallback$ = this.auth0Client$.pipe(
       concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
     );
     // Create subject and public observable of    user profile data
     private userProfileSubject$ = new BehaviorSubject<any>(null);
     userProfile$ = this.userProfileSubject$.asObservable();
     // Create a local property for login status
     loggedIn: boolean = null;

     constructor(private router: Router) {
       // On initial load, check authentication    state with authorization server
       // Set up local auth streams if user is     already authenticated
       this.localAuthSetup();
       // Handle redirect from Auth0 login
       this.handleAuthCallback();
     }

     // When calling, options can be passed if     desired
     // https://auth0.github.io/auth0-spa-js/  classes/auth0client.html#getuser
     getUser$(options?): Observable<any> {
       return this.auth0Client$.pipe(
         concatMap((client: Auth0Client) => from(client.getUser(options))),
         tap(user => this.userProfileSubject$.next(user))
       );
     }

     private localAuthSetup() {
       // This should only be called on app    initialization
       // Set up local authentication streams
       const checkAuth$ = this.isAuthenticated$.pipe(
         concatMap((loggedIn: boolean) => {
           if (loggedIn) {
             // If authenticated, get user and     set in app
             // NOTE: you could pass options   here if needed
             return this.getUser$();
           }
           // If not authenticated, return     stream that emits 'false'
           return of(loggedIn);
         })
       );
       checkAuth$.subscribe();
     }

     login(redirectPath: string = "/") {
       // A desired redirect path can be passed    to login method
       // (e.g., from a route guard)
       // Ensure Auth0 client instance exists
       this.auth0Client$.subscribe((client: Auth0Client) => {
         // Call method to log in
         client.loginWithRedirect({
           redirect_uri: `${window.location.origin}`,
           appState: { target: redirectPath }
         });
       });
     }

     private handleAuthCallback() {
       // Call when app reloads after user logs    in with Auth0
       const params = window.location.search;
       if (params.includes("code=") && params.includes("state=")) {
         let targetRoute: string; // Path to   redirect to after login processsed
         const authComplete$ = this.handleRedirectCallback$.pipe(
           // Have client, now call method to  handle auth callback redirect
           tap(cbRes => {
             // Get and set target redirect    route from callback results
             targetRoute =
               cbRes.appState && cbRes.appState.target
                 ? cbRes.appState.target
                 : "/";
           }),
           concatMap(() => {
             // Redirect callback complete; get    user and login status
             return combineLatest([this.getUser$(), this.isAuthenticated$]);
           })
         );
         // Subscribe to authentication    completion observable
         // Response will be an array of user  and login status
         authComplete$.subscribe(([user, loggedIn]) => {
           // Redirect to target route after   callback processing
           this.router.navigate([targetRoute]);
         });
       }
     }

     logout() {
       // Ensure Auth0 client instance exists
       this.auth0Client$.subscribe((client: Auth0Client) => {
         // Call method to log out
         client.logout({
           client_id: "Kw3HPcG7f8Ilx4vFilGvDkliG3vOD4MF",
           returnTo: `${window.location.origin}`
         });
       });
     }
   }
   ```

4. Inject service in _app.component.ts_ or the component to implement authentication

   ```typescript
   import { Component } from "@angular/core";
   import { AuthService } from "./services/auth.   service";

   @Component({
     selector: "app-root",
     templateUrl: "./app.component.html",
     styleUrls: ["./app.component.scss"]
   })
   export class AppComponent {
     constructor(public auth: AuthService) {}
   }
   ```

5. Configure app to listen port

   ###### Go to Auth-0 Dashboard > Your_App > Settings

   1. Configure `http://localhost:<APP_PORT>` in:
      - Allowed Callback URLs
      - Allowed Logout URLs
      - Allowed Web Origins
   2. Save Changes

   _Note: Angular DevEnv works in port:4200 by default_

6. Store user's data when refres page
   ###### Go to Auth-0 Dashboard > Universal Login
   1. Configure Experience as ' New '
   2. Save Changes

##### Auth-0 Usage

- User's LogIn / LogOut

  ```html
  <button (click)="auth.login()" *ngIf="!auth.    loggedIn">Log In</button>
  <button (click)="auth.logout()" *ngIf="auth.    loggedIn">Log Out</button>
  ```

- Route Guard (CanActivate)

  ```console
  ng g g services/auth
    • CanActivate
  ```

  ###### Prevents accessing a route without log in

  _auth.guard.ts_

  ```typescript
  export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      // isAuthenticated$ is a property from  Auth-0 that defines if the user is   already authenticated
      return this.auth.isAuthenticated$;
    }
  }
  ```

  _app-routing.module.ts_

  ```
  {
    path: "protected",
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  }
  ```

- Retreiving user's profile data (in HTML template or as JSON in TS)


    ```html
    <pre *ngIf="auth.userProfile$ | async as    profile">
        <code>{{ profile | json }}</code>
    </pre>
    ```

    ```typescript
    export class ProtectedComponent implements  OnInit {
      profileData: any;

      constructor(public auth: AuthService) {}

      ngOnInit(): void {
        this.auth.userProfile$.subscribe(profile    => {
          this.profileData = profile;
        });
      }
    }
    ```

    _auth.userProfile$_
    ```json
    {
      "given_name": "USER_NAME",
      "family_name": "USER_LAST_NAME",
      "nickname": "NICKNAME",
      "name": "USER_NAME",
      "picture": "https://user.photo.jpg",
      "locale": "COUNTRY_CODE",
      "updated_at": "LAST_LOGIN",
      "email": "USER_EMAIL",
      "email_verified": <boolean>,
      "sub": "<social-media>-oauth2|<session-hash>"
    }
    ```
