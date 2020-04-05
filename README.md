# Angular 9+

TypeScript + HTML + CSS toolset for building Progressive Web Applications (PWA).

## Commands

1. ##### Create new project

```console
ng new < app_name >
```

2. ##### Clone or prepare for run an Angular project (install node-mondules)

```console
npm install
```

3. ##### Run angular app nodemon (live-reload) & open browser

```console
ng serve -o
```

4. ##### Add Themes

   - Nebular (SCSS):

   ```console
   ng add @nebular/theme
   ```

   - Material:

   ```console
   ng add @angular/material
   ```

   - Bootstrap CDN:
     _index.html_
     ```html
     <link
       rel="stylesheet"
       href="https://stackpath.bootstrapcdn.com/   bootstrap/4.4.1/css/bootstrap.min.css"
       integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/    Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh    "
       crossorigin="anonymous"
     />
     <script
       src="https://code.jquery.com/jquery-3.4.1.    slim.min.js"
       integrity="sha384-J6qa4849blE2    +poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYf    oRSJoZ+n"
       crossorigin="anonymous"
     ></script>
     <script
       src="https://cdn.jsdelivr.net/npm/popper.   js@1.16.0/dist/umd/popper.min.js"
       integrity="sha384-Q6E9RHvbIyZFJoft    +2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMf    ooAo"
       crossorigin="anonymous"
     ></script>
     <script
       src="https://stackpath.bootstrapcdn.com/    bootstrap/4.4.1/js/bootstrap.min.js"
       integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnj    uUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
       crossorigin="anonymous"
     ></script>
     ```

5. ##### Generate a new [ component | service | pipe | guard | module ]

```console
ng generate [ component | service | pipe | guard | module ] < path >
```

6. ##### Deploy Angular App (Apache server)

   - Hash routes
     _app-routing.module.ts_
     ```typescript
        // ...
       imports: [RouterModule.forRoot(routes, {useHash: true})],
        // ...
     ```
   - Create `dist` folder

     ```console
     ng build --prod
     ```

     Note: `environment.ts` file will be replaced with `environment.prod.ts` and all the TS classes & modulues will be minify and compile to JS.

   - Upload `dist` folder to Apache Server

## Angular CDK

#### Drag & Drop | Virtual Scroll

Install Component Development Kit (CDK)

```console
    npm install @angular/cdk
```

- ##### Drag & Drop

  _app.module.ts_

  ```typescript
  import { DragDropModule } from '@angular/cdk/drag-drop';
  // ...
  imports: [
    DragDropModule
  ],
  ```

  _drag-&-drop.component.html_

  ```html
  <!-- Container of draggable elements -->
  <nb-card-body
    cdkDropList
    #DropListID="cdkDropList"
    [cdkDropListData]="listData"
    [cdkDropListConnectedTo]="[<DropListID>, <DropListID>, ...]"
    (cdkDropListDropped)="onDrop($event)"
  >
    <!-- Draggable element -->
    <nb-alert cdkDrag *ngFor="let item of listData; let i = index">
      <!-- Content -->
    </nb-alert>
  </nb-card-body>
  ```

  _drag-&-drop.component.ts_

  ```typescript
  import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
  } from '@angular/cdk/drag-drop';
  // ...
  listData = ['Get to work', 'Go home', ...];
  // More DropList data must be declared here as well

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Drag & Drop elements in the same DropList
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move elements from one DropList to another
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  ```

- ##### Virtual Scroll

  _app.module.ts_

  ```typescript
  import { ScrollingModule } from '@angular/cdk/scrolling';
  // ...
  imports: [
    ScrollingModule
  ],
  ```

  _virtual-scroll.component.html_

  ```html
  <cdk-virtual-scroll-viewport itemSize="125" style="height: 100%">
    <nb-list-item
      *cdkVirtualFor="let user of users; let i = index; let counter = count"
    >
      <nb-user
        class="animated slideInLeft slow"
        size="giant"
        [name]="user.name"
        [title]="user.title"
        badgeText="{{ i + 1 }}/{{ counter }}"
        badgeStatus="primary"
        badgePosition="bottom right"
      >
      </nb-user>
    </nb-list-item>
  </cdk-virtual-scroll-viewport>
  ```

  _virtual-scroll.component.ts_

  ```typescript
  import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
  // ...

  // Declare the scroll container as TS element to work with
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  // Scroll position funtions
  move2Start() {
      this.viewport.scrollToIndex(0);
  }
  move2Middle() {
      const middle = items.length / 2;
      this.viewport.scrollToIndex(middle - 1);
  }
  move2End() {
      this.viewport.scrollToIndex(items.length);
  }
  ```

## Angular Directives

#### Structural Directives

https://angular.io/guide/structural-directives#structural-directives

- ##### \*ngIf
  ```html
  <div *ngIf="<boolean expression>"></div>
  ```
- ##### \*ngForOf

  ```html
  <li *ngFor="let item in collection; let i=index;"></li>
  ```

- ##### \*ngSwitch
  ```html
  <span [ngSwitch]="<switch value>">
    <div *ngSwitchCase="<first case>"></div>
    <div *ngSwitchCase="<second case>"></div>
    <div *ngSwitchCase="<third case>"></div>
    ...
    <div *ngSwitchDefault></div>
  </span>
  ```

#### Attribute Directives

- ##### ngStyle
  ```html
  <div [ngStyle]="{'css-property': <css-value>}""></div>
  ```
- ##### ngClass
  ```html
  <div [ngClass]="{'class': <boolean>}"></div>
  ```

## Routes & Parameters

https://angular.io/guide/router

- ##### Navigate in HTML Template
  ```html
  <a [routerLink]="['/<route>']" routerLinkActive="active"> </a>
  ```
- ##### Navigate from TS component

  ```javascript
  import { Router } from '@angular/router';

  this.router.navigate(['/<route>', '<params?>']);
  ```

- ##### Retreive Params from route

  ```javascript
  import { ActivatedRoute } from '@angular/router';

  this.activatedRouter.params.subscribe(myParams => {
    // TODO params values in 'myParams' variable
  });
  ```

- ##### Route Guard (CanActivate)

  ```console
  ng g g services/<myGuard>
    • CanActivate
  ```

  ###### Prevents accessing a route without accomplish a condition

  _myGuard.guard.ts_

  ```typescript
  export class MyGuardClass implements  CanActivate {

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      // ToDo guard implementation to determine   if a route can be accessed or not
      return <boolean>;
    }
  }
  ```

  _app-routing.module.ts_

  ```
  {
    path: "protected",
    component: ProtectedComponent,
    canActivate: [ <MyGuardClass> , ... ]
  }
  ```

## Component Interaction

https://angular.io/guide/component-interaction

##### Communicate components, in order to pass through data and reduce code utilization

- ##### @Input

  ###### _Receive from parent the data to initialize variables_

  _hero-card.component.ts (Child component)_

  ```javascript
  import { Input } from "@angular/core";
  @Component({
    selector: 'app-hero-card', ...
  });
  // It says that the value can be set from other component
  @Input() heroInput: Hero = {};
  ```

  _show-heroes.component.html (Parent component)_

  ```html
  <!-- Calling the variable '[heroInput]' (same name as in child-component) we pass through the data to instantiate the object -->
  <app-hero-card
    *ngFor="let heroData of heroes"
    [heroInput]="heroData"
  ></app-hero-card>
  ```

- ##### @Output

  ###### _Send parameters or values to operate parent component functions_

  _hero-card.component.ts (Child component)_

  ```javascript
  import { Output, EventEmitter } from "@angular/core";
  @Output() childEmitter: EventEmmiter< emit_value_type >;

  constructor(){
    this.childEmitter = new EventEmitter();
  }

  myChildFunction(){
    // Triggers the parents listener sending any value to operate from the other component
    this.childEmitter.emit( emit_value );
  }
  ```

  _show-heroes.component.html (Parent component)_

      ```html
      <!-- The parent element receives the action from the 'childEmitter' object and when it's trigger it calls 'parentFunction()' sending any parameter from the 'emit' in child-->

      <!-- The '$event' keyword retreives whatever parameter we send from childEmitter.emit(<params>) -->
      <app-hero-card (childEmitter)="parentFunction( $event )"></app-hero-card>
      ```

## Pipes

https://angular.io/guide/pipes

###### Visual data transformation in HTML template, without mutate main content

- ##### Uppercase | Lowercase

  ```html
  <!-- HELLO WORLD! -->
  <p>{{ 'Hello World!' | uppercase }}</p>
  ```

  ```html
  <!-- hello world! -->
  <p>{{ 'Hello World!' | lowercase }}</p>
  ```

- ##### Slice
  - strings _[ start_char : end_char ]_
    ```html
    <!-- World! -->
    <p>{{ 'Hello World!' | slice: 5 }}</p>
    ```
  - arrays _[ start_idx : end_idx(-1) ]_
    ```html
    <!-- [ 3, 4 ] -->
    <p>{{ [1, 2, 3, 4, 5] | slice: 2:4 }}</p>
    ```
- ##### Number

  - default _3 decimals_

    ```html
    <!-- 3.142 -->
    <p>{{ 3.14159 | number }}</p>
    ```

  - decimals _< " .0-#decimals " >_

    ```html
    <!-- 3.14 -->
    <p>{{ 3.14159 | number: ".0-2" }}</p>
    ```

  - units & decimals _< " #units.0-#decimals " >_

    ```html
    <!-- 003.1416 -->
    <p>{{ 3.14159 | number: "2.0-4" }}</p>
    ```

- ##### Percent

  ###### _< " #units.0-#decimals " >_

  ```html
  <!-- 25.4% -->
  <p>{{ 0.254 | percent:'2.0-2' }}</p>
  ```

- ##### Currency
  ###### _< "country_code" : "#units.0-#decimals" >_
  ```html
  <!-- ¢1,234.50 -->
  <p>{{ 1234.5 | currency:'EUR' }}</p>
  ```
- ##### Json
  ```html
  <!-- JSON formatted data -->
  <pre> {{ json_variable | json }} </pre>
  ```
- ##### Async (for Promises)

  ```javascript
  promise_variable =
    new Promise() <
    string >
    (resolve => {
      setTimeout(() => {
        resolve('Take me with your leader!');
      }, 4500);
    });
  ```

  ```html
  <!-- AFTER 4.5 sec prints 'Take me with your leader!' -->
  <p>{{ promise_variable | async }}</p>
  ```

- ##### Date

  ###### _< "dd-MM-YYYY" | "short" | "medium" | 'language_code'>_

  - Using predefined formats

    ```html
    <!-- 3/23/20, 6:32 PM -->
    <p>{{ new Date() | date: "short" }}</p>
    ```

  - Changing date language

    ```console
        ng add @angular/localize
    ```

    _app.module.ts_

          ```javascript
          import { LOCALE_ID } from "@angular/core";
          import { registerLocaleData } from "@angular/common";
          // Import & register as much languages as needed
          import localeEs from "@angular/common/locales/es";
          registerLocaleData(localeEs);
          .
          .
          .
          providers: [
            {
              provide: LOCALE_ID,
              useValue: 'es'
            }
          ]
          ```

    ```html
    <!-- 23-Marzo (Changes month language to the      one defined by the code) -->
    <p>{{ new Date() | date: "dd-MMMM":'':'es' }}     </p>
    <!-- Note: Don´t miss that an empty slot ''       is required between the format and the      language code
    ```

## AJAX HTTP Requests

https://angular.io/guide/http

_app.module.ts_

```typescript
import { HttpClientModule } from '@angular/common/http';
```

```typescript
imports: [
  BrowserModule,
  // import HttpClientModule after BrowserModule.
  HttpClientModule
];
```

_http.service.ts_

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
```

```typescript

// OPTIONAL, only when header is needed
myHeaders = new HttpHeaders({
    // Here goes all headers to send with the HTTP Request body
    // Ex.
    // Authorization: < API_TOKEN >
  });

constructor( private http: HttpClient ) {  }

// Any function to aperate the REST Calls
operateAPI(){
  this.http.get("<API_URL>", { headers: myHeaders })
      .subscribe(api_response_data => {
        // Operations with API data retreived
      }, error => {
        // Error handling when no response is send
      }
    );
}
```

#### Map Pipe (RJXS Operator)

```typescript
import { map } from "rxjs/operators";

operateAPI() {
    this.http
      .get("<API_URL>", { headers: myHeaders })
      // Filters the data received from API before return it
      .pipe(
        map(
          data =>
          // Data Filtering
          // Ex. data["items"] -> Filters the response only returning the content in data.items
          ));

  }
```

## Forms

#### Reactive Forms

All configuration is made in the component (TypeScript)

_app.module.ts_

```typescript
import { ReactiveFormsModule } from '@angular/forms';
// ...
imports: [
    ReactiveFormsModule
  ],
```

_reactive-form.component.ts_

```typescript
export class ReactiveFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.setupForm();
    // this.listenChanges();
    // this.fillDefault();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      // fieldName: [<defaultValue>, <SYNC validations>, <ASYNC validations>]
      // ALL FIELDS MUST BE DECLARED IN HERE
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);
    } else {
      Object.values(this.form.controls).forEach(field => {
        if (field instanceof FormGroup) {
          Object.values(field.controls).forEach(nestedField =>
            nestedField.markAsTouched()
          );
        } else {
          field.markAsTouched();
        }
      });
    }
  }

  isValid(fieldName: string): boolean[] {
    if (this.form.get(fieldName).touched) {
      return [this.form.get(fieldName).valid, this.form.get(fieldName).invalid];
    } else {
      return [false, false];
    }
  }

  listenChanges() {
    // Individual listener for each field (can be done for the entire formulary)
    this.form.get('<field_name>').valueChanges.subscribe(response => {
      // All processing when the field change
      // You can have the changed value from the input
    });
    // Can check also the status changing 'valueChanges' for 'statusChanges' -> checks [valid | invalid | pending]
  }

  fillDefault() {
    // RESET clears all data, except when we define a
    // default value (we dont need to provide the entire structure)
    this.form.reset({
      email: 'hectak97.HT@gmail.com',
      address: {
        zipcode: '98134'
      }
    });
  }
}
```

_reactive-form.component.html_

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- All form fields goes here -->
  <button type="submit"></button>
</form>
```

- Common Reactive Validators

  - Form Control

    _reactive-form.component.ts_

    ```typescript
    this.form = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern(this.mailPattern)]]
    }
    ```

    _reactive-form.component.html_

    ```html
    <div class="form-group">
      <input
        type="text"
        nbInput
        fullWidth
        shape="round"
        placeholder="Email"
        formControlName="email"
        [ngClass]="{
            'form-control': true,
            'is-valid': isValid('email')[0],
            'is-invalid': isValid('email')[1]
          }"
      />
      <small
        *ngIf="isValid('email')[1]"
        class="form-text text-danger text-right mr-3"
      >
        You need to enter a valid email (example@mail.com)
      </small>
    </div>
    ```

  - Form Group (object with multiple properties)

    _reactive-form.component.ts_

    ```typescript
    this.form = this.formBuilder.group({
      address: this.formBuilder.group({
        city: ["", [Validators.required, Validators.minLength(5)]],
        // ... Here goes all the properties
      })
    }
    ```

    _reactive-form.component.html_

    ```html
    <div class="form-group" formGroupName="address">
      <div class="form-group">
        <input
          type="text"
          id="address"
          nbInput
          fullWidth
          shape="round"
          placeholder="City"
          [ngClass]="{
              'form-control': true,
              'is-valid': isValid('address.city')[0],
              'is-invalid': isValid('address.city')[1]
            }"
          formControlName="city"
        />
        <small
          *ngIf="isValid('address.city')[1]"
          class="form-text text-danger text-right mr-3"
        >
          You need to enter a city
        </small>
      </div>
    </div>
    ```

  - Form Array (set of different values)

    _reactive-form.component.ts_

    ```typescript
    this.form = this.formBuilder.group({
      hobbies: this.formBuilder.array([
        // ... Here goes all the controls
      ])
    }
    //...
    // This function returns the entire array to work in the HTML
    get formArray(): FormArray {
      return this.form.get("hobbies") as FormArray;
    }
    ```

    _reactive-form.component.html_

    ```html
    <div class="form-group" formArrayName="hobbies">
        <nb-list>
          <nb-list-item *ngFor="let item of formArray.controls; let i = index">
                <input
                  type="text"
                  nbInput
                  fullWidth
                  shape="round"
                  placeholder="What's your hobby?"
                  [formControlName]="i"
                />
            </div>
          </nb-list-item>
        </nb-list>
      </div>
    ```

    - Append to Form Array
      ```typescript
      add2FormArray() {
        this.formArray.push(this.formBuilder.control("", Validators.required));
      }
      ```
    - Remove from Form Array
      ```typescript
      remove2FormArray(idx: number) {
        this.formArray.removeAt(idx);
      }
      ```

#### Template Forms

All configuration resides in the HTML side (difficult to manage, not good for big formularies)

_app.module.ts_

```typescript
import { FormsModule } from '@angular/forms';
// ...
imports: [
    FormsModule
  ],
```

- ##### [( ngModel )]

  _Note: All form fields, must have a 'name' property assigned to it's HTML inorder for the [( ngModel )] to work properly_

  ```html
  <input type="text" name="username" [(ngModel)]="inputValue" />
  ```

  Creates a relation between the input state and the component properties.

- ##### ( ngSubmit )

  ```html
  <form (ngSubmit)="onSubmit()" #form="ngForm">
    <!-- All form fields goes here -->
    <button type="submit"></button>
  </form>
  ```

  Property assign to the entire formulary to keep track of it's fields, triggered by a 'submit' button type.

- Common Template Validations

  _template-form.component.ts_

  ```typescript
  export class TemplateFormComponent implements OnInit {
    fields = {
      firstname: {
        value: '',
        status: 'basic'
      },
      lastname: {
        value: '',
        status: 'basic'
      },
      email: {
        value: '',
        status: 'basic'
      },
      countries: {
        value: '',
        status: 'basic'
      }
    };
    countries: any[];

    constructor(private countriesService: CountriesService) {
      countriesService.getCountries().subscribe(response => {
        this.countries = response;
      });
    }

    ngOnInit(): void {}

    onSubmit(form: NgForm) {
      if (form.valid) {
        this.fields.firstname.status = 'success';
        this.fields.lastname.status = 'success';
        this.fields.email.status = 'success';
        this.fields.countries.status = 'success';
        console.log(form.value);
      } else {
        Object.values(form.controls).forEach(fieldControl => {
          fieldControl.markAsTouched();
        });
        if (form.controls.firstname.invalid) {
          this.fields.firstname.status = 'danger';
        }
        if (form.controls.lastname.invalid) {
          this.fields.lastname.status = 'danger';
        }
        if (form.controls.email.invalid) {
          this.fields.email.status = 'danger';
        }
        if (form.controls.country.invalid) {
          this.fields.countries.status = 'danger';
        }
      }
    }
  }
  ```

  _template-form.component.html_

  - Text Input

    ```html
      <input
          type="text"
          nbInput
          fullWidth
          shape="round"
          placeholder="First Name"
          name="firstname"
          [ngModel]="fields.firstname.value"
          [ngClass]="{
            'form-control': true,
            'is-valid': usernameField.valid && usernameField.touched,
            'is-invalid': usernameField.invalid && usernameField.touched
          }"
          (ngModelChange)="fields.firstname.status = 'basic'"
          [status]="fields.firstname.status"
          required
          minlength="5"
          #usernameField="ngModel"
        />
        <small
          *ngIf="usernameField.invalid && usernameField.touched"
          class="form-text text-danger text-right mr-3"
        >
          You need to enter a valid name (5 letters least)
        </small>
      </div>
    ```

  - Email

    ```html
    <div class="form-group">
      <input
        type="text"
        nbInput
        fullWidth
        shape="round"
        placeholder="Email"
        name="email"
        [ngModel]="fields.email.value"
        pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
        [ngClass]="{
              'form-control': true,
              'is-valid': emailField.valid,
              'is-invalid': emailField.invalid && emailField.touched
            }"
        (ngModelChange)="fields.email.status = 'basic'"
        [status]="fields.email.status"
        required
        #emailField="ngModel"
      />
      <small
        *ngIf="emailField.invalid && emailField.touched"
        class="form-text text-danger text-right mr-3"
      >
        You need to enter a valid email (example@mail.com)
      </small>
    </div>
    ```

  - Selector

    ```html
    <div class="form-group mx-1 text-right">
      <nb-select
        name="country"
        placeholder="Select Country"
        [ngModel]="fields.countries.value"
        (ngModelChange)="fields.countries.status = 'basic'"
        [status]="fields.countries.status"
        #countryField="ngModel"
        required
      >
        <nb-option *ngFor="let value of countries" value="{{ value.country }}">
          ({{ value.code }}) {{ value.country }}
        </nb-option>
      </nb-select>
      <small
        *ngIf="countryField.invalid && countryField.touched"
        class="form-text text-danger text-right mr-3"
      >
        You need to select a country
      </small>
    </div>
    ```

# External Services

This section contains useful API services, node packages & libraries to work at with Angular 9+

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
   import { Injectable } from '@angular/core';
   import createAuth0Client from '@auth0/  auth0-spa-js';
   import Auth0Client from '@auth0/auth0-spa-js/   dist/typings/Auth0Client';
   import {
     from,
     of,
     Observable,
     BehaviorSubject,
     combineLatest,
     throwError
   } from 'rxjs';
   import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
   import { Router } from '@angular/router';

   @Injectable({
     providedIn: 'root'
   })
   export class AuthService {
     // Create an observable of Auth0 instance     of client
     auth0Client$ = (from(
       createAuth0Client({
         domain: '<APP_DOMAIN',
         client_id: '<CLIENT_ID>',
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

     login(redirectPath: string = '/') {
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
       if (params.includes('code=') && params.includes('state=')) {
         let targetRoute: string; // Path to   redirect to after login processsed
         const authComplete$ = this.handleRedirectCallback$.pipe(
           // Have client, now call method to  handle auth callback redirect
           tap(cbRes => {
             // Get and set target redirect    route from callback results
             targetRoute =
               cbRes.appState && cbRes.appState.target
                 ? cbRes.appState.target
                 : '/';
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
           client_id: 'Kw3HPcG7f8Ilx4vFilGvDkliG3vOD4MF',
           returnTo: `${window.location.origin}`
         });
       });
     }
   }
   ```

4. Inject service in _app.component.ts_ or the component to implement authentication

   ```typescript
   import { Component } from '@angular/core';
   import { AuthService } from './services/auth.   service';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.scss']
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

## Firebase (Realtime Database)

1. Create Firebase project
   https://console.firebase.google.com
2. Select `Start with the test mode`
3. Navigate `Database > Create Realtime Database > Rules` and verify all permission for I/O are set to true (this permissions allow anyone to read & write, must change in production env)

#### Firebase REST Usage

###### Note: Notice the `.json` termintation after calling all the HTTP Request Services, this is a mandatory usage for the API calls.

_firebase.service.ts_

```typescript
export class FirebaseService {
  private firebase = '<FIREBASE_PROJECT_URL>';

  constructor(private http: HttpClient) {}

  // HTTP REQUEST : POST
  // Returns the FirebaseID when the POST request is submitted
  create(object: objectModel) {
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
  readAll() {
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
  readByID(firebaseID: string) {
    return this.http.get(`${this.firebase}/<COLLECTION>/${firebaseID}.json`);
  }

  // HTTP REQUEST : PUT
  // Returns an object with modified properties (updated), but same Firebase ID
  update(object: ObjectModel) {
    // Neccesarly pre-processing to remove redundancies using Firebase ID
    // while updating an element from database
    const objectTemp = {
      ...object
    };
    delete objectTemp.firebaseID;

    return this.http.put(
      `${this.firebase}/<COLLECTION>/${object.firebaseID}.json`,
      objectTemp
    );
  }

  // HTTP REQUEST : DELETE
  // Removes from database the unique object referenced by it's Firebase ID
  delete(firebaseID: string) {
    return this.http.delete(`${this.firebase}/<COLLECTION>/${firebaseID}.json`);
  }
}
```

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

## Chart.js (ng2-charts)

https://valor-software.com/ng2-charts/

##### Installation

```console
npm install --save ng2-charts
npm install --save chart.js
```

_app.module.ts_

```typescript
import { ChartsModule } from 'ng2-charts';
// ...
imports: [
  ChartsModule
  // ...
];
```

##### Chart.js Usage

- Line Chart
  https://valor-software.com/ng2-charts/#/LineChart

- Bar Chart
  https://valor-software.com/ng2-charts/#/BarChart

- Pie Chart
  https://valor-software.com/ng2-charts/#/PieChart

- Radar Chart
  https://valor-software.com/ng2-charts/#/RadarChart

Note: Add a width & height of 100% to make the chart fit responsively the content

```html
<canvas baseChart height="100%" width="100%" ...> </canvas>
```

## Faker (Fake data generator)

https://www.npmjs.com/package/faker

```console
npm install faker --save
npm install @types/faker --save
```

_faker-usage.component.ts_

```typescript
import * as faker from 'faker';
// If the data needs to be regional (in this case names in spanish from Mexico)
// import * as faker from 'faker/locale/es_MX'
```

## Google Maps

Angular Maps Module (AGM) Docs: https://angular-maps.com/
Create Google Maps [API KEY]: https://console.cloud.google.com/google/maps-apis/start

```console
npm install @agm/core --save
```

_app.module.ts_

```typescript
import { AgmCoreModule } from '@agm/core';
// ...
imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_MAPS_API_KEY'
    })
  ],
```

###### AGM Usage

- Create Map
  _google-map.component.html_

  ```html
  <agm-map
    (mapClick)="clickOnMap($event)"
    [latitude]="<MAP_LATITUDE>"
    [longitude]="<MAP_LONGITUDE>"
  >
    <!-- ALL MARKERS GOES HERE -->
  </agm-map>
  ```

  _google-map.component.ts_

  ```typescript
  mapMarkers: MapMarker[] = [];
  latitude = 40.73061;
  longitude = -73.935242;

   onClickMap(event: Event){
    // event returns an object coords with the clicked latitude and longitude
    // coords = { lat: <number>, lng: <number>}
  }
  ```

- Map Marker

  The best practice is create a model to manage the map market properties
  _map-market.ts_

  ```typescript
  export class MapMarker {
    constructor(
      public latitude: number,
      public longitude: number // More MapMarker properties if needed
    ) {}
  }
  ```

  _google-map.component.html_

  ```html
    <agm-marker
    [latitude]="<MARKER_LATITUDE>"
    [longitude]="<MARKER_LONGITUDE>"
    >
      <!-- INFO WINDOW GOES HERE -->
    </agm-map>
  ```

- Marker Info Window (Dialog when marker is clicked)

  _google-map.component.html_

  ```html
  <agm-info-window>
    <!-- Window design goes here -->
  </agm-info-window>
  ```

## Youtube API

https://developers.google.com/youtube/v3/

##### DOM Video Sanitizer (Youtube embed videos) | Pipe Sanitizer

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeResourceUrl {
    let url = 'https://www.youtube.com/embed/';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }
}
```
