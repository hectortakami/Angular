import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();
  myColor = "blue";
  styleObj = {
    "font-size": "10rem",
    color: this.myColor
  };

  classArr = ["alert", "alert-success", "text-center"];

  showImage = true;
  pokemons = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Charmander",
    "Charmeleon",
    "Charizard"
  ];
  switchValue = 1;

  changeStyle() {
    switch (this.styleObj.color) {
      case "red":
        this.styleObj.color = "purple";
        break;
      case "purple":
        this.styleObj.color = "blue";
        break;
      case "blue":
        this.styleObj.color = "green";
        break;
      case "green":
        this.styleObj.color = "orange";
        break;
      case "orange":
        this.styleObj.color = "red";
        break;

      default:
        break;
    }
  }

  changeClass() {
    switch (this.classArr[1]) {
      case "alert-primary":
        this.classArr[1] = "alert-danger";
        break;
      case "alert-danger":
        this.classArr[1] = "alert-info";
        break;
      case "alert-info":
        this.classArr[1] = "alert-warning";
        break;
      case "alert-warning":
        this.classArr[1] = "alert-success";
        break;
      case "alert-success":
        this.classArr[1] = "alert-primary";
        break;

      default:
        break;
    }
  }

  switchPokemon(value: number) {
    this.switchValue = value;
  }
}
