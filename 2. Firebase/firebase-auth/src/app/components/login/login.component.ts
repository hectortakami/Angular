import { Component, OnInit } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { AuthFirebaseService } from "src/app/services/auth-firebase.service";
import { UserModel } from "src/app/models/user-model";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  rememberUser = false;
  userEmail = "";

  constructor(
    private toastrService: NbToastrService,
    private authService: AuthFirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user_email")) {
      this.userEmail = localStorage.getItem("user_email");
      this.rememberUser = true;
    }
  }

  showToast(position, status, duration, msg: string) {
    let title = "Welcome back! :)";
    if (status == "danger") {
      title = "Can't submit form";
    }
    this.toastrService.show(`${msg}`, `${title}`, {
      position,
      status,
      duration,
      limit: 3
    });
  }

  loginUser(email: string, password: string) {
    if (email.length <= 0 || password.length <= 0) {
      this.showToast(
        "top-start",
        "danger",
        5000,
        "Please complete all fields."
      );
      return;
    } else {
      let user = new UserModel();
      user.email = email;
      user.password = password;
      this.authService.login(user).subscribe(
        response => {
          this.showToast("top-right", "success", 10000, `${response["email"]}`);

          if (this.rememberUser) {
            localStorage.setItem("user_email", user.email);
          }

          this.router.navigate(["/home", response["idToken"]]);
        },
        error => {
          this.showToast(
            "top-start",
            "danger",
            5000,
            error["error"]["error"]["message"]
          );
          console.log(error["error"]["error"]["message"]);
        }
      );
    }
  }

  toggle(checked: boolean) {
    if (checked == false) {
      localStorage.setItem("user_email", "");
    }
    this.rememberUser = checked;
  }
}
