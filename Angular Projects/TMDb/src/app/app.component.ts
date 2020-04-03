import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();
  tabs = [
    {
      title: "Top Movies",
      route: "/movies",
      icon: "film",
      responsive: true
    },
    {
      title: "Search Movie",
      route: "/search",
      icon: "search",
      responsive: true
    }
  ];
}
