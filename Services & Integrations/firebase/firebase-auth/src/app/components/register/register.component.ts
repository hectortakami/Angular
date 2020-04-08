import { Component } from "@angular/core";
import { UserModel } from "src/app/models/user-model";
import { NbToastrService } from "@nebular/theme";
import { AuthFirebaseService } from "src/app/services/auth-firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  user: UserModel;
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  rememberUser = false;

  constructor(
    private toastrService: NbToastrService,
    private authService: AuthFirebaseService,
    private router: Router
  ) {
    this.user = new UserModel();
  }

  showToast(position, status, duration, msg: string) {
    let title = "Form submitted";
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

  registerUser(email: string, username: string, password: string) {
    this.user = {
      email: email,
      username: username,
      password: password
    };
    if (
      this.user.email.length <= 0 ||
      this.user.username.length <= 0 ||
      this.user.password.length <= 0
    ) {
      this.showToast(
        "top-start",
        "danger",
        5000,
        "Please complete all fields."
      );
      return;
    } else if (!this.user.email.match(this.mailformat)) {
      this.showToast("top-start", "danger", 5000, "Invalid Email.");
    } else {
      this.authService.registerUser(this.user).subscribe(
        response => {
          this.showToast(
            "top-right",
            "success",
            3000,
            "User successfully register! :)"
          );

          if (this.rememberUser) {
            localStorage.setItem("user_email", this.user.email);
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
