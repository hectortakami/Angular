import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthFirebaseService } from "src/app/services/auth-firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  userToken: string;
  userData: any = "";

  constructor(
    private routerParams: ActivatedRoute,
    private router: Router,
    private authService: AuthFirebaseService
  ) {
    this.routerParams.params.subscribe(params => {
      this.userToken = params["user_token"];
    });
    this.authService.getUserData(this.userToken).subscribe(
      response => {
        this.userData = response["users"]["0"];
        console.log(this.userData);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
