import { Component } from "@angular/core";
import { FireauthService } from "./services/fireauth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();
  constructor(public fireauth: FireauthService) {}
}
