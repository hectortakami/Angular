import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CountriesService } from "src/app/services/countries.service";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.scss"]
})
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
