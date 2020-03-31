import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.scss"]
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private formBuilder: FormBuilder) {
    this.setupForm();
    // this.listenChanges();
    // this.fillDefault();
  }

  ngOnInit(): void {}

  setupForm() {
    this.form = this.formBuilder.group({
      // fieldName: [<defaultValue>, <SYNC validations>, <ASYNC validations>]
      firstname: ["", [Validators.required, Validators.minLength(5)]],
      lastname: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern(this.mailPattern)]],
      address: this.formBuilder.group({
        // Field with 2 or more properties
        city: ["", [Validators.required, Validators.minLength(5)]],
        state: ["", [Validators.required, Validators.minLength(5)]],
        zipcode: ["", [Validators.required, Validators.minLength(5)]]
      }),
      hobbies: this.formBuilder.array([
        // Field with multiple values
      ])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
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

  get formArray(): FormArray {
    return this.form.get("hobbies") as FormArray;
  }

  add2FormArray() {
    this.formArray.push(this.formBuilder.control("", Validators.required));
  }

  remove2FormArray(idx: number) {
    this.formArray.removeAt(idx);
  }

  listenChanges() {
    this.form.get("firstname").valueChanges.subscribe(inputValue => {
      // All processing when the field is change
      // You can have the changed value from the input
    });
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
