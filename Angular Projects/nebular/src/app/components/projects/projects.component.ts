import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  projectsRoute = "../../../assets/img/projects";
  showAll = true;

  projects = [
    {
      id: "1",
      name: "Fighting Game | Artificial Intelligence",
      languages: ["Java"],
      images: [`${this.projectsRoute}/fighting_AI/1.png`],
      description:
        " Modern Artificial Intelligence focuses on programming agents that are “Situated” in an environment. This type of programming allows research of several AI areas collaborating at the same time. Therefore, selection of the environment is of utmost importance to develop an AI program. Brook’s reactive architecture implementation, i.e. 'Subsumption Architecture'",
      categories: ["Machine Learning", "Computer Science"],
      githubLink: ""
    }
  ];

  constructor() {}

  ngOnInit() {}

  sortByCategory(category: string) {
    console.log(category);
  }
}
