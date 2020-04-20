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

4. ##### Generate a new [ component | service | pipe | guard | module ]

```console
ng generate [ component | service | pipe | guard | module ] < path >
```

5. ##### Deploy Angular App (Apache server)

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

  this.activatedRouter.params.subscribe((myParams) => {
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

- ##### Lazy Load (load routes from other modules)

  Helps angular routing module to load routes from other modules, declaring a relative path to the module. It prevents the app from loading un-used resources.

  `app-routing.module.ts`

  ```typescript
    {
      path: "PATH",
      loadChildren: () =>
        import("<RELATIVE_PATH>/MODULE.module").then((m) => m.MODULE_NAME),
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
    ((resolve) => {
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
  HttpClientModule,
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
      Object.values(this.form.controls).forEach((field) => {
        if (field instanceof FormGroup) {
          Object.values(field.controls).forEach((nestedField) =>
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
    this.form.get('<field_name>').valueChanges.subscribe((response) => {
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
        zipcode: '98134',
      },
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
        status: 'basic',
      },
      lastname: {
        value: '',
        status: 'basic',
      },
      email: {
        value: '',
        status: 'basic',
      },
      countries: {
        value: '',
        status: 'basic',
      },
    };
    countries: any[];

    constructor(private countriesService: CountriesService) {
      countriesService.getCountries().subscribe((response) => {
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
        Object.values(form.controls).forEach((fieldControl) => {
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

## Local Storage

Stores in browser's session memory data in Key:Value format as coockies

```typescript
    storeLocalStorage() {
        localStorage.setItem('KEY', JSON.stringify(this.lists));
    }

    getLocalStorage() {
        if (localStorage.getItem('KEY')) {
            return JSON.parse(localStorage.getItem('KEY'));
        } else {
            return null
        }
    }
```
