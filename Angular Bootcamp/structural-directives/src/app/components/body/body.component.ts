import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"]
})
export class BodyComponent implements OnInit {
  isActive = true;
  dogs = [
    "Akita",
    "Alaskan Malamute",
    "Beagle",
    "Bull Terrier",
    "Bichon Frise",
    "Chihuahua",
    "Chow Chow",
    "Cocker Spaniel",
    "German Shepherd",
    "Golden Retriever",
    "Pug",
    "Shiba Inu",
    "St. Bernard"
  ];
  constructor() {}

  ngOnInit() {}

  changeActive(value: boolean) {
    this.isActive = value;
  }
}
