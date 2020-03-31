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

  fillDefault() {
    // RESET clears all data, except when we define a
    // default value (we dont need to provide the entire structure)
    this.form.reset({
      email: "hectak97.HT@gmail.com",
      address: {
        zipcode: "98134"
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
        value: "",
        status: "basic"
      },
      lastname: {
        value: "",
        status: "basic"
      },
      email: {
        value: "",
        status: "basic"
      },
      countries: {
        value: "",
        status: "basic"
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
        this.fields.firstname.status = "success";
        this.fields.lastname.status = "success";
        this.fields.email.status = "success";
        this.fields.countries.status = "success";
        console.log(form.value);
      } else {
        Object.values(form.controls).forEach(fieldControl => {
          fieldControl.markAsTouched();
        });
        if (form.controls.firstname.invalid) {
          this.fields.firstname.status = "danger";
        }
        if (form.controls.lastname.invalid) {
          this.fields.lastname.status = "danger";
        }
        if (form.controls.email.invalid) {
          this.fields.email.status = "danger";
        }
        if (form.controls.country.invalid) {
          this.fields.countries.status = "danger";
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
