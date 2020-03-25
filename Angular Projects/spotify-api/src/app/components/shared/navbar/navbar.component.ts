import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  tabs = [
    {
      title: "Home",
      route: "/home",
      icon: "music-outline",
      responsive: true
    },
    {
      title: "Search",
      route: "/search",
      icon: "search-outline",
      responsive: true
    }
  ];
  ngOnInit(): void {}

  navigate(route: string) {
    console.log(route);
  }
}
