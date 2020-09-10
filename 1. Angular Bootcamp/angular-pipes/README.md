## Angular Pipes

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
