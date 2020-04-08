import { Component, OnInit } from "@angular/core";
import { FireauthService } from "src/app/services/fireauth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(private fireauth: FireauthService) {}

  fireLogin(provider: string) {
    this.fireauth.login(provider);
  }

  ngOnInit(): void {}
}
