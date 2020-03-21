import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  iconRoute = "../../../assets/icons/tech";
  constructor() {}

  ngOnInit() {}
  languages = [
    {
      name: "Python",
      logo: `${this.iconRoute}/python.svg`,
      col: 12
    },
    {
      name: "JavaScript",
      logo: `${this.iconRoute}/javascript.svg`,
      col: 6
    },
    {
      name: "TypeScript",
      logo: `${this.iconRoute}/typescript.svg`,
      col: 6
    },
    {
      name: "HTML 5",
      logo: `${this.iconRoute}/html.png`,
      col: 4
    },
    {
      name: "CSS 3",
      logo: `${this.iconRoute}/css.png`,
      col: 4
    },
    {
      name: "Java",
      logo: `${this.iconRoute}/java.svg`,
      col: 4
    },
    {
      name: "Clojure",
      logo: `${this.iconRoute}/clojure.svg`,
      col: 6
    },
    {
      name: "Go-Lang",
      logo: `${this.iconRoute}/golang.png`,
      col: 6
    },
    {
      name: "C, C++, C#",
      logo: `${this.iconRoute}/c.jpeg`,
      col: 12
    },
    {
      name: "Angular",
      logo: `${this.iconRoute}/angular.svg`
    },
    {
      name: "NodeJS",
      logo: `${this.iconRoute}/node.svg`
    },
    {
      name: "Firebase",
      logo: `${this.iconRoute}/firebase.png`
    },
    {
      name: "MongoDB",
      logo: `${this.iconRoute}/mongodb.svg`
    },
    {
      name: "Ionic",
      logo: `${this.iconRoute}/ionic.png`
    },
    {
      name: "MySQL",
      logo: `${this.iconRoute}/mysql.svg`
    },
    {
      name: "Cisco TCL",
      logo: `${this.iconRoute}/cisco.png`
    },
    {
      name: "Github",
      logo: `${this.iconRoute}/github.svg`
    },
    {
      name: "VS Code",
      logo: `${this.iconRoute}/visualstudio.svg`
    },
    {
      name: "Microsoft Office",
      logo: `${this.iconRoute}/office.png`
    }
  ];

  categories = [
    "Software Engineering",
    "Software Development",
    "Computer Science",
    "Machine Learning",
    "Graphic Design",
    "Network Management",
    "Web Develpment",
    "Mobile Development"
  ];
}
