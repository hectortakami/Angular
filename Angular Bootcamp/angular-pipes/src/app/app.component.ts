import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();

  str_variable: string = "hellO worLd!";
  arr_variable: string[] = ["1", "2", "3", "4", "5"];
  num_variable: number = Math.PI;
  percent_variable: number = 0.254;
  currency_variable: number = 12567.5;

  video_url = "https://www.youtube.com/embed/8Qn_spdM5Zg";
  isPasswordActivated = true;

  json_variable = {
    name: "Luke Skywalker",
    faction: "Jedi",
    forcePower: 1500,
    padawans: [
      {
        name: "Rey Palpatine",
        faction: "Jedi",
        forcePower: 1300
      },
      {
        name: "Ben Solo",
        alias: "Kylo Ren",
        faction: "Sith",
        forcePower: 1350
      }
    ]
  };

  promise_variable = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve("Promise finished! :)");
    }, 4500);
  });

  date_variable = new Date();
  language = "en";

  changeLanguage() {
    switch (this.language) {
      case "en":
        this.language = "es";
        break;
      case "es":
        this.language = "fr";
        break;
      case "fr":
        this.language = "en";
        break;

      default:
        break;
    }
  }
}
