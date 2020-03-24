# Angular 9+ Cheat Sheet
TypeScript + HTML + CSS toolset for building web based applications. Framework development. 


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

5. ##### Generate a new [ component | service | pipe ]

```console
ng generate [ component | service | pipe ] < path >
```

## Structural Directives

https://angular.io/guide/structural-directives#structural-directives

- ##### \*ngIf
  ```html
  <div *ngIf="<boolean expression>"></div>
  ```
- ##### \*ngForOf
  ```html
  <li *ngFor="let item in collection; let i=index;"></li>
  ```

## Routes & Parameters

https://angular.io/guide/router

- ##### Navigate in HTML Template
  ```html
  <a [routerLink]="['/<route>']" routerLinkActive="active"> </a>
  ```
- ##### Navigate from TS component

  ```javascript
  import { Router } from "@angular/router";

  this.router.navigate(["/<route>", "<params?>"]);
  ```

- ##### Retreive Params from route

  ```javascript
  import { ActivatedRoute } from "@angular/router";

  this.activatedRouter.params.subscribe(myParams => {
    // TODO params values in 'myParams' variable
  });
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
        resolve("Take me with your leader!");
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
