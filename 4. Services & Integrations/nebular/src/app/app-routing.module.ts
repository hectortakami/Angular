import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  { path: "projects", component: ProjectsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "**", pathMatch: "full", redirectTo: "profile" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}