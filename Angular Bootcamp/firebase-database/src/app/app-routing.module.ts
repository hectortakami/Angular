import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowComponent } from "./components/show/show.component";
import { FormularyCrudComponent } from "./components/formulary-crud/formulary-crud.component";

const routes: Routes = [
  { path: "show", component: ShowComponent },
  { path: "register/:id", component: FormularyCrudComponent },
  { path: "**", pathMatch: "full", redirectTo: "show" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
