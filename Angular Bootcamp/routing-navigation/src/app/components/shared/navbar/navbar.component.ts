import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  tabs = [
    {
      title: "Home Page",
      route: "/home",
      icon: "home",
      responsive: true
    },
    {
      title: "Pokedex",
      route: "/pokedex",
      icon: "radio-button-on-outline",
      responsive: true
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
